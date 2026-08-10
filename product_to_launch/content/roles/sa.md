---
title: "系統分析"
title_en: "System Analyst"
slug: "sa"
num: "06"
hook: "把需求翻成系統規格、補規則的縫隙"
uncertainty: "業務規則"
hires_for: "讓 Dev 不用猜 if/else、QA 不用猜驗收條件"
fired_when: "只寫主流程、不寫 state machine 與例外"
ai_leverage: "把 PRD + 訪談 → Claude 生 use case 與 state diagram 草稿"
ai_can: "use case 與 state diagram 草稿、edge case 展開、規格文件"
ai_cannot: "補不齊例外流；跨部門協商出來的規則要人去談"
human_decides: "付款成功但庫存扣失敗怎麼辦？哪些規則是鐵律、哪些是常見但有例外？"
art: "/generated/role-hero-sa.webp"
source: "deep-research-report.md §SA"
---

## 這個角色做什麼

**SA 是規則的翻譯官。** PM 講 what、SA 講 system how。把模糊需求變成 actor、use case、business rule、state machine、integration points。

**SA vs Architect 一句話**：SA 管功能清晰度、Architect 管結構穩定度。Dev 要寫的每個 if/else，都來自 SA 寫的規格。

## 主要產出

- **System Spec / SRS** — actor、use case、event、rule、edge case
- **System Flow** — 跨系統的 sequence/data flow
- **State Machine** — pending → paid → shipped → ...
- **Integration Inventory** — 跟誰交換什麼資料

## 跟誰對接

- **上游接：** PRD、BA 的 business rules、stakeholder 流程資料
- **下游交：** Spec 給 Architect/SD/Dev/QA
- **常衝突：** 跟 PM（規格細節 vs 上市速度）、跟 Architect（功能 vs 可演進性）

## AI 時代怎麼還能活著

**AI 能補 happy path，補不齊例外流。** 「付款成功但庫存扣失敗怎麼辦」「退貨後是否退運費」這種需要跨部門協商的規則，要人去談。

加速範例：`從這份 PRD 萃取所有 use case、補出 5 個最容易漏的 edge case`。

## 何時該招這個角色

**金流、訂單、工單、權限、合規** 這類規則密集的系統，沒 SA 會在 UAT 大爆炸。
