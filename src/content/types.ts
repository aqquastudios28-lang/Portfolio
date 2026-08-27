/** A single media slot. Leave `src` empty to render a labelled placeholder frame. */
export type Media = {
  /** Path under /public, e.g. "/media/projects/tycoon-hud/hero.png". Empty = placeholder. */
  src: string;
  /** "image" for png/jpg/webp, "video" for mp4/webm loops (also use this for converted GIFs). */
  kind: "image" | "video";
  /** Required. Describes the interface shown, for screen readers and SEO. */
  alt: string;
  /** Optional caption rendered beneath the frame. */
  caption?: string;
  /** Aspect ratio, e.g. "16/9", "4/3", "9/16" for mobile HUD shots. Defaults to "16/9". */
  ratio?: string;
  /** Optional still frame shown before a video loads. */
  poster?: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line shown under the title in the grid. */
  summary: string;
  /** Grouping used by the filter on /work. */
  category: "Client work" | "Systems" | "Concept";
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
  /** Shown as a stat row. Keep to three or four. */
  metrics: Metric[];
};
