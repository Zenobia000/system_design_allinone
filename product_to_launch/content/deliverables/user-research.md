---
title: "使用者研究"
slug: "user-research"
stage: "discovery"
roles: ["ux", "pm"]
order: 1
hook: "用真實證據打掉腦補假設"
when_to_use: "新題目啟動、conversion 異常、KPI 停滯時必要"
ai_leverage: "用 Claude 把訪談錄音逐字稿 → 萃取 pain point 與 quote 庫"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

跳過使用者研究就動工，等於用 PM 的個人偏好賭整個 sprint 的成本。
沒有研究證據，後面的 PRD、flow、metric 全是猜的；上線後 KPI 不動，沒人知道是題目錯、設計錯、還是執行錯。

## 誰負責、和誰對接

- **主責：** UX（規劃方法、執行訪談、做 synthesis）
- **協作：** PM（提供商業問題與 hypothesis）、BA（補 stakeholder 視角）
- **下游收件：** PM（寫 PRD）、UX（畫 journey/flow）、PO（refine backlog）

## 何時用、何時不用

- ✅ **必要時機：** 新題目啟動、conversion funnel 出現異常、KPI 連續兩季停滯
- ❌ **不需要時：** Bug fix、純技術 spike、已有近三個月內可信研究資料
- ⚠️ **常見誤用：** 只訪問內部同事當「使用者」、用問卷問偏好不問行為

## AI 怎麼加速

把訪談錄音轉逐字稿後，讓 AI 做第一輪 synthesis；人工只做主題判讀與決策。

```prompt-quick
你是有 5+ 年 product design 經驗的資深 UX researcher（熟悉 JTBD、grounded theory、affinity diagram、WCAG 2.2）。任務：把訪談逐字稿 + hypothesis 轉成 使用者研究 synthesis（YAML 格式）。

<input>
[訪談逐字稿 8-12 份]
[既定 hypothesis 清單]
[研究目的與 research question]
</input>

輸出 schema：research_question / methodology / participant_profile / key_findings / themes_clusters / surprising_insights / hypothesis_validation / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段 + 原句 quote] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 product design 經驗的資深 UX researcher，熟悉 JTBD、grounded theory、affinity diagram、Switch Interview、WCAG 2.2、研究倫理（IRB / consent）。
你的輸出會交給 PM（寫 PRD）、UX（畫 journey / flow）、PO（refine backlog），他們會用來打掉腦補假設並決定下一步要做什麼。
所以 synthesis 必須有 quote evidence、quote 出處可回溯、與既有 hypothesis 的衝突訊號要誠實列出。
</role>

<context>
新題目啟動、conversion funnel 出現異常、KPI 連續兩季停滯時用本 deliverable。
本卡核心問題：用真實證據打掉腦補假設，避免把 PM 個人偏好賭整個 sprint 的成本。
</context>

<task>
根據以下 input 產出「使用者研究 synthesis」draft。
</task>

<input>
[訪談逐字稿 8-12 份]
[既定 hypothesis 清單（pre-research）]
[研究目的與 research question]
</input>

<rules>
1. 每個 finding 必須附原句 quote + 受訪者代號 + [input 第 X 段]；無 quote 支撐者標 [來源未明示，需確認] 並降 confidence。
2. Trade-off / 對立訊號必須列負面後果（若採信 finding A，則 hypothesis B 的假設需要重做）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造受訪者數量或 theme；列「需要什麼補上」。
4. 研究倫理 / 合規涵蓋：必須註明 consent 狀態與 PII 去識別化處理；違反須說明。
5. Out of scope：明列 3 條本文件不處理（例如：解決方案設計、商業優先序、實作評估）。
6. 每個 theme 的飽和度（saturation）標 confidence: [H/M/L]，L 必須附說明為何不確定（樣本不足 / 矛盾訊號）。
7. 至少列 3 條「與既定 hypothesis 衝突」的訊號；找不到也要說明為何（可能是樣本偏誤）。
</rules>

<output_schema>
research_question:
  required: true
  type: string
  source: <input ref>

methodology:
  type: enum[depth_interview, contextual_inquiry, diary_study, usability_test, survey]
  rationale: <為何選這個方法>
  sample_size: int
  recruitment: <how participants were sourced>
  bias_risks: [<sampling bias>, <leading questions>]

participant_profile:
  total: int
  segments: { P1: int, P2: int }
  consent_status: <obtained / pending>
  pii_handling: <how anonymised>

key_findings:
  - id: F1
    finding: <one-sentence>
    supporting_quotes:
      type: list[{participant: P03, quote: string, transcript_ref: string}]
      min_count: 2
    confidence: H | M | L
    contradicts_hypothesis: <H-id if applicable>

themes_clusters:
  - theme: <name>
    quote_count: int
    saturation: enum[saturated, partial, weak]
    related_findings: [F1, F3]
    source: <input ref>

surprising_insights:
  type: list[{insight: string, why_surprising: string, supporting_evidence: string}]
  min_count: 3

hypothesis_validation:
  - hypothesis_id: H1
    status: enum[supported, refuted, inconclusive]
    evidence: [<finding id>]
    confidence: H | M | L

decision_log:
  - decision: <theme clustering 切法>
    options_considered: [by_jtbd, by_pain_severity, by_persona]
    chosen: by_jtbd
    rejected_reason:
      by_pain_severity: <為何不選>
      by_persona: <為何不選>
    confidence: H | M | L

out_of_scope:
  - 不設計解決方案（屬 ideation / PRD）
  - 不排商業優先序（屬 PO backlog）
  - 不評估技術實作成本（屬 Architect / Dev Lead）
</output_schema>

<thinking>
產出前先 step-by-step：
1. 從逐字稿抓 5-8 個高頻訊號，標 H/M/L 並附 quote
2. 找與既定 hypothesis 衝突的訊號（至少 3 條）
3. 列至少 2 條 theme 切法與負面後果
4. 列你做了但逐字稿沒明說的假設（推論 vs 引用）
5. 確認 consent / PII 涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 finding 的 confidence < H？quote 數是否 < 2？需要什麼補資料？
2. 哪些 theme 來自我的解讀框架而非受訪者原話？標出來。
3. 如果只能再追加一份 input（更多訪談 / 行為 analytics / 競品流失訪談），哪一份對輸出品質提升最大？
</verify>
```

回審重點：人工判斷 quote 是否被斷章取義、theme 是否真有 actionable 意涵、衝突訊號是否誠實列出。
