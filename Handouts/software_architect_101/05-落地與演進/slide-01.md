---
chapter: "幕 5：落地與演進"
chapter_id: "05"
chapter_slug: "05-落地與演進"
slide: "1"
title: "工程師不知道幹嘛"
original_title: "工程師不知道幹嘛"
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

# Slide 01 · 工程師不知道幹嘛

## On-slide Text
- Kicker: `SCENARIO`
- Title: 工程師不知道幹嘛
- Body:
  - 拿到架構圖，還是問「今天 commit 什麼」
  - 上線後沒監控，靠用戶回報才知系統壞了
  - 架構師沒做完的最後兩件事

## Beginner Anchor
架構圖畫完不等於工程師知道怎麼開工；系統上線不等於你知道它是否活著。這兩個缺口是本幕要補的。

## Learning Goal
建立學員對「架構落地缺口」的感知：開發規範缺失導致開工混亂，可觀察性缺失導致上線後黑盒運維。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red `#E8634F` (SCENARIO).
- Background: Deep Navy `#152238`.
- Kicker label: `SCENARIO`, top-left. Pill style: Coral Red `#E8634F` background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Left visual anchor: two flat-art scenario panels stacked vertically (~40% canvas width):
  - Top panel: a confused engineer figure at a computer, speech bubble reading "commit 什麼？" — thin Mint `#97E8D6` line-art, 2 px, no gradients, no photos, no 3D.
  - Bottom panel: a flat silhouette of a server with an alert icon (⚡) above it, Coral Red `#E8634F` color; small user icon with "用戶回報" label in Warm White.
  - Panel separator: thin Coral Red `#E8634F` dashed line.
- Right content area (~55% canvas width):
  - Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
  - Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned.
- Logo: `logo-light.png`, 64 px height, bottom-right corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "SCENARIO slide — scenario illustration, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a scenario slide establishing the pain points, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a scenario slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "SCENARIO" pill badge — Coral Red #E8634F background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Left side (~40% width): two flat line-art scenario panels stacked vertically, thin Mint #97E8D6 2 px lines: upper panel shows an engineer at a desktop monitor with a speech bubble containing a question mark and code symbol; lower panel shows a server silhouette with a Coral Red #E8634F lightning alert icon and a small user figure with an exclamation. A thin Coral Red dashed horizontal line separates the two panels. Right side (~55% width): Title "工程師不知道幹嘛" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White / line-height 1.60. All flat illustration style, no gradients, no 3D, no photos, no clipart. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra Chinese text or rewrite any body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use photorealistic illustrations — keep flat line-art style only.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
架構白皮書 v3/v4 寫完了，但工程師拿到 C4 圖還是不知道今天要 commit 什麼——這是開發規範缺失的問題。系統上線後也沒有監控儀表板，靠用戶打電話說「設備資料停了」才知道系統壞了——這是可觀察性缺失的問題。本幕一次補齊這兩件事，產出白皮書 v5：開發規範 + 可觀察性 + 演進路線圖。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "工程師不知道幹嘛" — 9 Chinese characters, within 14-char limit.
- [ ] Kicker reads `SCENARIO` with Coral Red `#E8634F` background, Warm White text.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1 ≤ 18 chars: "拿到架構圖，還是問「今天 commit 什麼」" ✓
- [ ] Body line 2 ≤ 18 chars: "上線後沒監控，靠用戶回報才知系統壞了" ✓
- [ ] Body line 3 ≤ 18 chars: "架構師沒做完的最後兩件事" ✓
- [ ] Two-panel flat illustration present (engineer + server alert).
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] `Diagram Spec` marked `not_applicable: true`.
- [ ] `Logo Assets` states none.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
