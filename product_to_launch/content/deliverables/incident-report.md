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

事故中段把 chatops + alert log 餵給 Claude 抽 timeline 與 impact，IC 只審 SEV 等級與外部通報措辭。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 incident scribe（熟悉 SLO、SEV 分級、blameless 文化）。任務：把 chat log + alert log + paging 紀錄轉成 incident report draft（YAML 格式）。

## 輸入素材

[ChatOps log（含 UTC timestamp）]
[Alert / paging log]
[使用者投訴 / status page 留言]

輸出 schema：incident_id / severity / timeline / impact / detection_method / current_status / comms_log / owner / paging_chain / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年 SRE 經驗的資深 incident scribe，熟悉 SLO/SLI、SEV1-4 分級、PagerDuty incident response、Google SRE blameless 文化。
你的輸出會交給 Incident Commander（判 SEV 與升級）、Comms（對外通報）、合規（外部通知時限）、Postmortem 撰寫者（當輸入）。
他們需要在事故進行中即時讀懂，所以你只寫事實、不寫分析。

## 情境脈絡

SEV-1/2 或對外可見服務劣化時使用本卡。
本卡核心問題：事故當下「現在誰在做什麼、影響多大、ETR 多久」的事實流水帳，不含根因分析。

## 輸入素材

[ChatOps log（含 UTC timestamp）]
[Alert / paging log]
[使用者投訴 / status page 留言]
[Runbook 執行紀錄（如有）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Timeline 用 UTC、每條含 actor 與 event；不寫推測，只寫觀察到的事實。
3. 缺資料寫 TODO(缺什麼)，不要編造（例如不知 ETR 寫 TODO，不要猜時間）。
4. SLO compliance：列出本事故燃燒的 SLO 與 error budget 影響；NFR 含外部通報時效（SOC 2 / GDPR 適用時）。
5. Out of scope：明列 3 條本文件不處理（例如：根因分析、責任歸屬、長期改善）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明（例如 impact 推估僅 L）。
7. 不寫 root cause；那是 postmortem 的工作。

## 輸出格式（YAML）

incident_id:
  required: true
  type: string
  example: INC-2025-0042

severity:
  required: true
  type: enum[SEV1, SEV2, SEV3, SEV4]
  source: <input ref>
  confidence: H | M | L

timeline:
  required: true
  type: list[{ts_utc, actor, event, source}]
  example:
    - ts_utc: 2025-05-22T03:14:00Z
      actor: alertmanager
      event: detect — checkout-api p99 latency > 2s
      source: alert log 第 2 段

impact:
  affected_users: <count or %>
  affected_regions: [<region>]
  revenue_impact: <string + 量化估算或 TODO>
  user_journey: <which journey degraded>
  source: <input ref>
  confidence: H | M | L

detection_method:
  required: true
  type: enum[alert, customer_report, internal_user, synthetic]
  source: <input ref>

current_status:
  required: true
  type: enum[investigating, identified, mitigating, monitoring, resolved]
  etr_utc: <ISO timestamp or TODO>

comms_log:
  - ts_utc: <ISO>
    channel: [status_page | email | in_app | regulator]
    audience: <who>
    message_summary: <string>
    source: <input ref>

owner:
  incident_commander: <name or TODO>
  scribe: <name>
  comms_lead: <name or TODO>

paging_chain:
  - ts_utc: <ISO>
    paged: <role/name>
    ack: <ts_utc or TODO>
    source: <input ref>

decision_log:
  - decision: <e.g. failover region>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - 根因分析（屬於 postmortem）
  - 責任歸屬或個人檢討
  - 長期系統改善建議

## 思考步驟

產出前先：
1. 從 log 抓 3-5 個關鍵時刻（first signal、ack、mitigation start、resolve），各標 H/M/L confidence
2. 列至少 2 條 SEV 等級候選（例如 SEV-1 vs SEV-2）與各自的負面後果（過度升級耗資源 vs 漏報違約）
3. 列你做了但 input 沒明說的假設（如 impact 推估的乘數來源）
4. 確認外部通報時效是否觸發合規門檻

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份（例如後端 metric vs 客服票）？為什麼？
```

回審重點：human 判斷 SEV 等級、對外措辭、合規通報時效、是否需要升級到 SEV-1。
