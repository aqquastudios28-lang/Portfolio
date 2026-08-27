import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[62vh] items-center py-24">
      <Container>
        <p className="t-label mb-6">404</p>
        <h1 className="t-h1 max-w-[14ch]">
          This screen doesn&rsquo;t exist
          
        </h1>
        <p className="t-lead mt-6 max-w-md">
          The page you were after has moved or never shipped.
        </p>
        <div className="mt-10 flex flex-wrap gap-8">
          <ArrowLink href="/">Back home</ArrowLink>
          <ArrowLink href="/work" className="text-bone-dim">
            See the work
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
