"use client";

import { useMemo, useState } from "react";
import { ProjectRow } from "@/components/work/ProjectRow";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export function WorkGrid({
  projects,
}: {
  projects: Project[];
  categories?: string[];
}) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const visible = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tools.some((t) => t.toLowerCase().includes(q)),
    );
  }, [search, projects]);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & View Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-rule pb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-bone-faint"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search UI frames, systems, tools..."
            className="w-full border border-rule bg-ink-2/60 py-2 pl-9 pr-4 text-xs font-mono text-bone placeholder:text-bone-faint focus:border-accent focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bone-faint hover:text-bone text-xs"
            >
              &times;
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-bone-faint uppercase mr-2 hidden sm:inline">
            View:
          </span>
          <div className="flex border border-rule bg-ink-2/40 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-colors",
                viewMode === "grid"
                  ? "bg-accent text-ink font-semibold"
                  : "text-bone-dim hover:text-bone",
              )}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-colors",
                viewMode === "list"
                  ? "bg-accent text-ink font-semibold"
                  : "text-bone-dim hover:text-bone",
              )}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List rendering */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              priority={i < 3}
            />
          ))}
        </div>
      ) : (
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
      )}

      {visible.length === 0 && (
        <div className="border border-dashed border-rule py-16 text-center">
          <p className="font-mono text-sm text-bone-dim">
            No UI frames match &ldquo;{search}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-3 text-xs font-mono uppercase text-accent hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
