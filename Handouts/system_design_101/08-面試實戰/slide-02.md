---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "2"
title: "五步驟開場"
original_title: "面試回答的五步驟開場"
beat: "框架"
kicker: "SOP"
layout_type: "interview_sop"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · 五步驟開場

## On-slide Text
- Kicker: `SOP`
- Title: 五步驟開場
- Body:
  - 問需求 → 估規模 → 畫 v1
  - 找爆點 → 講取捨
  - 每題都照這個順序走。

## Beginner Anchor
面試時最怕亂，先背流程比先背答案更有用。

## Learning Goal
把原進階講義的面試 SOP 壓縮成新手可操作的五步驟。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Use a vertical five-step timeline with numbered nodes.
- Keep each step as a short label; final Chinese text should be controlled by On-slide Text.

### Source Visual Direction
> 底色 Warm White `#F4F1EA`。大標 Deep Navy。中央為五步驟垂直時間軸，五個節點依序標示「1 問需求」「2 估規模」「3 畫 v1」「4 找爆點」「5 講取捨」。節點使用 Mint 圓點與 Deep Teal 線條，最後一節點用 Coral Red 小標「重點」。下方放一句 Caption：「不要跳步，跳步就容易亂。」右下 logo-dark.png 64 px。

## Diagram Spec
```yaml
not_applicable: true
reason: "Process timeline slide; no architecture topology."
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Interview process flow, not a system data flow."
```

## Interview Skill
- Skill: "Drive the conversation with a stable answer order."
- Practice line: "我會用五步驟回答：需求、估算、v1、瓶頸、取捨。"

## Rubric
- Good: Moves through the five steps without skipping requirements and estimation.
- Weak: Draws a complicated diagram before the interviewer confirms the problem boundaries.

## Mock Interviewer Prompt
"你通常怎麼展開一題 system design？"

## Answer Template
"我會先問需求，再做簡單估算；接著畫最小 v1，找出第一個會爆的點，最後討論要加什麼能力和代價。"

## Common Mistakes
- 直接畫高級架構，忘記問用戶量和核心功能。
- 估算完全不做，導致每題都看起來要用同一套大架構。
- 只說優點，不說取捨。

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Use the approved palette only. Kicker is SOP. Title is "五步驟開場". Make a clean five-step vertical timeline for an interview answer process. Use simple icons for question, calculator, diagram, warning, and balance scale.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not use unapproved colors, shadows, gradients, or fake logos.
- Do not make the timeline crowded or add extra steps.

## Speaker Notes
這張是面試章的主骨架。小白可以不用記很多題，但要能穩定說：「我先問需求，再估規模，先畫簡單版，找爆點，最後講取捨。」這個順序比任何單一技術更重要。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Five steps appear in the correct order.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

