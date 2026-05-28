---
chapter: "第 0 章：接案世界觀"
chapter_id: "00"
chapter_slug: "00-接案世界觀"
slide: "6"
title: "VCRE 計分卡"
original_title: "VCRE 計分卡"
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

# Slide 06 · VCRE 計分卡

## On-slide Text
- Kicker: `METHOD`
- Title: VCRE 計分卡
- Body: (VCRE 四格計分卡 — replaces plain body lines)
  - V 商業價值 / Value: 這決策賺錢/省錢/降風險嗎？
  - C 成本 / Cost TCO: 雲費＋人力＋維運總和？
  - R 風險 / Risk: SPOF 在哪？十倍流量撐得住？
  - E 可演進 / Evolvability: 三年後要改，會被卡住嗎？
- Caption below cards: 沒有最好的答案，只有取捨。

## Beginner Anchor
每次選技術方案前，先問這四題——VCRE 是你做決策時的防呆清單。

## Learning Goal
發放 VCRE 計分卡工具，讓學員記住 V/C/R/E 四個維度，建立「沒有最佳解，只有取捨」的決策心智。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Warm White `#F4F1EA` (lighter background for contrast with dark cards).
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` pill, Warm White text.
- Title: Noto Sans TC 900 / 80 px / Deep Navy `#152238`, left-aligned, upper section.
- VCRE four-card row (horizontal, equal width, rounded 16 px, spacing 20 px, spanning ~90% width):
  - Card V (商業價值): background `#152238`. Top: `V` Inter 800 / 48 px / Mint `#97E8D6`. Mid: `商業價值` Noto Sans TC 700 / 34 px / Warm White. Sub: `Value` JetBrains Mono 500 / 26 px / Mint `#97E8D6`. Bottom: `這決策賺錢/省錢/降風險嗎？` Noto Sans TC 500 / 26 px / Warm White / line-height 1.40.
  - Card C (成本): background `#2E7D86`. Top: `C` Inter 800 / 48 px / Warm White. Mid: `成本` Noto Sans TC 700 / 34 px / Warm White. Sub: `Cost TCO` JetBrains Mono / 26 px / Mint `#97E8D6`. Bottom: `雲費＋人力＋維運總和？` Noto Sans TC 500 / 26 px / Warm White.
  - Card R (風險): background `#152238`. Top: `R` Inter 800 / 48 px / Mint `#97E8D6`. Mid: `風險` Noto Sans TC 700 / 34 px / Warm White. Sub: `Risk` JetBrains Mono / 26 px / Mint `#97E8D6`. Bottom: `SPOF 在哪？十倍流量撐得住？` Noto Sans TC 500 / 26 px / Warm White.
  - Card E (可演進): background `#2E7D86`. Top: `E` Inter 800 / 48 px / Warm White. Mid: `可演進` Noto Sans TC 700 / 34 px / Warm White. Sub: `Evolvability` JetBrains Mono / 26 px / Mint `#97E8D6`. Bottom: `三年後要改，會被卡住嗎？` Noto Sans TC 500 / 26 px / Warm White.
- Caption below four cards: `沒有最好的答案，只有取捨。` Noto Sans TC 400 / 26 px / Deep Navy `#152238`, left-aligned.
- Logo: `logo-dark.png` or `logo-main.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Deep Navy `#152238`, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "VCRE scorecard introduction slide — method card layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a decision framework introduction slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this slide introduces the VCRE framework itself (it is the definition slide, not a decision evaluation slide). VCRE scoring is applied starting from Act 1 trade-off slides.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Warm White #F4F1EA. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge Deep Teal #2E7D86, Warm White text. Title "VCRE 計分卡" in Noto Sans TC 900 / 80 px / Deep Navy #152238, left-aligned. Center: four equal horizontal cards (rounded 16 px, spacing 20 px, ~90% width total). Alternating backgrounds: card 1 Deep Navy #152238, card 2 Deep Teal #2E7D86, card 3 Deep Navy, card 4 Deep Teal. Each card has: large letter (V/C/R/E) at top, Chinese dimension name in middle, English name in JetBrains Mono, one-line question at bottom — all in Warm White / Mint. Below cards: caption "沒有最好的答案，只有取捨。" in Deep Navy 26 px. Bottom-right: logo placeholder 64 px (dark version). Footer "桑尼資料科學 · 版權所有 ©" 22 px Deep Navy. Balanced, tool-like presentation.

## Negative Prompt
- Do not invent extra Chinese text, extra cards, or extra dimensions beyond V/C/R/E.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use a white #FFFFFF large-area background (use Warm White #F4F1EA only).
- Do not render fewer or more than four VCRE cards.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
這是課程最核心的決策工具，從 Ch0 發放、每幕的取捨拍都要用。學員要記住 V/C/R/E 四個字母——每個技術決策都要從這四個維度想一遍。本課從這張起正式啟動 VCRE 思維：不再問「這方案好不好？」，而是問「V 方面它賺什麼？C 方面要多少成本？R 方面最大的風險是？E 方面三年後好不好改？」最後那句「沒有最好的答案，只有取捨」是課程哲學核心，不可省略。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "VCRE 計分卡" — 5 Chinese characters + 4 Latin = well within 14-char limit.
- [ ] Four cards present: V / C / R / E, in that order.
- [ ] Each card shows: dimension letter, Chinese name, English name (JetBrains Mono), one-line question.
- [ ] Card V & R: background Deep Navy `#152238`; Card C & E: background Deep Teal `#2E7D86`.
- [ ] Caption `沒有最好的答案，只有取捨。` present below cards.
- [ ] Background is Warm White `#F4F1EA` (not pure white `#FFFFFF`).
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Logo is dark version (`logo-dark.png` or `logo-main.png`), 64 px height, bottom-right.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px Deep Navy.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
