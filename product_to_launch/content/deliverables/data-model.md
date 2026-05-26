---
title: "Data Model · 資料模型"
slug: "data-model"
stage: "design"
roles: ["architect", "dev"]
order: 26
hook: "把資料關係講清楚，避免半年後查不出真相"
when_to_use: "新 entity、跨系統資料整合、合規/稽核產業時"
ai_leverage: "用 Claude 從 SRS + business rules → ERD + DDL 草稿"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

工程師憑直覺建表，半年後查歷史訂單發現 status 用 enum、誰改的、何時改的全沒紀錄。
資料模型是**長期資產**：API 可以改、UI 可以重做，但 data migration 成本永遠最高。
不先設計好 entity、關聯、constraint、retention，後面 migration 永遠在補洞。

## 誰負責、和誰對接

- **主責：** Architect（高層）/ DBA（物理層）/ Dev（實作）
- **協作：** SA（補業務規則）、BE（API 對應）、SRE（補 retention 與 backup）
- **下游收件：** BE 寫 ORM、DBA 寫 migration、QA 設計資料測試

## 何時用、何時不用

- ✅ **必要時機：** 新 entity 設計、跨系統整合、合規/稽核（有 PII / audit 需求）
- ❌ **不需要時：** 純前端 / stateless service、單一 key-value cache
- ⚠️ **常見誤用：** 只畫 entity 不畫 constraint / index / retention；Fowler 強調**所有 DB 變更應為 migration 且與 code 共版控**

## AI 怎麼加速

把 SRS + business rules 丟給 AI 產 ERD + DDL 草稿，人工審 PII 標註與 audit 欄位。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 software architect / DB architect（熟悉 ADR / DDD / ISO 27001 / GDPR / 資料分級）。任務：把 SRS + business rules 轉成 data model（YAML 格式）。

## 輸入素材

[SRS / 功能規格]
[Business rules（約束、計算、合規）]
[既有 ER / 資料分類政策]

輸出 schema：entities[]（含 attributes：type/nullable/constraints）/ relationships[]（cardinality/FK/cascade）/ indexes（B-tree/hash/composite）/ normalization_level / migration_strategy / data_classification（PII/PCI/PHI） / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造欄位。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 10+ 年分散式系統經驗的資深 software architect / DB architect，熟悉 ADR、DDD、ISO 27001、GDPR、HIPAA、PCI DSS、資料分級與保留政策。
你的輸出會交給 BE（寫 ORM）、DBA（寫 migration）、QA（設計資料測試）、Compliance（PII 稽核）。
他們需要結構嚴格、欄位含型別/constraint/source 註記的 data model，才能機械生成 migration 與 contract test。

## 情境脈絡

新 entity 設計、跨系統整合、合規/稽核（有 PII / audit 需求）時用本 data model。
本卡核心問題：把資料關係、約束、index、retention 講清楚，避免半年後 migration 補洞。

## 輸入素材

[SRS / 功能規格（含 entity 邏輯定義）]
[Business rules（約束、計算、合規、retention）]
[既有 ER / 資料分類政策 / 主要 query pattern]

## 規則

1. 每個 entity / attribute 註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：正規化到 3NF 則犧牲熱路徑 query 的 join 成本）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造欄位或假設業務規則。
4. 合規 / 資料分級：PII / PCI / PHI 欄位必須標註 + 加密策略 + retention 期間 + GDPR right-to-erasure 處理（任一不適用要說明）。
5. Out of scope 至少 3 條（例：物理儲存層、cache 策略、analytic warehouse 模型不在本卡）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 每個 entity 必含 audit 欄位（created_at / updated_at / version / deleted_at），不可省略。

## 輸出格式（YAML）

entities:
  - name: <e.g. Order>
    attributes:
      - name: id
        type: uuid
        nullable: false
        constraints: [PK]
        source: <input ref>
        confidence: H | M | L
      - name: status
        type: enum[PENDING, PAID, SHIPPED, CANCELLED]
        nullable: false
        constraints: [<state machine ref>]
      - name: created_at
        type: timestamptz
        nullable: false
        constraints: [audit]
    source: <input ref>

relationships:
  - from: Order
    to: Customer
    cardinality: N:1
    fk: customer_id
    on_delete: RESTRICT | CASCADE | SET NULL
    rationale: <why this cascade choice>
    confidence: H | M | L

indexes:
  - entity: Order
    name: idx_order_customer_created
    type: B-tree | hash | gin | composite
    columns: [customer_id, created_at DESC]
    covers_query: <query pattern ref>
    cost_estimate: <size / write amplification>

normalization_level:
  current: 3NF | denormalized
  rationale: <why this level>
  trade_off: <negative consequence>

migration_strategy:
  initial_ddl: <link or inline>
  versioning: <e.g. Flyway / Liquibase>
  rollback_plan: <how>
  zero_downtime: true | false + 原因

data_classification:
  - column: Customer.email
    class: PII
    encryption: <at-rest + in-transit>
    retention: <e.g. 7 years post account closure>
    gdpr_erasure: <how to handle>
    source: <input ref>

decision_log:
  - decision: <e.g. UUID v7 vs auto-increment>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - 物理儲存層（partition / shard）由 DBA 另開 ADR
  - Cache / read replica 策略不在本卡
  - Analytic warehouse / OLAP 模型由 data team 處理

## 思考步驟

產出前先：
1. 從 SRS 抓 3-5 個核心 entity 與其生命週期事件，標 H/M/L confidence
2. 列至少 2 條 viable normalization 路徑（3NF vs 選擇性 denorm），各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設 soft delete、假設 UTC 儲存）
4. 確認每個 entity 都有 audit 欄位、每個 PII 都有 retention 政策

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些 constraint / cascade 假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：audit 欄位完整、PII 標註正確、cascade 行為與業務符合、index 覆蓋主要 query。
