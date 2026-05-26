---
title: "Tech Spike · 技術探索"
slug: "tech-spike"
stage: "design"
roles: ["architect", "dev"]
order: 28
hook: "用最小成本買回最大不確定性"
when_to_use: "有技術假設無法靠紙上分析證實，且決策延後比做錯更貴時"
ai_leverage: "用 Claude 收斂候選方案到 2-3 個 + 列出對應實驗變數"
art: "/generated/stage-design.webp"
source: "software_architect/ppt/05-ilities, deep-research-report.md §Architecture Design"
---

## 解決什麼問題

ADR 寫不下去，因為關鍵變數沒人量過。Spike 是時間盒住的實驗，只為了輸出「決策所需的數字或失敗證據」，不是寫產品代碼。

## 誰負責、和誰對接

- **主責：** Architect 或資深 Dev
- **協作：** SA 對齊問題定義、DevOps 提供環境
- **下游收件：** ADR 撰寫者、Dev Lead

## 何時用、何時不用

- ✅ **必要時機：** 跨系統整合風險、效能假設、第三方 SDK 邊界
- ❌ **不需要時：** 答案線上搜尋 30 分鐘可得、團隊已有經驗
- ⚠️ **常見誤用：** Spike 變成偷渡正式功能；沒有時間盒；產出 demo 而非結論

## AI 怎麼加速

把問題陳述 + 約束 + 候選方案來源整份丟給 agent，讓 agent 讀範本內 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審 time-box 是否硬截止與 exit criteria 是否布林**。本卡輸出**真實 tech spike plan markdown**（含候選方案表、evaluation 指標、experimental variables、inline `[H/M/L]` confidence badge），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份 spike 契約的兩種版本：**輕量範本** 給單一變數驗證、time-box ≤ 3 person-days 的快速 spike，**完整範本** 給跨候選方案 benchmark、時長 ≥ 5 person-days、需 ADR 後續決策的場景。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "tech-spike"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["problem-statement", "constraints"]
  optional: ["candidate-source"]
---

# Tech Spike Plan: <spike-name>

**Status:** Draft v0.X · **Owner:** <Architect / Senior Dev> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 5, 6, 10, 12），全部必填——刻意沿用完整版章節編號讓兩版可對照。Spike goal 必為「決策問題」非「實作問題」；exit criteria **必為布林條件**（如「p95 < 200ms 且 cost < $X/月」）不能寫「感覺夠快」；time-box 必含 hard_stop 日期；缺資料寫 `_TODO_` **不編造 benchmark 數字**；每量化欄位 `[H/M/L]` badge。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行：決策問題、候選方案數、time-box、為何延後決策更貴 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 spike 要在 N person-days 內回答什麼決策問題>

---

## 2. Spike Goal & Hypothesis

<!-- ai-rule: goal 必為一句話決策問題；hypothesis 必為可被推翻的形式 + null hypothesis -->

- **Decision question:** <例：Kafka 在我們的 throughput / latency / cost 條件下是否優於 RabbitMQ>
- **Decision owner:** <role>
- **Primary hypothesis:** <主要假設，可被推翻>
- **Null hypothesis:** <反例：若 X 則 Kafka 不優>
- **Confidence:** **[M]** — **Source:** problem §1

---

## 5. Candidate Options & Evaluation Criteria

<!-- ai-rule: ≤ 3 個候選（含「維持現狀」如適用）；evaluation 指標必含至少 1 個 NFR (latency / throughput / availability / cost) -->

### Candidates

| Option | Core assumption | Expected failure mode | Setup cost |
|---|---|---|---|
| A: Kafka | 高 throughput 可處理 burst | ops 複雜度高 | 1.5 day |
| B: RabbitMQ | 既有經驗 + 操作簡單 | throughput 上限可能不夠 | 0.5 day |
| C: 維持現狀 | 不引入新依賴 | 業務需求被卡 | 0 |

### Evaluation criteria

| Metric | Target | Measurement |
|---|---|---|
| p95 latency | < 200ms | k6 / wrk 模擬 |
| cost / million msg | < $X | vendor pricing + 自管 ops 估 |

---

## 6. Time-box & Exit Criteria

<!-- ai-rule: time-box 必含硬截止日；exit criteria 必為布林條件 -->

- **Duration:** 3 person-days
- **Hard stop:** YYYY-MM-DD（**不可延**）
- **Exit (success):** 所有候選跑完 + 至少 1 個達 evaluation 全部 target
- **Exit (abort):** time-box 到 / 第三方 SDK 不可用 / 主要假設已被推翻

---

## 10. Decision Log（key 2-3 條）

<!-- ai-rule: 每條必含 chosen + 至少 1 個 rejected + 拒絕原因 -->

| Date | Decision | Options | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 候選清單範圍 | A+B+C / A+B / A+B+NATS | A+B+C | NATS (社群討論不足，跨第三方學習成本) | **[H]** |

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions：**
  - <例：假設 staging 環境 ≈ production 規格>
- **Highest-value next input:** <例：production 流量 sample / vendor pricing 確認>

### TODO（缺資料）

- _TODO: 需 DevOps 提供 staging 環境配置_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 5, 6, 10, 12）
> - [ ] Spike goal 是「決策問題」非「實作問題」
> - [ ] Hypothesis 含 primary + null（可被推翻形式）
> - [ ] 候選 ≤ 3 個，每個含 core assumption + failure mode
> - [ ] Evaluation 至少 1 個 NFR metric
> - [ ] Exit criteria 是**布林條件**（沒「感覺夠快」這類詞）
> - [ ] Time-box 含 hard_stop 日期
> - [ ] 沒編造 benchmark 數字（缺者 `_TODO_`）
> - [ ] 無 YAML / JSON schema 輸出（spike plan 是給人讀的 markdown）
```

```template-full
---
doc_type: "tech-spike"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["problem-statement", "constraints", "nfr"]
  optional: ["candidate-source", "existing-poc", "vendor-doc"]
---

# Tech Spike Plan: <spike-name>

**Status:** Draft v0.X · **Owner:** <Architect / Staff Eng> · **Last updated:** YYYY-MM-DD · **Reviewers:** SA / Dev Lead / DevOps

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。Spike goal **必為「決策問題」非「實作問題」**；hypothesis 必為可被推翻形式 + null hypothesis；候選 ≤ 3 個；evaluation 至少 1 個 NFR (latency / throughput / availability / cost) 可量測 SLO；**exit criteria 必為布林條件**（「感覺夠快」= 直接 reject）；time-box 必含 hard_stop；缺資料 `_TODO_` **不編造 benchmark 數字**；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Architect · required: always -->

<!-- ai-fill: 3-5 行：決策問題、候選數、time-box、為何延後決策更貴 (business impact)、下游 ADR 對接 -->

<3-5 行說明>

> **TL;DR:** <一句話：本 spike 要在 N person-days 內回答什麼決策問題>

---

## 2. Spike Goal & Business Impact
<!-- owner: Architect + PM · required: always -->

- **Decision question:** <一句話決策問題，例：Kafka vs RabbitMQ vs NATS 在我們的 throughput / latency / cost 條件下哪個合適>
- **Decision owner:** <role>
- **Why delay is expensive:** <延後決策的 business impact>
- **Confidence:** **[M]** — **Source:** problem §1

---

## 3. Hypothesis
<!-- owner: Architect · required: always -->

<!-- ai-rule: 必含 primary + null；primary 必為可被推翻形式 -->

- **Primary hypothesis:** <主要假設，例：「Kafka 在 5k msg/s throughput 下 p95 latency < 200ms 且 cost < $X/月」>
- **Null hypothesis:** <反例：若 cost > $X 或 latency > 300ms 則 Kafka 不優於 RabbitMQ>
- **Confidence:** **[M]** — **Source:** community §2 + vendor §3

---

## 4. Candidate Options
<!-- owner: Architect · required: always -->

<!-- ai-rule: ≤ 3 個候選（含「不做 / 維持現狀」如適用）；每個含 core_assumption + expected_failure_mode + setup_cost -->

| Option | Core assumption | Expected failure mode | Setup cost | Source |
|---|---|---|---|---|
| A: Kafka | 高 throughput 可處理 burst | ops 複雜度高 / consumer lag | 1.5 day | community §2 |
| B: RabbitMQ | 既有經驗 + 操作簡單 | throughput 上限可能不夠 | 0.5 day | internal §1 |
| C: 維持現狀（DB queue table） | 不引入新依賴 | 業務需求被卡 | 0 | — |

---

## 5. Evaluation Criteria
<!-- owner: Architect + Dev Lead · required: always -->

<!-- ai-rule: 至少 1 個 NFR metric（latency / throughput / availability / cost）+ measurement how -->

| Metric | Target | Measurement | Confidence |
|---|---|---|---|
| p95 latency | < 200ms @ 5k msg/s | k6 / wrk 模擬 | **[H]** |
| throughput sustain | ≥ 5k msg/s × 30 min | load gen | **[H]** |
| cost / million msg | < $X | vendor pricing + ops 估 | **[M]** |
| availability under broker fail | recovery < 30s | chaos test | **[M]** |

---

## 6. Experimental Variables
<!-- owner: Architect · required: full-only -->

<!-- ai-rule: 3 類齊（independent / dependent / controlled） -->

- **Independent:** broker (Kafka / RabbitMQ / DB) · batch size · partition count
- **Dependent:** p95 latency · throughput · cost · recovery time
- **Controlled:** hardware (staging 4vCPU 8GB) · payload size (1KB) · network (same VPC)

---

## 7. Time-box
<!-- owner: Architect · required: always -->

<!-- ai-rule: 必含 duration + hard_stop + rationale -->

- **Duration:** 5 person-days
- **Hard stop:** YYYY-MM-DD（**不可延，到日強制 abort**）
- **Rationale:** <為何 5 天而非 10 天>

---

## 8. Exit Criteria
<!-- owner: Architect · required: always -->

<!-- ai-rule: 必為布林條件；不能寫「感覺夠快」 -->

### Success

> 所有候選跑完 evaluation 全部 metric AND 至少 1 個候選達 all targets AND cost 估算 confidence ≥ M

### Abort

> time-box hard_stop 到 OR 主要假設已被 5 個候選同時推翻 OR 第三方 SDK 不可用

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

> **R1:** <例：staging 環境配置與 production 不一致，benchmark 失真> — **Mitigation:** DevOps 配對 production 規格 — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：是否需測 multi-region failover？>

---

## 10. Decision Log
<!-- owner: Architect · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 候選清單範圍 | A+B+C / A+B+NATS / A+B | A+B+C | NATS (社群討論不足、跨第三方學習成本)、A+B (沒 baseline) | **[H]** |
| YYYY-MM-DD | benchmark 環境 | staging / prod-shadow / local | staging | prod-shadow (風險高)、local (規格差太多) | **[H]** |

---

## 11. Out of Scope & Follow-up
<!-- owner: Architect · required: full-only -->

### Out of scope

- ❌ **不寫產品 code / UI / 監控儀表板** — 屬正式 sprint
- ❌ **不評估候選清單外的方案** —（除非主要假設被推翻）
- ❌ **不做安全 / 合規深入評估** — 屬 threat-model 卡
- ❌ **不留下 demo 給 stakeholder 看** — spike 輸出是「數字或失敗證據」非 demo

### Follow-up decisions

| Decision | Owner | Due |
|---|---|---|
| 寫 ADR-NNN 採用 chosen option | Architect | spike+3d |
| 更新 NFR 卡的 latency target | PM | spike+7d |

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions：**
  - <例：假設 staging 環境 ≈ production 規格>
  - <例：假設 payload 為 1KB（生產可能差異大）>
- **Highest-value next input:** <production 流量 sample / vendor pricing 確認 / 既有 PoC code>

### TODO（缺資料）

- _TODO: 需 DevOps 提供 staging 環境配置與成本估_
- _TODO: 需 PM 確認 burst peak throughput target_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Spike goal 是「決策問題」非「實作問題」
> - [ ] Hypothesis 含 primary + null（可被推翻形式）
> - [ ] 候選 ≤ 3 個，每個含 core assumption + failure mode + setup cost
> - [ ] Evaluation 至少 1 個 NFR metric + measurement how
> - [ ] Experimental variables 含 independent / dependent / controlled 三類
> - [ ] Time-box 含 hard_stop + rationale
> - [ ] Exit criteria 是**布林條件**（**沒有**「感覺夠快」這類詞）
> - [ ] Follow-up decisions 對應 ADR 撰寫
> - [ ] 沒編造 benchmark 數字（缺者 `_TODO_`）
> - [ ] Decision Log 每條 ≥ 2 個 rejected + 各自 reason
> - [ ] 無 YAML / JSON schema 輸出（spike plan 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 tech spike plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 問題陳述 + 為何延後決策更貴 / 約束 (NFR / cost / time-box / 既有 stack) / 候選方案來源 全文）
⏫
```

> [!TIP]
> **常見錯誤：** Spike 變成偷渡正式功能（產出 demo 而非結論）、exit criteria 寫「感覺夠快」（必須布林）、沒設 hard_stop 變成無限延期、評估候選超過 3 個（變漫無目的的研究）、編造未量測的 benchmark 數字、Decision Log 沒寫為何排除 NATS / NATS-like 方案（= 黑箱）。AI 若漏這些，自檢清單會抓到並回頭補。
