import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "roblox-interface-suite",
    title: "Game Interface & Navigation Master Suite",
    summary:
      "A complete modular Roblox UI design system featuring navigation hub, storefront, gacha rolls, stat upgrades, retention rewards, and settings.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Visual Direction, Figma Component System",
    tools: ["Figma", "Roblox Studio", "Photoshop", "Luau"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Index.png",
      kind: "image",
      alt: "Roblox Game UI navigation hub displaying core game portals and actions",
      ratio: "4/3",
    },
    overview:
      "Designed and built a cohesive, production-ready interface suite for Roblox experiences. The design system covers every primary touchpoint in the player journey: high-level navigation, currency monetization, transparent RNG mechanics, progression loops, daily retention calendars, and player accessibility settings.",
    problem:
      "Many Roblox game interfaces suffer from inconsistent visual styling, low legibility on small phone displays, and cluttered layouts that overwhelm players. The objective was to create a bold, vibrant, and tactile design language that maintains clear visual hierarchy, crisp readability, and satisfying feedback across all device form factors.",
    process: [
      {
        title: "Established unified visual tokens",
        body: "Standardized thick comic outlines, glossy gradient fills, bevel highlights, header ribbons, and consistent close buttons across all modal screens.",
      },
      {
        title: "Designed mobile-friendly touch targets",
        body: "Sized all buttons, purchase triggers, and tab selectors generously to ensure comfortable interaction on mobile screens with zero miss-taps.",
      },
      {
        title: "Engineered transparent monetization & odds UX",
        body: "Structured shop and gacha interfaces with clear drop probabilities, tiered bundle pricing (Buy 1, Buy 3, Buy 10), and clear value props.",
      },
      {
        title: "Created multi-state retention & progression flows",
        body: "Designed 6-day daily reward loops with distinct Claim, Locked, and Claimed visual treatments alongside fast-action Buy Max upgrade controls.",
      },
      {
        title: "Designed tactile feedback states",
        body: "Created high-contrast glowing toggle switches and active button states that give immediate audio-visual confirmation.",
      },
    ],
    solution:
      "A 9-frame modular UI system built with reusable Figma auto-layout components. The unified design language ensures instant familiarity as players transition from the main navigation hub into specialized sub-menus.",
    gallery: [
      {
        src: "/media/projects/Index.png",
        kind: "image",
        alt: "Main interface index modal showing navigation options",
        caption: "Main Index Hub — Master navigation screen connecting core experience modes.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/Vendor.png",
        kind: "image",
        alt: "Vendor modal splitting into Gacha and Upgrades portals",
        caption: "Vendor Hub — Economy gateway directing players to Gacha rolls or Stat Upgrades.",
        ratio: "16/9",
      },
      {
        src: "/media/projects/Gacha.png",
        kind: "image",
        alt: "Gacha rolling modal with normal rolls, premium rolls, and drop odds",
        caption: "Gacha Rolling System — Transparent odds display with multi-roll buy options.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/GemsShop.png",
        kind: "image",
        alt: "Gems currency shop modal showing tiered gem packs and pricing",
        caption: "Gems Currency Store — Tiered gem purchasing packs with clean pricing hierarchy.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/Pass.png",
        kind: "image",
        alt: "Gamepass and season pass shop modal",
        caption: "Gamepass Store — Showcase for VIP perks, exclusive passes, and limited offers.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/Upgrades@2x.png",
        kind: "image",
        alt: "Stat upgrades menu with Buy 1 and Buy Max bulk purchase options",
        caption: "Stat Upgrades Menu — High-speed progression with dedicated Buy Max and Buy 1 triggers.",
        ratio: "1/1",
      },
      {
        src: "/media/projects/DailyRewards.png",
        kind: "image",
        alt: "6-day daily rewards calendar with claim and locked reward states",
        caption: "Daily Retention Calendar — 6-day login progression with distinct visual claim states.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/LeftSideBar.png",
        kind: "image",
        alt: "Left vertical sidebar navigation bar",
        caption: "Left Quick-Nav Sidebar — Compact, persistent sidebar for fast modal summoning.",
        ratio: "2/3",
      },
      {
        src: "/media/projects/Settings.png",
        kind: "image",
        alt: "Settings modal with shadow and music glowing toggle switches",
        caption: "Settings Menu — Tactile glowing toggle switches for visual and audio preferences.",
        ratio: "2/3",
      },
    ],
    outcome:
      "All frames were built with strict component architecture in Figma, ready for pixel-perfect slice export and Luau implementation in Roblox Studio.",
    metrics: [
      { value: "9 Frames", label: "Complete UI System" },
      { value: "100%", label: "Vector Figma Assets" },
      { value: "Mobile-Ready", label: "Touch-Optimized" },
    ],
  },

  {
    slug: "storefront-gamepass-system",
    title: "Storefront, Gems & Gamepass System",
    summary:
      "A complete monetization storefront featuring currency packs, VIP gamepasses, and merchant hubs.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Asset Creation",
    tools: ["Figma", "Photoshop", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/GemsShop.png",
      kind: "image",
      alt: "Gems Currency Storefront showing tiered packs",
      ratio: "4/3",
    },
    overview:
      "Designed a full storefront and economy interface system for Roblox. Covers currency bundles, gamepasses, and merchant vendor hubs, built to drive clear monetization without dark patterns.",
    problem:
      "Storefronts often suffer from confusing pricing tiers and messy layout hierarchy. The goal was to make item values instantly legible and purchase flows frictionless.",
    process: [
      {
        title: "Clear value visual hierarchy",
        body: "Differentiated gem packs with distinct visual scaling, glowing borders, and bold currency values.",
      },
      {
        title: "Prominent gamepass callouts",
        body: "Designed distinct badges and benefit callouts for VIP and premium perks.",
      },
      {
        title: "Streamlined vendor routing",
        body: "Built the vendor portal screen to split player intent cleanly between rolling and deterministic upgrades.",
      },
    ],
    solution:
      "A high-contrast, colorful store design with distinct item frames, readable price tags, and clear purchase confirmations.",
    gallery: [
      {
        src: "/media/projects/GemsShop.png",
        kind: "image",
        alt: "Gems Currency Shop",
        caption: "Gems Shop — Multiple tiers with clear value propositions.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/Pass.png",
        kind: "image",
        alt: "Gamepass and VIP Shop",
        caption: "Pass Store — Clear feature listing and immediate purchase triggers.",
        ratio: "4/3",
      },
      {
        src: "/media/projects/Vendor.png",
        kind: "image",
        alt: "Vendor Hub",
        caption: "Vendor Gateway — Direct routing to Gacha and Upgrades.",
        ratio: "16/9",
      },
    ],
    outcome:
      "Delivered clean, modular shop frames with easily swappable prices, icons, and bundle banners.",
    metrics: [
      { value: "3 Modals", label: "Storefront Screens" },
      { value: "High Contrast", label: "Visual Legibility" },
      { value: "100%", label: "Scalable Vector UI" },
    ],
  },

  {
    slug: "gacha-rng-system",
    title: "Gacha & RNG Rolling Interface",
    summary:
      "A transparent gacha roll system featuring normal & premium rolls, explicit odds, and bulk rolling.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, System Architecture",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Gacha.png",
      kind: "image",
      alt: "Gacha Rolling System UI",
      ratio: "4/3",
    },
    overview:
      "Designed a complete Gacha rolling modal with dual currency support (in-game cash & premium robux/gems) and transparent odds breakdown.",
    problem:
      "Many gacha interfaces conceal drop rates or make multi-rolling clunky. Players need instant clarity on what they can win and how much rolls cost.",
    process: [
      {
        title: "Transparent drop rate table",
        body: "Placed color-coded rarity tiers (Common to Celestial) directly beside the roll view.",
      },
      {
        title: "Multi-tier bulk rolling",
        body: "Designed 1x, 3x, and 10x roll buttons to accommodate both early-game and endgame players.",
      },
      {
        title: "Dual roll tracks",
        body: "Separated standard in-game currency rolls from premium luck-boosted rolls.",
      },
    ],
    solution:
      "A two-tier roll modal with prominent dice iconography, vivid cyber grid textures, and high-visibility action buttons.",
    gallery: [
      {
        src: "/media/projects/Gacha.png",
        kind: "image",
        alt: "Gacha roll screen",
        caption: "Gacha Roll System with transparent odds and multi-purchase triggers.",
        ratio: "4/3",
      },
    ],
    outcome:
      "An engaging, fair, and high-energy roll interface tailored for maximum player satisfaction.",
    metrics: [
      { value: "7 Tiers", label: "Rarity Breakdown" },
      { value: "1x / 3x / 10x", label: "Multi-Roll Options" },
      { value: "Dual Currency", label: "In-Game & Premium" },
    ],
  },

  {
    slug: "progression-stat-upgrades",
    title: "Progression & Stat Upgrades System",
    summary:
      "High-efficiency player upgrade menu with level counters, stat icons, and Buy Max shortcuts.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Iconography",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Upgrades@2x.png",
      kind: "image",
      alt: "Stat Upgrades Menu",
      ratio: "1/1",
    },
    overview:
      "Designed a dedicated character upgrade and stat boost interface. Built for rapid upgrading with custom illustrative icons for inventory slots, luck boosts, and mutation modifiers.",
    problem:
      "Upgrade menus often force players into repetitive clicking. Designing effective bulk-buy shortcuts while preserving clear progression state was essential.",
    process: [
      {
        title: "Custom illustrative icons",
        body: "Crafted detailed vectors for backpack slots, lucky clovers, and mutation rockets.",
      },
      {
        title: "Buy Max & Buy 1 dual actions",
        body: "Gave players immediate choice between deliberate single upgrades and quick bulk investments.",
      },
      {
        title: "Clear level progress indicators",
        body: "Integrated explicit level limits (e.g. 1/24, 1/100, 1/10) to communicate endgame depth.",
      },
    ],
    solution:
      "An energizing green grid upgrade board with high-contrast item rows and bold purchase triggers.",
    gallery: [
      {
        src: "/media/projects/Upgrades@2x.png",
        kind: "image",
        alt: "Stat Upgrades Full Resolution View",
        caption: "Stat Upgrades — Illustrated badges, level counters, and Buy Max buttons.",
        ratio: "1/1",
      },
    ],
    outcome:
      "A fast, clean stat enhancement interface that scales gracefully from early progression to max level.",
    metrics: [
      { value: "Buy Max", label: "Bulk Purchasing" },
      { value: "Custom", label: "Handcrafted Icons" },
      { value: "100%", label: "Retina 2x Assets" },
    ],
  },

  {
    slug: "daily-rewards-retention",
    title: "Daily Rewards & Retention Calendar",
    summary:
      "A 6-day reward calendar loop with clear Claim, Locked, and Claimed visual treatments.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Visual Styling",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/DailyRewards.png",
      kind: "image",
      alt: "Daily Rewards Calendar",
      ratio: "4/3",
    },
    overview:
      "Designed a 6-day daily login reward system to boost Day-1 through Day-7 player retention, featuring a grand finale Day 6 showcase slot.",
    problem:
      "Daily calendars often look static or fail to make future rewards feel enticing. Players need clear state differentiation so they know what they've claimed and what's coming next.",
    process: [
      {
        title: "Three-state color coding",
        body: "Green for ready to CLAIM, Red for LOCKED future days, and Grey for already CLAIMED.",
      },
      {
        title: "Hero finale reward slot",
        body: "Expanded the Day 6 card into a double-height feature slot to highlight the ultimate weekly prize.",
      },
      {
        title: "Dynamic calendar header",
        body: "Created a calendar badge icon with custom drop shadow to anchor the modal title.",
      },
    ],
    solution:
      "A clean 6-slot grid with high-contrast button states, subtle gradient backdrops, and bold typography.",
    gallery: [
      {
        src: "/media/projects/DailyRewards.png",
        kind: "image",
        alt: "Daily Rewards System",
        caption: "Daily Rewards Calendar — 6-day retention flow with prominent Day 6 grand prize slot.",
        ratio: "4/3",
      },
    ],
    outcome:
      "A proven retention driver designed to maximize recurring daily player engagement.",
    metrics: [
      { value: "6 Days", label: "Retention Loop" },
      { value: "3 States", label: "Claim / Lock / Done" },
      { value: "High Impact", label: "Day 6 Hero Slot" },
    ],
  },

  {
    slug: "settings-system-controls",
    title: "Settings & System Controls",
    summary:
      "A compact settings modal featuring high-contrast glowing toggle switches for audio and graphics.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Interaction Design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Settings.png",
      kind: "image",
      alt: "Settings Menu",
      ratio: "2/3",
    },
    overview:
      "Designed a clean, vertical settings modal allowing players to toggle graphics shadows and audio with satisfying glowing visual feedback.",
    problem:
      "Settings menus are often neglected and difficult to toggle on mobile. Clean tactile switches with immediate state feedback were required.",
    process: [
      {
        title: "Glow switch mechanics",
        body: "Designed vibrant green neon glows for ON states and subtle red glows for OFF states.",
      },
      {
        title: "Gear iconography & header",
        body: "Created custom 3D-styled gear vector icons framing the header ribbon.",
      },
      {
        title: "Compact mobile layout",
        body: "Structured the layout vertically to fit comfortably on phones without blocking background gameplay.",
      },
    ],
    solution:
      "A modern, tactile settings sheet with unmistakable switch states and quick-dismiss controls.",
    gallery: [
      {
        src: "/media/projects/Settings.png",
        kind: "image",
        alt: "Settings Modal with toggle switches",
        caption: "Settings Modal — Tactile glowing toggle switches for shadows and music.",
        ratio: "2/3",
      },
      {
        src: "/media/projects/LeftSideBar.png",
        kind: "image",
        alt: "Quick navigation left sidebar",
        caption: "Left Sidebar Menu — Persistent quick-access bar for summoning settings and menus.",
        ratio: "2/3",
      },
    ],
    outcome:
      "A polished, accessible settings menu that elevates the overall quality feel of the game.",
    metrics: [
      { value: "Tactile", label: "Glow Switches" },
      { value: "Instant", label: "State Feedback" },
      { value: "Compact", label: "Mobile-First" },
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
