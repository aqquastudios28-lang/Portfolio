import type { Metadata } from "next";
import { ContactCta } from "@/components/home/ContactCta";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { about, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — ${site.role}. Background, toolkit and how I work.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Container>
        <div className="flex items-baseline justify-between border-b border-rule pt-10 pb-4">
          <p className="t-label">About</p>
          <p className="t-label hidden sm:block">{site.role}</p>
        </div>

        <div className="py-12 sm:py-16">
          {/* Not lower-cased: it would mangle the UI/UX acronym. */}
          <h1 className="t-h1 max-w-[18ch]">
            {site.name}, {site.role}
          </h1>
        </div>

        <Reveal as="section" className="border-t border-rule py-12 sm:py-16">
          <div className="rail">
            <p className="t-label lg:pt-2">Background</p>
            <div className="max-w-[64ch] space-y-5">
              {about.bio.map((para, i) => (
                <p key={i} className={i === 0 ? "t-lead text-bone" : "t-body"}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="border-t border-rule py-12 sm:py-16">
          <div className="rail">
            <p className="t-label lg:pt-2">Toolkit</p>
            <div className="max-w-[64ch]">
              {about.toolkit.map((group) => (
                <div
                  key={group.group}
                  className="grid gap-3 border-b border-rule py-5 first:pt-0 last:border-0 sm:grid-cols-[8rem_1fr] sm:gap-8"
                >
                  <h2 className="t-h3">{group.group}</h2>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Chip>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="border-t border-rule py-12 sm:py-16">
          <div className="rail">
            <p className="t-label lg:pt-2">Path</p>
            <ol className="max-w-[64ch]">
              {about.timeline.map((entry) => (
                <li
                  key={entry.year}
                  className="grid gap-2 border-b border-rule py-5 first:pt-0 last:border-0 sm:grid-cols-[5rem_1fr] sm:gap-8"
                >
                  <span className="t-label sm:pt-1">{entry.year}</span>
                  <div>
                    <h3 className="t-h3">{entry.title}</h3>
                    <p className="t-body mt-1.5">{entry.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>

      <ContactCta />
    </>
  );
}
