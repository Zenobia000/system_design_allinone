---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "1"
title: "TSDB 掛了就瞎了"
original_title: "TSDB 掛了就瞎了"
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

# Slide 01 · TSDB 掛了就瞎了

## On-slide Text
- Kicker: `SCENARIO`
- Title: TSDB 掛了就瞎了
- Body:
  - 上線前一晚：TimescaleDB 單實例掛掉
  - 告警停了、讀數查不到、整廠監控全黑
  - 停機一小時 = $20,000 的代價

## Beginner Anchor
上線前一晚：單點故障會讓整廠監控全黑。TSDB 單實例是 v3 架構最痛的 SPOF——它一掛，寫入路徑和查詢路徑同時中斷，告警也靜默了。

## Learning Goal
讓學員感受到「單點故障」不是理論風險，而是 $20,000/小時的真實成本，建立對 v3 架構 SPOF 問題的緊迫感，帶出本幕的故障模式分析（FMEA）。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red `#E8634F` (SCENARIO). Kicker pill: Coral Red background, Warm White text, Inter 700 / 24 px, all-caps.
- Background: Deep Navy `#152238`.
- Kicker label: `SCENARIO`, top-left, Coral Red `#E8634F` background pill, Warm White text.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned. Numbers ($20,000) in JetBrains Mono.
- Right visual: A lone database cylinder icon (representing TimescaleDB single instance) struck by a large Coral Red `#E8634F` lightning bolt. The icon sits in shadow / low opacity to suggest offline state. Around it: flat thin-line network nodes (other system components) in Mint `#97E8D6`, disconnected from the database — conveying isolation. Thin 2 px lines, no gradients, no 3D.
- Mood: Late-night crisis. Deep Navy darkness, single Coral Red lightning bolt as the dominant visual accent.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "SCENARIO slide — image_prompt driven, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear prominently on this slide.

## Technical Flow Details
not_applicable — this is a scenario/hook slide establishing the problem, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a scenario slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "SCENARIO" kicker pill — Coral Red #E8634F background, Warm White text, Inter 700 / 24 px, all-caps, rounded. Title "TSDB 掛了就瞎了" Noto Sans TC 900 / 80 px / Warm White #F4F1EA, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White, line-height 1.60; the value "$20,000" in JetBrains Mono. Right third of canvas: a single cylindrical database icon (flat, minimal, 2 px thin lines, Warm White outline at low 30% opacity suggesting offline/dark state) struck by an oversized Coral Red #E8634F lightning bolt icon (bold, central, dominant). Surrounding the database: 3–4 disconnected flat node circles in Mint #97E8D6 at 50% opacity with broken connection lines — conveying system isolation and blackout. Overall mood: late-night crisis, silent monitoring dashboard, the Coral Red lightning is the only strong accent against the dark background. No 3D, no gradients, no neon, no clipart. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not depict a real-world branded server room or photo-realistic hardware.
- Do not move logo or footer outside the 96 px safe margin.
- Do not render extra body lines beyond the 3 listed.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
這是上線前最真實的噩夢。v3 架構的 TimescaleDB 是單一實例——它一旦掛掉，寫入路徑（Stream Processor → TSDB 批次 INSERT）立即失敗，Consumer offset 不提交，Kafka 訊息積壓；讀取路徑（Query API → Redis → TSDB 回查）在 cache TTL 60 秒過期後也中斷；告警路徑的 Stream Processor 無法寫入 TSDB，告警靜默。整廠 10,000 台設備繼續上報，但監控全黑。停機一小時 = $20,000。這一幕從最痛的 SPOF 開始，帶出本幕的核心問題：你的架構能撐住多少故障？

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "TSDB 掛了就瞎了" — 9 Chinese characters (CJK only), within 14-char limit.
- [ ] Kicker reads `SCENARIO` with Coral Red #E8634F background pill.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "上線前一晚：TimescaleDB 單實例掛掉" — within 18 chars ✓
- [ ] Body line 2: "告警停了、讀數查不到、整廠監控全黑" — 17 chars ✓
- [ ] Body line 3: "停機一小時 = $20,000 的代價" — within 18 chars ✓
- [ ] $20,000 matches shared IoT numbers (停機 ~$20,000/hr).
- [ ] Right visual features a Coral Red lightning bolt on a database icon.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
