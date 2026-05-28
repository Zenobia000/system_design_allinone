---
chapter: "第 3 章：資料又多又重要"
chapter_id: "03"
chapter_slug: "03-資料又多又重要"
slide: "3"
title: "一台冰箱不夠，怎麼辦？"
original_title: "一台冰箱不夠，怎麼辦？"
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

# Slide 03 · 一台冰箱不夠，怎麼辦？

## On-slide Text
- Kicker: `ANALOGY`
- Title: 一台冰箱不夠，怎麼辦？
- Body:
  - 常用的食物多備幾台冰箱——壞了不怕，備份有。
  - 東西太多放不下，就依種類分不同冰箱存。
  - 複本解決「讀太慢」，分片解決「放不下」。

## Beginner Anchor
讀太多用 Replica 分擔，資料太多用 Sharding 切開。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / `#152238` 文字。畫面中央：兩組冰箱插圖（線條插畫，非照片），以深海軍藍 Deep Teal `#2E7D86` 線條繪製：
>
>   左組（複本類比）：一台主冰箱（略大）旁邊有兩台較小的備份冰箱，主冰箱向兩台備份各畫一條箭頭（Mint `#97E8D6`），代表「複製」。三台冰箱排成三角形。下方 Caption「複本：多備幾台，讀取分流」/ Noto Sans TC 400 / 26 px / `#152238`。
>
>   右組（分片類比）：三台冰箱並排，各自貼有標籤（「蔬果」、「肉類」、「飲料」）/ Noto Sans TC 400 / 26 px，代表「分類存放」。下方 Caption「分片：按類型切開，各放各的」/ Noto Sans TC 400 / 26 px / `#152238`。
>
>   兩組之間以垂直分隔線分隔（Deep Teal / 2 px / 虛線）。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "一台冰箱不夠，怎麼辦？". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
兩個類比同時出現，因為這章有兩個技術解法。左邊「多備幾台」對應複本，右邊「按類型分」對應分片。第三行直接用中文揭曉映射關係，讓學員馬上對得上，不留懸念，下一張再給術語。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
