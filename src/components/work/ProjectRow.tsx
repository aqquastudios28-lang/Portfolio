import Link from "next/link";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/content/types";

/**
 * One line of the work index. Numbered, rule-separated, metadata in the
 * left rail — an index page rather than a grid of cards.
 *
 * The thumbnail is always rendered, never revealed on hover: a hover-only
 * image is invisible on touch, and the work is the point.
 */
export function ProjectRow({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  return (
    <Reveal as="li" delay={index * 40} className="border-b border-rule">
      <Link
        href={`/work/${project.slug}`}
        className="group grid gap-5 py-8 sm:py-10 lg:grid-cols-[3rem_1fr_18rem] lg:gap-10"
      >
        <span className="t-label hidden lg:block lg:pt-1.5">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="lg:order-2">
          <MediaFrame
            media={project.cover}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 18rem"
            dropPath={`/media/projects/${project.slug}/cover.png`}
            allowLightbox={false}
          />
        </div>

        <div className="lg:order-1 lg:pt-1">
          <div className="mb-3 flex items-center gap-3 lg:hidden">
            <span className="t-label">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden className="h-px flex-1 bg-rule" />
          </div>

          <h3 className="t-h2 transition-colors group-hover:text-accent">
            {project.title}
          </h3>

          <p className="t-body mt-3 max-w-[52ch]">{project.summary}</p>

          <p className="t-label mt-5">
            {project.category}
            <span className="mx-2 text-bone-faint" aria-hidden>
              /
            </span>
            {project.year}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
