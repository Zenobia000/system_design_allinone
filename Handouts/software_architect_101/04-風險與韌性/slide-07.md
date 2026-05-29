---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "7"
title: "多 AZ 備援值得嗎"
original_title: "多 AZ 備援值得嗎"
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

# Slide 07 · 多 AZ 備援值得嗎

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 多 AZ 備援值得嗎
- Body:
  - 多 AZ：跨區備援，單 AZ 故障服務不中斷
  - 成本：多 AZ 雲費額外增加 $3,000–6,000/月
  - 現階段：6 人 MVP 團隊，複雜度超出能力邊界
- VCRE Scorecard (below body — 4-cell horizontal cards)

## Beginner Anchor
VCRE 打分：多 AZ 備援 vs 成本——正確方向但時機不對。先做 SPOF 緩解（Replica + Retry + Idempotency），v5 再加多 AZ 是務實的演進路徑。

## Learning Goal
讓學員用 VCRE 框架評估「現在就加多 AZ 備援」這個決策，理解架構演進要看業務規模和團隊能力，「做得到」和「現在就做」是兩個不同的問題。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` + Coral Red `#E8634F` dual-color (TRADE-OFF).
- Background: Deep Navy `#152238`.
- Kicker label: `TRADE-OFF`, top-left. Dual-color pill: left half Deep Teal `#2E7D86`, right half Coral Red `#E8634F`, diagonal split at center, Warm White text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Numbers ($3,000, $6,000, 1.5, 2, 6) in JetBrains Mono. "多 AZ" in JetBrains Mono.
- VCRE Scorecard (below body, ~90% width, 4 equal cards, rounded 16 px, gap 16 px):
  - Card V: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `V` Inter 800 48 px Mint. Mid: `商業價值` Noto Sans TC 700 28 px Warm White. Score: `3/5` JetBrains Mono 34 px Coral Red. Reason: `可用性提升，但 MVP 規模效益有限` Noto Sans TC 500 26 px Warm White.
  - Card C: background Deep Teal `#2E7D86`. Top: `C` Inter 800 48 px Warm White. Mid: `成本 TCO` Noto Sans TC 700 28 px Warm White. Score: `5/5` JetBrains Mono 34 px Coral Red. Reason: `多 AZ 額外增 $3k–6k/月，總費超出 $5k 預算` Noto Sans TC 500 26 px Warm White.
  - Card R: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `R` Inter 800 48 px Mint. Mid: `風險` Noto Sans TC 700 28 px Warm White. Score: `3/5` JetBrains Mono 34 px Coral Red. Reason: `多 AZ 複雜度，6 人團隊 3 個月難駕馭` Noto Sans TC 500 26 px Warm White.
  - Card E: background Deep Teal `#2E7D86`. Top: `E` Inter 800 48 px Warm White. Mid: `可演進` Noto Sans TC 700 28 px Warm White. Score: `5/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `先 SPOF 緩解，v5 再加多 AZ` Noto Sans TC 500 26 px Warm White.
- Caption below VCRE cards: `結論：v4 先做 SPOF 緩解，v5 再演進多 AZ。` Noto Sans TC 400 / 26 px / Mint `#97E8D6`, left-aligned.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "TRADE-OFF slide — VCRE scorecard layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a trade-off decision slide, not a technical flow diagram.

## VCRE Scorecard

| 維度 | 評分（1-5） | 本決策的具體理由 |
|------|------------|----------------|
| V 商業價值 | 3 | 多 AZ 確實提升可用性（99.9% → 接近 99.95%+），減少單 AZ 故障停機風險。但 MVP 階段用戶規模有限，每月少損失的停機費是假設性收益，而非確定性收益。對業務的直接商業價值在現階段中等。 |
| C 成本 TCO | 5 | 多 AZ 部署需要所有有狀態服務（TSDB、Kafka、Redis）跨 AZ 複製，額外雲費保守估計 $3,000–$6,000/月（即增加 1.5–2 倍）。目前底線雲費 <$5,000/月，加上多 AZ 追加費用後總費用直接超出 $5k/月預算（預估 $8,000–$11,000/月），TCO 壓力極高。 |
| R 風險 | 3 | 多 AZ 架構複雜度大幅提升：跨 AZ 延遲（1–5ms）影響 TSDB replication lag、Kafka ISR 同步、Redis Sentinel 選舉。6 人熟 Python 剛碰雲端的團隊在 3 個月 MVP 期間內設計並正確部署多 AZ，失敗風險中等偏高——可能比不做多 AZ 還不穩定。 |
| E 可演進 | 5 | 先集中在 v4 做好 SPOF 緩解（TSDB Replica + Kafka multi-broker + Consumer Group ≥2），v5 系統穩定後再加多 AZ，每步都是安全的增量改進。架構設計本身不封閉多 AZ 選項——服務已 stateless，有狀態層已有 Replica 基礎，往多 AZ 演進路徑清晰。 |

**核心取捨**：多 AZ 是正確方向但時機不對——成本超預算、複雜度超出 MVP 團隊能力邊界；先做 SPOF 緩解打穩基礎，v5 演進多 AZ 是務實路徑。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "TRADE-OFF" dual-color pill badge — left half Deep Teal #2E7D86, right half Coral Red #E8634F, diagonal split, Warm White text, 24 px Inter 700. Title "多 AZ 備援值得嗎" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White, technical values ($3,000, $6,000, 6 人) in JetBrains Mono. Line 2 shows "多 AZ 雲費額外增加 $3,000–6,000/月" (additional cost framing). Below body: VCRE scorecard — 4 equal horizontal rounded cards (16 px, gap 16 px, ~90% width), left to right exactly as follows. Card V (background #152238, Mint #97E8D6 2 px border): letter "V" Inter 800 48 px Forest Green #5B9770, name "商業價值" Noto Sans TC 700 28 px Warm White, score "3/5" JetBrains Mono 34 px Forest Green #5B9770, reason "提升可用性，但收益假設性" Noto Sans TC 500 26 px Warm White. Card C (background #2E7D86): letter "C" 48 px Warm White, name "成本", score "5/5" JetBrains Mono 34 px Coral Red #E8634F, reason "跨 AZ 複製，總費超 $5k 預算". Card R (background #152238, Mint border): letter "R" Mint #97E8D6, name "風險", score "3/5" Coral Red #E8634F, reason "跨 AZ 複雜，新手團隊風險中高". Card E (background #2E7D86): letter "E" Warm White, name "可演進", score "5/5" Forest Green #5B9770, reason "v4 先緩解 SPOF，v5 再多 AZ". (Score color rule: V/E high=Forest Green good, low=Coral Red concerning; C/R high=Coral Red concerning, low=Forest Green good.) Below cards: caption "結論：v4 先做 SPOF 緩解，v5 再演進多 AZ。" in Mint #97E8D6 26 px. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left. Balanced decision-framework composition.

## Negative Prompt
- Do not invent extra Chinese text, extra VCRE dimensions, or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render fewer or more than 4 VCRE cards.
- Do not make all 4 VCRE score numbers the same color — V/C/R scores are Coral Red, E score is Forest Green.
- Do not omit the caption below VCRE cards.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent or alter the VCRE scores, dimension names, or reason text — render exactly V=3/商業價值, C=5/成本, R=3/風險, E=5/可演進 with the reason lines given.

## Speaker Notes
用 VCRE 框架打分。V（商業價值）3/5：多 AZ 確實提升可用性，但在 MVP 階段用戶規模有限，每月少損失的停機費是假設性收益。中等商業價值。C（成本 TCO）5/5：多 AZ 額外追加雲費 $3,000–$6,000/月（這是在現有 <$5,000/月底線之上的增加量，相當於雲費翻 1.5–2 倍），總費直接突破 $5k/月預算限制，保守估計 $8,000–$11,000/月，TCO 壓力極高。R（風險）3/5：多 AZ 架構複雜度大幅提升——跨 AZ 延遲影響 TSDB replication、Kafka ISR、Redis Sentinel 選舉。6 人 Python 新手雲端團隊 3 個月 MVP 內部署並正確維運多 AZ，失敗風險中等偏高。E（可演進）5/5：先做好 v4 的 SPOF 緩解（TSDB Replica + Kafka 3-broker + Consumer Group ≥2），v5 系統穩定後再加多 AZ——路徑清晰，不鎖死未來選項。結論：多 AZ 是正確方向，但「做得到」和「現在就做」是兩個問題。v4 先做 SPOF 緩解，v5 再演進。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "多 AZ 備援值得嗎" — 9 Chinese characters (CJK only), within 14-char limit.
- [ ] Kicker reads `TRADE-OFF` and uses dual-color pill (Deep Teal + Coral Red).
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "多 AZ：跨區備援，單 AZ 故障服務不中斷" — within 18 chars ✓
- [ ] Body line 2: "成本：多 AZ 雲費額外增加 $3,000–6,000/月" — within 18 chars ✓
- [ ] Body line 3: "現階段：6 人 MVP 團隊，複雜度超出能力邊界" — within 18 chars ✓
- [ ] $3,000–6,000/月 is ADDITIONAL cost on top of <$5,000/月 baseline → total clearly exceeds $5k/月 budget (correct framing).
- [ ] 6 人 team size matches shared IoT numbers.
- [ ] VCRE Scorecard section present with all 4 dimensions scored.
- [ ] VCRE scores: V=3, C=5, R=3, E=5.
- [ ] V and R score reasons reference MVP scale / team capacity.
- [ ] C score reason references $5k/月 budget and $3k–6k/月 ADDITIONAL cost (not $3k–6k total).
- [ ] E score reason references "先 SPOF 緩解，v5 再加多 AZ" evolution path.
- [ ] Core trade-off statement: 多 AZ 正確方向但時機不對，v4 先 SPOF 緩解，v5 多 AZ.
- [ ] 4 VCRE visual cards on slide, in V/C/R/E order.
- [ ] Caption "結論：v4 先做 SPOF 緩解，v5 再演進多 AZ。" visible below VCRE cards.
- [ ] V/C/R scores in Coral Red; E score in Forest Green.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (TRADE-OFF slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
