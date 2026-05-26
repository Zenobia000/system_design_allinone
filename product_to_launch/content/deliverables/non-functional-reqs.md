---
title: "非功能需求 · NFR"
slug: "non-functional-reqs"
stage: "design"
roles: ["architect", "sa"]
order: 30
hook: "把『要很快、要很穩』改寫成可驗收的數字"
when_to_use: "功能規格已寫，但延遲、容量、可用性、安全還只是形容詞"
ai_leverage: "用 Claude 把 PRD 形容詞轉成 SLI/SLO/threshold 候選"
art: "/generated/stage-design.webp"
source: "software_architect/ppt/05-ilities, ISO/IEC/IEEE 29148"
---

## 解決什麼問題

功能對了不代表上線後能活。NFR 把效能、可靠性、安全、可維運、合規寫成可量測條件，是 ADR 與 Capacity Plan 的輸入。

## 誰負責、和誰對接

- **主責：** Architect + SA
- **協作：** PM 對齊 business impact、SRE 對齊可達成性
- **下游收件：** Dev、QA、DevOps

## 何時用、何時不用

- ✅ **必要時機：** 新服務上線、SLA 對外承諾、跨系統依賴
- ❌ **不需要時：** 一次性工具、無使用者依賴
- ⚠️ **常見誤用：** 抄業界數字無證據；NFR 沒有對應測試與監控

## AI 怎麼加速

把 PRD（含模糊承諾如「要很快」「要很穩」）+ business impact / SLA 對外承諾 + 既有平台基線整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off 與閾值合理性**。本卡輸出**真實 NFR markdown 文件**（含 SLI/SLO 表格、合規對應表、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給 MVP / 內部工具 / 無合規負擔場景用，**完整範本** 給 SLA 對外承諾 / 跨系統依賴 / 合規稽核場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "non-functional-reqs"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd"]
  optional: ["platform-baseline", "competitive-baseline"]
---

# Non-Functional Requirements: <system-name>

**Status:** Draft · **Owner:** <Architect/SA> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 4, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每條 NFR 行內加 `（依據：prd §XXX）`；每量化欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` **不抄業界數字**（例：別寫「99.99% 因為大家都這樣寫」）；每條 NFR 必含可量測 SLI + 目標 SLO + 量測方法（缺一不可）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行說明範圍、SLA 對外承諾與否、目前最不確定的閾值 -->

<3-5 行說明>

> **TL;DR:** <一句話：哪幾個維度是 hard target、哪幾個是 best-effort>

---

## 2. Core NFR Matrix

<!-- ai-rule: 至少 4 象限（latency / availability / security / a11y）。每條含 SLI + SLO + 量測方法 -->

| Dimension | SLI | SLO target | Measurement | Confidence |
|---|---|---|---|---|
| **Latency** | API p95 | < Xms | <e.g. RUM + synthetic> | **[H]** |
| **Availability** | uptime | 99.X% rolling 28-day | <SLI 定義> | **[M]** |
| **Security** | data class | PII encrypted at-rest | <稽核方式> | **[H]** |
| **A11y** | WCAG 2.2 AA | <scope> | <e.g. axe-core CI> | **[H]** |

---

## 4. Compliance（核心）

<!-- ai-rule: 列出本系統涉及的合規條目，N/A 必須說明為何不適用 -->

| Regime | Applicable | Notes |
|---|---|---|
| GDPR | ✅ / ❌ | <若 ✅：列關鍵條款 + 對應控制> |
| SOC 2 | ✅ / ❌ | <若 ❌：不對外提供 SaaS> |
| PCI DSS | ✅ / ❌ | <若 ❌：不處理卡號> |

---

## 10. Decision Log

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Availability SLO | 99.9% / 99.95% / 99.99% | 99.9% | 99.95% (cost +50%)、99.99% (需 multi-region) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1：例：假設無 HIPAA 負擔>
- **Highest-value next input:** <下一份最該補的：實際 traffic profile / 競品 baseline>

### TODO（缺資料）

- _TODO: 需要實際 traffic profile 校準 latency p99 threshold_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 4, 10, 12，刻意不連號）
> - [ ] Core NFR Matrix 至少 4 象限（latency / availability / security / a11y）
> - [ ] 每條 NFR 含 SLI + SLO + Measurement
> - [ ] 沒有任何 threshold 抄業界數字（每筆都有 source 或 _TODO_）
> - [ ] Compliance 不適用項有說明為何不適用
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 無 YAML / JSON schema 輸出（NFR 是給人讀的 markdown）
```

```template-full
---
doc_type: "non-functional-reqs"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["prd", "business-impact", "sla-commitments"]
  optional: ["platform-baseline", "competitive-baseline", "existing-nfr"]
---

# Non-Functional Requirements: <system-name>

**Status:** Draft · **Owner:** <Architect/SA> · **Last updated:** YYYY-MM-DD · **Reviewers:** SRE / Security / Compliance / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。每條 NFR 行內 `（依據：prd §XXX / sla §YYY）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` **不抄業界數字**；每條 NFR 必含可量測 SLI + 目標 SLO + 量測方法 + 測試方式（缺一不可）；合規必須涵蓋 GDPR / SOC 2 / PCI / HIPAA / ISO 27001 / WCAG 2.2 AA（任一不適用要說明原因）；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Architect · required: always -->

<!-- ai-fill: 3-5 行說明範圍、對外 SLA 承諾、目前最不確定的閾值 -->

<3-5 行說明>

> **TL;DR:** <一句話：系統的硬目標 + 最大不確定性>

---

## 2. Latency Targets
<!-- owner: Architect + SRE · required: always -->

<!-- ai-rule: API p50/p95/p99 + page-load p75（Core Web Vitals）；每條含為何此值 + 量測方法 -->

| Metric | Target | Rationale | Measurement | Confidence |
|---|---|---|---|---|
| API p50 | < Xms | <對應 user-perceived snappy> | RUM | **[H]** |
| API p95 | < Yms | <對應 JTBD success criteria> | RUM | **[H]** |
| API p99 | < Zms | <尾延遲容忍> | RUM | **[M]** |
| Page load (LCP) p75 | < 2.5s | Core Web Vitals "good" | RUM + Lighthouse CI | **[H]** |

---

## 3. Availability & Error Budget
<!-- owner: SRE · required: always -->

<!-- ai-rule: SLO target + error budget derivation + scope（哪些 endpoint / journey 算入）-->

| Field | Value |
|---|---|
| **Target** | 99.9% rolling 28-day |
| **Error budget** | 0.1% × 28d × 24h = 40 min / 28d |
| **Scope** | 主 user journey: signup / login / core-action（admin / batch 不計入） |
| **SLI definition** | `successful_requests / total_requests` where success = HTTP 2xx/3xx OR 4xx with `client_error` class |
| **Confidence** | **[M]** _TODO: 需 SRE 確認 4xx 分類_ |

---

## 4. Compliance Obligations
<!-- owner: Compliance + Architect · required: always -->

<!-- ai-rule: 五大合規象限全填（GDPR / SOC 2 / PCI / HIPAA / ISO 27001）。N/A 必須說明原因 -->

| Regime | Applicable | Key clauses / criteria | Mapped controls |
|---|---|---|---|
| GDPR | ✅ | Art. 17 right-to-erasure, Art. 32 security | data-model.md §7 |
| SOC 2 | ✅ | CC6 (Logical access), CC7 (System operations) | observability + IAM |
| PCI DSS | ✅ (SAQ-A) | Req 3 (data protection) | 不自儲卡號 + tokenization |
| HIPAA | ❌ N/A | 不處理 PHI | — |
| ISO 27001 | ✅ | Annex A.8 (Asset mgmt), A.12 (Ops security) | inventory + change mgmt |

---

## 5. Scalability
<!-- owner: Architect + SRE · required: full-only -->

<!-- ai-rule: baseline + peak + 來源；scale strategy + trade-off 必填 -->

| Field | Value | Source |
|---|---|---|
| **Baseline rps** | <N> | 既有平台 30d 平均 |
| **Peak rps** | <M> | 既有平台 99p + 行銷活動倍數 |
| **Concurrent users** | <K> | <ref> |
| **Scale strategy** | horizontal (stateless API) | ADR-008 |
| **Trade-off** | horizontal scale 需 session externalization；犧牲記憶體區域性 | — |
| **Confidence** | **[M]** | _TODO: 需要實際行銷活動 traffic 樣本_ |

---

## 6. Security Classification
<!-- owner: Security + Architect · required: full-only -->

| Field | Value |
|---|---|
| **Data classes** | PII (email/phone), PCI (token), internal (audit log), public (catalog) |
| **Threat baseline** | threat-model.md ref |
| **Encryption at-rest** | AES-256 column-level (PII), AES-256 full-disk (DB) |
| **Encryption in-transit** | TLS 1.3 minimum, mTLS for service-to-service |
| **Key management** | KMS with quarterly rotation |
| **Confidence** | **[H]** |

---

## 7. Accessibility (a11y)
<!-- owner: UX + Architect · required: full-only -->

| Field | Value |
|---|---|
| **Level** | WCAG 2.2 AA |
| **Scope** | Web (responsive); mobile native 走 platform a11y API |
| **Testing** | axe-core in CI + manual screen reader pass (NVDA + VoiceOver) per release |
| **Known exemptions** | <e.g. 第三方 widget X 不可達 AA，已通知 vendor> |

---

## 8. Observability Requirements
<!-- owner: SRE · required: full-only -->

<!-- ai-rule: metrics (SLI) + logs (retention/class) + traces (sampling) + alerting (burn rate) -->

| Pillar | Requirement |
|---|---|
| **Metrics** | SLI: latency p50/p95/p99, success rate, RPS; exposed via OpenMetrics |
| **Logs** | structured JSON, retention 30d hot + 90d cold, PII redacted at source |
| **Traces** | OpenTelemetry, sampling 10% baseline + 100% error |
| **Alerting** | SLO-based multi-window burn rate (2%/1h + 5%/6h) |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <e.g. p95 < 100ms 需 CDN edge，cost +30%> — **Mitigation:** 從 p95 < 200ms 起 baseline，行銷活動再評估升級 — **Owner:** <Architect>
>
> **R2:** <e.g. 99.95% SLO 需 multi-AZ，operability 負擔大> — **Mitigation:** 維持 99.9% 直到實際 traffic 證明需求 — **Owner:** <SRE>

### Open Questions

- [ ] **Q1:** <例：是否需 multi-region failover？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Architect · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Availability SLO | 99.9% / 99.95% / 99.99% | 99.9% | 99.95% (cost +50%)、99.99% (需 multi-region) | **[H]** |
| YYYY-MM-DD | Latency baseline | aggressive (100ms) / moderate (200ms) | 200ms | 100ms (over-provision 浪費，現有 traffic 不需) | **[M]** |

---

## 11. Out of Scope
<!-- owner: Architect · required: full-only -->

本 NFR **不處理**：

- ❌ **第三方依賴 SLA**（由 vendor management 處理）
- ❌ **災難復原 RPO/RTO**（屬 dr-plan 卡）
- ❌ **客戶端 a11y**（瀏覽器/作業系統層）— 屬 client-platform 邊界
- ❌ **個別功能的 capacity plan** — 屬 capacity-plan 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1：例：假設目標市場無 HIPAA>
  - <假設 2：例：假設僅 web，無 native app>
- **Highest-value next input:** <下一份最該補的：實際 traffic profile / SLA 條款書面 / 競品 benchmark>

### TODO（缺資料）

- _TODO: 需要實際 traffic profile 校準 p99 threshold（目前估算）_
- _TODO: 需要 Compliance 確認 PCI scope（SAQ-A vs SAQ-D）_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Latency 含 p50 / p95 / p99 + page load LCP
> - [ ] Availability 含 SLO target + error budget + scope + SLI definition
> - [ ] Compliance 五象限全填（GDPR / SOC 2 / PCI / HIPAA / ISO 27001）+ N/A 有原因
> - [ ] A11y 含 level + scope + testing 三件
> - [ ] Observability 四 pillar 齊（metrics / logs / traces / alerting）
> - [ ] 每條 NFR 含 SLI + SLO + Measurement + Source
> - [ ] 沒有任何 threshold 抄業界數字（每筆都有 source 或 _TODO_）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（NFR 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 NFR markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。**禁抄業界數字** — 缺資料時寫 `_TODO_` 而非套用通用值。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 prd.md / business-impact / sla-commitments / 既有平台 baseline 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 抄業界數字當 NFR（「99.99% 因為大家都這樣寫」= 黑箱）、Latency 只列 p50 沒列 p99（尾延遲無 budget）、Availability SLO 沒定義 SLI（無法量測）、Compliance 砍 GDPR / SOC 2 沒寫 N/A rationale、Observability 段忽略 alerting（事故時沒人知道）。AI 若漏這些，自檢清單會抓到並回頭補。
