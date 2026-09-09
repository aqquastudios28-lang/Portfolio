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
    <section className="py-16 sm:py-24">
      <Container>
        <div className="section-frame overflow-hidden p-5 sm:p-7 lg:p-8">
          <BlurFade delay={0.05}>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-2xl">
                <span className="section-kicker">Featured work</span>
                <h2 className="t-h1 mt-3 text-white">Selected Interfaces</h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-text-muted">
                  Live economy, shop and HUD surfaces built to be glanced, tapped
                  and understood fast on mobile.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-all",
                      activeCategory === cat
                        ? "border border-white/20 bg-white/14 text-white shadow-[0_10px_24px_-20px_rgba(255,255,255,0.9)]"
                        : "text-text-dim hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </BlurFade>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => (
              <BlurFade key={project.slug} delay={0.1 + idx * 0.05} inView>
                <Link
                  href={`/work/${project.slug}`}
                  className={cn(
                    "group block h-full",
                    idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  )}
                >
                  <SpotlightCard
                    className={cn(
                      "relative flex h-full flex-col justify-between overflow-hidden p-5 sm:p-6",
                      idx === 0 ? "min-h-[30rem]" : "min-h-[24rem]"
                    )}
                  >
                    {idx === 0 && (
                      <BorderBeam
                        size={220}
                        duration={8}
                        colorFrom="rgba(112,225,255,0.9)"
                        colorTo="transparent"
                      />
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="section-kicker">0{idx + 1}</span>
                        <span className="micro-chip bg-white/[0.05] text-white/76">
                          {project.category}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "relative mt-4 overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)]",
                          idx === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                        )}
                      >
                        {project.cover.src ? (
                          <Image
                            src={project.cover.src}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-contain p-4 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : null}

                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
                      </div>

                      <div className="mt-5">
                        <div className="flex items-start justify-between gap-4">
                          <h3
                            className={cn(
                              "font-display font-bold text-white transition-colors group-hover:text-[var(--accent-secondary)]",
                              idx === 0 ? "text-2xl sm:text-[1.9rem]" : "text-lg"
                            )}
                          >
                            {project.title}
                          </h3>
                          <span className="font-mono text-xs text-text-dim">
                            {project.year}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-2 leading-relaxed text-text-muted",
                            idx === 0 ? "max-w-2xl text-sm sm:text-base" : "text-sm"
                          )}
                        >
                          {project.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.slice(0, idx === 0 ? 3 : 2).map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-white transition-transform group-hover:translate-x-1">
                        Read case study &rarr;
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
