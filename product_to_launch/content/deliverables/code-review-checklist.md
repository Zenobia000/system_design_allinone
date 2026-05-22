---
title: "Code Review Checklist"
slug: "code-review-checklist"
stage: "build"
roles: ["dev"]
order: 33
hook: "把 review 從個人品味變成可重現流程"
when_to_use: "review 品質依賴特定資深人員、或新人 onboarding 多時"
ai_leverage: "用 Claude 跑 first-pass，人類專注 trade-off 與邊界情況"
art: "/generated/stage-build.webp"
source: "software_architect/ppt/05-ilities §Maintainability"
---

## 解決什麼問題

每個 reviewer 看不同的東西，品質起伏大。Checklist 把「最低必看項目」標準化：正確性、安全、可觀測性、可回滾，剩下交給人類判斷。

## 誰負責、和誰對接

- **主責：** Dev Lead 維護
- **協作：** Security、SRE、QA 各補一個維度
- **下游收件：** 全體 Reviewer

## 何時用、何時不用

- ✅ **必要時機：** 中大型團隊、跨團隊 PR、敏感模組
- ❌ **不需要時：** 兩人團隊、強信任實驗專案
- ⚠️ **常見誤用：** 變成形式填表；把 lint 能做的事放進來

## AI 怎麼加速

讓 Claude 對 diff 跑 checklist first-pass，列出疑似違規 + 行號，reviewer 只審 AI 標記點。

```prompt-quick
你是有 7+ 年生產系統經驗的資深 staff engineer（熟悉效能調校、observability、breaking change policy）。任務：把 diff + coding standard + 既有 checklist 轉成 Code Review Checklist first-pass（YAML 格式）。

<input>
[git diff 全文]
[coding standard / style guide]
[既有 review checklist 版本]
</input>

輸出 schema：dimensions[] (correctness/readability/perf/security/test/observability/a11y) / severity_levels / must_block_vs_nit / escalation_path / slo_for_review_turnaround / findings[] (line/dimension/severity/evidence)

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年生產系統經驗的資深 staff engineer，熟悉效能調校、observability、breaking change policy，平時是 trusted reviewer。
你的輸出會交給 reviewer（依嚴重度決定 must-block / nit / question）、PR 作者（修正）、Dev Lead（追品質趨勢）。
他們需要知道「哪幾條一定要擋下、哪幾條只是建議」，所以你的 checklist 必須分嚴重度、可機械抽取、可追溯到行號。
</role>

<context>
中大型團隊、跨團隊 PR、敏感模組時用本 Code Review Checklist。
本卡核心問題：把 review 從個人品味變成可重現流程 — 最低必看項目標準化，剩下交給人類判斷。
</context>

<input>
[git diff 全文（含檔案路徑與行數）]
[現行 coding standard / style guide]
[既有 review checklist 版本（如有）]
</input>

<rules>
1. 每個 finding 註明 source：[diff 檔案:行號] + [違反 standard 第 X 條]，缺一者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：strict observability 檢查會延長 review turnaround 30%）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」（例：缺 perf benchmark 無法判斷效能 finding 就標 TODO）。
4. 七象限必須涵蓋：correctness / readability / perf / security / test / observability / a11y；任一沒 finding 也要標「已檢視，無 finding」。
5. Out of scope 至少 3 條，明寫本 checklist 不處理（例：不處理 commit message、不處理 lint 已涵蓋項目、不處理 architecture review）。
6. 每個 finding 標 confidence: [H/M/L]，L 必須附說明（避免 false positive 浪費 reviewer 時間）。
7. must_block 與 nit 必須清楚分級 — must_block = 不修不能 merge；nit = 建議但作者可拒絕。
</rules>

<output_schema>
dimensions:
  correctness: { covered: true, findings: [<ref>] }
  readability: { covered: true, findings: [<ref>] }
  perf: { covered: true, findings: [<ref>] }
  security: { covered: true, findings: [<ref>] }
  test: { covered: true, findings: [<ref>] }
  observability: { covered: true, findings: [<ref>] }
  a11y: { covered: true | false_with_reason }

severity_levels:
  - level: must_block
    definition: <不修不能 merge>
    examples: [security hole, data loss risk, breaking API]
  - level: should_fix
    definition: <強烈建議，PR 內修>
  - level: nit
    definition: <建議，作者可拒絕>

findings:
  - id: F-001
    file: <path>
    line: <number>
    dimension: correctness | security | ...
    severity: must_block | should_fix | nit
    evidence: <code snippet 或引用 standard 條號>
    suggested_fix: <一句話>
    source: <input ref>
    confidence: H | M | L

must_block_vs_nit:
  block_criteria: <什麼條件下升級為 block>
  nit_cap: <每 PR nit 上限，避免 review 變吵架>

escalation_path:
  on_disagreement: <作者與 reviewer 不同意時的流程，例如：Dev Lead 仲裁>
  on_security_finding: <立即 cc Security>

slo_for_review_turnaround:
  first_response: <e.g. 4 working hours>
  full_review: <e.g. 1 working day>
  source: <input ref>

decision_log:
  - decision: <如：a11y 列為 dimension 但對 backend-only PR 標 N/A>
    options_considered: [always_block, conditional, drop]
    chosen: conditional
    rejected_reason:
      always_block: <why not>
      drop: <why not>
    confidence: H | M | L

out_of_scope:
  - 本 checklist 不重複 linter 已涵蓋項目（避免 noise）
  - 不處理 commit message 規範
  - 不處理 architecture / design review（屬另一張卡）
</output_schema>

<thinking>
產出前先：
1. 從 diff 抓 3-5 個風險熱點（auth 路徑 / data mutation / 共用 util / 新依賴），分別標 H/M/L confidence
2. 列至少 2 條 viable severity 策略（嚴格 vs 寬鬆），各自負面後果
3. 列你做了但 input 沒明說的假設（例如假設已有 SLO 監控）
4. 確認 7 dimension 全部 covered，沒覆蓋的要寫原因
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 finding confidence < H？是否會造成 reviewer 浪費時間追假陽性？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是 production incident 史還是更多 diff context？為什麼？
</verify>
```

回審重點：human 判斷 must_block 升級是否合理、是否漏掉 security / a11y、AI 標記點的 false positive 比例。
