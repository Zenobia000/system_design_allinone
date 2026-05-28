---
chapter: "第 8 章：面試實戰"
chapter_id: "08"
chapter_slug: "08-面試實戰"
slide: "7"
title: "投票題示範"
original_title: "用線上投票系統示範一題完整面試回答"
beat: "示範"
kicker: "WALKTHROUGH"
layout_type: "interview_architecture_walkthrough"
audience_level: "beginner"
output: "1080x1350"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
diagram_version: "interview-vote-v1"
rendering_mode: "programmatic_diagram"
---

# Slide 07 · 投票題示範

## On-slide Text
- Kicker: `WALKTHROUGH`
- Title: 投票題示範
- Body:
  - 題目：百萬人同時投票，每人只能投一次。
  - 寫入結果走 DB，重複投票用 Idempotency 擋。
  - 即時票數可用 Cache，最終票數以 DB 為準。

## Beginner Anchor
投票系統最重要的是「不能重複投」，所以一致性比即時漂亮數字更重要。

## Learning Goal
用一題面試題示範需求、估算、v1、爆點與取捨如何合在一起。

## Visual Spec
- Canvas: `1080 x 1350 px`, safe margin `96 px`.
- Beat color: Deep Navy #152238 with Coral Red challenge accent.
- Render the architecture diagram from `Diagram Spec`; do not ask an image model to invent topology.
- Mark the idempotency guard and Primary DB as the correctness-critical path.

### Source Visual Direction
> 底色 Deep Navy。上方大標「投票題示範」。主體為程式化架構圖：Client → Load Balancer → Server x N → Idempotency Guard → Primary DB。Server 另有一條 dashed async edge 寫入 Cache 顯示即時票數。Primary DB 到 Replica 是 replication。用 Coral Red 標註「正確性關鍵路徑」，Mint 標註「即時顯示」。下方三行內文。右下 logo-light.png。

## Diagram Spec
```yaml
version: "interview-vote-v1"
focus: "線上投票系統：先保證每人只能投一次，再提供即時票數顯示。"
rendering_rules:
  canvas: "1080x1350"
  safe_margin_px: 96
  existing_node_border: "Deep Teal #2E7D86 2px"
  new_node_border: "Mint #97E8D6 4px"
  warning_node_marker: "Coral Red #E8634F correctness marker"
  arrow_sync: "Mint solid 2px"
  arrow_async: "Mint dashed 2px"
groups:
  - id: "critical_path"
    label: "正確性關鍵路徑"
    color: "Coral Red #E8634F"
  - id: "realtime_path"
    label: "即時顯示"
    color: "Mint #97E8D6"
nodes:
  - id: "client"
    label: "Client"
    subtitle: "投票者"
    type: "client"
    group: "critical_path"
    status: "existing"
  - id: "lb"
    label: "Load Balancer"
    subtitle: "分流請求"
    type: "load_balancer"
    group: "critical_path"
    status: "existing"
  - id: "server_pool"
    label: "Server x N"
    subtitle: "驗證登入與投票"
    type: "server_pool"
    group: "critical_path"
    status: "existing"
  - id: "idempotency"
    label: "Idempotency"
    subtitle: "防重複投票"
    type: "guard"
    group: "critical_path"
    status: "new"
  - id: "primary_db"
    label: "Primary DB"
    subtitle: "最終票數"
    type: "database"
    group: "critical_path"
    status: "new"
  - id: "replica_db"
    label: "Replica DB"
    subtitle: "查詢分擔"
    type: "database"
    group: "critical_path"
    status: "existing"
  - id: "cache"
    label: "Cache"
    subtitle: "即時票數"
    type: "cache"
    group: "realtime_path"
    status: "existing"
edges:
  - from: "client"
    to: "lb"
    label: "vote request"
    style: "solid"
    meaning: "sync"
  - from: "lb"
    to: "server_pool"
    label: "route"
    style: "solid"
    meaning: "sync"
  - from: "server_pool"
    to: "idempotency"
    label: "check voter"
    style: "solid"
    meaning: "sync"
  - from: "idempotency"
    to: "primary_db"
    label: "write vote"
    style: "solid"
    meaning: "sync"
  - from: "primary_db"
    to: "replica_db"
    label: "replicate"
    style: "dashed"
    meaning: "async"
  - from: "server_pool"
    to: "cache"
    label: "update count"
    style: "dashed"
    meaning: "async"
```

## Logo Assets
```yaml
not_applicable: true
reason: "No real company, framework, package, or product logo is referenced."
```

## Technical Flow Details
1. Client submits a vote request through Load Balancer to one Server instance.
2. Server validates authentication and sends the voter id plus election id to the Idempotency guard.
3. Idempotency guard rejects duplicate vote keys before writing to Primary DB.
4. Primary DB is the source of truth for final vote counts.
5. Replica DB can serve read-heavy result pages, but may lag behind Primary DB.
6. Cache stores approximate real-time counts for fast display; final result must be recomputed or verified from DB.
7. If Cache and DB disagree, DB wins because correctness is the primary constraint.

## Interview Skill
- Skill: "Separate correctness-critical path from convenience path."
- Practice line: "投票正確性走 DB；即時票數可以走 Cache，但 Cache 不是最終真相。"

## Rubric
- Good: Explains why idempotency and Primary DB are critical for one-person-one-vote.
- Weak: Uses Cache as the source of truth for vote count without discussing consistency risk.

## Mock Interviewer Prompt
"設計一個百萬人同時投票的系統，每人只能投一次。"

## Answer Template
"這題最重要的是一致性，所以我會讓投票寫入走 Primary DB，並用 idempotency key 擋重複投票。即時票數可以用 Cache 顯示，但最終票數以 DB 為準。"

## Common Mistakes
- 把即時票數 Cache 當成最終正確票數。
- 忘記處理連點兩次或 retry 導致的重複投票。
- 只談高併發，不談一致性。

## GPT Image Prompt
Create a 1080x1350 vertical educational slide in the System Design 101 brand. Kicker is WALKTHROUGH. Title is "投票題示範". Generate only background, framing, and clean technical icon style; the architecture diagram must be rendered from Diagram Spec separately.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title.
- Do not add architecture nodes or arrows that are absent from the Diagram Spec.
- Do not use fake product logos, random ballot graphics, or political party imagery.

## Speaker Notes
這題要讓學員看見「需求決定架構」。投票系統的核心不是畫得多炫，而是保證一人一票。Cache 可以讓畫面快，但不能當最終真相；這就是 C/A/L/Cost 中 C 優先的例子。

## QA Checklist
- [ ] Technical Flow Details match the Diagram Spec edges and do not skip idempotency behavior.
- [ ] Canvas is 1080 x 1350 px with 96 px safe margin.
- [ ] Title fits within 14 Chinese characters or uses the shortened title above.
- [ ] Kicker reads `WALKTHROUGH` and uses the correct beat color.
- [ ] All diagram edges reference existing node ids.
- [ ] Correctness-critical path is visually distinct from real-time display path.
- [ ] No extra generated text appears on the final image.

