"use client";

import { motion } from "motion/react";
import { drawRule, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A hairline that draws in from its left edge when it scrolls into view.
 *
 * The rules are the structure of this layout, so they get the one piece of
 * motion that is about the page rather than about its contents: the grid
 * assembling itself as you go down. Only section rules use this — drawing
 * every separator would turn a structural device into an effect.
 */
export function Rule({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      data-motion
      className={cn("h-px w-full origin-left bg-rule", className)}
      variants={drawRule}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
    />
  );
}
