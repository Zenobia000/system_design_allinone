---
chapter: "幕 3：系統設計"
chapter_id: "03"
chapter_slug: "03-系統設計"
slide: "5"
title: "白皮書 v3：C4 容器圖"
original_title: "白皮書 v3：C4 容器圖"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v3"
rendering_mode: "programmatic_diagram"
---

# Slide 05 · 白皮書 v3：C4 容器圖

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v3 · 系統設計`
- Title: 白皮書 v3：C4 容器圖
- Diagram caption: 7 個容器 · 2 個外部角色 · 三條路徑：上報寫入 / 查詢讀取 / 告警
- Version label (bottom-right of diagram): `白皮書 v3`

## Beginner Anchor
C4 容器圖是整個 v3 白皮書的骨架——每個方塊是一個可獨立部署的東西，每條線是一個技術通訊選擇（同步或非同步）。這不是微服務架構：Ingest API、Processor、Query API 可以共用同一個 codebase；C4 容器圖描述的是可部署單元，不預設要拆幾個 repo。

## Learning Goal
讓學員看到 IoT 系統 7 個容器及 2 個外部角色，以及三條通訊路徑，理解為什麼 Ingest API 和 Query API 要拆開、Kafka 為何擋在 Ingest 和 Processor 之間。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v3 · 系統設計`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for `v3`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- C4 Diagram (main visual, center/right ~80% canvas width):
  - Rendered programmatically per Diagram Spec.
  - All node text: JetBrains Mono 500 / 28 px / Warm White.
  - New nodes: Mint `#97E8D6` 4 px border + `NEW` label (all nodes are new in v3).
  - Arrows: Mint `#97E8D6`, solid 2 px (sync), dashed 2 px (async).
  - Background of diagram area: Deep Navy `#152238`.
  - Ingest edge annotation: `~6,000 msg/s peak` in JetBrains Mono 22 px Coral Red `#E8634F`.
- Version label bottom-right of diagram: `白皮書 v3`, JetBrains Mono / 26 px / Mint `#97E8D6`.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
diagram_type: "c4_container"
whitepaper_version: "v3"
focus: "IoT 監控系統 7 個容器 + 2 個外部角色（Device/Gateway、Dashboard）全貌：Ingest 寫入路徑、Query 讀取路徑、Alert 告警路徑"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  background: "Deep Navy #152238"
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint #97E8D6 solid 2px"
  arrow_async: "Mint #97E8D6 dashed 2px"
  node_text_font: "JetBrains Mono 500 28px Warm White #F4F1EA"
  version_label: "白皮書 v3, JetBrains Mono Caption, bottom-right of diagram"

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
    subtitle: "感測器上報源"
    type: "external"
    group: "external"
    is_external_actor: true
    status: "new"
    note: "10,000 台感測器設備，透過 MQTT 或 HTTP POST 每 5 秒上報一筆讀數。均值 2,000 msg/s，尖峰 6,000 msg/s，每筆 ~200 B。"

  - id: "ingest_api"
    label: "Ingest API"
    subtitle: "FastAPI · stateless"
    type: "service"
    group: "ingest_layer"
    status: "new"
    note: "接收設備上報（POST /v1/readings）。Stateless，可水平擴展。立即 enqueue 至 Kafka 後回傳 HTTP 202 Accepted，不等待 TSDB 寫入完成。"

  - id: "message_queue"
    label: "Message Queue"
    subtitle: "Kafka · topic: sensor-readings"
    type: "queue"
    group: "ingest_layer"
    status: "new"
    note: "Kafka topic `sensor-readings`，partitioned by device_id。削峰緩衝：尖峰 6,000 msg/s 排隊，Consumer 以自身速率消費。at-least-once 語意，Consumer 需 idempotent 寫入。"

  - id: "stream_processor"
    label: "Stream Processor"
    subtitle: "Python Consumer Group"
    type: "service"
    group: "processing_layer"
    status: "new"
    note: "Kafka Consumer Group，消費 sensor-readings topic。職責：(1) 批次寫入 TimescaleDB；(2) 比對 Threshold，觸發 Alert。Consumer offset 提交在寫入 TSDB 成功後。"

  - id: "tsdb"
    label: "TSDB"
    subtitle: "PostgreSQL + TimescaleDB"
    type: "database"
    group: "storage_layer"
    status: "new"
    note: "TimescaleDB hypertable `readings`，按 timestamp 分 chunk。90 天 retention policy，columnar 壓縮率 ~90%（35 GB/天 → ~3.5 GB/天壓縮後）。主要查詢：時間範圍聚合（time_bucket）。"

  - id: "query_api"
    label: "Query API"
    subtitle: "FastAPI · stateless"
    type: "service"
    group: "query_layer"
    status: "new"
    note: "Dashboard 查詢入口（GET /v1/devices/{id}/readings, GET /v1/alerts）。Stateless，先查 Redis cache；cache miss 才查 TimescaleDB，結果回填 Redis。"

  - id: "cache"
    label: "Cache"
    subtitle: "Redis · TTL 60s"
    type: "cache"
    group: "query_layer"
    status: "new"
    note: "快取熱點聚合查詢結果，TTL 60 秒。cache hit 路徑可確保 P99 < 10s SLA。cache miss 時 Query API 回打 TSDB 並回填 Redis（需防 thundering herd，v4 處理）。"

  - id: "alert_service"
    label: "Alert Service"
    subtitle: "通知 · Email / Webhook"
    type: "service"
    group: "alert_layer"
    status: "new"
    note: "接收 Stream Processor 的告警觸發事件，負責送出通知（Email / Webhook / PagerDuty）。非同步接收，P99 從 Reading 到通知送出 < 10s。"

  - id: "dashboard"
    label: "Dashboard"
    subtitle: "Web UI"
    type: "frontend"
    group: "external"
    is_external_actor: true
    status: "new"
    note: "操作員瀏覽器端應用。透過 Query API 取得裝置讀數和告警列表。不直接連 TSDB 或 Redis。"

edges:
  - from: "device_gateway"
    to: "ingest_api"
    label: "POST /v1/readings\n~6,000 msg/s peak"
    style: "solid"
    meaning: "write"
    note: "HTTP POST，同步接收請求，但 Ingest API 立即回 202 Accepted，不等 TSDB 寫完。尖峰 6,000 msg/s 標注於此邊。"

  - from: "ingest_api"
    to: "message_queue"
    label: "async enqueue"
    style: "dashed"
    meaning: "async"
    note: "Ingest API 將讀數 enqueue 至 Kafka topic，非同步，不阻塞上報請求。Producer ack 後回傳 202 給設備。"

  - from: "message_queue"
    to: "stream_processor"
    label: "consume"
    style: "dashed"
    meaning: "async"
    note: "Stream Processor Consumer Group 從 Kafka 消費，自身速率，offset 在寫入 TSDB 成功後提交。"

  - from: "stream_processor"
    to: "tsdb"
    label: "batch write"
    style: "solid"
    meaning: "write"
    note: "批次 INSERT INTO readings hypertable，同步寫入。若失敗：不提交 offset，Kafka 重試。"

  - from: "stream_processor"
    to: "alert_service"
    label: "threshold breach"
    style: "dashed"
    meaning: "async"
    note: "Stream Processor 比對 Reading.value 與 Threshold，若觸發則非同步發送告警事件至 Alert Service。告警路徑目標 P99 < 10s。"

  - from: "dashboard"
    to: "query_api"
    label: "GET readings / alerts"
    style: "solid"
    meaning: "read"
    note: "Dashboard 透過 Query API 查詢讀數和告警，HTTP GET。"

  - from: "query_api"
    to: "cache"
    label: "cache-aside: GET / SET EX60"
    style: "solid"
    meaning: "read+write-back"
    note: "cache-aside 模式：先 GET key（read）；cache hit 直接回傳；cache miss 時查 TSDB，再 SET key EX 60（write-back，TTL 60s）。此邊同時代表讀取與寫回兩個操作。"

  - from: "query_api"
    to: "tsdb"
    label: "fallback read"
    style: "solid"
    meaning: "read"
    note: "Cache miss 路徑：Query API 查 TimescaleDB time_bucket() 聚合，結果回填 Redis。"
```

## Logo Assets
此頁面的容器節點對應以下技術產品，logo 放在圖面旁邊的工具識別區（不取代節點標籤）：

| 名稱 | Expected Asset Path | 可從 101 重用 | 備註 |
|------|---------------------|--------------|------|
| Apache Kafka | `assets/logos/messaging/kafka.svg` | 是（101 已有 kafka.svg） | 官方 Kafka logo，SVG 優先 |
| Redis | `assets/logos/cache/redis.svg` | 是（101 已有） | 官方立方體 logo |
| PostgreSQL | `assets/logos/databases/postgresql.svg` | 是（101 已有） | 官方象頭 logo |
| FastAPI | `assets/logos/api/fastapi.svg` | 否，需補抓 | Official source: fastapi.tiangolo.com |

**Logo Strip 規格**：
- 位置：圖面底部或右側識別區，不與節點標籤重疊
- 高度：40 px（等比例縮放）
- 間距：水平 20 px
- 背景：Warm White `#F4F1EA` 小底板，padding 12 px，rounded 8 px
- 最多 4 個（本頁剛好 4 個）
- 標注：`⚠ FastAPI logo 素材尚未取得，QA 階段需補抓後才可最終輸出`

## Technical Flow Details

### 寫入路徑（Write / Ingest Path）

**正常流程：**
1. Device/Gateway 每 5 秒透過 HTTP POST `/v1/readings` 送讀數至 Ingest API（均值 2,000 msg/s，尖峰 6,000 msg/s，每筆 ~200 B）。
2. Ingest API（stateless FastAPI）收到請求後立即將讀數 **enqueue 至 Kafka** topic `sensor-readings`（非同步）。
3. Kafka Producer **ack** 確認後，Ingest API 回傳 **HTTP 202 Accepted** 給設備。設備不需等待 TSDB 寫入完成——這是關鍵的非同步解耦點。
4. Stream Processor Consumer Group 從 Kafka 消費，以自身速率批次 **INSERT** 讀數至 TimescaleDB hypertable。
5. TSDB 寫入成功後，Stream Processor 才提交 Kafka **consumer offset**（at-least-once 保證）。

**失敗處理：**
- 若 Stream Processor 寫入 TSDB 失敗（DB 短暫不可用），consumer offset 不提交 → Kafka 自動重試（重播同一批 messages）。
- Consumer 需做 **idempotent 寫入**（以 `(sensor_id, timestamp)` 為 unique key 去重），防止重播造成重複資料。
- Ingest API 本身失敗（服務崩潰）：設備可實作指數退避重試；Kafka 有持久化保證，已 enqueue 的訊息不丟失。

**Stateless 關鍵點：**
- Ingest API 完全 stateless，沒有本地狀態。任何 instance 處理任何請求皆相同。尖峰時可水平擴展。

---

### 告警路徑（Alert Path）

1. Stream Processor 在消費 Kafka 訊息時，**同時進行閾值比對**（Threshold 比對）：`Reading.value` 超出 `Threshold.min/max_value` 時觸發。
2. Stream Processor **非同步發送**告警事件至 Alert Service（dashed edge）。
3. Alert Service 負責送出通知（Email / Webhook / PagerDuty）並將告警記錄寫入 `alerts` table。
4. **P99 < 10s 時間預算分配：**
   - Device → Ingest API：~50 ms（HTTP 請求/回應）
   - Ingest API → Kafka enqueue：~10 ms
   - Kafka → Stream Processor 消費延遲：~200–500 ms（正常批次間隔）
   - Threshold 比對：~1 ms
   - Alert Service 通知送出：~500 ms（Email/Webhook）
   - **總計：< 1–2 秒（P50），P99 目標 < 10s 有足夠餘裕**

---

### 讀取路徑（Read / Query Path）

1. Dashboard 發送 GET 請求至 Query API（例：`GET /v1/devices/{id}/readings?range=1h`）。
2. Query API 執行 `Redis GET {key}`（**cache-aside 讀取**；key = 查詢參數 hash）。
   - **Cache Hit**：直接回傳快取結果（P99 < 10 ms），滿足 SLA。
   - **Cache Miss**：繼續步驟 3。
3. Query API 查 TimescaleDB 執行 `time_bucket()` 聚合，取得結果（P99 < 2s，取決於 hypertable chunk 數）。
4. 執行 `Redis SET {key} {value} EX 60`（**cache-aside 寫回**，TTL 60 秒）。圖上 `query_api → cache` 這條邊同時表示此 GET 讀取與 SET 寫回兩個操作（edge label: `cache-aside: GET / SET EX60`）。
5. 回傳結果給 Dashboard。

**Stateless 關鍵點：**
- Query API 完全 stateless，所有狀態在 Redis 和 TSDB。可水平擴展處理 Dashboard 讀取請求。

---

### 為什麼 Ingest API 和 Query API 拆開？

| 面向 | Ingest API | Query API |
|------|-----------|-----------|
| 最佳化目標 | 吞吐量（6,000 msg/s） | 延遲（P99 < 10s） |
| 流量形狀 | 高頻均勻寫入 | 突發讀取（Dashboard 使用時） |
| 擴展方式 | 水平擴展配合 Kafka 削峰 | 水平擴展配合 Redis 快取 |
| 故障影響 | 寫入中斷不影響查詢 | 查詢中斷不影響上報 |

拆開兩個 API 讓寫入和讀取可以獨立擴展、獨立故障隔離——是 3 個月 MVP 的正確分離關注點決策。

## VCRE Scorecard
not_applicable — this is an artifact slide, not a trade-off decision slide. Trade-off scoring is done on slide-07.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v3 · 系統設計" Mint #97E8D6 text on Deep Navy, rounded capsule 34 px. Title "白皮書 v3：C4 容器圖" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content: a C4 container diagram occupying ~75% of canvas width. Draw EXACTLY these 9 nodes and 8 arrows — no more, no fewer, and use these exact text labels verbatim. Each node is a rectangle, Deep Navy fill, Mint #97E8D6 4 px border, corner radius 8 px, a small "NEW" badge top-right, with a bold JetBrains Mono Warm White 28 px title line and a smaller JetBrains Mono ~20 px subtitle line beneath it. The 9 nodes (title / subtitle):
  1. "Device / Gateway" / "感測器上報源" — external actor (left edge, leftmost)
  2. "Ingest API" / "FastAPI · stateless"
  3. "Message Queue" / "Kafka · topic: sensor-readings"
  4. "Stream Processor" / "Python Consumer Group"
  5. "TSDB" / "PostgreSQL + TimescaleDB"
  6. "Query API" / "FastAPI · stateless"
  7. "Cache" / "Redis · TTL 60s"
  8. "Alert Service" / "通知 · Email / Webhook"
  9. "Dashboard" / "Web UI" — external actor (right edge)
The backend services (Ingest API and Query API) are FastAPI on Python — NOT Spring Boot, NOT Java, NOT Node. The database node is "PostgreSQL + TimescaleDB" — do not relabel it as plain PostgreSQL, MySQL, or MongoDB. The queue is "Kafka" — not RabbitMQ, not SQS. The cache is "Redis". There is no object store, no MinIO, no S3, no API gateway, no load balancer in this diagram.
The 8 arrows (all Mint #97E8D6; solid 2 px = synchronous, dashed 2 px = asynchronous) with their exact direction and label:
  a. "Device / Gateway" → "Ingest API" — SOLID (sync), label "POST /v1/readings"; this is the ingest edge annotated with "~6,000 msg/s peak" in JetBrains Mono 22 px Coral Red #E8634F.
  b. "Ingest API" → "Message Queue" — DASHED (async), label "async enqueue".
  c. "Message Queue" → "Stream Processor" — DASHED (async), label "consume".
  d. "Stream Processor" → "TSDB" — SOLID (sync), label "batch write".
  e. "Stream Processor" → "Alert Service" — DASHED (async), label "threshold breach".
  f. "Dashboard" → "Query API" — SOLID (sync), label "GET readings / alerts".
  g. "Query API" → "Cache" — SOLID (sync), label "cache-aside: GET / SET EX60".
  h. "Query API" → "TSDB" — SOLID (sync), label "fallback read".
All arrowheads point in the stated direction only. Do not add any reverse arrows, extra edges, or unlabeled connectors. Bottom-right of diagram: "白皮書 v3" JetBrains Mono 26 px Mint. Below diagram: small logo strip (4 logos on Warm White pill background, 40 px height). Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, icon, or the text "logo-light.png" there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra nodes or arrows beyond those defined in the Diagram Spec.
- Do not generate fake, approximate, or AI-invented brand logos — logos must be composited from official assets separately.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the "白皮書 v3" version label on the diagram.
- Do not omit the "~6,000 msg/s peak" annotation on the ingest edge.
- Do not place logo assets inside diagram nodes — logos go in the strip only.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any brand logo, emblem, badge, monogram, icon, or filename text (e.g. "logo-light.png") in the bottom-right corner — keep it empty for a logo overlaid later. (The product logo strip is allowed.)
- Do not invent, rename, add, or drop any node — render exactly the nodes and labels listed (e.g. the backend is FastAPI/Python, NOT Spring Boot; the database is PostgreSQL + TimescaleDB).

## Speaker Notes
白皮書 v3 的第一個正式產出：C4 容器圖。7 個容器 + 2 個外部角色（Device/Gateway、Dashboard），三條路徑。

回答 slide-02 的問題：「要微服務嗎？」——這不是微服務架構。Ingest API、Processor、Query API 可以共用同一個 codebase，甚至同一個 git repo。C4 容器圖描述的是「可部署單元」——哪些部分需要獨立擴展、獨立故障隔離；它不預設你要拆幾個 repo 或幾個服務。容器圖的重點是分離關注點（吞吐量 vs 延遲、寫入 vs 查詢），而不是強制微服務化。

最重要的設計決策在中間那條非同步虛線——Ingest API 把讀數 enqueue 到 Kafka 之後就回 202 了，不等 TSDB 寫完。這個決策解決了尖峰 6,000 msg/s 的吞吐量問題：Kafka 變成削峰緩衝器，Processor 可以用自己的節奏消費，TSDB 不會被直接砸到。讀取路徑的核心設計是 Query API → Redis cache（cache-aside：先 GET，miss 再 SET EX60）→ TSDB 的兩段查詢：cache hit 直接回傳，確保 P99 < 10s SLA；cache miss 才打 TSDB 並回填 Redis。告警路徑從 Processor 出發，非同步送到 Alert Service，時間預算從 Device 到通知送出 P99 < 10s 完全可達。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v3：C4 容器圖" — 9 Chinese characters (CJK only), within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v3"` in frontmatter (artifact slide).
- [ ] `rendering_mode: "programmatic_diagram"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v3 · 系統設計` present below kicker.
- [ ] Diagram Spec is a complete YAML block (not `not_applicable`).
- [ ] Diagram Spec defines `diagram_type: "c4_container"`.
- [ ] Diagram caption reads "7 個容器 · 2 個外部角色" (not "9 個容器").
- [ ] 9 nodes total: 7 containers (ingest_api, message_queue, stream_processor, tsdb, query_api, cache, alert_service) + 2 external actors (device_gateway, dashboard) marked with `is_external_actor: true`.
- [ ] All 9 nodes have `status: "new"` (first appearance in v3).
- [ ] Exactly 8 edges defined with correct styles (solid=sync, dashed=async).
- [ ] Ingest edge (device_gateway → ingest_api) annotated with `~6,000 msg/s peak`.
- [ ] Write path edges: device_gateway→ingest_api (solid/write), ingest_api→message_queue (dashed/async), message_queue→stream_processor (dashed/async), stream_processor→tsdb (solid/write).
- [ ] Alert path: stream_processor→alert_service (dashed/async).
- [ ] Read path: dashboard→query_api (solid/read), query_api→cache (solid/read+write-back, label "cache-aside: GET / SET EX60"), query_api→tsdb (solid/read).
- [ ] Technical Flow Details covers: write path (enqueue+ack+consume+batch write), alert path (P99 < 10s budget breakdown), read path (cache hit/miss), stateless design, failure handling (idempotent write, offset commit after success).
- [ ] Logo Assets section lists all 4 tools: Kafka, Redis, PostgreSQL, FastAPI.
- [ ] Logo Assets notes FastAPI as "需補抓" with expected asset path.
- [ ] QA blocker present for unacquired logo (FastAPI).
- [ ] Version label `白皮書 v3` appears in diagram bottom-right.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] ⚠ BLOCKER: FastAPI logo asset (`assets/logos/api/fastapi.svg`) must be acquired before final output.
