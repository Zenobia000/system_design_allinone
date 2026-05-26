---
title: "ADR · 架構決策紀錄"
slug: "adr"
stage: "design"
roles: ["architect"]
order: 23
hook: "把「為什麼這樣選」寫下來，半年後不用考古"
when_to_use: "跨服務影響、不可逆決策、有 ≥ 2 個合理選項時"
ai_leverage: "用 Claude 從技術討論紀錄 → ADR 草稿（option / trade-off / consequence）"
art: "/generated/key-deliverable-adr.webp"
source: "deep-research-report.md §可複製範本 / §關鍵決策節點"
---

## 解決什麼問題

半年後新人問「為什麼用 Kafka 不用 RabbitMQ？」沒人記得；老人離職後決策的脈絡全失。
ADR 把每個重要架構決策寫成**短文件**：context / options / decision / consequences。
沒有 ADR，後人要嘛盲目沿用、要嘛盲目重做，兩種都有成本。

## 誰負責、和誰對接

- **主責：** Architect（最終決策與簽核）
- **協作：** Dev Lead（驗證可實作）、SRE（驗證可營運）、SA（補規格脈絡）
- **下游收件：** 全工程團隊（決策可追溯）、新人 onboarding

## 何時用、何時不用

- ✅ **必要時機：** 跨服務影響、不可逆決策（DB、framework、protocol）、有 ≥ 2 合理選項
- ❌ **不需要時：** 局部模組設計、可逆的小決策、純風格選擇
- ⚠️ **常見誤用：** 把 ADR 當作技術說明書（要寫 trade-off，不寫 how-to）；Status 字段不維護（Superseded 不標）

## AI 怎麼加速

把技術討論紀錄 + 相關 NFR / 約束 + 上游 PRD / C4 / API spec 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 trade-off**。本卡輸出**真實 ADR markdown 文件**（每張卡片 = 一個原子決策，編號 ADR-NNN），含表格、inline `[H/M/L]` confidence badge，**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給 solo / spike / 可逆決策用，**完整範本** 給跨服務 / 不可逆 / 合規場景用。ADR 是**原子文件** — 一個決策一張 ADR，超過一個決策應拆多份。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "adr"
variant: "light"
status: "proposed"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["technical-discussion-notes"]
  optional: ["prd", "c4-diagram", "nfr"]
---

# ADR-NNN: <短描述決策題目>

**Status:** Proposed · **Owner:** <Architect name> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 6, 10, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每結論行內加 `（依據：discussion §XXX）`；每量化欄位加 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造選項；ADR 是**單一決策原子文件**，若 input 含多個決策必須拆多份輸出。

---

## 1. Context

<!-- ai-fill: 3-5 行說明當前問題、約束、為何現在需要決策 -->

<3-5 行說明當前面對的問題與約束>

> **TL;DR:** <一句話：為何需要這個決策>

---

## 2. Decision Drivers

<!-- ai-rule: 至少列 3 個 driver，每個帶權重原因。輕量版可省略 5 象限要求 -->

| Driver | Weight | Why this matters |
|---|---|---|
| <e.g. Time-to-market> | High | <為何此優先> |
| <e.g. Operability> | Medium | ... |

---

## 3. Options Considered

<!-- ai-rule: ≥ 2 個選項（含「保持現狀」或「不做」），每個都要 pros/cons 至少各 1 -->

### Option A: <name>

- **Pros:** <好處 1>、<好處 2>
- **Cons:** <代價 1>、<代價 2>
- **Cost:** <一次性 + 經常性>

### Option B: <name>

...

---

## 6. Decision & Consequences

### Chosen: **Option A** · **[H]**

- **Scope:** <適用範圍 / 不適用範圍>
- **Positive consequences:** <好處>
- **Negative consequences（必填）:** <代價，例：選 Kafka 需新增 KRaft 維運負擔>
- **Follow-up:** <後續需處理事項>

---

## 10. Decision Log

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected option + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <本 ADR 主題> | A / B | A | B (成本 > 收益) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的資料：benchmark / spike / interview>

### TODO（缺資料）

- _TODO: 需要 spike 驗證 Option A 在 X scale 下的可用性_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 6, 10, 12，刻意不連號）
> - [ ] Options ≥ 2 個，每個含 pros + cons
> - [ ] Decision 段含 negative consequences（必填）
> - [ ] 每個 chosen 帶 inline `[H/M/L]` badge
> - [ ] Decision Log ≥ 1 條，每條有 rejected reason
> - [ ] 單一決策原子文件（input 含多決策應拆多份）
> - [ ] 無 YAML / JSON schema 輸出（ADR 是給人讀的 markdown）
```

```template-full
---
doc_type: "adr"
variant: "full"
status: "proposed"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["technical-discussion-notes", "nfr"]
  optional: ["prd", "c4-diagram", "api-spec"]
---

# ADR-NNN: <短描述決策題目>

**Status:** Proposed · **Owner:** <Architect name> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev Lead / SRE

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。ADR 是**單一決策原子文件**，input 含多個決策必須拆多份輸出。每結論行內 `（依據：discussion §XXX / NFR §YYY / ADR-NNN）`；每量化欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造選項；Decision Drivers 必須涵蓋 reliability / time-to-market / cost / security / operability 五象限；Options Considered ≥ 3 個（含「不做」或「保持現狀」）；禁 YAML/JSON schema 輸出。

---

## 1. Context
<!-- owner: Architect · required: always -->

<!-- ai-fill: 3-5 行說明當前問題、約束、為何現在需要決策 -->

<3-5 行說明：當前問題、相關 NFR/約束、為何現在需要決策>

> **TL;DR:** <一句話：為何需要這個決策>

---

## 2. Decision Drivers
<!-- owner: Architect · required: always -->

<!-- ai-rule: 五象限全填（reliability / time-to-market / cost / security / operability）。任一不適用須在 Why 寫明為何不適用，不能直接砍 -->

| Driver | Weight | Why this matters | Confidence |
|---|---|---|---|
| **Reliability** | <H/M/L> | <為何此優先> | **[H]** |
| **Time-to-market** | <H/M/L> | ... | **[H]** |
| **Cost** | <H/M/L> | ... | **[M]** |
| **Security** | <H/M/L> | ... | **[H]** |
| **Operability** | <H/M/L> | ... | **[M]** |

---

## 3. Options Considered
<!-- owner: Architect + Dev Lead · required: always -->

<!-- ai-rule: ≥ 3 個選項（含「保持現狀」或「不做」），每個必含 pros / cons / cost / 最大風險 -->

### Option A: <name>

- **Pros:** <好處 1>、<好處 2>
- **Cons:** <代價 1>、<代價 2>
- **Cost:** <一次性 + 經常性>
- **Biggest risk:** <最大風險>
- **Source:** <input ref>

### Option B: <name>

...

### Option C: <name (或「保持現狀」)>

...

---

## 4. Trade-off Analysis
<!-- owner: Architect · required: full-only -->

<!-- ai-rule: 把 Options 對映到 Decision Drivers，明示哪個 driver 偏向哪個 option -->

| Driver | Option A | Option B | Option C |
|---|---|---|---|
| Reliability | ✅ Strong | ⚠️ Weak | ⚠️ Unknown |
| Time-to-market | ⚠️ Slow | ✅ Fast | ✅ Fast |
| Cost | ⚠️ High one-off | ✅ Low | ✅ Low |
| Security | ✅ Strong | ⚠️ Moderate | ⚠️ Weak |
| Operability | ⚠️ New runtime | ✅ Familiar | ✅ Familiar |

---

## 5. Constraints & Assumptions
<!-- owner: Architect · required: full-only -->

<!-- ai-rule: 列出限制條件（latency / cost ceiling / compliance）與你推導但 input 沒明說的假設 -->

### Constraints

- <e.g. p95 < 200ms（依據 NFR-3）>
- <e.g. cost ceiling $5k/month>

### Assumptions（input 未明說，但推導所需）

- <e.g. 假設目標 traffic < 1k rps>
- <e.g. 假設 vendor lock-in 可接受 24 個月>

---

## 6. Decision & Consequences
<!-- owner: Architect · required: always -->

### Chosen: **Option A** · **[H]**

- **Scope:** <適用範圍 / 不適用範圍>
- **Positive consequences:** <好處>
- **Negative consequences（必填）:** <代價，例：選 Kafka 需新增 KRaft 維運負擔>
- **Follow-up actions:**
  - [ ] <後續需處理事項 1>
  - [ ] <後續需處理事項 2>

---

## 7. Status & Lifecycle
<!-- owner: Architect · required: full-only -->

- **Current:** Proposed / Accepted / Superseded / Deprecated
- **Supersedes:** <ADR-XXX | none>
- **Superseded by:** <ADR-YYY | null>
- **Review trigger:** <e.g. 12 個月後 or scale 10x 時重審>

---

## 8. Links & Cross-references
<!-- owner: Architect · required: full-only -->

| Type | Reference |
|---|---|
| Related PRD | <link> |
| Related C4 | <link> |
| Related API spec | <link> |
| Related NFR | <link> |
| Related ADRs | ADR-XXX, ADR-YYY |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <失效模式> — **Mitigation:** <如何降低> — **Owner:** <誰負責>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <尚未解的問題，需誰回答>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Architect · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason，否則不算 audit-ready -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | <本 ADR 主題> | A / B / C | A | B (成本 > 收益)、C (operability 不足) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Architect · required: full-only -->

本 ADR **不處理**：

- ❌ **不畫架構圖** — 屬 c4-diagram 卡
- ❌ **不出 API 契約** — 屬 api-spec 卡
- ❌ **不寫資料 schema** — 屬 data-model 卡
- ❌ **不寫 capacity plan** — 屬 capacity 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <下一份最該補的：benchmark / spike / vendor RFP 回應>

### TODO（缺資料）

- _TODO: 需要 2 週 spike 驗證 Option A 在 1k rps 下的尾延遲_
- _TODO: 需要 vendor 提供 SLA 條款書面確認_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 單一決策原子文件（input 含多決策應拆多份）
> - [ ] Decision Drivers 五象限全填（reliability / time-to-market / cost / security / operability）
> - [ ] Options Considered ≥ 3 個（含「不做」或「保持現狀」）
> - [ ] 每個 Option 含 pros / cons / cost / biggest risk
> - [ ] Decision 段含 negative consequences（必填）
> - [ ] Trade-off Analysis 把 Options 對映五個 driver
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（ADR 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 ADR markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。若 input 含多個獨立決策，請拆成多份 ADR-NNN 分別輸出。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼技術討論紀錄 / NFR / PRD / 既有 C4 / API spec 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 一份 ADR 塞多個決策（拆原子！）、Options 只列「我們選的那個」（要列被拒選項 + 拒因）、Decision 段沒寫 negative consequence（= 不誠實 trade-off）、Status 字段不維護（Superseded 不標 = 後人考古地獄）、Decision Drivers 砍掉 security / operability 沒寫 Rationale。AI 若漏這些，自檢清單會抓到並回頭補。
