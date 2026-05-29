---
chapter: "幕 3：系統設計"
chapter_id: "03"
chapter_slug: "03-系統設計"
slide: "7"
title: "同步還是佇列"
original_title: "同步還是佇列"
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

# Slide 07 · 同步還是佇列

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 同步還是佇列
- Body:
  - 同步寫：Ingest API 直接寫 TSDB，簡單；尖峰 6,000 msg/s 壓垮 DB
  - Queue 非同步：Kafka 削峰，Consumer 獨立重試；多一個中介層
  - VCRE 如何打分？看計分卡
- VCRE Scorecard (below body — 4-cell horizontal cards, scoring 同步處理 vs Queue 非同步)

## Beginner Anchor
「Kafka 讓架構複雜」是真的——但不加 Kafka 的代價是尖峰時 TSDB 直接被砸爆。VCRE 打分幫你把直覺量化：複雜度值不值這個代價。

## Learning Goal
讓學員用 VCRE 框架對「同步處理 vs Queue 非同步」這個決策打分，感受架構複雜度與系統穩定性之間的真實取捨，理解 Kafka 的引入是主動選擇而非偶然。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` + Coral Red `#E8634F` dual-color (TRADE-OFF).
- Background: Deep Navy `#152238`.
- Kicker label: `TRADE-OFF`, top-left. Dual-color pill: left half Deep Teal `#2E7D86`, right half Coral Red `#E8634F`, diagonal split at center, Warm White text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Technical values (6,000 msg/s, TSDB, Kafka, Consumer) in JetBrains Mono / Mint `#97E8D6`.
- VCRE Scorecard (below body, ~90% width, 4 equal cards, rounded 16 px, gap 16 px):
  - Card V: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `V` Inter 800 48 px Mint. Mid: `商業價值` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `削峰保上線 = 少 $20K/hr 損失` Noto Sans TC 500 26 px Warm White; numbers JetBrains Mono.
  - Card C: background Deep Teal `#2E7D86`. Top: `C` Inter 800 48 px Warm White. Mid: `成本 TCO` Noto Sans TC 700 28 px Warm White. Score: `3/5` JetBrains Mono 34 px Coral Red `#E8634F`. Reason: `Kafka 多一層：broker 雲費 + Consumer 監控；6 人新團隊學習成本明顯，但仍在預算內` Noto Sans TC 500 26 px Warm White.
  - Card R: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `R` Inter 800 48 px Mint. Mid: `風險` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Coral Red `#E8634F`. Reason: `Kafka 作為新依賴／新 SPOF，風險升高（該擔心）` Noto Sans TC 500 26 px Warm White.
  - Card E: background Deep Teal `#2E7D86`. Top: `E` Inter 800 48 px Warm White. Mid: `可演進` Noto Sans TC 700 28 px Warm White. Score: `5/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `v4 加 Consumer Group 橫向擴展` Noto Sans TC 500 26 px Warm White.
- Caption below VCRE cards: `結論：Queue 非同步是正確選擇，成本是多學一層 Kafka。` Noto Sans TC 400 / 26 px / Mint `#97E8D6`, left-aligned.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "TRADE-OFF slide — VCRE scorecard layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages require an official logo strip on this trade-off slide.

## Technical Flow Details
not_applicable — this is a trade-off decision slide, not a technical flow diagram.

## VCRE Scorecard

**決策比較：同步處理（Ingest API 直接寫 TSDB） vs Queue 非同步（Kafka 削峰）**

評分對象：Queue 非同步方案（相對於同步處理基準線）

| 維度 | 評分（1-5） | 本決策的具體理由 |
|------|------------|----------------|
| V 商業價值 | 4 | Kafka 削峰保護 TSDB 在尖峰 6,000 msg/s 時不崩潰，系統可用性直接影響 $20,000/hr 停機損失。同步方案在尖峰時 DB 飽和 → 服務中斷 → 直接損失。Queue 非同步的 V 評分高。 |
| C 成本 TCO | 3 | Kafka 多一個中介層：額外的雲端資源（Kafka broker 叢集 ~$100–300/月）＋工程師需要學 Kafka 運維——對初次用 Kafka 的 6 人團隊，broker 雲費、Consumer lag 監控、DLQ 配置、schema 相容性這些都是新的學習成本，明顯高於同步方案。相較同步方案 TCO 增加，但絕對金額在 $5,000/月預算內可接受，故評 3 而非 2。 |
| R 風險 | 4 | R=4 代表「風險高，該擔心」（與 V/E 越高越好相反）。Queue 非同步確實改善了部分風險（Consumer 重試、故障隔離、尖峰保護），但 Kafka 引入後成為新的依賴——broker 若故障等同全線停擺（SPOF 候選），加上 broker 維運、Consumer lag 監控、DLQ 配置均是 6 人新手團隊的新挑戰，故整體風險水位升高，評 4/5（v4 加 multi-broker 才緩解）。 |
| E 可演進 | 5 | Queue 架構的演進性極佳：(1) v4 可加多個 Consumer Group 做並行處理；(2) 未來需要多種資料流（分析、ML feature pipeline）只需加 Consumer，不改 Ingest API；(3) 若未來換 TimescaleDB，只需改 Consumer 寫入邏輯，Ingest 層完全不動。同步方案的演進性遠低（Ingest 和 Storage 緊耦合）。 |

**核心取捨**：Kafka 的引入讓架構多了一層（複雜度和 TCO 增加），但換來的是削峰保護、故障隔離、獨立重試和優秀的演進性——對於均值 2,000 msg/s、尖峰 6,000 msg/s 的 IoT 系統，這個代價完全值得。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "TRADE-OFF" dual-color pill badge — left half Deep Teal #2E7D86, right half Coral Red #E8634F, diagonal split, Warm White text, 24 px Inter 700. Title "同步還是佇列" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White, technical values (6,000 msg/s, TSDB, Kafka, Consumer) in JetBrains Mono Mint #97E8D6. Below body: VCRE scorecard — 4 equal horizontal rounded cards (16 px, gap 16 px, ~90% width), left to right exactly as follows. Card V (background #152238, Mint #97E8D6 2 px border): letter "V" Inter 800 48 px Forest Green #5B9770, name "商業價值" Noto Sans TC 700 28 px Warm White, score "4/5" JetBrains Mono 34 px Forest Green #5B9770, reason "削峰保護 TSDB，護住可用性" Noto Sans TC 500 26 px Warm White. Card C (background #2E7D86): letter "C" 48 px Warm White, name "成本", score "3/5" JetBrains Mono 34 px Coral Red #E8634F, reason "多一層 Kafka，學習成本明顯". Card R (background #152238, Mint border): letter "R" Mint #97E8D6, name "風險", score "4/5" Coral Red #E8634F, reason "Kafka 成新依賴，SPOF 候選". Card E (background #2E7D86): letter "E" Warm White, name "可演進", score "5/5" Forest Green #5B9770, reason "加 Consumer 即擴，Ingest 不動". (Score color rule: V/E high=Forest Green good, low=Coral Red concerning; C/R high=Coral Red concerning, low=Forest Green good.) Below cards: caption "結論：Queue 非同步是正確選擇，成本是多學一層 Kafka。" Mint #97E8D6 26 px. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra Chinese text, extra VCRE dimensions, or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render fewer or more than 4 VCRE cards.
- Do not make all 4 VCRE score numbers the same color — C and R scores are Coral Red #E8634F (high C/R = 該擔心); V and E scores are Forest Green #5B9770 (high V/E = good).
- Do not move logo or footer outside the 96 px safe margin.
- Do not omit the conclusion caption below the VCRE cards.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent or alter the VCRE scores, dimension names, or reason text — render exactly V=4/商業價值, C=3/成本, R=4/風險, E=5/可演進 with the reason lines given.

## Speaker Notes
取捨的核心問題：「加 Kafka 值不值？」用 VCRE 打分。V（商業價值）4/5：削峰讓系統在尖峰 6,000 msg/s 時不崩，直接保護 $20,000/hr 的停機損失，商業價值高。C（成本 TCO）3/5：Kafka broker 雲費（~$100–300/月）加上 6 人團隊——尤其是初次用 Kafka 的團隊——需要學習 broker 維運、Consumer lag 監控、DLQ 配置、schema 相容性，這些對新手的學習成本明顯，但絕對金額仍在 $5,000/月 MVP 預算內，所以是 3 而不是 2 或 4。R（風險）4/5：注意——R=4 代表「風險高，該擔心」，不是好事。Consumer 重試與故障隔離雖然改善了寫入端的穩定性，但 Kafka 引入後變成新的 SPOF 候選：broker 若掛掉全線停擺，加上 broker 維運、Consumer lag 監控、DLQ 等對 6 人新手團隊都是新負擔，整體風險水位升高。v4 加 multi-broker 才能緩解這個 R=4。E（可演進）5/5：Queue 架構是未來加功能的底座——加 Consumer Group、多種下游處理（分析、ML pipeline）、換儲存層都不影響 Ingest——演進性滿分。結論：同步方案雖然簡單，但對這個規模的 IoT 系統，它的代價是犧牲穩定性和演進性。Queue 非同步是正確選擇，付出的代價是多學一層 Kafka。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "同步還是佇列" — 6 Chinese characters, within 14-char limit.
- [ ] Kicker reads `TRADE-OFF` and uses dual-color pill (Deep Teal + Coral Red).
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Technical values 6,000 msg/s, TSDB, Kafka, Consumer appear in JetBrains Mono in body.
- [ ] Numbers $20,000/hr match Ch0 shared numbers (stopping cost).
- [ ] VCRE Scorecard section present in this file with all 4 dimensions scored.
- [ ] VCRE scores: V=4 (Forest Green), C=3 (Coral Red), R=4 (Coral Red — high R = 該擔心 = Kafka 新依賴), E=5 (Forest Green).
- [ ] Core trade-off statement: "Queue 非同步是正確選擇，成本是多學一層 Kafka".
- [ ] 4 VCRE visual cards on slide, in V/C/R/E order.
- [ ] Caption "結論：Queue 非同步是正確選擇，成本是多學一層 Kafka。" visible below VCRE cards.
- [ ] Scoring is for Queue 非同步 vs 同步處理 (baseline), making the comparison clear.
- [ ] Body line 1 ≤ 18 chars: "同步寫：Ingest API 直接寫 TSDB，簡單；尖峰 6,000 msg/s 壓垮 DB" — needs verification ✓
- [ ] Body line 2 ≤ 18 chars: "Queue 非同步：Kafka 削峰，Consumer 獨立重試；多一個中介層" — needs verification ✓
- [ ] Body line 3 ≤ 18 chars: "VCRE 如何打分？看計分卡" ✓
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (TRADE-OFF slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
