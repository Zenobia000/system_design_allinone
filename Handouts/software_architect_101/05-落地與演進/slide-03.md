---
chapter: "幕 5：落地與演進"
chapter_id: "05"
chapter_slug: "05-落地與演進"
slide: "3"
title: "開發護欄"
original_title: "開發護欄"
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

# Slide 03 · 開發護欄

## On-slide Text
- Kicker: `METHOD`
- Title: 開發護欄
- Vocabulary Cards (2×2 grid):
  - Card 1: `GitHub Flow` / 分支策略 — 6 人推薦，短命分支合 PR；`例：feature 分支＋PR`
  - Card 2: `Linter / Formatter` / 格式自動化 — ruff + black；commit 前自動執行；`例：ruff+black commit 前跑`
  - Card 3: `CI Gate` / 合併守門 — PR 合 main 前必過 lint + test；`例：測試沒過不准合`
  - Card 4: `Scaffold` / 專案腳手架 — 新成員 5 分鐘能跑起來的 make init；`例：make init 一鍵起服務`

## Beginner Anchor
護欄不是限制工程師，是讓 6 人小團隊的新成員第一天就知道規則、不問就能開工。

## Learning Goal
讓學員掌握四個開發規範工具：分支策略、Linter/Formatter、CI Gate、Scaffold，並知道 6 人團隊的建議選擇。

## Visual Spec
- Canvas: `1920 x 1080 px`, safe margin `96 px`.
- Beat color: Deep Teal `#2E7D86` (METHOD).
- Background: Deep Navy `#152238`.
- Kicker label: `METHOD`, top-left. Pill style: Deep Teal `#2E7D86` background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em.
- Title: Noto Sans TC 900 / 80 px / Warm White `#F4F1EA`, below kicker, left-aligned.
- Vocabulary Card Grid (2×2, centered below title, ~85% canvas width, gap 24 px):
  Each card: Deep Teal `#2E7D86` background, rounded 16 px, Warm White text.
  - Top row: `GitHub Flow` card (left), `Linter / Formatter` card (right).
  - Bottom row: `CI Gate` card (left), `Scaffold` card (right).
  Card layout per style guide:
  - English term: JetBrains Mono / 34 px / Warm White `#F4F1EA`, bold.
  - Slash separator + Chinese name: Noto Sans TC 500 / 34 px / Warm White.
  - Thin Warm White `#F4F1EA` horizontal rule (1 px, 80% card width).
  - One-line definition ≤ 18 chars: Noto Sans TC 500 / 34 px / Warm White.
  - Example line (prefixed `例：`, ≤ 18 chars): Noto Sans TC 500 / 28 px / Mint `#97E8D6`, one row below the definition.
  - Card corner radius: 16 px.
- Logo: `logo-light.png`, 64 px height, bottom-right corner, 96 px from edges.
- Footer: `桑尼資料科學 · 版權所有 ©`, 22 px / 500 weight / Warm White, 96 px from bottom.
- No source/citation text. No named facilitation devices.

## Diagram Spec
```yaml
not_applicable: true
reason: "METHOD vocabulary-card slide — four vocabulary cards, no architecture diagram required."
```

## Logo Assets
none — no named companies, cloud services, or packages appear as branded logos on this slide. (ruff, black, GitHub Flow are mentioned as terms, but no brand logo strip is required for a vocabulary-card METHOD slide.)

## Technical Flow Details
not_applicable — this is a method/vocabulary-card slide, not a technical flow diagram.

## VCRE Scorecard
not_applicable — this is a method slide, not a trade-off decision slide.

## GPT Image Prompt
Create a 1920x1080 horizontal PowerPoint educational slide for "架構師 101" course. Background: Deep Navy #152238. Brand colors only: #152238, #F4F1EA, #2E7D86, #97E8D6, #E8634F. Top-left: "METHOD" pill badge — Deep Teal #2E7D86 background, Warm White text, Inter 700 / 24 px, all-caps, letter-spacing 0.12 em. Below: Title "開發護欄" Noto Sans TC 900 / 80 px / Warm White, left-aligned. Main content: 2×2 grid of vocabulary cards, each card Deep Teal #2E7D86 background rounded 16 px, gap 24 px, fitting within ~85% canvas width. Each card has: top line — English term in JetBrains Mono 34 px Warm White; then a slash + Chinese name in Noto Sans TC 500 34 px Warm White; then a thin Warm White 1 px horizontal rule; then one short definition line Noto Sans TC 500 34 px Warm White; then one short example line prefixed "例：" in Noto Sans TC 500 28 px Mint #97E8D6. Render the four cards verbatim — top-left "GitHub Flow / 分支策略 — 6 人推薦，短命分支合 PR · 例：feature 分支＋PR"; top-right "Linter / Formatter / 格式自動化 — ruff + black；commit 前自動執行 · 例：ruff+black commit 前跑"; bottom-left "CI Gate / 合併守門 — PR 合 main 前必過 lint + test · 例：測試沒過不准合"; bottom-right "Scaffold / 專案腳手架 — 新成員 5 分鐘能跑起來的 make init · 例：make init 一鍵起服務". For each card the English term is on the first line, then " / " plus the Chinese name, then the rule, then the text after " — " is the one-line definition below the horizontal rule, and the "例：" line is the Mint example row below the definition. Flat card layout, no gradients, no 3D. Bottom-right corner: keep it clean and completely empty (reserved for a brand logo overlaid later) — do not draw any logo, emblem, badge, monogram, or icon there. Footer "桑尼資料科學 · 版權所有 ©" 22 px Warm White at bottom-left.

## Negative Prompt
- Do not invent extra vocabulary cards beyond the 4 defined.
- Do not add source citations, references, or "Source:" lines.
- Do not add "委員質詢", "蘇格拉底", "武僧委員會", or any named facilitation device text.
- Do not use neon colors, pure black #000000, glossy 3D, gradient glows, random stickers, or clipart.
- Do not generate brand logos (ruff, GitHub) inside the cards — terms only.
- Do not invent example lines beyond the four `例：` lines specified, and do not change their wording.
- Do not move logo or footer outside the 96 px safe margin.
- Do not draw, invent, or render any logo, brand mark, emblem, badge, monogram, or icon in the bottom-right corner — that space must stay empty for a logo overlay added later.
- Do not invent, paraphrase, or alter any on-slide text — render the Chinese text exactly as specified in this prompt.

## Speaker Notes
開發護欄不是限制工程師，是讓 6 人小團隊的新成員第一天就知道規則。分支策略：6 人以下推薦 GitHub Flow（短命 feature branch，PR 審核後直接合 main），CI gate 自動把關；團隊更成熟後可走 trunk-based（直接推 main + feature flag），但不是現在的需求；放棄 Git Flow 的 develop/release 分支，那是 10 人以上才需要的複雜度。Linter + Formatter：Python 用 ruff（快速 lint）+ black（格式化），一個 .pre-commit-config.yaml 統一全團隊，reviewer 不需要浪費時間在格式問題上。CI Gate：PR 合 main 前必過 lint + unit test，用 GitHub Actions 或 GitLab CI，失敗則不可 merge。Scaffold：一個 make init 或 cookiecutter 模板，新成員 clone repo 後 5 分鐘跑起來，不需要問「怎麼啟動這個 service」。

## QA Checklist
- [ ] Canvas is 1920 x 1080 px with 96 px safe margin.
- [ ] Title "開發護欄" — 4 Chinese characters, within 14-char limit.
- [ ] Kicker reads `METHOD` with Deep Teal `#2E7D86` background, Warm White text.
- [ ] 4 vocabulary cards in 2×2 grid, each with term / name / definition structure.
- [ ] Each card definition ≤ 18 Chinese characters.
- [ ] Card 1: GitHub Flow / 分支策略 — definition correct (6 人推薦，短命分支合 PR)；Speaker Notes 補充 trunk-based 為成熟後選項.
- [ ] Card 2: Linter / Formatter / 格式自動化 — definition correct (ruff + black).
- [ ] Card 3: CI Gate / 合併守門 — definition correct (PR 合 main 前必過測試).
- [ ] Card 4: Scaffold / 專案腳手架 — definition correct (5 分鐘跑起來).
- [ ] Each card has a Mint `例：` line ≤ 18 chars (feature 分支＋PR / ruff+black commit 前跑 / 測試沒過不准合 / make init 一鍵起服務).
- [ ] All cards use Deep Teal `#2E7D86` background, Warm White text, rounded 16 px.
- [ ] Term text uses JetBrains Mono.
- [ ] `whitepaper_version` is empty (not an artifact slide).
- [ ] `rendering_mode` is `image_prompt`.
- [ ] `Diagram Spec` marked `not_applicable: true`.
- [ ] `Logo Assets` states none.
- [ ] No source/citation text on slide.
- [ ] No named facilitation device text on slide.
- [ ] Logo `logo-light.png` is 64 px height, bottom-right corner.
- [ ] Footer reads `桑尼資料科學 · 版權所有 ©` at 22 px.
