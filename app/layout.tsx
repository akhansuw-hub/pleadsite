import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig, siteOrigin } from "@/site.config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";

const title = "Plead — Settle arguments in an AI courtroom for couples";
const description =
  "Present both sides, submit the evidence and let Plead’s AI court decide everyday couple arguments.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: { default: title, template: "%s · Plead" },
  description,
  applicationName: "Plead",
  openGraph: {
    type: "website",
    siteName: "Plead",
    title,
    description,
    locale: "en_GB",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Plead: the AI courtroom for couples" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/og.png", alt: "Plead: the AI courtroom for couples" }],
  },
  ...(siteConfig.APP_STORE_URL
    ? { itunes: { appId: siteConfig.APP_STORE_URL.match(/id(\d+)/)?.[1] ?? "" } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#FFF6ED",
  colorScheme: "light",
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Plead",
    operatingSystem: "iOS",
    applicationCategory: "LifestyleApplication",
    description,
    ...(siteConfig.APP_STORE_URL ? { downloadUrl: siteConfig.APP_STORE_URL } : {}),
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        {/* Enables scroll-reveal styles only when JS runs; content stays visible without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
