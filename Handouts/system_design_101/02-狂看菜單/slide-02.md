---
chapter: "第 2 章：狂看菜單"
chapter_id: "02"
chapter_slug: "02-狂看菜單"
slide: "2"
title: "同一份菜單，查了十萬次"
original_title: "同一份菜單，查了十萬次"
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

# Slide 02 · 同一份菜單，查了十萬次

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 同一份菜單，查了十萬次
- Body:
  - 菜單一天只改一次，但十萬個人各查一次。
  - DB 被一樣的問題問到崩潰。
  - 這不是流量問題，是設計問題。

## Beginner Anchor
重複讀同一份資料時，先查 Cache，減少 DB 壓力。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字 / 同 Slide 1 規格。畫面中央：一個視覺對比區塊——左側標示「菜單更新次數」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，下方巨數字「1」/ JetBrains Mono / 160 px / 900 weight / Mint `#97E8D6`（代表一天更新一次）；右側標示「DB 查詢次數」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，下方巨數字「100,000」/ JetBrains Mono / 80 px / 900 weight / Coral Red `#E8634F`。中間以一個雙向「vs」文字分隔 / Inter 800 / 48 px / `#F4F1EA`。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "同一份菜單，查了十萬次". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
「1 vs 100,000」的數字衝擊讓問題一眼看出來。這不是一道算術題，而是讓學員直觀感受到「浪費」有多荒謬。第三行「這不是流量問題，是設計問題」是關鍵轉折——把責任從使用者身上拉回到設計者身上。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
