import Link from "next/link";
import { Ghost } from "@/components/season/Spooky";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[62vh] items-center py-24">
      <Ghost />
      <Container>
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <span className="annot annot-bright">Error</span>
          <span className="annot">404</span>
        </div>

        <h1 className="t-h1 mt-12 max-w-[16ch] text-paper">
          This screen doesn&rsquo;t exist.
        </h1>
        <p className="t-lead mt-5 max-w-md">
          The page you were after has moved, or never shipped.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn">
            Back home
            <span aria-hidden>&rarr;</span>
          </Link>
          <Link href="/work" className="btn-ghost">
            See the work
          </Link>
        </div>
      </Container>
    </section>
  );
}
