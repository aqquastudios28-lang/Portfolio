import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "navigation-hub",
    title: "Main Navigation Hub & Interface",
    summary:
      "A bold, high-contrast modal connecting players directly to core game modes, shops, and progression portals.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Visual Styling",
    tools: ["Figma", "Photoshop", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Index.png",
      kind: "image",
      alt: "Main Navigation Hub Modal",
      ratio: "4/3",
    },
    overview:
      "Designed the primary navigation hub that greets players and acts as the central router for experience activities, portals, and inventory systems.",
    problem:
      "Main menus in Roblox often get buried or cluttered with secondary buttons. The goal was to build a clean, instantly readable index modal that directs player attention without hesitation.",
    process: [
      {
        title: "Standardized visual frame language",
        body: "Established thick black outlines, metallic bevels, and vibrant gradient backdrops that set the art direction for the entire game.",
      },
      {
        title: "Optimized mobile touch targets",
        body: "Engineered large interactive portals and clear close triggers for seamless thumb reach on phones and tablets.",
      },
      {
        title: "Consistent brand header treatment",
        body: "Created custom comic typography with high-contrast drop shadows and signature header badges.",
      },
    ],
    solution:
      "A central command modal with vivid visual cues, clear portal buttons, and responsive auto-layout scaling.",
    gallery: [],
    outcome:
      "An intuitive launchpad that guides new and veteran players to active gameplay loops in seconds.",
    metrics: [
      { value: "Figma Vector", label: "Asset Format" },
      { value: "Mobile-First", label: "Touch Design" },
      { value: "High Contrast", label: "Visual Hierarchy" },
    ],
  },

  {
    slug: "vendor-gateway",
    title: "Vendor & Merchant Hub",
    summary:
      "A dual-portal merchant gateway routing player economy into randomized rolls and deterministic stat upgrades.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, System Architecture",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Vendor.png",
      kind: "image",
      alt: "Vendor Hub Interface",
      ratio: "16/9",
    },
    overview:
      "Designed the primary merchant interface that cleanly divides player currency spend between luck-based Gacha rolls and deterministic stat Upgrades.",
    problem:
      "Consolidating multiple progression systems into one NPC without creating a confusing, multi-tabbed monster menu.",
    process: [
      {
        title: "Split intent into two clear pillars",
        body: "Divided the interface into two bold, distinct cards (Blue for Gacha, Green for Upgrades) with representative iconography.",
      },
      {
        title: "Shopping bag header badge",
        body: "Crafted a 3D-styled shopping bag vector anchor to give the NPC modal clear thematic identity.",
      },
      {
        title: "Immediate call-to-actions",
        body: "Gave each portal high-visibility typography and glowing interior borders for quick touch selection.",
      },
    ],
    solution:
      "A streamlined two-choice gateway that reduces decision fatigue and speeds up in-game economy interactions.",
    gallery: [],
    outcome:
      "Players instantly recognize where to spend in-game currency based on their immediate progression goals.",
    metrics: [
      { value: "2 Choices", label: "Core Economy Paths" },
      { value: "100%", label: "Scalable Vector UI" },
      { value: "Zero Friction", label: "Navigation Flow" },
    ],
  },

  {
    slug: "gacha-rng-system",
    title: "Gacha & RNG Roll System",
    summary:
      "A transparent roll system featuring normal & premium rolls, explicit odds breakdown, and bulk purchasing.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Economy Architecture",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Gacha.png",
      kind: "image",
      alt: "Gacha Roll System UI",
      ratio: "4/3",
    },
    overview:
      "Designed a complete Gacha rolling modal with dual currency support (in-game cash & premium robux/gems) and transparent odds breakdown from Common to Celestial.",
    problem:
      "Many Roblox gacha interfaces hide drop rates or make multi-rolling tedious. Players need instant clarity on odds, pricing, and roll quantities.",
    process: [
      {
        title: "Dedicated odds transparency panel",
        body: "Placed color-coded rarity tiers directly beside the roll view so players never have to guess drop probabilities.",
      },
      {
        title: "Multi-tier bulk rolling",
        body: "Designed 1x, 3x, and 10x roll buttons to accommodate both early-game and endgame rolling loops.",
      },
      {
        title: "Dual currency tracks",
        body: "Clearly separated standard in-game currency rolls from premium luck-boosted rolls with distinct yellow/blue color palettes.",
      },
    ],
    solution:
      "A high-energy two-tier roll modal with prominent 3D dice iconography, cyber grid textures, and high-visibility action buttons.",
    gallery: [],
    outcome:
      "An engaging, fair, and high-converting roll interface tailored for player excitement and clarity.",
    metrics: [
      { value: "7 Tiers", label: "Rarity Breakdown" },
      { value: "1x / 3x / 10x", label: "Multi-Roll Options" },
      { value: "Dual Currency", label: "In-Game & Premium" },
    ],
  },

  {
    slug: "gems-currency-shop",
    title: "Gems Currency Storefront",
    summary:
      "A clean in-game economy store offering tiered gem packages with prominent value scaling.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Monetization UX",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/GemsShop.png",
      kind: "image",
      alt: "Gems Currency Shop",
      ratio: "4/3",
    },
    overview:
      "Designed the primary premium currency shop displaying tiered gem bundles, pricing badges, and purchase triggers without misleading dark patterns.",
    problem:
      "Currency shops often feel cluttered and fail to communicate per-pack value effectively.",
    process: [
      {
        title: "Distinct pack scaling",
        body: "Created visual differentiation between small starter packs and high-value bulk chests.",
      },
      {
        title: "Legible price tags",
        body: "Ensured Robux costs and gem quantities read immediately on both mobile and desktop screens.",
      },
      {
        title: "Clean checkout triggers",
        body: "Designed high-contrast purchase buttons with green action states and clear confirmation affordance.",
      },
    ],
    solution:
      "A vibrant storefront with organized product cards, high-contrast price pills, and custom gem chest artwork.",
    gallery: [],
    outcome:
      "A trustworthy and high-converting storefront that makes currency acquisition clear and rewarding.",
    metrics: [
      { value: "Transparent", label: "Pricing Structure" },
      { value: "Mobile-Ready", label: "Touch Targets" },
      { value: "Custom", label: "Illustrative Badges" },
    ],
  },

  {
    slug: "gamepass-vip-store",
    title: "Gamepass & VIP Perks Store",
    summary:
      "A showcase modal highlighting VIP benefits, permanent multipliers, and exclusive abilities.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Visual Styling",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Pass.png",
      kind: "image",
      alt: "Gamepass and VIP Shop",
      ratio: "4/3",
    },
    overview:
      "Designed a dedicated Gamepass and Season Pass modal showcasing perks, auto-features, and exclusive gameplay boosts.",
    problem:
      "Communicating the tangible gameplay benefit of multiple gamepasses in a compact, readable interface.",
    process: [
      {
        title: "Feature callout cards",
        body: "Structured each pass card with bold title, benefit description, and direct Buy button.",
      },
      {
        title: "Thematic header illustration",
        body: "Designed custom vector header ribbons with golden star accents to denote premium status.",
      },
      {
        title: "Single-tap acquisition flow",
        body: "Ensured pass buttons trigger standard Roblox marketplace purchase prompts smoothly.",
      },
    ],
    solution:
      "A polished VIP showcase with rich card borders, distinctive iconography, and effortless purchase interactions.",
    gallery: [],
    outcome:
      "Elevated premium gamepass presentation resulting in high player trust and clear value understanding.",
    metrics: [
      { value: "VIP Perks", label: "Benefit Focus" },
      { value: "Retina 2x", label: "Vector Assets" },
      { value: "High Contrast", label: "Visual Clarity" },
    ],
  },

  {
    slug: "stat-upgrades",
    title: "Stat Upgrades & Level Progression",
    summary:
      "High-efficiency player upgrade menu with level counters, custom stat icons, and Buy Max shortcuts.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Iconography",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Upgrades@2x.png",
      kind: "image",
      alt: "Stat Upgrades Menu",
      ratio: "1/1",
    },
    overview:
      "Designed a dedicated character upgrade and stat boost interface. Built for rapid upgrading with custom illustrative icons for inventory slots, luck boosts, and mutation modifiers.",
    problem:
      "Upgrade menus often force players into repetitive single-clicking. Providing bulk-buy shortcuts while preserving clear progression state was essential.",
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
        body: "Integrated explicit level limits (e.g. 1/24, 1/100, 1/10) to communicate depth.",
      },
    ],
    solution:
      "An energizing green grid upgrade board with high-contrast item rows and bold purchase triggers.",
    gallery: [],
    outcome:
      "A fast, clean stat enhancement interface that scales gracefully from early progression to max level.",
    metrics: [
      { value: "Buy Max", label: "Bulk Purchasing" },
      { value: "Custom", label: "Handcrafted Icons" },
      { value: "100%", label: "Retina 2x Assets" },
    ],
  },

  {
    slug: "daily-rewards",
    title: "6-Day Daily Rewards Calendar",
    summary:
      "A retention calendar loop with clear Claim, Locked, and Claimed visual treatments and a Day 6 hero prize.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Retention Design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
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
    gallery: [],
    outcome:
      "A proven retention driver designed to maximize recurring daily player engagement.",
    metrics: [
      { value: "6 Days", label: "Retention Loop" },
      { value: "3 States", label: "Claim / Lock / Done" },
      { value: "High Impact", label: "Day 6 Hero Slot" },
    ],
  },

  {
    slug: "settings-controls",
    title: "Settings & System Controls",
    summary:
      "A compact settings modal featuring high-contrast glowing toggle switches for audio and graphics.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, Interaction Design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
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
    gallery: [],
    outcome:
      "A polished, accessible settings menu that elevates the overall quality feel of the game.",
    metrics: [
      { value: "Tactile", label: "Glow Switches" },
      { value: "Instant", label: "State Feedback" },
      { value: "Compact", label: "Mobile-First" },
    ],
  },

  {
    slug: "quicknav-sidebar",
    title: "Quick-Access Navigation Sidebar",
    summary:
      "A compact vertical sidebar menu designed for immediate single-tap access to primary menus.",
    category: "Roblox UI",
    year: "2025",
    role: "UI/UX Design, HUD Architecture",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/LeftSideBar.png",
      kind: "image",
      alt: "Quick Navigation Left Sidebar",
      ratio: "2/3",
    },
    overview:
      "Designed a persistent left-hand HUD sidebar allowing players to quickly toggle shop, settings, codes, and inventory modals during active gameplay.",
    problem:
      "Persistent HUD buttons can clutter the screen or collide with Roblox default touch controls. The sidebar needed to be compact, tactile, and non-intrusive.",
    process: [
      {
        title: "Vertical stacking efficiency",
        body: "Positioned icons vertically along the left screen edge within natural thumb reach.",
      },
      {
        title: "Icon clarity & badges",
        body: "Created high-contrast icon glyphs with distinct background pills for instant identification.",
      },
      {
        title: "Subtle active state feedback",
        body: "Designed glowing border responses when a menu is currently summoned.",
      },
    ],
    solution:
      "A clean, lightweight sidebar that preserves screen real estate while putting essential controls one tap away.",
    gallery: [],
    outcome:
      "An unobtrusive HUD element that streamlines moment-to-moment game navigation.",
    metrics: [
      { value: "1-Tap", label: "Menu Summoning" },
      { value: "Thumb-Zone", label: "Mobile Ergonomics" },
      { value: "Lightweight", label: "HUD Footprint" },
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
