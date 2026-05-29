---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "5"
title: "時序資料怎麼存"
original_title: "時序資料怎麼存"
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

# Slide 05 · 時序資料怎麼存

## On-slide Text
- Kicker: `KEY QUESTIONS`
- Title: 時序資料怎麼存
- Body:
  - 每天 35 GB 讀數，SQL 還是 NoSQL？
  - 查詢：過去 1 小時某感測器平均值
  - 刪除：超過 90 天資料自動 purge

## Beginner Anchor
時序資料有三個特徵：只寫不改（append-only）、以時間為主鍵查詢、按時間批刪。這三個特徵定義了「什麼是對的存法」。

## Learning Goal
讓學員從讀數的查詢模式和刪除模式推導出「時序資料庫」的需求，而不是從資料庫的名字出發。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint `#97E8D6` (KEY QUESTIONS).
- Background: Deep Navy `#152238`.
- Kicker label: `KEY QUESTIONS`, top-left. Mint `#97E8D6` pill, Deep Navy text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left third of canvas.
  - Technical values (`35 GB`, `1 小時`, `90 天`) in JetBrains Mono.
- Right side: two-panel comparison illustration (left sub-panel: SQL table icon with row-by-row grid, labeled "通用 SQL"; right sub-panel: time-series line chart, labeled "時序 DB"). Arrow between them pointing right with question mark. Colors: SQL panel border Deep Teal `#2E7D86`, time-series panel border Mint `#97E8D6`. Flat geometric style, 2 px lines.
- Big number `35 GB` displayed prominently above the comparison panels: Inter 900 / 100 px / Mint `#97E8D6`, with sub-label `/天` in Noto Sans TC 500 / 34 px.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Key-questions slide — comparison illustration, not a formal architecture diagram."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide (tool names are introduced in slide-06 and slide-07).

## Technical Flow Details
not_applicable — this is a key-questions slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a key-questions slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "KEY QUESTIONS" pill badge, Mint #97E8D6 background, Deep Navy text, Inter 700 / 24 px, all-caps. Title "時序資料怎麼存" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Left portion: 3 body lines Noto Sans TC 500 / 34 px / Warm White, with "35 GB", "1 小時", "90 天" in JetBrains Mono Mint. Right portion: a two-panel comparison diagram. Left panel: flat grid icon representing a SQL table (rows + columns, 2 px Teal lines), labeled "通用 SQL" in Noto Sans TC 26 px Warm White, bordered Deep Teal #2E7D86. Right panel: a simple time-series line chart (line in Mint #97E8D6, x-axis labeled "時間", y-axis labeled "值", 2 px lines), labeled "時序 DB" in 26 px Warm White, bordered Mint #97E8D6. A horizontal arrow with a "?" bubble in Coral Red #E8634F between the two panels. Above both panels: big number "35 GB" in Inter 900 / 100 px / Mint #97E8D6, with "/天" in Noto Sans TC 34 px Warm White. No 3D, no gradient, no photos. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra Chinese text or rewrite any body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not add named product logos to this slide (save for slide-07).
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
時序資料有三個本質特徵，和一般業務資料完全不同。第一：append-only，感測器讀數只寫不改——沒有 UPDATE 需求。第二：以時間為主要查詢維度，最常見的查詢是「時間範圍 + 聚合函數（AVG/MAX/MIN）」。第三：按時間批刪，30 天或 90 天後的歷史資料整批刪掉，不是逐行 DELETE。這三個特徵讓通用關聯式 DB 效率很差——它沒有針對時序做的壓縮和 retention policy。而 NoSQL（如 Cassandra）又放棄了 SQL 的靈活查詢。TimescaleDB 的答案是：在 PostgreSQL 上加一個時序擴充，用 SQL 語法搞定三件事，是個務實的中間路線。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "時序資料怎麼存" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `KEY QUESTIONS` and uses Mint `#97E8D6` beat color.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "每天 35 GB 讀數，SQL 還是 NoSQL？" — ≤ 18 chars ✓.
- [ ] Body line 2: "查詢：過去 1 小時某感測器平均值" — 15 chars ✓.
- [ ] Body line 3: "刪除：超過 90 天資料自動 purge" — ≤ 18 chars ✓.
- [ ] Technical values "35 GB", "1 小時", "90 天" use JetBrains Mono.
- [ ] Numbers match Ch0 shared numbers: 35 GB/天 ✓.
- [ ] Right side has comparison illustration: SQL table vs time-series chart.
- [ ] Big number `35 GB` displayed prominently on right side.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
