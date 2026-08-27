import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="t-label">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block border-b border-rule pb-0.5 text-sm break-all transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="t-label">Site</p>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/", label: "Index" },
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-bone-dim transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-label">Elsewhere</p>
            <ul className="mt-3 space-y-2">
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

          <div className="lg:text-right">
            <p className="font-display text-sm font-semibold">{site.name}</p>
            <p className="t-label mt-2">{site.role}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-5 sm:flex-row sm:justify-between">
          <p className="t-label">
            &copy; {year} {site.name}
          </p>
          <p className="t-label">
            {site.availability.open
              ? site.availability.label
              : site.availability.closedLabel}
          </p>
        </div>
      </Container>
    </footer>
  );
}
