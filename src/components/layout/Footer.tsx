import Link from "next/link";
import { Graveyard } from "@/components/season/Spooky";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

const PAGES = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-rule">
      <Graveyard />
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="annot block">Contact</span>
            <a
              href={`mailto:${site.email}`}
              className="link-rule mt-4 inline-block text-sm"
            >
              {site.email}
            </a>
          </div>

          <div>
            <span className="annot">Pages</span>
            <ul className="mt-4 space-y-2.5">
              {PAGES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper-2 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="annot">Elsewhere</span>
            <ul className="mt-4 space-y-2.5">
              {site.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-paper-2 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="annot">Legal</span>
            <ul className="mt-4 space-y-2.5">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper-2 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-rule-soft py-6">
          <p className="annot">
            {site.name} {year} — game names and logos belong to their owners
          </p>
        </div>
      </Container>
    </footer>
  );
}
