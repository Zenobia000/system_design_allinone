---
title: "Prototype · 互動原型"
slug: "prototype"
stage: "design"
roles: ["ux", "ui"]
order: 19
hook: "在寫程式前用最低成本驗證互動"
when_to_use: "高風險互動、新手勢/動畫、stakeholder 簽核前"
ai_leverage: "用 Claude 從 wireframe → 互動腳本 + 可用性測試題目"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 上看起來合理的流程，使用者實際操作可能完全迷失。
Prototype 用 Figma/Framer 串起 wireframe，讓**真實使用者能點、能滑、能感受**，找出靜態圖看不見的問題。
不做 prototype 就直接 build，等於把 usability test 延到上線後。

## 誰負責、和誰對接

- **主責：** UX（行為設計）/ UI（視覺呈現）
- **協作：** PM（驗證需求）、Dev（評估技術限制）
- **下游收件：** UX 跑 usability test、UI 做 high-fidelity、Dev 估開發成本

## 何時用、何時不用

- ✅ **必要時機：** 高風險互動（金流、註冊、首次體驗）、新手勢/動畫、stakeholder 對 flow 有歧見
- ❌ **不需要時：** 既有元件複用、純內容頁、簡單表單
- ⚠️ **常見誤用：** 做得過度精細變成「demo 用」而非「測試用」；prototype 應**夠真實到能測試，但不浪費資源做最終視覺**

## AI 怎麼加速

從 wireframe + user flow 產互動腳本、測試題目與 edge state，人工只審任務真實性與引導風險。

```prompt-quick
你是有 5+ 年 product design 經驗的資深 UX designer（熟悉 user research、interaction patterns、prototype tooling、WCAG 2.2）。任務：把 wireframe + user flow 轉成 互動 Prototype（YAML 格式）。

<input>
[Wireframe（screen + flow）]
[User flow（含分支與例外）]
[受測目標與使用者 segment]
</input>

輸出 schema：flow_steps / interaction_specs / edge_state_screens / narration_script / test_questions / prototype_fidelity / known_limitations / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 product design 經驗的資深 UX designer / researcher，熟悉 Figma / Framer prototype、interaction heuristics、think-aloud protocol、task-based testing、WCAG 2.2 keyboard/screen reader audit。
你的輸出會交給 UX（跑 usability test）、UI（接續做 high-fidelity）、Dev（估開發成本與技術限制）、PM（驗證需求）。
他們會用來「在寫程式前用最低成本驗證互動」，所以 prototype 必須夠真實到能測試（覆蓋邊界 state、可點可滑），但不浪費資源做最終視覺。
</role>

<context>
高風險互動（金流、註冊、首次體驗）、新手勢/動畫、stakeholder 對 flow 有歧見時用本卡。
本卡核心問題：PRD 上看起來合理的流程，使用者實際操作會不會迷失？哪些邊界 state 必須在 prototype 涵蓋才能測出真實問題？
</context>

<input>
[Wireframe（screen + flow，已凍）]
[User flow（含分支、錯誤、回退）]
[受測目標與使用者 segment（招募條件）]
[技術限制（例：mobile gesture 支援度）]
</input>

<rules>
1. 每個任務 / 互動註明 source：[wireframe screen ID / flow 第 X 步 / 訪談 P3]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：prototype 做到 high-fidelity 真實但受測者會被視覺分心、做太粗糙又測不出 micro-interaction 問題）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造受測者 quote 或 metric；列「需要什麼補上」。
4. a11y（WCAG 2.2）：prototype 必須可用鍵盤完成主要任務、focus 視覺可見、不只用色傳達狀態——任一未達需於 known_limitations 說明為何此 prototype 暫不涵蓋。
5. Out of scope 至少 3 條，明寫不做什麼（例：不做後端 API 串接、不做最終視覺、不做 motion timing 微調）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 測試任務必須 task-based（給目標，不告訴怎麼做）；嚴禁引導性語句（「這裡是不是很簡單？」）。
</rules>

<output_schema>
flow_steps:
  - step: 1
    screen: <screen ID>
    user_goal: <該步驟使用者想達成什麼>
    expected_action: <點 / 滑 / 鍵入>
    next_screen: <下一個 screen ID>
    source: <input ref>
    confidence: H | M | L

interaction_specs:
  - element: <CTA / input / gesture>
    gesture: enum[tap, swipe, long_press, drag, keyboard]
    transition: <fade / slide / instant>
    timing_ms: <duration>
    feedback: <視覺 / 觸覺 / 音效>

edge_state_screens:
  - state: enum[loading, empty, error, partial, offline, success]
    screen: <對應 screen ID>
    trigger: <何條件進此 state>
    recovery_path: <如何離開>
    source: <input ref>

narration_script:
  intro: <給受測者的開場（中立、不引導）>
  consent: <錄影 / 資料使用授權話術>
  closing: <收尾感謝 + follow-up>

test_questions:
  - task_id: T1
    scenario: <情境，task-based，例：「你想取消上個月的訂閱，請完成它」>
    success_criteria:
      time_max: <秒>
      clicks_max: <次>
      errors_max: <次>
    observation_checkpoints: [<≥ 5 個可能卡住的點>]
    follow_up_open: [<為什麼這樣選 / 預期看到什麼>]
    leading_check: <自審：此題是否引導？>
    source: <input ref>

prototype_fidelity:
  level: enum[low, mid, high]
  rationale: <為何此 fidelity——夠真實但不過度>
  tool: <Figma / Framer / ProtoPie>

known_limitations:
  - <例：iOS 手勢無法在 web prototype 還原>
  - <例：鍵盤 a11y 在 Figma prototype 不可測>
  - <例：真實 API latency 未模擬>

decision_log:
  - decision: <例：fidelity 用 mid 還是 high>
    options_considered: [low, mid, high]
    chosen: mid
    rejected_reason:
      low: <為何不>
      high: <為何不>
    confidence: H | M | L

out_of_scope:
  - <例：不做後端 API 串接 / 真實資料>
  - <例：不做最終視覺 / 品牌色>
  - <例：不做 motion timing 微調>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（user flow 高風險節點 / 預期使用者卡點 / 技術限制）
2. 列至少 2 條 viable fidelity 路徑（mid vs high）與各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設受測者裝置為 mobile、有網路）
4. 確認 a11y 限制是否誠實列入 known_limitations
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個任務 confidence < H？是否有引導性語句？
2. 哪些假設來自我而非 input？標出來（特別是「受測者會理解情境」這類假設）。
3. 如果只能再追加一份 input，是哪一份（例：技術 spike 結果 vs 競品 prototype）？為什麼？
</verify>
```

回審重點：human 判斷任務是否真實反映使用者目標、是否引導答案、edge state 涵蓋是否誠實、prototype fidelity 是否符合測試目的。
