---
title: "Postmortem · 事後回顧"
slug: "postmortem"
stage: "operate"
roles: ["devops"]
order: 48
hook: "把『誰的錯』改寫成『系統的哪個缺口』"
when_to_use: "任何 SEV-1/2 事故、或重複出現的 SEV-3"
ai_leverage: "用 Claude 從 incident report 推系統性根因與改善候選"
art: "/generated/stage-operate.webp"
source: "deep-research-report.md §Operation, Google SRE blameless postmortem"
---

## 解決什麼問題

Postmortem 的目的是讓系統變強，不是讓人變慘。Blameless 不是不負責，是讓改善焦點放在可重複的流程、工具、訓練缺口上。

## 誰負責、和誰對接

- **主責：** Incident Commander 主持，服務 owner 撰寫
- **協作：** 所有事故參與者、Architect 評估設計缺口
- **下游收件：** backlog 改善項、Runbook 更新、訓練計畫

## 何時用、何時不用

- ✅ **必要時機：** SEV-1/2、重複 SEV-3、近錯（near miss）有教學價值
- ❌ **不需要時：** 已知預期事件、無改善空間
- ⚠️ **常見誤用：** 寫成檢討個人；行動項無 owner、無 due date

## AI 怎麼加速

把 incident report + chat log + 監控資料整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解抽 5 Whys 與改善候選，**人工只審根因歸類與行動項可執行性**。本卡輸出**真實 postmortem markdown 文件**（對標 Google SRE blameless postmortem），含表格、5-Whys 鏈、inline `[H/M/L]` confidence badge，**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 SEV-3 / near-miss / 小團隊用，**完整範本**給 SEV-1/2 / 跨團隊 / 需上報高層場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "postmortem"
variant: "light"
status: "draft"
owner: "<IC-or-service-owner>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["incident-report"]
  optional: ["chat-log", "metric-snapshot"]
---

# Postmortem: <INC-NNN · short-title>

**Status:** Draft v0.X · **Owner:** <service owner> · **IC:** <name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：incident-report §XXX / chat-log §YYY）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**Blameless：不寫人名作為根因**，個人錯誤一律歸因為「系統未保護該操作」；action item 必須有 owner + due + 驗收條件。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行 blameless 摘要，給高層 30 秒讀完。不含人名，只談「哪個系統缺口導致什麼影響、改了什麼」 -->

<3-5 行 blameless 說明>

> **TL;DR:** <一句話：根因類別 + 影響範圍 + 最重要的改善>

| Field | Value |
|---|---|
| **Incident ref** | INC-NNN |
| **Severity** | SEV-1 / SEV-2 / SEV-3 |
| **Duration** | <e.g. 2024-XX-XX 14:32 ~ 15:48 UTC, 76 min> |
| **Impact** | <受影響使用者 / 業務功能> |
| **Error budget burn** | <% of 28d budget> |

---

## 2. Root Cause（5 Whys）

<!-- ai-rule: 5 層 why 必須往「系統 / 流程 / 訓練」收斂，不能停在「人沒做 X」 -->

| Layer | Question | Answer | Confidence |
|---|---|---|---|
| Why 1 | What did users observe? | <observed symptom> | **[H]** |
| Why 2 | Why did the symptom appear? | <cause of symptom> | **[H]** |
| Why 3 | Why did that cause exist? | <cause of cause> | **[M]** |
| Why 4 | Why was the system vulnerable? | <systemic gap> | **[M]** |
| Why 5 | Why did the org allow that gap? | <process / training / design 缺口> | **[L]** |

> **Primary cause category:** code / config / capacity / dependency / process / training / monitoring — <choose 1>

---

## 3. What Went Well / Wrong

<!-- ai-rule: 各列至少 2 條，附 source；不寫「某人做得好/不好」，寫流程或工具的訊號 -->

### What went well

- ✅ <signal 1> — incident-report §XX
- ✅ <signal 2> — chat-log §YY

### What went wrong

- ❌ <signal 1> — incident-report §XX
- ❌ <signal 2> — chat-log §YY

---

## 5. Action Items（≤ 3 條）

<!-- ai-rule: 每條必含 owner + due + severity + 驗收條件 + category；無 owner 寫 `_TODO: 待 EM 指派_` 不留空 -->

| ID | Action | Owner | Due | Severity | Category | Success criteria | Confidence |
|---|---|---|---|---|---|---|---|
| AI-001 | <e.g. 加 rollback gate 到 deploy pipeline> | <team> | YYYY-MM-DD | P0 | prevention | <how we know it's done> | **[H]** |
| AI-002 | ... | ... | ... | P1 | detection | ... | **[M]** |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 根因歸類 | capacity / config / dependency | capacity | config (改動點不在本次發布)、dependency (上游無異常) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的：deploy log / DB slow-query log / chat-log 全文>

### TODO（缺資料）

- _TODO: 需要 deploy log 校準 Why 3 的時序歸因_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 10, 12，刻意不連號）
> - [ ] 5 Whys 收斂到系統 / 流程 / 訓練（不停在「人沒做 X」）
> - [ ] **全文 0 個人名作為根因**（blameless）
> - [ ] What went well / wrong 各 ≥ 2 條，附 source
> - [ ] Action items ≤ 3 條，每條有 owner + due + severity + 驗收
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（postmortem 是給人讀的 markdown）
```

```template-full
---
doc_type: "postmortem"
variant: "full"
status: "draft"
owner: "<IC-or-service-owner>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["incident-report", "chat-log", "metric-snapshot"]
  optional: ["runbook-execution-log", "deploy-log"]
---

# Postmortem: <INC-NNN · short-title>

**Status:** Draft v0.X · **Owner:** <service owner> · **IC:** <name> · **Last updated:** YYYY-MM-DD · **Reviewers:** Architect / EM / Training Lead

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Google SRE blameless postmortem 文化、5 Whys / Fishbone 根因分析。每結論行內 `（依據：incident-report §XXX / chat-log §YYY）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**Blameless：寫流程 / 工具 / 訓練 / 設計缺口，不寫人名作為根因**，個人錯誤一律歸因為「系統未保護該操作」；action item 必須有 owner + due + severity + 驗收；prevention 必須覆蓋 detection / response / recovery / prevention 四類；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: IC + Service owner · required: always -->

<!-- ai-fill: 3-5 行 blameless 摘要，給高層 30 秒讀完。不含人名 -->

<3-5 行 blameless 說明：哪個系統缺口、什麼影響、最重要的改善>

> **TL;DR:** <一句話：根因類別 + 影響 + 最重要的改善>

| Field | Value |
|---|---|
| **Incident ref** | INC-NNN |
| **Severity** | SEV-1 / SEV-2 / SEV-3 |
| **Duration** | <ISO timestamps + 總分鐘> |
| **Impact** | <受影響使用者 / 業務 / 收入> |
| **Error budget burn** | <% of 28d budget> |
| **MTTA / MTTR** | <e.g. 8 min / 76 min> |

---

## 2. Root Cause（5 Whys）
<!-- owner: IC · required: always -->

<!-- ai-rule: 5 層 why 必須收斂到系統 / 流程 / 訓練 / 設計缺口；不能停在「人沒做 X」；每層附 evidence -->

| Layer | Question | Answer | Evidence | Confidence |
|---|---|---|---|---|
| Why 1 | What did users observe? | <observed symptom> | ticket §XX | **[H]** |
| Why 2 | Why did the symptom appear? | <cause of symptom> | metric §YY | **[H]** |
| Why 3 | Why did that cause exist? | <cause of cause> | deploy-log §ZZ | **[M]** |
| Why 4 | Why was the system vulnerable? | <systemic gap> | chat-log §AA | **[M]** |
| Why 5 | Why did the org allow that gap? | <process / training / design 缺口> | EM interview | **[L]** |

> **Primary cause category:** code / config / capacity / dependency / process / training / monitoring — <choose 1>

---

## 3. Contributing Factors
<!-- owner: IC + Architect · required: always -->

<!-- ai-rule: 每條標 category（detection / response / recovery / prevention）+ source + confidence -->

| Factor | Category | Source | Confidence |
|---|---|---|---|
| <例：alert 延遲 12 min 才觸發> | detection | metric §X | **[H]** |
| <例：rollback 路徑未自動化> | recovery | runbook §Y | **[M]** |

---

## 4. Timeline
<!-- owner: IC · required: full-only -->

<!-- ai-rule: 用 markdown table 寫，含時刻 + 事件 + 來源；至少含 detection / mitigation / recovery 三個關鍵點 -->

| Time (UTC) | Event | Source |
|---|---|---|
| 14:32 | First user report | ticket-1234 |
| 14:40 | Alert fired | pagerduty §X |
| 14:48 | On-call ack | chat §Y |
| 15:10 | Mitigation R1 applied | chat §Z |
| 15:48 | Service restored | metric §W |

---

## 5. What Went Well / Wrong
<!-- owner: All · required: always -->

<!-- ai-rule: 各列 ≥ 3 條，附 source；談流程 / 工具的訊號，不談個人 -->

### What went well

- ✅ <signal 1> — incident-report §X
- ✅ <signal 2> — chat-log §Y
- ✅ <signal 3> — runbook §Z

### What went wrong

- ❌ <signal 1> — incident-report §X
- ❌ <signal 2> — chat-log §Y
- ❌ <signal 3> — metric §Z

---

## 6. Prevention Categories（4 類覆蓋）
<!-- owner: IC + Architect · required: always -->

<!-- ai-rule: detection / response / recovery / prevention 四類都要有 ≥ 1 條改善；缺一類須在 Rationale 寫明 -->

| Category | Improvement | Linked AI |
|---|---|---|
| **Detection** | <e.g. 加 SLI burn alert> | AI-001 |
| **Response** | <e.g. on-call paging 改路由> | AI-002 |
| **Recovery** | <e.g. rollback 自動化> | AI-003 |
| **Prevention** | <e.g. deploy gate 加 staging soak 30 min> | AI-004 |

---

## 7. Systemic Changes
<!-- owner: Architect · required: full-only -->

<!-- ai-rule: 列出需要的系統 / 流程級改動，含成本與略過風險 -->

| Change | Effort | Risk if skipped |
|---|---|---|
| <e.g. 新增 deploy rollback gate> | <2 weeks · 1 SRE> | <下次同類事故 MTTR 預估 +30 min> |

---

## 8. Blameless Summary
<!-- owner: IC · required: always -->

<!-- ai-rule: ≤ 200 字，給高層讀，不含人名，敘事而非條列 -->

<段落，不含人名，描述：什麼系統缺口 + 影響 + 改了什麼 + 預期下次效果>

---

## 9. Action Items（≤ 5 條）
<!-- owner: EM · required: always -->

<!-- ai-rule: 每條必含 owner + due + severity + category + 驗收條件；無 owner 寫 `_TODO: 待 EM 指派_`，不留空 -->

| ID | Action | Owner | Due | Severity | Category | Success criteria | Confidence |
|---|---|---|---|---|---|---|---|
| AI-001 | <e.g. 加 SLI burn alert> | <team> | YYYY-MM-DD | P0 | detection | <how we know> | **[H]** |
| AI-002 | ... | ... | ... | P1 | response | ... | **[M]** |
| AI-003 | ... | ... | ... | P1 | recovery | ... | **[M]** |
| AI-004 | ... | ... | ... | P2 | prevention | ... | **[M]** |

---

## 10. Decision Log
<!-- owner: IC · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 根因主類別 | capacity / config / dependency | capacity | config (改動點不在本次發布)、dependency (上游無異常) | **[H]** |

---

## 11. Out of Scope
<!-- owner: IC · required: full-only -->

本 Postmortem **不處理**：

- ❌ **個人績效檢討** — 屬 manager 1:1
- ❌ **商業影響精算** — 屬財務
- ❌ **合約罰款計算** — 屬法務

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1：ack 延遲歸因於 alert fatigue 而非 paging 設定>
  - <假設 2：rollback 失敗歸因於權限缺口>
- **Highest-value next input:** <下一份最該補的：deploy log / DB slow-query log / 完整 chat-log>

### TODO（缺資料）

- _TODO: 需要 deploy log 校準 Why 3 時序歸因_
- _TODO: 補 AI-003 owner（待 EM 指派）_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 5 Whys 收斂到系統 / 流程 / 訓練 / 設計（不停在「人沒做 X」）
> - [ ] **全文 0 個人名作為根因**（blameless）— 個人錯誤歸因為「系統未保護該操作」
> - [ ] Timeline 含 detection / mitigation / recovery 三關鍵時間點
> - [ ] What went well / wrong 各 ≥ 3 條，附 source
> - [ ] Prevention 4 類（detection / response / recovery / prevention）都有 ≥ 1 條
> - [ ] Action items ≤ 5 條，每條有 owner + due + severity + category + 驗收
> - [ ] Blameless Summary ≤ 200 字、不含人名、敘事體
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（postmortem 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 postmortem markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 incident report / chat log 全文 / metric dashboard 截圖摘要 / runbook 執行紀錄全文）
⏫
```

> [!TIP]
> **常見錯誤：** 把根因寫成人名（= blameful，違反 Google SRE 文化）、5 Whys 停在 Why 2（沒往系統面收斂）、action item 無 owner 或無 due（= 永遠不會做）、Prevention 4 類沒全覆蓋（偏 detection 不修 recovery）、Decision Log 只列 chosen 不列 rejected。AI 若漏這些，自檢清單會抓到並回頭補。
