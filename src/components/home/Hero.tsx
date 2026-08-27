import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { publishedProjects } from "@/content/projects";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24">
      {/* Subtle ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent/8 via-accent/3 to-transparent blur-3xl"
      />

      <Container>
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="t-label">{site.role}</p>
          </div>
          <p className="t-label hidden sm:block">
            {String(publishedProjects.length).padStart(2, "0")} showcase frames
          </p>
        </div>

        <h1 className="t-display mt-10 max-w-[16ch] sm:mt-14 tracking-tight">
          {site.headline.map((line, idx) => (
            <span
              key={line}
              className={idx === 1 ? "block text-transparent bg-clip-text bg-gradient-to-r from-bone via-bone to-bone-dim" : "block"}
            >
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-14 grid gap-10 border-t border-rule pt-8 sm:mt-20 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="space-y-6">
            <p className="t-lead max-w-[46ch]">{site.intro}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-4 py-2 text-xs font-mono font-medium tracking-wider text-accent uppercase transition-all hover:bg-accent hover:text-ink active:scale-95"
              >
                <span>Explore All Frames</span>
                <span aria-hidden>&rarr;</span>
              </Link>
              <CopyButton text={site.email} label="Copy Email" />
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-12 gap-y-6 sm:grid-cols-4 md:gap-x-14">
            {site.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="t-label">{fact.label}</dt>
                <dd className="mt-2 text-sm font-medium text-bone">{fact.value}</dd>
              </div>
            ))}
            <div>
              <dt className="t-label">Status</dt>
              <dd className="mt-2 flex items-center gap-2 text-sm font-medium text-bone">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {site.availability.open ? "Open" : "Booked"}
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
