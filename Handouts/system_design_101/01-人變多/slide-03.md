---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "3"
title: "只開一個收銀台，會怎樣？"
original_title: "只開一個收銀台，會怎樣？"
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

# Slide 03 · 只開一個收銀台，會怎樣？

## On-slide Text
- Kicker: `ANALOGY`
- Title: 只開一個收銀台，會怎樣？
- Body:
  - 中午人潮湧入，一個收銀員拚命結帳。
  - 後面的客人等到天荒地老，氣到走人。
  - 解法不是換更快的收銀員——是多開幾台。

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。畫面中央：一個橫向場景插圖（線條插畫，非照片）。左側：一個收銀台圖示（簡化矩形方塊），台前站著一個人物（線條，服務員姿態）。右側延伸出一條蜿蜒長長的隊伍線條，代表排隊客人（以等距小圓點或小人圖示表示，5-7 個），最後那個小人圖示旁標示一個問號或「？」。整組插圖以 Deep Teal `#2E7D86` 線條繪製，底色 Warm White。圖下方大標「只開一個收銀台，會怎樣？」/ Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "只開一個收銀台，會怎樣？". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
收銀台類比是最直觀的。重點在最後一句：解法不是換更快的收銀員（垂直擴展），而是多開幾台（水平擴展）。學員聽到這句，「哦！」的感覺才出來，然後技術詞彙才登場。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
