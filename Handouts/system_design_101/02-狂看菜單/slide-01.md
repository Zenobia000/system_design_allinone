---
chapter: "第 2 章：狂看菜單"
chapter_id: "02"
chapter_slug: "02-狂看菜單"
slide: "1"
title: "DB 快撐不住"
original_title: "所有人都在刷菜單，DB 快撐不住"
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

# Slide 01 · DB 快撐不住

## On-slide Text
- Kicker: `PAIN POINT`
- Title: DB 快撐不住
- Original title: 所有人都在刷菜單，DB 快撐不住
- Progress pill: 服務 10 萬用戶
- Body:
  - 每次打開 App，都去 DB 查一次菜單。
  - 十萬個人同時查，DB 回應越來越慢。
  - 菜單根本沒變——卻一直重複查一樣的資料。

## Beginner Anchor
重複讀同一份資料時，先查 Cache，減少 DB 壓力。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 10 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 DB 圓柱方塊（邊框 Coral Red `#E8634F` / 4 px，底色 `#1E3450`），方塊旁顯示「DB」/ JetBrains Mono / 28 px / `#F4F1EA`。方塊四周以 Coral Red 細線條（2 px）畫出多條密集箭頭從左側射入（代表大量查詢請求湧入），箭頭頂端有小的「菜單？」文字標籤 / JetBrains Mono / 18 px / `#97E8D6`。方塊右側加一個溫度計或警示 icon（線條，Coral Red）表示過熱/超載。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#F4F1EA`，距底部 96 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "DB 快撐不住". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這次的痛是「浪費型」的痛——不是系統壞了，是系統在做蠢事：重複查一樣的東西。學員要感受到「這很沒效率」的那種挫折感，才有動力接受快取的解法。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
