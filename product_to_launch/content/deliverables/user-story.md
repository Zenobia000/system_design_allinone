---
title: "User Story · 使用者故事"
slug: "user-story"
stage: "define"
roles: ["po", "ba"]
order: 11
hook: "把 PRD 切成可估、可做、可驗收的最小單位"
when_to_use: "Sprint planning 前、backlog refinement 時"
ai_leverage: "用 Claude 把 PRD section → user story 群組 + INVEST 自檢"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 寫得再好，工程師也不能直接拿去寫 code——粒度太大、無法估時、無法驗收。
User Story 把 PRD 切成「一個 sprint 內可做完」的最小單位，並把「誰、為何、做什麼」寫清楚。
沒有 user story，sprint planning 變成猜謎遊戲；估時不準、驗收不清、demo 沒看點。

## 誰負責、和誰對接

- **主責：** PO（最終排序與接受度）
- **協作：** BA（補規則細節）、Dev（驗證估時）、QA（驗收條件）
- **下游收件：** Dev 寫 code、QA 寫 test case、PO 在 sprint review 驗收

## 何時用、何時不用

- ✅ **必要時機：** Sprint-based delivery、backlog ≥ 20 item、跨職能團隊
- ❌ **不需要時：** Bug fix（用 bug ticket 即可）、純技術重構（用 tech task）
- ⚠️ **常見誤用：** 寫成 "As a user, I want a button" 這種沒動機的 story；必須含 **persona + action + benefit**，並符合 INVEST（Independent, Negotiable, Valuable, Estimable, Small, Testable）

## AI 怎麼加速

把 PRD section + persona 卡 + 既有 story 命名慣例丟給 AI 產 user story 群與 INVEST 自檢，人工只審動機是否真實、估點是否敢承諾。

```prompt-quick
你是有 5+ 年 agile 經驗的資深 PO（熟悉 backlog 拆解、user story、INVEST 原則）。任務：把 PRD section + persona 轉成 user story 群（YAML 格式）。

<input>
[PRD section]
[Persona 卡 / JTBD]
[既有 story 命名慣例]
</input>

輸出 schema：stories[] (As a / I want / So that + INVEST checklist) / epic_groupings / acceptance_criteria_refs / story_size_estimate / dependencies / decision_log / out_of_scope（3 條）

每個 story 附 source: [input 第 X 段] 與 confidence: [H/M/L]；INVEST 不符項必須標 fail reason；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 agile 經驗的資深 PO，熟悉 backlog 拆解、user story 寫作、INVEST 原則、SAFe / Scrum / Kanban、JTBD。
你的輸出會交給 Dev（拿 story 寫 code）、QA（拿 acceptance criteria 寫 test case）、PO 自己（sprint review 驗收）、Sprint planning（估點與排序）。
他們需要在 backlog refinement 1 小時內判斷「這 story 一個 sprint 內做得完嗎」，所以粒度必須對、動機必須真。
</role>

<context>
Sprint-based delivery、backlog ≥ 20 item、跨職能團隊、PRD section 已穩定時用本卡。
本卡核心問題：把 PRD 切成「一個 sprint 內可做完、可估、可驗收」的最小單位，並把「誰、為何、做什麼」寫清楚。
</context>

<task>
根據以下 input 產出「User Story · 使用者故事」draft，含 INVEST 自檢與依賴圖。
</task>

<input>
[PRD section（含 functional reqs / acceptance）]
[Persona 卡 / JTBD（含 functional / emotional / social job）]
[既有 story 命名慣例 + team 估點 baseline]
</input>

<rules>
1. 每個 story 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Story 必須含 persona + action + benefit 三段；缺任一視為 fail。禁止「As a user, I want a button」這類無動機 story。
3. 每個 story 必須通過 INVEST 自檢：Independent / Negotiable / Valuable / Estimable / Small / Testable，任一不符標出 reason（負面後果：story 太大會延期跨 sprint、太小會被 dev 抱怨切碎）。
4. Acceptance criteria 用 Given/When/Then 格式，每 story 至少 2 條 happy + 1 條 error path。
5. Story point 用 Fibonacci 1/2/3/5/8/13；> 8 點必須建議拆分。
6. 標 confidence: [H/M/L]；L 必須附「為何不確定，需要什麼補上」。
7. Out of scope 至少 3 條（例：純技術 spike 走 tech task、bug fix 走 bug ticket、跨 sprint 的 epic 留在 backlog refinement）。
</rules>

<output_schema>
stories:
  - id: US-001
    epic: <epic name>
    statement: |
      As a <persona>,
      I want to <action>,
      so that <benefit>.
    invest_check:
      independent: enum[pass, fail]
      negotiable: enum[pass, fail]
      valuable: enum[pass, fail]
      estimable: enum[pass, fail]
      small: enum[pass, fail]
      testable: enum[pass, fail]
      fail_reasons: [<若有 fail，列原因>]
    acceptance_criteria_refs: [<AC-id>]
    story_size_estimate:
      points: enum[1, 2, 3, 5, 8, 13]
      rationale: <為何此點數，對齊 team baseline>
    dependencies:
      blocks: [<US-id>]
      blocked_by: [<US-id>]
      external: [<外部系統 / 第三方>]
    source: <input ref>
    confidence: H | M | L

epic_groupings:
  - epic_id: EPIC-A
    stories: [<US-id>]
    business_value: <對應 OKR / north star>

acceptance_criteria_refs:
  format: Given/When/Then
  link_to_card: acceptance-criteria

story_size_estimate:
  baseline_reference: <team 的 3 點 story 範例>
  total_points: <本批次總點數>
  capacity_fit: <本批次能否進當前 sprint>

dependencies:
  graph: <ASCII / mermaid 描述>
  critical_path: [<US-id, 由源頭到末端>]

decision_log:
  - decision: <例：US-A 為何拆成兩個 story 而非一個>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本批次不含 thing 1，例：純技術 spike>
  - <本批次不含 thing 2，例：bug fix>
  - <本批次不含 thing 3，例：跨 sprint epic>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（PRD 高頻 functional req / persona 真實 job / 既有 estimation baseline），標 H/M/L confidence
2. 列至少 2 條 viable 切片策略（橫切：UI/API/DB 分層 vs 縱切：完整 user flow），各自負面後果（橫切會出現「沒完整 demo 點」；縱切會出現「story 過大估點不準」）
3. 列你做了但 input 沒明說的假設（team velocity / 既有元件 / 平台限制）
4. 確認每個 story 都能由單一 dev pair 在一個 sprint 內 demo 出來
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 story 點數 > 5 且未拆分？列出來與拆分建議。
2. 哪些假設來自我而非 input（特別是 velocity / 既有元件）？標出來。
3. 如果只能再追加一份 input（persona 訪談 / 過去 sprint velocity / UI mockup），哪一份對 story 品質提升最大？
</verify>
```

回審重點：story 是否真為「一個 sprint 可完成」、acceptance 是否可被 QA 直接拿去寫測試、INVEST fail 項目是否誠實標出。
