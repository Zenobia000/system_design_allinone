---
chapter: "第 6 章：即時與等待"
chapter_id: "06"
chapter_slug: "06-即時與等待"
slide: "2"
title: "一個慢請求，卡住所有後面的"
original_title: "一個慢請求，卡住所有後面的"
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

# Slide 02 · 一個慢請求，卡住所有後面的

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 一個慢請求，卡住所有後面的
- Body:
  - 同步處理：Server 等後廚做完才回應。
  - 尖峰時段一百個請求同時進來，全部排隊。
  - 最後進來的用戶，等到逾時直接報錯。

## Beginner Anchor
慢任務先丟進 Queue，Worker 背景處理，Server 先釋放。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一條垂直請求列（左側），八個請求方塊（圓角矩形，底色 `#1E3450`，邊框 Coral Red `#E8634F` / 1 px）垂直堆疊，各自標示「請求 #1」至「請求 #8」/ JetBrains Mono / 22 px / `#F4F1EA`。最頂端的「請求 #1」有一條箭頭（Mint / 實線）指向右側「Server」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px）。Server 右側一條虛線箭頭（Coral Red）指向「後廚 Processing」方塊（底色 `#1E3450`，邊框 Coral Red / 4 px），旁邊有沙漏 icon（Coral Red），標「慢...」/ Noto Sans TC 700 / 28 px / Coral Red。其餘請求 #2 至 #8 旁邊各有一個等待 icon（小時鐘，Coral Red）。最底部「請求 #8」旁邊有紅色 X icon，標「逾時」/ Noto Sans TC 700 / 26 px / Coral Red。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在底部 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "一個慢請求，卡住所有後面的". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
視覺重點是「一長排等待的請求」讓人直覺感受到阻塞的可怕。最後一個請求逾時報錯是讓學員記住的痛——逾時在系統設計中是「最壞的失敗方式之一」，因為用戶不知道操作到底有沒有成功。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
