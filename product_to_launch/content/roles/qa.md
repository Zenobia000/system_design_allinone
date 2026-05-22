---
title: "品質工程"
title_en: "QA Engineer"
slug: "qa"
num: "09"
hook: "用證據說服團隊敢不敢上線"
hires_for: "在上線前找到 Dev 沒想到的失敗模式"
fired_when: "只跑既定 test case、不主動探索 risk"
ai_leverage: "用 Claude 從 PRD 生 test case 矩陣、生 edge case 假設"
art: "/generated/role-hero-qa.png"
source: "deep-research-report.md §QA"
---

## 這個角色做什麼

**QA 不是按按鈕的，是提供 evidence 讓團隊敢/不敢上線的人。** 測試策略、測試資料、自動化、defect triage、exit criteria——這條鏈在告訴 PM「現在上線會死多少使用者」。

**核心心態**：QA 不擁有「品質」，整個團隊擁有。QA 擁有的是「品質的證據」。

## 主要產出

- **Test Plan** — scope / level / env / data / automation / exit criteria
- **Test Cases** — 含 happy path、edge case、negative path
- **Defect Report** — severity、reproduction、impact
- **Completion Report** — 風險評估與 go/no-go 建議

## 跟誰對接

- **上游接：** Acceptance criteria、system spec、DoD
- **下游交：** Evidence 給 PM/Dev Lead；alert hint 給 SRE
- **常衝突：** 跟 Dev（「不是 bug 是 feature」）、跟 PM（測試時間永遠不夠）

## AI 時代怎麼還能活著

**AI 能跑既定 case，但 explorative testing、risk-based testing 還是要人。** AI 不知道你公司客服半夜接到客訴會多痛。

加速範例：`基於這份 PRD 生 80 個 test case、按 risk × probability 排序`。

## 何時該招這個角色

**B2C 大流量、金流、合規、或 mobile** 這類「炸了上頭條」的領域，沒專職 QA 等於賭運氣。

---

> Source: deep-research-report.md §QA
