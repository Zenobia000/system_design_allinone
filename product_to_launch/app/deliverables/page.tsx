import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import FilterableGrid from "@/components/FilterableGrid";
import { DELIVERABLES } from "@/lib/taxonomy";
import { getAllDeliverables } from "@/lib/content";

export const metadata: Metadata = {
  title: "58 個交付物 · Deliverables",
  description: "從 User Research 到 Postmortem，每張卡都能先學會，再把工作包帶進 Coding Agent。",
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
                <span className="tag">58 張卡片</span>
              </div>
              <h1>先看懂文件，再帶進 Coding Agent。</h1>
              <p className="hook">
                從 User Research 到 Postmortem，用 Stage 或 Role 過濾。
                每張卡都有學習模式與專案實戰：前者解釋大綱、範本與案例；後者呈現文件關聯並提供 Agent 工作包。
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
