import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseSection } from "@/components/case/CaseSection";
import { MetricRow } from "@/components/case/MetricRow";
import { NextProject } from "@/components/case/NextProject";
import { ProcessList } from "@/components/case/ProcessList";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
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
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
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
  const index = publishedProjects.findIndex((p) => p.slug === slug);

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Type", value: project.category },
  ];

  return (
    <article className="relative pb-16">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
      />

      <Container>
        {/* Navigation Breadcrumb & Index position */}
        <div className="flex items-baseline justify-between border-b border-rule pt-10 pb-4">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-bone-dim transition-colors hover:text-accent"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">&larr;</span>
            <span>All Work</span>
          </Link>
          <p className="t-label">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(publishedProjects.length).padStart(2, "0")}
          </p>
        </div>

        <header className="py-12 sm:py-16">
          <h1 className="t-h1 max-w-[22ch]">{project.title}</h1>
          <p className="t-lead mt-6 max-w-[54ch]">{project.summary}</p>

          <dl className="mt-12 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="t-label">{m.label}</dt>
                <dd className="mt-2 text-sm font-medium text-bone">{m.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <li key={tool}>
                <Chip>{tool}</Chip>
              </li>
            ))}
          </ul>
        </header>

        {/* Hero showcase frame */}
        <div className="relative">
          <MediaFrame
            media={project.cover}
            priority
            sizes="(max-width: 1280px) 100vw, 80rem"
            dropPath={`/media/projects/${project.slug}/cover.png`}
          />
          <div className="mt-2 flex items-center justify-end">
            <span className="font-mono text-[10px] text-bone-faint uppercase tracking-wider flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Click image to inspect at 100% resolution
            </span>
          </div>
        </div>

        <div className="mt-16">
          <CaseSection label="Overview">
            <p className="t-lead text-bone">{project.overview}</p>
          </CaseSection>

          <CaseSection label="Problem" title="Design Challenge">
            <p className="t-body">{project.problem}</p>
          </CaseSection>

          <CaseSection label="Process" title="Design & UX Workflow">
            <ProcessList steps={project.process} />
          </CaseSection>

          <CaseSection label="Solution" title="Final Interface System">
            <p className="t-body">{project.solution}</p>
          </CaseSection>
        </div>

        {project.gallery.length > 0 ? (
          <div className="space-y-12 border-t border-rule py-12 sm:space-y-16 sm:py-16">
            {project.gallery.map((media, i) => (
              <Reveal key={`${project.slug}-media-${i}`}>
                <MediaFrame
                  media={media}
                  sizes="(max-width: 1280px) 100vw, 80rem"
                  dropPath={`/media/projects/${project.slug}/${i + 1}.${
                    media.kind === "video" ? "mp4" : "png"
                  }`}
                />
              </Reveal>
            ))}
          </div>
        ) : null}

        <CaseSection label="Outcome" title="Impact & Specifications">
          <p className="t-body">{project.outcome}</p>
          <MetricRow metrics={project.metrics} />
        </CaseSection>
      </Container>

      {next ? <NextProject project={next} /> : null}
    </article>
  );
}
