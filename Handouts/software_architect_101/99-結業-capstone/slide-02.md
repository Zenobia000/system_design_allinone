---
chapter: "幕 99：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "2"
title: "白皮書演化 v1→v5"
original_title: "白皮書演化 v1→v5"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v1→v5"
rendering_mode: "programmatic_diagram"
---

# Slide 02 · 白皮書演化 v1→v5

## On-slide Text
- Kicker: `ARTIFACT`
- Progress capsule: `架構白皮書 v1→v5 · 結業 Capstone`
- Title: 白皮書演化 v1→v5
- Diagram caption: 一張圖看完五份產出物怎麼長出來
- Version label (bottom-right of diagram): `v1→v5`

## Beginner Anchor
一張圖看完五份產出物怎麼長出來——每個版本不是從頭重來，而是在上一版本加上新的能力層。

## Learning Goal
讓學員一眼看清白皮書 v1 到 v5 的演化路徑：每個版本加了什麼新產出物、對應哪一幕、解決了什麼問題。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v1→v5 · 結業 Capstone`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for version tag, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- Main diagram: programmatic staged-evolution layout (per Diagram Spec). 6 horizontal stage rows: a ghost/faded v0 row at top (opacity 40%, dashed border, no NEW badge) followed by 5 solid v1–v5 rows. The v0 ghost row closes the visual loop from slide-01's blank brief. Rendered per Diagram Spec below.
- Version label bottom-right of diagram: `v1→v5`, JetBrains Mono / 26 px / Mint `#97E8D6`.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
diagram_type: "data_flow"
whitepaper_version: "v1→v5"
focus: "白皮書五個版本的逐層累積演化：每個版本新增的產出物一目了然"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  layout: "staged_evolution"
  stage_direction: "vertical"
  background: "Deep Navy #152238"
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint #97E8D6 solid 2px"
  arrow_async: "Mint #97E8D6 dashed 2px"
  node_text_font: "JetBrains Mono 500 24px Warm White #F4F1EA"
  version_label: "v1→v5, JetBrains Mono Caption, bottom-right of diagram"
  stage_label_font: "Inter 700 28px Mint #97E8D6"
  stage_row_height: 100px
  stage_gap: 12px

stages:
  - id: "v0"
    label: "v0 空白委託書"
    label_color: "Warm White #F4F1EA (ghost/faded, opacity 40%)"
    description: "起點：一份空白委託書——需求未知、技術未定"
    new_artifacts:
      - id: "blank_brief"
        label: "空白委託書"
        subtitle: "需求未知 · 技術未定"
        status: "ghost"
    note: "Ghost stage — faded/dashed border, no NEW badge. Arrow to v1 is dashed Warm White opacity 40%."

  - id: "v1"
    label: "v1 · 幕 1：需求與約束"
    label_color: "Mint #97E8D6"
    description: "PRD 功能清單 + NFR 矩陣 + 約束清單"
    new_artifacts:
      - id: "prd"
        label: "PRD 功能清單"
        status: "new"
      - id: "nfr_matrix"
        label: "NFR 矩陣"
        subtitle: "P99 < 10s · 6,000 msg/s · 99.9%"
        status: "new"
      - id: "constraints"
        label: "約束清單"
        subtitle: "$5,000/月 · 3 個月 · 6 人"
        status: "new"

  - id: "v2"
    label: "v2 · 幕 2：建模與選型"
    label_color: "Mint #97E8D6"
    description: "領域模型 ER + 技術棧 + ADR-001"
    new_artifacts:
      - id: "domain_model"
        label: "領域模型 ER"
        subtitle: "Device/Sensor/Reading/Threshold/Alert"
        status: "new"
      - id: "tech_stack"
        label: "技術棧"
        subtitle: "FastAPI · TimescaleDB · Redis · Kafka"
        status: "new"
      - id: "adr001"
        label: "ADR-001"
        subtitle: "選用 TimescaleDB"
        status: "new"

  - id: "v3"
    label: "v3 · 幕 3：系統設計"
    label_color: "Mint #97E8D6"
    description: "C4 容器圖 + 三條資料流路徑"
    new_artifacts:
      - id: "c4_diagram"
        label: "C4 容器圖"
        subtitle: "7 容器 · 2 外部角色"
        status: "new"
      - id: "data_flow"
        label: "三條資料流"
        subtitle: "上報寫入 / 查詢讀取 / 告警"
        status: "new"

  - id: "v4"
    label: "v4 · 幕 4：風險與韌性"
    label_color: "Coral Red #E8634F"
    description: "故障模式圖 + FMEA 三個 SPOF"
    new_artifacts:
      - id: "fmea_diagram"
        label: "故障模式圖"
        subtitle: "TSDB / Kafka / Processor — SPOF"
        status: "warning"
      - id: "fmea_table"
        label: "FMEA 摘要"
        subtitle: "Replica · 背壓 · 冪等"
        status: "warning"

  - id: "v5"
    label: "v5 · 幕 5：落地與演進"
    label_color: "Forest Green #5B9770"
    description: "開發規範 + 可觀察性管線 + 演進路線"
    new_artifacts:
      - id: "dev_spec"
        label: "開發規範"
        subtitle: "GitHub Flow · ruff+black · CI Gate"
        status: "new"
      - id: "observability"
        label: "可觀察性管線"
        subtitle: "OTel · Prometheus · Grafana"
        status: "new"
      - id: "evolution_roadmap"
        label: "演進路線圖"
        subtitle: "觸發條件 → 微服務拆分"
        status: "new"

edges:
  - from: "v0"
    to: "v1"
    label: "幕 1 開始"
    style: "dashed"
    meaning: "ghost_start"
    note: "Ghost arrow — dashed Warm White opacity 40%, bridges slide-01 v0 blank brief to the evolution."
  - from: "v1"
    to: "v2"
    label: "幕 2 新增"
    style: "solid"
    meaning: "write"
  - from: "v2"
    to: "v3"
    label: "幕 3 新增"
    style: "solid"
    meaning: "write"
  - from: "v3"
    to: "v4"
    label: "幕 4 新增"
    style: "solid"
    meaning: "write"
  - from: "v4"
    to: "v5"
    label: "幕 5 新增"
    style: "solid"
    meaning: "write"
```

## Logo Assets
none — this diagram represents abstract whitepaper artifacts, not named technology products. Technology logos appear on the per-chapter artifact slides (slide-07 in ch02, slide-05 in ch03, etc.).

## Technical Flow Details

### 白皮書演化路徑說明

本圖展示架構白皮書從 v1 到 v5 的逐層累積過程。每個版本不是推倒重建，而是在前一版本的基礎上新增一個「能力層」：

**v1（幕 1：需求與約束）— 把模糊需求量化**
- PRD 功能清單：設備上報 / 儀表板查詢 / 告警通知
- NFR 矩陣：告警 P99 < 10s、峰值 6,000 msg/s、可用性 99.9%、每日資料量 ≤ 35 GB、雲費 < $5,000/月、停機損失 ~$20,000/hr
- 約束清單：預算 $5,000/月、期限 3 個月 MVP、人力 6 人 Python+Cloud

**v2（幕 2：建模與選型）— 建立業務語言與技術選型**
- 領域模型 ER：五個核心實體（Device / Sensor / Reading / Threshold / Alert），1:N 關係鏈
- 技術棧決策：FastAPI（Python API）、PostgreSQL+TimescaleDB（時序儲存）、Redis（快取）、Kafka（削峰）
- ADR-001：選用 TimescaleDB 作時序儲存，理由是 PostgreSQL extension，SQL 語法不變，壓縮率 ~90%，retention policy 開箱即用

**v3（幕 3：系統設計）— 描繪完整容器拓樸與資料流**
- C4 容器圖：7 個容器 + 2 個外部角色，三條路徑清晰分離
- 寫入路徑：Device → Ingest API → Kafka → Stream Processor → TSDB（非同步削峰設計）
- 讀取路徑：Dashboard → Query API → Redis cache（hit/miss）→ TSDB
- 告警路徑：Stream Processor 閾值比對 → Alert Service → Notification（P99 < 10s）

**v4（幕 4：風險與韌性）— 主動標記 SPOF、寫出緩解手法**
- 在 v3 架構上標出三個 SPOF：TSDB 單實例（最嚴重，停機 $20,000/hr）、Kafka 單 broker、Stream Processor 單實例
- FMEA 緩解：TSDB Replica（Primary + Standby）+ 讀寫分離、Kafka 3-broker cluster（replication.factor=3）、Consumer Group ≥2 + Retry + Idempotency

**v5（幕 5：落地與演進）— 規範化、監控化、演進路線明確化**
- 開發規範：monorepo（ingest/processor/query packages）、GitHub Flow、ruff+black pre-commit、CI Gate（PR 合 main 前必過 lint+test）
- 可觀察性管線：OTel SDK → OTel Collector → Prometheus（Metrics）/ Tempo（Traces）/ Loki（Logs）→ Grafana
- 演進路線圖：有觸發條件才拆（團隊 > 20 人 / 獨立擴展需求 / 不同 SLA 合約），現在維持 modular monolith

## VCRE Scorecard
not_applicable — this is an artifact slide (evolution diagram), not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course Capstone chapter. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v1→v5 · 結業 Capstone" in Mint text on Deep Navy, rounded capsule 34 px. Title "白皮書演化 v1→v5" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content: staged evolution diagram rendered programmatically (topology from Diagram Spec). 6 horizontal stage rows, top-to-bottom: first a ghost/faded "v0 空白委託書" row (Warm White label at 40% opacity, dashed Warm White border node, no NEW badge, faded dashed arrow down to v1 — closes the loop from slide-01), then v1 (幕1, Mint label), v2 (幕2, Mint label), v3 (幕3, Mint label), v4 (幕4, Coral Red #E8634F label with warning node markers), v5 (幕5, Forest Green #5B9770 label). Each v1–v5 row contains 2-3 artifact node boxes: Mint #97E8D6 4 px border (new status), JetBrains Mono 24 px Warm White label, Deep Navy fill, rounded 8 px, "NEW" badge top-right. v4 nodes use Coral Red lightning marker. Vertical solid Mint arrows connecting v1→v2→v3→v4→v5 stage rows. Row labels left-aligned: Inter 700 28 px in stage color. Bottom-right of diagram: "v1→v5" JetBrains Mono 26 px Mint. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, icon, or the text "logo-light.png" there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra artifacts or stages beyond the ghost v0 + 5 versions (v1–v5) defined in Diagram Spec.
- Do not mix v4 warning markers onto non-v4 rows.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the "v1→v5" version label on the diagram.
- Do not place technology brand logos on diagram nodes — this diagram represents abstract artifacts.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any brand logo, emblem, badge, monogram, icon, or filename text (e.g. "logo-light.png") in the bottom-right corner — keep it empty for a logo overlaid later.

## Speaker Notes
這張圖是白皮書演化的全貌。每一行是一個幕，每個方塊是那個幕產出的新文件或新圖表。重點不是技術細節——而是「堆疊感」：每個版本不是推倒重來，是在上一版本基礎上加一個能力層。v1 量化需求，v2 建立語言和選型，v3 畫出全貌，v4 主動標出風險，v5 讓它能跑起來且能演進。五層疊下來，就是一份完整的架構白皮書。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書演化 v1→v5" — 8 Chinese characters + "v1→v5", within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v1→v5"` in frontmatter (Capstone summary artifact).
- [ ] `rendering_mode: "programmatic_diagram"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v1→v5 · 結業 Capstone` present below kicker.
- [ ] Diagram Spec is a complete YAML block (not `not_applicable`).
- [ ] Diagram Spec defines `diagram_type: "data_flow"` with `layout: "staged_evolution"`.
- [ ] Ghost v0 stage present at top of diagram (faded/dashed, opacity 40%, no NEW badge) — closes loop from slide-01.
- [ ] Exactly 6 stages in Diagram Spec: v0 (ghost) + v1, v2, v3, v4, v5 in order.
- [ ] v1 artifacts match actual ch01 slide-05: PRD 功能清單 / NFR 矩陣 / 約束清單.
- [ ] v2 artifacts match actual ch02 slide-04 and slide-07: 領域模型 ER / 技術棧 / ADR-001.
- [ ] v3 artifacts match actual ch03 slide-05 and slide-06: C4 容器圖 / 三條資料流.
- [ ] v4 artifacts match actual ch04 slide-05: 故障模式圖 / FMEA 摘要 — marked as warning.
- [ ] v5 artifacts match actual ch05 slide-05 and slide-06: 開發規範 / 可觀察性管線 / 演進路線圖.
- [ ] Technical Flow Details covers all 5 versions with accurate artifact descriptions.
- [ ] Numbers consistent with shared IoT: P99 < 10s, 6,000 msg/s, 99.9%, 35 GB/天, $5,000/月, $20,000/hr, 6 人, 3 個月.
- [ ] v4 stage uses Coral Red label color (risk chapter).
- [ ] v5 stage uses Forest Green label color (completion).
- [ ] Version label `v1→v5` appears in diagram bottom-right.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo Assets states none (abstract diagram, no technology logos on nodes).
