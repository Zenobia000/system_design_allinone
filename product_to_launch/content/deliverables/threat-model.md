---
title: "Threat Model · 威脅建模"
slug: "threat-model"
stage: "design"
roles: ["architect"]
order: 29
hook: "在攻擊者之前先把資料流畫清楚"
when_to_use: "新系統處理 PII、金流、權限邊界，或對外暴露新 API 時"
ai_leverage: "用 Claude 跑 STRIDE 對每個 trust boundary 自動列攻擊面"
art: "/generated/stage-design.webp"
source: "software_architect/ppt/05-ilities §Security, NIST SSDF"
---

## 解決什麼問題

把「我們會被怎麼打」從感覺變成清單。輸出 trust boundary、資產、威脅、緩解措施，餵給 NFR 與 Code Review。

## 誰負責、和誰對接

- **主責：** Architect
- **協作：** Security/Compliance、SA 確認資料分類
- **下游收件：** Dev（防禦實作）、QA（負面測試）

## 何時用、何時不用

- ✅ **必要時機：** 新增外部介面、處理高敏感資料、權限模型變更
- ❌ **不需要時：** 純內部工具、無資料分級提升
- ⚠️ **常見誤用：** 把 OWASP Top 10 抄一份當交付；忽略 trust boundary 圖

## AI 怎麼加速

把 data flow diagram（含 trust boundary）+ assets 清單（PII / 金流 / credential / token）+ 既有 NFR security 章節整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審誇張假設與在地化合規**。本卡輸出**真實 Threat Model markdown 文件**（STRIDE 框架，含 trust boundary 表格、STRIDE per asset 表格、mitigation 表格、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給 PoC / 內部工具 / 單一 trust boundary 場景用，**完整範本** 給對外暴露 / 處理 PII/PCI/PHI / 跨多個 trust boundary / 合規稽核場景用。**威脅建模必用 STRIDE 框架**（Spoofing / Tampering / Repudiation / Information-disclosure / DoS / Elevation-of-Privilege）——抄 OWASP Top 10 當交付不算 threat model。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "threat-model"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["data-flow-diagram", "assets-list"]
  optional: ["nfr-security"]
---

# Threat Model: <system-name>

**Status:** Draft · **Owner:** <Architect/Security> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 5, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。**威脅建模框架 = STRIDE**（不可用 OWASP Top 10 替代）。每個威脅行內加 `（依據：DFD §flow-X / asset §A-N）`；每欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` **不編造攻擊路徑**；輕量版針對 ≤ 2 個 trust boundary + 主要 asset 跑 STRIDE。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行說明範圍、最高風險 asset、最大未緩解 residual risk -->

<3-5 行說明>

> **TL;DR:** <一句話：最高風險路徑 + 對應 mitigation 狀態>

---

## 2. Trust Boundaries & Assets

<!-- ai-rule: 列出主要 trust boundary 與跨越的 asset。輕量版至少 1 個 boundary -->

### Trust Boundaries

| ID | Name | Crosses (assets) | Confidence |
|---|---|---|---|
| TB-1 | internet → API gateway | session token, user PII | **[H]** |
| TB-2 | API → internal DB | credentials, payment token | **[H]** |

### Assets

| ID | Name | Classification | Location |
|---|---|---|---|
| A-1 | user PII (email/phone) | confidential | OLTP DB |
| A-2 | session token (JWT) | confidential | client + signing key in KMS |

---

## 3. STRIDE Analysis（per asset）

<!-- ai-rule: 每個 asset 必跑 STRIDE 六類，不適用要寫 N/A 並說明為何 -->

### A-1: User PII (across TB-1)

| Category | Threat | Feasibility | Confidence |
|---|---|---|---|
| **Spoofing** | 攻擊者冒用 user JWT | M | **[H]** |
| **Tampering** | MITM 修改 request 內容 | L (TLS 1.3) | **[H]** |
| **Repudiation** | user 否認操作（缺 audit log） | M | **[M]** |
| **Info disclosure** | API response 過度暴露欄位 | M | **[H]** |
| **DoS** | 大量 enumeration scrape PII | M | **[M]** |
| **EoP** | low-priv user 透過 IDOR 取他人 PII | H | **[H]** |

---

## 5. Mitigations（核心）

<!-- ai-rule: 每個 mitigation 含 addresses（威脅 ref）+ effectiveness + side_effect -->

| ID | Addresses | Control | Effectiveness | Side effect |
|---|---|---|---|---|
| M-1 | A-1 EoP (IDOR) | row-level access check + tenant_id 強制 | **[H]** | +5ms latency |
| M-2 | A-1 DoS scrape | rate limit per token + WAF rule | **[M]** | 正當用戶可能被誤判 |
| M-3 | A-1 Spoofing | short JWT TTL (15min) + refresh token | **[H]** | UX 摩擦：頻繁 refresh |

---

## 10. Decision Log

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Service-to-service auth | mTLS / JWT / IP allowlist | mTLS | JWT (key 管理)、IP allowlist (cloud IP 漂移) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1：例：假設 token 是 JWT>
- **Highest-value next input:** <下一份最該補的：completed DFD / penetration test report>

### TODO（缺資料）

- _TODO: 需要 Security 確認 KMS rotation 政策_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 5, 10, 12，刻意不連號）
> - [ ] 用 STRIDE 框架（不是 OWASP Top 10 抄一份）
> - [ ] 每個 asset 跑 STRIDE 六類（N/A 須說明）
> - [ ] 每個 mitigation 含 addresses + effectiveness + side_effect
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 沒有編造攻擊路徑（每條威脅有 DFD / asset source）
> - [ ] 無 YAML / JSON schema 輸出（threat model 是給人讀的 markdown）
```

```template-full
---
doc_type: "threat-model"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["data-flow-diagram", "assets-list", "nfr-security"]
  optional: ["compliance-obligations", "existing-threat-baseline"]
---

# Threat Model: <system-name>

**Status:** Draft · **Owner:** <Architect/Security> · **Last updated:** YYYY-MM-DD · **Reviewers:** Security / Compliance / SRE

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。**威脅建模框架 = STRIDE**（Spoofing / Tampering / Repudiation / Information-disclosure / DoS / Elevation-of-Privilege），不可用 OWASP Top 10 抄一份替代；STRIDE 六類每個 asset 都要逐類評估，不適用要寫 N/A 並說明原因。每個威脅行內 `（依據：DFD §flow-X / asset §A-N / nfr §security）`；每欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` **不編造攻擊路徑**；Compliance 必須對應 GDPR / SOC 2 / PCI / HIPAA / ISO 27001（任一不適用要說明）；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Architect/Security · required: always -->

<!-- ai-fill: 3-5 行說明範圍、最高風險 asset、最大未緩解 residual risk、合規對應狀態 -->

<3-5 行說明>

> **TL;DR:** <一句話：最高風險路徑 + mitigation 涵蓋率 + 最大 residual>

---

## 2. Trust Boundaries
<!-- owner: Architect · required: always -->

<!-- ai-rule: 每個 boundary 含跨越的 asset 與資料方向；source 必填 -->

| ID | Name | Crosses (assets) | Direction | Source | Confidence |
|---|---|---|---|---|---|
| TB-1 | Internet → API Gateway | session token, PII | inbound | DFD §flow-1 | **[H]** |
| TB-2 | API → Internal services | service credential | east-west | DFD §flow-3 | **[H]** |
| TB-3 | Service → DB | DB credential, PII payload | east-west | DFD §flow-5 | **[H]** |
| TB-4 | Service → External API (Stripe) | payment token | outbound | DFD §flow-7 | **[H]** |
| TB-5 | DB → backup storage | full PII snapshot | outbound | DFD §flow-9 | **[M]** |

---

## 3. Assets
<!-- owner: Architect + Security · required: always -->

| ID | Name | Classification | Location | Encryption | Source |
|---|---|---|---|---|---|
| A-1 | User PII (email/phone) | confidential | OLTP DB + RUM logs | AES-256 at-rest + TLS 1.3 | nfr §6 |
| A-2 | Session token (JWT) | confidential | client cookie + KMS signing key | TLS 1.3 + signed (RS256) | nfr §6 |
| A-3 | Payment token (tokenized PAN) | restricted (PCI scope) | Order DB | AES-256 + access logged | nfr §6 |
| A-4 | Audit log | internal | log store (90d) | TLS + immutable WORM | nfr §8 |
| A-5 | Service-to-service credential | restricted | KMS + sidecar | mTLS cert | ADR-009 |

---

## 4. Data Flow Diagram Summary
<!-- owner: Architect · required: full-only -->

<!-- ai-rule: 列出主要 flow + 是否跨 trust boundary + 帶哪些 asset -->

| Flow | Path | Crosses TB | Carries assets |
|---|---|---|---|
| flow-1 | Browser → API GW (HTTPS) | TB-1 | A-1, A-2 |
| flow-3 | API GW → Order Service (gRPC) | TB-2 | A-2 (forwarded), A-5 |
| flow-5 | Order Service → OLTP DB (TLS) | TB-3 | A-1, A-3 |
| flow-7 | Payment Service → Stripe (HTTPS) | TB-4 | A-3 |
| flow-9 | DB → S3 backup (KMS-encrypted) | TB-5 | A-1, A-3 |

---

## 5. STRIDE Analysis
<!-- owner: Architect + Security · required: always -->

<!-- ai-rule: 每個 (asset × boundary) 組合跑 STRIDE 六類。N/A 須說明為何不適用 -->

### A-1: User PII across TB-1 (Internet → API GW)

| Category | Threat | Feasibility | Confidence | Source |
|---|---|---|---|---|
| **Spoofing** | 攻擊者用偷來的 JWT 冒用 user | M | **[H]** | DFD §flow-1 |
| **Tampering** | MITM 修改 request body | L (TLS 1.3 + cert pinning) | **[H]** | nfr §6 |
| **Repudiation** | user 否認操作（audit log 不足） | M | **[M]** | _TODO: 確認 audit 完整性_ |
| **Info disclosure** | API response 過度暴露欄位 (over-fetch) | M | **[H]** | api-spec §4 |
| **DoS** | enumerate scrape PII | M | **[M]** | — |
| **EoP** | IDOR 跨 tenant 取 PII | H | **[H]** | api-spec §3 (auth) |

### A-3: Payment token across TB-4 (Service → Stripe)

| Category | Threat | Feasibility | Confidence |
|---|---|---|---|
| Spoofing | 攻擊者冒充我方 service 對 Stripe 發 charge | L (mTLS + API key in KMS) | **[H]** |
| Tampering | webhook payload 偽造 | M (Stripe signed webhook) | **[H]** |
| Repudiation | charge dispute 無證據 | M (Stripe 端負責) | **[M]** |
| Info disclosure | log 誤記原始 PAN | L (tokenized only) | **[H]** |
| DoS | Stripe 端拒服務 | N/A (vendor 責任) | — |
| EoP | 服務帳號權限過大 | M | **[M]** |

### A-2: Session token across TB-1

(略 — 完整版每個 asset 都需評估)

---

## 6. Mitigations
<!-- owner: Architect + Security · required: always -->

<!-- ai-rule: 每個 mitigation 含 addresses + effectiveness + cost + side_effect -->

| ID | Addresses | Control | Effectiveness | One-time cost | Ongoing cost | Side effect | Confidence |
|---|---|---|---|---|---|---|---|
| M-1 | A-1 EoP (IDOR) | row-level access check + tenant_id 強制 | **[H]** | 2w dev | low | +5ms latency | **[H]** |
| M-2 | A-1 DoS scrape | rate limit per token + WAF rule | **[M]** | 1w | medium (FP) | 正當用戶誤判 | **[M]** |
| M-3 | A-1, A-2 Spoofing | short JWT TTL (15min) + refresh + device binding | **[H]** | 2w | low | UX 摩擦 | **[H]** |
| M-4 | A-1 Info disclosure | response schema 白名單 + GraphQL field auth | **[H]** | 3w | low | dev 寫 schema 摩擦 | **[H]** |
| M-5 | A-3 Tampering | Stripe signed webhook verification | **[H]** | 1d | none | — | **[H]** |
| M-6 | A-5 Spoofing | mTLS service-to-service | **[H]** | 4w | high (cert ops) | +10ms handshake | **[H]** |

---

## 7. Residual Risks
<!-- owner: Architect + Security · required: full-only -->

<!-- ai-rule: 列出無法完全緩解的剩餘風險 + accepted_by (role) -->

| Risk | Why residual | Accepted by | Confidence |
|---|---|---|---|
| 內部人員濫用 PII | mTLS 不防內部 SOC2 違規；靠 audit + 最小權限 + DLP | CISO | **[M]** |
| Stripe 端 breach | vendor 責任，我方不可控 | Compliance | **[L]** _TODO: 補 vendor security questionnaire_ |
| Zero-day in TLS lib | best-effort patch + WAF | SRE | **[L]** |

---

## 8. Compliance Mapping
<!-- owner: Compliance · required: always -->

<!-- ai-rule: 五大合規象限全填（GDPR / SOC 2 / PCI / HIPAA / ISO 27001）。N/A 必須說明 -->

| Regime | Applicable | Key clauses | Mapped mitigations |
|---|---|---|---|
| GDPR | ✅ | Art. 32 (security of processing), Art. 33 (breach notification) | M-1, M-3, M-4 |
| SOC 2 | ✅ | CC6.1 (logical access), CC6.6 (encryption), CC7.2 (monitoring) | M-1, M-2, M-3, M-6 |
| PCI DSS | ✅ (SAQ-A) | Req 3 (data protection), Req 4 (encryption in transit), Req 8 (auth) | M-5, M-6 |
| HIPAA | ❌ N/A | 不處理 PHI | — |
| ISO 27001 | ✅ | Annex A.9 (Access control), A.10 (Cryptography) | M-1, M-3, M-6 |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <e.g. JWT signing key 洩漏導致全用戶冒用> — **Mitigation:** KMS-managed key + quarterly rotation + revocation list — **Owner:** <Security>
>
> **R2:** <e.g. 內部員工查詢 PII 缺 audit> — **Mitigation:** DB-level query log + DLP rule — **Owner:** <SRE + Compliance>

### Open Questions

- [ ] **Q1:** <例：是否需 hardware-backed key (HSM)？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Architect · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | Service-to-service auth | mTLS / JWT / IP allowlist | mTLS | JWT (key 管理)、IP allowlist (cloud IP 漂移) | **[H]** |
| YYYY-MM-DD | Webhook 驗證 | signed (HMAC) / mTLS / IP allowlist | signed (Stripe 標配) | mTLS (Stripe 不支援)、IP (Stripe IP 變動) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Architect · required: full-only -->

本 Threat Model **不處理**：

- ❌ **實體安全 / data center physical security** — 雲端 vendor 責任
- ❌ **供應鏈攻擊 / SBOM 審查** — 另開 ADR + SCA tool
- ❌ **社交工程 / phishing** — 屬 Security awareness training
- ❌ **內部員工背景調查** — HR 流程

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1：例：假設 token 是 JWT RS256（input 沒明說 algo）>
  - <假設 2：例：假設 DB 在 VPC 私網（input 沒明說網路 topology）>
- **Highest-value next input:** <下一份最該補的：completed DFD / pen-test report / vendor security questionnaire>

### TODO（缺資料）

- _TODO: 需要 Security 確認 KMS rotation 政策（90 天 vs 365 天）_
- _TODO: 需要 Compliance 確認 PCI scope（SAQ-A vs SAQ-D）_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 用 STRIDE 框架（不是 OWASP Top 10 抄一份）
> - [ ] 每個 (asset × trust boundary) 組合都跑 STRIDE 六類（N/A 須說明）
> - [ ] 每個 mitigation 含 addresses + effectiveness + cost + side_effect
> - [ ] Residual Risks 段列出無法完全緩解 + accepted_by role
> - [ ] Compliance Mapping 五象限全填（GDPR / SOC 2 / PCI / HIPAA / ISO 27001）+ N/A 有原因
> - [ ] 沒有編造攻擊路徑（每條威脅有 DFD / asset / nfr source）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（threat model 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Threat Model markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。**必用 STRIDE 框架** — 不可用 OWASP Top 10 抄一份替代。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 data-flow-diagram / assets 清單 (PII/金流/credential/token) / 既有 NFR security 章節 / 合規承諾 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 抄 OWASP Top 10 當交付（= 不是 threat model）、忽略 trust boundary 圖（沒邊界就沒攻擊面）、STRIDE 六類偷懶只跑 2-3 類（漏 Repudiation / EoP）、Mitigation 沒寫 side effect（看似免費實則 +20ms latency）、Residual Risks 假裝沒有（誠實列才能 accept by RACI）、Compliance 砍 PCI / HIPAA 沒寫 N/A rationale。AI 若漏這些，自檢清單會抓到並回頭補。
