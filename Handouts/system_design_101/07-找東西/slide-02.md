---
chapter: "第 7 章：找東西（選配 / 進階）"
chapter_id: "07"
chapter_slug: "07-找東西"
slide: "2"
title: "用索引找書"
original_title: "找書不翻全書，用書末的索引"
beat: "類比"
kicker: "ANALOGY"
layout_type: "analogy"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · 用索引找書

## On-slide Text
- Kicker: `ANALOGY`
- Title: 用索引找書
- Original title: 找書不翻全書，用書末的索引
- Body:
  - 想找「蛋餅」，不會從第一頁翻到最後一頁。
  - 翻到書末索引，「蛋餅 → 第 42 頁」，直接跳過去。
  - 索引是提前建好的，查的時候秒回。

## Beginner Anchor
搜尋不要掃 DB 全表，旁掛 Search Index 處理全文查詢。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / Deep Navy `#152238` 文字。畫面中央：左側一本翻開的書圖示（線條插畫，Deep Teal `#2E7D86` 線條），書頁顯示滿滿文字（細橫線）。書右側箭頭（Deep Teal / 2 px）指向右側「索引頁」圖示：一頁條目列表，第一條醒目標示「蛋餅 → p.42」/ JetBrains Mono / 24 px / `#152238`，其餘條目為淡色。「索引頁」下方 Caption 26 px：「提前整理好，查詢秒回」/ `#152238`。左側書圖示下方 Caption：「一頁一頁翻？太慢了」/ Coral Red `#E8634F` / 26 px。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "用索引找書". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
書末索引是最直覺的類比——索引是「提前整理好的查找表」，搜尋引擎的反向索引也是一樣的邏輯：提前把「字出現在哪些文件」記下來，查詢時直接查那張表，不需要翻遍所有資料。讓學員先把這個直覺建立起來，下一張才引入技術名詞。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
