import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import content from "@/content.json";
import "./globals.css";

const serif = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-serif-display",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const sans = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-sans-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* ------------------------------------------------------------------ */
/*  SEO — single source of truth, content-driven                      */
/* ------------------------------------------------------------------ */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://yuli-flowers.vercel.app";

const brandName = content.brand?.name ?? "פרחי יולי";
const brandTagline =
  content.brand?.tagline ?? "סטודיו שזירה בוטיק";
const aboutDescription =
  content.about?.description ?? brandTagline;

// Brand logo used as the social-share preview (WhatsApp, Facebook, LinkedIn,
// Twitter/X, iMessage). Keeping the logo here makes the brand instantly
// recognizable in link cards; dimensions below match the actual asset so
// the platforms can render it without stretching.
const OG_IMAGE = "/images/logo.webp";
const OG_IMAGE_WIDTH = 512;
const OG_IMAGE_HEIGHT = 512;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${brandName} · ${brandTagline}`,
    template: `%s · ${brandName}`,
  },
  description: aboutDescription,
  applicationName: brandName,
  keywords: [
    "פרחי יולי",
    "סטודיו פרחים",
    "שזירת פרחים",
    "פרחים לאירועים",
    "זר כלה",
    "חופות פרחים",
    "עיצוב בוטני",
    "פרחים חולון",
    "מנוי פרחים",
    "Yuli Flowers",
    "Flower Studio",
    "Holon",
  ],
  authors: [{ name: "RoiStudio", url: "https://www.roistudio.co.il/" }],
  creator: "RoiStudio",
  publisher: brandName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: brandName,
    title: brandName,
    description: brandTagline,
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: `${brandName} — ${brandTagline}`,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    // `summary` (square) suits a logo preview better than `summary_large_image`
    // which expects a 2:1 hero shot and would leave large letterbox bars.
    card: "summary",
    title: brandName,
    description: brandTagline,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "florist",
};

export const viewport: Viewport = {
  themeColor: "#F0F0EF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

/* ------------------------------------------------------------------ */
/*  Structured Data — LocalBusiness / Florist                         */
/*  Rendered inline in <head> as JSON-LD (SSR) for richer results.    */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: brandName,
  description: aboutDescription,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: content.contact?.phone,
  email: content.contact?.email,
  address: content.contact?.address
    ? {
        "@type": "PostalAddress",
        streetAddress: content.contact.address,
        addressLocality: "Holon",
        addressCountry: "IL",
      }
    : undefined,
  sameAs: [
    content.contact?.facebook,
    content.contact?.instagram,
    content.contact?.tiktok,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-brand-sand font-sans text-brand-dark">
        {children}
      </body>
    </html>
  );
}
