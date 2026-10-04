import type { Metadata } from "next";
import { site } from "@/content/site";

/* The index page is a client component, so it cannot export metadata itself.
   Without this it inherited the root canonical and told crawlers /work was a
   duplicate of the homepage. Case studies override all of it. */
export const metadata: Metadata = {
  title: "Work — Roblox UI & Menu Designs",
  description: `Roblox menus, shops, HUD overlays and economy screens designed and built in Studio by ${site.name}. Every screen has its reasoning written up.`,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    title: `Work — ${site.name}`,
    description: `Roblox menus, shops, HUD overlays and economy screens by ${site.name}.`,
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
