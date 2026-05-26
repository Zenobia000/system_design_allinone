---
title: "Stakeholder Map"
slug: "stakeholder-map"
stage: "define"
roles: ["pm", "ba"]
order: 15
hook: "把「誰該知道、誰能決策、誰會擋」一張圖看完"
when_to_use: "跨部門新功能、合規/稽核專案、敏感資料變更時"
ai_leverage: "用 Claude 從組織架構 + 專案 scope → stakeholder 分類與溝通節奏"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

專案做到一半被法遵卡、被資安卡、被某副總卡，通常不是這些人故意找碴，是 PM 一開始就**沒把他們列為 stakeholder**。
Stakeholder Map 在 discovery 結束前把「誰影響專案、誰被專案影響、誰要被通知、誰要簽核」攤平。
沒這張圖，後期升級衝突會吃掉整個 sprint。

## 誰負責、和誰對接

- **主責：** BA（盤點與分類）/ PM（決策溝通節奏）
- **協作：** 各部門代表（驗證自身角色）、PMO（補組織視角）
- **下游收件：** PM 規劃溝通、PO 排簽核節點、QA/SRE 列受影響系統

## 何時用、何時不用

- ✅ **必要時機：** 跨部門新功能、合規/稽核專案、變更影響 ≥ 3 個團隊
- ❌ **不需要時：** 單一團隊內部優化、bug fix
- ⚠️ **常見誤用：** 只列「會吵的人」，漏掉沉默但有否決權的角色（資安、法遵、稽核）；應用 **interest × influence 矩陣**分類

## AI 怎麼加速

把組織架構 + 專案 scope + 過往相似案的衝突紀錄整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審是否漏掉沉默否決者**。本卡輸出**真實 stakeholder map markdown 文件**（含 power/interest 矩陣、RACI 表、溝通節奏表、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給單部門 / 跨 3-5 個 stakeholder 用，**完整範本**給跨部門 / 合規稽核專案 / stakeholder ≥ 10 人 + 外部監管場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "stakeholder-map"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["org-chart", "project-scope"]
  optional: ["past-conflict-log"]
---

# Stakeholder Map: <project-name>

**Status:** Draft v0.X · **Owner:** <BA / PM name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 5, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。**必須標 ≥ 2 個「沉默但有否決權」角色**（資安 / 法遵 / 稽核 / DPO / 內控），漏標的負面後果是上線前一週被否決全部重做。每個 stakeholder 必標 power × interest 一組座標 + decision scope。每結論 `（依據：org-chart §X / 過往升級 §Y）`；缺資料寫 `_TODO: 需要 XXX_` 不編造。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：總 stakeholder 數、沉默否決者數、最高風險的 likely blocker、最強 ally -->

<3-5 行說明>

> **TL;DR:** <一句話：本專案 3 個必須對齊 + 2 個必須 brief 的關鍵角色>

---

## 2. Stakeholder List（含 power × interest）

<!-- ai-rule: 必涵蓋內部 / 橫向 / 外部三類至少各 1。Silent veto risk 必標 ≥ 2 個（資安 / 法遵 / 稽核 / DPO / 內控）-->

| ID | Name / Role | Org unit | Category | Power | Interest | Concerns | Decision scope | Silent veto? | Source | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| SH-001 | <PM-X> | Product | internal-business | **high** | **high** | scope creep | scope sign-off | no | org §1 | **[H]** |
| SH-002 | <資安主管> | Security | horizontal-compliance | **high** | **mid** | 個資外洩 | security review veto | **yes** | 過往否決 §2 | **[H]** |
| SH-003 | <法遵> | Legal | horizontal-compliance | **high** | **low** | GDPR 違規 | compliance sign-off | **yes** | 法遵 SOP | **[M]** |
| SH-004 | <DevOps lead> | Engineering | internal-eng | mid | high | infra capacity | infra approval | no | org §2 | **[H]** |
| SH-005 | <key 客戶 X> | (external) | external-customer | mid | high | 上線 timeline | — | no | 合約 §1 | **[H]** |

---

## 5. RACI（key deliverables）

<!-- ai-rule: 每行對應具體 deliverable / decision，不可給角色一個總體 R/A/C/I -->

| Deliverable / Decision | R | A (唯一) | C | I |
|---|---|---|---|---|
| Scope sign-off | SH-001 | SH-001 | SH-002, SH-003 | SH-004, SH-005 |
| 個資處理流程簽核 | SH-002 | SH-003 | SH-001 | SH-004 |
| Go-live approval | SH-001 | <主管> | SH-002, SH-003 | SH-005 |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | <例：法遵是否列為沉默否決者> | 列 yes / 列 no / 列 partial | yes | no (過往 3 個專案被否決)、partial (concerns 不明確) |

---

## 12. Confidence & Sources & TODO

- **最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1，例：法遵主管職掌不變>
- **Highest-value next input:** <PMO 治理文件 / 法遵簽核紀錄 / 過往升級 ticket 三選一>

### TODO（缺資料）

- _TODO: 需要確認 SH-003 法遵當前簽核權範圍_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 5, 10, 12，刻意不連號）
> - [ ] 三類別齊全（internal-business / internal-eng / horizontal-compliance / external 至少各 1）
> - [ ] ≥ 2 個 stakeholder 標 `silent veto = yes`
> - [ ] 每個 stakeholder 標 power × interest 一組座標
> - [ ] RACI 每行對應具體 deliverable / decision（不是籠統角色）
> - [ ] 每結論帶 `[H/M/L]` badge + `（依據：...）` 引用
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（map 是給人讀的 markdown）
```

```template-full
---
doc_type: "stakeholder-map"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["org-chart", "project-scope", "past-conflict-log"]
  optional: ["pmo-governance-doc", "compliance-signoff-history", "escalation-tickets"]
---

# Stakeholder Map: <project-name>

**Status:** Draft v0.X · **Owner:** <BA / PM name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PMO / 法遵 / 資安

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。**必須涵蓋三類別**：內部（業務 / 工程 / 設計）+ 橫向（資安 / 法遵 / 稽核 / 財務）+ 外部（客戶 / 監管 / 廠商）；任一類別缺項要說明為何不適用。**必須標 ≥ 2 個「沉默但有否決權」角色**（資安 / 法遵 / 稽核 / DPO / 內控），漏標的負面後果是上線前一週被否決全部重做。Interest × influence 用高 / 中 / 低三級，每個 stakeholder 必標一組座標。RACI 必須對應到具體 deliverable / decision，不可只給角色一個總體 R/A/C/I。每結論 `（依據：org-chart §X / 過往升級 §Y / 法遵 SOP §Z）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: BA + PM · required: always -->

<!-- ai-fill: 3-5 行：總 stakeholder 數、三類別分佈、沉默否決者數、最高風險 likely blocker、最強 ally、最不確定的決策權 -->

<3-5 行說明>

> **TL;DR:** <一句話：本專案 N 個必須對齊 + M 個必須 brief 的關鍵角色 + K 個沉默否決者>

---

## 2. Stakeholder List
<!-- owner: BA · required: always -->

<!-- ai-rule: 必涵蓋 internal-business / internal-eng / internal-design / horizontal-compliance / horizontal-finance / external-customer / external-regulator / external-vendor 至少 5 類 -->

| ID | Name / Role | Org unit | Category | Power | Interest | Concerns | Decision scope | Silent veto? | Source | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| SH-001 | <PM-X> | Product | internal-business | **high** | **high** | scope creep | scope + budget sign-off | no | org §1 | **[H]** |
| SH-002 | <資安主管> | Security | horizontal-compliance | **high** | **mid** | 個資外洩、OWASP | security review veto | **yes** | 過往否決 §2 | **[H]** |
| SH-003 | <法遵> | Legal | horizontal-compliance | **high** | **low** | GDPR / 金管會違規 | compliance sign-off | **yes** | 法遵 SOP | **[M]** |
| SH-004 | <稽核> | Internal Audit | horizontal-compliance | mid | **low** | SOC 2 control gap | audit findings sign-off | **yes** | SOC 2 charter | **[M]** |
| SH-005 | <DevOps lead> | Engineering | internal-eng | mid | high | infra capacity | infra approval | no | org §2 | **[H]** |
| SH-006 | <UX lead> | Design | internal-design | mid | high | a11y 完整度 | design system veto | no | org §3 | **[H]** |
| SH-007 | <CFO> | Finance | horizontal-finance | **high** | low | 預算超支 | budget sign-off | no | org §4 | **[H]** |
| SH-008 | <key 客戶 X> | (external) | external-customer | mid | high | 上線 timeline | — | no | 合約 §1 | **[H]** |
| SH-009 | <監管機關> | (external) | external-regulator | **high** | mid | 法規遵循 | regulatory veto | **yes** | 法規 §17 | **[M]** |
| SH-010 | <vendor-X> | (external) | external-vendor | low | mid | SLA compliance | — | no | 合約 §3 | **[H]** |

---

## 3. Power × Interest Matrix
<!-- owner: BA · required: full-only -->

<!-- ai-rule: 視覺化矩陣分四象限，每象限對應一個應對策略 -->

|  | Low Interest | High Interest |
|---|---|---|
| **High Power** | **keep satisfied** (minimal effort, monitor): SH-003 法遵, SH-007 CFO | **manage closely** (key players): SH-001 PM, SH-002 資安, SH-009 監管 |
| **Low Power** | **monitor** (lowest effort): SH-010 vendor | **keep informed**: SH-005 DevOps, SH-006 UX, SH-008 客戶 |

---

## 4. Silent Veto Holders（沉默否決者警示）
<!-- owner: BA + PM · required: always -->

<!-- ai-rule: 列出所有 silent veto = yes 的角色 + 為何沉默 + 過往觸發條件 + 早期介入策略 -->

| Stakeholder | Why silent (不主動發聲原因) | Past trigger / 否決紀錄 | Early engagement strategy | Confidence |
|---|---|---|---|---|
| SH-002 資安 | 等到 review gate 才出手 | 2024 Q3 OAuth 流程被否 | week 1 brief + week 3 design review | **[H]** |
| SH-003 法遵 | 等到 go-live 前合規 check | 2024 Q4 跨境傳輸被否 | week 2 法規 footprint check + 條款引用 | **[H]** |
| SH-004 稽核 | 等到年度 SOC 2 audit | 過往 audit finding 集中 control 缺失 | month 1 control matrix 對齊 | **[M]** |
| SH-009 監管 | 等到送件審查 | <例：金管會曾要求重做 KYC> | pre-filing consultation | **[L]** |

---

## 5. RACI Matrix
<!-- owner: BA + PM · required: always -->

<!-- ai-rule: 每行對應具體 deliverable / decision，A 必須唯一 -->

| Deliverable / Decision | R (Responsible) | A (Accountable, 唯一) | C (Consulted) | I (Informed) |
|---|---|---|---|---|
| Scope sign-off | SH-001 | SH-001 | SH-002, SH-003 | SH-004, SH-005, SH-008 |
| 個資處理流程簽核 | SH-002 | SH-003 | SH-001, SH-005 | SH-004 |
| Budget sign-off | SH-001 | SH-007 | — | SH-008 |
| Compliance sign-off | SH-003 | SH-003 | SH-002, SH-004 | SH-001 |
| Go-live approval | SH-001 | <上級主管> | SH-002, SH-003, SH-004 | SH-005, SH-006, SH-008 |
| Vendor contract | SH-001 | SH-007 | SH-002 (security review), SH-003 | SH-010 |

---

## 6. Communication Cadence
<!-- owner: PM · required: full-only -->

<!-- ai-rule: 每條含 cadence + medium + escalation path -->

| Stakeholder | Cadence | Medium | Escalation path | Source |
|---|---|---|---|---|
| SH-001 PM | weekly | meeting + dashboard | → 部門總監 | org §1 |
| SH-002 資安 | milestone-triggered (design / pre-launch) | written report + meeting | → CISO | security SOP |
| SH-003 法遵 | milestone-triggered (scope / pre-launch) | written report | → 法務長 | 法遵 SOP |
| SH-007 CFO | monthly | dashboard | → CEO | finance review |
| SH-008 客戶 | bi-weekly | meeting + email | → CSM lead | 合約 §1 |
| SH-009 監管 | ad-hoc (pre-filing) | formal letter | → 法務長 → CLO | 監管手冊 |

---

## 7. Blockers, Allies & Swing Voters
<!-- owner: PM · required: full-only -->

### Likely Blockers

| Stakeholder | Expected blocker reason | Mitigation | Confidence |
|---|---|---|---|
| SH-002 資安 | 個資跨境傳輸顧慮 | week 1 brief + 提早做 DPIA | **[H]** |
| SH-009 監管 | KYC 程序變更需報備 | pre-filing 諮詢 + 留 buffer 4 週 | **[M]** |

### Likely Allies

| Stakeholder | Expected support reason | How to leverage |
|---|---|---|
| SH-005 DevOps | infra automation 對齊團隊 OKR | 共擔 capacity，列 co-owner |
| SH-008 客戶 | 等這個 feature 已半年 | 引為案例對 SH-007 證明 ROI |

### Swing Voters

| Stakeholder | Influence strategy |
|---|---|
| SH-007 CFO | 用 SH-008 客戶承諾的 revenue impact 說服 |

---

## 8. Decision Authority Map
<!-- owner: BA · required: full-only -->

| Decision type | Primary sign-off | Veto holder | Escalation |
|---|---|---|---|
| Scope | SH-001 | SH-002, SH-003 | 部門總監 |
| Budget | SH-007 | — | CFO → CEO |
| Compliance | SH-003 | SH-004, SH-009 | 法務長 → CLO |
| Go-live | <上級主管> | SH-002, SH-003 | CTO + CLO |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：SH-009 監管機關回應時間不可控，可能拖 4-8 週> — **Mitigation:** pre-filing consultation + parallel preparation — **Owner:** PM + 法遵
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：SH-004 稽核是否需在 design phase 介入？PMO 待裁示>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: BA + PM · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <例：法遵是否列為沉默否決者> | 列 yes / 列 no / 列 partial | yes | no (過往 3 案被否決)、partial (concerns 不明確、無法早期介入) | **[H]** |
| YYYY-MM-DD | <例：vendor 是否進 RACI> | 進 I / 進 C / 不進 | I | C (無決策權)、不進 (有 SLA 義務需通知) | **[M]** |

---

## 11. Out of Scope
<!-- owner: BA · required: full-only -->

本卡 **不處理**：

- ❌ **跨專案 program governance** — 屬 PMO 卡
- ❌ **員工關係 / 績效衝突** — 屬 HR
- ❌ **純技術評審** — 屬 architect review
- ❌ **長期組織重組規劃** — 屬 org-design 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1，例：SH-009 監管機關態度與去年類似>
  - <假設 2，例：法遵主管職掌不變>
- **Highest-value next input:** <PMO 治理文件 / 法遵簽核紀錄 / 過往升級 ticket>

### TODO（缺資料）

- _TODO: 需要 PMO 確認跨專案 dependency 是否影響 SH-001 決策權_
- _TODO: 需要法遵確認 SH-003 當前簽核 SLA_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 三類別齊全（內部 / 橫向 / 外部），至少 5 個 category 子類有 stakeholder
> - [ ] ≥ 2 個 stakeholder 標 `silent veto = yes`（資安 / 法遵 / 稽核 / DPO / 內控 / 監管）
> - [ ] 每個 stakeholder 標 power × interest 一組座標 + concerns + decision scope
> - [ ] Silent Veto Holders 段每條含「為何沉默 + 過往觸發 + 早期介入策略」
> - [ ] RACI 每行對應具體 deliverable / decision，A 唯一
> - [ ] Communication cadence 每條含 cadence + medium + escalation path
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（map 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 stakeholder map markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 組織架構圖 / 專案 scope（含影響系統 + 資料分類 + 合規依據）/ 過往相似案的衝突與升級紀錄 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只列「會吵的人」漏掉沉默否決者（法遵 / 資安 / 稽核 / DPO / 監管）、RACI 給角色一個總體 R/A/C/I 而非對應具體 deliverable、A 列了多人（A 必須唯一）、power/interest 全部標 high（喪失區分度）、escalation path 漏寫導致衝突無處升級。AI 若漏這些，自檢清單會抓到並回頭補。
