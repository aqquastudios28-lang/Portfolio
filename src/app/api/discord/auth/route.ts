import { NextResponse } from "next/server";

const DEFAULT_APP_ID = "1549424708292837438";

export async function GET(req: Request) {
  // If a direct Discord application invite URL is provided in env:
  const directInstallUrl = process.env.DISCORD_APPLICATION_INSTALL_URL;
  if (directInstallUrl) {
    return NextResponse.redirect(directInstallUrl);
  }

  const clientId = process.env.DISCORD_CLIENT_ID || DEFAULT_APP_ID;
  const origin = new URL(req.url).origin;
  const redirectUri = `${origin}/api/discord/callback`;

  // Standard user-app & slash commands install URL
  const discordAuthUrl = new URL("https://discord.com/oauth2/authorize");
  discordAuthUrl.searchParams.set("client_id", clientId);
  discordAuthUrl.searchParams.set("response_type", "code");
  discordAuthUrl.searchParams.set("redirect_uri", redirectUri);
  discordAuthUrl.searchParams.set("scope", "identify applications.commands");
  discordAuthUrl.searchParams.set("prompt", "consent");

  return NextResponse.redirect(discordAuthUrl.toString());
}
