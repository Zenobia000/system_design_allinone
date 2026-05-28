---
chapter: "第 6 章：即時與等待"
chapter_id: "06"
chapter_slug: "06-即時與等待"
slide: "7"
title: "佇列加推播"
original_title: "外送 App 訂單狀態都走佇列 + 推播"
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

# Slide 07 · 佇列加推播

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 佇列加推播
- Original title: 外送 App 訂單狀態都走佇列 + 推播
- Body:
  - Uber Eats 和 Foodpanda 用 Queue 處理訂單狀態。
  - 解耦讓系統能扛尖峰；代價是結果不是即時的。
  - （C/A/L/Cost 計分卡見視覺 prompt）

## Beginner Anchor
慢任務先丟進 Queue，Worker 背景處理，Server 先釋放。

## Learning Goal
用 C/A/L/Cost 說明技術不是免費午餐。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86 + Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「外送 App 訂單狀態都走佇列 + 推播」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。
>
>   大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。
>
>   佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：
>
>   格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↓ 結果是最終一致，使用者不能即時看到處理完成」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。
>
>   格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ 解耦：後端慢或掛，Queue 仍保住請求不遺失」/ 26 px。
>
>   格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「Server 回應快，但處理完成有時間差，非零延遲」/ 26 px。
>
>   格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ Queue 服務 + Worker Pool，增加架構複雜度與費用」/ 26 px。
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
| Uber Eats | `assets/logos/companies/uber-eats.svg` | 外送訂單狀態案例 |
| Foodpanda | `assets/logos/companies/foodpanda.svg` | 外送訂單狀態案例 |

Placement: render these as a compact logo strip near the real-world evidence area. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is TRADE-OFF. Title is "佇列加推播". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
Queue 的最大取捨是一致性：操作不是立刻完成，用戶要等通知。這對某些場景（訂單狀態）是可以接受的，但對某些場景（付款確認）就需要額外的機制確保最終一定完成。讓學員連回第四章的 C/A/L/Cost 框架，感受到「每個章節的技術選擇，都在這四個維度上移動」。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `TRADE-OFF` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
