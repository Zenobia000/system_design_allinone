---
chapter: "幕 1：需求與約束"
chapter_id: "01"
chapter_slug: "01-需求與約束"
slide: "1"
title: "老闆只說要快要穩"
original_title: "老闆只說要快要穩"
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

# Slide 01 · 老闆只說要快要穩

## On-slide Text
- Kicker: `SCENARIO`
- Title: 老闆只說要快要穩
- Body:
  - 「快」是多快？1 秒？10 秒？允許多少例外？
  - 「穩」是幾個 9？99%？99.9%？還是 99.99%？
  - 模糊形容詞無法施工，系統無從驗收。

## Beginner Anchor
每個架構師都遇過這句話。問題不在老闆，在你——聽完之後你要能問出可量測的數字，而不是點頭說「好的沒問題」。

## Learning Goal
讓學員感受到「模糊需求」是架構師的第一道真實挑戰，建立「必須把形容詞逼成數字」的本能反射。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red `#E8634F` (SCENARIO).
- Background: Deep Navy `#152238`.
- Kicker label: `SCENARIO`, top-left, Coral Red `#E8634F` background pill, Warm White `#F4F1EA` text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned, upper content area.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned.
- Right-side illustration: a hand-sketched-style blank requirements document, with only the words「快」and「穩」visible plus a cluster of large question marks (「?」symbols), drawn in Mint `#97E8D6` thin lines / 2 px, flat style, no gradients, no 3D, no photos.
- Logo: `logo-light.png`, 64 px height, bottom-right, within 96 px safe margin.
- Footer: `桑尼資料科學 · 版權所有 ©`, Noto Sans TC 500 / 22 px / Warm White `#F4F1EA`, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "SCENARIO slide — narrative and illustration driven, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a scenario/problem-framing slide with no technical flow content.

## VCRE Scorecard
not_applicable — this is a scenario slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "SCENARIO" pill badge in Coral Red #E8634F background, Warm White text, rounded pill, 24 px Inter 700. Title "老闆只說要快要穩" in Noto Sans TC 900 / 80 px / Warm White #F4F1EA, left-aligned, upper section. Below title: exactly 3 body lines in Noto Sans TC 500 / 34 px / Warm White, line-height 1.60, left-aligned, with these exact Chinese strings verbatim — line 1: "「快」是多快？1 秒？10 秒？允許多少例外？"; line 2: "「穩」是幾個 9？99%？99.9%？還是 99.99%？"; line 3: "模糊形容詞無法施工，系統無從驗收。". Right section: a minimal flat line-art illustration of a blank document/requirements sheet showing only the characters「快」and「穩」and several large question mark symbols, drawn in Mint #97E8D6 thin 2 px lines, flat style, no gradients, no 3D, no photos. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Clean 16:9 composition, no extra invented text.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not add a complete filled-in requirements document on the right side — it must look blank/empty with only question marks.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
這是接到新案後最常見的開局。老闆說「要快要穩」，技術主管點頭說「沒問題」，然後大家開始畫架構圖——結果兩個月後才發現快的標準是每個人心中不同的數字。架構師的第一刀不是選技術，是把「快」和「穩」逼出一個所有人都認可的數字。這一幕就是教這個。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "老闆只說要快要穩" — 9 Chinese characters, within 14-char limit.
- [ ] Kicker reads `SCENARIO` and uses Coral Red `#E8634F` beat color.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "「快」是多快？1 秒？10 秒？允許多少例外？" ≤ 18 chars ✓
- [ ] Body line 2: "「穩」是幾個 9？99%？99.9%？還是 99.99%？" ≤ 18 chars ✓
- [ ] Body line 3: "模糊形容詞無法施工，系統無從驗收。" — 17 CJK chars ≤ 18 ✓
- [ ] Right-side illustration looks like an incomplete/blank requirements doc with question marks.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
