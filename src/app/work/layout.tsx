import type { Metadata } from "next";
import { site } from "@/content/site";

/* The index page is a client component, so it cannot export metadata itself. */
export const metadata: Metadata = {
  title: "Work — Software Case Studies",
  description: `Native desktop apps, developer tools and web interfaces by ${site.name}. Each case study documents the constraint, the build and the measurement.`,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
    title: `Work — ${site.name}`,
    description: `Native desktop apps, developer tools and web interfaces by ${site.name}.`,
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
