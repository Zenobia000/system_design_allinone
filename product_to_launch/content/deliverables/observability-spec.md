---
title: "Observability Spec · 可觀測規格"
slug: "observability-spec"
stage: "operate"
roles: ["devops", "architect"]
order: 49
hook: "上線前先決定『出事時要看什麼』"
when_to_use: "新服務、新模組、或現有服務告警靠人腦補時"
ai_leverage: "用 Claude 從 SLO 與系統圖反推所需 metric/log/trace"
art: "/generated/stage-operate.png"
source: "software_architect/ppt/05-ilities §Observability, Google SRE"
---

## 解決什麼問題

出事時最痛苦的是沒資料。Observability Spec 在設計階段就決定要產生哪些 metric、log、trace、event，及它們如何回答「使用者受到什麼影響」。

## 誰負責、和誰對接

- **主責：** Architect + DevOps
- **協作：** Dev 實作埋點、SRE 設儀表板
- **下游收件：** SLO、Runbook、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** 新服務、新關鍵路徑、SLO 無法量測時
- ❌ **不需要時：** 短命腳本、無使用者依賴
- ⚠️ **常見誤用：** 只埋 server-side metric；log 沒結構化；trace 缺 user id

## AI 怎麼加速

讓 Claude 從 SLO 與 user journey 反推 SLI 量測點、必備 log 欄位、trace span。

```
你是 observability 顧問。讀 SLO 與 user journey，
為每條路徑輸出：metric（名稱/標籤/單位）、log 欄位、trace span、儀表板版面、告警規則。
Input：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
