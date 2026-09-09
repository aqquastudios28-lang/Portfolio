import type { Metadata, Viewport } from "next";
import { Fredoka, JetBrains_Mono, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { LightboxProvider } from "@/components/ui/Lightbox";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { seo, site } from "@/content/site";
import "./globals.css";

/* Fredoka is the rounded, chunky face the headlines need; Outfit is a soft
   geometric that stays readable at body size; mono handles every caps label.
   --font-sans was declared in the theme but never bound to a family, so body
   text had been falling through to system-ui. */
const display = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.intro,
  keywords: [...seo.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    sameAs: site.links.map((l) => l.href),
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-ink text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>

        <MotionProvider>
          <LightboxProvider>
            <div className="flex min-h-screen flex-col justify-between">
              <Nav />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </LightboxProvider>
        </MotionProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
