# Ch.11 Collaboration · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/11-collaboration/`

**本章圖像總覽**：3 張 · P1 × 1（Hero）· P2 × 2（mental model + overlap matrix）· A × 1 · E × 1 · D × 1

---

## Image 01 · Hero · Collaboration 章首

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `11-collaboration/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/11-collaboration/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a construction site coordination meeting taking place around a large shared blueprint table. Nine different professional figures representing the 9 software roles are gathered around the table, each pointing at the section of the blueprint they care about: PM/Client (in business attire pointing at the building's overall purpose at top), UX/Interior Designer (pointing at floor layout), UI Designer (pointing at finishing details), SA/Architect (pointing at floor plan), Structural Engineer (pointing at load-bearing columns), SD/Detail Drawing Designer (pointing at construction details), DBA (pointing at the underground plumbing layer), Dev/Craftsman (pointing at a brick wall section), QA/Inspector (pointing at an inspection checklist overlay), and DevOps (pointing at the building's utility room). Crucially, some hands visibly OVERLAP — multiple people reaching into the same area of the blueprint (e.g., SA and Architect both pointing at the same column, PM and UX both pointing at the entrance). At the head of the table, a moderator figure (could be a senior PM or a senior Architect) stands listening, holding a notebook to capture consensus. The mood is constructive but visibly negotiating.
  Composition: large rectangular blueprint table centered horizontally; 9 figures distributed around three sides of the table; moderator at the head (far end); clear hand overlaps in 2-3 zones; ample whitespace above for title overlay; warm overhead lighting on the blueprint; soft surrounding environment.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: Collaboration 章的核心訊息：9 個角色關心的地方有重疊（overlap），這正是衝突來源也是協作起點。手部的 overlap 是關鍵 visual cue，不能讓 9 個人乖乖分區站好。moderator 站在頭位代表「需要主持人」這件事，呼應後續 overlap matrix 的論述。

---

## Image 02 · Flow · 三層 Flow 翻譯（User → System → Architecture）

- **Type**: E · 流程圖 / 決策樹
- **Priority**: P2
- **Slide**: `11-collaboration/02_three_views.md` · 第 2 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/11-collaboration/01_three_views.png`
- **Aspect**: 16:9
- **建議用 Mermaid**：

  ```mermaid
  flowchart TB
    subgraph U["User Flow (PM/UX)"]
      U1[購物車] --> U2[結帳] --> U3[付款] --> U4[訂單完成]
    end
    subgraph S["System Flow (SA)"]
      S1[檢查庫存] --> S2[鎖定庫存] --> S3[建立訂單] --> S4[呼叫金流]
      S4 --> S5{付款成功?}
      S5 -->|是| S6[扣款]
      S5 -->|否| S7[釋放庫存]
    end
    subgraph A["Architecture Flow (Architect)"]
      A1[Web/API GW] --> A2[Order Service]
      A2 --> A3[Payment Service]
      A2 --> A4[Inventory Service]
      A3 --> A5[(3rd Party PG)]
      A2 --> A6[/Kafka/]
      A6 --> A7[Notification]
    end
    U -.->|翻譯| S
    S -.->|翻譯| A
    classDef u fill:#D97757,stroke:#2A2520,color:#F5F1E8
    classDef s fill:#8B6F47,stroke:#2A2520,color:#F5F1E8
    classDef a fill:#5B9770,stroke:#2A2520,color:#F5F1E8
    class U1,U2,U3,U4 u
    class S1,S2,S3,S4,S5,S6,S7 s
    class A1,A2,A3,A4,A5,A6,A7 a
  ```

- **Note**: 用 Mermaid 比 AI 生圖可靠百倍。Render 後存成 PNG。重點：同一個「結帳」需求在 3 個層次的展開——User 層只看 4 步，System 層展開到 7 步（含失敗分支），Architecture 層展開到具體服務與基礎設施。三個 subgraph 用色票區分（User=橘 / System=棕 / Arch=綠）讓「越往下越具體」一目了然。

---

## Image 03 · Matrix · Overlap Matrix 視覺化

- **Type**: D · 對照圖 / 矩陣（**程式生成**，不用 AI）
- **Priority**: P2
- **Slide**: `11-collaboration/02_overlap_matrix.md` · 第 2-3 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/11-collaboration/02_overlap_matrix.png`
- **Aspect**: 16:9 (1536×1024 px)
- **產生方式**：執行 `_generate_overlap_matrix.py`

  ```bash
  python software_develop_journey/ppt/assets/diagrams/_generate_overlap_matrix.py
  ```

- **為什麼不用 AI 生圖**：gpt-image-2 / DALL-E 無法準確渲染**特定的網格儲存格位置**——每次重生都會把橘色 / 棕色圓圈擺到隨機位置，資料一定錯。Python + matplotlib 直接從 canonical data 渲染，**100% 準確**且可重現。

- **資料對應**：
  - 上游 11 個決策（rows 1–11）來自 `11-collaboration/02_overlap_matrix.md` 第一張表（PM/UX/SA/Arch/DBA）
  - 下游 11 個決策（rows 12–22）來自第二張表（SD/Dev/QA/DevOps）
  - 兩塊 side-by-side 排列以符合 16:9 + 涵蓋全部 22 個決策
  - 9 個角色欄位：PM, UX, SA, Arch, SD, DBA, Dev, QA, Ops

- **三態圖示**：
  - **橘色實心圓 ●**：★ 主 Primary（拍板人）
  - **棕色框圓 ○**：參與 Supporting（有意見）
  - **留白**：與該決策無關

- **改資料的方式**：直接修改 `_generate_overlap_matrix.py` 內的 `UPSTREAM` / `DOWNSTREAM` 陣列，重跑 script 即可。每個元素 `(label, [9 cell values])`，cell 值：`2 = 主`、`1 = 參與`、`0 = 無`。

- **Note**: 矩陣資料是 single source of truth——slide 表格與本圖必須同步。**若 slide 規則更新，務必同步改 script 重生圖**。每次重生 < 1 秒，無 AI 隨機性。
