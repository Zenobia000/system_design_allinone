---
chapter: "第 2 章：狂看菜單"
chapter_id: "02"
chapter_slug: "02-狂看菜單"
slide: "3"
title: "常吃的東西，放冰箱就好"
original_title: "常吃的東西，放冰箱就好"
beat: "類比"
kicker: "ANALOGY"
layout_type: "analogy"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 03 · 常吃的東西，放冰箱就好

## On-slide Text
- Kicker: `ANALOGY`
- Title: 常吃的東西，放冰箱就好
- Body:
  - 每次想吃優格，都跑一趟超市——很蠢。
  - 聰明的做法：買一批，放家裡冰箱，要吃就拿。
  - 「冰箱」就是快取——把熱資料放在手邊。

## Beginner Anchor
重複讀同一份資料時，先查 Cache，減少 DB 壓力。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。畫面中央：一個橫向對比插圖（線條插畫，非照片）。左側：「每次跑超市」場景——一個人物線條站在超市圖示（矩形代表建築）前，以 Coral Red `#E8634F` 的「×」符號標示「低效」，下方 Caption「每次都去 DB 查」/ Noto Sans TC 400 / 26 px / `#152238`。右側：「放冰箱」場景——一個冰箱圖示（簡化矩形），冰箱門微開，露出優格圖示（圓形），以 Forest Green `#5B9770` 的「v」符號標示「高效」，下方 Caption「放快取，直接拿」/ Noto Sans TC 400 / 26 px / `#152238`。兩個場景以 Deep Teal `#2E7D86` 線條繪製，水平並排，中間留一個「→」轉向箭頭（Mint `#97E8D6`）。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "常吃的東西，放冰箱就好". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
「每次跑超市 vs 放冰箱」是最具體的快取類比。重點是最後一句揭曉：「冰箱就是快取」，讓學員自己在腦中完成類比對應，不要急著解釋，讓 moment of insight 自然發生。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
