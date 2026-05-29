---
chapter: "幕 5：落地與演進"
chapter_id: "05"
chapter_slug: "05-落地與演進"
slide: "8"
title: "一開始就微服務嗎"
original_title: "一開始就微服務嗎"
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

# Slide 08 · 一開始就微服務嗎

## On-slide Text
- Kicker: `TRADE-OFF`
- Title: 一開始就微服務嗎
- Body:
  - 6 人、3 個月 MVP、雲費 < $5,000/月
  - Monolith 先行：結構清楚，package 邊界即演進邊界
  - 微服務先行：分散式複雜度從 Day 1 開始
- VCRE Scorecard (below body — 4-cell horizontal cards, comparing modular monolith first)
- Caption: `結論：modular monolith 先行；有觸發條件再拆。`

## Beginner Anchor
VCRE 四維都指向同一個結論：給定這個團隊和時程，modular monolith 先行是正確選擇，不是「偷懶」。

## Learning Goal
讓學員用 VCRE 框架對「一開始就微服務」這個決策打分，理解分散式複雜度在 6 人 MVP 下的真實代價，以及 modular monolith 的演進優勢。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` + Coral Red `#E8634F` dual-color (TRADE-OFF).
- Background: Deep Navy `#152238`.
- Kicker label: `TRADE-OFF`, top-left. Dual-color pill: left half Deep Teal `#2E7D86`, right half Coral Red `#E8634F`, diagonal split at center, Warm White text, Inter 700 / 24 px, all-caps.
- Title: Noto Sans TC 900 Black / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Numbers in JetBrains Mono.
- VCRE Scorecard (below body, ~90% width, 4 equal cards, rounded 16 px, gap 16 px):
  - Card V: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `V` Inter 800 48 px Mint. Mid: `商業價值` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `3 個月可交付 MVP，商業節點不滑` Noto Sans TC 500 26 px Warm White.
  - Card C: background Deep Teal `#2E7D86`. Top: `C` Inter 800 48 px Warm White. Mid: `成本 TCO` Noto Sans TC 700 28 px Warm White. Score: `2/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `無 K8s/Service Mesh，雲費可控` Noto Sans TC 500 26 px Warm White.
  - Card R: background Deep Navy `#152238`, border Mint `#97E8D6` 2 px. Top: `R` Inter 800 48 px Mint. Mid: `風險` Noto Sans TC 700 28 px Warm White. Score: `2/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `無分散式事務、無跨服務版本衝突` Noto Sans TC 500 26 px Warm White.
  - Card E: background Deep Teal `#2E7D86`. Top: `E` Inter 800 48 px Warm White. Mid: `可演進` Noto Sans TC 700 28 px Warm White. Score: `4/5` JetBrains Mono 34 px Forest Green `#5B9770`. Reason: `package 邊界清楚，觸發條件時可拆` Noto Sans TC 500 26 px Warm White.
- Note on polarity: This VCRE scores the "modular monolith first" option (V=4 good, C=2 low cost = good, R=2 low risk = good, E=4 good). C=2 and R=2 mean LOW cost and LOW risk (favorable for this choice), using Forest Green for all 4 dimensions to signal overall positive assessment.
- Caption below VCRE cards: `結論：modular monolith 先行；有觸發條件再拆。` Noto Sans TC 400 / 26 px / Mint `#97E8D6`, left-aligned.
- Logo: `logo-light.png`, 64 px height, bottom-right.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / Warm White, 96 px from bottom.
- No source/citation text on slide. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "TRADE-OFF slide — VCRE scorecard layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear as branded logos on this slide.

## Technical Flow Details
not_applicable — this is a trade-off decision slide, not a technical flow diagram.

## VCRE Scorecard

> 評分對象：**modular monolith 先行**（相對於「一開始就微服務」的備選方案）
> 記分方向：V/E 高=好；**C/R 低=好**（本頁 C=2、R=2 代表成本低、風險低，是優點）

| 維度 | 評分（1-5） | 本決策的具體理由 |
|------|------------|----------------|
| V 商業價值 | 4 | Modular monolith 讓 6 人團隊在 3 個月內交付可用 MVP，商業節點不滑。微服務先行的日程風險可能讓 3 個月內沒有可用系統，延誤商業時程。 |
| C 成本 TCO | 2 | 不需要 Kubernetes、Service Mesh（Istio/Linkerd）、分散式 Tracing Day 1，雲費在 < $5,000/月約束內可控。微服務先行的 K8s + Service Mesh 本身就可能超出預算。 |
| R 風險 | 2 | 無分散式事務問題（兩個 package 間直接函數呼叫即可）；無跨服務 API 版本衝突；無 on-call 複雜度增加。微服務先行的風險：網路分區、服務間超時、分散式 saga，6 人新手雲端團隊難以掌控。 |
| E 可演進 | 4 | v5 monorepo 的 ingest/processor/query package 邊界是刻意設計的演進預留。有觸發條件時（> 20 人 / 獨立擴展需求），可沿邊界拆出，不是重寫，是可控演進。Event Sourcing/CQRS 也有量化觸發條件。 |

**核心取捨**：微服務的真實代價（K8s、Service Mesh、分散式事務、多 on-call rotation）在 6 人 MVP 下遠超收益；modular monolith 有清楚的 package 邊界，後續可沿邊界演進，這才是真正「為未來準備」的務實選擇。

---

### 對比分析：微服務先行 vs Modular Monolith 先行

| 面向 | 微服務先行 | Modular Monolith 先行 |
|------|-----------|----------------------|
| Day 1 複雜度 | Kubernetes、Service Mesh、API Gateway、分散式 Tracing、服務間合約 | 一個 repo、Docker Compose、本地開發簡單 |
| 3 個月 MVP 可行性 | 低：光 K8s 設定就需要 2–4 週學習時間 | 高：一個 `make dev` 就起整個系統 |
| 成本（雲費 + 人力） | 高：K8s 控制平面 + 多個 LoadBalancer + 更多維運人力 | 低：3 個 EC2 + 1 個 RDS + 1 個 ElastiCache 即可 |
| 分散式事務風險 | 高：跨服務寫入需要 Saga 或 2PC | 無：package 間直接函數呼叫，在同一個 transaction 內 |
| 演進難度 | N/A（已是微服務） | 低：沿 package 邊界拆，是重構不是重寫 |
| 適用時機 | 團隊 > 15–20 人，模組有獨立部署需求 | 團隊 < 10 人，MVP 優先，邊界已設計好 |

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "TRADE-OFF" dual-color pill badge — left half Deep Teal #2E7D86, right half Coral Red #E8634F, diagonal split, Warm White text, 24 px Inter 700. Title "一開始就微服務嗎" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: 3 body lines Noto Sans TC 500 / 34 px / Warm White, numbers in JetBrains Mono. Below body: VCRE scorecard — 4 equal horizontal rounded cards (16 px, gap 16 px, ~90% width), left to right exactly as follows. Card V (background #152238, Mint #97E8D6 2 px border): letter "V" Inter 800 48 px Forest Green #5B9770, name "商業價值" Noto Sans TC 700 28 px Warm White, score "4/5" JetBrains Mono 34 px Forest Green #5B9770, reason "monolith 讓 3 個月 MVP 達標" Noto Sans TC 500 26 px Warm White. Card C (background #2E7D86): letter "C" 48 px Warm White, name "成本", score "2/5" JetBrains Mono 34 px Forest Green #5B9770, reason "免 K8s／Service Mesh，雲費可控". Card R (background #152238, Mint border): letter "R" Mint #97E8D6, name "風險", score "2/5" Forest Green #5B9770, reason "無分散式事務與跨服務風險". Card E (background #2E7D86): letter "E" Warm White, name "可演進", score "4/5" Forest Green #5B9770, reason "package 邊界預留，可沿邊界拆". (Score color rule: V/E high=Forest Green good, low=Coral Red concerning; C/R high=Coral Red concerning, low=Forest Green good. Here C=2 and R=2 are LOW = good = Forest Green.) Below cards: caption "結論：modular monolith 先行；有觸發條件再拆。" in Mint #97E8D6 26 px. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra Chinese text, extra VCRE dimensions, or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render fewer or more than 4 VCRE cards.
- Do not use Coral Red for the score numbers — all 4 scores are Forest Green (all positive signals for modular monolith).
- Do not show microservices as the recommended option — modular monolith is the conclusion.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent or alter the VCRE scores, dimension names, or reason text — render exactly V=4/商業價值, C=2/成本, R=2/風險, E=4/可演進 with the reason lines given; C=2 and R=2 are low = good = Forest Green.

## Speaker Notes
用 VCRE 框架打分「modular monolith 先行」這個選擇。V（商業價值）4/5：6 人 3 個月 MVP，monolith 讓商業節點可達；微服務先行很可能 3 個月沒有可用系統，那是商業失敗。C（成本 TCO）2/5——注意，C=2 是好事，代表成本低：不需要 Kubernetes、Service Mesh、API Gateway Day 1，雲費在 $5k/月約束內可控。R（風險）2/5——R=2 也是好事，代表風險低：沒有分散式事務、沒有跨服務 API 版本衝突、沒有多 on-call rotation，6 人新手雲端團隊不會被分散式複雜度壓垮。E（可演進）4/5：v5 monorepo 的 package 邊界（ingest/processor/query）不是偶然，是刻意設計的演進預留——有觸發條件時沿邊界拆，是重構不是重寫。結論：modular monolith 先行，有觸發條件才拆，這和幕 3、幕 5 的所有決策一致。這不是偷懶，這是對著這個團隊和約束做出的最正確選擇。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "一開始就微服務嗎" — 9 Chinese characters, within 14-char limit.
- [ ] Kicker reads `TRADE-OFF` and uses dual-color pill (Deep Teal + Coral Red).
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1 ≤ 18 chars: "6 人、3 個月 MVP、雲費 < $5,000/月" ✓
- [ ] Body line 2 ≤ 18 chars: "Monolith 先行：結構清楚，package 邊界即演進邊界" — verify count ✓
- [ ] Body line 3 ≤ 18 chars: "微服務先行：分散式複雜度從 Day 1 開始" ✓
- [ ] Numbers $5,000/月 match Ch0 shared numbers.
- [ ] VCRE Scorecard section present with all 4 dimensions scored.
- [ ] VCRE scores: V=4, C=2, R=2, E=4.
- [ ] C=2 and R=2 are correctly interpreted as FAVORABLE (low cost, low risk) for modular monolith.
- [ ] V/E scores use Forest Green (high=good); C/R scores also Forest Green (low=good for this option).
- [ ] Core trade-off statement present: modular monolith with trigger conditions for evolution.
- [ ] VCRE Scorecard includes comparison table (微服務先行 vs Monolith先行).
- [ ] Caption "結論：modular monolith 先行；有觸發條件再拆。" visible below VCRE cards.
- [ ] Conclusion consistent with幕3 decision (modular monolith, not microservices).
- [ ] Conclusion consistent with slide-06 evolution roadmap trigger conditions.
- [ ] 4 VCRE visual cards on slide, in V/C/R/E order.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (TRADE-OFF slide, not artifact).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] `Diagram Spec` marked `not_applicable: true`.
- [ ] `Logo Assets` states none.
