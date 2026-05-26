---
title: "OKR · 目標與關鍵結果"
slug: "okr"
stage: "define"
roles: ["pm", "po"]
order: 9
hook: "把產品方向翻成可衡量的季度承諾"
when_to_use: "季度規劃、跨團隊對齊、需要在多個 backlog item 間排優先序時"
ai_leverage: "用 Claude 從北極星指標反推可量化 Key Result"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

backlog 上一百個 item，每個 sprint 還是只能做五個。沒有 OKR，排序變成「誰嗓門大誰先做」。
OKR 的價值不是 KPI 別名，而是**強迫團隊在季度內只承諾少數幾個結果**，其他都得讓位。
寫不出 OKR，通常代表產品策略本身就模糊。

## 誰負責、和誰對接

- **主責：** PM（提案 Objective）/ PO（落地到 backlog）
- **協作：** Stakeholders（對齊商業目標）、Dev Lead（驗證 capacity）
- **下游收件：** PO 排 backlog、Dev Lead 排 sprint、Stakeholders 追進度

## 何時用、何時不用

- ✅ **必要時機：** 季度規劃、跨 squad 協作、團隊 ≥ 10 人
- ❌ **不需要時：** 小團隊單一明確目標、緊急 incident response 階段
- ⚠️ **常見誤用：** Objective 寫成 task list（「完成 feature A」）、Key Result 不可量測（「提升使用者滿意度」）；KR 必須有數字與量測方式

## AI 怎麼加速

把北極星指標 + 本季商業目標 + 歷史達成率整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 ambition 與 trade-off**。本卡輸出**真實 OKR markdown 文件**（含 KR 表、counter-metric、cadence、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 solo / 小團隊單季快速設定用，**完整範本**給跨 squad / 董事會 level 承諾 / 含 leading/lagging cadence 場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "okr"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["north-star-metric", "quarterly-business-goals"]
  optional: ["last-quarter-okr-attainment"]
---

# OKR · <FY-Qn> · <team-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 5, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。Objective 必須質性、有方向感，**禁寫成 task list**（「完成 feature A」= 直接 reject）；每個 KR 必含 baseline → target 數字 + 量測方式；理想 ambition 信心 0.5–0.7；必含至少 1 個 counter-metric 防 goal-hacking。缺資料寫 `_TODO: 需要 XXX_` 不編造。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：本季 Objective 一句話、KR 數量、最大不確定性、最強商業承諾節點 -->

<3-5 行說明>

> **TL;DR:** <一句話：本季要達成什麼質性結果，砍掉什麼讓位>

---

## 2. Objective & Key Results

### Objective · **[H]**

<!-- ai-rule: 質性陳述。禁出現「完成 / 上線 / ship」這類 task 詞。應有方向感 + 對誰有影響 -->

> <例：讓中型 SaaS 客戶在 onboarding 第一週就感受到核心價值>

**Source:** business-goals §1 + north-star §current-gap

### Key Results

<!-- ai-rule: 2-4 個 KR。每個 KR 含 baseline → target + measurement + 量測來源系統 + leading/lagging 標記 -->

| ID | Statement | Baseline | Target | Measurement | Type | Ambition (0-1) | Confidence |
|---|---|---|---|---|---|---|---|
| KR-1 | <將 X 從 A 提升到 B by 季末> | <num + 來源系統> | <num> | <how + 頻率> | **leading** | 0.6 | **[H]** |
| KR-2 | ... | ... | ... | ... | **lagging** | 0.55 | **[M]** |
| **Counter** | <例：退費率 不可惡化超過 X%> | <baseline> | < X% | <how> | guardrail | — | **[H]** |

---

## 5. Cadence & Pivot Triggers

<!-- ai-rule: 至少寫週 check-in 看什麼 leading 指標 + 季中 pivot 觸發條件 -->

- **Weekly check-in:** <監看 KR-1 / 其他 leading 指標>
- **Mid-quarter pivot trigger:** <例：第 6 週 KR-1 < 30% target progress 則重新校準>
- **End-quarter review:** <達成判定標準與 retro 流程>

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | <例：選 KR-1 還是候選 KR-X> | KR-1 / KR-X / 兩者並行 | KR-1 | KR-X (與 OKR 主軸偏離)、並行 (capacity 壓爆) |

---

## 12. Confidence & Sources & TODO

- **最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1，例：團隊本季 capacity 不變>
- **Highest-value next input:** <capacity 數字 / 同業 benchmark / 客戶訪談 三選一>

### TODO（缺資料）

- _TODO: 需要 XXX 校準 KR-2 baseline_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 5, 10, 12，刻意不連號）
> - [ ] Objective 是質性陳述，無 task 詞（完成 / 上線 / ship）
> - [ ] 每個 KR 含 baseline → target + measurement + leading/lagging 標記
> - [ ] 至少 1 個 leading KR 以便季中調整
> - [ ] 至少 1 個 counter-metric 防 goal-hacking
> - [ ] 每個 KR 帶 ambition (0-1) + `[H/M/L]` badge + `（依據：...）` 引用
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（OKR 是給人讀的 markdown）
```

```template-full
---
doc_type: "okr"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["north-star-metric", "quarterly-business-goals", "last-quarter-okr-attainment"]
  optional: ["industry-benchmark", "capacity-forecast", "customer-interviews"]
---

# OKR · <FY-Qn> · <team-name>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / Dev Lead / Exec sponsor

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。Objective 必須質性、有方向感（**禁 task list**）；每個 KR 必含 baseline → target 數字 + 量測方式 + 來源系統 + leading/lagging 標記；ambition 信心 0.5–0.7（高於 0.7 太保守、低於 0.5 不切實際）；必含至少 1 個 counter-metric 防 goal-hacking；必須區分 leading vs lagging（至少 1 個 leading 以便季中調整）。每結論 `（依據：business-goals §X / north-star §Y）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PM · required: always -->

<!-- ai-fill: 3-5 行：本季 Objective、KR 數量、對 north-star 的預期貢獻 %、最大假設與不確定性 -->

<3-5 行說明>

> **TL;DR:** <一句話：本季要達成什麼質性結果，砍掉什麼讓位>

---

## 2. Objective
<!-- owner: PM · required: always -->

<!-- ai-rule: 質性陳述，禁任務化（「完成 / 上線 / ship」直接 reject）。應有方向感、清楚誰受影響、為何此季要做 -->

> <例：讓中型 SaaS 客戶在 onboarding 第一週就感受到核心價值>

- **Confidence:** **[H]**
- **Source:** business-goals §1 + north-star §current-gap
- **Rationale:** <為何此 objective 是本季關鍵：北極星 gap / 客戶承諾 / 商業節奏>

---

## 3. Key Results
<!-- owner: PM · required: always -->

<!-- ai-rule: 3-5 個 KR。每個 KR 含 baseline → target + measurement + type + ambition 0-1 + source -->

| ID | Statement | Baseline | Target | Measurement | Source system | Type | Ambition | Confidence |
|---|---|---|---|---|---|---|---|---|
| KR-1 | <將 X 從 A 提升到 B by 季末> | A | B | <how + 量測頻率> | <Amplitude / Looker / SQL> | **leading** | 0.6 | **[H]** |
| KR-2 | ... | ... | ... | ... | ... | **lagging** | 0.55 | **[M]** |
| KR-3 | ... | ... | ... | ... | ... | **leading** | 0.65 | **[M]** |

---

## 4. Counter-metric（防 goal-hacking）
<!-- owner: PM · required: always -->

<!-- ai-rule: 至少 1 個 counter-metric；必須對應某個 KR 的可能負面外溢 -->

| Counter-metric | Threshold (不可惡化的上限) | Why this hedges | Source |
|---|---|---|---|
| <例：退費率> | < X% (current Y%) | KR-1 衝轉換率時可能引入低品質流量 | finance §1 |
| <例：CSAT> | ≥ Z (current Z+0.2) | KR-2 衝速度可能犧牲體驗 | NPS dashboard |

---

## 5. Alignment to North Star
<!-- owner: PM · required: always -->

- **North star metric:** <名稱 + 當前值 + benchmark>
- **Expected contribution:** <例：本 OKR 預估貢獻 north-star +12% by Q-end，因為 KR-1 直接驅動 activation rate>
- **Confidence:** **[M]**
- **Source:** <input ref>

---

## 6. Leading vs Lagging Breakdown
<!-- owner: PM · required: full-only -->

<!-- ai-rule: 至少 1 個 leading KR 以便季中可調整；rationale 必須說明季中 pivot 機制 -->

- **Leading KRs:** KR-1, KR-3
- **Lagging KRs:** KR-2
- **Rationale:** <leading 是行為先行指標（usage / activation），lagging 是結果（revenue / retention）。leading 季中可調整路徑、lagging 季末才能判定>

---

## 7. Quarterly Cadence
<!-- owner: PM + Exec · required: full-only -->

| Check-in | Frequency | What to look at | Decision threshold |
|---|---|---|---|
| Weekly leading review | 週一 30 min | KR-1 / KR-3 weekly delta | < 50% expected pace → 升級到 PM + Dev Lead |
| Mid-quarter pivot review | 第 6 週 60 min | 全部 KR + counter-metric | < 30% target progress → 重新校準 target 或砍 KR |
| End-quarter review | 季末 90 min | 達成數字 + 自評 0-1 | 自評 0.7-1.0 = 達成；< 0.4 = 重新檢視 ambition 設定 |

---

## 8. Capacity & Dependencies
<!-- owner: PM + Dev Lead · required: full-only -->

| Dependency | Owner | Needed by | Risk if late | Confidence |
|---|---|---|---|---|
| <例：onboarding flow refactor> | <eng-team-A> | Week 4 | KR-1 baseline 量測無法啟動 | **[M]** |
| <例：data pipeline 升級> | <data-team> | Week 6 | KR-3 measurement 不準 | **[L]** |

- **Team capacity assumption:** <FTE 數 + 預留 incident & tech debt budget 20-30%>

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：KR-1 ambition 0.6 但歷史 attainment 僅 0.3，可能過樂觀> — **Mitigation:** 第 4 週 checkpoint 重新校準 — **Owner:** PM
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：KR-2 measurement 是用 Amplitude 還是自建 SQL？data team 待確認>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: PM · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <例：本季 Objective 主軸> | activation / retention / monetization | activation | retention (上季已做)、monetization (PMF 未穩) | **[H]** |
| YYYY-MM-DD | <例：是否設 counter-metric on CSAT> | yes / no | yes | no (KR-2 對速度的衝擊會傷體驗，必須對沖) | **[H]** |

---

## 11. Out of Scope
<!-- owner: PM · required: full-only -->

本季 OKR **不處理**：

- ❌ **技術債清理** — 屬 tech-debt budget（已預留 20% capacity）
- ❌ **純內部工具改進** — 屬 platform team OKR
- ❌ **> 1 季才能驗證的指標** — 屬 annual roadmap
- ❌ **Bug fix 與運維** — 屬 sprint 內 baseline 工作

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1，例：本季團隊 capacity 與上季持平>
  - <假設 2，例：data pipeline 升級不延期>
- **Highest-value next input:** <capacity 實測 / 同業 benchmark / 客戶 switch interview>

### TODO（缺資料）

- _TODO: 需要 data team 確認 KR-2 measurement 是否可用 Amplitude 既有事件_
- _TODO: 需要上季 retro 數據校準 ambition score 起始點_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Objective 是質性陳述、無 task 詞（完成 / 上線 / ship）
> - [ ] 每個 KR 含 baseline → target + measurement + source system + leading/lagging 標記
> - [ ] 每個 KR 含 ambition (0-1) + 在 0.5-0.7 區間（超出區間須附 Rationale）
> - [ ] 至少 1 個 leading KR 以便季中調整
> - [ ] 至少 1 個 counter-metric 對應某 KR 的負面外溢
> - [ ] 對 north-star 的預期貢獻已量化估算
> - [ ] Capacity & Dependencies 標 owner + needed by + fallback
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（OKR 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 OKR markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 north-star 指標當前值與 benchmark / 本季商業目標 / 上季 OKR 達成率 全文）
⏫
```

> [!TIP]
> **常見錯誤：** Objective 寫成 task list（「完成 feature A」= 直接 reject）、KR 不可量測（「提升使用者滿意度」沒 baseline → target）、ambition 系統性過保守（全部 > 0.7 = 沒挑戰）、漏 counter-metric（衝指標時無對沖）、out-of-scope 偷渡技術債當 KR。AI 若漏這些，自檢清單會抓到並回頭補。
