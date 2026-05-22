---
title: "Journey Map · 旅程地圖"
slug: "journey-map"
stage: "discovery"
roles: ["ux"]
order: 4
hook: "看到使用者在哪一步真正卡住"
when_to_use: "conversion funnel 多步驟、跨通路體驗、需要找優化點時"
ai_leverage: "用 Claude 把客服紀錄 + 訪談 → journey 草圖與 pain point 標註"
art: "/generated/stage-discovery.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 寫得很整齊，不代表使用者真的能順暢走完。
Journey map 把使用者從「察覺需求」到「完成任務」整個過程攤平，標出每一步的動作、情緒、卡點與機會。
不畫 journey，團隊只能優化單點，永遠看不到「客戶從進來到流失」整條路。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（提供 KPI 與商業目標）、客服（補實際投訴點）、行銷（補前段觸點）
- **下游收件：** PM 寫 PRD scope、UX 畫 user flow、PO 排優先序

## 何時用、何時不用

- ✅ **必要時機：** 跨通路體驗、conversion funnel ≥ 5 步、客訴集中在「流程不順」
- ❌ **不需要時：** 單一 screen 的 widget、API-only 產品
- ⚠️ **常見誤用：** 畫成 happy path 美化圖，忽略 error/rework path；NN/g 強調 journey 必須包含 emotion 與 pain

## AI 怎麼加速

把客服紀錄、訪談、NPS 評論丟給 AI 產 journey 草圖。

```
Prompt: 你是 UX 顧問。根據以下客服工單 + 訪談摘要，
畫出使用者旅程，格式：
| Stage | Action | Touchpoint | Thought | Emotion | Pain | Opportunity |
要求：
1) 至少涵蓋 5 個 stage（awareness → advocacy）
2) 每個 pain point 標註頻次與支持證據
3) 把 happy path 與 error path 分開列

[資料...]
```

回審重點：是否有真實 evidence、是否涵蓋情緒低點、機會點是否 actionable。
