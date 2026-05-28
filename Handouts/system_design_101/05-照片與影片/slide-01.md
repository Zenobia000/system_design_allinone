---
chapter: "第 5 章：照片與影片"
chapter_id: "05"
chapter_slug: "05-照片與影片"
slide: "1"
title: "食物照片塞爆了資料庫"
original_title: "食物照片塞爆了資料庫"
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

# Slide 01 · 食物照片塞爆了資料庫

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 食物照片塞爆了資料庫
- Progress pill: 服務 300 萬用戶
- Body:
  - 每家店上傳十張菜單照，三百萬用戶每人存幾張。
  - DB 存不下，磁碟空間快滿，備份極慢。
  - 圖片載入要等五秒，用戶早就離開了。

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
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 300 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 DB 圓柱方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px），方塊上方堆疊多個小方形 icon（代表圖片檔案，各自不同深淺的 `#1E3450`，邊框 Coral Red / 1 px），數量很多擠成一堆，溢出 DB 方塊邊界。方塊右側有一個容量條，填充至 95%（Coral Red），右端標示「95% FULL」/ JetBrains Mono 500 / 26 px / `#E8634F`。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "食物照片塞爆了資料庫". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
圖片和影片的特性與結構性資料完全不同——它們是大型二進位檔案，不適合塞進關聯式資料庫。這個痛要讓學員感受到：DB 是用來存結構化資料的，把大量圖片塞進去是在用錯工具。下一張類比才能讓解法顯得自然。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
