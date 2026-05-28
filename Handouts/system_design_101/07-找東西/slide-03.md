---
chapter: "第 7 章：找東西（選配 / 進階）"
chapter_id: "07"
chapter_slug: "07-找東西"
slide: "3"
title: "預先建表，查詢秒回"
original_title: "預先建表，查詢秒回"
beat: "技術"
kicker: "CONCEPT"
layout_type: "concept_vocab"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 03 · 預先建表，查詢秒回

## On-slide Text
- Kicker: `CONCEPT`
- Title: 預先建表，查詢秒回
- Body:
  - 不等查詢時掃描，提前建好「字 → 文件」的對照表。
  - 查「蛋餅」，秒找出所有含這個詞的菜單。
  - 還能依相關性排序，最準的結果排最前。

## Beginner Anchor
搜尋不要掃 DB 全表，旁掛 Search Index 處理全文查詢。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「預先建表，查詢秒回」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序兩張詞彙卡，垂直堆疊，卡片間距 24 px：
>
>   詞彙卡 A（Search Engine / 搜尋引擎）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Search Engine`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `搜尋引擎`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「專為全文搜尋設計，能排序相關性，比 DB LIKE 快得多」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 B（Inverted Index / 反向索引）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Inverted Index`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `反向索引`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「預先記錄「字 → 出現的文件列表」，查詢時直接跳到結果」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   三行內文在詞彙卡下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## Logo Assets
Use approved official logo assets, not AI-generated approximations.

| Name | Expected asset | Purpose |
|---|---|---|
| Elasticsearch | `assets/logos/infra/elasticsearch.svg` | Search Engine implementation example |
| OpenSearch | `assets/logos/infra/opensearch.svg` | Search Engine implementation example |

Placement: render these as a compact implementation-logo strip near the vocabulary card. Keep the course logo/footer unchanged.

## Interview Angle
- Likely follow-up: "為什麼不用 SQL LIKE 就好？"
- Strong answer: "小資料量可以先用 LIKE 或 DB index；當需要關鍵字相關性、分詞、排序、模糊查詢和大量搜尋流量時，才把搜尋讀路徑交給 Search Index。代價是索引同步延遲。"
- Common trap: 一開始就上 Elasticsearch，卻沒說資料如何從 DB 同步到 index，以及 index 落後時使用者會看到什麼。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "預先建表，查詢秒回". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
兩個詞彙卡一起出現：Search Engine 是整套系統，Inverted Index 是它的核心機制。不需要深入說明 TF-IDF 或相關性算法——只要讓學員理解「提前建好反向對照表，查詢時不掃全表」這個核心邏輯就夠了。與一般 DB index 的差別點到即止：DB index 是「列的值 → 列位置」；Inverted Index 是「詞語 → 含該詞的文件列表」，後者天生為全文搜尋設計。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
