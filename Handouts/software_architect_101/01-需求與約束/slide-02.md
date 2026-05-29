---
chapter: "幕 1：需求與約束"
chapter_id: "01"
chapter_slug: "01-需求與約束"
slide: "2"
title: "把形容詞逼成數字"
original_title: "把形容詞逼成數字"
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

# Slide 02 · 把形容詞逼成數字

## On-slide Text
- Kicker: `KEY QUESTIONS`
- Title: 把形容詞逼成數字
- Body:
  - 告警延遲：P99 < 10 秒，允許最多 1% 例外
  - 設備規模：10,000 台，峰值 6,000 msg/s
  - 可用性：99.9%（每月停機 ≤ 43 分鐘）

## Beginner Anchor
P99 的意思是「99% 的請求必須在這個時間以內完成」——剩下 1% 是那些你允許慢一點的例外。這就是把「快」這個形容詞變成可量測標準的方法。

## Learning Goal
讓學員掌握「把形容詞逼成可量測數字」的提問方式，並記住本課程三個核心基準數字：P99 < 10s、6,000 msg/s 峰值、99.9% 可用性。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint `#97E8D6` (KEY QUESTIONS).
- Background: Deep Navy `#152238`.
- Kicker label: `KEY QUESTIONS`, top-left, Mint `#97E8D6` background pill, Deep Navy `#152238` text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned, upper content area.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Technical numbers (P99, 10, 10,000, 6,000, 99.9%, 43) use JetBrains Mono.
- Right-side illustration: a flat line-art arrow diagram showing transformation — left side: vague word「快」in Warm White with a dashed border, right side: concrete value「P99 < 10s」in a solid Mint `#97E8D6` bordered box, connected by a rightward arrow in Mint `#97E8D6` / 2 px. Below it a similar pair: 「穩」→「99.9%」. Flat, minimal, no gradients, no 3D.
- Logo: `logo-light.png`, 64 px height, bottom-right, within 96 px safe margin.
- Footer: `桑尼資料科學 · 版權所有 ©`, Noto Sans TC 500 / 22 px / Warm White `#F4F1EA`, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "KEY QUESTIONS slide — illustration-driven, no formal architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a key-questions/quantification slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a key-questions slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "KEY QUESTIONS" pill badge in Mint #97E8D6 background, Deep Navy #152238 text, rounded pill, 24 px Inter 700. Title "把形容詞逼成數字" in Noto Sans TC 900 / 80 px / Warm White, left-aligned, upper section. Below: 3 body lines in Noto Sans TC 500 / 34 px / Warm White, line-height 1.60, technical numbers in JetBrains Mono. Right section: a clean flat-line arrow diagram showing 2 transformations: 1) vague word「快」(dashed border box) → rightward arrow → concrete「P99 < 10s」(solid Mint border box); 2) vague「穩」→「99.9%」. All drawn in Mint #97E8D6 thin 2 px lines, flat style, no gradients, no 3D. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Stable 16:9, no extra invented text.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not add more than 2 transformation arrow pairs on the right side.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
具體問法是：「請給我一個可以用測試驗證的指標。」告警延遲不說「快」，說 P99 < 10 秒——99% 的告警必須在 10 秒以內觸達，剩下 1% 允許更慢，但這個邊界要明確。設備數量 10,000 台，每台每 5 秒一筆，平均 2,000 msg/s，考慮尖峰估 3 倍為 6,000 msg/s。每日資料量 10,000 台 × 17,280 筆/天 × 200 B ≈ 35 GB/天。這些數字不是老闆給的，是架構師去問出來的。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "把形容詞逼成數字" — 8 Chinese characters, within 14-char limit.
- [ ] Kicker reads `KEY QUESTIONS` and uses Mint `#97E8D6` beat color (pill background).
- [ ] Kicker pill text is Deep Navy `#152238` (light background → dark text rule).
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "告警延遲：P99 < 10 秒，允許最多 1% 例外" ≤ 18 chars ✓
- [ ] Body line 2: "設備規模：10,000 台，峰值 6,000 msg/s" ≤ 18 chars ✓
- [ ] Body line 3: "可用性：99.9%（每月停機 ≤ 43 分鐘）" ≤ 18 chars ✓
- [ ] Numbers P99, 10,000, 6,000, 99.9%, 43 match Ch0 shared numbers.
- [ ] Technical numbers in JetBrains Mono on slide.
- [ ] Right-side illustration shows fuzzy-word → quantified-number transformation arrows.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
