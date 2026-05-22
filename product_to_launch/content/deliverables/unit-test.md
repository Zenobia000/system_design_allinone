---
title: "Unit Test · 單元測試"
slug: "unit-test"
stage: "build"
roles: ["dev", "qa"]
order: 34
hook: "讓重構不再靠賭"
when_to_use: "邏輯有分支、邊界條件、或會被其他模組依賴時"
ai_leverage: "用 Claude 從函數簽名生成 edge case 矩陣"
art: "/generated/stage-build.png"
source: "deep-research-report.md §Implementation, §Verification"
---

## 解決什麼問題

Unit Test 真正的價值不是「測對了」，是「敢改」。沒測試的程式碼就是凍住的。覆蓋率是副產品，可重構性才是目標。

## 誰負責、和誰對接

- **主責：** Dev 寫測試與被測對象
- **協作：** QA 對齊 acceptance、SD 對齊錯誤模型
- **下游收件：** CI、Integration Test、Refactor 安全網

## 何時用、何時不用

- ✅ **必要時機：** 業務規則、狀態機、資料轉換、價格/權限計算
- ❌ **不需要時：** 純 wiring code、setter/getter、UI snapshot
- ⚠️ **常見誤用：** 為覆蓋率測 mock、把 unit 寫成 integration

## AI 怎麼加速

讓 Claude 從函數簽名 + spec 生成 edge case 矩陣，Dev 審閱後再實作測試。

```
你是 test engineer。針對下列函數簽名與規格，
列出 edge case 矩陣：輸入範疇、邊界值、錯誤路徑、預期輸出。
Signature + spec：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
