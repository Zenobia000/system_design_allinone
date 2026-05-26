---
title: "UAT · 使用者驗收測試"
slug: "uat"
stage: "ship"
roles: ["qa", "po"]
order: 42
hook: "用使用者語言確認『這真的是我們要的』"
when_to_use: "需求由外部使用者或業務單位定義，且接受度有爭議時"
ai_leverage: "用 Claude 把 PRD 翻成使用者腳本與情境步驟"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Verification"
---

## 解決什麼問題

QA 驗的是「功能對不對」，UAT 驗的是「業務拿到能不能用」。兩者證據不可互相替代，否則上線後才發現流程斷裂。

## 誰負責、和誰對接

- **主責：** QA + PO 協調，業務單位執行
- **協作：** UX 提供 journey、Dev 修缺陷
- **下游收件：** Go/No-Go、release notes 中的已知限制

## 何時用、何時不用

- ✅ **必要時機：** 對外產品、合約交付、跨部門流程
- ❌ **不需要時：** 內部技術重構、不影響使用者行為的優化
- ⚠️ **常見誤用：** UAT 變成第二輪 QA；情境腳本沒對齊真實業務

## AI 怎麼加速

把 PRD + user journey + 業務規則整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 sign-off 權限與 defect 嚴重度判定**。本卡輸出**真實 UAT Plan markdown 文件**（用業務語言寫的 scenario 表、defect severity matrix、簽核框架），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本** 給小型功能 / 內部業務 / 單一 persona 場景用，**完整範本** 給對外產品 / 合約交付 / 跨部門流程 / 合規驗收場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "uat"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "user-journey"]
  optional: ["business-rules"]
---

# UAT Plan: <feature-name>

**Status:** Draft v0.X · **Owner:** <QA + PO> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 7, 10），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：prd §XXX / journey §YYY）`；每量化欄位加 `[H]/[M]/[L]` confidence badge；scenario 步驟必須用業務語言（不出現 API / endpoint / payload 等技術詞）；每個 P0 acceptance criterion 都要有對應 scenario。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，業務主管 30 秒讀完。寫「驗收 N 個 scenario、預估 X 天、最大 risk」 -->

<3-5 行說明>

> **TL;DR:** <一句話：驗收什麼 + 誰簽 + 何時完成>

---

## 2. Scenarios

<!-- ai-rule: 3-5 個 P0 scenario 為宜。每個含 persona / precondition / steps（≤ 7）/ expected / priority -->

### UAT-001: <業務情境一句話>

- **Persona:** <對應 journey persona>
- **Priority:** **P0** · **Confidence:** **[H]**
- **Precondition:**
  - <state 1>
  - <state 2>
- **Steps（用業務語言）：**
  1. <step 1>
  2. <step 2>
  3. <step 3>
- **Expected:** <業務可判斷的結果>
- **Sign-off:** [ ] Pass / [ ] Fail — Tester: ___ Date: ___
- **Source:** prd §FR-1 + journey §stage-2

### UAT-002 / UAT-003

<同格式>

---

## 3. Data Setup

<!-- ai-rule: 三件齊全（test_accounts / seed_data / environment） -->

| Item | Spec |
|---|---|
| Test accounts | <role + permission level> |
| Seed data | <dataset + 來源> |
| Environment | UAT URL: <URL> |
| Reset strategy | <how to reset between runs> |

---

## 5. Defect Severity Matrix

<!-- ai-rule: 至少 3 級（S1 / S2 / S3）；S1 必含核心流程無法完成的定義 -->

| Severity | Definition | SLA hours | Escalation |
|---|---|---|---|
| S1 (blocker) | 核心流程無法完成 | 4h | → Dev Lead → PO |
| S2 (major) | workaround 存在但成本高 | 24h | → Dev Lead |
| S3 (minor) | UI / 文案 / 邊緣情境 | 72h | → Dev |

---

## 7. Sign-off Authority

<!-- ai-rule: primary + signature_method 必填 -->

- **Primary signer:** <role + name>
- **Quorum:** 1（或 N，視情境）
- **Signature method:** e-sign / 會議紀錄 / Slack thread emoji

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | scenario 粒度 | 端到端 vs 模組化 | 端到端 | 模組化 (與 QA test 重疊、不驗業務流程) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 7, 10）
> - [ ] 每個 scenario 含 persona / precondition / steps（≤7）/ expected / sign-off
> - [ ] Scenario 步驟全用業務語言（無 API / endpoint / payload）
> - [ ] 每個 P0 acceptance criterion 有對應 scenario
> - [ ] Defect matrix 至少 S1 / S2 / S3 三級 + SLA + escalation
> - [ ] Sign-off authority 含 signer + signature_method
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "uat"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "user-journey", "business-rules"]
  optional: ["compliance-policy", "a11y-spec"]
---

# UAT Plan: <feature-name>

**Status:** Draft v0.X · **Owner:** <QA + PO> · **Last updated:** YYYY-MM-DD · **Reviewers:** UX / Dev Lead / 業務主管

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。每結論行內 `（依據：prd §XXX / journey §YYY / business-rules §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；scenario 步驟全用業務語言（無 API / endpoint / payload）；每個 P0 acceptance criterion 都要有對應 scenario；合規與 a11y 必須涵蓋（不適用必須說明為何，不能直接砍）；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: QA + PO · required: always -->

<!-- ai-fill: 3-5 行，業務主管 30 秒讀完。寫「驗收 N 個 scenario、預估 X 天、簽核 role、最大 risk」 -->

<3-5 行說明>

> **TL;DR:** <一句話總結>

---

## 2. Scenarios
<!-- owner: QA + PO · required: always -->

<!-- ai-rule: 5-10 個 scenario（涵蓋所有 P0 acceptance）。每個含 persona / precondition / steps（≤7）/ expected / priority / source -->

### UAT-001: <業務情境一句話>

- **Persona:** <對應 journey persona>
- **Priority:** **P0** · **Confidence:** **[H]**
- **Precondition:**
  - <state 1>
  - <state 2>
- **Steps（用業務語言）：**
  1. <step 1>
  2. <step 2>
  3. <step 3>
- **Expected:** <業務可判斷的結果>
- **Sign-off:** [ ] Pass / [ ] Fail — Tester: ___ Date: ___ Notes: ___
- **Source:** prd §FR-1 + journey §stage-2

### UAT-002 ~ UAT-N

<同格式逐筆填>

---

## 3. Data Setup
<!-- owner: QA + Dev · required: always -->

<!-- ai-rule: 四件齊全（test_accounts / seed_data / environment / reset_strategy） -->

| Item | Spec | Owner |
|---|---|---|
| Test accounts | <role × permission level table> | QA |
| Seed data | <dataset + 來源 + 筆數> | Dev |
| Environment | UAT URL: <URL> | DevOps |
| Reset strategy | <如何在 runs 之間 reset> | QA |

---

## 4. Compliance & A11y Coverage
<!-- owner: PO + UX · required: full-only · skippable: 純內部工具標「不適用 — 依據：XXX」 -->

<!-- ai-rule: GDPR / PCI / WCAG 任一適用即必驗收；不適用必須說明為何 -->

| Aspect | Scenario coverage | Status | Owner |
|---|---|---|---|
| GDPR (PII 流程) | UAT-003, UAT-005 | ready / _TODO_ | Legal |
| WCAG 2.2 AA | UAT-001 keyboard nav · UAT-002 screen reader | ready / _TODO_ | UX |
| PCI-DSS | n/a — 依據：無卡號流經 | — | Security |

---

## 5. Defect Severity Matrix
<!-- owner: QA + PO · required: always -->

<!-- ai-rule: 至少 4 級（S1-S4 或 S1-S3 + cosmetic）；每級含 definition + SLA + escalation -->

| Severity | Definition | SLA | Escalation | 範例 |
|---|---|---|---|---|
| S1 (blocker) | 核心流程無法完成、無 workaround | 4h | → Dev Lead → PO → CTO | <例> |
| S2 (major) | workaround 存在但成本高 | 24h | → Dev Lead → PO | <例> |
| S3 (minor) | UI / 文案 / 邊緣情境 | 72h | → Dev | <例> |
| S4 (cosmetic) | 純視覺、不影響任務 | next sprint | parking lot | <例> |

---

## 6. Sign-off Authority
<!-- owner: PO · required: always -->

<!-- ai-rule: primary + secondary + quorum + signature_method 必填 -->

- **Primary signer:** <role + name>
- **Secondary signers:** [<role 1>, <role 2>]
- **Quorum required:** <N>
- **Signature method:** e-sign（DocuSign） / 會議紀錄 / Slack thread emoji + screenshot
- **Source:** business-rules §sign-off-policy

---

## 7. Escalation Path
<!-- owner: PO · required: always -->

<!-- ai-rule: blocker / dispute / scope creep 三類路徑必填 -->

| Trigger | Path |
|---|---|
| S1 blocker > SLA | Dev Lead → PO → CTO |
| Acceptance dispute | PO（最終決策） |
| Scope creep (新需求) | PO → change-control board |
| Compliance gap | Security → Legal |

---

## 8. Parking Lot
<!-- owner: PO · required: full-only -->

<!-- ai-rule: 列「發現但本輪不處理」的事項 + 下次 review 時間 -->

| Item | Reason deferred | Next review |
|---|---|---|
| <例：S4 文案修正> | 不影響任務完成 | <ISO 8601> |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：業務單位 technical literacy 不足，steps 寫太抽象> — **Mitigation:** 提供範例截圖 — **Owner:** UX
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：跨部門 scenario 由誰簽？>
- [ ] **Q2:** ...

---

## 10. Decision Log & Out of Scope
<!-- owner: PO · required: always -->

<!-- ai-rule: 每條 ≥ 2 個 rejected options + 各自 reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | scenario 粒度 | 端到端 / 模組化 / 混合 | 端到端 | 模組化 (與 QA test 重疊)、混合 (協調成本) | **[H]** |
| YYYY-MM-DD | 簽核機制 | 個人 e-sign / 會議 / Slack emoji | 個人 e-sign | 會議 (排程慢)、Slack (audit 不足) | **[H]** |

### Out of Scope

本 UAT Plan **不處理**：

- ❌ **Unit / integration / contract test** — 屬 QA 階段（test pyramid 底層）
- ❌ **Performance / load / chaos test** — 屬 NFR 驗證
- ❌ **Security pen-test** — 屬 security review 卡

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] 每個 P0 acceptance criterion 有對應 scenario
> - [ ] Scenario 步驟全用業務語言（無 API / endpoint / payload）
> - [ ] 每個 scenario 含 persona / precondition / steps（≤7）/ expected / sign-off field
> - [ ] Compliance & A11y 段已覆蓋或標明「不適用 — 依據：XXX」
> - [ ] Defect matrix 至少 3 級 + SLA + escalation + 範例
> - [ ] Sign-off authority 含 primary / secondary / quorum / signature_method
> - [ ] Escalation path 涵蓋 blocker / dispute / scope creep
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 UAT Plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 prd.md / user-journey.md / 業務規則 / 合規清單 全文）
⏫
```

> [!TIP]
> **常見錯誤：** UAT 變成第二輪 QA（scenario 寫成 API 測試）、步驟出現技術詞讓業務看不懂、defect 嚴重度沒 SLA（拖到上線前才修）、合規 / a11y 維度直接砍不寫「不適用 — 依據：XXX」、簽核權責不明（最後沒人簽）。AI 若漏這些，自檢清單會抓到並回頭補。
