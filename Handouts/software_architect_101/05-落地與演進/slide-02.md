---
chapter: "幕 5：落地與演進"
chapter_id: "05"
chapter_slug: "05-落地與演進"
slide: "2"
title: "怎麼讓人開工"
original_title: "怎麼讓人開工"
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

# Slide 02 · 怎麼讓人開工

## On-slide Text
- Kicker: `KEY QUESTIONS`
- Title: 怎麼讓人開工
- Body:
  - 怎麼開工？分支怎麼開？CI 守什麼門？
  - 上線後怎麼知道系統活著？
  - 何時才該把 monolith 拆成微服務？

## Beginner Anchor
三個問題逼出三個產出：開發規範、可觀察性遙測流、演進觸發條件——這就是白皮書 v5 的全部內容。

## Learning Goal
讓學員清楚本幕三個待解問題，建立對「開發規範、可觀察性、演進路線」三個輸出物的預期。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint `#97E8D6` (KEY QUESTIONS).
- Background: Deep Navy `#152238`.
- Kicker label: `KEY QUESTIONS`, top-left. Pill style: Mint `#97E8D6` background, Deep Navy `#152238` text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Left visual anchor (~35% canvas width): three large question-mark icons in Mint `#97E8D6`, one per question, arranged vertically. Each question mark: flat geometric style, 120 px, with a thin Deep Teal `#2E7D86` circle backdrop. Labels below each: `開工`, `監控`, `演進` in JetBrains Mono / 28 px / Warm White.
- Right content area (~60% canvas width):
  - Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
  - Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned.
- Logo: `logo-light.png`, 64 px height, bottom-right corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "KEY QUESTIONS slide — question-framing layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a key-questions framing slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a key-questions slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6. Top-left: "KEY QUESTIONS" pill badge — Mint #97E8D6 background, Deep Navy text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Left side (~35% width): three vertically arranged flat geometric question-mark symbols, each Mint #97E8D6 / 120 px, on a small Deep Teal #2E7D86 circle backdrop; with short JetBrains Mono 28 px Warm White labels: "開工", "監控", "演進" below each. Right side (~60% width): Title "怎麼讓人開工" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White / line-height 1.60. Flat minimal composition, no gradients, no 3D, no photos, no clipart. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra Chinese text or rewrite any body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
本幕要回答三個問題。開工問題——給開發規範，讓工程師第一天就知道怎麼開分支、用什麼 linter、CI 守門什麼。健康問題——建立可觀察性三本柱：Logs、Metrics、Traces，告警靜默、CPU 飆高、Consumer lag 積壓，一個都不能漏。演進問題——何時才是拆微服務、引 Event Sourcing/CQRS 的正確時機，給出可量化的觸發條件，不靠直覺。三個問題對應白皮書 v5 的三個部分。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "怎麼讓人開工" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `KEY QUESTIONS` with Mint `#97E8D6` background, Deep Navy text.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1 ≤ 18 chars: "怎麼開工？分支怎麼開？CI 守什麼門？" ✓
- [ ] Body line 2 ≤ 18 chars: "上線後怎麼知道系統活著？" ✓
- [ ] Body line 3 ≤ 18 chars: "何時才該把 monolith 拆成微服務？" ✓
- [ ] Three question-mark icons present with labels 開工/監控/演進.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] `Diagram Spec` marked `not_applicable: true`.
- [ ] `Logo Assets` states none.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
