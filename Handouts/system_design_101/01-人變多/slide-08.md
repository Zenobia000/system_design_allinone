---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "8"
title: "闔上這頁，默畫架構圖 v2"
original_title: "闔上這頁，默畫架構圖 v2"
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

# Slide 08 · 闔上這頁，默畫架構圖 v2

## On-slide Text
- Kicker: `PREVIEW`
- Title: 闔上這頁，默畫架構圖 v2
- Body:
  - 手機 → Load Balancer → 兩台 Server → DB
  - 哪個方塊是新的？邊框是什麼顏色？
  - 下章：DB 被打爆了，怎麼辦？

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
用默畫練習收束本章，並銜接下一個痛點。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PREVIEW」/ Inter 700 / 24 px / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。大標「闔上這頁，默畫架構圖 v2」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。
>
>   大標下方兩行提示文字 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。
>
>   文字下方「畫給我看」練習區方塊：
>   - 圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px / 虛線（stroke-dasharray）
>   - 頂部小標：「畫給我看」/ Inter 700 / 24 px / Mint `#97E8D6`
>   - 方塊內文字（提示）：「闔上這頁，默畫 v2。Load Balancer 放在哪？幾台 Server？」/ Noto Sans TC 500 / 30 px / `#F4F1EA` / 行高 1.60 / 置中
>   - 方塊下方空白區（約 160 px 高）視覺留白
>
>   方塊下方 Caption：「下章揭曉：大家瘋狂刷菜單，DB 快打爆了」/ Noto Sans TC 400 / 26 px / `#97E8D6`，左對齊。
>
>   右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "Practice prompt slide; it asks learners to redraw the architecture and should not render the full diagram automatically."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PREVIEW. Title is "闔上這頁，默畫架構圖 v2". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
「畫給我看」每章結尾必出現，建立習慣。提示文字要點出 v2 的關鍵新增元素（Load Balancer、多台 Server），讓學員知道自己要畫什麼。第三行預告點名下章痛點，帶出 Cache 的前置情境。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PREVIEW` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
