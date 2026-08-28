"use client";

import { motion } from "motion/react";
import { rise, transition, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
} as const;

/**
 * Lifts its children into view once, on first intersection.
 *
 * No reduced-motion branch here on purpose — MotionProvider handles that
 * globally so the server and the client always render the same tree.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: keyof typeof TAGS;
}) {
  const Tag = TAGS[as];

  return (
    <Tag
      data-motion
      className={cn(className)}
      variants={rise}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      transition={{ ...transition, delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}
