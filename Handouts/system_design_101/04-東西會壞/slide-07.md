---
chapter: "第 4 章：東西會壞"
chapter_id: "04"
chapter_slug: "04-東西會壞"
slide: "7"
title: "金流系統靠冪等防重複扣款"
original_title: "金流系統靠冪等防重複扣款"
beat: "取捨"
kicker: "TRADE-OFF"
layout_type: "tradeoff_scorecard"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 07 · 金流系統靠冪等防重複扣款

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 金流系統靠冪等防重複扣款
- Body:
  - Stripe 等金流每筆請求帶唯一 key，去重防重複。
  - 付款要「強一致」；看菜單可以「最終一致」。
  - （C/A/L/Cost 計分卡見視覺 prompt）

## Beginner Anchor
系統一定會壞，所以要能切換、重試，並避免重複處理。

## Learning Goal
用 C/A/L/Cost 說明技術不是免費午餐。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86 + Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「金流系統靠冪等防重複扣款」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。
>
>   大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。
>
>   佐證下方：一個小對照方塊（圓角 12 px，底色 `#152238`，文字 `#F4F1EA`，邊框 Deep Teal / 1 px，寬幅橫向）：左半「付款 → 強一致 C 優先」/ JetBrains Mono / 24 px / Mint `#97E8D6`；中間分隔線（Coral Red / 1 px）；右半「看菜單 → 最終一致 A/L 優先」/ JetBrains Mono / 24 px / `#97E8D6`。代表 C/A/L/Cost 框架正式收斂：不同場景永遠在四維之間取捨，沒有萬能解。
>
>   對照方塊下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：
>
>   格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↑ 冪等保障付款不重複，一致性提升」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。
>
>   格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ Failover 備援讓系統掛了仍可切換服務」/ 26 px。
>
>   格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「健康檢查偵測+切換有秒級延遲，可接受」/ 26 px。
>
>   格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ 備援節點+健康檢查服務，成本增加」/ 26 px。
>
>   四格下方 Caption：「C/A/L/Cost：每個決定都是四維取捨，沒有免費的保障。」/ Noto Sans TC 400 / 26 px / `#152238`，左對齊。
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
| Stripe | `assets/logos/companies/stripe.svg` | 佐證：Idempotency Key 防重複扣款 |

Placement: render these as a compact logo strip near the real-world evidence area. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is TRADE-OFF. Title is "金流系統靠冪等防重複扣款". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這張是本章核心——把 C/A/L/Cost 從「發放工具」升格為「正式框架」。對照方塊清楚說明：不同操作在四維上的優先順序不同，沒有萬能設定。Stripe 的冪等 key 是真實案例，讓學員看到這不只是理論，是業界標準做法。Caption 要明確點名「C/A/L/Cost」四個字母作為框架名，讓學員從此記住這個工具的名字。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `TRADE-OFF` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
