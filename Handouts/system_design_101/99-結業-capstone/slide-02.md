---
chapter: "第 99 章：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "2"
title: "v1 到 v7"
original_title: "v1 到 v7，每章長一個能力區塊"
beat: "RECAP"
kicker: "RECAP"
layout_type: "recap_timeline"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · v1 到 v7

## On-slide Text
- Kicker: `RECAP`
- Title: v1 到 v7
- Original title: v1 到 v7，每章長一個能力區塊
- Body:
  - 每一次系統爆掉，就長出一個解藥方塊。
  - （演化時間軸見視覺 prompt）
  - 能默畫這條線，就是這門課的終點。

## Beginner Anchor
能畫圖、能說痛點、能講取捨，就是這門課的驗收。

## Learning Goal
讓學員用固定框架理解本頁重點。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「RECAP」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「v1 到 v7，每章長一個能力區塊」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊，頂部。
>
>   大標下方：一條垂直演化時間軸，從上到下七個節點，每個節點左側為版本號標籤、右側為一句話說明。節點圓形（直徑 20 px，Mint `#97E8D6` 填充），節點之間的連線為 Mint `#97E8D6` 細線（2 px）。七個節點依序：
>
>   節點 1：「v1」/ JetBrains Mono 700 / 28 px / `#97E8D6`——右側說明：「Client → Server → DB（最簡單的起點）」/ Noto Sans TC 500 / 28 px / `#F4F1EA`
>   節點 2：「v2」——右側：「Load Balancer + Server × N（水平擴展）」
>   節點 3：「v3」——右側：「Cache 層加入（菜單不再重複查 DB）」
>   節點 4：「v4」——右側：「Primary + Replica + Shard（資料層擴展）」
>   節點 5：「v5」——右側：「備援 + 冪等（東西會壞，要能恢復）」
>   節點 6：「v6」——右側：「CDN + Blob Storage（大型靜態資源）」
>   節點 7：「v7」——右側：「Message Queue + Worker（非同步解耦）」
>
>   版本號字型 JetBrains Mono 700 / 28 px / `#97E8D6`；右側說明 Noto Sans TC 500 / 26 px / `#F4F1EA`。整條時間軸置中偏左，各節點垂直間距均等（約 100 px）。
>
>   時間軸下方一行內文：「能默畫這條線，就是這門課的終點。」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "Recap timeline slide; render as a version timeline rather than a formal architecture topology diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is RECAP. Title is "v1 到 v7". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
這張是全課程最關鍵的複習卡。七個版本、七個方塊、七次爆點解藥，一張卡掃完。不需要重新解釋每個技術——學員看到「v3 Cache」就應該自己想起「菜單不再重複查 DB」的那個場景。如果腦子裡能把這條線完整跑一遍，就代表他真的理解了架構演化的邏輯。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `RECAP` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
