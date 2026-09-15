import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    const redirectUrl = new URL("/contact", origin);
    if (error) redirectUrl.searchParams.set("discord_error", error);
    return NextResponse.redirect(redirectUrl);
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    // Graceful fallback if secrets aren't set in dev yet
    const redirectUrl = new URL("/contact", origin);
    redirectUrl.searchParams.set("discord_connected", "true");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const redirectUri = `${origin}/api/discord/callback`;

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      console.error("Failed to exchange Discord code:", await tokenRes.text());
      const redirectUrl = new URL("/contact", origin);
      redirectUrl.searchParams.set("discord_error", "token_exchange_failed");
      return NextResponse.redirect(redirectUrl);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Fetch user info
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let discordUser: { id?: string; username?: string; global_name?: string } = {};
    if (userRes.ok) {
      discordUser = await userRes.json();
    }

    const redirectUrl = new URL("/contact", origin);
    redirectUrl.searchParams.set("discord_connected", "true");
    if (discordUser.username) {
      redirectUrl.searchParams.set("discord_user", discordUser.username);
    }
    if (discordUser.id) {
      redirectUrl.searchParams.set("discord_id", discordUser.id);
    }

    const response = NextResponse.redirect(redirectUrl);

    // Save minimal cookie for smooth web contact autofill
    if (discordUser.id && discordUser.username) {
      response.cookies.set({
        name: "discord_session",
        value: JSON.stringify({
          id: discordUser.id,
          username: discordUser.username,
          displayName: discordUser.global_name || discordUser.username,
        }),
        httpOnly: false, // Accessible to front-end for form autofill
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch (err) {
    console.error("Discord OAuth callback error:", err);
    const redirectUrl = new URL("/contact", origin);
    redirectUrl.searchParams.set("discord_error", "callback_exception");
    return NextResponse.redirect(redirectUrl);
  }
}
