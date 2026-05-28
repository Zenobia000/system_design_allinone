---
chapter: "第 4 章：東西會壞"
chapter_id: "04"
chapter_slug: "04-東西會壞"
slide: "8"
title: "闔上這頁，默畫架構圖 v5"
original_title: "闔上這頁，默畫架構圖 v5"
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

# Slide 08 · 闔上這頁，默畫架構圖 v5

## On-slide Text
- Kicker: `PREVIEW`
- Title: 闔上這頁，默畫架構圖 v5
- Body:
  - v4 基礎上，加上健康檢查方塊與備援路徑。
  - 哪個節點標了「會壞的點」？Failover 往哪切？
  - 下章：圖片和影片，DB 要怎麼存？

## Beginner Anchor
系統一定會壞，所以要能切換、重試，並避免重複處理。

## Learning Goal
用默畫練習收束本章，並銜接下一個痛點。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v5」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。
>
>   大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。
>
>   文字下方「畫給我看」練習區方塊：
>   - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
>   - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
>   - 方塊內文字（提示）：「默畫 v5。在 Primary DB 旁邊加一個會壞的點標示，再加一條 Failover 路徑。」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
>   - 方塊下方空白區（約 160 px 高）視覺留白
>
>   方塊下方 Caption：「下章揭曉：照片和影片，塞爆 DB 怎麼辦？」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。
>
>   右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "Practice prompt slide; it asks learners to redraw the architecture and should not render the full diagram automatically."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PREVIEW. Title is "闔上這頁，默畫架構圖 v5". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
v5 的默畫重點是兩個新增元素：Health Check 方塊和 Failover 路徑。提示文字聚焦在這兩個新東西，讓學員回想本章的核心概念。預告「照片影片塞爆 DB」立刻埋下下一章的衝突，製造好奇心。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PREVIEW` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
