import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { site } from "@/content/site";

export function ContactCta() {
  return (
    <section className="border-t border-rule py-20 sm:py-28">
      <Container>
        <h2 className="t-h1 max-w-3xl text-paper">
          Working on a game?{" "}
          <span className="text-paper-3">
            Send the screens you have and what needs reworking.
          </span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn">
            Start a project
            <span aria-hidden>&rarr;</span>
          </Link>
          <CopyButton text={site.email} label="Copy email" />
        </div>
      </Container>
    </section>
  );
}
