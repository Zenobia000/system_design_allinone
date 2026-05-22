---
title: "Threat Model · 威脅建模"
slug: "threat-model"
stage: "design"
roles: ["architect"]
order: 29
hook: "在攻擊者之前先把資料流畫清楚"
when_to_use: "新系統處理 PII、金流、權限邊界，或對外暴露新 API 時"
ai_leverage: "用 Claude 跑 STRIDE 對每個 trust boundary 自動列攻擊面"
art: "/generated/stage-design.png"
source: "software_architect/ppt/05-ilities §Security, NIST SSDF"
---

## 解決什麼問題

把「我們會被怎麼打」從感覺變成清單。輸出 trust boundary、資產、威脅、緩解措施，餵給 NFR 與 Code Review。

## 誰負責、和誰對接

- **主責：** Architect
- **協作：** Security/Compliance、SA 確認資料分類
- **下游收件：** Dev（防禦實作）、QA（負面測試）

## 何時用、何時不用

- ✅ **必要時機：** 新增外部介面、處理高敏感資料、權限模型變更
- ❌ **不需要時：** 純內部工具、無資料分級提升
- ⚠️ **常見誤用：** 把 OWASP Top 10 抄一份當交付；忽略 trust boundary 圖

## AI 怎麼加速

先讓 Claude 對每條跨 trust boundary 的資料流跑 STRIDE，人類再砍掉誇張假設。

```
你是 application security 顧問。針對下列 data flow diagram，
逐條 trust boundary 跑 STRIDE，輸出：威脅、可行性、緩解、驗證方式。
DFD：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: software_architect/ppt/05-ilities §Security, NIST SSDF
