import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { legal, type LegalSection } from "@/content/legal";

const LEGAL_NAV = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/terms", label: "Terms" },
];

/**
 * Shared shell for the three legal pages. Long-form reading, so the measure is
 * kept narrow and the section labels sit in the margin.
 */
export function LegalPage({
  title,
  current,
  intro,
  sections,
}: {
  title: string;
  current: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="py-10 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="annot annot-bright">Legal</span>
          <span className="annot">Last reviewed {legal.updated}</span>
        </div>

        <h1 className="t-h1 mt-10 max-w-3xl text-paper">{title}</h1>
        <p className="t-lead mt-5 max-w-2xl">{intro}</p>

        <nav aria-label="Legal pages" className="mt-8 flex flex-wrap gap-2">
          {LEGAL_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
              className={
                item.href === current
                  ? "pill pill-accent"
                  : "pill transition-colors hover:border-paper-3 hover:text-paper"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-14">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="grid gap-4 border-t border-rule py-10 sm:grid-cols-12 sm:gap-8"
            >
              <h2 className="annot sm:col-span-3">{section.heading}</h2>

              <div className="sm:col-span-9 sm:max-w-2xl">
                <div className="space-y-4">
                  {section.body.map((para, i) => (
                    <p key={i} className="t-body">
                      {para}
                    </p>
                  ))}
                </div>

                {section.rows && (
                  <dl className="mt-6">
                    {section.rows.map((row) => (
                      <div
                        key={row.term}
                        className="grid gap-1.5 border-b border-rule-soft py-4 last:border-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                      >
                        <dt className="annot sm:pt-0.5">{row.term}</dt>
                        <dd className="t-body text-sm">{row.detail}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="border-t border-rule pt-8">
          <p className="t-body max-w-2xl text-sm">
            Questions about any of this, or want something deleted? Email{" "}
            <Link href="/contact" className="link-rule">
              the address on the contact page
            </Link>{" "}
            and it will be handled.
          </p>
        </div>
      </Container>
    </div>
  );
}
