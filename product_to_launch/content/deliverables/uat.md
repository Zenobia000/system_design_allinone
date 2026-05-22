---
title: "UAT · 使用者驗收測試"
slug: "uat"
stage: "ship"
roles: ["qa", "po"]
order: 42
hook: "用使用者語言確認『這真的是我們要的』"
when_to_use: "需求由外部使用者或業務單位定義，且接受度有爭議時"
ai_leverage: "用 Claude 把 PRD 翻成使用者腳本與情境步驟"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Verification"
---

## 解決什麼問題

QA 驗的是「功能對不對」，UAT 驗的是「業務拿到能不能用」。兩者證據不可互相替代，否則上線後才發現流程斷裂。

## 誰負責、和誰對接

- **主責：** QA + PO 協調，業務單位執行
- **協作：** UX 提供 journey、Dev 修缺陷
- **下游收件：** Go/No-Go、release notes 中的已知限制

## 何時用、何時不用

- ✅ **必要時機：** 對外產品、合約交付、跨部門流程
- ❌ **不需要時：** 內部技術重構、不影響使用者行為的優化
- ⚠️ **常見誤用：** UAT 變成第二輪 QA；情境腳本沒對齊真實業務

## AI 怎麼加速

把 PRD + user journey + 業務規則丟給 AI 產 UAT scenario 腳本與簽核框架，人工只審 sign-off 權限與 defect 嚴重度判斷。

```prompt-quick
你是有 7+ 年自動化測試經驗的資深 QA lead（熟悉 test pyramid、contract testing、chaos engineering），協作 5+ 年 agile 經驗的 PO。任務：把 PRD + user journey + 業務規則 轉成 UAT Plan（YAML 格式）。

<input>
[PRD（含 functional req 與 acceptance criteria）]
[User journey map（含 persona 與 pain point）]
[業務規則與例外處理（含合規限制）]
</input>

輸出 schema：scenarios（persona / precondition / steps / expected）/ data_setup / sign_off_authority / defect_severity_matrix / escalation_path / parking_lot / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年自動化測試經驗的資深 QA lead，協作 5+ 年 agile 經驗的 PO，熟悉 test pyramid、contract testing、chaos engineering、user story 寫作、INVEST 原則、JTBD、ISO 25010 quality model、WCAG 2.2 a11y。
你的輸出會交給業務單位（執行 UAT）、PO（協調簽核）、Dev（修 defect）、UX（驗 journey）。
他們不是工程師，所以你的 scenario 必須用業務語言寫、步驟可不查文件就能執行、預期結果必須是業務可判斷。
</role>

<context>
需求由外部使用者或業務單位定義、且接受度有爭議時必要（對外產品、合約交付、跨部門流程）。
本卡核心問題：QA 驗「功能對不對」、UAT 驗「業務拿到能不能用」；兩者證據不可互相替代，否則上線後才發現流程斷裂。
</context>

<input>
[PRD（含 functional req、acceptance criteria、NFR）]
[User journey map（含 persona、stage、pain point、emotional curve）]
[業務規則與例外處理（含合規限制、特殊權限、跨系統流程）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：scenario 寫得太細變第二輪 QA；太粗則無法判斷通過）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. 合規與 a11y 必須涵蓋；任一不適用必須說明為何（例如：純內部工具不需 WCAG）。
5. Out of scope：明列 3 條本文件不處理（例如：unit/integration test、performance test、security test）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 每個 scenario 必須含 persona、precondition、≤ 7 steps、expected outcome、sign-off field；步驟避免技術術語。
</rules>

<output_schema>
scenarios:
  - id: UAT-001
    title: <業務情境一句話>
    persona: <ref to journey persona>
    precondition: [<state required before start>]
    steps:
      - <step 1 用業務語言>
      - <step 2>
    expected: <業務可判斷的結果>
    priority: P0 | P1 | P2
    source: <input ref>
    confidence: H | M | L

data_setup:
  test_accounts: [<role + permission level>]
  seed_data: [<dataset + 來源>]
  environment: <UAT env URL or TODO>
  reset_strategy: <how to reset between runs>

sign_off_authority:
  primary: <role + name>
  secondary: [<role>]
  quorum: <N>
  signature_method: <e-sign / 書面 / meeting minute>
  source: <input ref>

defect_severity_matrix:
  - severity: S1_blocker
    definition: <例：核心流程無法完成>
    sla_hours: <N>
    escalation_to: <role>
  - severity: S2_major
    definition: <例：workaround 存在但成本高>
    sla_hours: <N>
  - severity: S3_minor
    definition: <例：UI/文案問題>
    sla_hours: <N>

escalation_path:
  on_blocker: [<role 1 → role 2 → exec>]
  on_dispute: <decision_maker>
  on_scope_creep: <PO / change-control>

parking_lot:
  items: [<發現但本輪不處理的事項>]
  next_review: <ISO 8601>

decision_log:
  - decision: <例：scenario 粒度（端到端 vs 模組）>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - Unit / integration / contract test（屬 QA 階段）
  - Performance / load / chaos test（屬 NFR 驗證）
  - <第 3 條本文件不處理>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最痛的 pain point、最爭議的需求、最複雜的業務規則）
2. 列至少 2 條 viable scenario 路徑（端到端 vs 模組化），各自負面後果
3. 列你做了但 input 沒明說的假設（例如：業務單位的 technical literacy）
4. 確認所有 P0 acceptance criteria 都有對應 scenario
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

回審重點：human 判斷 trade-off、scenario 粒度、defect 嚴重度判定、業務簽核權責邊界。
