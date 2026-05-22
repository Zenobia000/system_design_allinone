---
title: "Integration Test"
slug: "integration-test"
stage: "build"
roles: ["qa", "dev"]
order: 35
hook: "確認『各自能跑』之後『接起來還能跑』"
when_to_use: "跨模組、跨服務、跨外部系統的契約需要被驗證時"
ai_leverage: "用 Claude 從 API contract 生成 happy + unhappy 路徑"
art: "/generated/stage-build.png"
source: "deep-research-report.md §Verification"
---

## 解決什麼問題

單元測試綠燈不代表系統會動。Integration Test 驗證契約、序列化、認證、timeout、retry、idempotency 在真實邊界上是否一致。

## 誰負責、和誰對接

- **主責：** QA + Dev 共寫
- **協作：** DevOps 提供類生產環境、DBA 提供測試資料
- **下游收件：** CI pipeline、UAT、Release Gate

## 何時用、何時不用

- ✅ **必要時機：** 新 API、第三方整合、queue/event flow、schema migration
- ❌ **不需要時：** 純函式庫、無外部依賴
- ⚠️ **常見誤用：** mock 掉所有外部依賴後等於 unit test；測資不還原

## AI 怎麼加速

讓 Claude 從 OpenAPI/AsyncAPI 生成 happy / unhappy / contract violation 三組測試初稿。

```
你是 integration test 工程師。讀下列 OpenAPI，
為每個 endpoint 生成 happy path、4xx/5xx、timeout、idempotency 重送的測試案例。
Spec：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: deep-research-report.md §Verification
