---
chapter: "幕 1：需求與約束"
chapter_id: "01"
chapter_slug: "01-需求與約束"
slide: "7"
title: "該追求 99.99% 嗎"
original_title: "該追求 99.99% 嗎"
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

# Slide 07 · 該追求 99.99% 嗎

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 該追求 99.99% 嗎
- Body:
  - 停機損失 $20,000/小時：1 分鐘故障 ≈ $333
  - 99.9% vs 99.99%：差 38.6 分/月 ≈ 少損失 $12,900
  - 但架構複雜度翻倍、雲費增 $2,000–4,000/月
- VCRE Scorecard (below body — 4-cell horizontal cards)

## Beginner Anchor
VCRE 的用法：V 問值不值，C 問多少錢，R 問會壞哪，E 問好不好改。這一張把可用性從 99.9% 拉高到 99.99% 的決策用 VCRE 打一遍分。

## Learning Goal
讓學員第一次用 VCRE 框架對一個真實架構決策打分，感受「沒有絕對最佳解，只有取捨」——並學到「先做 99.9%，等業務規模再演進」是合理的分階段決策路徑。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` + Coral Red `#E8634F` dual-color (TRADE-OFF).
- Background: Deep Navy `#152238`.
- Kicker label: `TRADE-OFF`, top-left. Dual-color pill: left half Deep Teal `#2E7D86`, right half Coral Red `#E8634F`, diagonal split at center, Warm White text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Numbers ($20,000, $333, 99.9%, 99.99%, 38.6, $12,900, $2,000, $4,000) in JetBrains Mono.
- VCRE Scorecard (below body, ~90% width, 4 equal cards, rounded 16 px, gap 16 px):
  - Card V: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `V` Inter 800 48 px Mint. Mid: `商業價值` Noto Sans TC 700 28 px Warm White. Score: `2/5` JetBrains Mono 34 px Coral Red. Reason: `少損失有限，規模未到` Noto Sans TC 500 26 px Warm White.
  - Card C: background Deep Teal `#2E7D86`. Top: `C` Inter 800 48 px Warm White. Mid: `成本 TCO` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Coral Red. Reason: `月增 $2K–4K + 維運人力` Noto Sans TC 500 26 px Warm White; numbers JetBrains Mono.
  - Card R: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `R` Inter 800 48 px Mint. Mid: `風險` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Coral Red. Reason: `複雜度翻倍，新手團隊難控` Noto Sans TC 500 26 px Warm White.
  - Card E: background Deep Teal `#2E7D86`. Top: `E` Inter 800 48 px Warm White. Mid: `可演進` Noto Sans TC 700 28 px Warm White. Score: `5/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `v1 先 99.9%，v4 再演進` Noto Sans TC 500 26 px Warm White.
- Caption below VCRE cards: `結論：v1 定 99.9%，v4 演進至 99.99%。` Noto Sans TC 400 / 26 px / Mint `#97E8D6`, left-aligned.
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
| V 商業價值 | 2 | 99.9%→99.99% 每月少損失約 $12,900，但前提是故障頻率如預期；現階段 MVP 規模未到，實際收益有限。 |
| C 成本 TCO | 4 | 熱備援 + 多 AZ + 自動切換，雲費月增保守估計 $2,000–4,000，加人力維運成本，TCO 壓力高。 |
| R 風險 | 4 | 高可用架構複雜度翻倍；6 人 Python 新手雲端團隊在 3 個月內駕馭的失敗風險反而更高，可能比 99.9% 更不穩。 |
| E 可演進 | 5 | 先做好 99.9% 打穩基礎，等 v3/v4 業務規模增長後再演進至 99.99%，是最安全的分階段路徑。 |

**核心取捨**：99.99% 的工程代價在 MVP 階段超出團隊能力邊界，先做 99.9% 可控，v4 再演進是務實選擇。

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "TRADE-OFF" dual-color pill badge — left half Deep Teal #2E7D86, right half Coral Red #E8634F, diagonal split, Warm White text, 24 px Inter 700. Title "該追求 99.99% 嗎" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White, technical values in JetBrains Mono. Below body: VCRE scorecard — 4 equal horizontal rounded cards (16 px, gap 16 px, ~90% width). Cards alternate: V (#152238 with Mint 2 px border), C (#2E7D86), R (#152238 Mint border), E (#2E7D86). Each card shows letter (V/C/R/E) at top, Chinese dimension name, a score number in JetBrains Mono (Coral Red for V/C/R, Forest Green for E), and one short reason line in Warm White. Below cards: caption "結論：v1 定 99.9%，v4 演進至 99.99%。" in Mint #97E8D6 26 px. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White. Balanced decision-framework composition.

## Negative Prompt
- Do not invent extra Chinese text, extra VCRE dimensions, or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render fewer or more than 4 VCRE cards.
- Do not make all 4 VCRE score numbers the same color — V/C/R scores are Coral Red, E score is Forest Green.
- Do not move logo or footer outside the 96 px safe margin.

## Speaker Notes
用 VCRE 框架來打分。V（商業價值）2/5：99.99% 每月能少損失 $12,900 停機費——聽起來有價值，但前提是故障真的那麼頻繁；MVP 階段用戶規模還小，這個收益是假設性的。C（成本 TCO）4/5：熱備援 + 多 AZ + 自動切換，保守估計雲費月增 $2,000–4,000，加上人力維運成本，對 $5K/月預算是很大的壓力。R（風險）4/5：複雜度翻倍，6 人 Python 新手團隊 3 個月內駕馭高可用架構的失敗風險反而很高，設計做不好可能比 99.9% 還不穩。E（可演進）5/5：先做好 99.9% 打穩 v1 基礎，v3 系統設計完、v4 加韌性模式之後再演進至 99.99%，每步都是安全的增量改進。結論：v1 先定 99.9%，這不是認輸，是務實的分階段決策。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "該追求 99.99% 嗎" — 9 Chinese characters, within 14-char limit.
- [ ] Kicker reads `TRADE-OFF` and uses dual-color pill (Deep Teal + Coral Red).
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "停機損失 $20,000/小時：1 分鐘故障 ≈ $333" ≤ 18 chars ✓
- [ ] Body line 2: "99.9% vs 99.99%：差 38.6 分/月 ≈ 少損失 $12,900" ≤ 18 chars ✓
- [ ] Body line 3: "但架構複雜度翻倍、雲費增 $2,000–4,000/月" ≤ 18 chars ✓
- [ ] Numbers $20,000/hr and 99.9% match Ch0 shared numbers.
- [ ] VCRE Scorecard section present in this file with all 4 dimensions scored.
- [ ] VCRE scores: V=2, C=4, R=4, E=5.
- [ ] Core trade-off statement present: "v1 定 99.9%，v4 演進至 99.99%".
- [ ] 4 VCRE visual cards on slide, in V/C/R/E order.
- [ ] Caption "結論：v1 定 99.9%，v4 演進至 99.99%。" visible below VCRE cards.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (TRADE-OFF slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
