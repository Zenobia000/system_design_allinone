---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "4"
title: "三術語的具體例子"
original_title: "SPOF / 可用性 / FMEA 範例詳解"
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

# Slide 04 · 三術語的具體例子

## On-slide Text
- Kicker: `METHOD`
- Title: 三術語的具體例子
- 三個範例卡：
  - `SPOF：單台 TSDB`
    - 單台 TSDB 掛掉會怎樣？
    - 寫入停・讀取停・告警靜默
    - → 全廠監控全黑　$20,000/hr
  - `Availability：99.9% 是多少`
    - 一年 8,760 小時 × 0.1%
    - ≈ 8.76 小時/年 ≈ 43 分/月
    - 99.99% 只剩 4.3 分/月（嚴 10 倍）
  - `FMEA：一列示範`
    - 元件：TSDB 單台
    - 失效：全廠監控黑、$20k/hr
    - 緩解：加 Replica 主備＋讀寫分離
- Caption（卡片下方一行）：定義記不住？看一個例子就懂了

## Beginner Anchor
定義記不住沒關係——看一個具體例子，SPOF、可用性、FMEA 就活起來了。

## Learning Goal
用一個具體例子把 slide-03 的三個抽象術語落地，讓初學者真的「有感」，再進 slide-05 五種韌性手法、slide-06 的 FMEA 全圖。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` pill, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Three example cards arranged horizontally (equal width ~530 px, gap 24 px), each:
  - Background: Deep Teal `#2E7D86`; rounded corners 16 px.
  - Header line: term label in JetBrains Mono 500 / 30 px / Mint `#97E8D6`.
  - Divider: thin Mint `#97E8D6` 1 px horizontal rule.
  - Three example lines: Noto Sans TC 500 / 26 px / Warm White `#F4F1EA`, line-height 1.45; the impact line in Card 1 uses Coral Red `#E8634F`; the mitigation line in Card 3 uses Forest Green `#5B9770`; numbers use JetBrains Mono.
- Caption below the three cards: `定義記不住？看一個例子就懂了`, Noto Sans TC 400 / 24 px / Warm White, left-aligned.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD / worked-example slide — three illustrative example cards, not a formal architecture artifact."
```

## Logo Assets
none — worked examples reference the system's own components (TSDB) in plain language; no official product brand logos are called out on this slide.

## Technical Flow Details
not_applicable — this is a worked-example / method slide; the full failure-mode topology is the artifact on slide-06.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "METHOD" kicker pill — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Title "三術語的具體例子" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below the title: three equal rounded cards in a horizontal row (16 px corner radius, Deep Teal #2E7D86 background, gap 24 px, spanning ~90% width). Render these EXACT three cards verbatim. Card 1 — header "SPOF：單台 TSDB" (JetBrains Mono 30 px Mint #97E8D6); thin Mint divider; then three lines Noto Sans TC 26 px: "單台 TSDB 掛掉會怎樣？" (Warm White), "寫入停・讀取停・告警靜默" (Warm White), "→ 全廠監控全黑　$20,000/hr" (Coral Red #E8634F, the "$20,000/hr" in JetBrains Mono). Card 2 — header "Availability：99.9% 是多少" (Mint); divider; three lines Noto Sans TC 26 px Warm White with numbers in JetBrains Mono: "一年 8,760 小時 × 0.1%", "≈ 8.76 小時/年 ≈ 43 分/月", "99.99% 只剩 4.3 分/月（嚴 10 倍）". Card 3 — header "FMEA：一列示範" (Mint); divider; three lines styled like a small 3-row table, Noto Sans TC 26 px: "元件：TSDB 單台" (Warm White), "失效：全廠監控黑、$20k/hr" (Warm White), "緩解：加 Replica 主備＋讀寫分離" (Forest Green #5B9770). Below the three cards, one caption line Noto Sans TC 24 px Warm White: "定義記不住？看一個例子就懂了". Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Clean educational layout, no photos, no clipart.

## Negative Prompt
- Do not invent extra cards beyond the three (SPOF / Availability / FMEA).
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.
- Do not change the numbers: 8,760 小時/年, 43 分/月 (99.9%), 4.3 分/月 (99.99%), $20,000/hr must stay exactly.

## Speaker Notes
slide-03 給了三個術語的定義，但定義是抽象的——這一頁用一個具體例子讓它們活起來。SPOF：別只記「單點故障」，記住我們系統裡那台 TSDB——它只有一台，掛了就寫入停、讀取停、告警靜默，整廠監控全黑，每小時燒 $20,000。Availability：99.9% 不是「很高」這種感覺，把它算成時間——一年 8,760 小時的 0.1% 約等於 8.76 小時，攤到每月約 43 分鐘可停機；再嚴一級 99.99% 只剩 4.3 分鐘，這就是「多一個 9 貴十倍」的由來。FMEA：不是玄學，就是一張表，一列示範——元件 TSDB 單台、失效是全廠黑掉、緩解是加 Replica 主備＋讀寫分離。看完這頁，下一張 slide-05 的五種韌性手法、slide-06 的 FMEA 全圖就有畫面了。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "三術語的具體例子" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Exactly 3 example cards: SPOF / Availability / FMEA.
- [ ] Card 1 impact line "→ 全廠監控全黑　$20,000/hr" is Coral Red.
- [ ] Card 2 shows the availability math (8,760 小時 → 43 分/月; 99.99% → 4.3 分/月).
- [ ] Card 3 mitigation line is Forest Green.
- [ ] Caption `定義記不住？看一個例子就懂了` present below cards.
- [ ] Numbers unchanged: 8,760 / 43 / 4.3 / $20,000.
- [ ] Bottom-right corner empty (no logo drawn).
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px, bottom-left.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
