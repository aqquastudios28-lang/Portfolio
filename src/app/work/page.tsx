import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WorkGrid } from "@/components/work/WorkGrid";
import { categories, publishedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected Roblox interface work — HUD systems, inventories, storefronts and onboarding flows, with the reasoning behind each one.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Container>
      <div className="flex items-baseline justify-between border-b border-rule pt-10 pb-4">
        <p className="t-label">Index</p>
        <p className="t-label">
          {String(publishedProjects.length).padStart(2, "0")} projects
        </p>
      </div>

      <div className="rail py-12 sm:py-16">
        <p className="t-label lg:pt-2">Work</p>
        <div>
          <h1 className="t-h1 max-w-[14ch]">Interface work</h1>
          <p className="t-lead mt-6 max-w-[52ch]">
            Each one includes the problem, the process and what actually
            changed — not just the finished screens.
          </p>
        </div>
      </div>

      <WorkGrid projects={publishedProjects} categories={[...categories]} />
    </Container>
  );
}
