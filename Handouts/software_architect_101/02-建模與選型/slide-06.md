---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "6"
title: "SQL vs NoSQL"
original_title: "SQL vs NoSQL"
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

# Slide 06 · SQL vs NoSQL（詞彙卡）

## On-slide Text
- Kicker: `METHOD`
- Title: SQL vs NoSQL
- Vocabulary Cards (3 cards, stacked vertically):
  - Card A: `ACID` / ACID 事務 — 強一致、原子、可回滾的事務保障
  - Card B: `BASE` / BASE 特性 — 最終一致、高可用、犧牲即時一致
  - Card C: `Time-Series DB` / 時序資料庫 — 以時間為主鍵、原生壓縮與保留策略

## Beginner Anchor
ACID 和 BASE 不是對立，是取捨：業務交易需要 ACID，IoT 時序讀數不需要複雜事務，但 TimescaleDB 給你兩全：ACID 底座 + 時序原生能力。

## Learning Goal
讓學員能區分 ACID 和 BASE 的取捨情境，理解時序資料庫是「關聯式 + 時序原生能力」的組合，為 ADR-001 選型決策奠定概念基礎。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left. Deep Teal `#2E7D86` pill, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em, rounded capsule.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned, below kicker.
- Vocabulary Cards: 3 cards, vertically stacked below title, gap 24 px between cards, each spanning full content width (~1728 px), height ~160 px, rounded corners 16 px, Deep Teal `#2E7D86` background.
  - Card content layout (horizontal):
    - Left block: English term in JetBrains Mono 500 / 34 px / Mint `#97E8D6` + ` / ` separator + Chinese name in Noto Sans TC 500 / 34 px / Warm White. Left-padded 40 px.
    - Right block (after em-dash `—`): definition in Noto Sans TC 500 / 34 px / Warm White / line-height 1.40. ≤ 18 chars.
  - Card A: `ACID` / ACID 事務 — 強一致、原子、可回滾的事務保障
  - Card B: `BASE` / BASE 特性 — 最終一致、高可用、犧牲即時一致
  - Card C: `Time-Series DB` / 時序資料庫 — 以時間為主鍵、原生壓縮與保留策略
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Method/vocabulary-card slide — three database concept cards, no architecture diagram required."
```

## Logo Assets
none — ACID, BASE, and Time-Series DB are generic concepts, not branded products. Named products (TimescaleDB, PostgreSQL) appear in slide-07 where logos are listed.

## Technical Flow Details
not_applicable — this is a vocabulary/method slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge, Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em, rounded capsule. Title "SQL vs NoSQL" Noto Sans TC 900 / 80 px / Warm White, left-aligned below kicker. Below title: 3 vocabulary cards stacked vertically, gap 24 px, each spanning full content width, height ~160 px, rounded corners 16 px, Deep Teal #2E7D86 fill. Each card: left side shows English acronym/term in JetBrains Mono 500 / 34 px / Mint #97E8D6, then " / " separator in Warm White, then Chinese name in Noto Sans TC 500 / 34 px / Warm White; right side shows em-dash "—" then a ≤ 18-char Chinese definition in Noto Sans TC 500 / 34 px / Warm White. Card A: "ACID / ACID 事務 — 強一致、原子、可回滾的事務保障". Card B: "BASE / BASE 特性 — 最終一致、高可用、犧牲即時一致". Card C: "Time-Series DB / 時序資料庫 — 以時間為主鍵、原生壓縮與保留策略". No decorative icons, no 3D, no gradients. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra vocabulary cards or change the three terms listed.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use a font other than JetBrains Mono for the English terms.
- Do not shrink font size below 34 px to force more text.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
三個術語的關係：ACID 和 BASE 是兩種一致性策略的取捨——不是好壞，是場景。銀行轉帳需要 ACID（原子性保證錢不丟），IoT 讀數只需要 BASE（允許短暫不一致，換取高吞吐）。但時序資料有第三個維度：資料的時間結構——它天生是按時間戳排序的 append-only 流，需要的操作是時間範圍查詢和批量刪除，不是隨機 UPDATE 和複雜 JOIN。時序資料庫的原生壓縮（columnar compression for time-ordered data）和 retention policy 是通用 SQL 沒有的功能。TimescaleDB 的聰明之處：它是 PostgreSQL 的 extension，所以既有 ACID 保障、又有時序原生能力，不需要學一套全新系統。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "SQL vs NoSQL" — within 14-char visual limit (all ASCII + space) ✓.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Exactly 3 vocabulary cards present, stacked vertically.
- [ ] Card A: `ACID` / ACID 事務 — definition ≤ 18 chars ✓ (14 chars).
- [ ] Card B: `BASE` / BASE 特性 — definition ≤ 18 chars ✓ (14 chars).
- [ ] Card C: `Time-Series DB` / 時序資料庫 — definition ≤ 18 chars ✓ (14 chars).
- [ ] English terms use JetBrains Mono 34 px / Mint #97E8D6.
- [ ] Card background is Deep Teal `#2E7D86` with 16 px rounded corners.
- [ ] No body text outside the vocabulary cards (only title + 3 cards).
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none (named products appear in slide-07).
