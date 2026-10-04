import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { publishedProjects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Opens on the statement. No status pill, no decorative divider, no scroll
 * animation — the page is just there when it loads, and the first screenshot
 * arrives at full width instead of as a thumbnail in a sidebar.
 */
export function Hero() {
  const lead = publishedProjects[0];

  return (
    <section className="pt-14 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <span className="spooky pill pill-accent mb-7">Halloween edition</span>
        <h1>
          {site.headline.map((line, i) => (
            <span
              key={line}
              className={
                i === site.headline.length - 1
                  ? "t-display t-grad block w-fit"
                  : "t-display block text-paper"
              }
            >
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="t-lead max-w-2xl">{site.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/work" className="btn">
                See the work
                <span aria-hidden>&rarr;</span>
              </Link>
              <CopyButton text={site.email} label="Copy email" />
            </div>
          </div>

          <dl className="lg:pt-1.5">
            {site.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-b border-rule-soft py-3 first:pt-0 last:border-0"
              >
                <dt className="annot">{fact.label}</dt>
                <dd className="stat__value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {lead ? (
        <Container className="mt-16 sm:mt-24">
          <Link href={`/work/${lead.slug}`} className="group block">
            <div className="relative">
              <span className="slot-tag">{lead.category}</span>
              <div className="frame aspect-[16/9]">
                <Image
                  src={lead.cover.src}
                  alt={lead.cover.alt}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1280px) 100vw, 1248px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <h2 className="t-h2 text-paper transition-colors group-hover:text-accent">
                {lead.title}
              </h2>
              <p className="t-body max-w-lg flex-1 text-sm sm:text-right">
                {lead.summary}
              </p>
            </div>
          </Link>
        </Container>
      ) : null}
    </section>
  );
}
