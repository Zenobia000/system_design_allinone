---
title: "ADR · 架構決策紀錄"
slug: "adr"
stage: "design"
roles: ["architect"]
order: 23
hook: "把「為什麼這樣選」寫下來，半年後不用考古"
when_to_use: "跨服務影響、不可逆決策、有 ≥ 2 個合理選項時"
ai_leverage: "用 Claude 從技術討論紀錄 → ADR 草稿（option / trade-off / consequence）"
art: "/generated/key-deliverable-adr.png"
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

把技術討論紀錄丟給 AI 產 ADR 草稿，人工只審 trade-off 是否誠實。

```prompt-quick
你是有 10+ 年分散式系統經驗的資深 software architect（熟悉 ADR / C4 / DDD / CAP / event-driven）。任務：把技術討論紀錄轉成 ADR（YAML 格式）。

<input>
[技術討論紀錄]
[相關 NFR / 約束]
[已存在的 PRD / C4 / API spec 連結]
</input>

輸出 schema：context / decision_drivers / options_considered（≥3，含 pros/cons/cost）/ chosen_and_scope / consequences（positive/negative/follow-up）/ status（proposed/accepted/superseded）/ links / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造選項。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 10+ 年分散式系統經驗的資深 software architect，熟悉 ADR、C4、DDD、CAP、event-driven、microservices trade-off。
你的輸出會交給 Dev Lead（評估可實作）、SRE（評估可營運）、全工程團隊（決策可追溯）、新人 onboarding。
他們需要在 15 分鐘內看懂「為何不選 B/C」，所以 ADR 必須結構嚴格、trade-off 誠實、棄因可審計。
</role>

<context>
跨服務影響、不可逆決策（DB / framework / protocol）、有 ≥ 2 個合理選項時用本 ADR。
本卡核心問題：把「為什麼這樣選」寫下來，半年後不用考古；給後人可審計的決策脈絡而非結論。
</context>

<input>
[技術討論紀錄（含參與者、爭點、未解問題）]
[相關 NFR / 約束（latency / availability / cost ceiling / compliance）]
[已存在的 PRD / C4 / API spec 連結]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：選 Kafka 則犧牲 ops 簡潔，需新增 ZK/KRaft 維運負擔）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造未討論的選項。
4. Decision drivers 必須涵蓋 reliability / time-to-market / cost / security / operability 五象限，任一象限沒提到要說明為何不適用。
5. Out of scope 至少 3 條，明寫本 ADR 不涵蓋的決策（避免越權）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. Options considered 至少 3 個（含「不做」或「現狀」），每個都要寫 pros / cons / cost / 風險。
</rules>

<output_schema>
context:
  problem: <當前問題一句話>
  constraints: [<constraint 1>, <constraint 2>]
  related_nfr: [<NFR ref>]
  source: <input ref>
  confidence: H | M | L

decision_drivers:
  reliability: <weight + 為何>
  time_to_market: <weight + 為何>
  cost: <weight + 為何>
  security: <weight + 為何>
  operability: <weight + 為何>

options_considered:
  - name: <Option A>
    pros: [<pro 1>, <pro 2>]
    cons: [<con 1>, <con 2>]
    cost: <一次性 + 經常性>
    risk: <最大風險>
  - name: <Option B>
    ...
  - name: <Option C>
    ...

chosen_and_scope:
  chosen: <Option A>
  scope: <適用範圍 / 不適用範圍>
  source: <input ref>
  confidence: H | M | L

consequences:
  positive: [<好處 1>, <好處 2>]
  negative: [<代價 1>, <代價 2>]  # 必填
  follow_up: [<後續需處理事項>]

status:
  current: <proposed | accepted | superseded>
  superseded_by: <ADR ref | null>

links:
  prd: <ref>
  c4: <ref>
  api_spec: <ref>

decision_log:
  - decision: <what was decided>
    options_considered: [A, B, C]
    chosen: A
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - <本 ADR 不涵蓋的 1>
  - <本 ADR 不涵蓋的 2>
  - <本 ADR 不涵蓋的 3>
</output_schema>

<thinking>
產出前先：
1. 從討論紀錄抓 3-5 個關鍵 signal（爭點、未解問題、隱含假設）並標 H/M/L confidence
2. 列至少 2 條 viable trade-off 路徑與各自的 negative consequence
3. 列你做了但 input 沒明說的假設
4. 確認 5 象限 decision driver 都涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
</verify>
```

回審重點：human 判斷 trade-off 是否誠實（negative consequence 是否列出）、選項是否真實比較過、棄因是否站得住腳。
