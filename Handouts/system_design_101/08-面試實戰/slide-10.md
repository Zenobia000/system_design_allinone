---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "10"
title: "最後小抄"
original_title: "面試前最後一張小抄"
beat: "小抄"
kicker: "CHEATSHEET"
layout_type: "interview_cheatsheet"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 10 · 最後小抄

## On-slide Text
- Kicker: `CHEATSHEET`
- Title: 最後小抄
- Body:
  - 先問需求，再估規模。
  - 先畫 v1，再逐步升級。
  - 每個技術都要講清楚取捨。

## Beginner Anchor
面試時卡住，就回到「需求、估算、v1、爆點、取捨」。

## Learning Goal
用一張總結卡收束面試實戰章，讓學員有可複誦的小抄。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint #97E8D6.
- Use a compact cheat-sheet poster with five numbered reminders and one large final sentence.
- Avoid tiny text; this should still be readable as a social card.

### Source Visual Direction
> 底色 Deep Navy。中央是一張平面小抄海報，邊框 Mint，底色 `#1E3450`。海報內五個 numbered reminders：「1 問需求」「2 估規模」「3 畫 v1」「4 找爆點」「5 講取捨」。底部用 Coral Red 強調：「不要只說技術，要說理由。」右下 logo-light.png。

## Diagram Spec
```yaml
not_applicable: true
reason: "Cheatsheet summary slide; no architecture topology."
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Summary slide, not runtime data flow."
```

## Interview Skill
- Skill: "Recover when stuck by returning to the answer frame."
- Practice line: "我先回到需求和規模，確認這個設計到底要優先解哪個痛點。"

## Rubric
- Good: Can use the five reminders to restart a stuck answer.
- Weak: Freezes because the memorized architecture does not match the prompt.

## Mock Interviewer Prompt
"如果你回答到一半發現架構太複雜，你會怎麼收斂？"

## Answer Template
"我會先回到需求，確認最重要的約束，再把架構收斂到 v1，只保留能解當前瓶頸的元件。"

## Common Mistakes
- 越卡越加技術。
- 忘記把回答拉回需求。
- 不敢說「這個規模暫時不需要 X」。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Kicker is CHEATSHEET. Title is "最後小抄". Show a compact cheat-sheet poster with five numbered reminders. Use approved palette only and keep all text readable.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not add more than five reminders.
- Do not use fake logos, stickers, gradients, or tiny notebook scribbles.

## Speaker Notes
最後小抄要讓學員帶走一套救命流程。面試卡住時，不要亂加技術，回到需求、估算、v1、爆點、取捨。能說「這個規模不需要 X」也是成熟回答。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Five reminders are present and readable.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

