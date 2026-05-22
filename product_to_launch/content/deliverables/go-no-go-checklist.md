---
title: "Go/No-Go Checklist"
slug: "go-no-go-checklist"
stage: "ship"
roles: ["po", "devops"]
order: 43
hook: "把上線決策從『感覺差不多』變成證據簽核"
when_to_use: "release 影響營收、合規、跨團隊或對外承諾時"
ai_leverage: "用 Claude 從 Release Plan 抽出尚未完成的證據項"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Verification, §Deployment"
---

## 解決什麼問題

Release 失敗大多不是技術問題，是「以為某項已完成但其實沒人簽」。Go/No-Go 強迫每個關鍵維度有明確 yes/no 與證據連結。

## 誰負責、和誰對接

- **主責：** PO 主持會議，DevOps 提供技術證據
- **協作：** QA、SRE、Security、Customer Success
- **下游收件：** 上線授權、Rollback 觸發條件

## 何時用、何時不用

- ✅ **必要時機：** 任何 P0/P1 release
- ❌ **不需要時：** flag 控制小改、純文案
- ⚠️ **常見誤用：** 變成 30 人會議；勾選但無證據連結

## AI 怎麼加速

把 Release Plan + Test Plan + Runbook + 合規清單丟給 AI 抽證據項、勾選狀態、blocker，人工只審決策權限與 fallback。

```prompt-quick
你是有 5+ 年 agile 經驗的資深 PO（熟悉 backlog 拆解、user story、INVEST），協作 7+ 年 SRE 經驗的 release coordinator。任務：把 Release Plan + Test Plan + Runbook + 合規清單 轉成 Go/No-Go Checklist（YAML 格式）。

<input>
[Release Plan（含 scope、timeline）]
[Test Plan + 測試結果（含 coverage、defect 狀態）]
[Runbook + 合規清單（SOC 2 / GDPR / PCI 等）]
</input>

輸出 schema：criteria（functional / perf / security / ops / comms / compliance）/ evidence_link_per_criterion / blockers / decision_makers / decision_record / fallback_date / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 agile 經驗的資深 PO，協作 7+ 年 SRE 經驗的 release coordinator，熟悉 backlog 拆解、user story 寫作、INVEST 原則、SLO/SLI/error budget、incident response、postmortem 文化、SOC 2 / GDPR / PCI 合規稽核流程。
你的輸出會交給決策會議主席（簽 Go/No-Go）、各維度 owner（QA / SRE / Security / CS）、稽核（保留決策記錄）。
他們需要在 15 分鐘會議內讀完並做出 Go/No-Go 決策，所以你的 checklist 必須項項可驗證、證據可審計、blocker 可定位 owner。
</role>

<context>
Release 影響營收、合規、跨團隊或對外承諾時必要（任何 P0/P1 release）。
本卡核心問題：把上線決策從「感覺差不多」變成證據簽核；強迫每個關鍵維度有明確 yes/no 與證據連結。
</context>

<input>
[Release Plan（含 scope、timeline、rollback link）]
[Test Plan + 測試結果（含 coverage、defect 狀態、UAT 簽核）]
[Runbook + 合規清單（SOC 2 / GDPR / PCI / WCAG 等適用標準）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：降低 perf criterion 通過門檻換 ship，會犧牲 X% 用戶 p95 體驗）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. 合規維度必須涵蓋（依產業：SOC 2 / GDPR / PCI / HIPAA / WCAG 至少一項）；任一未檢查必須說明為何不適用。
5. Out of scope：明列 3 條本文件不處理（例如：日常 standup 決策、技術債清單、長期 roadmap）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 每個 criterion 必須有 evidence_link（URL / doc ref），無連結者標 TODO 並列 owner。
</rules>

<output_schema>
criteria:
  functional:
    - id: F-1
      statement: <例：所有 P0 user story 通過 acceptance>
      status: pass | fail | pending | TODO
      evidence_link: <URL or TODO(缺什麼)>
      owner: <role>
      source: <input ref>
      confidence: H | M | L
  performance:
    - id: P-1
      statement: <例：p95 latency < 200ms under load>
      status: pass | fail | pending
      evidence_link: <URL>
      owner: <role>
  security:
    - id: S-1
      statement: <例：SAST high=0、SCA critical=0>
      status: pass | fail | pending
      evidence_link: <URL>
      owner: <role>
  ops:
    - id: O-1
      statement: <例：runbook 演練完成、on-call 就位>
      status: pass | fail | pending
      evidence_link: <URL>
  comms:
    - id: C-1
      statement: <例：external comms 已排程、CS playbook 就緒>
      status: pass | fail | pending
      evidence_link: <URL>
  compliance:
    - id: CP-1
      statement: <例：GDPR DPIA 簽核 / SOC 2 control evidence>
      status: pass | fail | pending | n/a
      evidence_link: <URL>
      owner: <role>

blockers:
  - criterion_id: <id>
    reason: <why blocking>
    owner: <role>
    eta_to_resolve: <hours or TODO>
    severity: P0 | P1 | P2

decision_makers:
  primary: <role + name>
  secondary: [<role>]
  quorum: <N>

decision_record:
  outcome: GO | NO_GO | CONDITIONAL_GO
  conditions: [<若 CONDITIONAL_GO，列條件>]
  recorded_by: <role>
  timestamp: <ISO 8601>
  audit_trail_link: <URL>

fallback_date:
  next_attempt: <ISO 8601 + TZ>
  prerequisites: [<what must be true>]

decision_log:
  - decision: <例：CONDITIONAL_GO vs NO_GO>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - 日常 standup 與 sprint 決策
  - 長期 roadmap 與 OKR 對齊
  - <第 3 條本文件不處理>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最弱的 criterion、最缺證據的維度、最大的 blocker）
2. 列至少 2 條 viable 路徑（CONDITIONAL_GO + 補件 vs NO_GO + 延期），各自負面後果
3. 列你做了但 input 沒明說的假設（例如：哪些合規維度真正適用）
4. 確認所有 6 維度都有被檢查
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

回審重點：human 判斷 trade-off、CONDITIONAL_GO 條件嚴格度、合規維度適用性、決策權限。
