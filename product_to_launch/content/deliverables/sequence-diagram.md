---
title: "Sequence Diagram · 時序圖"
slug: "sequence-diagram"
stage: "design"
roles: ["sa", "architect"]
order: 27
hook: "把跨服務互動的順序、失敗、回滾畫清楚"
when_to_use: "跨 ≥ 3 服務互動、有異步事件、有重試/補償邏輯時"
ai_leverage: "用 Claude 從 API spec + use case → Mermaid sequence diagram"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §開發生命週期 / §三個實務場景"
---

## 解決什麼問題

跨服務 flow 用文字描述「A 呼叫 B 然後 B 呼叫 C」很容易遺漏 timeout、retry、失敗回滾的細節。
Sequence Diagram 強迫把**時間順序、訊息類型、失敗路徑、補償交易**畫出來，是發現 race condition 與 idempotency 漏洞的最便宜工具。
不畫，整合測試才發現第三方失敗時 order 變孤兒、付款重複扣款。

## 誰負責、和誰對接

- **主責：** SA / Architect
- **協作：** BE（驗證實作可行）、SRE（補 failure mode）、QA（設計整合測試）
- **下游收件：** BE 實作、QA 寫 integration test、SRE 設計 alert

## 何時用、何時不用

- ✅ **必要時機：** 跨 ≥ 3 服務、有異步事件、有交易補償、外部 API 整合
- ❌ **不需要時：** 單服務內部呼叫、純 CRUD
- ⚠️ **常見誤用：** 只畫 happy path，沒畫 timeout / retry / rollback；業界實踐強調**重試不是免費的**，必須畫 backoff + jitter + idempotency

## AI 怎麼加速

把 use case + API spec 丟給 AI 產 Mermaid sequence，人類審 failure path 與補償交易。

```prompt-quick
你是有 7+ 年系統分析經驗的資深 SA（熟悉 BPMN / UML / 規格拆解 / idempotency / saga 補償交易）。任務：把 use case + API spec 轉成 sequence diagram（YAML 格式）。

<input>
[Use case（含主要 + 例外流程）]
[API spec（含 endpoint / idempotency / timeout）]
[既有 ADR 對訊息語意（sync/async/exactly-once）]
</input>

輸出 schema：actors[] / lifelines[] / messages[]（sync/async/return）/ activation_bars / alt_opt_loop_frames / error_paths（≥2）/ idempotency_notes / timeout_handling / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造服務。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 7+ 年系統分析經驗的資深 SA / software architect，熟悉 BPMN、UML sequence、規格拆解、idempotency、saga 補償交易、distributed transaction trade-off、retry/backoff/jitter。
你的輸出會交給 BE（實作 handler）、QA（寫 integration test）、SRE（設計 alert 與 timeout）。
他們需要每條訊息都有 sync/async / timeout / retry / idempotency 標註，failure path 與補償交易畫清楚 — 只畫 happy path 等於沒畫。
</role>

<context>
跨 ≥ 3 服務互動、有異步事件、有重試/補償邏輯時用本 sequence diagram。
本卡核心問題：把跨服務互動的時間順序、訊息類型、失敗路徑、補償交易畫清楚，是發現 race condition 與 idempotency 漏洞的最便宜工具。
</context>

<input>
[Use case（含主要流程 + 例外流程 + actor）]
[API spec（含 endpoint / idempotency key / timeout / rate limit）]
[既有 ADR 對訊息語意（sync/async / at-least-once / exactly-once）]
</input>

<rules>
1. 每條 message 註明 source：[input 第 X 段 / API spec 哪個 endpoint]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：選 sync 鏈式呼叫則犧牲尾延遲，timeout 累加；選 async 則犧牲一致性視窗）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造服務或補償邏輯。
4. 必畫 happy path + ≥ 2 條 failure path（含補償交易、partial failure、timeout、network partition）。
5. Out of scope 至少 3 條（例：UI 內部 state 變化、admin tool flow、batch ETL 流程不在本卡）。
6. 每條 message 標 confidence: [H/M/L]，L 必須附說明。
7. 每條 retry 必含 backoff + jitter + max attempts + idempotency 標記（重試不是免費的）。
</rules>

<output_schema>
actors:
  - id: A-User
    name: <End user>
    type: human | system | external
    source: <input ref>

lifelines:
  - id: L-FE
    name: <e.g. Web FE>
    deployment: <browser / mobile / service>
  - id: L-Order
    name: Order Service
    tech: <ref ADR>

messages:
  - seq: 1
    from: A-User
    to: L-FE
    name: submitOrder
    kind: sync | async | return
    protocol: <REST / Kafka topic>
    timeout: <ms | n/a>
    retry: { max: 3, backoff: exp, jitter: true, idempotent: true } | null
    idempotency_key: required | optional | n/a
    source: <input ref>
    confidence: H | M | L
  - seq: 2
    ...

activation_bars:
  - lifeline: L-Order
    starts_at: 2
    ends_at: 6

alt_opt_loop_frames:
  - type: alt
    label: <條件 e.g. payment success vs failure>
    branches:
      - condition: success
        messages: [3, 4, 5]
      - condition: failure
        messages: [3a, 4a]
  - type: loop
    label: retry until idempotent
    messages: [7]

error_paths:
  - name: payment_timeout
    trigger: <e.g. Payment Service > 5s>
    compensation: <e.g. release inventory + mark order PENDING_PAYMENT>
    consumer_visible: <FE 看到的訊息>
    confidence: H | M | L
  - name: inventory_oversold
    trigger: <e.g. 併發扣減導致 negative stock>
    compensation: <e.g. refund + notify>

idempotency_notes:
  - endpoint: POST /v1/orders
    key_source: client-generated UUID v4 in Idempotency-Key header
    ttl: 24h
    on_duplicate: <回原 response 而非 409>

timeout_handling:
  default_client_timeout: <ms>
  budget_per_hop: <ms>
  total_budget: <ms>
  exceed_behavior: <abort + compensation>

race_conditions:
  - risk: <e.g. user 連點兩次 submit>
    mitigation: <e.g. FE disable + BE idempotency key>
    confidence: H | M | L
  - risk: <e.g. inventory 與 payment 跨服務雙寫>
    mitigation: <saga + compensation>
  - risk: <e.g. webhook 順序顛倒>
    mitigation: <event versioning + at-least-once + idempotent consumer>

decision_log:
  - decision: <e.g. 為何選 saga 而非 2PC>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - UI 內部 state machine（由 UX flow / state diagram 處理）
  - Admin tool / internal ops flow 不在本卡
  - Batch ETL / file-based 整合走另張時序圖
</output_schema>

<thinking>
產出前先：
1. 從 use case 抓 3-5 個關鍵互動點（跨服務邊界 / 含外部依賴 / 有重試），標 H/M/L confidence
2. 列至少 2 條 viable 一致性路徑（sync 鏈 vs async saga），各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設 message broker at-least-once、假設 client 會帶 idempotency key）
4. 確認至少 2 條 failure path 與補償交易已畫
</thinking>

<output>
（依 output_schema YAML 填寫；Mermaid sequenceDiagram 可另附）
</output>

<verify>
1. 哪條 message / failure path confidence < H？列出來與所需補充資料。
2. 哪些補償邏輯假設來自我而非 input / ADR？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
</verify>
```

回審重點：failure path 真實（非只畫 happy）、補償交易已考慮、idempotency 標清楚、retry 有 backoff + jitter + max。
