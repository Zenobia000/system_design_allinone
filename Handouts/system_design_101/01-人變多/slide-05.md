---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "5"
title: "Server 不能自己記東西"
original_title: "Server 不能自己記東西"
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

# Slide 05 · Server 不能自己記東西

## On-slide Text
- Kicker: `CONCEPT`
- Title: Server 不能自己記東西
- Body:
  - 你登入後，下一個請求可能被不同 Server 處理。
  - 如果 Server 自己記登入狀態，就會出問題。
  - 解法：把狀態外移到 DB 或 Session Store。

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「Server 不能自己記東西」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方一張詞彙卡，圓角 16 px，底色 Deep Teal `#2E7D86`：
>   - 上行：`Stateless`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `無狀態`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
>   - 下行：「每個請求帶齊所有資訊，Server 不記任何狀態」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡下方有一個簡化示意圖：兩台 Server 方塊（邊框 Mint `#97E8D6` 2 px），中間上方一個 Session Store 圓柱方塊（邊框 Deep Teal `#2E7D86` 2 px），兩條虛線箭頭（Mint）從兩台 Server 分別指向 Session Store，代表「狀態外移」。圖示下方三行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60。右下 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "Server 不能自己記東西". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
Stateless 是水平擴展能成立的關鍵前提，這個概念很多人卡在這裡。類比：你去任何一家麥當勞點餐，服務員不需要認識你——你只要告訴他你要點什麼就好。Server 也一樣，不記狀態，才能隨意分配請求。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
