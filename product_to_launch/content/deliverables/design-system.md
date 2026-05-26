---
title: "Design System · 設計系統"
slug: "design-system"
stage: "design"
roles: ["ui"]
order: 20
hook: "讓全產品視覺一致、開發不重造輪子"
when_to_use: "產品 ≥ 5 個主要 screen、跨平台、多設計師協作時"
ai_leverage: "用 Claude 從現有 mockup → token 萃取 + component spec"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

沒有 design system，每個設計師畫自己的 button、自己的間距、自己的顏色。
工程師也得每次重寫元件、QA 每次重測樣式。
Design System 把**color、typography、spacing、component state** 集中為 token + 元件庫，是規模化設計與開發的前提。

## 誰負責、和誰對接

- **主責：** UI（設計規範）
- **協作：** FE（實作元件庫）、UX（互動規範）、Brand（品牌一致性）
- **下游收件：** UI 套用、FE 寫元件、QA 設計 visual regression test

## 何時用、何時不用

- ✅ **必要時機：** 產品 ≥ 5 個主要 screen、跨平台（web + mobile）、設計師 ≥ 2 人
- ❌ **不需要時：** 單頁產品、純後台工具用第三方 UI lib
- ⚠️ **常見誤用：** 一開始就追求完美完整（會變半年專案）；應**先抽 token + 5-10 個核心元件**，邊用邊長大

## AI 怎麼加速

把 mockup + brand spec + 既有元件庫整份丟給 agent，讓 agent 讀範本內 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審命名語意與貢獻政策**。本卡輸出**真實 design-system markdown 文件**（含 token 表、component anatomy 表、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份 design-system 契約的兩種版本：**輕量範本** 給 5-10 個核心元件、單平台、單一設計師起步的情境，**完整範本** 給跨平台（web + mobile）、設計師 ≥ 2 人、有 Brand 簽核流程的場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "design-system"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["mockups", "brand-spec"]
  optional: ["existing-component-library"]
---

# Design System: <product-name>

**Status:** Draft v0.X · **Owner:** <UI name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 6, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。Tokens 至少 4 類（color / spacing / typography / radius）；元件至少 5 個核心；states 至少 5 種；每結論行內加 `（依據：mockup §XXX / brand §YYY）`；每量化欄位加 `[H]/[M]/[L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造 hex 值或 props；a11y 對比 ≥ 4.5:1 必填。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：token 範圍、核心元件數、命名風格選擇、最強 evidence 來源 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 design-system 收斂哪些視覺決策>

---

## 2. Design Tokens

<!-- ai-rule: 4 類必填（color / spacing / typography / radius）；shadow / motion 可選。Color 必須分 primitive 與 semantic 兩層 -->

### Color

| Layer | Token | Value | Confidence |
|---|---|---|---|
| Primitive | `blue-500` | `#2563EB` | **[H]** |
| Primitive | `gray-100` | `#F5F5F5` | **[H]** |
| Semantic | `bg-action-primary` | → `blue-500` | **[H]** |
| Semantic | `bg-surface` | → `gray-100` | **[M]** |

### Spacing

- **Base:** 8-point grid
- **Scale:** `space-1`(4) / `space-2`(8) / `space-3`(12) / `space-4`(16) / `space-6`(24) / `space-8`(32)

### Typography

| Token | Family | Size | Line-height | Weight |
|---|---|---|---|---|
| `text-body` | Inter | 16 | 24 | 400 |
| `text-h2` | Inter | 24 | 32 | 600 |

### Radius

- `radius-sm`: 4px / `radius-md`: 8px / `radius-lg`: 16px

---

## 3. Core Components（5-10 個）

<!-- ai-rule: 每元件 4 維度描述（anatomy / variants / states / props）；states 至少 5 種 -->

### Button

- **Anatomy:** container · label · icon_left · icon_right
- **Variants:** primary · secondary · ghost · destructive
- **States:** default · hover · focus · active · disabled · loading
- **Props:** `size` / `variant` / `disabled` / `loading` / `icon`
- **A11y:** `role="button"` + keyboard `Enter` / `Space`
- **Confidence:** **[H]** — **Source:** mockup §3

### Input · Card · Modal · ...

---

## 6. A11y Baseline

<!-- ai-rule: 4 項必填（對比 / focus / 不只用色 / 暗色模式）；不適用須寫 rationale -->

| Dimension | Target | Rationale | Confidence |
|---|---|---|---|
| **Contrast (text)** | ≥ 4.5:1 | WCAG 2.2 AA | **[H]** |
| **Focus visible** | required | 鍵盤 a11y | **[H]** |
| **Color not sole indicator** | 用 icon / 文案輔助 | <為何> | **[H]** |
| **Dark mode** | not in v1 | <延後 V2> | **[M]** |

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Token 命名風格 | semantic / literal / hybrid | hybrid | semantic (學習成本高)、literal (難 theming) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions：**
  - <例：假設不支援暗色模式 V1>
- **Highest-value next input:** <例：Brand spec 終版 / FE 元件庫對齊>

### TODO（缺資料）

- _TODO: 需要 Brand 確認 logo 使用規範_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 6, 10, 12）
> - [ ] Tokens 至少 4 類（color / spacing / typography / radius）
> - [ ] Color 表分 primitive + semantic 兩層
> - [ ] 元件 ≥ 5 個，每個 4 維度（anatomy / variants / states / props）
> - [ ] States ≥ 5 種（含 disabled / loading）
> - [ ] A11y 對比 ≥ 4.5:1 已標 H
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（design-system 是給人讀的 markdown）
```

```template-full
---
doc_type: "design-system"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["mockups", "brand-spec", "existing-component-library"]
  optional: ["tailwind-config", "storybook-link"]
---

# Design System: <product-name>

**Status:** Draft v0.X · **Owner:** <UI name> · **Last updated:** YYYY-MM-DD · **Reviewers:** UX / FE / Brand / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 W3C DTCG token 規範 + Material / Polaris / Atlassian DS。Tokens 至少 6 類（color / spacing / typography / radius / shadow / motion）；元件至少 8 個核心；states ≥ 6 種；行內 `（依據：mockup §XXX / brand §YYY）`；量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造 hex / props；a11y baseline 4 項全填；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: UI · required: always -->

<!-- ai-fill: 3-5 行：token 範圍、核心元件數、命名風格、預期使用者（FE / Designer / Brand） -->

<3-5 行說明>

> **TL;DR:** <一句話：本 design-system 收斂哪些視覺決策、給誰用>

---

## 2. Design Tokens
<!-- owner: UI · required: always -->

<!-- ai-rule: 6 類全填。Color 必須分 primitive + semantic 兩層；token 命名遵守第 7 段 naming convention -->

### Color

| Layer | Token | Value | WCAG contrast (vs bg) | Confidence | Source |
|---|---|---|---|---|---|
| Primitive | `blue-500` | `#2563EB` | — | **[H]** | brand §2 |
| Primitive | `gray-100` | `#F5F5F5` | — | **[H]** | brand §2 |
| Semantic | `bg-action-primary` | → `blue-500` | 4.6:1 vs white | **[H]** | mockup §3 |
| Semantic | `text-on-primary` | `#FFFFFF` | 4.6:1 vs `blue-500` | **[H]** | mockup §3 |

### Spacing

- **Base:** 8-point grid — **Rationale:** <對應 Material / iOS HIG>
- **Scale:** `space-1`(4) / `space-2`(8) / `space-3`(12) / `space-4`(16) / `space-6`(24) / `space-8`(32) / `space-12`(48)

### Typography

| Token | Family | Size | Line-height | Weight | Use |
|---|---|---|---|---|---|
| `text-body` | Inter | 16 | 24 | 400 | 內文 |
| `text-h2` | Inter | 24 | 32 | 600 | 區段標題 |
| `text-display` | Inter | 48 | 56 | 700 | hero |

### Radius / Shadow / Motion

- **Radius:** `radius-sm`(4) / `radius-md`(8) / `radius-lg`(16)
- **Shadow / elevation:** `elev-1` ... `elev-5`（每階對應 `box-shadow` 規格）
- **Motion:** `duration-fast`(150ms) / `duration-base`(250ms) + easing token

---

## 3. Core Components
<!-- owner: UI + FE · required: always -->

<!-- ai-rule: 至少 8 個核心元件；每元件 4 維度（anatomy / variants / states / props） + a11y；states ≥ 6 種 -->

### Button

- **Anatomy:** container · label · icon_left · icon_right
- **Variants:** primary · secondary · ghost · destructive
- **States:** default · hover · focus · active · disabled · loading
- **Props:** `size` (sm/md/lg) / `variant` / `disabled` / `loading` / `icon`
- **A11y:** `role="button"` + keyboard `Enter` / `Space` + `aria-disabled`
- **Confidence:** **[H]** — **Source:** mockup §3

### Input

- **Anatomy:** wrapper · label · input · helper-text · error-text · icon
- **Variants:** text · email · password · search · number
- **States:** default · focus · filled · disabled · error · readonly
- **Props:** `type` / `value` / `disabled` / `error` / `helperText`
- **A11y:** `aria-describedby` 指向 helper / error / `aria-invalid`
- **Confidence:** **[H]** — **Source:** mockup §5

### Card · Modal · Toast · Tabs · Select · Tooltip · ...

---

## 4. Patterns
<!-- owner: UI + UX · required: full-only -->

<!-- ai-rule: 列 3-5 個 composition pattern；含 usage rule 與 anti-pattern -->

| Pattern | Composition | When to use | When NOT to use |
|---|---|---|---|
| Form | Input + Button + Helper | 採集使用者輸入 | 多步驟 wizard（用另一 pattern） |
| Modal | Card + Backdrop + Close | 需中斷使用者注意力 | 非關鍵警示（用 Toast） |
| Empty state | Card + Illustration + CTA | 列表 / 表格無資料 | 載入中（用 Skeleton） |

---

## 5. Layout & Grid
<!-- owner: UI + FE · required: full-only · skippable: 單欄產品可寫「無 grid，直接 stack」 -->

- **Breakpoints:** mobile_360 / tablet_768 / desktop_1280 / wide_1440
- **Container max:** 1280px
- **Columns:** 4 / 8 / 12 (mobile / tablet / desktop)
- **Gutter:** `space-4`(16) / `space-6`(24)

---

## 6. A11y Baseline
<!-- owner: UI + UX · required: always -->

<!-- ai-rule: 4 項全填（對比 / focus / 不只用色 / 暗色模式）；任一不適用須寫 rationale -->

| Dimension | Target | Rationale | Confidence |
|---|---|---|---|
| **Contrast (text)** | ≥ 4.5:1 | WCAG 2.2 AA | **[H]** |
| **Contrast (UI)** | ≥ 3:1 | WCAG 2.2 AA | **[H]** |
| **Focus visible** | required (outline ≥ 2px) | 鍵盤 a11y | **[H]** |
| **Color not sole indicator** | 用 icon / 文案 / 形狀輔助 | <為何> | **[H]** |
| **Dark mode** | supported / not in v1 | <理由 + 何時加> | **[M]** |

---

## 7. Naming Convention
<!-- owner: UI + FE · required: full-only -->

<!-- ai-rule: 風格 + prefix + rationale + 範例對照 -->

- **Style:** semantic / literal / hybrid — **Chosen:** hybrid
- **Prefix:** `ds-` for tokens / `Ds` for components
- **Rationale:** semantic 可 theming、literal 易上手，hybrid 兩層皆暴露

### 範例對照

| Semantic | Literal | Use |
|---|---|---|
| `bg-action-primary` | `blue-500` | 主 CTA 背景 |
| `text-on-surface` | `gray-900` | 內文 |

---

## 8. Contribution Policy
<!-- owner: UI lead · required: full-only -->

<!-- ai-rule: who_can_add + versioning + deprecation 三件齊 -->

- **Who can add:** UI lead 簽核 / 任何設計師可提 PR
- **Versioning:** semver（MAJOR.MINOR.PATCH）
- **Deprecation:** 標記 `@deprecated` + 提供 migration guide + 保留 ≥ 2 個 minor 版本
- **Review cycle:** 雙週一次

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：semantic token 學習成本高，FE 套用慢> — **Mitigation:** Storybook + IDE 自動補全 — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：暗色模式 V1 還是 V2？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: UI · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Token 命名風格 | semantic / literal / hybrid | hybrid | semantic (學習成本高)、literal (難 theming) | **[H]** |

---

## 11. Out of Scope
<!-- owner: UI · required: full-only -->

本 design-system 文件 **不處理**：

- ❌ **不做 motion library / 動畫 spec** — 屬獨立 motion 卡（V2）
- ❌ **不做 icon set 創作** — 外掛使用第三方
- ❌ **不做後台 admin 專用元件** — 屬獨立 admin DS
- ❌ **不做 i18n 字串資產** — 屬內容團隊

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions：**
  - <假設 1：例「8-point grid 取代既有 5-point grid」>
  - <假設 2>
- **Highest-value next input:** <Brand 簽核 / FE 既有元件庫對齊 / a11y audit>

### TODO（缺資料）

- _TODO: 需要 Brand 確認 logo 使用規範_
- _TODO: 補暗色模式 token 對應_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Tokens 6 類全填（color / spacing / typography / radius / shadow / motion）
> - [ ] Color 分 primitive + semantic 兩層，含 WCAG contrast 標註
> - [ ] 元件 ≥ 8 個，每個 4 維度 + a11y
> - [ ] States ≥ 6 種
> - [ ] A11y baseline 4 項全填，每項 confidence 標 H/M/L
> - [ ] Naming convention 含 semantic / literal 對照表
> - [ ] Contribution policy 含 versioning + deprecation
> - [ ] Decision Log 每條 ≥ 2 個 rejected + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（design-system 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 design-system markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 mockup 截圖描述 / brand spec / 既有 FE 元件庫 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 一開始就追求 6 類 token + 30 元件（半年專案陷阱，先抽 5-10 個核心元件）、Color 沒分 primitive / semantic 兩層（後續難 theming）、元件 states 只列 default / hover（漏 disabled / loading / error）、a11y 砍 contrast 沒寫 rationale、Decision Log 只列 chosen 不列 rejected（= 黑箱）、編造未驗證的 hex 值。AI 若漏這些，自檢清單會抓到並回頭補。
