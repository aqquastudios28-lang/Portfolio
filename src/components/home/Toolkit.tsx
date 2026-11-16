import { Container } from "@/components/ui/Container";
import { about, site } from "@/content/site";

/**
 * The principles are the argument; the toolkit is the evidence. Both sit in
 * one section so the page does not turn into a list of logos followed by a
 * list of adjectives.
 */
export function Toolkit() {
  return (
    <section className="border-t border-rule py-16 sm:py-24">
      <Container>
        <div className="sec-head">
          <h2 className="annot annot-bright">How I work</h2>
          <span className="sec-head__fill" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ol className="lg:col-span-7">
            {site.principles.map((principle, i) => (
              <li
                key={principle.title}
                className="grid gap-3 border-b border-rule-soft py-6 first:pt-0 last:border-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h3 text-paper">{principle.title}</h3>
                  <p className="t-body mt-2 text-sm">{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-4 lg:col-start-9">
            <span className="annot annot-bright">Toolkit</span>
            <dl className="mt-4">
              {about.toolkit.map((group) => (
                <div
                  key={group.group}
                  className="border-b border-rule-soft py-4 first:pt-0"
                >
                  <dt className="annot">{group.group}</dt>
                  <dd className="mt-2 font-mono text-xs leading-6 text-paper-2">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-mono text-[11px] leading-5 text-paper-3">
              Working from {site.location}. Everything on this site is a
              project that can be opened, run or read.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
