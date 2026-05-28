---
chapter: "第 7 章：找東西（選配 / 進階）"
chapter_id: "07"
chapter_slug: "07-找東西"
slide: "6"
title: "默畫搜尋架構"
original_title: "闔上這頁，默畫含搜尋的架構圖"
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

# Slide 06 · 默畫搜尋架構

## On-slide Text
- Kicker: `PREVIEW`
- Title: 默畫搜尋架構
- Original title: 闔上這頁，默畫含搜尋的架構圖
- Body:
  - v7 基礎上，右側旁掛一個 Search Index 方塊。
  - DB 畫一條虛線箭頭指向 Search Index（資料同步）。
  - 恭喜完成選配章，你的架構圖升級為 v7+。

## Beginner Anchor
搜尋不要掃 DB 全表，旁掛 Search Index 處理全文查詢。

## Learning Goal
用默畫練習收束本章，並銜接下一個痛點。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / Deep Navy `#152238` 文字。大標「闔上這頁，默畫含搜尋的架構圖」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。
>
>   大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。
>
>   文字下方「畫給我看」練習區方塊：
>   - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
>   - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
>   - 方塊內文字（提示）：「默畫 v7+。在 v7 右側加 Search Index 方塊，從 DB 畫一條虛線同步箭頭到 Search Index。」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
>   - 方塊下方空白區（約 160 px 高）視覺留白
>
>   方塊下方 Caption：「v7+ 是選配旁路，加一個方塊，不改動主線。」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。
>
>   右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "Practice prompt slide; it asks learners to redraw the architecture and should not render the full diagram automatically."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PREVIEW. Title is "默畫搜尋架構". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這張收尾強調選配章的設計邏輯：v7+ 是「旁路」，不改動主線架構，只是加一個獨立的搜尋服務旁掛上去。讓學員理解「系統演化不一定是線性的，有時候是旁路擴充」。Caption 點明：加一個方塊，不改動主線，這是微服務拆分的前身思維。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PREVIEW` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
