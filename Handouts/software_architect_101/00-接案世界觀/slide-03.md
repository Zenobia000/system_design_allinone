---
chapter: "第 0 章：接案世界觀"
chapter_id: "00"
chapter_slug: "00-接案世界觀"
slide: "3"
title: "架構師不是最強工程師"
original_title: "架構師不是最強工程師"
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

# Slide 03 · 架構師不是最強工程師

## On-slide Text
- Kicker: `METHOD`
- Title: 架構師不是最強工程師
- Body: (詞彙卡 — see Visual Spec)
  - 詞彙卡術語行: `Software Architect` / 軟體架構師
  - 詞彙卡定義行: 把商業目標翻譯成技術決策的人
- Supplementary contrast lines (below vocabulary card):
  - 工程師：讓系統跑起來
  - 架構師：決定系統長成什麼樣

## Beginner Anchor
架構師的核心工作是「翻譯」：把「故障損失 $20,000/小時」翻成「P99 < 10 秒告警」。

## Learning Goal
澄清架構師角色的定義，消除「架構師＝技術最強的工程師」的誤解，建立「翻譯者」的心智模型。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em, Deep Teal `#2E7D86` pill background, Warm White text.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned, upper area.
- Vocabulary card (詞彙卡 format per Style Guide):
  - Container: rounded-rect 16 px, background Deep Teal `#2E7D86`, width ~70% of canvas, centered below title.
  - Top row: `` `Software Architect` `` (JetBrains Mono 500 / 34 px / Warm White #F4F1EA) + ` / 軟體架構師` (Noto Sans TC 500 / 34 px / Warm White), same line, separated by ` / `.
  - Divider line: 1 px Warm White 40% opacity.
  - Bottom row: `把商業目標翻譯成技術決策的人` (Noto Sans TC 500 / 34 px / Warm White / line-height 1.40).
- Below card: two contrast lines in Mint `#97E8D6` / Noto Sans TC 500 / 34 px:
  - `工程師：讓系統跑起來`
  - `架構師：決定系統長成什麼樣`
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Vocabulary card / method slide — no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a method/vocabulary slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge in Deep Teal #2E7D86, Warm White text. Title "架構師不是最強工程師" in Noto Sans TC 900 / 80 px / #F4F1EA, left-aligned, upper section. Center: a large vocabulary card (rounded rect 16 px, background Deep Teal #2E7D86, ~70% width, centered). Inside the card: top line shows monospace text "Software Architect" then " / " then Chinese "軟體架構師" side by side; a thin divider; bottom line shows the one-line Chinese definition reading exactly "把商業目標翻譯成技術決策的人". Below the card: two contrast lines in Mint #97E8D6, line 1 reads "工程師：讓系統跑起來" and line 2 reads "架構師：決定系統長成什麼樣". Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Clean, focused layout with the vocabulary card as the visual anchor. No extra invented text.

## Negative Prompt
- Do not invent extra Chinese text or alter the vocabulary card definition.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black, glossy 3D, gradient glows, random stickers, or clipart.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not render the vocabulary card in a different color — it must be Deep Teal #2E7D86.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
這張打破最常見的誤解：架構師不是技術最強的人，而是能把商業約束翻成技術決策的人。本課的案例：業主說「每小時停機損失 $20,000，要把故障發現時間從 30 分鐘壓到 1 分鐘以內」——架構師的工作就是把這句話翻成「告警系統 P99 延遲 < 10 秒」。詞彙卡要乾淨，視覺衝擊強，一句白話就說清楚。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "架構師不是最強工程師" is exactly 11 characters — within 14-char limit.
- [ ] Vocabulary card follows Style Guide format: Deep Teal `#2E7D86` background, Warm White text, rounded 16 px, JetBrains Mono for term.
- [ ] Vocabulary card term row shows `Software Architect / 軟體架構師`.
- [ ] Vocabulary card definition ≤ 18 Chinese characters: `把商業目標翻譯成技術決策的人` = 14 chars ✓.
- [ ] Contrast lines below card are ≤ 18 chars each.
- [ ] Total body lines (card + contrast) ≤ 3 — card counts as 1 visual element, contrast lines as 2.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
