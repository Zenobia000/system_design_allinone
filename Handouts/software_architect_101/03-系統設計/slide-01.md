---
chapter: "幕 3：系統設計"
chapter_id: "03"
chapter_slug: "03-系統設計"
slide: "1"
title: "元件兜不起來"
original_title: "元件兜不起來"
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

# Slide 01 · 元件兜不起來

## On-slide Text
- Kicker: `SCENARIO`
- Title: 元件兜不起來
- Body:
  - 有模型、有技術棧，元件怎麼「接線」還是糨糊
  - FastAPI、Kafka、Redis——誰先誰後、誰呼叫誰？
  - 不畫圖，實作時才發現接錯就來不及了

## Beginner Anchor
有了技術棧清單不等於有了架構——元件之間怎麼接線、同步還是非同步，不畫清楚就會在實作時才踩坑。

## Learning Goal
讓學員感受到「有元件但不知如何組合」的痛點，建立對 C4 容器圖的需求動機。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red `#E8634F` (SCENARIO).
- Background: Deep Navy `#152238`.
- Kicker label: `SCENARIO`, top-left, Coral Red `#E8634F` pill background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Technical names (FastAPI, Kafka, Redis) in JetBrains Mono / Mint `#97E8D6`.
- Right-side illustration (~45% canvas width): scattered box nodes labeled with tech names (FastAPI, Kafka, Redis, TimescaleDB), connected by crossing dashed arrows in Mint `#97E8D6` 2 px — chaotic, no clear direction, representing unresolved wiring. No photos, no 3D.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "SCENARIO slide — illustration-driven chaos diagram, not a formal architecture artifact."
```

## Logo Assets
none — technical names are mentioned in body text but no formal logo strip is required for a scenario slide.

## Technical Flow Details
not_applicable — this is a scenario/problem-statement slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a scenario slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "SCENARIO" kicker pill — Coral Red #E8634F background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Title "元件兜不起來" Noto Sans TC 900 / 80 px / Warm White, left-aligned, ~55% canvas width. Below title: 3 body lines Noto Sans TC 500 / 34 px / Warm White, line-height 1.60; technical names FastAPI / Kafka / Redis rendered in JetBrains Mono Mint #97E8D6. Right side (~45% width): scattered flat box nodes (5–6 boxes, each with a short tech name in JetBrains Mono Warm White 22 px, Deep Teal #2E7D86 2 px border, Deep Navy fill, rounded 8 px) connected by crossing dashed arrows in Mint #97E8D6 2 px — deliberately chaotic, no clear routing. Background of diagram area stays Deep Navy. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Clean flat design, no 3D, no gradients, no clipart.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not make the right-side diagram look organized — it must appear chaotic and unresolved.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
幕 2 結束時，學員手上有一張 ER 圖（領域模型）和一張技術棧選型表（ADR-001）。但「有技術棧清單」不等於「知道怎麼接」——FastAPI 跟 Kafka 誰先誰後？Redis 放在讀取路徑還是寫入路徑？Ingest API 和 Query API 能共用還是要分開？這些問題不畫成圖就無法對齊，3 個月後寫程式才發現接錯就來不及了。這一幕要做的就是把這個糊塗狀態，轉換成白皮書 v3 的兩個正式產出：C4 容器圖和關鍵資料流圖。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "元件兜不起來" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `SCENARIO` and uses Coral Red `#E8634F` beat color.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Technical names FastAPI, Kafka, Redis appear in JetBrains Mono in body or illustration.
- [ ] Right-side illustration is deliberately chaotic (no clear routing).
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
