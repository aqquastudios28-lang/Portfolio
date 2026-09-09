"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DUR, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Feedback lives on the button itself. There was a toast here as well, which
 * meant one action reported itself twice, in two places, one of them nowhere
 * near the thing you clicked.
 */
export function CopyButton({
  text,
  label,
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-md transition-all",
        copied
          ? "border-accent bg-[rgba(255,122,24,0.12)] text-white shadow-[0_10px_24px_-18px_rgba(255,122,24,0.95)]"
          : "border-white/12 bg-white/[0.04] text-text-muted hover:border-white/24 hover:bg-white/[0.08] hover:text-white",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: DUR.fast, ease: EASE }}
          className="block"
        >
          {copied ? "Copied" : (label ?? text)}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
