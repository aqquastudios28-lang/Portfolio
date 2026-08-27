import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { featuredProjects } from "@/content/projects";

/**
 * Featured work at full width. Metadata sits in the left rail, the media
 * runs wide, and the rule above each block carries the index — the same
 * structure the case studies use, so the site reads as one document.
 */
export function SelectedWork() {
  if (featuredProjects.length === 0) return null;

  return (
    <section className="pb-8">
      <Container>
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <h2 className="t-label">Selected work</h2>
          <Link
            href="/work"
            className="t-label transition-colors hover:text-accent"
          >
            Index
          </Link>
        </div>

        <div>
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} className="border-b border-rule py-12 sm:py-16">
              <Link href={`/work/${project.slug}`} className="group block rail">
                <div className="flex items-baseline gap-4 lg:block">
                  <span className="t-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-label lg:mt-3 lg:block">
                    {project.year}
                  </span>
                </div>

                <div>
                  <h3 className="t-h1 max-w-[20ch] transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>

                  <p className="t-lead mt-5 max-w-[52ch]">{project.summary}</p>

                  <div className="mt-8">
                    <MediaFrame
                      media={project.cover}
                      priority={i === 0}
                      sizes="(max-width: 1024px) 100vw, 60rem"
                      dropPath={`/media/projects/${project.slug}/cover.png`}
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
