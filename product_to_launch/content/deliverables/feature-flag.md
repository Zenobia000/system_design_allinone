---
title: "Feature Flag · 功能旗標"
slug: "feature-flag"
stage: "build"
roles: ["dev", "po"]
order: 37
hook: "把『部署』與『發布』拆開"
when_to_use: "需要灰度、AB、kill switch、或 trunk-based 高頻部署時"
ai_leverage: "用 Claude 掃 code 找出該被 flag 包起來的高風險變更"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Implementation, §Deployment, Netflix canary"
---

## 解決什麼問題

把上線風險從「不能合進主幹」變成「合進去但默認關閉」。Flag 是 trunk-based、canary、AB、kill switch 的共同基石。

## 誰負責、和誰對接

- **主責：** Dev 寫 flag、PO 決定開關時機
- **協作：** SRE 監控 flag 對 SLO 影響、QA 驗 on/off 雙路徑
- **下游收件：** Release Plan、Canary Strategy、Rollback Plan

## 何時用、何時不用

- ✅ **必要時機：** 高風險變更、AB 實驗、依賴未就緒、需逐步放量
- ❌ **不需要時：** 純 bug fix、安全 patch、UI 文字
- ⚠️ **常見誤用：** flag 不設過期；flag 之間互相耦合；on/off 路徑不測

## AI 怎麼加速

讓 Claude 對 diff 標出「應該被 flag 包起來」的變更類型，並產生 cleanup 任務。

```prompt-quick
你是有 7+ 年生產系統經驗的資深 staff engineer（熟悉效能調校、observability、breaking change policy、Netflix canary / LaunchDarkly / Unleash 等 flag 平台）。任務：把 diff + 既有 flag inventory + release plan 轉成 Feature Flag spec（YAML 格式）。

<input>
[git diff 全文]
[既有 flag inventory / 命名規約]
[release plan 或 canary policy]
</input>

輸出 schema：flag_name / scope (rollout%/segment/region) / kill_switch / expiry_date / owners / dependencies / telemetry / cleanup_policy / fallback_behavior

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年生產系統經驗的資深 staff engineer，熟悉效能調校、observability、breaking change policy、LaunchDarkly / Unleash / OpenFeature 等 flag 平台、Netflix canary 與 trunk-based development 實踐。
你的輸出會交給 Dev（實作 flag 包裝）、SRE（監控 flag 對 SLO 影響）、PO（決定開關時機）、QA（驗 on/off 雙路徑）。
他們需要每個 flag 都有清楚的退役條件與 fallback，所以你的 spec 必須機械可消費、有過期日、有 owner。
</role>

<context>
需要灰度、AB、kill switch、或 trunk-based 高頻部署時用本 Feature Flag。
本卡核心問題：把「部署」與「發布」拆開 — 把上線風險從「不能合進主幹」變成「合進去但默認關閉」。
</context>

<input>
[git diff 全文（含新增變更點）]
[既有 flag inventory（避免重複 / 命名衝突）]
[release plan 或 canary policy（rollout 階段定義）]
</input>

<rules>
1. 每個 flag 提案註明 source：[diff 檔案:行號] + 理由（可逆性 / blast radius / 依賴未就緒）。
2. Trade-off 必須列負面後果（例如：加 flag 會增加 on/off 雙路徑測試成本 +30%，且 flag 不清會累積技術債）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」（例：缺 owner team 就標 TODO，不要 assign 給 unknown）。
4. observability 必須涵蓋：flag exposure metric、on/off 路徑的 SLO 影響指標、kill switch 觸發 alert。
5. Out of scope 至少 3 條，明寫不處理什麼（例：不處理純 bug fix、不處理安全 patch、不處理 UI 文案）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 每個 flag 必須有 expiry_date（不超過 90 天）與 cleanup owner — 沒過期日的 flag 拒絕入庫。
</rules>

<output_schema>
flag_name:
  value: <snake_case，含模組 prefix，例：checkout_new_pricing>
  naming_convention_ref: <既有規約來源>
  source: <input ref>
  confidence: H | M | L

scope:
  rollout_percentage: <0-100>
  segment: [<beta_users / internal / region:tw>]
  region: [<tw / jp / global>]
  source: <input ref>

kill_switch:
  enabled: true | false
  trigger_metric: <例：error_rate > 1% sustained 5min>
  rollback_action: <自動關 flag / 自動 revert>

expiry_date:
  date: <YYYY-MM-DD，不超過 90 天>
  rationale: <為何此日期>
  source: <input ref>

owners:
  dri: <person or team>
  cleanup_owner: <負責退役 — 可同上>
  escalation: <on-call rotation>

dependencies:
  upstream_flags: [<flag 名稱>]
  blocking_services: [<service>]
  data_migration_ref: <link or N/A>

telemetry:
  exposure_metric: <metric 名稱>
  slo_impact_metric: [<metric>]
  alert_rules: [<alert 名稱>]

cleanup_policy:
  trigger: <e.g. rollout = 100% sustained 14 days OR expiry_date reached>
  removal_pr_template: <link>
  audit_log: <where>

fallback_behavior:
  on_flag_eval_failure: <e.g. default to off>
  on_provider_outage: <e.g. cache last known value 60s>
  source: <input ref>

decision_log:
  - decision: <如：選 LaunchDarkly 而非自建 config service>
    options_considered: [LaunchDarkly, Unleash, in_house_config]
    chosen: LaunchDarkly
    rejected_reason:
      Unleash: <why not>
      in_house_config: <why not>
    confidence: H | M | L

out_of_scope:
  - 純 bug fix（不需要 flag）
  - 安全 patch（不能延遲）
  - UI 文案修改（屬另一機制）
</output_schema>

<thinking>
產出前先：
1. 從 diff 抓 3-5 個高風險變更點（schema migration / auth 路徑 / 新依賴 / 演算法替換），分別標 H/M/L confidence
2. 列至少 2 條 viable rollout 策略（百分比漸進 vs segment 定向），各自負面後果
3. 列你做了但 input 沒明說的假設（例如假設 flag platform 已就緒）
4. 確認每個 flag 都有 expiry + cleanup owner + fallback
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 flag confidence < H？特別是 expiry / owner 缺資料的要列出來。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是 incident postmortem 還是 SLO 定義？為什麼？
</verify>
```

回審重點：human 判斷 flag 是否真的需要（過度使用會累積技術債）、expiry 是否合理、kill switch 觸發條件是否誠實。
