import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import { SeasonDecor, SeasonScript } from "@/components/season/Spooky";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { LightboxProvider } from "@/components/ui/Lightbox";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { about, seo, site } from "@/content/site";
import "./globals.css";

/* Barlow Condensed in heavy italic caps carries every headline and label;
   Barlow is the same skeleton at normal width, so body text matches without
   competing. Mono is left for addresses and values you might copy. */
const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: site.role,
        description: site.intro,
        url: site.url,
        image: `${site.url}/media/logo.png`,
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Florence",
          addressCountry: "IT",
        },
        sameAs: site.links.filter((l) => l.profile).map((l) => l.href),
        knowsAbout: about.toolkit.flatMap((g) => g.items),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.intro,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      /* SeasonScript adds data-season before hydration. */
      suppressHydrationWarning
    >
      <head>
        <SeasonScript />
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

        <SeasonDecor />

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
