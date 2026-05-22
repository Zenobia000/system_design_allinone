---
title: "PRD · 產品需求文件"
slug: "prd"
stage: "define"
roles: ["pm"]
order: 8
hook: "把模糊需求變可執行規格"
when_to_use: "團隊 ≥ 3 人、跨職能新功能、需求穩定度 < 60% 時必要"
ai_leverage: "用 Claude 把訪談 + JTBD + journey → PRD draft，人工審 trade-off"
art: "/generated/key-deliverable-prd.webp"
source: "deep-research-report.md §產品與需求相關角色 / §可複製範本"
---

## 解決什麼問題

沒有 PRD，工程師會用自己的 假設寫程式、設計師用自己的 假設畫稿、QA 用自己的 假設寫 case。
三邊各跑各的，第二週才發現對不上，全部重做。
PRD 不是文件儀式，是**讓 PM、UX、Architect、Dev、QA 在開工前對齊「為何做、做什麼、不做什麼」的決策中樞**。

## 誰負責、和誰對接

- **主責：** PM（最終簽核 scope 與 KPI）
- **協作：** UX（驗證需求）、Architect（評估技術可行性）、BA（補規則細節）
- **下游收件：** PO 寫 backlog、Dev Lead 切任務、QA 寫 test plan、UX 畫 flow

## 何時用、何時不用

- ✅ **必要時機：** 跨團隊新功能、影響 ≥ 2 個系統元件、需求穩定度 < 60%
- ❌ **不需要時：** Bug fix、單一團隊內 < 3 人協作、技術探索 spike
- ⚠️ **常見誤用：** 把 PRD 當設計稿寫（要寫 what & why，不寫 how）；把 PRD 當合約鎖死（應是 baseline + change policy）

## AI 怎麼加速

把 discovery 階段所有素材丟給 AI 產 PRD draft，人工只審 trade-off。

```prompt-quick
你是有 SaaS B2B 5+ 年經驗的資深 PM（熟悉 OKR / JTBD / PRD / ADR）。任務：把訪談 + JTBD + journey 轉成 PRD draft（YAML 格式）。

<input>
[訪談逐字稿]
[JTBD 卡]
[Journey map]
</input>

輸出 schema：problem_statement / goal_and_metrics / users_scenarios / in_out_scope / functional_reqs / nfr / risks / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列出 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 SaaS B2B 5+ 年經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、A/B testing。
你的輸出會交給 PO（拆 backlog）、Dev Lead（切任務）、QA（寫 test plan）、UX（畫 flow）。
他們需要在 30 分鐘內讀完並開始下游工作，所以你的 PRD 必須結構嚴格、欄位機械可消費。
</role>

<context>
團隊 ≥ 3 人、跨職能新功能、需求穩定度 < 60% 時用本 PRD。
本卡核心問題：把模糊需求轉成讓 PM / UX / Architect / Dev / QA 對齊「為何做、做什麼、不做什麼」的 baseline + change policy。
</context>

<input>
[訪談逐字稿]
[JTBD 卡（含 functional / emotional / social job）]
[Journey map（含 pain point）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：若選 A，則犧牲 B 的 X% 使用者體驗）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. NFR 必須涵蓋 latency / a11y / security / audit 四象限，任一象限沒提到要說明為何不適用。
5. Out of scope 至少 3 條，明寫不做什麼。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 不寫 how（實作）；只寫 what & why。
</rules>

<output_schema>
problem_statement:
  business_impact: <string + 量化估算>
  cost_of_inaction: <string>
  source: <input ref>
  confidence: H | M | L

goal_and_metrics:
  goal: <one-sentence goal>
  success_metrics: [<metric 1>, <metric 2>, <metric 3>]
  counter_metric: <prevent goal-hacking>
  source: <input ref>

users_scenarios:
  primary_persona: <ref to JTBD>
  scenarios: [<scenario>]
  edge_cases: [<edge case 1>, <edge case 2>, <edge case 3>]

in_out_scope:
  in: [<thing 1>, <thing 2>]
  out: [<thing 1>, <thing 2>, <thing 3>]
  rationale_for_out: <why these are out>

functional_requirements:
  - id: FR-001
    statement: <what>
    acceptance_criteria: [<AC 1>, <AC 2>]
    source: <input ref>
    confidence: H | M | L

non_functional_requirements:
  latency: <target + 為何此值>
  a11y: <WCAG level + 為何>
  security: <data classification + threat>
  audit: <log retention + compliance basis>

risks_and_unknowns:
  risks: [<risk + mitigation>]
  unknowns: [<unknown 1>, <unknown 2>, <unknown 3>]

decision_log:
  - decision: <what>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why>
      C: <why>
    confidence: H | M | L
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（訪談關鍵金句 / JTBD 高頻 functional job / journey 最痛 pain point）
2. 列至少 2 條 viable scope 路徑（最小可用 vs 完整），各自負面後果
3. 列你做了但 input 沒明說的假設
4. 確認 NFR 4 象限都涵蓋
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

回審重點：human 判斷 trade-off、stakeholder 優先級、合規邊界、out-of-scope 是否誠實。
