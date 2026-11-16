import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Shot } from "@/components/work/Shot";
import { publishedProjects } from "@/content/projects";

/**
 * The design work is real and documented, but it is not the thesis of this
 * site. Three screens and a link — enough to prove the range without turning
 * the homepage back into a Roblox portfolio.
 */
export function DesignTeaser() {
  const selection = publishedProjects.slice(0, 3);

  return (
    <section className="border-t border-rule py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="sec-head">
              <h2 className="annot annot-bright">Interface archive</h2>
              <span className="sec-head__fill" />
            </div>

            <h3 className="t-h2 mt-4 text-paper">
              The other half
              <br />
              of the job.
            </h3>
            <p className="t-body mt-4 max-w-sm">
              The Roblox screens are where the interface work started: menus,
              shops, HUDs and economies, designed and built in Studio. They are
              kept as a separate archive so the engineering work stays in
              front.
            </p>

            <Link
              href="/design"
              className="annot mt-7 inline-flex items-center gap-2 text-paper transition-colors hover:text-accent"
            >
              Open the archive
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
            {selection.map((project) => (
              <Link
                key={project.slug}
                href={`/design/${project.slug}`}
                className="group block"
              >
                <Shot
                  media={project.cover}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 260px"
                  className="border border-rule-soft transition-colors group-hover:border-paper-3"
                />
                <p className="annot mt-3">
                  {project.category} · {project.year}
                </p>
                <p className="t-h3 mt-1 text-paper transition-colors group-hover:text-accent">
                  {project.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
