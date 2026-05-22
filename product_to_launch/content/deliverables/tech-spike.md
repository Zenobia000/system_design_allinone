---
title: "Tech Spike · 技術探索"
slug: "tech-spike"
stage: "design"
roles: ["architect", "dev"]
order: 28
hook: "用最小成本買回最大不確定性"
when_to_use: "有技術假設無法靠紙上分析證實，且決策延後比做錯更貴時"
ai_leverage: "用 Claude 收斂候選方案到 2-3 個 + 列出對應實驗變數"
art: "/generated/stage-design.png"
source: "software_architect/ppt/05-ilities, deep-research-report.md §Architecture Design"
---

## 解決什麼問題

ADR 寫不下去，因為關鍵變數沒人量過。Spike 是時間盒住的實驗，只為了輸出「決策所需的數字或失敗證據」，不是寫產品代碼。

## 誰負責、和誰對接

- **主責：** Architect 或資深 Dev
- **協作：** SA 對齊問題定義、DevOps 提供環境
- **下游收件：** ADR 撰寫者、Dev Lead

## 何時用、何時不用

- ✅ **必要時機：** 跨系統整合風險、效能假設、第三方 SDK 邊界
- ❌ **不需要時：** 答案線上搜尋 30 分鐘可得、團隊已有經驗
- ⚠️ **常見誤用：** Spike 變成偷渡正式功能；沒有時間盒；產出 demo 而非結論

## AI 怎麼加速

把問題陳述 + 約束丟給 AI 收斂到 2-3 個候選方案，人類只下場跑數字。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 software architect（熟悉 ADR / CAP / SLO / 效能 benchmark / time-boxed spike）。任務：把問題陳述 + 約束轉成 tech spike 計畫（YAML 格式）。

<input>
[問題陳述 + 為何延後決策更貴]
[約束（NFR / cost / time-box / 既有 stack）]
[候選方案來源（社群討論 / vendor doc / 內部經驗）]
</input>

輸出 schema：spike_goal / hypothesis / candidate_options（≤3，含核心假設） / evaluation_criteria / experimental_variables / time_box / exit_criteria / recommendation / follow_up_decisions / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造數字。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 10+ 年分散式系統經驗的資深 software architect / staff engineer，熟悉 ADR、CAP、SLO、效能 benchmark、time-boxed spike、event-driven trade-off。
你的輸出會交給 ADR 撰寫者（用 spike 結論支撐決策）、Dev Lead（評估後續實作成本）。
他們需要 spike 結束時拿到「決策所需的數字或失敗證據」，不是 demo，所以計畫必須 time-box、exit criteria 明確、變數可量測。
</role>

<context>
有技術假設無法靠紙上分析證實、且決策延後比做錯更貴時用本 spike。
本卡核心問題：用最小成本買回最大不確定性 — 在 time-box 內輸出「決策需要的數字或失敗證據」。
</context>

<input>
[問題陳述 + 為何延後決策更貴（business impact）]
[約束（NFR / cost ceiling / time-box 上限 / 既有 stack）]
[候選方案來源（社群討論 / vendor doc / 內部經驗 / 既有 PoC）]
</input>

<rules>
1. 每個假設與候選方案註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：選 Kafka 驗證則犧牲 RabbitMQ 的學習，後續若選 RabbitMQ 仍需另開 spike）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造 benchmark 數字。
4. NFR 對齊：spike 必須對應到 latency / throughput / availability / cost 至少一個可量測 SLO（任一沒列要說明）。
5. Out of scope 至少 3 條（例：本 spike 不寫產品 code、不做 UI、不評估非候選方案）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. Exit criteria 必須是布林條件（例：「p95 < 200ms 且 cost < $X/月」），不能是「感覺夠快」。
</rules>

<output_schema>
spike_goal:
  question: <一句話的決策問題，例：Kafka 在我們的 throughput / latency / cost 條件下是否優於 RabbitMQ>
  decision_owner: <role>
  source: <input ref>
  confidence: H | M | L

hypothesis:
  primary: <主要假設，可被推翻的形式>
  null_hypothesis: <反例>
  confidence: H | M | L

candidate_options:
  - name: <Option A>
    core_assumption: <核心假設>
    expected_failure_mode: <最可能失敗的點>
    setup_cost: <hours>
  - name: <Option B>
    ...
  # 最多 3 個，含「不做 / 維持現狀」如適用

evaluation_criteria:
  - metric: p95_latency
    target: < 200ms
    measurement: <how>
  - metric: cost_per_million_msg
    target: < $X
    measurement: <how>

experimental_variables:
  independent: [<e.g. broker, batch size>]
  dependent: [<e.g. p95 latency, throughput>]
  controlled: [<e.g. hardware, payload size>]

time_box:
  duration: <e.g. 5 person-days>
  hard_stop: <YYYY-MM-DD>
  rationale: <為何這個 box>

exit_criteria:
  success: <布林條件：所有候選都跑完且至少 1 個達標>
  abort: <布林條件：time-box 到 / 第三方 SDK 不可用 / 假設已被推翻>

recommendation:
  chosen: <Option A | abort | continue spike>
  rationale: <data 而非感覺>
  confidence: H | M | L

follow_up_decisions:
  - decision: <e.g. 寫 ADR-017 採用 Kafka>
    owner: <role>
    due: <YYYY-MM-DD>

decision_log:
  - decision: <e.g. 為何不評估 NATS>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - 本 spike 不寫產品 code / UI / 監控儀表板
  - 不評估候選清單外的方案（除非主要假設被推翻）
  - 不做安全 / 合規深入評估（由 threat model 接手）
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵不確定變數，標 H/M/L confidence
2. 列至少 2 條 viable 實驗路徑（最小驗證 vs 完整 benchmark），各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設可用 staging 環境跑、假設 payload 大小）
4. 確認 exit criteria 是布林、time-box 是硬截止
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些 benchmark 數字假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
</verify>
```

回審重點：time-box 是否硬截止、exit criteria 是否布林、是否真正用最小成本買最大不確定性、有沒有偷渡正式功能。
