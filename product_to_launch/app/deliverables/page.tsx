import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import FilterableGrid from "@/components/FilterableGrid";
import { DELIVERABLES } from "@/lib/taxonomy";
import { getAllDeliverables } from "@/lib/content";

export const metadata: Metadata = {
  title: "54 個交付物 · Deliverables",
  description: "從 User Research 到 Postmortem — 每張卡，一個可帶走的決策工具。",
  alternates: {
    canonical: "/deliverables/",
    languages: { "zh-Hant": "/deliverables/", "x-default": "/deliverables/" },
  },
};

export default function DeliverablesIndexPage() {
  const loaded = getAllDeliverables();
  const hookMap = new Map(loaded.map((l) => [l.frontmatter.slug, l.frontmatter.hook]));
  const items = DELIVERABLES.map((d) => ({ ...d, hook: hookMap.get(d.slug) ?? "—" }));

  return (
    <>
      <Rail active="deliverables" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">Atlas · Deliverables</span>
                <span className="tag">54 張卡片</span>
              </div>
              <h1>每張卡，一個可帶走的決策工具。</h1>
              <p className="hook">
                從 User Research 到 Postmortem — 用 Stage 或 Role 過濾。
                點進任一張，看「解決什麼問題、誰負責、何時用、AI 怎麼加速」四問。
              </p>
            </div>
          </div>
        </section>
        <section className="section" style={{ paddingTop: 56 }}>
          <FilterableGrid items={items} />
        </section>
      </main>
      <Footer />
    </>
  );
}
