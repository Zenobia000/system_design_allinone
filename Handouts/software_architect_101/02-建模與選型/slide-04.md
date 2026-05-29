---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "4"
title: "白皮書 v2：領域模型"
original_title: "白皮書 v2：領域模型"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v2"
rendering_mode: "programmatic_diagram"
---

# Slide 04 · 白皮書 v2：領域模型

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v2 · 建模與選型`
- Title: 白皮書 v2：領域模型
- Diagram caption: Device / Sensor / Reading / Threshold / Alert — 五個核心實體
- Version label (bottom-right of diagram): `白皮書 v2`

## Beginner Anchor
ER 圖不是 DB schema——它描述的是業務語言，不是欄位。Reading 是量最大的實體（~35 GB/天），它的存法決定了整個技術棧選型。

## Learning Goal
讓學員看到領域模型的五個核心實體及其關聯，理解 Device/Sensor/Reading 三層的 1:N 關係，以及 Threshold/Alert 如何組成告警語意。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v2 · 建模與選型`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for `v2`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- ER Diagram (main visual, center/right area, ~75% canvas width):
  - Rendered programmatically per Diagram Spec.
  - All node text: JetBrains Mono 500 / 28 px / Warm White.
  - Node borders: Deep Teal `#2E7D86` 2 px (all nodes are "new" in v2 — use Mint `#97E8D6` 4 px + NEW label since this is the first appearance).
  - Relationship lines: Mint `#97E8D6` solid 2 px with cardinality labels (1, N) in JetBrains Mono / 24 px / Mint.
  - Background of diagram area: Deep Navy `#152238`.
- Version label bottom-right of diagram area: `白皮書 v2`, JetBrains Mono / 26 px / Mint `#97E8D6`.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
diagram_type: "domain_model"
focus: "IoT 監控五個核心業務實體及其關聯，Reading 為高量時序資料主體"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  background: "Deep Navy #152238"
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint #97E8D6 solid 2px"
  node_text_font: "JetBrains Mono 500 28px Warm White #F4F1EA"
  cardinality_font: "JetBrains Mono 24px Mint #97E8D6"
  version_label: "白皮書 v2, JetBrains Mono Caption, bottom-right of diagram"

nodes:
  - id: "device"
    label: "Device"
    subtitle: "設備"
    type: "entity"
    status: "new"
    note: "Aggregate Root — 設備是資料所有權的起點；每台設備有 device_id、型號、位置、狀態"

  - id: "sensor"
    label: "Sensor"
    subtitle: "感測器"
    type: "entity"
    status: "new"
    note: "每台設備有 1 至多個感測器；sensor_id、sensor_type（溫度/壓力/震動）、unit"

  - id: "reading"
    label: "Reading"
    subtitle: "讀數（高量）"
    type: "entity"
    status: "new"
    note: "高量時序資料主體 — ~35 GB/天；timestamp、sensor_id、value；append-only，按時間查詢與刪除"

  - id: "threshold"
    label: "Threshold"
    subtitle: "告警閾值"
    type: "entity"
    status: "new"
    note: "每個 Sensor 可設定一或多條閾值規則；min_value、max_value、severity（warning/critical）"

  - id: "alert"
    label: "Alert"
    subtitle: "告警記錄"
    type: "entity"
    status: "new"
    note: "閾值被觸發後產生 Alert；triggered_at、resolved_at、status（open/ack/resolved）；P99 < 10s SLA"

edges:
  - from: "device"
    to: "sensor"
    label: "1 : N"
    style: "solid"
    meaning: "sync"
    note: "一台設備擁有多個感測器；所有權歸 Device"

  - from: "sensor"
    to: "reading"
    label: "1 : N"
    style: "solid"
    meaning: "write"
    note: "每個感測器持續產生讀數；每 5 秒一筆，2,000 msg/s 均值，尖峰 6,000 msg/s"

  - from: "sensor"
    to: "threshold"
    label: "1 : N"
    style: "solid"
    meaning: "sync"
    note: "一個感測器可設定多條閾值規則（例如：溫度 > 80°C 告警、溫度 > 100°C 緊急）"

  - from: "threshold"
    to: "alert"
    label: "1 : N"
    style: "dashed"
    meaning: "async"
    note: "Consumer 比對 Reading 與 Threshold，非同步觸發 Alert；P99 < 10s SLA"
```

## Logo Assets
none — this slide presents the domain model ER diagram; no named companies, cloud services, frameworks, or packages appear on this slide. Tool logos are reserved for slide-07 (tech stack).

## Technical Flow Details

### 實體說明與資料所有權

**Aggregate Root: Device**
- Device 是整個領域的聚合根（Aggregate Root）。所有資料的所有權從 Device 出發：Device → Sensor → Reading。
- 刪除 Device 時，其下所有 Sensor、Reading、Threshold 和 Alert 都應級聯清理（或歸檔）。

**高量實體: Reading**
- Reading 是資料量最大的實體：10,000 台設備 × 每台平均多個感測器 × 每 5 秒一筆。
- 換算：2,000 msg/s 均值 × ~200 B/msg × 86,400 s/天 ≈ **~34.56 GB/天（≤ 35 GB/天）**。
- Reading 的查詢模式：以時間範圍為主要維度（`WHERE sensor_id = X AND timestamp BETWEEN ...`），不需要複雜 JOIN。
- Reading 的刪除模式：超過 retention period（如 90 天）整批刪除，不做逐行 DELETE。
- 這兩個特徵（按時間查詢 + 按時間批刪）驅動了 slide-07 的技術選型：TimescaleDB 的 hypertable 和 retention policy。

**告警語意鏈：Threshold → Alert**
- Threshold 定義告警規則（靜態配置），Alert 是規則被觸發的記錄（動態事件）。
- 觸發路徑（非同步）：Consumer 讀取 Kafka topic → 比對 Reading.value 與 Threshold.min/max_value → 超出時寫入 Alert → 發送通知。
- Alert.triggered_at 到通知送達的 P99 目標 < 10 秒（來自白皮書 v1 NFR 矩陣）。
- Alert 需要 resolved_at 和 status 欄位以支援「告警確認（ack）」工作流。

### Write Path（正常流）
1. Device 透過 MQTT/HTTP 上報讀數 → Gateway → Kafka topic `sensor-readings`
2. Consumer Group 消費 → 寫入 Reading（TimescaleDB hypertable）
3. 同一 Consumer 比對 Threshold → 若觸發：寫入 Alert → 發通知

### Read Path（查詢流）
1. Dashboard 請求「過去 1 小時某 Sensor 平均值」→ API → Redis cache 查詢
2. Cache miss → 查詢 Reading（TimescaleDB）→ 回填 Redis → 回傳 Dashboard
3. Cache hit → 直接回傳（P99 < 10s SLA 靠此保障）

### 邊界說明
- 本領域模型屬於「IoT Data Ingest & Alert Bounded Context」。
- 「用戶帳號」、「計費」、「設備管理 CRUD」等屬於其他 Bounded Context，不出現在此 ER 圖中。

## VCRE Scorecard
not_applicable — this is an artifact slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v2 · 建模與選型" in Mint #97E8D6 text on Deep Navy, rounded capsule 34 px. Title "白皮書 v2：領域模型" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content: an ER diagram with 5 rectangular entity nodes arranged in a logical flow — Device (left), Sensor (center-left), Reading (center-right, slightly larger to show high volume), Threshold (center-right-bottom), Alert (right). All nodes: Mint #97E8D6 4 px border (NEW status), Warm White text JetBrains Mono 28 px, Deep Navy fill, corner radius 8 px, small "NEW" badge top-right in Mint 18 px. Connection lines: Mint #97E8D6 solid 2 px between Device→Sensor (label "1:N"), Sensor→Reading (label "1:N"), Sensor→Threshold (label "1:N"), Threshold→Alert (dashed line, label "1:N async"). Cardinality labels in JetBrains Mono 24 px Mint. Reading node has a subtle caption "~35 GB/天" in JetBrains Mono 22 px Coral Red to indicate high volume. Bottom-right of diagram: "白皮書 v2" JetBrains Mono 26 px Mint. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, icon, or the text "logo-light.png" there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Technical diagram composition, no photos, no clipart.

## Negative Prompt
- Do not invent extra entities beyond Device, Sensor, Reading, Threshold, Alert.
- Do not change the relationship cardinalities (all are 1:N).
- Do not make the Threshold→Alert edge solid (it must be dashed/async).
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not place logo assets inside the diagram nodes.
- Do not omit the "白皮書 v2" version label.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any brand logo, emblem, badge, monogram, icon, or filename text (e.g. "logo-light.png") in the bottom-right corner — keep it empty for a logo overlaid later.

## Speaker Notes
這張 ER 圖是白皮書 v2 的第一個產出。五個實體是我們整個 IoT 監控系統的業務語言。Device 是聚合根，所有東西從它出發。一台設備有多個感測器（1:N），每個感測器持續產生讀數（1:N）——讀數就是資料量最大的地方，每天約 35 GB。每個感測器也可以設定多條閾值規則，閾值被觸發才會產生告警記錄。注意 Threshold 到 Alert 是虛線——代表這不是同步寫入，是 Consumer 非同步比對後觸發的，告警 P99 < 10 秒的 SLA 就是這段路徑的測量目標。Reading 的查詢和刪除模式完全不像一般業務資料——它就是時序資料的原型，這決定了下一個選型決策。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v2：領域模型" — 8 Chinese characters (CJK only; v2 and ： are ASCII/punctuation), within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v2"` in frontmatter (artifact slide).
- [ ] `rendering_mode: "programmatic_diagram"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v2 · 建模與選型` present below kicker.
- [ ] Diagram Spec is a complete YAML block (not `not_applicable`).
- [ ] Diagram Spec defines `diagram_type: "domain_model"`.
- [ ] Exactly 5 entity nodes: Device, Sensor, Reading, Threshold, Alert.
- [ ] All 5 nodes have `status: "new"` (first appearance in v2).
- [ ] Exactly 4 edges with correct cardinalities (all 1:N).
- [ ] Threshold→Alert edge is `style: "dashed"` and `meaning: "async"`.
- [ ] Technical Flow Details section is present and covers: aggregate root, write path, read path, boundary.
- [ ] Reading node noted as high-volume (~35 GB/天) — matches Ch0 shared numbers.
- [ ] P99 < 10s SLA mentioned in Alert note — matches whitepaper v1.
- [ ] 2,000 msg/s avg / 6,000 msg/s peak — matches shared numbers.
- [ ] Node text uses JetBrains Mono per Diagram Spec.
- [ ] Version label `白皮書 v2` appears in diagram bottom-right.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo Assets states none (tool logos reserved for slide-07).
