---
title: "Runbook · 維運手冊"
slug: "runbook"
stage: "operate"
roles: ["devops"]
order: 46
hook: "凌晨三點被 page 的人能照做不用思考"
when_to_use: "任何已知告警、已知異常、或新服務上線前"
ai_leverage: "用 Claude 從 postmortem 與告警規則生成 runbook 草稿"
art: "/generated/key-deliverable-runbook.webp"
source: "deep-research-report.md §Operation, Google SRE"
---

## 解決什麼問題

凌晨三點不是寫程式的好時機。Runbook 的目標是讓被 page 的人不需要理解設計也能正確處理告警，並把處理步驟轉成可自動化候選。

## 誰負責、和誰對接

- **主責：** DevOps / SRE，由服務 owner 維護
- **協作：** Dev Lead 提供失敗模式、Architect 補風險路徑
- **下游收件：** On-Call Rotation、Postmortem 改善項

## 何時用、何時不用

- ✅ **必要時機：** 每條 paging alert、每個新服務上線
- ❌ **不需要時：** 一次性事件、純資訊性告警
- ⚠️ **常見誤用：** 步驟寫「請聯絡 X」；過期未更新；無回滾路徑

## AI 怎麼加速

把告警規則 + 過往 postmortem + dashboard 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 rollback 與升級條件**。本卡輸出**真實 runbook markdown 文件**（含表格、code block、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給單一 alert / 小團隊 / 新服務初版用，**完整範本**給高 SEV alert / 跨團隊 on-call / 需要過 game day 場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

````template-light
---
doc_type: "runbook"
variant: "light"
status: "draft"
owner: "<service-owner>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["alert-rule"]
  optional: ["past-postmortem", "dashboard"]
---

# Runbook: <alert-name>

**Status:** Draft v0.X · **Owner:** <service owner> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 4, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：alert-rule §XXX / postmortem-NNN）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**每個 remediation step 必須附 rollback 指令**（不能只有「執行 X」沒有「如果 X 失敗執行 Y」）；診斷指令缺則寫 TODO，不要瞎猜命令語法。

---

## 1. Symptom

<!-- ai-fill: 描述 user-visible 與 internal-signal 兩面 — 凌晨三點被 page 的人要靠這段判斷是不是真的 -->

| Aspect | Description |
|---|---|
| **User-visible** | <使用者會看到什麼：頁面 500 / 結帳失敗 / 載入慢> |
| **Internal signal** | <metric / log pattern：e.g. `http_5xx_rate > 1%` for 5m> |
| **Source** | alert-rule §XXX |
| **Confidence** | **[H]** |

---

## 2. Diagnosis Steps

<!-- ai-rule: 輕量版 2-4 步診斷；每步含 command + expected_output + if_anomalous 三件 -->

### Step D1: <description>

```bash
<exact command or query>
```

- **Expected output:** <what good looks like>
- **If anomalous:** → 跳到 D2 / Remediation R1
- **Source:** dashboard §XX

### Step D2: ...

---

## 3. Remediation Steps

<!-- ai-rule: 每個 remediation 必填 action + command + rollback + slo_impact 四件，缺 rollback 一律不合格 -->

### R1: <action description>

```bash
# Action
<exact command>

# Rollback (required)
<exact rollback command>
```

- **SLO impact:** protect / burn / neutral
- **Time estimate:** <e.g. 2-5 min>
- **Permissions:** <required role / IAM>
- **Confidence:** **[H]**

### R2: ...

---

## 4. Escalation Criteria

<!-- ai-rule: 至少 1 條升級條件，含 condition + escalate_to + expected_ack -->

| Condition | Escalate to | Expected ack |
|---|---|---|
| R1+R2 仍紅燈 > 10 min | <secondary on-call / manager> | <e.g. 5 min> |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Mitigation 選擇 | restart / failover / scale_out | failover | restart (丟 in-flight X%)、scale_out (lead time 太長) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Last tested:** <ISO date or `_TODO: 需要排 game day_`>
- **Highest-value next input:** <下一份最該補的：最近 3 次同告警 chat log / 權限矩陣>

### TODO（缺資料）

- _TODO: 需要排一次 game day 驗證 R1 rollback 真的能回_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 4, 10, 12，刻意不連號）
> - [ ] Symptom 段含 user-visible + internal-signal 雙面
> - [ ] Diagnosis 每步含 command + expected_output + if_anomalous
> - [ ] **每個 Remediation 必有 rollback 指令**（缺即不合格）
> - [ ] 每個 Remediation 標 slo_impact（protect / burn / neutral）
> - [ ] Escalation 段含 condition + escalate_to + expected_ack
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（runbook 是給凌晨三點的人讀的 markdown）
````

````template-full
---
doc_type: "runbook"
variant: "full"
status: "draft"
owner: "<service-owner>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["alert-rule", "past-postmortem", "dashboard"]
  optional: ["chaos-test-result", "permission-matrix"]
---

# Runbook: <alert-name>

**Status:** Draft v0.X · **Owner:** <service owner> · **Last updated:** YYYY-MM-DD · **Reviewers:** SRE Lead / Dev Lead

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Google SRE runbook 規範。每結論行內 `（依據：alert-rule §XXX / postmortem-NNN / chat-log §YYY）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**每個 remediation 必附 rollback 指令**（不能只有「執行 X」沒有「如果 X 失敗執行 Y」）；診斷指令缺則寫 TODO，不要瞎猜命令語法；NFR 含執行時長、權限要求；禁 YAML/JSON schema 輸出。

---

## 1. Symptom
<!-- owner: Service owner · required: always -->

<!-- ai-fill: 凌晨三點的判斷起點 — user-visible + internal-signal 雙面都必填 -->

| Aspect | Description | Source | Confidence |
|---|---|---|---|
| **User-visible** | <使用者看到什麼> | ticket §XX | **[H]** |
| **Internal signal** | <metric / log pattern> | alert-rule §XX | **[H]** |
| **Typical false-positive** | <常見誤判場景，避免凌晨亂動> | postmortem-005 | **[M]** |

---

## 2. Diagnosis Steps
<!-- owner: SRE + Service owner · required: always -->

<!-- ai-rule: 3-6 步診斷，每步含 command + expected_output + if_anomalous；缺指令寫 TODO，不要編造 -->

### Step D1: <description>

```bash
<exact command or query>
```

- **Expected output:** <what good looks like>
- **If anomalous:** → D2 / R1
- **Source:** dashboard §XX
- **Confidence:** **[H]**

### Step D2: <description>

...

---

## 3. Remediation Steps
<!-- owner: Service owner + SRE · required: always -->

<!-- ai-rule: 每個 remediation 必填 action + command + rollback + slo_impact + time_estimate + permissions 六件，缺 rollback 一律不合格 -->

### R1: <action description>

```bash
# Action
<exact command>

# Rollback (required)
<exact rollback command>
```

- **SLO impact:** protect / burn / neutral
- **Time estimate:** <e.g. 2-5 min>
- **Permissions:** <required role / IAM>
- **Trade-off:** <e.g. quick restart 會丟 in-flight request X%>
- **Source:** postmortem-007 §mitigation
- **Confidence:** **[H]**

### R2: ...

---

## 4. Escalation Criteria
<!-- owner: SRE Lead · required: always -->

<!-- ai-rule: 至少 2 條升級條件，含 condition + escalate_to + expected_ack -->

| Condition | Escalate to | Expected ack | Note |
|---|---|---|---|
| R1+R2 仍紅燈 > 10 min | Secondary on-call | 5 min | <說明> |
| 影響 ≥ 50% 使用者 / 跨服務 | Incident Commander + Manager | 5 min | 啟動 SEV-1 流程 |

---

## 5. Related Dashboards
<!-- owner: SRE · required: full-only -->

| Dashboard | URL | Key panels |
|---|---|---|
| <name> | <link or `_TODO_`> | <panel 1>, <panel 2> |

---

## 6. Permissions & Pre-conditions
<!-- owner: SRE + Sec · required: full-only -->

<!-- ai-rule: 列出執行 R1-Rn 所需的 IAM / VPN / 二次驗證 -->

| Step ref | Required role / IAM | Pre-condition |
|---|---|---|
| R1 | <e.g. prod-deployer> | VPN 已連 + 2FA |
| R2 | <e.g. db-admin> | <說明> |

---

## 7. Last Tested
<!-- owner: SRE · required: full-only -->

| Date | Result | Tester | Notes |
|---|---|---|---|
| <ISO or `_TODO: 需排 game day_`> | pass / fail / not_tested | <name> | <如有偏離請說明> |

---

## 8. On-Call Specific Notes
<!-- owner: SRE · required: full-only -->

<!-- ai-rule: 記錄 on-call 容易踩雷的小細節（時區、語言、權限申請流程） -->

- <e.g. 跨時區 on-call 切換時 GMT+8 ↔ UTC 換算>
- <e.g. 申請 prod 寫權限要 manager 同意，平均 30 min>

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner -->

> **R1:** <例：rollback 指令未在 prod 驗證過，可能失敗> — **Mitigation:** <排 game day 驗證> — **Owner:** <SRE Lead>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <e.g. R2 是否需要 manager pre-approval？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: SRE · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Mitigation 主路徑 | restart / failover / scale_out | failover | restart (丟 in-flight X%)、scale_out (lead time 太長) | **[H]** |

---

## 11. Out of Scope
<!-- owner: SRE · required: full-only -->

本 Runbook **不處理**：

- ❌ **根因分析** — 屬 postmortem 卡
- ❌ **長期設計改動** — 屬 ADR
- ❌ **跨服務協調** — 屬 incident commander

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1：權限假設>
  - <假設 2：依賴假設>
- **Highest-value next input:** <下一份最該補的：最近 3 次同告警 chat log / 權限矩陣 / game day 報告>

### TODO（缺資料）

- _TODO: 需要排 game day 驗證 R1 rollback_
- _TODO: 補 D3 診斷指令（dashboard query 語法尚未取得）_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Symptom 段含 user-visible + internal-signal + typical false-positive 三面
> - [ ] Diagnosis 每步含 command + expected_output + if_anomalous（缺指令寫 TODO 不編造）
> - [ ] **每個 Remediation 必有 rollback 指令**（缺即不合格）
> - [ ] 每個 Remediation 標 slo_impact + time_estimate + permissions
> - [ ] Escalation ≥ 2 條，含 condition + escalate_to + expected_ack
> - [ ] Permissions 段對應每個 R 步驟
> - [ ] Last tested 段已填日期或標 `_TODO: 需排 game day_`
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（runbook 是給凌晨三點的人讀的 markdown）
````

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 runbook markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼告警規則 / 過往 postmortem / dashboard 連結與面板說明 / 服務架構摘要全文）
⏫
```

> [!TIP]
> **常見錯誤：** Remediation 缺 rollback（凌晨亂動回不來）、診斷指令瞎猜（手抖打錯造成第二事故）、步驟寫「請聯絡 X」（半夜根本聯絡不到）、過期未更新（last_tested 不寫）、Decision Log 只列 chosen 不列 rejected（無法 review）。AI 若漏這些，自檢清單會抓到並回頭補。
