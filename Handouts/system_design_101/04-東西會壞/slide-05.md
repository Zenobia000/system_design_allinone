---
chapter: "第 4 章：東西會壞"
chapter_id: "04"
chapter_slug: "04-東西會壞"
slide: "5"
title: "做幾次都一樣"
original_title: "同一個操作做幾次，結果都一樣"
beat: "技術"
kicker: "CONCEPT"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · 做幾次都一樣

## On-slide Text
- Kicker: `CONCEPT`
- Title: 做幾次都一樣
- Original title: 同一個操作做幾次，結果都一樣
- Body:
  - 送出「訂單 #A001」，不管送幾次只建一筆。
  - 靠唯一訂單編號去重，防止重複扣款。
  - Retry 安全的前提，就是操作必須冪等。

## Beginner Anchor
系統一定會壞，所以要能切換、重試，並避免重複處理。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「同一個操作做幾次，結果都一樣」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：
>
>   詞彙卡 A（Idempotency / 冪等）：
>   - 上行：`Idempotency`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `冪等`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「同一操作執行多次，效果與執行一次相同」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡下方：一個冪等示意圖。左側一個請求箭頭（Mint `#97E8D6`，標「POST /orders  #A001」/ JetBrains Mono / 24 px），分成三條虛線箭頭（代表送了三次），全部射入中央「Server」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，內文「Server」/ JetBrains Mono / 28 px / `#F4F1EA`）。Server 方塊右側只射出一條箭頭（Mint 實線），指向「DB」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px），DB 方塊內文「1 筆訂單」/ Noto Sans TC 500 / 26 px / `#97E8D6`。示意圖右上方有一個小標籤「去重 key: #A001」/ JetBrains Mono / 22 px / `#97E8D6`，帶圓角膠囊底色 `#1E3450`。
>
>   三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "做幾次都一樣". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
冪等是這章最抽象的概念，必須用具體例子讓它變得具體：訂單編號 #A001 就是去重的 key。示意圖的重點是「三條箭頭進去，只產生一筆結果」，讓學員一眼看懂。第三行「Retry 安全的前提」把前後兩張卡的關係明確說出，讓架構感更清晰。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
