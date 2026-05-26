---
title: "Incident Report · 事故報告"
slug: "incident-report"
stage: "operate"
roles: ["devops"]
order: 47
hook: "事故當下的事實流水帳，不是檢討會"
when_to_use: "達 SEV-1/2 等級或對外可見的服務劣化"
ai_leverage: "用 Claude 從 chatops log 抽 timeline 與 action 摘要"
art: "/generated/stage-operate.webp"
source: "deep-research-report.md §Operation, Google SRE"
---

## 解決什麼問題

事故當下需要的是「現在誰在做什麼、影響範圍、預估恢復時間」的事實紀錄，不是分析。Incident Report 是 Postmortem 的輸入，不是替代品。

## 誰負責、和誰對接

- **主責：** Incident Commander
- **協作：** Scribe 紀錄、Comms 對外通報、on-call 執行
- **下游收件：** Postmortem、Customer Comms、合規

## 何時用、何時不用

- ✅ **必要時機：** SEV-1/2、SLO 燃燒 ≥ 閾值、外部使用者可感劣化
- ❌ **不需要時：** 預期維運、SEV-3 以下
- ⚠️ **常見誤用：** 把分析寫進來；缺時間戳；遺漏外部通報紀錄

## AI 怎麼加速

事故中段把 chatops + alert log + paging 紀錄整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**IC 只審 SEV 等級與對外措辭**。本卡輸出**真實 Incident Report markdown**（含 UTC timeline 表、impact 量化、comms log、inline `[H/M/L]` confidence badge），**不寫 root cause（那是 postmortem 工作）**，**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 SEV-2 或內部可見劣化，**完整範本**給 SEV-1 / 對外通報 / 合規通知（SOC 2 / GDPR）場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "incident-report"
variant: "light"
status: "active"
owner: "<incident-commander>"
last_updated: "YYYY-MM-DDTHH:MM:SSZ"
upstream:
  required: ["chatops-log", "alert-log"]
  optional: ["status-page-comments"]
---

# Incident Report: INC-YYYY-NNNN

**Status:** <investigating / identified / mitigating / monitoring / resolved> · **IC:** <name> · **Last updated:** YYYY-MM-DDTHH:MM:SSZ

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 4, 6, 7），全部必填——刻意沿用完整版章節編號讓兩版可對照。所有時間用 **UTC ISO 8601**；每結論行內加 `（依據：chatlog §XXX / alert §YYY）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造（**ETR 不知就寫 TODO 不准猜時間**）；**只寫事實不寫 root cause**（root cause 屬 postmortem）。

---

## 1. Header

<!-- ai-fill: 事故的基本元資料 -->

| Field | Value | Confidence |
|---|---|---|
| **Incident ID** | INC-YYYY-NNNN | — |
| **Severity** | SEV1 / SEV2 / SEV3 / SEV4 | **[H]** |
| **Detection method** | alert / customer_report / internal_user / synthetic | **[H]** |
| **Current status** | investigating / identified / mitigating / monitoring / resolved | — |
| **ETR (UTC)** | YYYY-MM-DDTHH:MM:SSZ or `_TODO_` | **[M]** |

---

## 2. Owner & Paging Chain

<!-- ai-rule: IC + scribe 必填；comms_lead 在對外通報時必填；paging chain 至少含 first page + ack -->

### Owners

| Role | Name |
|---|---|
| **Incident Commander** | <name> |
| **Scribe** | <name> |
| **Comms lead** | <name or `_TODO_`> |

### Paging chain

| ts (UTC) | Paged | Ack ts (UTC) | Source |
|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | YYYY-MM-DDTHH:MM:SSZ | pager §1 |
| YYYY-MM-DDTHH:MM:SSZ | DB lead | _TODO_ | pager §2 |

---

## 3. Timeline（UTC，事實流水帳）

<!-- ai-rule: 用 UTC ISO 8601；每條含 actor + event；不寫推測；至少含 first signal / ack / mitigation start / resolve 四個關鍵時刻 -->

| ts (UTC) | Actor | Event | Source |
|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | alertmanager | detect — checkout-api p99 > 2s | alert §2 |
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | ack page | pager §1 |
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | identify — DB connection pool exhausted | chatlog §5 |
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | mitigation start — restart pgbouncer | chatlog §7 |
| YYYY-MM-DDTHH:MM:SSZ | alertmanager | resolve — p99 back to baseline | alert §6 |

---

## 4. Impact

<!-- ai-rule: affected_users 必須量化（count 或 %）；revenue_impact 無資料寫 _TODO_ 不准估算 -->

| Field | Value | Confidence |
|---|---|---|
| **Affected users** | <count or %> | **[M]** |
| **Affected regions** | [<region>] | **[H]** |
| **Affected user journey** | <e.g. checkout> | **[H]** |
| **Revenue impact** | <$X estimate or `_TODO_`> | **[L]** |
| **SLO burned** | <SLO-001 burn ~12 min> | **[M]** |

---

## 6. Comms Log

<!-- ai-rule: 對外通報必填；無對外通報寫「無對外通報」並說明為何 -->

| ts (UTC) | Channel | Audience | Message summary | Source |
|---|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | status page | public | Checkout 服務劣化，調查中 | comms §1 |
| YYYY-MM-DDTHH:MM:SSZ | in-app banner | signed-in users | 結帳延遲，已修復 monitor 中 | comms §2 |

---

## 7. Decision Log（事故中決策，非 root cause）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因；只記事故當下做了什麼決策，不分析「為何發生」 -->

| ts (UTC) | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | mitigate path | restart pgbouncer / failover / scale up | restart | failover (region 太大 blast radius)、scale up (DB 不在 path) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 4, 6, 7）
> - [ ] 所有時間用 UTC ISO 8601
> - [ ] Timeline 至少含 first signal / ack / mitigation / resolve 四個關鍵時刻
> - [ ] Impact 含 affected users 量化（不准只寫「很多」）
> - [ ] ETR 不知寫 `_TODO_`，不准猜時間
> - [ ] **無 root cause 分析**（root cause 屬 postmortem）
> - [ ] Comms log 必填（無對外通報需說明為何）
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "incident-report"
variant: "full"
status: "active"
owner: "<incident-commander>"
last_updated: "YYYY-MM-DDTHH:MM:SSZ"
upstream:
  required: ["chatops-log", "alert-log", "paging-log", "status-page-comments"]
  optional: ["runbook-execution", "customer-tickets"]
---

# Incident Report: INC-YYYY-NNNN

**Status:** <investigating / identified / mitigating / monitoring / resolved> · **IC:** <name> · **Last updated:** YYYY-MM-DDTHH:MM:SSZ · **Reviewers:** Comms / Legal (合規) / Postmortem 撰寫者

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。對標 Google SRE blameless culture + PagerDuty incident response。所有時間用 **UTC ISO 8601**；每結論行內 `（依據：chatlog §XXX / alert §YYY）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造（**ETR 不知寫 TODO 不准猜時間**）；**只寫事實不寫 root cause**（root cause 屬 postmortem）；對外通報時效須對齊 SOC 2 / GDPR 合規門檻；禁 YAML / JSON schema 輸出。

---

## 1. Header
<!-- owner: IC · required: always -->

<!-- ai-fill: 事故的基本元資料 -->

| Field | Value | Confidence |
|---|---|---|
| **Incident ID** | INC-YYYY-NNNN | — |
| **Severity** | SEV1 / SEV2 / SEV3 / SEV4 | **[H]** |
| **Detection method** | alert / customer_report / internal_user / synthetic | **[H]** |
| **Current status** | investigating / identified / mitigating / monitoring / resolved | — |
| **Started at (UTC)** | YYYY-MM-DDTHH:MM:SSZ | **[H]** |
| **ETR (UTC)** | YYYY-MM-DDTHH:MM:SSZ or `_TODO_` | **[M]** |
| **Resolved at (UTC)** | YYYY-MM-DDTHH:MM:SSZ or `_TODO_` | — |

---

## 2. Owner & Paging Chain
<!-- owner: IC · required: always -->

<!-- ai-rule: IC + scribe 必填；對外通報時 comms_lead 必填；paging chain 含每次 page + ack；missed ack 須標 _TODO_ -->

### Owners

| Role | Name | Backup |
|---|---|---|
| **Incident Commander** | <name> | <backup> |
| **Scribe** | <name> | — |
| **Comms lead** | <name or `_TODO_`> | — |
| **Subject Matter Expert** | <DB lead / network lead 等> | — |

### Paging chain

| ts (UTC) | Paged | Ack ts (UTC) | Response time | Source |
|---|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | YYYY-MM-DDTHH:MM:SSZ | 2m | pager §1 |
| YYYY-MM-DDTHH:MM:SSZ | DB lead | YYYY-MM-DDTHH:MM:SSZ | 8m | pager §2 |
| YYYY-MM-DDTHH:MM:SSZ | IC backup | `_TODO_` | — | pager §3 |

---

## 3. Timeline（UTC，事實流水帳）
<!-- owner: Scribe · required: always -->

<!-- ai-rule: 用 UTC ISO 8601；每條 actor + event + source；不寫推測；至少含 first signal / first ack / identify / mitigation start / mitigation end / resolve / comms 七個關鍵時刻；長事故每 15-30 分鐘一條 status update -->

| ts (UTC) | Actor | Event | Source |
|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | alertmanager | detect — checkout-api p99 > 2s | alert §2 |
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | ack page | pager §1 |
| YYYY-MM-DDTHH:MM:SSZ | IC | declare SEV2, open #inc-channel | chatlog §3 |
| YYYY-MM-DDTHH:MM:SSZ | scribe | first status page post | comms §1 |
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | identify — DB connection pool exhausted | chatlog §5 |
| YYYY-MM-DDTHH:MM:SSZ | on-call SRE | mitigation start — restart pgbouncer | chatlog §7 |
| YYYY-MM-DDTHH:MM:SSZ | alertmanager | mitigation end — error rate back to baseline | alert §5 |
| YYYY-MM-DDTHH:MM:SSZ | scribe | status page update — monitoring | comms §2 |
| YYYY-MM-DDTHH:MM:SSZ | IC | declare resolved | chatlog §12 |

---

## 4. Impact
<!-- owner: IC · required: always -->

<!-- ai-rule: affected_users 必須量化（count 或 %）；revenue_impact 無資料寫 _TODO_ 不准估算；列出燃燒的 SLO -->

| Field | Value | Source | Confidence |
|---|---|---|---|
| **Affected users** | <count or %> | metric §3 | **[M]** |
| **Affected regions** | [<region>] | metric §4 | **[H]** |
| **Affected user journey** | <e.g. checkout> | comms §1 | **[H]** |
| **Revenue impact** | <$X estimate or `_TODO_`> | finance §1 | **[L]** |
| **External-facing duration** | <X min> | status page §1 | **[H]** |

### SLO burn

| SLO | Burn rate | Budget consumed | Source |
|---|---|---|---|
| SLO-001 (checkout p99) | 8× sustained 12m | ~96 min equivalent | SLI §3 |

---

## 5. Detection & Time-to-Detect
<!-- owner: SRE · required: full-only -->

<!-- ai-rule: 必含 detection_method + first signal ts + ack ts + time-to-detect/ack -->

| Field | Value |
|---|---|
| **Detection method** | alert / customer_report / internal_user / synthetic |
| **First signal (UTC)** | YYYY-MM-DDTHH:MM:SSZ |
| **First ack (UTC)** | YYYY-MM-DDTHH:MM:SSZ |
| **Time to detect (TTD)** | <X min> |
| **Time to ack (TTA)** | <X min> |
| **Time to mitigate (TTM)** | <X min> |

---

## 6. Comms Log
<!-- owner: Comms lead · required: always -->

<!-- ai-rule: 對外通報必填；含 channel + audience + message + source；合規通報（GDPR 72h / SOC 2）須標明 -->

| ts (UTC) | Channel | Audience | Message summary | Compliance? | Source |
|---|---|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | status page | public | Checkout 服務劣化，調查中 | — | comms §1 |
| YYYY-MM-DDTHH:MM:SSZ | in-app banner | signed-in users | 結帳延遲，已修復 monitor 中 | — | comms §2 |
| YYYY-MM-DDTHH:MM:SSZ | email | enterprise customers | RCA 將於 5 工作日內提供 | GDPR Art.33 觸發判斷中 | comms §3 |

---

## 7. Decision Log（事故中決策）
<!-- owner: IC · required: always -->

<!-- ai-rule: 每條必含 chosen + ≥ 1 個 rejected + 拒絕原因；只記事故當下做了什麼決策，不分析「為何發生」 -->

| ts (UTC) | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DDTHH:MM:SSZ | SEV level | SEV1 / SEV2 | SEV2 | SEV1 (尚未觸發 enterprise SLA 條款) | **[M]** |
| YYYY-MM-DDTHH:MM:SSZ | mitigation path | restart pgbouncer / failover / scale up | restart | failover (blast radius 太大)、scale up (DB 不在 path) | **[H]** |

---

## 8. Compliance & External Notification
<!-- owner: Legal + Comms · required: full-only · skippable: 無對外影響時可寫「無觸發合規門檻」 -->

<!-- ai-rule: GDPR / SOC 2 / 行業合規門檻必須對照；觸發須記時效（GDPR 72h personal data breach） -->

| Regulation | Triggered? | Deadline | Action |
|---|---|---|---|
| GDPR Art.33 (personal data breach) | <yes/no/under review> | 72h from awareness | <已通報 / N/A> |
| SOC 2 customer notification | <yes/no> | per contract | <已通報 / N/A> |
| Industry-specific (e.g. PCI DSS) | <yes/no> | — | — |

---

## 9. Risks & Open Questions
<!-- owner: IC · required: always -->

### Risks (in-flight)

<!-- ai-rule: 事故未 resolve 時的活躍風險；resolve 後可保留為 postmortem 輸入 -->

> **R1:** <二次故障風險：mitigation 為 workaround> — **Mitigation:** 24h watch + 排程 root-fix — **Owner:** SRE
>
> **R2:** <customer churn> — **Mitigation:** Customer Success 主動聯絡 enterprise 客戶 — **Owner:** CS lead

### Open Questions

- [ ] **Q1:** <DB 連線池為何在此時耗盡？需 metric deep-dive>
- [ ] **Q2:** <為何 SEV2 而非 SEV1？SLA 觸發判斷>

---

## 10. Out of Scope & Confidence & TODO
<!-- owner: All · required: always -->

本 Incident Report **不處理**：

- ❌ **不處理 root cause 分析** — 屬 postmortem 卡
- ❌ **不處理責任歸屬或個人檢討** — blameless 原則
- ❌ **不處理長期系統改善建議** — 屬 postmortem action items + roadmap

### Confidence & Sources

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <例如：affected_users 推估乘數來源>
- **Highest-value next input:** <下一份最該補的輸入：後端 metric deep-dive / 客服票統計 / DB lock graph>

### TODO（缺資料）

- _TODO: 補 revenue impact 量化_
- _TODO: 確認 GDPR Art.33 觸發判斷_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] 所有時間用 UTC ISO 8601
> - [ ] Timeline 至少含 7 個關鍵時刻（detect / ack / declare / first-comms / identify / mitigate / resolve）
> - [ ] Impact 含 affected users 量化 + SLO burn
> - [ ] ETR 不知寫 `_TODO_`，不准猜時間
> - [ ] **無 root cause 分析**（root cause 屬 postmortem）
> - [ ] Detection 段含 TTD / TTA / TTM
> - [ ] Comms log 必填；合規觸發判斷標明
> - [ ] Compliance 段 GDPR / SOC 2 / 行業逐項對照
> - [ ] Decision Log 每條 ≥ 1 個 rejected option + reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游素材」產出 Incident Report markdown draft。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。事故進行中可分批貼最新 chatlog，AI 須以 UTC ISO 時間戳維護 timeline。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游素材（貼這裡）
⏬
（貼 ChatOps log（含 UTC timestamp）/ Alert / paging log / 使用者投訴 / status page 留言 / runbook 執行紀錄 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 把 root cause 寫進來（變成草率的 postmortem）、ETR 用猜的（讓客戶失望）、timeline 沒用 UTC（跨時區 reviewer 看錯）、impact 只寫「很多用戶受影響」（無法量化決策）、漏 comms log（合規 audit 失分）、責任歸屬點名（違反 blameless）。AI 若漏這些，自檢清單會抓到並回頭補。
