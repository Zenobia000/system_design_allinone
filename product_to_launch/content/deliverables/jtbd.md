---
title: "JTBD · 任務驅動"
slug: "jtbd"
stage: "discovery"
roles: ["pm", "ux"]
order: 2
hook: "把功能慾望翻成使用者真正想完成的任務"
when_to_use: "團隊在爭論「要做哪個功能」而非「使用者要解什麼問題」時"
ai_leverage: "用 Claude 把 persona + scenario 反推 JTBD statement"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PM 容易陷入「競品有這個功能我們也要做」的反應式思考。
JTBD 強迫團隊回到「使用者僱用這個產品是為了完成什麼任務」，避免功能堆疊但 KPI 不動。
沒有 JTBD，PRD 寫出來通常是 feature list，不是 problem statement。

## 誰負責、和誰對接

- **主責：** PM（最終陳述）
- **協作：** UX（提供研究素材）、PO（驗證與 backlog 對齊）
- **下游收件：** PM 寫 PRD、UX 設計 flow、QA 寫 acceptance

## 何時用、何時不用

- ✅ **必要時機：** 新功能 ideation、團隊在爭論「做不做」、進入新市場
- ❌ **不需要時：** 小修小補、技術債清理、合規限期任務
- ⚠️ **常見誤用：** 寫成「使用者想要更快」這種無 context 廢話；JTBD 必須含情境、動機、預期結果

## AI 怎麼加速

把使用者訪談與 persona 餵給 AI，產 JTBD draft，人工挑選與精煉。

```prompt-quick
你是有 5+ 年 SaaS B2B 經驗的資深 PM（熟悉 JTBD / OKR / PRD / Christensen Switch Interview）。任務：把 persona + 訪談摘要轉成 JTBD · 任務驅動（YAML 格式）。

## 輸入素材

[persona 卡]
[訪談逐字稿摘要]
[客服工單關鍵字頻次]

輸出 schema：functional_job / emotional_job / social_job / job_triggers / current_solution / success_criteria / struggling_moments / opportunity_size / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 5+ 年 SaaS B2B 經驗的資深 PM，熟悉 JTBD（Christensen / Ulwick）、OKR、PRD、Switch Interview、forces of progress 模型。
你的輸出會交給 PM（寫 PRD）、UX（設計 flow）、QA（寫 acceptance），他們會用來決定「使用者僱用這個產品是為了完成什麼任務」。
所以 JTBD 必須聚焦動機、情境、預期結果，不能寫成解決方案。

## 情境脈絡

團隊在爭論「要做哪個功能」而非「使用者要解什麼問題」時用本 deliverable。
本卡核心問題：把功能慾望翻成使用者真正想完成的任務，避免功能堆疊但 KPI 不動。

## 任務

根據以下 input 產出「JTBD · 任務驅動」draft，至少 5 個 JTBD statement。

## 輸入素材

[persona 卡（含 demographics + behavior + pain）]
[訪談逐字稿摘要 8-20 份]
[客服工單關鍵字頻次表]

## 規則

1. 每個 JTBD 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（聚焦 functional job 會犧牲 emotional / social job 的 X 群使用者）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造動機；列「需要什麼補上」。
4. JTBD statement 不能寫解決方案（不出現「按鈕、頁面、API」這類 how）；違反此規則須在 decision_log 註明。
5. Out of scope：明列 3 條本文件不處理（例如：功能優先序、實作方式、KPI 公式）。
6. 每個 JTBD 的 motivation 與 expected outcome 標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 必須區分 functional / emotional / social job 三層；只有 functional 不算完整。

## 輸出格式（YAML）

jtbd_statements:
  - id: JTBD-001
    statement: "When <situation>, I want to <motivation>, so I can <expected outcome>"
    functional_job:
      required: true
      type: string
      source: <input ref>
      confidence: H | M | L
    emotional_job:
      type: string
      example: "感覺自己掌控全局而非被截止日追著跑"
      source: <input ref>
    social_job:
      type: string
      example: "在主管面前顯得專業、有條理"
      source: <input ref>
    job_triggers:
      type: list[string]
      example: ["收到老闆 ad-hoc 報告請求", "週一例會前 30 分鐘"]
    current_solution:
      how: <現在怎麼解>
      gap: <為何不夠好>
      source: <input ref>
    success_criteria:
      type: list[string]
      example: ["≤ 3 分鐘完成", "不需要切換 3 個工具"]
    struggling_moments:
      type: list[{moment: string, supporting_quote: string}]
    opportunity_size:
      frequency: <how often per user per week>
      affected_persona: [P1, P2]
      confidence: H | M | L

mutually_exclusive_jobs:
  - [JTBD-001, JTBD-003]   # 解 A 會犧牲 B 的情境

decision_log:
  - decision: <選哪 5 個 JTBD 進主清單>
    options_considered: [by_frequency, by_pain_severity, by_strategic_fit]
    chosen: by_pain_severity
    rejected_reason:
      by_frequency: <為何不選>
      by_strategic_fit: <為何不選>
    confidence: H | M | L

out_of_scope:
  - 不排功能優先序（屬 PO backlog）
  - 不寫實作方式（屬 PRD / ADR）
  - 不定義 KPI 公式（屬 North Star）

## 思考步驟

產出前先 step-by-step：
1. 從 input 抓 5-8 個高頻 situation/motivation 訊號，分別標 H/M/L
2. 區分 functional / emotional / social 三層，找互斥組合
3. 列至少 2 條 JTBD 切法（by job step vs by switching trigger）與負面後果
4. 列你做了但 input 沒明說的假設

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個 JTBD 的 confidence < H？列出來與所需補充資料。
2. 哪些 motivation 來自我的推測而非訪談原句？標出來。
3. 如果只能再追加一份 input（switch interview / 競品流失訪談 / 觀察日誌），哪一份對輸出品質提升最大？
```

回審重點：JTBD 是否寫成解法（錯）、是否真有 evidence 支撐、互斥組合是否誠實標出。
