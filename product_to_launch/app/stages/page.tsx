import type { Metadata } from "next";
import Link from "next/link";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import { STAGES, deliverablesByStage } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "6 階段 · Stages",
  description: "Discovery → Define → Design → Build → Ship → Operate — 6 個階段，6 個必過的關。",
  alternates: {
    canonical: "/stages/",
    languages: { "zh-Hant": "/stages/", "x-default": "/stages/" },
  },
};

export default function StagesIndexPage() {
  return (
    <>
      <Rail active="stages" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">Atlas · Stages</span>
                <span className="tag">6 個必過的關</span>
              </div>
              <h1>從假設到上線，6 個階段。</h1>
              <p className="hook">
                Discovery → Define → Design → Build → Ship → Operate。
                每階段都有非過不可的閘門 — 沒過就推到下一階段，等於把成本後置 10 倍。
              </p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="grid">
            {STAGES.map((s) => {
              const count = deliverablesByStage(s.slug).length;
              return (
                <Link href={`/stages/${s.slug}/`} key={s.slug} className="card">
                  <span className="num" style={{ color: s.hex }}>{`Stage · ${s.num}`}</span>
                  <h3>
                    {s.title} <span style={{ color: "var(--ink-mute)", fontSize: 18 }}>· {s.titleEn}</span>
                  </h3>
                  <p className="hook">{s.hook}</p>
                  <div className="tags">
                    <span className="tag" style={{ color: s.hex, borderColor: s.hex }}>
                      {count} 個交付物
                    </span>
                  </div>
                  <span className="arrow">→</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
