---
chapter: "幕 3：系統設計"
chapter_id: "03"
chapter_slug: "03-系統設計"
slide: "6"
title: "白皮書 v3：關鍵資料流"
original_title: "白皮書 v3：關鍵資料流"
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

# Slide 06 · 白皮書 v3：關鍵資料流

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v3 · 系統設計`
- Title: 白皮書 v3：關鍵資料流
- API Draft (on-slide reference box):
  ```
  POST   /v1/readings           # 設備上報
  GET    /v1/devices/{id}/readings  # 讀數查詢
  GET    /v1/alerts             # 告警列表
  ```
- Diagram caption: 上報寫入路徑（async）· 查詢讀取路徑（cache hit/miss）· 告警路徑
- 路徑標籤（三條 swim-lane 標題，中英對照）：`WRITE PATH 寫入路徑` · `READ PATH 讀取路徑` · `ALERT PATH 告警路徑`
- 箭頭圖例（diagram 旁可見小字）：`實線＝同步　虛線＝非同步`
- 節點中英對照（每個節點同時顯示中文與技術名）：Device 設備 · Ingest API 接收API(FastAPI) · Kafka 訊息佇列 · Processor 處理 · TSDB 時序資料庫 · Dashboard 儀表板 · Query API 查詢API · Redis Cache 快取 · Alert Service 告警服務
- Cache 分支標籤（中英對照）：`HIT 命中`（Forest Green `#5B9770`）· `MISS 未命中`（Coral Red `#E8634F`）
- Cache 分支 gloss（diagram 旁可見小字）：`Thundering Herd＝快取失效瞬間大量請求同時打 DB`
- Version label (bottom-right of diagram): `白皮書 v3`

## Beginner Anchor
資料流圖是把 C4 的「連線」展開說清楚——每個箭頭背後有什麼保證？失敗時會怎樣？這是工程師實作前最重要的一張圖。

## Learning Goal
讓學員看到三條路徑的完整語意：enqueue+ack 的非同步寫入保證、cache hit/miss 的讀取分支、告警的 P99 時間預算，以及對應的 API 端點契約。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v3 · 系統設計`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for `v3`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- Data Flow Diagram (main visual, ~65% canvas width):
  - Three labeled swim lanes or path groups:
    - WRITE PATH (top): Device → Ingest API → Kafka → Processor → TSDB
    - READ PATH (middle): Dashboard → Query API → [Cache Hit branch / Cache Miss → TSDB]
    - ALERT PATH (bottom): Processor → Alert Service → Notification
  - All edges per Diagram Spec (solid/dashed per sync/async).
  - Cache branch: split node showing HIT (returns immediately, Forest Green `#5B9770` annotation) vs MISS (continues to TSDB, then writes back to Cache, Coral Red `#E8634F` annotation).
  - Node text: JetBrains Mono 500 / 28 px / Warm White.
  - Version label bottom-right of diagram: `白皮書 v3`, JetBrains Mono 26 px / Mint `#97E8D6`.
- API Draft Reference Box (right side, ~30% canvas width):
  - Small code block styled with `#172A40` background, Mint `#97E8D6` 1 px border, rounded 12 px.
  - Title: `API 草稿` in JetBrains Mono / 24 px / Mint `#97E8D6`.
  - Three endpoint lines in JetBrains Mono / 22 px / Warm White with HTTP method in different color (POST = Forest Green `#5B9770`, GET = Mint `#97E8D6`).
- Logo strip (below API box): Kafka, Redis, FastAPI, PostgreSQL — official SVG assets, 40 px height, horizontal, on Warm White pill background.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
diagram_type: "data_flow"
whitepaper_version: "v3"
focus: "IoT 監控三條關鍵路徑的完整資料流語意：非同步寫入保證、cache hit/miss 分支、告警 P99 時間預算"
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
  path_label_font: "Inter 700 24px Warm White"
  version_label: "白皮書 v3, JetBrains Mono Caption, bottom-right of diagram"

paths:
  - id: "write_path"
    label: "WRITE PATH"
    label_zh: "寫入路徑"
    description: "設備上報 → 非同步 enqueue → 消費 → 批次寫入 TSDB"

  - id: "read_path"
    label: "READ PATH"
    label_zh: "讀取路徑"
    description: "Dashboard 查詢 → Query API → Redis cache hit/miss → TSDB fallback"

  - id: "alert_path"
    label: "ALERT PATH"
    label_zh: "告警路徑"
    description: "Processor 閾值比對 → 觸發 Alert Service → 送出通知"

nodes:
  - id: "device"
    label: "Device"
    label_zh: "設備"
    subtitle: "POST /v1/readings"
    type: "external"
    path: "write_path"
    status: "new"
    note: "HTTP POST，每 5 秒一筆，尖峰 6,000 msg/s。"

  - id: "ingest_api"
    label: "Ingest API"
    label_zh: "接收API"
    subtitle: "FastAPI · stateless"
    type: "service"
    path: "write_path"
    status: "new"
    note: "接收請求，立即 enqueue 至 Kafka。回傳 202 Accepted，不等 TSDB 寫完。"

  - id: "kafka"
    label: "Kafka"
    label_zh: "訊息佇列"
    subtitle: "topic: sensor-readings"
    type: "queue"
    path: "write_path"
    status: "new"
    note: "Producer ack 後 Ingest API 才回 202。at-least-once 語意，Consumer 需 idempotent。"

  - id: "processor"
    label: "Processor"
    label_zh: "處理"
    subtitle: "Consumer Group"
    type: "service"
    path: "write_path"
    status: "new"
    note: "批次消費 → 寫入 TSDB 成功後才提交 offset。同時進行 Threshold 比對。"

  - id: "tsdb_write"
    label: "TSDB"
    label_zh: "時序資料庫"
    subtitle: "TimescaleDB hypertable"
    type: "database"
    path: "write_path"
    status: "new"
    note: "批次 INSERT。寫入失敗 → offset 不提交 → Kafka 重試。"

  - id: "dashboard"
    label: "Dashboard"
    label_zh: "儀表板"
    subtitle: "GET /v1/devices/{id}/readings"
    type: "external"
    path: "read_path"
    status: "new"
    note: "操作員瀏覽器端，發送 GET 查詢請求。"

  - id: "query_api"
    label: "Query API"
    label_zh: "查詢API"
    subtitle: "FastAPI · stateless"
    type: "service"
    path: "read_path"
    status: "new"
    note: "先查 Redis；hit 直接回傳；miss 查 TSDB，結果回填 Redis。"

  - id: "redis_cache"
    label: "Redis Cache"
    label_zh: "快取"
    subtitle: "TTL 60s"
    type: "cache"
    path: "read_path"
    status: "new"
    note: "cache hit 路徑 P99 < 10ms，遠低於 10s SLA。TTL 60s 過期後下次 miss 重建。"

  - id: "tsdb_read"
    label: "TSDB"
    label_zh: "時序資料庫"
    subtitle: "TimescaleDB time_bucket()"
    type: "database"
    path: "read_path"
    status: "new"
    note: "cache miss 回打，time_bucket() 聚合查詢。結果回填 Redis 後回傳。"

  - id: "alert_service"
    label: "Alert Service"
    label_zh: "告警服務"
    subtitle: "Email / Webhook"
    type: "service"
    path: "alert_path"
    status: "new"
    note: "接收告警事件，送出通知，寫入 alerts table。"

edges:
  # WRITE PATH
  - from: "device"
    to: "ingest_api"
    label: "HTTP POST · sync receive"
    style: "solid"
    meaning: "write"
    note: "同步接收，但 Ingest API 立即轉 enqueue，不阻塞到 TSDB 寫完。"

  - from: "ingest_api"
    to: "kafka"
    label: "enqueue"
    style: "dashed"
    meaning: "async"
    response_annotation: "ack / 202 Accepted"
    note: "非同步 enqueue（前向邊，ingest_api → kafka）。Kafka Producer ack 確認後，Ingest API 才回傳 HTTP 202 Accepted 給設備（回應方向：kafka ack → ingest_api → device）。edge label 僅標 forward 操作 'enqueue'；ack / 202 的語意在 response_annotation 與 Technical Flow Details 說明，不混入前向邊 label。"

  - from: "kafka"
    to: "processor"
    label: "consume (at-least-once)"
    style: "dashed"
    meaning: "async"
    note: "Consumer Group 消費；offset 在寫 TSDB 成功後提交。失敗則重播。"

  - from: "processor"
    to: "tsdb_write"
    label: "batch INSERT"
    style: "solid"
    meaning: "write"
    note: "同步批次寫入；成功後提交 offset。失敗：不提交 offset，Kafka 重試，Consumer 需 idempotent（sensor_id + timestamp 去重）。"

  # READ PATH
  - from: "dashboard"
    to: "query_api"
    label: "GET readings / alerts"
    style: "solid"
    meaning: "read"
    note: "HTTP GET，同步請求。"

  - from: "query_api"
    to: "redis_cache"
    label: "GET key (hit/miss)"
    style: "solid"
    meaning: "read"
    note: "Cache hit → 直接回傳（P99 < 10ms）。Cache miss → 繼續查 TSDB。"

  - from: "query_api"
    to: "tsdb_read"
    label: "time_bucket() query (cache miss)"
    style: "solid"
    meaning: "read"
    note: "Cache miss 路徑，查 TimescaleDB hypertable，時間範圍聚合。結果回填 Redis（TTL 60s）。"

  # ALERT PATH
  - from: "processor"
    to: "alert_service"
    label: "threshold breach event"
    style: "dashed"
    meaning: "async"
    note: "非同步告警觸發；P99 從 Device 到 Alert Service 通知送出 < 10s。"
```

## Logo Assets

此頁面明確命名 Kafka、Redis、FastAPI、PostgreSQL（TimescaleDB），必須使用官方 logo asset。

| 名稱 | Expected Asset Path | 可從 101 重用 | 備註 |
|------|---------------------|--------------|------|
| Apache Kafka | `assets/logos/messaging/kafka.svg` | 是（101 已有 kafka.svg） | 官方 Kafka logo，SVG 優先 |
| Redis | `assets/logos/cache/redis.svg` | 是（101 已有） | 官方立方體 logo |
| FastAPI | `assets/logos/api/fastapi.svg` | 否，需補抓 | Official source: fastapi.tiangolo.com |
| PostgreSQL | `assets/logos/databases/postgresql.svg` | 是（101 已有） | 官方象頭 logo，代表 TimescaleDB 底層 |

**Logo Strip 規格**：
- 位置：API 草稿參考框下方，右側識別區
- 高度：40 px（等比例縮放）
- 間距：水平 20 px
- 背景：Warm White `#F4F1EA` 小底板，padding 12 px，rounded 8 px
- 最多 4 個（本頁剛好 4 個）
- 標注：`⚠ FastAPI logo 素材尚未取得，QA 階段需補抓後才可最終輸出`

## Technical Flow Details

### 寫入路徑（Write / Ingest Path）— 詳細語意

**步驟說明：**

1. **Device → Ingest API**：設備發送 `POST /v1/readings`，Ingest API 同步接收 HTTP 請求（TCP 連線建立 + 解析）。這段是「同步接收」但不是「同步處理到底」。
2. **Ingest API → Kafka（async enqueue）**：Ingest API 立即將讀數序列化並呼叫 Kafka Producer `send()`。這是**非同步**操作——Producer 不直接等待 TSDB 寫入結果，而是等待 Kafka **broker ack**（`acks=1` 或 `acks=all` 依可靠度設定）。
3. **Kafka Producer Ack → HTTP 202**：圖上 `ingest_api → kafka` 邊 label 為 `enqueue`（前向操作）。Kafka broker ack 確認後，Ingest API 才回傳 **HTTP 202 Accepted**（非 201 Created）給設備——這是回應方向（kafka ack → ingest_api → device），不是前向 enqueue 操作。202 的語意是「已接受，將非同步處理」，讓設備可以立刻發送下一筆，不阻塞。
4. **Kafka → Processor（consume at-least-once）**：Stream Processor Consumer Group 以自身速率從 Kafka `sensor-readings` topic 消費訊息，批次大小可調（如每批 100–500 筆）。
5. **Processor → TSDB（batch INSERT）**：批次 `INSERT INTO readings(timestamp, sensor_id, value)` 至 TimescaleDB hypertable。成功後才提交 Kafka consumer offset。
6. **Retry on failure**：若 TSDB 寫入失敗（如 DB 短暫不可用），Processor 不提交 offset → Kafka 重播同一批訊息 → Processor 重試。Consumer 必須實作 **idempotent 寫入**（以 `(sensor_id, timestamp)` 做 ON CONFLICT DO NOTHING），防止重播產生重複資料。

**關鍵保證：** 在 TSDB 正常服務時，每一筆讀數都會被「至少一次」寫入（at-least-once）；結合 idempotency，最終效果等同 exactly-once。

---

### 查詢讀取路徑（Read / Query Path）— Cache Hit vs Miss

**Cache Hit 路徑（多數情況）：**
1. Dashboard → `GET /v1/devices/{id}/readings?range=1h`
2. Query API 計算 cache key（hash of query params: device_id, range, aggregation function）
3. Query API 執行 `Redis GET {key}`
4. **Hit**：Redis 回傳快取結果 → Query API 直接回傳給 Dashboard（P99 < 10–50 ms，遠優於 10s SLA）

**Cache Miss 路徑（首次查詢 / TTL 過期後）：**
1. `Redis GET {key}` 回傳 nil（miss）
2. Query API 查 TimescaleDB：`SELECT time_bucket('1 minute', timestamp) as bucket, avg(value) FROM readings WHERE sensor_id = X AND timestamp > now() - INTERVAL '1 hour' GROUP BY bucket ORDER BY bucket`
3. TSDB 回傳聚合結果（P50 < 500ms，P99 < 2s，有 hypertable 索引加速）
4. Query API 執行 `Redis SET {key} {value} EX 60`（TTL 60 秒回填）
5. 回傳結果給 Dashboard

**TTL 設定邏輯：** 讀數每 5 秒更新，TTL 60 秒意味著 Dashboard 看到的資料最多落後 60 秒——對於 IoT 監控操作員的使用場景（偶爾查看趨勢圖），這個延遲是可接受的。P99 < 10s SLA 主要由 Cache Hit 路徑保障。

**防雷擊羊群（Thundering Herd）注意事項（v4 處理）：** 若大量 Dashboard 在同一時間出現 cache miss（例如 Redis 重啟後），大量請求同時打 TSDB 可能造成 DB 過載。防範策略（v4 韌性章節補充）：distributed lock / probabilistic early expiration。

---

### 告警路徑（Alert Path）— P99 時間預算

**步驟說明：**
1. Stream Processor 在消費並批次寫入 TSDB 的同時，對每筆讀數進行 **Threshold 比對**（記憶體中查詢 Threshold 規則）。
2. 若 `Reading.value > Threshold.max_value` 或 `< Threshold.min_value`，Processor **非同步發送**告警觸發事件至 Alert Service（message queue 或直接 HTTP call）。
3. Alert Service 執行：(a) 寫入 `alerts` table；(b) 送出 Email / Webhook / PagerDuty 通知。

**P99 < 10s 時間預算分解：**

| 段落 | 典型延遲 P50 | P99 預估 |
|------|-------------|---------|
| Device → Ingest API（HTTP） | 20–50 ms | 200 ms |
| Ingest API → Kafka enqueue | 5–20 ms | 100 ms |
| Kafka Consumer lag（批次間隔） | 100–300 ms | 1,000 ms |
| Threshold 比對（記憶體） | < 1 ms | 5 ms |
| Processor → Alert Service（async call） | 10–50 ms | 200 ms |
| Alert Service 寫入 + 送通知 | 200–500 ms | 2,000 ms |
| **端對端合計（Device → 通知送出）** | **~400–900 ms** | **< 3,500 ms** |

結論：P99 端對端告警路徑 < 4 秒，大幅優於 10 秒 SLA 目標，有足夠餘裕。

---

### API 草稿說明

三個核心端點：

```
POST   /v1/readings
  Body: { "device_id": "...", "sensor_id": "...", "value": 42.3, "unit": "°C", "timestamp": "..." }
  Response: 202 Accepted  (async — enqueued to Kafka)

GET    /v1/devices/{device_id}/readings
  Query: ?range=1h&aggregation=avg&bucket=1m
  Response: 200 OK, [{ "bucket": "...", "avg_value": 42.1 }, ...]
  (served from Redis cache or TSDB fallback)

GET    /v1/alerts
  Query: ?device_id=...&status=open&since=...
  Response: 200 OK, [{ "alert_id": "...", "triggered_at": "...", "severity": "critical", ... }]
```

這三個端點覆蓋了白皮書 v3 的完整讀寫語意契約，供 6 人團隊前後端對齊用。

## VCRE Scorecard
not_applicable — this is an artifact slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v3 · 系統設計" Mint text on Deep Navy, rounded capsule 34 px. Title "白皮書 v3：關鍵資料流" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content (~65% width): a left-to-right data flow diagram with three stacked, separately-labeled swim lanes. Nodes are rectangular, Mint #97E8D6 4 px border, Deep Navy fill, rounded 8 px; each node shows a bilingual label — Chinese on top (Noto Sans TC 700 / 28 px Warm White) and the English/technical name below it (JetBrains Mono 22 px Mint #97E8D6) — plus its existing technical subtitle in smaller JetBrains Mono. Arrows: solid Mint 2 px = sync, dashed Mint 2 px = async; every arrow carries its label text. Render an arrow legend (small, near the diagram) in Noto Sans TC 500 / 22 px Warm White, exactly "實線＝同步　虛線＝非同步". Render EXACTLY these nodes, arrows, directions, and labels — do not add, rename, or drop any. TOP lane labeled "WRITE PATH 寫入路徑" (English in Inter 700 24 px Warm White, Chinese "寫入路徑" in Noto Sans TC 700 24 px Warm White right after it): five nodes left-to-right — "設備 / Device" (subtitle "POST /v1/readings") → "接收API / Ingest API" (subtitle "FastAPI · stateless") → "訊息佇列 / Kafka" (subtitle "topic: sensor-readings") → "處理 / Processor" (subtitle "Consumer Group") → "時序資料庫 / TSDB" (subtitle "TimescaleDB hypertable"). Arrows along this lane: Device→Ingest API solid, label "HTTP POST · sync receive"; Ingest API→Kafka dashed (async), label "enqueue", with a small return annotation "ack / 202 Accepted" pointing back toward Ingest API/Device; Kafka→Processor dashed (async), label "consume (at-least-once)"; Processor→TSDB solid, label "batch INSERT". MIDDLE lane labeled "READ PATH 讀取路徑" (English Inter 700 24 px + Chinese "讀取路徑" Noto Sans TC 700 24 px, both Warm White): nodes "儀表板 / Dashboard" (subtitle "GET /v1/devices/{id}/readings") → "查詢API / Query API" (subtitle "FastAPI · stateless") → "快取 / Redis Cache" (subtitle "TTL 60s"), with a cache branch off Query API to "時序資料庫 / TSDB" (subtitle "TimescaleDB time_bucket()"). Arrows: Dashboard→Query API solid, label "GET readings / alerts"; Query API→Redis Cache solid, label "GET key (hit/miss)"; from Redis Cache a Forest Green #5B9770 branch returning immediately to Query API/Dashboard, annotate "HIT 命中 · P99 < 10ms" in Forest Green #5B9770; a Coral Red #E8634F branch shown as Query API→TSDB solid, label "time_bucket() query (cache miss)", annotate the branch "MISS 未命中" in Coral Red #E8634F, with a thin write-back arrow TSDB→Redis Cache annotated "回填 TTL 60s". Both HIT 命中 and MISS 未命中 branches must be visible. Near the cache MISS branch, render a small visible caption in Noto Sans TC 500 / 24 px Coral Red #E8634F, exactly "Thundering Herd＝快取失效瞬間大量請求同時打 DB" (gloss text only — do not add it as a diagram node or edge). BOTTOM lane labeled "ALERT PATH 告警路徑" (English Inter 700 24 px + Chinese "告警路徑" Noto Sans TC 700 24 px, both Warm White): "處理 / Processor" (the same write-path Processor) → "告警服務 / Alert Service" (subtitle "Email / Webhook"), arrow Processor→Alert Service dashed (async), label "threshold breach event". Use only these exact node labels — the stack is FastAPI/Python + PostgreSQL/TimescaleDB + Kafka + Redis; never substitute Spring Boot, MySQL, RabbitMQ, or any other technology. Right side (~30% width): API draft box with #172A40 background, Mint 1 px border, rounded 12 px, title "API 草稿" JetBrains Mono 24 px Mint, three endpoint lines JetBrains Mono 22 px (POST in Forest Green #5B9770, GET in Mint #97E8D6). Below API box: 4-logo strip (Kafka, Redis, FastAPI, PostgreSQL) on Warm White pill background 40 px height. Bottom-right of diagram: "白皮書 v3" JetBrains Mono 26 px Mint. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, icon, or the text "logo-light.png" there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra data flow nodes or arrows beyond those defined in the Diagram Spec.
- Do not generate fake, approximate, or AI-invented brand logos — logos must be composited from official assets separately.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the "白皮書 v3" version label on the diagram.
- Do not omit the API draft box with three endpoint lines.
- Do not place logo assets inside diagram nodes — logos go in the strip only.
- Do not make the cache branch show only one outcome — both HIT and MISS branches must be visible.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any brand logo, emblem, badge, monogram, icon, or filename text (e.g. "logo-light.png") in the bottom-right corner — keep it empty for a logo overlaid later. (The product logo strip is allowed.)
- Do not invent, rename, add, or drop any node or path — render exactly the WRITE/READ/ALERT path nodes and labels listed; the stack is FastAPI/Python + PostgreSQL/TimescaleDB + Kafka + Redis, never Spring Boot.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.
- Do not leave any node or path label as bare English — every node and every swim-lane path label must show both the Chinese label and the technical/English name (中英對照); do not drop the Chinese side, and do not translate the technical names (FastAPI, Kafka, Redis, TSDB/TimescaleDB stay as-is).

## Speaker Notes
v3 第二個產出：關鍵資料流圖。這張圖回答了 slide-02 提的三個問題。寫入路徑：Ingest API 不同步等 TSDB——先 enqueue 到 Kafka（前向操作），等 Kafka broker ack 後才回 202 Accepted（回應方向）——這個非同步語意決定了 6,000 msg/s 撐得住；Processor 在寫入成功後才提交 offset，確保 at-least-once 加上 idempotency 等於 exactly-once。讀取路徑：cache hit P99 < 50ms 遠優於 10s SLA；cache miss 打 TSDB 再回填，TTL 60 秒讓 Dashboard 資料新鮮但不每次打 DB。告警路徑：從 Device 到通知送出 P99 < 4 秒，10 秒 SLA 的餘裕非常充足。右側 API 草稿三個端點讓前後端工程師可以直接開始對齊 contract，不需要再開會。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v3：關鍵資料流" — 9 Chinese characters (CJK only), within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v3"` in frontmatter (artifact slide).
- [ ] `rendering_mode: "programmatic_diagram"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v3 · 系統設計` present below kicker.
- [ ] Diagram Spec is a complete YAML block (not `not_applicable`).
- [ ] Diagram Spec defines `diagram_type: "data_flow"`.
- [ ] Three path groups defined: write_path, read_path, alert_path.
- [ ] All nodes listed with correct path assignments and status: new.
- [ ] Write path edges: device→ingest_api (solid/write), ingest_api→kafka (dashed/async, label "enqueue", response_annotation "ack / 202 Accepted" — forward edge label must NOT conflate with response direction), kafka→processor (dashed/async), processor→tsdb_write (solid/write).
- [ ] Read path edges: dashboard→query_api (solid/read), query_api→redis_cache (solid/read with hit/miss), query_api→tsdb_read (solid/read for cache miss).
- [ ] Alert path edge: processor→alert_service (dashed/async).
- [ ] Technical Flow Details covers: enqueue+ack+202 semantics, at-least-once + idempotency, cache hit/miss TTL logic, P99 alert time budget breakdown table, API draft with 3 endpoint signatures.
- [ ] API Draft box present on slide with POST /v1/readings, GET /v1/devices/{id}/readings, GET /v1/alerts.
- [ ] Logo Assets section lists all 4 tools: Kafka, Redis, FastAPI, PostgreSQL.
- [ ] Logo Assets notes FastAPI as "需補抓" with expected asset path.
- [ ] QA blocker present for unacquired logo (FastAPI).
- [ ] Version label `白皮書 v3` appears in diagram bottom-right.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] ⚠ BLOCKER: FastAPI logo asset (`assets/logos/api/fastapi.svg`) must be acquired before final output.
