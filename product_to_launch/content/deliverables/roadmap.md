---
title: "Roadmap · 產品路線圖"
slug: "roadmap"
stage: "define"
roles: ["pm"]
order: 10
hook: "讓 stakeholder 看到「未來三季要解什麼問題」而非「哪天上 feature」"
when_to_use: "跨季規劃、stakeholder 對齊、招募與資源預估時"
ai_leverage: "用 Claude 把 backlog + OKR + 依賴 → outcome-based roadmap"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

把 roadmap 寫成「Q3 上線 feature X」是常見錯誤；一旦延期，整份文件失信。
Roadmap 應該是**outcome-based**：列出「要解什麼 problem / 達到什麼 outcome」，feature 只是手段，可以替換。
沒有 roadmap，stakeholder 無法做資源預估、業務無法做承諾、招募無法規劃。

## 誰負責、和誰對接

- **主責：** PM
- **協作：** PO（驗證 backlog 可行性）、Dev Lead（估 capacity）、Stakeholders（對齊商業節奏）
- **下游收件：** PO 排 backlog、HR 規劃招募、業務做客戶承諾

## 何時用、何時不用

- ✅ **必要時機：** 跨季規劃、stakeholder ≥ 5 人需對齊、有外部承諾需求
- ❌ **不需要時：** 純探索期、產品 PMF 未確認、團隊 < 5 人
- ⚠️ **常見誤用：** 寫成 Gantt chart 鎖死日期（變更成本極高）；應用「now / next / later」三欄結構，越遠越粗

## AI 怎麼加速

把 OKR + backlog + 跨團隊依賴 + capacity 估算丟給 AI 排 outcome-based roadmap（now/next/later），人工只審 outcome 是否真為 outcome（不是包裝成 outcome 的 feature）。

```prompt-quick
你是有 5+ 年 SaaS B2B 經驗的資深 PM（熟悉 OKR / JTBD / PRD / ADR / outcome-based roadmap）。任務：把 OKR + backlog + 依賴 + capacity 轉成 outcome-based roadmap（YAML 格式）。

<input>
[OKR（本季 + 下季）]
[Backlog + RICE 分數]
[跨團隊依賴清單 + capacity 估算]
</input>

輸出 schema：now_next_later / outcomes[]（含 leading KPI）/ dependencies（cross-team / tech）/ bets_and_milestones / capacity_assumptions / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；outcome 必須描述「解什麼問題」而非「上什麼 feature」；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 SaaS B2B 經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、outcome-based roadmap、now/next/later 框架、SAFe portfolio。
你的輸出會交給 PO（依 roadmap 排 backlog 與 sprint）、HR（規劃招募）、業務（對客戶做承諾）、Stakeholders（資源預估與商業節奏對齊）。
他們需要在 quarter-kickoff 會議用 roadmap 做承諾與資源決策，所以 outcome 必須真為 outcome、依賴必須真實、信心必須誠實。
</role>

<context>
跨季規劃、stakeholder ≥ 5 人需對齊、有外部承諾需求時用本 roadmap。
本卡核心問題：讓 stakeholder 看到「未來三季要解什麼問題」而非「哪天上什麼 feature」，feature 是手段，可被替換。
</context>

<task>
根據以下 input 產出「Roadmap · 產品路線圖」draft，採 now / next / later 三欄結構，越遠越粗。
</task>

<input>
[OKR（本季 + 下季 + 北極星指標）]
[Backlog + RICE 分數 + 已驗證 user pain]
[跨團隊依賴清單 + capacity 估算 + 外部承諾與 deadline]
</input>

<rules>
1. 每個 outcome 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Outcome 必須描述「解什麼問題 / 達到什麼狀態」，禁止寫 feature 名（負面後果：feature 延期整份 roadmap 失信，但 outcome 可用替代手段達成）。
3. 每個 outcome 必含 leading KPI（季中可調整）+ lagging KPI（季末判定）。
4. 越遠越粗：now 欄需含具體 initiative；next 欄列方向 + 信心區間；later 欄列假設 + 觸發條件。
5. 跨團隊依賴必標 owner team + 預期完成週次 + fallback plan；外部 blocker 必標等待對象 + 替代方案。
6. Capacity 假設必標：團隊人力 / 預留 incident & tech debt budget %（建議 20–30%）/ 招募節奏。
7. Out of scope 至少 3 條（例：純技術重構走 tech roadmap、bug fix 走運維 sprint、實驗性 spike 走 discovery budget）。
</rules>

<output_schema>
now_next_later:
  now:
    timeframe: <例：current quarter>
    outcomes: [<outcome-id>]
    initiatives_committed: [<具體 initiative>]
  next:
    timeframe: <例：next quarter>
    outcomes: [<outcome-id>]
    initiative_candidates: [<候選 initiative，未承諾>]
  later:
    timeframe: <例：2-3 quarters out>
    outcomes: [<outcome-id>]
    triggers_to_promote: [<什麼條件下會升到 next>]

outcomes:
  - id: OUT-001
    statement: <要解什麼問題 / 達到什麼狀態>
    leading_kpi:
      metric: <週/月可看>
      target: <number>
    lagging_kpi:
      metric: <季末看>
      target: <number>
    candidate_initiatives: [<手段 A, 手段 B>]
    aligned_okr: <OKR-id>
    source: <input ref>
    confidence: H | M | L

dependencies:
  cross_team:
    - dep_id: DEP-001
      owner_team: <team>
      needed_by_week: <ISO week>
      fallback_plan: <若延遲怎麼辦>
      confidence: H | M | L
  tech_dependencies: [<infra / platform 升級>]
  external_blockers:
    - blocker: <vendor / regulator>
      awaiting: <what>
      alternative: <plan B>

bets_and_milestones:
  - bet_id: BET-001
    hypothesis: <我們相信...，因為...>
    invalidation_signal: <什麼訊號代表錯了>
    milestone_check: <什麼時間點檢查>
    sunset_criteria: <什麼條件下放棄>

capacity_assumptions:
  team_size: <FTE>
  reserved_for_incident_and_tech_debt: <%>
  hiring_pipeline: <下季預計報到人數>
  velocity_baseline: <近 3 sprint 平均>
  source: <input ref>

decision_log:
  - decision: <例：為何 outcome A 放 now 而非 next>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本 roadmap 不含 thing 1，例：純技術重構走 tech roadmap>
  - <本 roadmap 不含 thing 2，例：bug fix 走運維 sprint>
  - <本 roadmap 不含 thing 3，例：實驗性 spike 走 discovery budget>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（OKR 連結強度、客戶承諾 deadline、跨團隊 capacity 風險），標 H/M/L confidence
2. 列至少 2 條 viable roadmap 策略（聚焦少數大 outcome vs 並行多個小 outcome），各自負面後果（聚焦會錯過多元商業機會；並行會 capacity 攤薄拖延）
3. 列你做了但 input 沒明說的假設（招募節奏、市場節奏、依賴團隊優先級）
4. 確認每個 outcome 描述都是「狀態 / 結果」而非「feature 名」
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 outcome 其實是 feature 包裝？列出來與重寫建議。
2. 哪些假設來自我而非 input（特別是依賴團隊優先級 / capacity 數字）？標出來。
3. 如果只能再追加一份 input（依賴團隊 commitment / 客戶訪談 / capacity 實測），哪一份對 roadmap 品質提升最大？
</verify>
```

回審重點：human 判斷是否真為 outcome（不是 feature 改名）、依賴是否真實、信心分數是否誠實、capacity 預留是否足夠應付 incident。
