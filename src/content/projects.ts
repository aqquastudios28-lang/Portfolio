import type { Project } from "./types";

/* One game's worth of UI, screen by screen. Everything in this file is
   describable from the screens themselves — no invented conversion figures,
   no retention claims I cannot back up. Where a screen has a number worth
   printing it gets a spec row; where it does not, it gets prose. */

export const projects: Project[] = [
  {
    slug: "navigation-hub",
    title: "Main menu",
    summary:
      "The screen players land on, and the router for everything else in the game.",
    category: "Menu",
    year: "2025",
    role: "UI design, art direction",
    tools: ["Figma", "Photoshop", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Index.png",
      kind: "image",
      alt: "Main menu modal with portal buttons to game modes, shops and inventory",
      ratio: "4/3",
    },
    overview:
      "The hub that opens on join and sends players out to modes, shops and the inventory. It gets more traffic than anything else in the game, so it got drawn first and argued about longest.",
    problem:
      "The brief was a menu with eight destinations on it. The obvious version is a grid of eight identical buttons. That technically works and tells a new player nothing about where to go first.",
    process: [
      {
        title: "Set the frame language here, before anything else",
        body: "Thick black outline, metal bevel, a bright gradient behind. Every later menu inherits it, so it was worth getting the borders and shadow depth right on one screen rather than nine.",
      },
      {
        title: "Sized the buttons by how often they get used",
        body: "The two destinations people actually open got the large portals. The rest are smaller. Not democratic, but it means a new player's thumb lands somewhere useful.",
      },
      {
        title: "Built the header as a reusable part",
        body: "Comic lettering with a hard drop shadow, sitting on a badge. The same header carries every modal in the set with a different object on it, so players can tell at a glance what kind of screen they opened.",
      },
    ],
    solution:
      "One modal, a real hierarchy of destinations, and auto layout that holds up on an ultrawide monitor and a five-inch phone.",
    gallery: [],
    outcome:
      "Most of this screen's value is that it set the rules for the other eight. Everything after it was faster to draw and did not need re-deciding.",
    metrics: [],
  },

  {
    slug: "vendor-gateway",
    title: "Vendor hub",
    summary:
      "The merchant screen that splits spending into two paths: random rolls, or flat stat upgrades.",
    category: "Menu",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Vendor.png",
      kind: "image",
      alt: "Vendor hub with two large cards routing to gacha rolls and stat upgrades",
      ratio: "16/9",
    },
    overview:
      "One merchant with two very different economies behind him. This screen only exists to decide which one you are walking into.",
    problem:
      "Both systems were originally going to sit under tabs on the same screen. Tabs make the player pick before they understand what either does, and the second tab goes unread.",
    process: [
      {
        title: "Two cards instead of two tabs",
        body: "Blue for rolls, green for upgrades, each with its own icon and a single line saying what it does. You choose after reading rather than before.",
      },
      {
        title: "Made the whole card the hit target",
        body: "Not a button inside a card. On a phone that is the difference between one tap and two, and it removes the dead zone around the label.",
      },
      {
        title: "Kept the shared header",
        body: "Same title bar as the main menu with a shopping bag on it. Cheap way to keep nine screens feeling like one product.",
      },
    ],
    solution:
      "A two-choice screen. Read, tap, gone. It is the shortest screen in the set and it should be.",
    gallery: [],
    outcome:
      "Nothing surprising here: two options beat a tab bar. Worth saying that I argued for the tabs first and was wrong about it.",
    metrics: [],
  },

  {
    slug: "gacha-rng-system",
    title: "Gacha rolls",
    summary:
      "Roll screen with the drop rates printed on it, two currencies, and 1x / 3x / 10x pulls.",
    category: "Economy",
    year: "2025",
    role: "UI design, economy UX",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/Gacha.png",
      kind: "image",
      alt: "Gacha roll screen with a rarity odds table beside the roll buttons",
      ratio: "4/3",
    },
    overview:
      "The roll screen, with the odds panel deliberately on the same view as the roll button instead of hidden behind an info icon.",
    problem:
      "Plenty of Roblox gachas bury their drop rates or leave them out. That is a short-term win. The players who spend the most are the ones doing the maths, and hiding the numbers from them reads as a reason not to trust the game.",
    process: [
      {
        title: "Put the odds next to the button",
        body: "Seven rarity tiers, colour-coded, on the same panel as the roll. No modal, no info icon. It costs vertical space and it is worth the space.",
      },
      {
        title: "Added a 3x between the 1x and the 10x",
        body: "Singles for early game when currency is tight, tens for late game when it is not. The three exists because the jump from one to ten is too big for the middle of the run.",
      },
      {
        title: "Split the currencies onto separate rows",
        body: "Soft currency in yellow, premium in blue, never adjacent. Nobody should be able to spend the paid one by accident.",
      },
    ],
    solution:
      "A two-tier roll panel with the odds table permanently visible, dice artwork on the header, and a grid texture behind the roll area to separate it from the numbers.",
    gallery: [],
    outcome: "The odds panel was the whole argument on this one. It stayed.",
    metrics: [
      { value: "7", label: "Rarity tiers" },
      { value: "1x / 3x / 10x", label: "Pull sizes" },
      { value: "2", label: "Currencies" },
    ],
  },

  {
    slug: "gems-currency-shop",
    title: "Gem shop",
    summary:
      "Premium currency packs, laid out so you can compare them without doing arithmetic.",
    category: "Shop",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/GemsShop.png",
      kind: "image",
      alt: "Gem shop with tiered currency packs and price pills",
      ratio: "4/3",
    },
    overview:
      "Gem bundles, each showing its Robux price and its gem count at the same weight. No countdown timers, no struck-through prices.",
    problem:
      "Currency shops usually make you work out value per pack yourself, then push you at the big one with a badge reading BEST VALUE whether or not it is.",
    process: [
      {
        title: "Told the story in the artwork",
        body: "Small pouch through to a full chest, so the ordering reads before you reach the numbers.",
      },
      {
        title: "Matched price and quantity weight",
        body: "Both legible at phone size, and the gem count is not set larger than the price. That size mismatch is the usual trick and it is easy to spot once you know.",
      },
      {
        title: "One button per pack, identical every time",
        body: "Same shape, same size, same position on every card. Nothing in the layout steers you toward a particular row.",
      },
    ],
    solution:
      "A card grid with the price pill under each pack and no dark patterns in it.",
    gallery: [],
    outcome:
      "The studio asked for a flashing limited-time banner across the top. I left it out. It has not come back up.",
    metrics: [],
  },

  {
    slug: "gamepass-vip-store",
    title: "Gamepass store",
    summary:
      "Permanent perks listed by what they do rather than what they are called.",
    category: "Shop",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Pass.png",
      kind: "image",
      alt: "Gamepass store with perk cards and buy buttons",
      ratio: "4/3",
    },
    overview:
      "One card per pass, each with the benefit written out in plain terms and a buy button that hands straight off to the Roblox purchase prompt.",
    problem:
      "Gamepasses get sold by name — VIP, Lucky, Elite — which leaves the player guessing at what they actually get. Names are for after you own the thing.",
    process: [
      {
        title: "Led with the effect, not the name",
        body: "The card opens with what the pass does, in a sentence. The pass name is the small text underneath.",
      },
      {
        title: "Kept the premium treatment to the header",
        body: "A gold ribbon on the title bar marks this as the paid screen. The cards themselves use the same frame as everything else, so nothing inside is shouting.",
      },
      {
        title: "Went straight to the purchase prompt",
        body: "One tap to Roblox's own dialog. No confirmation step of mine in front of it — that step only ever exists to pad a funnel.",
      },
    ],
    solution:
      "A stack of pass cards, each legible on its own, with the gold kept above them.",
    gallery: [],
    outcome:
      "Rewriting the pass descriptions took longer than drawing the screen did.",
    metrics: [],
  },

  {
    slug: "stat-upgrades",
    title: "Upgrade menu",
    summary:
      "Stat upgrades with level caps, drawn icons, and a Buy Max so you are not tapping forty times.",
    category: "Economy",
    year: "2025",
    role: "UI design, icon work",
    tools: ["Figma", "Photoshop"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Upgrades@2x.png",
      kind: "image",
      alt: "Upgrade menu rows showing level caps with Buy 1 and Buy Max buttons",
      ratio: "1/1",
    },
    overview:
      "The upgrade board: backpack slots, luck, mutation chance. Each row shows its current level against its ceiling.",
    problem:
      "Upgrade menus in this genre are usually a column of identical rows you tap over and over. By level 30 the player is pressing a button forty times to spend currency they already decided to spend.",
    process: [
      {
        title: "Buy 1 and Buy Max on every row",
        body: "Both, always. Buy 1 for pacing yourself against a cap, Buy Max for the currency dump after a good run.",
      },
      {
        title: "Drew the icons rather than picking them",
        body: "Backpack, clover, rocket. There are only three things on this screen, so they have to carry it — a generic icon set would have made all three rows read the same.",
      },
      {
        title: "Showed the ceiling next to the level",
        body: "1/24, 1/100, 1/10. Seeing the cap early is what makes the number underneath it mean anything.",
      },
    ],
    solution:
      "A green grid board, one row per stat, level and cap on the left, the two buy buttons on the right.",
    gallery: [],
    outcome:
      "Buy Max was the point of the whole redesign. The rest of the layout is in service of fitting two buttons per row without crowding the level counter.",
    metrics: [
      { value: "3", label: "Upgrade tracks" },
      { value: "Buy 1 / Max", label: "Actions per row" },
      { value: "24 / 100 / 10", label: "Level caps" },
    ],
  },

  {
    slug: "daily-rewards",
    title: "Daily rewards",
    summary:
      "A six-day login loop with the states colour-coded and a last day worth showing up for.",
    category: "Popup",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/DailyRewards.png",
      kind: "image",
      alt: "Six-day daily reward calendar with claim, locked and claimed states",
      ratio: "4/3",
    },
    overview:
      "A six-slot calendar. Green means claim it now, red means locked, grey means done. Day six is a double-height card because it is the reason to come back on day five.",
    problem:
      "A daily calendar is only doing its job if a player opening it on day two can see what day six holds. Most of them show six identical boxes, and after the second day the player stops opening it.",
    process: [
      {
        title: "Three states, three colours",
        body: "Claim, locked, claimed. No ambiguity about which is which, and no relying on the button label alone to carry it.",
      },
      {
        title: "Made day six twice the size",
        body: "It is the card that has to be visible from day one. Giving it a double slot cost me a tidy grid, which was the right trade.",
      },
      {
        title: "Reused the modal header",
        body: "Calendar badge on the shared title bar. Same part as everywhere else in the set.",
      },
    ],
    solution:
      "A six-slot grid, five standard cards and one double, with the state colours doing the explaining.",
    gallery: [],
    outcome:
      "I do not have retention numbers for this, and I would not publish them if I did — one calendar in one game is not evidence. What I can say is that day six is legible from day one, which is what it was drawn for.",
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
      "Two toggles and a close button. Mostly an exercise in making a switch feel switched.",
    category: "Menu",
    year: "2025",
    role: "UI design",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/Settings.png",
      kind: "image",
      alt: "Settings panel with glowing toggle switches for shadows and audio",
      ratio: "2/3",
    },
    overview:
      "Graphics and audio, on or off, in a narrow panel that does not cover the game behind it.",
    problem:
      "Settings screens get built last and it shows. The specific failure on mobile is a toggle whose state you cannot read at a glance, so you tap it twice and end up back where you started.",
    process: [
      {
        title: "Made the glow the state, not the knob",
        body: "Green glow on, red glow off. Knob position alone is too small to read on a phone held at arm's length in daylight.",
      },
      {
        title: "Kept it narrow instead of full screen",
        body: "A vertical strip, so the game stays visible behind it. You can hear the audio setting change while the panel is still open.",
      },
      {
        title: "Stopped at two settings",
        body: "Shadows and audio. Everything else is either handled by Roblox's own menu or does not need to be player-facing.",
      },
    ],
    solution:
      "A narrow sheet with two switches and a close button, sized to sit over live gameplay.",
    gallery: [],
    outcome:
      "Nobody is ever going to screenshot this screen. It still has to work the first time.",
    metrics: [],
  },

  {
    slug: "quicknav-sidebar",
    title: "HUD sidebar",
    summary:
      "The column of buttons down the left edge. Always on screen, so it had the least room to be wrong.",
    category: "HUD",
    year: "2025",
    role: "UI design, HUD",
    tools: ["Figma", "Roblox Studio"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/LeftSideBar.png",
      kind: "image",
      alt: "Vertical HUD sidebar with icon buttons for shop, settings, codes and inventory",
      ratio: "2/3",
    },
    overview:
      "A persistent vertical strip: shop, settings, codes, inventory. The only thing in this set that is on screen during play.",
    problem:
      "Anything permanent on a Roblox screen is competing with the default touch controls and with the game itself. The sidebar had to be inside thumb reach without sitting where the thumb already lives.",
    process: [
      {
        title: "Left edge, middle height",
        body: "Roblox puts the movement stick bottom-left and jump bottom-right. Middle-left is the strip that is genuinely free.",
      },
      {
        title: "Colour before glyph",
        body: "Each button is an icon on its own coloured pill. At this size the colour is what players recognise; the glyph is confirmation, not identification.",
      },
      {
        title: "Active state on the border",
        body: "The open menu's button gets a lit border. Cheap to implement, and it is the only feedback this element needs to give.",
      },
    ],
    solution:
      "A compact strip of four buttons, clear of the default controls, with one unambiguous active state.",
    gallery: [],
    outcome:
      "This is the piece I would revisit first. Four buttons is already close to the limit for the space, and the game has since asked for a fifth.",
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
