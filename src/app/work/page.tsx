"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { publishedProjects } from "@/content/projects";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Menus", "Shops", "Economy", "HUD"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = publishedProjects.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Menus") return p.category.toLowerCase().includes("menu");
    if (activeCategory === "Shops") return p.category.toLowerCase().includes("shop");
    if (activeCategory === "Economy") return p.category.toLowerCase().includes("economy");
    if (activeCategory === "HUD") return p.category.toLowerCase().includes("hud") || p.category.toLowerCase().includes("popup");
    return true;
  });

  return (
    <div className="py-12 sm:py-20">
      <Container>
        {/* Header */}
        <BlurFade delay={0.05}>
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
                Work Index
              </span>
              <h1 className="t-h1 mt-2 text-white">Roblox Interface Archive</h1>
              <p className="t-lead mt-2 max-w-2xl">
                Menus, shops, HUD overlays, and game economies built and tested for Roblox Studio.
              </p>
            </div>

            {/* View Toggles */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  viewMode === "grid"
                    ? "bg-white/15 text-white border border-white/20"
                    : "text-text-muted hover:text-white"
                )}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  viewMode === "list"
                    ? "bg-white/15 text-white border border-white/20"
                    : "text-text-muted hover:text-white"
                )}
              >
                List
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Filter Pills */}
        <BlurFade delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-all",
                  activeCategory === cat
                    ? "bg-white text-black font-semibold shadow-md"
                    : "border border-white/10 bg-white/[0.02] text-text-muted hover:text-white hover:border-white/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </BlurFade>

        {/* Work Grid or List */}
        {viewMode === "grid" ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => (
              <BlurFade key={project.slug} delay={0.1 + idx * 0.05} inView>
                <Link
                  href={`/work/${project.slug}`}
                  className="group block h-full"
                >
                  <SpotlightCard className="flex h-full flex-col justify-between p-5">
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[4/3] w-full flex items-center justify-center p-1">
                        {project.cover.src ? (
                          <Image
                            src={project.cover.src}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : null}
                        <div className="absolute top-1 left-1 rounded-md bg-black/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
                          {project.category}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-base font-bold text-white transition-colors group-hover:text-text-muted">
                            {project.title}
                          </h3>
                          <span className="font-mono text-xs text-text-dim">
                            {project.year}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-2">
                          {project.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-mono text-xs text-text-dim">
                        {project.role}
                      </span>
                      <span className="font-mono text-xs text-white">
                        View &rarr;
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {filtered.map((project, idx) => (
              <BlurFade key={project.slug} delay={0.08 + idx * 0.04} inView>
                <Link
                  href={`/work/${project.slug}`}
                  className="group block"
                >
                  <SpotlightCard className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-24 flex-shrink-0 flex items-center justify-center">
                        {project.cover.src ? (
                          <Image
                            src={project.cover.src}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-contain drop-shadow"
                          />
                        ) : null}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-display text-base font-bold text-white group-hover:text-text-muted">
                            {project.title}
                          </h3>
                          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase text-text-dim">
                            {project.category}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-text-muted line-clamp-1">
                          {project.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <span className="font-mono text-xs text-text-dim">{project.year}</span>
                      <span className="font-mono text-xs text-white">
                        Case Study &rarr;
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </BlurFade>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
