---
chapter: "第 0 章：世界觀"
chapter_id: "00"
chapter_slug: "00-世界觀"
slide: "2"
title: "線上點餐 App"
original_title: "我們要開一家線上點餐 App"
beat: "登場"
kicker: "INTRO"
layout_type: "instructional_card"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · 線上點餐 App

## On-slide Text
- Kicker: `INTRO`
- Title: 線上點餐 App
- Original title: 我們要開一家線上點餐 App
- Progress pill: 服務 10 用戶
- Body:
  - 從 10 個朋友開始，小小的。
  - 你負責開發，我來解釋背後發生什麼。
  - 準備好了嗎？系統等等就要爆了。

## Beginner Anchor
先記住三個角色：Client、Server、Database。

## Learning Goal
建立課程情境與主角 App，降低進入門檻。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 10 用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。中央區域：一個以 Mint `#97E8D6` 描邊的手機圖示（線條風格），螢幕內顯示簡易點餐 UI 示意（三列菜單條目，線條只，非照片）。圖示下方：大標「我們要開一家線上點餐 App」/ Noto Sans TC 900 / 80 px / `#F4F1EA`。大標下方三行內文 / Noto Sans TC 500 / 34 px / 行高 1.60 / `#F4F1EA`。左上角 Kicker 標籤：「INTRO」樣式同 Slide 1。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is INTRO. Title is "線上點餐 App". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
課程的第一個情境設定。學員要有代入感——他們就是那個「開發者」。數字「10」要夠小，讓人覺得「這應該沒問題吧」，埋下後面章節的反差。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `INTRO` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
