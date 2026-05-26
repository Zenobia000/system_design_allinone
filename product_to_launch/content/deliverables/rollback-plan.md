---
title: "Rollback Plan · 回滾計畫"
slug: "rollback-plan"
stage: "ship"
roles: ["devops"]
order: 40
hook: "在 incident 發生前先決定『按哪顆按鈕』"
when_to_use: "任何含 schema、契約、或不可逆操作的 release"
ai_leverage: "用 Claude 對 migration 推導反向腳本與安全窗口"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Deployment, Google SRE"
---

## 解決什麼問題

Incident 發生時最貴的不是修復，是猶豫。Rollback Plan 預先寫好「什麼指標觸發、誰按、按完會發生什麼、多久確認」。

## 誰負責、和誰對接

- **主責：** DevOps + on-call SRE
- **協作：** Dev Lead（資料兼容性）、DBA（schema 反向）、PO（業務影響告知）
- **下游收件：** Go/No-Go、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** schema migration、外部 API 變更、緩存格式變更
- ❌ **不需要時：** 純 UI 文案、可由 flag 直接關閉
- ⚠️ **常見誤用：** 寫「revert commit」就交差；忽略資料已寫入新格式

## AI 怎麼加速

把 deploy steps + migration + SLO 丟給 AI 產 rollback plan draft，人工只審觸發閾值與資料兼容。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE（熟悉 SLO/SLI/error budget、incident response、postmortem 文化）。任務：把 deploy steps + migration + SLO 轉成 Rollback Plan（YAML 格式）。

## 輸入素材

[Deploy steps（含 release order）]
[Migration scripts（schema / data）]
[SLO 與業務指標]

輸出 schema：triggers / rollback_steps（ordered + reversible flag）/ data_compat_strategy / inverse_migrations / safe_window（TZ + duration）/ abort_criteria / comms_plan / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年 SRE 經驗的資深 release engineer，熟悉 SLO/SLI/error budget、incident response、postmortem 文化、schema migration 反向化、blue/green、feature flag。
你的輸出會交給 on-call SRE（半夜 3 點按按鈕）、Dev Lead（確認資料兼容）、DBA（執行反向 migration）、PO（對外溝通）。
他們需要在 5 分鐘內判斷「按或不按」，所以你的 plan 必須步驟可逆、觸發明確、不可逆點預警。

## 情境脈絡

任何含 schema、契約、或不可逆操作的 release 必須有 rollback plan。
本卡核心問題：在 incident 發生前先決定「什麼指標觸發 → 誰按 → 按完會發生什麼 → 多久確認」，把猶豫成本降到 0。

## 輸入素材

[Deploy steps（含 release order、blast radius）]
[Migration scripts（schema / data，含是否破壞性）]
[SLO 與業務指標（error rate、p95 latency、conversion）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選自動 rollback 會犧牲 X 分鐘 false-positive 風險）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. SLO / data integrity 必須涵蓋；任何不可逆操作（drop column、destructive migration）必須單獨標 irreversible: true 並附 forward-only 補救方案。
5. Out of scope：明列 3 條本文件不處理（例如：DR drill、跨 region failover、application-level circuit breaker）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. Rollback steps 必須 ordered，每步附 reversible: true/false 與預估耗時。

## 輸出格式（YAML）

triggers:
  slo_breach: [<SLI 名稱 + 閾值 + 觀測窗口>]
  error_rate: <% + 觀測窗口>
  data_integrity: [<檢測點 + 異常條件>]
  source: <input ref>
  confidence: H | M | L

rollback_steps:
  - step: 1
    action: <具體動作>
    reversible: true | false
    estimated_duration: <minutes>
    owner: <role>
    source: <input ref>

data_compat_strategy:
  direction: forward | backward | both
  approach: <expand-contract | dual-write | shadow read>
  irreversible_points: [<point + 補救方案>]
  confidence: H | M | L

inverse_migrations:
  - migration_id: <fwd>
    inverse_script: <path | TODO(缺什麼)>
    data_loss_risk: none | partial | total
    source: <input ref>

safe_window:
  timezone: <TZ>
  duration: <minutes>
  blackout_periods: [<例如：月結、行銷活動>]

abort_criteria:
  hard_stop: [<條件>]
  soft_stop: [<條件>]

comms_plan:
  internal: [<channel + audience + template>]
  external: [<status page + customer email>]
  decision_maker: <role>

decision_log:
  - decision: <例：自動 vs 手動觸發>
    options_considered: [auto, manual, hybrid]
    chosen: <X>
    rejected_reason:
      Y: <why not>
      Z: <why not>
    confidence: H | M | L

out_of_scope:
  - DR drill 與跨 region failover
  - Application-level circuit breaker 設計
  - <第 3 條本文件不處理>

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最危險的 migration、最緊的 SLO、blast radius 最大的 step）
2. 列至少 2 條 viable rollback 路徑（forward-fix vs full revert），各自負面後果
3. 列你做了但 input 沒明說的假設（例如：DB 是否支援 online schema change）
4. 確認所有不可逆點都有標記

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：human 判斷觸發閾值、不可逆點補救方案、跨團隊通知時機、SLO trade-off。
