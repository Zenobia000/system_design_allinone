---
title: "SRS · 系統需求規格"
slug: "srs"
stage: "define"
roles: ["ba", "sa"]
order: 13
hook: "把業務需求翻成系統可實作的規格"
when_to_use: "跨系統整合、合規/稽核產業、需 RFP 對外發包時"
ai_leverage: "用 Claude 把 PRD + business rules → use case + 規則表"
art: "/generated/stage-define.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

PRD 講「為什麼做、要做什麼」；但工程師動手前還欠一層：**系統具體該有哪些行為、哪些規則、哪些介面**。
沒有 SRS，BA 的口頭規則隨時間散失、SA 的系統假設藏在腦中、QA 拿不到完整 test 來源。
SRS 把這些寫成**可追溯、可驗收、可對外發包的規格**。

## 誰負責、和誰對接

- **主責：** BA（業務規則）/ SA（系統行為）
- **協作：** PM（驗證對齊 PRD）、Architect（評估技術影響）、QA（驗收條件）
- **下游收件：** Architect 做 ADR、Dev 寫 code、QA 寫 test plan、稽核留檔

## 何時用、何時不用

- ✅ **必要時機：** 金融/醫療/政府合規產業、跨系統整合 ≥ 3 個、需對外 RFP
- ❌ **不需要時：** 小團隊 lean startup、純前端 UI 改版、內部工具 < 5 人用
- ⚠️ **常見誤用：** 把 SRS 寫成 PRD 的複製貼上（缺系統行為層）；ISO/IEC/IEEE 29148 強調 SRS 必須包含 **functional + non-functional + interface + data + constraints**

## AI 怎麼加速

把 PRD + business rule catalog + 上下游系統清單整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審追溯性與合規完整**。本卡輸出**真實 SRS markdown 文件**（含 use case 表、external interface 表、可追溯性矩陣、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本：**輕量範本**給中型企業系統 / 內部跨系統整合用，**完整範本**給金融/醫療/政府合規場景 / 對外 RFP / ISO 29148 完整五象限場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "srs"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "business-rules"]
  optional: ["upstream-downstream-systems"]
---

# System Requirements Specification: <system-name>

**Status:** Draft v0.X · **Owner:** <SA / BA name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 6, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。Use case **必含 actor / precondition / main flow / alt / exception / postcondition 六件**，缺任一視為 fail。每條 SRS 規格必含 **PRD 反向追溯 ID**（traceability 是 SRS 的核心價值）。每結論 `（依據：PRD §X / FR-NNN / BR-NNN）`；缺資料寫 `_TODO: 需要 XXX_` 不編造。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：本 SRS 涵蓋 N 個 use case、M 個 external interface、PRD 覆蓋率 %、最高風險 traceability gap -->

<3-5 行說明>

> **TL;DR:** <一句話：本 SRS 將 PRD 哪段拆成多少個系統可實作條目>

---

## 2. Use Cases

<!-- ai-rule: 輕量版 2-4 個核心 UC。每個 UC 含六件：actor / precondition / main flow / alt flow / exception / postcondition + PRD 反向追溯 -->

### UC-1: <use-case-name> · **[H]**

- **Primary actor:** <角色>
- **Secondary actor:** <角色 / 第三方系統>
- **Precondition:** <state + data + auth 狀態>
- **Main flow:**
  1. <Actor action> → System <response>
  2. <Actor action> → System <response>
  3. ...
- **Alt flow:**
  - When <condition>: <步驟 2 改走> ...
- **Exception:**
  - Trigger <when>: <handling>
- **Postcondition:** <state + data 變化 + side effect>
- **Traceability:** PRD §FR-1, BR-001, BR-002
- **Source:** PRD §FR-1

### UC-2: ... · **[M]**

...

---

## 6. External Interfaces

<!-- ai-rule: 每個 interface 必含 protocol / auth / rate limit / failure mode 四件 -->

| API ID | Counterparty | Protocol | Auth | Rate limit | Failure mode | Source |
|---|---|---|---|---|---|---|
| EXT-001 | <auth-svc> | REST | mtls | 500 rps | fail-fast | PRD §integration |
| EXT-002 | <payment-vendor> | webhook | hmac | — | retry + DLQ | PRD §integration |

---

## 10. Decision Log（key 1-2 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why |
|---|---|---|---|---|
| YYYY-MM-DD | <例：UC-1 走同步還是事件驅動> | sync / async / hybrid | sync | async (一致性難保證)、hybrid (運維複雜度爆增) |

---

## 12. Confidence & Sources & TODO

- **最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1，例：上游 API SLA 99.9%>
- **Highest-value next input:** <合規條款全文 / 上游 SLA / 既有資料 profiling 三選一>

### TODO（缺資料）

- _TODO: 需要 EXT-002 的 webhook retry contract 確認_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 6, 10, 12，刻意不連號）
> - [ ] 每個 UC 含 actor / precondition / main flow / alt / exception / postcondition 六件
> - [ ] 每個 UC 含 PRD 反向追溯（FR-ID + BR-ID）
> - [ ] 每個 external interface 含 protocol / auth / rate limit / failure mode 四件
> - [ ] 每結論帶 `[H/M/L]` badge + `（依據：...）` 引用
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（SRS 是給人 + 稽核讀的 markdown）
```

```template-full
---
doc_type: "srs"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "business-rules", "upstream-downstream-systems"]
  optional: ["compliance-clauses", "existing-api-spec", "data-exchange-contract"]
---

# System Requirements Specification: <system-name>

**Status:** Draft v0.X · **Owner:** <SA name> · **Last updated:** YYYY-MM-DD · **Reviewers:** PM / BA / Architect / QA / Audit / 外包廠商

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 **ISO/IEC/IEEE 29148** 的五大要件：functional + non-functional + interface + data + constraints。Use case 必含 actor / precondition / main flow / alt flow / exception / postcondition 六件；NFR **必須涵蓋 latency / availability / security / audit / a11y 五象限**，任一象限沒提到要說明為何不適用；external interface 必含 protocol / auth / rate limit / failure mode / SLA 五件；合規欄位必標依據（GDPR Art X / SOC 2 CC Y / 金管會函釋 Z）+ 保留期 + 刪除政策；每條規格必含 **PRD 反向追溯 ID**。每結論 `（依據：PRD §X / FR-NNN / BR-NNN / 合規條款 §Z）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: SA · required: always -->

<!-- ai-fill: 3-5 行：本 SRS 涵蓋 N 個 UC、M 個 external interface、PRD 覆蓋率 %、五象限 NFR 完整度、最高風險合規缺口 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 SRS 對應 PRD 哪段、交付給 Architect / Dev / 稽核 / 外包的契約>

---

## 2. Use Cases
<!-- owner: SA + BA · required: always -->

<!-- ai-rule: 每個 UC 含六件齊全 + PRD 反向追溯。互斥 / 並行 UC 需在 alt flow 列出 -->

### UC-1: <use-case-name> · **[H]**

- **Primary actor:** <角色>
- **Secondary actor:** <角色 / 第三方系統>
- **Precondition:** <state + data + auth 狀態 + feature flag>
- **Main flow:**
  1. Actor: <action> → System: <response> (UI / API)
  2. ...
  3. ...
- **Alt flow:**
  - When <condition>: <steps>
- **Exception flow:**
  - Trigger <when>: <handling + error code + log level>
- **Postcondition:** <state + data 變化 + side effect + 通知對象>
- **Traceability:**
  - PRD ref: §FR-1, §FR-2
  - Business rule refs: BR-001, BR-002
- **Source:** PRD §FR-1

### UC-2: ... · **[M]**

...

### UC-3: ... · **[M]**

...

---

## 3. System Constraints
<!-- owner: SA + Architect · required: full-only -->

| Type | Constraint | Source / Rationale | Confidence |
|---|---|---|---|
| **Technology** | <例：必須跑在 on-prem K8s 1.28+> | 既有 infra 標準 | **[H]** |
| **Technology** | <例：必須相容 IE11> | 客戶承諾 §3 | **[H]** |
| **Regulatory** | <例：金管會 §17 個資 on-shore> | 法規條款 §17 | **[H]** |
| **Business** | <例：預算 ≤ NT$X、上線 deadline Q2> | 合約附件 A | **[M]** |

---

## 4. Non-Functional Requirements (5 Quadrants)
<!-- owner: Architect + SA · required: always -->

<!-- ai-rule: 五象限齊全（latency / availability / security / audit / a11y），任一不適用要寫明 Rationale -->

| Dimension | Target | Measurement | Rationale | Confidence |
|---|---|---|---|---|
| **Latency** | p95 < 800ms, p99 < 2s | k6 load test at <量測點> | 對齊 JTBD §1 success criteria | **[H]** |
| **Availability** | 99.9% (8.7h downtime/year) | 月度 SLO report | 對齊 SLA 合約 §5 | **[H]** |
| **Security** | OWASP top 10 mitigated + Data class confidential | sast + manual pen test | GDPR Art 32 | **[H]** |
| **Audit** | All write op 含 user_id + ts + before/after | 1y hot + 6y cold | SOC 2 CC7.2 | **[H]** |
| **A11y** | WCAG 2.2 AA | axe-core + manual NVDA | 對齊 PRD §a11y | **[M]** |

---

## 5. External Interfaces
<!-- owner: SA + Architect · required: always -->

<!-- ai-rule: 每個 interface 必含 protocol / auth / rate limit / failure mode / SLA + data classification 六件 -->

| API ID | Counterparty | Protocol | Auth | Rate limit | SLA | Failure mode | Data class | Source |
|---|---|---|---|---|---|---|---|---|
| EXT-001 | <auth-svc> | REST | mtls | 500 rps | 99.95% / p95 < 100ms | fail-fast | internal | PRD §integration |
| EXT-002 | <payment-vendor> | webhook | hmac | — | 99.5% | retry + DLQ + alert | confidential (PCI) | PRD §integration |
| EXT-003 | <data-warehouse> | gRPC stream | oauth2 | 100 rps | 99% / freshness < 24h | degrade to cached | internal | PRD §integration |

---

## 6. Data Requirements
<!-- owner: SA + Compliance · required: always -->

<!-- ai-rule: 每個 entity 含 attributes + classification + retention + deletion policy + 合規依據 -->

### Entities

| Entity | Key attributes | Classification | Retention | Deletion policy | Compliance basis |
|---|---|---|---|---|---|
| `users` | id, email, name, role | confidential (PII) | 5y post-churn | anonymize | GDPR Art 17 |
| `orders` | id, user_id, amount, ts | internal | 7y | archive | 稅務法 §21 |
| `audit_log` | event, actor, ts, payload | internal | 1y hot + 6y cold | archive | SOC 2 CC7.2 |

### Data Quality SLO

| Metric | Target | Measurement |
|---|---|---|
| Completeness | ≥ 99.5% non-null on required fields | weekly batch check |
| Freshness | < 24h staleness | pipeline observability |
| Accuracy | < 0.1% mismatch vs source | monthly reconciliation |

---

## 7. Traceability Matrix
<!-- owner: SA + QA · required: full-only -->

<!-- ai-rule: 列出 PRD → SRS 對應；coverage 標 full / partial / gap；gap 必補 TODO -->

| PRD ref | SRS IDs (UC / NFR / EXT / Entity) | Coverage | Notes |
|---|---|---|---|
| §FR-1 | UC-1, UC-2, EXT-001 | full | — |
| §FR-2 | UC-3 | partial | _TODO: 需補錯誤情境 UC_ |
| §NFR-latency | NFR row 1 | full | — |
| §NFR-a11y | NFR row 5 | gap | _TODO: 需 UX 確認對應 WCAG 條款_ |

### Gaps Summary

- _TODO: PRD §FR-4 尚無對應 UC_
- _TODO: PRD §NFR-disaster-recovery 尚無對應 NFR row_

---

## 8. Functional Requirements (numbered)
<!-- owner: SA + BA · required: full-only -->

<!-- ai-rule: 每條 FR 用 ISO 29148 風格：唯一 ID + statement (shall) + traceability + verification method -->

| FR ID | Statement | Traceability | Verification | Confidence |
|---|---|---|---|---|
| SRS-FR-001 | The system **shall** authenticate users via mtls on EXT-001 | PRD §FR-1 + UC-1 | integration test | **[H]** |
| SRS-FR-002 | The system **shall** retain audit log 1y hot + 6y cold | PRD §audit + SOC 2 | log retention policy + audit | **[H]** |
| SRS-FR-003 | ... | ... | ... | **[M]** |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：EXT-002 webhook 無 ordering 保證可能造成 audit 不一致> — **Mitigation:** idempotency key + reconciliation job — **Owner:** Architect
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：UC-3 是否需要 4-eye approval？法遵待裁示>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: SA · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <例：UC-1 sync vs async vs hybrid> | sync / async / hybrid | sync | async (一致性難保證且 audit 不易)、hybrid (運維複雜度爆增) | **[H]** |
| YYYY-MM-DD | <例：data residency on-shore 還是雲端> | on-shore / cloud / hybrid | on-shore | cloud (金管會 §17 違規)、hybrid (合規模糊地帶) | **[H]** |

---

## 11. Out of Scope
<!-- owner: SA · required: full-only -->

本 SRS **不處理**：

- ❌ **UI / UX 細節** — 屬 UX 卡（high-fidelity mockup）
- ❌ **技術選型決策** — 屬 ADR 卡
- ❌ **效能調校細節 / 容量規劃** — 屬 architect / capacity-plan 卡
- ❌ **Sprint 拆解與時程** — 屬 PO / release-plan 卡
- ❌ **Code-level design** — 屬 design-doc / api-spec 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1，例：EXT-001 SLA 99.95% 來自 vendor marketing 而非合約>
  - <假設 2，例：a11y 對應 WCAG 2.2 AA 而非 AAA>
- **Highest-value next input:** <合規條款全文 / 上游 SLA 合約 / 既有資料 profiling>

### TODO（缺資料）

- _TODO: 需要法遵確認 §17 個資 on-shore 是否含 audit log_
- _TODO: 需要 vendor SLA 合約原文校準 EXT-001 真實 availability_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個 UC 含六件（actor / precondition / main / alt / exception / postcondition）
> - [ ] 每個 UC 含 PRD 反向追溯（FR + BR）
> - [ ] NFR 五象限齊全（latency / availability / security / audit / a11y）；不適用須寫 Rationale
> - [ ] 每個 external interface 含六件（protocol / auth / rate limit / SLA / failure mode / data class）
> - [ ] 每個 entity 含 classification + retention + deletion policy + 合規依據
> - [ ] Traceability matrix 涵蓋所有 PRD FR + NFR；gap 標 TODO
> - [ ] 合規欄位都有引用具體法規條款（GDPR Art X / SOC 2 CC Y / 金管會函釋 Z）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（SRS 是給人 + 稽核 + 外包讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 SRS markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 prd.md / business rule catalog / 上下游系統清單 / 既有 API spec / 合規條款 全文）
⏫
```

> [!TIP]
> **常見錯誤：** SRS 寫成 PRD 複製貼上（缺系統行為層）、Use case 漏 exception flow 或 postcondition（稽核無法判定完整性）、NFR 砍掉某象限沒寫 Rationale、external interface 漏 failure mode（運維沒得救援）、合規欄位沒標具體法規條款（變空殼宣告）、traceability gap 偷藏不揭露。AI 若漏這些，自檢清單會抓到並回頭補。
