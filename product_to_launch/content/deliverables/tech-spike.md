---
title: "Tech Spike · 技術探索"
slug: "tech-spike"
stage: "design"
roles: ["architect", "dev"]
order: 28
hook: "用最小成本買回最大不確定性"
when_to_use: "有技術假設無法靠紙上分析證實，且決策延後比做錯更貴時"
ai_leverage: "用 Claude 收斂候選方案到 2-3 個 + 列出對應實驗變數"
art: "/generated/stage-design.png"
source: "software_architect/ppt/05-ilities, deep-research-report.md §Architecture Design"
---

## 解決什麼問題

ADR 寫不下去，因為關鍵變數沒人量過。Spike 是時間盒住的實驗，只為了輸出「決策所需的數字或失敗證據」，不是寫產品代碼。

## 誰負責、和誰對接

- **主責：** Architect 或資深 Dev
- **協作：** SA 對齊問題定義、DevOps 提供環境
- **下游收件：** ADR 撰寫者、Dev Lead

## 何時用、何時不用

- ✅ **必要時機：** 跨系統整合風險、效能假設、第三方 SDK 邊界
- ❌ **不需要時：** 答案 Google 30 分鐘可得、團隊已有經驗
- ⚠️ **常見誤用：** Spike 變成偷渡正式功能；沒有時間盒；產出 demo 而非結論

## AI 怎麼加速

讓 Claude 整理候選方案的「可量測指標 + 預期失敗模式」，人類只負責下場跑數字。

```
你是技術選型顧問。針對「<問題陳述>」列出 3 個候選方案，
每個方案輸出：核心假設、可量測指標、失敗模式、最短驗證腳本（≤50 行）。
```

回審重點：human 判斷 trade-off 與閾值。
