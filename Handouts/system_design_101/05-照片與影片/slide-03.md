---
chapter: "第 5 章：照片與影片"
chapter_id: "05"
chapter_slug: "05-照片與影片"
slide: "3"
title: "照片放倉庫，各地開分店就近取"
original_title: "照片放倉庫，各地開分店就近取"
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

# Slide 03 · 照片放倉庫，各地開分店就近取

## On-slide Text
- Kicker: `ANALOGY`
- Title: 照片放倉庫，各地開分店就近取
- Body:
  - 抽屜（DB）放文件；大量照片放專用倉庫。
  - 全國連鎖店在各城市設分店，就近取貨最快。
  - Blob Storage 是倉庫，CDN 是就近的分店。

## Beginner Anchor
大檔案不要塞 DB，放 Blob Storage，讓 CDN 就近傳給用戶。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / 深色文字 Deep Navy `#152238`。畫面中央：兩組插圖並排（線條插畫，Deep Teal `#2E7D86` 線條）：
>
>   左組（Blob Storage 類比）：一個小辦公室抽屜（標「DB 抽屜」/ Noto Sans TC 400 / 24 px / `#152238`，旁邊畫一個大 X Coral Red）旁邊有一個大倉庫建築圖示（標「專用倉庫」/ Noto Sans TC 400 / 24 px / `#152238`，旁邊有 Forest Green 打勾）。抽屜和倉庫之間一條箭頭（Mint）從 X 方向指向倉庫。下方 Caption「照片放倉庫，不塞 DB」/ Noto Sans TC 400 / 26 px / `#152238`。
>
>   右組（CDN 類比）：一個地圖輪廓（台灣 + 部分亞太區，線條），地圖上有三個小店面圖示（各自標「分店」/ Noto Sans TC 400 / 22 px），各自靠近不同地區，各自一條短箭頭（Mint）指向附近的用戶人物圖示。下方 Caption「就近的分店，最快取貨」/ Noto Sans TC 400 / 26 px / `#152238`。
>
>   兩組之間以垂直虛線（Deep Teal / 2 px）分隔。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "照片放倉庫，各地開分店就近取". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
兩個類比同時出現，對應兩個技術解法。左邊「辦公室抽屜 vs 倉庫」是最直觀的 Blob Storage 類比；右邊「連鎖店分店」是 CDN 最貼切的描述。第三行直接點名映射關係，讓學員馬上能對上。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
