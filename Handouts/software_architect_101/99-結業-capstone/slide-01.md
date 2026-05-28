---
chapter: "幕 99：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "1"
title: "五幕走完了"
original_title: "五幕走完了"
beat: "白皮書回顧"
kicker: "RECAP"
layout_type: "whitepaper_recap"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 01 · 五幕走完了

## On-slide Text
- Kicker: `RECAP`
- Title: 五幕走完了
- Body:
  - 你從空白委託書走到完整白皮書
  - 五幕、五版本、五個核心決策
  - 現在把每一步的脈絡連起來

## Beginner Anchor
回顧：你從空白委託書走到完整白皮書——v0 到 v5，每幕一個版本，每個版本一個核心決策。

## Learning Goal
讓學員感受到課程的完整旅程感：從什麼都沒有的 v0 委託書，到包含需求書、領域模型、技術棧、ADR、C4 圖、資料流、故障模式、開發規範、可觀察性的完整 v5 白皮書。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (RECAP — 使用 INTRO 同色系作為結業特例，代表回到課程起點的循環感).
- Background: Deep Navy `#152238`.
- Kicker label: `RECAP`, top-left. Pill style: Deep Teal `#2E7D86` background, Warm White `#F4F1EA` text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Left side (~50% canvas width):
  - Big display text `v0 → v5` — Inter 800 / 120 px / Mint `#97E8D6`, left-aligned, as the visual anchor.
  - Sub-label: `架構白皮書演化歷程` — Noto Sans TC 500 / 34 px / Warm White, below big display.
  - Title: `五幕走完了` — Noto Sans TC 900 / 80 px / Warm White, left-aligned.
  - Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned.
- Right side (~45% canvas width): Vertical stack of 6 version capsules:
  - `v0` 空白委託書 — Deep Navy `#152238` pill with dashed Mint `#97E8D6` 2 px border
  - `v1` 需求書 — Deep Teal `#2E7D86` pill
  - `v2` 領域模型＋技術棧＋ADR — Deep Teal `#2E7D86` pill
  - `v3` C4 容器圖＋資料流 — Deep Teal `#2E7D86` pill
  - `v4` 故障模式圖 — pill with Coral Red `#E8634F` left accent
  - `v5` 規範＋可觀察性＋演進 — Forest Green `#5B9770` pill
  - Each pill: Inter 700 / 26 px / version tag (JetBrains Mono / Mint for version number) + Noto Sans TC 500 / 24 px / Warm White for description.
  - Connecting vertical dashed line between capsules: Mint `#97E8D6`, 1 px.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Whitepaper recap opening slide — visual summary of v0→v5 journey using version capsule stack. No architecture diagram required; topology is covered in programmatic diagram slide-02."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a course recap/opening slide for the Capstone chapter, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a recap/intro slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course Capstone chapter. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "RECAP" pill badge — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Left side (~50% width): large display "v0 → v5" in Inter 800 / 120 px / Mint #97E8D6 as visual anchor. Below: sub-label "架構白皮書演化歷程" in Noto Sans TC 500 / 34 px / Warm White. Below sub-label: title "五幕走完了" in Noto Sans TC 900 / 80 px / Warm White. Below title: 3 body lines Noto Sans TC 500 / 34 px / Warm White, line-height 1.60. Right side (~45% width): vertical stack of 6 rounded-pill version capsules connected by a dashed Mint #97E8D6 vertical line (1 px). Top capsule v0: Deep Navy fill, dashed Mint 2 px border, label "v0 空白委託書". Capsules v1–v4: Deep Teal #2E7D86 fill, Warm White text. v4 capsule has a small Coral Red #E8634F left accent stripe. v5 capsule: Forest Green #5B9770 fill, Warm White text. Each capsule: version tag in JetBrains Mono Mint, description in Noto Sans TC 500 / 24 px Warm White. Gap between capsules: 16 px. Bottom-right: logo placeholder 64 px (light version). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Clean milestone-map composition.

## Negative Prompt
- Do not invent extra version capsules or change the v0–v5 sequence.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the big display "v0 → v5" as the visual anchor.
- Do not fill v0 capsule with a solid Deep Teal — v0 must visually look empty/blank (dashed border).
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
這是結業章的開場。五幕走完，每一幕都讓白皮書長大一個版本。v0 是空白委託書，代表剛接下案子什麼都沒有。v1 需求書把「要快要穩」翻譯成量化指標。v2 建出領域模型、選定技術棧、寫了第一個 ADR。v3 畫出完整 C4 容器圖和三條資料流路徑。v4 在 v3 上標出 SPOF、寫出 FMEA 緩解手法。v5 加上開發規範、可觀察性管線、演進路線圖。現在把這五個版本的脈絡連起來——你不只是學到了一堆技術，你學到的是「怎麼從模糊需求一步一步做出架構決策」的完整思維流程。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "五幕走完了" — 6 Chinese characters, within 14-char limit.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1 ≤ 18 chars: "你從空白委託書走到完整白皮書" = 13 chars ✓
- [ ] Body line 2 ≤ 18 chars: "五幕、五版本、五個核心決策" = 12 chars ✓
- [ ] Body line 3 ≤ 18 chars: "現在把每一步的脈絡連起來" = 11 chars ✓
- [ ] Kicker reads `RECAP` with Deep Teal `#2E7D86` beat color.
- [ ] Big display "v0 → v5" is the visual anchor (Inter 800 / 120 px / Mint).
- [ ] Right side shows exactly 6 version capsules: v0, v1, v2, v3, v4, v5.
- [ ] v0 capsule visually empty/dashed — no solid fill.
- [ ] v4 capsule has Coral Red accent (risk chapter marker).
- [ ] v5 capsule uses Forest Green (completion color).
- [ ] `whitepaper_version` is empty (recap slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
