import type { Metadata } from "next";
import { site } from "@/content/site";

/* The index page is a client component, so it cannot export metadata itself.
   Case studies override all of it. */
export const metadata: Metadata = {
  title: "Design — Roblox UI & Menu Archive",
  description: `Menus, shops, HUD overlays and economy screens for Roblox games, designed and built in Studio by ${site.name}. Kept separate from the engineering work.`,
  alternates: { canonical: "/design" },
  openGraph: {
    type: "website",
    url: "/design",
    title: `Design — ${site.name}`,
    description: `Roblox menus, shops, HUD overlays and economy screens by ${site.name}.`,
  },
};

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
