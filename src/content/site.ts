/* ============================================================================
   SITE CONFIG — edit this file first.
   Everything here appears across the whole site.
   ============================================================================ */

export const site = {
  /** Your name or handle. Appears in the nav, footer, page titles and JSON-LD. */
  name: "Cerbis",

  /**
   * Used for the <title> template and the JSON-LD jobTitle. Deliberately not
   * printed as a badge on every page — a job title pinned to four surfaces in
   * mono uppercase is furniture, not information.
   */
  role: "Roblox UI designer & developer",

  /** The homepage statement. One line per array entry. Set at ~120px. */
  headline: ["Menus, shops", "and HUDs for", "Roblox games."],

  /** One paragraph under the headline. */
  intro:
    "I design UI for Roblox games and build it in Studio. Mostly the screens players open fifty times a session: shops, upgrade menus, daily rewards, the buttons down the side of the HUD. Small surfaces, heavy traffic, almost always a phone.",

  /**
   * Seasonal theme. "auto" turns Halloween on from 1 October to 2 November
   * in the visitor's own timezone. "halloween" forces it on, "off" removes it.
   */
  season: "auto" as "auto" | "halloween" | "off",

  /** Live production URL. Used for canonical tags, sitemap and Open Graph. */
  url: "https://www.cerbis.xyz",

  email: "cerbi@cerbis.xyz",

  /** Availability. Stated once, in the nav. Set `open: false` to flip it. */
  availability: {
    open: true,
    label: "Open for new work",
    closedLabel: "Not taking work",
  },

  /**
   * The metadata row under the homepage statement. These are claims about
   * you, so they live here rather than being invented in a component.
   */
  facts: [
    { label: "Based", value: "Remote" },
    { label: "Since", value: "2022" },
    { label: "Works in", value: "Figma + Studio" },
  ],

  /** Footer + contact links. */
  links: [
    { label: "X", href: "https://x.com/CERBi_S" },
    { label: "Discord", href: "https://discord.com/users/1549424708292837438" },
  ],

  /** What I take on. Four reads best. */
  capabilities: [
    {
      title: "Screens",
      body: "Shops, upgrade menus, reward popups, settings, HUD. I design them against the actual loop, which usually means finding out how often a screen gets opened before deciding how much room it gets.",
    },
    {
      title: "Systems",
      body: "One set of frames, buttons, badges and type sizes that every later screen is built from. Costs a bit more on screen one. Saves you on screen twenty.",
    },
    {
      title: "Build",
      body: "I hand over working Luau, not a Figma link. Scaling handled for phone, tablet and desktop, with state kept somewhere your programmer can find it.",
    },
    {
      title: "Second opinion",
      body: "If your game is live and something in the UI is losing people, I will play it and write up what I would change. Cheaper than a rebuild, and sometimes that is all it needs.",
    },
  ],
} as const;

/** One developer role or project. Shown on the about page, newest first. */
export type DeveloperEntry = {
  /** "2024", or a range like "2023 — 2025". */
  period: string;
  /** What you were, e.g. "Gameplay scripter". */
  title: string;
  /** Studio, game or client. Leave out for solo work. */
  where?: string;
  detail: string;
  /** Rendered as a mono line under the detail. */
  stack?: readonly string[];
};

/* ---------------------------------------------------------------------------
   ABOUT PAGE COPY
   --------------------------------------------------------------------------- */
export const about = {
  /** Each string is one paragraph. */
  bio: [
    "I make interfaces for Roblox games. Most of my work is the middle part nobody screenshots: the shop that has to sell without nagging, the upgrade menu that still makes sense at level 40, the popup a player meets on their second morning.",
    "Almost everyone plays on a phone, often outside, often on a cracked screen. That is the constraint I design to. If a label is unreadable there, it does not matter how it looks in Figma.",
    "I build what I design. Partly stubbornness — I got tired of handing off files and watching the spacing drift — and partly because being the one who implements it changes what you are willing to draw.",
  ],

  /** Grouped tool chips. */
  toolkit: [
    { group: "Design", items: ["Figma", "Photoshop", "Illustrator"] },
    { group: "Build", items: ["Roblox Studio", "Luau", "Rojo"] },
    { group: "Motion", items: ["TweenService", "After Effects"] },
  ],

  /**
   * Developer experience. Newest first. These are claims about you, so the
   * list starts empty — an empty array renders nothing on the about page.
   */
  developer: [] as readonly DeveloperEntry[],

  /** Short timeline. Newest first. */
  timeline: [
    {
      year: "2025",
      title: "Freelance",
      detail:
        "Full UI sets for small studios. Usually every menu at once rather than one screen at a time.",
    },
    {
      year: "2023",
      title: "First paid rework",
      detail:
        "Rebuilt the HUD and shop on a game that was already live. Learned what breaks when 400 people are mid-session.",
    },
    {
      year: "2022",
      title: "Studio",
      detail:
        "Started in Roblox Studio, mostly rebuilding menus I liked until I could work out why they were laid out that way.",
    },
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
    "Roblox developer",
    "Roblox scripter",
    "Luau developer",
    "Roblox UI commissions",
    "Roblox interface design",
    "Roblox HUD design",
    "game UI designer",
  ],
} as const;
