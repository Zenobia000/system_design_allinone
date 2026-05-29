---
chapter: "幕 99：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "3"
title: "一頁式架構白皮書"
original_title: "一頁式架構白皮書"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v1→v5"
rendering_mode: "image_prompt"
---

# Slide 03 · 一頁式架構白皮書

## On-slide Text
- Kicker: `ARTIFACT`
- Progress capsule: `架構白皮書 v1→v5 · 結業 Capstone`
- Title: 一頁式架構白皮書
- Main visual: One-page architecture whitepaper summary card with the following sections:

  **系統名稱**
  IoT 設備監控系統（即時告警）

  **關鍵 NFR**
  - 告警 P99 < 10s · 峰值 6,000 msg/s · 可用性 99.9%
  - 每日資料量 ≤ 35 GB · 雲費 < $5,000/月

  **技術棧**
  FastAPI · PostgreSQL+TimescaleDB · Redis · Kafka

  **核心架構**
  modular monolith · Ingest/Processor/Query 三包
  非同步削峰（Kafka）· 快取輔助（Redis，TTL 60s）

  **主要風險與緩解**
  TSDB SPOF → Replica + 讀寫分離
  Kafka 單點 → 3-broker cluster
  Processor 單點 → Consumer Group ≥2 + Idempotency

  **演進觸發條件**
  團隊 > 20 人 / 獨立擴展需求 → 沿 package 邊界拆微服務
  讀取負載 > 寫入 5× → CQRS（屆時再評）

- Version label (bottom-right of card): `v1→v5`

## Beginner Anchor
最終成品：IoT 監控系統架構決策摘要——任何人拿到這一頁，不需要讀五幕的投影片就能理解這個系統的架構決策邏輯。

## Learning Goal
讓學員看到「一頁式架構白皮書」的實際樣貌：系統名稱、關鍵 NFR、技術棧、核心架構決策、主要風險緩解、演進觸發條件六個區塊，這是架構師的可交付物（deliverable）。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v1→v5 · 結業 Capstone`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for version tag, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- Main visual: One-page whitepaper summary card (~90% canvas width, ~65% canvas height, centered below title).
  - Card background: `#1E3450`, rounded corners 16 px, Mint `#97E8D6` 2 px border.
  - Version badge top-right: `v1→v5` in JetBrains Mono / 22 px / Mint `#97E8D6`.
  - Inside: 6 compact sections arranged in a 2×3 or 3×2 grid, each section:
    - Section label: JetBrains Mono / 22 px / Mint `#97E8D6` (e.g., "系統名稱", "關鍵 NFR", "技術棧", "核心架構", "風險緩解", "演進觸發")
    - Section content: Noto Sans TC 500 / 24 px / Warm White `#F4F1EA`; technical values and tool names in JetBrains Mono / Mint `#97E8D6`
    - Thin Mint `#97E8D6` divider line between sections (0.5 px)
  - Section layout:
    - Top row: 系統名稱（full width or left）| 關鍵 NFR（right）
    - Middle row: 技術棧（left） | 核心架構（right）
    - Bottom row: 主要風險與緩解（left） | 演進觸發條件（right）
  - Card occupies most of the content area, leaving title and capsule above.
- Version label bottom-right of card: `v1→v5`, JetBrains Mono / 22 px / Mint `#97E8D6`.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "One-page whitepaper summary card — structured document layout with 6 sections. Not a node-edge architecture diagram; rendered as image_prompt with dense summary card visual."
```

## Logo Assets
此頁面提及 FastAPI、PostgreSQL、TimescaleDB、Redis、Kafka 作為技術棧內容，但以文字摘要形式呈現，不需要 logo strip（logo strip 已在各章 artifact 頁呈現）。如需增加視覺識別感，可在技術棧區加入小型文字 pill（非 logo）。

| 名稱 | 說明 |
|------|------|
| 技術棧文字 | 以 JetBrains Mono Mint 文字呈現，不需 logo 素材 |

## Technical Flow Details

### 一頁式白皮書各區塊說明

**區塊 1：系統名稱**
- IoT 設備監控系統（即時告警）
- 這是系統的唯一識別名稱，對應課程主角

**區塊 2：關鍵 NFR（來自 v1 NFR 矩陣）**
- 告警 P99 < 10s：從 Kafka 消費到 Webhook 送出的時間差 P99，量測方式：Consumer 到 Webhook 時間差 P99
- 峰值 6,000 msg/s：10,000 台設備 × 1 msg/5s × 3× spike factor，量測：負載測試 5 分鐘峰值
- 可用性 99.9%：每月最多 43.8 分鐘非計畫停機，量測：外部 uptime 監控
- 每日資料量 ≤ 35 GB：10,000 台 × 多個 sensor × 每 5 秒 × ~200 B ≈ 34.56 GB/天
- 雲費 < $5,000/月：月帳單 Cost Explorer 追蹤，硬約束

**區塊 3：技術棧（來自 v2 ADR-001）**
- FastAPI（Python）：API 後端，async I/O，團隊熟悉 Python
- PostgreSQL + TimescaleDB：時序儲存，hypertable 加速時間範圍查詢，壓縮率 ~90%，retention policy 自動化
- Redis：快取聚合查詢結果，TTL 60s，支援 P99 < 10s SLA
- Kafka：訊息佇列，平滑 6,000 msg/s 尖峰，削峰緩衝

**區塊 4：核心架構（來自 v3 C4 容器圖）**
- modular monolith：ingest/processor/query 三個 Python package，同一 codebase
- 非同步削峰：Ingest API → Kafka（async enqueue）→ Stream Processor（consume + batch write）
- 快取輔助：Query API → Redis cache-aside（TTL 60s）→ TSDB fallback
- Stateless API：Ingest API 和 Query API 均 stateless，可水平擴展

**區塊 5：主要風險與緩解（來自 v4 FMEA）**
- TSDB 單實例（最嚴重 SPOF）→ PostgreSQL streaming replication（Primary + Standby）+ 讀寫分離
- Kafka 單 broker → 3-broker cluster，replication.factor=3，min.insync.replicas=2
- Stream Processor 單實例 → Consumer Group ≥2 + Retry（指數退避）+ Idempotency（sensor_id+timestamp 去重）

**區塊 6：演進觸發條件（來自 v5 演進路線圖）**
- 拆微服務觸發：團隊 > 20 人且部署衝突頻繁，或單模組需獨立擴展（Ingest 流量 10×），或不同模組有不同 SLA 合約
- Event Sourcing 觸發：多個下游消費者需要同一 reading 事件做不同處理，或需要完整事件歷史回溯（法規要求）
- CQRS 觸發：讀取負載 > 寫入 5×，且讀取資料模型與寫入模型差異很大
- 現在：維持 modular monolith，Redis cache-aside 已足夠處理讀取需求

## VCRE Scorecard
not_applicable — this is an artifact slide (one-page whitepaper summary), not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course Capstone chapter. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v1→v5 · 結業 Capstone" in Mint text on Deep Navy, rounded capsule 34 px. Title "一頁式架構白皮書" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content: large summary card (~90% canvas width, ~65% canvas height). Card background #1E3450, rounded 16 px, Mint #97E8D6 2 px border. Inside card: 6 sections in a 3-row × 2-column grid layout, each cell separated by thin Mint 0.5 px divider lines. Section labels in JetBrains Mono 22 px Mint: "系統名稱", "關鍵 NFR", "技術棧", "核心架構", "主要風險與緩解", "演進觸發條件". Section content in Noto Sans TC 500 24 px Warm White; tool names and technical values in JetBrains Mono Mint (FastAPI, TimescaleDB, Redis, Kafka, P99 < 10s, 6,000 msg/s, 99.9%, 35 GB, $5,000/月). Top-right of card: "v1→v5" version badge JetBrains Mono 22 px Mint. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Dense but readable document-card composition.

## Negative Prompt
- Do not invent extra sections or change the 6 section labels defined above.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the "v1→v5" version badge on the card.
- Do not use a white/light background for the card — card fill must be dark (#1E3450).
- Do not place brand logos inside the card — technical names appear as text in JetBrains Mono only.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
這是整門課最重要的一張投影片。這是你帶走的成品。一頁式架構白皮書把五幕的決策壓縮到一張卡片裡：系統叫什麼、NFR 是什麼（量化的）、技術棧選了什麼（為什麼選）、核心架構長什麼樣（關鍵設計決策）、最大風險在哪裡（有緩解手法）、什麼時候才演進（有觸發條件）。任何人拿到這一頁，不需要讀五幕的投影片，就能理解這個系統。這就是架構師的可交付物（deliverable）——不是一堆 PowerPoint，是讓人能做決策的精煉文件。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "一頁式架構白皮書" — 9 Chinese characters, within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v1→v5"` in frontmatter (Capstone summary artifact).
- [ ] `rendering_mode: "image_prompt"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v1→v5 · 結業 Capstone` present below kicker.
- [ ] Main summary card present with 6 sections: 系統名稱 / 關鍵 NFR / 技術棧 / 核心架構 / 主要風險與緩解 / 演進觸發條件.
- [ ] NFR values match shared IoT numbers: P99 < 10s, 6,000 msg/s, 99.9%, ≤ 35 GB/天, < $5,000/月.
- [ ] Tech stack matches v2 ADR: FastAPI, PostgreSQL+TimescaleDB, Redis, Kafka.
- [ ] Core architecture reflects v3 decisions: modular monolith, Kafka async, Redis cache-aside.
- [ ] Risk mitigations match v4 FMEA: TSDB Replica, Kafka 3-broker, Consumer Group ≥2 + Idempotency.
- [ ] Evolution triggers match v5 roadmap: > 20 人 / 獨立擴展 / 不同 SLA.
- [ ] Technical Flow Details covers all 6 sections with accurate source references to chapters.
- [ ] Version badge "v1→v5" visible on summary card.
- [ ] `Diagram Spec` is `not_applicable: true` with reason.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
