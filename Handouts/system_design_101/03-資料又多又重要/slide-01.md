---
chapter: "第 3 章：資料又多又重要"
chapter_id: "03"
chapter_slug: "03-資料又多又重要"
slide: "1"
title: "一個 DB 不夠"
original_title: "訂單爆量，一個 DB 快撐不住了"
beat: "痛點"
kicker: "PAIN POINT"
layout_type: "pain_point"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 01 · 一個 DB 不夠

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 一個 DB 不夠
- Original title: 訂單爆量，一個 DB 快撐不住了
- Progress pill: 服務 100 萬用戶
- Body:
  - 一百萬個訂單，DB 寫入速度越來越慢。
  - 容量快滿了，每次查詢都要等更久。
  - 一台 DB 壞掉，所有訂單全部消失。

## Beginner Anchor
讀太多用 Replica 分擔，資料太多用 Sharding 切開。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 100 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 DB 圓柱方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px）。方塊下方加一個視覺化容量條（進度條樣式），底色 `#1E3450`，填充色 Coral Red `#E8634F`，填充到 90% 以上，代表「快滿了」，右端標示「90% FULL」/ JetBrains Mono 500 / 26 px / `#E8634F`。方塊右側加一個裂縫 icon（線條，Coral Red），代表壓力極限。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "一個 DB 不夠". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這章的痛是雙重的：效能（太慢）加上可靠性（壞了就沒了）。學員要感受到「訂單資料不能消失」這個重量——相比菜單查詢，訂單是金錢，消失代表更大的損失。這種情感重量才能讓後面的解法顯得必要。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
