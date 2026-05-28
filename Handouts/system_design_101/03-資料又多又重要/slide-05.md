---
chapter: "第 3 章：資料又多又重要"
chapter_id: "03"
chapter_slug: "03-資料又多又重要"
slide: "5"
title: "放不下？把資料切開存"
original_title: "放不下？把資料切開存"
beat: "技術"
kicker: "CONCEPT"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · 放不下？把資料切開存

## On-slide Text
- Kicker: `CONCEPT`
- Title: 放不下？把資料切開存
- Body:
  - 把資料依規則切成多份，各存到不同 DB。
  - 例如：用戶 1-100 萬存 DB1，101-200 萬存 DB2。
  - 每台 DB 只存一部分，容量問題解決。

## Beginner Anchor
讀太多用 Replica 分擔，資料太多用 Sharding 切開。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「放不下？把資料切開存」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：
>
>   詞彙卡 A：
>   - 上行：`Sharding`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `分片`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「把資料依規則切分，存到多台 DB，解決容量問題」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡下方一個分片示意圖：左側一個大圓角矩形（代表原始大資料，邊框 Coral Red `#E8634F`，標「All Data」/ JetBrains Mono / 26 px）。一個剪刀圖示（線條，Mint `#97E8D6`）在大矩形右側，畫三條切割線。切割後右側出現三個小矩形（各自邊框 Mint `#97E8D6` / 2 px）：標示「Shard 1」、「Shard 2」、「Shard 3」/ JetBrains Mono 500 / 24 px / `#F4F1EA`，垂直並列。每個 Shard 方塊下方有 Caption 例如「用戶 1-100 萬」/ Noto Sans TC 400 / 20 px / `#97E8D6`。
>
>   三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "放不下？把資料切開存". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
Sharding 的直觀解釋是「切西瓜」——一個西瓜放不下冰箱，就切開分幾個盒子放。內文第二行的具體數字例子很重要：「用戶 1-100 萬存 DB1」讓抽象概念立刻有了具體感，學員才能真正理解「依規則切」是什麼意思。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
