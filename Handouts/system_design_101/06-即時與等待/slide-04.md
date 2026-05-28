---
chapter: "第 6 章：即時與等待"
chapter_id: "06"
chapter_slug: "06-即時與等待"
slide: "4"
title: "先排隊再處理"
original_title: "請求先排隊，Worker 慢慢處理"
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

# Slide 04 · 先排隊再處理

## On-slide Text
- Kicker: `CONCEPT`
- Title: 先排隊再處理
- Original title: 請求先排隊，Worker 慢慢處理
- Body:
  - Queue：請求進來先排進佇列，立刻回應客人。
  - Worker：背景慢慢從 Queue 取出任務處理。
  - Server 解放，尖峰流量不再塞車。

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
> 1920×1080 px 橫幅。底色 Deep Navy `#152238`。左上角 Kicker 標籤：「CONCEPT」/ Inter 700 / 24 px / Deep Teal `#2E7D86` 底色圓角膠囊 / `#F4F1EA` 文字。大標「請求先排隊，Worker 慢慢處理」/ Noto Sans TC 900 / 80 px / `#F4F1EA`，左對齊。大標下方依序兩張詞彙卡，垂直堆疊，卡片間距 24 px：
>
>   詞彙卡 A（Message Queue / 訊息佇列）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Message Queue`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `訊息佇列`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「請求先排隊等候，Worker 依序取出處理，解耦生產與消費」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
>
>   詞彙卡 B（Worker / 背景工作）：
>   - 圓角 16 px，底色 Deep Teal `#2E7D86`
>   - 上行：`Worker`（JetBrains Mono 500 / 34 px / `#97E8D6`）/ `背景工作`（Noto Sans TC 500 / 34 px / `#F4F1EA`），以 `/` 分隔
>   - 下行：「從 Queue 取出任務，在背景非同步執行，不占用 Server 主線程」/ Noto Sans TC 500 / 34 px / `#F4F1EA` / 行高 1.40
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
| Apache Kafka | `assets/logos/infra/kafka.svg` | Message Queue / stream platform example |
| RabbitMQ | `assets/logos/infra/rabbitmq.svg` | Message Queue implementation example |
| AWS SQS | `assets/logos/cloud/aws-sqs.svg` | Managed queue example |

Placement: render these as a compact implementation-logo strip near the vocabulary card. Keep the course logo/footer unchanged.

## Interview Angle
- Likely follow-up: "什麼時候該加 Queue？"
- Strong answer: "當任務很慢、不需要同步完成、或需要削峰時，可以把工作放進 Queue。代價是使用者看到的是 eventual result，而且 Worker 必須能 retry、去重、處理 dead letter。"
- Common trap: 把 Queue 當成萬用加速器，卻忘記它讓流程變成非同步，也讓錯誤處理更複雜。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Use Deep Navy #152238, Warm White #F4F1EA, Deep Teal #2E7D86, Mint #97E8D6, Coral Red #E8634F only. Kicker is CONCEPT. Title is "先排隊再處理". Follow the source visual direction, with clean line illustration and stable 16:9 PowerPoint slide composition.

## Negative Prompt
- Do not generate fake, approximate, or AI-invented brand marks; approved official logo assets must be composited separately.
- Do not invent extra Chinese text or rewrite the title.
- Do not use neon colors, pure black backgrounds, glossy 3D, random stickers, clipart clutter, or gradient glow effects.
- Do not move the logo/footer outside the 96 px safe margin.
- Do not shrink text below the style guide sizes to force long copy onto the slide.

## Speaker Notes
Queue 和 Worker 是一對搭檔，必須一起出現才完整。Queue 負責「接收並保存」，Worker 負責「取出並處理」。這個分工讓 Server 的職責變得單純：只管接請求、丟進 Queue，不管後續多慢，Server 都立刻解放了。

## QA Checklist
- [ ] All named companies/products with available assets use official logo files.
- [ ] No fake, approximate, or AI-invented logos appear.
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `CONCEPT` and uses the correct beat color.
- [ ] Logo and footer are placed according to the style guide.
- [ ] No extra generated text appears on the final image.
- [ ] Beginner anchor is visible in review notes before production.
