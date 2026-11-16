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
  role: "Software developer",

  /** The homepage statement. One line per array entry. Set at ~120px. */
  headline: ["Software that", "respects the", "machine."],

  /** One paragraph under the headline. */
  intro:
    "I build native desktop apps, developer tools and small web interfaces, mostly in Rust, C# and TypeScript. The work usually starts with something that should be fast, local or readable — and isn't.",

  /**
   * Seasonal theme. "auto" turns Halloween on from 1 October to 2 November
   * in the visitor's own timezone. "halloween" forces it on, "off" removes it.
   */
  season: "auto" as "auto" | "halloween" | "off",

  /** Live production URL. Used for canonical tags, sitemap and Open Graph. */
  url: "https://www.cerbis.xyz",

  email: "cerbi@cerbis.xyz",

  /** First year of public work. Printed on the About page and in JSON-LD. */
  since: "2022",

  /** Home base. Stated once, as a fact. */
  location: "Florence, Italy",

  /** Availability. Stated once, in the nav. Set `open: false` to flip it. */
  availability: {
    open: true,
    label: "Open to interesting work",
    closedLabel: "Not taking work",
  },

  /**
   * The metadata row under the homepage statement. These are claims about
   * you, so they live here rather than being invented in a component.
   */
  facts: [
    { label: "Based", value: "Florence, Italy" },
    { label: "Building since", value: "2022" },
    { label: "Currently", value: "Yappuccino" },
  ],

  /** Footer + contact links. `profile` marks URLs that identify me, for JSON-LD. */
  links: [
    { label: "GitHub", href: "https://github.com/cerbiss", profile: true },
    { label: "Hearthlens", href: "https://hearthlens.vercel.app/", profile: false },
    { label: "X", href: "https://x.com/CERBi_S", profile: true },
    { label: "Discord", href: "https://discord.com/users/1549424708292837438", profile: true },
  ],

  /** What I take on. Four reads best. */
  capabilities: [
    {
      title: "Native apps",
      body: "Apps that draw their own window instead of shipping a browser. Rust with Slint and Skia, C# with Avalonia, then the unglamorous part: installers, updates and data that stays on the machine.",
    },
    {
      title: "Developer tools",
      body: "Bridges, extensions and small automations that remove a step from someone's day. Local-first by default, standard library where possible, and the failure modes written down instead of hidden.",
    },
    {
      title: "Web interfaces",
      body: "Next.js and React interfaces that are fast by default: static where possible, accessible where it matters, and no dashboard for its own sake. I design the interface as well as build it.",
    },
    {
      title: "Game systems",
      body: "Server-side Lua for FiveM and Roblox: anti-cheat, economy and interface systems that assume the client is lying. Runtime-reloadable modules, permissions, and limits stated plainly.",
    },
  ],

  /** Working principles. Each one points at a project that proves it. */
  principles: [
    {
      title: "Measure the claim",
      body: "When a project carries a number, there is a method behind it: four memory states measured against Vesktop, forty-one headless tests, a launch timed from click to readable messages. If it cannot be repeated, it does not go on the page.",
    },
    {
      title: "Keep it local",
      body: "HearthLens stores match history in SQLite and reads only the game's logs. The prompt enhancer analyses prompts in the browser. The Unreal bridge runs on localhost with no API key. Data stays where the work happens unless there is a reason to move it.",
    },
    {
      title: "Remove the layer",
      body: "The fastest code is the runtime you never ship. A Discord client with no browser engine, a bridge with no cloud relay, a handbook with no database. Reach for the smaller architecture before reaching for more hardware.",
    },
    {
      title: "Write the limits down",
      body: "Feature gaps, unsupported platforms and checks that would require trusting the client are documented next to the features. An honest limitation is more useful than a hidden one.",
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
    "I build software that tries not to waste what it runs on. Native desktop apps, developer tools and small web interfaces, mostly in Rust, C# and TypeScript.",
    "The projects I keep returning to are replacements. A Discord client with no browser in it. A Hearthstone companion that reads logs instead of touching the game. An anti-cheat you can read and reload while the server is still up. Usually the constraint is more interesting than the feature list.",
    "I am based in Florence. I work on my own projects and take on work when the problem is clear enough to test. When a project needs an interface I design that too; that is where the Roblox screens come from.",
  ],

  /** Grouped tool chips. */
  toolkit: [
    { group: "Languages", items: ["Rust", "C#", "TypeScript", "Python", "Lua"] },
    { group: "Desktop", items: ["Slint", "Skia", "Avalonia", ".NET"] },
    { group: "Web", items: ["Next.js", "React", "Tailwind CSS", "SQLite"] },
    { group: "Workflow", items: ["Git", "Linux", "Windows", "Vercel"] },
    { group: "Design", items: ["Figma", "Photoshop", "Illustrator"] },
  ],

  /**
   * Developer experience. Newest first. These are claims about you, so the
   * list starts empty — an empty array renders nothing on the about page.
   */
  developer: [
    {
      period: "2026 — now",
      title: "Yappuccino",
      where: "Native Discord client · open source",
      detail:
        "A Discord client written in Rust with Slint and Skia, with no browser engine anywhere. About 30 MB idle against 724 MB for the Electron app, with voice, video, screen sharing and ten themes. It continues the yapfast fork and is published as a beta.",
      stack: ["Rust", "Slint", "Skia", "Discord API"],
    },
    {
      period: "2026 — now",
      title: "HearthLens",
      where: "Hearthstone companion · .NET",
      detail:
        "A cross-platform overlay, deck tracker and Battlegrounds advisor. It reads Hearthstone's logs and a few read-only memory values; it never writes to the game. One .NET core, Avalonia UI, SQLite history and installers for Windows, macOS and Linux.",
      stack: ["C#", ".NET 10", "Avalonia", "SQLite", "xUnit"],
    },
    {
      period: "2025 — now",
      title: "AqquaAC / FivemAC",
      where: "FiveM anti-cheat · open source",
      detail:
        "Server-side Lua anti-cheat with runtime-reloadable modules, ACE permissions and a documented threat model. Maintainer of AqquaAC and author of FivemAC, its score-decay and webhook-alert counterpart.",
      stack: ["Lua", "FiveM", "ConVars", "ACE"],
    },
    {
      period: "2025",
      title: "MC&D Onboarding Handbook",
      where: "Web app · live",
      detail:
        "A Next.js handbook for a roleplay company: eight searchable sections, four format generators, a command palette and a static deployment. Built with the company's own archival visual language instead of a generic docs theme.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI"],
    },
  ] as readonly DeveloperEntry[],

  /** Short timeline. Newest first. */
  timeline: [
    {
      year: "2026",
      title: "Native apps",
      detail:
        "Yappuccino and HearthLens. Replacing browser-based tools with apps that draw their own windows and keep their data on the machine.",
    },
    {
      year: "2025",
      title: "Tools and systems",
      detail:
        "AqquaAC, the MC&D handbook and the prompt enhancer. Mostly open source, mostly server-side or in the browser, all documented.",
    },
    {
      year: "2024",
      title: "Open source",
      detail:
        "First public contributions, including Italian localisation work for YimMenu.",
    },
    {
      year: "2022",
      title: "Studio",
      detail:
        "Started building Roblox interfaces and Luau systems. The design archive still lives on this site, kept separate from the engineering work.",
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
    "Cerbis",
    "software developer Florence",
    "Rust developer",
    "native desktop app developer",
    "C# developer",
    "TypeScript developer",
    "Next.js developer",
    "open source developer",
    "developer tools",
    "interface design",
  ],
} as const;
