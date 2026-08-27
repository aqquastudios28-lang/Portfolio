"use client";

import { useMemo, useState } from "react";
import { ProjectRow } from "@/components/work/ProjectRow";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export function WorkGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  return (
    <>
      {categories.length > 2 ? (
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-rule pb-4"
        >
          {categories.map((cat) => {
            const on = cat === active;
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => setActive(cat)}
                className={cn(
                  "t-label border-b py-0.5 transition-colors",
                  on
                    ? "border-bone text-bone"
                    : "border-transparent hover:border-accent hover:text-bone",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      ) : null}

      <ul>
        {visible.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            priority={i < 2}
          />
        ))}
      </ul>

      <p aria-live="polite" className="sr-only">
        {visible.length} project{visible.length === 1 ? "" : "s"} shown
      </p>

      {visible.length === 0 ? (
        <p className="t-body py-20">Nothing in this category yet.</p>
      ) : null}
    </>
  );
}
