---
title: "優先級矩陣"
slug: "priority-matrix"
stage: "define"
roles: ["pm", "po"]
order: 16
hook: "把「都很重要」打回現實"
when_to_use: "Backlog ≥ 30 item、sprint planning 爭執不下時"
ai_leverage: "用 Claude 評估 RICE/Value-Effort + 提供 ranked backlog"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

stakeholder 每個人都說「我這個最重要」。沒有共同框架，PO 排序變成政治。
優先級矩陣（RICE、Value-Effort、MoSCoW）的價值不是「精準」，而是**讓所有人在同一張表上比較**。
數字會逼出真實 trade-off：價值多大、要花多少、有多確定、影響多廣。

## 誰負責、和誰對接

- **主責：** PO（最終排序）/ PM（提供商業價值權重）
- **協作：** Dev Lead（估 effort 與信心）、UX（驗證 user impact）
- **下游收件：** PO 排 backlog、sprint planning 決定 scope

## 何時用、何時不用

- ✅ **必要時機：** Backlog ≥ 30 item、跨 squad 競爭資源、stakeholder 意見分歧
- ❌ **不需要時：** Backlog < 10 item、緊急 incident、合規硬性截止
- ⚠️ **常見誤用：** 把分數當絕對真理（RICE 是相對排序工具，不是預測 ROI）；忽略「不做的成本」（opportunity cost）

## AI 怎麼加速

把 backlog + 商業價值權重 + capacity 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 confidence 灌水與 opportunity cost**。本卡輸出**真實優先級矩陣 markdown 文件**（含 RICE 計分表、ranked backlog、parking lot、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 backlog < 30 item / 單一 squad 快速排序用，**完整範本**給 backlog ≥ 30 item / 跨 squad 競爭資源 / stakeholder 意見分歧場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "priority-matrix"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["backlog", "okr"]
  optional: ["team-capacity"]
---

# Priority Matrix · <quarter / sprint-batch>

**Status:** Draft v0.X · **Owner:** <PO name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 6, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。RICE 是**相對排序工具**不是 ROI 預測；Impact 用標準刻度（0.25 / 0.5 / 1 / 2 / 3）禁自創；**Confidence 預設不可 100%**（沒訪談或數據支撐最高 70%）；分數差 < 20% 視為同級。每結論 `（依據：OKR §X / 訪談 §Y）`；缺資料寫 `_TODO: 需要 XXX_` 不編造。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：本批 backlog item 數、可吃到第 N 名（capacity cutoff）、最弱 confidence 的高排序項、最大 opportunity cost -->

<3-5 行說明>

> **TL;DR:** <一句話：本批前 3 名與最該砍的 1 名>

---

## 2. Scored Items (RICE)

<!-- ai-rule: Impact 必用 0.25 / 0.5 / 1 / 2 / 3 標準刻度；Confidence 0-100%；Effort 用 person-month（跨團隊 × 1.3 含協調成本）-->

| ID | Title | Reach (per Q) | Impact | Confidence | Effort (PM) | RICE | Source | Needs spike |
|---|---|---|---|---|---|---|---|---|
| IT-001 | <item-name> | 5000 | 2 | 70% | 1.5 | **4667** | OKR §KR-1 + 訪談 §3 | no |
| IT-002 | ... | 2000 | 3 | 50% | 2 | **1500** | OKR §KR-2 | **yes** (confidence < 50%) |
| IT-003 | ... | ... | ... | ... | ... | ... | ... | ... |

---

## 6. Ranked Backlog & Capacity Cutoff

<!-- ai-rule: 列前 N 名 + 標 capacity cutoff line；分數差 < 20% 的標為「同級」需 stakeholder 投票 -->

- **Top N by RICE:**
  1. IT-001 — **4667**
  2. IT-003 — **3200**
  3. IT-002 — **1500** ⚠️ tied with IT-005 (差 < 20%)
  4. IT-005 — **1380**
  --- **capacity cutoff @ rank 4** ---
  5. IT-007 — 980 (parking)

- **Parking lot:**

| ID | Reason | Revisit when |
|---|---|---|
| IT-002 | confidence < 50%, needs spike | 1-week spike 完成後 |
| IT-007 | out of capacity | 下季或砍掉 top 內某項 |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | <例：IT-001 排第 1 還是 IT-003> | by RICE / by stakeholder voice / by OKR alignment | by RICE | by-voice (政治排序非真實價值)、by-OKR-only (忽略 effort) |

---

## 12. Confidence & Sources & TODO

- **最低 confidence 項：** <列出所有 [L] 與 confidence < 50% 的 item>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1，例：使用者基數 5000 來自上季 MAU 推估>
- **Highest-value next input:** <使用者訪談 / capacity 實測 / 競品分析 三選一>

### TODO（缺資料）

- _TODO: IT-002 需 1-week spike 校準 reach_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 6, 10, 12，刻意不連號）
> - [ ] Impact 全部用標準刻度（0.25 / 0.5 / 1 / 2 / 3），無自創數字
> - [ ] 沒有 item confidence = 100%（最高 70% 除非有訪談或 A/B 數據）
> - [ ] 跨團隊 item 的 effort 已 × 1.3 含協調成本
> - [ ] Capacity cutoff line 已標出
> - [ ] 分數差 < 20% 的 item 標為「同級」並建議 stakeholder 投票
> - [ ] Parking lot 標明 revisit trigger
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（matrix 是給人讀的 markdown）
```

```template-full
---
doc_type: "priority-matrix"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["backlog", "okr", "team-capacity"]
  optional: ["customer-commitments", "competitive-scan", "user-research"]
---

# Priority Matrix · <quarter / sprint-batch>

**Status:** Draft v0.X · **Owner:** <PO name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / Dev Lead / Stakeholders

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。RICE 是**相對排序工具**不是 ROI 預測，分數差 < 20% 視為同級需 stakeholder 投票。Impact 必須用 RICE 標準刻度（0.25 / 0.5 / 1 / 2 / 3）**禁自創**；Confidence 0-100% 但**預設不可 100%**（沒訪談或數據支撐最高 70%，高估的負面後果是誤把 spike 當定案做）；Effort 用 person-month，跨團隊 × 1.3 含協調成本。每結論 `（依據：OKR §X / 訪談 §Y / capacity §Z）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PO · required: always -->

<!-- ai-fill: 3-5 行：本批 item 數、可吃到第 N 名、最大 confidence gap、最該打 spike 的 item -->

<3-5 行說明>

> **TL;DR:** <一句話：本批前 3 名 + capacity cutoff + 最大決策爭議點>

---

## 2. Scoring Model
<!-- owner: PO · required: always -->

- **Primary model:** RICE
- **Secondary model (tie-breaker):** Value-Effort 2x2 / WSJF / MoSCoW
- **Rationale:** <為何選 RICE：對齊 OKR 量化、能 surface effort 隱性成本；Value-Effort 用於分數同級時>
- **Confidence calibration rule:**
  - [H] 70-100% = 訪談 ≥ 5 份或 A/B 數據
  - [M] 40-70% = 內部 stakeholder + analogy
  - [L] < 40% = 純推測，必須 spike

---

## 3. Scored Items
<!-- owner: PO + Dev Lead · required: always -->

<!-- ai-rule: 每個 item 含 RICE 五欄 + source + confidence grade + needs_spike 標記 -->

| ID | Title | Reach (per Q) | Reach source | Impact | Confidence | Effort (PM) | RICE | Source | Grade | Needs spike |
|---|---|---|---|---|---|---|---|---|---|---|
| IT-001 | <item-name> | 5000 | Amplitude MAU | 2 | 70% | 1.5 | **4667** | OKR §KR-1 + 訪談 §3 | **[H]** | no |
| IT-002 | ... | 2000 | 推估 | 3 | 50% | 2 | **1500** | OKR §KR-2 | **[M]** | **yes** |
| IT-003 | ... | ... | ... | ... | ... | × 1.3 (跨團隊) | ... | ... | ... | ... |

---

## 4. Value-Effort 2x2 (Tie-Breaker)
<!-- owner: PO · required: full-only · skippable: 若所有 RICE 分數差 > 20% 可省略 -->

<!-- ai-rule: 只放 RICE 同級或分數差 < 20% 的 item 進此象限 -->

|  | Low Effort | High Effort |
|---|---|---|
| **High Value** | quick wins: IT-002, IT-005 | big bets: IT-001 |
| **Low Value** | fill-ins: IT-007 | money pits: IT-009 (sunset) |

---

## 5. Scoring Assumptions
<!-- owner: PO · required: always -->

<!-- ai-rule: 列出所有做了但 input 沒明說的假設 + 若假設錯誤的負面後果 -->

| Assumption | Used for | Impact if wrong | Confidence |
|---|---|---|---|
| <例：MAU 5000 來自上季 + 線性外推> | IT-001 reach | 過高估 RICE 20-30% | **[M]** |
| <例：跨團隊協調 × 1.3 倍> | IT-003 effort | 低估會 sprint 超時 | **[M]** |

---

## 6. Ranked Backlog & Capacity Cutoff
<!-- owner: PO · required: always -->

<!-- ai-rule: 列 top N + 標 capacity cutoff line + tied items 群組（分數差 < 20%）-->

### Top by RICE

1. IT-001 — **4667** · **[H]**
2. IT-003 — **3200** · **[H]**
3. IT-002 — **1500** · **[M]** ⚠️ tied with IT-005 (差 < 20%)
4. IT-005 — **1380** · **[M]**
5. IT-008 — **1100** · **[L]** (needs spike)
--- **capacity cutoff @ rank 4 (本季 6 PM, 可吃 4 項)** ---
6. IT-007 — 980 (parking)
7. IT-009 — 720 (sunset 候選)

### Tied items（需 stakeholder 投票打破）

- **Tier 1 tie:** IT-002 vs IT-005 (差 < 20%) — 由 stakeholder 投票或拆 spike 判定

---

## 7. Parking Lot & Sunset
<!-- owner: PO · required: full-only -->

| ID | Reason | Revisit when | Owner of trigger |
|---|---|---|---|
| IT-007 | out of capacity | 下季或砍 top 內某項 | PO |
| IT-002 | confidence < 50%, needs spike | 1-week spike 完成後 | PO + Dev Lead |
| IT-009 | low value × high effort | sunset 候選，下季 retro 確認砍 | PM |

---

## 8. Opportunity Cost Analysis
<!-- owner: PM + PO · required: full-only -->

<!-- ai-rule: 列出「做了 top N 會錯過什麼」+ 「砍掉的低分項裡有沒有時間敏感 / 客戶承諾」 -->

- **若按本 ranked list 執行，我們錯過：**
  - <例：IT-009 是某 enterprise 客戶承諾項，砍掉可能影響續約>
  - <例：IT-007 是 GA 條件之一，延期會推遲 launch>
- **建議 hedge：** <例：IT-009 排到下季 week 1 + 通知 enterprise 客戶 timeline>

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：IT-002 confidence 50% 但已答應客戶> — **Mitigation:** 1-week spike 校準 + 與客戶溝通 timeline — **Owner:** PM + PO
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：IT-001 reach 5000 是 MAU 還是 active feature user？data team 待確認>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: PO · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <例：用 RICE 還是 Value-Effort 主導> | RICE / VE / WSJF / hybrid | RICE | VE (粗顆粒，30+ item 排不開)、WSJF (團隊不熟悉)、hybrid (decision overhead 高) | **[H]** |
| YYYY-MM-DD | <例：IT-002 是否進 top 4> | yes / parking / sunset | parking | yes (confidence < 50%)、sunset (與 KR-2 強相關) | **[M]** |

---

## 11. Out of Scope
<!-- owner: PO + PM · required: full-only -->

本矩陣 **不處理**：

- ❌ **純技術重構** — 走 tech-debt budget（已預留 20-30% capacity）
- ❌ **合規硬性截止項** — 另列為「must do regardless of RICE」
- ❌ **未拆夠細的 epic** — 退回 backlog refinement
- ❌ **Bug fix / 運維** — sprint baseline 工作

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 與 confidence < 50% 的 item>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1，例：團隊本季 capacity 6 PM 與上季持平>
  - <假設 2，例：跨團隊協調 × 1.3 倍>
- **Highest-value next input:** <使用者訪談 / capacity 實測 / 競品分析 / data team profiling>

### TODO（缺資料）

- _TODO: IT-002 需 1-week spike 校準 reach_
- _TODO: 需 data team 確認 IT-001 reach 定義（MAU vs feature-active user）_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Impact 全部用 RICE 標準刻度（0.25 / 0.5 / 1 / 2 / 3），無自創
> - [ ] 沒有 item confidence = 100%（最高 70% 除非訪談或 A/B 數據支撐）
> - [ ] 跨團隊 item effort 已 × 1.3 含協調成本
> - [ ] Capacity cutoff line 已標出
> - [ ] 分數差 < 20% 的 item 標為 tied 並建議 stakeholder 投票
> - [ ] Scoring Assumptions 段已列出所有 fabricated 推估
> - [ ] Parking lot 標明 revisit trigger + owner
> - [ ] Opportunity cost 段已揭示「砍掉的低分項裡有沒有時間敏感」
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（matrix 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出優先級矩陣 markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 backlog item 清單 / OKR / team capacity / 客戶承諾清單 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 把 RICE 分數當 ROI 預測（它是相對排序）、Confidence 系統性灌水（全部 > 70% = 假象精準）、Impact 自創數字（脫離 RICE 標準刻度無法跨團隊對齊）、跨團隊 effort 沒 × 1.3、parking lot 偷渡時間敏感項。AI 若漏這些，自檢清單會抓到並回頭補。
