/** A single media slot. Leave `src` empty to render a labelled placeholder frame. */
export type Media = {
  /** Path under /public, e.g. "/media/projects/tycoon-hud/hero.png". Empty = placeholder. */
  src: string;
  /** Real pixel size of the file. Images are shown uncropped at this ratio. */
  width?: number;
  height?: number;
  /** "image" for png/jpg/webp, "video" for mp4/webm loops (also use this for converted GIFs). */
  kind: "image" | "video";
  /** Required. Describes the interface shown, for screen readers and SEO. */
  alt: string;
  /** Optional caption rendered beneath the frame. */
  caption?: string;
  /** Aspect ratio for video loops, e.g. "16/9". Images use width and height instead. */
  ratio?: string;
  /** Optional still frame shown before a video loads. */
  poster?: string;
};

/** One checkable fact about the screen. Not a KPI. */
export type Metric = {
  value: string;
  label: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

/** A typographic cover for a project that has no honest screenshot. */
export type Plate = {
  kicker: string;
  /** One line per array entry. The last line is set in the accent colour. */
  headline: string[];
  /** Mono lines shown as a small terminal sample. */
  code: string[];
};

/** A software project. The engineering counterpart to `Project`. */
export type CodeProject = {
  slug: string;
  title: string;
  /** One line shown under the title in the index and on cards. */
  summary: string;
  kind:
    | "Desktop app"
    | "Developer tool"
    | "Web app"
    | "Browser extension"
    | "Game systems";
  language: string;
  year: string;
  /** Release state plus licence, e.g. "Beta · GPL-3.0". */
  status: string;
  /** What I did on it. */
  role: string;
  repo?: string;
  site?: string;
  stack: string[];
  published: boolean;
  featured: boolean;

  /** Honest provenance: forks, collaborators, AI assistance. */
  note?: string;

  /** Real screenshots only. Leave out when the project has no honest shot. */
  cover?: Media;
  gallery: Media[];
  /** Required when `cover` is absent. */
  plate?: Plate;

  overview: string;
  problem: string;
  process: ProcessStep[];
  /** How the thing is put together. */
  architecture: ProcessStep[];
  outcome: string;
  /** Only print numbers that can be pointed at. */
  metrics: Metric[];
};

export type AlsoBuilt = {
  title: string;
  body: string;
  href: string;
  year: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line shown under the title in the grid. */
  summary: string;
  /** What kind of screen this is. Shown in the index and on the case study. */
  category: "Menu" | "Shop" | "Economy" | "Popup" | "HUD" | (string & {});
  year: string;
  role: string;
  /** Rendered as small mono chips. */
  tools: string[];
  /** Set false to hide from the site entirely without deleting it. */
  published: boolean;
  /** Set true to surface on the homepage. Aim for three. */
  featured: boolean;

  /** Card + case-study hero image. */
  cover: Media;

  /* ---- Case study body ---- */
  overview: string;
  problem: string;
  /** Numbered process list. Three to five reads best. */
  process: ProcessStep[];
  solution: string;
  /** Gallery beneath the solution section. Mix images and video loops freely. */
  gallery: Media[];
  outcome: string;
  /**
   * Shown as a spec row under the closing section. Leave empty when there is
   * no honest number to print — an empty array renders nothing.
   */
  metrics: Metric[];
};
