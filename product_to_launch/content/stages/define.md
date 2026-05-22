---
title: "定義"
title_en: "Define"
slug: "define"
num: "02"
hook: "把模糊需求變可執行規格"
exit_criteria: "PRD 簽核、優先級鎖定、business rules 有 ID、SRS draft 通過"
typical_stuck: "需求一直變、stakeholder 互相打架、沒人能說最後一句話"
art: "/generated/stage-define.webp"
source: "software_develop_journey/process_map/index.html §define"
---

## 這個階段要回答什麼

**「要做什麼？做到什麼程度算完？」** Define 沒做好，後面 design 跟 build 都會反覆改。

重點是把 discovery 的「值得做」變成可排序、可估算、可驗收的 backlog 與規格骨架。

## 必要產出

- **PRD**（PM） — 問題、KPI、scope、風險、依賴
- **Ordered Backlog**（PO） — sprint 可 pull 的 story
- **Business Rules Catalog**（BA） — 每條規則有 ID、owner、例外
- **System Spec / SRS draft**（SA） — actor、use case、state、edge case
- **Initial User Flow**（UX） — 低保真、可走通

## 典型卡關

- **需求一直變**：因為 discovery 沒做完就跳進來，回頭重訪談
- **Stakeholder 打架**：把選項與 trade-off 寫出來、不靠氣氛拍板
- **沒人說最後一句話**：confirm 誰是 backlog 的 single accountable owner
- **規格只寫 happy path**：SA 要主動補例外、退件、補件流程

## AI 加速哪些事

**PRD 骨架、acceptance criteria、use case 草稿、規則整理。** AI 補洞速度極快，但要由人去驗證跟 stakeholder 對齊。

加速範例：`基於這份 PRD 生 user story + acceptance criteria，附 5 個容易漏的 edge case`。
