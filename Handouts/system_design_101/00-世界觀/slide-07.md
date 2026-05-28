---
chapter: "第 0 章：世界觀"
chapter_id: "00"
chapter_slug: "00-世界觀"
slide: "7"
title: "之後每個決定，問這四題"
original_title: "之後每個決定，問這四題"
beat: "取捨"
kicker: "TRADE-OFF"
layout_type: "tradeoff_scorecard"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 07 · 之後每個決定，問這四題

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 之後每個決定，問這四題
- Body: none

## Beginner Anchor
先記住三個角色：Client、Server、Database。

## Learning Goal
用 C/A/L/Cost 說明技術不是免費午餐。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86 + Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色漸層底色圓角膠囊 / `#F4F1EA` 文字。大標「之後每個決定，問這四題」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。
>
>   大標下方：2×2 格子計分卡，四格等大，圓角 16 px，間距 20 px，整體佔畫面中央 2/3 區域。
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
>   四格下方：Caption 26 px / Noto Sans TC 400 / `#152238`：「沒有最好的答案，只有取捨。」左對齊。
>
>   右下角：logo-dark.png 或 logo-main.png 高度 64 px。頁尾：「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is TRADE-OFF. Title is "之後每個決定，問這四題". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這是課程最核心的工具，從這章發放、每章複習。重點是讓學員記住「C/A/L/Cost」這四個字母。四格要等大、對稱，讓人感覺像一張正式的工具卡。結尾那句「沒有最好的答案，只有取捨」是課程哲學核心，不能省。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `TRADE-OFF` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
