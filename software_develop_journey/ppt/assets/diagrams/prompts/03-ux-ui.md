# Ch.3 UX / UI · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/03-ux-ui/`

**本章圖像總覽**：2 張 · P1 × 1 · P2 × 1 · A × 1 · B × 1

---

## Image 01 · Hero · UX/UI 章首（室內設計師）

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `03-ux-ui/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/03-ux-ui/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of an interior designer standing inside a half-built room, planning the flow with sweeping hand gestures. On a long wooden table beside her: a flat floor plan with arrows indicating people's walking paths between rooms, a set of fabric swatches fanned out, a small color palette card with 4-5 carefully chosen colors, and a stack of furniture catalog samples. In the background, a small partially assembled mockup/showroom of a living room corner: a sofa, a side table with lamp, a framed picture on the wall—staged to feel inviting. A small client figure peeks in the doorway looking pleased.
  Composition: designer figure in mid-left at lower 50% of frame; planning table foreground occupying lower-right with clearly distinguishable items (floor plan, swatches, palette, catalog); mockup room in upper-right background; ample whitespace upper-left for title overlay; warm afternoon sunlight from upper-right; emphasis on the contrast between "planning the flow" (left) and "staging the look" (right) to subtly preview UX vs UI.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: UX/UI = 室內設計師——這個角色同時管「動線（怎麼走才舒服）」和「樣品屋（怎麼擺才好看）」。Hero 圖刻意讓畫面左半側強調動線規劃、右半側強調 staging，為下一張 mental model 對照圖鋪陳。

---

## Image 02 · UX 動線 vs UI 樣品屋對照

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `03-ux-ui/01_outputs.md` · MENTAL MODEL section
- **Save as**: `software_develop_journey/ppt/assets/diagrams/03-ux-ui/01_ux_vs_ui.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  A split-frame editorial illustration divided cleanly down the middle by a thin vertical line. On the LEFT side labeled "UX · 動線", a top-down architectural cutaway of a multi-room building shows several tiny stylized people walking along dotted arrow paths from entrance through hallway to destination rooms; the paths visualize flow, friction, and decision points—some paths bend around obstacles, others are direct. On the RIGHT side labeled "UI · 樣品屋", a single beautifully styled showroom rendered from a 3/4 angle: an inviting living room with a coordinated sofa, soft lighting, a tasteful rug, framed art, and color-coordinated accessories—everything visually polished and photo-ready. A small designer figure stands at the dividing line in the middle, one hand pointing left, one hand pointing right, indicating she owns both.
  Composition: 50/50 vertical split; left side functional and diagrammatic with paths; right side stylish and warm with finished interior; designer figure straddles the divide at lower-center; clear labels "UX 動線" and "UI 樣品屋" at the top of each half; ample whitespace; consistent warm lighting across both halves.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: UX vs UI 是新手最常混淆的——這張對照圖用「動線（看不見但決定體驗）」對「樣品屋（看得見的成品）」直觀地把兩者分開，又用中間的設計師人像強調「同一個角色身上兩種能力」。
