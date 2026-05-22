---
title: "設計"
title_en: "Design"
slug: "design"
num: "03"
hook: "把規格變成可建造的藍圖"
exit_criteria: "NFR 確認、ADR 寫定、API contract freeze、DB schema freeze"
typical_stuck: "UX 等架構、架構等 UX；API 還沒 freeze 就讓人開做"
art: "/generated/stage-design.webp"
source: "software_develop_journey/process_map/index.html §design"
---

## 這個階段要回答什麼

**「怎麼蓋？邊界在哪？哪些決策現在不定後面會死？」** Design 不是序列化的——UX、architecture、data design 應該並行，只在關鍵節點 freeze。

**核心 freeze 點**：API contract、DB schema、NFR baseline。這三個沒 freeze，FE/BE/Mobile 開做就是踩在濕地上跑。

## 必要產出

- **Hi-fi UI / Component Spec**（UI） — token、state、a11y
- **C4 / ADR / NFR Matrix**（Architect） — 重大決策可追溯
- **API Contract / OpenAPI**（SD/BE） — 可生成 mock 與 client
- **DB Schema / Migration Plan**（DBA） — backfill、rollback 可演練
- **Module Design**（SD） — sequence、error model、telemetry hooks

## 典型卡關

- **序列化迷思**：UX 等 architecture、architecture 等 UX；其實兩條線可並行
- **太早 freeze**：選項還沒分析完就拍板，後面反覆改 ADR
- **太晚 freeze**：FE/BE 已經開做 API 才在變，雙倍工
- **NFR 缺席**：latency、availability、security 沒列出 baseline，QA 不知道測什麼

## AI 加速哪些事

**ADR draft、選項 trade-off、API spec 從 use case 生 OpenAPI、DB migration script。** AI 能列選項，但 consequences 的政治判斷要人。

加速範例：`基於這個 use case 生 OpenAPI 3.1 spec、含 error code 與 idempotency key`。
