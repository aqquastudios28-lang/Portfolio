"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useScrolled } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const scrolled = useScrolled(12);
  const [open, setOpen] = useState(false);

  // Close the sheet on navigation. Adjusting during render rather than in an
  // effect avoids a frame where the new page shows behind an open menu.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled ? "border-rule bg-ink/90 backdrop-blur-sm" : "border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[80rem] items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link
          href="/"
          className="font-display text-[15px] font-semibold tracking-[-0.01em] transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        {/* Desktop. Current page is marked with a rule, not a colour block. */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "border-b py-0.5 text-[13px] transition-colors",
                      active
                        ? "border-bone text-bone"
                        : "border-transparent text-bone-dim hover:border-accent hover:text-bone",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="t-label">
            {site.availability.open
              ? site.availability.label
              : site.availability.closedLabel}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-1 flex h-9 w-9 items-center justify-center text-bone md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-rule bg-ink md:hidden">
        <ul className="px-5">
          {NAV.map((item, i) => (
            <li key={item.href} className="border-b border-rule last:border-0">
              <Link href={item.href} className="flex items-baseline gap-4 py-4">
                <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-semibold tracking-[-0.03em]">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="t-label px-5 py-5">
          {site.availability.open
            ? site.availability.label
            : site.availability.closedLabel}
        </p>
      </div>
    </header>
  );
}
