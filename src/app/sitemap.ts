import type { MetadataRoute } from "next";
import { publishedCodeProjects } from "@/content/code-projects";
import { publishedProjects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/design", priority: 0.7 },
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

  const codeProjectRoutes = publishedCodeProjects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.9,
    images: [project.cover, ...project.gallery]
      .filter(
        (media): media is NonNullable<typeof media> =>
          media?.kind === "image" && Boolean(media.src),
      )
      .map((media) => `${site.url}${media.src}`),
  }));

  const designRoutes = publishedProjects.map((project) => ({
    url: `${site.url}/design/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
    images: [project.cover, ...project.gallery]
      .filter((media) => media.kind === "image" && media.src)
      .map((media) => `${site.url}${media.src}`),
  }));

  return [...staticRoutes, ...codeProjectRoutes, ...designRoutes];
}
