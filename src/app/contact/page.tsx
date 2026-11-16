import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${site.name} about native apps, developer tools, web interfaces and game systems.`,
  alternates: { canonical: "/contact" },
};

const USEFUL = [
  "A working repo or a link to the thing",
  "The platform it has to run on",
  "What is slow, broken or missing",
  "Any deadline that is real",
];

export default function ContactPage() {
  return (
    <div className="py-10 sm:py-16">
      <Container>
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <span className="annot annot-bright">Contact</span>
          <span className="annot">
            {site.availability.open
              ? site.availability.label
              : site.availability.closedLabel}
          </span>
        </div>

        <div className="mt-12 max-w-3xl">
          <h1 className="t-h1 text-paper">What are you building?</h1>
          <p className="t-lead mt-4 text-paper-2">
            Send the project, the platform and the part that is not working.
            Email or Discord both reach me; I usually reply within a couple of
            days.
          </p>
        </div>

        <div className="mt-14 grid gap-12 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm email={site.email} />
          </div>

          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            <div>
              <span className="annot">Direct email</span>
              <p className="mt-3 break-all font-mono text-sm text-paper">
                {site.email}
              </p>
              <div className="mt-4">
                <CopyButton text={site.email} label="Copy address" />
              </div>
            </div>

            <div>
              <span className="annot">Channels</span>
              <ul className="mt-3">
                {site.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between border-b border-rule-soft py-3 text-sm text-paper-2 transition-colors hover:text-paper"
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className="text-paper-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        &#8599;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="annot">Useful in a first message</span>
              <ul className="mt-3 space-y-2.5">
                {USEFUL.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm text-paper-2"
                  >
                    <span aria-hidden className="text-accent">
                      &#8212;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-mono text-[11px] leading-5 text-paper-3">
              Based in {site.location}. Working remotely with people in any
              timezone.
            </p>
          </aside>
        </div>
      </Container>
    </div>
  );
}
