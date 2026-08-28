"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { transition } from "@/lib/motion";

/**
 * Reduced motion is handled here rather than per-component.
 *
 * The obvious version — `useReducedMotion()` inside each animated component,
 * returning a plain element when it is true — does not survive hydration. The
 * hook reads the media query on the client's first render but not on the
 * server, so a visitor with the setting on gets server HTML from one branch
 * and client HTML from the other. In a component that renders a different
 * number of elements per branch, that is a structural mismatch.
 *
 * `reducedMotion="user"` keeps one tree for everyone. Motion snaps transform
 * values (x, y, scale, rotate) straight to their target for those visitors and
 * leaves opacity alone, which is the behaviour the setting actually asks for:
 * it exists to stop things moving, not to stop things appearing.
 *
 * The clip-path wipe on images still plays under the setting. That is
 * deliberate — nothing travels during a wipe, so there is nothing in it to
 * trigger the response the preference is protecting against.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={transition}>
      {children}
    </MotionConfig>
  );
}
