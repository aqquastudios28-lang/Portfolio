import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { cookies } from "@/content/legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookies",
  description: `${site.name} sets no cookies and runs no analytics. Here is exactly what that means.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      current="/cookies"
      intro={cookies.intro}
      sections={cookies.sections}
    />
  );
}
