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
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close the sheet on navigation
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-rule/80 bg-ink/85 backdrop-blur-md shadow-lg shadow-black/20"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Subtle reading progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-accent via-amber-400 to-accent transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[80rem] items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-[15px] font-semibold tracking-[-0.01em] transition-colors hover:text-accent"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
          <span>{site.name}</span>
        </Link>

        {/* Desktop Navigation */}
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
                      "relative py-1 text-[13px] font-medium transition-colors",
                      active
                        ? "text-bone font-semibold"
                        : "text-bone-dim hover:text-bone",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Live pulsing status badge */}
          <div className="flex items-center gap-2.5 border border-rule/70 bg-ink-2/70 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase text-bone-dim">
              {site.availability.open
                ? site.availability.label
                : site.availability.closedLabel}
            </span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-1 flex h-9 w-9 items-center justify-center border border-rule bg-ink-2/50 text-bone md:hidden"
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

      {/* Mobile sheet */}
      <div id="mobile-menu" hidden={!open} className="border-t border-rule bg-ink/95 backdrop-blur-lg md:hidden">
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
        <div className="px-5 py-5 border-t border-rule/50 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] tracking-wider uppercase text-bone-dim">
            {site.availability.open
              ? site.availability.label
              : site.availability.closedLabel}
          </span>
        </div>
      </div>
    </header>
  );
}
