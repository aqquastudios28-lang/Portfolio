import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PlateZoom } from "@/components/work/PlateZoom";
import {
  getNextProject,
  getProject,
  publishedProjects,
} from "@/content/projects";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found" };

  return {
    title: `${project.title} — Roblox UI Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — Roblox UI Case Study`,
      description: project.summary,
      images: project.cover.src ? [project.cover.src] : undefined,
    },
  };
}

/** Label in the margin, prose in the column. Used for every body section. */
function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-rule py-10 sm:grid-cols-12 sm:gap-8">
      <h2 className="annot sm:col-span-3">{label}</h2>
      <div className="sm:col-span-9 sm:max-w-3xl">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getNextProject(slug);
  const index = publishedProjects.findIndex((p) => p.slug === slug);

  const url = `${site.url}/work/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: project.title,
        headline: `${project.title} — Roblox UI Case Study`,
        description: project.summary,
        genre: project.category,
        dateCreated: project.year,
        image: project.cover.src ? `${site.url}${project.cover.src}` : undefined,
        creator: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${site.url}/work`,
          },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <article className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <Link
            href="/work"
            className="group annot inline-flex items-center gap-2 transition-colors hover:text-paper"
          >
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:-translate-x-1"
            >
              &larr;
            </span>
            Work index
          </Link>
          <span className="annot">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(publishedProjects.length).padStart(2, "0")} —{" "}
            {project.category}
          </span>
        </div>

        <header className="pt-12 pb-10">
          <h1 className="t-h1 max-w-4xl text-paper">{project.title}</h1>
          <p className="t-lead mt-5 max-w-2xl">{project.summary}</p>
        </header>
      </Container>

      <Container>
        {project.cover.src ? (
          <PlateZoom
            src={project.cover.src}
            alt={project.cover.alt}
            tag={project.category}
          />
        ) : (
          <div className="frame flex aspect-[16/9] items-center justify-center">
            <span className="annot">No screenshot</span>
          </div>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          <div>
            <dt className="annot">Role</dt>
            <dd className="mt-1.5 text-sm text-paper">{project.role}</dd>
          </div>
          <div>
            <dt className="annot">Year</dt>
            <dd className="mt-1.5 font-mono text-sm text-paper">
              {project.year}
            </dd>
          </div>
          <div>
            <dt className="annot">Type</dt>
            <dd className="mt-1.5 text-sm text-paper">{project.category}</dd>
          </div>
          <div>
            <dt className="annot">Tools</dt>
            <dd className="mt-1.5 text-sm text-paper">
              {project.tools.join(", ")}
            </dd>
          </div>
        </dl>
      </Container>

      <Container>
        <div className="mt-16">
          <Section label="Overview">
            <p className="text-base leading-relaxed text-paper">
              {project.overview}
            </p>
          </Section>

          <Section label="The problem">
            <p className="t-body">{project.problem}</p>
          </Section>

          {project.process.length > 0 && (
            <Section label="Process">
              <ol className="space-y-0">
                {project.process.map((step, i) => (
                  <li
                    key={step.title}
                    className="grid gap-2 border-b border-rule-soft py-5 first:pt-0 last:border-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="t-h3 text-paper">{step.title}</h3>
                      <p className="t-body mt-2 text-sm">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          <Section label="Solution">
            <p className="text-base leading-relaxed text-paper">
              {project.solution}
            </p>
            {project.outcome && (
              <p className="t-body mt-6 rounded-r-[18px] border-l-4 border-accent pl-5 text-sm">
                {project.outcome}
              </p>
            )}
          </Section>

          {project.metrics.length > 0 && (
            <Section label="Spec">
              <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-t border-rule-soft py-4 sm:border-t-0 sm:py-0"
                  >
                    <dd className="font-display text-2xl font-semibold tracking-tight text-paper">
                      {metric.value}
                    </dd>
                    <dt className="annot mt-2">{metric.label}</dt>
                  </div>
                ))}
              </dl>
            </Section>
          )}
        </div>

        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="group mt-10 grid items-center gap-4 border-t border-rule pt-8 sm:grid-cols-12 sm:gap-8"
          >
            <span className="annot sm:col-span-3">Next screen</span>
            <div className="sm:col-span-6">
              <h2 className="t-h2 text-paper transition-colors group-hover:text-accent">
                {next.title}
              </h2>
              <p className="t-body mt-2 text-sm">{next.summary}</p>
            </div>
            <span className="annot sm:col-span-3 sm:text-right">
              {next.category}
              <span
                aria-hidden
                className="ml-3 inline-block transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </Link>
        )}
      </Container>
    </article>
  );
}
