import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { BlurFade } from "@/components/ui/BlurFade";
import { WordFadeIn } from "@/components/ui/WordFadeIn";
import { AnimatedShinyText } from "@/components/ui/AnimatedShinyText";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container>
        <div className="flex flex-col items-start max-w-4xl">
          {/* Badge */}
          <BlurFade delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
                <AnimatedShinyText>Roblox UI & Interface Designer</AnimatedShinyText>
              </span>
            </div>
          </BlurFade>

          {/* Headline with Word Fade animation */}
          <WordFadeIn
            words="Menus, shops and HUDs for Roblox games."
            className="t-display text-white"
            delay={0.08}
          />

          {/* Description */}
          <BlurFade delay={0.35}>
            <p className="t-lead mt-6 max-w-2xl text-text-muted">
              {site.intro}
            </p>
          </BlurFade>

          {/* Actions with Magnetic Hover */}
          <BlurFade delay={0.45}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Magnetic intensity={0.25}>
                <Link href="/work" className="uiverse-btn-shimmer">
                  <span>Explore Work</span>
                  <span className="ml-2">&rarr;</span>
                </Link>
              </Magnetic>
              <CopyButton text={site.email} label="Copy Email" />
            </div>
          </BlurFade>

          {/* Facts Row */}
          <BlurFade delay={0.55} className="w-full">
            <div className="mt-14 grid grid-cols-2 gap-4 w-full sm:grid-cols-3 sm:gap-6 border-t border-white/10 pt-8">
              {site.facts.map((fact) => (
                <div key={fact.label}>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-text-dim">
                    {fact.label}
                  </span>
                  <p className="mt-1.5 text-sm font-semibold text-white">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </Container>
    </section>
  );
}
