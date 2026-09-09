import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `What ${site.name} does and does not collect. No analytics, no cookies, no tracking.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      current="/privacy"
      intro={privacy.intro}
      sections={privacy.sections}
    />
  );
}
