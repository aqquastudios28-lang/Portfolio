import type { Project } from "./types";

/* ============================================================================
   EXAMPLE CONTENT — REPLACE BEFORE PUBLISHING
   ----------------------------------------------------------------------------
   Every project below is scaffolding: plausible structure with placeholder
   copy and illustrative metrics. Swap in your real work, your real numbers,
   and your real screenshots. Do not ship these figures as if they were yours.

   ADDING MEDIA
   1. Drop files in  public/media/projects/<slug>/
   2. Set  src: "/media/projects/<slug>/hero.png"
   3. Use  kind: "video"  for .mp4/.webm loops (convert GIFs to mp4 — far smaller)
   Any slot left with  src: ""  renders a labelled placeholder frame instead.
   ============================================================================ */

export const projects: Project[] = [
  {
    slug: "game-ui-suite",
    title: "Simulator Game UI & Economy Suite",
    summary:
      "A complete cartoon-style Roblox UI system spanning vendor shop, gacha rolling, stat upgrades, daily rewards, and settings.",
    category: "Systems",
    year: "2025",
    role: "UI/UX Design, Visual Assets, Layout Architecture",
    tools: ["Figma", "Roblox Studio", "Photoshop", "Luau"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/game-ui-suite/vendor.png",
      kind: "image",
      alt: "Roblox Vendor hub modal displaying Gacha and Upgrades entry options",
      ratio: "16/9",
    },
    overview:
      "A complete interface suite designed for a fast-paced Roblox simulator experience. The system encompasses core player engagement loops: economy interaction through the Vendor hub, randomized Gacha rolling with transparent odds, player stat upgrades with multi-purchase options, a 6-day retention daily rewards calendar, and accessible settings controls.",
    problem:
      "Roblox simulator interfaces often suffer from visual clutter, unreadable drop rates, and clunky mobile touch targets. The design challenge was to establish high visual polish with bold silhouettes, high-contrast modal frames, and immediate tactile feedback while keeping every mechanic intuitive on both mobile and desktop screens.",
    process: [
      {
        title: "Built a cohesive cartoony design system",
        body: "Defined consistent border weights, bevels, header ribbons, vibrant gradient fills, and comic typography across all five modal windows for instant visual recognition.",
      },
      {
        title: "Engineered transparent odds & economy UX",
        body: "Structured the Gacha interface with explicit drop rates and tiered pricing (Buy 1, Buy 3, Buy 10) so players always know their exact odds and costs.",
      },
      {
        title: "Designed high-efficiency upgrade menus",
        body: "Built the Upgrades interface with dedicated 'Buy Max' and 'Buy 1' action buttons alongside distinct icons for Slots, Luck, and Mutation to streamline progression.",
      },
      {
        title: "Implemented a 6-day retention calendar",
        body: "Created a daily rewards loop with clear visual states for Claim, Locked, and Claimed days to drive recurring daily player logins.",
      },
      {
        title: "Polished tactile micro-interactions",
        body: "Designed high-contrast glowing toggle switches for shadows and audio settings with unmistakable green/red status recognition.",
      },
    ],
    solution:
      "A unified 5-part interface system featuring bold color-coding, high-contrast frames, clear typography hierarchies, and generous mobile touch targets. The Vendor hub serves as the master navigation layer, routing players seamlessly between luck-based Gacha rolls and deterministic stat Upgrades.",
    gallery: [
      {
        src: "/media/projects/game-ui-suite/gacha.png",
        kind: "image",
        alt: "Gacha roll interface showing normal roll, premium roll, and item drop probabilities",
        caption: "Gacha Roll System — Transparent odds, multi-tier bulk rolling, and dual currency support.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/game-ui-suite/upgrades.jpg",
        kind: "image",
        alt: "Upgrades menu showing stat boost cards, level counters, and Buy Max buttons",
        caption: "Upgrades Menu — Fast level-ups with Buy 1 / Buy Max bulk purchase options and clear stat icons.",
        ratio: "16/9",
      },
      {
        src: "/media/projects/game-ui-suite/daily-rewards.png",
        kind: "image",
        alt: "Daily rewards calendar grid showing claimable and locked reward days",
        caption: "Daily Rewards Loop — 6-day retention calendar with distinct Claim, Locked, and Claimed states.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/game-ui-suite/settings.png",
        kind: "image",
        alt: "Settings modal showing graphic shadow toggles and audio toggles with glowing feedback",
        caption: "Settings Modal — High-contrast glowing toggle switches for audio and visual preferences.",
        ratio: "3/4",
      },
      {
        src: "/media/projects/game-ui-suite/vendor.png",
        kind: "image",
        alt: "Vendor modal split between Gacha and Upgrades portals",
        caption: "Vendor Hub — Primary gateway splitting core economy into Gacha and deterministic Upgrades.",
        ratio: "16/9",
      },
    ],
    outcome:
      "Delivered a complete, production-ready Figma UI kit with reusable components, responsive auto-layout structures, and clean visual assets ready for direct Luau implementation in Roblox Studio.",
    metrics: [
      { value: "5 Screens", label: "Core UI Modals" },
      { value: "100%", label: "Figma Vector Assets" },
      { value: "Mobile-First", label: "Touch Target Scaling" },
    ],
  },
  {
    slug: "ascend-tycoon-hud",
    title: "Ascend Tycoon — HUD & progression",
    summary:
      "Rebuilt the core heads-up display around a single readable progression loop.",
    category: "Client work",
    year: "2025",
    role: "UI/UX design, Luau implementation",
    tools: ["Figma", "Roblox Studio", "Luau", "Fusion"],
    published: true,
    featured: true,
    cover: {
      src: "",
      kind: "image",
      alt: "Ascend Tycoon heads-up display showing cash counter, rebirth meter and quest tracker",
      ratio: "16/9",
    },
    overview:
      "Ascend Tycoon had grown from a weekend prototype into a live experience with six progression systems competing for the same corner of the screen. Players could not tell what to do next, and the rebirth mechanic — the thing that drove long-term retention — was effectively invisible.",
    problem:
      "The HUD had accumulated eleven persistent elements. Nothing had priority, so everything shouted equally. On a phone in portrait, four of those elements overlapped the touch controls entirely. New players in playtests consistently missed the rebirth meter, and three of five could not say what their current objective was after two minutes of play.",
    process: [
      {
        title: "Audited every persistent element",
        body: "Catalogued all eleven HUD items against how often a player actually needed them. Five turned out to be reference information that belonged in a menu, not permanently on screen.",
      },
      {
        title: "Mapped the real attention budget",
        body: "Recorded playtest footage and marked where players actually looked. The top-left and bottom-centre were near-dead zones during active play; the top-right carried almost all the glances.",
      },
      {
        title: "Rebuilt around one primary loop",
        body: "Established a strict hierarchy: current objective first, currency second, everything else demoted to a summonable panel. One element gets to be loud at any moment.",
      },
      {
        title: "Designed for the smallest screen first",
        body: "Laid out the whole system at phone-portrait dimensions with the touch-control safe zones blocked out, then let it breathe upward to tablet and desktop rather than cramming a desktop layout down.",
      },
      {
        title: "Shipped behind a flag and measured",
        body: "Rolled the new HUD to a slice of live traffic alongside the old one so the progression numbers could be compared honestly rather than argued about.",
      },
    ],
    solution:
      "A three-tier hierarchy. Tier one is the active objective, anchored top-right where players already look, with a progress fill that reads at a glance without a number. Tier two is currency and rebirth, grouped into a single unit so they are understood as related rather than competing. Tier three is everything else, collapsed into one summonable panel. The rebirth meter became a persistent arc around the currency cluster — always visible, never in the way.",
    gallery: [
      {
        src: "",
        kind: "image",
        alt: "Before and after comparison of the Ascend Tycoon HUD layout",
        caption: "Before and after — eleven persistent elements reduced to four.",
        ratio: "16/9",
      },
      {
        src: "",
        kind: "video",
        alt: "Screen recording of the rebirth meter filling and triggering its completion state",
        caption:
          "Rebirth arc feedback. The completion state had to feel earned without blocking play.",
        ratio: "16/9",
      },
      {
        src: "",
        kind: "image",
        alt: "The HUD laid out at phone portrait, tablet and desktop dimensions",
        caption:
          "Same system across three form factors. Phone portrait drove every decision.",
        ratio: "4/3",
      },
    ],
    outcome:
      "New players identified their current objective reliably in follow-up playtests, and the rebirth mechanic stopped being something players discovered by accident. The component library built for this rework now backs the other two titles at the studio.",
    metrics: [
      { value: "11 → 4", label: "Persistent HUD elements" },
      { value: "+18%", label: "Day-1 retention" },
      { value: "2.4×", label: "Rebirth discovery rate" },
    ],
  },

  {
    slug: "modular-inventory",
    title: "Modular inventory & loadout system",
    summary: "A grid system that stays legible from six items to six hundred.",
    category: "Systems",
    year: "2025",
    role: "System design, component library",
    tools: ["Figma", "Roblox Studio", "Luau", "Roact"],
    published: true,
    featured: true,
    cover: {
      src: "",
      kind: "image",
      alt: "Modular inventory grid showing item tiles, rarity borders and an equipped loadout panel",
      ratio: "16/9",
    },
    overview:
      "A reusable inventory system built to be dropped into multiple experiences. The brief was scale: it had to look deliberate holding six starter items and stay navigable holding several hundred after months of play.",
    problem:
      "Most Roblox inventories are designed at the size they launch with. They work for a week. Then the item count triples, the grid becomes an undifferentiated wall of icons, and players resort to scrolling blindly. The failure is not visual — it is that nothing encodes relative importance, so every item costs the same amount of attention to skip.",
    process: [
      {
        title: "Stress-tested at realistic scale",
        body: "Built the first prototype populated with four hundred items rather than a tidy dozen. Most layout ideas that looked good at twelve fell apart immediately.",
      },
      {
        title: "Encoded rarity structurally, not just chromatically",
        body: "Rarity drives border weight, corner treatment and tile density — not only colour. Roughly one in twelve players cannot rely on the colour channel alone, and colour also loses against busy item art.",
      },
      {
        title: "Made filtering the primary interaction",
        body: "At scale, browsing is a lost cause. Filter and sort became the main affordance, sitting above the grid rather than hidden behind an icon.",
      },
      {
        title: "Built it as tokens and components",
        body: "Shipped as a documented library — tile, grid, filter bar, detail drawer, loadout slot — so the next game gets the system rather than a copy-paste of the screens.",
      },
    ],
    solution:
      "A density-adaptive grid. Tile size responds to viewport and item count, so a sparse inventory renders large, generous tiles and a full one tightens without ever dropping below the minimum readable touch target. Rarity reads through border weight and corner geometry first, colour second. The filter bar is persistent and its active state is unmissable, because the most common failure mode is a player forgetting a filter is on.",
    gallery: [
      {
        src: "",
        kind: "image",
        alt: "Inventory grid at sparse and dense item counts side by side",
        caption: "Twelve items versus four hundred. Same system, adapted density.",
        ratio: "16/9",
      },
      {
        src: "",
        kind: "video",
        alt: "Screen recording of filtering and sorting the inventory grid",
        caption: "Filtering is the primary interaction, not a hidden secondary one.",
        ratio: "16/9",
      },
      {
        src: "",
        kind: "image",
        alt: "Component library sheet showing tile states, rarity treatments and spacing tokens",
        caption: "Shipped as a documented library rather than a set of screens.",
        ratio: "4/3",
      },
    ],
    outcome:
      "The system is running in three experiences. Because rarity is structural rather than purely chromatic, it survived a full art-direction change in one of them without any interface rework.",
    metrics: [
      { value: "3", label: "Experiences running it" },
      { value: "600+", label: "Items without redesign" },
      { value: "WCAG AA", label: "Contrast across all tiers" },
    ],
  },

  {
    slug: "first-ninety-seconds",
    title: "The first ninety seconds",
    summary:
      "An onboarding flow that teaches by doing instead of by dialogue box.",
    category: "Client work",
    year: "2024",
    role: "UX research, flow design, implementation",
    tools: ["Figma", "Miro", "Roblox Studio", "Luau"],
    published: true,
    featured: true,
    cover: {
      src: "",
      kind: "image",
      alt: "Onboarding sequence showing a contextual prompt anchored to a world object",
      ratio: "16/9",
    },
    overview:
      "A rework of the first-time user experience for a live obby-adjacent experience that was losing most of its new players before they reached the first real mechanic.",
    problem:
      "Onboarding was four full-screen modals stacked back to back before the player could move. Session recordings showed the pattern clearly: players dismissed all four as fast as the buttons allowed, then stood still, because nothing had actually been taught. The information had been delivered and none of it had been learned.",
    process: [
      {
        title: "Watched people fail",
        body: "Sat through twenty first-session recordings without touching anything. The modals were not being read — median time on the longest one was under two seconds.",
      },
      {
        title: "Separated must-know from nice-to-know",
        body: "Of eleven things the modals explained, two were needed in the first ninety seconds. The rest were reference material that could surface on demand.",
      },
      {
        title: "Anchored teaching to the world",
        body: "Replaced full-screen modals with small prompts attached to the actual object the player needed to interact with, appearing when they were near it.",
      },
      {
        title: "Made progress the only gate",
        body: "Nothing advances on a timer or a dismiss button. The prompt clears when the player performs the action, so completing it and understanding it are the same event.",
      },
    ],
    solution:
      "Zero blocking modals. Two contextual prompts, each anchored in world space to the object it describes, each clearing only on successful interaction. Everything else moved into a help panel reachable at any time. The player is in control from the first frame — which is the only reliable way to make the first frame feel worth staying for.",
    gallery: [
      {
        src: "",
        kind: "video",
        alt: "Screen recording of the full ninety-second onboarding flow from spawn to first mechanic",
        caption: "The whole flow, spawn to first real mechanic.",
        ratio: "16/9",
      },
      {
        src: "",
        kind: "image",
        alt: "Flow diagram comparing the old modal sequence with the new contextual prompts",
        caption: "Four blocking modals replaced by two contextual prompts.",
        ratio: "16/9",
      },
    ],
    outcome:
      "New players reached the first real mechanic substantially more often, and the support questions that used to arrive daily about basic controls largely stopped.",
    metrics: [
      { value: "4 → 0", label: "Blocking modals" },
      { value: "+31%", label: "Reached first mechanic" },
      { value: "-62%", label: "Basic control questions" },
    ],
  },

  {
    slug: "shop-economy-ui",
    title: "Shop & economy interface",
    summary:
      "Selling without nagging — a storefront built on clarity rather than pressure.",
    category: "Client work",
    year: "2024",
    role: "UI/UX design, Luau implementation",
    tools: ["Figma", "Roblox Studio", "Luau"],
    published: true,
    featured: false,
    cover: {
      src: "",
      kind: "image",
      alt: "Shop interface showing item cards, currency balance and a purchase confirmation state",
      ratio: "16/9",
    },
    overview:
      "A full redesign of the storefront and currency presentation for a mid-sized simulator, with an explicit brief to raise conversion without adopting the dark patterns common in the category.",
    problem:
      "The existing shop used a countdown timer on a permanent offer, a pre-ticked bundle upsell, and a confirmation dialog where the confirm button was styled far louder than cancel. It converted acceptably and generated a steady stream of refund requests and negative comments. The pressure was working and costing more than it earned.",
    process: [
      {
        title: "Removed every false urgency signal",
        body: "The permanent countdown went first. If a timer is always running, it is not information — and players who notice it stop trusting anything else the interface says.",
      },
      {
        title: "Made price and value legible",
        body: "Every item states plainly what it does and what it costs, with no per-unit maths left as an exercise for the player.",
      },
      {
        title: "Gave confirmation equal weight",
        body: "Confirm and cancel got the same visual weight. An accidental purchase is a refund request and a lost player, which is worse than a slightly slower checkout.",
      },
      {
        title: "Tested against the old shop honestly",
        body: "Ran both live, on real traffic, and compared conversion alongside refund rate and sentiment rather than conversion alone.",
      },
    ],
    solution:
      "A calm storefront. Clear categories, honest pricing, real scarcity only where scarcity is real. The currency balance sits in a fixed position so players always know where they stand before they open anything. Purchase confirmation is a genuine decision point rather than a formality dressed as one.",
    gallery: [
      {
        src: "",
        kind: "image",
        alt: "Shop grid showing item cards with pricing and category tabs",
        caption: "Categories and honest pricing. No permanent countdown.",
        ratio: "16/9",
      },
      {
        src: "",
        kind: "video",
        alt: "Screen recording of the purchase confirmation flow",
        caption: "Confirm and cancel carry equal visual weight.",
        ratio: "16/9",
      },
    ],
    outcome:
      "Conversion held roughly steady while refund requests dropped sharply and store sentiment in the comments improved — a materially better trade than the old numbers suggested.",
    metrics: [
      { value: "-71%", label: "Refund requests" },
      { value: "0", label: "Dark patterns" },
      { value: "+4%", label: "Conversion" },
    ],
  },

  {
    slug: "nightfall-concept",
    title: "Nightfall — interface concept",
    summary:
      "A self-directed exploration of diegetic UI for a survival experience.",
    category: "Concept",
    year: "2024",
    role: "Self-directed concept",
    tools: ["Figma", "Blender", "After Effects"],
    published: true,
    featured: false,
    cover: {
      src: "",
      kind: "image",
      alt: "Nightfall concept art showing a diegetic wrist-mounted interface",
      ratio: "16/9",
    },
    overview:
      "An unbuilt concept exploring how far a Roblox survival experience can push diegetic interface — information living inside the world rather than floating above it.",
    problem:
      "Survival experiences lean on dense overlays: hunger, temperature, stamina, inventory weight, all stacked in a corner. It is functional and it flattens the atmosphere the rest of the game works to build. The question was whether the same information could live in the world without becoming unreadable under pressure.",
    process: [
      {
        title: "Inventoried what genuinely needs to persist",
        body: "Most survival stats only matter near their thresholds. Persistent display of a full hunger bar is wasted attention for the ninety percent of the time it is fine.",
      },
      {
        title: "Moved state onto objects",
        body: "Condition reads off the equipped tool, warmth off the character's own animation and breath, inventory weight off how the pack sits. The world reports its own state.",
      },
      {
        title: "Kept an escape hatch",
        body: "Fully diegetic UI fails under time pressure. A held-button overlay surfaces exact numbers when a player needs precision, which keeps the ambient layer honest rather than precious.",
      },
    ],
    solution:
      "A layered approach. Ambient state through world and character cues, a wrist-mounted panel for deliberate checks, and a conventional overlay on demand for moments that need precision. Atmosphere by default, clarity when it is asked for.",
    gallery: [
      {
        src: "",
        kind: "image",
        alt: "Concept frames showing the wrist panel at several states",
        caption: "Wrist panel states — deliberate checks rather than persistent display.",
        ratio: "16/9",
      },
      {
        src: "",
        kind: "video",
        alt: "Motion study of the wrist panel opening and resolving",
        caption:
          "Motion study. The open has to be fast enough to not cost the player anything.",
        ratio: "16/9",
      },
    ],
    outcome:
      "Unbuilt, and kept here deliberately. The layered ambient-plus-on-demand pattern has since shaped how I handle secondary information in shipped work.",
    metrics: [
      { value: "Concept", label: "Status" },
      { value: "3", label: "Information layers" },
      { value: "2024", label: "Explored" },
    ],
  },
];

/* ---------------------------------------------------------------------------
   Selectors
   --------------------------------------------------------------------------- */
export const publishedProjects = projects.filter((p) => p.published);

export const featuredProjects = publishedProjects.filter((p) => p.featured);

export const categories = [
  "All",
  ...Array.from(new Set(publishedProjects.map((p) => p.category))),
];

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}

/** Wraps around, so the last case study points back at the first. */
export function getNextProject(slug: string): Project | undefined {
  const i = publishedProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return publishedProjects[(i + 1) % publishedProjects.length];
}
