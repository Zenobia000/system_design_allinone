---
chapter: "第 2 章：狂看菜單"
chapter_id: "02"
chapter_slug: "02-狂看菜單"
slide: "8"
title: "闔上這頁，默畫架構圖 v3"
original_title: "闔上這頁，默畫架構圖 v3"
beat: "預告"
kicker: "PREVIEW"
layout_type: "practice_preview"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 08 · 闔上這頁，默畫架構圖 v3

## On-slide Text
- Kicker: `PREVIEW`
- Title: 闔上這頁，默畫架構圖 v3
- Body:
  - v2 基礎上，在 Server 和 DB 之間加一個 Cache。
  - 哪條箭頭是 hit？哪條是 miss？
  - 下章：訂單爆量，一個 DB 放不下了。

## Beginner Anchor
重複讀同一份資料時，先查 Cache，減少 DB 壓力。

## Learning Goal
用默畫練習收束本章，並銜接下一個痛點。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v3」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。
>
>   大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。
>
>   文字下方「畫給我看」練習區方塊：
>   - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
>   - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
>   - 方塊內文字（提示）：「闔上這頁，默畫 v3。Cache 放在哪？兩條箭頭分別代表什麼？」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
>   - 方塊下方空白區（約 160 px 高）視覺留白
>
>   方塊下方 Caption：「下章揭曉：訂單爆量，一個 DB 再也不夠用了」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。
>
>   右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "Practice prompt slide; it asks learners to redraw the architecture and should not render the full diagram automatically."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PREVIEW. Title is "闔上這頁，默畫架構圖 v3". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
v3 的默畫要點是：1）Cache 放在 Server 和 DB 之間；2）有兩條路徑（hit 和 miss）；3）舊方塊不加 NEW 標籤。預告點名「一個 DB 再也不夠用」，帶出下章的資料庫分片痛點。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PREVIEW` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
