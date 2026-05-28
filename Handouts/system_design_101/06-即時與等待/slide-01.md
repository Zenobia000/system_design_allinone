---
chapter: "第 6 章：即時與等待"
chapter_id: "06"
chapter_slug: "06-即時與等待"
slide: "1"
title: "餐還沒好，客人卻在狂刷新"
original_title: "餐還沒好，客人卻在狂刷新"
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

# Slide 01 · 餐還沒好，客人卻在狂刷新

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 餐還沒好，客人卻在狂刷新
- Progress pill: 服務 500 萬用戶
- Body:
  - 下單後 Server 同步等待後廚，請求卡住不動。
  - 五百萬用戶每人每秒刷新，Server 被佔滿。
  - 後廚慢一點，前台全部塞車。

## Beginner Anchor
慢任務先丟進 Queue，Worker 背景處理，Server 先釋放。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 500 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個水平流程示意圖。左側：手機圖示（Mint 線條，標「Client」/ JetBrains Mono / 24 px / `#F4F1EA`）。一條箭頭（Coral Red / 2 px / 實線）指向中央「Server」方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px，標「Server」/ JetBrains Mono / 28 px）。Server 方塊右側一條箭頭指向「後廚處理」方塊（底色 `#1E3450`，邊框 Coral Red / 2 px，標「Processing...」/ JetBrains Mono / 24 px / Coral Red）。後廚處理方塊右側有一個大型沙漏 icon（線條，Coral Red），右側標示「等待中...」/ Noto Sans TC 700 / 34 px / Coral Red。Server 方塊下方有一個佇列容量條，填充 95%（Coral Red），標「請求積壓」/ JetBrains Mono / 22 px / Coral Red。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "餐還沒好，客人卻在狂刷新". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
同步處理的問題在於：一個慢操作，把所有後面的請求都卡住了。這讓學員感受到：當處理速度跟不上請求速度，同步架構會崩潰。外送餐點、影片轉檔、寄送郵件——這些都是「不應該同步等」的場景。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
