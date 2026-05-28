---
chapter: "第 0 章：世界觀"
chapter_id: "00"
chapter_slug: "00-世界觀"
slide: "4"
title: "三個你要記住的角色"
original_title: "三個你要記住的角色"
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

# Slide 04 · 三個你要記住的角色

## On-slide Text
- Kicker: `CONCEPT`
- Title: 三個你要記住的角色
- Body: none

## Beginner Anchor
先記住三個角色：Client、Server、Database。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色 / `#F4F1EA` 文字。頂部大標「三個你要記住的角色」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序排列三張詞彙卡，垂直堆疊，卡片間距 24 px，每張詞彙卡圓角 16 px，底色 Deep Teal `#2E7D86`，內容如下：
>
>   詞彙卡 A：
>   - 上行：`Client`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `客人端`（Noto Sans TC 500 / 34 px / `#F4F1EA`），中英並排，以 `/` 分隔
>   - 下行：「你的手機、瀏覽器，負責送出請求」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 B：
>   - 上行：`Server`（JetBrains Mono）/ `伺服器`（Noto Sans TC）
>   - 下行：「廚房，接收請求並處理邏輯」
>
>   詞彙卡 C：
>   - 上行：`Database`（JetBrains Mono）/ `資料庫`（Noto Sans TC）
>   - 下行：「冰箱，負責存放與讀取所有資料」
>
>   三張卡片的字級、間距、色票與詞彙卡格式規範一致。右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "三個你要記住的角色". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
每個術語都對應前一張的餐廳類比。Client＝客人，Server＝廚房，Database＝冰箱。三個詞彙卡要同時出現在畫面上，讓人一眼掃完三個對照。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
