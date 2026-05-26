---
title: "Roadmap · 產品路線圖"
slug: "roadmap"
stage: "define"
roles: ["pm"]
order: 10
hook: "讓 stakeholder 看到「未來三季要解什麼問題」而非「哪天上 feature」"
when_to_use: "跨季規劃、stakeholder 對齊、招募與資源預估時"
ai_leverage: "用 Claude 把 backlog + OKR + 依賴 → outcome-based roadmap"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

把 roadmap 寫成「Q3 上線 feature X」是常見錯誤；一旦延期，整份文件失信。
Roadmap 應該是**outcome-based**：列出「要解什麼 problem / 達到什麼 outcome」，feature 只是手段，可以替換。
沒有 roadmap，stakeholder 無法做資源預估、業務無法做承諾、招募無法規劃。

## 誰負責、和誰對接

- **主責：** PM
- **協作：** PO（驗證 backlog 可行性）、Dev Lead（估 capacity）、Stakeholders（對齊商業節奏）
- **下游收件：** PO 排 backlog、HR 規劃招募、業務做客戶承諾

## 何時用、何時不用

- ✅ **必要時機：** 跨季規劃、stakeholder ≥ 5 人需對齊、有外部承諾需求
- ❌ **不需要時：** 純探索期、產品 PMF 未確認、團隊 < 5 人
- ⚠️ **常見誤用：** 寫成 Gantt chart 鎖死日期（變更成本極高）；應用「now / next / later」三欄結構，越遠越粗

## AI 怎麼加速

把 OKR + backlog + 跨團隊依賴 + capacity 估算整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 outcome 是否真為 outcome（不是包裝成 outcome 的 feature）**。本卡輸出**真實 roadmap markdown 文件**（含 now/next/later 表、outcome 表、mermaid timeline、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給單一 squad / 一季視野用，**完整範本**給跨季規劃 / stakeholder ≥ 5 人 / 含 bets 與 invalidation 訊號的場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "roadmap"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["okr", "backlog"]
  optional: ["team-capacity"]
---

# Roadmap · <team-name> · <FY-Qn → FY-Qn+2>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 3, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。Outcome **必須描述「解什麼問題 / 達到什麼狀態」**，禁寫 feature 名（負面後果：feature 延期整份 roadmap 失信）；越遠越粗（now 具體 / next 方向 / later 假設）。每結論 `（依據：OKR §X / 客戶承諾 §Y）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：本 roadmap 視野（quarters）、now 欄 outcome 數、最大依賴風險、最不確定的 later bet -->

<3-5 行說明>

> **TL;DR:** <一句話：未來三季要解的核心問題群>

---

## 2. Now / Next / Later

<!-- ai-rule: 三欄結構，越遠越粗。now 欄含具體 initiative；next 欄列方向 + 信心區間；later 欄列假設 + 觸發條件 -->

| Horizon | Timeframe | Outcomes | Initiative status |
|---|---|---|---|
| **NOW** | <current Q> | OUT-001, OUT-002 | committed initiatives: <具體名> |
| **NEXT** | <Q+1> | OUT-003 | candidates: <未承諾候選> |
| **LATER** | <Q+2 ~ Q+3> | OUT-004 | triggers to promote: <什麼條件下升到 next> |

---

## 3. Outcomes（含 KPI）

<!-- ai-rule: 每個 outcome 含 statement (狀態/結果，不是 feature 名) + leading KPI + lagging KPI + 對齊 OKR + 候選手段 -->

### OUT-001 · NOW · **[H]**

- **Statement:** <例：讓中型 SaaS 客戶在第一週感受到核心價值（不寫「上線 X feature」）>
- **Leading KPI:** <週/月可看，例：activation rate W1 from 30% → 50%>
- **Lagging KPI:** <季末看，例：W4 retention from 40% → 55%>
- **Candidate initiatives:** <手段 A：onboarding 流程精簡 / 手段 B：in-app guide>
- **Aligned OKR:** KR-1
- **Source:** OKR §KR-1 + 客戶訪談 §3

### OUT-002 · NOW · **[M]**

...

### OUT-003 · NEXT · **[M]**

...

### OUT-004 · LATER · **[L]**

...

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | <例：OUT-002 放 now 還是 next> | now / next / 砍掉 | next | now (capacity 壓爆 OUT-001)、砍掉 (與 KR-2 強相關) |

---

## 12. Confidence & Sources & TODO

- **最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1，例：依賴團隊本季優先級不變>
- **Highest-value next input:** <依賴團隊 commitment / 客戶訪談 / capacity 實測 三選一>

### TODO（缺資料）

- _TODO: 需要 platform team 確認 OUT-003 依賴 timeline_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 3, 10, 12，刻意不連號）
> - [ ] 每個 outcome statement 描述「狀態 / 結果」，無 feature 名（「上線 X」「ship Y」= reject）
> - [ ] 每個 outcome 含 leading KPI + lagging KPI 兩件
> - [ ] 越遠越粗：now 具體 / next 方向 / later 假設 + 觸發條件
> - [ ] 每結論帶 `[H/M/L]` badge + `（依據：...）` 行內引用
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（roadmap 是給人讀的 markdown）
```

````template-full
---
doc_type: "roadmap"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["okr", "backlog", "team-capacity", "cross-team-dependencies"]
  optional: ["customer-commitments", "competitive-scan", "hiring-pipeline"]
---

# Roadmap · <team-name> · <FY-Qn → FY-Qn+2>

**Status:** Draft v0.X · **Owner:** <PM name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / Dev Lead / Exec sponsor / HR

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。Outcome **必須描述「解什麼問題 / 達到什麼狀態」**，禁寫 feature 名（feature 延期整份 roadmap 失信，但 outcome 可用替代手段達成）；每個 outcome 必含 leading KPI（季中可調整）+ lagging KPI（季末判定）；越遠越粗（now 具體 initiative / next 方向 + 信心區間 / later 假設 + 觸發條件）；跨團隊依賴必標 owner team + needed by week + fallback；capacity 假設必標預留 incident & tech debt budget 20-30%。每結論 `（依據：OKR §X / 客戶承諾 §Y / capacity §Z）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PM · required: always -->

<!-- ai-fill: 3-5 行：本 roadmap 視野、now 欄 outcome 數、最大依賴風險、最強 bet、最不確定的 later 假設 -->

<3-5 行說明>

> **TL;DR:** <一句話：未來三季要解的核心問題群 + 我們相信什麼>

---

## 2. Now / Next / Later
<!-- owner: PM · required: always -->

<!-- ai-rule: 三欄結構，越遠越粗 -->

| Horizon | Timeframe | Outcomes | Initiative status |
|---|---|---|---|
| **NOW** | <current Q (Q-name)> | OUT-001, OUT-002 | committed: <具體 initiative 名> |
| **NEXT** | <Q+1> | OUT-003 | candidates (未承諾): <候選 initiative> |
| **LATER** | <Q+2 ~ Q+3> | OUT-004, OUT-005 | triggers to promote: <什麼條件下升到 next，例：OUT-001 lagging KPI 達標 + market signal> |

---

## 3. Timeline View
<!-- owner: PM · required: full-only · skippable: 純 now-focus 時可省 -->

> [!IMPORTANT]
> **AI 填寫規則：** 用 mermaid `gantt` 視覺化 outcome 跨季佈局。**不鎖死日期**，只用 quarter 粒度（不寫 specific dates）。

```mermaid
gantt
    title Outcome Roadmap (quarter granularity, not dates)
    dateFormat YYYY-MM-DD
    section NOW
    OUT-001 activation lift     :a1, 2025-Q1, 90d
    OUT-002 onboarding revamp   :a2, 2025-Q1, 90d
    section NEXT
    OUT-003 retention play      :b1, 2025-Q2, 90d
    section LATER
    OUT-004 monetization bet    :c1, 2025-Q3, 90d
    OUT-005 platform expansion  :c2, 2025-Q3, 90d
```

---

## 4. Outcomes（含 KPI）
<!-- owner: PM · required: always -->

<!-- ai-rule: 每個 outcome 含 statement (狀態/結果) + leading + lagging KPI + 候選 initiative + 對齊 OKR -->

### OUT-001 · NOW · **[H]**

- **Statement:** <例：讓中型 SaaS 客戶在 onboarding 第一週感受到核心價值>
- **Leading KPI:** activation rate W1 from 30% → 50% (Amplitude)
- **Lagging KPI:** W4 retention from 40% → 55% (Looker)
- **Candidate initiatives:** <手段 A：onboarding 精簡 / 手段 B：in-app guide / 手段 C：首週 success manager>
- **Aligned OKR:** KR-1
- **Source:** OKR §KR-1 + 訪談 §3

### OUT-002 · NOW · **[M]**

...

### OUT-003 · NEXT · **[M]**

...

### OUT-004 · LATER · **[L]**

...

---

## 5. Cross-Team Dependencies
<!-- owner: PM + Dev Lead · required: full-only -->

<!-- ai-rule: 每條依賴必含 owner team + needed by week + fallback plan -->

| Dep ID | Outcome blocked | Owner team | Needed by | Fallback plan | Confidence |
|---|---|---|---|---|---|
| DEP-001 | OUT-001 | platform-team | Week 4 | <例：本地 in-memory cache 暫代> | **[M]** |
| DEP-002 | OUT-003 | data-team | Week 12 | <例：手動 pipeline 撐 1 季> | **[L]** |

### Tech Dependencies

- <例：infra K8s 1.30 升級>（owner: SRE, needed by Week 6）
- <例：design system v2 migration>（owner: design-platform, needed by Week 8）

### External Blockers

| Blocker | Awaiting | Alternative (plan B) | Confidence |
|---|---|---|---|
| <例：vendor-X API v2> | release timeline | 用 v1 + adapter layer | **[M]** |
| <例：金管會函釋> | 7 月公布 | 先做 sandbox, 公布後 1 週切真實 | **[L]** |

---

## 6. Bets & Milestones
<!-- owner: PM · required: full-only -->

<!-- ai-rule: 每個 bet 必含 hypothesis + invalidation signal + milestone check + sunset criteria -->

### BET-001（對應 OUT-004）

- **Hypothesis:** <我們相信...，因為...>
- **Invalidation signal:** <什麼訊號代表錯了，例：Q2 mid leading KPI < 20% target>
- **Milestone check:** <Q2 Week 6 review>
- **Sunset criteria:** <什麼條件下放棄，例：3 個 milestone 連續 miss>

### BET-002（對應 OUT-005）

...

---

## 7. Capacity Assumptions
<!-- owner: PM + HR · required: full-only -->

| Assumption | Value | Confidence |
|---|---|---|
| Team size (current Q) | <例：6 FTE> | **[H]** |
| Reserved for incident & tech debt | 25% | **[H]** |
| Hiring pipeline (next Q) | <例：+2 by Week 4> | **[M]** |
| Velocity baseline (近 3 sprint) | <例：38 points/sprint> | **[H]** |
| Onboarding ramp 折扣 | new hire 前 4 週 50% | **[M]** |

---

## 8. Stakeholder Communication
<!-- owner: PM · required: full-only -->

| Audience | Frequency | Format | What to highlight |
|---|---|---|---|
| Exec sponsor | monthly | 1-pager + 30 min | leading KPI delta + 最大 dep risk |
| Customers (key accounts) | quarterly | webinar + email | now 欄 outcome + next 欄方向 |
| Internal teams | bi-weekly | Slack post + dashboard | 依賴狀態 + 變更通知 |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：DEP-002 data-team 已過載，OUT-003 可能整季 slip> — **Mitigation:** Week 4 重新校準 + 啟動 fallback — **Owner:** PM + data-team lead
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：OUT-004 是真 bet 還是 feature 包裝？需 PM 與 stakeholder 再對齊>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: PM · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <例：OUT-002 放 now 還是 next> | now / next / 砍掉 | next | now (capacity 壓爆 OUT-001)、砍掉 (與 KR-2 強相關) | **[H]** |
| YYYY-MM-DD | <例：OUT-004 是 bet 還是 commit> | bet / commit / 砍掉 | bet | commit (assumption 太多)、砍掉 (策略上重要) | **[M]** |

---

## 11. Out of Scope
<!-- owner: PM · required: full-only -->

本 roadmap **不處理**：

- ❌ **純技術重構** — 走 tech roadmap（含 platform team 自己的 OKR）
- ❌ **Bug fix / 運維 sprint** — sprint baseline 工作
- ❌ **實驗性 spike / discovery** — 走 discovery budget（20% 預留）
- ❌ **具體 sprint 拆解與 release schedule** — 屬 PO + release plan 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1，例：platform-team 本季優先級不變>
  - <假設 2，例：招募 +2 by Week 4 達成>
- **Highest-value next input:** <依賴團隊 commitment / 客戶訪談 / capacity 實測>

### TODO（缺資料）

- _TODO: 需要 platform-team commitment 確認 DEP-001 fallback 可行_
- _TODO: 需要 HR 確認招募 timeline 對齊 OUT-003 capacity_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 outcome statement 描述「狀態 / 結果」，無 feature 名（「上線 X」「ship Y」= reject）
> - [ ] 每個 outcome 含 leading + lagging KPI 兩件
> - [ ] Now / Next / Later 越遠越粗（now 具體 initiative / next 方向 / later 假設 + 觸發條件）
> - [ ] Timeline 用 quarter 粒度，不鎖死 specific dates
> - [ ] 跨團隊依賴每條含 owner team + needed by + fallback
> - [ ] Bets 每個含 hypothesis + invalidation signal + sunset criteria
> - [ ] Capacity 預留 20-30% incident & tech debt budget
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（roadmap 是給人讀的 markdown）
````

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 roadmap markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 OKR / backlog + RICE / 跨團隊依賴清單 / capacity 估算 / 客戶承諾 全文）
⏫
```

> [!TIP]
> **常見錯誤：** Outcome 寫成 feature 名（「上線 X」「ship Y」= 直接 reject）、Now/Next/Later 都同樣顆粒度（沒做到越遠越粗）、依賴沒 fallback（一延整份失信）、Bets 沒寫 invalidation signal（變成永遠不會 sunset 的殭屍項）、capacity 沒預留 incident & tech debt budget。AI 若漏這些，自檢清單會抓到並回頭補。
