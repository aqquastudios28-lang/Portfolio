import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Anything that ends up in a mail header has to lose its line breaks first,
 * otherwise a submitted value containing CR/LF can append headers of its own
 * (a Bcc, a different reply-to) to the outgoing message.
 */
function headerSafe(str: string): string {
  return str.replace(/[\r\n\t]+/g, " ").trim();
}

const EMAIL_RE = /^[^\s@<>",;]+@[^\s@<>",;.]+\.[^\s@<>",;]{2,}$/;

/**
 * Only accept posts that a browser initiated from this site. Does not stop a
 * scripted client, which is what the honeypot and rate limit are for, but it
 * does close off drive-by cross-site submissions.
 */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser client; other checks still apply

  const host = req.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    if (!sameOrigin(req)) {
      return NextResponse.json({ error: "Bad request" }, { status: 403 });
    }

    // 1. Production Rate Limiting (5 requests per 10 minutes per IP)
    const rateLimit = checkRateLimit(`contact_${ip}`, {
      maxRequests: 5,
      windowMs: 10 * 60 * 1000,
    });

    const rateLimitHeaders = {
      "X-RateLimit-Limit": rateLimit.limit.toString(),
      "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      "X-RateLimit-Reset": rateLimit.reset.toString(),
    };

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many commission requests sent from this IP. Please wait a few minutes or reach out on Discord.",
        },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            "Retry-After": (rateLimit.reset - Math.ceil(Date.now() / 1000)).toString(),
          },
        }
      );
    }

    // 2. Parse & Validate Payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const { name, game, scope, message, hp_website } = body;

    // 3. Honeypot check (Bots fill hidden fields, real users don't)
    if (hp_website) {
      // Return 200 silently to prevent bots from guessing the filter
      return NextResponse.json(
        { success: true, message: "Request received" },
        { status: 200, headers: rateLimitHeaders }
      );
    }

    // 4. Input constraints & sanitization
    const cleanName = typeof name === "string" ? name.trim().slice(0, 100) : "";
    const cleanGame = typeof game === "string" ? game.trim().slice(0, 200) : "";
    const cleanScope = typeof scope === "string" ? scope.trim().slice(0, 50) : "Full UI Set";
    const cleanMessage = typeof message === "string" ? message.trim().slice(0, 3000) : "";

    if (!cleanName || !cleanMessage) {
      return NextResponse.json(
        { error: "Name/Handle and project requirements are required." },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    /* No inbox is hardcoded here — a fallback address in the source is a
       personal address published to anyone who reads the repo. Set
       NOTIFICATION_EMAIL in the environment instead. */
    const targetEmail =
      process.env.NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL;

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!targetEmail) {
      console.error(
        "Contact form: NOTIFICATION_EMAIL is not set, cannot deliver enquiry.",
      );
    }
    let emailDelivered = false;

    // 5. Send via Resend API
    if (resendApiKey && targetEmail) {
      const escapedName = escapeHtml(cleanName);
      const escapedGame = escapeHtml(cleanGame || "Not specified");
      const escapedScope = escapeHtml(cleanScope);
      const escapedMessage = escapeHtml(cleanMessage);
      const submissionDate = new Date().toUTCString();

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Commission Request</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0a0b0e; color: #ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 580px; background-color: #12141a; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <!-- Header -->
          <tr>
            <td>
              <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #ff4a1c; text-transform: uppercase; margin-bottom: 8px;">
                Cerbis UI Portfolio • Commission Alert
              </div>
              <h1 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                🎨 New Commission Request [${escapedScope}]
              </h1>
              <div style="height: 1px; background-color: rgba(255,255,255,0.08); margin-bottom: 24px;"></div>
            </td>
          </tr>

          <!-- Details Grid -->
          <tr>
            <td>
              <table width="100%" style="margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #8e929e; width: 140px; vertical-align: top;"><strong>Client / Handle:</strong></td>
                  <td style="padding: 6px 0; color: #ffffff; font-weight: 600;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8e929e; vertical-align: top;"><strong>Project Scope:</strong></td>
                  <td style="padding: 6px 0; color: #ff4a1c; font-weight: 600;">${escapedScope}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8e929e; vertical-align: top;"><strong>Game / Roblox URL:</strong></td>
                  <td style="padding: 6px 0; color: #ffffff;">${escapedGame}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Details -->
          <tr>
            <td>
              <div style="font-size: 12px; font-weight: 600; color: #8e929e; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
                Project Requirements & Scope:
              </div>
              <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${escapedMessage}</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 28px;">
              <div style="height: 1px; background-color: rgba(255,255,255,0.08); margin-bottom: 16px;"></div>
              <div style="font-size: 11px; color: #5c606c; line-height: 1.5;">
                Sent directly via Cerbis Portfolio (<a href="https://cerbis.xyz" style="color: #8e929e; text-decoration: none;">cerbis.xyz</a>)<br>
                Timestamp: ${submissionDate}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      /* Only pass a reply-to when the value really is an address, and only
         after stripping anything that could break out into a new header. */
      const candidate = headerSafe(cleanName);
      const replyTo = EMAIL_RE.test(candidate) ? candidate : undefined;

      // Helper function to send email via Resend
      const sendWithResend = async (fromAddress: string) => {
        return fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [targetEmail],
            reply_to: replyTo,
            subject: headerSafe(
              `Commission request [${cleanScope}] - ${cleanName}`,
            ).slice(0, 180),
            html: emailHtml,
          }),
        });
      };

      // Try default sender (onboarding@resend.dev or custom domain if set)
      const defaultFrom =
        process.env.RESEND_FROM_EMAIL || "Cerbis Portfolio <onboarding@resend.dev>";

      let resendResponse = await sendWithResend(defaultFrom);

      // If custom domain is still pending verification, auto-fallback to onboarding sender
      if (!resendResponse.ok && defaultFrom !== "Cerbis Portfolio <onboarding@resend.dev>") {
        console.warn(
          "Custom domain send failed, falling back to onboarding@resend.dev..."
        );
        resendResponse = await sendWithResend("Cerbis Portfolio <onboarding@resend.dev>");
      }

      if (resendResponse.ok) {
        emailDelivered = true;
      } else {
        const errJson = await resendResponse.json().catch(() => ({}));
        console.error("Resend delivery failed:", errJson);
      }
    }

    // 6. Optional Discord Webhook Backup
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Cerbis Commissions",
            embeds: [
              {
                title: `🎨 New Commission Request [${cleanScope}]`,
                color: 0xff4a1c,
                fields: [
                  { name: "👤 Client / Handle", value: cleanName, inline: true },
                  { name: "🎯 Scope", value: cleanScope, inline: true },
                  { name: "🕹️ Game Link", value: cleanGame || "None provided", inline: false },
                  {
                    name: "📝 Requirements",
                    value: cleanMessage.length > 1000 ? cleanMessage.slice(0, 1000) + "..." : cleanMessage,
                    inline: false,
                  },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (err) {
        console.error("Discord backup webhook error:", err);
      }
    }

    if (!emailDelivered && !resendApiKey) {
      console.log("📥 Commission Submission (Local Mode):", {
        name: cleanName,
        game: cleanGame,
        scope: cleanScope,
        message: cleanMessage,
      });
    }

    return NextResponse.json(
      {
        success: true,
        delivered: emailDelivered,
        message: "Commission request submitted successfully",
      },
      {
        status: 200,
        headers: rateLimitHeaders,
      }
    );
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing request." },
      { status: 500 }
    );
  }
}
