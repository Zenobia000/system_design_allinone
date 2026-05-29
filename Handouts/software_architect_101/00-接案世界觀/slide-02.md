---
chapter: "第 0 章：接案世界觀"
chapter_id: "00"
chapter_slug: "00-接案世界觀"
slide: "2"
title: "主角：工廠監控系統"
original_title: "主角：工廠監控系統"
beat: "登場"
kicker: "INTRO"
layout_type: "intro"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · 主角：工廠監控系統

## On-slide Text
- Kicker: `INTRO`
- Title: 主角：工廠監控系統
- Body:
  - 10,000 台設備 · 每 5 秒上報 · 2,000 msg/s 均值 · 尖峰 6,000
  - 告警 P99 < 10 秒；可用性 99.9%
  - 6 人團隊 · 3 個月 · 初期雲費 < $5,000/月

## Beginner Anchor
這些數字是整門課的約束條件——每次做決策，都要對著它們問「這樣設計撐得住嗎？」

## Learning Goal
讓學員記住 IoT 監控系統的共用設定數字，建立後續章節的決策錨點。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (INTRO).
- Background: Deep Navy `#152238`.
- Kicker label: `INTRO`, top-left, same spec as Slide 01.
- Big number `10,000` displayed as anchor visual: Inter 900 / 160 px / Mint `#97E8D6`, left-side, with sub-label `台設備` in Noto Sans TC 500 / 34 px / Warm White below it.
- Title: Noto Sans TC 900 / 80 px / Warm White, below the big number, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned.
- Right side: minimal flat line-art illustration of 3 factory machines with sensor icons (Mint `#97E8D6`, 2 px thin lines).
- Numbers in body lines use JetBrains Mono for technical values.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Settings/context slide — illustration-driven, shared numbers display, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a settings slide establishing the IoT scenario context, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is an intro/context slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Left section: oversized number "10,000" in Inter 900 / 160 px / Mint #97E8D6 as the visual anchor, with "台設備" subtitle below in Noto Sans TC 34 px Warm White. Below: title "主角：工廠監控系統" in Noto Sans TC 900 / 80 px / #F4F1EA, left-aligned. Below title: 3 body lines in 34 px Warm White showing key numbers. Right section: clean flat line-art of 3 industrial machines with small sensor icons, thin Mint #97E8D6 lines, 2 px, no gradients, no 3D, no photos. Top-left: "INTRO" pill badge Deep Teal #2E7D86. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Stable 16:9 composition, no extra invented text.

## Negative Prompt
- Do not invent extra Chinese text or rewrite any body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the big number "10,000" as the visual anchor.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
這是整門課的共用設定數字，必須在這張卡片讓學員記住。10,000 台設備、每 5 秒一筆、平均 2,000 msg/s 尖峰 6,000 msg/s、告警 P99 < 10 秒、可用性 99.9%、6 人熟 Python 剛碰雲、3 個月 MVP、初期雲費 < $5,000/月。商業約束：每小時非計畫停機損失約 $20,000，目標把故障發現時間從 30 分鐘壓到 1 分鐘內。後面每一章做決策時都會回來對照這些約束，「這樣設計，我們的 SLA 撐得住嗎？」

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "主角：工廠監控系統" is exactly 9 characters — within 14-char limit.
- [ ] Body line 1 surfaces: 10,000 台設備、每 5 秒上報、2,000 msg/s 均值、尖峰 6,000.
- [ ] Body line 2 surfaces: 告警 P99 < 10 秒、可用性 99.9%.
- [ ] Body line 3 surfaces: 6 人團隊、3 個月、初期雲費 < $5,000/月.
- [ ] Each body line is ≤ 18 Chinese characters.
- [ ] Total body lines ≤ 3.
- [ ] Kicker reads `INTRO` and uses Deep Teal `#2E7D86` beat color.
- [ ] Big number `10,000` is the visual anchor.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
