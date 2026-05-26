---
title: "Persona · 使用者輪廓"
slug: "persona"
stage: "discovery"
roles: ["ux", "pm"]
order: 3
hook: "讓團隊在爭論時有共同的「他」"
when_to_use: "團隊規模 ≥ 5 人、需要跨職能共識「我們在為誰做」時"
ai_leverage: "用 Claude 把訪談資料聚類成 3-5 個 persona 草稿"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

沒有 persona，每個人腦中的「使用者」都不一樣。PM 想的是高階主管、設計想的是年輕族群、工程想的是自己。
PRD 上爭論不休，本質是因為大家在為不同的人設計。
Persona 不是行銷文案，是團隊內部對齊「他是誰、他在乎什麼」的最小協議。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（驗證商業價值優先序）、BA（補 stakeholder 視角）
- **下游收件：** UX 畫 journey、PM 寫 PRD、行銷做 GTM 訊息

## 何時用、何時不用

- ✅ **必要時機：** 跨團隊新產品、目標使用者多元、需要 GTM 對齊
- ❌ **不需要時：** 內部工具且使用者就是團隊自己、單一明確 B2B 客戶
- ⚠️ **常見誤用：** persona 寫成人口統計學履歷（年齡、收入）卻沒有「動機、痛點、決策邏輯」

## AI 怎麼加速

把訪談、客服紀錄、客戶資料丟給 AI 做初步聚類，人工只挑代表性 persona 與驗證 quote。

```prompt-quick
你是有 5+ 年 product design 經驗的資深 UX researcher（熟悉 JTBD、WCAG 2.2、behavioral segmentation）。任務：把訪談摘要 + 客服紀錄 + 客戶資料轉成 Persona · 使用者輪廓（YAML 格式）。

## 輸入素材

[訪談摘要 20 份]
[客服工單摘要]
[客戶 demographics / behavior 資料]

輸出 schema：persona_segments[] / primary_persona / anti_persona / jobs_to_be_done_ref / behavioral_signals / validation_evidence / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 5+ 年 product design 經驗的資深 UX researcher，熟悉 JTBD、behavioral segmentation、WCAG 2.2、a11y persona。
你的輸出會交給 UX（畫 journey）、PM（寫 PRD）、行銷（做 GTM 訊息），他們會用來決定「為誰設計、誰先服務、誰先放棄」。
所以 persona 必須具備行為訊號與決策邏輯，不是人口履歷。

## 情境脈絡

團隊規模 ≥ 5 人、需要跨職能共識「我們在為誰做」時用本 deliverable。
本卡核心問題：讓團隊在爭論時有共同的「他」，把模糊的「使用者」收斂成 3-5 個可被設計與行銷對齊的具體輪廓。

## 任務

根據以下 input 產出「Persona · 使用者輪廓」draft。

## 輸入素材

[訪談摘要 20 份]
[客服工單摘要]
[客戶 demographics / behavior 資料（CRM / analytics）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選 persona A 為 primary，則 persona C 的 X% 需求會被延後）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造人口或行為特徵；列「需要什麼補上」。
4. a11y / 多元性涵蓋：至少一個 persona 必須考慮 WCAG 2.2 相關使用情境（視障 / 高齡 / 低頻使用者），若不適用須說明為何。
5. Out of scope：明列 3 條本文件不處理（例如：付費客群分層、行銷漏斗、合規白名單）。
6. 每個關鍵宣稱（pain / motivation / decision logic）標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 不寫 demographics 履歷（年齡 / 收入單獨出現）；必須綁定行為訊號或決策邏輯才算數。

## 輸出格式（YAML）

persona_segments:
  - id: P1
    elevator_pitch: <string, 一句話>
    demographics:
      type: object
      fields: [<role>, <industry>, <team_size>]
      source: <input ref>
    behavior_signals:
      required: true
      type: list[string]
      example: ["每週開 X 次 dashboard", "在 Slack 而非 Email 溝通"]
      source: <input ref>
      confidence: H | M | L
    top_pains:
      type: list[{pain: string, supporting_quote: string, frequency: int}]
      source: <input ref>
    decision_logic:
      trigger: <what makes them act>
      info_sources: [<channel>, <channel>]
      blockers: [<thing>]
      confidence: H | M | L
    jobs_to_be_done_ref: [<JTBD id>]

primary_persona:
  chosen: P1
  rationale: <why this one first>
  source: <input ref>
  confidence: H | M | L

anti_persona:
  who: <explicitly NOT serving>
  reason: <why excluded>

validation_evidence:
  interview_count_per_persona: { P1: int, P2: int, P3: int }
  saturation_signal: <bool + 為何>
  gaps: [<TODO needs more data on X>]

decision_log:
  - decision: <segmentation cut chosen>
    options_considered: [A_by_role, B_by_use_case, C_by_lifecycle_stage]
    chosen: B_by_use_case
    rejected_reason:
      A_by_role: <why not>
      C_by_lifecycle_stage: <why not>
    confidence: H | M | L

out_of_scope:
  - 不做付費客群分層（屬 marketing segmentation）
  - 不做行銷漏斗階段對應（屬 GTM funnel）
  - 不做合規 / 風控白名單分層（屬 risk）

## 思考步驟

產出前先 step-by-step：
1. 從 input 抓 3-5 個分群訊號（行為 / 動機 / 情境），分別標 H/M/L
2. 列至少 2 條分群切法（by role vs by use case vs by lifecycle）與各自負面後果
3. 列你做了但 input 沒明說的假設
4. 確認 a11y / 多元性涵蓋

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個 persona 的 behavior_signals confidence < H？需要什麼補資料？
2. 哪些 demographics 來自我的腦補而非 input？標出來。
3. 如果只能再追加一份 input（更多訪談 / 更多 analytics / 客服 NPS 評論），哪一份對輸出品質提升最大？
```

回審重點：persona 是否能被團隊輕易區辨、是否有 actionable 設計含意、anti-persona 是否誠實（敢說我們不服務誰）。
