---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "9"
title: "實務不是炫技"
original_title: "實務經驗：真實系統不是炫技比賽"
beat: "實務"
kicker: "PRACTICE"
layout_type: "practice_experience"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 09 · 實務不是炫技

## On-slide Text
- Kicker: `PRACTICE`
- Title: 實務不是炫技
- Body:
  - 真實工作先量測瓶頸，不先堆技術。
  - 先用簡單方案上線，再按痛點升級。
  - 每個升級都要寫清楚代價。

## Beginner Anchor
實務上好架構不是最複雜，而是剛好解決當下最痛的問題。

## Learning Goal
補足原講義中的實戰經驗：先觀察、再升級、並記錄取捨。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal #2E7D86.
- Show a production dashboard plus a small architecture evolution strip.
- Keep dashboard generic; no real vendor UI or fake product logo.

### Source Visual Direction
> 底色 Warm White。上半部是一個簡化監控儀表板線稿，只有三個指標卡：Latency、Error、QPS。下半部是 v1 → bottleneck → upgrade 的三段流程。使用 Coral Red 標出 bottleneck，Mint 標出 upgrade。大標 Deep Navy，右下 logo-dark.png。

## Diagram Spec
```yaml
not_applicable: true
reason: "Practice guidance slide; no formal architecture topology."
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Operational practice guidance, not a specific runtime flow."
```

## Interview Skill
- Skill: "Translate real-world practice into design reasoning."
- Practice line: "我不會先上最複雜方案；我會先量測瓶頸，確認問題後再升級。"

## Rubric
- Good: Explains a simple-first approach and how observations justify upgrades.
- Weak: Treats architecture as a list of fashionable tools.

## Mock Interviewer Prompt
"你怎麼知道這裡真的需要加 Cache？"

## Answer Template
"我會先看 DB query latency、QPS 和重複讀比例。如果是大量重複讀且資料可短暫過期，Cache 才合理；否則可能只是 query 或 index 沒做好。"

## Common Mistakes
- 沒有量測就先加工具。
- 忘記每個新元件都增加維運成本。
- 把面試答案當成真實生產系統的唯一答案。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Kicker is PRACTICE. Title is "實務不是炫技". Show a generic production dashboard and a simple v1 to bottleneck to upgrade flow. Use approved palette only.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not copy or imitate real cloud vendor dashboards.
- Do not add fake logos or real company UI.

## Speaker Notes
這張把面試和工作接起來。實務中真正成熟的做法不是一開始堆滿工具，而是先上簡單方案、量測瓶頸、再用最小必要升級解痛點。這也能讓面試回答更可信。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Dashboard is generic and does not imitate real vendor UI.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

