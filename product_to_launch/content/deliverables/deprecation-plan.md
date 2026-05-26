---
title: "Deprecation Plan · 廢棄計畫"
slug: "deprecation-plan"
stage: "operate"
roles: ["architect", "po"]
order: 53
hook: "把『下架』從口頭承諾變成可追蹤遷移"
when_to_use: "舊 API、舊 endpoint、舊 schema 仍有使用但需退場時"
ai_leverage: "用 Claude 從存取日誌找出殘留依賴與聯絡人"
art: "/generated/stage-operate.webp"
source: "deep-research-report.md §Architecture, GitLab deprecation policy"
---

## 解決什麼問題

廢棄沒人管會變成永遠的技術債。Deprecation Plan 規範公告時間、替代方案、強制下線日，並用監控確認沒人在用才動手。

## 誰負責、和誰對接

- **主責：** Architect + PO
- **協作：** Dev（替代實作）、Customer Success（外部通知）、DevOps（流量監控）
- **下游收件：** Release Plan、ADR、Cost Monitor

## 何時用、何時不用

- ✅ **必要時機：** 舊 API 已有替代、schema 演進、第三方依賴退場
- ❌ **不需要時：** 內部可直接重構、無外部消費者
- ⚠️ **常見誤用：** 只發 email 不監控流量；公告期過短；無替代方案

## AI 怎麼加速

把 access log + endpoint inventory + 客戶清單整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 timeline 與 fallback 政策**。本卡輸出**真實 Deprecation Plan markdown**（含 sunset timeline 表、affected consumer 表、success criteria、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給內部 API / 小型 consumer 集合 / 無合約場景，**完整範本**給對外 API / 企業客戶 / SOC 2 / GDPR 合約通知場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "deprecation-plan"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["access-log", "endpoint-inventory"]
  optional: ["consumer-contact-list"]
---

# Deprecation Plan: <surface-name>

**Status:** Draft v0.X · **Owner:** <Architect / PO> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 7, 9），全部必填——刻意沿用完整版章節編號讓兩版可對照。每結論行內加 `（依據：log §XXX）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；最短公告期 90 天；caller 無法識別寫 `unknown_caller` 並列追查方式不假設；必須有 rollback 段（不准設「強制下線無例外」）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：要下架什麼、為何下架、何時 disable、有多少 affected caller -->

<3-5 行說明>

> **TL;DR:** <一句話：N 月內下架 X surface，影響 Y 個 caller，替代為 Z>

---

## 2. Deprecated Surface & Replacement

<!-- ai-rule: replacement_path 必須具體；feature_parity 為 partial / breaking_changes 必須列差異 -->

| Field | Value | Confidence |
|---|---|---|
| **Deprecated surface** | <e.g. GET /api/v1/users> | — |
| **Reason** | <為何下架> | **[H]** |
| **Replacement** | <e.g. GET /api/v2/users> | — |
| **Feature parity** | full / partial / breaking_changes | **[H]** |
| **Migration guide** | <link or `_TODO_`> | — |

### Breaking changes（若有）

- <change 1>
- <change 2>

---

## 3. Sunset Timeline

<!-- ai-rule: 總天數 ≥ 90；每個 phase 必須有日期；無合約資料時公告期需保守取上限 -->

| Phase | Date (ISO) | Trigger / Behaviour |
|---|---|---|
| **Announce** | YYYY-MM-DD | 公告 + status page |
| **Warning phase** | YYYY-MM-DD | 開始回傳 `Deprecation` header |
| **Read-only** | YYYY-MM-DD | 拒絕新 client |
| **Disable (soft)** | YYYY-MM-DD | 軟下線（保留快速回滾） |
| **Remove (hard)** | YYYY-MM-DD | 程式碼移除 |
| **Total days** | ≥ 90 | — |

---

## 5. Affected Consumers（top callers）

<!-- ai-rule: 列出 top callers（≥ 80% 流量）；unknown_caller bucket 必填即使 0 -->

| Caller | Tier | Req/30d | Contact | Migration ETA | Confidence |
|---|---|---|---|---|---|
| <org-a> | enterprise | 12k | a@x.com | YYYY-MM-DD | **[H]** |
| <unknown_caller bucket> | unknown | 800 | _TODO: 反查 IP/UA_ | _TODO_ | **[L]** |

---

## 7. Success Criteria & Rollback

<!-- ai-rule: 三條 metric 必填；rollback window ≥ 14d -->

| Metric | Target |
|---|---|
| **Caller count at disable** | 0 unknown + ≤ 5 known approved |
| **Traffic share at disable** | ≤ 0.1% of baseline |
| **Rollback window** | ≥ 14d, ≤ 1h to re-enable |

---

## 9. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 公告期 90d vs 180d | 60d / 90d / 180d | 90d | 60d (違反合約 30d + 採購週期)、180d (延誤新版 ROI) | **[H]** |

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 7, 9）
> - [ ] Sunset timeline 含 5 個 phase + 總天數 ≥ 90
> - [ ] unknown_caller bucket 必填（即使 0）+ 附追查方法
> - [ ] Affected consumer 表覆蓋 ≥ 80% 流量
> - [ ] Success criteria 含 caller count + traffic share + rollback window
> - [ ] Rollback window ≥ 14d
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出
```

```template-full
---
doc_type: "deprecation-plan"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["access-log", "endpoint-inventory", "consumer-contact-list", "slo"]
  optional: ["contract-terms", "traffic-baseline"]
---

# Deprecation Plan: <surface-name>

**Status:** Draft v0.X · **Owner:** <Architect / PO> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev / Customer Success / Legal / DevOps

> [!IMPORTANT]
> **AI 填寫規則：** 10 段 H2 章節全部必填（任一缺失即不合格）。對標 GitLab deprecation policy + Semantic Versioning + SOC 2 變更通知。每結論行內 `（依據：log §XXX / contract §YYY）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；最短公告期 90 天；強制下線前 traffic ≤ 0.1%；必須有 rollback / 延期 plan（不准設「強制下線無例外」）；caller 無法識別寫 `unknown_caller` 並列追查方式；禁 YAML / JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Architect/PO · required: always -->

<!-- ai-fill: 3-5 行，主管 30 秒讀完。內容：要下架什麼、為何下架、何時 disable、affected caller 數、最大商業風險 -->

<3-5 行說明>

> **TL;DR:** <一句話：N 月內下架 X，影響 Y 個 caller，最大風險 Z>

---

## 2. Deprecated Surface & Replacement
<!-- owner: Architect · required: always -->

<!-- ai-rule: replacement_path 必須具體；feature_parity 為 partial / breaking_changes 必須列差異與 mitigation -->

| Field | Value | Confidence |
|---|---|---|
| **Deprecated surface** | <e.g. GET /api/v1/users> | — |
| **Version** | <v1> | — |
| **Reason** | <e.g. 安全模型升級 / 效能 / consolidation> | **[H]** |
| **Replacement surface** | <e.g. GET /api/v2/users> | — |
| **Feature parity** | full / partial / breaking_changes | **[H]** |
| **Migration guide** | <link or `_TODO_`> | — |

### Breaking changes

- <change 1 + caller-side mitigation>
- <change 2 + caller-side mitigation>

---

## 3. Sunset Timeline
<!-- owner: PO + DevOps · required: always -->

<!-- ai-rule: 總天數 ≥ 90；每個 phase 必須有 ISO 日期；無合約資料時公告期需保守取上限 -->

| Phase | Date (ISO) | Trigger / Behaviour | Notes |
|---|---|---|---|
| **Announce** | YYYY-MM-DD | 公告 + status page + email | T-90 |
| **Warning phase** | YYYY-MM-DD | 回傳 `Deprecation` header + Sunset header | T-60 |
| **Read-only** | YYYY-MM-DD | 拒絕新 client 註冊舊版 | T-30 |
| **Disable (soft)** | YYYY-MM-DD | 軟下線，保留 14d rollback window | T-0 |
| **Remove (hard)** | YYYY-MM-DD | 程式碼移除 | T+14 |
| **Total days** | ≥ 90 | — | — |

---

## 4. Affected Consumers
<!-- owner: Customer Success + DevOps · required: always -->

<!-- ai-rule: 列出 ≥ 90% 流量 caller；unknown_caller bucket 必填即使 0；enterprise tier 必須對應合約 notice 天數 -->

| Caller ID | Tier | Req/30d | Contact | Contract notice (d) | Migration ETA | Source | Confidence |
|---|---|---|---|---|---|---|---|
| <org-a> | enterprise | 12,000 | a@x.com | 60 | YYYY-MM-DD | log §3 + contract §A | **[H]** |
| <org-b> | paid | 4,200 | b@x.com | 30 | YYYY-MM-DD | log §4 | **[M]** |
| <unknown_caller bucket> | unknown | 800 | _TODO: 反查 IP/UA_ | — | _TODO_ | log §7 | **[L]** |

---

## 5. Comms Channels
<!-- owner: Customer Success · required: always -->

<!-- ai-rule: ≥ 3 個 channel；cadence 至少 T-90, T-60, T-30, T-7, T-1 -->

| Channel | Target | Cadence |
|---|---|---|
| Status page | public | T-90, T-60, T-30, T-7, T-1 |
| Email | all affected consumers | T-90, T-30, T-7 |
| In-app banner | signed-in users | from T-30 |
| API response header | active callers | from warning phase |
| Slack / Discord | community | T-90, T-30 |

---

## 6. Fallback for Holdouts
<!-- owner: PO + Legal · required: full-only -->

<!-- ai-rule: 必須有 fallback；不准設「強制下線無例外」；延期次數 + 上限要寫死 -->

| Field | Value |
|---|---|
| **Policy** | enterprise 可申請 30d 延期，最多 2 次 |
| **Approval role** | <e.g. VP Engineering> |
| **Cost of extension** | 內部 ops effort + 額外 SLA 風險 |
| **Extension request channel** | <e.g. support ticket + sales rep> |

---

## 7. Success Criteria & Rollback
<!-- owner: DevOps + Architect · required: always -->

<!-- ai-rule: 三條 metric 必填；rollback window ≥ 14d；rollback path 必須具體可執行 -->

| Metric | Target | Measurement |
|---|---|---|
| **Caller count at disable** | 0 unknown + ≤ 5 known approved | log query |
| **Traffic share at disable** | ≤ 0.1% of baseline | metric query |
| **Rollback window** | ≥ 14d, ≤ 1h to re-enable | runbook |
| **SLO impact during sunset** | 不違反現有 SLO | error-budget burn |

### Rollback path

1. <e.g. feature flag `enable_v1_api = true` 立即生效>
2. <e.g. CDN 規則回滾>
3. <e.g. 通知頻道更新>

---

## 8. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner -->

> **R1:** <unknown_caller 在 disable 後出現流量 → 不確定誰受影響> — **Mitigation:** 反查 IP/UA + 14d 軟下線觀察 — **Owner:** DevOps
>
> **R2:** <enterprise 客戶採購週期 > 90d 來不及遷> — **Mitigation:** Fallback 延期政策 + 客戶經理直接聯絡 — **Owner:** Customer Success

### Open Questions

- [ ] **Q1:** <某 enterprise 合約是否強制 180d notice？需 Legal 確認>
- [ ] **Q2:** <unknown_caller 是否來自 abandoned integration？>

---

## 9. Decision Log
<!-- owner: Architect + PO · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 公告期長度 | 60d / 90d / 180d | 90d | 60d (違反合約 30d + 採購週期)、180d (延誤新版 ROI) | **[H]** |
| YYYY-MM-DD | Fallback 政策 | no extension / 30d×1 / 30d×2 | 30d×2 | no extension (enterprise 反彈)、30d×1 (採購週期不夠) | **[M]** |

---

## 10. Out of Scope & Confidence & TODO
<!-- owner: All · required: always -->

本 Deprecation Plan **不處理**：

- ❌ **不處理替代方案實作細節** — 屬 ADR / api-spec / data-model 卡
- ❌ **不處理合約罰款計算** — 屬 Legal
- ❌ **不處理產品行銷宣傳** — 屬 PMM

### Confidence & Sources

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1：unknown_caller 為 abandoned integration>
- **Highest-value next input:** <下一份最該補的輸入：合約條款摘要 / unknown caller IP-UA 反查>

### TODO（缺資料）

- _TODO: 補 unknown_caller IP/UA 反查結果_
- _TODO: 確認 enterprise 合約 notice 天數_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 10 段 H2 章節齊全（編號 1-10）
> - [ ] Sunset timeline 含 5 個 phase + 總天數 ≥ 90
> - [ ] unknown_caller bucket 必填（即使 0）+ 附追查方法
> - [ ] Affected consumer 表覆蓋 ≥ 90% 流量 + 每個 enterprise 對應合約 notice 天數
> - [ ] Comms channels ≥ 3 個 + cadence ≥ 5 個時點
> - [ ] Fallback 政策必填（不准「強制下線無例外」）
> - [ ] Success criteria 含 caller / traffic / rollback / SLO 四象限
> - [ ] Rollback path 步驟具體可執行
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Deprecation Plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 access log 摘要（含 caller 頻次）/ endpoint inventory / consumer 聯絡清單 / 合約 notice 條款 / 現有 SLO + traffic baseline 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 只發 email 不在 API 回應加 Deprecation header（caller 看不到）、無 unknown_caller 段（disable 後出事才知道有人在用）、無 rollback window（一旦炸開無法救）、公告期不滿 90d（違反通用 best practice 與合約）、設「強制下線無例外」（enterprise 客戶會升級到 C-level）。AI 若漏這些，自檢清單會抓到並回頭補。
