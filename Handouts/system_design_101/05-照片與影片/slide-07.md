---
chapter: "第 5 章：照片與影片"
chapter_id: "05"
chapter_slug: "05-照片與影片"
slide: "7"
title: "CDN 撐起影音"
original_title: "全球影音平台靠 CDN 撐起來的"
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

# Slide 07 · CDN 撐起影音

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: CDN 撐起影音
- Original title: 全球影音平台靠 CDN 撐起來的
- Body:
  - YouTube 每分鐘上傳 500 小時影片，全靠物件儲存。
  - Netflix 在全球 4000+ 節點快取，才能一秒開片。
  - （C/A/L/Cost 計分卡見視覺 prompt）

## Beginner Anchor
大檔案不要塞 DB，放 Blob Storage，讓 CDN 就近傳給用戶。

## Learning Goal
用 C/A/L/Cost 說明技術不是免費午餐。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86 + Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Warm White `#F4F1EA`。左上角 Kicker 標籤：「TRADE-OFF」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / 左半 Deep Teal `#2E7D86`、右半 Coral Red `#E8634F` 雙色並陳底色圓角膠囊 / `#F4F1EA` 文字。大標「YouTube 和 Netflix 靠 CDN 撐全球影音」/ Noto Sans TC 900 / 80 px / `#152238`，左對齊。
>
>   大標下方兩行佐證文字 / Noto Sans TC 500 / 34 px / `#152238` / 行高 1.60，左對齊。
>
>   佐證下方：C/A/L/Cost 四格計分卡（2×2），每格圓角 16 px，間距 20 px：
>
>   格子 1（C 一致性）：底色 `#152238`，文字 `#F4F1EA`。「C」/ Mint `#97E8D6` / 48 px。評分：「CDN 快取可能短暫落後，更新要等快取過期」/ Noto Sans TC 500 / 26 px / `#F4F1EA`。
>
>   格子 2（A 可用性）：底色 `#2E7D86`，文字 `#F4F1EA`。「A」/ `#F4F1EA` / 48 px。評分：「↑ CDN 節點分散，Origin 掛了 Edge 仍可服務」/ 26 px。
>
>   格子 3（L 延遲）：底色 `#152238`，文字 `#F4F1EA`。「L」/ Mint `#97E8D6` / 48 px。評分：「↑ 就近快取，圖片和影片載入速度大幅提升」/ 26 px。
>
>   格子 4（Cost 成本）：底色 `#2E7D86`，文字 `#F4F1EA`。「Cost」/ `#F4F1EA` / 48 px。評分：「↑ CDN 流量費用 + Blob Storage 費用，但 DB 成本降低」/ 26 px。
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
| YouTube | `assets/logos/companies/youtube.svg` | 影音與物件儲存案例 |
| Netflix | `assets/logos/companies/netflix.svg` | 全球 CDN/Edge 案例 |

Placement: render these as a compact logo strip near the real-world evidence area. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is TRADE-OFF. Title is "CDN 撐起影音". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這章的取捨最直觀：延遲大幅改善、可用性提升，代價是多了一層架構和 CDN + Blob Storage 費用，以及 CDN 快取可能短暫落後（一致性稍降）。讓學員看到：每加一層解法，架構就更複雜、成本就增加，但換來的效能提升是真實的。這是工程師每天面對的權衡。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `TRADE-OFF` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
