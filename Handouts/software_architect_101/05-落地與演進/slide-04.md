---
chapter: "幕 5：落地與演進"
chapter_id: "05"
chapter_slug: "05-落地與演進"
slide: "4"
title: "可觀察性三本柱"
original_title: "可觀察性三本柱"
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

# Slide 04 · 可觀察性三本柱

## On-slide Text
- Kicker: `METHOD`
- Title: 可觀察性三本柱
- Vocabulary Cards (2×2 grid):
  - Card 1: `Logs` / 事件記錄 — 結構化 JSON；記錄是什麼事件發生了
  - Card 2: `Metrics` / 可聚合數值 — CPU、latency、lag；看趨勢與告警閾值
  - Card 3: `Traces` / 跨服務請求路徑 — 端對端追蹤；找出慢在哪個服務
  - Card 4: `OpenTelemetry` / 統一遙測 SDK — 一次接入，同時輸出三類訊號
- Selection rationale gloss (one line below the grid):
  - `為何用 OTel 統一 SDK：`
  - `一次接入三類訊號，免維護三套庫`

## Beginner Anchor
Logs 問「發生了什麼」，Metrics 問「現在有多少」，Traces 問「慢在哪裡」——三者缺一不可。

## Learning Goal
讓學員記住可觀察性三本柱的區別（Logs/Metrics/Traces），以及 OpenTelemetry 如何統一接入；知道各自解決什麼問題。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left. Pill style: Deep Teal `#2E7D86` background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, below kicker, left-aligned.
- Vocabulary Card Grid (2×2, centered below title, ~85% canvas width, gap 24 px):
  Each card: Deep Teal `#2E7D86` background, rounded 16 px, Warm White text.
  - Top row: `Logs` card (left), `Metrics` card (right).
  - Bottom row: `Traces` card (left), `OpenTelemetry` card (right).
  Card layout per style guide:
  - English term: JetBrains Mono / 34 px / Warm White `#F4F1EA`, bold.
  - Slash separator + Chinese name: Noto Sans TC 500 / 34 px / Warm White.
  - Thin Warm White `#F4F1EA` horizontal rule (1 px, 80% card width).
  - One-line definition ≤ 18 chars: Noto Sans TC 500 / 34 px / Warm White.
  - Card corner radius: 16 px.
- Selection rationale gloss (centered, one line below the 2×2 grid, two text rows each ≤ 18 chars): Noto Sans TC 500 / 28 px / Mint `#97E8D6`. Row 1 `為何用 OTel 統一 SDK：`, row 2 `一次接入三類訊號，免維護三套庫`.
- Logo: `logo-light.png`, 64 px height, bottom-right corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD vocabulary-card slide — four vocabulary cards for observability pillars, no architecture diagram required."
```

## Logo Assets
none — OpenTelemetry is named as a term in the vocabulary card, but no brand logo strip is required for a vocabulary-card METHOD slide. Logo strip for OpenTelemetry, Prometheus, and Grafana appears on slide-06 (the programmatic diagram artifact slide).

## Technical Flow Details
not_applicable — this is a method/vocabulary-card slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Below: Title "可觀察性三本柱" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content: 2×2 grid of vocabulary cards, each card Deep Teal #2E7D86 background rounded 16 px, gap 24 px, fitting within ~85% canvas width. Each card: English term JetBrains Mono 34 px Warm White, slash + Chinese name Noto Sans TC 500 34 px Warm White, thin Warm White horizontal rule, one-line definition Noto Sans TC 500 34 px Warm White. Render the four cards verbatim — top-left "Logs / 事件記錄 — 結構化 JSON；記錄是什麼事件發生了"; top-right "Metrics / 可聚合數值 — CPU、latency、lag；看趨勢與告警閾值"; bottom-left "Traces / 跨服務請求路徑 — 端對端追蹤；找出慢在哪個服務"; bottom-right "OpenTelemetry / 統一遙測 SDK — 一次接入，同時輸出三類訊號". For each card the English term is on the first line, then " / " plus the Chinese name, then the rule, then the text after " — " is the one-line definition below the horizontal rule. Below the 2×2 grid, centered, render a two-line selection-rationale gloss in Noto Sans TC 500 / 28 px / Mint #97E8D6 — line 1 "為何用 OTel 統一 SDK：", line 2 "一次接入三類訊號，免維護三套庫". Flat card layout, no gradients, no 3D. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra vocabulary cards beyond the 4 defined.
- Do not conflate Logs with Metrics, or Traces with either — each card must represent the correct distinct concept.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not generate brand logos (OpenTelemetry) inside cards — terms only. Logo strip appears on slide-06.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
三本柱是可觀察性的基礎，三者有清楚的分工。Logs 是事件記錄：「告警 #123 在 14:32:05 觸發，sensor_id=42，value=98.3」——結構化 JSON 比 print() 方便搜尋和聚合。Metrics 是可聚合的數字：CPU 使用率、API 延遲 P99、Kafka Consumer lag——你可以對它畫趨勢圖、設告警閾值，問的是「現在的數字是多少」。Traces 是跨服務的請求路徑追蹤：一個告警從 Device 到 Alert Service 端對端走了幾毫秒、卡在 Ingest API 還是 Processor——沒有 Traces，你只能在每個服務的 Logs 裡 grep，跨服務除錯是地獄。OpenTelemetry 是把這三者統一的 SDK 和標準，用它，你就不必每個服務各自接一套 logging/metrics/tracing 庫，一次接入，三類訊號同時輸出到 Collector。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "可觀察性三本柱" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` with Deep Teal `#2E7D86` background, Warm White text.
- [ ] 4 vocabulary cards in 2×2 grid, each with term / name / definition structure.
- [ ] Each card definition ≤ 18 Chinese characters.
- [ ] Card 1: Logs / 事件記錄 — definition correct (結構化 JSON，記錄事件).
- [ ] Card 2: Metrics / 可聚合數值 — definition correct (CPU/latency/lag，趨勢與告警).
- [ ] Card 3: Traces / 跨服務請求路徑 — definition correct (端對端追蹤，找慢點).
- [ ] Card 4: OpenTelemetry / 統一遙測 SDK — definition correct (一次接入，三類輸出).
- [ ] Logs ≠ Metrics ≠ Traces — three distinct concepts correctly distinguished.
- [ ] All cards use Deep Teal `#2E7D86` background, Warm White text, rounded 16 px.
- [ ] Term text uses JetBrains Mono.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] `Diagram Spec` marked `not_applicable: true`.
- [ ] `Logo Assets` states none (logo strip deferred to slide-06).
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
