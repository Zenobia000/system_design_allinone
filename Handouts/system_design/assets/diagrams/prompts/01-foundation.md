# Ch.1 · Foundation Layer · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `ppt/assets/diagrams/01-foundation/`

**本章圖像總覽**：14 張 · P1 × 7 · P2 × 7 · P3 × 0 · A × 1 · B × 4 · C × 3 · D × 3 · E × 4

---

## Image 01 · Hero · 章首封面

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `01-foundation/00_overview.md` · 第 1 張（chapter cover）
- **Save as**: `ppt/assets/diagrams/01-foundation/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a massive foundation stone half-buried in soil, with a layered architectural structure rising above it; the stone is engraved with subtle technical glyphs (network nodes, an API symbol, a stack of servers) hinting at the unseen physical bedrock beneath every distributed system. Faint horizontal strata in the ground suggest geological time and immovability — a metaphor for the speed of light and physics as the immovable floor of system design.
  Composition: centered low-horizon view, foundation stone occupying lower one-third with rising architectural layers above; soft side lighting from the upper-left; subtle background suggesting a far-off network of cities connected by thin curved lines; ample whitespace top and right for slide title overlay.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 強化「物理常數 / 不可逾越的地基」的章節隱喻，與 Ch.1 標題「四件事，所有系統的地基」呼應。

---

## Image 02 · Mental Model · Foundation 四層責任

- **Type**: E · Mermaid · 主推 + B · 隱喻備援
- **Priority**: P1
- **Slide**: `01-foundation/00_overview.md` · MENTAL MODEL section
- **Save as (Mermaid 渲染)**: `ppt/assets/diagrams/01-foundation/00_mental_model.png`
- **Aspect**: 16:9

**Mermaid 原始碼**（推薦做法，貼到 https://mermaid.live 渲染後存 PNG）：
```mermaid
flowchart TB
  subgraph stack[" "]
    direction TB
    C["CLIENT<br/>手機 / 瀏覽器 / IoT<br/><i>Ch.1.2</i>"]
    N["NETWORK<br/>TCP/IP · DNS · TLS · HTTP/3<br/><i>Ch.1.1</i>"]
    S["SERVER<br/>API · 商業邏輯 · 認證<br/><i>Ch.1.4</i>"]
    ST["STORAGE<br/><i>Ch.2 開始深談</i>"]
    C --> N --> S --> ST
  end
  scale["scale-up vs scale-out · Ch.1.3"]
  stack -.-> scale

  classDef client fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px
  classDef network fill:#D97757,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px
  classDef server fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px
  classDef storage fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px,stroke-dasharray: 5 5
  classDef sidebar fill:#5B9770,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px

  class C client
  class N network
  class S server
  class ST storage
  class scale sidebar
```

**AI Prompt 備援**（若不想用 Mermaid）：
```
A vertical four-tier stack diagram resembling architectural floor plans, labeled top-to-bottom: CLIENT, NETWORK, SERVER, STORAGE. Each tier is a horizontal slab with a small icon on the left (a phone, a globe with routing lines, a server box, a stylized cylinder), and a thin chapter reference tag on the right. A subtle vertical arrow on the right side labeled "scale-up vs scale-out" spans the entire stack.
Composition: centered four-row stack occupying middle 60% of canvas; warm orange highlight on the NETWORK row to signal physics-bound; storage row drawn in dashed outline to mark "discussed later"; ample whitespace and clean geometric proportions.
editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
--ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
```

- **Note**: 全章核心心智模型。四層責任分離是「分散式系統可以演化」的前提，後續所有章節都掛在這個結構上。

---

## Image 03 · Networking · TCP/IP 協定棧速查

- **Type**: C · 結構圖 (Mermaid)
- **Priority**: P1
- **Slide**: `01-foundation/01_networking.md` · NETWORKING · HOW
- **Save as**: `ppt/assets/diagrams/01-foundation/01_networking_01_stack.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart TB
  A["應用層<br/>HTTP/1.1 · HTTP/2 · HTTP/3 (QUIC) · gRPC · WebSocket<br/><i>解決：訊息語意</i>"]
  T["傳輸層<br/>TCP（可靠、有序） · UDP（快、可丟）<br/><i>解決：可靠性與順序</i>"]
  R["路由層<br/>IP · BGP<br/><i>解決：跨網段定址</i>"]
  L["資料連結層<br/>Ethernet · WiFi · 5G<br/><i>解決：物理介質</i>"]
  X["補強層 · 橫切關注<br/>TLS（安全） · DNS（命名） · CDN（加速）"]
  A --> T --> R --> L
  X -.-> A
  X -.-> T

  classDef accent fill:#D97757,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px
  classDef base fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px
  classDef cross fill:#5B9770,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px,stroke-dasharray: 4 4

  class A accent
  class T,R,L base
  class X cross
```

- **Note**: 協定棧速查表的視覺化，強調應用層為「使用者最常碰」的層次（橘色）；TLS/DNS/CDN 是橫切（cross-cutting）。

---

## Image 04 · Networking · RTT 與光速天花板

- **Type**: B · 概念隱喻
- **Priority**: P1
- **Slide**: `01-foundation/01_networking.md` · NETWORKING · WHY
- **Save as**: `ppt/assets/diagrams/01-foundation/01_networking_02_rtt.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of planet Earth viewed from space, with three pairs of cities marked by small dots and connected by curved arc lines following the surface curvature: Taipei to New York (~130 ms, longest arc), London to New York (~56 ms minimum), and a tight loop within a single data center (~0.5 ms). Each arc has a small handwritten-style latency number floating beside it. A soft horizontal line at the top labeled "speed of light · 300,000 km/s" reminds the viewer of the physical ceiling.
  Composition: Earth occupying right two-thirds of canvas as a flat circle with subtle continent outlines; arcs drawn in warm orange of varying lengths; latency labels in deep brown handwritten style; left side reserved for the headline "光速是天花板"; ample whitespace.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 把抽象的「光速 = 物理問題」具象成地球弧線距離，幫助學生內化跨地理同步的不可能性。

---

## Image 05 · Networking · TLS Handshake 序列圖

- **Type**: E · Sequence Diagram (Mermaid)
- **Priority**: P2
- **Slide**: `01-foundation/01_networking.md` · NETWORKING · TRADE-OFF（補充長連線成本）
- **Save as**: `ppt/assets/diagrams/01-foundation/01_networking_03_tls.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
sequenceDiagram
  autonumber
  participant C as Client
  participant S as Server

  Note over C,S: TCP 三次握手 (1 RTT)
  C->>S: SYN
  S-->>C: SYN-ACK
  C->>S: ACK

  Note over C,S: TLS 1.3 握手 (1 RTT)
  C->>S: ClientHello + key_share
  S-->>C: ServerHello + cert + Finished
  C->>S: Finished

  Note over C,S: 應用資料 (1 RTT)
  C->>S: HTTP Request
  S-->>C: HTTP Response

  Note over C,S: 弱網下 ~200ms 開銷<br/>→ keep-alive / connection pool 救命
```

- **Note**: 視覺化「TCP + TLS 為何吃掉 200ms」的根本原因，呼應反模式「行動 App 對每個 API 都新建連線」。

---

## Image 06 · Networking · CDN 全球邊緣

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `01-foundation/01_networking.md` · NETWORKING · 邊緣加速
- **Save as**: `ppt/assets/diagrams/01-foundation/01_networking_04_cdn.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a flat world map dotted with around 20 small node icons distributed across continents (edge locations), and a single large central node in the middle representing the origin server. Each edge node has a small "user" icon nearby, with a short solid line from user to nearest edge (fast), and a long thin dashed line from edge back to origin (slow, infrequent). The contrast between many short solid lines and few long dashed lines visualizes "data locality."
  Composition: world map fills full canvas with subtle continent outlines in deep brown; edge nodes drawn as small warm orange circles; origin as a slightly larger circle in the center; user icons in muted brown; legend in lower-right with two line styles labeled "user → edge (fast)" and "edge → origin (rare sync)".
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 把「資料局部性」具象化——靜態用 CDN、動態用區域分片，本質都是「資料放靠近運算的地方」。

---

## Image 07 · Networking · Circuit Breaker 三狀態

- **Type**: E · State Diagram (Mermaid)
- **Priority**: P2
- **Slide**: `01-foundation/01_networking.md` · NETWORKING · 故障模式
- **Save as**: `ppt/assets/diagrams/01-foundation/01_networking_05_circuit.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
stateDiagram-v2
  direction LR
  [*] --> Closed

  Closed: CLOSED<br/>正常通行<br/>計算失敗率
  Open: OPEN<br/>快速失敗<br/>不打 downstream
  HalfOpen: HALF-OPEN<br/>放幾個試探流量

  Closed --> Open: 失敗率超過閾值
  Open --> HalfOpen: 冷卻時間到 (e.g. 30s)
  HalfOpen --> Closed: 試探成功
  HalfOpen --> Open: 試探失敗

  classDef closed fill:#5B9770,stroke:#8B6F47,color:#F5F1E8
  classDef open fill:#E8634F,stroke:#8B6F47,color:#F5F1E8
  classDef half fill:#D97757,stroke:#8B6F47,color:#F5F1E8

  class Closed closed
  class Open open
  class HalfOpen half
```

- **Note**: Circuit Breaker 三狀態是「面試金句」也是真實生產系統的關鍵防線。狀態圖比文字描述清楚 10 倍。

---

## Image 08 · Client-Server vs P2P 架構對照

- **Type**: D · 對照圖
- **Priority**: P2
- **Slide**: `01-foundation/02_client_server.md` · CLIENT-SERVER · WHY
- **Save as**: `ppt/assets/diagrams/01-foundation/02_client_server_01_vs_p2p.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A side-by-side architectural comparison diagram split vertically down the middle. Left half titled "Client-Server"—a central server hub with several client icons (phone, laptop, tablet) connected by straight lines radiating outward, like a star topology. Right half titled "Peer-to-Peer"—six peer icons arranged in a hexagon, each connected to every other peer by lines forming a mesh, no central hub. Below each diagram, three short bullet labels: left says "control · observability · evolvability", right says "resilient · no single owner · trust hard". A small "hybrid" callout box at bottom notes WebRTC and gaming matchmaking as common middle-ground.
  Composition: clean 50/50 vertical split with a thin divider line; both halves use identical visual weight; warm orange highlights on the central server (left) and on the mesh edges (right); deep brown for icons; ample whitespace.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 視覺化解釋「為何 99% 商業軟體選 C/S」——星狀拓撲讓控制、可觀測、可演化變容易。

---

## Image 09 · Client-Server · Thin/Thick × Stateful/Stateless 2x2

- **Type**: D · 2x2 矩陣
- **Priority**: P1
- **Slide**: `01-foundation/02_client_server.md` · CLIENT-SERVER · HOW
- **Save as**: `ppt/assets/diagrams/01-foundation/02_client_server_02_matrix.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A clean 2x2 matrix diagram. Horizontal axis labeled "Server: Stateless ←→ Stateful" with arrow pointing from left to right. Vertical axis labeled "Client: Thin ←→ Thick" with arrow pointing from bottom to top. Four quadrants, each a labeled box:
  - bottom-left (Thin + Stateless): "Web 應用主流 · 易橫向擴展" — highlighted with warm orange filled background to mark as the recommended quadrant
  - top-left (Thick + Stateless): "SPA / Mobile App · 離線可用"
  - bottom-right (Thin + Stateful): "傳統 Session 架構 · 不易擴展"
  - top-right (Thick + Stateful): "遊戲 / 即時協作 · 最複雜"
  A small footer caption reads "Stateless Server = 橫向擴展的前提。狀態放外部儲存。"
  Composition: centered 2x2 grid occupying middle 70% of canvas; clear axis labels with arrowheads; the recommended quadrant filled with warm orange and white text; other quadrants outlined in deep brown with cream fill; ample whitespace around grid.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 經典 2x2 是 Trade-off 思考的標準工具。Stateless 是橫向擴展的前提這個訊息靠視覺強化最有效。

---

## Image 10 · Scalability · Vertical vs Horizontal vs Hybrid

- **Type**: D · 對照圖
- **Priority**: P1
- **Slide**: `01-foundation/03_scalability.md` · SCALABILITY · TRADE-OFF
- **Save as**: `ppt/assets/diagrams/01-foundation/03_scalability_01_up_vs_out.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A three-panel comparison diagram laid out horizontally with thin dividers. Left panel "Scale Up (垂直)"—a single server box growing taller through three stacked sizes (small → medium → large), with a small ceiling line at the top labeled "硬體上限". Middle panel "Scale Out (水平)"—a row of identical small server boxes multiplying from one to five to many, with arrows suggesting infinite extension to the right. Right panel "Hybrid (典型策略)"—a layered diagram with the application tier shown as multiple horizontal boxes (scale out) and the database tier shown as a single tall box (scale up), connected by lines. Each panel has a one-line caption underneath.
  Composition: equal-width three columns; vertical growth visualized in left panel; horizontal multiplication in middle; layered hybrid in right; warm orange used to highlight the "Hybrid" label as the recommended pragmatic strategy; ample whitespace at top for slide title.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 三欄對照清楚呈現三種策略，並暗示「應用層 Scale Out · 資料層 Scale Up」的實務黃金組合。

---

## Image 11 · Scalability · 橫向擴展三前提架構

- **Type**: C · 架構圖 (Mermaid)
- **Priority**: P1
- **Slide**: `01-foundation/03_scalability.md` · SCALABILITY · HOW
- **Save as**: `ppt/assets/diagrams/01-foundation/03_scalability_02_three_prereq.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart LR
  Client["Client"]
  LB{{"Load Balancer<br/><i>③ 可路由</i>"}}
  A["Server-A<br/><i>① Stateless</i>"]
  B["Server-B<br/><i>① Stateless</i>"]
  C["Server-C<br/><i>① Stateless</i>"]
  DB[("Shared DB / Cache<br/><i>② Shared Storage</i>")]

  Client --> LB
  LB --> A
  LB --> B
  LB --> C
  A --> DB
  B --> DB
  C --> DB

  classDef client fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px
  classDef lb fill:#D97757,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px
  classDef server fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px
  classDef storage fill:#5B9770,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px

  class Client client
  class LB lb
  class A,B,C server
  class DB storage
```

- **Note**: 三前提缺一不可：沒有 stateless 就沒有自由路由；沒有 shared storage 就沒有一致性。圖示直接對應 slide 上的 ASCII art。

---

## Image 12 · API Design · 風格選型決策樹

- **Type**: E · Decision Tree (Mermaid)
- **Priority**: P1
- **Slide**: `01-foundation/04_api_design.md` · API DESIGN · 決策樹
- **Save as**: `ppt/assets/diagrams/01-foundation/04_api_design_01_decision_tree.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart TB
  Q1{"外部 client<br/>還是內部？"}
  Q2{"over/under-fetching<br/>嚴重？"}
  REST["REST<br/><i>面試 99% 用這個</i>"]
  GQL["GraphQL<br/><i>多種 client、欄位變化大</i>"]
  GRPC["gRPC<br/><i>內部高效能 · binary · streaming</i>"]

  Q1 -->|外部| Q2
  Q1 -->|內部| GRPC
  Q2 -->|Yes| GQL
  Q2 -->|No| REST

  classDef question fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px
  classDef rest fill:#D97757,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px
  classDef other fill:#F5F1E8,stroke:#8B6F47,color:#2A2520,stroke-width:2px

  class Q1,Q2 question
  class REST rest
  class GQL,GRPC other
```

- **Note**: 把 slide 內 ASCII 決策樹轉成清晰的 mermaid，REST 用橘色強調「預設選項」。

---

## Image 13 · API Design · Idempotency 序列圖

- **Type**: E · Sequence Diagram (Mermaid)
- **Priority**: P2
- **Slide**: `01-foundation/04_api_design.md` · API DESIGN · 隱性決策（Idempotency）
- **Save as**: `ppt/assets/diagrams/01-foundation/04_api_design_02_idempotency.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
sequenceDiagram
  autonumber
  participant C as Client
  participant S as Server
  participant K as Idempotency Store<br/>(24h TTL)
  participant DB as Database

  C->>S: POST /payments<br/>Idempotency-Key: u123-2026-05-07-nonce
  S->>K: GET key
  alt Key 不存在 (首次請求)
    K-->>S: nil
    S->>DB: 扣款 $100
    DB-->>S: OK
    S->>K: SET key = response
    S-->>C: 200 OK
  else Key 已存在 (重試)
    K-->>S: cached response
    S-->>C: 200 OK<br/><i>不重複扣款</i>
  end

  Note over C,DB: 重試安全：寫操作必須冪等
```

- **Note**: 「典型 key = 用戶 ID + 業務天 + nonce」這條規則用序列圖最容易記住。Note 補上「重試安全」核心訊息。

---

## Image 14 · Recap · Twitter 發推文整合架構

- **Type**: C · 架構圖 (Mermaid)
- **Priority**: P2
- **Slide**: `01-foundation/99_recap.md` · CASE STUDY
- **Save as**: `ppt/assets/diagrams/01-foundation/99_recap_01_twitter.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart LR
  subgraph CLI["① Client (Mobile / Web)"]
    direction TB
    M["手機 App<br/>HTTP/3 QUIC"]
  end

  subgraph NET["② Network · 全球 CDN 邊緣"]
    direction TB
    CDN["CDN edge<br/>就近接收"]
  end

  subgraph SRV["③ Server · K8s 自動擴容"]
    direction TB
    LB{{"Load<br/>Balancer"}}
    API1["API Server<br/><i>Stateless</i>"]
    API2["API Server<br/><i>Stateless</i>"]
    API3["API Server<br/><i>Stateless</i>"]
    LB --> API1 & API2 & API3
  end

  subgraph DATA["④ Storage (Ch.2 詳述)"]
    direction TB
    R[("Redis<br/>Session +<br/>Idempotency")]
    DB[("DB 主寫從讀")]
  end

  M -->|"POST /v2/tweets<br/>Idempotency-Key"| CDN
  CDN --> LB
  API1 --> R
  API2 --> R
  API3 --> R
  API1 --> DB
  API2 --> DB
  API3 --> DB

  classDef tier fill:#F5F1E8,stroke:#8B6F47,color:#2A2520
  classDef accent fill:#D97757,stroke:#8B6F47,color:#F5F1E8
  classDef ok fill:#5B9770,stroke:#8B6F47,color:#F5F1E8

  class M,CDN tier
  class LB,API1,API2,API3 accent
  class R,DB ok
```

- **Note**: 章末 case study 把 Network / Client-Server / Scale / API 四個面向整合成一張圖，學生看完整章後能對照每個元件對應到哪個概念。

---

## 索引

| # | Topic | Priority | Type | File |
|---|-------|---------|------|------|
| 01 | Hero · 章首封面 | P1 | A | `00_hero.png` |
| 02 | Mental Model · 4 層責任 | P1 | E + B | `00_mental_model.png` |
| 03 | Networking · 協定棧 | P1 | C | `01_networking_01_stack.png` |
| 04 | Networking · RTT 光速 | P1 | B | `01_networking_02_rtt.png` |
| 05 | Networking · TLS Handshake | P2 | E | `01_networking_03_tls.png` |
| 06 | Networking · CDN 邊緣 | P2 | B | `01_networking_04_cdn.png` |
| 07 | Networking · Circuit Breaker | P2 | E | `01_networking_05_circuit.png` |
| 08 | Client-Server vs P2P | P2 | D | `02_client_server_01_vs_p2p.png` |
| 09 | C/S · 2x2 矩陣 | P1 | D | `02_client_server_02_matrix.png` |
| 10 | Scalability · Up/Out/Hybrid | P1 | D | `03_scalability_01_up_vs_out.png` |
| 11 | Scalability · 三前提架構 | P1 | C | `03_scalability_02_three_prereq.png` |
| 12 | API · 風格決策樹 | P1 | E | `04_api_design_01_decision_tree.png` |
| 13 | API · Idempotency 序列 | P2 | E | `04_api_design_02_idempotency.png` |
| 14 | Recap · Twitter 整合架構 | P2 | C | `99_recap_01_twitter.png` |
