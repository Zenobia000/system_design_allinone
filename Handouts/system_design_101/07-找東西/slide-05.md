---
chapter: "第 7 章：找東西（選配 / 進階）"
chapter_id: "07"
chapter_slug: "07-找東西"
slide: "5"
title: "電商搜尋都是獨立搜尋引擎"
original_title: "電商搜尋都是獨立搜尋引擎"
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

# Slide 05 · 電商搜尋都是獨立搜尋引擎

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 電商搜尋都是獨立搜尋引擎
- Body:
  - 蝦皮、Momo 等電商搜尋走 Elasticsearch 之類的引擎。
  - 快又準；代價是多一套系統要維護。
  - （C/A/L/Cost 計分卡見視覺 prompt）

## Beginner Anchor
搜尋不要掃 DB 全表，旁掛 Search Index 處理全文查詢。

## Learning Goal
用 C/A/L/Cost 說明技術不是免費午餐。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86 + Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「電商搜尋都是獨立搜尋引擎」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。
>
>   大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。
>
>   佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：
>
>   格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「↓ DB 寫入後索引非同步更新，搜尋結果可能短暫落後」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。
>
>   格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ 搜尋服務獨立，搜尋掛了不影響主系統下單」/ 26 px。
>
>   格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「↑ 反向索引查詢遠快於 DB LIKE 全表掃描」/ 26 px。
>
>   格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ 獨立搜尋服務的運算、儲存費用，資料同步工程成本」/ 26 px。
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
| Shopee | `assets/logos/companies/shopee.svg` | 電商搜尋案例 |
| Momo | `assets/logos/companies/momo.svg` | 電商搜尋案例 |
| Elasticsearch | `assets/logos/infra/elasticsearch.svg` | 搜尋引擎例子 |

Placement: render these as a compact logo strip near the real-world evidence area. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is TRADE-OFF. Title is "電商搜尋都是獨立搜尋引擎". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
搜尋引擎的最大取捨是一致性：DB 寫入後，搜尋索引不是立刻更新，有一段同步延遲。大部分搜尋場景可以接受這個最終一致性（剛上架的商品不一定要立刻出現在搜尋結果）。另一個成本是維運：多一套系統就多一套要監控、備份、升版的複雜度。讓學員用 C/A/L/Cost 框架感受到：搜尋引擎在延遲（L）和可用性（A）上有明顯收益，但在一致性（C）和成本（Cost）上需要付出代價。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `TRADE-OFF` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
