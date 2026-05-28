---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "2"
title: "問題很簡單：只有一台"
original_title: "問題很簡單：只有一台"
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

# Slide 02 · 問題很簡單：只有一台

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 問題很簡單：只有一台
- Body:
  - 一台 Server，記憶體有上限、CPU 有上限。
  - 同時湧入一萬個請求，資源瞬間耗盡。
  - 換一台更大的機器？只是延後問題。

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「PAIN POINT」/ Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字 / 同 Slide 1 規格。畫面中央：一個垂直數字對比區塊，以兩列呈現——左側標示「1 台 Server」/ Noto Sans TC 500 / 34 px / `#F4F1EA`，右側以 JetBrains Mono / 160 px / 900 weight / Coral Red `#E8634F` 呈現巨數字「×」（乘號），代表超載；下方對比行「10,000 請求」/ JetBrains Mono / 80 px / Mint `#97E8D6`。整體視覺傳達嚴重失衡。大標置於圖上方 / Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文在圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "問題很簡單：只有一台". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
讓學員理解「一台機器就是有天花板」這個物理事實。換更大台只是換更高的天花板，終究還是會爆。這裡埋下「換機器不是解法」的鋪墊，為「多台機器」解法做準備。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
