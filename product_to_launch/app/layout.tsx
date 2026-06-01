import type { Metadata, Viewport } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_LOCALE,
  SITE_LANG,
  websiteJsonLd,
  organizationJsonLd,
  absoluteUrl,
  jsonLdScript,
} from "@/lib/seo";
import "./globals.css";

// Trim from 6 → 3 Google Font families. CJK relies on system fonts
// (PingFang TC / Microsoft JhengHei / Noto Sans TC) declared in globals.css.
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=Instrument+Serif:ital@0;1" +
  "&family=Geist:wght@300;400;500;600;700" +
  "&family=JetBrains+Mono:wght@300;400;500;700" +
  "&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "11 個角色 · 58 個交付物 · 一張可走完的地圖。每張卡片只回答四件事：解決什麼、誰負責、何時用、AI 怎麼加速。",
  keywords: [
    "產品開發",
    "SDLC",
    "系統設計",
    "PRD",
    "ADR",
    "Runbook",
    "SLO",
    "AI 工作流",
    "Claude Code",
    "Product to Launch",
    "Launch Atlas",
  ],
  authors: [{ name: "桑尼資料科學 Lab", url: "https://sunnydatascience.com/" }],
  creator: "桑尼資料科學 Lab",
  publisher: "桑尼資料科學 Lab",
  alternates: {
    canonical: "/",
    languages: {
      "zh-Hant": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: `${SITE_TAGLINE}。11 角色 · 58 交付物 · 一張可走完的地圖。`,
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl("/generated/og-card.webp"),
        width: 1280,
        height: 853,
        alt: "Launch Atlas — 從一個假設，到一座可運維的系統",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE,
    images: [absoluteUrl("/generated/og-card.webp")],
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
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e14" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Next.js dev mode injects React Refresh runtime that uses eval(). Production
// builds (the only thing that gets deployed) do not need 'unsafe-eval'.
// `frame-ancestors` is omitted on purpose — meta-delivered CSP ignores it;
// click-jacking is blocked by `X-Frame-Options: DENY` set in firebase.json.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE_LANG} data-scroll-behavior="smooth">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Non-blocking Google Fonts: inject stylesheet with media=print
            then swap to media=all on load — keeps the link off the
            render-blocking critical path. noscript fallback ensures
            users without JS still get the fonts (blocking). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href=${JSON.stringify(GOOGLE_FONTS_HREF)};l.media="print";l.onload=function(){l.media="all"};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([websiteJsonLd(), organizationJsonLd()]),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
