---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "6"
title: "一句話講取捨"
original_title: "用一句話講清楚技術取捨"
beat: "取捨"
kicker: "TRADE-OFF"
layout_type: "interview_answer_template"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 06 · 一句話講取捨

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 一句話講取捨
- Body:
  - 在 X 約束下，我選 Y。
  - 代價是 Z，但它換來 A。
  - 如果規模變大，我會升級成 B。

## Beginner Anchor
會講取捨，比只會說「這個比較快」更像系統設計回答。

## Learning Goal
提供新手可直接套用的面試回答句型。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86 with Coral Red cost marker.
- Use a large fill-in-the-blank sentence card; highlight X/Y/Z/A/B as variable chips.
- Keep the sentence readable; do not overdecorate.

### Source Visual Direction
> 底色 Warm White。中央是大型句型模板，字級 44 px，變數 X、Y、Z、A、B 用 Mint 小膠囊標示。右側放一個 C/A/L/Cost 迷你計分卡，只顯示四個縮寫。底部 Caption：「每個技術都要能回答：換來什麼？犧牲什麼？」右下 logo-dark.png。

## Diagram Spec
```yaml
not_applicable: true
reason: "Answer template slide; no architecture topology."
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Trade-off sentence template, not runtime data flow."
```

## Interview Skill
- Skill: "State trade-offs explicitly."
- Practice line: "在讀多寫少的約束下，我選 Cache；代價是資料可能短暫不一致，但它換來更低延遲和更少 DB 壓力。"

## Rubric
- Good: Names the constraint, choice, cost, benefit, and next upgrade.
- Weak: Says only "Redis is faster" or "Kafka is scalable" without context.

## Mock Interviewer Prompt
"你為什麼在這裡加 Cache？"

## Answer Template
"在讀多寫少、菜單可接受短暫延遲更新的約束下，我選 Cache。代價是資料可能短暫不一致，但它換來低延遲和較低 DB 壓力。"

## Common Mistakes
- 只講優點，不講代價。
- 把工具名稱當成答案。
- 沒說規模變大後怎麼演進。

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Kicker is TRADE-OFF. Title is "一句話講取捨". Show a large fill-in-the-blank interview sentence template with variable chips and a mini C/A/L/Cost scorecard. Use approved palette only.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not add extra variables beyond X, Y, Z, A, B.
- Do not use decorative gradients, fake logos, or tiny unreadable text.

## Speaker Notes
這張直接承接原講義的面試決勝句。小白只要會用這個句型，就能把「技術選擇」變成「有條件、有代價、有升級路線」的系統設計回答。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Variable chips are readable and not confused with real architecture nodes.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

