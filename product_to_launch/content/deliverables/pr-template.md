---
title: "PR Template"
slug: "pr-template"
stage: "build"
roles: ["dev"]
order: 32
hook: "讓作者在按下 Create PR 之前先回答 reviewer 會問的問題"
when_to_use: "團隊 PR 數量上升、review 來回成本高時"
ai_leverage: "用 Claude 從 diff 自動產出 PR 描述初稿"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Implementation, GitLab Handbook"
---

## 解決什麼問題

Review 卡住通常不是程式碼難，是脈絡缺。PR Template 強制作者寫清楚「為什麼改、改了什麼、怎麼驗證、有什麼風險」。

## 誰負責、和誰對接

- **主責：** Dev Lead 維護模板、Dev 填寫
- **協作：** QA（驗證欄位）、DevOps（rollout 欄位）
- **下游收件：** Reviewer、release notes、incident retro

## 何時用、何時不用

- ✅ **必要時機：** 任何進主幹的 PR
- ❌ **不需要時：** trivial typo 修正可允許簡化版
- ⚠️ **常見誤用：** 模板太長無人填；只剩標題格式檢查

## AI 怎麼加速

讓 Claude 讀 diff + commit message 產出 PR description 初稿，作者只需補風險與驗證證據。

```prompt-quick
你是有 7+ 年生產系統經驗的資深 staff engineer（熟悉效能調校、observability、breaking change policy）。任務：把 diff + commit message + 關聯 issue 轉成 PR description（YAML 格式）。

<input>
[git diff 全文]
[commit message 序列]
[關聯 issue / ticket 描述]
</input>

輸出 schema：summary / why / changes / test_plan / risk / rollback / breaking_change_flag / screenshots_for_ui / reviewer_checklist / security_review_trigger

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年生產系統經驗的資深 staff engineer，熟悉效能調校、observability、breaking change policy，平時也擔任 reviewer。
你的輸出會交給 reviewer（決定 approve / request changes）、release manager（寫 release notes）、incident retro（追溯變更）。
他們需要 5 分鐘內判斷「該不該合、出事怎麼回滾」，所以你的 PR description 必須結構嚴格、風險誠實、可機械抽取。
</role>

<context>
團隊 PR 數量上升、review 來回成本高時用本 PR Template。
本卡核心問題：讓作者在按下 Create PR 之前先回答 reviewer 會問的問題 — 為什麼改、改了什麼、怎麼驗證、有什麼風險、怎麼回滾。
</context>

<input>
[git diff 全文（含檔案路徑與行數）]
[commit message 序列]
[關聯 issue / ticket 描述（PRD、bug ticket）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段 diff/commit/issue] 或 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選擇 in-place migration 會犧牲 zero-downtime 但減少回滾複雜度）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」（例：缺 perf benchmark 就標 TODO，不要說「沒有效能影響」）。
4. Security / observability / breaking-change 三項必須涵蓋；任一象限沒提到要說明為何不適用。
5. Out of scope 至少 3 條，明寫本 PR 不處理什麼（避免 scope creep）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明（例：「沒有效能影響」若無 benchmark 應標 L）。
7. Risk 段必須具體：blast radius（哪些 user / endpoint / dataset）、檢測訊號、回滾步驟。
</rules>

<output_schema>
summary:
  one_liner: <50 字內>
  type: feat | fix | refactor | perf | docs | chore | breaking
  source: <input ref>

why:
  problem: <要解決什麼>
  link_to_issue: <URL or TODO(缺 issue)>
  source: <input ref>
  confidence: H | M | L

changes:
  - file: <path>
    summary: <做了什麼>
    risk_level: low | mid | high
    source: [diff 第 X 段]

test_plan:
  unit: [<test name>]
  integration: [<scenario>]
  manual: [<step>]
  evidence: <screenshot / log / TODO(缺證據)>

risk:
  blast_radius: <哪些 user / endpoint / dataset>
  detection_signals: [<metric / log query>]
  known_unknowns: [<unknown 1>, <unknown 2>, <unknown 3>]
  confidence: H | M | L

rollback:
  strategy: revert | feature_flag_off | data_migration_down
  steps: [<step 1>, <step 2>]
  data_safety: <是否會 lose data>

breaking_change_flag:
  is_breaking: true | false
  affected_consumers: [<service / client>]
  migration_guide: <link or TODO>

screenshots_for_ui:
  required: <true if UI changed>
  before: <link or N/A>
  after: <link or N/A>

reviewer_checklist:
  - [ ] correctness
  - [ ] error_handling
  - [ ] tests_added
  - [ ] observability (log / metric / trace)
  - [ ] security (auth / input validation / secret)
  - [ ] backward_compatibility

security_review_trigger:
  triggered: true | false
  reason: <auth / crypto / PII / new dependency / network exposure 之一>
  source: <input ref>

decision_log:
  - decision: <e.g. 選 in-place migration 而非 dual-write>
    options_considered: [in-place, dual-write, blue-green]
    chosen: in-place
    rejected_reason:
      dual-write: <why not>
      blue-green: <why not>
    confidence: H | M | L

out_of_scope:
  - 本 PR 不處理 <相關但留後做的 item 1>
  - 不處理 <item 2>
  - 不處理 <item 3>
</output_schema>

<thinking>
產出前先：
1. 從 diff 抓 3-5 個高風險變更點（schema 改動 / auth 路徑 / 共用 util），分別標 H/M/L confidence
2. 列至少 2 條 viable rollback 策略，各自負面後果
3. 列你做了但 input 沒明說的假設（例如假設有 feature flag）
4. 確認 security / observability / breaking-change 三項都被檢視
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？特別是 risk 與 perf 宣稱有沒有 benchmark 支撐？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是 perf benchmark 還是 PRD？為什麼？
</verify>
```

回審重點：human 判斷 risk blast radius 是否誠實、rollback 是否真的可執行、breaking change 是否漏判。
