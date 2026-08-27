import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ToastProvider } from "@/components/ui/Toast";
import { LightboxProvider } from "@/components/ui/Lightbox";
import { seo, site } from "@/content/site";
import "./globals.css";

/* Two families. Archivo carries display and text; the mono carries
   metadata. A third face would be decoration. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: seo.defaultTitle,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark" as const,
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
    knowsAbout: [...seo.keywords],
  };

  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <head>
        {/* Marks the document as scripted before first paint, which is what
            arms the reveals. If this never runs the reveal styles stay inert
            and every section renders plainly visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>

        <LightboxProvider>
          <ToastProvider>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </ToastProvider>
        </LightboxProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
