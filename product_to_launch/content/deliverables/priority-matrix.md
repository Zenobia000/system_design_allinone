---
title: "優先級矩陣"
slug: "priority-matrix"
stage: "define"
roles: ["pm", "po"]
order: 16
hook: "把「都很重要」打回現實"
when_to_use: "Backlog ≥ 30 item、sprint planning 爭執不下時"
ai_leverage: "用 Claude 評估 RICE/Value-Effort + 提供 ranked backlog"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

stakeholder 每個人都說「我這個最重要」。沒有共同框架，PO 排序變成政治。
優先級矩陣（RICE、Value-Effort、MoSCoW）的價值不是「精準」，而是**讓所有人在同一張表上比較**。
數字會逼出真實 trade-off：價值多大、要花多少、有多確定、影響多廣。

## 誰負責、和誰對接

- **主責：** PO（最終排序）/ PM（提供商業價值權重）
- **協作：** Dev Lead（估 effort 與信心）、UX（驗證 user impact）
- **下游收件：** PO 排 backlog、sprint planning 決定 scope

## 何時用、何時不用

- ✅ **必要時機：** Backlog ≥ 30 item、跨 squad 競爭資源、stakeholder 意見分歧
- ❌ **不需要時：** Backlog < 10 item、緊急 incident、合規硬性截止
- ⚠️ **常見誤用：** 把分數當絕對真理（RICE 是相對排序工具，不是預測 ROI）；忽略「不做的成本」（opportunity cost）

## AI 怎麼加速

把 backlog + 商業價值權重 + capacity 丟給 AI 算 RICE / Value-Effort 草稿，人工只審 confidence 灌水與 opportunity cost。

```prompt-quick
你是有 5+ 年 agile 經驗的資深 PO（熟悉 backlog 拆解、user story、INVEST 原則、RICE / Value-Effort 框架）。任務：把 backlog + 商業價值權重 + capacity 轉成優先級矩陣（YAML 格式）。

## 輸入素材

[Backlog item 清單]
[商業價值權重（OKR / 北極星）]
[團隊 capacity（person-month）]

輸出 schema：scoring_model / items[] (reach/impact/confidence/effort/score) / ranked_backlog / parking_lot / scoring_assumptions / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；confidence < 50% 的 item 必須建議 spike；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 5+ 年 agile 經驗的資深 PO，熟悉 backlog 拆解、user story、INVEST 原則、RICE / Value-Effort / MoSCoW / WSJF 框架。
你的輸出會交給 PO（最終排 backlog）、Dev Lead（在 sprint planning 確認 scope）、Stakeholders（理解為何 A 在 B 之前）。
他們需要在 sprint planning 30 分鐘內用你的 ranked list 決定 scope，所以分數必須誠實、source 必須可追溯。

## 情境脈絡

Backlog ≥ 30 item、sprint planning 爭執不下、stakeholder 各自堅持「我這個最重要」時用本矩陣。
本卡核心問題：把「都很重要」打回現實，讓所有人在同一張表上比較相對價值。

## 任務

根據以下 input 產出「優先級矩陣」draft，採 RICE 為主、Value-Effort 為輔。

## 輸入素材

[Backlog item 清單（含 hook / 商業價值描述 / 使用者）]
[商業價值權重來源（OKR、北極星指標、客戶承諾）]
[團隊 capacity（person-month / 可用人力）]

## 規則

1. 每個分數註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Confidence 不可預設 100%，沒有訪談或數據支撐的最高 70%；高估的負面後果：誤把 spike 當定案做。
3. Impact 必須用 RICE 標準刻度（0.25 / 0.5 / 1 / 2 / 3），禁止自創數字。
4. Effort 用 person-month；若需要跨團隊協作，effort 必須含協調成本（× 1.3）。
5. 每個 item 標 confidence: [H/M/L]；L 必須附「需要什麼 spike / 訪談來提升」。
6. Out of scope 至少 3 條（例：純技術重構走 tech-debt budget、合規硬性截止項另列、未拆夠細的 epic 退回 refinement）。
7. RICE 是相對排序工具，不是 ROI 預測；分數差距 < 20% 視為「同級」，需 stakeholder 投票打破。

## 輸出格式（YAML）

scoring_model:
  primary: enum[RICE, Value-Effort, WSJF]
  rationale: <為何選此模型>
  source: <input ref>

items:
  - id: ITEM-001
    title: <item name>
    reach: <每季影響使用者數 + 來源系統>
    impact: enum[0.25, 0.5, 1, 2, 3]
    confidence: <0–100%>
    effort: <person-month>
    rice_score: <R × I × C / E>
    source: <input ref>
    confidence_grade: H | M | L
    needs_spike: bool

ranked_backlog:
  top_10: [<ITEM-id list, 由高到低>]
  tied_items: [<分數差 < 20% 的 item 群>]
  capacity_cutoff: <本季 capacity 能吃到哪一名>

parking_lot:
  - id: <ITEM-id>
    reason: enum[confidence_too_low_needs_spike, blocked_by_dependency, out_of_capacity]
    revisit_when: <條件>

scoring_assumptions:
  - assumption: <做了但 input 沒明說>
    impact_if_wrong: <若假設錯誤的負面後果>
    confidence: H | M | L

decision_log:
  - decision: <例：為何 ITEM-A 排在 ITEM-B 之前>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <為何不選>
      C: <為何不選>
    confidence: H | M | L

out_of_scope:
  - <本矩陣不處理 thing 1，例：純技術重構>
  - <本矩陣不處理 thing 2，例：合規硬性截止項>
  - <本矩陣不處理 thing 3，例：未拆夠細的 epic>

## 思考步驟

產出前先：
1. 從 input 抓 3-5 個關鍵 signal（OKR 對應、客戶承諾、競品壓力），分別標 H/M/L confidence
2. 列至少 2 條 viable 排序策略（最大化短期價值 vs 平衡長期能力），各自負面後果（例：短期最大化會累積技術債；長期平衡會錯過市場窗口）
3. 列你做了但 input 沒明說的假設（例：使用者基數、市場成長率、團隊熟悉度）
4. 確認 confidence 沒有系統性高估（>70% 必須有數據支撐）

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個 item 的 confidence > 70% 但沒有訪談或數據支撐？列出來與所需 spike。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input（使用者訪談 / capacity 數字 / 競品分析），哪一份對排序影響最大？
```

回審重點：human 判斷 confidence 是否誠實（容易高估）、ranked list 是否反映真實 opportunity cost、parking_lot 沒有偷渡關鍵項。
