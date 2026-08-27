import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Commission Roblox interface work from ${site.name}. HUDs, shops, inventories, onboarding and design systems.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { availability } = site;

  return (
    <Container>
      <div className="flex items-baseline justify-between border-b border-rule pt-10 pb-4">
        <p className="t-label">Contact</p>
        <p className="t-label hidden sm:block">
          {availability.open ? availability.label : availability.closedLabel}
        </p>
      </div>

      <div className="py-12 sm:py-16">
        <h1 className="t-h1 max-w-[16ch]">
          Let&rsquo;s talk about your interface
        </h1>
      </div>

      <div className="grid gap-14 border-t border-rule py-12 lg:grid-cols-[1fr_18rem] lg:gap-20">
        <div className="max-w-xl">
          <ContactForm email={site.email} />
        </div>

        <aside className="space-y-9">
          <div>
            <p className="t-label">Direct</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2.5 inline-block border-b border-rule-strong pb-0.5 text-sm break-all transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="t-label">Elsewhere</p>
            <ul className="mt-2.5 space-y-2">
              {site.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-bone-dim transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-label">Useful to include</p>
            <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-bone-dim">
              <li>A link to the experience</li>
              <li>What is going wrong right now</li>
              <li>Scope &mdash; one screen or the whole system</li>
              <li>Timeline and budget range</li>
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
