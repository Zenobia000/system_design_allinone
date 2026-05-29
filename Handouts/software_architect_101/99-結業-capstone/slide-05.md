---
chapter: "幕 99：結業 Capstone"
chapter_id: "99"
chapter_slug: "99-結業-capstone"
slide: "5"
title: "VCRE 決策總複盤"
original_title: "VCRE 決策總複盤"
beat: "取捨"
kicker: "TRADE-OFF"
layout_type: "tradeoff"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 05 · VCRE 決策總複盤

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: VCRE 決策總複盤
- Body:
  - 五幕、五個決策、每個都有 VCRE 打分
  - 分數不是對錯——是取捨的量化記錄
  - 把它們全部攤開，看見演進邏輯
- VCRE Summary Table (below body — 5-row table, one row per act):

  | 幕 | 決策題目 | V | C | R | E | 結論 |
  |----|---------|---|---|---|---|------|
  | 幕 1 | 99.9% vs 99.99% | 2 | 4 | 4 | 5 | v1 定 99.9%，v4 再演進 |
  | 幕 2 | TimescaleDB vs 純 PostgreSQL | 4 | 3 | 2 | 4 | 選 TimescaleDB（extension，非新系統） |
  | 幕 3 | 同步寫 vs Queue 非同步 | 4 | 3 | 4 | 5 | Queue 非同步，Kafka 削峰 |
  | 幕 4 | 多 AZ 現在做 vs 等 v5 | 3 | 5 | 3 | 5 | v4 先 SPOF 緩解，v5 再多 AZ |
  | 幕 5 | 微服務先行 vs Monolith 先行 | 4 | 2 | 2 | 4 | Modular monolith 先行 |

- Caption below table: V/E 高=好；C/R 高=該擔心（幕 3 R=4＝Kafka 新依賴；幕 4 C=5＝超預算）；幕 5 C/R 低=成本低/風險低，是優點

## Beginner Anchor
五幕所有 VCRE 打分一次攤開看取捨——每個決策不是孤立的，它們共同構成一條「現在可控、未來可演進」的務實路徑。

## Learning Goal
讓學員一次看見五個幕的 VCRE 決策分數和結論，理解整門課的第二條螺旋（VCRE 取捨）是如何串聯所有架構決策的，感受到課程的完整性。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` + Coral Red `#E8634F` dual-color (TRADE-OFF).
- Background: Deep Navy `#152238`.
- Kicker label: `TRADE-OFF`, top-left. Dual-color pill: left half Deep Teal `#2E7D86`, right half Coral Red `#E8634F`, diagonal split at center, Warm White text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned.
- VCRE Summary Table (below body, ~95% canvas width):
  - Header row: background Deep Teal `#2E7D86`, text Warm White Noto Sans TC 700 / 26 px; columns: 幕 / 決策題目 / V / C / R / E / 結論.
  - 5 data rows (one per act), alternating `#1E3450` / `#172A40` backgrounds.
  - 幕 column: Noto Sans TC 700 / 24 px / Mint `#97E8D6`.
  - 決策題目 column: Noto Sans TC 500 / 24 px / Warm White.
  - V, C, R, E score columns: JetBrains Mono / 26 px, score-colored:
    - V scores: Forest Green `#5B9770` if ≥ 4, Coral Red `#E8634F` if ≤ 2, Warm White if 3.
    - E scores: Forest Green `#5B9770` if ≥ 4, Warm White if 3.
    - C scores: Coral Red `#E8634F` if ≥ 4, Warm White if 3.
    - R scores: Coral Red `#E8634F` if ≥ 4, Warm White if 3; Forest Green `#5B9770` if ≤ 2.
    - Special note: 幕 5 C=2 and R=2 use Forest Green (low cost and low risk = good for this option).
  - 結論 column: Noto Sans TC 500 / 22 px / Mint `#97E8D6`.
  - Table border: Mint `#97E8D6` 1 px.
- Caption below table: `V/E 高=好；C/R 高=該擔心（幕 3 R=4＝Kafka 新依賴；幕 4 C=5＝超預算）；幕 5 C/R 低=成本低/風險低，是優點`
  - Noto Sans TC 400 / 24 px / Warm White, left-aligned.
  - Numbers/abbreviations in JetBrains Mono.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "TRADE-OFF slide — VCRE consolidated summary table, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a consolidated trade-off summary slide, not a technical flow diagram.

## VCRE Scorecard

> 本頁為五幕 VCRE 決策的彙整總表，每一行均引用對應章節的實際打分。

### 五幕 VCRE 決策總覽

| 幕 | 決策題目 | V 商業價值 | C 成本 TCO | R 風險 | E 可演進 | 最終結論 | 來源 |
|----|---------|-----------|-----------|-------|---------|---------|------|
| 幕 1：需求與約束 | 99.9% vs 99.99% 可用性 | 2 | 4 | 4 | 5 | v1 先定 99.9%，v4 演進至 99.99% | ch01/slide-07 |
| 幕 2：建模與選型 | TimescaleDB vs 通用 PostgreSQL | 4 | 3 | 2 | 4 | 選 TimescaleDB（extension，非新系統，值得） | ch02/slide-08 |
| 幕 3：系統設計 | 同步寫 vs Queue 非同步（Kafka） | 4 | 3 | 4 | 5 | Queue 非同步是正確選擇，成本是多學一層 Kafka | ch03/slide-07 |
| 幕 4：風險與韌性 | 多 AZ 備援現在做 vs 等 v5 | 3 | 5 | 3 | 5 | v4 先做 SPOF 緩解，v5 再演進多 AZ | ch04/slide-07 |
| 幕 5：落地與演進 | 微服務先行 vs Modular Monolith 先行 | 4 | 2 | 2 | 4 | Modular monolith 先行；有觸發條件再拆 | ch05/slide-08 |

### 各幕 VCRE 分數詳細說明

**幕 1：99.9% vs 99.99%（來自 ch01/slide-07）**
- V=2：99.9%→99.99% 每月少損失約 ~$13,000，但 MVP 規模未到，實際收益有限。
- C=4：熱備援 + 多 AZ + 自動切換，雲費月增 $2,000–4,000，TCO 壓力高。
- R=4：高可用架構複雜度翻倍；6 人 Python 新手雲端團隊 3 個月內駕馭失敗風險高。
- E=5：先做好 99.9% 打穩基礎，等 v3/v4 業務規模增長後再演進至 99.99%，最安全的分階段路徑。
- 結論：99.99% 的工程代價在 MVP 階段超出團隊能力邊界，先做 99.9% 可控，v4 再演進是務實選擇。

**幕 2：TimescaleDB vs 通用 PostgreSQL（來自 ch02/slide-08）**
- V=4：原生 columnar 壓縮將 35 GB/天壓縮至 ~3.5 GB，3 個月儲存費大幅下降，符合 $5,000/月硬預算；直接支援 P99 < 10s SLA。
- C=3：TimescaleDB 本身是免費開源 extension，無授權費；維護成本主要是 extension 版本與 PostgreSQL 主版本對齊（升級測試），屬可控的有限成本。
- R=2：TimescaleDB 是 PostgreSQL extension，不引入新的基礎設施；同一個 PostgreSQL 生態，團隊熟悉度高；主要風險是 extension 升級的相容性，屬於低概率、可回溯的風險。
- E=4：v2 以單一 PostgreSQL + TimescaleDB 節點起步；v4 可加 Read Replica 分離讀寫；v5 可升至 Citus（PostgreSQL 水平分片 extension）；不需要搬遷至全新系統。
- 結論：TimescaleDB 的學習成本幾乎為零（SQL 語法不變），但換來壓縮、retention、查詢加速三個直接對應 NFR 矩陣的能力——務實的工程決策，不是炒技術。

**幕 3：同步寫 vs Queue 非同步（來自 ch03/slide-07）**
- V=4：Kafka 削峰保護 TSDB 在尖峰 6,000 msg/s 時不崩潰，直接影響 $20,000/hr 停機損失。
- C=3：Kafka 多一個中介層：額外雲費（broker ~$100–300/月）+ 初次用 Kafka 的 6 人團隊學習成本明顯，但絕對金額在 $5,000/月 MVP 預算內可接受。
- R=4：Consumer 失敗可重試，寫入不丟失；Ingest API 和 TSDB 故障隔離；尖峰不直接砸 TSDB，系統穩定性大幅提升。但 Kafka 本身成為新的依賴（SPOF 候選，v4 處理）。
- E=5：Queue 架構的演進性極佳：v4 可加多個 Consumer Group 做並行處理；未來需要多種資料流只需加 Consumer，不改 Ingest API；若未來換 TimescaleDB，只需改 Consumer 寫入邏輯。
- 結論：Kafka 的引入讓架構多了一層（複雜度和 TCO 增加），但換來的是削峰保護、故障隔離、獨立重試和優秀的演進性——代價完全值得。

**幕 4：多 AZ 備援現在做 vs 等 v5（來自 ch04/slide-07）**
- V=3：多 AZ 確實提升可用性，但 MVP 階段用戶規模有限，每月少損失的停機費是假設性收益。
- C=5：多 AZ 部署需要所有有狀態服務（TSDB、Kafka、Redis）跨 AZ 複製，額外雲費保守估計 $3,000–$6,000/月，超出 $5k/月預算（總費預估 $8,000–$11,000/月），TCO 壓力極高。
- R=3：多 AZ 架構複雜度大幅提升——跨 AZ 延遲影響 TSDB replication、Kafka ISR、Redis Sentinel 選舉。6 人熟 Python 剛碰雲端的團隊在 3 個月 MVP 內部署並正確維運多 AZ，失敗風險中等偏高。
- E=5：先集中在 v4 做好 SPOF 緩解（TSDB Replica + Kafka multi-broker + Consumer Group ≥2），v5 系統穩定後再加多 AZ，路徑清晰，不鎖死未來選項。
- 結論：多 AZ 是正確方向但時機不對——成本超預算、複雜度超出 MVP 團隊能力邊界；先做 SPOF 緩解打穩基礎，v5 演進多 AZ 是務實路徑。

**幕 5：微服務先行 vs Modular Monolith 先行（來自 ch05/slide-08）**
> 注意：評分對象是「modular monolith 先行」方案。C=2 和 R=2 代表成本低、風險低，是優點（Forest Green）。
- V=4：6 人 3 個月 MVP，monolith 讓商業節點可達；微服務先行很可能 3 個月沒有可用系統，那是商業失敗。
- C=2：不需要 Kubernetes、Service Mesh、API Gateway Day 1，雲費在 < $5,000/月約束內可控。
- R=2：無分散式事務問題；無跨服務 API 版本衝突；無 on-call 複雜度增加。微服務先行的風險（網路分區、服務間超時、分散式 saga）在 6 人新手雲端團隊難以掌控。
- E=4：v5 monorepo 的 ingest/processor/query package 邊界是刻意設計的演進預留，有觸發條件時可沿邊界拆出，是重構不是重寫。
- 結論：微服務的真實代價（K8s、Service Mesh、分散式事務、多 on-call rotation）在 6 人 MVP 下遠超收益；modular monolith 有清楚的 package 邊界，後續可沿邊界演進，才是真正「為未來準備」的務實選擇。

**核心取捨（全課）**：五幕五個決策，用 VCRE 量化的共同邏輯是「現在可控（成本/風險在 MVP 邊界內）、未來可演進（E 分均高）」。沒有一個決策是「永久封閉」的——每個結論都有明確的演進時機和觸發條件。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course Capstone chapter. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "TRADE-OFF" dual-color pill badge — left half Deep Teal #2E7D86, right half Coral Red #E8634F, diagonal split, Warm White text, 24 px Inter 700. Title "VCRE 決策總複盤" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White. Below body: VCRE summary table (~95% canvas width). Header row: Deep Teal #2E7D86 background, Warm White Noto Sans TC 700 26 px, columns in this exact order: 幕 / 決策題目 / V / C / R / E / 結論. Render EXACTLY these 5 data rows, in this order, with the exact cell text and the exact V/C/R/E scores below — do NOT invent, alter, or reorder any cell, score, or row. 5 data rows alternating #1E3450 / #172A40 backgrounds. 幕 column: Mint #97E8D6 Noto Sans TC 700 24 px. 決策題目: Warm White Noto Sans TC 500 24 px. V/C/R/E score columns: JetBrains Mono 26 px. 結論 column: Mint #97E8D6 Noto Sans TC 500 22 px. Table border: Mint #97E8D6 1 px.
The 5 data rows are (format = 幕 | 決策題目 | V | C | R | E | 結論):
Row 1 — 幕 column text "幕 1", 決策題目 "99.9% vs 99.99% 可用性", V=2, C=4, R=4, E=5, 結論 "v1 定 99.9%，v4 演進至 99.99%".
Row 2 — 幕 column text "幕 2", 決策題目 "TimescaleDB vs 通用 PostgreSQL", V=4, C=3, R=2, E=4, 結論 "選 TimescaleDB（extension，非新系統）".
Row 3 — 幕 column text "幕 3", 決策題目 "同步寫 vs Queue 非同步（Kafka）", V=4, C=3, R=4, E=5, 結論 "Queue 非同步，成本是多學一層 Kafka".
Row 4 — 幕 column text "幕 4", 決策題目 "多 AZ 現在做 vs 等 v5", V=3, C=5, R=3, E=5, 結論 "v4 先做 SPOF 緩解，v5 再多 AZ".
Row 5 — 幕 column text "幕 5", 決策題目 "微服務先行 vs Modular Monolith", V=4, C=2, R=2, E=4, 結論 "Modular monolith 先行，有觸發條件再拆".
Color each V/C/R/E score cell strictly by polarity rule: for V and E, a high score (≥4) is Forest Green #5B9770, a low score (≤2) is Coral Red #E8634F, a 3 is Warm White; for C and R, a high score (≥4) is Coral Red #E8634F, a low score (≤2) is Forest Green #5B9770, a 3 is Warm White. Applying this exactly: Row 1 (幕 1) V=2 Coral Red, C=4 Coral Red, R=4 Coral Red, E=5 Forest Green. Row 2 (幕 2) V=4 Forest Green, C=3 Warm White, R=2 Forest Green, E=4 Forest Green. Row 3 (幕 3) V=4 Forest Green, C=3 Warm White, R=4 Coral Red, E=5 Forest Green. Row 4 (幕 4) V=3 Warm White, C=5 Coral Red, R=3 Warm White, E=5 Forest Green. Row 5 (幕 5) V=4 Forest Green, C=2 Forest Green, R=2 Forest Green, E=4 Forest Green. Below table: short caption in Noto Sans TC 400 24 px Warm White: "V/E 高=好；C/R 高=該擔心（幕 3 R=4＝Kafka 新依賴；幕 4 C=5＝超預算）；幕 5 C/R 低=成本低/風險低，是優點". Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra rows, columns, or VCRE scores beyond the 5 rows defined above.
- Do not change any VCRE score values — they must exactly match the per-chapter source slides.
- Do not color all score numbers the same — C/R high scores are Coral Red; V/E high scores are Forest Green; v5 C=2/R=2 are Forest Green (low=good).
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not omit the polarity caption below the table.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent or alter any table cell — render exactly the 5 rows and their V/C/R/E scores and 結論 as specified; do not add or drop rows.

## Speaker Notes
VCRE 是整門課的第二條螺旋。從幕 1 開始，每一幕都有一個 VCRE 打分決策。現在把五個決策的分數全部攤開——你會發現一個模式：E（可演進）分數幾乎都是 4 或 5，因為每個決策都預留了演進路徑；C（成本）和 R（風險）在 MVP 階段被刻意控制住，不是因為我們不知道更好的選項，而是因為現在的約束（6 人、3 個月、$5,000/月）決定了邊界。有一點要特別說明：幕 5 的 C=2 和 R=2 是 Forest Green——代表成本低和風險低，對 modular monolith 先行這個決策來說是優點，和其他幕的 C/R 高=警惕的方向不同。這就是 VCRE 分數為什麼要看理由，不只是看數字。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "VCRE 決策總複盤" — 9 Chinese characters, within 14-char limit.
- [ ] Kicker reads `TRADE-OFF` and uses dual-color pill (Deep Teal + Coral Red).
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1 ≤ 18 chars: "五幕、五個決策、每個都有 VCRE 打分" — verify ✓
- [ ] Body line 2 ≤ 18 chars: "分數不是對錯——是取捨的量化記錄" = 16 chars ✓
- [ ] Body line 3 ≤ 18 chars: "把它們全部攤開，看見演進邏輯" = 14 chars ✓
- [ ] VCRE summary table present with exactly 5 data rows (one per act).
- [ ] VCRE scores for幕 1 (ch01/slide-07): V=2, C=4, R=4, E=5 ✓
- [ ] VCRE scores for幕 2 (ch02/slide-08): V=4, C=3, R=2, E=4 ✓
- [ ] VCRE scores for幕 3 (ch03/slide-07): V=4, C=3, R=4, E=5 ✓
- [ ] VCRE scores for幕 4 (ch04/slide-07): V=3, C=5, R=3, E=5 ✓
- [ ] VCRE scores for幕 5 (ch05/slide-08): V=4, C=2, R=2, E=4 ✓
- [ ] 幕 1 決策題目: "99.9% vs 99.99%" — matches ch01/slide-07.
- [ ] 幕 2 決策題目: "TimescaleDB vs 純 PostgreSQL" — matches ch02/slide-08.
- [ ] 幕 3 決策題目: "同步寫 vs Queue 非同步" — matches ch03/slide-07.
- [ ] 幕 4 決策題目: "多 AZ 備援現在做 vs 等 v5" — matches ch04/slide-07.
- [ ] 幕 5 決策題目: "微服務先行 vs Modular Monolith 先行" — matches ch05/slide-08.
- [ ] Score color polarity correct: V/E high → Forest Green; C/R high → Coral Red; 幕5 C=2/R=2 → Forest Green (exception noted in Visual Spec and VCRE Scorecard).
- [ ] Polarity caption present below table: "V/E 高=好；C/R 高=該擔心（幕 3 R=4＝Kafka 新依賴；幕 4 C=5＝超預算）；幕 5 C/R 低=成本低/風險低，是優點".
- [ ] VCRE Scorecard section present with all 5 acts scored + per-dimension reasoning.
- [ ] All VCRE scores and conclusions match actual per-chapter source slides.
- [ ] `whitepaper_version` is empty (TRADE-OFF slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
