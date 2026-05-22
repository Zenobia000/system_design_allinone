---
title: "Stakeholder Map"
slug: "stakeholder-map"
stage: "define"
roles: ["pm", "ba"]
order: 15
hook: "把「誰該知道、誰能決策、誰會擋」一張圖看完"
when_to_use: "跨部門新功能、合規/稽核專案、敏感資料變更時"
ai_leverage: "用 Claude 從組織架構 + 專案 scope → stakeholder 分類與溝通節奏"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

專案做到一半被法遵卡、被資安卡、被某副總卡，通常不是這些人故意找碴，是 PM 一開始就**沒把他們列為 stakeholder**。
Stakeholder Map 在 discovery 結束前把「誰影響專案、誰被專案影響、誰要被通知、誰要簽核」攤平。
沒這張圖，後期升級衝突會吃掉整個 sprint。

## 誰負責、和誰對接

- **主責：** BA（盤點與分類）/ PM（決策溝通節奏）
- **協作：** 各部門代表（驗證自身角色）、PMO（補組織視角）
- **下游收件：** PM 規劃溝通、PO 排簽核節點、QA/SRE 列受影響系統

## 何時用、何時不用

- ✅ **必要時機：** 跨部門新功能、合規/稽核專案、變更影響 ≥ 3 個團隊
- ❌ **不需要時：** 單一團隊內部優化、bug fix
- ⚠️ **常見誤用：** 只列「會吵的人」，漏掉沉默但有否決權的角色（資安、法遵、稽核）；應用 **interest × influence 矩陣**分類

## AI 怎麼加速

把組織架構 + 專案 scope + 過往相似案的衝突紀錄丟給 AI 產 power/interest 分類 + RACI + 溝通節奏，人工只審是否漏掉沉默否決者。

```prompt-quick
你是有 5+ 年企業系統經驗的資深 BA（熟悉 BPMN、規則引擎、合規需求拆解、BABOK stakeholder analysis）。任務：把組織架構 + 專案 scope + 衝突歷史轉成 stakeholder map（YAML 格式）。

<input>
[組織架構圖 / 部門清單]
[專案 scope 與影響範圍]
[過往相似案的衝突 / 升級紀錄]
</input>

輸出 schema：stakeholders[]（power/interest）/ communication_cadence / decision_makers / blockers_and_allies / raci_matrix / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；必標 ≥ 2 個沉默但有否決權的角色（資安 / 法遵 / 稽核）；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年企業系統經驗的資深 BA，熟悉 BPMN、規則引擎、合規需求拆解、BABOK stakeholder analysis、RACI 框架、組織行為。
你的輸出會交給 PM（規劃溝通節奏與升級路徑）、PO（排簽核節點到 sprint plan）、QA / SRE（列受影響系統與通知名單）、PMO（補組織視角）。
他們需要在 discovery 結束前就用這張圖決定「誰先 talk、誰要 brief、誰要 sign-off」，所以漏掉一個沉默否決者就會在後期吃掉整個 sprint。
</role>

<context>
跨部門新功能、合規/稽核專案、敏感資料變更、變更影響 ≥ 3 個團隊時用本卡。
本卡核心問題：把「誰影響專案、誰被專案影響、誰要被通知、誰要簽核」攤平在一張 interest × influence 矩陣上，避免後期升級衝突。
</context>

<task>
根據以下 input 產出「Stakeholder Map」draft，含 power/interest 分類 + RACI + 溝通節奏 + 沉默否決者警示。
</task>

<input>
[組織架構圖 / 部門清單 / 角色職掌]
[專案 scope（含影響系統 / 資料分類 / 合規依據）]
[過往相似案的衝突 / 升級 / 否決紀錄]
</input>

<rules>
1. 每個 stakeholder 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. 必須涵蓋內部（業務 / 工程 / 設計）+ 橫向（資安 / 法遵 / 稽核 / 財務）+ 外部（客戶 / 監管 / 廠商）三類；任一類別缺項要說明為何不適用。
3. 必須標 ≥ 2 個「沉默但具否決權」角色（資安 / 法遵 / 稽核 / DPO / 內控）；漏標的負面後果：上線前一週被否決全部重做。
4. Interest × influence 用高 / 中 / 低三級；每個 stakeholder 必標一組座標。
5. RACI 必須對應到具體 deliverable / decision，不可只給角色一個總體 R/A/C/I。
6. 溝通節奏必須含 cadence（週 / 雙週 / 月 / 里程碑觸發）+ 媒介（會議 / 報告 / dashboard）+ 升級路徑。
7. Out of scope 至少 3 條（例：跨專案 program governance 走 PMO 卡、員工關係衝突走 HR、單純技術評審走 architect review）。
</rules>

<output_schema>
stakeholders:
  - id: SH-001
    name_or_role: <角色 / 姓名>
    org_unit: <部門>
    category: enum[internal_business, internal_eng, internal_design, horizontal_compliance, horizontal_finance, external_customer, external_regulator, external_vendor]
    power: enum[high, mid, low]
    interest: enum[high, mid, low]
    concerns: [<關注點，例：個資外洩、預算超支>]
    decision_scope: <可決策的具體範圍>
    silent_veto_risk: bool
    veto_rationale: <若為沉默否決者，為何 / 過往觸發條件>
    source: <input ref>
    confidence: H | M | L

communication_cadence:
  - stakeholder_id: SH-001
    cadence: enum[weekly, biweekly, monthly, milestone_triggered, ad_hoc]
    medium: enum[meeting, written_report, dashboard, slack]
    escalation_path: <當衝突時升級到誰>
    source: <input ref>

decision_makers:
  scope_signoff: [<SH-id，誰簽 scope>]
  budget_signoff: [<SH-id>]
  compliance_signoff: [<SH-id>]
  golive_signoff: [<SH-id>]

blockers_and_allies:
  likely_blockers: [<SH-id + 預期 blocker 原因 + mitigation>]
  likely_allies: [<SH-id + 預期支持原因 + 如何借力>]
  swing_voters: [<SH-id + 影響策略>]

raci_matrix:
  - deliverable_or_decision: <例：個資處理流程簽核>
    R: [<SH-id>]
    A: [<SH-id，唯一>]
    C: [<SH-id>]
    I: [<SH-id>]
  - deliverable_or_decision: <例：UAT 完成簽核>
    R: [<…>]
    A: [<…>]
    C: [<…>]
    I: [<…>]

decision_log:
  - decision: <例：為何把法遵列為沉默否決者>
    options_considered: [<A: 只列 C, B: 列 A, C: 不列>]
    chosen: <B>
    rejected_reason:
      A: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本卡不含 thing 1，例：跨專案 program governance>
  - <本卡不含 thing 2，例：員工關係衝突走 HR>
  - <本卡不含 thing 3，例：純技術評審走 architect review>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（scope 觸及的合規條款、過往相似案的否決點、組織內部既有政治張力），標 H/M/L confidence
2. 列至少 2 條 viable stakeholder 策略（廣納：早期廣徵詢 vs 精打：只 brief 必要人），各自負面後果（廣納會稀釋決策速度；精打會漏沉默否決者）
3. 列你做了但 input 沒明說的假設（特定角色的決策權、過往衝突當事人是否仍在位）
4. 確認三類別（內部 / 橫向 / 外部）+ ≥ 2 個沉默否決者都已列出
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個沉默否決者 confidence 不高？需要找誰確認決策權範圍？
2. 哪些假設來自我而非 input（特別是過往衝突紀錄、現任角色職掌）？標出來。
3. 如果只能再追加一份 input（PMO 治理文件 / 法遵簽核紀錄 / 過往升級 ticket），哪一份對 stakeholder map 品質提升最大？
</verify>
```

回審重點：human 判斷是否漏掉法遵 / 資安 / 稽核等沉默否決者、決策權描述是否準確、RACI 是否對應具體 deliverable 而非籠統角色。
