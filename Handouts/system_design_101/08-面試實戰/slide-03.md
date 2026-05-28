---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "3"
title: "先問需求"
original_title: "畫圖以前，先問需求"
beat: "需求"
kicker: "REQUIREMENTS"
layout_type: "interview_question_card"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 03 · 先問需求

## On-slide Text
- Kicker: `REQUIREMENTS`
- Title: 先問需求
- Body:
  - 使用者是誰？核心功能是什麼？
  - 讀多還是寫多？資料能不能慢一點同步？
  - 哪個維度不能犧牲？

## Beginner Anchor
需求沒問清楚，後面選什麼技術都可能選錯。

## Learning Goal
讓新手掌握面試開場最該問的問題類型。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Use a checklist card layout with six compact question chips.
- Avoid decorative speech bubbles that make the slide look like a comic.

### Source Visual Direction
> 底色 Deep Navy。中央是一張不嵌套的 checklist 面板，六個問題 chip 排成 2×3：「用戶是誰」「核心功能」「讀寫比例」「延遲要求」「一致性要求」「失敗容忍」。Chip 使用 Deep Teal 底、Mint 邊框。底部 Caption：「需求決定架構，不是技術名詞決定架構。」右下 logo-light.png。

## Diagram Spec
```yaml
not_applicable: true
reason: "Requirement checklist slide; no architecture topology."
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Requirement clarification slide, not a system flow slide."
```

## Interview Skill
- Skill: "Clarify constraints before solutioning."
- Practice line: "我先確認這題最重視一致性、可用性、延遲還是成本。"

## Rubric
- Good: Asks about users, core actions, scale, read/write mix, latency, consistency, and failure tolerance.
- Weak: Assumes all requirements from the prompt without verification.

## Mock Interviewer Prompt
"請設計一個短網址服務。"

## Answer Template
"我先確認幾件事：每天建立多少短網址、讀取量多大、短網址是否可過期、是否需要自訂 alias，以及 redirect 延遲要求。"

## Common Mistakes
- 只問 DAU，不問核心操作。
- 只問功能，不問一致性和失敗容忍。
- 把自己的產品假設當成題目要求。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Kicker is REQUIREMENTS. Title is "先問需求". Show a clean checklist board with six compact question chips. Use approved palette only, flat editorial style, no fake UI screenshots.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not add more than six checklist chips.
- Do not use random app screenshots, fake brands, or colorful stickers.

## Speaker Notes
先問需求是面試第一個加分點。這張要教學員用 C/A/L/Cost 反問題目：哪個維度不能犧牲？如果投票系統，一致性重要；如果動態牆，延遲和可用性可能更重要。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Requirement chips remain short and readable.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

