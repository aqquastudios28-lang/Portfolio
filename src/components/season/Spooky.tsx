import { site } from "@/content/site";

/* ============================================================================
   HALLOWEEN DECORATIONS
   Everything here is inline SVG: the CSP in next.config.ts allows no
   third-party images, and these need to pick up the theme colours anyway.

   Every element carries `.spooky`, which globals.css hides unless <html> has
   data-season="halloween". They are purely decorative, so all aria-hidden.
   ========================================================================= */

/** October, plus the first two days of November for the stragglers. */
const AUTO =
  '(function(){var d=new Date(),m=d.getMonth();if(m===9||(m===10&&d.getDate()<=2))document.documentElement.dataset.season="halloween"})()';

const FORCED = 'document.documentElement.dataset.season="halloween"';

/**
 * Sets data-season before first paint so the theme does not flash. It has to
 * run in the browser: the pages are static, so a date check at build time
 * would freeze whatever season the last deploy happened in.
 */
export function SeasonScript() {
  if (site.season === "off") return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: site.season === "halloween" ? FORCED : AUTO,
      }}
    />
  );
}

/* Five spokes fanning out of the corner, four sagging rings between them. */
const SPOKES = [0, 22.5, 45, 67.5, 90].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: Math.cos(rad), y: Math.sin(rad) };
});
const RINGS = [48, 96, 144, 192];

function webPath() {
  const spokes = SPOKES.map(
    (s) => `M0 0L${(s.x * 200).toFixed(1)} ${(s.y * 200).toFixed(1)}`,
  );

  const rings = RINGS.flatMap((r) =>
    SPOKES.slice(0, -1).map((a, i) => {
      const b = SPOKES[i + 1];
      /* Control point pulled toward the corner so each strand sags. */
      const cx = ((a.x + b.x) / 2) * r * 0.8;
      const cy = ((a.y + b.y) / 2) * r * 0.8;
      return `M${(a.x * r).toFixed(1)} ${(a.y * r).toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${(b.x * r).toFixed(1)} ${(b.y * r).toFixed(1)}`;
    }),
  );

  return [...spokes, ...rings].join("");
}

const WEB = webPath();

function Web({ side }: { side: "l" | "r" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={`spooky-web spooky-web--${side}`}
    >
      <path d={WEB} />
    </svg>
  );
}

function Bat({ top }: { top: string }) {
  return (
    <span className="spooky-bat" style={{ top }}>
      <svg viewBox="0 0 64 32" fill="currentColor">
        <path d="M32 9L29 3L27 9C23 8 20 9 18 11C14 7 8 6 1 7C5 10 7 13 7 17C10 15 13 15 15 18C17 15 20 15 22 18C24 23 28 27 32 29C36 27 40 23 42 18C44 15 47 15 49 18C51 15 54 15 57 17C57 13 59 10 63 7C56 6 50 7 46 11C44 9 41 8 37 9L35 3Z" />
      </svg>
    </span>
  );
}

function Spider() {
  return (
    <span className="spooky-spider">
      <svg
        viewBox="0 0 40 32"
        width="34"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path
          fill="none"
          d="M14 12L4 6M13 16L2 16M14 20L5 27M26 12L36 6M27 16L38 16M26 20L35 27M16 9L10 1M24 9L30 1"
        />
        <ellipse cx="20" cy="18" rx="8" ry="9" stroke="none" />
        <circle cx="20" cy="8" r="4.5" stroke="none" />
      </svg>
    </span>
  );
}

/** Cobwebs, bats and a spider. Rendered once, in the root layout. */
export function SeasonDecor() {
  if (site.season === "off") return null;

  return (
    <div aria-hidden className="spooky spooky-layer">
      <Bat top="22%" />
      <Bat top="48%" />
      <Bat top="71%" />
      <Web side="l" />
      <Web side="r" />
      <Spider />
    </div>
  );
}

function Pumpkin() {
  return (
    <svg viewBox="0 0 64 58">
      <path
        d="M30 16C30 10 32 6 37 4L40 8C37 10 36 12 36 16Z"
        fill="var(--accent-3)"
      />
      <ellipse cx="32" cy="35" rx="29" ry="21" fill="#ff7a1a" />
      <ellipse cx="32" cy="35" rx="17" ry="21" fill="#ff8e3a" />
      <ellipse cx="32" cy="35" rx="6" ry="21" fill="#ffa55c" />
      <path
        d="M17 31L23 22L28 31ZM36 31L41 22L47 31ZM14 40L19 43L23 40L27 43L32 40L37 43L41 40L45 43L50 40C48 48 41 52 32 52C23 52 16 48 14 40Z"
        fill="#1d0a00"
      />
    </svg>
  );
}

/** Three pumpkins on the footer's top edge. Parent must be `relative`. */
export function Pumpkins() {
  if (site.season === "off") return null;

  return (
    <div aria-hidden className="spooky spooky-pumpkins">
      <Pumpkin />
      <Pumpkin />
      <Pumpkin />
    </div>
  );
}

/** One floating ghost. Parent must be `relative`. Hidden below `lg`. */
export function Ghost() {
  if (site.season === "off") return null;

  return (
    <svg aria-hidden viewBox="0 0 48 60" className="spooky spooky-ghost">
      <path
        d="M24 3C12 3 5 12 5 26V55L11.5 50L17.5 55L24 50L30.5 55L36.5 50L43 55V26C43 12 36 3 24 3Z"
        fill="var(--paper)"
      />
      <ellipse cx="17" cy="23" rx="3.2" ry="4.6" fill="var(--ink)" />
      <ellipse cx="31" cy="23" rx="3.2" ry="4.6" fill="var(--ink)" />
      <ellipse cx="24" cy="34" rx="3.6" ry="5" fill="var(--ink)" />
    </svg>
  );
}
