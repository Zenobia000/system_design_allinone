---
chapter: "第 99 章：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "5"
title: "新題目：設計線上投票系統"
original_title: "新題目：設計線上投票系統"
beat: "CHALLENGE"
kicker: "CHALLENGE"
layout_type: "challenge"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · 新題目：設計線上投票系統

## On-slide Text
- Kicker: `CHALLENGE`
- Title: 新題目：設計線上投票系統
- Body:
  - 百萬人同時投票，每票只能投一次。
  - 先問自己：C/A/L/Cost 哪個最重要？
  - 投票防灌票 → 強一致性是第一優先。

## Beginner Anchor
能畫圖、能說痛點、能講取捨，就是這門課的驗收。

## Learning Goal
讓學員用固定框架理解本頁重點。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CHALLENGE」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個問題框（圓角矩形，底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px），框內頂部標「新題目」/ Noto Sans TC 700 / 28 px / `#97E8D6`，框內中央：「設計線上投票系統」/ Noto Sans TC 900 / 64 px / `#F4F1EA`，框內底部條件列表（三行，JetBrains Mono 500 / 26 px / `#97E8D6`）：「百萬用戶同時投票」/ 「每票只能投一次」/ 「結果必須準確」。大標「新題目：設計線上投票系統」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，在問題框上方。問題框下方三行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CHALLENGE. Title is "新題目：設計線上投票系統". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
新題目登場，語氣要有一點挑戰感——「輪到你了」。第一步不是選技術，而是先用 C/A/L/Cost 框架問「哪個維度最重要」。投票系統的答案很清楚：C（一致性）第一——一個人不能投兩票，票數必須正確，這是強一致性需求。延遲（L）和成本（Cost）可以適當犧牲，但資料準確性不能有誤。讓學員先想這一步，才能做出有根據的技術選擇。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CHALLENGE` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
