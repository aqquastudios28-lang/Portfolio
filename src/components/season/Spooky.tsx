import { useId } from "react";
import { site } from "@/content/site";

/* ============================================================================
   HALLOWEEN DECORATIONS
   Everything here is inline SVG: the CSP in next.config.ts allows no
   third-party images, and these need to pick up the theme colours anyway.

   Every root element carries `.spooky`, which globals.css hides unless <html>
   has data-season="halloween". They are purely decorative, so all aria-hidden.

   Where things live:
   - SeasonDecor  fixed backdrop: moon, cobwebs, bats, spider (root layout)
   - Drip         slime under the nav
   - Graveyard    skyline on the footer's top edge, with the pumpkins
   - Ghost        beside the contact call-out and on the 404 page
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

/* ---------------------------------------------------------------------------
   Backdrop
   ------------------------------------------------------------------------ */

function Moon() {
  return (
    <svg viewBox="0 0 100 100" className="spooky-moon">
      <circle cx="50" cy="50" r="50" fill="#f1e8c9" />
      <g fill="#d6caa0">
        <circle cx="33" cy="31" r="10" />
        <circle cx="66" cy="59" r="14" />
        <circle cx="40" cy="74" r="6" />
        <circle cx="74" cy="27" r="5" />
        <circle cx="21" cy="56" r="4" />
      </g>
    </svg>
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

/* Different heights, sizes and speeds so the three never fly in formation. */
const BATS = [
  { top: "20%", width: "2.75rem", duration: "27s", delay: "-4s" },
  { top: "46%", width: "1.75rem", duration: "36s", delay: "-19s" },
  { top: "68%", width: "2.25rem", duration: "31s", delay: "-11s" },
  { top: "33%", width: "1.25rem", duration: "42s", delay: "-30s" },
];

function Bat({ top, width, duration, delay }: (typeof BATS)[number]) {
  return (
    <span
      className="spooky-bat"
      style={{ top, width, animationDuration: duration, animationDelay: delay }}
    >
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

/** Moon, cobwebs, bats and a spider. Rendered once, in the root layout. */
export function SeasonDecor() {
  if (site.season === "off") return null;

  return (
    <div aria-hidden className="spooky spooky-layer">
      <Moon />
      {BATS.map((bat) => (
        <Bat key={bat.top} {...bat} />
      ))}
      <Web side="l" />
      <Web side="r" />
      <Spider />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Nav
   ------------------------------------------------------------------------ */

/** Slime along the bottom edge of the nav. Parent must be positioned. */
export function Drip() {
  const id = useId();
  if (site.season === "off") return null;

  return (
    <svg aria-hidden className="spooky spooky-drip">
      <defs>
        <pattern id={id} width="460" height="22" patternUnits="userSpaceOnUse">
          <path
            fill="currentColor"
            d="M0 0H460V2H396C388 2 390 13 384 13C378 13 380 2 372 2H250C243 2 244 8 240 8C236 8 237 2 230 2H96C87 2 90 20 83 20C76 20 79 2 70 2H0Z"
          />
        </pattern>
      </defs>
      <rect width="100%" height="22" fill={`url(#${id})`} />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Footer
   ------------------------------------------------------------------------ */

const STONE = "#2b2238";
const FLAME = "#ffd84a";

/** Lit jack-o'-lantern in a 64 x 58 box. `flame` picks the flicker timing. */
function Pumpkin({
  x,
  y,
  scale,
  flame,
}: {
  x: number;
  y: number;
  scale: number;
  flame: "a" | "b" | "c";
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M30 16C30 10 32 6 37 4L40 8C37 10 36 12 36 16Z"
        fill="#6b8f2a"
      />
      <ellipse cx="32" cy="35" rx="29" ry="21" fill="#e5650f" />
      <ellipse cx="32" cy="35" rx="17" ry="21" fill="#f47a1c" />
      <ellipse cx="32" cy="35" rx="6" ry="21" fill="#ff9238" />
      <path
        className={`spooky-flame spooky-flame--${flame}`}
        d="M17 31L23 22L28 31ZM36 31L41 22L47 31ZM14 40L19 43L23 40L27 43L32 40L37 43L41 40L45 43L50 40C48 48 41 52 32 52C23 52 16 48 14 40Z"
        fill={FLAME}
      />
    </g>
  );
}

function Eyes({ x, y, alt }: { x: number; y: number; alt?: boolean }) {
  return (
    <g
      className={alt ? "spooky-eyes spooky-eyes--b" : "spooky-eyes"}
      fill={FLAME}
    >
      <ellipse cx={x} cy={y} rx="2.4" ry="3.2" />
      <ellipse cx={x + 10} cy={y} rx="2.4" ry="3.2" />
    </g>
  );
}

const PICKETS = Array.from({ length: 11 }, (_, i) => 984 + i * 19);

/**
 * Graveyard skyline: headstones, a dead tree, a fence, three lit pumpkins and
 * two pairs of eyes. Stands on the footer's top edge. Parent must be `relative`.
 */
export function Graveyard() {
  if (site.season === "off") return null;

  return (
    <div aria-hidden className="spooky spooky-yard">
      <svg viewBox="0 0 1200 110" preserveAspectRatio="xMidYMax slice">
        <g fill={STONE}>
          <path d="M0 110V97C150 88 300 95 450 91C600 87 800 84 1000 93C1100 97 1160 90 1200 94V110Z" />

          {/* Headstones */}
          <g transform="rotate(-6 154 96)">
            <path d="M138 98V64A16 16 0 0 1 170 64V98Z" />
            <text
              x="154"
              y="78"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fill="#0c0910"
              style={{ fontFamily: "var(--font-display)" }}
            >
              RIP
            </text>
          </g>
          <path d="M206 96V78A11 11 0 0 1 228 78V96Z" />
          <path d="M324 95V56H334V95ZM313 66H345V74H313Z" />
          <g transform="rotate(5 706 92)">
            <path d="M690 94V62A16 16 0 0 1 722 62V94Z" />
            <text
              x="706"
              y="76"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fill="#0c0910"
              style={{ fontFamily: "var(--font-display)" }}
            >
              RIP
            </text>
          </g>
          <path d="M770 92V76A10 10 0 0 1 790 76V92Z" />

          {/* Fence */}
          <rect x="978" y="74" width="212" height="3" />
          <rect x="978" y="87" width="212" height="3" />
          {PICKETS.map((x) => (
            <path key={x} d={`M${x} 98V68L${x + 4} 61L${x + 8} 68V98Z`} />
          ))}
        </g>

        {/* Dead tree */}
        <g fill="none" stroke={STONE} strokeLinecap="round">
          <path strokeWidth="8" d="M884 98C881 76 888 56 883 26" />
          <path strokeWidth="5" d="M884 62C872 52 862 50 848 38" />
          <path strokeWidth="5" d="M886 48C896 40 904 34 916 18" />
          <path strokeWidth="3" d="M883 36C876 28 874 20 866 10" />
          <path strokeWidth="3" d="M902 34C910 32 916 34 926 28" />
          <path strokeWidth="3" d="M858 46C852 46 846 48 838 46" />
        </g>

        <Eyes x={209} y={66} />
        <Eyes x={1068} y={52} alt />

        <Pumpkin x={418} y={56} scale={0.7} flame="b" />
        <Pumpkin x={466} y={40} scale={1} flame="a" />
        <Pumpkin x={540} y={64} scale={0.55} flame="c" />
        <Pumpkin x={612} y={58} scale={0.6} flame="b" />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Ghost
   ------------------------------------------------------------------------ */

/** One floating ghost that fades out at the hem. Parent must be `relative`. */
export function Ghost() {
  const id = useId();
  if (site.season === "off") return null;

  return (
    <svg aria-hidden viewBox="0 0 48 58" className="spooky spooky-ghost">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="#f7f7f5" />
          <stop offset="1" stopColor="#f7f7f5" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        d="M24 3C12 3 6 12 6 25V30L1 35L6 38V55L12 50L18 55L24 50L30 55L36 50L42 55V38L47 35L42 30V25C42 12 36 3 24 3Z"
        fill={`url(#${id})`}
      />
      <ellipse cx="17" cy="22" rx="3.2" ry="4.6" fill="#0c0910" />
      <ellipse cx="31" cy="22" rx="3.2" ry="4.6" fill="#0c0910" />
      <ellipse cx="24" cy="33" rx="3.4" ry="4.8" fill="#0c0910" />
    </svg>
  );
}
