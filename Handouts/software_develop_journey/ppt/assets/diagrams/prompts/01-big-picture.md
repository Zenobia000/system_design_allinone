# Ch.1 Big Picture · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/01-big-picture/`

**本章圖像總覽**：4 張 · P0 × 1（母模板）· P1 × 1 · P2 × 2

---

## Image 01 · Hero · Big Picture 章首

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `01-big-picture/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/01-big-picture/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of an open architectural blueprint scroll spreading horizontally across the frame, gradually transforming from rough business sketches on the left, to wireframe interface drawings in the middle, to detailed software architecture diagrams with server icons and data flows on the right. A faint silhouette of nine different professional figures stand in a row along the bottom, each touching their corresponding section of the blueprint.
  Composition: long horizontal blueprint occupying middle 70%; nine small figures along the bottom edge; ample whitespace top for title; left-to-right gradient of abstraction (business → user → system → code); warm sunlight wash.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: Big Picture 章首要傳達「從商業到代碼是一條翻譯鏈」。9 個小人在底部排排站對應後續每一章。

---

## Image 02 · 蓋大樓 9 角色一字排開 · 母模板

- **Type**: B · 概念隱喻
- **Priority**: **P0**（母模板·必做）
- **Slide**: `01-big-picture/01_building_metaphor.md` · 第 2-3 張之間
- **Save as**: `software_develop_journey/ppt/assets/diagrams/01-big-picture/01_building_metaphor.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A wide editorial illustration showing nine professional figures in construction/design attire standing in a line from left to right at the base of a partially constructed multi-story building. Each figure holds a unique tool clearly identifying their role:
  (1) PM (real-estate development planner) in business-casual with a market research report and a unit-mix layout (NOT the building owner — the planner who decides what to build),
  (2) UX/Interior Designer with a furniture arrangement sketch,
  (3) UI Designer with color swatches and component samples,
  (4) SA/Building Architect with rolled blueprints and a compass,
  (5) Structural Engineer (software Architect) with load-bearing calculation diagrams,
  (6) Detail Drawing Designer (SD) with detailed construction drawings,
  (7) Foundation/Plumbing Engineer (DBA) with pipe schematics and a water tower icon,
  (8) Construction Worker/Craftsman (Dev) with hammer and tools,
  (9) Inspector (QA) with checklist clipboard,
  (10) Property Manager/Security/Fire Safety (DevOps) with monitoring screen and walkie-talkie.
  The building behind them rises with visible cross-section showing different work stages on different floors.
  Composition: 10 figures arranged left-to-right at lower 40% of frame; building cross-section rises behind them; each figure clearly distinct in posture and tool; ample whitespace above for title overlay; soft warm daylight from upper-right.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: **整本教材最重要的一張圖**。每章 overview 第一張會引用這張的局部高光版（highlight 當下角色）。10 個角色（含 UX/UI 分開）必須能一眼從工具區分。注意 DBA 是「地基 + 水塔 + 管線總圖」不是倉管；DevOps 是「物業管理 + 24h 保全 + 消防」不是水電工。

---

## Image 03 · SDLC 完整流程示意

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `01-big-picture/02_sdlc_map.md` · 第 3 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/01-big-picture/02_sdlc_map.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration showing a top-down view of a flowing river with 10 small bridges/stations along its course, labeled in order: Business Need, PM Analysis, UX Design, SA Spec, Architecture, SD Detail, DBA, Dev, QA, DevOps, Iteration (loops back). Each station has a tiny figure working at it. The river represents the flow of requirements being translated, becoming more concrete (visualized as the water gradually transforming from misty/abstract to clear/structured) as it moves downstream.
  Composition: river meanders left-to-right across full frame; 10 stations evenly spaced; small figures at each station; arrows showing back-flow / iteration loops; warm sunlight bathing the scene; ample whitespace above and below.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: SDLC 不是直線而是有回流的——river metaphor 比箭頭流程圖更傳神。回流的反向箭頭暗示實務上會打回上游。

---

## Image 04 · 不確定性階梯（金字塔）

- **Type**: C · 結構圖
- **Priority**: P2
- **Slide**: `01-big-picture/03_uncertainty_ladder.md` · 第 2 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/01-big-picture/03_uncertainty_ladder.png`
- **Aspect**: 16:9
- **建議用 Mermaid**：

  ```mermaid
  flowchart TB
    subgraph 抽象["最抽象（商業層）"]
      PM[PM · 商業價值不確定性]
    end
    subgraph 中層["翻譯層（系統設計）"]
      UX[UX · 使用者行為]
      SA[SA · 業務規則]
      ARCH[Architect · 系統演進]
      SD[SD · 開發落地]
      DBA[DBA · 資料正確性]
    end
    subgraph 具體["最具體（代碼/機器）"]
      DEV[Dev · 實作正確性]
      QA[QA · 結果正確性]
      OPS[DevOps · 上線運行]
    end
    PM --> UX & SA
    UX & SA --> ARCH
    ARCH --> SD & DBA
    SD & DBA --> DEV
    DEV --> QA
    QA --> OPS
    classDef pm fill:#D97757,stroke:#2A2520,color:#F5F1E8
    classDef mid fill:#8B6F47,stroke:#2A2520,color:#F5F1E8
    classDef ops fill:#5B9770,stroke:#2A2520,color:#F5F1E8
    class PM pm
    class UX,SA,ARCH,SD,DBA mid
    class DEV,QA,OPS ops
  ```

- **Note**: 用 Mermaid 比 AI 生圖可靠。Render 後存成 PNG。重點傳達「越上游越抽象、越下游越具體」+「每層降低一種不確定性」。
