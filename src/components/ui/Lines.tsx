"use client";

import { motion } from "motion/react";
import { group, maskUp } from "@/lib/motion";

/**
 * Display type that rises line by line from behind its own baseline.
 *
 * Each line gets its own overflow-hidden clip, so the type is uncovered
 * rather than faded in. The lines are authored in content, not split from a
 * string at runtime: where a headline breaks is a typographic decision and it
 * should not depend on the viewport guessing right.
 *
 * maskUp animates `y` only, which MotionProvider snaps to its target under
 * reduced motion — so those visitors get the type immediately rather than a
 * faster version of the same move.
 */
export function Lines({
  lines,
  className,
  delay = 0,
}: {
  lines: readonly string[];
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      variants={group(0.09, delay)}
      initial="hidden"
      animate="shown"
    >
      {lines.map((line) => (
        // Needs the small bottom pad, or descenders clip against the mask.
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            data-motion
            variants={maskUp}
            className="block will-change-transform"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
