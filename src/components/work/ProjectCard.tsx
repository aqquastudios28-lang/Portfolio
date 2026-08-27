import Link from "next/link";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { Project } from "@/content/types";

export function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  return (
    <div className="group relative flex flex-col justify-between border border-rule bg-ink-2/30 p-6 sm:p-8 transition-all duration-300 hover:border-rule-strong hover:bg-ink-2/60 hover:shadow-2xl hover:shadow-accent/5">
      {/* Top Header info */}
      <div>
        <div className="flex items-center justify-between border-b border-rule/50 pb-3">
          <span className="font-mono text-[11px] text-bone-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80">
            {project.category}
          </span>
        </div>

        <Link href={`/work/${project.slug}`} className="block mt-4">
          <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-bone-dim line-clamp-2">
            {project.summary}
          </p>
        </Link>
      </div>

      {/* Media frame */}
      <div className="mt-6 mb-6 flex-1 flex items-center justify-center">
        <Link href={`/work/${project.slug}`} className="w-full">
          <MediaFrame
            media={project.cover}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            dropPath={`/media/projects/${project.slug}/cover.png`}
          />
        </Link>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between border-t border-rule/50 pt-4">
        <span className="font-mono text-[11px] text-bone-faint">
          {project.year}
        </span>
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-bone-dim transition-colors group-hover:text-accent"
        >
          <span>Case Study</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
