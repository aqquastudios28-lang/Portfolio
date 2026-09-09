"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { transition } from "@/lib/motion";

/**
 * Reduced motion is handled here rather than per-component.
 *
 * `reducedMotion="user"` keeps one tree for everyone: Motion snaps transform
 * values (x, y, scale, rotate) straight to their target for visitors with the
 * setting on and leaves opacity alone, which is what the preference actually
 * asks for — stop things moving, not stop things appearing.
 *
 * Doing it with `useReducedMotion()` per component instead does not survive
 * hydration: the hook reads the media query on the client's first render but
 * not on the server, so the two trees disagree.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={transition}>
      {children}
    </MotionConfig>
  );
}
