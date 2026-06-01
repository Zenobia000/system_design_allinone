import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "找不到頁面 · 404",
  description: "這張卡片不在地圖上。",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main style={{ padding: "120px 6vw", minHeight: "60vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.3em", color: "var(--accent)", textTransform: "uppercase" }}>
          404 · Off Atlas
        </p>
        <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1, marginTop: 16 }}>
          這張卡片不在地圖上。
        </h1>
        <p style={{ marginTop: 20, color: "var(--ink-mute)" }}>
          可能網址打錯，或這張卡片還沒收錄。試試從這幾個入口出發：
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ borderBottom: "1px solid currentColor" }}>回首頁</Link>
          <Link href="/deliverables/" style={{ borderBottom: "1px solid currentColor" }}>58 交付物</Link>
          <Link href="/roles/" style={{ borderBottom: "1px solid currentColor" }}>12 角色</Link>
          <Link href="/stages/" style={{ borderBottom: "1px solid currentColor" }}>6 階段</Link>
        </div>
      </div>
    </main>
  );
}
