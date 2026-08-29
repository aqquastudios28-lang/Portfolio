import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Commissions",
  description: `Commission bespoke Roblox game UI, HUD systems, and Luau code from ${site.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container>
        {/* Header */}
        <BlurFade delay={0.05}>
          <div className="border-b border-white/10 pb-8 max-w-3xl">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              Direct Inquiries
            </span>
            <h1 className="t-h1 mt-2 text-white">Let&rsquo;s Build Your Game&rsquo;s UI.</h1>
            <p className="t-lead mt-2 text-text-muted">
              Send over your game link, what menus you need created or reworked, and your timeline.
            </p>
          </div>
        </BlurFade>

        {/* Layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          {/* Form */}
          <BlurFade delay={0.15}>
            <SpotlightCard className="relative overflow-hidden p-6 sm:p-8">
              <BorderBeam size={220} duration={10} colorFrom="#ffffff" colorTo="transparent" />
              <ContactForm email={site.email} />
            </SpotlightCard>
          </BlurFade>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Email */}
            <BlurFade delay={0.2}>
              <SpotlightCard className="p-6">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
                  Email
                </span>
                <p className="mt-2 text-sm font-semibold text-white break-all">{site.email}</p>
                <div className="mt-4">
                  <CopyButton text={site.email} label="Copy Email Address" />
                </div>
              </SpotlightCard>
            </BlurFade>

            {/* Socials */}
            <BlurFade delay={0.28}>
              <SpotlightCard className="p-6">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
                  Socials
                </span>
                <ul className="mt-3 space-y-2 text-sm">
                  {site.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center justify-between text-text-muted transition-colors hover:text-white"
                      >
                        <span>{link.label}</span>
                        <svg
                          className="h-3.5 w-3.5 text-text-dim transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </BlurFade>

            {/* Handoff Specs */}
            <BlurFade delay={0.36}>
              <SpotlightCard className="p-6">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
                  Handoff Specs
                </span>
                <ul className="mt-3 space-y-2 font-mono text-xs text-text-muted">
                  <li className="flex items-center gap-2">
                    <span className="text-white">✓</span> Figma .fig files
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white">✓</span> Studio .rbxm models
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white">✓</span> Scaled for mobile & PC
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white">✓</span> Clean Luau script handoff
                  </li>
                </ul>
              </SpotlightCard>
            </BlurFade>
          </aside>
        </div>
      </Container>
    </div>
  );
}
