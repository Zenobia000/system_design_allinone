import Rail from "@/components/Rail";
import Hero from "@/components/Hero";
import VowsTriad from "@/components/VowsTriad";
import RolesCompass from "@/components/RolesCompass";
import FilterableGrid from "@/components/FilterableGrid";
import MapCTA from "@/components/MapCTA";
import Footer from "@/components/Footer";
import { DELIVERABLES } from "@/lib/taxonomy";
import { getAllDeliverables } from "@/lib/content";

export default function HomePage() {
  const loaded = getAllDeliverables();
  const hookMap = new Map(loaded.map((l) => [l.frontmatter.slug, l.frontmatter.hook]));

  const items = DELIVERABLES.map((d) => ({
    ...d,
    hook: hookMap.get(d.slug) ?? "—",
  }));

  return (
    <>
      <Rail active="home" />
      <main>
        <Hero />
        <VowsTriad />
        <RolesCompass />
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <span className="label">+ Deliverables · 54 交付物地圖</span>
            <h2>每張卡，一個可帶走的決策工具。</h2>
            <p className="sub">
              用 Stage 或 Role 過濾。點進任一張卡，看「解決什麼問題、誰負責、何時用、AI 怎麼加速」四問。
            </p>
          </div>
          <FilterableGrid items={items} />
        </section>
        <MapCTA />
      </main>
      <Footer />
    </>
  );
}
