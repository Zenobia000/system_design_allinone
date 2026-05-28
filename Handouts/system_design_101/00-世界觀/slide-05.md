---
chapter: "第 0 章：世界觀"
chapter_id: "00"
chapter_slug: "00-世界觀"
slide: "5"
title: "點一份蛋餅，發生什麼？"
original_title: "點一份蛋餅，發生什麼？"
beat: "技術"
kicker: "CONCEPT"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · 點一份蛋餅，發生什麼？

## On-slide Text
- Kicker: `CONCEPT`
- Title: 點一份蛋餅，發生什麼？
- Body:
  - ① 手機送出「我要蛋餅」的請求
  - ② Server 收到，去 DB 查有沒有庫存
  - ③ DB 回資料，Server 整理後送回手機

## Beginner Anchor
先記住三個角色：Client、Server、Database。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ 同前。大標「點一份蛋餅，發生什麼？」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方：一個垂直流程圖（由上到下），三個方塊依序排列：
>
>   [手機圖示 + 文字「Client · 你的手機」] 
>   ↓（箭頭 Mint `#97E8D6` / 2 px，標「HTTP 請求」/ JetBrains Mono / 26 px）
>   [Server 方塊，邊框 Deep Teal `#2E7D86` 2 px，文字「Server · 廚房」]
>   ↓（箭頭 Mint，標「SQL 查詢」）
>   [DB 方塊，邊框 Deep Teal，文字「Database · 冰箱」]
>   ↑（回程箭頭虛線 Mint，標「資料回傳」，沿流程圖右側上行）
>
>   三個方塊底色 `#1E3450`（比 navy 稍淺），方塊文字 Warm White `#F4F1EA` / Noto Sans TC 500 / 34 px。流程圖置於畫面中央偏上。三行內文置於流程圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "點一份蛋餅，發生什麼？". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
讓學員跟著蛋餅這個請求「走一遍」。術語 HTTP 請求、SQL 查詢可以出現在箭頭標籤上，但內文用白話文描述，術語只是視覺輔助，不展開解釋。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
