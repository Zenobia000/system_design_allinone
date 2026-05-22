---
title: "CI/CD Pipeline"
slug: "ci-cd-pipeline"
stage: "ship"
roles: ["devops", "dev"]
order: 38
hook: "讓『可發布』從人工判斷變成 pipeline 證據"
when_to_use: "團隊 ≥ 2 人或變更頻率高於每週一次時"
ai_leverage: "用 Claude 從現有 pipeline yaml 找出冗餘 stage 與安全 gap"
art: "/generated/stage-ship.png"
source: "deep-research-report.md §Implementation, DORA, NIST SSDF"
---

## 解決什麼問題

業界公認的四個交付指標（部署頻率、前置時間、變更失敗率、復原時間）都依賴一件事：pipeline 可信。CI/CD 把 build、test、scan、artifact、deploy 串成可重現流程，並留證據鏈。

## 誰負責、和誰對接

- **主責：** DevOps
- **協作：** Dev（測試 stage）、Security（SAST/SCA gate）、SRE（部署策略）
- **下游收件：** Release Plan、Rollback Plan、Audit

## 何時用、何時不用

- ✅ **必要時機：** 多人協作、跨環境部署、合規要求
- ❌ **不需要時：** 一次性腳本、個人實驗
- ⚠️ **常見誤用：** pipeline 通過就上線，沒有 release gate；artifact 不可重現

## AI 怎麼加速

讓 Claude 讀 yaml 找出無 cache、無平行、無安全掃描、無 artifact 簽章的 stage。

```
你是 platform engineer。讀下列 CI yaml，
列出問題：冗餘 stage、缺安全 gate、artifact 不可重現、無 rollback。
給出修正後的最小 diff。
Pipeline：<貼上>
```

回審重點：human 判斷 trade-off 與閾值。
