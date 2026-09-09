import type { Transition } from "motion/react";

/* ============================================================
   MOTION TOKENS

   One curve, two durations. The site has almost no motion left:
   hover states, the mobile menu, and the lightbox. Nothing
   animates on scroll, so there is no stagger or reveal here.

   The curve is a hard ease-out — most of the distance is covered
   in the first third, so movement reads as arrival rather than
   as travel.
   ============================================================ */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DUR = {
  /** Hover states, toggles, anything under the cursor. */
  fast: 0.28,
  /** The default. Overlays and menus. */
  base: 0.62,
} as const;

export const transition: Transition = { duration: DUR.base, ease: EASE };
