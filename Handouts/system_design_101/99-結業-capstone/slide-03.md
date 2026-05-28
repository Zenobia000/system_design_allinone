---
chapter: "第 99 章：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "3"
title: "四個維度，任何系統都能評"
original_title: "四個維度，任何系統都能評"
beat: "RECAP"
kicker: "RECAP"
layout_type: "tradeoff_scorecard"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 03 · 四個維度，任何系統都能評

## On-slide Text
- Kicker: `RECAP`
- Title: 四個維度，任何系統都能評
- Body:
  - （四格計分卡見視覺 prompt）

## Beginner Anchor
能畫圖、能說痛點、能講取捨，就是這門課的驗收。

## Learning Goal
讓學員用固定框架理解本頁重點。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「RECAP」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「四個維度，任何系統都能評」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。
>
>   大標下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px，整體佔畫面中央 2/3 區域。
>
>   格子 1（左上）：底色 `#152238`，文字 `#F4F1EA`。
>     上行：「C」/ Inter 800 / 48 px / Mint `#97E8D6`
>     中行：「一致性」/ Noto Sans TC 700 / 34 px / `#F4F1EA`
>     下行：「Consistency」/ JetBrains Mono 500 / 26 px / `#97E8D6`
>     最下：「所有人看到的資料一樣嗎？」/ Noto Sans TC 500 / 26 px / `#F4F1EA` / 行高 1.40
>
>   格子 2（右上）：底色 `#2E7D86`，文字 `#F4F1EA`。
>     上行：「A」/ Inter 800 / 48 px / `#F4F1EA`
>     中行：「可用性」/ Noto Sans TC 700 / 34 px / `#F4F1EA`
>     下行：「Availability」/ JetBrains Mono 500 / 26 px / `#97E8D6`
>     最下：「系統掛掉了還能用嗎？」
>
>   格子 3（左下）：底色 `#152238`，文字 `#F4F1EA`。
>     上行：「L」/ Inter 800 / 48 px / Mint `#97E8D6`
>     中行：「延遲」/ Noto Sans TC 700 / 34 px
>     下行：「Latency」/ JetBrains Mono 500 / 26 px / `#97E8D6`
>     最下：「多快回應用戶的請求？」
>
>   格子 4（右下）：底色 `#2E7D86`，文字 `#F4F1EA`。
>     上行：「Cost」/ Inter 800 / 48 px / `#F4F1EA`
>     中行：「成本」/ Noto Sans TC 700 / 34 px
>     下行：「Cost」/ JetBrains Mono 500 / 26 px / `#97E8D6`
>     最下：「要燒多少錢才能撐住？」
>
>   四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。
>
>   右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is RECAP. Title is "四個維度，任何系統都能評". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
四格計分卡在第 0 章發放，每章都用它評分，現在最後一次完整複習。核心訊息只有一句：「沒有最好的答案，只有取捨。」這是整門課的哲學精髓。學員看到這四個格子，應該能自動回想起每一章的技術選擇是在哪個維度上得分、在哪個維度上付出代價。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `RECAP` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
