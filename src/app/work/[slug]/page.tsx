import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  getNextProject,
  getProject,
  publishedProjects,
} from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found" };

  return {
    title: `${project.title} — Roblox UI Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — Roblox UI Case Study`,
      description: project.summary,
      images: project.cover.src ? [project.cover.src] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <article className="py-12 sm:py-20">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            <span>Back to Work</span>
          </Link>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white">
            {project.category}
          </span>
        </div>

        {/* Header */}
        <header className="py-10 max-w-3xl">
          <h1 className="t-h1 text-white">{project.title}</h1>
          <p className="t-lead mt-4 text-text-muted">
            {project.summary}
          </p>

          {/* Specs */}
          <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-bg-card p-5 backdrop-blur-md sm:grid-cols-4 sm:gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                Role
              </span>
              <p className="mt-1 font-display text-sm font-semibold text-white">{project.role}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                Year
              </span>
              <p className="mt-1 font-display text-sm font-semibold text-white">{project.year}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                Platform
              </span>
              <p className="mt-1 font-display text-sm font-semibold text-white">Crossplay</p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim">
                Stack
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Primary Showcase Image */}
        <div className="relative my-8 aspect-[16/9] w-full flex items-center justify-center">
          {project.cover.src ? (
            <Image
              src={project.cover.src}
              alt={project.title}
              fill
              priority
              unoptimized
              className="object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-sm text-text-dim">
              Screenshot Preview
            </div>
          )}
        </div>

        {/* Case Study Sections */}
        <div className="mt-16 space-y-10 max-w-4xl">
          {/* Overview */}
          <SpotlightCard className="p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
              Overview
            </span>
            <p className="mt-3 text-base leading-relaxed text-white">
              {project.overview}
            </p>
          </SpotlightCard>

          {/* Problem */}
          <SpotlightCard className="p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
              Design Challenge
            </span>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {project.problem}
            </p>
          </SpotlightCard>

          {/* Process Breakdown */}
          {project.process.length > 0 && (
            <SpotlightCard className="p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
                Process & Execution
              </span>
              <div className="mt-6 space-y-4">
                {project.process.map((step, i) => (
                  <div
                    key={step.title}
                    className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="font-mono text-xs font-bold text-text-dim">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-text-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          )}

          {/* Solution */}
          <SpotlightCard className="p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
              Shipped Outcome
            </span>
            <p className="mt-3 text-sm leading-relaxed text-white">
              {project.solution}
            </p>
            {project.outcome && (
              <p className="mt-4 border-t border-white/10 pt-4 text-xs italic text-text-dim">
                &ldquo;{project.outcome}&rdquo;
              </p>
            )}
          </SpotlightCard>
        </div>

        {/* Next Project Link */}
        {next && (
          <div className="mt-20 border-t border-white/10 pt-10">
            <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
              Next Case Study
            </span>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-4 block"
            >
              <SpotlightCard className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8">
                <div>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase text-text-dim">
                    {next.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white transition-colors group-hover:text-text-muted">
                    {next.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{next.summary}</p>
                </div>

                <span className="font-mono text-xs font-semibold text-white transition-transform group-hover:translate-x-2">
                  View Next &rarr;
                </span>
              </SpotlightCard>
            </Link>
          </div>
        )}
      </Container>
    </article>
  );
}
