---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "4"
title: "五種韌性手法"
original_title: "五種韌性手法"
beat: "方法"
kicker: "METHOD"
layout_type: "method"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 04 · 五種韌性手法

## On-slide Text
- Kicker: `METHOD`
- Title: 五種韌性手法
- Vocabulary Table (5 rows, 2 columns: 術語 | 一句定義):
  | 術語 | 定義（≤ 18 字） |
  |------|----------------|
  | Replica / 複本 | 資料與服務的多個副本，任一掛掉可切換 |
  | Retry / 重試 | 失敗後自動再試，搭配退避避免雪崩 |
  | Idempotency / 冪等 | 相同請求重複執行，結果一致，Retry 安全 |
  | Backpressure / 背壓 | 下游告知上游放慢，避免佇列無限膨脹 |
  | Circuit Breaker / 熔斷 | 偵測下游異常後斷開，防止故障擴散 |
- Inline glosses (Caption 26 px, below the matching row, not extra table rows):
  - Replica 列下方小註：`Streaming Replication＝主庫即時把變更串流到備庫`
  - Retry 列下方小註：`Backoff＝重試間隔指數遞增，避免雪上加霜`

## Beginner Anchor
詞彙卡：複本 / 重試 / 冪等 / 背壓 / 熔斷——五種韌性工具箱，v4 FMEA 的每個 SPOF 都會對應其中一種或多種。

## Learning Goal
讓學員掌握五種韌性手法的名稱和定義，理解每種手法解決的問題類型，為 slide-05 FMEA 表的「緩解手法」欄位建立詞彙。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD). Kicker pill: Deep Teal background, Warm White text, Inter 700 / 24 px, all-caps.
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left, Deep Teal `#2E7D86` pill, Warm White text.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Vocabulary layout: 5-row mini table (not individual floating cards, since 5 items fit better as a structured table).
  - Table container: Deep Teal `#2E7D86` background, rounded 16 px, ~80% canvas width, centered below title.
  - Header row: "術語" / "一句定義" — Inter 700 / 28 px / Warm White, Mint `#97E8D6` bottom border 1 px.
  - Data rows (5): alternating Deep Teal `#2E7D86` and Deep Navy `#152238` row background.
  - Left column (術語): English term + Chinese name, JetBrains Mono 500 / 28 px / Warm White. Format: "Replica / 複本".
  - Right column (定義): Noto Sans TC 500 / 28 px / Warm White, ≤ 18 Chinese characters.
  - Row padding: 16 px top/bottom. Dividers: Mint `#97E8D6` 1 px at 20% opacity between rows.
  - Inline gloss (only for Replica and Retry rows): one Caption line directly under the row's definition, Noto Sans TC 400 / 26 px / Mint `#97E8D6`, indented to align with the right (定義) column. These are sub-term explainers, not new table rows; each row body stays ≤ 3 lines.
    - Under Replica 列：`Streaming Replication＝主庫即時把變更串流到備庫`
    - Under Retry 列：`Backoff＝重試間隔指數遞增，避免雪上加霜`
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD slide — vocabulary table layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear on this slide.

## Technical Flow Details
not_applicable — this is a vocabulary/method slide defining resilience patterns, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" kicker pill — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, rounded. Title "五種韌性手法" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Below: a 5-row 2-column table (~80% canvas width, rounded 16 px, Deep Teal #2E7D86 outer background). Header row: "術語" | "一句定義" in Inter 700 28 px Warm White, Mint #97E8D6 1 px bottom border. Five data rows with alternating Deep Teal (#2E7D86) and Deep Navy (#152238) background. Left column = English+Chinese term in JetBrains Mono 500 28 px Warm White; Right column = Chinese definition in Noto Sans TC 500 28 px Warm White. Render all five rows verbatim — Row 1: "Replica / 複本" | "資料與服務的多個副本，任一掛掉可切換"; Row 2: "Retry / 重試" | "失敗後自動再試，搭配退避避免雪崩"; Row 3: "Idempotency / 冪等" | "相同請求重複執行，結果一致，Retry 安全"; Row 4: "Backpressure / 背壓" | "下游告知上游放慢，避免佇列無限膨脹"; Row 5: "Circuit Breaker / 熔斷" | "偵測下游異常後斷開，防止故障擴散". Rows separated by Mint #97E8D6 1 px dividers at low opacity. Add two small inline gloss caption lines in Noto Sans TC 400 26 px Mint #97E8D6, each placed directly under its row's right-column definition (aligned to the 定義 column, not as new table rows): under Row 1 (Replica) render "Streaming Replication＝主庫即時把變更串流到備庫"; under Row 2 (Retry) render "Backoff＝重試間隔指數遞增，避免雪上加霜". Clean, structured, educational. No 3D, no gradients. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra rows or change the 5 defined resilience terms.
- Do not change the definitions — Replica uses "資料與服務的多個副本，任一掛掉可切換"; Idempotency uses "相同請求重複執行，結果一致，Retry 安全"; each must be ≤ 18 Chinese characters and technically accurate.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not render fewer or more than 5 rows of vocabulary. The two gloss caption lines (Streaming Replication, Backoff) are sub-term explainers under their rows — do not promote them into table rows or count them toward the 5-row total, and do not drop them.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
五種韌性工具箱，逐一拆解。Replica（複本）：同一份資料或服務的多個副本，任何一個副本掛掉都可以切換到另一個，消除 SPOF——這是 TSDB 單實例最直接的緩解手法。Retry（重試）：操作失敗後自動再試；但盲目重試會造成雪崩式連鎖，所以必須搭配指數退避（exponential backoff）和 jitter。Idempotency（冪等）：相同請求執行多次，結果一致。在 v3 架構中，Stream Processor 的 TSDB 寫入必須是冪等的（(sensor_id, timestamp) 去重），才能讓 Retry 安全執行。Backpressure（背壓）：下游處理不過來時，主動告知上游放慢速率，避免佇列無限膨脹。Kafka 的 Consumer lag 監控就是一種觀察背壓信號的方式。Circuit Breaker（熔斷）：當下游連續失敗達到閾值時，自動「斷路」，停止繼續把請求送到已失敗的下游，給它時間恢復——防止故障透過呼叫鏈擴散。slide-05 的 FMEA 表會把這五種手法對應到具體 SPOF 節點。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "五種韌性手法" — 7 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` with Deep Teal #2E7D86 background pill.
- [ ] Exactly 5 vocabulary rows: Replica/複本, Retry/重試, Idempotency/冪等, Backpressure/背壓, Circuit Breaker/熔斷.
- [ ] Each left-column term uses JetBrains Mono for English term.
- [ ] Each definition is ≤ 18 Chinese characters.
- [ ] Replica definition: "資料與服務的多個副本，任一掛掉可切換" — 18 chars ✓
- [ ] Retry definition: "失敗後自動再試，搭配退避避免雪崩" — 16 chars ✓
- [ ] Idempotency definition: "相同請求重複執行，結果一致，Retry 安全" — 15 CJK chars ✓
- [ ] Backpressure definition: "下游告知上游放慢，避免佇列無限膨脹" — 17 chars ✓
- [ ] Circuit Breaker definition: "偵測下游異常後斷開，防止故障擴散" — 16 chars ✓
- [ ] Replica row gloss caption present: "Streaming Replication＝主庫即時把變更串流到備庫" (Caption 26 px, not a table row).
- [ ] Retry row gloss caption present: "Backoff＝重試間隔指數遞增，避免雪上加霜" (Caption 26 px, not a table row).
- [ ] Gloss captions do not change the 5-row count; each row body stays ≤ 3 lines.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
