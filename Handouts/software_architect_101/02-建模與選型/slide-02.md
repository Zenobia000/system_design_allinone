---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "2"
title: "核心名詞與邊界"
original_title: "核心名詞與邊界"
beat: "關鍵提問"
kicker: "KEY QUESTIONS"
layout_type: "key_questions"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · 核心名詞與邊界

## On-slide Text
- Kicker: `KEY QUESTIONS`
- Title: 核心名詞與邊界
- Body:
  - 哪些是核心實體？誰擁有資料？
  - Device 跟 Sensor 是同一件事嗎？
  - Alert 是資料還是事件？邊界在哪？

## Beginner Anchor
三個問題驅動整張 ER 圖：實體是誰、歸誰管、什麼算是邊界。問出來了，圖自然就出來了。

## Learning Goal
讓學員學會用「所有權」和「邊界」兩個維度逼出領域實體清單，而不是直接猜 table schema。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint `#97E8D6` (KEY QUESTIONS).
- Background: Deep Navy `#152238`.
- Kicker label: `KEY QUESTIONS`, top-left. Mint `#97E8D6` pill, Deep Navy text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned.
- Right side: three large question-mark icons arranged in a column, each paired with a short label in Mint `#97E8D6`: "實體？", "所有權？", "語義？". Icons are flat geometric circles with `?` in Inter 900 / Mint. Size ~120 px diameter.
- Below each icon-label pair: a thin Mint 1 px horizontal divider.
- Left body text aligns to the left third of the canvas; right icons occupy the right third.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Key-questions slide — illustration-driven with question icons, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a key-questions slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a key-questions slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "KEY QUESTIONS" pill badge, Mint #97E8D6 background, Deep Navy text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em, rounded capsule. Title "核心名詞與邊界" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Left portion: 3 body lines Noto Sans TC 500 / 34 px / Warm White / line-height 1.60. Right portion: three vertically stacked flat geometric circles (~120 px diameter) in Mint #97E8D6 outline / 2 px, each containing a "?" in Inter 900 Mint, paired with small label text "實體？", "所有權？", "語義？" to the right of each circle, Noto Sans TC 500 / 28 px / Mint. Thin Mint 1 px dividers between each icon-label pair. No 3D, no gradients, no photos. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Clean 16:9 composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite any body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render more than 3 question icons.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
三個問題本身就是建模的驅動力。第一問：哪些是核心實體，誰擁有資料？一台設備歸某個客戶，所有它的感測器資料也歸它。第二問：Device 跟 Sensor 是同一件事嗎？不是——一台設備可以有多個感測器，1:N 關係。第三問：Alert 是資料還是事件？Alert 是業務語義——是「某個閾值被超過的記錄」，不只是 DB 裡的一個 row，但它確實要持久化。邊界問清楚，ER 圖的五個實體就自然浮出來了。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "核心名詞與邊界" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `KEY QUESTIONS` and uses Mint `#97E8D6` beat color.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "哪些是核心實體？誰擁有資料？" — 14 chars ✓.
- [ ] Body line 2: "Device 跟 Sensor 是同一件事嗎？" — check ASCII mixed, visual width ≤ 18 ✓.
- [ ] Body line 3: "Alert 是資料還是事件？邊界在哪？" — check ≤ 18 chars ✓.
- [ ] Right side has 3 question-mark icons with labels "實體？", "所有權？", "語義？".
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
