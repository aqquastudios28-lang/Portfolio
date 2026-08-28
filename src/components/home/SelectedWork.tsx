"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { publishedProjects } from "@/content/projects";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Menus", "Shops", "Economy", "HUD"];

export function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = publishedProjects.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Menus") return p.category.toLowerCase().includes("menu");
    if (activeCategory === "Shops") return p.category.toLowerCase().includes("shop");
    if (activeCategory === "Economy") return p.category.toLowerCase().includes("economy");
    if (activeCategory === "HUD") return p.category.toLowerCase().includes("hud") || p.category.toLowerCase().includes("popup");
    return true;
  });

  return (
    <section className="py-16 sm:py-24 border-t border-white/10">
      <Container>
        {/* Section Header */}
        <BlurFade delay={0.05}>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
                Featured Work
              </span>
              <h2 className="t-h1 mt-2 text-white">Selected Interfaces</h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 rounded-full border border-white/10 bg-white/[0.02] p-1 backdrop-blur-md">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-1 text-xs font-medium transition-all",
                    activeCategory === cat
                      ? "bg-white/15 text-white shadow-sm border border-white/20"
                      : "text-text-muted hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Project Grid with BlurFade Stagger */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, idx) => (
            <BlurFade key={project.slug} delay={0.1 + idx * 0.06} inView>
              <Link
                href={`/work/${project.slug}`}
                className="group block h-full"
              >
                <SpotlightCard className="relative flex h-full flex-col justify-between p-5">
                  {idx === 0 && <BorderBeam size={180} duration={8} colorFrom="#ffffff" colorTo="transparent" />}

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

                    {/* Title & Info */}
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

                  {/* Footer Tools */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, 2).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-text-dim"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <span className="font-mono text-xs text-white transition-transform group-hover:translate-x-1">
                      Read Case Study &rarr;
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  );
}
