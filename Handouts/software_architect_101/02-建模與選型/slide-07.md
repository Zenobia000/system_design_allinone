---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "7"
title: "白皮書 v2：技術棧"
original_title: "白皮書 v2：技術棧"
beat: "產出物"
kicker: "ARTIFACT"
layout_type: "artifact"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: "v2"
rendering_mode: "image_prompt"
---

# Slide 07 · 白皮書 v2：技術棧

## On-slide Text
- Kicker: `ARTIFACT`
- Progress Pill: `架構白皮書 v2 · 建模與選型`
- Title: 白皮書 v2：技術棧
- Tech Stack Table (main visual, upper half):

  | 層級 | 技術選擇 | 說明 |
  |------|----------|------|
  | API 後端 | FastAPI (Python) | 熟悉語言、async 支援 |
  | 時序儲存 | PostgreSQL + TimescaleDB | SQL 介面 + 時序壓縮 |
  | 快取層 | Redis | P99 < 10s SLA 輔助 |
  | 訊息佇列 | Kafka | 尖峰 6,000 msg/s 緩衝 |

- ADR-001 Document (lower half):
  - **ADR-001 · 選用 TimescaleDB 作時序儲存**
  - Context: 每天 35 GB 讀數，主要查詢為時間範圍聚合，需 90 天 retention policy
  - Decision: 以 TimescaleDB extension 擴充既有 PostgreSQL，不引入全新系統
  - Consequences: ⊕ 保留 SQL 查詢能力；⊕ 原生壓縮降低儲存費；⊕ 自動 retention；⊖ extension 版本需與 PostgreSQL 對齊

- Version label: `白皮書 v2`

## Beginner Anchor
ADR（架構決策記錄）是給三個月後的你和新隊友看的：「當時為什麼選這個」。TimescaleDB 就是 PostgreSQL 的一個外掛，不是另一套系統——選它的理由在這裡寫清楚。

## Learning Goal
讓學員看到完整的 v2 技術棧決策，理解 ADR 的三段式格式（Context/Decision/Consequences），並認識 TimescaleDB 是 PostgreSQL extension 這個關鍵技術事實。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Navy `#152238` (ARTIFACT). Kicker pill: Deep Navy background with Mint `#97E8D6` 2 px outline, Warm White text.
- Background: Deep Navy `#152238`.
- Kicker label: `ARTIFACT`, top-left. Pill style: Deep Navy background, Mint `#97E8D6` 2 px border, Warm White text, Inter 700 / 24 px, all-caps.
- Progress Capsule: `架構白皮書 v2 · 建模與選型`, below kicker, Mint text on Deep Navy, rounded capsule, Inter 700 + JetBrains Mono for `v2`, 34 px.
- Title: Noto Sans TC 900 / 80 px / Warm White, left-aligned.
- Tech Stack Table (upper ~45% of content area):
  - Header row: Deep Teal `#2E7D86` background, Warm White text, Noto Sans TC 700 / 28 px; columns: 層級 / 技術選擇 / 說明.
  - Data rows: alternating `#1E3450` / `#172A40` backgrounds, Warm White text, Noto Sans TC 500 / 26 px; tool names (FastAPI, PostgreSQL, TimescaleDB, Redis, Kafka) in JetBrains Mono / Mint `#97E8D6`.
  - Table border: Mint `#97E8D6` 1 px.
  - Width: ~100% content area width.
- ADR-001 Document block (lower ~45% of content area):
  - Block title: `ADR-001 · 選用 TimescaleDB 作時序儲存`, Noto Sans TC 700 / 28 px / Mint `#97E8D6`, with a thin Mint top-border.
  - Three labeled rows (each on its own line):
    - `Context:` label in JetBrains Mono / Coral Red `#E8634F`, followed by description text in Noto Sans TC 500 / 26 px / Warm White.
    - `Decision:` label in JetBrains Mono / Forest Green `#5B9770`, followed by decision text.
    - `Consequences:` label in JetBrains Mono / Mint `#97E8D6`, followed by ⊕/⊖ bullet list in Warm White.
  - Block background: `#172A40` (slightly lighter than canvas), rounded corners 12 px, Mint `#97E8D6` 1 px border.
- Logo strip (right side of ADR block, aligned to right margin):
  - 4 logos: PostgreSQL, TimescaleDB, FastAPI, Redis — official SVG assets, 48 px height each, horizontal strip, gap 24 px.
  - Placed on Warm White `#F4F1EA` small pill background (32 px padding) since logos are color originals on dark background.
- Version label bottom-right of table: `白皮書 v2`, JetBrains Mono / 26 px / Mint `#97E8D6`.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "技術棧表 + ADR 為結構化文件，非節點/邊圖（依 DIAGRAM_SPEC，ADR 選型頁可用文字比較表，不強制程式化圖）。"
```

## Logo Assets

此頁面直接命名 PostgreSQL、TimescaleDB、FastAPI、Redis 四個技術產品，必須使用官方 logo asset。

| 名稱 | Expected Asset Path | 可從 101 重用 | 備註 |
|------|---------------------|--------------|------|
| PostgreSQL | `../../system_design_101/assets/logos/databases/postgresql.svg` 或 `assets/logos/databases/postgresql.svg` | 是（101 已有） | 官方象頭 logo，SVG 優先 |
| TimescaleDB | `assets/logos/databases/timescaledb.svg` | 否，需補抓 | Official source: timescale.com/press; 教學識別用途 |
| FastAPI | `assets/logos/api/fastapi.svg` | 否，需補抓 | Official source: fastapi.tiangolo.com; green logo |
| Redis | `../../system_design_101/assets/logos/cache/redis.svg` 或 `assets/logos/cache/redis.svg` | 是（101 已有） | 官方立方體 logo |

**Logo Strip 規格**：
- 位置：ADR-001 區塊右側，或區塊底部水平排列
- 高度：48 px（等比例縮放）
- 間距：水平 24 px
- 背景：淺底 pill（Warm White `#F4F1EA`，padding 16 px，rounded 8 px），確保深底頁上 logo 可見
- 最多 4 個（本頁剛好 4 個）
- 標注：`⚠ TimescaleDB、FastAPI logo 素材尚未取得，QA 階段需補抓後才可最終輸出`

## Technical Flow Details

### 技術棧各層說明

**API 後端：FastAPI (Python)**
- 選用原因：團隊 6 人熟悉 Python，FastAPI 的 async I/O 支援高並發讀取請求，Pydantic 型別驗證減少 bug。
- 職責：接收 Dashboard 查詢、鑑權、組合 Redis + TimescaleDB 查詢結果。
- 不負責：Kafka 消費（由 Consumer Group 獨立服務負責）。

**時序儲存：PostgreSQL + TimescaleDB**
- TimescaleDB 是 PostgreSQL 的 extension（`CREATE EXTENSION timescaledb`），不是獨立資料庫。
- 核心功能用於此系統：
  1. **Hypertable**：`CREATE TABLE readings (...) + SELECT create_hypertable('readings', 'timestamp')`，自動依時間分 chunk，加速時間範圍查詢。
  2. **Columnar 壓縮**：時序資料壓縮率約 90%，將每日 35 GB 壓縮至 ~3.5 GB，3 個月 retention 期間儲存總量 ~315 GB（壓縮後），符合 $5,000/月雲費預算。
  3. **Retention Policy**：`SELECT add_retention_policy('readings', INTERVAL '90 days')` — 自動刪除舊 chunk，無需手動 batch DELETE。
- Write path：Kafka Consumer → `INSERT INTO readings (timestamp, sensor_id, value)` → TimescaleDB hypertable chunk。
- Read path：FastAPI → Redis cache（hit/miss）→ TimescaleDB `time_bucket()` 聚合查詢 → 回傳。

**快取層：Redis**
- 用途：快取時間範圍聚合查詢結果（如「過去 1 小時 sensor_42 平均溫度」）。
- TTL：60 秒，讀數每 5 秒更新，1 分鐘 TTL 在 P99 < 10s SLA 下是合理妥協。
- Cache miss 路徑：Redis MISS → 查 TimescaleDB → 結果寫回 Redis → 回傳。
- Cache invalidation：目前策略為 TTL 過期，不做主動 invalidation（mv1 階段）。

**訊息佇列：Kafka**
- 用途：Device Gateway → Kafka topic `sensor-readings` → Consumer Group 消費。
- 目的：平滑 6,000 msg/s 尖峰，Consumer 不需要即時追上 Device 上報速率。
- Consumer offset 提交策略：至少一次（at-least-once），Consumer 需做 idempotent 寫入（根據 `(sensor_id, timestamp)` 去重）。

### ADR-001 決策依據摘要
- **不選純 NoSQL（如 InfluxDB）**：全新系統，熟悉 Python 的 6 人團隊需學習新查詢語言（Flux/InfluxQL），3 個月 MVP 時程風險高。
- **不選通用 PostgreSQL（無 TimescaleDB）**：35 GB/天 × 90 天 = 3,150 GB 未壓縮；無原生 retention policy；時間範圍查詢無 hypertable 加速，P99 告警 SLA 有壓力。
- **選 TimescaleDB**：PostgreSQL extension，SQL 介面不變，學習成本接近零；壓縮率 ~90%；retention policy 開箱即用；符合 $5,000/月雲費硬約束。

## VCRE Scorecard
not_applicable — this is an artifact slide, not a trade-off decision slide. Trade-off scoring is done on slide-08.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "ARTIFACT" kicker pill — Deep Navy background with Mint #97E8D6 2 px outline, Warm White text, Inter 700 / 24 px, all-caps. Below: progress capsule "架構白皮書 v2 · 建模與選型" in Mint text on Deep Navy, rounded capsule 34 px. Title "白皮書 v2：技術棧" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content divided into two vertical blocks: Upper block: a tech-stack table (4 data rows + header). Header row: Deep Teal #2E7D86 background, Warm White Noto Sans TC 700 28 px, columns "層級 / 技術選擇 / 說明". Data rows alternating #1E3450 / #172A40, Warm White Noto Sans TC 500 26 px; tool names "FastAPI", "PostgreSQL + TimescaleDB", "Redis", "Kafka" in JetBrains Mono Mint #97E8D6. The 4 data rows read exactly — row 1: "API 後端" | "FastAPI (Python)" | "熟悉語言、async 支援"; row 2: "時序儲存" | "PostgreSQL + TimescaleDB" | "SQL 介面 + 時序壓縮"; row 3: "快取層" | "Redis" | "P99 < 10s SLA 輔助"; row 4: "訊息佇列" | "Kafka" | "尖峰 6,000 msg/s 緩衝". Table border Mint 1 px. Lower block: ADR-001 document card with #172A40 background, Mint 1 px border, rounded 12 px. Title "ADR-001 · 選用 TimescaleDB 作時序儲存" in Noto Sans TC 700 28 px Mint. Three label rows reading exactly: "Context:" in JetBrains Mono Coral Red followed by "每天 35 GB 讀數，主要查詢為時間範圍聚合，需 90 天 retention policy"; "Decision:" in JetBrains Mono Forest Green #5B9770 followed by "以 TimescaleDB extension 擴充既有 PostgreSQL，不引入全新系統"; "Consequences:" in JetBrains Mono Mint followed by "⊕ 保留 SQL 查詢能力；⊕ 原生壓縮降低儲存費；⊕ 自動 retention；⊖ extension 版本需與 PostgreSQL 對齊", all body text Noto Sans TC 500 26 px Warm White. Right side of ADR block: horizontal logo strip of 4 official logos (PostgreSQL, TimescaleDB, FastAPI, Redis) on Warm White pill background, 48 px height, 24 px gap. Bottom-right of table: "白皮書 v2" JetBrains Mono 26 px Mint. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Structured document composition.

## Negative Prompt
- Do not invent extra table rows or change the 4 technology choices listed.
- Do not generate fake, approximate, or AI-invented brand logos — logos must be composited from official assets separately.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the ADR-001 block or the "白皮書 v2" version label.
- Do not place logo assets inside table cells — logos go in the strip only.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
v2 白皮書的第二個產出：技術棧選型表和 ADR-001。技術棧四層：FastAPI 後端（團隊熟悉 Python）、PostgreSQL + TimescaleDB 時序儲存（核心決策）、Redis 快取（P99 SLA 輔助）、Kafka 訊息佇列（平滑尖峰 6,000 msg/s）。ADR-001 是整門課第一個正式架構決策記錄。最關鍵的技術事實：TimescaleDB 不是另一個資料庫——它是 PostgreSQL 的 extension，`CREATE EXTENSION timescaledb` 就啟用了。這意味著：選它的學習成本幾乎是零（SQL 語法完全一樣），但多了三個時序原生功能：hypertable（時間分 chunk，查詢加速）、columnar 壓縮（35 GB/天壓縮到 ~3.5 GB）、retention policy（90 天自動刪舊資料）。這三個功能直接解決了白皮書 v1 NFR 矩陣裡的「每日資料量 ≤ 35 GB」和「雲費 < $5,000/月」兩個約束。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "白皮書 v2：技術棧" — 7 Chinese characters (CJK only; v2 and ： are ASCII/punctuation), within 14-char limit.
- [ ] Kicker reads `ARTIFACT` with Deep Navy background + Mint #97E8D6 2 px outline.
- [ ] `whitepaper_version: "v2"` in frontmatter (artifact slide).
- [ ] `rendering_mode: "image_prompt"` in frontmatter.
- [ ] Progress capsule `架構白皮書 v2 · 建模與選型` present below kicker.
- [ ] `Diagram Spec` is `not_applicable: true` with reason (技術棧表 + ADR 為結構化文件，非節點/邊圖).
- [ ] Tech stack table has exactly 4 data rows: FastAPI, PostgreSQL+TimescaleDB, Redis, Kafka.
- [ ] Technical values match shared numbers: 6,000 msg/s (Kafka row), P99 < 10s (Redis row), 35 GB (ADR context).
- [ ] ADR-001 has Context / Decision / Consequences (pros + cons) structure.
- [ ] TimescaleDB described correctly as "PostgreSQL extension", not a standalone DB.
- [ ] Technical Flow Details section is present and covers: hypertable, compression ~90%, retention policy, write path, read path, cache miss flow.
- [ ] Logo Assets section lists all 4 tools: PostgreSQL, TimescaleDB, FastAPI, Redis.
- [ ] Logo Assets notes TimescaleDB + FastAPI as "需補抓" with expected asset paths.
- [ ] QA blocker present for unacquired logos.
- [ ] Logo strip shows max 4 logos.
- [ ] Tool names use JetBrains Mono / Mint in table.
- [ ] Version label `白皮書 v2` appears in table bottom-right.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right canvas corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] ⚠ BLOCKER: TimescaleDB logo asset (`assets/logos/databases/timescaledb.svg`) must be acquired before final output.
- [ ] ⚠ BLOCKER: FastAPI logo asset (`assets/logos/api/fastapi.svg`) must be acquired before final output.
