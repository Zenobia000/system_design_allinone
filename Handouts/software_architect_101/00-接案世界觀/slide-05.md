---
chapter: "第 0 章：接案世界觀"
chapter_id: "00"
chapter_slug: "00-接案世界觀"
slide: "5"
title: "架構白皮書 v0"
original_title: "架構白皮書 v0"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v0"
rendering_mode: "image_prompt"
---

# Slide 05 · 架構白皮書 v0

## On-slide Text
- Kicker: `ARTIFACT`
- Progress capsule: `架構白皮書 v0 · 接案世界觀`
- Title: 架構白皮書 v0
- Body:
  - 你的產出物是一份會長大的設計文件
  - v0 = 空白委託書，只有需求還沒有答案
  - 每幕結束，白皮書加一個版本

## Beginner Anchor
白皮書 v0 是空的——這不是缺點，是起點。你的任務是在五幕後把它填滿到 v5。

## Learning Goal
介紹「架構白皮書」作為課程主線產出物，讓學員理解 v0→v5 的演化邏輯，建立主線任務感。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT, with Mint `#97E8D6` left accent bar).
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left, Deep Navy `#152238` background pill + Mint `#97E8D6` left 4 px accent bar, Warm White `#F4F1EA` text.
- Progress capsule above title: `架構白皮書 v0 · 接案世界觀` — Inter 700 + JetBrains Mono (for `v0`) / 34 px / Mint `#97E8D6` text / Deep Navy `#152238` background / rounded-pill capsule shape, left-aligned, within safe margin.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned, below progress capsule.
- Document artifact visual (center-right area):
  - Rounded-rect 16 px, background `#1E3450`, border Mint `#97E8D6` / 2 px / dashed stroke.
  - Top-right of document: version badge `v0` in JetBrains Mono / 24 px / Mint `#97E8D6`.
  - Top-right corner: `NEW` label — Mint `#97E8D6` background / Deep Navy `#152238` text / Inter 700 / 18 px / mini pill.
  - Inside: 4 blank horizontal rules (simulating unfilled brief form fields) — `#97E8D6` at 20% opacity.
- Body (3 lines, left of or below document): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "Artifact intro slide — v0 is an empty brief, visualized as blank document form. No architecture diagram yet."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a course artifact introduction slide. The document artifact is blank at v0; technical flow details appear in later whitepaper versions (v1–v5).

## VCRE Scorecard
not_applicable — this is an artifact presentation slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "ARTIFACT" pill badge with Deep Navy background and Mint #97E8D6 left accent bar, Warm White text. Below kicker: a small progress capsule "架構白皮書 v0 · 接案世界觀" in Mint #97E8D6 text. Title "架構白皮書 v0" in Noto Sans TC 900 / 80 px / Warm White, left-aligned. Right side of canvas: a document-style rounded rect with dashed Mint #97E8D6 border (2 px), background #1E3450, containing 4 blank horizontal lines (simulating empty form fields) and a "v0" badge top-right (JetBrains Mono, Mint). A small "NEW" mini pill label in Mint. Left/below: 3 body lines in Warm White 34 px. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Clean, deliberate empty-document aesthetic.

## Negative Prompt
- Do not fill in the blank document fields with content.
- Do not invent extra Chinese text or alter body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the dashed border on the document — it must look intentionally blank/empty.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
白皮書是這門課最核心的主線任務。v0 是空的，代表你剛接下委託，什麼都還沒決定。學員要感受到：這份文件最後會變成 v5，裡面每一個格子都是他們做的決策。空白本身就是一種視覺懸念——「這些格子要怎麼填？」就是接下來五幕要回答的問題。進度膠囊「架構白皮書 v0 · 接案世界觀」是第一次啟動，之後每幕都會更新版本號。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "架構白皮書 v0" is exactly 7 characters — within 14-char limit.
- [ ] `whitepaper_version` is set to `"v0"` (artifact slide).
- [ ] Progress capsule `架構白皮書 v0 · 接案世界觀` is present above title.
- [ ] Capsule uses: Mint `#97E8D6` text, Deep Navy `#152238` background, rounded pill, Inter 700 + JetBrains Mono for v0.
- [ ] Document artifact has dashed Mint `#97E8D6` border.
- [ ] Document artifact has `v0` badge (JetBrains Mono) and `NEW` mini-pill label.
- [ ] Body line 1 ≤ 18 chars: "你的產出物是一份會長大的設計文件" = 16 chars ✓.
- [ ] Body line 2 ≤ 18 chars: "v0 = 空白委託書，只有需求還沒有答案" — count: v0 = 空白委託書，只有需求還沒有答案 = 16+2=18 chars ✓.
- [ ] Body line 3 ≤ 18 chars: "每幕結束，白皮書加一個版本" = 13 chars ✓.
- [ ] Total body lines ≤ 3.
- [ ] Kicker reads `ARTIFACT` and uses Deep Navy + Mint accent beat color.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
