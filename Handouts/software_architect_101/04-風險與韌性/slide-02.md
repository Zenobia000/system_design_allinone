---
chapter: "幕 4：風險與韌性"
chapter_id: "04"
chapter_slug: "04-風險與韌性"
slide: "2"
title: "SPOF 在哪"
original_title: "SPOF 在哪"
beat: "關鍵提問"
kicker: "KEY QUESTIONS"
layout_type: "key_questions"
audience_level: "intermediate"
output: "1920x1080"
source_style_guide: "../0_STYLE_GUIDE.md"
source_deck: "slides.md"
whitepaper_version: ""
rendering_mode: "image_prompt"
---

# Slide 02 · SPOF 在哪

## On-slide Text
- Kicker: `KEY QUESTIONS`
- Title: SPOF 在哪
- Body:
  - 流量暴增 10 倍，哪個元件先垮？
  - Kafka 只有一個 broker，queue 塞爆怎辦？
  - 哪個元件死了讓告警 P99 破 10 秒？

## Beginner Anchor
問：暴增 10 倍？queue 塞爆？哪個元件死了最痛？把「會不會壞」逼成三個可量化的風險問題，是 FMEA 分析的起點。

## Learning Goal
讓學員把模糊的「系統穩定性」逼成三個具體問題，分別對應容量風險、佇列風險、SLA 風險，為後續 FMEA 分析（slide-06）奠定提問框架。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint `#97E8D6` (KEY QUESTIONS). Kicker pill: Mint `#97E8D6` background, Deep Navy text, Inter 700 / 24 px, all-caps.
- Background: Deep Navy `#152238`.
- Kicker label: `KEY QUESTIONS`, top-left, Mint `#97E8D6` background pill, Deep Navy `#152238` text.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned. `SPOF` in JetBrains Mono.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White / line-height 1.60, left-aligned. Numbers (10 倍, P99, 10 秒) and technical terms (Kafka, broker, queue) in JetBrains Mono.
- Right visual: A minimalist architecture diagram stub — 4 rectangular flat nodes (Device, Kafka, Processor, TSDB) connected by thin Mint #97E8D6 2 px lines. Each node has a Mint question-mark badge overlaid at top-right, indicating risk uncertainty. The Kafka node is slightly larger and highlighted with a faint Coral Red #E8634F border suggesting fragility. Clean, flat, line-art style. No 3D, no gradients.
- Logo: `logo-light.png`, 64 px height, bottom-right canvas corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "KEY QUESTIONS slide — question-driven layout, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages are the focus of this slide; Kafka is referenced generically in the question.

## Technical Flow Details
not_applicable — this is a key questions slide establishing risk dimensions, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a key questions slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "KEY QUESTIONS" kicker pill — Mint #97E8D6 background, Deep Navy #152238 text, Inter 700 / 24 px, all-caps, rounded. Title "SPOF 在哪" Noto Sans TC 900 / 80 px / Warm White, with "SPOF" in JetBrains Mono, left-aligned. Below: exactly 3 body question lines Noto Sans TC 500 / 34 px / Warm White, rendered verbatim — Line 1: "流量暴增 10 倍，哪個元件先垮？"; Line 2: "Kafka 只有一個 broker，queue 塞爆怎辦？"; Line 3: "哪個元件死了讓告警 P99 破 10 秒？". Render technical terms and numbers ("10 倍", "Kafka", "broker", "queue", "P99", "10 秒") in JetBrains Mono. Right side (~40% canvas): a simplified flat node diagram — 4 rectangular boxes (labeled Device, Kafka, Processor, TSDB in JetBrains Mono 22 px Warm White) connected by thin Mint #97E8D6 2 px arrows. Each box has a small translucent question-mark badge at top-right in Mint #97E8D6. The Kafka box has a subtle Coral Red #E8634F 2 px border highlight. All nodes Deep Navy fill, Deep Teal #2E7D86 2 px border default. Flat, minimal, educational, no 3D, no gradients. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not add more than 4 nodes in the right-side diagram stub.
- Do not move logo or footer outside the 96 px safe margin.
- Do not render fewer or more than 3 body question lines.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
三個問題，三個風險維度。第一個：流量暴增 10 倍（20,000 msg/s），v3 的 Ingest API 和 Kafka 有沒有設計容量上限？哪個元件會是瓶頸？第二個：Kafka 只有一個 broker——broker 掛掉，整個 sensor-readings topic 不可用，上報寫入全部失敗，Processor 消費也停了。這是 queue 塞爆的風險，也是 SPOF。第三個：TSDB 單實例掛掉，Stream Processor 無法批次寫入，offset 不提交，Kafka 訊息積壓；同時 Query API 的 cache miss 路徑打 TSDB 也失敗——告警 P99 直接破 10 秒 SLA。把「會不會壞」逼成這三個具體問題，是 FMEA 分析的起點。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "SPOF 在哪" — 6 Chinese characters, within 14-char limit.
- [ ] Kicker reads `KEY QUESTIONS` with Mint #97E8D6 background pill.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Body line 1: "流量暴增 10 倍，哪個元件先垮？" — within 18 chars ✓
- [ ] Body line 2: "Kafka 只有一個 broker，queue 塞爆怎辦？" — within 18 chars ✓
- [ ] Body line 3: "哪個元件死了讓告警 P99 破 10 秒？" — within 18 chars ✓
- [ ] P99 < 10 秒 matches shared SLA numbers.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
