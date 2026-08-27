/* ============================================================================
   SITE CONFIG — edit this file first.
   Everything here appears across the whole site. Nothing else needs touching
   to make it yours.
   ============================================================================ */

export const site = {
  /** Your name or handle. Appears in the nav, footer, page titles and JSON-LD. */
  name: "Cerbis",

  /** Shown under your name in the footer and in the <title> template. */
  role: "Roblox UI/UX Designer",

  /** The big homepage statement. Keep it short — it is set at ~120px. */
  headline: ["Roblox UI", "that players", "actually use"],

  /** One paragraph under the headline. Say what you do and who for. */
  intro:
    "I design and build interface systems for Roblox experiences — HUDs, shops, inventories and onboarding flows that stay readable at speed, scale across devices, and hand off clean to engineers.",

  /** Live production URL. Used for canonical tags, sitemap and Open Graph. */
  url: "https://example.com",

  email: "cerbi@cerbis.xyz",

  /** Availability pill in the nav. Set `open: false` to switch it to closed. */
  availability: {
    open: true,
    label: "Available for commissions",
    closedLabel: "Currently booked",
  },

  /**
   * The metadata row under the homepage statement. These are claims about
   * you, so they live here rather than being invented in a component.
   * Add or remove entries freely — the row lays out whatever it is given.
   */
  facts: [
    { label: "Based", value: "Remote" },
    { label: "Experience", value: "4 years" },
    { label: "Focus", value: "Interface systems" },
  ],

  /** Footer + contact links. Delete any you do not use. */
  links: [
    { label: "Roblox", href: "https://www.roblox.com/users/0/profile" },
    { label: "X / Twitter", href: "https://x.com/" },
    { label: "Discord", href: "https://discord.com/users/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],

  /** Scrolling strip on the homepage. Short phrases work best. */
  marquee: [
    "HUD systems",
    "Shop & economy UI",
    "Inventory design",
    "Onboarding / FTUE",
    "Design systems",
    "UI engineering",
    "Motion & feedback",
    "Mobile-first layout",
  ],

  /** What you offer. Three or four reads best. */
  capabilities: [
    {
      title: "Interface design",
      body: "HUDs, menus, shops and inventories designed around the actual moment-to-moment loop — not static mockups that fall apart in play.",
    },
    {
      title: "Design systems",
      body: "Reusable component libraries, spacing and type scales, and colour tokens that keep a growing game visually coherent across dozens of screens.",
    },
    {
      title: "UI engineering",
      body: "Production Luau implementation with clean state handling, responsive scaling across phone, tablet and desktop, and tidy handoff your engineers can extend.",
    },
    {
      title: "UX review",
      body: "Audits of live experiences: where players stall, what they miss, and the specific interface changes that move retention and conversion.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
   ABOUT PAGE COPY
   --------------------------------------------------------------------------- */
export const about = {
  /** Each string is one paragraph. */
  bio: [
    "I design interfaces for Roblox experiences. Most of my work sits in the unglamorous middle of a game — the shop that has to sell without nagging, the inventory that has to stay legible at forty items, the first ninety seconds that decide whether a player stays.",
    "I care about interfaces that survive contact with real players: readable on a cracked phone screen in bright light, fast enough to feel instant, and consistent enough that a player never has to relearn where things are.",
    "I work end to end — research and wireframes through to production Luau — which means the thing I hand over is the thing players actually get, not a mockup someone else has to reinterpret.",
  ],

  /** Grouped tool chips. */
  toolkit: [
    { group: "Design", items: ["Figma", "Photoshop", "Illustrator", "Blender"] },
    { group: "Build", items: ["Roblox Studio", "Luau", "Rojo", "Fusion", "Roact"] },
    { group: "Motion", items: ["After Effects", "TweenService", "Rive"] },
    { group: "Process", items: ["Notion", "Miro", "Git", "Playtest analytics"] },
  ],

  /** Short timeline. Newest first. */
  timeline: [
    { year: "2025", title: "Freelance UI/UX", detail: "Interface systems for independent Roblox studios." },
    { year: "2024", title: "Design systems focus", detail: "Built reusable component libraries across multiple live titles." },
    { year: "2023", title: "First shipped UI", detail: "Shipped a full HUD and shop rework on a live experience." },
    { year: "2022", title: "Started in Studio", detail: "Moved from playing to building — learned Luau and interface scaling." },
  ],
} as const;

/* ---------------------------------------------------------------------------
   SEO defaults
   --------------------------------------------------------------------------- */
export const seo = {
  titleTemplate: `%s — ${site.name}`,
  defaultTitle: `${site.name} — ${site.role}`,
  description: site.intro,
  keywords: [
    "Roblox UI designer",
    "Roblox UX",
    "Roblox interface design",
    "Roblox HUD design",
    "game UI designer",
    "Luau UI",
    "Roblox design systems",
  ],
} as const;
