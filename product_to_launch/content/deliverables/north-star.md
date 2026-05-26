---
title: "北極星指標"
slug: "north-star"
stage: "discovery"
roles: ["pm", "po"]
order: 7
hook: "全團隊只盯一個數字，避免局部最佳化"
when_to_use: "團隊 ≥ 10 人、跨 squad 協作、KPI 多到互相打架時"
ai_leverage: "用 Claude 從商業模式反推候選北極星 + counter-metric"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

每個 squad 都在追自己的 KPI，結果整體產品 metric 不動甚至倒退。
北極星指標的價值不是「最重要的數字」，而是「**最能代表使用者持續獲得價值的數字**」。
沒有北極星，團隊容易追 vanity metric（DAU、註冊數），上線後沒人發現 retention 在崩。

## 誰負責、和誰對接

- **主責：** PM（提案）/ PO（落地到 backlog）
- **協作：** 數據團隊（補可量測性）、商業團隊（補 monetization 對齊）
- **下游收件：** 全團隊（每次 release 都對齊北極星）

## 何時用、何時不用

- ✅ **必要時機：** 團隊 ≥ 10 人、跨 squad、長期產品（非一次性專案）
- ❌ **不需要時：** 小團隊單一目標清楚、合規限期任務
- ⚠️ **常見誤用：** 把 revenue 當北極星（會誘導短期榨取使用者）；北極星應是**使用者價值的代理指標**，搭配 counter-metric 防偏

## AI 怎麼加速

把商業模式 canvas + persona + 主要 JTBD + 現有 metric dashboard 與 baseline 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 Goodhart 風險與 counter-metric 誠實度**。本卡輸出**真實北極星指標 markdown 文件**（含表格、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給小團隊單一產品 / 早期 metric 設計用，**完整範本**給跨 squad ≥ 10 人 / 多 input metric / 需要 anti-Goodhart 安全機制的場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "north-star"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "jtbd"]
  optional: ["value-hypothesis", "competitive-scan"]
---

# North Star Metric: <product-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 4, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：persona §XXX / JTBD-NNN / metric §YYY）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**北極星必須是使用者價值代理指標**，不能是 revenue 單獨指標（若是 revenue 須在 Decision Log 解釋）；**counter-metric 必填**且須有 hard threshold。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：NSM 是什麼、為何代表 user value、counter-metric 是什麼 -->

<3-5 行說明>

> **TL;DR:** <一句話：我們的北極星是 <metric>，因為它代表 <user value>，搭配 <counter-metric> 防偏>

---

## 2. North Star Metric

<!-- ai-rule: NSM 必須含 formula（可被 SQL / event tracking 計算）+ why_proxy_for_value（為何代表 long-term user value）-->

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Name** | <e.g., Weekly Active Teams × Successful Actions> | **[H]** | persona §value + JTBD-001 |
| **Formula** | `weekly_active_teams × successful_action_per_team` | **[H]** | analytics §schema |
| **Measurement** | <event tracking / DB query> | **[M]** | _TODO: 確認 event 已埋點_ |
| **Why proxy for value** | <為何代表 long-term user value> | **[H]** | persona §pain |

---

## 3. Leading Indicators（至少 2 條）

<!-- ai-rule: 每條含 formula + lag_to_NSM（從 leading 變化到 NSM 變化需多久）-->

| # | Name | Formula | Lag to NSM | Confidence |
|---|---|---|---|---|
| L1 | D7 activation rate | users completing key action within 7 days / new signups | 2-4 weeks | **[H]** |
| L2 | <leading 2> | <formula> | <X weeks> | **[M]** |

---

## 4. Counter-Metric（防 Goodhart）

<!-- ai-rule: 至少 1 條 counter-metric，必須含 hard threshold（破線即觸發 review，不能寫「持續觀察」）-->

| Name | Prevents what | Hard threshold | Source |
|---|---|---|---|
| <e.g., support tickets per active user> | 為了衝活躍推爛功能 | < 0.05 / user / week，破線即暫停 | _TODO: 確認 baseline_ |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因（含 Goodhart 評估）-->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 選哪個 NSM | NSM_A / NSM_B / NSM_C | NSM_A | NSM_B (Goodhart 風險高)、NSM_C (lag 太長) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的 retention cohort / payment funnel / churn 訪談>

### TODO（缺資料）

- _TODO: 需要 retention cohort 校準 lag 估計_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 4, 10, 12，刻意沿用完整版編號）
> - [ ] NSM 含 formula + measurement method + why_proxy_for_value 三件
> - [ ] NSM 不是純 revenue 指標（若是 revenue 必須在 Decision Log 解釋）
> - [ ] Leading indicators ≥ 2 條，每條含 formula + lag_to_NSM
> - [ ] Counter-metric 至少 1 條，且有 hard threshold（非「再評估」）
> - [ ] Decision Log ≥ 1 條，rejected reason 必須包含 Goodhart 評估
> - [ ] 無 YAML / JSON schema 輸出（北極星指標是給人讀的 markdown）
```

```template-full
---
doc_type: "north-star"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["persona", "jtbd", "value-hypothesis"]
  optional: ["competitive-scan", "user-research"]
---

# North Star Metric: <product-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / 數據團隊 / 商業團隊

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。本卡是全團隊對齊的決策中樞，**NSM 必須是使用者價值代理指標**，不能是 vanity metric（DAU、註冊數）或 revenue 單獨指標。每結論行內 `（依據：persona §XXX / JTBD-NNN / metric §YYY / analytics §ZZZ）`；每量化欄位 `[H/M/L]` badge；**counter-metric 必填**（至少 2 條，含 hard threshold）；每個候選 NSM 必須評估 Goodhart 風險並附 anti-Goodhart safeguard；缺資料 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PM · required: always -->

<!-- ai-fill: 3-5 行：NSM 是什麼、為何代表 user value、counter-metric 是什麼、預期 leading→NSM lag -->

<3-5 行說明>

> **TL;DR:** <一句話：我們的北極星是 <metric>，因為它代表 <user value>，搭配 <counter-metric> 防偏>

---

## 2. North Star Metric
<!-- owner: PM + 數據團隊 · required: always -->

<!-- ai-rule: NSM 必須含 formula（可被 SQL / event tracking 計算）+ measurement method + why_proxy_for_value（為何代表 long-term user value）+ baseline -->

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Name** | <e.g., Weekly Active Teams × Successful Actions> | **[H]** | persona §value + JTBD-001 |
| **Formula** | `weekly_active_teams × successful_action_per_team` | **[H]** | analytics §schema |
| **Measurement method** | <event tracking / DB query / data warehouse> | **[M]** | _TODO: 確認 event 已埋點_ |
| **Current baseline** | <number> | **[M]** | dashboard §XX |
| **Why proxy for value** | <為何代表 long-term user value> | **[H]** | persona §pain + JTBD §success_criteria |

---

## 3. Leading Indicators
<!-- owner: PM + 數據團隊 · required: always -->

<!-- ai-rule: 至少 3 條 leading indicator，每條含 formula + lag_to_NSM（從 leading 變化到 NSM 變化需多久）+ source -->

| # | Name | Formula | Lag to NSM | Confidence | Source |
|---|---|---|---|---|---|
| L1 | D7 activation rate | users completing key action within 7 days / new signups | 2-4 weeks | **[H]** | retention cohort §XX |
| L2 | Habit moment (D14) | users with ≥ N actions by D14 / new signups | 4-6 weeks | **[M]** | _TODO: 確認_ |
| L3 | <leading 3> | <formula> | <X weeks> | **[M]** | — |

---

## 4. Counter-Metrics（anti-Goodhart）
<!-- owner: PM · required: always -->

<!-- ai-rule: 至少 2 條 counter-metric，每條含 prevents（防止什麼作弊）+ hard threshold（破線即觸發 review，不能寫「持續觀察」）-->

| # | Name | Prevents | Hard threshold | Confidence |
|---|---|---|---|---|
| C1 | support tickets per active user | 為了衝活躍推爛功能 | < 0.05 / user / week，破線即暫停 | **[H]** |
| C2 | D30 retention | 為了短期活躍犧牲長期黏著 | 不可低於 baseline 95% | **[H]** |

---

## 5. Input Metrics（squad 拆解）
<!-- owner: PM + 各 squad · required: full-only -->

<!-- ai-rule: 每個 input metric 註明 owner squad + 對 NSM 的影響類型（direct / indirect）-->

| Input metric | Owned by squad | Influence on NSM | Confidence |
|---|---|---|---|
| Signup conversion | Growth | direct | **[H]** |
| Onboarding completion | Activation | direct | **[H]** |
| Feature X adoption | Product | indirect | **[M]** |

---

## 6. Candidate Alternatives & Goodhart Risk
<!-- owner: PM · required: full-only -->

<!-- ai-rule: 列出至少 2 個被拒絕的 NSM 候選 + 每個的 Goodhart 風險評估 + rejection reason -->

| ID | Name | Pros | Cons | Goodhart risk | Rejection reason |
|---|---|---|---|---|---|
| NSM-B | DAU | 簡單可量測 | 高頻不等於 value | **high** | 可被通知轟炸作弊 |
| NSM-C | Revenue per user | 直接連結商業 | lag 太長且鼓勵榨取 | **high** | 違反「user value proxy」原則 |

---

## 7. Business Model Link
<!-- owner: PM + 商業團隊 · required: full-only -->

<!-- ai-rule: 必須說明 NSM 上升如何帶動 ARR / LTV；free → paid 路徑須具體 -->

- **Revenue correlation:** <NSM 上升 1 unit 預期帶動 ARR $X>
- **Monetization path:** <free → paid 路徑：signup → activation → habit → upgrade>
- **Source:** <商業模式 canvas §XX>
- **Confidence:** **[M]**

---

## 8. Anti-Goodhart Safeguards
<!-- owner: PM + 數據團隊 · required: full-only -->

<!-- ai-rule: 至少 2 條 safeguard，每條必須是「可執行的 hard mechanism」，不是「希望大家不要作弊」 -->

- 🛡️ **NSM 與 retention 同步追蹤**：retention 下降 > 5% 即觸發 review，暫停 NSM 相關優化
- 🛡️ **Counter-metric hard threshold**：C1 / C2 任一破線，自動觸發 incident review
- 🛡️ **每季 NSM 健檢**：對齊 user value 假設是否仍成立（用 retention cohort 驗證）

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <e.g., NSM event 尚未埋點，baseline 不可信> — **Mitigation:** 數據團隊 sprint 1 補齊 — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <尚未解的問題>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: PM · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason（含 Goodhart 評估）-->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 選哪個 NSM | NSM_A / NSM_B / NSM_C | NSM_A | NSM_B (Goodhart 高，DAU 可被通知作弊)、NSM_C (lag > 6 個月) | **[H]** |
| YYYY-MM-DD | counter-metric 閾值 | strict / loose | strict | loose (容易破線後仍不停) | **[M]** |

---

## 11. Out of Scope
<!-- owner: PM · required: full-only -->

本北極星指標文件 **不處理**：

- ❌ **不做團隊 KPI 分解** — 屬 OKR cascade 卡
- ❌ **不做 salary / bonus 公式對齊** — 屬 HR comp design
- ❌ **不算廣告 CAC / ROAS** — 屬 marketing analytics

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的 retention cohort / payment funnel / churn 訪談>

### TODO（缺資料）

- _TODO: 需要 retention cohort 校準 lag_to_NSM 估計_
- _TODO: 確認 NSM event 已埋點且資料品質可信_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] NSM 含 formula + measurement method + baseline + why_proxy_for_value
> - [ ] NSM 不是純 revenue 指標（若是 revenue 必須在 Decision Log 解釋）
> - [ ] Leading indicators ≥ 3 條，每條含 formula + lag_to_NSM
> - [ ] Counter-metrics ≥ 2 條，每條有 hard threshold（非「再評估」「持續觀察」）
> - [ ] Candidate alternatives 至少 2 個被拒絕候選 + Goodhart 風險評估
> - [ ] Anti-Goodhart safeguards ≥ 2 條可執行 hard mechanism
> - [ ] Input metrics 段每條註明 owner squad
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason（含 Goodhart 評估）
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（北極星指標是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出北極星指標 markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 persona.md / jtbd.md / 商業模式 canvas / 現有 metric dashboard 與 baseline 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 把 revenue 當北極星（誘導短期榨取，違反 user value proxy 原則）、counter-metric 寫「持續觀察」（= 沒 hard threshold，等同沒設）、leading indicator 沒寫 lag_to_NSM（= 看不出多久能驗證假設）、Decision Log 沒做 Goodhart 評估（= 黑箱選指標）。AI 若漏這些，自檢清單會抓到並回頭補。
