---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "7"
title: "擴展性變好，代價是什麼？"
original_title: "擴展性變好，代價是什麼？"
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

# Slide 07 · 擴展性變好，代價是什麼？

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 擴展性變好，代價是什麼？
- Body:
  - Uber、蝦皮尖峰都靠負載平衡分流。
  - 但系統更複雜，Session 要外移，成本升高。
  - （C/A/L/Cost 打分見視覺 prompt）

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
用 C/A/L/Cost 說明技術不是免費午餐。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86 + Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「擴展性變好，代價是什麼？」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。
>
>   大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60。
>
>   佐證下方：C/A/L/Cost 四格計分卡（同第 0 章格式，2×2），每格圓角 16 px，間距 20 px：
>
>   格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「Session 外移，一致性設計複雜度升高」/ 26 px / `#F4F1EA`。
>
>   格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ 48 px。評分：「↑ 一台掛掉，其他繼續服務」/ 26 px。
>
>   格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint / 48 px。評分：「多一層轉發，延遲微增」/ 26 px。
>
>   格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ 48 px。評分：「↑ 多台機器，費用倍增」/ 26 px。
>
>   四格下方 Caption：「沒有最好的答案，只有取捨。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。
>
>   右下角 logo-dark.png 或 logo-main.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ 22 px / `#152238`。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## Logo Assets
Use approved official logo assets, not AI-generated approximations.

| Name | Expected asset | Purpose |
|---|---|---|
| Uber | `assets/logos/companies/uber.svg` | 佐證：尖峰流量分流 |
| Shopee | `assets/logos/companies/shopee.svg` | 佐證：電商尖峰流量 |

Placement: render these as a compact logo strip near the real-world evidence area. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is TRADE-OFF. Title is "擴展性變好，代價是什麼？". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
佐證和取捨合在一張，讓節奏緊湊。先給佐證（真實世界大公司都這樣做，有效！），再列取捨（但代價是什麼），讓學員同時建立「可行」和「有代價」的雙重認知。C/A/L/Cost 格子從這章開始每章必出現，要讓學員慢慢習慣這個工具。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `TRADE-OFF` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
