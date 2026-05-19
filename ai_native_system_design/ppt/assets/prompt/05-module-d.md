# Module D · 設計模式與進階架構 · 圖像 Prompts

> Style guide: [`./0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md)
> Save images to: `openslide/slides/05-module-d-patterns/assets/`

**本章圖像**：4 張 · P1 × 4

---

## Image 01 · 20 設計模式星座圖

- **Type**: E · Constellation Map
- **Priority**: P1
- **Save as**: `openslide/slides/05-module-d-patterns/assets/D_patterns_map.png`
- **Used in**: 05-D P04
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook / consulting style. Flat 2D, NO 3D, NO cartoon.

  Theme: 20 design patterns organized as a constellation map showing 5 categories.

  Background: warm cream #F5F1E8.

  5 cluster zones (dashed circles), each contains pattern nodes:

  Cluster 1 (terracotta #D97757): '創建型 / Creational'
  - Factory · Builder · Singleton

  Cluster 2 (olive #A1813F): '結構型 / Structural'
  - Adapter · Decorator · Facade · Proxy · Composite

  Cluster 3 (sage green #5B9770): '行為型 / Behavioral'
  - Strategy · Observer · State · Command · Template Method · Chain of Responsibility

  Cluster 4 (slate teal #5B7570): '領域 / Domain'
  - Repository · Specification

  Cluster 5 (warm brown #8B6F47): '分散式 / Distributed'
  - Saga · Event Sourcing · CQRS · Outbox

  Each pattern shown as a small rounded rectangle node within its cluster.

  Bottom annotation: '20 patterns · 5 categories / 20 個模式·5 大類'.

  Lines: dark brown #2A2520, 2px, dashed cluster boundaries.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 02 · Saga vs ES vs CQRS 對比

- **Type**: D · Three Swimlanes
- **Priority**: P1
- **Save as**: `openslide/slides/05-module-d-patterns/assets/D_event_trio.png`
- **Used in**: 05-D P07
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook style. Flat 2D, NO 3D, NO cartoon.

  Theme: Comparison of 3 event-driven patterns: Saga, Event Sourcing, CQRS.

  Background: warm cream #F5F1E8.

  3 horizontal swimlanes, each shows a mini concept:

  Swimlane 1 (terracotta #D97757): 'Saga / 補償事務'
  - Sequence: Service A → B → C → fail → Compensate B → Compensate A
  - Boxes connected by arrows, red arrows for compensation
  - Note: '跨服務事務 / Cross-service transaction'

  Swimlane 2 (olive #A1813F): 'Event Sourcing / 事件溯源'
  - Time-ordered event log: Event1 → Event2 → Event3 → Event4
  - Append-only stream visualization
  - Note: '存事件不存狀態 / Store events, not state'

  Swimlane 3 (sage green #5B9770): 'CQRS / 命令查詢分離'
  - Top: Write Model (Command) → Event Store
  - Bottom: Read Model (Query) → Optimized Views
  - Two separate paths
  - Note: '讀寫模型分開 / Separate read & write'

  Bottom annotation: 'When to use 重武器 / Heavy weapons - only when needed'.

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 03 · API 4 風格象限

- **Type**: D · 2x2 Quadrant Matrix
- **Priority**: P1
- **Save as**: `openslide/slides/05-module-d-patterns/assets/D_api_quadrant.png`
- **Used in**: 05-D P09
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual quadrant diagram in textbook / consulting style. Flat 2D, NO 3D, NO cartoon.

  Theme: 4 API styles plotted on a 2x2 matrix.

  Background: warm cream #F5F1E8.

  Large 2x2 matrix with axes:
  - X-axis: '同步 Synchronous ← → 非同步 Asynchronous'
  - Y-axis: '單向 One-way ↕ 雙向 Bidirectional'

  Each quadrant contains one API style as a rounded rectangle with description:

  Top-left (Sync + One-way): 'REST / RESTful API'
  - 'HTTP · stateless · cacheable'
  - '公開 API · CRUD'
  - Color: terracotta #D97757

  Top-right (Async + One-way): (less common, leave subtle)

  Bottom-left (Sync + Bidirectional): 'gRPC / Protocol Buffers'
  - 'binary · streaming · 強型別'
  - '內部服務'
  - Color: olive #A1813F

  Bottom-right (Async + Bidirectional): 'WebSocket / 雙向長連線'
  - 'persistent · server push'
  - '聊天 · 直播'
  - Color: sage green #5B9770

  Middle (special): 'GraphQL / 查詢式 API'
  - 'client picks fields'
  - 'BFF · 行動端'
  - Color: slate teal #5B7570

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical diagram, consulting deliverable quality.
  ```

---

## Image 04 · 拆服務成本曲線

- **Type**: E · Cost Curve Chart
- **Priority**: P1
- **Save as**: `openslide/slides/05-module-d-patterns/assets/D_service_split_cost.png`
- **Used in**: 05-D P10
- **Aspect**: 1536×1024
- **Tool**: gpt-image-2 @ medium
- **Prompt**:
  ```
  Clean conceptual diagram in textbook / consulting style. Flat 2D, NO 3D, NO cartoon.

  Theme: Cost curve comparing Monolith vs Microservices as team size grows.

  Background: warm cream #F5F1E8.

  A 2D chart with axes:
  - X-axis: 'Team Size / 團隊規模' from 0 → 100+
  - Y-axis: 'Complexity / 複雜度' from low → high

  Two curves drawn:

  Line 1 (terracotta #D97757): 'Monolith / 單體'
  - Starts low, rises steeply after ~30 people
  - Annotation: 'Coordination overhead / 協調成本爆'

  Line 2 (sage green #5B9770): 'Microservices / 微服務'
  - Starts high (initial overhead), grows slowly
  - Annotation: 'Independent teams / 各自獨立'

  Curves cross around ~30-50 team size. Mark the crossover point with a vertical dashed line labeled 'Crossover Point / 切換點 ~30 人'.

  Annotations on each curve at key positions.

  Bottom annotation: 'Pick by team size, not hype / 依規模選，不跟風'.

  Lines: dark brown #2A2520, 2px.
  Labels: bilingual.

  Style: textbook technical chart, consulting deliverable quality.
  ```
