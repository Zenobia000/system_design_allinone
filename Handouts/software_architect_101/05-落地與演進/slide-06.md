---
chapter: "幕 5：落地與演進"
chapter_id: "05"
chapter_slug: "05-落地與演進"
slide: "6"
title: "白皮書 v5：可觀察性"
original_title: "白皮書 v5：可觀察性"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v5"
rendering_mode: "programmatic_diagram"
---

# Slide 06 · 白皮書 v5：可觀察性

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v5 · 落地與演進`
- Title: 白皮書 v5：可觀察性
- Diagram caption: 遙測三本柱資料流 · OpenTelemetry 統一收集 · 演進觸發條件
- Evolution Roadmap (right panel):
  - 現在：modular monolith，單一 codebase
  - 觸發條件（才考慮拆微服務）：
    - 團隊 > 20 人 且 部署衝突頻繁
    - 單一模組需獨立擴展（如 Ingest 流量 10×）
    - 不同模組需要獨立 SLA 合約
  - 更遠：Event Sourcing / CQRS（資料查詢負載 > 寫入 5×）
- Version label (bottom-right of diagram): `白皮書 v5`

## Beginner Anchor
每個服務發出 Logs/Metrics/Traces，OpenTelemetry Collector 統一收，Prometheus 存數字，Grafana 畫圖告警，Tempo/Jaeger 追蹤慢點——這就是完整的可觀察性管線。

## Learning Goal
讓學員看到可觀察性遙測資料流的完整路徑，理解各工具的分工，並掌握演進微服務/Event Sourcing/CQRS 的觸發條件（不靠直覺靠數字）。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v5 · 落地與演進`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for `v5`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- Main diagram (~65% canvas width, left/center): Telemetry data flow, rendered programmatically per Diagram Spec.
  - All node text: JetBrains Mono 500 / 28 px / Warm White.
  - New nodes (OTel Collector, Prometheus, Grafana, Trace Backend): Mint `#97E8D6` 4 px border + `NEW` label.
  - Existing nodes (Ingest API, Processor, Query API): Deep Teal `#2E7D86` 2 px border.
  - Observe edges: Mint `#97E8D6` dashed 2 px.
  - Version label bottom-right of diagram: `白皮書 v5`, JetBrains Mono / 26 px / Mint `#97E8D6`.
- Right panel (~30% canvas width): Evolution roadmap card.
  - Background: `#172A40`, rounded 12 px, Mint `#97E8D6` 1 px border.
  - Title: `演進路線` in JetBrains Mono / 24 px / Mint `#97E8D6`.
  - Row 1: `現在` label (Forest Green `#5B9770`) + `modular monolith，單一 codebase`.
  - Row 2: trigger conditions — `拆微服務條件：` (Coral Red label) + 3 sub-bullets in Noto Sans TC 500 / 22 px / Warm White.
  - Row 3: `更遠：` label + `Event Sourcing / CQRS` with trigger condition.
- Logo strip (below evolution panel): OpenTelemetry, Prometheus, Grafana — official SVG assets, 40 px height, on Warm White pill background.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
diagram_type: "data_flow"
whitepaper_version: "v5"
focus: "IoT 監控系統可觀察性遙測資料流：三個服務透過 OpenTelemetry SDK 輸出 Logs/Metrics/Traces，經 OTel Collector 分發至 Prometheus/Grafana/Trace Backend"
rendering_rules:
  canvas: "1920x1080"
  safe_margin_px: 96
  background: "Deep Navy #152238"
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px + NEW label"
  warning_node_marker: "Coral Red #E8634F lightning marker"
  arrow_sync: "Mint #97E8D6 solid 2px"
  arrow_async: "Mint #97E8D6 dashed 2px"
  arrow_observe: "Mint #97E8D6 dashed 2px (observe meaning)"
  node_text_font: "JetBrains Mono 500 28px Warm White #F4F1EA"
  version_label: "白皮書 v5, JetBrains Mono Caption, bottom-right of diagram"

groups:
  - id: "services"
    label: "Services (Monolith Packages)"
  - id: "telemetry_pipeline"
    label: "Telemetry Pipeline"
  - id: "observability_backends"
    label: "Observability Backends"

nodes:
  - id: "ingest_api"
    label: "Ingest API"
    subtitle: "FastAPI · /metrics endpoint"
    type: "service"
    group: "services"
    status: "existing"
    note: "v3/v4 既有服務。v5 新增：OTel SDK 接入，輸出 Logs（結構化 JSON）、Metrics（request_count, latency_p99, kafka_produce_latency）、Traces（每筆 POST /v1/readings 的完整 span）。"

  - id: "processor"
    label: "Processor"
    subtitle: "Consumer Group · /metrics"
    type: "service"
    group: "services"
    status: "existing"
    note: "v3/v4 既有服務。v5 新增：OTel SDK 接入，輸出 Metrics（consumer_lag, tsdb_write_latency, alert_triggered_count）、Traces（消費→寫入 TSDB 的 span）、Logs（告警觸發事件記錄）。"

  - id: "query_api"
    label: "Query API"
    subtitle: "FastAPI · /metrics endpoint"
    type: "service"
    group: "services"
    status: "existing"
    note: "v3/v4 既有服務。v5 新增：OTel SDK 接入，輸出 Metrics（cache_hit_rate, query_latency_p99）、Traces（GET /v1/devices/.../readings 的完整 span，含 Redis GET 和 TSDB fallback 子 span）。"

  - id: "otel_collector"
    label: "OTel Collector"
    subtitle: "OpenTelemetry Collector"
    type: "service"
    group: "telemetry_pipeline"
    status: "new"
    note: "v5 新增。統一接收三個服務的 Logs、Metrics、Traces（OTLP 協定）。Pipeline：Receivers → Processors（batch, filter）→ Exporters（分發至後端）。"

  - id: "prometheus"
    label: "Prometheus"
    subtitle: "Metrics scrape + store"
    type: "database"
    group: "observability_backends"
    status: "new"
    note: "v5 新增。Prometheus 以 scrape 模式從 OTel Collector 或各服務 /metrics endpoint 拉取指標。儲存時序數值，供 Grafana 查詢與告警規則評估。"

  - id: "grafana"
    label: "Grafana"
    subtitle: "Dashboard + Alert Rules"
    type: "frontend"
    group: "observability_backends"
    status: "new"
    note: "v5 新增。查詢 Prometheus 指標，顯示 IoT 監控儀表板（Consumer lag、API P99、TSDB write rate）。告警規則：consumer_lag > 10,000 → PagerDuty；api_p99 > 8s → Slack 通知。"

  - id: "trace_backend"
    label: "Trace Backend"
    subtitle: "Tempo / Jaeger"
    type: "database"
    group: "observability_backends"
    status: "new"
    note: "v5 新增。接收 OTel Collector 轉發的 Trace spans，儲存分散式追蹤記錄。可查詢某次請求跨越 Ingest API → Processor → TSDB 的完整鏈路及各 span 延遲。"

  - id: "log_backend"
    label: "Log Backend"
    subtitle: "Loki / stdout → Fluentd"
    type: "database"
    group: "observability_backends"
    status: "new"
    note: "v5 新增。各服務 stdout 結構化 JSON logs 由 Fluentd（或 Promtail）收集，轉發至 Loki（或 Elasticsearch）。Grafana 可直接查詢 Loki logs，與 Metrics/Traces 關聯。"

edges:
  # Services → OTel Collector (observe: OTLP push)
  - from: "ingest_api"
    to: "otel_collector"
    label: "OTLP (Logs + Metrics + Traces)"
    style: "dashed"
    meaning: "observe"
    note: "Ingest API 透過 OpenTelemetry SDK，以 OTLP/gRPC 或 OTLP/HTTP 協定將三類遙測訊號推送至 OTel Collector。"

  - from: "processor"
    to: "otel_collector"
    label: "OTLP (Logs + Metrics + Traces)"
    style: "dashed"
    meaning: "observe"
    note: "Processor 同樣透過 OTel SDK 推送 consumer_lag、tsdb_write_latency、告警觸發事件 Logs。"

  - from: "query_api"
    to: "otel_collector"
    label: "OTLP (Logs + Metrics + Traces)"
    style: "dashed"
    meaning: "observe"
    note: "Query API 推送 cache_hit_rate、query_latency_p99，以及含 Redis + TSDB 子 span 的完整 Trace。"

  # OTel Collector → Backends (observe: export)
  - from: "otel_collector"
    to: "prometheus"
    label: "Metrics export (scrape / remote_write)"
    style: "dashed"
    meaning: "observe"
    note: "OTel Collector 以 Prometheus remote_write 或 expose /metrics endpoint 讓 Prometheus scrape。指標包含：request_count、latency_p99、consumer_lag、cache_hit_rate 等。"

  - from: "otel_collector"
    to: "trace_backend"
    label: "Traces export (OTLP)"
    style: "dashed"
    meaning: "observe"
    note: "OTel Collector 將 Trace spans 轉發至 Tempo 或 Jaeger（OTLP 格式）。用於跨服務慢點追蹤與根因分析。"

  - from: "otel_collector"
    to: "log_backend"
    label: "Logs export (OTLP / Loki)"
    style: "dashed"
    meaning: "observe"
    note: "OTel Collector 將結構化 JSON Logs 轉發至 Loki（或 Fluentd → Elasticsearch）。Grafana 直接查詢 Loki。"

  # Grafana reads from Prometheus + Trace + Log backends
  - from: "grafana"
    to: "prometheus"
    label: "PromQL query"
    style: "solid"
    meaning: "read"
    note: "Grafana 查詢 Prometheus 取得時序指標，呈現 IoT 儀表板。同時設定 Alerting Rules：consumer_lag > 10,000 觸發 PagerDuty；api_p99 > 8s 觸發 Slack。"

  - from: "grafana"
    to: "trace_backend"
    label: "Trace query (TraceQL)"
    style: "solid"
    meaning: "read"
    note: "Grafana 查詢 Tempo/Jaeger，顯示特定 Trace 的完整 span 瀑布圖，用於慢請求根因分析。"

  - from: "grafana"
    to: "log_backend"
    label: "LogQL query"
    style: "solid"
    meaning: "read"
    note: "Grafana 查詢 Loki，呈現服務 Logs，支援與 Metrics/Traces 的關聯（Grafana Unified Observability）。"
```

## Logo Assets

此頁面的可觀察性後端對應以下技術產品，logo 放在演進路線面板下方工具識別區（不取代節點標籤）：

| 名稱 | Expected Asset Path | 可從 101 重用 | 備註 |
|------|---------------------|--------------|------|
| OpenTelemetry | `assets/logos/observability/opentelemetry.svg` | 否，需補抓 | Official source: opentelemetry.io/community/marketing-guidelines/; CNCF graduated project logo |
| Prometheus | `assets/logos/observability/prometheus.svg` | 否，需補抓 | Official source: prometheus.io/docs/introduction/media/; CNCF graduated project logo |
| Grafana | `assets/logos/observability/grafana.svg` | 否，需補抓 | Official source: grafana.com/about/brand/; Grafana Labs brand kit |

**QA 阻斷項（Logo）：**
- `⚠ BLOCKER: OpenTelemetry logo asset (assets/logos/observability/opentelemetry.svg) 尚未取得，QA 階段需補抓後才可最終輸出`
- `⚠ BLOCKER: Prometheus logo asset (assets/logos/observability/prometheus.svg) 尚未取得，QA 階段需補抓後才可最終輸出`
- `⚠ BLOCKER: Grafana logo asset (assets/logos/observability/grafana.svg) 尚未取得，QA 階段需補抓後才可最終輸出`

**備選方案（Logo 素材未取得前）：** 以文字 pill 替代 logo strip，例如 `[OpenTelemetry]` `[Prometheus]` `[Grafana]`，Mint `#97E8D6` text on `#1E3450` background, rounded 8 px.

**Logo Strip 規格**：
- 位置：演進路線面板下方識別區，不與節點標籤重疊
- 高度：40 px（等比例縮放）
- 間距：水平 20 px
- 背景：Warm White `#F4F1EA` 小底板，padding 12 px，rounded 8 px（確保深底頁可見）
- 最多 3 個（本頁 3 個：OpenTelemetry、Prometheus、Grafana）

## Technical Flow Details

### 可觀察性遙測資料流（v5 新增）

#### 1. 服務側接入（OTel SDK）

每個服務（Ingest API、Processor、Query API）安裝 OpenTelemetry Python SDK：

```python
# shared/telemetry.py
from opentelemetry import trace, metrics
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter

# 初始化 Tracer + Meter，Exporter 指向 OTel Collector
tracer_provider = TracerProvider()
tracer_provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter(endpoint="otel-collector:4317")))
meter_provider = MeterProvider(metric_readers=[PeriodicExportingMetricReader(OTLPMetricExporter(...))])
```

三類訊號：
- **Logs**：`logging` 模組接入 OTel Logs Bridge，輸出結構化 JSON（timestamp, service_name, trace_id, span_id, severity, message）
- **Metrics（各服務）**：
  - Ingest API：`ingest_request_total`（counter）、`ingest_latency_p99`（histogram）、`kafka_produce_latency`
  - Processor：`consumer_lag`（gauge）、`tsdb_write_latency`（histogram）、`alert_triggered_total`
  - Query API：`cache_hit_rate`（gauge）、`query_latency_p99`（histogram）
- **Traces**：每個 FastAPI endpoint 自動產生 span；Kafka consume/produce 操作手動加 span；TimescaleDB query 自動 instrumented（opentelemetry-instrumentation-sqlalchemy）

#### 2. OpenTelemetry Collector Pipeline

OTel Collector 設定（`otel-collector-config.yaml`）：
```yaml
receivers:
  otlp:
    protocols:
      grpc:  # port 4317
        endpoint: "0.0.0.0:4317"

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024
  resource:
    attributes:
      - key: environment
        value: "production"
        action: insert

exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"  # Prometheus scrape endpoint
  otlp/tempo:
    endpoint: "tempo:4317"   # Trace backend
  loki:
    endpoint: "http://loki:3100/loki/api/v1/push"  # Log backend

service:
  pipelines:
    traces:  receivers: [otlp]  processors: [batch, resource]  exporters: [otlp/tempo]
    metrics: receivers: [otlp]  processors: [batch]             exporters: [prometheus]
    logs:    receivers: [otlp]  processors: [batch]             exporters: [loki]
```

#### 3. Prometheus scrape path

Prometheus 設定 scrape job 指向 OTel Collector 的 `:8889/metrics`：
- Scrape interval: 15s
- 保留時序數值，供 Grafana 查詢
- 關鍵 Alerting Rules（在 Prometheus 或 Grafana 設定）：
  - `consumer_lag > 10000` for 2 minutes → severity: critical → PagerDuty
  - `query_latency_p99 > 8` (秒) for 1 minute → severity: warning → Slack
  - `ingest_request_total rate drop 50%` in 5 minutes → severity: critical（設備大量斷線）

#### 4. Grafana Dashboard + Alert

Grafana 連接三個資料源（Prometheus、Tempo、Loki），提供統一 UI：
- **IoT 監控主儀表板**：Consumer lag 趨勢、Ingest 吞吐量、Query P99、TSDB write rate、告警觸發次數
- **Trace 查詢**：從儀表板的慢查詢 panel 直接跳到對應的 Trace span 瀑布圖
- **Log 關聯**：告警面板關聯 Loki，點擊告警看對應時間的 service logs
- **Alert Contact Points**：PagerDuty（critical）、Slack（warning）

#### 5. 演進路線的觸發條件

從 modular monolith → 微服務的決策樹：

**現在（v5，6 人團隊 MVP）：**
- 維持 modular monolith（惰性原則：沒有觸發條件就不拆）

**觸發條件 1 — 拆微服務：**
- 團隊規模 > 20 人，且不同 package 由不同子團隊擁有，部署衝突頻繁（每週 > 2 次）
- 或：單一 package 需要獨立擴展（如 Ingest 吞吐量要求 10× 但 Query/Processor 不變）
- 或：不同 package 有不同的 SLA 合約要求（Ingest 99.99%，Query 99.9%）
- 拆分邊界：沿著 ingest / processor / query 的 package 邊界切——這是 v5 monorepo 結構的設計初衷

**觸發條件 2 — Event Sourcing：**
- 有業務需求需要完整的事件歷史回溯（如告警審計、法規要求、狀態重建）
- 或：多個下游消費者需要根據同一 reading 事件做不同處理（目前只有 Alert，但未來可能有 Analytics、Billing）
- 不適用本系統當前階段：35 GB/天的 TimescaleDB 已足夠回溯歷史讀數

**觸發條件 3 — CQRS：**
- 讀取負載 > 寫入負載 5× 以上，且讀取的資料模型與寫入模型差異很大（如需要多種聚合視圖）
- 當前 Redis cache-aside 已足夠處理讀取需求（cache hit P99 < 10ms），CQRS 屬過度設計

#### 6. 可觀察性與 $20,000/hr 停機成本的關係

- **無監控場景（目前痛點）**：故障發現時間 ~30 分鐘（靠用戶回報）× $20,000/hr = 每次停機損失 ~$10,000
- **有 Grafana + Prometheus 場景**：consumer_lag 告警 + api_p99 告警，故障發現時間 ~1 分鐘 = 損失壓縮至 ~$333
- **年度節省**：假設每年 3 次停機（業界平均），節省 3 × ($10,000 - $333) = **~$28,000**
- 監控工具成本：Grafana Cloud free tier（3 個服務）≈ $0–$50/月，Prometheus 自建 ≈ $100/月雲費
- ROI 非常明確：$1,200/年投入，$28,000/年節省

## VCRE Scorecard
not_applicable — this is an artifact slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v5 · 落地與演進" Mint text on Deep Navy, rounded capsule 34 px. Title "白皮書 v5：可觀察性" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content: left/center (~65% width) — telemetry data flow diagram rendered programmatically (topology from Diagram Spec). Three service nodes (Ingest API, Processor, Query API) on left, Deep Teal #2E7D86 2 px border (existing), with dashed Mint #97E8D6 arrows pointing right toward OTel Collector (center, Mint 4 px border + NEW label). OTel Collector fans out dashed arrows to three backend nodes on right: Prometheus (Mint 4 px NEW), Trace Backend/Tempo (Mint 4 px NEW), Log Backend/Loki (Mint 4 px NEW). Grafana node below backends with solid Mint arrows reading from all three. All nodes: JetBrains Mono 28 px Warm White labels, Deep Navy fill, rounded 8 px. Dashed edges = observe semantic. Bottom-right of diagram: "白皮書 v5" JetBrains Mono 26 px Mint. Right side (~30% width): evolution roadmap card with #172A40 background, Mint 1 px border, rounded 12 px, title "演進路線" JetBrains Mono 24 px Mint, rows: Forest Green "現在 monolith", Coral Red "拆微服務條件：" with 3 sub-bullets, Mint "更遠 Event Sourcing/CQRS". Below roadmap: 3-logo strip (OpenTelemetry, Prometheus, Grafana) on Warm White pill 40 px. Bottom-right canvas: logo-light.png 64 px. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra nodes or arrows beyond those defined in the Diagram Spec.
- Do not generate fake, approximate, or AI-invented brand logos — logos must be composited from official assets separately.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the "白皮書 v5" version label on the diagram.
- Do not omit the evolution roadmap panel on the right side.
- Do not show microservices as the "current" state — monolith is the current state with trigger conditions for future evolution.
- Do not place logo assets inside diagram nodes — logos go in the strip only.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
白皮書 v5 的第二個產出：可觀察性資料流 + 演進路線圖。三個服務（Ingest API、Processor、Query API）透過 OpenTelemetry SDK 同時輸出 Logs、Metrics、Traces，OTel Collector 統一接收後分發：Metrics 給 Prometheus，Traces 給 Tempo/Jaeger，Logs 給 Loki。Grafana 查詢全部三個後端，一個 UI 就能看到儀表板、告警規則、Trace 瀑布圖、Log 關聯。這樣的監控架構讓故障發現時間從 30 分鐘（靠用戶回報）壓到 1 分鐘（consumer_lag 告警），直接對著 $20,000/hr 停機成本說話。演進路線不是「未來可能要做的事」，是「有觸發條件才做」——現在 6 人 monolith 不拆；團隊 > 20 人、部署衝突頻繁、單一模組需獨立擴展，才考慮拆微服務，且沿著 v5 monorepo 的 package 邊界切。Event Sourcing 和 CQRS 更遠，有業務觸發條件再評估。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v5：可觀察性" — 9 Chinese characters (CJK only), within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v5"` in frontmatter (artifact slide).
- [ ] `rendering_mode: "programmatic_diagram"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v5 · 落地與演進` present below kicker.
- [ ] Diagram Spec is a complete YAML block (not `not_applicable`).
- [ ] Diagram Spec defines `diagram_type: "data_flow"`.
- [ ] 7 nodes defined: ingest_api, processor, query_api (existing), otel_collector, prometheus, grafana, trace_backend, log_backend (new).
- [ ] All 4 new nodes (otel_collector, prometheus, grafana, trace_backend, log_backend) have `status: "new"`.
- [ ] All 3 service nodes (ingest_api, processor, query_api) have `status: "existing"`.
- [ ] Edges from services → otel_collector: 3 edges, all dashed/observe.
- [ ] Edges from otel_collector → backends: 3 edges (prometheus, trace_backend, log_backend), all dashed/observe.
- [ ] Edges from grafana → backends: 3 edges (prometheus, trace_backend, log_backend), all solid/read.
- [ ] All observe edges use `meaning: "observe"` with dashed style.
- [ ] Technical Flow Details covers: OTel SDK per-service metrics list, OTel Collector pipeline YAML, Prometheus scrape + alert rules, Grafana dashboard description, evolution roadmap with quantified trigger conditions, ROI calculation vs $20,000/hr downtime.
- [ ] Evolution roadmap includes trigger conditions with numbers (> 20 人, > 10× ingest, etc.).
- [ ] Logo Assets section lists all 3 observability tools: OpenTelemetry, Prometheus, Grafana.
- [ ] All 3 logos flagged as "需補抓" with expected asset paths.
- [ ] QA BLOCKER items present for all 3 unacquired logos.
- [ ] Version label `白皮書 v5` appears in diagram bottom-right.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] ⚠ BLOCKER: OpenTelemetry logo (`assets/logos/observability/opentelemetry.svg`) must be acquired before final output.
- [ ] ⚠ BLOCKER: Prometheus logo (`assets/logos/observability/prometheus.svg`) must be acquired before final output.
- [ ] ⚠ BLOCKER: Grafana logo (`assets/logos/observability/grafana.svg`) must be acquired before final output.
