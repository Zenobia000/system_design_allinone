import Link from "next/link";
import DeliverableCard from "./DeliverableCard";
import { DELIVERABLES } from "@/lib/taxonomy";
import { getAllDeliverables } from "@/lib/content";

/** One representative deliverable per SDLC stage — covers the full lifecycle
 *  in 6 cards. The full filterable grid lives on /deliverables/. */
const FEATURED_SLUGS = [
  "user-research",   // Discovery
  "prd",             // Define
  "adr",             // Design
  "unit-test",       // Build
  "ci-cd-pipeline",  // Ship
  "slo",             // Operate
];

export default function FeaturedDeliverables() {
  const loaded = getAllDeliverables();
  const hookMap = new Map(loaded.map((l) => [l.frontmatter.slug, l.frontmatter.hook]));

  const items = FEATURED_SLUGS
    .map((slug) => DELIVERABLES.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <section className="section">
      <div className="section-head">
        <span className="label">+ Deliverables · 從假設到上線，6 張代表卡</span>
        <h2>每個階段，一張關鍵交付物。</h2>
        <p className="sub">
          這 6 張代表整段 SDLC 旅程 — Discovery / Define / Design / Build / Ship / Operate。
          想看全部 54 張、按 Stage 或 Role 過濾？走網格頁。
        </p>
      </div>
      <div className="grid">
        {items.map((d) => (
          <DeliverableCard key={d.slug} d={d} hook={hookMap.get(d.slug) ?? "—"} />
        ))}
      </div>
      <div className="section-foot">
        <Link href="/deliverables/" className="see-all">
          看全部 54 個交付物 →
        </Link>
      </div>
    </section>
  );
}
