# Ch.8 Dev · 圖像 Prompts

> Style guide: [`../0_STYLE_GUIDE.md`](../0_STYLE_GUIDE.md)
> Save images to: `software_develop_journey/ppt/assets/diagrams/08-dev/`

**本章圖像總覽**：2 張 · P1 × 1（Hero）· P2 × 1（mental model）· A × 1 · B × 1

---

## Image 01 · Hero · Dev 章首（工班師傅）

- **Type**: A · Hero illustration
- **Priority**: P1
- **Slide**: `08-dev/00_overview.md` · 第 1 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/08-dev/00_hero.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration of a small team of skilled craftsmen on an active construction site, all visibly absorbed in careful, precision work — not generic labor. The composition shows: one craftsman laying bricks with a spirit level, checking alignment with deep focus; another welding a steel joint with sparks tightly controlled; a third measuring and marking a beam with a folding ruler and pencil. Each figure wears clean professional work attire (apron, tool belt, branded helmet) and carries specialized tools that visibly differentiate sub-roles — clearly suggesting two main specialties: one team works on the visible facade / interior finishing (frontend craftsmen — paintbrush, tile cutter, fixture tools) while another works on the load-bearing internal structure / piping (backend craftsmen — welding torch, pipe wrench, structural bolts). Behind them a partly-built structure rises with both interior and exterior surfaces visible. The mood is focused, expert, calmly proud — these are professional master craftsmen who know exactly what they're doing.
  Composition: 3-4 craftsmen distributed across mid-foreground at lower 60%; clear visual separation between frontend specialty (right) and backend specialty (left); partly-built structure as backdrop occupying upper 40%; ample whitespace upper-left for title; warm directional sunlight from upper-right; tools and posture clearly indicate expertise, not raw labor.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: Dev 不是「廉價勞工」、不是「叫他寫他就寫」的角色。要傳達「他們是專業工匠（craftsmen）」——有判斷力、有細節知識、有專屬工具。前後端的分流用工具差異化呈現，避免讓他們看起來都一樣。後續會配合「為什麼 AI 取代不了 Dev 的判斷」論點使用。

---

## Image 02 · Mental Model · AI 寫 80% code 後 Dev 的價值

- **Type**: B · 概念隱喻
- **Priority**: P2
- **Slide**: `08-dev/01_outputs.md` · 第 2 張
- **Save as**: `software_develop_journey/ppt/assets/diagrams/08-dev/01_ai_collaboration.png`
- **Aspect**: 16:9
- **Prompt**:
  ```
  An editorial illustration in a split-frame composition. LEFT HALF: a stylized AI assistant figure (subtle robot/abstract head, headphones, glowing console screen) rapidly typing on a wide keyboard, with streams of code lines flying out of the screen — quantity emphasized, speed lines, a counter "80%" subtly visible on the screen. The AI looks fast but unfocused — it produces volume. RIGHT HALF: a human Dev figure (clean engineer attire, focused expression, holding a pen and a checklist) seated calmly at a desk, carefully reviewing printed code pages spread out in front, marking corrections, circling decisions, holding the final approval pen poised over the page. A small lamp casts warm directional light on the Dev's hand. Between the two halves a thin vertical divider line; above each half a small caption in handwritten style — left "AI writes", right "Dev judges". Tiny icons float over the Dev's head suggesting judgment criteria: a tree (architecture fit), a magnifying glass (bug hunt), a shield (security), a scale (trade-off).
  Composition: clean 50/50 split-frame, vertical divider mid-frame; AI on left in motion / streaming code; Dev on right in static composed posture; both figures clearly facing the divider; ample whitespace at top for title; warm light on the right side emphasizing the Dev's judgment moment.
  editorial illustration, hand-drawn technical sketch style, warm color palette featuring cream off-white #F5F1E8 background and warm orange #D97757 accents with deep brown #8B6F47 secondary lines, minimalist flat vector with subtle paper texture, clean geometric lines, ample whitespace, educational diagram style, calm composed mood.
  --ar 16:9 --style raw --no photo-realistic, 3d render, neon, gradient glow, cluttered text, watermark, kawaii, anime
  ```
- **Note**: 這是整章最重要的訊息：AI 把寫 code 的「量」做掉了，但 Dev 的價值搬到了「判斷」這一層——判斷哪些函數值得寫、判斷 AI 寫的對不對、判斷在整體架構中放哪。左邊 AI 強調「量 + 速度」、右邊 Dev 強調「審視 + 決策 + 拿筆」的姿態對比要明顯。
