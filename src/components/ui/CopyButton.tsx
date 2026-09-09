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
        "btn-ghost",
        copied && "border-accent text-accent",
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
