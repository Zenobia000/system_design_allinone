---
chapter: "幕 3：系統設計"
chapter_id: "03"
chapter_slug: "03-系統設計"
slide: "3"
title: "C4 四層視角"
original_title: "C4 四層視角"
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

# Slide 03 · C4 四層視角

## On-slide Text
- Kicker: `METHOD`
- Title: C4 四層視角
- Body: （詞彙卡取代一般內文）
- 詞彙卡 ×4：
  - `Context` / 系統情境：系統與外部使用者、外部系統的邊界與互動
  - `Container` / 可部署單元：可獨立部署的服務、資料庫、佇列、前端
  - `Component` / 模組：Container 內部的主要模組或服務邏輯單元
  - `Code` / 類別與函數：Component 內的類別、介面、實作細節

## Beginner Anchor
C4 是「縮放」——Context 看整張地圖，Container 看城市，Component 看街道，Code 看房間。本幕白皮書 v3 停在 Container 層。

## Learning Goal
讓學員掌握 C4 四個層次的定義與適用場景，理解為什麼白皮書 v3 只需要 Container 圖而不必到 Code 層。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` pill background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Four vocabulary cards arranged in 2×2 grid (or horizontal row if space allows), gap 24 px, each card:
  - Background: Deep Teal `#2E7D86`; rounded corners 16 px.
  - Top line: English term (`Context` / `Container` / `Component` / `Code`) in JetBrains Mono 500 / 34 px / Mint `#97E8D6`, + `/` separator + Chinese name in Noto Sans TC 500 / 34 px / Warm White `#F4F1EA`.
  - Divider: thin Mint `#97E8D6` horizontal rule 1 px.
  - Bottom line: one-sentence definition, Noto Sans TC 500 / 34 px / Warm White `#F4F1EA`, line-height 1.40, ≤ 18 Chinese characters.
- Small annotation caption: `白皮書 v3 停在 Container 層`, JetBrains Mono / 26 px / Mint `#97E8D6`, below the cards.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD / vocabulary-card slide — illustration-driven, no formal architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a vocabulary-card / method-introduction slide.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" kicker pill — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Title "C4 四層視角" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below title: four vocabulary cards in a 2x2 grid (or single row if they fit), each card: Deep Teal #2E7D86 background, rounded corners 16 px, width ~420 px, height ~180 px. Each card top line = English term JetBrains Mono 500 34 px Mint #97E8D6 + "/" + Chinese name Noto Sans TC 500 34 px Warm White; thin Mint 1 px horizontal divider; card bottom = one-sentence definition Noto Sans TC 500 34 px Warm White line-height 1.40. Render these EXACT four cards verbatim — Card 1 top "Context / 系統情境", definition "系統與外部使用者、外部系統的邊界與互動"; Card 2 top "Container / 可部署單元", definition "可獨立部署的服務、資料庫、佇列、前端"; Card 3 top "Component / 模組", definition "Container 內部的主要模組或服務邏輯單元"; Card 4 top "Code / 類別與函數", definition "Component 內的類別、介面、實作細節". Below all cards: small caption text exactly "白皮書 v3 停在 Container 層" JetBrains Mono 26 px Mint #97E8D6. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Clean educational layout, no 3D, no photos, no decorative elements beyond brand palette.

## Negative Prompt
- Do not invent extra vocabulary cards beyond Context, Container, Component, Code.
- Do not rewrite the English term names or Chinese translations.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not place vocabulary cards on a light background — they must use Deep Teal #2E7D86 fill.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
C4 Model 是 Simon Brown 發展出的架構描述語言。四個層次像地圖縮放：Context 是整張地圖，看系統邊界和外部依賴；Container 是城市地圖，看系統裡有哪些可以獨立部署的元件（API、資料庫、佇列）；Component 是街道地圖，看 Container 裡面的模組怎麼組成；Code 才是室內平面圖，看類別和方法。對於這個 IoT 系統，白皮書 v3 只需要到 Container 層就足夠讓整個 6 人團隊對齊——哪個服務負責哪件事、怎麼通訊、用什麼儲存。Component 和 Code 是各個服務自己設計的細節，不需要在架構白皮書裡鉅細靡遺。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "C4 四層視角" — 5 Chinese characters (C4 is ASCII), within 14-char limit.
- [ ] Kicker reads `METHOD` and uses Deep Teal `#2E7D86` beat color.
- [ ] Exactly 4 vocabulary cards: Context, Container, Component, Code.
- [ ] Each card has: English term (JetBrains Mono / Mint) + Chinese name + divider + definition (≤ 18 chars).
- [ ] Card background is Deep Teal `#2E7D86`.
- [ ] Caption "白皮書 v3 停在 Container 層" appears below cards.
- [ ] No standard body text lines (vocabulary cards replace them).
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
