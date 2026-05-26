---
title: "Retrospective · 回顧會議"
slug: "retro"
stage: "operate"
roles: ["pm", "po"]
order: 54
hook: "讓團隊每個 sprint 留下一個小改善"
when_to_use: "Sprint 結束、release 結束、或重大事件後"
ai_leverage: "用 Claude 把零散反饋分群並排序可執行性"
art: "/generated/stage-operate.webp"
source: "Scrum Guide, deep-research-report.md §Process"
---

## 解決什麼問題

Retro 不是抱怨大會，也不是讚美大會。它的價值是每次留下「一個能做、會做、會驗證的改善」，並把它放進下個 sprint backlog。

## 誰負責、和誰對接

- **主責：** PM / PO / Scrum Master
- **協作：** 全體團隊成員
- **下游收件：** backlog 改善 item、Coding Standard 更新、Runbook 更新

## 何時用、何時不用

- ✅ **必要時機：** Sprint 結束、release 完成、SEV-1 事故後
- ❌ **不需要時：** 團隊已疲乏且上次改善仍未執行
- ⚠️ **常見誤用：** 行動項無 owner；同樣問題每次都被提；只談感覺不談資料

## AI 怎麼加速

把匿名反饋 + sprint 指標 + 上次 retro action 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解分群並排可執行性，**人工只裁決 owner 與是否升級**。本卡輸出**真實 retro markdown 文件**（含表格、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給小團隊 / 例行 sprint retro 用，**完整範本**給跨團隊 / 季度 retro / SEV-1 後 retrospective 場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "retro"
variant: "light"
status: "draft"
owner: "<scrum-master-or-pm>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["anonymous-feedback", "sprint-metrics"]
  optional: ["previous-retro-actions"]
---

# Retrospective: <sprint-or-release-name>

**Status:** Draft v0.X · **Owner:** <Scrum Master> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：feedback §XXX / metric §YYY）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**不寫人名**（用角色 / 流程描述）；**action items ≤ 3 條**，每條必須 INVEST 通過 + owner + due。

---

## 1. Format & Context

<!-- ai-fill: 1-2 行說明本次選用哪種 retro 格式（start/stop/continue / 4Ls / mad-sad-glad / sailboat）與為何 -->

| Field | Value |
|---|---|
| **Format** | start_stop_continue / mad_sad_glad / 4Ls / sailboat |
| **Sprint / period** | <e.g. Sprint 23, 2024-05-13 ~ 05-26> |
| **Participants** | <人數 + 組成 hint> |
| **Rationale** | <為何這個 sprint 選這格式> |

---

## 2. Themes（按 start/stop/continue 或 4Ls 分群）

<!-- ai-rule: 3-6 個 themes；不寫人名，用「某角色 / 某流程」匯總；每條附 frequency + severity + supporting metric -->

| Theme | Bucket | Frequency | Severity | Metric correlation | Source | Confidence |
|---|---|---|---|---|---|---|
| <e.g. PR review 太慢> | Stop | 5 votes | high | PR review p95 36h | feedback §3 | **[H]** |
| <e.g. Pairing 提升 quality> | Continue | 3 votes | medium | defect rate -20% | feedback §5 | **[H]** |
| <e.g. Doc 自動化> | Start | 2 votes | low | _TODO: 需要 baseline_ | feedback §7 | **[M]** |

---

## 3. Trend vs Previous Retro

<!-- ai-rule: 必含「上次 action 完成數」+「重複出現的 theme」兩件 -->

| Aspect | Value |
|---|---|
| **Previous actions completed** | <count / total> |
| **Carried over** | <ids> |
| **Recurring themes（≥ 2 retros）** | <theme name 1>, <theme name 2> |

---

## 5. Action Items（≤ 3 條）

<!-- ai-rule: 每條必含 owner（role/team，不寫人名）+ due（≤ 2 sprints）+ success metric + INVEST 通過；無 owner 寫 `_TODO: 待 Scrum Master 指派_` -->

| ID | Action | Owner | Due | Success metric | INVEST | Confidence |
|---|---|---|---|---|---|---|
| A1 | <e.g. PR review SLA ≤ 24h> | <role/team> | <next sprint end> | <e.g. PR review p95 < 24h> | ✅ all pass | **[H]** |
| A2 | ... | ... | ... | ... | ✅ | **[M]** |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 本次改善路徑 | process / tooling / training | process | tooling (採購 lead time 太長)、training (已排下季度) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的：歷史 4 sprint action 完成率 / 1:1 摘要>

### TODO（缺資料）

- _TODO: 需要前次 retro action 完成狀態才能完整比較 trend_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 10, 12，刻意不連號）
> - [ ] **全文 0 個人名**（blameless，用角色 / 流程描述）
> - [ ] Themes 每條附 frequency + severity + source
> - [ ] **Action items ≤ 3 條**，每條 INVEST 通過 + owner + due + success metric
> - [ ] Trend 段含「上次 action 完成數」+「recurring themes」
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（retro 是給人讀的 markdown）
```

```template-full
---
doc_type: "retro"
variant: "full"
status: "draft"
owner: "<scrum-master-or-pm>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["anonymous-feedback", "sprint-metrics", "previous-retro-actions"]
  optional: ["team-composition", "1on1-summary"]
---

# Retrospective: <sprint-or-release-name>

**Status:** Draft v0.X · **Owner:** <Scrum Master> · **Last updated:** YYYY-MM-DD · **Reviewers:** PO / Engineering Manager

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Scrum Guide、Spotify team-health model、INVEST 原則。每結論行內 `（依據：feedback §XXX / metric §YYY / previous-retro §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**Blameless：不寫人名作為議題主體**，用「某角色 / 某流程」匯總；**action items 上限 3 條**（避免動能稀釋）、每條 ≤ 2 sprints、必須 INVEST 通過；禁 YAML/JSON schema 輸出。

---

## 1. Format & Context
<!-- owner: Scrum Master · required: always -->

<!-- ai-fill: 1-2 行說明本次格式選擇 -->

| Field | Value |
|---|---|
| **Format** | start_stop_continue / mad_sad_glad / 4Ls / sailboat |
| **Sprint / period** | <date range> |
| **Participants** | <人數 + 組成> |
| **Rationale** | <為何選這格式> |

---

## 2. Themes
<!-- owner: Scrum Master · required: always -->

<!-- ai-rule: 4-8 個 themes；不寫人名；每條附 frequency + severity + supporting metric + source + confidence -->

| Theme | Bucket | Frequency | Severity | Metric correlation | Source | Confidence |
|---|---|---|---|---|---|---|
| <e.g. PR review 太慢> | Stop | 5 votes | high | PR review p95 36h | feedback §3 | **[H]** |
| <e.g. Pairing 提升 quality> | Continue | 3 votes | medium | defect rate -20% | feedback §5 | **[H]** |
| <e.g. Doc 自動化> | Start | 2 votes | low | _TODO: 需要 baseline_ | feedback §7 | **[M]** |

---

## 3. Trend vs Previous Retro
<!-- owner: Scrum Master · required: always -->

<!-- ai-rule: 必含「上次 action 完成率」+「carried over」+「recurring themes」三件 -->

| Aspect | Value |
|---|---|
| **Previous actions completed** | <count / total> |
| **Carried over** | <list of ids> |
| **Recurring themes（≥ 2 retros）** | <theme 1>, <theme 2> |

---

## 4. Team Health Signals
<!-- owner: EM · required: full-only -->

<!-- ai-rule: 從 metric + 反饋字眼推；不寫人名；attrition_risk 須有依據 -->

| Signal | Value | Evidence | Confidence |
|---|---|---|---|
| **Velocity trend** | up / flat / down | metric §X | **[H]** |
| **Incident trend** | up / flat / down | metric §Y | **[H]** |
| **Morale signal** | <e.g. burnout indicators in feedback §3> | feedback §3 | **[M]** |
| **Attrition risk** | low / medium / high | <evidence> | **[L]** |

---

## 5. Action Items（≤ 3 條）
<!-- owner: Scrum Master + PO · required: always -->

<!-- ai-rule: 每條必含 owner（role/team）+ due（≤ 2 sprints）+ scope + success metric + INVEST 6 項通過；無 owner 寫 `_TODO: 待 Scrum Master 指派_` -->

### A1: <statement>

| Field | Value |
|---|---|
| **Owner** | <role/team> |
| **Due** | <next sprint end> |
| **Scope** | <within this team / cross-team> |
| **Success metric** | <e.g. PR review p95 < 24h> |
| **INVEST** | I ✅ · N ✅ · V ✅ · E ✅ · S ✅ · T ✅ |
| **Source** | feedback §3 + metric §X |
| **Confidence** | **[H]** |

### A2: ...

### A3: ...

---

## 6. Anti-Patterns
<!-- owner: Scrum Master + EM · required: full-only -->

<!-- ai-rule: 列出本次出現的反模式（同議題重複未解、action 無 owner、only feeling no data） -->

| Pattern | Proposed escalation / fix |
|---|---|
| <e.g. 同樣議題第 3 次出現未解> | <升級到 EM 介入 / program retro> |
| <e.g. action 無 owner> | <強制 owner 簽到> |

---

## 7. Trade-offs
<!-- owner: Scrum Master · required: full-only -->

<!-- ai-rule: 列出本次 action 的負面後果（process vs velocity / tooling vs lead time） -->

> **T1:** <e.g. 改 PR review SLA ≤ 24h 會增加 reviewer 中斷成本，預估 velocity -5%>
>
> **T2:** ...

---

## 8. Open Questions
<!-- owner: All · required: full-only -->

- [ ] **Q1:** <e.g. 是否需要升級到 program retro？>
- [ ] **Q2:** ...

---

## 9. Risks
<!-- owner: All · required: always -->

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner -->

> **R1:** <例：A1 owner 拒接> — **Mitigation:** <Scrum Master 介入協調> — **Owner:** <Scrum Master>
>
> **R2:** ...

---

## 10. Decision Log
<!-- owner: Scrum Master · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 本次改善路徑 | process / tooling / training | process | tooling (採購 lead time 太長)、training (已排下季度) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Scrum Master · required: full-only -->

本 Retro **不處理**：

- ❌ **個別績效檢討** — 屬 manager 1:1
- ❌ **組織架構調整** — 屬 EM / leadership
- ❌ **跨團隊大議題** — 升級到 program retro

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1：反饋背後的個人脈絡>
  - <假設 2：新成員適應曲線>
- **Highest-value next input:** <下一份最該補的：歷史 4 sprint action 完成率 / 1:1 摘要 / team-health 季度問卷>

### TODO（缺資料）

- _TODO: 需要前次 retro action 完成狀態才能完整比較 trend_
- _TODO: 需要 morale 問卷數據校準 attrition_risk_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] **全文 0 個人名作為議題主體**（blameless，用角色 / 流程描述）
> - [ ] Themes 4-8 條，每條附 frequency + severity + source
> - [ ] **Action items ≤ 3 條**，每條 INVEST 6 項全通過 + owner + due ≤ 2 sprints + success metric
> - [ ] Team health 4 信號（velocity / incident / morale / attrition）都有 evidence
> - [ ] Trend 段含 previous_completion + carried_over + recurring_themes
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（retro 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 retrospective markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼匿名反饋（含投票數）/ 本 sprint 指標（velocity / incident / deploy freq / cycle time）/ 上次 retro action items 與完成狀態全文）
⏫
```

> [!TIP]
> **常見錯誤：** action items > 3 條（動能稀釋，下次又沒做完）、action 無 owner（= 永遠不會發生）、同議題第 3 次出現還在原地（該升級到 program retro）、只談感覺不對齊 metric（reviewer 無法接受）、寫出個人名字（違反 blameless）。AI 若漏這些，自檢清單會抓到並回頭補。
