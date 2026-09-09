import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { site } from "@/content/site";

export function Capabilities() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <BlurFade delay={0.05}>
            <div className="section-frame p-6 sm:p-8">
              <span className="section-kicker">Services & scope</span>
              <h2 className="t-h1 mt-3 text-white">What I take on</h2>
              <p className="t-lead mt-4 max-w-xl">
                From early user-flow wireframes to production-ready Roblox Studio
                implementation, built around touch ergonomics and repeat visits.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Interface systems that stay coherent across every screen",
                  "Menu layouts sized by how often players actually open them",
                  "Figma-to-Studio handoff without spacing drift",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                  >
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_var(--accent-glow)]" />
                    <p className="text-sm leading-6 text-text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {site.capabilities.map((cap, i) => (
              <BlurFade key={cap.title} delay={0.1 + i * 0.08} inView>
                <SpotlightCard className="flex h-full flex-col justify-between p-6">
                  <div>
                    <span className="section-kicker">0{i + 1}</span>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white">
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text-muted">
                      {cap.body}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-4">
                    <span className="micro-chip bg-white/[0.03] text-text-dim">
                      Roblox Studio ready
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                      Scope
                    </span>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
