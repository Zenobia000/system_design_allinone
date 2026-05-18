# Prologue · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/00-prologue/`

**本章圖像總覽**：2 張 · P1 × 1 · P0 × 1 · A × 1 · B × 1

---

## Image 01 · Cover Hero · 課程封面

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `00-prologue/00_cover.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/00-prologue/00_cover_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a beginner standing at the foot of a tall multi-story building under construction, looking up at workers, designers, and inspectors visible on different floors—each visibly working on their own task with a unique tool: blueprints, hammers, drafting pens, clipboards. The beginner holds a notebook open to a fresh blank page. Above the building, a faint outline of digital interface windows and code merges with the architectural scaffolding, suggesting the building is also a software system.
  Composition: vertical building occupying right 60%, beginner figure lower-left looking up; ample whitespace on upper-left for title overlay; soft warm sunlight from upper-right; clean cross-section view showing 3-4 floors with different role activities.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 開宗明義——「軟體開發像蓋大樓」這個比喻在第一張就要立穩。新手仰望整棟樓的視角是關鍵；不要讓圖看起來像單純的建築插圖，要讓數位介面 / 程式碼隱約融入結構中，暗示這同時是軟體系統。

---

## Image 02 · 同一句需求 9 角色腦中泡泡 · 母模板

- **Type**: B · 概念隱喻
- **Priority**: **P0**（母模板·必做）
- **Slide**: `00-prologue/03_how_to_read.md` · 第 2-3 張之間
- **Save as**: `software_develop_journey/ppt/assets/diagrams/00-prologue/03_nine_role_bubbles.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration showing a central figure (a client/customer in business attire) speaking a single short sentence in a speech bubble at the center: "I want a membership system". Around this central figure, nine separate thought bubbles radiate outward in a circular arrangement, each containing a tiny hand-drawn icon representing what a different software role thinks of: PM (KPI chart), UX (user flow), UI (color palette), SA (state diagram), Architect (system block diagram), SD (API arrow), DBA (database cylinder with index), Dev (code brackets), QA (test checklist), DevOps (server with monitoring graph). Each bubble has a small label naming the role.
  Composition: central client figure with primary speech bubble; nine thought bubbles arranged in a circle around them at clock positions (12, 1, 3, 4-5, 6, 7-8, 9, 10, 11); thought bubbles are different sizes to suggest different "weight" of concern; connecting dotted lines from central figure to each bubble; ample whitespace between bubbles.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 這是整本教材最重要的母模板之一——「角色不同 ≠ 立場不同，而是看到的問題不同」。每個 thought bubble 內的 icon 必須能一眼辨認對應角色，配合 slide 上的文字表格使用。後續每章 overview 會引用這張圖的局部放大版（單一 bubble 拉近）。
