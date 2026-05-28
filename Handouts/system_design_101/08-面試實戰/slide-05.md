---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "5"
title: "不要先畫圖"
original_title: "不要一聽題目就先畫圖"
beat: "反模式"
kicker: "ANTI-PATTERN"
layout_type: "interview_antipattern"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · 不要先畫圖

## On-slide Text
- Kicker: `ANTI-PATTERN`
- Title: 不要先畫圖
- Body:
  - 一聽題目就畫微服務，通常是扣分。
  - 先畫最小可行 v1，再根據爆點加能力區塊。
  - 這就是本課 v1 → v7 的用法。

## Beginner Anchor
架構要從痛點長出來，不是先把所有流行技術塞上去。

## Learning Goal
提醒新手避免常見面試反模式，並把課程的逐章演化法轉成答題方法。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Coral Red #E8634F.
- Use a split visual: left "too much too soon" cluttered sketch crossed out; right "v1 then upgrade" clean path.
- Do not use nested cards.

### Source Visual Direction
> 底色 Deep Navy。左半是一張被 Coral Red 叉掉的混亂架構草圖，裡面只用抽象方塊，不放真實產品名。右半是一條簡潔 v1 → v2 → v3 的成長箭頭，使用 Mint。大標置頂，三行內文在下方。Caption：「先簡單，爆了再加能力。」右下 logo-light.png。

## Diagram Spec
```yaml
not_applicable: true
reason: "Anti-pattern comparison slide; not a formal architecture diagram."
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
```yaml
not_applicable: true
reason: "Behavioral interview guidance, not runtime data flow."
```

## Interview Skill
- Skill: "Start simple and evolve only after a bottleneck is named."
- Practice line: "我先畫最小可行版本，然後根據流量、資料量或失敗點逐步加能力。"

## Rubric
- Good: Can explain why each new component is needed.
- Weak: Adds microservices, queues, caches, and search before any bottleneck is identified.

## Mock Interviewer Prompt
"為什麼你的第一版不直接上 microservices？"

## Answer Template
"第一版先保持單體或少量服務，因為現在還沒有證據顯示需要拆服務。等到部署、團隊邊界或流量瓶頸出現，再拆會比較合理。"

## Common Mistakes
- 把複雜度當成專業。
- 每題都塞同一組技術。
- 沒說明新元件解決哪個痛點。

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Kicker is ANTI-PATTERN. Title is "不要先畫圖". Show a clean comparison between a crossed-out overcomplicated sketch and a simple v1 to v3 evolution path. Use approved palette only.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not name real frameworks or products on this slide.
- Do not make the cluttered sketch unreadably dense.

## Speaker Notes
這張補原講義最重要的面試提醒：不要跳過需求和估算直接畫圖。好的回答應該像 101 一樣，一開始只有 v1，接著說「哪裡會爆，所以我加這個能力」。

## QA Checklist
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] The crossed-out anti-pattern does not become the visual focus more than the correct path.
- [ ] No extra generated text appears on the final image.
- [ ] Interview Skill, Answer Template, and Common Mistakes are present.

