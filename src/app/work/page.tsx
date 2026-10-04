"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Shot } from "@/components/work/Shot";
import { publishedProjects } from "@/content/projects";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Menus", "Shops", "Economy", "HUD"] as const;

function matches(category: string, filter: string) {
  const c = category.toLowerCase();
  if (filter === "All") return true;
  if (filter === "Menus") return c.includes("menu");
  if (filter === "Shops") return c.includes("shop");
  if (filter === "Economy") return c.includes("economy");
  if (filter === "HUD") return c.includes("hud") || c.includes("popup");
  return true;
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"plates" | "index">("plates");

  const filtered = publishedProjects.filter((p) =>
    matches(p.category, activeCategory),
  );

  return (
    <div className="py-10 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-3">
          <span className="annot annot-bright">Work index</span>
          <span className="annot">
            {filtered.length} of {publishedProjects.length} screens
          </span>
        </div>

        <h1 className="t-h1 mt-10 max-w-3xl text-paper">
          Every screen, documented.
        </h1>
        <p className="t-lead mt-4 max-w-xl">
          Menus, shops, HUD overlays and economies, built and tested in Roblox
          Studio. Each one has the reasoning written up next to it.
        </p>

        {/* Controls. Chunky pills that press, same family as the buttons. */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const count = publishedProjects.filter((p) =>
                matches(p.category, cat),
              ).length;
              const active = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className={cn(
                    "pill cursor-pointer transition-colors",
                    active
                      ? "pill-accent"
                      : "hover:border-paper-3 hover:text-paper",
                  )}
                >
                  {cat}
                  <span
                    className={cn(
                      "text-[0.5625rem]",
                      active ? "text-accent-ink/70" : "text-paper-3",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {(["plates", "index"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
                className={cn(
                  "pill cursor-pointer transition-colors",
                  viewMode === mode
                    ? "border-accent text-paper"
                    : "hover:border-paper-3 hover:text-paper",
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "plates" ? (
          <div className="mt-10 grid items-start gap-x-8 gap-y-16 sm:grid-cols-2">
            {filtered.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block"
              >
                <Shot
                  media={project.cover}
                  sizes="(max-width: 640px) 100vw, 600px"
                />

                <p className="annot mt-5">{project.category}</p>
                <h2 className="t-h3 mt-1.5 text-paper transition-colors group-hover:text-accent">
                  {project.title}
                </h2>
                <p className="t-body mt-2 max-w-md text-sm">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            {filtered.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-rule-soft py-5 sm:grid-cols-[minmax(0,1fr)_10rem_9rem_4rem] sm:gap-6"
              >
                <span className="t-h3 text-paper transition-colors group-hover:text-accent">
                  {project.title}
                </span>
                <span className="annot hidden sm:block">
                  {project.category}
                </span>
                <span className="annot hidden truncate sm:block">
                  {project.tools.join(", ")}
                </span>
                <span className="annot text-right">{project.year}</span>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="t-body mt-12 border-t border-rule pt-6">
            No screens in this category yet.
          </p>
        )}
      </Container>
    </div>
  );
}
