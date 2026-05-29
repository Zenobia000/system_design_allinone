---
chapter: "幕 1：需求與約束"
chapter_id: "01"
chapter_slug: "01-需求與約束"
slide: "4"
title: "別忘了三種約束"
original_title: "別忘了三種約束"
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

# Slide 04 · 別忘了三種約束

## On-slide Text
- Kicker: `METHOD`
- Title: 別忘了三種約束
- Vocabulary Cards (3 cards):
  - Card 1 — `Budget` / 預算：初期雲費 < $5,000/月，超出需重新評估
  - Card 2 — `Deadline` / 截止日：3 個月 MVP，第 3 個月不能挪
  - Card 3 — `Team Skills` / 技能樹：6 人熟 Python，剛接觸雲端

## Beginner Anchor
這三種約束不是設計的「參考」，是設計的「邊界」——超出預算的架構、三個月做不完的方案、團隊不熟的技術棧，一律淘汰。

## Learning Goal
讓學員理解預算、Deadline、技能樹是架構決策的硬約束，不只是背景資訊；建立「約束先行，技術後行」的架構師思維。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Warm White `#F4F1EA` (METHOD slides use light background).
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` background pill, Warm White `#F4F1EA` text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Deep Navy `#152238`, left-aligned.
- Three vocabulary cards (horizontal row, equal width, rounded 16 px, gap 20 px, ~90% content width):
  - Card 1 (Budget / 預算): background Deep Teal `#2E7D86`. Top: `Budget` JetBrains Mono 34 px Warm White. Middle: `預算` Noto Sans TC 700 34 px Warm White. Separator: Mint `#97E8D6` 1 px. Bottom: `初期雲費 < $5,000/月` Noto Sans TC 500 / 30 px / Warm White; dollar amount in JetBrains Mono.
  - Card 2 (Deadline / 截止日): same layout. `Deadline` / `截止日` / `3 個月 MVP，不可挪移`; numbers in JetBrains Mono.
  - Card 3 (Team Skills / 技能樹): same layout. `Team Skills` / `技能樹` / `6 人熟 Python，剛碰雲`; numbers in JetBrains Mono.
- Logo: `logo-dark.png` or `logo-main.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, Noto Sans TC 500 / 22 px / Deep Navy `#152238`, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD / vocabulary-card slide — three constraint cards, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a vocabulary/constraint-definition slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Warm White #F4F1EA. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge in Deep Teal #2E7D86 background, Warm White text, rounded pill, 24 px Inter 700. Title "別忘了三種約束" in Noto Sans TC 900 / 80 px / Deep Navy #152238, left-aligned. Center: three equal horizontal vocabulary cards (rounded 16 px, gap 20 px, ~90% content width). All three card backgrounds Deep Teal #2E7D86. Card 1: "Budget" JetBrains Mono 34 px top / "預算" Noto Sans TC 700 middle / Mint 1 px separator / "$5,000/月" definition Noto Sans TC 500 30 px Warm White. Card 2: "Deadline" / "截止日" / "3 個月 MVP" same layout. Card 3: "Team Skills" / "技能樹" / "6 人熟 Python" same layout. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Deep Navy at bottom-left. Balanced tool-like layout.

## Negative Prompt
- Do not invent extra Chinese text, extra cards, or extra constraint types.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use a white #FFFFFF large-area background (use Warm White #F4F1EA only).
- Do not render fewer or more than 3 constraint cards.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
NFR 說的是技術上的非功能要求；約束說的是現實邊界——就算你想要 99.99% 可用性，但雲費上限 $5,000/月，那就是個硬限制。這三種約束是架構師最容易忽略的輸入：預算決定可選的雲服務和機器規格；Deadline 決定你不能從頭設計，要找成熟方案；技能樹決定選什麼技術棧，6 人熟 Python 剛碰雲，選一個需要 Go 加 Kubernetes 深度運維的架構，三個月根本做不完。約束不是限制你的枷鎖，是幫你快速淘汰不可行選項的篩子。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "別忘了三種約束" — 8 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Background is Warm White `#F4F1EA` (not pure white, not dark).
- [ ] Exactly 3 vocabulary cards present: Budget / Deadline / Team Skills.
- [ ] Card 1 shows `$5,000/月` matching Ch0 shared numbers.
- [ ] Card 2 shows `3 個月 MVP` matching Ch0 shared numbers.
- [ ] Card 3 shows `6 人熟 Python` matching Ch0 shared numbers.
- [ ] Numbers in JetBrains Mono.
- [ ] Card backgrounds are Deep Teal `#2E7D86`.
- [ ] Logo is dark version (`logo-dark.png` or `logo-main.png`), 64 px height, bottom-right.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px Deep Navy.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
