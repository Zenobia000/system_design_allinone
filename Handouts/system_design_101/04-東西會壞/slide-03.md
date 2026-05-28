---
chapter: "第 4 章：東西會壞"
chapter_id: "04"
chapter_slug: "04-東西會壞"
slide: "3"
title: "寄重要包裹要簽收，也要備份"
original_title: "寄重要包裹要簽收，也要備份"
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

# Slide 03 · 寄重要包裹要簽收，也要備份

## On-slide Text
- Kicker: `ANALOGY`
- Title: 寄重要包裹要簽收，也要備份
- Body:
  - 簽收確認：包裹送到才算完成，沒收到重寄。
  - 備份路線：主要快遞掛了，換另一條路送。
  - 不能寄丟，也不能因重寄而送兩份。

## Beginner Anchor
系統一定會壞，所以要能切換、重試，並避免重複處理。

## Learning Goal
用生活情境建立直覺，再映射到系統元件。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「ANALOGY」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Mint `#97E8D6` 底色圓角膠囊 / 深色文字 Deep Navy `#152238`。畫面中央：一個橫向雙路徑插圖（線條插畫，非照片），Deep Teal `#2E7D86` 線條：上方路徑從「寄件人」→ 「主要快遞員」→「收件人（有簽收回條）」；主要快遞員圖示上方畫一個 X（Coral Red / 2 px），表示這條路失敗；下方備援路徑從「寄件人」→「備用快遞員」→「收件人（有簽收回條）」，箭頭用 Mint `#97E8D6`；收件人只有一個（兩條路匯合），右上角有綠色打勾（Forest Green `#5B9770`）。大標在圖上方 / Noto Sans TC 900 / 80 px / `#152238`，居中。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，居中。右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is ANALOGY. Title is "寄重要包裹要簽收，也要備份". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這個類比同時涵蓋兩個痛：備份路線對應容錯備援（Failover），簽收確認對應冪等（Idempotency）。「不能寄丟，也不能送兩份」是這章最精準的一句話，要讓學員記住。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `ANALOGY` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
