---
chapter: "幕 3：系統設計"
chapter_id: "03"
chapter_slug: "03-系統設計"
slide: "4"
title: "削峰用佇列"
original_title: "削峰用佇列"
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

# Slide 04 · 削峰用佇列

## On-slide Text
- Kicker: `METHOD`
- Title: 削峰用佇列
- Body: （詞彙卡取代一般內文）
- 詞彙卡 ×3：
  - `Stateless` / 無狀態服務：服務不保存請求間狀態，可任意水平擴展
  - `Cache` / 快取：將熱點查詢結果暫存，避免重複打資料庫
  - `Message Queue` / 訊息佇列：生產者與消費者解耦，吸收尖峰流量

## Beginner Anchor
Stateless 讓你擴展，Cache 讓你快，Message Queue 讓你不被尖峰打死——三個詞彙是 IoT 讀寫路徑設計的核心詞彙表。

## Learning Goal
讓學員記住三個 C4 設計決策背後的核心詞彙，理解各自在 IoT 監控系統中的作用角色，為 slide-05 的 C4 容器圖做詞彙準備。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` pill background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Three vocabulary cards arranged horizontally (equal width, ~530 px each), gap 24 px, each card:
  - Background: Deep Teal `#2E7D86`; rounded corners 16 px.
  - Top line: English term (`Stateless` / `Cache` / `Message Queue`) in JetBrains Mono 500 / 34 px / Mint `#97E8D6`, + `/` separator + Chinese name in Noto Sans TC 500 / 34 px / Warm White `#F4F1EA`.
  - Divider: thin Mint `#97E8D6` horizontal rule 1 px.
  - Bottom line: one-sentence definition, Noto Sans TC 500 / 34 px / Warm White `#F4F1EA`, line-height 1.40, ≤ 18 Chinese characters.
- Below vocabulary cards: small diagram strip (120 px tall) showing:
  Device icon → solid Mint arrow → `Ingest API` box (Stateless label) → dashed Mint arrow → Queue icon → solid Mint arrow → `Processor` box
  This mini-diagram shows how the three concepts chain together in the system. JetBrains Mono node labels 22 px.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD / vocabulary-card slide — the mini-strip diagram is illustrative, not a formal architecture artifact."
```

## Logo Assets
none — vocabulary cards describe concepts; named products (Kafka, Redis) are not called out by official brand name in on-slide text.

## Technical Flow Details
not_applicable — this is a vocabulary-card / method slide; the mini-strip is illustrative only.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" kicker pill — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Title "削峰用佇列" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below title: three vocabulary cards arranged in a horizontal row, equal width ~530 px, height ~200 px, gap 24 px. Each card: Deep Teal #2E7D86 background, rounded corners 16 px. Card top: English term (Stateless / Cache / Message Queue) JetBrains Mono 500 34 px Mint #97E8D6 + "/" + Chinese name Noto Sans TC 500 34 px Warm White. Thin Mint 1 px horizontal divider. Card bottom: one-sentence definition ≤ 18 Chinese chars Noto Sans TC 500 34 px Warm White line-height 1.40. Below the three cards: a compact mini-diagram strip (height ~100 px) showing: small device square → Mint solid arrow → "Ingest API" box (labeled Stateless) → Mint dashed arrow → Queue cylinder → Mint solid arrow → "Processor" box. All mini-nodes: Deep Navy fill, Mint 2 px border, JetBrains Mono 22 px Warm White label. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Clean educational layout.

## Negative Prompt
- Do not invent extra vocabulary cards beyond Stateless, Cache, Message Queue.
- Do not rewrite the English term names or Chinese translations.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not make the mini-strip diagram complex — it should be simple and linear.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
三個詞彙是 IoT 讀寫路徑設計的核心武器。Stateless——Ingest API 和 Query API 都設計成無狀態服務，好處是掛掉可以即時替換、尖峰可以多開幾個 instance，不需要 session sticky。Cache（Redis）——Dashboard 的查詢大多是重複的聚合（「過去 1 小時溫度平均」），把結果暫存 60 秒，P99 < 10s SLA 的保障主要靠這個。Message Queue（Kafka）——尖峰 6,000 msg/s 如果同步打進 TimescaleDB，單節點 PostgreSQL 寫入 QPS 很快飽和。Kafka 把上報請求排隊，Processor 用自己的節奏消費——這是「削峰」的本質。把這三個詞彙記住，下一張的 C4 容器圖每個箭頭的邏輯就清楚了。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "削峰用佇列" — 5 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Exactly 3 vocabulary cards: Stateless, Cache, Message Queue.
- [ ] Each card has: English term (JetBrains Mono / Mint) + Chinese name + divider + definition (≤ 18 chars).
- [ ] Card background is Deep Teal `#2E7D86`.
- [ ] Mini-strip diagram below cards shows Device → Ingest API → Queue → Processor flow.
- [ ] No standard body text lines (vocabulary cards replace them).
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
