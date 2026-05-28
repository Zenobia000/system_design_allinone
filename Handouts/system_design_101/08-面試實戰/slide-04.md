---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "4"
title: "估算不用怕"
original_title: "容量估算不用怕，只先抓三件事"
beat: "估算"
kicker: "ESTIMATION"
layout_type: "interview_estimation"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 04 · 估算不用怕

## On-slide Text
- Kicker: `ESTIMATION`
- Title: 估算不用怕
- Body:
  - DAU → 尖峰 QPS
  - 每筆資料大小 → 儲存量
  - 每秒流量 → 頻寬壓力

## Beginner Anchor
估算不是考精準數學，而是判斷系統大概會在哪裡爆。

## Learning Goal
教新手用三個粗估方向支撐後續架構選擇。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Use three formula rows, each row with input icon, arrow, and pressure output.
- Formula text must remain large and readable.

### Source Visual Direction
> 底色 Warm White。大標 Deep Navy。中央三條公式列：`DAU -> Peak QPS`、`Data size -> Storage`、`Traffic -> Bandwidth`。每列左側小圖示使用線條風格，右側用 Coral Red 壓力標籤標出「請求壓力」「儲存壓力」「頻寬壓力」。下方 Caption：「只要估到量級，就足夠支撐架構討論。」右下 logo-dark.png。

## Diagram Spec
```yaml
not_applicable: true
reason: "Estimation formula slide; no architecture topology."
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Estimation slide, not a runtime technical flow."
```

## Interview Skill
- Skill: "Estimate to find the first bottleneck."
- Practice line: "我先粗估尖峰 QPS、資料量和頻寬，目的是判斷哪一層會先爆。"

## Rubric
- Good: Uses estimates to justify whether simple architecture is enough.
- Weak: Throws out large numbers without connecting them to a design decision.

## Mock Interviewer Prompt
"這個服務如果有一百萬 DAU，你會怎麼估流量？"

## Answer Template
"我會先用 DAU 估日請求，再乘上尖峰係數得到 peak QPS；接著估每筆資料大小和每天新增量，判斷 DB、Cache 或 CDN 哪裡最吃壓力。"

## Common Mistakes
- 追求精準小數點，忘記估算是為了選架構。
- 只估用戶數，不估讀寫比例。
- 完全不說假設，讓數字沒有上下文。

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Kicker is ESTIMATION. Title is "估算不用怕". Show three clean formula rows with arrows and pressure labels. Use approved palette only. Keep text zones spacious and readable.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not add complicated equations or tiny spreadsheet tables.
- Do not use unapproved colors, glossy calculators, or fake brand marks.

## Speaker Notes
新手常怕估算，但面試要的不是精準到個位數，而是知道量級。這張只保留三個方向：請求、儲存、頻寬。估算完才能說「這個規模先不用 sharding」或「這裡需要 CDN」。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Formula rows stay readable at 4:5 social-card size.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

