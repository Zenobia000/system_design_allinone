---
chapter: "幕 1：需求與約束"
chapter_id: "01"
chapter_slug: "01-需求與約束"
slide: "5"
title: "白皮書 v1：需求書"
original_title: "白皮書 v1：需求書"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v1"
rendering_mode: "image_prompt"
---

# Slide 05 · 白皮書 v1：需求書

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v1 · 需求與約束`
- Title: 白皮書 v1：需求書
- Artifact label row: `PRD 功能清單 ✓ · NFR 矩陣 ✓ · 約束清單 ✓`
- NFR Matrix Table (main visual content):

  | 指標 | 目標值 | 量測方式 |
  |------|--------|----------|
  | 告警延遲 | P99 < 10 秒 | Consumer 到 Webhook 時間差 P99 |
  | 峰值吞吐 | 6,000 msg/s | 負載測試 5 分鐘峰值 |
  | 可用性 | 99.9% | 月度 Uptime 監控 |
  | 每日資料量 | ≤ 35 GB/天 | DB chunk 每日大小 |
  | 初期雲費 | < $5,000/月 | 月帳單 Cost Explorer |
  | 停機損失 | ~$20,000/hr | 業務合約基準 |

- Constraints List (below table):
  - `Budget` $5,000/月  ·  `Deadline` 3 個月 MVP  ·  `Skills` 6 人 Python+Cloud

## Beginner Anchor
這張表格就是白皮書 v1 的核心——把所有「要快要穩」翻譯成一格一格的量化承諾，讓工程師知道要測什麼、老闆知道要驗什麼。

## Learning Goal
讓學員看到需求書的真實樣貌：PRD 列功能、NFR 矩陣把每個非功能需求量化成可測試的指標和量測方式、約束清單三條永遠釘在封面。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill uses Deep Navy background with Mint `#97E8D6` 2 px border, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Deep Navy `#152238` pill with Mint `#97E8D6` 2 px outline border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v1 · 需求與約束`, below kicker, Mint `#97E8D6` text on Deep Navy `#152238` background, rounded capsule, Inter 700 + JetBrains Mono for `v1`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Artifact label row: `PRD 功能清單 ✓ · NFR 矩陣 ✓ · 約束清單 ✓`, Noto Sans TC 700 / 26 px / Mint `#97E8D6`, left-aligned.
- NFR Matrix Table (main visual, center-right, ~70% width, 6 data rows + header):
  - Header row: background Deep Teal `#2E7D86`, text Warm White Noto Sans TC 700 / 28 px; columns: 指標 / 目標值 / 量測方式.
  - Data rows: alternating `#1E3450` / `#172A40` backgrounds, text Warm White Noto Sans TC 500 / 26 px; technical values (numbers, units, percentages) in JetBrains Mono.
  - Table border: Mint `#97E8D6` 1 px.
  - Version label bottom-right of table: `白皮書 v1`, JetBrains Mono / Caption size / Mint `#97E8D6`.
- Constraints List (below table, 3 inline pills): `Budget $5,000/月` · `Deadline 3 個月 MVP` · `Skills 6 人 Python+Cloud`, each in Mint `#97E8D6` text, Deep Teal `#2E7D86` pill background, JetBrains Mono / 26 px.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "v1 artifact is a structured document/table (PRD + NFR matrix + constraint list), not a node-graph architecture diagram. Per DIAGRAM_SPEC v1 guidance, requirements-phase artifacts use image_prompt with table layout described in Visual Spec and On-slide Text."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
This slide presents the NFR matrix as a structured requirements document, not a system diagram. Key details embedded in the table:

- **告警延遲 P99 < 10s**: measured as the time delta from Kafka Consumer receiving a message to the outbound Webhook/notification being dispatched; P99 bucket.
- **峰值吞吐 6,000 msg/s**: derived from 10,000 devices × 1 msg / 5s = 2,000 msg/s average; 3× spike factor = 6,000 msg/s peak. Validated via load test (Locust / JMeter) 5-minute sustained peak.
- **可用性 99.9%**: ≤ 43.8 min/month unplanned downtime. Measured by external uptime monitor (monthly SLI report).
- **每日資料量 ≤ 35 GB**: 10,000 devices × 17,280 msgs/day × ~200 B/msg ≈ 34.56 GB/day ≈ 35 GB/day.
- **雲費 < $5,000/月**: tracked via cloud cost explorer monthly billing report; hard budget constraint.
- **停機損失 ~$20,000/hr**: business contract baseline; informs SLA priority decisions.

## VCRE Scorecard
not_applicable — this is an artifact/document slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "ARTIFACT" pill badge, Deep Navy background with Mint #97E8D6 2 px outline border, Warm White text, 24 px Inter 700. Below kicker: progress capsule "架構白皮書 v1 · 需求與約束" in Mint #97E8D6 text on Deep Navy background, rounded capsule, 34 px. Title "白皮書 v1：需求書" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below title: artifact label row "PRD 功能清單 ✓ · NFR 矩陣 ✓ · 約束清單 ✓" in Mint #97E8D6 / 26 px. Center-right: an NFR matrix table (~70% width, 6 data rows + header): header row background Deep Teal #2E7D86, columns 指標/目標值/量測方式; data rows alternating dark navy (#1E3450 / #172A40), text Warm White; technical values in JetBrains Mono. Table border Mint #97E8D6 1 px. Bottom-right corner of table: small "白皮書 v1" label in JetBrains Mono Mint. Below table: 3 inline pills "Budget $5,000/月" / "Deadline 3 個月 MVP" / "Skills 6 人 Python+Cloud" in Deep Teal background, Mint text, JetBrains Mono 26 px. Bottom-right: logo placeholder 64 px (light version). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Structured document-style layout.

## Negative Prompt
- Do not invent extra rows, columns, or data beyond the 6 NFR rows listed.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the progress capsule "架構白皮書 v1 · 需求與約束".
- Do not omit the constraint pills (Budget / Deadline / Skills).
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
v1 白皮書是整幕的最終產出。PRD 列功能：設備上報、儀表板、告警通知。NFR 矩陣把每個非功能需求轉成可量測的格子：告警延遲 P99 < 10 秒，量測方式是「Kafka 消費者打戳到 Webhook 發出的時間差 P99」；吞吐量峰值 6,000 msg/s，量測方式是「Locust/JMeter 負載測試 5 分鐘峰值」；可用性 99.9%，量測方式是「月度 Uptime 監控」；每日資料量 ≤ 35 GB，量測方式是「TimescaleDB 每日 chunk 大小」；雲費 < $5,000/月，量測方式是「AWS Cost Explorer 月帳單」。這張表格是接下來所有架構決策的檢查清單——每次做完設計回來問：「這個設計能達到 NFR 矩陣裡的每一格嗎？」

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v1：需求書" — 9 Chinese characters + v1, within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline border.
- [ ] Progress capsule `架構白皮書 v1 · 需求與約束` present below kicker.
- [ ] `whitepaper_version: "v1"` in frontmatter (artifact slide).
- [ ] NFR matrix table has 6 data rows: 告警延遲 / 峰值吞吐 / 可用性 / 每日資料量 / 初期雲費 / 停機損失.
- [ ] Numbers match Ch0: P99 < 10s, 6,000 msg/s, 99.9%, ≤ 35 GB/天, < $5,000/月, ~$20,000/hr.
- [ ] Table header row uses Deep Teal `#2E7D86` background.
- [ ] Technical values in JetBrains Mono.
- [ ] Version label `白皮書 v1` in bottom-right corner of table.
- [ ] Constraint pills (Budget / Deadline / Skills) present below table.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `rendering_mode` is `image_prompt`.
- [ ] `Diagram Spec` is `not_applicable: true` with reason.
- [ ] Logo Assets states none.
