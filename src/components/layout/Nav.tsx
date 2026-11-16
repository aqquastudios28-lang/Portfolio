"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Drip } from "@/components/season/Spooky";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/design", label: "Design" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * A masthead rule, not a floating pill. It stays flush to the top and to the
 * page rails at every scroll position — the previous version morphed between
 * two different shapes on scroll, which meant the page never settled.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-ink/85 backdrop-blur-md">
      <div aria-hidden className="ribbon" />
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[78rem] items-center justify-between px-5 py-3 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/media/logo.png"
            alt={site.name}
            width={140}
            height={36}
            priority
            className="h-7 w-auto object-contain"
          />
          <span className="annot hidden sm:block">{site.role}</span>
        </Link>

        <div className="hidden items-center md:flex">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "annot relative py-1 transition-colors hover:text-paper",
                    isActive(item.href) && "text-paper",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[3px] w-full -skew-x-12 bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-soft border border-rule bg-surface text-paper transition-colors hover:border-paper-3 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rule bg-ink md:hidden"
          >
            <ul className="px-5 py-2 sm:px-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-baseline justify-between border-b border-rule-soft py-4",
                      isActive(item.href) ? "text-accent" : "text-paper",
                    )}
                  >
                    <span className="t-h3">{item.label}</span>
                    <span aria-hidden className="annot">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-5 sm:px-8">
              <a href={`mailto:${site.email}`} className="annot">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Drip />
    </header>
  );
}
