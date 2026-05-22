import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "落地圖鑑 · Launch Atlas — 從一個假設，到一座可運維的系統",
    template: "%s · 落地圖鑑",
  },
  description:
    "9 個角色 · 50+ 交付物 · 一張可走完的地圖。每張卡附台灣實戰觀點與可帶走的 AI Skill。",
  keywords: [
    "產品開發", "SDLC", "系統設計", "PRD", "ADR", "Runbook", "SLO",
    "AI 工作流", "Claude Code", "Product to Launch", "Launch Atlas",
  ],
  authors: [{ name: "System Design All-in-One" }],
  metadataBase: new URL("https://launch-atlas.local"),
  openGraph: {
    title: "落地圖鑑 · Launch Atlas",
    description: "從一個假設，到一座可運維的系統。9 角色 · 50+ 交付物 · 一張可走完的地圖。",
    type: "website",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "落地圖鑑 · Launch Atlas",
    description: "從一個假設，到一座可運維的系統。",
  },
  icons: { icon: "/logo/logo-main.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..900,0..100,0..1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
