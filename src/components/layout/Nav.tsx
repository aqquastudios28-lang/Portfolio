"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
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
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Close mobile drawer on route change
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
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "pt-3 sm:pt-4 px-3 sm:px-6" : "pt-0 px-4 sm:px-8 border-b border-white/5 bg-bg-dark/40 backdrop-blur-sm"
      )}
    >
      <motion.nav
        aria-label="Primary"
        layout
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 26,
        }}
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-300",
          scrolled
            ? "max-w-4xl rounded-full border border-white/15 bg-black/80 px-4 sm:px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            : "w-full max-w-6xl rounded-none border border-transparent bg-transparent py-4 shadow-none"
        )}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Image
            src="/media/logo.png"
            alt={site.name}
            width={140}
            height={36}
            priority
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-7 sm:h-8" : "h-8 sm:h-9"
            )}
          />
        </Link>

        {/* Desktop Navigation Links with Smooth Sliding Pill */}
        <div className="hidden items-center gap-4 md:flex">
          <ul
            onMouseLeave={() => setHoveredPath(null)}
            className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md"
          >
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));
              const isSelected =
                hoveredPath === item.href || (!hoveredPath && active);

              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredPath(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200",
                      active ? "text-white font-semibold" : "text-text-muted hover:text-white"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-white/20 bg-white/15 shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className="uiverse-btn-shimmer text-xs py-2 px-4 shadow-sm"
          >
            <span>Get in Touch</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:bg-white/15 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 w-full max-w-4xl rounded-2xl border border-white/15 bg-black/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <ul className="space-y-1">
              {NAV.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href + "/"));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        active
                          ? "bg-white/10 text-white font-semibold"
                          : "text-text-muted hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 pt-3 border-t border-white/10">
              <Link
                href="/contact"
                className="uiverse-btn-shimmer w-full text-center py-2.5 text-sm"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
