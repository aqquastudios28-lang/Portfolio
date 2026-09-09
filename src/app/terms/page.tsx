import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { terms } from "@/content/legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${site.name} — what you can do with the site and the work shown on it.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      current="/terms"
      intro={terms.intro}
      sections={terms.sections}
    />
  );
}
