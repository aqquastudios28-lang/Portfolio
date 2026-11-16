# Cerbis — portfolio

Programming-first portfolio for Cerbis, a software developer in Florence. Native
desktop apps, developer tools, web interfaces and game systems are the main
event; the Roblox interface work lives in a separate design archive.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion. Every content
route is prerendered; only the contact endpoint runs on demand.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
npm run lint
```

---

## The two routes

The site deliberately separates engineering from interface design.

| Route | What it is |
| --- | --- |
| `/` | Thesis, measured Yappuccino comparison, selected engineering work, working principles, design teaser, scope and contact |
| `/work` | Filterable engineering index — six case studies, plate or index view |
| `/work/[slug]` | One engineering case study: problem, process, measurements, constraints, next project |
| `/design` | Roblox interface archive — menus, shops, economies and HUDs |
| `/design/[slug]` | One interface case study |
| `/about` | Background, developer experience, toolkit and timeline |
| `/contact` | Project enquiry form and direct channels |
| `/privacy`, `/cookies`, `/terms` | Legal pages |

Nav order is Work · Design · About · Contact. Design is a secondary tab, not a
co-equal homepage pitch.

---

## Where everything lives

You edit content. Components should rarely need touching.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Name, role, headline, intro, facts, links, capabilities, principles, About copy, toolkit, developer experience, timeline, SEO defaults |
| `src/content/code-projects.ts` | Six engineering case studies plus the "Also built" list |
| `src/content/projects.ts` | The Roblox interface archive |
| `src/content/types.ts` | `CodeProject`, `DesignProject`, `Media`, `Plate`, metrics and process shapes |
| `src/content/legal.ts` | Privacy, cookie and terms copy |
| `src/app/globals.css` | Design tokens, type scale and shared component classes |
| `src/lib/motion.ts` | Motion tokens and shared variants |

```
src/
  app/            routes — /, /work, /work/[slug], /design, /design/[slug],
                  /about, /contact, legal pages, sitemap, robots, manifest, OG image
  components/
    layout/       Nav, Footer
    home/         Hero, MemoryFootprint, SelectedWork, Toolkit, DesignTeaser,
                  Capabilities, ContactCta
    work/         WorkIndex, Shot, Plate, PlateZoom
    contact/      ContactForm
    ui/           Container, CopyButton, Lightbox, MotionProvider
    season/       Halloween decorations (auto, off outside October)
    legal/        LegalPage
  content/        ← edit these
  lib/            cn(), motion tokens, rate limiting, Discord message payloads
public/media/projects/
  yappuccino/     real app screenshots
  hearthlens/     real app screenshots
  mcd/            live handbook screenshot
  game-ui-suite/  Roblox interface archive images
```

---

## Adding engineering work

Append an object to `codeProjects` in `src/content/code-projects.ts`. Routes,
the sitemap, the work index and the homepage all pick it up automatically —
there is nothing to register.

- `published: false` hides it without deleting it.
- `featured: true` puts it in the homepage selection. Yappuccino is the lead;
  the other featured studies follow in alternating rows.
- Give every case study a `plate` when there is no honest screenshot. Plates are
  typographic terminal covers, not fake product shots.
- `cover` is optional; `plate` is required when there is no cover.
- Use `note` for provenance that a reader deserves to know — forks, AI
  assistance, collaborators. It renders after the stack line.

Case studies carry `summary`, `role`, `status`, `year`, `language`, `repo`,
`stack`, `metrics`, `process`, `constraints` and optional `gallery` media. Any
number in `metrics` must be checkable: a README measurement, a test count, or a
value visible in the screenshot above it. No invented conversion or retention
figures.

### The measurement standard

Yappuccino's homepage comparison uses the published README numbers, measured on
one Windows PC against Vesktop (Discord's web app in the same Electron shell):

| State | Vesktop | Yappuccino |
| --- | --- | --- |
| Idle | 724 MB | 30 MB (−96%) |
| Image-heavy channel | 706 MB | 41 MB (−94%) |
| In a call | 888 MB | 44 MB (−95%) |
| Screen sharing | 1,013 MB | 113 MB (−89%) |
| Launch to readable window | 8 s | 0.22 s (36× faster) |

Memory and CPU were measured 25 October 2026; screen sharing on 27 October.
CPU counts the whole processor as 100%. If a claim cannot be repeated with that
method, it does not go on the site.

---

## Adding design work

Append to `projects` in `src/content/projects.ts`. The same `published`,
`featured`, `cover` and `gallery` conventions apply. Design pages are statically
generated from the slug.

Images go in `public/media/projects/<slug>/`, with real `width` and `height` so
the frame reserves the right space before decode. Video loops use `kind:
"video"` and an `.mp4`; convert GIFs first:

```bash
ffmpeg -i clip.gif -movflags faststart -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" clip.mp4
```

Loops autoplay muted, pause off-screen, and respect reduced-motion preferences.

---

## Design system

Loud condensed italic type, quiet surfaces: one panel deep, 1px rules, small
radii, no blur. The three accent colours each have one job.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#0a0c12` | Page |
| `--surface` | `#12151e` | Panels |
| `--paper` | `#f7f7f5` | Primary text |
| `--paper-2` | `#a9adba` | Body copy |
| `--paper-3` | `#82879a` | Metadata |
| `--accent` | `#ffe100` | Interaction only |
| `--accent-2` | `#ff2d87` | Offset shadow, ribbon |
| `--accent-3` | `#1fe0d0` | Ribbon only |

Fonts: Barlow Condensed (display, heavy italic caps), Barlow (body) and
JetBrains Mono (addresses, values, metadata). Use `.t-display`, `.t-h1`,
`.t-h2`, `.t-h3`, `.t-lead`, `.t-body`, `.annot` and `.pill` rather than ad-hoc
sizes.

Standing decisions:

- **Slant means interactive or label.** Body copy is never italic.
- **Colour is interaction.** Yellow marks what you can press, focus, or the
  current state. It is not decoration.
- **Rules, not cards.** Grouping is done with space and a section header.
- **One motion.** Shared curves and durations; no perpetual animation.
- **Three colours, three jobs.** Surviving the ribbon is the only place all
  three accents meet.

---

## Contact endpoint

`POST /api/contact` validates `name`, `scope`, `message` and optional `game`
(now the project link), checks a honeypot, applies a per-IP rate limit (5
requests per 10 minutes), escapes everything that reaches email, and then:

- sends mail through Resend when `RESEND_API_KEY` is set — `NOTIFICATION_EMAIL`
  or `CONTACT_EMAIL` is the recipient, `RESEND_FROM_EMAIL` the optional sender;
- posts a Discord Components V2 card when `DISCORD_WEBHOOK_URL` is set;
- logs the submission and returns success in local mode when neither is set.

The browser form keeps its original payload keys (`name`, `game`, `scope`,
`message`, `hp_website`) so existing automation keeps working while the labels
read as engineering enquiries.

---

## Already handled

- **SEO** — per-route metadata and canonicals, Open Graph and Twitter cards,
  `sitemap.xml` with image entries for both archives, `robots.txt`, Person
  JSON-LD and a generated share card that rebuilds itself from `site.ts`.
- **Accessibility** — skip link, one `<h1>` per page, semantic landmarks,
  labelled fields, visible focus rings and `aria-current` on active nav.
- **Reduced motion** — animated components render their final state.
- **No-JS resilience** — the prerendered HTML stays visible without scripts.
- **Dark-only** — the palette is authored for a dark page and `color-scheme`
  matches it, so form controls and scrollbars do not flash white.

## Deploy

Content routes are static. The contact route needs a Node runtime for Resend and
webhook delivery, so deploy to Vercel (or another Node host) rather than a pure
static file server.

```bash
npx vercel
```

`site.url` is `https://www.cerbis.xyz`. Change it there and canonical tags,
Open Graph and the sitemap follow.

## Provenance

Yappuccino began as a fork of yapfast by wiredtenshi, and its README states that
AI wrote most of the code. The case study includes that note and presents the
architecture and measurements, both of which can be checked against the
repository. Other project claims are documented from their public repositories
and the shipped interfaces.
