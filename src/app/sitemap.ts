import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
    { path: "/cookies", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const projectRoutes = publishedProjects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.8,
    /* Image sitemap entries. The screenshots are the portfolio, so they are
       worth getting into image search. */
    images: [p.cover, ...p.gallery]
      .filter((m) => m.kind === "image" && m.src)
      .map((m) => `${site.url}${m.src}`),
  }));

  return [...staticRoutes, ...projectRoutes];
}
