import type { AlsoBuilt, CodeProject } from "./types";

/* ============================================================================
   ENGINEERING WORK
   Everything here is documented from the public repository and the shipped app.
   If a number appears as a metric, it is in the README or measured on screen.
   ============================================================================ */

export const codeProjects: CodeProject[] = [
  {
    slug: "yappuccino",
    title: "Yappuccino",
    summary:
      "A native Discord client in Rust that idles at about 30 MB, against 724 MB for the Electron app.",
    kind: "Desktop app",
    language: "Rust",
    year: "2026",
    status: "Beta · GPL-3.0",
    role: "Development, interface, packaging",
    repo: "https://github.com/cerbiss/Yappuccinov2",
    stack: ["Rust", "Slint", "Skia", "Discord API"],
    published: true,
    featured: true,
    note: "Yappuccino began as a fork of yapfast by wiredtenshi, and its README states plainly that AI wrote most of the code. It is included here for the architecture and the measurements, both of which can be checked against the repository.",
    cover: {
      src: "/media/projects/yappuccino/app.png",
      width: 1920,
      height: 1080,
      kind: "image",
      alt: "Yappuccino desktop app showing a server list, a group DM and its member list in a native window",
      caption:
        "A test account on a fake server. Discord's API, drawn by Slint instead of a browser.",
    },
    gallery: [
      {
        src: "/media/projects/yappuccino/themes.webp",
        width: 960,
        height: 425,
        kind: "image",
        alt: "Yappuccino theme picker cycling through ten built-in colour themes",
        caption: "Ten themes ship in the beta, with a live editor for your own.",
      },
      {
        src: "/media/projects/yappuccino/voice.webp",
        width: 960,
        height: 540,
        kind: "image",
        alt: "Yappuccino voice channel with seven participants, two cameras and a screen share",
        caption:
          "Voice, cameras and Go Live stay up while you read another channel.",
      },
      {
        src: "/media/projects/yappuccino/playing.webp",
        width: 359,
        height: 594,
        kind: "image",
        alt: "Yappuccino profile card showing a game activity",
        caption: "Game activity comes from running processes, not a web client.",
      },
    ],
    overview:
      "Yappuccino is a Discord client with no browser engine anywhere in it. It speaks to Discord's API directly and draws its own window with Slint and Skia, like a game would. Servers, DMs, friends, voice, video, screen sharing, forums, polls, GIFs and themes are all there, and the memory bill is a fraction of the official app's.",
    problem:
      "Discord's desktop app is a Chromium window pointed at Discord's website. It sits at roughly 720 MB of RAM doing nothing, and on a laptop already running a game, an editor or a call, that is not a background app — it is a competing workload. The same applies to most Electron chat clients, including the Vesktop build used as the comparison here.",
    process: [
      {
        title: "Remove the browser, keep the client",
        body: "The interface is drawn with Slint and Skia and the protocol is spoken directly to Discord. No Chromium, no Node runtime, no bundled web app. The window is native all the way down.",
      },
      {
        title: "Measure the claim in four states",
        body: "Idle, an image-heavy channel, a call, and a 1080p screen share were measured on the same Windows PC against Vesktop, with memory and CPU recorded for each. The comparison is published with its method, not just a headline number.",
      },
      {
        title: "Show the cache before the network",
        body: "The app restores the messages it saved last time and catches up while you read. That is where the 0.22-second launch comes from: clicking the icon gets you a readable window, not a spinner.",
      },
      {
        title: "Keep the parts people actually notice",
        body: "Voice with per-person volume, noise suppression and push-to-talk; cameras and Go Live; forums and polls; a GIF picker with favourites stored on disk; ten themes; Rich Presence from running games. Feature gaps are listed in the README instead of hidden.",
      },
    ],
    architecture: [
      {
        title: "Rust core",
        body: "The client, cache and Discord protocol live in Rust. State is kept locally so the first paint does not wait on a gateway round trip.",
      },
      {
        title: "Slint + Skia window",
        body: "Slint describes the interface; Skia rasterises it. Neither brings a webview, a JavaScript engine or a DOM along with it.",
      },
      {
        title: "Local-first message cache",
        body: "Previously loaded messages are read from disk at launch, then reconciled with Discord's API. The UI stays usable while the rest arrives.",
      },
    ],
    outcome:
      "The beta runs a full Discord session at roughly the cost of a browser tab: 30 MB idle, 44 MB in a call and 113 MB while sharing a 1080p screen. It is a continuation of the native-client work explored in yapfast, with the current beta published as Yappuccinov2.",
    metrics: [
      { value: "30 MB", label: "Idle RAM (Vesktop: 724 MB)" },
      { value: "0.22 s", label: "Launch (Discord: 8 s)" },
      { value: "−96%", label: "Idle memory reduction" },
      { value: "GPL-3.0", label: "Open-source licence" },
    ],
  },

  {
    slug: "hearthlens",
    title: "HearthLens",
    summary:
      "A cross-platform Hearthstone companion: in-game overlay, deck tracker and Battlegrounds advisor that reads only the game's logs.",
    kind: "Desktop app",
    language: "C#",
    year: "2026",
    status: "Active · .NET 10",
    role: "Development, interface, installers",
    repo: "https://github.com/cerbiss/HearthLens",
    site: "https://hearthlens.vercel.app/",
    stack: ["C#", ".NET 10", "Avalonia", "SQLite", "xUnit"],
    published: true,
    featured: true,
    cover: {
      src: "/media/projects/hearthlens/main-battlegrounds.png",
      width: 1260,
      height: 840,
      kind: "image",
      alt: "Hearthlens dashboard showing the Battlegrounds advisor, hero picks and match overview",
      caption:
        "The Battlegrounds advisor: hero choices, lobby composition and shop advice in one window.",
    },
    gallery: [
      {
        src: "/media/projects/hearthlens/overlay-game.png",
        width: 1920,
        height: 1080,
        kind: "image",
        alt: "Hearthlens overlay on top of a Hearthstone Battlegrounds match",
        caption: "The overlay reads the log stream; it never writes to the game.",
      },
      {
        src: "/media/projects/hearthlens/overlay-discover.png",
        width: 1920,
        height: 1080,
        kind: "image",
        alt: "Hearthlens Discover overlay showing pick odds during a Hearthstone match",
        caption: "Discover picks get odds from the current lobby, not a static tier list.",
      },
      {
        src: "/media/projects/hearthlens/main-overview.png",
        width: 1260,
        height: 840,
        kind: "image",
        alt: "Hearthlens dashboard with deck tracker and match history",
        caption: "Match history is stored locally in SQLite.",
      },
    ],
    overview:
      "HearthLens is a Hearthstone companion in the spirit of Hearthstone Deck Tracker: an in-game overlay, a deck tracker, a Battlegrounds advisor for heroes, compositions, shop, trinkets, Discover picks and combat odds, plus match history. It runs on Windows, macOS and Linux from one .NET codebase.",
    problem:
      "Hearthstone's client does not tell you the odds behind a Discover pick or the lobby you are about to fight. Third-party trackers solve that, but most are Windows-only, closed, or ask you to trust something that reaches into the game and writes to it.",
    process: [
      {
        title: "Read, never write",
        body: "HearthLens parses the log files Hearthstone writes, plus a few read-only values from game memory on Windows, such as rating. It never changes the game and never shows hidden information.",
      },
      {
        title: "One core, three shells",
        body: "A plain net10.0 core handles log parsing, game tracking, the Battlegrounds advisor, combat simulation, SQLite history and install discovery. Avalonia provides the cross-platform UI; a per-OS desktop layer handles the overlay on Win32, macOS and X11.",
      },
      {
        title: "Advice that can be checked",
        body: "The Battlegrounds advisor and combat simulator estimate outcomes from the current board instead of printing a tier list. The core is covered by xUnit tests that run on any operating system.",
      },
      {
        title: "Ship installers, not a zip",
        body: "A tagged release builds an NSIS setup wizard for Windows, .pkg/.dmg for macOS and .deb/.rpm/AppImage/tar.gz for Linux. Player data stays in the normal application-data folder on each OS.",
      },
    ],
    architecture: [
      {
        title: "HearthLens.Core",
        body: "Log parsing, game tracking, Battlegrounds logic, combat simulation, settings, history and platform discovery. Plain net10.0, no UI dependency.",
      },
      {
        title: "HearthLens.UI + Desktop",
        body: "Avalonia views and view models sit on top of Core; the desktop project owns windows, tray behaviour, the overlay surface and the native overlay hooks for each OS.",
      },
      {
        title: "HearthLens.App",
        body: "The original Windows WPF app, still shipped by the Windows setup wizard while the Avalonia build becomes the cross-platform target.",
      },
    ],
    outcome:
      "One .NET solution now produces installers for three operating systems, with the game data pipeline isolated in a testable core. The Windows build ships through a setup wizard; the Avalonia desktop app is the active cross-platform target.",
    metrics: [
      { value: "3 OS", label: "Windows, macOS, Linux" },
      { value: "Local", label: "Logs + read-only memory" },
      { value: "SQLite", label: "Match history" },
      { value: "xUnit", label: "Cross-platform tests" },
    ],
  },

  {
    slug: "ue-chat-bridge",
    title: "UE Chat Bridge",
    summary:
      "Turns ChatGPT, Claude, Gemini and twelve other AI chats into an agent that can drive the Unreal Editor.",
    kind: "Developer tool",
    language: "Python",
    year: "2026",
    status: "v1.2 · Open source",
    role: "Development, extension, documentation",
    repo: "https://github.com/cerbiss/UeBridgeChat",
    stack: ["Python", "JavaScript", "Unreal MCP", "Chrome extension"],
    published: true,
    featured: true,
    plate: {
      kicker: "UNREAL 5.8+ · LOCAL BRIDGE",
      headline: ["Fifteen chats.", "One editor."],
      code: [
        "$ start.bat",
        "bridge    127.0.0.1:17654  ready",
        "editor    127.0.0.1:8000/mcp  ready",
        "#!ue python  →  viewport captured",
      ],
    },
    gallery: [],
    overview:
      "UE Chat Bridge connects a normal browser AI chat to Unreal Engine 5.8's editor MCP server. A browser extension adds a session panel to the chat, a local Python bridge on port 17654 relays commands, and the editor executes them. No API key, no desktop AI client, no per-model integration.",
    problem:
      "Using an AI to build inside Unreal usually means an API key, a separate desktop app, or a custom integration for every model. The editor already ships a Model Context Protocol server. The missing piece was a bridge from the chat window people already use.",
    process: [
      {
        title: "Meet the model where it already is",
        body: "The extension injects a panel into fifteen online chats. The model replies with ordinary #!ue command blocks, so it does not need a special SDK, tool schema or account.",
      },
      {
        title: "Standard library only",
        body: "bridge/bridge.py uses nothing outside Python's standard library. start.bat finds Python or installs it with winget, then runs the bridge; there is no pip step to break on a clean machine.",
      },
      {
        title: "Pair the extension, not the account",
        body: "The bridge pairs with the installed extension over localhost. There is no token to paste and no cloud relay; the browser and the editor talk to the same PC.",
      },
      {
        title: "Test everything except the editor",
        body: "Twenty bridge tests and twenty-one parser tests run headless. The only part that needs a live Unreal session is the final HTTP + MCP round trip, which the popup can check in one click.",
      },
    ],
    architecture: [
      {
        title: "Chat → extension → bridge → MCP",
        body: "The content script reads the AI's reply, the background worker forwards command blocks to 127.0.0.1:17654, and the bridge turns them into MCP calls against the editor.",
      },
      {
        title: "Editor plugin",
        body: "UEChatBridge adds a run_python toolset, so the AI can execute editor Python with the full unreal module and inspect the result. The plugin installer also enables the MCP server and Python plugin in the .uproject.",
      },
      {
        title: "Risk tripwire",
        body: "Destructive asset operations ask for approval first. The default can be raised to ask before Python or before everything, or lowered to auto for a trusted project.",
      },
    ],
    outcome:
      "Fifteen AI chats can now inspect actors, run editor Python, call toolsets, list their parameters and capture the viewport. The bridge is one stdlib process; the extension ships for Chrome/Edge, with a Firefox build and signing notes.",
    metrics: [
      { value: "15", label: "AI chats supported" },
      { value: "0", label: "API keys required" },
      { value: "41", label: "Headless tests" },
      { value: "1.2", label: "Current release" },
    ],
  },

  {
    slug: "aqquaac",
    title: "AqquaAC",
    summary:
      "An open-source FiveM anti-cheat built around readable Lua modules you can reload at runtime.",
    kind: "Game systems",
    language: "Lua",
    year: "2025",
    status: "Stable · GPL-3.0",
    role: "Maintainer",
    repo: "https://github.com/cerbiss/AqquaAc-2",
    stack: ["Lua", "FiveM", "ConVars", "ACE permissions"],
    published: true,
    featured: true,
    plate: {
      kicker: "FIVEM · SERVER-SIDE",
      headline: ["Read the code.", "Reload the rules."],
      code: [
        "exec @AqquaAC/config.cfg",
        "exec @AqquaAC/permission.cfg",
        "ensure AqquaAC",
        "vac:sync  →  modules reloaded",
      ],
    },
    gallery: [],
    overview:
      "AqquaAC is a FiveM anti-cheat with a deliberately unglamorous pitch: open Lua you can read, ConVars you can tune, and modules you can reload without restarting the server. It validates what the server can actually verify instead of trusting the client.",
    problem:
      "Server owners are routinely asked to install obfuscated anti-cheat binaries and trust them with every player. When a rule misfires, the fix is usually a restart, a support ticket, or turning the check off entirely.",
    process: [
      {
        title: "Runtime reload first",
        body: "vac:sync re-applies configuration and reloads a module or the whole stack during a live session. Changing a threshold does not mean dropping the lobby.",
      },
      {
        title: "Permissions, not hard-coded exemptions",
        body: "ACE entries such as vac:superjump and vac:invincibility let staff bypass one check without disabling it for everyone. Permission requests are handled by the resource.",
      },
      {
        title: "Validate creation, not just movement",
        body: "Entity creation, blocked model lists and particle filtering cover the props and effects used to crash clients or hide activity. Entity lockdown and server-side creation are recommended alongside it.",
      },
      {
        title: "Say what it cannot do",
        body: "The README explains why client-side variable scans and VPN blocking are skipped, and why no anti-cheat is a silver bullet. That honesty is part of the product.",
      },
    ],
    architecture: [
      {
        title: "Modules + ConVars",
        body: "Checks are grouped into modules with their own ConVars. The config file and permission file are executed separately, so policy can change without touching detection code.",
      },
      {
        title: "Server-authoritative checks",
        body: "The resource leans on server events and native state rather than client-reported truth. Where a check would require trusting the client, it is left out and documented.",
      },
      {
        title: "Live sync",
        body: "vac:sync broadcasts updated settings and reinitialises the module stack, removing the restart that usually follows a config change.",
      },
    ],
    outcome:
      "A server-side resource with a clear config/permission split, documented ConVars and a stable release channel. The repository is as much a threat model as it is an installation guide.",
    metrics: [
      { value: "Lua", label: "Fully open source" },
      { value: "Live", label: "Runtime module reload" },
      { value: "ACE", label: "Per-check permissions" },
      { value: "GPL-3.0", label: "Licence" },
    ],
  },

  {
    slug: "mcd-onboarding-handbook",
    title: "MC&D Onboarding Handbook",
    summary:
      "An interactive Next.js handbook that turns a wall of onboarding policy into generators, checklists and search.",
    kind: "Web app",
    language: "TypeScript",
    year: "2025",
    status: "Live · GPL-3.0",
    role: "Design, front end",
    repo: "https://github.com/cerbiss/mcd-onboarding-handbook",
    site: "https://mcd-onboarding-handbook.vercel.app",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Radix UI", "Vercel"],
    published: true,
    featured: false,
    cover: {
      src: "/media/projects/mcd/hero.jpeg",
      width: 967,
      height: 445,
      kind: "image",
      alt: "MC&D Onboarding Handbook homepage with sidebar navigation and the Marshall, Carter & Darke logo",
      caption:
        "Eight handbook sections, a command palette and the company's archival visual language.",
    },
    gallery: [
      {
        src: "/media/projects/mcd/generator.jpeg",
        width: 967,
        height: 445,
        kind: "image",
        alt: "MC&D handbook format generator with codename and promotion request options",
        caption:
          "The format generator produces four request types with validation and one-click copy.",
      },
    ],
    overview:
      "A digital onboarding handbook for Marshall, Carter & Dark, a roleplay company. Instead of a PDF, new members get eight searchable sections, a format generator for codename requests, shift logs, promotion requests and point requests, and a quick reference for commands and progression.",
    problem:
      "New members were expected to learn a long list of formats, ranks and Discord commands from documentation that was hard to search and easy to format wrong. Every mistake created work for the people reviewing it.",
    process: [
      {
        title: "Turn policy into a tool",
        body: "The format generator produces an exact, copyable request for four common tasks, with required fields and validation instead of a template buried in a document.",
      },
      {
        title: "Keep the reference beside the work",
        body: "Quick reference stays in the same shell as the generators. Search and a Cmd/Ctrl+K palette jump to any of the eight sections without losing the current form.",
      },
      {
        title: "Make it feel like the company",
        body: "The dark, archival visual language matches the in-universe brand rather than looking like a generic docs theme. It also keeps long policy pages readable at night.",
      },
      {
        title: "Ship it static",
        body: "The App Router pages prerender on Vercel. There is no server state to maintain, no database to migrate and no API key in the client bundle.",
      },
    ],
    architecture: [
      {
        title: "Next.js App Router",
        body: "Server components render the handbook shell; small client components own the format generator, theme toggle and command palette.",
      },
      {
        title: "Radix + shadcn/ui",
        body: "Accessible primitives provide dialogs, tabs, tooltips and menus, with Tailwind handling the visual layer and next-themes handling dark/light.",
      },
      {
        title: "Static hosting",
        body: "Every page is pre-rendered and served from Vercel's edge. The repository includes the Vercel and GitHub Pages deployment notes.",
      },
    ],
    outcome:
      "Live at mcd-onboarding-handbook.vercel.app, with eight sections, four generators and a searchable command palette. The source is GPL-3.0 and the build is entirely static.",
    metrics: [
      { value: "8", label: "Handbook sections" },
      { value: "4", label: "Format generators" },
      { value: "Live", label: "Vercel deployment" },
      { value: "GPL-3.0", label: "Licence" },
    ],
  },

  {
    slug: "ai-prompt-enhancer",
    title: "AI Prompt Enhancer",
    summary:
      "A Manifest V3 extension that scores prompts as you type and suggests fixes on six AI platforms, entirely in the browser.",
    kind: "Browser extension",
    language: "JavaScript",
    year: "2025",
    status: "Open source · MIT",
    role: "Development, interface",
    repo: "https://github.com/cerbiss/ai-prompt-enhancer",
    stack: ["JavaScript", "Manifest V3", "Chrome", "Firefox"],
    published: true,
    featured: false,
    plate: {
      kicker: "MANIFEST V3 · LOCAL ONLY",
      headline: ["A better prompt,", "before you send."],
      code: [
        "platform    chat.openai.com",
        "analysis    local",
        "network     off",
        "templates   17+",
      ],
    },
    gallery: [],
    overview:
      "AI Prompt Enhancer watches the prompt box on ChatGPT, Claude, Gemini, Copilot, Bing Copilot and Perplexity, scores the draft from 0 to 100, and points at the specific missing pieces: context, audience, format and constraints. Templates cover the requests people repeat most.",
    problem:
      "Most people type a vague one-liner, get a vague answer, and blame the model. Rewriting the prompt is a skill, and switching to a separate prompt library breaks the flow of the conversation.",
    process: [
      {
        title: "Analyze in place",
        body: "A content script reads the prompt box and renders the overlay next to it. Suggestions can be applied with one click, without copying the prompt into another app.",
      },
      {
        title: "Keep it local",
        body: "The analysis engine, rules and templates all run in the browser. No prompt text is sent to a third-party API; analytics are opt-in and anonymous.",
      },
      {
        title: "Seventeen starting points",
        body: "Templates cover general requests, coding, creative writing, data analysis, business and academic work. Custom templates support variables and categories.",
      },
      {
        title: "Match the host",
        body: "Each platform gets its own selectors and theme, with a generic fallback if a chat box changes. The detailed panel opens with Ctrl+Shift+E.",
      },
    ],
    architecture: [
      {
        title: "Manifest V3 content script",
        body: "The content script detects the host platform, observes the prompt field and mounts the overlay. A background service worker handles extension state.",
      },
      {
        title: "Analyzer + enhancer",
        body: "Deterministic rules score prompts for vagueness, missing context and format. The enhancer turns the highest-value gaps into concrete suggestions.",
      },
      {
        title: "Template store",
        body: "Seventeen built-in templates are grouped into six categories, with variables and custom entries stored in extension storage.",
      },
    ],
    outcome:
      "One extension across six platforms, with local-only analysis, 17+ templates and a keyboard-accessible panel. It is MIT licensed and loads unpacked in Chrome, Edge, Brave and Firefox.",
    metrics: [
      { value: "6", label: "AI platforms" },
      { value: "17+", label: "Prompt templates" },
      { value: "0", label: "External API calls" },
      { value: "MIT", label: "Licence" },
    ],
  },
];

/* Smaller projects that do not need a full case study. */
export const alsoBuilt: AlsoBuilt[] = [
  {
    title: "Nexus Spark UI",
    body: "Accessible React + TypeScript component library: Button, Input, Card, Modal, Dropdown and Navbar, with keyboard navigation and ARIA support.",
    href: "https://github.com/cerbiss/Nexus-Spark-UI",
    year: "2025",
  },
  {
    title: "FivemAC",
    body: "FiveM anti-cheat with multi-layer detection, score decay, tiered punishments, MySQL persistence and Discord webhook alerts.",
    href: "https://github.com/cerbiss/FivemAC",
    year: "2025",
  },
  {
    title: "YimMenu Italian translation",
    body: "Italian localisation work for the YimMenu project, contributed in 2024.",
    href: "https://github.com/cerbiss/YimMenu-Italian-Translation",
    year: "2024",
  },
  {
    title: "yapfast",
    body: "The native Discord client experiment that Yappuccino continues. Kept public as the reference point.",
    href: "https://github.com/cerbiss/yapfast",
    year: "2026",
  },
];

/* ---------------------------------------------------------------------------
   Selectors
   ------------------------------------------------------------------------- */
export const publishedCodeProjects = codeProjects.filter((p) => p.published);

export const featuredCodeProjects = publishedCodeProjects.filter(
  (p) => p.featured,
);

export function getCodeProject(slug: string): CodeProject | undefined {
  return publishedCodeProjects.find((p) => p.slug === slug);
}

/** Wraps around, so the last case study points back at the first. */
export function getNextCodeProject(slug: string): CodeProject | undefined {
  const i = publishedCodeProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return publishedCodeProjects[(i + 1) % publishedCodeProjects.length];
}
