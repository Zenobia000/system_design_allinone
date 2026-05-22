---
title: "ADR · 架構決策紀錄"
slug: "adr"
stage: "design"
roles: ["architect"]
order: 23
hook: "把「為什麼這樣選」寫下來，半年後不用考古"
when_to_use: "跨服務影響、不可逆決策、有 ≥ 2 個合理選項時"
ai_leverage: "用 Claude 從技術討論紀錄 → ADR 草稿（option / trade-off / consequence）"
art: "/generated/key-deliverable-adr.png"
source: "deep-research-report.md §可複製範本 / §關鍵決策節點"
---

## 解決什麼問題

半年後新人問「為什麼用 Kafka 不用 RabbitMQ？」沒人記得；老人離職後決策的脈絡全失。
ADR 把每個重要架構決策寫成**短文件**：context / options / decision / consequences。
沒有 ADR，後人要嘛盲目沿用、要嘛盲目重做，兩種都有成本。

## 誰負責、和誰對接

- **主責：** Architect（最終決策與簽核）
- **協作：** Dev Lead（驗證可實作）、SRE（驗證可營運）、SA（補規格脈絡）
- **下游收件：** 全工程團隊（決策可追溯）、新人 onboarding

## 何時用、何時不用

- ✅ **必要時機：** 跨服務影響、不可逆決策（DB、framework、protocol）、有 ≥ 2 合理選項
- ❌ **不需要時：** 局部模組設計、可逆的小決策、純風格選擇
- ⚠️ **常見誤用：** 把 ADR 當作技術說明書（要寫 trade-off，不寫 how-to）；Status 字段不維護（Superseded 不標）

## AI 怎麼加速

從技術討論紀錄產 ADR 草稿。

```
Prompt: 你是熟悉 ADR 格式的 architect。根據以下技術討論紀錄：
1) Context：當前問題、約束、相關 NFR
2) Decision drivers：reliability / time-to-market / cost / security / operability
3) Options considered（≥ 3 個，含 pros/cons）
4) Decision：選什麼、不選什麼、scope
5) Consequences：positive / negative / follow-up
6) Links：related PRD / C4 / API spec
不要編造未討論的選項。

[討論紀錄...]
```

回審重點：trade-off 是否誠實（有列 negative consequence）、選項是否真實比較過。
