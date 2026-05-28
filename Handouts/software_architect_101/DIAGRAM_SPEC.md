# DIAGRAM_SPEC — 程式化產出物圖規格

正式產出物圖頁使用 `rendering_mode: programmatic_diagram`。這些頁面的 `Diagram Spec` 是渲染唯一真相來源；GPT Image 2 不負責決定節點、箭頭或資料流方向。

本課程的程式化圖有三種類型：**C4 容器圖（`c4_container`）/ 領域模型 ER（`domain_model`）/ 關鍵資料流（`data_flow`）**。

## Schema

```yaml
diagram_type: "c4_container"   # c4_container | domain_model | data_flow
whitepaper_version: "v3"       # 本圖屬於白皮書哪個版本
focus: "本頁新增能力的一句話"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint solid 2px"
  arrow_async: "Mint dashed 2px"
groups:
  - id: "ingest_layer"
    label: "Ingest Layer"
nodes:
  - id: "device_gateway"
    label: "Device Gateway"
    subtitle: "MQTT / HTTP"
    type: "service"
    group: "ingest_layer"
    status: "new"
edges:
  - from: "device_gateway"
    to: "message_queue"
    label: "async ingest"
    style: "dashed"
    meaning: "async"
```

## Node Status

- `existing`：前面版本已出現的節點，Deep Teal `#2E7D86` 2 px 邊框。
- `new`：本幕新增能力，Mint `#97E8D6` 4 px 邊框，右上角加 `NEW`。
- `warning`：本幕要提醒會壞或需監控的節點，保留既有邊框並加 Coral Red `#E8634F` 故障標記。warning 節點靠 Coral Red 閃電/故障 icon 與 SCENARIO kicker 區隔；同一頁若同時出現，icon 是辨識依據。

## Edge Rules

- `style: solid` 用於同步請求、讀取、寫入與主要資料流。
- `style: dashed` 用於非同步、同步延遲、通知、健康檢查、Failover、可觀察性 scrape。
- `meaning` 只能使用穩定語意：`sync`、`async`、`read`、`write`、`failover`、`health`、`observe`。

## Diagram Types

### `c4_container`（C4 容器圖）

描述系統的主要容器（Services、Databases、Queues、Gateways）及其交互關係。版本標 `白皮書 vN`。

用於幕 3（系統設計 v3）及之後需要展示完整系統邊界的頁面。

### `domain_model`（領域模型 ER）

描述業務實體（Entity）及其關聯（Association / Aggregation）。不包含技術實現細節；聚焦於領域語言。

用於幕 2（建模與選型 v2）的領域建模頁面。

### `data_flow`（關鍵資料流）

描述特定業務場景的資料移動路徑，包含 ingest、query、alert 觸發路徑、queue 非同步步驟、cache hit/miss 分支。

用於幕 3–5 需要精確說明讀寫語意的頁面。

## Rendering Constraints

- 不渲染 `Diagram Spec` 之外的節點或箭頭。
- v4（風險與韌性）之後可將多個同類元件合併成 group，例如 `Consumer × N`、`Worker Pool`，避免圖面過密。
- 「補白皮書」練習頁不是正式產出物圖頁，即使文字提到 vN，也應使用 `rendering_mode: image_prompt`。
- 最終圖上所有節點文字使用 JetBrains Mono；中文 subtitle 使用 Noto Sans TC。
- 正式產出物圖頁必須搭配 `Technical Flow Details`，確認讀寫路徑、同步/非同步、失敗處理沒有被簡化掉。
- 若圖中節點對應實際產品或套件，logo 只放在旁邊的工具/案例區，不直接取代架構節點標籤。
- 版本號標於圖右下角：`白皮書 vN`，Caption 規格，JetBrains Mono。

## Flow Detail Expectations

各白皮書版本對應的圖細節要求：

### v1（幕 1：需求與約束）
本版多為表格與文字形式（PRD、NFR 矩陣、約束清單），可無程式化圖。若有圖，以需求維度的高層示意為主，不要求完整拓樸。v1 需求類產出物頁若無正式圖，`Diagram Spec` 填 `not_applicable: true`（與 0_STYLE_GUIDE 自查清單一致）。

### v2（幕 2：建模與選型）
必須包含 `domain_model` ER 圖：核心業務實體（Device、Metric、Alert、Tenant 等）及其關聯。ADR-001 技術選型頁可附文字比較表，不強制程式化圖。

### v3（幕 3：系統設計）
必須包含 `c4_container` + `data_flow` 兩種圖。

C4 圖須涵蓋：Device → Gateway → Queue → Consumer → TimescaleDB → API → Dashboard 的完整容器。

資料流須涵蓋：
- **Ingest path**：Device 上報 → MQTT/HTTP Gateway → Kafka topic → Consumer → 寫入 TimescaleDB
- **Query path**：Dashboard → API → Redis cache（hit/miss）→ TimescaleDB 回查
- **Alert path**：Consumer 判斷閾值 → Alert Service → Notification（非同步 dashed）

### v4（幕 4：風險與韌性）
必須在 v3 圖基礎上標記 `warning` 節點（SPOF、高延遲點）。

須說明：
- Kafka Consumer Group 的 rebalance / lag 風險
- TimescaleDB Primary 的 SPOF 與 Replica 讀取分離
- Redis cache 失效時的 DB 回打（thundering herd 風險）
- Gateway 高水位的背壓（backpressure）策略

### v5（幕 5：落地與演進）
必須包含可觀察性資料流（`data_flow` + `observe` 語意邊）。

須說明：
- Prometheus scrape path：各服務 `/metrics` → Prometheus → Grafana
- OpenTelemetry trace path：Gateway → Consumer → API → Tempo/Jaeger
- 日誌聚合：各服務 stdout → Fluentd/Loki
- 演進路線：單體 → 微服務拆分邊界（bounded context）
