---
chapter: "幕 3：系統設計"
chapter_id: "03"
chapter_slug: "03-系統設計"
slide: "2"
title: "要微服務嗎"
original_title: "要微服務嗎"
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

# Slide 02 · 要微服務嗎

## On-slide Text
- Kicker: `KEY QUESTIONS`
- Title: 要微服務嗎
- Body:
  - 通訊用 REST、gRPC 還是 Queue？語意不同，保證不同
  - 哪些服務要 stateless？Session 和狀態放哪裡？
  - 上報路徑和查詢路徑能共用同一個 API 嗎？

## Beginner Anchor
不是「要不要微服務」，而是「哪段路徑需要同步保證、哪段可以非同步削峰」——這才是 C4 圖畫出來前要問清楚的三個問題。（答案：這不是微服務架構——Ingest API、Processor、Query API 可以共用同一個 codebase；C4 容器圖描述的是可部署單元，不預設要拆幾個 repo。）

## Learning Goal
讓學員把模糊的「要微服務嗎」分解為三個可回答的設計問題，建立後續 C4 容器圖決策的問題框架。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Mint `#97E8D6` (KEY QUESTIONS).
- Background: Deep Navy `#152238`.
- Kicker label: `KEY QUESTIONS`, top-left, Mint `#97E8D6` pill background (text Deep Navy `#152238`), Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, left-aligned.
- Body (3 lines): Noto Sans TC 500 / 34 px / Warm White `#F4F1EA` / line-height 1.60, left-aligned. Technical terms (REST, gRPC, Queue, stateless, Session) in JetBrains Mono / Mint `#97E8D6`.
- Left-side accent: thin Mint `#97E8D6` vertical bar (4 px wide) running the height of the body text area, aligned with left body margin.
- Right-side decorative element: three oversized question mark glyphs, fading from Mint `#97E8D6` to transparent (right to left), 16:9 balanced composition.
- Logo: `logo-light.png`, 64 px height, bottom-right, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "KEY QUESTIONS slide — text-driven question framing, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, frameworks, or packages appear prominently enough to require an official logo strip on this slide.

## Technical Flow Details
not_applicable — this is a question-framing slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a key-questions slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "KEY QUESTIONS" kicker pill — Mint #97E8D6 background, Deep Navy #152238 text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Title "要微服務嗎" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Left edge: thin Mint #97E8D6 vertical bar (4 px) running height of body text. Below title: 3 body lines Noto Sans TC 500 / 34 px / Warm White, line-height 1.60; terms REST / gRPC / Queue / stateless / Session in JetBrains Mono Mint #97E8D6. Right portion (~35% canvas): three oversized "?" glyphs in Mint #97E8D6, decreasing opacity right-to-left, as decorative background element. Flat design, no 3D, no photos. Bottom-right: logo placeholder 64 px (light). Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White.

## Negative Prompt
- Do not invent extra Chinese text or rewrite the title or body lines.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not move logo or footer outside the 96 px safe margin.
- Do not place any architecture diagram on this slide — it is a question-framing slide only.

## Speaker Notes
把「要微服務嗎」這個大問題拆成三個可以回答的具體設計問題。

先直接回答標題問題：這不是微服務架構。Ingest API、Processor、Query API 可以共用同一個 codebase；C4 容器圖描述的是「可部署單元」，不預設要拆幾個 repo。容器圖的重點是「哪些部分要獨立擴展、獨立故障隔離」，不是強制拆服務。學員不要把「C4 有多個容器方塊」誤讀為「一定要微服務」。

三個具體設計問題：第一：通訊協議的選擇——REST 適合同步請求-回應，gRPC 適合高效能服務間通訊，Queue（Kafka）適合需要削峰和非同步保證的場景。第二：stateless 設計——Ingest API 和 Query API 都應該是 stateless，好處是可以水平擴展，Session 和使用者狀態如果有的話應該外掛到 Redis 或資料庫，不放在服務記憶體裡。第三：上報路徑和查詢路徑的關注點完全不同——上報要吞吐量優先（尖峰 6,000 msg/s），查詢要延遲優先（P99 < 10s）；把它們拆成 Ingest API 和 Query API 是正確的分離關注點決策。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "要微服務嗎" — 6 Chinese characters, within 14-char limit.
- [ ] Kicker reads `KEY QUESTIONS` and uses Mint `#97E8D6` beat color.
- [ ] Body has exactly 3 lines, each ≤ 18 Chinese characters.
- [ ] Technical terms REST, gRPC, Queue, stateless appear in JetBrains Mono.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] Diagram Spec marked `not_applicable: true`.
- [ ] Logo Assets states none.
