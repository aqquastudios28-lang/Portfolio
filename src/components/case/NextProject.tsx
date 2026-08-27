import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Project } from "@/content/types";

export function NextProject({ project }: { project: Project }) {
  return (
    <section className="border-t border-rule">
      <Container>
        <Link href={`/work/${project.slug}`} className="group block py-14 rail">
          <p className="t-label lg:pt-2">Next</p>
          <div>
            <h2 className="t-h1 max-w-[20ch] transition-colors group-hover:text-accent">
              {project.title}
            </h2>
            <p className="t-body mt-4 max-w-[52ch]">{project.summary}</p>
          </div>
        </Link>
      </Container>
    </section>
  );
}
