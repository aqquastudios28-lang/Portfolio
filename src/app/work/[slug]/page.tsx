import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Plate } from "@/components/work/Plate";
import { PlateZoom } from "@/components/work/PlateZoom";
import {
  getCodeProject,
  getNextCodeProject,
  publishedCodeProjects,
} from "@/content/code-projects";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedCodeProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getCodeProject(slug);

  if (!project) return { title: "Not found" };

  const title = `${project.title} — ${project.kind} case study`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      images: project.cover?.src ? [project.cover.src] : undefined,
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

export default async function CodeCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getCodeProject(slug);

  if (!project) notFound();

  const next = getNextCodeProject(slug);
  const index = publishedCodeProjects.findIndex((p) => p.slug === slug);

  const url = `${site.url}/work/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#software`,
        url,
        name: project.title,
        description: project.summary,
        codeRepository: project.repo,
        programmingLanguage: project.language,
        dateCreated: project.year,
        genre: project.kind,
        author: { "@id": `${site.url}/#person` },
        image: project.cover?.src ? `${site.url}${project.cover.src}` : undefined,
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
            Engineering index
          </Link>
          <span className="annot">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(publishedCodeProjects.length).padStart(2, "0")} —{" "}
            {project.kind}
          </span>
        </div>

        <header className="pt-12 pb-10">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="annot annot-bright">{project.language}</span>
            <span className="annot">{project.year}</span>
            <span className="annot">{project.status}</span>
          </div>

          <h1 className="t-h1 mt-5 max-w-4xl text-paper">{project.title}</h1>
          <p className="t-lead mt-5 max-w-2xl">{project.summary}</p>

          {(project.repo || project.site) && (
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule-soft pt-5">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-rule inline-flex items-center gap-2 text-sm"
                >
                  Repository
                  <span aria-hidden>&#8599;</span>
                </a>
              )}
              {project.site && (
                <a
                  href={project.site}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-rule inline-flex items-center gap-2 text-sm"
                >
                  Live site
                  <span aria-hidden>&#8599;</span>
                </a>
              )}
            </div>
          )}
        </header>
      </Container>

      <Container>
        {project.cover ? (
          <PlateZoom media={project.cover} />
        ) : project.plate ? (
          <Plate plate={project.plate} />
        ) : (
          <div className="frame flex aspect-[16/9] items-center justify-center">
            <span className="annot">No screenshot</span>
          </div>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 border-b border-rule pb-6 sm:grid-cols-4">
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
            <dt className="annot">Language</dt>
            <dd className="mt-1.5 text-sm text-paper">{project.language}</dd>
          </div>
          <div>
            <dt className="annot">Status</dt>
            <dd className="mt-1.5 text-sm text-paper">{project.status}</dd>
          </div>
        </dl>

        <p className="mt-4 font-mono text-xs leading-6 text-paper-3">
          <span className="text-paper-2">Stack — </span>
          {project.stack.join(" · ")}
        </p>

        {project.note && (
          <p className="mt-4 max-w-3xl border-l-2 border-accent/40 pl-4 font-mono text-xs leading-6 text-paper-3">
            {project.note}
          </p>
        )}

        {project.metrics.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-rule py-8 lg:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dd className="font-display text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                  {metric.value}
                </dd>
                <dt className="annot mt-2">{metric.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </Container>

      <Container>
        <div className="mt-12">
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

          <Section label="How it is built">
            <ol className="space-y-0">
              {project.architecture.map((part, i) => (
                <li
                  key={part.title}
                  className="grid gap-2 border-b border-rule-soft py-5 first:pt-0 last:border-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="t-h3 text-paper">{part.title}</h3>
                    <p className="t-body mt-2 text-sm">{part.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {project.gallery.length > 0 && (
            <Section label="Screens">
              <div className="grid gap-8 sm:grid-cols-2">
                {project.gallery.map((media, i) => (
                  <figure
                    key={media.src}
                    className={i === 0 ? "sm:col-span-2" : undefined}
                  >
                    {media.src ? (
                      <PlateZoom media={media} />
                    ) : (
                      <div className="frame flex aspect-[16/9] items-center justify-center">
                        <span className="annot">No screenshot</span>
                      </div>
                    )}
                    {media.caption && (
                      <figcaption className="annot mt-3 normal-case tracking-normal">
                        {media.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Section>
          )}

          <Section label="Outcome">
            <p className="text-base leading-relaxed text-paper">
              {project.outcome}
            </p>
          </Section>
        </div>

        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="group mt-10 grid items-center gap-4 border-t border-rule pt-8 sm:grid-cols-12 sm:gap-8"
          >
            <span className="annot sm:col-span-3">Next project</span>
            <div className="sm:col-span-6">
              <h2 className="t-h2 text-paper transition-colors group-hover:text-accent">
                {next.title}
              </h2>
              <p className="t-body mt-2 text-sm">{next.summary}</p>
            </div>
            <span className="annot sm:col-span-3 sm:text-right">
              {next.kind}
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
