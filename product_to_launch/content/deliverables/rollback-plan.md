---
title: "Rollback Plan · 回滾計畫"
slug: "rollback-plan"
stage: "ship"
roles: ["devops"]
order: 40
hook: "在 incident 發生前先決定『按哪顆按鈕』"
when_to_use: "任何含 schema、契約、或不可逆操作的 release"
ai_leverage: "用 Claude 對 migration 推導反向腳本與安全窗口"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Deployment, Google SRE"
---

## 解決什麼問題

Incident 發生時最貴的不是修復，是猶豫。Rollback Plan 預先寫好「什麼指標觸發、誰按、按完會發生什麼、多久確認」。

## 誰負責、和誰對接

- **主責：** DevOps + on-call SRE
- **協作：** Dev Lead（資料兼容性）、DBA（schema 反向）、PO（業務影響告知）
- **下游收件：** Go/No-Go、Incident Report

## 何時用、何時不用

- ✅ **必要時機：** schema migration、外部 API 變更、緩存格式變更
- ❌ **不需要時：** 純 UI 文案、可由 flag 直接關閉
- ⚠️ **常見誤用：** 寫「revert commit」就交差；忽略資料已寫入新格式

## AI 怎麼加速

把 deploy steps + migration scripts + SLO 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審觸發閾值與不可逆點補救**。本卡輸出**真實 Rollback Plan markdown 文件**（含 trigger 表、ordered 步驟表、irreversible 警告、comms 路徑），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本** 給 stateless service / flag-driven release 用，**完整範本** 給含 schema migration / 不可逆操作 / 跨服務 release 用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "rollback-plan"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["deploy-steps", "slo-spec"]
  optional: ["migration-scripts"]
---

# Rollback Plan: <release-name>

**Status:** Draft v0.X · **Owner:** <DevOps + on-call SRE> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 7, 10），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：deploy §XXX / slo §YYY）`；每量化欄位加 `[H]/[M]/[L]` confidence badge；rollback_steps 必須 ordered，每步附 `reversible: true/false` 與預估耗時；任何 irreversible step 必須在 Risk 段重述。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，on-call 5 分鐘內讀完即可決策。寫「觸發條件、總耗時、最大不可逆風險」 -->

<3-5 行說明>

> **TL;DR:** <一句話：觸發 → 步驟 → 完成判定>

---

## 2. Triggers

<!-- ai-rule: 區分 SLO breach / error_rate / data_integrity 三類；每類含閾值 + 觀測窗口 -->

| Type | Signal | Threshold | Window | Confidence |
|---|---|---|---|---|
| SLO breach | error_rate | > 5% | 1 min | **[H]** |
| SLO breach | p95 latency | > baseline × 2 | 2 min | **[H]** |
| Data integrity | row count drift | > 1% | 5 min | **[M]** |

---

## 3. Rollback Steps（ordered）

<!-- ai-rule: 每步 ordered、附 reversible flag、預估耗時、owner。Irreversible step 用 ⚠️ 標出 -->

| # | Action | Reversible? | Duration | Owner |
|---|---|---|---|---|
| 1 | Flip feature flag OFF | ✅ yes | 1 min | DevOps |
| 2 | Drain canary traffic to baseline | ✅ yes | 3 min | DevOps |
| 3 | Revert deployment to v<prev> | ✅ yes | 5 min | DevOps |
| 4 | ⚠️ Run inverse migration (column rename) | ⚠️ partial | 10 min | DBA |
| 5 | Verify health endpoints + smoke tests | ✅ yes | 2 min | SRE |

---

## 5. Data Compatibility & Irreversible Points

<!-- ai-rule: 標明 forward / backward / both；irreversible 必列補救方案（forward-only fix） -->

- **Compatibility direction:** backward (read old + new schema) **[H]**
- **Approach:** expand-contract
- **Irreversible points:**
  - <例：drop column users.legacy_id> — **Forward-only fix:** restore from backup + replay events

---

## 7. Comms & Decision Maker

<!-- ai-rule: 最少 2 個 channel（internal + external）；decision_maker 必填單一 role -->

- **Decision maker:** on-call SRE（半夜 3 點不需要 quorum）
- **Internal:** Slack #incidents — 觸發 + 完成各 1 則
- **External（若 user-facing）：** status page incident — 觸發 + ETA + 完成 3 則

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 自動 vs 手動觸發 | auto / manual / hybrid | hybrid | auto (false-positive 風險)、manual (半夜延遲) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 7, 10）
> - [ ] Triggers 區分 SLO / error_rate / data_integrity
> - [ ] Rollback steps ordered + 每步 reversible flag + duration + owner
> - [ ] Irreversible step 用 ⚠️ 標出且在 Data Compat 段列補救方案
> - [ ] Decision maker 是單一 role（不需 quorum）
> - [ ] Decision Log ≥ 1 條，含 rejected reason
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "rollback-plan"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["deploy-steps", "migration-scripts", "slo-spec"]
  optional: ["business-kpi", "incident-runbook"]
---

# Rollback Plan: <release-name>

**Status:** Draft v0.X · **Owner:** <DevOps + on-call SRE> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev Lead / DBA / PO

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。每結論行內 `（依據：deploy §XXX / migration §YYY / slo §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；rollback_steps 必須 ordered，每步附 `reversible: true/false` 與預估耗時；任何不可逆操作（drop column / destructive migration / cache wipe）必須單獨標 `⚠️ irreversible` 並附 forward-only 補救方案；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: DevOps · required: always -->

<!-- ai-fill: 3-5 行，on-call 5 分鐘內讀完即可決策。寫「觸發條件、總耗時、最大不可逆風險、decision maker」 -->

<3-5 行說明>

> **TL;DR:** <一句話總結>

---

## 2. Triggers
<!-- owner: SRE · required: always -->

<!-- ai-rule: 三類齊全（SLO / error_rate / data_integrity）；每類含閾值 + 觀測窗口 + 信號來源 -->

| Type | Signal | Threshold | Window | Source | Confidence |
|---|---|---|---|---|---|
| SLO breach | error_rate | > 5% | 1 min | metric §A | **[H]** |
| SLO breach | p95 latency | > baseline × 2 | 2 min | metric §B | **[H]** |
| SLO breach | saturation | > 90% | 3 min | metric §C | **[M]** |
| Data integrity | row count drift | > 1% | 5 min | check §D | **[M]** |
| Business | conversion drop | > 5% | 10 min | kpi §E | **[L]** |

---

## 3. Rollback Steps (Ordered)
<!-- owner: DevOps + DBA · required: always -->

<!-- ai-rule: 每步 ordered、附 reversible flag、預估耗時、owner、precondition。Irreversible step 用 ⚠️ 標 + 在 §5 列補救 -->

| # | Action | Reversible? | Duration | Owner | Precondition |
|---|---|---|---|---|---|
| 1 | Flip feature flag OFF | ✅ yes | < 1 min | DevOps | flag 系統可用 |
| 2 | Drain canary traffic to baseline | ✅ yes | 3 min | DevOps | LB 健康 |
| 3 | Revert deployment to v<prev> | ✅ yes | 5 min | DevOps | artifact v<prev> 可用 |
| 4 | ⚠️ Run inverse migration | ⚠️ partial | 10 min | DBA | DB 維護窗口 OR online |
| 5 | Invalidate cache (Redis) | ✅ yes | 1 min | DevOps | cache flush 不影響 SLO |
| 6 | Verify health + smoke tests | ✅ yes | 2 min | SRE | — |
| 7 | Send completion comms | ✅ yes | 1 min | PO | — |

---

## 4. Data Compatibility Strategy
<!-- owner: Dev Lead + DBA · required: always -->

<!-- ai-rule: direction + approach + irreversible_points 三件齊全 -->

- **Direction:** backward (read old + new schema) / forward (only new schema) / both **[H]**
- **Approach:** expand-contract / dual-write / shadow read
- **Compat duration:** <how long must old code be supported>
- **Confidence:** **[H/M/L]**

---

## 5. Inverse Migrations & Irreversible Points
<!-- owner: DBA · required: always -->

<!-- ai-rule: 每個 forward migration 都要有 inverse_script（或標 _TODO_）；irreversible 必列 data_loss_risk -->

| Forward migration | Inverse script | Data loss risk | Forward-only fix |
|---|---|---|---|
| <id: 2024_001_add_col> | <path> | none | — |
| <id: 2024_002_rename_col> | <path> | partial | restore from backup + replay |
| ⚠️ <id: 2024_003_drop_col> | n/a | total | restore from backup (RPO = 24h) |

---

## 6. Safe Window
<!-- owner: DevOps · required: full-only -->

<!-- ai-rule: timezone-aware + duration + blackout periods 必填 -->

| Field | Value |
|---|---|
| Timezone | Asia/Taipei (UTC+8) |
| Preferred window | 02:00-04:00 weekday |
| Estimated total duration | <minutes> |
| Blackout periods | 月結 D-2 ~ D+1 / Black Friday / 大型行銷活動 |

---

## 7. Abort Criteria
<!-- owner: SRE · required: always -->

<!-- ai-rule: hard_stop（停止 rollback）vs soft_stop（暫停評估）區分 -->

### Hard stop（停止 rollback、轉 forward-fix）

- [ ] Inverse migration 跑到一半失敗
- [ ] Backup 損毀 / RPO 無法滿足
- [ ] 發現比原問題更嚴重的退化

### Soft stop（暫停 5 分鐘評估）

- [ ] 任一步驟超出預估耗時 2x
- [ ] 第三方依賴同時 incident

---

## 8. Comms Plan
<!-- owner: PO + DevOps · required: always -->

<!-- ai-rule: internal + external 雙層；decision_maker 必填單一 role -->

### Decision maker

- **Single role:** on-call SRE（不需 quorum，半夜 3 點立即決策）
- **Escalation if blocker:** SRE manager → CTO

### Internal

| Channel | Audience | Template |
|---|---|---|
| Slack #incidents | Eng / SRE / leadership | <URL> |
| PagerDuty | on-call rotation | auto-page |

### External

| Channel | Audience | Timing |
|---|---|---|
| Status page | All customers | trigger + ETA + complete |
| Email | Enterprise (若 SLA 觸發) | within 30 min |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：inverse migration 在生產資料量下未測過> — **Mitigation:** dry-run on staging snapshot — **Owner:** DBA
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：DB 是否支援 online schema change？>
- [ ] **Q2:** ...

---

## 10. Decision Log & Out of Scope
<!-- owner: DevOps · required: always -->

<!-- ai-rule: 每條 ≥ 2 個 rejected options + 各自 reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | trigger 機制 | auto / manual / hybrid | hybrid | auto (false-positive)、manual (半夜延遲) | **[H]** |
| YYYY-MM-DD | rollback 策略 | full revert vs forward fix | full revert | forward fix (時間不可控，blast radius 持續) | **[H]** |

### Out of Scope

本 rollback plan **不處理**：

- ❌ **DR drill 與跨 region failover** — 屬 dr-plan 卡
- ❌ **Application-level circuit breaker 設計** — 屬 resilience 卡
- ❌ **長期 incident postmortem** — 屬 postmortem 卡

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] Triggers 三類齊全（SLO / error_rate / data_integrity）+ 閾值 + 窗口
> - [ ] Rollback steps ordered + 每步 reversible + duration + owner + precondition
> - [ ] 不可逆步驟用 ⚠️ 標 + 在 §5 列 forward-only 補救方案
> - [ ] Inverse migrations 每筆有 data_loss_risk
> - [ ] Safe window 含 timezone + blackout periods
> - [ ] Abort criteria 區分 hard_stop / soft_stop
> - [ ] Decision maker 是單一 role（不需 quorum）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Rollback Plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 deploy steps / migration scripts / SLO spec / business KPI 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 寫「revert commit」就交差（忽略已寫入新格式的資料）、inverse migration 沒在生產資料量 dry-run、不可逆步驟沒標 ⚠️ + forward-only 補救、decision maker 要 quorum（半夜湊不齊）、abort 不分 hard / soft 導致跑到一半才停。AI 若漏這些，自檢清單會抓到並回頭補。
