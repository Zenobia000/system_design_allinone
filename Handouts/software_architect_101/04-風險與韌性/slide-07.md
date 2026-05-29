---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "7"
title: "大廠主動弄壞自己"
original_title: "大廠主動弄壞自己"
beat: "業界佐證"
kicker: "REAL WORLD"
layout_type: "real_world"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 07 · 大廠主動弄壞自己

## On-slide Text
- Kicker: `REAL WORLD`
- Title: 大廠主動弄壞自己
- Body:
  - 混沌工程：對三個 SPOF 注入故障，驗證自動切換
  - 多 AZ 部署：跨可用區，單 AZ 掛不影響整體
  - 業界共識：韌性要演練，不能只靠設計

## Beginner Anchor
混沌工程 / 多 AZ（業界佐證，不具名來源）——大規模系統的韌性不靠設計圖保證，靠主動注入故障演練和跨區部署確認。

## Learning Goal
讓學員了解混沌工程和多 AZ 部署是業界成熟的韌性實踐，「主動弄壞自己」不是冒險而是風險控制，從而建立對韌性演練的心理準備。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Forest Green `#5B9770` (REAL WORLD). Kicker pill: Forest Green `#5B9770` background, Warm White text, Inter 700 / 24 px, all-caps.
- Background: Deep Navy `#152238`.
- Kicker label: `REAL WORLD`, top-left, Forest Green `#5B9770` background pill, Warm White text.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned. Technical terms (混沌工程, 多 AZ) in JetBrains Mono where appropriate.
- Right visual (~40% canvas): two flat illustration panels stacked or side by side:
  - Panel 1 (Chaos Engineering): A network diagram of 3–4 nodes connected by thin Mint #97E8D6 lines; one node has an intentional Coral Red #E8634F "✕" cut marker on a connection line, with a small Forest Green check icon showing the system rerouting around it. Visual metaphor: controlled failure injection.
  - Panel 2 (Multi-AZ): Two geographic zone rectangles (labeled "AZ-1" and "AZ-2" in JetBrains Mono Warm White 22 px), each containing a small stack of service nodes. A dashed Mint #97E8D6 arrow connecting them. One zone is dimmed (30% opacity) simulating failure, the other remains bright — the system continues serving. Forest Green #5B9770 subtle border on the active zone.
  - Both panels: Deep Navy fill, thin 2 px lines, flat, minimal, no gradients, no 3D, no photos, no real company logos.
- No named company citations, no "Source:" lines.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.

## Diagram Spec
```yaml
not_applicable: true
reason: "REAL WORLD slide — illustration-driven, no programmatic architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or open-source products are cited on this slide. The slide describes industry practices generically without naming specific vendors or sources.

## Technical Flow Details
not_applicable — this is an industry practice slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a real world evidence slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F, #5B9770. Top-left: "REAL WORLD" kicker pill — Forest Green #5B9770 background, Warm White text, Inter 700 / 24 px, all-caps, rounded. Title "大廠主動弄壞自己" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: exactly 3 body lines Noto Sans TC 500 / 34 px / Warm White, line-height 1.60, left-aligned, rendered verbatim — Line 1: "混沌工程：對三個 SPOF 注入故障，驗證自動切換"; Line 2: "多 AZ 部署：跨可用區，單 AZ 掛不影響整體"; Line 3: "業界共識：韌性要演練，不能只靠設計". Render "SPOF" and "AZ" in JetBrains Mono. Right side (~40% canvas): two flat minimal illustration panels. Panel 1 (top): a simple node-and-line network diagram — 4 rectangular nodes (Deep Navy fill, Deep Teal #2E7D86 2 px border, JetBrains Mono Warm White labels) connected by Mint #97E8D6 2 px lines; one connecting line has a Coral Red #E8634F ✕ cut marker (intentional failure), and a curved rerouting arrow in Forest Green #5B9770 shows traffic bypassing the failure. Small "Chaos" label in JetBrains Mono 20 px Mint above the panel. Panel 2 (bottom): two zone rectangles labeled "AZ-1" and "AZ-2" in JetBrains Mono 22 px Warm White — "AZ-1" contains 2 small node stacks at 25% opacity (failed/dim), "AZ-2" contains 2 small node stacks at full brightness with Forest Green #5B9770 2 px border accent; a dashed Mint arrow flows from AZ-1 to AZ-2 indicating failover. Small "Multi-AZ" label JetBrains Mono 20 px Mint above. All flat, 2 px line-art, no 3D, no gradients, no neon, no real company logos, no photos. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines of any kind.
- Do not add company names, product names, or brand logos in the illustrations.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not use photos of real data centers, server rooms, or real-world facilities.
- Do not move logo or footer outside the 96 px safe margin.
- Do not render fewer or more than 3 body lines.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
韌性不是紙上設計，需要主動演練。混沌工程的核心理念是：在受控的環境下，主動向系統中注入故障，觀察系統的實際行為——而不是等到生產環境真的爆炸再發現問題。對 v4 架構的三個 SPOF，具體的注入場景是：殺掉 TSDB Primary（驗證 Standby 自動切換是否真的在 30–60 秒內完成）、停掉一個 Kafka broker（驗證 partition leader 重選舉後 Producer / Consumer 能否自動恢復）、讓 Stream Processor OOM 崩潰（驗證 Consumer Group rebalance 後另一個實例接管，Retry + Idempotency 確保不重複寫入）。設計圖上的韌性手法只是「預期行為」——演練才能確認它真的有效。多 AZ（Multi-Availability Zone）部署：雲端服務的「可用區」是實體隔離的資料中心群，電力、網路、冷卻系統各自獨立。把服務部署在至少兩個 AZ，任何單一 AZ 發生故障，另一個 AZ 繼續服務。注意：多 AZ 增加延遲（跨 AZ 網路 typically 1–5ms），也增加成本——這是 slide-08 要打 VCRE 分的取捨決策。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "大廠主動弄壞自己" — 9 Chinese characters, within 14-char limit.
- [ ] Kicker reads `REAL WORLD` with Forest Green #5B9770 background pill.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "混沌工程：對三個 SPOF 注入故障，驗證自動切換" — 18 chars ✓
- [ ] Body line 2: "多 AZ 部署：跨可用區，單 AZ 掛不影響整體" — within 18 chars ✓
- [ ] Body line 3: "業界共識：韌性要演練，不能只靠設計" — 16 chars ✓
- [ ] No source/citation text on slide (no "Source:" or named company as citation).
- [ ] No named facilitation device text on slide.
- [ ] Right visual panels are generic illustrations (no real company logos, no brand names).
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
