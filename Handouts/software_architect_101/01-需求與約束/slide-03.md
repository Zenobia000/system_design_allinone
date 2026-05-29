---
chapter: "幕 1：需求與約束"
chapter_id: "01"
chapter_slug: "01-需求與約束"
slide: "3"
title: "功能 vs 非功能需求"
original_title: "功能 vs 非功能需求"
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

# Slide 03 · 功能 vs 非功能需求

## On-slide Text
- Kicker: `METHOD`
- Title: 功能 vs 非功能需求
- Vocabulary Cards (replaces plain body lines — 3 cards):
  - Card 1 — `NFR` / 非功能需求：系統「怎麼運作」，不是「做什麼」
  - Card 2 — `SLA` / 服務等級協議：可用性和延遲的白紙黑字承諾
  - Card 3 — `SLO` / `SLI`：SLO 是內部目標，SLI 是量到的實際比例

## Beginner Anchor
工程師寫的「顯示設備狀態」是功能需求（做什麼）；「P99 延遲 < 10 秒」是非功能需求（怎麼運作）。架構師必須兩者都寫清楚。

## Learning Goal
讓學員分辨功能需求（FR）與非功能需求（NFR），理解 SLA/SLO/SLI 三個層次的差異，建立「NFR 決定設計上限」的認知。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Warm White `#F4F1EA` (METHOD slides use light background).
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` background pill, Warm White `#F4F1EA` text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Deep Navy `#152238`, left-aligned.
- Three vocabulary cards (horizontal row, equal width, rounded 16 px, gap 20 px, spanning ~90% content width):
  - Each card: background Deep Teal `#2E7D86`, Warm White text, rounded 16 px.
  - Top of card: English term in JetBrains Mono / 34 px / Warm White `#F4F1EA`.
  - Middle: Chinese name in Noto Sans TC 700 / 34 px / Warm White.
  - Separator line: Mint `#97E8D6` / 1 px.
  - Bottom: one-sentence plain definition ≤ 18 Chinese chars, Noto Sans TC 500 / 30 px / Warm White, line-height 1.40.
- Logo: `logo-dark.png` or `logo-main.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, Noto Sans TC 500 / 22 px / Deep Navy `#152238`, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD / vocabulary-card slide — three term cards, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a vocabulary/method introduction slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Warm White #F4F1EA. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge in Deep Teal #2E7D86 background, Warm White text, rounded pill, 24 px Inter 700. Title "功能 vs 非功能需求" in Noto Sans TC 900 / 80 px / Deep Navy #152238, left-aligned. Center: three equal horizontal vocabulary cards (rounded 16 px, gap 20 px, ~90% content width). Each card background Deep Teal #2E7D86. Card 1: top "NFR" in JetBrains Mono 34 px Warm White; middle "非功能需求" Noto Sans TC 700 34 px Warm White; separator line Mint #97E8D6 1 px; bottom definition line Noto Sans TC 500 30 px Warm White. Card 2: same layout, "SLA" / "服務等級協議" / definition. Card 3: "SLO / SLI" / "服務目標與指標" / definition. Below cards: optional thin Mint #97E8D6 1 px rule. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Deep Navy at bottom-left. Clean tool-like presentation.

## Negative Prompt
- Do not invent extra Chinese text, extra cards, or extra terms beyond NFR, SLA, SLO/SLI.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use a white #FFFFFF large-area background (use Warm White #F4F1EA only).
- Do not render fewer or more than 3 vocabulary cards.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
工程師習慣想功能需求：「系統要顯示設備狀態、要發告警、要畫趨勢圖」——這是「做什麼」。非功能需求是「怎麼運作」：多快回應、多少人同時用、掛掉多久算違約。SLA 是對外承諾，SLO 是內部目標（通常比 SLA 更嚴，例如 SLA 99.9% 但內部 SLO 跑 99.95%），SLI 是你真正在量的數字，例如每分鐘成功請求比例。三個術語架構師都必須會用，不能混著說。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "功能 vs 非功能需求" — 9 Chinese characters + 2 Latin chars (vs), within 14-char limit.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Background is Warm White `#F4F1EA` (not pure white `#FFFFFF`, not dark).
- [ ] Exactly 3 vocabulary cards present: NFR / SLA / SLO+SLI.
- [ ] Each card shows: English term (JetBrains Mono), Chinese name, plain definition ≤ 18 chars.
- [ ] Card backgrounds are Deep Teal `#2E7D86`.
- [ ] Logo is dark version (`logo-dark.png` or `logo-main.png`), 64 px height, bottom-right.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px Deep Navy.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
