# Ch.5 Architect · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/05-architect/`

**本章圖像總覽**：2 張 · P1 × 1 · P2 × 1 · A × 1 · B × 1

---

## Image 01 · Hero · Architect 章首（結構技師）

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `05-architect/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/05-architect/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a calm structural engineer wearing a hard hat, seated at a workbench reviewing load-bearing calculation sheets and seismic resistance charts spread across the table. Behind the engineer, a large vertical cross-section of a tall multi-story building reveals its internal structure: steel beams, reinforced concrete columns, load-bearing walls, and structural braces clearly drawn—the building's "skeleton" exposed. A small inset diagram on one corner of the desk shows arrows indicating downward loads and lateral seismic forces being absorbed by the structure. The overall mood is "this building will not collapse".
  Composition: engineer figure mid-left at lower 40% of frame; cross-section of building rising on the right occupying right 50% with visible internal steel/concrete structure; calculation sheets and charts on the desk in foreground; small force-diagram inset for visual interest; ample whitespace upper-left for title overlay; warm focused workshop lighting; emphasis on stability and structural integrity, not aesthetics.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: Architect = 結構技師——關鍵是「承重 / 耐震 / 防火 / 未來擴建」這種看不見但決定生死的工作。Hero 要明確區隔於 SA（建築師畫平面圖）：SA 看「機能」，Architect 看「結構是否撐得住」。建築剖面圖露出鋼筋骨架是核心視覺。

---

## Image 02 · 架構師三層責任（向上 / 向下翻譯）

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `05-architect/01_outputs.md` · MENTAL MODEL section
- **Save as**: `software_develop_journey/ppt/assets/diagrams/05-architect/01_three_layer.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of an architect figure standing at the center of the frame, arms extended horizontally—one hand pointing upward, the other pointing downward. Above the architect: a business stakeholder figure (in business suit) holds a chart with KPIs, ROI, and revenue graphs; a curved arrow labeled "向上翻譯" flows from the architect up to the stakeholder, carrying icons of risk, cost, and business value. Below the architect: a group of engineer figures holding laptops with visible code brackets and a small system block diagram; a curved arrow labeled "向下翻譯" flows from the architect down to the engineers, carrying icons of technical decisions, components, and trade-offs. The architect themself stands on a clearly marked middle layer/platform.
  Composition: vertical three-layer stack; business stakeholder upper-center; architect middle-center on a platform with both arrows visible; engineers lower-center; arrows curved (not straight) showing translation effort; clear labels "Business" "Architecture" "Implementation" on the left edge of each layer; ample whitespace on the right; warm sidelight; balanced symmetry between up and down.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: Architect 的核心 mental model 是「雙向翻譯者」——往上把工程語言翻成商業語言（風險、成本、ROI），往下把商業目標翻成技術決策。這張圖呼應姊妹專案 `software_architect` 的同名 mental model，視覺上保持一致。
