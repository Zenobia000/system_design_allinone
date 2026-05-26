---
title: "競品掃描"
slug: "competitive-scan"
stage: "discovery"
roles: ["pm", "ba"]
order: 5
hook: "找出對手做了什麼、沒做什麼、為什麼"
when_to_use: "進入新市場、評估差異化定位、stakeholder 質疑「為何要做」時"
ai_leverage: "用 Claude 同時分析多家對手 landing page + pricing + review"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

不看對手，容易做出「對手早做過、且已驗證失敗」的功能；或反過來，盲抄對手 feature list 而忽略自家定位。
競品掃描的價值不是抄，而是**找定位空隙與技術可行邊界**。

## 誰負責、和誰對接

- **主責：** PM（最終決策定位）
- **協作：** BA（補 stakeholder 與法遵限制）、行銷（補 GTM 訊息）
- **下游收件：** PM 寫 PRD positioning、Architect 評估技術可行性

## 何時用、何時不用

- ✅ **必要時機：** 進新市場、做差異化定位、向 stakeholder 解釋「為何不抄某對手」
- ❌ **不需要時：** 內部工具、合規限期任務、純技術升級
- ⚠️ **常見誤用：** 只比 feature checkmark，不看 pricing、定位、客群、tech debt；feature 多 ≠ 贏

## AI 怎麼加速

把對手官網 / pricing 頁 / changelog + 第三方 review（G2 / Capterra / app store / Reddit）+ 我方定位假設整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審差異化空隙是否真存在**。本卡輸出**真實競品掃描 markdown 文件**（含表格、定位軸、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 3 家對手 / 快速差異化評估用，**完整範本**給 5+ 家對手 / 含合規 / 含 defensive moat 分析的場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "competitive-scan"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona"]
  optional: ["jtbd", "value-hypothesis"]
---

# Competitive Scan: <product-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：competitor-A landing §XXX / review §YYY / quote: "..."）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` **不編造 feature / pricing / 客數**；至少涵蓋 5 個維度（feature / pricing / 定位 / 客群 / review sentiment），不能只列 feature checkmark；weakness 必須有 review evidence（非主觀判斷）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：N 家對手、我方定位空隙是什麼、最大威脅是誰、最大機會在哪 -->

<3-5 行說明>

> **TL;DR:** <一句話：我們的定位空隙是 X，對手 Y 最強但 Z 弱點可被利用>

---

## 2. Competitor Set & Positioning Axes

<!-- ai-rule: 至少 3 家對手 + 至少 2 個 positioning 軸。每家對手在每個軸上的位置必須有 source 支撐 -->

### Competitors

| Name | URL | Scope rationale | Confidence |
|---|---|---|---|
| Competitor A | <url> | 直接對手，同 segment 同 use case | **[H]** |
| Competitor B | <url> | 鄰近對手，同 segment 不同 use case | **[M]** |
| Competitor C | <url> | 替代方案，不同形式但解同問題 | **[M]** |

### Positioning axes

| Axis | Low end | High end | 我方位置 |
|---|---|---|---|
| 解決問題深度 | 單點工具 | end-to-end 平台 | **中**（依據：persona §value）|
| 目標客群 | SMB | Enterprise | **SMB-mid**（依據：persona §P1）|

---

## 3. Feature & Pricing Comparison（5 維度合併）

<!-- ai-rule: 不只列 feature；必須涵蓋 feature / pricing model / entry price / free tier / review sentiment 至少 5 個維度。缺資料寫 `_TODO_` 不寫 ✓ -->

| Dimension | Us | Competitor A | Competitor B | Source |
|---|---|---|---|---|
| Core feature X | ✓ | ✓ | ✗ | A landing §1 |
| Pricing model | freemium | per_seat | tiered | A pricing page |
| Entry price | $0 | $19/seat/mo | $99/mo flat | A/B pricing |
| Free tier | ✓ | ✗ | limited 14-day | A FAQ |
| G2 rating | _TODO_ | 4.3 (1.2k reviews) | 4.1 (800 reviews) | G2 §XX |
| Review sentiment | _TODO_ | 抱怨 onboarding 慢 | 抱怨 pricing 突漲 | G2 quote §3 |

---

## 5. Weakness & Positioning Gaps

<!-- ai-rule: 每個 weakness 必須有 review quote 作為 evidence（不能只寫「我覺得他們不好」）；positioning gap 至少 2 個 -->

### Weaknesses（exploitable）

| Competitor | Weakness | Review evidence | Exploitability | Confidence |
|---|---|---|---|---|
| A | Onboarding 過於複雜 | "<quote>" — G2 §15, ⭐ 2/5 | **high** | **[H]** |
| B | Pricing 不透明 | "<quote>" — Reddit §3 | mid | **[M]** |

### Positioning gaps（我方機會）

> **Gap 1:** <定位空隙描述> — **Rationale:** <為何此空隙存在> — **Our fit:** strong / partial / weak — **Confidence:** **[H]**
>
> **Gap 2:** <定位空隙描述> — ...

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 主攻定位空隙 | gap_1 / gap_2 / gap_3 | gap_1 | gap_2 (市場太小)、gap_3 (我方能力不符) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的流失客戶訪談 / sales call 錄音 / 對手 changelog>

### TODO（缺資料）

- _TODO: 需要 G2 review evidence 校準 Competitor C 的 sentiment_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 10, 12，刻意沿用完整版編號）
> - [ ] 至少 3 家對手 + 至少 2 個 positioning 軸
> - [ ] Comparison 表涵蓋 ≥ 5 個維度（不只 feature checkmark）
> - [ ] 每個 weakness 有 review quote evidence（非主觀判斷）
> - [ ] Positioning gaps ≥ 2 個，每個含 our_fit 評估
> - [ ] 缺資料寫 `_TODO_`，沒有編造 feature / pricing
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（競品掃描是給人讀的 markdown）
```

```template-full
---
doc_type: "competitive-scan"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "jtbd"]
  optional: ["value-hypothesis", "user-research"]
---

# Competitive Scan: <product-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD · **Reviewers:** BA / 行銷 / Architect

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。至少 5 家對手；至少涵蓋 feature / pricing / 定位 / 客群 / tech debt / review sentiment 6 個維度（不只 feature checkmark）。每結論行內 `（依據：competitor-X landing §XXX / review §YYY / quote: "..." / pricing page §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` **不編造 feature / pricing / 客數**；weakness 必須有 review evidence；合規 / 地域涵蓋必填（GDPR / HIPAA / SOC 2）；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PM · required: always -->

<!-- ai-fill: 3-5 行：N 家對手、我方定位空隙是什麼、最大威脅是誰、最大機會在哪、合規 / 地域限制 -->

<3-5 行說明>

> **TL;DR:** <一句話：我們的定位空隙是 X，對手 Y 最強但 Z 弱點可被利用>

---

## 2. Competitor Set
<!-- owner: PM · required: always -->

<!-- ai-rule: 至少 5 家對手，含直接對手 + 鄰近對手 + 替代方案 -->

| Name | URL | Type | Scope rationale | Confidence |
|---|---|---|---|---|
| Competitor A | <url> | 直接對手 | 同 segment 同 use case | **[H]** |
| Competitor B | <url> | 直接對手 | 同 segment 不同 packaging | **[H]** |
| Competitor C | <url> | 鄰近對手 | 同 segment 不同 use case | **[M]** |
| Competitor D | <url> | 替代方案 | 不同形式解同問題 | **[M]** |
| Competitor E | <url> | 新進者 | 早期但動能強 | **[L]** |

---

## 3. Positioning Axes
<!-- owner: PM · required: always -->

<!-- ai-rule: 至少 3 個 positioning 軸；每家對手在每個軸上的位置必須有 source -->

| Axis | Low end | High end | A | B | C | Us | Source |
|---|---|---|---|---|---|---|---|
| 解決問題深度 | 單點工具 | end-to-end 平台 | 中 | 高 | 低 | **中** | landing pages §XX |
| 目標客群 | SMB | Enterprise | Mid | Enterprise | SMB | **SMB-mid** | pricing pages §YY |
| 學習曲線 | 即用 | 需培訓 | 中 | 高 | 低 | **低** | review G2 §ZZ |

---

## 4. Feature Matrix
<!-- owner: PM + BA · required: full-only -->

<!-- ai-rule: 列出 8-15 個關鍵 feature；每個 feature 標清楚 us / 每家對手是否有 + 實作限制 note -->

| Feature | Us | A | B | C | D | Note | Source |
|---|---|---|---|---|---|---|---|
| <feature 1> | ✓ | ✓ | ✗ | ✓ | _TODO_ | A 的實作有限制 | A docs §XX |
| <feature 2> | ✗ | ✓ | ✓ | ✗ | ✓ | — | — |
| ... | | | | | | | |

---

## 5. Pricing Comparison
<!-- owner: PM · required: always -->

<!-- ai-rule: 每家對手列 model / entry price / enterprise price / free tier。缺資料寫 `_TODO_` 不編造 -->

| Competitor | Model | Entry price | Enterprise price | Free tier | Confidence | Source |
|---|---|---|---|---|---|---|
| A | per_seat | $19/seat/mo | contact sales | ✗ | **[H]** | A pricing |
| B | tiered | $99/mo flat | $499/mo | 14-day trial | **[H]** | B pricing |
| C | usage_based | $0.01/event | _TODO_ | ✓ | **[M]** | C docs |
| D | freemium | $0 | $49/seat/mo | ✓ | **[H]** | D pricing |
| E | flat | $29/mo | _TODO_ | ✗ | **[L]** | _尚無 enterprise tier_ |

---

## 6. Review Sentiment & Weakness
<!-- owner: PM · required: always -->

<!-- ai-rule: 每家對手列 G2 / Capterra / app store / Reddit 至少 1 個 source；weakness 必須有 review quote 作為 evidence -->

| Competitor | Avg rating | Top complaint | Review quote | Exploitability | Confidence |
|---|---|---|---|---|---|
| A | 4.3 (1.2k) | Onboarding 過於複雜 | "<quote>" — G2 §15, ⭐ 2/5 | **high** | **[H]** |
| B | 4.1 (800) | Pricing 突漲不透明 | "<quote>" — Reddit §3 | mid | **[M]** |
| C | 4.5 (200) | Feature 範圍窄 | "<quote>" — Capterra §7 | low | **[M]** |

---

## 7. Positioning Gaps（我方機會）
<!-- owner: PM · required: always -->

<!-- ai-rule: 至少 3 個 gap，每個含 rationale + our_fit（strong / partial / weak）+ 對應 trade-off -->

| # | Gap | Rationale | Our fit | Confidence | Trade-off |
|---|---|---|---|---|---|
| G1 | <定位空隙描述> | <為何此空隙存在> | strong | **[H]** | 放棄 enterprise 客群 |
| G2 | <定位空隙描述> | <為何> | partial | **[M]** | 需投資 a11y 能力 |
| G3 | <定位空隙描述> | <為何> | weak | **[L]** | 需新 tech stack |

---

## 8. Defensive Moats & Erosion Risk
<!-- owner: PM + Architect · required: full-only -->

<!-- ai-rule: 每個 moat 必須含 sustainability（年數估計）+ risk_of_erosion（什麼會破壞它） -->

| # | Moat | Sustainability | Risk of erosion | Confidence |
|---|---|---|---|---|
| M1 | <e.g., data network effect> | 3-5 years | 大廠進場 + 免費策略 | **[M]** |
| M2 | <e.g., 整合生態> | 2-3 years | API 標準化 | **[M]** |

---

## 9. Compliance & Geo Coverage
<!-- owner: BA · required: full-only -->

<!-- ai-rule: 必須註明每家對手的 SOC2 / GDPR / HIPAA / ISO 27001 認證 + geo 限制；自家若要進入該市場須評估合規成本 -->

| Competitor | Certifications | Geo restrictions | Notes | Source |
|---|---|---|---|---|
| A | SOC2 Type II, GDPR | US, EU | 無 HIPAA | A security page |
| B | SOC2, HIPAA | US only | EU 須走 EU-hosted tier | B docs |
| C | _TODO_ | global | _尚無公開資料_ | — |

---

## 10. Decision Log
<!-- owner: PM · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 主攻定位空隙 | G1 / G2 / G3 | G1 | G2 (需投資 a11y 但團隊無資源)、G3 (新 tech stack 風險高) | **[H]** |
| YYYY-MM-DD | 是否進 enterprise | yes / no | no | yes (合規成本高、銷售週期長) | **[M]** |

---

## 11. Out of Scope
<!-- owner: PM · required: full-only -->

本競品掃描文件 **不處理**：

- ❌ **不做對手財報深度分析** — 屬 corp dev / IR
- ❌ **不做技術棧逆向工程** — 屬 security research
- ❌ **不評估收購可能** — 屬 M&A

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的流失客戶訪談 / sales call 錄音 / 對手 changelog 一年份>

### TODO（缺資料）

- _TODO: 需要 Competitor C 的 enterprise pricing_
- _TODO: 補 Competitor E 的 review evidence_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 至少 5 家對手 + 至少 3 個 positioning 軸
> - [ ] 涵蓋 ≥ 6 個維度（feature / pricing / 定位 / 客群 / tech debt / review sentiment）
> - [ ] Pricing 表每家對手含 model + entry price + free tier
> - [ ] 每個 weakness 有 review quote evidence（非主觀判斷）
> - [ ] Positioning gaps ≥ 3 個，每個含 our_fit + trade-off
> - [ ] Defensive moats 段每個含 sustainability + erosion risk
> - [ ] Compliance 段涵蓋 SOC2 / GDPR / HIPAA 至少 3 個
> - [ ] 缺資料寫 `_TODO_`，沒有編造 feature / pricing / 客數
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（競品掃描是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出競品掃描 markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼對手官網 / pricing 頁 / changelog / G2 / Capterra / Reddit review / 我方定位假設與 GTM 訊息全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只比 feature checkmark（feature 多 ≠ 贏，必須涵蓋 ≥ 5 維度）、weakness 寫主觀判斷沒 review evidence、編造 pricing / 客數而非寫 `_TODO_`、忘了合規 / 地域涵蓋（要進管制市場時會被打回票）、positioning gap 沒寫 trade-off（= 自我感覺良好）。AI 若漏這些，自檢清單會抓到並回頭補。
