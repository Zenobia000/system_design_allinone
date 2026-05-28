---
chapter: "第 5 章：照片與影片"
chapter_id: "05"
chapter_slug: "05-照片與影片"
slide: "2"
title: "圖片太慢，用戶等不了"
original_title: "圖片太慢，用戶等不了"
beat: "痛點"
kicker: "PAIN POINT"
layout_type: "pain_point"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · 圖片太慢，用戶等不了

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 圖片太慢，用戶等不了
- Body:
  - 台灣用戶連到美國的伺服器，每張圖要等三秒。
  - 尖峰時段大量請求，Server 傳圖頻寬被佔滿。
  - 用戶體驗差，直接關掉換競品。

## Beginner Anchor
大檔案不要塞 DB，放 Blob Storage，讓 CDN 就近傳給用戶。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個水平距離示意圖（線條插畫）。左側：手機圖示（線條，Mint `#97E8D6`），標示「台灣用戶」/ Noto Sans TC 500 / 24 px / `#F4F1EA`。右側：Server 方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，內文「Server（美國）」/ JetBrains Mono / 24 px）。兩者之間的箭頭（Coral Red / 2 px / 虛線，極長，代表遠距）上方標示「3 秒...」/ JetBrains Mono / 34 px / Coral Red。箭頭下方有一個鐘表 icon（線條，Coral Red），秒針指向 3。下方另一個方塊（圓角 16 px，底色 `#1E3450`，邊框 Coral Red / 2 px）：上行「頻寬」/ Noto Sans TC 700 / 28 px / `#F4F1EA`，容量條填滿 100%（Coral Red）。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在底部 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "圖片太慢，用戶等不了". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
兩個痛：儲存問題（DB 塞爆）和速度問題（傳輸太慢）。本章的兩個解法各解一個：Blob Storage 解儲存，CDN 解速度。讓學員在進入類比前先把兩個問題都感受到。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
