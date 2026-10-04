import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactCta } from "@/components/home/ContactCta";
import { about, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Background, developer experience and toolkit for ${site.name} — ${site.role}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-16">
      <Container>
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <span className="annot annot-bright">About</span>
          <span className="annot">Since {site.facts[1]?.value ?? "2022"}</span>
        </div>

        {/* Opening statement. The first bio paragraph set at display size — it
            is the strongest line on the page, so it is treated as one. */}
        <p className="t-h2 mt-12 max-w-4xl text-paper normal-case not-italic">{about.bio[0]}</p>

        <div className="mt-12 grid gap-10 border-t border-rule pt-10 sm:grid-cols-12 sm:gap-8">
          <span className="annot sm:col-span-3">Working notes</span>
          <div className="space-y-6 sm:col-span-9 sm:max-w-3xl">
            {about.bio.slice(1).map((para, i) => (
              <p key={i} className="t-body">
                {para}
              </p>
            ))}
          </div>
        </div>

        <section className="grid gap-10 border-t border-rule py-10 sm:grid-cols-12 sm:gap-8">
          <span className="annot sm:col-span-3">Toolkit</span>
          <div className="sm:col-span-9">
            {about.toolkit.map((group) => (
              <div
                key={group.group}
                className="grid gap-2 border-b border-rule-soft py-4 first:pt-0 last:border-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
              >
                <h3 className="t-h3 text-paper">{group.group}</h3>
                <p className="font-mono text-sm text-paper-2">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {about.developer.length > 0 && (
          <section className="grid gap-10 border-t border-rule py-10 sm:grid-cols-12 sm:gap-8">
            <h2 className="annot sm:col-span-3">Developer experience</h2>
            <ol className="sm:col-span-9 sm:max-w-3xl">
              {about.developer.map((entry) => (
                <li
                  key={`${entry.period}-${entry.title}`}
                  className="grid gap-2 border-b border-rule-soft py-5 first:pt-0 last:border-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="idx">{entry.period}</span>
                  <div>
                    <h3 className="t-h3 text-paper">{entry.title}</h3>
                    {entry.where && (
                      <p className="annot mt-1.5">{entry.where}</p>
                    )}
                    <p className="t-body mt-2 text-sm">{entry.detail}</p>
                    {entry.stack && entry.stack.length > 0 && (
                      <p className="mt-3 font-mono text-sm text-paper-2">
                        {entry.stack.join(" · ")}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="grid gap-10 border-t border-rule py-10 sm:grid-cols-12 sm:gap-8">
          <span className="annot sm:col-span-3">Timeline</span>
          <ol className="sm:col-span-9 sm:max-w-3xl">
            {about.timeline.map((entry) => (
              <li
                key={entry.year}
                className="grid gap-2 border-b border-rule-soft py-5 first:pt-0 last:border-0 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="idx">{entry.year}</span>
                <div>
                  <h3 className="t-h3 text-paper">{entry.title}</h3>
                  <p className="t-body mt-2 text-sm">{entry.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <ContactCta />
    </div>
  );
}
