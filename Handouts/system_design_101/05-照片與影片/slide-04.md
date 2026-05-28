---
chapter: "第 5 章：照片與影片"
chapter_id: "05"
chapter_slug: "05-照片與影片"
slide: "4"
title: "大檔案有專用倉庫"
original_title: "大檔案有專用倉庫"
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

# Slide 04 · 大檔案有專用倉庫

## On-slide Text
- Kicker: `CONCEPT`
- Title: 大檔案有專用倉庫
- Body:
  - 圖片、影片、PDF，統一存進物件儲存。
  - DB 只存檔案位置（URL），不存原始檔案。
  - 儲存成本低，容量近乎無限，方便備份。

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
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「大檔案有專用倉庫」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：
>
>   詞彙卡 A（Blob Storage / 物件儲存）：
>   - 上行：`Blob Storage`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `物件儲存`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「專門存放大型二進位檔案，不放進關聯式資料庫」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡下方：一個簡化流程示意圖。左側「App Server」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px，JetBrains Mono / 28 px）。一條箭頭（Mint 實線，標「存 URL」/ JetBrains Mono / 18 px）指向右側「DB」方塊（底色 `#1E3450`，邊框 Deep Teal / 2 px），DB 方塊內文字「存 URL」/ JetBrains Mono / 22 px / `#97E8D6`。另一條箭頭（Mint 實線，標「存檔案」/ JetBrains Mono / 18 px）從 App Server 斜向指向下方「Blob Storage」方塊（底色 `#1E3450`，邊框 Mint `#97E8D6` / 4 px，內含倉庫 icon，標「S3 / GCS 等」/ JetBrains Mono / 22 px / `#97E8D6`，NEW 標籤提示用）。
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
| AWS S3 | `assets/logos/cloud/aws-s3.svg` | 物件儲存服務例子 |
| Google Cloud Storage | `assets/logos/cloud/google-cloud-storage.svg` | 物件儲存服務例子 |

Placement: render these as a compact logo strip near the real-world evidence area. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "大檔案有專用倉庫". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
Blob Storage 的核心概念是「DB 只存 URL，真實檔案另存專用服務」。AWS S3、Google Cloud Storage 都是這類服務的實例，讓學員知道這是業界標準，不是自建的奇怪東西。第三行的儲存成本低和容量無限是讓學員感受到這個解法的吸引力。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
