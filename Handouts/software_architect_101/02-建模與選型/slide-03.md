---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "3"
title: "統一語言與限界"
original_title: "統一語言與限界"
beat: "方法"
kicker: "METHOD"
layout_type: "method"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 03 · 統一語言與限界（詞彙卡）

## On-slide Text
- Kicker: `METHOD`
- Title: 統一語言與限界
- Vocabulary Cards (3 cards, stacked vertically):
  - Card A: `Ubiquitous Language` / 統一語言 — 全團隊用同一套術語描述業務 · 例：全員都叫它 Reading
  - Card B: `Bounded Context` / 限界上下文 — 術語意義有效的邊界範圍 · 例：監控與計費各自獨立
  - Card C: `Domain Model` / 領域模型 — 業務實體與關係的結構化描述 · 例：Device 一對多 Reading

## Beginner Anchor
DDD 三個核心術語：統一語言是共識，限界上下文是邊界，領域模型是產出。這三件事做完，下一張的 ER 圖就是你的白皮書 v2。

## Learning Goal
讓學員認識 DDD 的三個基礎概念，並能用一句白話解釋每個術語，為 slide-04 領域模型 ER 圖奠定詞彙基礎。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left. Deep Teal `#2E7D86` pill, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em, rounded capsule.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned, below kicker.
- Vocabulary Cards: 3 cards, vertically stacked below title, gap 24 px between cards, each card 100% width of content area (~1728 px), height ~160 px, rounded corners 16 px, Deep Teal `#2E7D86` background.
  - Card content layout (horizontal):
    - Left block: English term in JetBrains Mono 500 / 34 px / Mint `#97E8D6` + ` / ` separator in Warm White + Chinese name in Noto Sans TC 500 / 34 px / Warm White. Left-padded 40 px.
    - Right block (after em-dash `—`): White-paper definition in Noto Sans TC 500 / 34 px / Warm White / line-height 1.40. ≤ 18 chars.
    - Example line (below definition): `例：…` caption in Noto Sans TC 500 / 26 px / Mint `#97E8D6`, ≤ 18 chars, drawn from this course's case (Device/Reading domain). Sits inside the card, below the definition.
  - Card A definition: 全團隊用同一套術語描述業務 · example: 例：全員都叫它 Reading
  - Card B definition: 術語意義有效的邊界範圍 · example: 例：監控與計費各自獨立
  - Card C definition: 業務實體與關係的結構化描述 · example: 例：Device 一對多 Reading
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Method/vocabulary-card slide — three DDD term cards, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide. DDD is a methodology, not a product; no logo required.

## Technical Flow Details
not_applicable — this is a vocabulary/method slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge, Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em, rounded capsule. Title "統一語言與限界" Noto Sans TC 900 / 80 px / Warm White, left-aligned below kicker. Below title: 3 vocabulary cards stacked vertically, gap 24 px, each spanning full content width, height ~160 px, rounded corners 16 px, Deep Teal #2E7D86 fill. Each card: left side shows English term in JetBrains Mono 500 / 34 px / Mint #97E8D6, then " / " separator, then Chinese name in Noto Sans TC 500 / 34 px / Warm White; right side shows em-dash "—" followed by a single-line Chinese definition in Noto Sans TC 500 / 34 px / Warm White, ≤ 18 chars, and below that definition a smaller example caption "例：…" in Noto Sans TC 500 / 26 px / Mint #97E8D6, ≤ 18 chars. Card A: "Ubiquitous Language / 統一語言 — 全團隊用同一套術語描述業務" with example caption "例：全員都叫它 Reading". Card B: "Bounded Context / 限界上下文 — 術語意義有效的邊界範圍" with example caption "例：監控與計費各自獨立". Card C: "Domain Model / 領域模型 — 業務實體與關係的結構化描述" with example caption "例：Device 一對多 Reading". No decorative icons, no 3D, no gradients. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Clean structured layout.

## Negative Prompt
- Do not invent extra vocabulary cards or change the three DDD terms listed.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use a font other than JetBrains Mono for the English terms.
- Do not shrink font size below 34 px to force more text.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
DDD 三個術語是這幕的工具箱。Ubiquitous Language：全團隊——工程師、PM、客服——用同一套詞彙描述業務，沒有暗語翻譯。Bounded Context：一個術語在哪個邊界內有效？比如「Customer」在結帳系統和後台管理系統可能是不同的模型；邊界內的語言一致，邊界外可以不同。Domain Model：用結構化的方式把業務實體（名詞）和它們的關係畫出來——這就是下一張的 ER 圖。三個概念的順序是：先共識語言，再劃邊界，最後畫模型。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "統一語言與限界" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Exactly 3 vocabulary cards present, stacked vertically.
- [ ] Card A: `Ubiquitous Language` / 統一語言 — definition ≤ 18 chars ✓ (12 chars); example `例：全員都叫它 Reading` ≤ 18 chars.
- [ ] Card B: `Bounded Context` / 限界上下文 — definition ≤ 18 chars ✓ (11 chars); example `例：監控與計費各自獨立` ≤ 18 chars.
- [ ] Card C: `Domain Model` / 領域模型 — definition ≤ 18 chars ✓ (12 chars); example `例：Device 一對多 Reading` ≤ 18 chars.
- [ ] English terms use JetBrains Mono 34 px / Mint #97E8D6.
- [ ] Card background is Deep Teal `#2E7D86` with 16 px rounded corners.
- [ ] No body text outside the vocabulary cards (only title + 3 cards).
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
