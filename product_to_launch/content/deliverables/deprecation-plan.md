---
title: "Deprecation Plan · 廢棄計畫"
slug: "deprecation-plan"
stage: "operate"
roles: ["architect", "po"]
order: 53
hook: "把『下架』從口頭承諾變成可追蹤遷移"
when_to_use: "舊 API、舊 endpoint、舊 schema 仍有使用但需退場時"
ai_leverage: "用 Claude 從存取日誌找出殘留依賴與聯絡人"
art: "/generated/stage-operate.png"
source: "deep-research-report.md §Architecture, GitLab deprecation policy"
---

## 解決什麼問題

廢棄沒人管會變成永遠的技術債。Deprecation Plan 規範公告時間、替代方案、強制下線日，並用監控確認沒人在用才動手。

## 誰負責、和誰對接

- **主責：** Architect + PO
- **協作：** Dev（替代實作）、Customer Success（外部通知）、DevOps（流量監控）
- **下游收件：** Release Plan、ADR、Cost Monitor

## 何時用、何時不用

- ✅ **必要時機：** 舊 API 已有替代、schema 演進、第三方依賴退場
- ❌ **不需要時：** 內部可直接重構、無外部消費者
- ⚠️ **常見誤用：** 只發 email 不監控流量；公告期過短；無替代方案

## AI 怎麼加速

讓 Claude 從存取日誌找出殘留 caller、推估遷移工作量、產出公告與時程。

```
你是 platform owner。讀下列 access log 與 endpoint inventory，
輸出 deprecation plan：對象、殘留 caller、聯絡人、替代方案、
公告時間、sunset 日期、強制下線指標、回滾安全期。
Logs：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。

---

> Source: deep-research-report.md §Architecture, GitLab deprecation policy
