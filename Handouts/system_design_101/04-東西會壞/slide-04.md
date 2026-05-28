---
chapter: "第 4 章：東西會壞"
chapter_id: "04"
chapter_slug: "04-東西會壞"
slide: "4"
title: "掛了就切，切了再試"
original_title: "掛了就切，切了再試"
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

# Slide 04 · 掛了就切，切了再試

## On-slide Text
- Kicker: `CONCEPT`
- Title: 掛了就切，切了再試
- Body:
  - Failover：主機掛了，自動切到備援節點。
  - 健康檢查持續偵測各節點是否存活。
  - Retry：失敗了自動重送，但要小心重複。

## Beginner Anchor
系統一定會壞，所以要能切換、重試，並避免重複處理。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「掛了就切，切了再試」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序兩張詞彙卡，垂直堆疊，卡片間距 24 px：
>
>   詞彙卡 A（Failover / 容錯備援）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Failover`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `容錯備援`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「主機掛了，自動切到備援，服務不中斷」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 B（Retry / 重試）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Retry`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `重試`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「請求失敗後自動重新送出，等待系統恢復」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   三行內文在詞彙卡下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "掛了就切，切了再試". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
Failover 和 Retry 是一對搭檔——Failover 解決硬體層的斷點，Retry 解決網路層的暫時失敗。兩者一起讓系統在局部故障時仍能繼續運作。注意最後一句「但要小心重複」留下懸念，引出下一張的冪等。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
