---
chapter: "第 0 章：世界觀"
chapter_id: "00"
chapter_slug: "00-世界觀"
slide: "3"
title: "App 就像一家餐廳"
original_title: "App 就像一家餐廳"
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

# Slide 03 · App 就像一家餐廳

## On-slide Text
- Kicker: `ANALOGY`
- Title: App 就像一家餐廳
- Body:
  - 客人點餐 → 服務生傳單 → 廚房做菜
  - 冰箱存料、菜單放桌上、帳單算完收錢
  - 每個角色各司其職，缺一不可

## Beginner Anchor
先記住三個角色：Client、Server、Database。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。頂部左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / 文字 Deep Navy `#152238`。中央區域：一個橫向流程插圖（線條插畫風格，非照片），由左至右三個圖示：[人物/客人] → [服務生端盤] → [廚師在爐前]，箭頭用 Deep Teal `#2E7D86`，每個圖示下方 Caption 26 px 標示中文角色名（客人 / 服務生 / 廚師）。圖下方：大標「App 就像一家餐廳」/ Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角：logo-dark.png 或 logo-main.png 高度 64 px。頁尾：「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "App 就像一家餐廳". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
類比拍要讓人「哦！我懂了」。先讓餐廳的畫面在腦子裡跑，技術詞彙下一張才出現。不要急著說 Server。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
