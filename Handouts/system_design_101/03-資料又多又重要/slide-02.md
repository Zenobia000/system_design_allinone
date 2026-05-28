---
chapter: "第 3 章：資料又多又重要"
chapter_id: "03"
chapter_slug: "03-資料又多又重要"
slide: "2"
title: "一個 DB，同時面對兩個危機"
original_title: "一個 DB，同時面對兩個危機"
beat: "痛點"
kicker: "PAIN POINT"
layout_type: "pain_point"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · 一個 DB，同時面對兩個危機

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 一個 DB，同時面對兩個危機
- Body:
  - 危機一：讀寫請求太多，DB 跑不動。
  - 危機二：容量快滿，資料快放不下。
  - 這兩個問題需要不同的解法。

## Beginner Anchor
讀太多用 Replica 分擔，資料太多用 Sharding 切開。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字 / 同 Slide 1 規格。畫面中央：兩個並排的問題方塊，各自圓角 16 px，底色 `#1E3450`，邊框 Coral Red `#E8634F` / 2 px：
>
>   左方塊：頂部小標「危機一」/ Inter 700 / 24 px / Coral Red `#E8634F`。主文字「讀寫太慢」/ Noto Sans TC 700 / 34 px / `#F4F1EA`。下方小字「DB 回應越來越慢，撐不住請求量」/ Noto Sans TC 400 / 26 px / `#F4F1EA` / 行高 1.40。
>
>   右方塊：頂部小標「危機二」/ Inter 700 / 24 px / Coral Red `#E8634F`。主文字「容量不夠」/ Noto Sans TC 700 / 34 px / `#F4F1EA`。下方小字「一台 DB 硬碟有上限，塞不下更多資料」/ Noto Sans TC 400 / 26 px / `#F4F1EA` / 行高 1.40。
>
>   兩方塊中間用「+」文字分隔 / Inter 800 / 48 px / Coral Red `#E8634F`。
>
>   大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "一個 DB，同時面對兩個危機". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
把兩個問題清楚分開是這章最關鍵的教學動作——「讀寫太慢」用複本（Replica）解，「容量不夠」用分片（Sharding）解。兩個問題、兩個解法，學員才不會混淆。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
