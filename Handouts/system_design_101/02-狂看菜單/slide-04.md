---
chapter: "第 2 章：狂看菜單"
chapter_id: "02"
chapter_slug: "02-狂看菜單"
slide: "4"
title: "快取三個詞，先背起來"
original_title: "快取三個詞，先背起來"
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

# Slide 04 · 快取三個詞，先背起來

## On-slide Text
- Kicker: `CONCEPT`
- Title: 快取三個詞，先背起來
- Body: none

## Beginner Anchor
重複讀同一份資料時，先查 Cache，減少 DB 壓力。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「快取三個詞，先背起來」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序排列三張詞彙卡，垂直堆疊，卡片間距 24 px，每張圓角 16 px，底色 Deep Teal `#2E7D86`：
>
>   詞彙卡 A：
>   - 上行：`Cache`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `快取`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「把熱資料存在記憶體，下次直接拿，不去 DB」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 B：
>   - 上行：`Cache Hit`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `快取命中`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
>   - 下行：「資料在快取裡找到了，速度快，不打 DB」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 C：
>   - 上行：`Cache Miss`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `快取未命中`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
>   - 下行：「快取沒有，只好去 DB 查，然後存回快取」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   三張卡片之字級、色票與詞彙卡格式規範一致。右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## Logo Assets
Use approved official logo assets, not AI-generated approximations.

| Name | Expected asset | Purpose |
|---|---|---|
| Redis | `assets/logos/infra/redis.svg` | Cache implementation example |
| Memcached | `assets/logos/infra/memcached.svg` | Cache implementation example |

Placement: render these as a compact implementation-logo strip near the vocabulary card. Keep the course logo/footer unchanged.

## Interview Angle
- Likely follow-up: "Cache 裡的資料如果舊了怎麼辦？"
- Strong answer: "我會先看資料是否能接受短暫不一致。菜單通常可以用 TTL 或更新時 invalidation；如果是付款金額或庫存，就不能只信 Cache。"
- Common trap: 只說加 Redis 會變快，卻沒說 cache hit / miss、TTL、invalidation 和 source of truth。

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "快取三個詞，先背起來". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
三個詞同時出現——Cache、Cache Hit、Cache Miss——因為 Hit 和 Miss 是 Cache 的使用語言，不能分開教。讓學員一眼看到「快取不是魔法，只是分兩種情況：有就拿，沒有才去查」。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
