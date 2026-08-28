import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="block font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              Contact
            </span>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block border-b border-white/20 pb-0.5 text-sm text-white transition-colors hover:border-white"
            >
              {site.email}
            </a>
          </div>

          <div>
            <span className="block font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              Navigation
            </span>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              {[
                { href: "/", label: "Index" },
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="block font-mono text-xs font-medium uppercase tracking-wider text-text-dim">
              Channels
            </span>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              {site.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:flex lg:flex-col lg:items-end">
            <Image
              src="/media/logo.png"
              alt={site.name}
              width={140}
              height={36}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              UI design & Luau builds for Roblox experiences.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-dim">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <p className="font-mono text-[11px]">Crafted for mobile touch hitboxes & high retention</p>
        </div>
      </Container>
    </footer>
  );
}
