# Ch.5 · Reliability & Ops · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `ppt/assets/diagrams/05-reliability-ops/`

**本章圖像總覽**：15 張 · P1 × 5 · P2 × 8 · P3 × 2 · A × 1 · B × 4 · C × 3 · D × 4 · E × 3

---

## Image 01 · Hero · 章首封面

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `05-reliability-ops/00_overview.md` · 第 1 張（cover）
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a sturdy stone fortress with five concentric defensive walls protecting a small glowing core, weathered guardians stationed at each ring with watchtowers, alarm bells, and signal flags, surrounded by rolling storm clouds and lightning trying to penetrate the walls but being deflected, a moat of running water at the outer edge.
  Composition: central focal point at the glowing core (representing the running system), five visible concentric rings labeled subtly with small icons (lock, scale, shield, envelope, eye), storm clouds in upper third, calm interior in lower two-thirds, ample whitespace around the fortress for breathing room.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 「故障是常態」隱喻 — 多層防線的城堡守護核心系統，呼應 5 個防禦層的核心觀念。

---

## Image 02 · Mental Model · 5 層可靠性防線

- **Type**: E · Mermaid (主) + B · 隱喻備援
- **Priority**: P1
- **Slide**: `05-reliability-ops/00_overview.md` · MENTAL MODEL section
- **Save as (Mermaid 渲染)**: `ppt/assets/diagrams/05-reliability-ops/00_mental_model.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart TB
  subgraph Outer["⑤ OBSERVE · 全局透明"]
    O1[Logs · Metrics · Traces · SLO]
  end
  subgraph L4["④ DELIVER · 訊息可靠送達"]
    D1[Retry · Idempotency · Circuit Breaker · DLQ]
  end
  subgraph L3["③ PROTECT · 過載防護"]
    P1[Rate Limit · Concurrency · Bulkhead · Load Shedding]
  end
  subgraph L2["② COORDINATE · 並發協調"]
    C1[Distributed Lock · Lease · Quorum · Fencing Token]
  end
  subgraph L1["① CONTAIN · 爭用控制"]
    CN1[Atomicity · OCC · Isolation · Backpressure]
  end

  L1 --> L2 --> L3 --> L4 --> Outer

  classDef accent fill:#D97757,stroke:#8B6F47,color:#F5F1E8;
  classDef base fill:#F5F1E8,stroke:#8B6F47,color:#2A2520;
  classDef warn fill:#E8634F,stroke:#8B6F47,color:#F5F1E8;
  classDef ok fill:#5B9770,stroke:#8B6F47,color:#F5F1E8;
  class L1,L2 base
  class L3 accent
  class L4 ok
  class Outer warn
```

**AI Prompt 備援**：
```
A hand-drawn editorial diagram showing five horizontal layered rectangles stacked from bottom to top labeled CONTAIN, COORDINATE, PROTECT, DELIVER, OBSERVE, each layer drawn like an architectural cross-section with subtle textural distinction, an upward arrow on the left side showing escalation from local to global concerns.
Composition: vertical stack centered horizontally, each layer same width but slightly different height, small icon glyphs at right edge of each band (a tiny lock, a tiny scale, a tiny shield, a tiny envelope, a tiny eye), generous whitespace top and bottom.
editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
--ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
```

- **Note**: 5 層防禦由內向外的 mental model，是貫穿全章的骨架圖，必做。

---

## Image 03 · Distributed Lock · 4 經典場景

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `05-reliability-ops/01_distributed_lock.md` · 「4 個經典場景」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/01_distributed_lock_01_scenarios.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A 2x2 grid of hand-drawn illustration vignettes depicting four distributed lock scenarios: top-left a shopping cart with a hourglass timer holding limited-edition items during checkout, top-right a ride-share car with multiple passenger hands reaching for it with one hand grabbing first, bottom-left multiple identical cron-job clock icons all pointing to the same single task box with one arrow allowed through, bottom-right an auction gavel poised over a single bid item with multiple bidder paddles raised.
  Composition: clean 2x2 quadrant layout with thin divider lines, each quadrant has its scenario centered with a tiny caption space below, balanced visual weight across all four cells.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: PDF 點名的 4 個必用場景，視覺化幫助記憶「什麼時候該想到鎖」。

---

## Image 04 · Distributed Lock · 4 方案 Trade-off

- **Type**: D · 對照圖
- **Priority**: P1
- **Slide**: `05-reliability-ops/01_distributed_lock.md` · 「4 種實作方案對比」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/01_distributed_lock_02_tradeoff.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A hand-drawn editorial trade-off chart with two axes: horizontal axis labeled "Consistency" weak to strong, vertical axis labeled "Operational Cost" low to high, four labeled circles plotted at distinct positions — Redis SET NX EX in lower-left (weak consistency, low ops), DB Row Lock in middle-left (strong consistency in single DB, low ops), ZooKeeper / etcd in upper-right (strong consistency, high ops), K8s replicas:1 in lower-far-left as a dashed circle (no concurrency at all).
  Composition: clean 2D scatter plot with thin axis lines, each circle a different size proportional to use frequency, dashed connector hint between Redis and Redlock variant, thin annotation lines pointing from each circle to a tiny caption.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 鎖選型的關鍵 2D 圖：consistency × ops cost，幫助讀者快速決策。

---

## Image 05 · Distributed Lock · Fencing Token 序列圖

- **Type**: E · Mermaid sequence
- **Priority**: P1
- **Slide**: `05-reliability-ops/01_distributed_lock.md` · 「三大陷阱 · GC pause」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/01_distributed_lock_03_fencing.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
sequenceDiagram
  participant C1 as Client 1
  participant C2 as Client 2
  participant L as Lock Service
  participant S as Storage

  C1->>L: acquire lock
  L-->>C1: granted, token=33
  Note over C1: GC pause 30s
  Note over L: TTL expired, lock released
  C2->>L: acquire lock
  L-->>C2: granted, token=34
  C2->>S: write with token=34
  S-->>C2: OK (highest=34)
  Note over C1: woke up
  C1->>S: write with token=33
  S--xC1: REJECT (33 < 34)
```

- **Note**: Fencing token 是 Martin Kleppmann 經典設計，序列圖最能說清「為什麼舊 token 會被拒絕」。

---

## Image 06 · Contention · Pessimistic vs OCC 序列對比

- **Type**: E · Mermaid sequence
- **Priority**: P1
- **Slide**: `05-reliability-ops/02_contention.md` · 「Pessimistic vs Optimistic」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/02_contention_01_pessimistic_vs_occ.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
sequenceDiagram
  participant T as Terry
  participant DB as Database
  participant B as Bohr

  rect rgb(245,241,232)
  Note over T,B: Pessimistic Locking
  T->>DB: SELECT FOR UPDATE seat=1
  DB-->>T: locked, seats=1
  B->>DB: SELECT FOR UPDATE seat=1
  Note over B,DB: BLOCKED, waiting...
  T->>DB: UPDATE seats=0, COMMIT
  DB-->>B: unlocked, seats=0
  B->>DB: sees seats=0, abort
  end

  rect rgb(245,241,232)
  Note over T,B: Optimistic Concurrency Control
  T->>DB: SELECT seats=1, version=7
  B->>DB: SELECT seats=1, version=7
  T->>DB: UPDATE WHERE version=7
  DB-->>T: OK, version=8
  B->>DB: UPDATE WHERE version=7
  DB--xB: 0 rows affected — RETRY
  end
```

- **Note**: 同一個搶票場景兩種解法的對比，序列圖比文字描述快 10 倍理解。

---

## Image 07 · Contention · 5 層解法複雜度遞進

- **Type**: B · 視覺化階梯
- **Priority**: P2
- **Slide**: `05-reliability-ops/02_contention.md` · 「五層解法的複雜度遞進」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/02_contention_02_5_layers.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A hand-drawn ascending staircase with five distinct steps from bottom-left to upper-right, each step labeled with one technique stacked from simplest at bottom to most complex at top: Atomicity / Transaction, Pessimistic Locking, Optimistic Concurrency, SERIALIZABLE Isolation, 2PC / Saga / Distributed Lock, a small wandering hiker figure on the second step looking up, the upper steps drawn slightly larger and with more decorative detail to suggest higher complexity cost.
  Composition: diagonal staircase taking up the lower two-thirds of frame, each step shown in clean side-view perspective, label boxes floating above each step with thin connector lines, ample sky whitespace above to suggest "higher cost", a subtle dotted line on the right showing complexity gradient.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 階梯隱喻幫助記憶「能用簡單就不要用複雜」的口訣。

---

## Image 08 · Contention · Isolation Level × 異常矩陣

- **Type**: D · 對照矩陣
- **Priority**: P2
- **Slide**: `05-reliability-ops/02_contention.md` · 「4 個標準 isolation level」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/02_contention_03_isolation_matrix.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A hand-drawn 4x3 truth-table matrix with rows labeled READ UNCOMMITTED / READ COMMITTED / REPEATABLE READ / SERIALIZABLE on the left, columns labeled Dirty Read / Non-repeatable Read / Phantom Read on top, each cell containing either a checkmark icon (anomaly possible) or an X icon (anomaly prevented), the SERIALIZABLE row entirely Xs, the READ UNCOMMITTED row entirely checkmarks, gradient of safety descending from top to bottom.
  Composition: clean grid table layout filling center, header row in slightly emphasized weight, row labels right-aligned, cells equally sized with single-symbol contents, thin grid lines.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 4 個 isolation level × 3 個異常的經典矩陣，面試常考。

---

## Image 09 · Overload Protection · 6 層防線拼圖

- **Type**: B · 概念架構
- **Priority**: P1
- **Slide**: `05-reliability-ops/03_overload_protection.md` · 「6 層防線」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/03_overload_01_6_layers.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A hand-drawn left-to-right horizontal pipeline diagram showing incoming traffic stream entering from the left passing through six sequential filter gates labeled Rate Limiting, Concurrency Limiting, Queue Leveling, Bulkhead, Load Shedding, with a dashed feedback arrow labeled Backpressure looping from the rightmost back toward the left, each gate drawn like a circular sieve or sluice with progressively smaller flow size, a few "rejected" small request dots peeling off downward at each gate.
  Composition: horizontal flow occupying middle band, traffic source cloud on far left, healthy backend on far right, six gates evenly spaced in between, dashed backpressure arc swinging across the top, dropped request dots falling into a small bucket below each gate.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 6 層防線串接的核心圖，貫穿整個 Overload 章節。

---

## Image 10 · Overload Protection · Token vs Leaky Bucket

- **Type**: D · 雙隱喻對照
- **Priority**: P1
- **Slide**: `05-reliability-ops/03_overload_protection.md` · 「4 種限流演算法」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/03_overload_02_token_vs_leaky.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A hand-drawn split-screen comparison: left half shows a Token Bucket — a wide-open bucket with small token coins dripping in from a faucet at fixed rate above, requests as small envelopes arriving and each grabbing a coin before passing through, the bucket can hold a stack of coins to allow burst; right half shows a Leaky Bucket — a tall bucket with requests pouring in chaotically from above at variable rate, but a single small hole at the bottom letting requests drip out at constant slow rate, excess overflow spills off the top edge.
  Composition: vertical divider line down the center, each side has its bucket centered with label header above and short caption below, balanced visual weight, the two buckets drawn in similar style but distinguished by where the rate-limiting is happening (input on left, output on right).
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: Token vs Leaky Bucket 是面試必考，視覺化記憶比文字快 10 倍。

---

## Image 11 · Reliable Delivery · 6 防線串接

- **Type**: C · 流程圖（Mermaid）
- **Priority**: P1
- **Slide**: `05-reliability-ops/04_reliable_delivery.md` · 「六大防線」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/04_delivery_01_6_lines.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart LR
  REQ([Request]) --> T[① Timeout<br/>快速失敗]
  T --> R[② Retry<br/>對暫時故障]
  R --> B[③ Backoff<br/>+ Jitter]
  B --> I[④ Idempotency<br/>讓重試安全]
  I --> CB[⑤ Circuit Breaker<br/>失敗率熔斷]
  CB --> F[⑥ Failover /<br/>Fallback]
  F --> OK([Delivered])
  CB -.熔斷.-> F

  classDef accent fill:#D97757,stroke:#8B6F47,color:#F5F1E8;
  classDef base fill:#F5F1E8,stroke:#8B6F47,color:#2A2520;
  classDef ok fill:#5B9770,stroke:#8B6F47,color:#F5F1E8;
  class T,R,B,I base
  class CB accent
  class F ok
  class REQ,OK base
```

- **Note**: 6 防線從左到右遞進，每層建立在前一層基礎上，呼應 PDF 的「不是孤立工具」核心觀念。

---

## Image 12 · Reliable Delivery · Circuit Breaker 三狀態圖

- **Type**: E · Mermaid stateDiagram
- **Priority**: P1
- **Slide**: `05-reliability-ops/04_reliable_delivery.md` · 「Circuit Breaker · 三狀態圖」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/04_delivery_02_circuit_breaker.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
stateDiagram-v2
  [*] --> Closed
  Closed --> Open: failure rate > threshold<br/>(e.g. 50% in 30s)
  Open --> HalfOpen: cooldown elapsed<br/>(e.g. 30s)
  HalfOpen --> Closed: probe success<br/>→ ramp up traffic
  HalfOpen --> Open: probe fails<br/>→ back to open
  Closed --> Closed: normal request flow
  Open --> Open: short-circuit<br/>→ fallback response

  note right of Closed
    監控失敗率
    正常轉發
  end note
  note right of Open
    全部短路 → fallback
    給下游喘息時間
  end note
  note right of HalfOpen
    放單一探針請求
    成功才回 Closed
  end note
```

- **Note**: Circuit Breaker 三狀態是 SRE 必懂，stateDiagram 最清楚。

---

## Image 13 · Reliable Delivery · Transactional Outbox 序列圖

- **Type**: E · Mermaid sequence
- **Priority**: P2
- **Slide**: `05-reliability-ops/04_reliable_delivery.md` · 「Outbox / DLQ」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/04_delivery_03_outbox.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
sequenceDiagram
  participant App as Order Service
  participant DB as Database
  participant Out as Outbox Table
  participant Pub as Outbox Publisher
  participant K as Kafka
  participant Csm as Consumer
  participant DLQ as Dead Letter Queue

  rect rgb(245,241,232)
  Note over App,Out: Single DB Transaction
  App->>DB: BEGIN
  App->>DB: INSERT order
  App->>Out: INSERT event (same TX)
  App->>DB: COMMIT
  end

  loop poll / CDC
    Pub->>Out: read pending events
    Pub->>K: publish event
    K-->>Pub: ack
    Pub->>Out: mark sent
  end

  K->>Csm: deliver event
  alt processing OK
    Csm-->>K: commit offset
  else fail 5 times
    Csm->>DLQ: send to DLQ + alert
  end
```

- **Note**: Outbox 解決「DB 寫成功但訊息發送失敗」，序列圖是面試最有說服力的證據。

---

## Image 14 · Observability · 三支柱 + 串聯關係

- **Type**: B · 概念隱喻
- **Priority**: P1
- **Slide**: `05-reliability-ops/05_observability.md` · 「三支柱」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/05_observability_01_three_pillars.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A hand-drawn editorial illustration of three classical pillars supporting a horizontal beam labeled "Observability", each pillar distinct: left pillar drawn as a stack of horizontal time-series chart lines representing Metrics, middle pillar drawn as a stack of structured log entries with thin lines of text representing Logs, right pillar drawn as a branching tree of connected spans showing a trace waterfall representing Traces, each pillar has a small connecting thread (trace_id) tying them together at the base.
  Composition: three vertical pillars evenly spaced occupying middle portion of frame, horizontal beam across the top with the title, ground line at bottom with small "trace_id" thread connecting pillar bases, ample sky whitespace above the beam.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 三支柱經典隱喻 + trace_id 串聯，呼應「三者要互相串聯」核心觀念。

---

## Image 15 · Observability · 四金信號 + SLO/Error Budget

- **Type**: D · 對照圖
- **Priority**: P2
- **Slide**: `05-reliability-ops/05_observability.md` · 「四金信號 / Error Budget」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/05_observability_02_four_signals_slo.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A hand-drawn dashboard sketch with two halves: left side a 2x2 grid of small chart panels labeled Latency (line chart with P99 marker), Traffic (bar chart of RPS), Errors (line chart with red threshold), Saturation (gauge dial), each panel as a tiny editorial sketch; right side a horizontal "Error Budget" bar showing 100% capacity at top, current consumed portion shaded toward the left, remaining budget on the right, with small labels SLI > SLO > SLA stacked beneath as a hierarchy, a small "43 min/month" annotation pointing to remaining budget area.
  Composition: vertical divider line splits frame into 60% / 40%, left side hosts the 2x2 four-signals grid, right side hosts the budget bar and SLI/SLO/SLA stack, balanced visual rhythm.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: Google SRE 四金信號 + Error Budget 視覺化，把可靠性變成可量化討論的數字。

---

## Image 16 · Recap · Black Friday Incident 時間軸

- **Type**: C · Mermaid timeline
- **Priority**: P2
- **Slide**: `05-reliability-ops/99_recap.md` · 「Incident 演練」
- **Save as**: `ppt/assets/diagrams/05-reliability-ops/99_recap_01_incident_timeline.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart TB
  T0["00:00 · 流量爆 10×"] --> A1["API GW · Token Bucket<br/>擋掉 30% 超量 → 429 + Retry-After"]
  A1 --> T1["00:01 · 訂單服務"]
  T1 --> A2["Concurrency Limit 觸發<br/>多餘請求 → 503 快速失敗"]
  A2 --> T2["00:02 · 支付 API 飆 P99 = 5s"]
  T2 --> A3["Circuit Breaker · Open<br/>30s 內走 fallback 訊息"]
  A3 --> T3["00:03 · Auto-scaling 跟上"]
  T3 --> A4["Kafka Outbox 累積<br/>不丟訊息 · 慢慢消化"]
  A4 --> T4["00:05 · 工程師收到告警"]
  T4 --> A5["Metrics → Trace → Log<br/>定位 = 支付 API throttle"]

  classDef accent fill:#D97757,stroke:#8B6F47,color:#F5F1E8;
  classDef base fill:#F5F1E8,stroke:#8B6F47,color:#2A2520;
  classDef warn fill:#E8634F,stroke:#8B6F47,color:#F5F1E8;
  classDef ok fill:#5B9770,stroke:#8B6F47,color:#F5F1E8;
  class T0,T1,T2,T3,T4 base
  class A1,A2 accent
  class A3 warn
  class A4,A5 ok
```

- **Note**: Black Friday 5 分鐘時間軸把 5 層防線全串起來，是全章 case study 的高潮。

---

## 索引

| # | Topic | Priority | Type | File |
|---|-------|---------|------|------|
| 01 | Hero · 章首封面 | P1 | A | `00_hero.png` |
| 02 | Mental Model · 5 層防線 | P1 | E + B | `00_mental_model.png` |
| 03 | Distributed Lock · 4 場景 | P2 | B | `01_distributed_lock_01_scenarios.png` |
| 04 | Distributed Lock · 4 方案 Trade-off | P1 | D | `01_distributed_lock_02_tradeoff.png` |
| 05 | Distributed Lock · Fencing Token 序列 | P1 | E | `01_distributed_lock_03_fencing.png` |
| 06 | Contention · Pessimistic vs OCC | P1 | E | `02_contention_01_pessimistic_vs_occ.png` |
| 07 | Contention · 5 層解法階梯 | P2 | B | `02_contention_02_5_layers.png` |
| 08 | Contention · Isolation × 異常矩陣 | P2 | D | `02_contention_03_isolation_matrix.png` |
| 09 | Overload · 6 層防線拼圖 | P1 | B | `03_overload_01_6_layers.png` |
| 10 | Overload · Token vs Leaky Bucket | P1 | D | `03_overload_02_token_vs_leaky.png` |
| 11 | Delivery · 6 防線串接 | P1 | C | `04_delivery_01_6_lines.png` |
| 12 | Delivery · Circuit Breaker 三狀態 | P1 | E | `04_delivery_02_circuit_breaker.png` |
| 13 | Delivery · Outbox 序列圖 | P2 | E | `04_delivery_03_outbox.png` |
| 14 | Observability · 三支柱 | P1 | B | `05_observability_01_three_pillars.png` |
| 15 | Observability · 四金信號 + SLO | P2 | D | `05_observability_02_four_signals_slo.png` |
| 16 | Recap · Black Friday 時間軸 | P2 | C | `99_recap_01_incident_timeline.png` |

**統計**：
- 總計 16 張（Hero + Mental Model + 13 個 topic 圖 + 1 個 case study）
- Priority 分布：P1 × 9 · P2 × 7 · P3 × 0
- Type 分布：A × 1 · B × 4 · C × 2 · D × 4 · E × 5
