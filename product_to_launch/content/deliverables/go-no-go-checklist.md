---
title: "Go/No-Go Checklist"
slug: "go-no-go-checklist"
stage: "ship"
roles: ["po", "devops"]
order: 43
hook: "把上線決策從『感覺差不多』變成證據簽核"
when_to_use: "release 影響營收、合規、跨團隊或對外承諾時"
ai_leverage: "用 Claude 從 Release Plan 抽出尚未完成的證據項"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Verification, §Deployment"
---

## 解決什麼問題

Release 失敗大多不是技術問題，是「以為某項已完成但其實沒人簽」。Go/No-Go 強迫每個關鍵維度有明確 yes/no 與證據連結。

## 誰負責、和誰對接

- **主責：** PO 主持會議，DevOps 提供技術證據
- **協作：** QA、SRE、Security、Customer Success
- **下游收件：** 上線授權、Rollback 觸發條件

## 何時用、何時不用

- ✅ **必要時機：** 任何 P0/P1 release
- ❌ **不需要時：** flag 控制小改、純文案
- ⚠️ **常見誤用：** 變成 30 人會議；勾選但無證據連結

## AI 怎麼加速

把 Release Plan + Test Plan + Runbook + 合規清單整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審決策權限與 fallback**。本卡輸出**真實 Go/No-Go markdown 文件**（6 維度 checkbox 表格、evidence link、blocker 表），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本** 給單一團隊 / 內部 release / 低合規場景用，**完整範本** 給跨團隊 / 對外產品 / SOC 2 / GDPR / PCI 合規場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "go-no-go-checklist"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["release-plan", "test-results"]
  optional: ["runbook"]
---

# Go/No-Go Checklist: <release-name>

**Status:** Draft v0.X · **Owner:** <PO name> · **Last updated:** YYYY-MM-DD · **Meeting:** <ISO 8601>

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 3, 4, 10），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每個 criterion 必須有 evidence_link（URL / doc ref），無連結者標 `_TODO_` 並列 owner；每結論 `[H]/[M]/[L]` badge；任何 fail / pending 必須在 Blockers 段重述並列 ETA + owner。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，會議主席 30 秒讀完。寫「目前綠燈幾項、紅燈幾項、最大 blocker、建議 outcome」 -->

<3-5 行說明>

> **TL;DR:** <一句話：建議 GO / NO_GO / CONDITIONAL_GO + 主因>

---

## 2. Criteria（4 核心維度）

<!-- ai-rule: 輕量版至少含 functional / ops / security / comms 四維度；compliance 可在 Notes 註明「不適用 — 依據：XXX」 -->

### Functional

- [ ] **F-1:** 所有 P0 user story 通過 acceptance — Evidence: <URL> · Owner: QA · **[H]**
- [ ] **F-2:** 已知 S1/S2 defect = 0 — Evidence: <URL> · Owner: QA · **[H]**

### Ops

- [ ] **O-1:** Runbook 演練完成 — Evidence: <URL> · Owner: SRE · **[H]**
- [ ] **O-2:** On-call 就位 + rollback plan link 有效 — Evidence: <URL> · Owner: SRE · **[H]**

### Security

- [ ] **S-1:** SAST high = 0 · SCA critical = 0 — Evidence: <URL> · Owner: Security · **[H]**
- [ ] **S-2:** Secret 政策驗收 — Evidence: <URL> · Owner: Security · **[M]**

### Comms

- [ ] **C-1:** Internal comms 已排程 — Evidence: <URL> · Owner: PO · **[H]**
- [ ] **C-2:** CS playbook 就緒 — Evidence: <URL> · Owner: CS · **[M]**

---

## 3. Blockers

<!-- ai-rule: 任何 fail / pending 必須在這裡重述 + 列 ETA + owner + severity -->

| Criterion | Reason blocking | Owner | ETA | Severity |
|---|---|---|---|---|
| <id> | <why> | <role> | <hours / TODO> | P0 / P1 / P2 |

---

## 4. Decision Record

<!-- ai-rule: outcome 三選一 GO / NO_GO / CONDITIONAL_GO；CONDITIONAL_GO 必列條件 -->

- **Outcome:** GO / NO_GO / **CONDITIONAL_GO** ✅
- **Conditions（若 CONDITIONAL_GO）：**
  - <條件 1>
  - <條件 2>
- **Recorded by:** <role + name>
- **Timestamp:** <ISO 8601>
- **Fallback date:** <ISO 8601 + TZ>（若 NO_GO）

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | CONDITIONAL_GO 還是 NO_GO | GO / NO_GO / CONDITIONAL_GO | CONDITIONAL_GO | NO_GO (延期成本 > S2 風險)、GO (S2 未解) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 3, 4, 10）
> - [ ] 4 維度 criteria（functional / ops / security / comms）每維度 ≥ 1 條
> - [ ] 每 criterion 用 `- [ ]` checkbox + evidence link + owner + `[H/M/L]`
> - [ ] 任何 fail / pending 在 Blockers 段重述 + ETA + owner
> - [ ] Decision Record 含 outcome + conditions（若 CONDITIONAL_GO） + timestamp
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "go-no-go-checklist"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["release-plan", "test-results", "runbook", "compliance-policy"]
  optional: ["uat-signoff", "perf-report"]
---

# Go/No-Go Checklist: <release-name>

**Status:** Draft v0.X · **Owner:** <PO name> · **Last updated:** YYYY-MM-DD · **Meeting:** <ISO 8601> · **Chair:** <PO> · **Audit trail:** <URL>

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。6 維度 criteria（functional / performance / security / ops / comms / compliance）全部要列；compliance 任一維度不適用必須說明為何（不能直接砍）。每 criterion 必須有 evidence_link（URL / doc ref），無連結者標 `_TODO_` 並列 owner；每結論 `[H/M/L]` badge；任何 fail / pending 必須在 Blockers 段重述並列 ETA + severity + owner；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PO · required: always -->

<!-- ai-fill: 3-5 行，會議主席 30 秒讀完。寫「目前綠燈幾項、紅燈幾項、最大 blocker、建議 outcome」 -->

<3-5 行說明>

> **TL;DR:** <一句話：建議 GO / NO_GO / CONDITIONAL_GO + 主因>

---

## 2. Functional Criteria
<!-- owner: QA + PO · required: always -->

<!-- ai-rule: 每條對應一個 P0 acceptance；fail 必須在 Blockers 段重述 -->

- [ ] **F-1:** 所有 P0 user story 通過 acceptance — Evidence: <URL> · Owner: QA · **[H]**
- [ ] **F-2:** UAT 簽核完成 — Evidence: <URL> · Owner: PO · **[H]**
- [ ] **F-3:** 已知 S1 defect = 0 · S2 ≤ <N> — Evidence: <URL> · Owner: QA · **[H]**

---

## 3. Performance Criteria
<!-- owner: SRE + Dev · required: always -->

- [ ] **P-1:** p95 latency < <ms> under expected load — Evidence: <load test URL> · Owner: SRE · **[H]**
- [ ] **P-2:** error rate < <%> at peak — Evidence: <URL> · Owner: SRE · **[H]**
- [ ] **P-3:** saturation headroom ≥ 30% — Evidence: <URL> · Owner: SRE · **[M]**

---

## 4. Security Criteria
<!-- owner: Security · required: always -->

- [ ] **S-1:** SAST high = 0 · SCA critical = 0 — Evidence: <URL> · Owner: Security · **[H]**
- [ ] **S-2:** Secret scan clean · 無 hardcoded credentials — Evidence: <URL> · Owner: Security · **[H]**
- [ ] **S-3:** SBOM 已生成 + 簽章 valid — Evidence: <URL> · Owner: DevOps · **[H]**
- [ ] **S-4:** Threat model 評估完成 — Evidence: <URL> · Owner: Security · **[M]**

---

## 5. Ops Criteria
<!-- owner: SRE + DevOps · required: always -->

- [ ] **O-1:** Runbook 演練完成 — Evidence: <URL> · Owner: SRE · **[H]**
- [ ] **O-2:** Rollback plan link 有效 + 演練過 — Evidence: <URL> · Owner: DevOps · **[H]**
- [ ] **O-3:** On-call schedule confirmed (24h 覆蓋) — Evidence: <URL> · Owner: SRE · **[H]**
- [ ] **O-4:** Observability 4 件齊（metric / log / trace / dashboard） — Evidence: <URL> · Owner: SRE · **[H]**

---

## 6. Communications Criteria
<!-- owner: PO + CS · required: always -->

- [ ] **C-1:** Internal comms（#releases）已排程 T-24h / T-1h / T+0 — Evidence: <URL> · Owner: PO · **[H]**
- [ ] **C-2:** External comms（status page / email）已草擬 — Evidence: <URL> · Owner: PO · **[M]**
- [ ] **C-3:** CS playbook 就緒 + escalation path 清楚 — Evidence: <URL> · Owner: CS · **[M]**

---

## 7. Compliance Criteria
<!-- owner: Security + Legal · required: always · skippable: 純內部工具可標「不適用 — 依據：XXX」 -->

<!-- ai-rule: SOC 2 / GDPR / PCI / HIPAA / WCAG 任一適用即必填；不適用必須說明為何 -->

- [ ] **CP-1:** GDPR DPIA 簽核（若處理 PII） — Evidence: <URL> · Owner: Legal · **[H]**
- [ ] **CP-2:** SOC 2 control evidence 已歸檔 — Evidence: <URL> · Owner: Security · **[H]**
- [ ] **CP-3:** PCI-DSS scope review（若處理卡號） — Status: n/a — 依據：無卡號流經本服務 · **[H]**
- [ ] **CP-4:** WCAG 2.2 AA a11y 驗收 — Evidence: <URL> · Owner: UX · **[M]**

---

## 8. Blockers & Decision Makers
<!-- owner: PO · required: always -->

### Blockers

| Criterion | Reason blocking | Owner | ETA | Severity |
|---|---|---|---|---|
| <id> | <why> | <role> | <hours / TODO> | P0 / P1 / P2 |

### Decision makers

- **Primary（簽 outcome）：** <role + name>
- **Secondary（quorum）：** [<role 1>, <role 2>, <role 3>]
- **Quorum required:** <N>
- **Signature method:** <e-sign / 會議紀錄 / Slack thread emoji>

---

## 9. Decision Record & Fallback
<!-- owner: PO · required: always -->

<!-- ai-rule: outcome 三選一；CONDITIONAL_GO 必列具體條件與 deadline -->

### Decision

- **Outcome:** GO / NO_GO / **CONDITIONAL_GO** ✅
- **Conditions（若 CONDITIONAL_GO）：**
  - [ ] <條件 1 + deadline>
  - [ ] <條件 2 + deadline>
- **Recorded by:** <role + name>
- **Timestamp:** <ISO 8601>
- **Audit trail:** <URL>

### Fallback

- **Next attempt:** <ISO 8601 + TZ>
- **Prerequisites for next attempt:**
  - <prerequisite 1>
  - <prerequisite 2>

---

## 10. Decision Log & Out of Scope
<!-- owner: PO · required: always -->

<!-- ai-rule: 每條 ≥ 2 個 rejected options + 各自 reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | outcome 抉擇 | GO / NO_GO / CONDITIONAL_GO | CONDITIONAL_GO | NO_GO (延期成本 > S2 風險)、GO (S2 未解 = 用戶風險) | **[H]** |
| YYYY-MM-DD | compliance scope | 含 PCI vs 不含 | 不含 PCI | 含 PCI (本 release 無卡號流經，scope 浪費) | **[H]** |

### Out of Scope

本 checklist **不處理**：

- ❌ **日常 standup 與 sprint 決策** — 屬 PO backlog
- ❌ **長期 roadmap 與 OKR 對齊** — 屬 strategy 卡
- ❌ **技術債清單** — 屬 architecture review 卡

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] 6 維度 criteria 全部列（functional / performance / security / ops / comms / compliance）
> - [ ] 每 criterion 用 `- [ ]` checkbox + evidence link + owner + `[H/M/L]`
> - [ ] Compliance 不適用維度寫明「依據：XXX」（不能直接砍）
> - [ ] 任何 fail / pending 在 Blockers 段重述 + ETA + severity + owner
> - [ ] Decision makers 含 primary / secondary / quorum / signature_method
> - [ ] Decision Record 含 outcome + conditions（若 CONDITIONAL_GO） + audit_trail
> - [ ] Fallback 含 next_attempt + prerequisites
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Go/No-Go Checklist markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 release-plan.md / test-results / runbook / compliance policy 全文）
⏫
```

> [!TIP]
> **常見錯誤：** criterion 勾選但無 evidence link（變黑箱）、compliance 維度直接砍不寫「不適用 — 依據：XXX」、Blockers 不列 ETA 與 owner（決策無法收斂）、CONDITIONAL_GO 條件沒 deadline（無限期掛著）、Fallback 沒 prerequisites（下次照樣卡）。AI 若漏這些，自檢清單會抓到並回頭補。
