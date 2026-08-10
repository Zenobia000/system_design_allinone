---
title: "架構師"
title_en: "Architect"
slug: "architect"
num: "07"
hook: "決定系統未來會不會死"
uncertainty: "系統演進與非功能風險"
hires_for: "在動工前消除演進與非功能風險（可靠性、安全、可運維）"
fired_when: "把 ADR 寫滿、但實際決策都靠口頭、誰問都答得不一樣"
ai_leverage: "用 Claude 把 NFR 與選項分析整理成 ADR draft、列出 trade-off"
ai_can: "NFR 與選項分析整理成 ADR draft、trade-off 表、架構圖草稿"
ai_cannot: "組織政治、人才結構、現有系統的 sunk cost"
human_decides: "哪個 NFR 是 must、哪個只是 nice？微服務還是模組化單體——我的團隊撐得起哪個？"
art: "/generated/role-hero-architect.webp"
source: "deep-research-report.md §Architect"
---

## 這個角色做什麼

**架構師不是畫圖的人，是消除系統演進與非功能風險的人。** 邊界、整合、可靠性、安全、演進路徑。這些決策現在錯了，3 年後沒人救得回來。

**核心信念**：很多系統不是功能做不出來，是後面根本撐不住。流量爆炸 → DB 鎖死 → 微服務互炸 → legacy 改不動。

## 主要產出

- **C4 Diagrams** — context / container / component 三層
- **ADR** — context / drivers / options / decision / consequences
- **NFR Matrix** — latency、availability、security、auditability
- **Threat Model** — 攻擊面、信任邊界、資料分級（STRIDE）
- **Option Paper** — 重大選型的 trade-off 分析

## 跟誰對接

- **上游接：** System spec、NFR 來源、技術限制、現況系統
- **下游交：** ADR 給 SD/Dev Lead；NFR 給 QA/SRE
- **常衝突：** 跟 PM（時程 vs 演進性）、跟 Dev（理想 vs 現實 implementation）

## AI 時代怎麼還能活著

**AI 能列選項，列不出組織政治、人才結構、現有系統 sunk cost。** ADR 的 consequences 一欄需要的就是這種判斷力。

加速範例：`基於這個 NFR matrix，生 3 個架構選項、各自的 trade-off 與失敗模式`。

## 何時該招這個角色

**系統開始跨多個 service、團隊超過 20 人、或進入合規領域** 時，沒 Architect 會在第 2 年技術債爆炸。
