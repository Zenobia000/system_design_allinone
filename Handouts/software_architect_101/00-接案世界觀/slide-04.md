---
chapter: "第 0 章：接案世界觀"
chapter_id: "00"
chapter_slug: "00-接案世界觀"
slide: "4"
title: "架構師的五幕地圖"
original_title: "架構師的五幕地圖"
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

# Slide 04 · 架構師的五幕地圖

## On-slide Text
- Kicker: `METHOD`
- Title: 架構師的五幕地圖
- Body:
  - 五幕走完，白皮書從 v0 長到 v5
  - 每幕一個決策，每決策一張 VCRE 計分
  - 你是決策者，不是旁觀者

## Beginner Anchor
五幕就是你這門課的路線圖——每走完一幕，架構白皮書就從空白多一個版本。

## Learning Goal
讓學員建立全課的學習路徑感，知道「我們現在在哪、要去哪」，並把白皮書版本號（v1→v5）與五幕一一對應。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left, Deep Teal pill, Warm White text.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned, upper section.
- Five-node horizontal flowchart, centered, below title:
  - Each node: rounded-rect, background Deep Teal `#2E7D86`, border Mint `#97E8D6` / 2 px.
  - Node top: act number `幕 N` / Inter 700 / 28 px / Mint `#97E8D6`.
  - Node bottom: act name (需求評估 / 建模選型 / 系統設計 / 風險韌性 / 落地演進) / Noto Sans TC 500 / 26 px / Warm White.
  - Arrows between nodes: Mint `#97E8D6`, solid line, 2 px.
  - Below each node: version capsule v1 / v2 / v3 / v4 / v5 — JetBrains Mono / 24 px / Mint `#97E8D6`.
- Body lines below the diagram: Noto Sans TC 500 / 34 px / Warm White / line-height 1.60.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Conceptual five-act map — rendered as image prompt illustration, not a formal architecture diagram."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a course roadmap / method slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge in Deep Teal #2E7D86. Title "架構師的五幕地圖" in Noto Sans TC 900 / 80 px / #F4F1EA, left-aligned. Center: five equal rounded-rect nodes arranged horizontally, each with Deep Teal #2E7D86 fill and Mint #97E8D6 border (2 px), connected by Mint arrows (→). Each node has two text lines: act number on top (Mint), act name below (Warm White). Below each node: a small version capsule (v1 through v5) in JetBrains Mono Mint. Below the diagram: 3 body lines in Warm White 34 px. Bottom-right: logo placeholder 64 px. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Stable 16:9 layout, no extra invented text.

## Negative Prompt
- Do not invent extra Chinese text, act names, or extra nodes.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render more or fewer than 5 nodes.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
這是整門課的地圖。五幕對應架構白皮書 v1→v5。學員要知道自己現在走到哪一幕，白皮書又長到哪個版本。幕一「需求評估」——把模糊業務需求轉化為可量化的技術約束；幕二「建模選型」——資料模型與技術元件初選；幕三「系統設計」——C4 容器圖 + 關鍵資料流；幕四「風險韌性」——SPOF 分析 + failover；幕五「落地演進」——MVP 路徑 + 三年演進。這張是方向感，不是細節——學員現在只需要感受到「我會走過這五幕」。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "架構師的五幕地圖" is exactly 8 characters — within 14-char limit.
- [ ] Five nodes present: 需求評估 / 建模選型 / 系統設計 / 風險韌性 / 落地演進.
- [ ] Version capsules v1–v5 visible below each node.
- [ ] Body line 3 ≤ 18 chars: "你是決策者，不是旁觀者" = 11 chars ✓.
- [ ] Total body lines ≤ 3.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
