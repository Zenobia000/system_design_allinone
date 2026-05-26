---
title: "Persona · 使用者輪廓"
slug: "persona"
stage: "discovery"
roles: ["ux", "pm"]
order: 3
hook: "讓團隊在爭論時有共同的「他」"
when_to_use: "團隊規模 ≥ 5 人、需要跨職能共識「我們在為誰做」時"
ai_leverage: "用 Claude 把訪談資料聚類成 3-5 個 persona 草稿"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

沒有 persona，每個人腦中的「使用者」都不一樣。PM 想的是高階主管、設計想的是年輕族群、工程想的是自己。
PRD 上爭論不休，本質是因為大家在為不同的人設計。
Persona 不是行銷文案，是團隊內部對齊「他是誰、他在乎什麼」的最小協議。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** PM（驗證商業價值優先序）、BA（補 stakeholder 視角）
- **下游收件：** UX 畫 journey、PM 寫 PRD、行銷做 GTM 訊息

## 何時用、何時不用

- ✅ **必要時機：** 跨團隊新產品、目標使用者多元、需要 GTM 對齊
- ❌ **不需要時：** 內部工具且使用者就是團隊自己、單一明確 B2B 客戶
- ⚠️ **常見誤用：** persona 寫成人口統計學履歷（年齡、收入）卻沒有「動機、痛點、決策邏輯」

## AI 怎麼加速

把訪談摘要 + 客服工單 + 客戶 demographics / behavior 資料整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off**。本卡輸出**真實 Persona markdown 文件**（含表格、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給 solo / 早期 ideation / 1-2 個 persona 場景用，**完整範本**給跨職能團隊 ≥ 5 人 / 多 persona / 需要 a11y 涵蓋的場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "persona"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["user-research"]
  optional: ["jtbd", "competitive-scan"]
---

# Persona: <product-name>

**Status:** Draft v0.X · **Owner:** <UX name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 3, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：interview §XXX / quote: "..."）`；每量化欄位 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**不寫人口履歷**（年齡 / 收入單獨出現不算數），必須綁定行為訊號或決策邏輯。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：identified N 個 persona、primary 是誰、最強分群訊號 -->

<3-5 行說明>

> **TL;DR:** <一句話：我們在為「<具體輪廓>」設計>

---

## 2. Persona Segments

<!-- ai-rule: 2-3 個 persona 為宜（輕量版）。每個必須有 elevator_pitch + behavior_signals 至少 2 條 + top_pain 至少 1 條 -->

### P1 · <elevator pitch 一句話>

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Context (role / industry / team size)** | <e.g., SaaS Ops manager · 5-10 人團隊> | **[H]** | interview-04 §1 |
| **Behavior signal 1** | <e.g., 每週開 dashboard ≥ 3 次> | **[H]** | analytics §XX |
| **Behavior signal 2** | <e.g., 在 Slack 而非 Email 溝通> | **[M]** | interview §3 |
| **Top pain** | <一句話 + supporting quote> | **[H]** | "<訪談原句>" — P02 §5 |
| **JTBD ref** | JTBD-001, JTBD-003 | — | — |

### P2 · <elevator pitch 一句話>

（同上格式）

---

## 3. Primary Persona & Anti-Persona

<!-- ai-rule: primary 必須附 rationale（為何先服務他）；anti-persona 必須誠實列出「我們不服務誰」，不能空白 -->

- **Primary:** P1 — <rationale: 為何先服務他>（依據：interview saturation §XX）**[H]**
- **Anti-persona:** <e.g., 一次性試用者 / 學生族群> — Rationale: <為何排除>

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 分群切法 | by_role / by_use_case / by_lifecycle | by_use_case | by_role (跨角色行為太雜)、by_lifecycle (樣本不足) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的訪談 / analytics / 客服 NPS>

### TODO（缺資料）

- _TODO: 需要 X 份訪談校準 P2 behavior signal_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 3, 10, 12，刻意沿用完整版編號）
> - [ ] 每個 persona 含 elevator pitch + behavior signals ≥ 2 + top pain ≥ 1
> - [ ] 沒有任何 persona 只有 demographics（年齡 / 收入）沒有 behavior signal
> - [ ] Anti-persona 段已誠實列出，不是空白
> - [ ] Top pain 有 supporting quote（不能只寫「他覺得很煩」）
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（Persona 是給人讀的 markdown）
```

```template-full
---
doc_type: "persona"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["user-research"]
  optional: ["jtbd", "journey-map", "competitive-scan"]
---

# Persona: <product-name>

**Status:** Draft v0.X · **Owner:** <UX name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / 行銷 / BA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。最少 3 個 persona，必須區分 primary / secondary / anti-persona。每結論行內 `（依據：interview §XXX / quote: "..." / analytics §YYY）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**不寫人口履歷**（年齡 / 收入單獨出現不算數），必須綁定行為訊號或決策邏輯；至少 1 個 persona 涵蓋 WCAG 2.2 a11y 使用情境（視障 / 高齡 / 低頻使用者），不適用須說明為何；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: UX · required: always -->

<!-- ai-fill: 3-5 行：identified N 個 persona、primary 是誰、segmentation 切法、最強 evidence 來源 -->

<3-5 行說明>

> **TL;DR:** <一句話：我們在為「<具體輪廓>」設計，刻意不服務「<anti-persona>」>

---

## 2. Persona Segments
<!-- owner: UX · required: always -->

<!-- ai-rule: 3-5 個 persona。每個必須含 elevator_pitch + behavior_signals ≥ 2 + top_pains ≥ 2（附 quote + frequency）+ decision_logic 完整。不寫純 demographics -->

### P1 · <elevator pitch 一句話>

#### Context

| Field | Value | Confidence | Source |
|---|---|---|---|
| **Role / industry / team size** | <e.g., SaaS Ops manager · 5-10 人團隊> | **[H]** | interview-04 §1 |

#### Behavior signals

1. <e.g., 每週開 dashboard ≥ 3 次> · **[H]** · analytics §XX
2. <e.g., 在 Slack 而非 Email 溝通> · **[M]** · interview §3
3. <e.g., 月底前 3 天活躍度暴增> · **[H]** · analytics §YY

#### Top pains

| # | Pain | Frequency | Supporting quote |
|---|---|---|---|
| 1 | <一句話> | <e.g., 每週 3-5 次> | "<訪談原句>" — P02 §5 |
| 2 | <一句話> | <e.g., 每月 1-2 次> | "<訪談原句>" — P05 §12 |

#### Decision logic

- **Trigger:** <what makes them act, e.g., 老闆 ad-hoc 報告請求>
- **Info sources:** <channel 1>, <channel 2>
- **Blockers:** <thing 1>, <thing 2>
- **Confidence:** **[M]**

#### JTBD refs

- JTBD-001, JTBD-003

### P2 · <elevator pitch>

（同上格式）

### P3 · <elevator pitch>

（同上格式）

---

## 3. Primary / Secondary / Anti-Persona
<!-- owner: UX + PM · required: always -->

<!-- ai-rule: primary 必須附 rationale + 對應的 trade-off（選 P1 為 primary 會犧牲 P3 的 X% 需求）；anti-persona 必須誠實列出「我們不服務誰 + 為何」 -->

- **Primary:** P1 — <rationale + trade-off>（依據：interview saturation §XX）**[H]**
- **Secondary:** P2 — <rationale>
- **Anti-persona:** <e.g., 一次性試用者> — Rationale: <為何排除，例如 LTV < CAC>

---

## 4. A11y & 多元性涵蓋
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 至少 1 個 persona 涵蓋 WCAG 2.2 相關情境（視障 / 高齡 / 低頻使用者 / 弱網環境）；不適用須說明為何（例如：B2B 內部工具且使用者皆有 IT 支援） -->

| Persona | A11y 情境 | 設計含意 | Confidence |
|---|---|---|---|
| P3 | <e.g., 高齡使用者，視力衰退> | <e.g., 字級不低於 16px、對比度 ≥ 4.5:1> | **[M]** |

---

## 5. Behavioral Segmentation Method
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 列出選定的分群切法 + 至少 2 個替代切法 + 各自負面後果 -->

- **Chosen:** by_use_case — <rationale>
- **Alternative 1 (rejected):** by_role — <為何不選，例如跨角色行為太雜>
- **Alternative 2 (rejected):** by_lifecycle_stage — <為何不選，例如樣本不足>

---

## 6. Validation Evidence
<!-- owner: UX · required: full-only -->

<!-- ai-rule: 每個 persona 至少 5 份訪談支撐，saturation_signal 必須說明依據（重複出現相同訊號 / 新訪談已無 surprise） -->

| Persona | Interview count | Saturation signal | Gaps |
|---|---|---|---|
| P1 | 8 | Saturated — 第 6 份後無新訊號 | _無_ |
| P2 | 5 | Partial — 仍有 surprise | _TODO: 補 3 份_ |
| P3 | 3 | Weak — 樣本不足 | _TODO: 補 5 份_ |

---

## 7. Stakeholder Map（B2B）
<!-- owner: BA · required: full-only · skippable: B2C 產品可省略 -->

<!-- ai-rule: B2B 產品列出 buyer / user / champion / blocker 四種角色與對應 persona id -->

| Role | Persona | Influence |
|---|---|---|
| Economic buyer | <persona id or external> | <high/mid/low> |
| End user | P1 | <high/mid/low> |
| Champion | P2 | <high/mid/low> |
| Blocker | <persona id> | <high/mid/low> |

---

## 8. Persona → JTBD 對應
<!-- owner: PM · required: full-only -->

<!-- ai-rule: 每個 persona 至少對應 1 個 JTBD；同一 JTBD 可被多個 persona 共享但須標出差異 -->

| Persona | Primary JTBD | Secondary JTBD | 差異點 |
|---|---|---|---|
| P1 | JTBD-001 | JTBD-003 | 頻率高 / 容忍度低 |
| P2 | JTBD-001 | — | 頻率低 / 預算敏感 |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <e.g., P3 樣本不足，可能是 PM 推測而非真實> — **Mitigation:** 補 5 份訪談 — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <尚未解的問題>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: UX · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 分群切法 | by_role / by_use_case / by_lifecycle | by_use_case | by_role (跨角色行為太雜)、by_lifecycle (樣本不足) | **[H]** |
| YYYY-MM-DD | Primary 選 P1 | P1 / P2 / P3 | P1 | P2 (LTV 較低)、P3 (樣本不足) | **[M]** |

---

## 11. Out of Scope
<!-- owner: UX · required: full-only -->

本 Persona 文件 **不處理**：

- ❌ **不做付費客群分層** — 屬 marketing segmentation
- ❌ **不做行銷漏斗階段對應** — 屬 GTM funnel 卡
- ❌ **不做合規 / 風控白名單分層** — 屬 risk

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的訪談類型 / analytics / 客服 NPS 評論>

### TODO（缺資料）

- _TODO: 需要 5+ 份 P3 訪談校準 a11y 情境_
- _TODO: 補 P2 analytics behavior signal_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 至少 3 個 persona，每個含 elevator pitch + behavior signals ≥ 2 + top pains ≥ 2（附 quote + frequency）+ decision logic 完整
> - [ ] 沒有任何 persona 只有 demographics 沒有 behavior signal
> - [ ] Primary / Secondary / Anti-persona 三類齊全（anti-persona 不能空白）
> - [ ] A11y 段至少 1 個 persona 涵蓋 WCAG 2.2 情境（不適用須在段內說明為何）
> - [ ] Validation evidence 段每個 persona 標 saturation signal + interview count
> - [ ] Persona → JTBD 對應段每個 persona 至少 1 個 JTBD ref
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（Persona 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Persona markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 user-research.md / 訪談摘要 / 客服工單摘要 / 客戶 demographics 與 behavior 資料全文）
⏫
```

> [!TIP]
> **常見錯誤：** Persona 寫成人口履歷（年齡 / 收入 / 學歷單獨出現 = 廢物）、anti-persona 空白（= 沒勇氣說「我們不服務誰」）、a11y 段被砍掉（= 違反 WCAG 2.2 涵蓋規則）、primary 沒附 trade-off（選 P1 就代表 P3 的 X% 需求被延後，必須明說）。AI 若漏這些，自檢清單會抓到並回頭補。
