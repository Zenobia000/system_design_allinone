---
title: "Postmortem · 事後回顧"
slug: "postmortem"
stage: "operate"
roles: ["devops"]
order: 48
hook: "把『誰的錯』改寫成『系統的哪個缺口』"
when_to_use: "任何 SEV-1/2 事故、或重複出現的 SEV-3"
ai_leverage: "用 Claude 從 incident report 推系統性根因與改善候選"
art: "/generated/stage-operate.png"
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

把 incident report + chat log 餵給 Claude 抽 5 Whys 與改善候選，IC 與 owner 只審根因歸類與行動項可執行性。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE（熟悉 SLO/SLI/error budget、incident response、Google SRE blameless postmortem）。任務：把 incident report + chat log + 監控資料轉成 postmortem draft（YAML 格式）。

<input>
[Incident report]
[Chat log（事故當下）]
[Metric / dashboard 截圖摘要]
</input>

輸出 schema：incident_ref / root_cause / contributing_factors / what_went_well / what_went_wrong / action_items / blameless_summary / prevention_categories / systemic_changes / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年 SRE 經驗的資深 SRE，熟悉 SLO/SLI/error budget、incident response、Google SRE blameless postmortem 文化、5 Whys / Fishbone 根因分析。
你的輸出會交給 服務 owner（補實作細節）、Architect（評估設計缺口）、Engineering Manager（排 action item 優先級）、Training Lead（補訓練）。
他們需要可執行的改善項，不是檢討個人，所以你必須 blameless 且每個 action 有 owner、due、severity。
</role>

<context>
SEV-1/2 後 5 工作日內、或重複 SEV-3 出現時用本卡。
本卡核心問題：把「誰的錯」改寫成「系統的哪個缺口」，每次留下 ≤ 5 個可執行 action item。
</context>

<input>
[Incident report（含 timeline、impact、comms log）]
[Chat log（事故當下，含決策時刻）]
[Metric / dashboard 截圖摘要]
[Runbook 執行紀錄（如有偏離）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選「加更多告警」會增加 alert fatigue X%）。
3. 缺資料寫 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. SLO compliance：列出本事故對 error budget 的消耗 %；NFR 含告警延遲、MTTR、MTTA。
5. Out of scope：明列 3 條本文件不處理（例如：個人績效檢討、商業影響細算、合約罰款計算）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. Blameless：寫流程/工具/訓練/設計缺口，不寫人名作為根因；個人錯誤一律歸因於「系統未保護該操作」。
</rules>

<output_schema>
incident_ref:
  required: true
  type: string
  source: <input ref>

root_cause:
  required: true
  type: object
  five_whys:
    - why_1: <observed symptom>
    - why_2: <cause of symptom>
    - why_3: <cause of cause>
    - why_4: <systemic>
    - why_5: <organisational/process>
  primary_cause_category: enum[code, config, capacity, dependency, process, training, monitoring]
  source: <input ref>
  confidence: H | M | L

contributing_factors:
  - factor: <string>
    category: enum[detection, response, recovery, prevention]
    source: <input ref>
    confidence: H | M | L

what_went_well:
  - <signal + source>  # 至少 2 條
what_went_wrong:
  - <signal + source>  # 至少 2 條

action_items:
  - id: AI-001
    statement: <action>
    owner: <name/team or TODO>
    due: <ISO date or TODO>
    severity: enum[P0, P1, P2]
    category: enum[detection, response, recovery, prevention]
    success_criteria: <how we'll know it's done>
    source: <input ref>
    confidence: H | M | L

blameless_summary:
  required: true
  type: string  # ≤ 200 字，給高層讀，不含人名

prevention_categories:
  detection: [<改善 1>, <改善 2>]
  response: [<改善 1>]
  recovery: [<改善 1>]

systemic_changes:
  - change: <e.g. 新增 rollback gate>
    cost: <effort estimate>
    risk_if_skipped: <負面後果>

decision_log:
  - decision: <e.g. 根因歸類為 capacity vs config>
    options_considered: [capacity, config, dependency]
    chosen: capacity
    rejected_reason:
      config: <why not>
      dependency: <why not>
    confidence: H | M | L

out_of_scope:
  - 個人績效檢討（屬 manager 1:1）
  - 商業影響精算（屬財務）
  - 合約罰款計算（屬法務）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（first alert 延遲、ack 延遲、mitigation 選錯、rollback 缺）各標 H/M/L confidence
2. 列至少 2 條根因路徑（technical vs process）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如 ack 延遲歸因於 alert fatigue 還是 paging 設定）
4. 確認 prevention 4 類（detection/response/recovery/prevention）都涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如 deploy log、DB slow query log），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷根因歸類是否誠實、action item 是否真的有 owner 接、是否真的 blameless、改善是否壓在系統面而非個人。
