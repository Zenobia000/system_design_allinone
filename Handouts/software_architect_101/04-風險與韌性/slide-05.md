---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "5"
title: "白皮書 v4：故障模式圖"
original_title: "白皮書 v4：故障模式圖"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v4"
rendering_mode: "programmatic_diagram"
---

# Slide 05 · 白皮書 v4：故障模式圖

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v4 · 風險與韌性`
- Title: 白皮書 v4：故障模式圖
- Diagram caption: v3 架構標出 3 個 SPOF · FMEA 失效模式 + 緩解手法
- FMEA summary (right panel or below diagram):
  - ⚡ TSDB 單實例｜影響：讀寫全斷 $20k/hr｜緩解：Replica + 讀寫分離
  - ⚡ Kafka 單 broker｜影響：上報寫入中斷｜緩解：複本 + 背壓
  - ⚡ Stream Processor｜影響：告警 P99 破 10s｜緩解：Consumer Group 擴展 + 重試/冪等
- Version label (bottom-right of diagram): `白皮書 v4`

## Beginner Anchor
在 v3 架構上標出 SPOF + FMEA 表。這是架構師主動問「如果這個元件壞了會怎樣」並記錄緩解手法的輸出——比等生產爆炸再說早了幾個月。

## Learning Goal
讓學員看到 v3 架構的三個 SPOF 節點（TSDB、Kafka broker、Stream Processor）被標記出來，理解每個 SPOF 對 SLA 和停機成本的具體影響，以及對應的韌性緩解手法。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v4 · 風險與韌性`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for `v4`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- Main diagram area (~65% canvas width, left/center):
  - Rendered programmatically per Diagram Spec.
  - SPOF nodes (TSDB, Kafka/message_queue, Stream Processor) carry Coral Red `#E8634F` lightning bolt marker overlaid at top-right corner (⚡), distinct from kicker pill — the marker sits on the node box itself.
  - All node text: JetBrains Mono 500 / 28 px / Warm White.
  - Non-SPOF nodes retain Deep Teal `#2E7D86` 2 px border (existing status).
  - SPOF nodes: retain existing Deep Teal 2 px border + add Coral Red lightning marker badge.
  - Arrows: Mint `#97E8D6`, solid 2 px (sync), dashed 2 px (async).
  - Background of diagram area: Deep Navy `#152238`.
  - Version label bottom-right of diagram: `白皮書 v4`, JetBrains Mono / 26 px / Mint `#97E8D6`.
- FMEA Summary Panel (right side, ~30% canvas width):
  - Background: `#172A40` (slightly lighter than Deep Navy), rounded 12 px, Mint `#97E8D6` 1 px border.
  - Title: `FMEA 摘要` JetBrains Mono / 24 px / Mint `#97E8D6`.
  - 3 rows, one per SPOF. Each row: ⚡ icon (Coral Red) + component name (JetBrains Mono Warm White 22 px) + impact summary + mitigation (Noto Sans TC 500 Warm White 22 px).
- Logo strip below FMEA panel: Kafka, Redis — official SVG assets, 40 px height, Warm White pill background.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
diagram_type: "data_flow"
whitepaper_version: "v4"
focus: "在 v3 架構基礎上標記 3 個 SPOF 節點（TSDB、Kafka broker、Stream Processor），展示故障模式與緩解手法"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  background: "Deep Navy #152238"
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker — overlaid on top-right corner of the node box, distinct from kicker pill"
  arrow_sync: "Mint #97E8D6 solid 2px"
  arrow_async: "Mint #97E8D6 dashed 2px"
  node_text_font: "JetBrains Mono 500 28px Warm White #F4F1EA"
  version_label: "白皮書 v4, JetBrains Mono Caption, bottom-right of diagram"

groups:
  - id: "external"
    label: "External"
  - id: "ingest_layer"
    label: "Ingest Layer"
  - id: "processing_layer"
    label: "Processing Layer"
  - id: "storage_layer"
    label: "Storage Layer"
  - id: "query_layer"
    label: "Query Layer"
  - id: "alert_layer"
    label: "Alert Layer"

nodes:
  - id: "device_gateway"
    label: "Device / Gateway"
    subtitle: "10,000 台 · 6,000 msg/s peak"
    type: "external"
    group: "external"
    is_external_actor: true
    status: "existing"
    note: "外部角色，不在韌性改善範圍內。上報流量均值 2,000 msg/s、尖峰 6,000 msg/s。"

  - id: "ingest_api"
    label: "Ingest API"
    subtitle: "FastAPI · stateless"
    type: "service"
    group: "ingest_layer"
    status: "existing"
    note: "Stateless，水平可擴展，不是 SPOF。可在 Kafka 之前加 backpressure 信號。"

  - id: "message_queue"
    label: "Message Queue"
    subtitle: "Kafka · single broker ⚡"
    type: "queue"
    group: "ingest_layer"
    status: "warning"
    fmea:
      failure_mode: "單一 Kafka broker 掛掉"
      impact: "sensor-readings topic 不可用，上報寫入中斷，Processor 消費停止"
      sla_impact: "寫入路徑全斷；Kafka 積壓；告警靜默"
      cost_impact: "寫入中斷期間上報資料丟失，設備重連 backoff 累積，TSDB 出現資料缺口；與 TSDB 全停的 $20,000/hr 屬不同量級"
      mitigation: "複本（Kafka multi-broker cluster）+ 背壓（consumer lag 監控告警）"
    note: "SPOF：單一 Kafka broker。v4 緩解：部署 3-broker cluster，設定 replication.factor=3，min.insync.replicas=2。"

  - id: "stream_processor"
    label: "Stream Processor"
    subtitle: "Single Consumer ⚡"
    type: "service"
    group: "processing_layer"
    status: "warning"
    fmea:
      failure_mode: "單一 Consumer 實例崩潰或 rebalance 時間過長"
      impact: "Kafka 訊息積壓，TSDB 寫入延遲，閾值比對暫停，告警停止"
      sla_impact: "告警 P99 破 10s SLA；積壓回放導致 TSDB 寫入突波"
      cost_impact: "積壓訊息重播時 TSDB 寫入壓力倍增"
      mitigation: "Consumer Group 多實例（水平擴展）+ Retry + Idempotency（sensor_id+timestamp 去重）"
    note: "SPOF：單一 Stream Processor。v4 緩解：Consumer Group 至少 2 實例，搭配健康檢查 + 自動重啟。"

  - id: "tsdb"
    label: "TSDB"
    subtitle: "TimescaleDB · single instance ⚡"
    type: "database"
    group: "storage_layer"
    status: "warning"
    fmea:
      failure_mode: "TimescaleDB 單實例掛掉（OOM、磁碟滿、OS crash）"
      impact: "寫入路徑中斷（Processor batch INSERT 失敗）；讀取路徑中斷（cache miss 後打 TSDB 失敗）；告警靜默"
      sla_impact: "整廠監控全黑；告警 P99 無限大；可用性降為 0%"
      cost_impact: "每小時停機 ~$20,000"
      mitigation: "Replica（Primary + Standby，streaming replication）+ 讀寫分離（Standby 承擔讀取）"
    note: "SPOF：TimescaleDB 單實例，是 v3 架構最嚴重的 SPOF。v4 緩解：PostgreSQL streaming replication，Standby 承擔 Query API 的讀取流量。"

  - id: "query_api"
    label: "Query API"
    subtitle: "FastAPI · stateless"
    type: "service"
    group: "query_layer"
    status: "existing"
    note: "Stateless，可水平擴展，不是 SPOF。但 cache miss 時打 TSDB，需防 thundering herd（當 Redis 重啟後大量 miss 同時打 TSDB）。"

  - id: "cache"
    label: "Cache"
    subtitle: "Redis · TTL 60s"
    type: "cache"
    group: "query_layer"
    status: "existing"
    note: "單實例 Redis 也是潛在 SPOF，但 cache miss 可降級到直接打 TSDB，影響 SLA 但不造成完全中斷。v4 觀察；v5 可升級 Redis Sentinel。"

  - id: "alert_service"
    label: "Alert Service"
    subtitle: "Email / Webhook"
    type: "service"
    group: "alert_layer"
    status: "existing"
    note: "依賴 Stream Processor 的告警觸發事件。Processor 掛掉則告警靜默——SPOF 影響透過 Processor 傳遞。"

  - id: "dashboard"
    label: "Dashboard"
    subtitle: "Web UI"
    type: "frontend"
    group: "external"
    is_external_actor: true
    status: "existing"
    note: "外部角色，不在韌性改善範圍內。"

edges:
  - from: "device_gateway"
    to: "ingest_api"
    label: "POST · 6,000 msg/s peak"
    style: "solid"
    meaning: "write"
    note: "尖峰 6,000 msg/s，Ingest API 需能承受。若 Kafka 背壓，Ingest API 可回 429 Too Many Requests。"

  - from: "ingest_api"
    to: "message_queue"
    label: "async enqueue"
    style: "dashed"
    meaning: "async"
    note: "非同步 enqueue；Kafka broker 若掛掉，Producer 無法 ack，Ingest API 應回 503 給設備。"

  - from: "message_queue"
    to: "stream_processor"
    label: "consume (at-least-once)"
    style: "dashed"
    meaning: "async"
    note: "Consumer Group 消費；Processor 掛掉觸發 rebalance（延遲約 30–60 秒），期間訊息積壓。"

  - from: "stream_processor"
    to: "tsdb"
    label: "batch write"
    style: "solid"
    meaning: "write"
    note: "批次 INSERT，成功後提交 offset。TSDB 掛掉：INSERT 失敗，offset 不提交，Kafka 重試。"

  - from: "stream_processor"
    to: "alert_service"
    label: "threshold breach"
    style: "dashed"
    meaning: "async"
    note: "Processor 掛掉則告警靜默——SPOF 影響鏈。"

  - from: "dashboard"
    to: "query_api"
    label: "GET readings / alerts"
    style: "solid"
    meaning: "read"
    note: "同步讀取。"

  - from: "query_api"
    to: "cache"
    label: "cache-aside: GET / SET EX60"
    style: "solid"
    meaning: "read"
    note: "Cache hit：P99 < 10ms，滿足 SLA。Cache miss：打 TSDB 並回填。Redis 掛掉：降級直打 TSDB，P99 可能破 10s。"

  - from: "query_api"
    to: "tsdb"
    label: "fallback read (cache miss)"
    style: "solid"
    meaning: "read"
    note: "TSDB 掛掉時此路徑也失敗，讀取完全中斷。"
```

## Logo Assets
此頁面的 FMEA 摘要區標記了以下技術產品，logo 放在圖面旁邊的工具識別區（不取代節點標籤）：

| 名稱 | Expected Asset Path | 可從 101 重用 | 備註 |
|------|---------------------|--------------|------|
| Apache Kafka | `assets/logos/messaging/kafka.svg` | 是（101 已有 kafka.svg） | 官方 Kafka logo，SVG 優先 |
| Redis | `assets/logos/cache/redis.svg` | 是（101 已有） | 官方立方體 logo |

**Logo Strip 規格**：
- 位置：FMEA 摘要面板下方識別區，不與節點標籤重疊
- 高度：40 px（等比例縮放）
- 間距：水平 20 px
- 背景：Warm White `#F4F1EA` 小底板，padding 12 px，rounded 8 px
- 最多 2 個（本頁 2 個：Kafka、Redis）

## Technical Flow Details

### v4 故障模式分析（FMEA）— 三個 SPOF

---

#### SPOF 1：TimescaleDB 單實例（最嚴重）

**失效模式：** TimescaleDB Primary 實例掛掉（OOM、磁碟滿、作業系統崩潰、硬體故障）。

**影響鏈（對 SLA 和停機成本）：**
- 寫入路徑中斷：Stream Processor 的 `batch INSERT` 失敗 → consumer offset 不提交 → Kafka 訊息積壓（積壓速率 = 消費速率 ~2,000–6,000 msg/s）
- 讀取路徑中斷：Query API 的 cache miss 路徑打 TSDB → 失敗 → 無法取得讀數 → Dashboard 無法顯示資料
- 告警路徑間接中斷：Stream Processor 持續重試 TSDB 寫入 → 批次延遲 → 告警觸發延遲 → P99 破 10s SLA
- 整廠監控全黑；可用性降為 0%；停機成本 ~$20,000/hr

**緩解手法（v4 目標）：**
- **Replica（複本）**：PostgreSQL streaming replication — Primary 寫入，Standby 熱備援。Primary 掛掉後，Standby 可在 ~30–60 秒內切換為 Primary（手動或自動 failover）。
- **讀寫分離**：Query API 的讀取請求導向 Standby，減少 Primary 負載，也讓讀取路徑在 Primary 切換期間有部分可用性。
- **監控**：PostgreSQL replication lag 監控，lag > 5s 告警。

---

#### SPOF 2：單一 Kafka Broker

**失效模式：** 單一 Kafka broker 實例掛掉（JVM OOM、磁碟故障、網路中斷）。

**影響鏈：**
- `sensor-readings` topic 的 partition leader 在單一 broker 上 → broker 掛掉 → topic 不可用
- Ingest API 無法 enqueue → Producer 無法 ack → Ingest API 回傳 503 給設備 → 設備上報失敗
- Stream Processor 無法消費 → Kafka 無法服務 Consumer → 訊息無法繼續處理
- 告警靜默、TSDB 寫入停止

**緩解手法（v4 目標）：**
- **Replica（複本）**：部署 3-broker Kafka cluster，設定 `replication.factor=3`，`min.insync.replicas=2`。任一 broker 掛掉，partition leader 自動選舉到其他 broker，中斷時間 ~10–30 秒。
- **背壓（Backpressure）**：監控 Consumer lag（consumer-group-offsets）；lag 持續增長時觸發告警，限制上游生產速率或擴展 Consumer。
- **Producer 配置**：`acks=all`（所有 ISR 確認）確保訊息持久化，避免 broker 切換時訊息丟失。

---

#### SPOF 3：單一 Stream Processor（Consumer）

**失效模式：** 單一 Consumer 實例 OOM 崩潰、或 rebalance 時間過長（例如 GC pause 觸發心跳超時）。

**影響鏈：**
- Consumer 崩潰 → Kafka 觸發 Consumer Group rebalance（預設 session.timeout.ms = 45s，即 ~45 秒重平衡期間無消費）
- 重平衡期間 Kafka 訊息積壓（積壓 ~45s × 6,000 msg/s = 最多 270,000 筆）
- 閾值比對暫停 → 告警靜默長達 45 秒 → P99 告警延遲破 10s SLA
- 重平衡完成後，Consumer 需批次回放積壓訊息 → 對 TSDB 造成突波寫入壓力

**緩解手法（v4 目標）：**
- **Consumer Group 多實例（Replica）**：至少 2 個 Consumer 實例。任一崩潰，另一個繼續消費（rebalance 後接管其 partition）。搭配健康檢查 + 容器自動重啟。
- **重試（Retry）**：Consumer 對 TSDB 寫入失敗加指數退避重試（最多 3 次）。
- **冪等（Idempotency）**：TSDB 寫入以 `(sensor_id, timestamp)` 為 unique key，`ON CONFLICT DO NOTHING`，確保 rebalance 後重播不產生重複資料。
- **Consumer lag 監控**：lag > 10,000 筆時告警，主動擴展 Consumer 實例。

---

### 正常讀寫路徑（v4 維持 v3 語意）

**寫入路徑（正常）：**
1. Device → POST /v1/readings → Ingest API
2. Ingest API → enqueue → Kafka（dashed/async）
3. Kafka → consume → Stream Processor（dashed/async，at-least-once）
4. Stream Processor → batch INSERT → TSDB（solid/write；失敗則 offset 不提交，Kafka 重試）
5. 同時：Stream Processor → threshold breach → Alert Service（dashed/async）

**讀取路徑（正常）：**
1. Dashboard → GET → Query API（solid/read）
2. Query API → Redis cache GET（solid/read）
   - Cache hit：直接回傳（P99 < 10ms）
   - Cache miss → Query API → TSDB fallback read（solid/read）→ Redis SET EX60 → 回傳
3. v4 增加防範：Redis 重啟後的 thundering herd 問題（大量同時 cache miss）→ 緩解：distributed lock 或 probabilistic early expiration（v4 備選）

---

### Redis 的 SPOF 狀態（v4 觀察，v5 處理）

Redis 單實例也是潛在 SPOF，但影響程度比 TSDB 低：
- Redis 掛掉：所有 Query API 請求走 cache miss 路徑直打 TSDB → TSDB 讀取壓力暴增 → P99 可能破 10s SLA，但讀取功能仍可用（降級，非全斷）
- v4 標記為「觀察」；v5 升級 Redis Sentinel 或 Redis Cluster 處理

---

### v4 FMEA 摘要表

| SPOF 元件 | 失效模式 | SLA 影響 | 停機成本影響 | 緩解手法 |
|-----------|---------|---------|------------|---------|
| TSDB（TimescaleDB 單實例） | 實例崩潰 | 整廠監控全黑，可用性 0% | ~$20,000/hr | Replica（Primary+Standby）+ 讀寫分離 |
| Kafka（單 broker） | broker 掛掉，topic 不可用 | 上報寫入中斷，告警靜默 | 上報資料丟失 + 設備重連 backoff 累積，TSDB 資料缺口；與 TSDB 全停 $20k/hr 屬不同量級 | 3-broker cluster，replication.factor=3 |
| Stream Processor（單實例） | OOM 崩潰或 rebalance 逾時 | 告警 P99 > 10s，積壓回放突波 | 間接：告警未及時，停機發現延遲 | Consumer Group ≥2 + Retry + Idempotency |

## VCRE Scorecard
not_applicable — this is an artifact slide, not a trade-off decision slide. Trade-off scoring is on slide-07.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v4 · 風險與韌性" Mint #97E8D6 text on Deep Navy, rounded capsule 34 px. Title "白皮書 v4：故障模式圖" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Left/center (~65% width): data flow architecture diagram rendered programmatically (topology from Diagram Spec). 7 service nodes + 2 external actors, laid out left-to-right by layer. Two distinct paths must read clearly: the write/ingest path flows Device/Gateway → Ingest API → (async dashed) Message Queue/Kafka → (async dashed) Stream Processor → (solid write) TSDB, with Stream Processor also branching (async dashed) to Alert Service on threshold breach; the read/query path flows Dashboard → (solid read) Query API → (solid read) Cache/Redis, falling back (solid read) from Query API to TSDB on cache miss. Arrowheads point in the direction of data flow; solid arrows = synchronous read/write, dashed arrows = asynchronous enqueue/consume. Nodes with SPOF status (Message Queue/Kafka, Stream Processor, TSDB): retain Deep Teal #2E7D86 2 px border + add a bold Coral Red #E8634F lightning bolt icon (⚡) badge at node top-right corner — this marker is on the node box, distinct from the kicker pill. Non-SPOF nodes: Deep Teal #2E7D86 2 px border only. All node text: JetBrains Mono 28 px Warm White. Arrows: Mint #97E8D6 solid 2 px (sync), dashed 2 px (async). Bottom-right of diagram: "白皮書 v4" JetBrains Mono 26 px Mint. Right side (~30% width): FMEA summary panel with #172A40 background, Mint 1 px border, rounded 12 px, title "FMEA 摘要" JetBrains Mono 24 px Mint, 3 rows (one per SPOF: TSDB, Kafka, Processor) each with Coral Red ⚡ icon + component name JetBrains Mono Warm White + short impact + mitigation in Noto Sans TC 22 px Warm White. Below panel: 2-logo strip (Kafka, Redis) on Warm White 40 px background. Bottom-right canvas: logo-light.png 64 px. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra nodes or arrows beyond those defined in the Diagram Spec.
- Do not generate fake, approximate, or AI-invented brand logos — logos must be composited from official assets separately.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the "白皮書 v4" version label on the diagram.
- Do not omit the Coral Red lightning markers on the 3 SPOF nodes (Message Queue, Stream Processor, TSDB).
- Do not place the SPOF lightning marker as a standalone element disconnected from the node — it must visually belong to the node box.
- Do not place logo assets inside diagram nodes — logos go in the strip only.
- Do not move logo or footer outside the 96 px safe margin.
- Do not omit the FMEA summary panel on the right side.

## Speaker Notes
白皮書 v4 的核心產出：在 v3 架構圖上，我們主動標出三個 SPOF，並為每個 SPOF 寫出 FMEA——失效模式、對 SLA 和 $20,000/hr 停機成本的影響、緩解手法。最嚴重的是 TSDB 單實例：它一掛，寫入中斷（Processor 無法 INSERT，offset 不提交，Kafka 積壓）、讀取中斷（cache miss 後打 TSDB 失敗）、告警靜默，整廠監控全黑。緩解手法是 Replica——PostgreSQL streaming replication，Primary + Standby，讀寫分離讓讀取有部分可用性。Kafka 單 broker 的緩解是 3-broker cluster，replication.factor=3；Stream Processor 單實例的緩解是 Consumer Group ≥2，搭配 Retry + Idempotency 讓 rebalance 後重播安全。這不是過度設計：三個緩解手法（複本、重試、冪等）都是 slide-04 詞彙卡裡的標準工具。Redis 單實例也是潛在 SPOF，但影響程度比 TSDB 低（降級而非全斷），v4 標記觀察，v5 處理。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v4：故障模式圖" — 10 Chinese characters (CJK only), within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v4"` in frontmatter (artifact slide).
- [ ] `rendering_mode: "programmatic_diagram"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v4 · 風險與韌性` present below kicker.
- [ ] Diagram Spec is a complete YAML block (not `not_applicable`).
- [ ] Diagram Spec defines `diagram_type: "data_flow"`.
- [ ] Exactly 3 nodes have `status: "warning"`: message_queue, stream_processor, tsdb.
- [ ] All 3 warning nodes have `fmea` block with: failure_mode, impact, sla_impact, cost_impact, mitigation.
- [ ] Non-SPOF nodes have `status: "existing"`.
- [ ] Warning node marker is described as Coral Red #E8634F lightning bolt on node box (not on kicker).
- [ ] All v3 architecture nodes are present: ingest_api, message_queue, stream_processor, tsdb, query_api, cache, alert_service, device_gateway, dashboard.
- [ ] SPOF nodes match v3 architecture node IDs: message_queue (Kafka), stream_processor, tsdb.
- [ ] Technical Flow Details covers all 3 SPOFs with FMEA: failure mode, impact chain, SLA/cost impact, mitigation for each.
- [ ] Technical Flow Details includes FMEA summary table.
- [ ] Logo Assets lists Kafka and Redis with expected asset paths.
- [ ] Version label `白皮書 v4` appears in diagram bottom-right.
- [ ] FMEA summary panel present (3 rows, one per SPOF).
- [ ] Logo strip below FMEA panel: Kafka, Redis.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Numbers consistent with shared IoT: 6,000 msg/s peak, $20,000/hr, P99 < 10s, 10,000 台.
