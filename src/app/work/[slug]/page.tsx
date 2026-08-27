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
    <article>
      <Container>
        {/* Running head — index position and a way back, in the same bar
            every other page uses. */}
        <div className="flex items-baseline justify-between border-b border-rule pt-10 pb-4">
          <Link
            href="/work"
            className="t-label transition-colors hover:text-accent"
          >
            &larr; Index
          </Link>
          <p className="t-label">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(publishedProjects.length).padStart(2, "0")}
          </p>
        </div>

        <header className="py-12 sm:py-16">
          <h1 className="t-h1 max-w-[20ch]">{project.title}</h1>
          <p className="t-lead mt-6 max-w-[52ch]">{project.summary}</p>

          <dl className="mt-12 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="t-label">{m.label}</dt>
                <dd className="mt-2 text-sm text-bone">{m.value}</dd>
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

        <MediaFrame
          media={project.cover}
          priority
          sizes="(max-width: 1280px) 100vw, 80rem"
          dropPath={`/media/projects/${project.slug}/cover.png`}
        />

        <div className="mt-16">
          <CaseSection label="Overview">
            <p className="t-lead text-bone">{project.overview}</p>
          </CaseSection>

          <CaseSection label="Problem" title="What was going wrong">
            <p className="t-body">{project.problem}</p>
          </CaseSection>

          <CaseSection label="Process" title="How I worked through it">
            <ProcessList steps={project.process} />
          </CaseSection>

          <CaseSection label="Solution" title="What I built">
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

        <CaseSection label="Outcome" title="What changed">
          <p className="t-body">{project.outcome}</p>
          <MetricRow metrics={project.metrics} />
        </CaseSection>
      </Container>

      {next ? <NextProject project={next} /> : null}
    </article>
  );
}
