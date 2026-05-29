---
chapter: "幕 1：需求與約束"
chapter_id: "01"
chapter_slug: "01-需求與約束"
slide: "6"
title: "多一個 9 貴十倍"
original_title: "多一個 9 貴十倍"
beat: "業界佐證"
kicker: "REAL WORLD"
layout_type: "real_world"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 06 · 多一個 9 貴十倍

## On-slide Text
- Kicker: `REAL WORLD`
- Title: 多一個 9 貴十倍
- Body:
  - 99.9%→99.99%：停機容忍從 43 分/月→4.3 分/月
  - 做到 4.3 分需熱備援、自動切換、多 AZ
  - 雲費與複雜度通常跟著翻倍以上

## Beginner Anchor
一個「9」的差距聽起來很小，但工程上意味著系統必須在 4 分鐘內自動恢復——人工接電話根本來不及，要靠自動化全部做完。

## Learning Goal
讓學員建立「可用性每多一個 9，代價指數增加」的直覺，理解 99.9% 和 99.99% 背後截然不同的工程複雜度，為下一張 TRADE-OFF 打好基礎。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Forest Green `#5B9770` (REAL WORLD).
- Background: Deep Navy `#152238`.
- Kicker label: `REAL WORLD`, top-left, Forest Green `#5B9770` background pill, Warm White `#F4F1EA` text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Numbers (99.9%, 99.99%, 43, 4.3) in JetBrains Mono.
- Right-side illustration: a clean flat bar-chart comparison — two vertical bars side by side:
  - Left bar: taller, labeled `99.9%` at top, `停機容忍 43 min/月` annotation, Mint `#97E8D6` fill.
  - Right bar: much shorter (1/10 height), labeled `99.99%` at top, `停機容忍 4.3 min/月` annotation, Forest Green `#5B9770` fill.
  - Y-axis label: `停機容忍上限（分/月）` in Warm White `#F4F1EA` / JetBrains Mono / 24 px, rotated 90°, left of bars. Taller bar = more downtime allowed (worse SLA).
  - Below the bars: an upward-pointing arrow with label `成本 ↑` in Coral Red `#E8634F` / JetBrains Mono, indicating cost scales up as the allowed downtime shrinks.
  - All drawn in flat 2 px lines, no gradients, no 3D, no photos.
- Logo: `logo-light.png`, 64 px height, bottom-right, within 96 px safe margin.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "REAL WORLD slide — conceptual bar-chart illustration, no formal architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a real-world context slide presenting availability cost reasoning, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a real-world evidence slide; the VCRE scoring is on the next slide (Slide 07, TRADE-OFF).

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "REAL WORLD" pill badge in Forest Green #5B9770 background, Warm White text, rounded pill, 24 px Inter 700. Title "多一個 9 貴十倍" in Noto Sans TC 900 / 80 px / Warm White #F4F1EA, left-aligned. Below: exactly 3 body lines Noto Sans TC 500 / 34 px / Warm White, technical numbers in JetBrains Mono, with these exact Chinese strings verbatim — line 1: "99.9%→99.99%：停機容忍從 43 分/月→4.3 分/月"; line 2: "做到 4.3 分需熱備援、自動切換、多 AZ"; line 3: "雲費與複雜度通常跟著翻倍以上". Right section: a clean flat bar-chart showing two vertical bars: left bar (taller, Mint #97E8D6 fill) labeled "99.9%" with annotation "停機容忍 43 min/月"; right bar (much shorter, 1/10 height, Forest Green #5B9770 fill) labeled "99.99%" with annotation "停機容忍 4.3 min/月". Y-axis label "停機容忍上限（分/月）" rotated 90° in Warm White JetBrains Mono 24 px, left of bars (taller bar = more downtime allowed). Below bars: an upward arrow labeled "成本 ↑" in Coral Red #E8634F, JetBrains Mono. All 2 px flat lines, no gradients, no 3D. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Stable 16:9 composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not add source citations, references, "Source:", or any attribution text.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render the two bars at equal height — the 99.99% bar must be visually much shorter.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
這不是在嚇人，是真實的工程經濟學。99.9% 意味著每月允許約 43 分鐘停機；99.99% 只允許 4.3 分鐘。把這 4.3 分鐘做到，你需要什麼能力？熱備援——主節點掛掉後備節點秒切，不能人工接電話再操作。自動容錯切換——資料庫、訊息佇列、API 全部要有 failover 路徑。多可用區——一個 AZ 掛掉不能讓整個服務癱瘓。這些設計的工程難度和雲費，通常不是加 10% 可以搞定的事，而是整個架構複雜度跳一個量級。工業界常見的說法是每多一個 9 成本翻倍以上，具體要看業務架構，但方向是對的。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "多一個 9 貴十倍" — 8 Chinese characters, within 14-char limit.
- [ ] Kicker reads `REAL WORLD` and uses Forest Green `#5B9770` beat color.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "99.9%→99.99%：停機容忍從 43 分/月→4.3 分/月" ≤ 18 chars ✓
- [ ] Body line 2: "做到 4.3 分需熱備援、自動切換、多 AZ" — 14 CJK chars ≤ 18 ✓
- [ ] Body line 3: "雲費與複雜度通常跟著翻倍以上" ≤ 18 chars ✓
- [ ] Numbers 43, 4.3, 99.9%, 99.99% match Ch0 shared numbers (99.9% availability → 43 min/month).
- [ ] Right-side bar-chart illustration: 99.9% bar is ~10× taller than 99.99% bar.
- [ ] Cost upward arrow (`成本 ↑`) present in Coral Red.
- [ ] No source/citation text on slide (no attributed claims).
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
