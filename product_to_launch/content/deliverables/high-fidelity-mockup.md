---
title: "高保真稿"
slug: "high-fidelity-mockup"
stage: "design"
roles: ["ui"]
order: 21
hook: "讓工程師能像素級實作、不靠猜"
when_to_use: "Wireframe + flow 已凍結、進入 dev handoff 前"
ai_leverage: "用 Claude 從 wireframe + design system → component-by-component spec"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

工程師拿到模糊的 mockup，每個間距、每個 hover、每個 error state 都得回頭問設計師。一週 standup 半在補圖。
高保真稿是**像素級的最終視覺 + 完整 state + 標註齊全的交付物**，讓 FE/Mobile 能獨立實作。
不把 state 補齊（loading/empty/error/disabled），上線後永遠在補 bug。

## 誰負責、和誰對接

- **主責：** UI
- **協作：** UX（驗證互動）、FE/Mobile（驗證可實作）、QA（驗收基準）
- **下游收件：** FE/Mobile 實作、QA 設計 visual test、UX 跑最後 usability check

## 何時用、何時不用

- ✅ **必要時機：** wireframe + flow 已凍、進 dev handoff、跨平台一致性需求
- ❌ **不需要時：** wireframe 直接複用既有元件、純後台工具
- ⚠️ **常見誤用：** 只畫 happy path 的精美畫面，loading/empty/error 全靠工程腦補；高保真稿必須**所有 state 都齊**

## AI 怎麼加速

把 wireframe + design system + micro-copy 整份丟給 agent，讓 agent 讀範本內 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審視覺品味與品牌一致性**。本卡輸出**真實 high-fidelity mockup spec markdown**（含 screen × state 矩陣、a11y 標註表、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份 hi-fi 契約的兩種版本：**輕量範本** 給單平台、screen ≤ 5、改版迭代用，**完整範本** 給跨平台 handoff、screen ≥ 5、QA 需 visual regression baseline 的情境。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "high-fidelity-mockup"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["wireframe", "design-system"]
  optional: ["micro-copy"]
---

# High-fidelity Mockup Spec: <product-name>

**Status:** Draft v0.X · **Owner:** <UI name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 6, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每 screen 必含 ≥ 5 種 state（default / loading / empty / error / disabled）；只使用 design-system 既有 token，缺的標 `_TODO: 需 DS 補 token-XXX_`；行內 `（依據：wireframe §XXX / DS token §YYY）`；每量化欄位 `[H/M/L]` badge；a11y 對比 ≥ 4.5:1 + touch target ≥ 44×44 必填。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：涵蓋 N 個 screen、選用 token 數、a11y 達標等級 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 hi-fi 交付物涵蓋的範圍與下游使用方式>

---

## 2. Screens × States

<!-- ai-rule: 每個 screen 至少 5 種 state；不齊全的 state 寫 `_TODO_` 不能略 -->

### S1: <screen 名稱>

- **Breakpoint:** mobile_360 / desktop_1280
- **States covered:** default · loading · empty · error · disabled
- **Components used (from DS):** Button (primary) · Input (text) · Card
- **Confidence:** **[H]** — **Source:** wireframe §1

### S2: ...

---

## 3. Interaction States

<!-- ai-rule: 每互動元素列 hover / focus / active / disabled 四態；focus 必須對應 WCAG 2.4.7 -->

| Element | Hover | Focus | Active | Disabled |
|---|---|---|---|---|
| Primary CTA | `bg-action-primary-hover` | `outline-focus` (2px) | `bg-action-primary-active` | `bg-disabled` + `aria-disabled` |
| Input | `border-strong` | `outline-focus` (2px) | n/a | `bg-disabled` + cursor-not-allowed |

---

## 6. A11y Annotations

<!-- ai-rule: 4 項必填（對比 / focus / touch target / ARIA） -->

| Dimension | Target | Actual | Confidence |
|---|---|---|---|
| **Contrast (text)** | ≥ 4.5:1 | <實測值> | **[H]** |
| **Touch target** | ≥ 44×44 px | <實測 px> | **[H]** |
| **Focus visible** | outline ≥ 2px | <token> | **[H]** |
| **ARIA labels** | 所有 icon-only button 必填 | <list> | **[H]** |

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Error state 呈現方式 | inline / toast / modal | inline | toast (易錯過)、modal (干擾過大) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions：**
  - <例：假設深色模式不在 V1>
- **Highest-value next input:** <例：文案 owner 終版 / a11y audit>

### TODO（缺資料）

- _TODO: 需 DS 補 `bg-warning-subtle` token_
- _TODO: 需內容團隊提供 empty state 文案_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 6, 10, 12）
> - [ ] 每個 screen ≥ 5 種 state（含 disabled / loading）
> - [ ] 只使用 DS 既有 token，缺者標 `_TODO_`
> - [ ] Interaction states 4 態齊（hover / focus / active / disabled）
> - [ ] A11y 4 項全填（對比 / touch target / focus / ARIA）
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（hi-fi spec 是給人讀的 markdown）
```

```template-full
---
doc_type: "high-fidelity-mockup"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["wireframe", "design-system", "micro-copy", "brand-spec"]
  optional: ["motion-spec", "i18n-strings"]
---

# High-fidelity Mockup Spec: <product-name>

**Status:** Draft v0.X · **Owner:** <UI name> · **Last updated:** YYYY-MM-DD · **Reviewers:** FE / Mobile / QA / UX / Brand

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。每 screen ≥ 6 種 state（default / loading / empty / error / disabled / success / partial）；**禁止重新發明 token**——只使用 design-system 既有 token，缺者標 `_TODO: 需 DS 補 token-XXX_`；行內 `（依據：wireframe §XXX / DS token §YYY / brand §ZZ）`；量化欄位 `[H/M/L]` badge；a11y baseline 4 項全填（對比 / focus / touch target / ARIA）；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: UI · required: always -->

<!-- ai-fill: 3-5 行：涵蓋 N screen × M state 矩陣、選用 token 數、a11y 等級、下游 handoff 對象 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 hi-fi spec 涵蓋的範圍與目標完整度>

---

## 2. Screens × States Matrix
<!-- owner: UI · required: always -->

<!-- ai-rule: 每 screen ≥ 6 種 state；不齊全的 state 標 `_TODO_`，不能略；breakpoint 至少 mobile + desktop -->

### S1: <screen 名稱>

- **Breakpoint:** mobile_360 / tablet_768 / desktop_1280
- **States covered:** default · loading · empty · error · disabled · success · partial
- **Confidence:** **[H]** — **Source:** wireframe §1

### S2 · S3 · ...

---

## 3. Components Used
<!-- owner: UI + FE · required: always -->

<!-- ai-rule: 列出每 screen 用到的 DS component + variant + 任何 props override（override 須附 rationale） -->

| Screen | DS component | Variant | Props override | Rationale |
|---|---|---|---|---|
| S1 | Button | primary | size=lg | hero CTA 需更大 touch target |
| S1 | Input | text | — | — |
| S2 | Card | elevated | radius=lg | 與 brand spec 對齊 |

---

## 4. Interaction States
<!-- owner: UI · required: full-only -->

<!-- ai-rule: 每互動元素 4 態（hover / focus / active / disabled）；focus 必符合 WCAG 2.4.7 -->

| Element | Hover | Focus | Active | Disabled |
|---|---|---|---|---|
| Primary CTA | `bg-action-primary-hover` | `outline-focus` (2px) | `bg-action-primary-active` | `bg-disabled` + `aria-disabled` |
| Secondary CTA | `bg-action-secondary-hover` | `outline-focus` (2px) | `bg-action-secondary-active` | `bg-disabled` |
| Input | `border-strong` | `outline-focus` (2px) | n/a | `bg-disabled` + cursor-not-allowed |
| Link | `text-link-hover` + underline | `outline-focus` | `text-link-active` | n/a |

---

## 5. Micro-copy
<!-- owner: UI + 內容團隊 · required: full-only -->

<!-- ai-rule: 每 context 一行；缺文案 owner 必標 `_TODO_`；不自行創文案 -->

| Context | Text | Source |
|---|---|---|
| Primary CTA | <文案> | brand §micro-copy §3 |
| Error state | <文案> | _TODO: 需內容團隊_ |
| Empty state | <文案> | _TODO: 需內容團隊_ |

---

## 6. A11y Annotations
<!-- owner: UI + UX · required: always -->

<!-- ai-rule: 4 項全填；不適用須寫 rationale -->

| Dimension | Target | Actual | Confidence |
|---|---|---|---|
| **Contrast (text)** | ≥ 4.5:1 | <實測值> | **[H]** |
| **Contrast (UI)** | ≥ 3:1 | <實測值> | **[H]** |
| **Touch target** | ≥ 44×44 px | <實測 px> | **[H]** |
| **Focus visible** | outline ≥ 2px + 對比 ≥ 3:1 | <token> | **[H]** |
| **ARIA labels** | icon-only / dynamic content | <list> | **[H]** |
| **Focus order** | 邏輯一致（tab 順序） | <描述> | **[H]** |

---

## 7. Responsive Behavior
<!-- owner: UI + FE · required: full-only -->

<!-- ai-rule: 3 breakpoint 全填；不適用須寫 rationale -->

| Breakpoint | Layout | Behavior |
|---|---|---|
| mobile_360 | stack / 1-col | nav 收合為 hamburger |
| tablet_768 | 2-col + sidebar | nav 展開為 top tab |
| desktop_1280 | 3-col grid | sidebar 持續展開 |

---

## 8. Assets & Handoff Notes
<!-- owner: UI + FE · required: full-only -->

- **Figma file:** <link>
- **Export specs:** SVG (icons) · PNG @1x/@2x/@3x (raster) · WebP (photo)
- **Inspect tooling:** Figma Dev Mode / Zeplin
- **Naming convention for layers:** `[screen]_[component]_[state]`

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：partial state UX 邏輯未驗證，可能 FE 實作後才發現不可行> — **Mitigation:** 先做 prototype 驗證 — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：暗色模式是否 V1 涵蓋？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: UI · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Error state 呈現 | inline / toast / modal | inline | toast (易錯過)、modal (干擾過大) | **[H]** |

---

## 11. Out of Scope
<!-- owner: UI · required: full-only -->

本 hi-fi spec **不處理**：

- ❌ **不做 motion / 動畫 timing spec** — 屬獨立 motion 卡
- ❌ **不做 i18n 字串長度測試** — 屬 i18n / QA
- ❌ **不做後台管理介面** — 屬獨立 admin DS
- ❌ **不重新定義 design-system token** — 屬 design-system 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions：**
  - <假設 1：例「partial state 邏輯沿用 S1 規則」>
  - <假設 2>
- **Highest-value next input:** <文案 owner 終版 / a11y audit / motion spec>

### TODO（缺資料）

- _TODO: 需 DS 補 `bg-warning-subtle` token_
- _TODO: 需內容團隊提供 empty state 文案_
- _TODO: 補 partial state 互動規格_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 screen ≥ 6 種 state（含 partial / success）
> - [ ] 只使用 DS 既有 token，缺者標 `_TODO_`（**沒重新發明 token**）
> - [ ] Components used 表每筆 props override 附 rationale
> - [ ] Interaction states 4 態齊（hover / focus / active / disabled）
> - [ ] Micro-copy 缺文案 owner 已標 `_TODO_`
> - [ ] A11y 4+ 項全填（對比 × 2 / touch / focus / ARIA / focus order）
> - [ ] Responsive 3 breakpoint 齊
> - [ ] Decision Log 每條 ≥ 2 個 rejected + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（hi-fi spec 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 hi-fi mockup spec markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 wireframe / design-system token & component / micro-copy / brand spec 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只畫 happy path（漏 loading / empty / error / disabled / partial）、重新發明 token 而不用 DS 既有（造成下游 FE 無所適從）、自行創文案而非標 TODO 等內容團隊、a11y 砍 touch target / contrast 沒寫 rationale、Decision Log 只列 chosen 不列 rejected（= 黑箱）。AI 若漏這些，自檢清單會抓到並回頭補。
