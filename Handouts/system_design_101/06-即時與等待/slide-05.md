---
chapter: "第 6 章：即時與等待"
chapter_id: "06"
chapter_slug: "06-即時與等待"
slide: "5"
title: "怎麼通知客人"
original_title: "Worker 做完了，怎麼告訴客人？"
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

# Slide 05 · 怎麼通知客人

## On-slide Text
- Kicker: `CONCEPT`
- Title: 怎麼通知客人
- Original title: Worker 做完了，怎麼告訴客人？
- Body:
  - 推播通知：Server 主動推送「你的餐好了」。
  - 長輪詢：Client 問一次，Server 等到有消息才回。
  - 兩種方式讓客人不用自己一直刷新。

## Beginner Anchor
慢任務先丟進 Queue，Worker 背景處理，Server 先釋放。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「Worker 做完了，怎麼告訴客人？」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方兩張詞彙卡，垂直堆疊，卡片間距 24 px：
>
>   詞彙卡 A（Push Notification / 推播通知）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Push Notification`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `推播通知`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「Server 主動推送訊息給 Client，Client 不需輪詢」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 B（Long Polling / 長輪詢）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Long Polling`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `長輪詢`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「Client 送出請求，Server 保持連線直到有消息才回應」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   三行內文在詞彙卡下方 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "怎麼通知客人". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
即時通知這張是點到為止的入門介紹，不深入展開 WebSocket 等進階機制。Push 和 Long Polling 是最入門的兩個方式，讓學員理解「非同步完成後怎麼回報」這個基本問題。重點是概念，不是實作細節。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
