import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { ContactCta } from "@/components/home/ContactCta";
import { about, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Background, game design philosophy, and toolkit for ${site.name} — Roblox UI Designer.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container>
        {/* Header */}
        <BlurFade delay={0.05}>
          <div className="border-b border-white/10 pb-8 max-w-3xl">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              About the Designer
            </span>
            <h1 className="t-h1 mt-2 text-white">
              Designing Interfaces That Players Actually Enjoy Using.
            </h1>
          </div>
        </BlurFade>

        {/* Bio + Stats */}
        <section className="py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
            <BlurFade delay={0.15}>
              <div className="space-y-6">
                {about.bio.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "t-lead text-white"
                        : "text-sm leading-relaxed text-text-muted"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>
            </BlurFade>

            {/* Quick Facts Card */}
            <BlurFade delay={0.25}>
              <SpotlightCard className="relative overflow-hidden h-fit p-6">
                <BorderBeam size={160} duration={9} colorFrom="#ffffff" colorTo="transparent" />

                <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
                  Studio Overview
                </span>
                <ul className="mt-4 space-y-3 font-mono text-xs text-text-muted">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-text-dim">Discipline</span>
                    <span className="text-white">Roblox Game UI</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-text-dim">Language</span>
                    <span className="text-white">Luau / Rojo</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-text-dim">Since</span>
                    <span className="text-white">2022</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-text-dim">Format</span>
                    <span className="text-white">Remote Global</span>
                  </li>
                </ul>

                <div className="mt-6 pt-2">
                  <Link href="/contact" className="uiverse-btn-shimmer w-full text-center">
                    Start a Project &rarr;
                  </Link>
                </div>
              </SpotlightCard>
            </BlurFade>
          </div>
        </section>

        {/* Toolkit */}
        <section className="border-t border-white/10 py-12">
          <BlurFade delay={0.05} inView>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              Toolkit & Pipeline
            </span>
          </BlurFade>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {about.toolkit.map((group, idx) => (
              <BlurFade key={group.group} delay={0.1 + idx * 0.08} inView>
                <SpotlightCard className="p-6 h-full">
                  <h3 className="font-display text-sm font-semibold text-white">
                    {group.group}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="border-t border-white/10 py-12">
          <BlurFade delay={0.05} inView>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              Experience & Milestones
            </span>
          </BlurFade>

          <div className="mt-8 space-y-4">
            {about.timeline.map((entry, idx) => (
              <BlurFade key={entry.year} delay={0.1 + idx * 0.08} inView>
                <SpotlightCard
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:gap-8"
                >
                  <span className="font-mono text-xs font-semibold text-white sm:w-16">
                    {entry.year}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">
                      {entry.detail}
                    </p>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </section>
      </Container>

      <ContactCta />
    </div>
  );
}
