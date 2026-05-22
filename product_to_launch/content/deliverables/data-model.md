---
title: "Data Model · 資料模型"
slug: "data-model"
stage: "design"
roles: ["architect", "dev"]
order: 26
hook: "把資料關係講清楚，避免半年後查不出真相"
when_to_use: "新 entity、跨系統資料整合、合規/稽核產業時"
ai_leverage: "用 Claude 從 SRS + business rules → ERD + DDL 草稿"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

工程師憑直覺建表，半年後查歷史訂單發現 status 用 enum、誰改的、何時改的全沒紀錄。
資料模型是**長期資產**：API 可以改、UI 可以重做，但 data migration 成本永遠最高。
不先設計好 entity、關聯、constraint、retention，後面 migration 永遠在補洞。

## 誰負責、和誰對接

- **主責：** Architect（高層）/ DBA（物理層）/ Dev（實作）
- **協作：** SA（補業務規則）、BE（API 對應）、SRE（補 retention 與 backup）
- **下游收件：** BE 寫 ORM、DBA 寫 migration、QA 設計資料測試

## 何時用、何時不用

- ✅ **必要時機：** 新 entity 設計、跨系統整合、合規/稽核（有 PII / audit 需求）
- ❌ **不需要時：** 純前端 / stateless service、單一 key-value cache
- ⚠️ **常見誤用：** 只畫 entity 不畫 constraint / index / retention；Fowler 強調**所有 DB 變更應為 migration 且與 code 共版控**

## AI 怎麼加速

從 SRS + business rules 產 ERD + DDL。

```
Prompt: 你是 DB architect。根據以下 SRS + business rules：
1) 產出 ERD（用 Mermaid erDiagram 語法）
2) 對每個 entity 列出：column / type / constraint / index / FK
3) 標註 PII 欄位 + 加密策略 + retention 期間
4) 列出 ≥ 2 個典型 query pattern + 對應的 index 設計
5) 給出 initial migration script（DDL）

[輸入...]
```

回審重點：是否有 audit 欄位（created_at / updated_at / version）、PII 標註是否完整、index 是否覆蓋主要 query。

---

> Source: deep-research-report.md §產品與需求相關角色
