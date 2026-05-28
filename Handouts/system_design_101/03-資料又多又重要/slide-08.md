---
chapter: "第 3 章：資料又多又重要"
chapter_id: "03"
chapter_slug: "03-資料又多又重要"
slide: "8"
title: "闔上這頁，默畫架構圖 v4"
original_title: "闔上這頁，默畫架構圖 v4"
beat: "預告"
kicker: "PREVIEW"
layout_type: "practice_preview"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 08 · 闔上這頁，默畫架構圖 v4

## On-slide Text
- Kicker: `PREVIEW`
- Title: 闔上這頁，默畫架構圖 v4
- Body:
  - v3 基礎上，DB 區域長出 Primary + Replica + 分片。
  - 哪條箭頭是寫入？哪條是讀取同步？
  - 下章：機器壞了怎麼辦？資料不能消失。

## Beginner Anchor
讀太多用 Replica 分擔，資料太多用 Sharding 切開。

## Learning Goal
用默畫練習收束本章，並銜接下一個痛點。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v4」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。
>
>   大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。
>
>   文字下方「畫給我看」練習區方塊：
>   - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
>   - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
>   - 方塊內文字（提示）：「闔上這頁，默畫 v4。Primary 和 Replica 各負責什麼？分片怎麼畫？」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
>   - 方塊下方空白區（約 160 px 高）視覺留白
>
>   方塊下方 Caption：「下章揭曉：機器會壞，系統要能撐住」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。
>
>   右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "Practice prompt slide; it asks learners to redraw the architecture and should not render the full diagram automatically."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PREVIEW. Title is "闔上這頁，默畫架構圖 v4". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
v4 的默畫比前幾章複雜，所以提示文字要更具體：Primary 負責寫、Replica 負責讀、Shard 是切片儲存。預告「機器會壞」帶出下章的容錯主題，讓學員帶著「那 Replica 壞了怎辦？」的問題離開，製造懸念。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PREVIEW` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
