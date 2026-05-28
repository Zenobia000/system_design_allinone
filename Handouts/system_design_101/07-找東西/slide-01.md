---
chapter: "第 7 章：找東西（選配 / 進階）"
chapter_id: "07"
chapter_slug: "07-找東西"
slide: "1"
title: "搜尋「附近蛋餅」，慢到逾時"
original_title: "搜尋「附近蛋餅」，慢到逾時"
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

# Slide 01 · 搜尋「附近蛋餅」，慢到逾時

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 搜尋「附近蛋餅」，慢到逾時
- Progress pill: 服務 500 萬用戶
- Body:
  - 用 DB 的 LIKE 查詢，全表掃一遍才有結果。
  - 五百萬筆菜單，一次搜尋讓 DB 喘不過氣。
  - 查不準、又慢，搜尋功能根本沒人用。

## Beginner Anchor
搜尋不要掃 DB 全表，旁掛 Search Index 處理全文查詢。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 500 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：左側手機圖示（Mint 線條，標「搜尋：附近蛋餅」/ JetBrains Mono / 24 px / `#F4F1EA`），一條箭頭（Coral Red / 2 px）指向「Database」方塊（底色 `#1E3450`，邊框 Coral Red `#E8634F` / 4 px，標「LIKE '%蛋餅%'」/ JetBrains Mono / 22 px / Coral Red）。Database 方塊右側：一個大型沙漏 icon（線條，Coral Red），旁邊標「掃描 500 萬筆...」/ Noto Sans TC 700 / 30 px / Coral Red。Database 方塊下方有一條進度條，填充 99%（Coral Red），標「全表掃描」/ JetBrains Mono / 22 px / Coral Red。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "搜尋「附近蛋餅」，慢到逾時". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
LIKE 查詢的問題在於：沒有索引可以走，只能全表掃描。筆數越多越慢，關鍵字越模糊越慢。用戶想搜「附近有什麼蛋餅」，卻等到逾時，體驗崩潰。這是電商、外送 App 都一定會碰到的問題，學員應該立刻有共鳴。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
