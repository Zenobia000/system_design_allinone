---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "1"
title: "中午 12 點，系統整個掛了"
original_title: "中午 12 點，系統整個掛了"
beat: "痛點"
kicker: "PAIN POINT"
layout_type: "pain_point"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 01 · 中午 12 點，系統整個掛了

## On-slide Text
- Kicker: `PAIN POINT`
- Title: 中午 12 點，系統整個掛了
- Progress pill: 服務 1 萬用戶
- Body:
  - 訂單全湧進來，一台 Server 扛不住。
  - 用戶按送出——轉圈圈、無回應、崩潰。
  - 你的 App 在最忙的時候讓大家失望。

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
讓初學者先感受到本章問題，不急著講技術名詞。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。頂部安全邊距內：進度條膠囊「服務 1 萬用戶」，底色 Mint `#97E8D6`，文字 Deep Navy `#152238`，Inter 700 + JetBrains Mono（數字部分）/ 34 px，圓角 20 px，左對齊。左上角 Kicker 標籤：「PAIN POINT」/ Inter 700 / 24 px / 全大寫 / 字距 0.12 em / Coral Red `#E8634F` 底色圓角膠囊 / `#F4F1EA` 文字。畫面中央：一個 Server 方塊（圓角矩形，邊框 Coral Red `#E8634F` 4 px），方塊內「Server」/ JetBrains Mono / 28 px / `#F4F1EA`，方塊右上角有一個紅色驚嘆號 icon（線條，Coral Red），表示當機。方塊四周以 Coral Red `#E8634F` 細線條（2 px）畫出放射狀衝擊線（5-6 條），暗示爆炸/超載。方塊下方大標「中午 12 點，系統整個掛了」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。三行內文 / Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.60，左對齊。右下角 logo-light.png 64 px。頁尾「桑尼資料科學 · 版權所有 ©」/ Noto Sans TC 500 / 22 px / `#F4F1EA`，距底部 96 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is PAIN POINT. Title is "中午 12 點，系統整個掛了". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
製造恐慌感。學員要能想像：自己開的店，中午最忙的時刻，客人全部看到轉圈圈。這才是真實的系統設計動力——不是為了炫技，是因為系統真的會爆。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `PAIN POINT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
