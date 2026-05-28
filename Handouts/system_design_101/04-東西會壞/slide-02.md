---
chapter: "第 4 章：東西會壞"
chapter_id: "04"
chapter_slug: "04-東西會壞"
slide: "2"
title: "網路一斷，訂單重複了"
original_title: "網路一斷，訂單重複了"
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

# Slide 02 · 網路一斷，訂單重複了

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 網路一斷，訂單重複了
- Body:
  - 客人送出訂單，網路卡住沒收到回應。
  - 客人再按一次，Server 收到兩筆訂單。
  - 帳戶重複扣款，客服電話打爆。

## Beginner Anchor
系統一定會壞，所以要能切換、重試，並避免重複處理。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：兩個並排的問題方塊，各自圓角 16 px，底色 `#1E3450`，邊框 Coral Red `#E8634F` / 2 px：左方塊頂部小標「送出 #1」/ Inter 700 / 24 px / Coral Red。主文字「訂單 A」/ Noto Sans TC 700 / 34 px / `#F4F1EA`。下方小字「$320 元」/ JetBrains Mono / 26 px / `#97E8D6`。右方塊頂部小標「送出 #2（重複）」/ Coral Red。主文字「訂單 A」/ 34 px / `#F4F1EA`。下方小字「$320 元」/ JetBrains Mono / 26 px / Coral Red。兩方塊中間有「×2」文字 / Inter 800 / 64 px / Coral Red `#E8634F`。兩方塊下方：一個寬版方塊，底色 `#1E3450`，邊框 Coral Red / 2 px，內文「扣款兩次」/ Noto Sans TC 700 / 34 px / Coral Red，代表後果。大標置於頂部 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在底部 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "網路一斷，訂單重複了". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
第二個痛比機器掛掉更貼近使用者——重複扣款是每個人都能感同身受的噩夢。這讓學員明白「容錯」不只是基礎設施問題，也是業務邏輯問題，冪等性是答案。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
