---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.01 · Uncertainty Ladder'
footer: 'AI 時代系統設計速成 '
---

<!-- _class: compact -->

<span class="kicker">FRAMEWORK · 不確定性階梯</span>

## WHY · 角色 = 消除一種不確定性 · 9 角色 · 10 種

| 角色 | 消除的不確定性 | 失敗時的代價 |
|---|---|---|
| PM | 商業價值 | 做出沒人要的東西 |
| UX | 使用者行為 | 介面難用、留存差 |
| UI | 視覺呈現 | 廉價感、品牌不一致 |
| SA | 業務規則 | edge case 出 bug |
| Architect | 系統演進與非功能風險 | 擴不動、掛了救不回 |
| SD | 開發落地 | 模組糾纏、加 feature 慢 |
| DBA | 資料正確性、效能、可靠性 | 資料壞 / 慢 / 掉 |
| Dev | 實作正確性 | 功能 bug |
| QA | 結果正確性 | 上線後使用者發現 |
| DevOps | 上線運行 | 半夜 on-call、burnout |

<span class="muted">**判斷力金句**：角色不是用職稱分，是用「負責消除哪種不確定性」來分。</span>

> Source: software_develop_journey/ppt/01-big-picture/03_uncertainty_ladder.md
