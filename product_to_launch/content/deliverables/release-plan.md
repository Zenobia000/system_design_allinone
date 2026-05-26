---
title: "Release Plan · 上線計畫"
slug: "release-plan"
stage: "ship"
roles: ["po", "devops"]
order: 39
hook: "把上線從『按 deploy』變成有對齊、有證據、有退路"
when_to_use: "release 涉及 schema、外部承諾、跨團隊或灰度時"
ai_leverage: "用 Claude 從 PR 清單生成 release notes + 風險清單"
art: "/generated/stage-ship.webp"
source: "deep-research-report.md §Delivery Planning, §Deployment"
---

## 解決什麼問題

Release Plan 是一份「誰在哪時做什麼、出事誰接、何時宣布完成」的協作文件。沒有它，每次上線靠 Slack 即興指揮。

## 誰負責、和誰對接

- **主責：** PO + DevOps
- **協作：** Dev Lead、QA、SRE on-call、Customer Success
- **下游收件：** Go/No-Go、Rollback Plan、Canary Strategy

## 何時用、何時不用

- ✅ **必要時機：** schema migration、breaking change、市場活動綁定
- ❌ **不需要時：** flag 控制的小改、純文案
- ⚠️ **常見誤用：** 只寫時程不寫退路；通知名單缺 on-call

## AI 怎麼加速

把 PR 清單 + commit 訊息 + 依賴圖整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 comms 與 rollback link**。本卡輸出**真實 Release Plan markdown 文件**（含 timeline 表、scope commit 表、comms 三層計畫、rollback / go-no-go cross-link），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本** 給單一服務 / 內部 release / 小型團隊用，**完整範本** 給跨服務 / 外部 API breaking change / 大規模 release 用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "release-plan"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["pr-list", "commit-log"]
  optional: ["dependency-graph"]
---

# Release Plan: <version>

**Status:** Draft v0.X · **Owner:** <PO + DevOps> · **Target:** <ISO 8601 + TZ> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 7, 10），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：pr §XXX / commit §YYY）`；每量化欄位加 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；rollback_link 與 go_no_go_link 必填（即使為 TODO）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，跨團隊 30 秒讀完。寫「版本號、上線時間、主要 scope、最大風險、退路」 -->

<3-5 行說明>

> **TL;DR:** <一句話：版本 + scope + 退路>

---

## 2. Scope Commits

<!-- ai-rule: 列 user-facing commit 為主；type 用 Conventional Commits（feat / fix / perf / BREAKING） -->

| Commit | Type | Summary | PR | User-facing | Confidence |
|---|---|---|---|---|---|
| <sha> | feat | <one-line> | <URL> | yes | **[H]** |
| <sha> | fix | ... | <URL> | yes | **[H]** |
| <sha> | BREAKING | ... | <URL> | yes | **[H]** |

---

## 3. Risk Summary

<!-- ai-rule: 至少列 high / medium 各 1 條；BREAKING change 必標 high -->

> **High:** <風險 + 觸發條件 + Mitigation>
>
> **Medium:** <風險>
>
> **Unknowns:** <unknown 1>, <unknown 2>

---

## 5. Comms Plan（internal / external / support）

<!-- ai-rule: 三層都要有；每層含 channel + audience + timing -->

| Layer | Channel | Audience | Timing | Template |
|---|---|---|---|---|
| Internal | Slack #releases | Eng / SRE | T-24h / T-1h / T+0 | <URL> |
| External | status page / email | customers | T-7d / T+0 | <URL or TODO> |
| Support | CS playbook | support agents | T+0 | <URL> |

---

## 7. Cross-links & Post-release Watch

<!-- ai-rule: rollback_link 與 go_no_go_link 必填；post_release_metrics 至少 1 個 SLO + 1 個業務 KPI -->

- **Rollback plan:** <URL to rollback-plan.md or _TODO_>
- **Go/No-Go checklist:** <URL or _TODO_>
- **SLO watch window:** <minutes>
- **Business KPI watch:** <metric + threshold>
- **Abort criteria:** <條件>

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 灰度 vs 全量 | 灰度 / 全量 / 分批 | 灰度 | 全量 (BREAKING blast radius 超 budget) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 7, 10）
> - [ ] Scope commits 用 Conventional Commits type
> - [ ] BREAKING change 在 Risk Summary 標 high
> - [ ] Comms 三層齊全（internal / external / support）
> - [ ] Rollback link 與 Go/No-Go link 必填（即使 TODO）
> - [ ] Decision Log ≥ 1 條，含 rejected reason
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "release-plan"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["pr-list", "commit-log", "dependency-graph"]
  optional: ["external-api-contracts", "slo-spec"]
---

# Release Plan: <version>

**Status:** Draft v0.X · **Owner:** <PO + DevOps> · **Target:** <ISO 8601 + TZ> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev Lead / QA / SRE / CS

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。每結論行內 `（依據：pr §XXX / commit §YYY / dep §ZZZ）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；comms_plan 必須含 internal / external / support 三層，每層有 channel + audience + timing；任何 BREAKING change 必須附 deprecation 窗口與 customer comms；rollback_link / go_no_go_link 必填；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: PO · required: always -->

<!-- ai-fill: 3-5 行，跨團隊 30 秒讀完。寫「版本、target time、主要 scope、最大風險、退路、success/abort criteria」 -->

<3-5 行說明>

> **TL;DR:** <一句話總結>

---

## 2. Release Identity & Timeline
<!-- owner: PO + DevOps · required: always -->

<!-- ai-rule: SemVer + ISO 8601 timezone-aware time；timeline 含 T-24h / T-1h / T+0 / T+1h / T+24h -->

| Field | Value |
|---|---|
| Version | <SemVer e.g. v2.4.0> |
| Code name | <optional> |
| Target date | <ISO 8601 + TZ> |
| Rollout strategy | canary / blue-green / all-at-once |
| Estimated duration | <minutes> |

### Timeline

| Phase | Time | Owner | Action |
|---|---|---|---|
| Code freeze | T-48h | Dev Lead | merge cutoff |
| Dry-run | T-24h | DevOps | staging full rollout |
| Go/No-Go meeting | T-2h | PO | 簽核 |
| Deploy start | T+0 | DevOps | canary stage 1 |
| Full rollout | T+<duration> | DevOps | 100% traffic |
| Post-release watch | T+1h ~ T+24h | SRE | SLO + KPI monitor |

---

## 3. Scope Commits
<!-- owner: Dev Lead · required: always -->

<!-- ai-rule: 列 user-facing 為主；BREAKING 必須單獨列、附 deprecation 窗口 -->

| Commit | Type | Summary | PR | User-facing | Confidence |
|---|---|---|---|---|---|
| <sha> | feat | ... | <URL> | yes | **[H]** |
| <sha> | fix | ... | <URL> | yes | **[H]** |
| <sha> | perf | ... | <URL> | no | **[M]** |
| <sha> | **BREAKING** | <API X removed> | <URL> | yes | **[H]** |

### Breaking changes（單獨拉出）

- **<API X>:** Removed in v2.4.0 — Deprecation window: 90 days since v2.2.0 — Customer comms: <URL>

---

## 4. Risk Summary
<!-- owner: All · required: always -->

<!-- ai-rule: high / medium / unknowns 三層必填；high 必含 likelihood + mitigation -->

### High

> **R1:** <風險> — Likelihood: <H/M/L> — Mitigation: <如何降低> — Owner: <role>

### Medium

> **R2:** <風險> — Mitigation: ...

### Unknowns

- <unknown 1>
- <unknown 2>
- <unknown 3>

---

## 5. Dependency & Blackout Window
<!-- owner: DevOps · required: always -->

<!-- ai-rule: upstream freeze + downstream notification 雙向都要列；blackout 列已知不可上線時段 -->

| Direction | Service | Window / Lead time | Owner |
|---|---|---|---|
| Upstream freeze | <service A> | <freeze window> | <team> |
| Downstream notify | <service B> | T-72h | <team> |
| Blackout period | 月結 / 行銷活動 | <range> | PO |

---

## 6. Comms Plan
<!-- owner: PO + CS · required: always -->

<!-- ai-rule: internal / external / support 三層；每層含 channel + audience + timing + template -->

### Internal

| Channel | Audience | Timing | Template |
|---|---|---|---|
| Slack #releases | Eng / SRE | T-24h / T-1h / T+0 / T+1h | <URL> |
| Email | All-hands | T-24h | <URL> |

### External

| Channel | Audience | Timing | Template |
|---|---|---|---|
| Status page | All customers | T-7d / T+0 / T+complete | <URL> |
| Email | Enterprise | T-14d (BREAKING) | <URL> |

### Support

| Channel | Audience | Escalation |
|---|---|---|
| CS playbook | Support agents | → on-call SRE |
| Knowledge base | Support agents | <URL> |

---

## 7. Cross-links
<!-- owner: PO + DevOps · required: always -->

<!-- ai-rule: 兩條 link 必填（rollback / go-no-go）；缺其一即不能上線 -->

- **Rollback plan:** <URL to rollback-plan.md or _TODO_>
- **Go/No-Go checklist:** <URL or _TODO_>
- **Canary strategy:** <URL or _TODO_>
- **Runbook:** <URL or _TODO_>

---

## 8. Post-release Watch
<!-- owner: SRE + PO · required: always -->

<!-- ai-rule: SLO watch window + 業務 KPI watch + success / abort criteria 必填 -->

| Aspect | Spec | Confidence |
|---|---|---|
| SLO watch window | <minutes / hours> | **[H]** |
| Business KPI watch | conversion / AOV / retention + 門檻 | **[M]** |
| Success criteria | <條件> | **[H]** |
| Abort criteria | <條件> | **[H]** |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Open Questions

- [ ] **Q1:** <例：enterprise tier 是否同步升級？>
- [ ] **Q2:** ...

---

## 10. Decision Log & Out of Scope
<!-- owner: PO · required: always -->

<!-- ai-rule: 每條 ≥ 2 個 rejected options + 各自 reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | rollout strategy | 灰度 / 全量 / 分批 | 灰度 | 全量 (BREAKING blast radius)、分批 (協調成本) | **[H]** |
| YYYY-MM-DD | 合併 vs 拆分 release | 合併 / 拆分 | 拆分 | 合併 (blast radius 放大、回滾困難) | **[H]** |

### Out of Scope

本 release plan **不處理**：

- ❌ **Detailed rollout commands** — 屬 runbook
- ❌ **SLO 重新校準** — 屬 SLO doc
- ❌ **行銷文案 / blog post** — 屬 marketing 卡

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] Timeline 含 T-24h / T-1h / T+0 / T+1h 至少 4 個 phase
> - [ ] Scope commits 用 Conventional Commits type
> - [ ] BREAKING change 單獨列 + deprecation 窗口 + customer comms
> - [ ] Risk Summary 含 high / medium / unknowns 三層
> - [ ] Dependency window 含 upstream + downstream + blackout
> - [ ] Comms 三層齊全（internal / external / support）+ timing 明確
> - [ ] Rollback link + Go/No-Go link 必填
> - [ ] Post-release watch 含 SLO + 業務 KPI + abort criteria
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Release Plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 PR 清單 / commit log / dependency graph / external API contracts 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只寫時程不寫退路（rollback_link 缺）、comms 三層缺一層（通常缺 support）、BREAKING 沒附 deprecation 窗口、合併太多 release 進一次部署放大 blast radius、post-release 只盯 SLO 不盯業務 KPI。AI 若漏這些，自檢清單會抓到並回頭補。
