---
chapter: "第 0 章：世界觀"
chapter_id: "00"
chapter_slug: "00-世界觀"
slide: "1"
title: "背後長什麼樣"
original_title: "你每天用的 App，背後長什麼樣？"
beat: "登場"
kicker: "INTRO"
layout_type: "instructional_card"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 01 · 背後長什麼樣

## On-slide Text
- Kicker: `INTRO`
- Title: 背後長什麼樣
- Original title: 你每天用的 App，背後長什麼樣？
- Body: none

## Beginner Anchor
先記住三個角色：Client、Server、Database。

## Learning Goal
建立課程情境與主角 App，降低進入門檻。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。畫面中央：一支手機線稿輪廓，以 Mint `#97E8D6` 細線條（2 px）繪出，手機螢幕內顯示一個簡化的點餐 icon（碗 + 筷子，單色線條）。大標「你每天用的 App，背後長什麼樣？」以 Noto Sans TC 900 Black / 80 px / `#F4F1EA` 置於手機下方，左對齊，水平位於安全邊距內。左上角 Kicker 標籤：「INTRO」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / `#2E7D86` 底色圓角膠囊（8 px）/ `#F4F1EA` 文字。右下角：`logo-light.png` 高度 64 px。頁尾：「桑尼資料科學 · 版權所有 ©」/ Noto Sans TC 500 / 22 px / `#F4F1EA`，距底部 96 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is INTRO. Title is "背後長什麼樣". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
開場不說廢話。一個問題，讓學員想：「對，我每天開 App 但完全不知道裡面是什麼。」

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `INTRO` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
