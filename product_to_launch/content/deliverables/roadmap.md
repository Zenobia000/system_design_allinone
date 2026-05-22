---
title: "Roadmap · 產品路線圖"
slug: "roadmap"
stage: "define"
roles: ["pm"]
order: 10
hook: "讓 stakeholder 看到「未來三季要解什麼問題」而非「哪天上 feature」"
when_to_use: "跨季規劃、stakeholder 對齊、招募與資源預估時"
ai_leverage: "用 Claude 把 backlog + OKR + 依賴 → outcome-based roadmap"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

把 roadmap 寫成「Q3 上線 feature X」是常見錯誤；一旦延期，整份文件失信。
Roadmap 應該是**outcome-based**：列出「要解什麼 problem / 達到什麼 outcome」，feature 只是手段，可以替換。
沒有 roadmap，stakeholder 無法做資源預估、業務無法做承諾、招募無法規劃。

## 誰負責、和誰對接

- **主責：** PM
- **協作：** PO（驗證 backlog 可行性）、Dev Lead（估 capacity）、Stakeholders（對齊商業節奏）
- **下游收件：** PO 排 backlog、HR 規劃招募、業務做客戶承諾

## 何時用、何時不用

- ✅ **必要時機：** 跨季規劃、stakeholder ≥ 5 人需對齊、有外部承諾需求
- ❌ **不需要時：** 純探索期、產品 PMF 未確認、團隊 < 5 人
- ⚠️ **常見誤用：** 寫成 Gantt chart 鎖死日期（變更成本極高）；應用「now / next / later」三欄結構，越遠越粗

## AI 怎麼加速

把 OKR + backlog + 依賴關係丟給 AI 排出 outcome-based roadmap。

```
Prompt: 你是產品策略顧問。根據以下 OKR、backlog、依賴清單：
1) 用 now / next / later 三欄輸出 roadmap
2) 每欄列 outcome（不列 feature）+ 對應的候選 initiative
3) 標出 cross-team 依賴與外部 blocker
4) 對每個 outcome 給信心分數（0-10）

[輸入...]
```

回審重點：是否真為 outcome（不是 feature）、依賴是否真實、信心分數是否誠實。
