---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "8"
title: "面試官追問"
original_title: "面試官追問不是刁難，是要你講邊界"
beat: "追問"
kicker: "FOLLOW-UP"
layout_type: "interview_followup"
audience_level: "beginner"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 08 · 面試官追問

## On-slide Text
- Kicker: `FOLLOW-UP`
- Title: 面試官追問
- Body:
  - DB 掛了怎麼辦？
  - 有人連點兩次怎麼辦？
  - 為什麼不用 Kafka / Redis / Elasticsearch？

## Beginner Anchor
追問是在測你知不知道方案邊界，不是在逼你背更多名詞。

## Learning Goal
讓新手知道面試追問常見方向，並學會用取捨回答。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Use three follow-up cards with small icons: failure, duplicate, tool choice.
- Framework/tool names may appear as text only; do not use logos here because the point is decision logic, not brand recall.

### Source Visual Direction
> 底色 Deep Navy。三張橫向問題卡垂直堆疊，左側分別是故障閃電、重複點擊、工具箱線條 icon。第三張卡列出 Kafka / Redis / Elasticsearch 文字，使用 JetBrains Mono。每張卡右側留一行「回答方向」淡色提示：備援、冪等、取捨。右下 logo-light.png。

## Diagram Spec
```yaml
not_applicable: true
reason: "Follow-up prompt slide; no formal architecture topology."
```

## Logo Assets
```yaml
not_applicable: true
reason: "Tool names are mentioned as interview prompts, but logos are intentionally omitted to keep the focus on decision logic."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Follow-up question slide, not a runtime technical flow."
```

## Interview Skill
- Skill: "Answer follow-ups by naming the risk and the trade-off."
- Practice line: "如果 DB 掛了，我會先說可用性風險，再討論 replica、failover 和可能的資料延遲。"

## Rubric
- Good: Explains when a tool is needed and when it is unnecessary.
- Weak: Says "use Kafka" or "use Redis" without naming the problem it solves.

## Mock Interviewer Prompt
"你為什麼不用 Kafka？這個系統不是很多請求嗎？"

## Answer Template
"如果需求是立即確認投票是否成功，我不會把正確性路徑完全丟進 Kafka；Kafka 可以用在非同步統計或削峰，但一人一票的寫入確認仍要有強一致保護。"

## Common Mistakes
- 被追問嚇到，直接改掉原設計。
- 為了顯得進階，硬加不必要的工具。
- 沒分清楚同步路徑和非同步路徑。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide in the System Design 101 brand. Kicker is FOLLOW-UP. Title is "面試官追問". Show three stacked follow-up question cards about failure, duplicate action, and tool choice. Use approved palette only; no logos.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not create fake logos for Kafka, Redis, or Elasticsearch.
- Do not make the slide look like a chat app screenshot.

## Speaker Notes
追問是面試最像實務的地方。真實工作裡也會有人問：「如果掛了怎麼辦？」「為什麼不用某工具？」回答時不要急著迎合，要先講風險，再講選擇，再講代價。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Tool names are text only; no fake logos are generated.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

