---
title: "Test Plan · 測試計畫"
slug: "test-plan"
stage: "build"
roles: ["qa"]
order: 36
hook: "用一張表決定『要測什麼、不測什麼、誰簽』"
when_to_use: "release 含跨模組變更、合規驗收或對外承諾時"
ai_leverage: "用 Claude 把 acceptance criteria 對應到測試層級"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Verification, ISO/IEC/IEEE 29119"
---

## 解決什麼問題

QA 在 release 前最大的成本不是執行測試，是搞清楚「這次到底要不要測它」。Test Plan 是與 PM/Dev 對焦範疇、層級、退場條件的合約。

## 誰負責、和誰對接

- **主責：** QA Lead
- **協作：** PM/PO 確認 acceptance、Dev 提供變更面、SRE 提供風險面
- **下游收件：** Test cases、Release Gate、Go/No-Go

## 何時用、何時不用

- ✅ **必要時機：** Release 含 schema migration、外部介面變更、合規審查
- ❌ **不需要時：** flag 控制的小改動、純文案
- ⚠️ **常見誤用：** 抄上一版只改日期；exit criteria 寫「全部通過」

## AI 怎麼加速

把 PRD acceptance + 變更面 + 風險面整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己把 AC 對應到五層測試，**人工只審 risk-based 取捨與 exit criteria 可達成性**。本卡輸出**真實 Test Plan markdown 文件**（含 scope 表、五層測試、traceability、exit criteria），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給單 release / sprint / 小範圍變更用，**完整範本** 給跨模組 release / 合規驗收 / 對外承諾場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "test-plan"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "change-list"]
  optional: ["slo-definition"]
---

# Test Plan: <release-or-feature-name>

**Status:** Draft v0.X · **Owner:** <QA Lead> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 6, 9, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：AC-NN / change §X / SLO §Y）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**每條 AC 必須對應 ≥ 1 個 test case**，無對應者標 TODO；exit criteria 禁寫「全部通過」這種空話。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，PM/Dev/QA 30 秒讀完。內容：scope in/out、五層覆蓋狀況、最高風險區、預估執行時程 -->

<3-5 行說明>

> **TL;DR:** <一句話：這個 release 要測什麼、不測什麼、誰簽>

---

## 2. Scope

<!-- ai-rule: in / out 兩列必填，out 必須附 rationale -->

### In scope

- <feature / module 1>
- <feature / module 2>

### Out of scope

- ❌ <thing 1> — Rationale: <why out>
- ❌ <thing 2> — Rationale: ...
- ❌ <thing 3> — Rationale: ...

---

## 3. Test Levels（at least 3 layers）

<!-- ai-rule: 輕量版至少覆蓋 unit + integration + e2e 三層，perf/security 可標 N/A 但要寫 rationale -->

| Level | Owner | Coverage target / scope | Confidence |
|---|---|---|---|
| **Unit** | Dev | <line/branch %> | **[H]** |
| **Integration** | QA + Dev | <contracts list> | **[H]** |
| **E2E** | QA | <critical journeys> | **[M]** |
| **Perf** | N/A | <rationale: 無 perf 敏感變更> | **[H]** |
| **Security** | QA + Security | <若 N/A，rationale> | **[M]** |

---

## 6. Traceability to AC

<!-- ai-rule: 每條 AC 必對應 ≥ 1 個 test case；無對應者標 _TODO_ + 原因 -->

| AC ID | Covered by | Level | Confidence |
|---|---|---|---|
| AC-01 | TC-101, TC-102 | integration | **[H]** |
| AC-07 | _TODO: 尚未設計_ | — | **[L]** |

---

## 9. Risks（top 3）

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <風險描述> — **Mitigation:** <如何降低> — **Owner:** <誰負責>
>
> **R2:** ...
>
> **R3:** ...

---

## 12. Confidence & Sources & TODO

- **整份 plan 最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的 production traffic profile / 合規條文>

### TODO（缺資料）

- _TODO: 需要 staging 環境是否有 PII mask 確認_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 6, 9, 12，刻意不連號）
> - [ ] Scope in/out 兩列齊，out 必附 rationale
> - [ ] Test Levels 至少 3 層，N/A 須寫原因
> - [ ] 每條 AC 對應 ≥ 1 個 test case 或標 _TODO_
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（plan 是給人讀的 markdown）
```

```template-full
---
doc_type: "test-plan"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "change-list", "slo-definition"]
  optional: ["incident-history", "compliance-requirements"]
---

# Test Plan: <release-or-feature-name>

**Status:** Draft v0.X · **Owner:** <QA Lead> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / Dev Lead / SRE / Release Manager

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 ISO/IEC/IEEE 29119 / shift-left / risk-based testing。每結論行內 `（依據：AC-NN / change §X / SLO §Y / incident §Z）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**每條 AC 必須對應 ≥ 1 個 test case**；**五層測試（unit/integration/e2e/perf/security）全列**，N/A 須寫原因；**exit criteria 禁寫「全部通過」**；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: QA Lead · required: always -->

<!-- ai-fill: 3-5 行：scope in/out、五層覆蓋、最高風險區、預估執行時程、Go/No-Go 決策時點 -->

<3-5 行說明>

> **TL;DR:** <一句話：要測什麼、不測什麼、誰簽>

---

## 2. Scope
<!-- owner: QA Lead + PM · required: always -->

<!-- ai-rule: in / out 兩列必填，out 必附 rationale -->

### In scope

- <feature / module 1>
- <feature / module 2>

### Out of scope

- ❌ <thing 1> — Rationale: <why out + 屬哪張卡>
- ❌ <thing 2> — Rationale: ...
- ❌ <thing 3> — Rationale: ...

---

## 3. Test Levels（5 layers）
<!-- owner: QA Lead + Dev + SRE · required: always -->

<!-- ai-rule: 五層全列；任一 N/A 必須寫 rationale；perf / security 不能直接砍 -->

| Level | Owner | Coverage target / scope | Confidence |
|---|---|---|---|
| **Unit** | Dev | line ≥ 80%, branch ≥ 75% | **[H]** |
| **Integration** | QA + Dev | <contracts list> | **[H]** |
| **E2E** | QA | <critical journeys> | **[M]** |
| **Perf** | QA + SRE | load profile / p99 budget | **[M]** |
| **Security** | QA + Security | threat categories / pen test | **[M]** |

---

## 4. Test Data Strategy
<!-- owner: QA + DBA · required: full-only -->

<!-- ai-rule: source / PII handling / refresh policy 三件齊 -->

| Field | Value |
|---|---|
| **Source** | synthetic / masked_prod / golden_dataset |
| **PII handling** | <如何 mask / anonymize> |
| **Refresh policy** | 每 run 還原 / 共用 |
| **Cleanup** | truncate / transaction rollback |

---

## 5. Environment Matrix
<!-- owner: QA + DevOps · required: full-only -->

<!-- ai-rule: 每環境列 purpose / data_set / parity_to_prod -->

| Env | Purpose | Data set | Parity to prod | Confidence |
|---|---|---|---|---|
| dev | unit / integration | fixture | low | **[H]** |
| staging | e2e / perf | masked_prod | high | **[H]** |
| pre-prod | smoke + UAT | masked_prod | very high | **[M]** |

---

## 6. Traceability to AC
<!-- owner: QA Lead · required: always -->

<!-- ai-rule: 每條 AC 必對應 ≥ 1 個 test case；無對應者標 _TODO_ + 原因 -->

| AC ID | Covered by | Level | Confidence |
|---|---|---|---|
| AC-01 | TC-101, TC-102 | integration | **[H]** |
| AC-02 | TC-201 | e2e | **[H]** |
| AC-07 | _TODO: 尚未設計，缺 X 資料_ | — | **[L]** |

---

## 7. Risk-based Prioritization
<!-- owner: QA + SRE · required: full-only -->

<!-- ai-rule: 必列 high-risk areas + 對應 incident ref + 測試努力分配 -->

| Area | Reason | Incident ref | Effort allocation |
|---|---|---|---|
| <schema migration> | 上次 incident X 起因 | INC-2024-03 | 40% |
| <auth path> | 安全敏感 | — | 30% |
| <其他> | <reason> | — | 30% |

---

## 8. Entry / Exit Criteria
<!-- owner: QA Lead + Release Manager · required: always -->

<!-- ai-rule: 禁寫「全部通過」這種空話；每條須機械可驗 -->

### Entry criteria

- [ ] unit 覆蓋 ≥ 80%
- [ ] integration 在 staging 全綠
- [ ] feature flag 已就緒
- [ ] test data refresh 完成

### Exit criteria

- [ ] P0 bug = 0
- [ ] P1 ≤ 2 with mitigation plan
- [ ] perf P99 ≤ SLO + 10%
- [ ] security pen test report signed off
- [ ] 所有 AC 對應 test case 通過

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <例：跳過 perf test 縮短 1 day 但若 P99 退化將觸發 SLO breach> — **Mitigation:** <最低限度 smoke perf> — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：staging 是否真的有 prod 流量 replay？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: QA Lead · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Perf 環境選擇 | staging / dedicated / prod_shadow | staging | dedicated (成本高)、prod_shadow (風險高) | **[H]** |

---

## 11. Out of Scope
<!-- owner: QA Lead · required: full-only -->

本 plan **不處理**：

- ❌ **純 UI 文案修改** — 屬 content review
- ❌ **重做 unit test 已涵蓋的純函式邏輯** — 避免重複
- ❌ **第三方供應商 SLA 驗證** — 屬合約管理
- ❌ **load test 超出 SLO 的極限測試** — 屬 chaos engineering

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份 plan 最低 confidence 項：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <e.g. production traffic profile / 合規條文 / incident postmortem>

### TODO（缺資料）

- _TODO: 需要 DevOps 確認 staging 是否有 PII mask_
- _TODO: 補 AC-07 對應 test case 設計_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Scope in/out 兩列齊，out 必附 rationale
> - [ ] Test Levels 五層全列（unit/integration/e2e/perf/security），N/A 須寫原因
> - [ ] Test Data Strategy 含 source + PII handling + refresh
> - [ ] Environment Matrix 列出 parity_to_prod
> - [ ] 每條 AC 對應 ≥ 1 個 test case 或標 _TODO_ + 原因
> - [ ] Entry / Exit Criteria 禁「全部通過」，每條可機械驗證
> - [ ] Risk-based Prioritization 含 incident ref
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（plan 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Test Plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 PRD acceptance criteria / Dev 提供的變更面 / SRE 的風險面 / SLO / 上次 incident）
⏫
```

> [!TIP]
> **常見錯誤：** 抄上一版只改日期（變儀式）、exit criteria 寫「全部通過」（無法驗）、把 perf/security 直接砍掉沒寫 rationale（漏關鍵層）、AC 沒對應 test case（traceability 黑洞）、test data 沒 PII mask 政策（合規風險）、environment parity 寫太樂觀（staging 不等於 prod）、Decision Log 只列 chosen（變黑箱）、risk-based 取捨無 incident ref（拍腦袋分配）。AI 若漏這些，自檢清單會抓到並回頭補。
