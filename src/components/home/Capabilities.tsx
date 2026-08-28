import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { site } from "@/content/site";

export function Capabilities() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/10">
      <Container>
        <BlurFade delay={0.05}>
          <div className="flex flex-col items-start max-w-2xl">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              Services & Scope
            </span>
            <h2 className="t-h1 mt-2 text-white">What I take on</h2>
            <p className="t-lead mt-2">
              From initial user flow wireframes to scalable UI component kits and production Luau code.
            </p>
          </div>
        </BlurFade>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.capabilities.map((cap, i) => (
            <BlurFade key={cap.title} delay={0.1 + i * 0.08} inView>
              <SpotlightCard className="flex flex-col justify-between p-6 h-full">
                <div>
                  <span className="font-mono text-xs font-semibold text-text-dim">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-text-muted">
                    {cap.body}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                    Roblox Studio Ready
                  </span>
                </div>
              </SpotlightCard>
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  );
}
