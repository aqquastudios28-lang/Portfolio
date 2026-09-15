import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DiscordAppCard } from "@/components/contact/DiscordAppCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Discord Relay",
  description: `Commission Roblox game UI, HUD systems and Luau builds directly via ${site.name}.`,
  alternates: { canonical: "/contact" },
};

const HANDOFF = [
  "Figma source files",
  "Studio .rbxm models",
  "Scaled for mobile, tablet and desktop",
  "Commented Luau",
];

interface ContactPageProps {
  searchParams: Promise<{
    discord_user?: string;
    discord_id?: string;
    discord_connected?: string;
    discord_error?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const initialDiscordUser = params.discord_user
    ? { username: params.discord_user, id: params.discord_id }
    : undefined;



  return (
    <div className="py-10 sm:py-16">
      <Container>
        {/* Header Bar */}
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <span className="annot annot-bright">Discord & Commissions</span>
          <span className="annot">
            {site.availability.open
              ? site.availability.label
              : site.availability.closedLabel}
          </span>
        </div>

        {/* Page Title & Intro */}
        <div className="mt-12 max-w-3xl">
          <h1 className="t-h1 text-paper">
            Send the brief on Discord.
          </h1>
          <p className="t-lead mt-4 text-paper-2">
            Add the bot to your account. Drop the game link, what menus you need, and your deadline. The bot logs the specs instantly, and I reply directly from Studio with a verified badge.
          </p>
        </div>

        {/* Primary: 1-Click Discord App Installer Card */}
        <div className="mt-10">
          <DiscordAppCard
            directInstallUrl={process.env.DISCORD_APPLICATION_INSTALL_URL}
            initialConnectedUser={params.discord_user}
          />
        </div>



        {/* Web Brief Alternative & Channels */}
        <section className="mt-16 border-t border-rule pt-14">
          <div className="mb-8">
            <span className="annot">Browser form</span>
            <h2 className="font-display text-2xl font-bold text-paper mt-1">
              Write the brief here instead
            </h2>
            <p className="mt-1 text-xs text-paper-2 max-w-xl">
              If you do not want to add the bot, submit here. It lands in my Discord channel either way.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ContactForm email={site.email} initialDiscordUser={initialDiscordUser} />
            </div>

            <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
              <div>
                <span className="annot">Direct Email</span>
                <p className="mt-3 break-all font-mono text-sm text-paper">
                  {site.email}
                </p>
                <div className="mt-4">
                  <CopyButton text={site.email} label="Copy address" />
                </div>
              </div>

              <div>
                <span className="annot">Channels</span>
                <ul className="mt-3">
                  {site.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center justify-between border-b border-rule-soft py-3 text-sm text-paper-2 transition-colors hover:text-paper"
                      >
                        {link.label}
                        <span
                          aria-hidden
                          className="text-paper-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >
                          &#8599;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="annot">What you get</span>
                <ul className="mt-3 space-y-2.5">
                  {HANDOFF.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-sm text-paper-2"
                    >
                      <span aria-hidden className="text-accent">
                        &#8212;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </Container>
    </div>
  );
}
