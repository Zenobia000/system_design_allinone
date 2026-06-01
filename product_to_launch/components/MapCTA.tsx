export default function MapCTA() {
  return (
    <section className="section" style={{ background: "var(--cream)", padding: "64px var(--gutter)" }}>
      <div className="map-cta">
        <div>
          <span className="coord">Companion · Map View</span>
          <h3>想看角色與交付物的依賴關係？</h3>
          <p>
            打開 Blueprint Studio — 那是一張 DAG 圖，把 12 角色與 50+ 交付物之間的
            handoff 連起來。看完地圖，你會知道為什麼某個 PR 卡住，是因為兩階段之前漏了一份合約。
          </p>
          <a className="cta" href="/atlas-map.html">
            開啟 Blueprint Studio →
          </a>
        </div>
        <div className="ascii" aria-hidden>{`
   PM ──┐
        ├─ PRD ──→ Architect ──→ ADR ──┐
   UX ──┤                                ├─→ Dev ──→ QA ──→ Ship
        └─ Wireframe ──→ UI ──→ Mockup ─┘                       │
                                                                ↓
                                                         SLO · Runbook
        `}</div>
      </div>
    </section>
  );
}
