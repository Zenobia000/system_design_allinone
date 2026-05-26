---
title: "C4 圖 · 四層架構視圖"
slug: "c4-diagram"
stage: "design"
roles: ["architect", "sa"]
order: 24
hook: "用四層抽象讓每種角色看到「他需要看的那層」"
when_to_use: "跨系統整合、新人 onboarding、stakeholder 溝通架構時"
ai_leverage: "用 Claude 從現有 codebase + ADR → C4 diagram 描述（PlantUML/Mermaid）"
art: "/generated/stage-design.webp"
source: "deep-research-report.md §產品與需求相關角色 / §開發生命週期"
---

## 解決什麼問題

Architect 在白板上畫一張圖，工程師看不懂、PM 看不懂、SRE 看不懂——因為每個人想看的抽象層不同。
C4 模型（Context / Container / Component / Code）的價值是**分層**：高層給 stakeholder、中層給工程師、低層給 code reviewer。
沒有 C4，每次溝通都得重畫一張新圖。

## 誰負責、和誰對接

- **主責：** Architect
- **協作：** SA（補系統行為）、Dev Lead（補實作脈絡）、SRE（補營運視角）
- **下游收件：** 工程團隊（理解邊界）、新人（onboarding）、stakeholder（理解整體）

## 何時用、何時不用

- ✅ **必要時機：** 跨系統整合、團隊 ≥ 10 人、有外部 stakeholder 需要溝通架構
- ❌ **不需要時：** 單一 monolith 小團隊、PoC、純前端 SPA
- ⚠️ **常見誤用：** 一張圖塞所有東西（變成義大利麵）；每層 C4 應**對應一種讀者**，不要混層

## AI 怎麼加速

把 codebase + ADR 丟給 AI 反推 C4 描述，人類審分層是否乾淨。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 software architect（熟悉 C4 / ADR / DDD / event-driven / microservices trade-off）。任務：把 codebase + ADR 轉成 C4 圖描述（YAML 格式）。

## 輸入素材

[Codebase 結構 / 主要模組]
[既有 ADR 清單與技術選型]
[Stakeholder 清單與外部系統]

輸出 schema：level（context/container/component/code）/ elements[]（name/responsibility/tech）/ relationships[]（purpose/protocol）/ boundary_definitions / omitted_details（why） / notation（Mermaid/PlantUML） / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造模組。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 10+ 年分散式系統經驗的資深 software architect，熟悉 C4 model（Context / Container / Component / Code）、ADR、DDD、CAP、event-driven、microservices trade-off。
你的輸出會交給 stakeholder（看 Level 1）、工程團隊（看 Level 2）、新人 onboarding（看 Level 2/3）、code reviewer（看 Level 3/4）。
每層必須對應一種讀者，混層 = 義大利麵。所以圖描述必須結構嚴格、分層乾淨、技術選型與 ADR 一致。

## 情境脈絡

跨系統整合、團隊 ≥ 10 人、有外部 stakeholder 需要溝通架構時用本 C4。
本卡核心問題：用四層抽象讓每種角色看到「他需要看的那層」，避免每次溝通都重畫新圖。

## 輸入素材

[Codebase 結構 / 主要模組 / package 邊界]
[既有 ADR 清單與技術選型（DB、queue、framework）]
[Stakeholder 清單與外部系統（payment / email / IdP / analytics）]

## 規則

1. 每個 element 註明 source：[input 第 X 段] 或 [ADR-XXX]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：拆 microservice 則犧牲跨服務 transaction 的簡潔性）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造模組或外部系統。
4. 分層紀律：Level 1 只放 system + actor + external；Level 2 才放 container；Level 3 才放 component；任何混層必須在 omitted_details 解釋。
5. Out of scope 至少 3 條（例：Level 4 / code 層 default 不畫；deployment topology 走另張 deployment diagram；資料模型走 data-model 卡）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 至少標 3 個架構風險點（單點故障 / cyclic dependency / 跨 boundary chatty call）。

## 輸出格式（YAML）

level:
  current: context | container | component | code
  audience: <stakeholder | engineer | code reviewer>
  rationale: <為何畫這層>

elements:
  - id: E-1
    name: <e.g. Order Service>
    type: system | container | component | actor | external
    responsibility: <一句話>
    tech: <e.g. Node.js 20, Postgres 16> | n/a
    source: <input ref / ADR ref>
    confidence: H | M | L

relationships:
  - from: E-1
    to: E-2
    purpose: <e.g. fetch customer profile>
    protocol: <REST / gRPC / Kafka topic / Postgres wire>
    sync_async: sync | async
    confidence: H | M | L

boundary_definitions:
  - name: <e.g. Order BC>
    contains: [E-1, E-3]
    rationale: <DDD 邊界依據>

omitted_details:
  - what: <e.g. cache、auth proxy>
    why: <不在本層的讀者關心範圍>

notation:
  syntax: Mermaid C4 | PlantUML C4
  diagram: |
    <inline diagram>

architecture_risks:
  - risk: <e.g. Order Service 單點 DB>
    severity: H | M | L
    follow_up: <e.g. 開 ADR 評估 read replica>

decision_log:
  - decision: <e.g. 為何 Order 與 Payment 拆兩個 container>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - Level 4 (code) 預設不畫，只在 reviewer 需要時補
  - Deployment / infra topology 由 deployment diagram 處理
  - 資料模型 / ERD 由 data-model 卡處理

## 思考步驟

產出前先：
1. 從 codebase 抓 3-5 個核心 container / bounded context，標 H/M/L confidence
2. 列至少 2 條 viable 邊界路徑（依 team 拆 vs 依 BC 拆），各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設 IdP 是 external、假設 cache 是 sidecar）
4. 確認分層紀律 — 沒有 component 偷渡進 context 層

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪個 element / relationship confidence < H？列出來與所需補充資料。
2. 哪些邊界假設來自我而非 input / ADR？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
```

回審重點：分層乾淨（不混 component 進 context）、技術選型與 ADR 一致、≥ 3 個架構風險點誠實標出。
