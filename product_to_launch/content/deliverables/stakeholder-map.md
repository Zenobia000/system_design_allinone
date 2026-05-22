---
title: "Stakeholder Map"
slug: "stakeholder-map"
stage: "define"
roles: ["pm", "ba"]
order: 15
hook: "把「誰該知道、誰能決策、誰會擋」一張圖看完"
when_to_use: "跨部門新功能、合規/稽核專案、敏感資料變更時"
ai_leverage: "用 Claude 從組織架構 + 專案 scope → stakeholder 分類與溝通節奏"
art: "/generated/stage-define.png"
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

把組織架構 + 專案 scope 丟給 AI 產分類表。

```
Prompt: 你是熟悉 BABOK 的 BA。根據以下組織架構 + 專案 scope：
1) 列出所有 stakeholder（含內部 + 外部 + 監管）
2) 用 interest × influence 矩陣分類（高/低）
3) 對每個 stakeholder 列出：關注點、決策權範圍、預期溝通節奏
4) 標出 ≥ 2 個容易被忽略但具否決權的角色
5) 推薦各角色的 RACI（R/A/C/I）

[輸入...]
```

回審重點：是否漏掉法遵/資安/稽核、決策權描述是否準確。

---

> Source: deep-research-report.md §產品與需求相關角色
