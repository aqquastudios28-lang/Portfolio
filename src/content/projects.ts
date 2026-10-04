import type { Project } from "./types";

/* One game's worth of UI, screen by screen. Everything in this file is
   describable from the screens themselves — accurately titled and specified. */

export const projects: Project[] = [
  {
    slug: "art-deco-main-menu",
    title: "Main Menu",
    summary:
      "Gold-on-black title screen with a four-way portal cluster and a single obvious start action.",
    category: "Menu",
    year: "2025",
    role: "UI design, art direction",
    tools: ["Figma", "Photoshop", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/MainMenu.png",
      width: 2400,
      height: 1350,
      kind: "image",
      alt: "Art deco main menu with Shop, Servers, Inventory and Play buttons around a centred logo lockup",
      ratio: "16/9",
    },
    overview:
      "The first screen of the game: logo lockup on top, four faceted menu plates below, and a quiet hint line telling the player exactly what to do next.",
    problem:
      "Menu screens with four equal buttons give the player no idea which one starts the game, so the first tap becomes a guess.",
    process: [
      {
        title: "Diamond layout around one primary",
        body: "Shop sits above, Servers and Inventory flank the middle, and Play anchors the bottom of the cluster — the eye finishes on the action that starts the run.",
      },
      {
        title: "Warm gold on true black",
        body: "Bevelled plates, hairline flourishes and a brushed sheen carry the whole theme, so the screen needs no background art.",
      },
      {
        title: "Utility icons off the main path",
        body: "Settings and rewards live as ornate icon buttons in the top-right corner, reachable but never competing with the menu stack.",
      },
    ],
    solution:
      "A centred menu cluster with one clear primary action, a reusable plate component, and a 'Press play to start' hint under the fold of the buttons.",
    gallery: [],
    outcome:
      "Set the gold art-deco component kit — plates, ribbons, icon frames — that the rest of the game's screens are built from.",
    metrics: [
      { value: "4", label: "Menu destinations" },
      { value: "1", label: "Primary action" },
      { value: "16:9", label: "Built at 4K" },
    ],
  },

  {
    slug: "tactical-loadout-stash",
    title: "Loadout & Stash",
    summary:
      "Extraction-shooter equip screen: body slots, grid containers, and a full stash on one page.",
    category: "Menu",
    year: "2025",
    role: "UI design, systems layout",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/LoadoutStash.png",
      width: 2400,
      height: 1350,
      kind: "image",
      alt: "Tactical loadout screen with character equipment slots, tactical rig and backpack grids, and a stash panel with three currency counters",
      ratio: "16/9",
    },
    overview:
      "A three-column inventory screen that puts what you are wearing, what you are carrying, and what you own side by side, with no sub-menus in between.",
    problem:
      "Loot-and-extract inventories are dense by nature. Split them across tabs and players lose track of what is equipped while they are packing.",
    process: [
      {
        title: "Three columns, three questions",
        body: "Left answers 'what am I wearing', middle 'what am I carrying', right 'what do I own' — drag targets stay visible from any column.",
      },
      {
        title: "Silhouette as the map",
        body: "Slot frames sit on a character silhouette so head, chest and back gear read positionally before the label is read.",
      },
      {
        title: "Labelled slot chips and keybinds",
        body: "Every slot carries a small caps tag, and weapon slots print their bind (1, 2, V) directly in the frame.",
      },
      {
        title: "Hatched states for blocked slots",
        body: "Diagonal hatching marks slots that are locked or blocked by current gear, so an empty square never reads as an available one.",
      },
    ],
    solution:
      "A monochrome, high-contrast loadout page with a persistent tab rail, uniform grid cells across rig, backpack, container and stash, and three currency counters in the stash header.",
    gallery: [],
    outcome:
      "One screen covers equip, pack and stash management, with the grid cell as a single reusable unit across every container.",
    metrics: [
      { value: "8", label: "Body slots" },
      { value: "4", label: "Container types" },
      { value: "3", label: "Currencies tracked" },
    ],
  },

  {
    slug: "navigation-hub",
    title: "Index",
    summary:
      "The main navigation modal and router for game modes, shops, and inventories.",
    category: "Menu",
    year: "2025",
    role: "UI design, art direction",
    tools: ["Figma", "Photoshop", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Index.png",
      width: 936,
      height: 700,
      kind: "image",
      alt: "Index navigation modal with portal buttons to game modes, shops and inventory",
      ratio: "4/3",
    },
    overview:
      "The central hub modal that opens on join and routes players to modes, shops, and inventory. Built to establish the core visual theme and button layout for all other screens.",
    problem:
      "The brief called for eight destinations on one modal. A generic grid of identical buttons provides no visual hierarchy to guide new players.",
    process: [
      {
        title: "Set the design language first",
        body: "Thick cartoon borders, bevelled frames, and bright gradient backdrops established the foundational style for the entire game.",
      },
      {
        title: "Sized the buttons by frequency",
        body: "Primary game modes received large hero portals, while secondary utility menus use compact buttons for clear visual flow.",
      },
      {
        title: "Modular header component",
        body: "Standardized title ribbon and close button that can be reused across all game modals with contextual icons.",
      },
    ],
    solution:
      "One structured modal, clear hierarchy of destinations, and responsive scaling from mobile touch screens to desktop monitors.",
    gallery: [],
    outcome:
      "Established the design tokens and layout rules for the remaining eight screens in the game.",
    metrics: [],
  },

  {
    slug: "vendor-gateway",
    title: "Vendor",
    summary:
      "The merchant screen that routes spending into random rolls or flat stat upgrades.",
    category: "Menu",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Vendor.png",
      width: 936,
      height: 530,
      kind: "image",
      alt: "Vendor hub with two large cards routing to gacha rolls and stat upgrades",
      ratio: "16/9",
    },
    overview:
      "A clean merchant portal that cleanly splits progression into two distinct loops: Gacha Rolls and Upgrades.",
    problem:
      "Combining both systems into a complex tabbed modal causes confusion and buries the secondary upgrade economy.",
    process: [
      {
        title: "Two clear visual cards",
        body: "Distinct blue for Gacha and green for Upgrades with bold graphics so players understand their choices immediately.",
      },
      {
        title: "Full-card hit targets",
        body: "The entire card acts as a touch target, eliminating accidental mis-taps on mobile devices.",
      },
      {
        title: "Consistent vendor framing",
        body: "Shopping bag ribbon header that aligns with the overall studio aesthetic.",
      },
    ],
    solution:
      "A frictionless two-choice decision screen. Tap, choose, and enter the respective menu immediately.",
    gallery: [],
    outcome:
      "Streamlined the entry flow into the core economy loops without unnecessary sub-menus.",
    metrics: [],
  },

  {
    slug: "gacha-rng-system",
    title: "Gacha",
    summary:
      "RNG roll screen with live drop-rate probabilities, dual currencies, and 1x / 3x / 10x pulls.",
    category: "Economy",
    year: "2025",
    role: "UI design, economy UX",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Gacha.png",
      width: 936,
      height: 756,
      kind: "image",
      alt: "Gacha roll screen with a rarity odds table beside the roll buttons",
      ratio: "4/3",
    },
    overview:
      "The main roll interface with fully transparent odds display directly visible next to pull buttons.",
    problem:
      "Burying drop probabilities behind hidden buttons hurts player trust and friction.",
    process: [
      {
        title: "Integrated odds table",
        body: "Seven color-coded rarity tiers permanently listed beside the roll buttons.",
      },
      {
        title: "Tiered pull increments",
        body: "1x for early gameplay, 3x for mid-tier players, and 10x for bulk late-game rolls.",
      },
      {
        title: "Separated currency rows",
        body: "Standard rolls and premium rolls isolated into dedicated visual rows to avoid accidental currency spend.",
      },
    ],
    solution:
      "Two-tier roll board with visible odds table, dice theme ribbon, and high-contrast roll triggers.",
    gallery: [],
    outcome: "A roll screen that shows its odds and offers multi-pulls in fixed steps.",
    metrics: [
      { value: "7", label: "Rarity tiers" },
      { value: "1x / 3x / 10x", label: "Pull sizes" },
      { value: "2", label: "Currencies" },
    ],
  },

  {
    slug: "gems-currency-shop",
    title: "Gems Shop",
    summary:
      "Premium currency packs laid out with clear value scaling and honest pricing.",
    category: "Shop",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/GemsShop.png",
      width: 922,
      height: 762,
      kind: "image",
      alt: "Gems shop with tiered currency packs and price pills",
      ratio: "4/3",
    },
    overview:
      "Gem packs showing Robux costs and currency yields side-by-side without deceptive countdowns.",
    problem:
      "Currency stores often clutter the screen with artificial timers and misleading discount badges.",
    process: [
      {
        title: "Clear icon progression",
        body: "Distinct visual progression from single gems to treasure chests so bundle size reads from the icon alone.",
      },
      {
        title: "Balanced typographic weight",
        body: "Both gem quantities and Robux prices are legible with equal visual emphasis.",
      },
      {
        title: "Standardized buy actions",
        body: "The buy button sits in the same place on every bundle card, so prices compare down one line.",
      },
    ],
    solution:
      "A structured grid layout with clear price tags and clean purchase prompt handoffs.",
    gallery: [],
    outcome:
      "Clean monetization storefront with frictionless purchase interaction.",
    metrics: [],
  },

  {
    slug: "gamepass-vip-store",
    title: "Season Pass",
    summary:
      "Tiered progression track with Free & Premium reward lanes, tier skips, and batch claiming.",
    category: "Shop",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Pass.png",
      width: 1002,
      height: 762,
      kind: "image",
      alt: "Season pass menu with Free and Premium tier progression and claim buttons",
      ratio: "4/3",
    },
    overview:
      "A complete battle pass interface with Free and Premium reward tracks, XP progression bar, Skip tier button, and a 1-click Claim All feature.",
    problem:
      "Many battle pass screens crowd information or make it difficult for mobile players to see their next reward tier.",
    process: [
      {
        title: "Dual track layout",
        body: "Clear horizontal layout showing Free rewards on top and Premium pass rewards below with lock indicators.",
      },
      {
        title: "Progress and level bar",
        body: "High-contrast XP level bar (67/100) showing exact player progression at a glance.",
      },
      {
        title: "Batch actions",
        body: "Added dedicated Skip and Claim All buttons so players don't have to claim 50 rewards individually.",
      },
    ],
    solution:
      "A bold, responsive Season Pass menu built with clear unlock milestones and gold ribbon header.",
    gallery: [],
    outcome:
      "One screen for both reward tracks, with tier skips and a single Claim All.",
    metrics: [],
  },

  {
    slug: "stat-upgrades",
    title: "Upgrades",
    summary:
      "Stat upgrade board with level caps, drawn icon badges, and Buy 1 / Buy Max controls.",
    category: "Economy",
    year: "2025",
    role: "UI design, icon work",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Upgrades@2x.png",
      width: 1872,
      height: 1685,
      kind: "image",
      alt: "Upgrade menu rows showing level caps with Buy 1 and Buy Max buttons",
      ratio: "1/1",
    },
    overview:
      "Stat progression board covering storage capacity, luck multipliers, and speed upgrades with explicit level ceilings.",
    problem:
      "Repeated single-tap upgrading becomes tedious when players need to spend large currency reserves.",
    process: [
      {
        title: "Buy 1 and Buy Max buttons",
        body: "Both options available per row: Buy 1 for precision and Buy Max for instant bulk level-ups.",
      },
      {
        title: "Custom drawn vector icons",
        body: "Custom backpack, clover, and rocket icons give each upgrade path distinct visual identity.",
      },
      {
        title: "Visible level ceilings",
        body: "Every row displays current level and max cap (e.g., 1/24, 1/100) clearly.",
      },
    ],
    solution:
      "Green grid upgrade board with dual buy triggers per row and crisp level indicators.",
    gallery: [],
    outcome:
      "Massive quality-of-life upgrade eliminating repetitive tapping for high-level players.",
    metrics: [
      { value: "3", label: "Upgrade tracks" },
      { value: "Buy 1 / Max", label: "Actions per row" },
      { value: "24 / 100 / 10", label: "Level caps" },
    ],
  },

  {
    slug: "daily-rewards",
    title: "Daily Rewards",
    summary:
      "6-day login calendar with distinct state indicators and double-sized milestone rewards.",
    category: "Popup",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/DailyRewards.png",
      width: 1872,
      height: 1399,
      kind: "image",
      alt: "Six-day daily reward calendar with claim, locked and claimed states",
      ratio: "4/3",
    },
    overview:
      "A 6-slot daily reward popup with green Claim states, red Locked states, and grey Claimed states.",
    problem:
      "Generic login rewards fail to motivate players when the final jackpot reward isn't visually exciting.",
    process: [
      {
        title: "Three clear visual states",
        body: "Unambiguous color coding for ready, locked, and completed days.",
      },
      {
        title: "Double-sized Day 6 card",
        body: "Day 6 milestone reward occupies a double card slot to emphasize the grand prize.",
      },
      {
        title: "Reusable modal frame",
        body: "Shares the standard title ribbon and close button system.",
      },
    ],
    solution:
      "A 6-slot calendar grid where the final reward is prominently featured from day one.",
    gallery: [],
    outcome: "Clean retention mechanic with clear visual incentives.",
    metrics: [
      { value: "6", label: "Day loop" },
      { value: "3", label: "Card states" },
      { value: "2x", label: "Day six slot" },
    ],
  },

  {
    slug: "settings-controls",
    title: "Settings",
    summary:
      "Lightweight overlay panel with toggle switches for audio and graphics performance.",
    category: "Menu",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Settings.png",
      width: 480,
      height: 698,
      kind: "image",
      alt: "Settings panel with glowing toggle switches for shadows and audio",
      ratio: "2/3",
    },
    overview:
      "A compact settings panel for shadows and audio toggles that keeps live gameplay visible.",
    problem:
      "Full-screen settings menus obscure gameplay and make switch states difficult to verify at a glance.",
    process: [
      {
        title: "High-contrast switch glow",
        body: "Green glow for active state and red for disabled state, easily readable on mobile screens.",
      },
      {
        title: "Compact non-intrusive sheet",
        body: "Narrow overlay allows players to hear and see setting adjustments in real time.",
      },
    ],
    solution:
      "Streamlined two-switch settings overlay optimized for quick touch toggles.",
    gallery: [],
    outcome: "Fast, unobtrusive settings interface with clear toggle feedback.",
    metrics: [],
  },

  {
    slug: "quicknav-sidebar",
    title: "HUD Sidebar",
    summary:
      "Persistent left-docked quick-access HUD bar for shop, settings, codes, and inventory.",
    category: "HUD",
    year: "2025",
    role: "UI design, HUD",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/LeftSideBar.png",
      width: 357,
      height: 571,
      kind: "image",
      alt: "Vertical HUD sidebar with icon buttons for shop, settings, codes and inventory",
      ratio: "2/3",
    },
    overview:
      "A vertical HUD strip docked to the left edge providing instant access to primary menus during gameplay.",
    problem:
      "On-screen HUD icons often collide with default mobile joystick controls and thumb zones.",
    process: [
      {
        title: "Thumb-friendly middle-left placement",
        body: "Positioned clear of the lower-left mobile movement stick.",
      },
      {
        title: "Color-coded icon pills",
        body: "Distinct background colors allow recognition before reading button labels.",
      },
      {
        title: "Active state border",
        body: "Active open menu highlights with a glowing border.",
      },
    ],
    solution:
      "A compact 4-button sidebar cleanly integrated into the active game loop.",
    gallery: [],
    outcome: "Ergonomic mobile HUD navigation that stays clear of active gameplay.",
    metrics: [],
  },
];

/* ---------------------------------------------------------------------------
   Selectors
   --------------------------------------------------------------------------- */
export const publishedProjects = projects.filter((p) => p.published);

export const featuredProjects = publishedProjects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}

/** Wraps around, so the last case study points back at the first. */
export function getNextProject(slug: string): Project | undefined {
  const i = publishedProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return publishedProjects[(i + 1) % publishedProjects.length];
}
