---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "1"
title: "名詞滿天飛"
original_title: "名詞滿天飛"
beat: "情境"
kicker: "SCENARIO"
layout_type: "scenario"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 01 · 名詞滿天飛

## On-slide Text
- Kicker: `SCENARIO`
- Title: 名詞滿天飛
- Body:
  - 工程師叫「data point」、PM 叫「讀數」、DBA 叫「row」
  - 同一件事叫三個名字，需求就會漏掉
  - 建模第一步：把名詞統一成一張表

## Beginner Anchor
沒有統一語言，每個人用不同詞指同一件事——到了寫 API 或 schema 才發現對不上。建模的起點不是畫圖，是先統一名詞。

## Learning Goal
讓學員感受到「名詞不統一」是真實的架構痛點，建立需要進行領域建模的動機。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red `#E8634F` (SCENARIO).
- Background: Deep Navy `#152238`.
- Kicker label: `SCENARIO`, top-left. Coral Red `#E8634F` pill, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned.
- Right side: flat illustration of 3 chat-bubble icons side by side, each containing different text pill (`data point` / `讀數` / `row`), different Coral Red / Mint / Warm White fills to convey confusion; thin 2 px lines, no 3D.
- Below illustration: a faint red diagonal line crossing through the three bubbles to signal the misalignment.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White, aligned with logo.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Scenario slide — illustration-driven, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a scenario/context slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a scenario slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "SCENARIO" pill badge, Coral Red #E8634F background, Warm White text, Inter 700 / 24 px, letter-spacing 0.12 em, rounded capsule. Title "名詞滿天飛" Noto Sans TC 900 / 80 px / Warm White, left-aligned, below kicker. Body: 3 lines Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left side, reading exactly — line 1 "工程師叫「data point」、PM 叫「讀數」、DBA 叫「row」", line 2 "同一件事叫三個名字，需求就會漏掉", line 3 "建模第一步：把名詞統一成一張表". Right side: three side-by-side flat speech bubbles — first bubble in Coral Red with monospace text "data point", second in Mint #97E8D6 with "讀數", third in Warm White outline with "row". A thin red diagonal strike-through line crosses all three bubbles. Clean geometric style, no photos, no 3D, no gradients. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Balanced 16:9 composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite any body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not put realistic logos or product screenshots in the speech bubbles.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
這是最常見的建模災難場景。工程師說 data point、PM 說讀數、DBA 說 row——但他們說的是同一件事。當三種名字在需求文件、API spec 和 DB schema 裡混著用，需求就會漏掉，討論就會浪費時間。解法不是開會爭，是先做一件事：把核心名詞統一成一張表。這就是領域建模的起點。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "名詞滿天飛" — 5 Chinese characters, within 14-char limit.
- [ ] Kicker reads `SCENARIO` and uses Coral Red `#E8634F` beat color.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "工程師叫「data point」、PM 叫「讀數」、DBA 叫「row」" — check ≤ 18 chars (line contains mixed ASCII/Chinese; check visual width).
- [ ] Body line 2: "同一件事叫三個名字，需求就會漏掉" — 16 chars ✓.
- [ ] Body line 3: "建模第一步：把名詞統一成一張表" — 15 chars ✓.
- [ ] Right illustration shows three speech bubbles with different terminology labels.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
