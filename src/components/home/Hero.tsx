import { Container } from "@/components/ui/Container";
import { publishedProjects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Cover page, not a landing hero. No glow, no gradient, no coloured
 * punctuation — the structure does the work: a running head, a rule, the
 * statement at full width, then the facts in a metadata row.
 *
 * Every fact here comes from site.ts. Nothing about you is asserted in
 * markup.
 */
export function Hero() {
  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-24">
      <Container>
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <p className="t-label">{site.role}</p>
          <p className="t-label hidden sm:block">
            {String(publishedProjects.length).padStart(2, "0")} projects
          </p>
        </div>

        <h1 className="t-display mt-10 max-w-[15ch] sm:mt-14">
          {site.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-14 grid gap-10 border-t border-rule pt-8 sm:mt-20 md:grid-cols-[1fr_auto] md:gap-16">
          <p className="t-lead max-w-[46ch]">{site.intro}</p>

          <dl className="grid grid-cols-2 gap-x-12 gap-y-6 sm:grid-cols-4 md:gap-x-14">
            {site.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="t-label">{fact.label}</dt>
                <dd className="mt-2 text-sm text-bone">{fact.value}</dd>
              </div>
            ))}
            <div>
              <dt className="t-label">Status</dt>
              <dd className="mt-2 text-sm text-bone">
                {site.availability.open ? "Open" : "Booked"}
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
