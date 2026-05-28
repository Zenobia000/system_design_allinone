---
chapter: "第 5 章：照片與影片"
chapter_id: "05"
chapter_slug: "05-照片與影片"
slide: "5"
title: "就近快取檔案"
original_title: "把檔案快取到離用戶最近的地方"
beat: "技術"
kicker: "CONCEPT"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · 就近快取檔案

## On-slide Text
- Kicker: `CONCEPT`
- Title: 就近快取檔案
- Original title: 把檔案快取到離用戶最近的地方
- Body:
  - CDN 在全球各地佈署快取節點（Edge）。
  - 用戶請求圖片，從最近的節點回傳，毫秒級。
  - Origin Server 壓力大減，只需首次傳輸。

## Beginner Anchor
大檔案不要塞 DB，放 Blob Storage，讓 CDN 就近傳給用戶。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「把檔案快取到離用戶最近的地方」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：
>
>   詞彙卡 A（CDN / 內容傳遞網路）：
>   - 上行：`CDN`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `內容傳遞網路`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「把靜態資源快取到全球各地節點，就近服務用戶」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡下方：一個 CDN 分佈示意圖（極簡地球輪廓，Deep Navy 底，Mint 線條輪廓）。中央：「Origin」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，標「Origin Server」/ JetBrains Mono / 24 px）。四個方向各有一個「Edge」方塊（底色 `#1E3450`，邊框 Mint `#97E8D6` / 2 px，標「Edge」/ JetBrains Mono / 22 px），以 Mint 箭頭從 Origin 指向各 Edge（標「快取」/ JetBrains Mono / 18 px）。各 Edge 旁邊有一個人形 icon，以極短 Mint 箭頭連結（代表就近服務）。
>
>   三行內文在示意圖下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## Logo Assets
Use approved official logo assets, not AI-generated approximations.

| Name | Expected asset | Purpose |
|---|---|---|
| Cloudflare | `assets/logos/cloud/cloudflare.svg` | CDN 服務例子 |
| AWS CloudFront | `assets/logos/cloud/aws-cloudfront.svg` | CDN 服務例子 |

Placement: render these as a compact logo strip near the real-world evidence area. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "就近快取檔案". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
CDN 的核心概念是「就近快取」——用戶不需要每次都連到遠端 Origin，從最近的 Edge 節點取資源，速度大幅提升。Cloudflare、AWS CloudFront 都是業界廣泛使用的 CDN 服務，可在旁白中補充，讓學員知道這些服務已經在我們的日常生活裡。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
