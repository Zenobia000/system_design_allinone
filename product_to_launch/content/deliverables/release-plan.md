---
title: "Release Plan · 上線計畫"
slug: "release-plan"
stage: "ship"
roles: ["po", "devops"]
order: 39
hook: "把上線從『按 deploy』變成有對齊、有證據、有退路"
when_to_use: "release 涉及 schema、外部承諾、跨團隊或灰度時"
ai_leverage: "用 Claude 從 PR 清單生成 release notes + 風險清單"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Delivery Planning, §Deployment"
---

## 解決什麼問題

Release Plan 是一份「誰在哪時做什麼、出事誰接、何時宣布完成」的協作文件。沒有它，每次上線靠 Slack 即興指揮。

## 誰負責、和誰對接

- **主責：** PO + DevOps
- **協作：** Dev Lead、QA、SRE on-call、Customer Success
- **下游收件：** Go/No-Go、Rollback Plan、Canary Strategy

## 何時用、何時不用

- ✅ **必要時機：** schema migration、breaking change、市場活動綁定
- ❌ **不需要時：** flag 控制的小改、純文案
- ⚠️ **常見誤用：** 只寫時程不寫退路；通知名單缺 on-call

## AI 怎麼加速

把 PR 清單 + commit 訊息 + 依賴圖丟給 AI 抽 release notes、影響面、依賴順序，人工只審 comms 與 rollback link。

```prompt-quick
你是有 5+ 年 agile 經驗的資深 PO（熟悉 backlog 拆解、user story、INVEST），協作 7+ 年 SRE 經驗的 release engineer。任務：把 PR 清單 + commit 訊息 + 依賴圖 轉成 Release Plan（YAML 格式）。

<input>
[PR 清單（含標題、reviewer、merge 時間）]
[Commit 訊息（含 Conventional Commits type）]
[服務依賴圖與下游 consumer]
</input>

輸出 schema：release_id / scope_commits / risk_summary / dependency_window / comms_plan（internal/external/support）/ rollback_link / go_no_go_link / post_release_metrics / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 agile 經驗的資深 PO，協作 7+ 年 SRE 經驗的 release engineer，熟悉 backlog 拆解、user story 寫作、INVEST 原則、SLO/SLI/error budget、incident response、postmortem 文化、Conventional Commits、SemVer。
你的輸出會交給 Dev Lead（確認依賴）、QA（執行驗證）、SRE on-call（值班待命）、Customer Success（對外通知）、PM（決策）。
他們需要在上線前 24 小時讀完並各自就位，所以你的 plan 必須含具體時間軸、責任人、退路連結。
</role>

<context>
Release 涉及 schema、外部承諾、跨團隊或灰度時必要。
本卡核心問題：把上線從「按 deploy」變成「有對齊、有證據、有退路」的協作文件，避免每次靠 Slack 即興指揮。
</context>

<input>
[PR 清單（含標題、author、reviewer、merge 時間、target branch）]
[Commit 訊息（Conventional Commits：feat/fix/perf/BREAKING）]
[服務依賴圖與下游 consumer（含外部 API 契約）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：合併兩個 release 省 ops 成本，但放大 blast radius）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. SLO 與外部承諾必須涵蓋；任何 breaking change 必須附 deprecation 窗口與 customer comms。
5. Out of scope：明列 3 條本文件不處理（例如：detailed rollout commands、SLO 重新校準、行銷文案）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. comms_plan 必須含 internal / external / support 三層，每層有 channel + audience + timing。
</rules>

<output_schema>
release_id:
  version: <SemVer>
  code_name: <optional>
  target_date: <ISO 8601 + TZ>
  source: <input ref>

scope_commits:
  - commit_sha: <short>
    type: feat | fix | perf | refactor | BREAKING
    summary: <one-line>
    pr_link: <URL>
    user_facing: true | false
    source: <input ref>
    confidence: H | M | L

risk_summary:
  high: [<risk + likelihood + mitigation>]
  medium: [<risk>]
  unknowns: [<unknown 1>, <unknown 2>, <unknown 3>]
  source: <input ref>

dependency_window:
  upstream_freezes: [<service + window>]
  downstream_notifications: [<service + lead_time>]
  blackout_periods: [<例如：月結、行銷活動>]

comms_plan:
  internal:
    - channel: <Slack #releases>
      audience: <Eng / SRE>
      timing: <T-24h / T-1h / T+0 / T+1h>
      template: <link or TODO>
  external:
    - channel: <status page / email>
      audience: <customers>
      timing: <T-7d / T+0>
  support:
    - channel: <CS playbook>
      audience: <support agents>
      escalation: <on-call SRE>

rollback_link: <URL to Rollback Plan or TODO>
go_no_go_link: <URL to Go/No-Go Checklist or TODO>

post_release_metrics:
  slo_watch_window: <minutes>
  business_kpi_watch: [<metric + threshold>]
  success_criteria: [<criteria>]
  abort_criteria: [<criteria>]
  confidence: H | M | L

decision_log:
  - decision: <例：灰度 vs 全量、合併 vs 拆分 release>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - Detailed rollout commands（屬 runbook）
  - SLO 重新校準（屬 SLO doc）
  - <第 3 條本文件不處理>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最大的 BREAKING change、最緊的依賴、最敏感的外部承諾）
2. 列至少 2 條 viable release 路徑（一次全量 vs 灰度 vs 分批），各自負面後果
3. 列你做了但 input 沒明說的假設（例如：customer 對 downtime 容忍度）
4. 確認 comms 三層都有人接
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 trade-off、外部承諾窗口、breaking change 通知時程、跨團隊就位狀態。
