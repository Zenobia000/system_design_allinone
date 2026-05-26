---
title: "Canary Strategy · 灰度策略"
slug: "canary-strategy"
stage: "ship"
roles: ["devops"]
order: 41
hook: "讓上線變成可觀測的實驗，而不是一次性押注"
when_to_use: "blast radius 大、SLO 緊、或新邏輯需真實流量驗證時"
ai_leverage: "用 Claude 從 SLO 推導 canary 階段門檻"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Deployment, Netflix canary"
---

## 解決什麼問題

Big bang release 在意外面前無能為力。Canary 把流量切片，先放 1%、5%、25%，每階段以 SLI 為門檻自動晉級或退回。

## 誰負責、和誰對接

- **主責：** DevOps
- **協作：** SRE 設 SLI、Dev 設 feature flag、PO 確認業務指標
- **下游收件：** Release Plan、Rollback Plan

## 何時用、何時不用

- ✅ **必要時機：** 核心路徑變更、性能敏感、規模 ≥ 數萬 DAU
- ❌ **不需要時：** 內部工具、低流量服務
- ⚠️ **常見誤用：** 只看 HTTP 5xx 不看業務指標；canary 與 baseline 環境不對等

## AI 怎麼加速

把 SLO + KPI + 流量規模丟給 AI 推導每階段門檻、停留時間、退回信號，人工只審 blast radius 與晉級節奏。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE（熟悉 SLO/SLI/error budget、incident response、postmortem 文化）。任務：把 SLO + 業務指標 + 流量規模 轉成 Canary Strategy（YAML 格式）。

## 輸入素材

[SLO / SLI 定義（含 error budget）]
[業務 KPI（conversion、AOV、retention）]
[流量規模與用戶分群]

輸出 schema：stages（% traffic / duration / population）/ success_criteria_per_stage / bake_time / auto_promote_vs_manual_gate / abort_signals / blast_radius_per_stage / observability_must_have / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年 SRE 經驗的資深 release SRE，熟悉 SLO/SLI/error budget、incident response、postmortem 文化、progressive delivery（canary / blue-green / shadow）、feature flag、statistical significance testing。
你的輸出會交給 DevOps（執行 rollout）、Dev（埋 SLI）、PO（確認業務指標）、on-call SRE（值班判讀）。
他們需要明確的「晉級 / 退回 / 暫停」條件，所以你的 plan 必須門檻量化、信號明確、blast radius 可預測。

## 情境脈絡

Blast radius 大、SLO 緊、或新邏輯需真實流量驗證時啟用 canary。
本卡核心問題：把上線變成可觀測的實驗，而不是一次性押注；每階段以 SLI 為門檻自動晉級或退回。

## 輸入素材

[SLO / SLI 定義（含 error budget burn rate）]
[業務 KPI（conversion、AOV、retention、engagement）]
[流量規模與用戶分群（geo / cohort / device）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：縮短 bake_time 換速度，會犧牲 X% statistical power）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. SLO 必須涵蓋：每階段 success_criteria 至少 1 個 SLI + 1 個業務 KPI，避免只看 5xx 不看 conversion。
5. Out of scope：明列 3 條本文件不處理（例如：A/B test 假說設計、長期 holdout 實驗、UI 視覺 canary）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 每階段必須有 sample size 估算（達到 statistical significance 所需）。

## 輸出格式（YAML）

stages:
  - id: 1
    traffic_pct: 1
    duration: <minutes>
    population: <geo / cohort / internal-only>
    sample_size_required: <N + 計算依據>
    source: <input ref>
    confidence: H | M | L
  - id: 2
    traffic_pct: 5
    ...

success_criteria_per_stage:
  - stage: 1
    sli_thresholds:
      error_rate: < <%>
      p95_latency: < <ms>
      saturation: < <%>
    business_kpi:
      conversion_delta: > <%>
    source: <input ref>

bake_time:
  per_stage: <minutes>
  rationale: <為何此長度>

auto_promote_vs_manual_gate:
  stages_auto: [1, 2]
  stages_manual: [3, final]
  rationale: <why>

abort_signals:
  hard_abort: [<SLI 急速劣化條件>]
  soft_abort: [<業務指標下滑條件>]
  source: <input ref>

blast_radius_per_stage:
  - stage: 1
    affected_users: <N>
    affected_features: [<feature>]
    confidence: H | M | L

observability_must_have:
  metrics: [<必備指標>]
  logs: [<必備 log field>]
  traces: [<必備 span>]
  dashboards: [<URL or TODO>]

decision_log:
  - decision: <例：1/5/25/100 vs 5/50/100>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - A/B test 假說設計與統計分析
  - 長期 holdout 實驗（> 7 天）
  - <第 3 條本文件不處理>

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最緊的 SLO、最敏感的業務 KPI、最大的用戶分群）
2. 列至少 2 條 viable canary 路徑（保守 1/5/25 vs 激進 5/50），各自負面後果
3. 列你做了但 input 沒明說的假設（例如：是否有真實 baseline 流量可比）
4. 確認每階段都有 SLI + 業務 KPI 雙保險

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：human 判斷 blast radius 容忍度、晉級節奏、業務 KPI 權重、retro-active 補救方案。
