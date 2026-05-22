# Prompt 設計規範 · Launch Atlas

> 把 54 張交付物的 prompt 從「示意級」升級成「可生產級」。
> 對齊 Anthropic 官方 prompt engineering best practices ＋ 大廠實務 know-how。

---

## 0. 設計哲學

**官方核心**（Anthropic prompt engineering docs）：

1. **角色與脈絡明確** — `role` + `context` 決定模型分配注意力的方向
2. **XML tag 分隔輸入** — `<input>...</input>` 比字面 quote 更穩定，避免 prompt-injection
3. **輸出 schema 嚴格** — 明列欄位、型別、缺值處理
4. **Step-by-step thinking** — `<thinking>` 區塊先推理再輸出
5. **Few-shot example**（選擇性）— 1-2 個 input/output 對能定義格式
6. **Self-verification** — 結尾自審 confidence 與假設

**大廠實務補強**（PM / Architect / SRE 真實 workflow）：

- **Source attribution** — 每個結論註明來自 input 哪段，可審計
- **Negative scope** — 明寫「不做什麼」防越權
- **Calibrated uncertainty** — 每個結論標 high / mid / low confidence
- **Decision log** — 列棄案與棄因（trade-off 透明）
- **Anti-hallucination** — 缺資料寫 `TODO` 並列「需要什麼補上」，不編造
- **Schema-bound output** — 下游能機械消費（YAML / JSON / table）
- **Edge case enumeration** — 明列 3 條已知 edge case 處理

**取捨原則**：solid 永遠優先於「短」。如果 12 行做不到角色 + 輸入邊界 + schema + 自審，就寫 30-60 行的 full 版。Quick 版只是 full 版的精煉，不能是 full 版的閹割。

---

## 1. Quick 樣板（≤ 12 行）

**適用**：訪客快速試用、桌面情境、簡單 deliverable（例如 stakeholder map、priority matrix）。

```
你是 <senior role>（<domain context>）。任務：把 <input type> 轉成 <output type>。

<input>
[在此貼上：<input 具體是什麼>]
</input>

輸出 schema：
1) <field A>（含 source 標註）
2) <field B>（含 trade-off）
3) <field C>（缺資料時寫 TODO + 缺什麼）

規則：不要編造；out of scope 明列 3 條；最後一段 <verify> 自審 confidence 最低的欄位。
```

**Quick 版檢查表**（必須全中）：

- 第一行有 role + domain context（不只「你是 PM」，而是「你是有 SaaS B2B 經驗的資深 PM」）
- input 用 `<input>` tag 包住，邊界清楚
- schema 至少 3 個欄位且每欄有 source/trade-off/缺值處理註記
- 有 anti-hallucination 規則
- 有 self-verify 段

---

## 2. Full 樣板（30–60 行）

**適用**：複雜 deliverable（PRD、ADR、API spec、capacity planning、threat model 等）— 下游決策影響大、需要稽核痕跡。

```
<role>
你是 <senior title>，<years>+ 年 <industry/domain> 經驗。
熟悉 <relevant standards/frameworks/specs>。
你的輸出會交給 <downstream consumer>，他們會用來 <downstream action>。
</role>

<context>
<organisation/product background — what business, what life-cycle stage, what constraints (regulated industry? scale? legacy?) >
</context>

<task>
根據以下 input 產出 <deliverable name>。本卡片要回答的核心問題：<one-sentence key question>。
</task>

<input>
[在此貼上：<input 1 type>]
[在此貼上：<input 2 type>]
[在此貼上：<input 3 type>]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段] 或 [來源未明示]。
2. Trade-off 必須列負面後果，不能只寫好處。
3. 缺資料的欄位：標 `TODO(缺什麼)`，不要編造。
4. <compliance / NFR — e.g. a11y, security, audit, latency>：必須涵蓋。
5. Out of scope：明列 3 條「本文件不處理」。
6. 每個關鍵宣稱標 confidence：[H/M/L]，L 必須附說明。
</rules>

<output_schema>
（YAML 格式）

<field_1>:
  required: true
  type: <string | enum[...] | list[<type>]>
  source: <which input section drove this>
  example: |
    <inline example value>

<field_2>:
  ...

decision_log:
  - decision: <what was decided>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why not>
      C: <why not>
    confidence: H | M | L

out_of_scope:
  - <thing 1 this deliverable does NOT cover>
  - <thing 2>
  - <thing 3>
</output_schema>

<thinking>
產出前先在這個區塊裡走完：
1. 從 input 抓 3-5 個關鍵 signal，分別標 H/M/L confidence
2. 列出至少 2 個 viable trade-off 路徑與各自的 negative consequence
3. 列出你做了但 input 沒明說的假設（assumption list）
4. 確認 compliance/NFR 涵蓋
然後才進 <output>。
</thinking>

<output>
（依 output_schema 填寫，YAML）
</output>

<verify>
完成後自審 3 件事：
1. 哪個欄位 confidence < 70%？為什麼？需要什麼補資料？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，哪一份對輸出品質提升最大？
</verify>
```

**Full 版檢查表**：

- `<role>` 含具體年資、領域、熟悉的標準
- `<context>` 描述業務情境，不只是抽象任務
- `<input>` 至少 2 個輸入來源，各自有邊界
- `<rules>` 至少 5 條，含 source attribution、trade-off、anti-hallucination、out of scope、confidence
- `<output_schema>` 是機械可消費的格式（YAML / JSON / table），每欄含型別與 source 註記
- 有 `decision_log` 與 `out_of_scope` 欄位
- `<thinking>` 強制先推理
- `<verify>` 強制自審

---

## 3. 反模式（avoid）


| 反模式                    | 為何爛                     | 修法                           |
| ---------------------- | ----------------------- | ---------------------------- |
| 「你是 PM」                | 沒領域脈絡，模型只能用平均值          | 「你是有 fintech 合規經驗的資深 PM」     |
| 「請產生 PRD」              | 沒輸出邊界，模型憑感覺寫            | 列 schema：8 個欄位、每欄型別          |
| 把 input 直接接在 prompt 後  | 無邊界，易受 prompt injection | `<input>...</input>` 包起來     |
| 「請考慮所有 edge case」      | 太抽象，模型不會真的列             | 「列至少 3 條已知 edge case 與處理方式」  |
| 「不要編造」（單獨出現）           | 沒給替代行為，模型還是會猜           | 「缺資料寫 `TODO(缺什麼)`，並列出需要什麼補上」 |
| 完全不要求 confidence       | 高低品質結論混在一起              | 每個關鍵宣稱標 H/M/L confidence     |
| 沒 out of scope         | 模型寫太多無關東西               | 「明列 3 條本文件不處理」               |
| 沒 decision log         | 棄案理由消失，無法 audit         | 加 `decision_log` schema 欄    |
| 用 markdown 當輸出格式但沒指定欄位 | 每次格式都不同                 | 改 YAML / JSON schema         |


---

## 4. Worked example：PRD

### Before（現況）

```
Prompt: 你是資深 PM，根據以下訪談逐字稿、JTBD、journey map，
生 PRD draft，欄位包含：
1) Problem statement（含商業影響與成本）
2) Goal + 3 個可量化 success metric + counter-metric
3) Users & scenarios（含 edge case）
4) In/out scope（明寫不做什麼）
5) Functional requirements with acceptance criteria
6) NFR（latency / a11y / security / audit）
7) Risks + 3 個未決問題（unknown），不要編造
8) Decision log

[輸入...]
```

**問題**：role 不夠具體；input 沒邊界 tag；schema 是 markdown 條列而非機械可消費；沒 thinking 階段；沒 self-verify；source attribution 缺；confidence 缺。

### After (Quick · 12 行)

```
你是有 SaaS B2B 經驗的資深 PM（5+ 年，熟悉 OKR/JTBD/PRD/ADR）。任務：把訪談 + JTBD + journey 轉成 PRD draft（YAML 格式）。

<input>
[訪談逐字稿]
[JTBD 卡]
[Journey map]
</input>

輸出 schema：problem_statement / goal_and_metrics / users_scenarios / in_out_scope / functional_reqs / nfr / risks / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列出 confidence 最低的欄位與所需補充資料。
```

### After (Full · ~55 行)

```
<role>
你是有 SaaS B2B 5+ 年經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、A/B testing。
你的輸出會交給 PO（拆 backlog）、Dev Lead（切任務）、QA（寫 test plan）、UX（畫 flow）。
他們需要在 30 分鐘內讀完並開始下游工作，所以你的 PRD 必須結構嚴格、欄位機械可消費。
</role>

<context>
團隊 ≥ 3 人、跨職能新功能、需求穩定度 < 60% 時用本 PRD。
本卡核心問題：把模糊需求轉成讓 PM / UX / Architect / Dev / QA 對齊「為何做、做什麼、不做什麼」的 baseline + change policy。
</context>

<input>
[訪談逐字稿]
[JTBD 卡（含 functional / emotional / social job）]
[Journey map（含 pain point）]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：若選 A，則犧牲 B 的 X% 使用者體驗）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. NFR 必須涵蓋 latency / a11y / security / audit 四象限，任一象限沒提到要說明為何不適用。
5. Out of scope 至少 3 條，明寫不做什麼。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 不寫 how（實作）；只寫 what & why。
</rules>

<output_schema>
problem_statement:
  business_impact: <string + 量化估算>
  cost_of_inaction: <string>
  source: <input ref>
  confidence: H | M | L

goal_and_metrics:
  goal: <one-sentence goal>
  success_metrics: [<metric 1>, <metric 2>, <metric 3>]  # 至少 3 個可量化
  counter_metric: <prevent goal-hacking>
  source: <input ref>

users_scenarios:
  primary_persona: <ref to JTBD>
  scenarios: [<scenario>]
  edge_cases: [<edge case 1>, <edge case 2>, <edge case 3>]

in_out_scope:
  in: [<thing 1>, <thing 2>]
  out: [<thing 1>, <thing 2>, <thing 3>]  # 至少 3 條
  rationale_for_out: <why these are out>

functional_requirements:
  - id: FR-001
    statement: <what>
    acceptance_criteria: [<AC 1>, <AC 2>]
    source: <input ref>
    confidence: H | M | L

non_functional_requirements:
  latency: <target + 為何此值>
  a11y: <WCAG level + 為何>
  security: <data classification + threat>
  audit: <log retention + compliance basis>

risks_and_unknowns:
  risks: [<risk + mitigation>]
  unknowns: [<unknown 1>, <unknown 2>, <unknown 3>]  # 至少 3 個未決，不編造

decision_log:
  - decision: <what>
    options_considered: [<A>, <B>, <C>]
    chosen: <A>
    rejected_reason:
      B: <why>
      C: <why>
    confidence: H | M | L
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（訪談關鍵金句 / JTBD 高頻 functional job / journey 最痛 pain point）
2. 列至少 2 條 viable scope 路徑（最小可用 vs 完整），各自負面後果
3. 列你做了但 input 沒明說的假設
4. 確認 NFR 4 象限都涵蓋
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

---

## 5. 驗收清單

對任一張卡的 prompt，問這 10 題，答「是」≥ 8 即合格：

1. role 有具體年資與領域？（不只「資深 PM」）
2. input 用 XML tag 包住，邊界清楚？
3. output 是機械可消費的格式（YAML / JSON / table）？
4. 每個 schema 欄位有型別與 source 註記？
5. 有 anti-hallucination 規則（缺資料寫 TODO，不是「不要編造」單句）？
6. 有 out of scope 列表（至少 3 條）？
7. 有 decision log 或 trade-off 欄位？
8. 有 confidence calibration（H/M/L）？
9. 有 `<thinking>` 階段強制推理？
10. 有 `<verify>` 自審段？

不到 8 分 → 用 full 樣板重寫。8 分以上 → 進 quick 樣板壓縮。

---

## 6. 怎麼用本規範

1. **手動 rewrite**：對每張卡，用 `scripts/evolve-prompt.mjs <slug>` 印 scaffold，填空。
2. **lint 既有 prompt**：`scripts/evolve-prompt.mjs <slug> --check`，看分數與缺什麼。
3. **批次掃描**：`scripts/evolve-prompt.mjs --check-all`，列出所有 < 8 分的卡（待 rewrite 清單）。
4. **建立 dual fenced block**：rewrite 完，把 quick 與 full 兩段 prompt 分別用 ````prompt-quick` 與 ````prompt-full` 圍欄（或保留現有單 ``` 圍欄，由 build-skills 抽第一段）。後續若要 UI 支援切換，另案處理。

