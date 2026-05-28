---
chapter: "第 1 章：人變多"
chapter_id: "01"
chapter_slug: "01-人變多"
slide: "4"
title: "兩個詞彙，解決「人太多」"
original_title: "兩個詞彙，解決「人太多」"
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

# Slide 04 · 兩個詞彙，解決「人太多」

## On-slide Text
- Kicker: `CONCEPT`
- Title: 兩個詞彙，解決「人太多」
- Body: none

## Beginner Anchor
人變多時，不是只換大機器，而是用 Load Balancer 分給多台 Server。

## Learning Goal
把生活直覺轉成術語，保留白話定義。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Typography and brand placement must follow `../0_STYLE_GUIDE.md`.
- Use the image prompt for illustration and layout only; keep final Chinese text controlled by the slide text above when possible.

### Source Visual Direction
> 1080×1350 px 直幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「兩個詞彙，解決「人太多」」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序排列兩張詞彙卡，垂直堆疊，卡片間距 28 px，每張圓角 16 px，底色 Deep Teal `#2E7D86`，內容如下：
>
>   詞彙卡 A：
>   - 上行：`Load Balancer`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `負載平衡器`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「把請求分配給多台 Server，不讓一台撐死」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 B：
>   - 上行：`Horizontal Scaling`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `水平擴展`（Noto Sans TC 500 / 34 px / `#F4F1EA`）
>   - 下行：「加機器而非換更大的機器，可以無限延伸」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   兩張卡片之字級、色票與詞彙卡格式規範一致。右下角 logo-light.png 64 px。頁尾同規格。

## Diagram Spec
```yaml
not_applicable: true
reason: "This slide is illustration/text driven, not a formal architecture diagram."
```

## Logo Assets
Use approved official logo assets, not AI-generated approximations.

| Name | Expected asset | Purpose |
|---|---|---|
| NGINX | `assets/logos/infra/nginx.svg` | Load Balancer / reverse proxy implementation example |
| HAProxy | `assets/logos/infra/haproxy.svg` | Load Balancer implementation example |
| AWS Elastic Load Balancing | `assets/logos/cloud/aws-elb.svg` | Managed load balancer example |

Placement: render these as a compact implementation-logo strip near the vocabulary card. Keep the course logo/footer unchanged.

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "兩個詞彙，解決「人太多」". Follow the source visual direction, with clean line illustration and stable 4:5 social-card composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
兩個詞同時登場是因為它們總是一起出現——有了水平擴展，才需要負載平衡器來決定「新請求給誰」。術語先記住，細節下一張才說。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
