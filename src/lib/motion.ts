import type { Transition, Variants } from "motion/react";

/* ============================================================
   MOTION TOKENS

   One curve, three durations. Everything on the site animates
   with these — no per-component easing, no bounce, no spring
   on anything that carries text.

   The curve is a hard ease-out: most of the distance is covered
   in the first third, so movement reads as arrival rather than
   as travel. Same reason a well-set page has no visible motion
   in the type once it has landed.
   ============================================================ */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DUR = {
  /** Hover states, toggles, anything under the cursor. */
  fast: 0.28,
  /** The default. Section reveals, image wipes. */
  base: 0.62,
  /** The homepage headline only. */
  slow: 0.9,
} as const;

/** How long each item in a staggered group waits behind the one before it. */
export const STAGGER = 0.07;

export const transition: Transition = { duration: DUR.base, ease: EASE };

/* ------------------------------------------------------------
   Shared variants
   ------------------------------------------------------------ */

/** A short rise. No fade-in blur, no scale, no bounce. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition },
};

/**
 * Type that arrives from behind its own baseline. The parent needs
 * `overflow-hidden` for the mask to work — that is what makes this read
 * as letterpress rather than as a fade.
 */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%", transition: { duration: DUR.slow, ease: EASE } },
};

/** A hairline drawn from its leading edge. */
export const drawRule: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE } },
};

/** An image uncovered by a wipe rather than faded up. */
export const wipe: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  shown: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DUR.slow, ease: EASE },
  },
};

/** Parent of any staggered group. */
export function group(stagger = STAGGER, delay = 0): Variants {
  return {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

/** Shared viewport trigger. Fires once, a little before the element is centred. */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
