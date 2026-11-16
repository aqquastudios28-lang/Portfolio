"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Plate } from "@/components/work/Plate";
import { Shot } from "@/components/work/Shot";
import { alsoBuilt, publishedCodeProjects } from "@/content/code-projects";
import { cn } from "@/lib/utils";

const KINDS = [
  "All",
  "Desktop app",
  "Developer tool",
  "Web app",
  "Browser extension",
  "Game systems",
] as const;

export function WorkIndex() {
  const [activeKind, setActiveKind] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"plates" | "index">("plates");

  const filtered = publishedCodeProjects.filter(
    (project) => activeKind === "All" || project.kind === activeKind,
  );

  return (
    <div className="py-10 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-3">
          <span className="annot annot-bright">Engineering index</span>
          <span className="annot">
            {filtered.length} of {publishedCodeProjects.length} projects
          </span>
        </div>

        <h1 className="t-h1 mt-10 max-w-4xl text-paper">
          Small programs, measured.
        </h1>
        <p className="t-lead mt-4 max-w-2xl">
          Desktop apps, developer tools and web interfaces, documented with the
          constraint that shaped them. Every performance number comes from a
          measurement with a method behind it.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {KINDS.map((kind) => {
              const count = publishedCodeProjects.filter(
                (project) => kind === "All" || project.kind === kind,
              ).length;
              const active = activeKind === kind;

              return (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setActiveKind(kind)}
                  aria-pressed={active}
                  className={cn(
                    "pill cursor-pointer transition-colors",
                    active
                      ? "pill-accent"
                      : "hover:border-paper-3 hover:text-paper",
                  )}
                >
                  {kind}
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
                {project.cover ? (
                  <Shot
                    media={project.cover}
                    sizes="(max-width: 640px) 100vw, 600px"
                    className="border border-rule-soft transition-colors group-hover:border-paper-3"
                  />
                ) : project.plate ? (
                  <Plate
                    plate={project.plate}
                    compact
                    className="transition-colors group-hover:border-paper-3"
                  />
                ) : null}

                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-rule-soft pt-3">
                  <p className="annot">{project.kind}</p>
                  <p className="annot">
                    {project.language} · {project.year}
                  </p>
                </div>

                <h2 className="t-h3 mt-2 text-paper transition-colors group-hover:text-accent">
                  {project.title}
                </h2>
                <p className="t-body mt-2 max-w-md text-sm">
                  {project.summary}
                </p>
                <p className="mt-4 font-mono text-xs text-paper-3">
                  {project.stack.join(" · ")}
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
                className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-rule-soft py-5 sm:grid-cols-[minmax(0,1fr)_11rem_8rem_4rem_1.5rem] sm:gap-6"
              >
                <span className="t-h3 text-paper transition-colors group-hover:text-accent">
                  {project.title}
                </span>
                <span className="annot hidden sm:block">{project.kind}</span>
                <span className="annot hidden sm:block">{project.language}</span>
                <span className="annot text-right">{project.year}</span>
                <span
                  aria-hidden
                  className="annot hidden text-right text-paper-3 transition-transform duration-300 group-hover:translate-x-1 sm:block"
                >
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="t-body mt-12 border-t border-rule pt-6">
            No projects in this category yet.
          </p>
        )}

        <section className="mt-24">
          <div className="sec-head">
            <h2 className="annot annot-bright">Also built</h2>
            <span className="sec-head__fill" />
          </div>

          <ul className="mt-4">
            {alsoBuilt.map((project) => (
              <li key={project.title}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid items-baseline gap-2 border-b border-rule-soft py-5 sm:grid-cols-[minmax(0,1fr)_5rem_1.5rem] sm:gap-6"
                >
                  <div>
                    <span className="t-h3 text-paper transition-colors group-hover:text-accent">
                      {project.title}
                    </span>
                    <p className="t-body mt-2 max-w-2xl text-sm">
                      {project.body}
                    </p>
                  </div>
                  <span className="annot sm:text-right">{project.year}</span>
                  <span
                    aria-hidden
                    className="annot hidden text-right text-paper-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
                  >
                    &#8599;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-rule pt-6">
          <p className="annot">The Roblox interface archive is separate</p>
          <Link
            href="/design"
            className="annot inline-flex items-center gap-2 text-paper transition-colors hover:text-accent"
          >
            Design archive
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
