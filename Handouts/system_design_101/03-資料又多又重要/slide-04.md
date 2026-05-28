---
chapter: "第 3 章：資料又多又重要"
chapter_id: "03"
chapter_slug: "03-資料又多又重要"
slide: "4"
title: "讀太慢？加複本來分擔"
original_title: "讀太慢？加複本來分擔"
beat: "技術"
kicker: "CONCEPT"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 04 · 讀太慢？加複本來分擔

## On-slide Text
- Kicker: `CONCEPT`
- Title: 讀太慢？加複本來分擔
- Body:
  - 主 DB（Primary）負責所有寫入。
  - 複本（Replica）只負責讀取，同步主 DB 的資料。
  - 讀寫分離，讓兩邊都不會太忙。

## Beginner Anchor
讀太多用 Replica 分擔，資料太多用 Sharding 切開。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「讀太慢？加複本來分擔」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：
>
>   詞彙卡 A：
>   - 上行：`Read Replica`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `讀取複本`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「同步主 DB 資料的副本，專門分擔讀取請求」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡下方一個簡化示意圖：左側一個「Primary DB」方塊（邊框 Deep Teal `#2E7D86` / 2 px，底色 `#1E3450`）；右側兩個「Replica」方塊（邊框 Mint `#97E8D6` / 2 px）垂直並列。Primary 向兩個 Replica 各畫一條實線箭頭（Mint，標「同步」/ JetBrains Mono / 18 px）。左上方箭頭（Coral Red `#E8634F`，標「寫入 Write」）射入 Primary；右側箭頭（Mint，標「讀取 Read」）從兩個 Replica 向右射出，指向 Server 示意方塊。
>
>   三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "讀太慢？加複本來分擔". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
Read Replica 的核心概念是「讀寫分離」——寫入走 Primary，讀取走 Replica。類比：家裡只有一本帳本（Primary），但可以複印幾份讓家人查帳（Replica），帳本的更新只有主帳本在做，副本同步更新。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
