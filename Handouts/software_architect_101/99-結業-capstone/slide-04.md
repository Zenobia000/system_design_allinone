---
chapter: "幕 99：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "4"
title: "換你默畫一次"
original_title: "換你默畫一次"
beat: "關鍵提問"
kicker: "KEY QUESTIONS"
layout_type: "key_questions"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 04 · 換你默畫一次

## On-slide Text
- Kicker: `KEY QUESTIONS`
- Title: 換你默畫一次
- Body:
  - 不看講義，默畫 v1→v5 + 每步關鍵決策
  - 畫出：哪個版本加了什麼、為什麼加
  - 完成後對照評分標準，看你遺漏了哪一步
- Self-check Rubric (below body — structured checklist):

  **v1 · 需求與約束**
  - □ 列出 NFR 矩陣（P99 < 10s / 6,000 msg/s / 99.9%）
  - □ 說出三個約束（$5,000/月 / 3 個月 / 6 人）

  **v2 · 建模與選型**
  - □ 畫出五個領域實體（Device / Sensor / Reading / Threshold / Alert）
  - □ 說出選 TimescaleDB 的原因（壓縮 / retention / SQL 不變）
  - □ 知道 Kafka 是為了什麼（尖峰 6,000 msg/s 削峰）

  **v3 · 系統設計**
  - □ 畫出三條路徑（寫入 / 讀取 / 告警）
  - □ 說出 Ingest API 為何回 202（非同步解耦）
  - □ 說出 cache-aside 的 hit/miss 流程

  **v4 · 風險與韌性**
  - □ 說出三個 SPOF（TSDB / Kafka / Processor）
  - □ 說出 TSDB 的緩解手法（Replica + 讀寫分離）

  **v5 · 落地與演進**
  - □ 說出可觀察性三本柱（Metrics / Traces / Logs）
  - □ 說出拆微服務的觸發條件（> 20 人 / 獨立擴展需求）

## Beginner Anchor
練習：不看講義默畫 v1→v5 + 每步關鍵決策——最好的記憶方式是默畫，這是你檢驗自己學到了什麼的時刻。

## Learning Goal
讓學員用默畫練習鞏固整門課的核心知識點，並透過評分標準（rubric）自我檢驗學習成果，識別哪些版本的決策記得清楚、哪些還需要複習。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint `#97E8D6` (KEY QUESTIONS).
- Background: Deep Navy `#152238`.
- Kicker label: `KEY QUESTIONS`, top-left. Pill style: Mint `#97E8D6` background, Deep Navy `#152238` text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned.
- Self-check Rubric (below body, ~90% canvas width):
  - 5 compact section blocks arranged in a 5-column horizontal strip (one per version v1–v5) or 2-row grid.
  - Each block background: `#172A40`, rounded 12 px, Mint `#97E8D6` 1 px border.
  - Block header: version label (e.g., `v1`) in JetBrains Mono / Inter 700 / 26 px / Mint `#97E8D6`, plus chapter name in Noto Sans TC 500 / 22 px / Warm White.
  - Checklist items: `□` checkbox symbol in Mint, followed by Noto Sans TC 500 / 22 px / Warm White. Key technical values in JetBrains Mono / Mint.
  - 2–3 checkbox items per version block.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "KEY QUESTIONS practice slide — self-check rubric layout, no architecture diagram. This is an interactive exercise slide, not a technical diagram page."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a key questions / practice slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a key questions / practice slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course Capstone chapter. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "KEY QUESTIONS" pill badge — Mint #97E8D6 background, Deep Navy #152238 text, Inter 700 / 24 px, all-caps. Title "換你默畫一次" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below title: 3 body lines Noto Sans TC 500 / 34 px / Warm White, line-height 1.60. Below body: a self-check rubric area (~90% canvas width). 5 compact section blocks in a horizontal strip or 2-row grid (one per version v1–v5). Each block: #172A40 background, Mint #97E8D6 1 px border, rounded 12 px. Block header: version tag (v1/v2/v3/v4/v5) in JetBrains Mono Inter 700 26 px Mint, plus chapter short name in Noto Sans TC 500 22 px Warm White. Inside each block: 2-3 checkbox items with □ in Mint, followed by short test text in Noto Sans TC 500 22 px Warm White; technical values (P99 < 10s, 6,000 msg/s, 99.9%, TimescaleDB, SPOF, 20 人) in JetBrains Mono Mint. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Clean quiz/practice layout composition.

## Negative Prompt
- Do not invent extra checklist items beyond the rubric defined above.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use filled checkboxes — all checkboxes must be empty □ (the student fills them in).
- Do not add answers or explanations inside the checklist blocks — rubric items are questions/prompts only.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
最好的記憶方式是默畫。闔上講義，拿出一張空白紙或打開一個空白投影片，把 v1 到 v5 的演化畫出來，每個版本加了什麼、對應什麼決策。評分標準有 14 個打勾項，分佈在五個版本。v1 的兩個——NFR 矩陣和三個約束——如果說不清楚，代表 v1 需要複習。v3 的三條路徑（寫入 / 讀取 / 告警）是整門課最核心的架構概念，如果只記得其中兩條，回去看 slide 5 和 slide 6。v4 的三個 SPOF 和緩解手法——如果只記得 TSDB 忘了 Processor，那是正常的，再看一遍 FMEA 表格。這不是考試——是你自己知道哪裡還需要深化的工具。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "換你默畫一次" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `KEY QUESTIONS` with Mint `#97E8D6` beat color background.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1 ≤ 18 chars: "不看講義，默畫 v1→v5 + 每步關鍵決策" — verify ✓
- [ ] Body line 2 ≤ 18 chars: "畫出：哪個版本加了什麼、為什麼加" = 16 chars ✓
- [ ] Body line 3 ≤ 18 chars: "完成後對照評分標準，看你遺漏了哪一步" = 18 chars ✓
- [ ] Self-check rubric present with exactly 5 version blocks (v1–v5).
- [ ] v1 block: NFR 矩陣 (P99 < 10s / 6,000 msg/s / 99.9%) + 約束清單 ($5,000/月 / 3 個月 / 6 人) — matches actual ch01 slide-05.
- [ ] v2 block: 五個領域實體 + TimescaleDB 原因 + Kafka 目的 — matches actual ch02 slides.
- [ ] v3 block: 三條路徑 + Ingest API 202 + cache-aside hit/miss — matches actual ch03 slides.
- [ ] v4 block: 三個 SPOF (TSDB / Kafka / Processor) + TSDB 緩解 — matches actual ch04 slide-05.
- [ ] v5 block: 可觀察性三本柱 + 微服務觸發條件 — matches actual ch05 slides.
- [ ] All checkbox items are □ (empty, not filled).
- [ ] Technical values in rubric match shared IoT numbers.
- [ ] `whitepaper_version` is empty (practice slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
