---
title: "FRD · 功能需求文件"
slug: "frd"
stage: "define"
roles: ["ba", "pm"]
order: 14
hook: "把 PRD 的 what 拆解成每個功能的精細規格"
when_to_use: "PRD 範圍大、含 ≥ 5 個獨立功能、需向工程精準交付時"
ai_leverage: "用 Claude 把 PRD section → FRD 功能表 + 規則樹"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 適合對齊「為什麼做」，但對工程實作而言過於高階。
FRD 把 PRD 中的每個功能拆成**獨立的規格條目**：input、output、處理規則、錯誤情境、相依資料。
不寫 FRD，工程師會在 sprint 中不斷回頭問「這個欄位驗證規則是？」「這狀態下要顯示什麼？」，一週 standup 都耗在補需求。

## 誰負責、和誰對接

- **主責：** BA（細節規格）/ PM（範圍確認）
- **協作：** SA（系統行為層）、UX（互動規則）、QA（驗收條件）
- **下游收件：** Dev 實作、QA 寫 test、UI 補空狀態與錯誤訊息文案

## 何時用、何時不用

- ✅ **必要時機：** PRD 含 ≥ 5 個獨立功能、跨團隊交付、外包開發
- ❌ **不需要時：** 小團隊 PRD + user story 已足、純探索 spike
- ⚠️ **常見誤用：** FRD 與 PRD 重複（要切清楚 what vs how-detail）；FRD 與 user story 重複（FRD 偏完整功能，user story 偏可 sprint 切片）

## AI 怎麼加速

把 PRD section 餵給 AI 產 FRD 條目化規格。

```
Prompt: 你是資深 BA。將以下 PRD section 轉成 FRD，每個功能條目含：
1) Function ID + name + description
2) Input（欄位、型別、驗證規則）
3) Output（成功回傳、錯誤回傳）
4) Processing rules（含 business rule ID 引用）
5) Dependencies（上下游系統、資料）
6) Acceptance criteria（Given/When/Then）
標出 PRD 未明確、需要釐清的 ≥ 3 個 open question。

[PRD section...]
```

回審重點：欄位驗證規則是否完整、錯誤情境是否涵蓋、與 PRD 一致性。
