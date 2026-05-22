---
title: "產品負責人"
title_en: "Product Owner"
slug: "po"
num: "02"
hook: "下一個 sprint 要做哪個、為什麼"
hires_for: "讓 backlog 有單一 accountable owner、避免委員會決策"
fired_when: "把所有 stakeholder 的訴求都丟進 backlog、不排序"
ai_leverage: "用 Claude 把 user story 自動補 acceptance criteria 初稿"
art: "/generated/role-hero-po.png"
source: "deep-research-report.md §Product Owner"
---

## 這個角色做什麼

**PO 是 Scrum Guide 裡唯一被定義的產品角色。** 對 Product Goal、backlog ordering、backlog transparency 負最終責任。

**PM 管「為何做、做什麼、值不值得」；PO 管「接下來先做哪一個」。** 小團隊常一人兼，但 backlog 排序權只能有一個人。

## 主要產出

- **Product Goal** — sprint 之上的中期目標
- **Ordered Backlog** — 嚴格排序、隨時可被 team pull
- **Ready Backlog Items** — 估得動、做得動、驗得動的 item
- **Acceptance Criteria** — 每個 story 的驗收條件

## 跟誰對接

- **上游接：** PM 的策略、stakeholder 的訴求、團隊的 feedback
- **下游交：** Refined backlog 給 Developers；priority 給 QA
- **常衝突：** 跟 stakeholder（他們都覺得自己最緊急）、跟 dev（容量永遠不夠）

## AI 時代怎麼還能活著

**排序不是算法問題，是政治問題。** AI 能算 RICE 分數，但說服三個 VP 為什麼他們的需求被往後排，還是要人。

加速範例：`基於這些 user feedback，產生 5 個候選 story、附上 acceptance criteria draft`。

## 何時該招這個角色

**跑 Scrum、且 backlog 超過 50 個 item** 時，沒 PO 就會出現「每個人都覺得自己排的優先級才對」。
