# Module C · 品質屬性與分散式五支柱 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/04-module-c-ilities/assets/`

**本章圖像**：6 張 v2（含雙語標籤的新版） · P0 × 6

> 注：原 v1（C_*.png 無標籤版）已被 v2 取代，但保留檔案作對比。

---

## Image 01 · 10 *-ilities 放射雷達

- **Type**: E · Radial Diagram
- **Priority**: P0
- **Save as**: `openslide/slides/04-module-c-ilities/assets/C_ilities_radial_v2.png`
- **Used in**: 04-C P03
- **Aspect**: 1024×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual technical diagram in consulting / textbook style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: 10 Quality Attributes (*-ilities) as a radial / spider diagram showing system design quality dimensions.

  Background: warm cream #F5F1E8.
  Layout: central hub with 10 radiating spokes, each spoke ends with a labeled bubble.

  Center: small triangle labeled 'Trade-off Triangle / 取捨三角'.

  10 spokes around (clockwise from top):
  1. 'Scalability / 可擴展性' (terracotta #D97757)
  2. 'Availability / 可用性' (terracotta)
  3. 'Reliability / 可靠性' (olive #A1813F)
  4. 'Performance / 效能' (olive)
  5. 'Security / 安全性' (sage #5B9770)
  6. 'Maintainability / 可維護性' (sage)
  7. 'Observability / 可觀測性' (slate #5B7570)
  8. 'Portability / 可移植性' (slate)
  9. 'Testability / 可測試性' (muted brown #8B6F47)
  10. 'Cost-efficiency / 成本效益' (muted brown)

  Spokes are dark brown #2A2520 lines, 2px.

  Bottom annotation: '判斷力 · Pick 2-3, sacrifice rest / 全要 = 全失'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 02 · 分散式五大支柱

- **Type**: D · Five Parallel Columns
- **Priority**: P0
- **Save as**: `openslide/slides/04-module-c-ilities/assets/C_five_pillars_v2.png`
- **Used in**: 04-C P04
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual technical diagram in consulting deck / textbook. Flat 2D vector illustration. NO 3D, NO isometric, NO cartoon, NO Greek pillars.

  Theme: Five Pillars of Distributed Systems (分散式系統五大支柱) shown as 5 parallel labeled blocks.

  Background: warm cream #F5F1E8.
  Five vertical columns side-by-side, each column is a rounded rectangle with distinct color tier:
  1. Pillar 1: terracotta #D97757 fill, labeled '鬆散耦合 / Loose Coupling', icon: chain link with break
  2. Pillar 2: olive #A1813F fill, labeled '無狀態 / Stateless', icon: feather floating
  3. Pillar 3: sage green #5B9770 fill, labeled '快取分層 / Cache Layering', icon: stacked database cylinders
  4. Pillar 4: slate teal #5B7570 fill, labeled '非同步通訊 / Async Comm', icon: queued arrows
  5. Pillar 5: warm brown #8B6F47 fill, labeled '可觀測性 / Observability', icon: eye with chart

  Below each column add small explainer text in dark brown:
  1. '模組可獨立部署 / Independent deploy'
  2. '任意擴展 / Easy to scale'
  3. '抗讀放大 / Read amplification'
  4. '削峰容錯 / Buffering & resilience'
  5. '出事能定位 / Locate failures'

  Lines: dark brown #2A2520, 2px.
  Labels: clean sans-serif, bilingual Traditional Chinese + English.

  At top center, large header text 'Five Pillars / 分散式系統五大支柱'.
  At bottom center, mnemonic in large stylized font: '鬆 · 無 · 快 · 非 · 觀'

  Style: educational textbook + consulting deliverable. Pure schematic clarity.
  ```

---

## Image 03 · 1K→100K QPS 三階段演進

- **Type**: A · Architecture Evolution
- **Priority**: P0
- **Save as**: `openslide/slides/04-module-c-ilities/assets/C_qps_evolution_v2.png`
- **Used in**: 04-C P05
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook / consulting style. Flat 2D, NO 3D, NO cartoon.

  Theme: System architecture evolution from 1K → 10K → 100K QPS shown as 3 stages side-by-side.

  Background: warm cream #F5F1E8.

  3 vertical zones separated by dashed lines, each a complete mini architecture:

  Stage 1 (left): 'Stage 1 · 1K QPS · MVP'
  - Cloud 'CDN'
  - Rounded rectangle 'App × 2'
  - Cylinder 'PostgreSQL'
  - Vertical arrows

  Stage 2 (middle): 'Stage 2 · 10K QPS · Read split'
  - Cloud 'CDN'
  - Rounded rectangle 'LB + App × 6'
  - Splits to: Cylinder 'PG Primary' + Cylinder 'Read Replica × 2' + Hexagon 'Redis Cluster'

  Stage 3 (right): 'Stage 3 · 100K QPS · Sharded'
  - Cloud 'CDN + WAF'
  - Rounded rectangle 'LB + App × 50'
  - 3 Cylinders 'PG Shards' + 3 Hexagons 'Redis' + Hexagon 'Kafka'
  - Cloud 'Multi-region active'

  Bottom arrow showing direction: '→ Scale → 演進方向'.

  Element fills: terracotta #D97757, olive #A1813F, sage green #5B9770.
  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 04 · 4 種 Cache 模式

- **Type**: D · 2x2 Pattern Comparison
- **Priority**: P0
- **Save as**: `openslide/slides/04-module-c-ilities/assets/C_cache_patterns_v2.png`
- **Used in**: 04-C P06
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual technical diagram in consulting / textbook style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: 4 cache patterns shown as a 2x2 grid comparison.

  Background: warm cream #F5F1E8.
  Element fills: terracotta #D97757 services, sage green #5B9770 cache, olive #A1813F database.
  Lines: dark brown #2A2520, 2px, arrows showing direction.
  Labels: bilingual.

  2x2 grid layout, each cell shows a mini flow diagram:

  Top-left: 'Cache-aside / 旁路快取'
  - App ↔ Cache (read first)
  - App → DB (on miss, then update cache)
  - Note: '預設模式 / Default'

  Top-right: 'Read-through / 讀穿快取'
  - App → Cache (cache fetches from DB)
  - Cache ↔ DB
  - Note: '簡化讀邏輯 / Simpler read'

  Bottom-left: 'Write-through / 寫穿快取'
  - App → Cache → DB (synchronous double write)
  - Note: '強一致 / Strong consistency'

  Bottom-right: 'Write-behind / 寫後快取'
  - App → Cache (immediate)
  - Cache → DB (async, dashed arrow)
  - Note: '高吞吐 / High throughput'

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 05 · 可靠性 5 件套鏈

- **Type**: C · Process Chain
- **Priority**: P0
- **Save as**: `openslide/slides/04-module-c-ilities/assets/C_reliability_chain_v2.png`
- **Used in**: 04-C P07
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual technical diagram in consulting / textbook style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: 5 reliability patterns shown as a horizontal chain handling a request.

  Background: warm cream #F5F1E8.
  Lines: dark brown #2A2520, 2px arrows.
  Labels: bilingual.

  Left-to-right chain of 5 stages, each a rounded rectangle with icon:

  1. 'Timeout / 超時' (terracotta #D97757) - icon: stopwatch
     Annotation below: '上游 3s · 下游 500ms'
  2. Arrow to 'Retry / 重試' (terracotta) - icon: circular arrow with jitter wave
     Annotation: '3 次 + 指數退避 + jitter'
  3. Arrow to 'Circuit Breaker / 斷路器' (olive #A1813F) - icon: electrical breaker
     Annotation: '50% 錯誤率 → open 30s'
  4. Arrow to 'Bulkhead / 隔離艙' (sage green #5B9770) - icon: ship compartments
     Annotation: 'thread pool 分隔'
  5. Arrow to 'Rate Limiter / 限流' (slate #5B7570) - icon: filter funnel
     Annotation: 'token bucket 1000 RPS'

  At input (far left): small circle 'Request / 請求'
  At output (far right): rounded rectangle 'Downstream Service / 下游服務'

  Bottom large quote: '可靠性 = 壞了不雪崩，不是不壞 / Resilience: graceful degradation, not no failure'.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 06 · MLT 觀測三本柱

- **Type**: D · Three Columns
- **Priority**: P0
- **Save as**: `openslide/slides/04-module-c-ilities/assets/C_observability_mlt_v2.png`
- **Used in**: 04-C P08
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual technical diagram in consulting / textbook style. Flat 2D vector, NO 3D, NO isometric, NO cartoon.

  Theme: Observability MLT (Metrics, Logs, Traces) three pillars shown side-by-side.

  Background: warm cream #F5F1E8.
  Three vertical columns, each is a rounded rectangle showing characteristic visualization:

  Left column: 'Metrics / 指標' (terracotta #D97757)
  - Contains a time-series line chart with gauge icons
  - Subtitle: '系統聚合即時 / Aggregated real-time'
  - Tool tag: 'Prometheus · Datadog · Grafana'

  Middle column: 'Logs / 日誌' (olive #A1813F)
  - Contains rows of text lines with timestamps (mock log lines)
  - Subtitle: '請求明細追溯 / Request-level detail'
  - Tool tag: 'Loki · ELK · CloudWatch'

  Right column: 'Traces / 追蹤' (sage green #5B9770)
  - Contains a span waterfall chart (hierarchical horizontal bars)
  - Subtitle: '跨服務耗時分佈 / Cross-service latency'
  - Tool tag: 'Jaeger · Tempo · OpenTelemetry'

  Bottom horizontal flow: 'SLO → SLI → Alert → Page / 目標 → 量測 → 告警 → 通知'.

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```
