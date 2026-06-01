---
title: "Error Handling · 錯誤處理設計"
slug: "error-handling"
stage: "design"
roles: ["sd", "dev"]
order: 34
hook: "統一錯誤碼、重試與冪等策略，Dev 不用各自發明 error shape"
when_to_use: "對外 API、跨服務呼叫、有重試 / 補償邏輯時"
ai_leverage: "用 Claude 從 api-spec + sequence diagram → 錯誤碼目錄 + 重試矩陣（RFC 9457）"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §SD / §三個實務場景"
---

## 解決什麼問題

每個 Dev 各自發明自己的 error shape：有人回 `{"error": "fail"}`、有人回 `500` 配一句中文、有人把 stack trace 直接吐給 client。
結果 4xx / 5xx 語意不一致、client 根本沒辦法統一處理失敗，retry 邏輯亂寫導致**同一筆訂單扣兩次款**。
Error Handling 設計強迫先把**錯誤碼目錄 + 重試 / 冪等策略**定下來：哪些可重試、哪些冪等、哪些要 alert、client 看得到什麼。
失敗才會變得可預測、可測試、可監控。
呼應 SD 實務洞察：**「沒錯誤碼，Dev 看完還是要問三遍」**——錯誤碼目錄就是那份不用問的契約。

## 誰負責、和誰對接

- **主責：** SD / Dev
- **協作：** Architect（對齊 NFR / SLO 的可用性與延遲預算）、SRE（補 failure mode + alert 門檻）、QA（設計 negative tests）
- **下游收件：** Dev 實作錯誤回應與重試、QA 寫錯誤路徑測試、SRE 設 alert

## 何時用、何時不用

- ✅ **必要時機：** 對外公開 API、跨服務 / 跨第三方呼叫、有重試或補償（saga）邏輯、有付款 / 庫存等不可重複副作用
- ❌ **不需要時：** 純內部 script、一次性 batch、無對外契約的 PoC
- ⚠️ **常見誤用：** retry 不是免費的——每條 retry 必含 **backoff + jitter + max attempts + idempotency**，四者缺一就是在製造 retry storm（下游剛恢復就被重試流量再次打垮）

## AI 怎麼加速

把 api-spec（所有 endpoint + 回應碼）+ sequence diagram（failure path / 補償交易）+ 既有 ADR 對失敗語意整份丟給 agent，讓 agent 讀範本內的 `> [!IMPORTANT]` 規則與 `<!-- ai-fill -->` 註解自己填，**人工只審「可重試 / 冪等 / 要 alert」三個判斷**。本卡輸出**真實 error-handling markdown 文件**（含錯誤碼目錄表格、重試矩陣表格、一段 RFC 9457 Problem Details 的 `json` 回應範例、inline `[H/M/L]` badge）。這裡的 `json` 只是**錯誤回應 body 的示意**，**不要**輸出 OpenAPI / YAML schema 當交付物——契約 schema 是 api-spec 卡的事。

## 文件範本

下面兩個 tab 是同一份契約的兩種版本，AI 讀同一份範本可雙模式輸出：**輕量範本** 給單服務 / 少量 endpoint / 無跨服務補償的場景用（錯誤碼目錄 + 一條重試規則就夠），**完整範本** 給對外 API / 跨服務 / 有 saga 補償 / 接第三方（Stripe）場景用（完整錯誤分類 + 重試矩陣 + circuit breaker + 錯誤傳播映射）。核心紀律：**每個錯誤都要回答四件事——retryable 嗎？冪等嗎？要 alert 嗎？client 看得到什麼？** 範本內所有 `> [!IMPORTANT]` 是 AI 章節級規則、`<!-- ai-fill / ai-rule -->` 是欄位級微指引、結尾 `> [!CAUTION]` 是輸出前自檢清單。

````template-light
---
doc_type: "error-handling"
variant: "light"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["api-spec", "sequence-diagram"]
  optional: ["non-functional-reqs", "threat-model"]
---

# Error Handling: <service-name>

**Status:** Draft · **Owner:** <SD/Dev> · **Last updated:** YYYY-MM-DD

> [!IMPORTANT]
> **AI 填寫規則：** 本範本 5 段（編號 1, 2, 3, 9, 12），全部必填——刻意沿用完整版的章節編號讓兩版可對照。每個錯誤碼必答四件事：**retryable 嗎？冪等嗎？要 alert 嗎？client 看得到什麼？** 每條結論行內加 `（依據：api-spec §endpoint / sequence-diagram §failure-path）`；每欄位帶 `[H]/[M]/[L]` confidence badge；缺資料寫 `_TODO: 需要 XXX_` 不編造錯誤碼。錯誤回應 body **一律用 RFC 9457（Problem Details）格式**；每條 retry 必含 backoff + jitter + max attempts + idempotency key；**不得輸出 OpenAPI / YAML schema**（那是 api-spec 卡的事）。

---

## 1. Executive Summary

<!-- ai-fill: 3-5 行說明本服務涵蓋哪些 endpoint、錯誤回應採 RFC 9457、主要可重試 / 不可重試錯誤、最高風險（重複扣款 / 洩漏內部錯誤） -->

<3-5 行說明>

> **TL;DR:** <一句話：本服務統一用 RFC 9457，X 類錯誤可重試（含冪等），Y 類不可重試直接回 client>

---

## 2. Error Catalog（錯誤碼目錄）

<!-- ai-rule: 每個對外 endpoint 至少列其可能錯誤碼。retryable? 與 client action 兩欄不可空 -->

| Code | HTTP status | Meaning | Retryable? | Client action | Confidence |
|---|---|---|---|---|---|
| `ORDER_NOT_FOUND` | 404 | 訂單不存在 | no | 顯示「找不到訂單」 | **[H]** |
| `INVENTORY_INSUFFICIENT` | 409 | 庫存不足 | no | 顯示「商品已售完」 | **[H]** |
| `PAYMENT_DECLINED` | 402 | 發卡行拒絕 | no | 提示換卡 | **[H]** |
| `PAYMENT_GATEWAY_TIMEOUT` | 504 | Stripe 逾時 | yes（同 key） | 自動重試，顯示「處理中」 | **[H]** |
| `RATE_LIMITED` | 429 | 超過配額 | yes（依 `Retry-After`） | backoff 後重試 | **[H]** |
| `INTERNAL` | 500 | 未預期錯誤 | no（client 端） | 顯示通用錯誤 + traceId | **[M]** |

---

## 3. Retry & Idempotency（核心）

| Operation | Retryable | Max attempts | Backoff | Idempotency key |
|---|---|---|---|---|
| `POST /v1/orders` | on 504/timeout | 2 | exp + jitter, base 200ms | `Idempotency-Key` header (UUID v4) |
| `Stripe charge` | on timeout/5xx | 3 | exp + jitter, base 500ms | `orderId` |
| `GET /v1/orders/{id}` | on 5xx（讀取安全） | 3 | exp + jitter | n/a（天生冪等） |

> **規則：** retryable 的前提是**冪等**。非冪等寫入沒帶 idempotency key，一律不得自動重試。

---

## 9. Risks

<!-- ai-rule: 至少 3 個（retry storm / 洩漏內部錯誤 / 吞掉例外） -->

> **R1:** <e.g. 504 自動重試但 Stripe 未帶 idempotency key → 重複扣款> — **Mitigation:** 強制以 `orderId` 為 key — **Owner:** <Dev>
>
> **R2:** <e.g. 500 把 DB 錯誤訊息直吐 client → 洩漏 schema> — **Mitigation:** 對外只回 `INTERNAL` + traceId — **Owner:** <SD>
>
> **R3:** <e.g. catch 後 swallow，client 拿到 200 但其實失敗> — **Mitigation:** 禁止空 catch，未知錯誤 map 到 `INTERNAL` — **Owner:** <Dev>

---

## 12. Confidence & Sources & TODO

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M]>
- **Fabricated assumptions（推測但 input 未明說）：**
  - <假設 1：例：假設 Stripe 逾時可安全以 orderId 重試>
- **Highest-value next input:** <下一份最該補的：實測各 endpoint 錯誤率分布 / SRE alert 門檻>

### TODO（缺資料）

- _TODO: 需要 SRE 確認哪些錯誤碼需 page、哪些只進 dashboard_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 5 段 H2 章節齊全（編號 1, 2, 3, 9, 12，刻意不連號）
> - [ ] 每個錯誤碼都有 retryable flag + client action
> - [ ] 每條 retry 含 backoff + jitter + max attempts + idempotency key
> - [ ] 對外不洩漏 stack trace / PII（internal 錯誤只回通用碼 + traceId）
> - [ ] 錯誤回應 body 用 RFC 9457（Problem Details）
> - [ ] 無 OpenAPI / YAML schema 輸出
````

````template-full
---
doc_type: "error-handling"
variant: "full"
status: "draft"
owner: "<your-name>"
last_updated: "YYYY-MM-DD"
upstream:
  required: ["api-spec", "sequence-diagram"]
  optional: ["non-functional-reqs", "threat-model"]
---

# Error Handling: <service-name>

**Status:** Draft · **Owner:** <SD/Dev> · **Last updated:** YYYY-MM-DD · **Reviewers:** Architect / SRE / QA

> [!IMPORTANT]
> **AI 填寫規則：** 12 段 H2 章節全部必填（任一缺失即不合格）。核心紀律：**每個錯誤都要回答 retryable 嗎？冪等嗎？要 alert 嗎？client 看得到什麼？** 每條結論行內 `（依據：api-spec §endpoint / sequence-diagram §failure-path）`；每欄位 `[H/M/L]` badge；缺資料寫 `_TODO: 需要 XXX_` 不編造錯誤碼或重試次數。錯誤回應 body **一律用 RFC 9457（Problem Details for HTTP APIs）格式**；每條 retry 必含 backoff + jitter + max attempts + idempotency key（重試不是免費的）；**對外永不洩漏 stack trace / PII / 內部 schema**；**禁輸出 OpenAPI / YAML schema**（契約 schema 是 api-spec 卡的事，本卡只示意錯誤 body）。

---

## 1. Executive Summary
<!-- owner: SD · required: always -->

<!-- ai-fill: 3-5 行說明涵蓋哪些 endpoint、錯誤格式（RFC 9457）、一致性 / 重試策略、最高風險 race（重複扣款 / 洩漏內部錯誤 / 吞例外） -->

<3-5 行說明>

> **TL;DR:** <一句話：全服務 RFC 9457 統一錯誤 body + 重試矩陣（exp+jitter）+ 跨服務錯誤映射，最高風險是 X>

---

## 2. Error Taxonomy（錯誤分類）
<!-- owner: SD + Architect · required: always -->

<!-- ai-rule: 至少沿兩軸分類：client 4xx vs server 5xx；transient vs permanent；business vs technical -->

| 軸 | 類別 | 特徵 | 處理原則 |
|---|---|---|---|
| 責任 | Client (4xx) | client 送錯，重送同樣請求仍會錯 | 不重試，回明確 client action |
| 責任 | Server (5xx) | 服務端問題 | 視 transient 決定重試 |
| 時效 | Transient | timeout / 503 / 暫時鎖衝突 | 可重試（含 backoff + 冪等） |
| 時效 | Permanent | 404 / 422 / 業務拒絕 | 不重試 |
| 語意 | Business | 庫存不足、付款被拒、額度超限 | 回對應業務碼，不 alert |
| 語意 | Technical | DB down、依賴不可用、序列化失敗 | 對外回通用碼，內部 alert |

> **判斷順序：** 先分 transient/permanent 決定「能不能重試」，再分 business/technical 決定「要不要 alert + client 看得到什麼」。

---

## 3. Error Catalog（錯誤碼目錄）
<!-- owner: SD + Dev · required: always -->

<!-- ai-rule: 每個對外 endpoint 至少列其可能錯誤碼。app-code 唯一、retryable 與 confidence 不可空 -->

| App code | HTTP | RFC 9457 `type` URI | Message（對外） | Retryable | Confidence |
|---|---|---|---|---|---|
| `ORDER_NOT_FOUND` | 404 | `https://api.example.com/problems/order-not-found` | 找不到此訂單 | no | **[H]** |
| `VALIDATION_FAILED` | 422 | `https://api.example.com/problems/validation` | 請求欄位有誤 | no | **[H]** |
| `INVENTORY_INSUFFICIENT` | 409 | `https://api.example.com/problems/inventory` | 商品已售完 | no | **[H]** |
| `PAYMENT_DECLINED` | 402 | `https://api.example.com/problems/payment-declined` | 付款被拒絕，請換卡 | no | **[H]** |
| `PAYMENT_GATEWAY_TIMEOUT` | 504 | `https://api.example.com/problems/upstream-timeout` | 付款處理中，請稍候 | yes（同 key） | **[H]** |
| `DEPENDENCY_UNAVAILABLE` | 503 | `https://api.example.com/problems/unavailable` | 服務暫時忙線 | yes | **[M]** |
| `RATE_LIMITED` | 429 | `https://api.example.com/problems/rate-limit` | 請求過於頻繁 | yes（`Retry-After`） | **[H]** |
| `INTERNAL` | 500 | `https://api.example.com/problems/internal` | 系統錯誤，請提供 traceId | no（client 端） | **[M]** |

> 行內依據：`PAYMENT_*` 一組（依據：api-spec §POST /v1/payments / sequence-diagram §Path A: Payment Gateway timeout）。

---

## 4. Problem Details Schema（錯誤回應示意）
<!-- owner: SD · required: always -->

<!-- ai-rule: 給一段 RFC 9457 json 示意（含標準成員 + extension 成員）。這是「示意」非交付 schema，不可改成 OpenAPI/YAML -->

對外錯誤回應一律 `Content-Type: application/problem+json`，採 RFC 9457 標準成員（`type` / `title` / `status` / `detail` / `instance`）外加 extension 成員（`code` / `traceId`）：

```json
{
  "type": "https://api.example.com/problems/upstream-timeout",
  "title": "Payment gateway timeout",
  "status": 504,
  "detail": "付款處理逾時，系統已自動重試中，請稍候查詢訂單狀態。",
  "instance": "/v1/orders/ord_01HF.../payment",
  "code": "PAYMENT_GATEWAY_TIMEOUT",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736"
}
```

> **不洩漏規則（non-leaking）：** `detail` 只放對使用者有意義的訊息，**禁止**塞 stack trace、SQL、內部主機名、PII（卡號 / email / 身分證）。內部診斷資訊靠 `traceId` 串到 log，不放進回應 body。

---

## 5. Retry & Backoff Matrix
<!-- owner: Dev + SRE · required: always -->

<!-- ai-rule: 每筆 operation 四件齊：retryable 觸發條件 + max attempts + backoff(exp+jitter) + idempotency key。非冪等不得自動重試 -->

| Operation | Retryable on | Max attempts | Backoff strategy | Idempotency key |
|---|---|---|---|---|
| `POST /v1/orders` | 504 / connection error | 2 | exp + full jitter, base 200ms, cap 2s | `Idempotency-Key` header (UUID v4) |
| `Order → Stripe charge` | timeout / 5xx | 3 | exp + jitter, base 500ms, cap 8s | `orderId` |
| `Order → Inventory reserve` | 503 / lock timeout | 3 | exp + jitter, base 100ms | `orderId + sku` |
| `GET /v1/orders/{id}` | 5xx / timeout | 3 | exp + jitter | n/a（讀取天生冪等） |
| `OrderCreated` event consume | 任意 transient | broker redelivery | broker 控制 + consumer dedupe | `event_id` |

> **鐵律：** retryable ⊆ idempotent。非冪等寫入未帶 key 一律不重試，否則 = 重複扣款 / 重複建單。

---

## 6. Idempotency
<!-- owner: Dev · required: always -->

<!-- ai-rule: 哪些 endpoint 需 key、key 來源、TTL、on-duplicate 行為 -->

| Endpoint / Operation | 需要 key？ | Key 來源 | TTL | On duplicate |
|---|---|---|---|---|
| `POST /v1/orders` | yes | client `Idempotency-Key` (UUID v4) | 24h | 回原 response（不建第二筆、不回 409） |
| `POST /v1/payments` | yes | server 派 `orderId` | per Stripe | Stripe 回原 charge，不重複扣款 |
| `OrderCreated` consumer | yes | producer `event_id` | 7d at consumer | dedupe 丟棄重複事件 |
| `GET` / 查詢類 | no | — | — | 天生冪等，無副作用 |

> 同 key 在 TTL 內重送：回**原始結果**而非重做副作用；key 過期後視為新請求。

---

## 7. Circuit Breaker & Timeout
<!-- owner: Dev + SRE · required: full-only -->

<!-- ai-rule: per dependency 列 timeout + breaker 門檻 + fail-fast 行為 -->

| Dependency | Call timeout | Breaker open 門檻 | Open 後行為 | Half-open 探測 |
|---|---|---|---|---|
| Stripe | 10s | 連續 5 失敗 或 50% / 30s | fail-fast 回 `DEPENDENCY_UNAVAILABLE`，訂單留 `PENDING` | 30s 後放 1 試探請求 |
| Inventory Service | 3s | 50% / 20s | fail-fast，提示稍後重試 | 15s 後 half-open |
| Order DB | 2s | 連線池耗盡即視為 open | 立即回 503，不堆積請求 | 連線恢復即關閉 |

> Breaker 的價值是**保護下游 + fail-fast**：與其讓請求堆在 timeout 上耗盡執行緒，不如快速失敗讓上游早點走補償。

---

## 8. Error Propagation（跨服務錯誤映射）
<!-- owner: SD + Dev · required: full-only -->

<!-- ai-rule: downstream 錯誤如何 map 成 upstream client 錯誤。不得直接把 gRPC/DB 內部錯誤透傳給 client -->

| Downstream 錯誤 | 來源 | 對外映射（client 看到） | 是否洩漏內部 |
|---|---|---|---|
| gRPC `NOT_FOUND` | Order Service | `404 ORDER_NOT_FOUND` | 否（只回業務碼） |
| gRPC `UNAVAILABLE` / deadline | Order Service | `503 DEPENDENCY_UNAVAILABLE`（可重試） | 否 |
| Postgres `unique_violation` | Order DB | `409 INVENTORY_INSUFFICIENT` 或冪等回原單 | 否（不吐 SQL） |
| Postgres `serialization_failure` | Order DB | 內部重試；耗盡後 `503` | 否 |
| Stripe `card_declined` | Stripe | `402 PAYMENT_DECLINED` | 否（不透傳 Stripe raw） |
| Stripe `timeout` | Stripe | `504 PAYMENT_GATEWAY_TIMEOUT`（同 key 重試） | 否 |
| 未分類例外 | any | `500 INTERNAL` + traceId | 否（絕不吐 stack trace） |

> **映射原則：** 每一層只暴露**自己語意層級**的錯誤碼；下游的 gRPC code / DB SQLSTATE / 第三方 raw error 一律在邊界轉譯成本服務 app-code，並保留 `traceId` 串接。

---

## 9. Logging & Observability
<!-- owner: SRE + Dev · required: always -->

<!-- ai-rule: 區分「log 什麼」vs「回 client 什麼」；correlation id；哪些錯誤 alert-worthy -->

| 面向 | 內部 log（完整） | 對外回應（精簡） |
|---|---|---|
| 訊息 | 完整 stack trace + 上下文 | RFC 9457 `title` + `detail`（脫敏） |
| 識別 | `traceId` + `spanId` + userId（內部） | 僅 `traceId` |
| 敏感資料 | 一律遮罩（卡號 / token / PII） | 絕不出現 |

**Alert-worthy（要 page / 進 dashboard）：**

| 錯誤類 | 動作 | 依據 |
|---|---|---|
| `INTERNAL` (5xx) error rate > SLO 門檻 | page on-call | NFR §availability SLO |
| Breaker open（Stripe / DB） | page | sequence-diagram §Path A |
| `PAYMENT_DECLINED` 比例異常升高 | dashboard + 風控通知（非 page） | business signal |
| `VALIDATION_FAILED` (4xx) | 不 alert（client 問題） | — |

> 原則：**5xx + breaker = alert；4xx + business = 觀測不 page。** 把雜訊擋在 4xx 之外。

---

## 10. Risks
<!-- owner: All · required: always -->

<!-- ai-rule: 至少 3 個，每條格式：失效模式 + Mitigation + Owner -->

> **R1（retry storm）:** <下游剛恢復，所有 client 同步重試把它再次打垮> — **Mitigation:** exp backoff + full jitter + max attempts + breaker half-open 限流 — **Owner:** <SRE>
>
> **R2（leaking internals）:** <500 直接把 DB / stack trace / PII 吐給 client> — **Mitigation:** 邊界統一轉 `INTERNAL` + traceId，回應只過 RFC 9457 脫敏層 — **Owner:** <SD>
>
> **R3（swallowed exceptions）:** <catch 後不處理也不回報，client 拿到假成功> — **Mitigation:** 禁止空 catch；未知例外一律 map `INTERNAL` 並記 log + 計數 — **Owner:** <Dev>
>
> **R4（non-idempotent retry）:** <非冪等寫入自動重試 → 重複扣款 / 重複建單> — **Mitigation:** retryable ⊆ idempotent，無 key 不重試 — **Owner:** <Dev>

---

## 11. Out of Scope
<!-- owner: SD · required: full-only -->

本 Error Handling 文件 **不處理**：

- ❌ **基礎設施 alerting runbook / on-call 流程** — 屬 observability-spec / runbook 卡
- ❌ **Happy-path 請求 / 回應契約** — 屬 api-spec 卡（本卡只定錯誤面）
- ❌ **訊息順序 / 補償交易時序** — 屬 sequence-diagram 卡（本卡引用其 failure path）
- ❌ **威脅模型 / 認證授權失敗策略細節** — 屬 threat-model 卡

---

## 12. Decision Log + Confidence & Sources & TODO
<!-- owner: All · required: always -->

### Decision Log

<!-- ai-rule: 每條必含 ≥ 2 個 rejected options + 各自 rejected reason -->

| Date | Decision | Options considered | Chosen | Rejected why | Confidence |
|---|---|---|---|---|---|
| YYYY-MM-DD | 錯誤回應格式 | 自訂 `{error,msg}` / RFC 7807 / RFC 9457 | RFC 9457 | 自訂（無標準、client 各自解析）、7807（已被 9457 取代） | **[H]** |
| YYYY-MM-DD | 重試位置 | client retry / server-side retry / 兩者 | server-side（含冪等）+ client 限重試 429/504 | 純 client（無冪等保證易重複扣款）、純 server（無法處理網路斷） | **[H]** |
| YYYY-MM-DD | 內部錯誤對外揭露 | 透傳 detail / 通用碼 + traceId | 通用碼 + traceId | 透傳（洩漏 schema + PII） | **[H]** |

### Confidence & Sources

- **整份文件最低 confidence 欄位：** <列出所有 [L] 與 [M] 欄位>
- **Fabricated assumptions（推測但 input 未明說的）：**
  - <假設 1：例：假設 Stripe timeout 可安全以 orderId 重試>
  - <假設 2：例：假設 client 都會帶 Idempotency-Key>
- **Highest-value next input:** <下一份最該補的：實測各 endpoint 錯誤率分布 / SRE alert 門檻 / NFR availability SLO>

### TODO（缺資料）

- _TODO: 需要 SRE 確認哪些錯誤碼需 page、哪些只進 dashboard_
- _TODO: 需要 Architect 確認 NFR availability SLO 以校準 breaker 與重試上限_

---

> [!CAUTION]
> **輸出前 AI 自檢：**
> - [ ] 12 段 H2 章節齊全（編號 1-12）
> - [ ] 每個錯誤碼都有 retryable flag + client action
> - [ ] Error Taxonomy 涵蓋 4xx/5xx + transient/permanent + business/technical
> - [ ] 每條 retry 含 backoff + jitter + max attempts + idempotency key
> - [ ] retryable ⊆ idempotent（非冪等寫入未帶 key 不自動重試）
> - [ ] Idempotency 表涵蓋所有 POST/PATCH endpoint + event consumer
> - [ ] 對外不洩漏 stack trace / PII / 內部 schema（internal 只回通用碼 + traceId）
> - [ ] 錯誤回應 body 用 RFC 9457（`application/problem+json`，含 extension 成員）
> - [ ] 跨服務 / gRPC / DB 錯誤皆 map 成本服務 app-code（不透傳）
> - [ ] Alert 規則區分 5xx/breaker（page）vs 4xx/business（不 page）
> - [ ] Risks ≥ 3（retry storm / 洩漏內部 / 吞例外）每條含 Mitigation + Owner
> - [ ] Decision Log 每條 ≥ 2 個 rejected options + 各自 reason
> - [ ] 無 OpenAPI / YAML schema 輸出（只示意錯誤 body，契約屬 api-spec 卡）
````

## 怎麼觸發

先在上方 tab 選「輕量範本」或「完整範本」、按複製存到你的 AI 工作環境（web chat 對話框、Claude Code / Cursor / Aider 等 harness agent 的 context、或專案內任何 markdown 檔），再複製下面這段、把貼位區換成你的真實文件全文，給 AI：

```trigger
請依據以下「文件範本」與「上游文件」產出 Error Handling markdown。嚴格遵守範本內所有 `> [!IMPORTANT]` 規則、`<!-- ai-fill -->` / `<!-- ai-rule -->` 欄位指引，並在結尾跑完 `> [!CAUTION]` 自檢清單。每個錯誤都要回答四件事：retryable 嗎？冪等嗎？要 alert 嗎？client 看得到什麼？錯誤 body 一律用 RFC 9457，**不要輸出 OpenAPI / YAML schema**。

## 文件範本（貼這裡）
⏬
（貼上面選好的「輕量範本」或「完整範本」全文）
⏫

## 上游文件（貼這裡）
⏬
（貼 api-spec.md（所有 endpoint + 回應碼）/ sequence-diagram.md（failure path + 補償交易）/ 既有 ADR 對失敗語意 全文）
⏫
```

> [!TIP]
> **常見錯誤：** 錯誤碼沒標 retryable + client action（Dev 看完還是要問三遍）、retry 沒寫 backoff + jitter（製造 retry storm，下游剛恢復又被打垮）、非冪等寫入自動重試（at-least-once + 無 key = 重複扣款）、500 把 stack trace / SQL / PII 直吐 client（洩漏內部 + 資安事件）、catch 後吞掉例外（client 拿到假成功）、把 api-spec 的 happy-path schema 也塞進來（越界——本卡只定錯誤面）。AI 若漏這些，自檢清單會抓到並回頭補。
