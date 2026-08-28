import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Magnetic } from "@/components/ui/Magnetic";
import { site } from "@/content/site";

export function ContactCta() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/10">
      <Container>
        <BlurFade delay={0.05} inView>
          <SpotlightCard className="relative overflow-hidden p-8 sm:p-14">
            <BorderBeam size={250} duration={12} colorFrom="#ffffff" colorTo="transparent" />

            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
                  Direct Inquiries
                </span>
                <h2 className="t-h1 mt-3 text-white">Working on a game?</h2>
                <p className="t-lead mt-3 text-text-muted">
                  Send me the experience details, current screens, and what you are looking to build or rework.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <Magnetic intensity={0.25}>
                  <Link href="/contact" className="uiverse-btn-shimmer">
                    <span>Start a Project</span>
                    <span className="ml-2">&rarr;</span>
                  </Link>
                </Magnetic>
                <CopyButton text={site.email} label="Copy Email" />
              </div>
            </div>
          </SpotlightCard>
        </BlurFade>
      </Container>
    </section>
  );
}
