import Link from "next/link";
import { Ghost } from "@/components/season/Spooky";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function ContactCta() {
  return (
    <section className="relative border-t border-rule py-20 sm:py-28">
      <Ghost />
      <Container>
        <h2 className="t-h1 max-w-3xl text-paper">
          <span className="text-accent">Building something</span>{" "}
          <span className="text-paper-2">
            that should be smaller?
          </span>
        </h2>
        <p className="t-lead mt-5 max-w-xl">
          Tell me what it is, what it runs on, and where it hurts. Every message
          reaches me directly.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn">
            Start a conversation
            <span aria-hidden>&rarr;</span>
          </Link>
          <a
            href={site.links[0].href}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost gap-2"
          >
            GitHub
            <span aria-hidden>&#8599;</span>
          </a>
        </div>

        <p className="annot mt-8">
          Or write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="link-rule normal-case tracking-normal text-paper-2"
          >
            {site.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
