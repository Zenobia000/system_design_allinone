---
chapter: "第 2 章：狂看菜單"
chapter_id: "02"
chapter_slug: "02-狂看菜單"
slide: "5"
title: "快幾萬倍——不誇張"
original_title: "快幾萬倍——不誇張"
beat: "技術"
kicker: "CONCEPT"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · 快幾萬倍——不誇張

## On-slide Text
- Kicker: `CONCEPT`
- Title: 快幾萬倍——不誇張
- Body:
  - 記憶體讀取：約 100 奈秒（ns）。
  - 跨網路讀 DB：約 1-10 毫秒（ms）。
  - 快取命中比去 DB 快了一萬倍。

## Beginner Anchor
重複讀同一份資料時，先查 Cache，減少 DB 壓力。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「快幾萬倍——不誇張」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。
>
>   大標下方：一個橫向延遲對比圖（視覺化條狀圖，非精確數學）。兩條水平色條，由左對齊起始：
>   - 上方色條（短）：標示「記憶體」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，色條顏色 Mint `#97E8D6`，條長約 1/8 畫面寬，右端標示「~100 ns」/ JetBrains Mono 500 / 34 px / `#97E8D6`。
>   - 下方色條（極長，甚至超出畫面或以箭頭結束）：標示「跨網路 DB」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，色條顏色 Coral Red `#E8634F`，條長約 7/8 畫面寬或以「→」延伸，右端標示「~10 ms」/ JetBrains Mono 500 / 34 px / `#E8634F`。
>   - 兩條色條間距 24 px，整組置中於畫面中央。
>   - 色條下方一行粗體補充文字「差距：× 100,000 倍」/ JetBrains Mono 900 / 48 px / Mint `#97E8D6`，居中。
>
>   數字對比圖下方三行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。所有數字（100 ns、1-10 ms）以 JetBrains Mono 標注。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "快幾萬倍——不誇張". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
數字要衝擊感。「一萬倍」在文字上說出來不夠，視覺上用條狀圖的長度比例讓學員直接看出差距有多驚人。這張是讓學員「哇！快取值得用！」的說服張，數字要清楚標出單位（ns vs ms），不然沒有感覺。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
