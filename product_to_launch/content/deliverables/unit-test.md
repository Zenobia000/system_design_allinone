---
title: "Unit Test · 單元測試"
slug: "unit-test"
stage: "build"
roles: ["dev", "qa"]
order: 34
hook: "讓重構不再靠賭"
when_to_use: "邏輯有分支、邊界條件、或會被其他模組依賴時"
ai_leverage: "用 Claude 從函數簽名生成 edge case 矩陣"
art: "/generated/stage-build.webp"
source: "deep-research-report.md §Implementation, §Verification"
---

## 解決什麼問題

Unit Test 真正的價值不是「測對了」，是「敢改」。沒測試的程式碼就是凍住的。覆蓋率是副產品，可重構性才是目標。

## 誰負責、和誰對接

- **主責：** Dev 寫測試與被測對象
- **協作：** QA 對齊 acceptance、SD 對齊錯誤模型
- **下游收件：** CI、Integration Test、Refactor 安全網

## 何時用、何時不用

- ✅ **必要時機：** 業務規則、狀態機、資料轉換、價格/權限計算
- ❌ **不需要時：** 純 wiring code、setter/getter、UI snapshot
- ⚠️ **常見誤用：** 為覆蓋率測 mock、把 unit 寫成 integration

## AI 怎麼加速

把函數簽名 + spec + 既有 coverage 整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己生 edge case 矩陣，**人工只審 mock 邊界與 coverage 目標**。本卡輸出**真實 Unit Test plan markdown 文件**（含 target 表、6 類 case、mocking strategy、mutation score），**不出 YAML schema**。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給單函數 / 模組 / spike 場景用，**完整範本** 給核心業務邏輯 / 狀態機 / 高被依賴模組場景用。範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

```template-light
---
doc_type: "unit-test"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["function-signature", "spec"]
  optional: ["existing-coverage"]
---

# Unit Test Plan: <module-or-function-name>

**Status:** Draft v0.X · **Owner:** <Dev> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 6 段（編號 1, 2, 3, 4, 9, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每 test case 行內加 `（依據：spec §X / signature 推導）`；每 case 帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造；**輕量版至少覆蓋 happy + boundary + error 三類**；不測 wiring code / setter / getter；不 mock 同 module 內 pure function。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行，Dev 30 秒讀完。內容：N 個 target、N 個 test case、覆蓋哪些 case 類別 -->

<3-5 行說明>

> **TL;DR:** <一句話：這份 plan 解什麼重構恐懼>

---

## 2. Targets

<!-- ai-rule: kind + name + signature + public_api 四件齊 -->

| Kind | Name | Signature | Public API | Confidence |
|---|---|---|---|---|
| function | `<fqn>` | `(input: T) => R` | true | **[H]** |

---

## 3. Test Cases（3 categories minimum）

<!-- ai-rule: 至少 happy / boundary / error 三類，每條附 input / expected / edge_rationale -->

### TC-001 · Category **happy** · **[H]**

- **Target:** `<fqn>`
- **Input:** `<inline value>`
- **Expected:** `<value 或 exception>`
- **Edge rationale:** 標準路徑
- **Source:** spec §XX

### TC-002 · Category **boundary** · **[H]**

- **Target:** `<fqn>`
- **Input:** `<邊界值，例：max int>`
- **Expected:** `<value>`
- **Edge rationale:** 邊界條件

### TC-003 · Category **error** · **[H]**

- **Target:** `<fqn>`
- **Input:** `<無效 input>`
- **Expected:** `throw ValidationError`
- **Edge rationale:** 錯誤路徑

---

## 4. Mocking Strategy

<!-- ai-rule: mock / do_not_mock + rationale。預設不 mock 同 module pure function -->

| Action | Items | Rationale |
|---|---|---|
| **Mock** | external IO / time / random / network | 不可控 |
| **Do not mock** | same-module pure function / value object | 同邏輯邊界 |

---

## 9. Risks（top 3）

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <風險描述> — **Mitigation:** <如何降低> — **Owner:** <誰負責>
>
> **R2:** ...
>
> **R3:** ...

---

## 12. Confidence & Sources & TODO

- **整份 plan 最低 confidence 項：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1>
- **Highest-value next input:** <下一份最該補的 spec 細節 / production error log>

### TODO（缺資料）

- _TODO: spec 沒寫錯誤訊息文案，TC-003 expected 待補_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 6 段 H2 章節齊全（編號 1, 2, 3, 4, 9, 12，刻意不連號）
> - [ ] 至少覆蓋 happy + boundary + error 三類
> - [ ] 每個 test case 帶 inline `[H/M/L]` badge + source
> - [ ] Mocking Strategy 含 do_not_mock 並寫 rationale
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（plan 是給人讀的 markdown）
```

```template-full
---
doc_type: "unit-test"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["function-signature", "spec", "existing-coverage"]
  optional: ["production-error-log", "mutation-report"]
---

# Unit Test Plan: <module-or-function-name>

**Status:** Draft v0.X · **Owner:** <Dev> · **Last updated:** YYYY-MM-DD · **Reviewers:** Dev / QA / SD

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。對標 Stryker / PIT / property-based testing 實踐。每 test case 行內 `（依據：spec §X / signature 推導 / error log §Y）`；每量化欄位 `[H/M/L]` badge；缺資料 `_TODO: 需要 XXX_` 不編造；**必須涵蓋 6 類 case：happy / boundary / error / null_empty / concurrency（若 stateful）/ idempotency（若有副作用）**；不測 wiring code / setter / getter；不 mock 同 module 內 pure function；coverage 目標必須附 rationale 不能隨便填 80；禁 YAML/JSON schema 輸出。

---

## 1. Executive Summary
<!-- owner: Dev · required: always -->

<!-- ai-fill: 3-5 行：N 個 target、N 個 test case、6 類覆蓋狀況、mutation kill 目標、最高風險分支點 -->

<3-5 行說明>

> **TL;DR:** <一句話：這份 plan 讓哪些 refactor 變安全>

---

## 2. Targets
<!-- owner: Dev · required: always -->

<!-- ai-rule: kind + name + signature + public_api + source 五件齊 -->

| Kind | Name | Signature | Public API | Source | Confidence |
|---|---|---|---|---|---|
| function | `<fqn>` | `(input: T) => R` | true | spec §XX | **[H]** |
| class | `<fqn>` | `<class shape>` | true | spec §YY | **[H]** |

---

## 3. Test Cases（6 categories）
<!-- owner: Dev + QA · required: always -->

<!-- ai-rule: 六類齊：happy / boundary / error / null_empty / concurrency（若 stateful）/ idempotency（若有副作用）。每條附 input / expected / edge_rationale / source / confidence -->

### TC-001 · Category **happy** · **[H]**

- **Target:** `<fqn>`
- **Input:** `<inline value 或 generator>`
- **Expected:** `<value>`
- **Edge rationale:** 標準路徑
- **Source:** spec §XX

### TC-002 · Category **boundary** · **[H]**

- ...

### TC-003 · Category **error** · **[H]**

- ...

### TC-004 · Category **null_empty** · **[H]**

- ...

### TC-005 · Category **concurrency** · **[M]** （若 stateful）

- ...

### TC-006 · Category **idempotency** · **[M]** （若有副作用）

- ...

---

## 4. Mocking Strategy
<!-- owner: Dev · required: always -->

<!-- ai-rule: mock / do_not_mock + rationale + 邊界準則。預設不 mock 同 module 內 pure function -->

| Action | Items | Rationale |
|---|---|---|
| **Mock** | external IO / time / random / network / DB | 不可控、慢、副作用 |
| **Stub** | 受測對象的下游依賴 | 隔離 |
| **Do not mock** | same-module pure function / value object / 同邏輯邊界 | 會弱化測試價值 |

**Boundary principle:** <一句話描述何時 mock / 何時不 mock>

---

## 5. Coverage Target
<!-- owner: Dev + QA · required: always -->

<!-- ai-rule: line / branch / mutation_kill 三項必填；rationale 不能寫「業界標準 80%」這種廢話 -->

| Metric | Target | Rationale |
|---|---|---|
| **Line coverage** | <e.g. 80%> | <為何此值，對應風險> |
| **Branch coverage** | <e.g. 75%> | <為何> |
| **Mutation kill** | <e.g. 60%> | 比 line 更能反映測試品質 |

---

## 6. Performance Assertions
<!-- owner: Dev · required: full-only -->

<!-- ai-rule: 若 has_perf_test=true，p99 budget 必填；否則 rationale 必填 -->

| Field | Value |
|---|---|
| **Has perf test** | true / false |
| **p99 latency budget** | <e.g. 10ms 或 N/A> |
| **Rationale** | <為何需要 / 不需要> |

---

## 7. Mutation Testing
<!-- owner: Dev · required: full-only -->

<!-- ai-rule: tool + target_score + known_survivors。survivors 是「殺不掉的 mutant」— 暴露測試弱點 -->

| Field | Value |
|---|---|
| **Tool** | Stryker / PIT / mutmut / N/A |
| **Target score** | <0-100> |
| **Known survivors** | <list or _TODO: 尚未跑過_> |

---

## 8. Property-based Testing
<!-- owner: Dev · required: full-only · skippable: 若無 property 可定義則寫「無明顯 property」 -->

<!-- ai-rule: 若 target 有 invariant (e.g. sort 結果 length 不變)，至少列 1 條 property -->

| Property | Generator | Iterations | Confidence |
|---|---|---|---|
| <e.g. sort length invariant> | <range / list generator> | 100 | **[H]** |

---

## 9. Risks & Open Questions
<!-- owner: All · required: always -->

### Risks

<!-- ai-rule: 每條格式：失效模式 + Mitigation + Owner 三件齊 -->

> **R1:** <例：mock 太多會降測試價值> — **Mitigation:** <hybrid: 嚴格定義 mock 邊界> — **Owner:** <name>
>
> **R2:** ...

### Open Questions

- [ ] **Q1:** <例：邊界值不確定，TC-002 expected 是 max int 還是 max int + 1？>
- [ ] **Q2:** ...

---

## 10. Decision Log
<!-- owner: Dev · required: always -->

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 邊界值測試策略 | enumerated / property_based / fuzzing | property_based | enumerated (太多 combination)、fuzzing (CI 太慢) | **[H]** |

---

## 11. Out of Scope
<!-- owner: Dev · required: full-only -->

本 plan **不處理**：

- ❌ **不測 wiring code / setter / getter** — 無分支邏輯
- ❌ **不測 third-party library 內部行為** — 只測整合邊界
- ❌ **不做 UI snapshot test** — 屬 component test 卡
- ❌ **不做 integration / e2e** — 屬 integration-test / e2e-test 卡

---

## 12. Confidence & Sources & TODO
<!-- owner: All · required: always -->

- **整份 plan 最低 confidence 項：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1>
  - <假設 2>
- **Highest-value next input:** <e.g. 更完整的 spec / production error log / 競品 invariant>

### TODO（缺資料）

- _TODO: spec 沒寫錯誤訊息文案，TC-003 expected 待補_
- _TODO: 跑 mutation testing 確認 target score_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] Test Cases 六類齊：happy + boundary + error + null_empty + concurrency + idempotency
> - [ ] 每個 test case 帶 inline `[H/M/L]` badge + source
> - [ ] Mocking Strategy 含 mock + stub + do_not_mock 三類 + boundary principle
> - [ ] Coverage Target line + branch + mutation_kill 三項 + rationale（不能寫「業界標準」）
> - [ ] Mutation Testing 含 tool + target_score（即使 _TODO_ 也要寫）
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] Risks 每條格式：失效模式 + Mitigation + Owner
> - [ ] 無 YAML / JSON schema 輸出（plan 是給人讀的 markdown）
```

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Unit Test plan markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼函數 / 類別簽名 / spec / acceptance criteria / 既有測試 + coverage / production error log）
⏫
```

> [!TIP]
> **常見錯誤：** 為覆蓋率測 mock（測試無價值）、把 unit 寫成 integration（不 mock 外部依賴）、coverage 隨便填 80% 沒 rationale（拍腦袋）、mock 同 module pure function（弱化邊界）、漏 boundary / null_empty（生產 bug 大本營）、有副作用卻無 idempotency test（重送扣兩次錢）、property-based 場景明顯卻只寫 enumerated（combinatorial 爆炸）。AI 若漏這些，自檢清單會抓到並回頭補。
