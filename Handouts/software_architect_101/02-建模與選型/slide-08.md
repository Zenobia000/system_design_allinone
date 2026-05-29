---
chapter: "幕 2：建模與選型"
chapter_id: "02"
chapter_slug: "02-建模與選型"
slide: "8"
title: "時序 DB 值得嗎"
original_title: "時序 DB 值得嗎"
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

# Slide 08 · 時序 DB 值得嗎

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 時序 DB 值得嗎
- Body:
  - TimescaleDB vs 純 PostgreSQL，怎麼選？
  - 壓縮省空間，retention 自動化，但有版本綁定
  - VCRE 打分：短期 C 稍高，長期 V 更高
- VCRE Scorecard (below body — 4-cell horizontal cards)
- Caption: `結論：TimescaleDB 是 PostgreSQL extension，不是新系統——值得。`

## Beginner Anchor
VCRE 框架提醒你：「選 TimescaleDB」不是炒技術，而是讓 35 GB/天 的資料符合 $5,000/月 雲費預算的務實決策。

## Learning Goal
讓學員用 VCRE 框架打分「TimescaleDB vs 通用 PostgreSQL」，感受架構選型的取捨維度，鞏固 ADR-001 的決策邏輯。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` + Coral Red `#E8634F` dual-color (TRADE-OFF).
- Background: Deep Navy `#152238`.
- Kicker label: `TRADE-OFF`, top-left. Dual-color pill: left half Deep Teal `#2E7D86`, right half Coral Red `#E8634F`, diagonal split at center, Warm White text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned.
- VCRE Scorecard (below body, ~90% width, 4 equal cards, rounded 16 px, gap 16 px):
  - Card V: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `V` Inter 800 48 px Mint. Mid: `商業價值` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `省雲費＋貼合 IoT 查詢模式` Noto Sans TC 500 26 px Warm White.
  - Card C: background Deep Teal `#2E7D86`. Top: `C` Inter 800 48 px Warm White. Mid: `成本 TCO` Noto Sans TC 700 28 px Warm White. Score: `3/5` JetBrains Mono 34 px Coral Red `#E8634F`. Reason: `extension 維護成本有限（有成本，但可控）` Noto Sans TC 500 26 px Warm White.
  - Card R: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `R` Inter 800 48 px Mint. Mid: `風險` Noto Sans TC 700 28 px Warm White. Score: `2/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `同 PostgreSQL 生態，風險低` Noto Sans TC 500 26 px Warm White.
  - Card E: background Deep Teal `#2E7D86`. Top: `E` Inter 800 48 px Warm White. Mid: `可演進` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `v4 可升 Citus 水平擴展` Noto Sans TC 500 26 px Warm White.
- Caption below VCRE cards: `結論：TimescaleDB 是 PostgreSQL extension，不是新系統——值得。` Noto Sans TC 400 / 26 px / Mint `#97E8D6`, left-aligned.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "TRADE-OFF slide — VCRE scorecard layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages are cited on this slide face. Named products were detailed in slide-07.

## Technical Flow Details
not_applicable — this is a trade-off decision slide, not a technical flow diagram.

## VCRE Scorecard

Scoring: TimescaleDB（作為 PostgreSQL extension）vs 通用 PostgreSQL（無 TimescaleDB）

| 維度 | 評分（1-5） | 本決策的具體理由 |
|------|------------|----------------|
| V 商業價值 | 4 | 原生 columnar 壓縮將 35 GB/天壓縮至 ~3.5 GB，3 個月儲存費大幅下降，符合 $5,000/月硬預算；時間範圍聚合查詢效率高，直接支援 P99 < 10s SLA。 |
| C 成本 TCO | 3 | TimescaleDB 本身是免費開源 extension，無授權費；維護成本主要是 extension 版本與 PostgreSQL 主版本對齊（升級測試），但屬於可控的有限成本。 |
| R 風險 | 2 | TimescaleDB 是 PostgreSQL extension，不引入新的基礎設施；同一個 PostgreSQL 生態，團隊熟悉度高；主要風險是 extension 升級的相容性，屬於低概率、可回溯的風險。 |
| E 可演進 | 4 | v2 以單一 PostgreSQL + TimescaleDB 節點起步；v4 可加 Read Replica 分離讀寫；v5 可升至 Citus（PostgreSQL 水平分片 extension）；不需要搬遷至全新系統。 |

**核心取捨**：TimescaleDB 的學習成本幾乎為零（SQL 語法不變），但換來的是時序壓縮（節省雲費）、retention policy（自動化）、查詢加速（P99 SLA），三個直接對應 NFR 矩陣的能力——這是務實的工程決策，不是炒技術。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "TRADE-OFF" dual-color pill badge — left half Deep Teal #2E7D86, right half Coral Red #E8634F, diagonal split, Warm White text, 24 px Inter 700. Title "時序 DB 值得嗎" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White, line-height 1.60. Below body: VCRE scorecard — 4 equal horizontal rounded cards (16 px, gap 16 px, ~90% width). Cards alternate: V (#152238 with Mint 2 px border), C (#2E7D86), R (#152238 Mint border), E (#2E7D86). Each card shows letter (V/C/R/E) at top in Inter 800 48 px (V/R in Mint, C/E in Warm White), Chinese dimension name in Noto Sans TC 700 28 px Warm White, a score number in JetBrains Mono 34 px (V=4 Forest Green, C=3 Coral Red, R=2 Forest Green, E=4 Forest Green), and one short reason line in Noto Sans TC 500 26 px Warm White. Card C reason: "extension 維護成本有限（有成本，但可控）". Below cards: caption "結論：TimescaleDB 是 PostgreSQL extension，不是新系統——值得。" in Mint #97E8D6 26 px, left-aligned. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Decision-framework composition.

## Negative Prompt
- Do not invent extra Chinese text, extra VCRE dimensions, or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render fewer or more than 4 VCRE cards.
- Do not make all 4 score numbers the same color — C score is Coral Red, V/R/E scores are Forest Green.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.

## Speaker Notes
TimescaleDB vs 純 PostgreSQL——用 VCRE 打分。V（商業價值）4/5：壓縮直接節省雲費（35 GB/天 → 3.5 GB），對 $5,000/月 預算有實質影響；retention policy 自動化節省維運時間；時間範圍查詢加速支撐 P99 < 10s SLA。C（成本 TCO）3/5：extension 本身免費，維護成本有限，主要是升級測試——評 3 是因為有成本，但不高。R（風險）2/5：最大優點是它就是 PostgreSQL 的一部分——沒有引入新的基礎設施，SQL 語法不變，rollback 只是 `DROP EXTENSION`。主要風險是 extension 版本對齊，屬於低風險。E（可演進）4/5：從單節點到 Read Replica 到 Citus 水平分片，都在 PostgreSQL 生態內演進，不需要搬遷。結論：選 TimescaleDB 不是因為它名字好聽，而是它的三個能力直接對應 NFR 矩陣的三格要求——這才是架構決策的正確推導方式。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "時序 DB 值得嗎" — 7 Chinese characters + "DB", within 14-char limit.
- [ ] Kicker reads `TRADE-OFF` and uses dual-color pill (Deep Teal + Coral Red).
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "TimescaleDB vs 純 PostgreSQL，怎麼選？" — ≤ 18 chars ✓.
- [ ] Body line 2: "壓縮省空間，retention 自動化，但有版本綁定" — ≤ 18 chars ✓.
- [ ] Body line 3: "VCRE 打分：短期 C 稍高，長期 V 更高" — ≤ 18 chars ✓.
- [ ] VCRE Scorecard section present with all 4 dimensions scored.
- [ ] VCRE scores: V=4, C=3, R=2, E=4.
- [ ] Numbers match shared data: 35 GB/天, P99 < 10s, $5,000/月.
- [ ] TimescaleDB correctly described as "PostgreSQL extension" in scorecard reasoning.
- [ ] Core trade-off statement present mentioning compression, retention policy, SLA.
- [ ] 4 VCRE visual cards on slide, in V/C/R/E order.
- [ ] Score colors: C=3 uses Coral Red; V=4, R=2, E=4 use Forest Green.
- [ ] Caption "結論：TimescaleDB 是 PostgreSQL extension，不是新系統——值得。" below cards.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (TRADE-OFF slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
