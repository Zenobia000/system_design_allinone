---
title: "Deprecation Plan · 廢棄計畫"
slug: "deprecation-plan"
stage: "operate"
roles: ["architect", "po"]
order: 53
hook: "把『下架』從口頭承諾變成可追蹤遷移"
when_to_use: "舊 API、舊 endpoint、舊 schema 仍有使用但需退場時"
ai_leverage: "用 Claude 從存取日誌找出殘留依賴與聯絡人"
art: "/generated/stage-operate.webp"
source: "deep-research-report.md §Architecture, GitLab deprecation policy"
---

## 解決什麼問題

廢棄沒人管會變成永遠的技術債。Deprecation Plan 規範公告時間、替代方案、強制下線日，並用監控確認沒人在用才動手。

## 誰負責、和誰對接

- **主責：** Architect + PO
- **協作：** Dev（替代實作）、Customer Success（外部通知）、DevOps（流量監控）
- **下游收件：** Release Plan、ADR、Cost Monitor

## 何時用、何時不用

- ✅ **必要時機：** 舊 API 已有替代、schema 演進、第三方依賴退場
- ❌ **不需要時：** 內部可直接重構、無外部消費者
- ⚠️ **常見誤用：** 只發 email 不監控流量；公告期過短；無替代方案

## AI 怎麼加速

把 access log + endpoint inventory + 客戶清單餵給 Claude 抽殘留 caller 與遷移工作量，Architect / PO 審 timeline 與 fallback。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 architect（熟悉 ADR、OpenAPI、breaking change policy、GitLab deprecation policy、SOC 2 變更通知）。任務：把 access log + endpoint inventory + 客戶清單轉成 deprecation plan（YAML 格式）。

<input>
[Access log（過去 ≥ 30 天，含 caller identifier）]
[Endpoint inventory（版本、owner、replacement 對應）]
[客戶 / 內部 consumer 聯絡清單]
</input>

輸出 schema：deprecated_surface / replacement_path / sunset_timeline / affected_consumers / comms_channels / fallback_for_holdouts / success_criteria / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；timeline 最短 90 天公告期。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 10+ 年分散式系統經驗的資深 architect / platform owner，熟悉 ADR、OpenAPI、event-driven、breaking change policy、GitLab deprecation policy、Semantic Versioning、SOC 2 變更通知合規。
你的輸出會交給 Dev（實作替代 + 監控）、Customer Success（外部通知）、DevOps（流量監控與下線執行）、Legal（合約變更通知）、PO（驗業務影響）。
他們需要可追蹤、可監控、可回滾的下架計畫，所以每個階段必須有量化 success criteria。
</role>

<context>
舊 API、舊 endpoint、舊 schema 仍有使用但需退場時用本卡。
本卡核心問題：把「下架」從口頭承諾變成可追蹤的遷移，並用監控確認沒人在用才動手。
</context>

<input>
[Access log（過去 ≥ 30 天，含 caller identifier、頻率、版本）]
[Endpoint inventory（版本、owner、replacement 對應）]
[客戶 / 內部 consumer 聯絡清單（含合約條款）]
[現有 SLO 與 traffic baseline]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認] 或 unknown_caller。
2. Trade-off 必須列負面後果（例如：90 天公告期太短會擋住企業客戶採購週期；180 天太長會延遲新功能 X）。
3. 缺資料寫 TODO(缺什麼)，不要編造；caller 無法識別寫 unknown_caller 並列追查方式，不要假設誰在用。
4. SLO compliance：下線過程不能違反現有 SLO；NFR 含合約通知條款（SOC 2 / GDPR 適用時 ≥ 30 天）、最短公告期 90 天、強制下線前 traffic ≤ 0.1%。
5. Out of scope：明列 3 條（例如：替代方案實作細節、合約罰款計算、產品行銷宣傳）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 必須有 rollback / 延期 plan；不能設定「強制下線無例外」。
</rules>

<output_schema>
deprecated_surface:
  required: true
  type: object
  identifier: <e.g. GET /api/v1/users>
  version: <e.g. v1>
  reason: <why deprecating>
  source: <input ref>
  confidence: H | M | L

replacement_path:
  new_surface: <e.g. GET /api/v2/users>
  migration_guide: <link or TODO>
  feature_parity: enum[full, partial, breaking_changes]
  breaking_changes: [<change>]

sunset_timeline:
  announce_date: <ISO>
  warning_phase_start: <ISO>  # 開始回傳 Deprecation header
  read_only_phase: <ISO>  # 拒絕新 client
  disable_date: <ISO>  # 軟下線
  remove_date: <ISO>  # 程式碼移除
  minimum_total_days: <≥ 90>
  source: <input ref>
  confidence: H | M | L

affected_consumers:
  - consumer_id: <client_id or org>
    contact: <email / Slack channel>
    request_count_30d: <number>
    business_tier: enum[free, paid, enterprise]
    contractual_notice_required_days: <number>
    migration_eta: <ISO or TODO>
    source: <input ref>

comms_channels:
  - channel: <e.g. status page>
    cadence: <e.g. T-90d, T-60d, T-30d, T-7d, T-1d>
  - channel: email
    target: <all affected consumers>
  - channel: in-app banner
    target: <signed-in users>

fallback_for_holdouts:
  policy: <e.g. enterprise client 可申請 30d 延期，最多 2 次>
  approval: <role>
  cost_of_extension: <internal effort + risk>

success_criteria:
  - metric: caller_count_at_disable_date
    target: <e.g. 0 unknown callers, ≤ 5 known callers with approved extension>
  - metric: traffic_share_at_disable_date
    target: <≤ 0.1% of baseline>
  - metric: rollback_capability_window
    target: <e.g. 14d after disable, ≤ 1h to re-enable>

decision_log:
  - decision: <e.g. 公告期 90d vs 180d>
    options_considered: [60d, 90d, 180d]
    chosen: 90d
    rejected_reason:
      "60d": <違反合約 30d + 採購週期>
      "180d": <延誤新版上線 ROI>
    confidence: H | M | L

out_of_scope:
  - 替代方案實作細節（屬 ADR / API spec）
  - 合約罰款計算（屬 Legal）
  - 產品行銷宣傳（屬 PMM）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最大 caller、最低 caller 但合約最嚴、unknown caller bucket）各標 H/M/L confidence
2. 列至少 2 條 timeline 路徑（aggressive 90d vs conservative 180d）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如客戶遷移速度、企業客戶採購週期）
4. 確認合約通知、SLO 保護、rollback 三象限都涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如合約條款摘要、unknown caller IP / UA 反查），是哪一份？為什麼？
</verify>
```

回審重點：human 判斷時程是否符合合約、unknown caller 是否需先解決才能下線、fallback 政策是否可被執行、rollback window 是否足夠。
