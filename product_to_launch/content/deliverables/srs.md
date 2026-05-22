---
title: "SRS · 系統需求規格"
slug: "srs"
stage: "define"
roles: ["ba", "sa"]
order: 13
hook: "把業務需求翻成系統可實作的規格"
when_to_use: "跨系統整合、合規/稽核產業、需 RFP 對外發包時"
ai_leverage: "用 Claude 把 PRD + business rules → use case + 規則表"
art: "/generated/stage-define.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 講「為什麼做、要做什麼」；但工程師動手前還欠一層：**系統具體該有哪些行為、哪些規則、哪些介面**。
沒有 SRS，BA 的口頭規則隨時間散失、SA 的系統假設藏在腦中、QA 拿不到完整 test 來源。
SRS 把這些寫成**可追溯、可驗收、可對外發包的規格**。

## 誰負責、和誰對接

- **主責：** BA（業務規則）/ SA（系統行為）
- **協作：** PM（驗證對齊 PRD）、Architect（評估技術影響）、QA（驗收條件）
- **下游收件：** Architect 做 ADR、Dev 寫 code、QA 寫 test plan、稽核留檔

## 何時用、何時不用

- ✅ **必要時機：** 金融/醫療/政府合規產業、跨系統整合 ≥ 3 個、需對外 RFP
- ❌ **不需要時：** 小團隊 lean startup、純前端 UI 改版、內部工具 < 5 人用
- ⚠️ **常見誤用：** 把 SRS 寫成 PRD 的複製貼上（缺系統行為層）；ISO/IEC/IEEE 29148 強調 SRS 必須包含 **functional + non-functional + interface + data + constraints**

## AI 怎麼加速

從 PRD + business rules 產 SRS draft。

```
Prompt: 你是熟悉 ISO 29148 的 system analyst。根據以下 PRD + 業務規則：
1) 列出所有 use case（含 primary + alternate flow + exception）
2) 整理 business rule catalog（rule ID / text / source / priority / exception）
3) 列出系統介面（external system / API / data exchange）
4) 列出 NFR（latency / availability / security / audit / a11y）
5) 標出 PRD 中未明確需要釐清的 assumption

[輸入...]
```

回審重點：規則是否有 ID 可追溯、exception 是否完整、是否與 PRD 衝突。

---

> Source: deep-research-report.md §產品與需求相關角色
