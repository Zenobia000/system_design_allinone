---
title: "SLO · 服務等級目標"
slug: "slo"
stage: "operate"
roles: ["devops"]
order: 44
hook: "把『可用性』從感覺變成可量化的合約"
when_to_use: "服務有 ≥ 1 個外部 user 依賴、且需要對齊維運優先級時"
ai_leverage: "用 Claude 把使用者抱怨 → SLI candidates，再人工選 SLO 閾值"
art: "/generated/key-deliverable-slo.webp"
source: "software_architect/ppt/02-requirements-sla, Google SRE"
---

## 解決什麼問題

「我們系統很穩」是無法 reviewable 的形容詞。SLO 把可用性與延遲定義為可量測 SLI + 閾值 + 觀察窗，是 error budget、告警、容量規劃的共同源頭。

## 誰負責、和誰對接

- **主責：** DevOps / SRE
- **協作：** PO 對齊使用者體驗、Architect 對齊系統能力
- **下游收件：** Error Budget、告警、Capacity Planning

## 何時用、何時不用

- ✅ **必要時機：** 使用者直接依賴、SLA 對外承諾、跨服務相互調用
- ❌ **不需要時：** 內部一次性工具、無使用者直接依賴
- ⚠️ **常見誤用：** 把 100% 當目標；SLI 量錯點（server side 而非 user side）

## AI 怎麼加速

把客服票 + journey map + 現有 metric 餵給 Claude 產 SLI 候選與 SLO 草稿，PO 與 SRE 共同決閾值。

```prompt-quick
你是有 7+ 年 SRE 經驗的資深 SRE（熟悉 SLO/SLI/error budget、Google SRE 方法、user-centric measurement）。任務：把使用者抱怨 + journey map + 現有 metric 轉成 SLO draft（YAML 格式）。

## 輸入素材

[客服票 / 使用者抱怨樣本]
[User journey map（含 critical path）]
[現有 metric / dashboard 摘要]

輸出 schema：sli_definition / slo_target / error_budget / user_journey_impact / dependency_slos / review_cadence / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造；SLI 量測點必須 user-side。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年 SRE 經驗的資深 SRE，熟悉 SLO/SLI/error budget、Google SRE Workbook、user-centric measurement、dependency SLO 數學。
你的輸出會交給 PO（對齊使用者體驗承諾）、Architect（驗證系統能力是否達標）、DevOps（埋點實作）、Finance（評估 budget 對成本的影響）。
他們需要可量測、可審查、可寫進對外 SLA 的 SLO，所以 SLI 必須量在 user side，不是 server side。

## 情境脈絡

服務有 ≥ 1 個外部 user 依賴、且需要對齊維運優先級時用本卡。
本卡核心問題：把「我們系統很穩」變成可量化的 SLI + SLO + error budget，作為告警、容量、release gate 的共同源頭。

## 輸入素材

[客服票 / 使用者抱怨樣本（含時間分佈）]
[User journey map（含 critical path、conversion funnel）]
[現有 metric / dashboard 摘要]
[依賴服務 SLO（上下游契約）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選 99.99% 比 99.9% 多花 X 倍成本且只減 Y% 抱怨）。
3. 缺資料寫 TODO(缺什麼)，不要編造；無歷史 SLI 數據寫 TODO，不要瞎設閾值。
4. SLO compliance：SLI 必須量在 user side（response from user perspective），不能只量 server side；NFR 含 latency、availability、correctness、freshness 四象限。
5. Out of scope：明列 3 條（例如：內部工具 SLO、實作如何達標、SLA 法律條款）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. SLO target 必須是 < 100%（100% 不是 SLO 是承諾失敗）；window 至少 28 天滾動。

## 輸出格式（YAML）

sli_definition:
  - sli_id: SLI-001
    name: <e.g. checkout-success-rate>
    what_measured: <user-observable event>
    where_measured: <user-side / edge / synthetic>
    aggregation: <e.g. successful_requests / total_requests over 5m>
    source: <input ref>
    confidence: H | M | L

slo_target:
  - sli_ref: SLI-001
    target: <e.g. 99.9%>
    window: <e.g. 28d rolling>
    rationale: <why this number — based on抱怨頻率 / 競品 / 商業影響>
    source: <input ref>
    confidence: H | M | L

error_budget:
  per_window: <e.g. 0.1% = 40.3 min/28d>
  burn_policy_ref: <link to error-budget card>

user_journey_impact:
  - journey: <e.g. checkout>
    sli_ref: SLI-001
    business_impact: <conversion drop / revenue loss>
    source: <input ref>

dependency_slos:
  - dep: <upstream service>
    their_slo: <number or TODO>
    our_max_slo: <math: cannot exceed their SLO>

review_cadence:
  quarterly: <reassess target>
  triggered: <after each SEV-1 / major launch>

decision_log:
  - decision: <e.g. SLO target 99.9 vs 99.95>
    options_considered: [99.0%, 99.9%, 99.95%]
    chosen: 99.9%
    rejected_reason:
      "99.0%": <too lax — exceeds complaint threshold>
      "99.95%": <too tight — requires X cost increase>
    confidence: H | M | L

out_of_scope:
  - 內部工具 SLO（屬 internal-SLO 範疇）
  - 實作如何達標（屬 architecture / capacity）
  - SLA 對外法律條款（屬法務）

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（最高頻抱怨、最痛 journey、現有 metric 缺口）各標 H/M/L confidence
2. 列至少 2 條 SLO target 路徑（保守 vs 激進）與各自的負面後果
3. 列你做了但 input 沒明說的假設（如使用者期待、競品基準）
4. 確認 SLI 都量在 user side，且不超過 dependency SLO

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（例如過去 90 天 user-side latency 分佈），是哪一份？為什麼？
```

回審重點：human 判斷 SLO 數字是否反映真實使用者期待、是否超過依賴 SLO 的上限、budget 是否能說服 release 與 PO 共識。
