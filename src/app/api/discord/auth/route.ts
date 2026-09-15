import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // If a direct Discord application invite URL is provided in env:
  const directInstallUrl = process.env.DISCORD_APPLICATION_INSTALL_URL;
  if (directInstallUrl) {
    return NextResponse.redirect(directInstallUrl);
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  if (!clientId) {
    // If not configured yet, fallback to instructions or fallback contact page
    const url = new URL("/contact", req.url);
    url.searchParams.set("discord_error", "not_configured");
    return NextResponse.redirect(url);
  }

  // Build OAuth2 install/authorize URL
  const origin = new URL(req.url).origin;
  const redirectUri = `${origin}/api/discord/callback`;

  // We request `identify` and `applications.commands` (for User Apps & slash commands)
  // Optionally include `bot` if adding to servers is desired.
  const discordAuthUrl = new URL("https://discord.com/oauth2/authorize");
  discordAuthUrl.searchParams.set("client_id", clientId);
  discordAuthUrl.searchParams.set("response_type", "code");
  discordAuthUrl.searchParams.set("redirect_uri", redirectUri);
  discordAuthUrl.searchParams.set("scope", "identify applications.commands");
  discordAuthUrl.searchParams.set("prompt", "consent");

  return NextResponse.redirect(discordAuthUrl.toString());
}
