---
title: "API Spec · OpenAPI 契約"
slug: "api-spec"
stage: "design"
roles: ["architect", "dev"]
order: 25
hook: "Freeze 契約，讓 FE/BE/QA 可平行開發"
when_to_use: "跨團隊整合、FE/BE 並行開發、對外開放 API 時"
ai_leverage: "用 Claude 從 SRS / user story → OpenAPI 3.1 spec draft"
art: "/generated/stage-design.png"
source: "deep-research-report.md §可複製範本 / §Freeze 與 readiness"
---

## 解決什麼問題

FE 跟 BE 並行開發，整合那一刻才發現欄位名不同、型別不同、error code 不一致——一週都在補洞。
API Spec（OpenAPI 3.1）的核心價值是**讓契約先穩定**，雙方可以從 mock server 開始平行寫 code、寫 test。
沒 freeze 契約就動工，等同沒對齊就一起跑步。

## 誰負責、和誰對接

- **主責：** Architect / Dev Lead（決定契約）
- **協作：** FE（消費者驗證）、BE（生產者驗證）、QA（測試對齊）
- **下游收件：** FE/BE 平行寫 code、QA 寫 contract test、SDK 自動生成

## 何時用、何時不用

- ✅ **必要時機：** FE/BE 跨團隊、microservice 整合、對外 public API
- ❌ **不需要時：** 內部 monolith 函式呼叫、單一團隊全棧
- ⚠️ **常見誤用：** 漏掉 error code / idempotency / rate limit / auth；OpenAPI 3.1 必填 **endpoint + schema + auth + error + idempotency**，並有 change policy（breaking change 需 review）

## AI 怎麼加速

從 SRS + user story 產 OpenAPI 草稿。

```
Prompt: 你是熟悉 OpenAPI 3.1 的 BE architect。根據以下 SRS + user story：
1) 產出完整 OpenAPI 3.1 spec（yaml）
2) 每個 endpoint 含：summary / operationId / requestBody / responses (含 4xx/5xx)
3) Schema 含驗證規則（required / pattern / min/max）
4) 標註 idempotency key、rate limit、auth scope
5) 加 x-governance 區塊（owner / consumers / freeze date / change policy）

[輸入...]
```

回審重點：error code 是否完整、idempotency 是否考慮、breaking change policy 是否寫進去。
