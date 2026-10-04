import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Shot } from "@/components/work/Shot";
import { publishedProjects } from "@/content/projects";

/**
 * A selection, not the index — the full filterable list lives on /work, so
 * these four get real size instead of becoming thumbnails. Rows alternate side,
 * and each screenshot keeps its own proportions, so no two rows match.
 */
export function SelectedWork() {
  const selection = publishedProjects.slice(1, 5);
  const rest = publishedProjects.slice(5);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="sec-head">
          <h2 className="annot annot-bright">Selected work</h2>
          <span className="sec-head__fill" />
          <Link href="/work" className="annot transition-colors hover:text-paper">
            All {publishedProjects.length} &rarr;
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
                    <Shot
                      media={project.cover}
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                  </div>

                  <div
                    className={
                      flipped
                        ? "lg:col-span-4 lg:col-start-1 lg:row-start-1"
                        : "lg:col-span-4 lg:col-start-9"
                    }
                  >
                    <p className="annot">{project.category}</p>
                    <h3 className="t-h2 mt-2 text-paper transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>

                    <p className="t-body mt-4">{project.summary}</p>

                    <p className="annot mt-6">{project.tools.join(" · ")}</p>

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
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group flex items-baseline gap-4 border-b border-rule-soft py-5 sm:gap-8"
                  >
                    <span className="t-h3 flex-1 text-paper transition-colors group-hover:text-accent">
                      {project.title}
                    </span>
                    <span className="annot hidden sm:block">
                      {project.category}
                    </span>
                    <span
                      aria-hidden
                      className="annot text-paper-3 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
