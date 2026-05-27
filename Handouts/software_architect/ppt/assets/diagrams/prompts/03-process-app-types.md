# Ch.3 · Process & App Types · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_architect/ppt/assets/diagrams/03-process-app-types/`

**本章圖像總覽**：3 張 · P1 × 2 · P2 × 1 · A × 1 · B × 1 · E × 1

---

## Image 01 · Hero · 章首封面

- **Type**: A
- **Priority**: P1
- **Save as**: `software_architect/ppt/assets/diagrams/03-process-app-types/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a workflow diagram drawn on parchment, showing six interconnected nodes representing the architectural design process — each node a distinct geometric shape (circle, square, diamond, hexagon, octagon, star) connected by hand-drawn arrows; in the corner, a magnifying glass hovers over one node, emphasizing the inspection and verification aspect of architecture work.
  Composition: top-down parchment view; six nodes flowing left-to-right in gentle curve; warm orange highlights on connecting arrows; magnifying glass in upper-right; ample whitespace.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```

---

## Image 02 · Mental Model · 設計六步流程

- **Type**: B + E (Mermaid 主推)
- **Priority**: P1
- **Save as**: `software_architect/ppt/assets/diagrams/03-process-app-types/00_mental_model.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart LR
  S1["①<br/>理解需求"] --> S2["②<br/>概念設計"] --> S3["③<br/>技術選型"] --> S4["④<br/>組件設計"] --> S5["⑤<br/>風險評估"] --> S6["⑥<br/>實施指導"]
  S1 -.->|PRD<br/>NFR| O1[" "]
  S2 -.->|Domain<br/>Model| O2[" "]
  S3 -.->|Tech Stack<br/>ADR| O3[" "]
  S4 -.->|C4<br/>API Spec| O4[" "]
  S5 -.->|Risk<br/>Report| O5[" "]
  S6 -.->|Guidelines<br/>Scaffold| O6[" "]

  classDef step fill:#D97757,stroke:#8B6F47,color:#F5F1E8,stroke-width:2px
  classDef output fill:#F5F1E8,stroke:#8B6F47,color:#8B6F47,stroke-width:1px,stroke-dasharray: 3 3
  class S1,S2,S3,S4,S5,S6 step
  class O1,O2,O3,O4,O5,O6 output
```

---

## Image 03 · App Type Selection · 決策樹

- **Type**: E · Mermaid
- **Priority**: P2
- **Slide**: `03-process-app-types/02_app_type_strategy.md` · 決策樹
- **Save as**: `software_architect/ppt/assets/diagrams/03-process-app-types/02_app_type_01_tree.png`
- **Aspect**: 16:9

**Mermaid 原始碼**：
```mermaid
flowchart TD
  Q1{主要使用者?}
  Q1 -->|終端消費者| Q2{需相機/定位/推播?}
  Q1 -->|系統B2B| Q3{同步還是異步?}
  Q1 -->|開發者維運| Q4{互動還是排程?}

  Q2 -->|是| M["Mobile App"]
  Q2 -->|否| W["Web App / PWA"]
  Q3 -->|同步| API["Web API REST/gRPC"]
  Q3 -->|異步| WK["Service / Worker"]
  Q4 -->|互動| AC["Admin Console"]
  Q4 -->|排程| CLI["CLI / Cron"]

  classDef question fill:#D97757,stroke:#8B6F47,color:#F5F1E8
  classDef leaf fill:#F5F1E8,stroke:#8B6F47,color:#2A2520
  class Q1,Q2,Q3,Q4 question
  class M,W,API,WK,AC,CLI leaf
```
