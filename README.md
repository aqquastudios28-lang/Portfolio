# Portfolio

Roblox UI/UX portfolio. Next.js 16 (App Router) · TypeScript · Tailwind 4. Fully static — every route prerenders.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
npm run lint
```

---

## ⚠️ Still stubbed

- `site.links` in `src/content/site.ts` — the Roblox, X and Discord URLs are empty stubs and currently point nowhere useful.

Everything else in `content/` is real copy. The `metrics` rows deliberately hold only facts you could check against the screenshot above them — tier counts, states, level caps. If you add a metric, hold it to the same standard: no conversion rates, no retention percentages, nothing you cannot show.

---

## Where everything lives

You edit content. You should rarely need to touch components.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Name, role, headline, intro, email, availability, links, capabilities, About page copy, SEO defaults |
| `src/content/projects.ts` | Every case study |
| `src/content/types.ts` | The shape of a project — read this to see every available field |
| `src/app/globals.css` | Design tokens: colour and type scale |
| `src/lib/motion.ts` | Motion tokens: one curve, three durations, shared variants |

```
src/
  app/            routes — /, /work, /work/[slug], /about, /contact
  components/
    layout/       Nav, Footer
    ui/           Container, Reveal, Lines, Rule, MediaFrame, VideoLoop,
                  Lightbox, CopyButton, Chip, ArrowLink
    home/         Hero, SelectedWork, Capabilities, ContactCta
    work/         ProjectRow
    case/         CaseSection, ProcessList, MetricRow, NextProject
    contact/      ContactForm
  content/        ← you edit these
  lib/            cn(), useScrolled(), usePrefersReducedMotion(), motion tokens
```

---

## Adding a project

Append an object to the `projects` array in `src/content/projects.ts`. Routes, the sitemap and the work grid all pick it up automatically — there is nothing to register.

- `published: false` hides it without deleting it.
- `featured: true` surfaces it on the homepage. Three or four works best; they render full-width, so prefer landscape covers there.

## Adding images and video

1. Drop files in `public/media/projects/<slug>/`
2. Point the slot at them:

```ts
cover: {
  src: "/media/projects/ascend-tycoon-hud/cover.png",
  kind: "image",
  alt: "Describe the interface shown — this is read aloud and indexed",
  ratio: "16/9",
}
```

Any slot left as `src: ""` renders a dashed placeholder showing the expected ratio, the alt text and the path to drop the file at. They are deliberately obvious so you cannot ship one by accident.

**Video:** use `kind: "video"` with an `.mp4`. Convert GIFs first — an mp4 is typically 10× smaller:

```bash
ffmpeg -i clip.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" clip.mp4
```

Add a `poster` frame for anything above the fold. Loops autoplay muted, pause off-screen, and do not autoplay at all for visitors who have asked for reduced motion — they get controls instead.

---

## Design system

Technical editorial: ink and bone, a visible hairline grid, mono metadata, square corners. Tokens live at the top of `globals.css`. Change them there, not in components.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#0b0b0c` | Page |
| `--ink-2` | `#101011` | Media frames |
| `--bone` | `#edebe7` | Primary text (warm off-white, never pure white) |
| `--bone-dim` | `#928e87` | Body copy |
| `--bone-faint` | `#605d58` | Metadata |
| `--rule` | `12% bone` | The grid, made visible |
| `--accent` | `#ff4a1c` | Interaction only |

### The one rule

**Colour is interaction.** Orange marks hover, focus and current state — nothing else. No glows, no gradients, no accent-coloured punctuation, no decorative highlights. The resting page is achromatic so that your screenshots are the only colour on it.

If you add a component, ask whether the colour you are reaching for marks something the visitor can *do*. If not, use `--bone-dim` or a rule.

### Other standing decisions

- **Square corners.** `--radius: 0`. Print has no rounded corners, and a mix of pill buttons against soft cards is the fastest way to look generated.
- **Two families.** Archivo carries display and text; JetBrains Mono carries metadata. A third face would be decoration.
- **Rules, not cards.** Sections are separated by hairlines and share one left rail (`.rail`, a 9rem metadata column). Almost nothing is boxed.
- **One motion.** Every animation on the site pulls its curve and duration from `src/lib/motion.ts`: a single hard ease-out, three durations, nothing that loops. Display type rises from behind a mask, images are uncovered by a wipe, section rules draw in from the left. No hover scale, no parallax, no shimmer, no perpetual animation — anything still moving after you have stopped scrolling is decoration.

Use `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-body`, `.t-label` rather than ad-hoc sizes.

---

## What is already handled

- **SEO** — per-route metadata, canonical URLs, Open Graph, Twitter cards, `sitemap.xml`, `robots.txt`, Person JSON-LD, and a generated share card (`opengraph-image.tsx`) that rebuilds itself from `site.ts`.
- **Accessibility** — skip link, one `<h1>` per page, semantic landmarks, labelled form fields, visible focus rings, `aria-current` on the active nav item.
- **Reduced motion** — every animated component checks `useReducedMotion()` and renders its final state directly. A visitor who asked for no motion gets a static page, not a fast one.
- **No-JS resilience** — Motion writes its "hidden" state into the prerendered HTML, so animated elements carry `data-motion` and a `<noscript>` rule in `layout.tsx` restores them. If scripts never run, the page renders plainly visible rather than blank.

## Contact form

There is no backend. The form composes a `mailto:` link and hands off to the visitor's own mail client — nothing to host, no third-party service holding messages. To switch to in-page submission later, replace the handler in `src/components/contact/ContactForm.tsx` with a POST to a route handler; the markup stays.

## Deploy

Static output, so anywhere works. Vercel:

```bash
npx vercel
```

`site.url` is already set to `https://cerbis.xyz`; change it there if the domain moves, and canonical tags, Open Graph and the sitemap follow.
