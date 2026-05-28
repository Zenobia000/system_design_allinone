---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "3"
title: "找出單點故障"
original_title: "找出單點故障"
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

# Slide 03 · 找出單點故障

## On-slide Text
- Kicker: `METHOD`
- Title: 找出單點故障
- Vocabulary Cards (3 cards):
  1. SPOF / Single Point of Failure / 單點故障
     - 一個元件掛掉即造成整體服務中斷
  2. Availability / 可用性
     - 系統在約定時間內正常服務的比例
  3. FMEA / Failure Mode & Effects Analysis / 故障模式分析
     - 逐一問：這個元件壞了，影響是什麼？

## Beginner Anchor
詞彙卡：SPOF / Availability / FMEA 故障模式——三個術語是本幕的分析語言，掌握定義才能開始找風險。

## Learning Goal
讓學員理解並記住三個核心術語：SPOF（單點故障）、Availability（可用性）、FMEA（故障模式分析），作為後續 SPOF 標記和 FMEA 表的語言基礎。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD). Kicker pill: Deep Teal `#2E7D86` background, Warm White text, Inter 700 / 24 px, all-caps.
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` pill, Warm White text.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Vocabulary Cards: 3 cards in horizontal strip or 3-row column arrangement.
  - Each card: background Deep Teal `#2E7D86`, rounded 16 px, Warm White text.
  - Top of card: English term in JetBrains Mono 500 / 34 px / Warm White. If has acronym: acronym in JetBrains Mono Bold, full name in lighter weight.
  - Divider line: Mint `#97E8D6` 1 px.
  - Bottom of card: Chinese definition in Noto Sans TC 500 / 34 px / Warm White, ≤ 18 characters.
  - Card width: equal thirds (horizontal) or full-width rows (vertical). Horizontal recommended.
  - Gap between cards: 24 px.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD slide — vocabulary card layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a vocabulary/method slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" kicker pill — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, rounded. Title "找出單點故障" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 vocabulary cards arranged in a horizontal strip across ~85% of canvas width, equal width, 24 px gap, rounded 16 px, Deep Teal #2E7D86 background. Card 1: top "SPOF" in JetBrains Mono 34 px Warm White bold, below a thin Mint #97E8D6 1 px divider, below "一個元件掛掉即造成整體服務中斷" in Noto Sans TC 500 34 px Warm White. Card 2: top "Availability" JetBrains Mono 34 px, definition "系統在約定時間內正常服務的比例". Card 3: top "FMEA" JetBrains Mono 34 px, definition "逐一問：這個元件壞了，影響是什麼？". All definitions ≤ 18 Chinese characters. Balanced, clean, educational card layout. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra Chinese text or extra vocabulary cards beyond the 3 defined.
- Do not change the definitions — accuracy matters for technical vocabulary.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use a different background color for the vocabulary cards (must be Deep Teal #2E7D86).
- Do not move logo or footer outside the 96 px safe margin.
- Do not render more or fewer than 3 vocabulary cards.

## Speaker Notes
三個術語是本幕的分析語言。SPOF（Single Point of Failure，單點故障）：一個元件掛掉就讓整體服務中斷。SPOF 不一定是壞設計，但需要被識別出來並決定是否要消除它。Availability（可用性）：正常服務時間除以總時間，99.9% = 每月允許約 43 分鐘停機。我們的 SLA 目標是 99.9%。FMEA（Failure Mode and Effects Analysis，故障模式分析）：不是等壞掉再說，而是主動問「如果這個元件壞了，影響是什麼？要怎麼緩解？」把這三個術語貫通，就能在 slide-05 的 v4 白皮書圖上，有系統地標出 SPOF 並制定緩解策略。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "找出單點故障" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` with Deep Teal #2E7D86 background pill.
- [ ] Exactly 3 vocabulary cards present: SPOF, Availability, FMEA.
- [ ] Card 1 English term: "SPOF" in JetBrains Mono.
- [ ] Card 2 English term: "Availability" in JetBrains Mono.
- [ ] Card 3 English term: "FMEA" in JetBrains Mono.
- [ ] Each card definition ≤ 18 Chinese characters.
- [ ] Card backgrounds are Deep Teal #2E7D86 with Warm White text.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
