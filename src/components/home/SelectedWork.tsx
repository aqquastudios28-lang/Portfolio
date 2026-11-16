import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Plate } from "@/components/work/Plate";
import { Shot } from "@/components/work/Shot";
import {
  alsoBuilt,
  featuredCodeProjects,
  publishedCodeProjects,
} from "@/content/code-projects";

/**
 * A selection, not the index — the full filterable list lives on /work, so
 * these rows get real size instead of becoming thumbnails. Yappuccino is the
 * lead in the hero, so it is not repeated here.
 */
export function SelectedWork() {
  const selection = featuredCodeProjects.filter(
    (project) => project.slug !== "yappuccino",
  );
  const moreCases = publishedCodeProjects.filter((project) => !project.featured);

  const rest = [
    ...moreCases.map((project) => ({
      title: project.title,
      body: project.summary,
      year: project.year,
      href: `/work/${project.slug}`,
      external: false,
      kind: "Case study",
    })),
    ...alsoBuilt.map((project) => ({
      title: project.title,
      body: project.body,
      year: project.year,
      href: project.href,
      external: true,
      kind: "Repository",
    })),
  ];

  return (
    <section className="border-t border-rule py-16 sm:py-24">
      <Container>
        <div className="sec-head">
          <h2 className="annot annot-bright">Selected engineering work</h2>
          <span className="sec-head__fill" />
          <Link href="/work" className="annot transition-colors hover:text-paper">
            All {publishedCodeProjects.length} &rarr;
          </Link>
        </div>

        <div className="mt-14 space-y-20 sm:space-y-28">
          {selection.map((project, i) => {
            const flipped = i % 2 === 1;

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block"
              >
                <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={
                      flipped
                        ? "lg:col-span-7 lg:col-start-6 lg:row-start-1"
                        : "lg:col-span-7"
                    }
                  >
                    {project.cover ? (
                      <Shot
                        media={project.cover}
                        sizes="(max-width: 1024px) 100vw, 700px"
                      />
                    ) : project.plate ? (
                      <Plate plate={project.plate} compact />
                    ) : null}
                  </div>

                  <div
                    className={
                      flipped
                        ? "lg:col-span-4 lg:col-start-1 lg:row-start-1"
                        : "lg:col-span-4 lg:col-start-9"
                    }
                  >
                    <p className="annot">
                      {project.kind} &nbsp;·&nbsp; {project.language} &nbsp;·&nbsp;{" "}
                      {project.year}
                    </p>
                    <h3 className="t-h2 mt-2 text-paper transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>

                    <p className="t-body mt-4">{project.summary}</p>

                    <p className="annot mt-6">{project.stack.join(" · ")}</p>

                    <span className="annot mt-6 inline-flex items-center gap-2 text-paper transition-colors group-hover:text-accent">
                      Read case study
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {rest.length > 0 && (
          <div className="mt-24">
            <div className="sec-head">
              <h2 className="annot annot-bright">Also built</h2>
              <span className="sec-head__fill" />
            </div>

            <ul className="mt-4">
              {rest.map((project) => (
                <li key={project.title}>
                  {project.external ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group grid items-baseline gap-2 border-b border-rule-soft py-5 sm:grid-cols-[minmax(0,1fr)_8rem_4rem_1.5rem] sm:gap-6"
                    >
                      <div>
                        <span className="t-h3 text-paper transition-colors group-hover:text-accent">
                          {project.title}
                        </span>
                        <p className="t-body mt-2 max-w-2xl text-sm">
                          {project.body}
                        </p>
                      </div>
                      <span className="annot hidden sm:block">
                        {project.kind}
                      </span>
                      <span className="annot sm:text-right">{project.year}</span>
                      <span
                        aria-hidden
                        className="annot hidden text-right text-paper-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
                      >
                        &#8599;
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={project.href}
                      className="group grid items-baseline gap-2 border-b border-rule-soft py-5 sm:grid-cols-[minmax(0,1fr)_8rem_4rem_1.5rem] sm:gap-6"
                    >
                      <div>
                        <span className="t-h3 text-paper transition-colors group-hover:text-accent">
                          {project.title}
                        </span>
                        <p className="t-body mt-2 max-w-2xl text-sm">
                          {project.body}
                        </p>
                      </div>
                      <span className="annot hidden sm:block">
                        {project.kind}
                      </span>
                      <span className="annot sm:text-right">{project.year}</span>
                      <span
                        aria-hidden
                        className="annot hidden text-right text-paper-3 transition-transform duration-300 group-hover:translate-x-1 sm:block"
                      >
                        &rarr;
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
