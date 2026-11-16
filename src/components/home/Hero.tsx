import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { Plate } from "@/components/work/Plate";
import { Shot } from "@/components/work/Shot";
import { featuredCodeProjects } from "@/content/code-projects";
import { site } from "@/content/site";

/**
 * Opens on the statement. No status pill, no decorative divider, no scroll
 * animation — the page is just there when it loads, and the lead project
 * arrives uncropped instead of as a thumbnail in a sidebar.
 */
export function Hero() {
  const lead =
    featuredCodeProjects.find((project) => project.slug === "yappuccino") ??
    featuredCodeProjects[0];

  return (
    <section className="pt-14 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <h1>
          {site.headline.map((line, i) => (
            <span
              key={line}
              className={
                i === site.headline.length - 1
                  ? "t-display block text-accent"
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
          <div className="flex items-baseline justify-between gap-4 border-b border-rule-soft pb-3">
            <span className="annot annot-bright">Currently in beta</span>
            <span className="annot">{lead.status}</span>
          </div>

          <Link href={`/work/${lead.slug}`} className="group mt-6 block">
            {lead.cover ? (
              <Shot
                media={lead.cover}
                priority
                sizes="(max-width: 1280px) 100vw, 1248px"
              />
            ) : lead.plate ? (
              <Plate plate={lead.plate} />
            ) : null}

            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <div>
                <h2 className="t-h2 text-paper transition-colors group-hover:text-accent">
                  {lead.title}
                </h2>
                <p className="annot mt-2">
                  30 MB idle &nbsp;·&nbsp; 0.22 s launch &nbsp;·&nbsp; no browser
                  engine
                </p>
              </div>
              <p className="t-body max-w-lg flex-1 text-sm sm:text-right">
                {lead.summary}
              </p>
            </div>

            <span className="annot mt-5 inline-flex items-center gap-2 text-paper transition-colors group-hover:text-accent">
              Read case study
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </Link>
        </Container>
      ) : null}
    </section>
  );
}
