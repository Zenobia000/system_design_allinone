# Prompt 設計規範 · Launch Atlas（v2 · Markdown headers）

> 把 54 張交付物的 prompt 從「示意級」升級成「可生產級」。
> v2 用 **markdown headers** 取代 XML tags，對 LLM 一樣 robust、對人類則直觀許多。
> v1（XML 版）的取捨理由見 §7 Migration notes。

---

## 0. 設計哲學

**官方核心**（Anthropic prompt engineering docs）：

1. **角色與脈絡明確** — `## 角色` + `## 情境脈絡` 決定模型分配注意力的方向
2. **Markdown header 分段輸入** — `## 輸入素材` / `## 規則` 等明確 header 比裸寫更穩定，邊界清楚、可讀性高，對 LLM 一樣是強分段訊號
3. **輸出 schema 嚴格** — 明列欄位、型別、缺值處理（保留 YAML 格式，因為 schema 是契約，不該被「人話化」）
4. **Step-by-step thinking** — `## 思考步驟` 段先推理再輸出
5. **Few-shot example**（選擇性）— 1-2 個 input/output 對能定義格式
6. **Self-verification** — 結尾以 `## 自審` 段審 confidence 與假設

**大廠實務補強**（PM / Architect / SRE 真實 workflow）：

- **Source attribution** — 每個結論註明來自 input 哪段，可審計
- **Negative scope** — 明寫「不做什麼」防越權
- **Calibrated uncertainty** — 每個結論標 high / mid / low confidence
- **Decision log** — 列棄案與棄因（trade-off 透明）
- **Anti-hallucination** — 缺資料寫 `TODO` 並列「需要什麼補上」，不編造
- **Schema-bound output** — 下游能機械消費（YAML / JSON / table）
- **Edge case enumeration** — 明列 3 條已知 edge case 處理

**取捨原則**：solid 永遠優先於「短」。如果 12 行做不到角色 + 輸入邊界 + schema + 自審，就寫 30-60 行的 full 版。Quick 版只是 full 版的精煉，不能是 full 版的閹割。

**為什麼不用 XML tags 了**：見 §7。一句話總結 — 使用者「複製貼到 Claude」的場景被 `<role></role>` 嚇到、看不出哪裡要自己填，門檻過高；markdown headers 對 LLM 一樣 robust 但對人類友善許多。

---

## 1. Quick 樣板（≤ 12 行）

**適用**：訪客快速試用、桌面情境、簡單 deliverable（例如 stakeholder map、priority matrix）。

````
你是 <senior role>（<domain context>）。任務：把 <input type> 轉成 <output type>。

## 輸入素材

[在此貼上：<input 具體是什麼>]

輸出 schema：
1) <field A>（含 source 標註）
2) <field B>（含 trade-off）
3) <field C>（缺資料時寫 TODO + 缺什麼）

規則：不要編造；out of scope 明列 3 條。
結尾以 `## 自審` 段：審 confidence 最低的欄位。
````

**Quick 版檢查表**（必須全中）：

- 第一行有 role + domain context（不只「你是 PM」，而是「你是有 SaaS B2B 經驗的資深 PM」）
- input 用 `## 輸入素材` header 分段，邊界清楚
- schema 至少 3 個欄位且每欄有 source/trade-off/缺值處理註記
- 有 anti-hallucination 規則
- 有「結尾自審」指示

---

## 2. Full 樣板（30–60 行）

**適用**：複雜 deliverable（PRD、ADR、API spec、capacity planning、threat model 等）— 下游決策影響大、需要稽核痕跡。

````
## 角色

你是 <senior title>，<years>+ 年 <industry/domain> 經驗。
熟悉 <relevant standards/frameworks/specs>。
你的輸出會交給 <downstream consumer>，他們會用來 <downstream action>。

## 情境脈絡

<organisation/product background — what business, what life-cycle stage, what constraints>

## 任務

根據以下 input 產出 <deliverable name>。本卡片要回答的核心問題：<one-sentence key question>。

## 輸入素材

[在此貼上：<input 1 type>]
[在此貼上：<input 2 type>]
[在此貼上：<input 3 type>]

## 規則

1. 每個結論註明 source：[input 第 X 段] 或 [來源未明示]。
2. Trade-off 必須列負面後果，不能只寫好處。
3. 缺資料的欄位：標 `TODO(缺什麼)`，不要編造。
4. <compliance / NFR — e.g. a11y, security, audit, latency>：必須涵蓋。
5. Out of scope：明列 3 條「本文件不處理」。
6. 每個關鍵宣稱標 confidence：[H/M/L]，L 必須附說明。

## 輸出格式（YAML）

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

## 思考步驟

產出前先在這個段落走完：
1. 從 input 抓 3-5 個關鍵 signal，分別標 H/M/L confidence
2. 列出至少 2 個 viable trade-off 路徑與各自的 negative consequence
3. 列出你做了但 input 沒明說的假設（assumption list）
4. 確認 compliance/NFR 涵蓋

## 輸出

（依「## 輸出格式（YAML）」填寫）

## 自審

完成後自審 3 件事：
1. 哪個欄位 confidence < 70%？為什麼？需要什麼補資料？
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，哪一份對輸出品質提升最大？
````

**Full 版檢查表**：

- `## 角色` 含具體年資、領域、熟悉的標準
- `## 情境脈絡` 描述業務情境，不只是抽象任務
- `## 輸入素材` 至少 2 個輸入來源，邊界清楚
- 規則至少 5 條，含 source attribution、trade-off、anti-hallucination、out of scope、confidence
- `## 輸出格式（YAML）` 是機械可消費的格式（YAML 為主，必要時 JSON / table），每欄含型別與 source 註記
- 有 `decision_log` 與 `out_of_scope` 欄位
- `## 思考步驟` 強制先推理
- `## 自審` 強制自審

---

## 3. 反模式（avoid）


| 反模式                            | 為何爛                     | 修法                                |
| ------------------------------ | ----------------------- | --------------------------------- |
| 「你是 PM」                        | 沒領域脈絡，模型只能用平均值          | 「你是有 fintech 合規經驗的資深 PM」          |
| 「請產生 PRD」                      | 沒輸出邊界，模型憑感覺寫            | 列 schema：8 個欄位、每欄型別               |
| 把 input 直接接在 prompt 後          | 無邊界，易受 prompt injection | 用 `## 輸入素材` header 分段，邊界清楚        |
| 「請考慮所有 edge case」              | 太抽象，模型不會真的列             | 「列至少 3 條已知 edge case 與處理方式」       |
| 「不要編造」（單獨出現）                   | 沒給替代行為，模型還是會猜           | 「缺資料寫 `TODO(缺什麼)`，並列出需要什麼補上」      |
| 完全不要求 confidence               | 高低品質結論混在一起              | 每個關鍵宣稱標 H/M/L confidence          |
| 沒 out of scope                 | 模型寫太多無關東西               | 「明列 3 條本文件不處理」                    |
| 沒 decision log                 | 棄案理由消失，無法 audit         | 加 `decision_log` schema 欄         |
| 用 markdown 當輸出格式但沒指定欄位         | 每次格式都不同                 | output_schema 維持 YAML，明列欄位 + 型別   |
| 用 XML tags 包整段（v1 舊習）          | 使用者複製去用時被 `<>` 嚇到、看不出填空 | 改 markdown `##` headers，header 對人類友善、對 LLM 同樣 robust |


---

## 4. Worked example：PRD

### Before（v1 · XML）

```
<role>
你是有 SaaS B2B 5+ 年經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、A/B testing。
</role>

<input>
[訪談逐字稿]
[JTBD 卡]
</input>

<output_schema>
problem_statement:
  business_impact: <string>
  source: <input ref>
  confidence: H | M | L
...
</output_schema>

<verify>
1. 哪個欄位 confidence < H？
</verify>
```

**問題**：使用者複製貼到 Claude 前看不出哪裡要自己改、`<role></role>` 看起來像要寫程式才能用。

### After (Quick · 12 行)

````
你是有 SaaS B2B 經驗的資深 PM（5+ 年，熟悉 OKR/JTBD/PRD/ADR）。任務：把訪談 + JTBD + journey 轉成 PRD draft（YAML 格式）。

## 輸入素材

[訪談逐字稿]
[JTBD 卡]
[Journey map]

輸出 schema：problem_statement / goal_and_metrics / users_scenarios / in_out_scope / functional_reqs / nfr / risks / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列出 confidence 最低的欄位與所需補充資料。
````

### After (Full · ~55 行)

````
## 角色

你是有 SaaS B2B 5+ 年經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、A/B testing。
你的輸出會交給 PO（拆 backlog）、Dev Lead（切任務）、QA（寫 test plan）、UX（畫 flow）。
他們需要在 30 分鐘內讀完並開始下游工作，所以你的 PRD 必須結構嚴格、欄位機械可消費。

## 情境脈絡

團隊 ≥ 3 人、跨職能新功能、需求穩定度 < 60% 時用本 PRD。
本卡核心問題：把模糊需求轉成讓 PM / UX / Architect / Dev / QA 對齊「為何做、做什麼、不做什麼」的 baseline + change policy。

## 輸入素材

[訪談逐字稿]
[JTBD 卡（含 functional / emotional / social job）]
[Journey map（含 pain point）]

## 規則

1. 每個結論註明 source：[input 第 X 段]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果。
3. 缺資料的欄位標 TODO(缺什麼)，不編造。
4. NFR 必須涵蓋 latency / a11y / security / audit 四象限。
5. Out of scope 至少 3 條。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明。
7. 不寫 how（實作）；只寫 what & why。

## 輸出格式（YAML）

problem_statement:
  business_impact: <string + 量化估算>
  source: <input ref>
  confidence: H | M | L

goal_and_metrics:
  goal: <one-sentence goal>
  success_metrics: [<metric 1>, <metric 2>, <metric 3>]
  counter_metric: <prevent goal-hacking>

# ...（其餘欄位略，見 content/deliverables/prd.md 完整版）

decision_log:
  - decision: <what>
    chosen: <A>
    rejected_reason:
      B: <why>

out_of_scope:
  - <thing 1>
  - <thing 2>
  - <thing 3>

## 思考步驟

1. 從 input 抓 3-5 個關鍵 signal
2. 列至少 2 條 viable scope 路徑與負面後果
3. 列你做了但 input 沒明說的假設
4. 確認 NFR 4 象限涵蓋

## 自審

1. 哪個欄位 confidence < H？列出來與所需補充資料。
2. 哪些假設來自我而非 input？標出來。
3. 如果只能再追加一份 input，是哪一份？為什麼？
````

---

## 5. 驗收清單

對任一張卡的 prompt，問這 10 題，答「是」≥ 8 即合格：

1. role 有具體年資與領域？（不只「資深 PM」）
2. input 用 `## 輸入素材` header 分段，邊界清楚？
3. output 是機械可消費的格式（YAML / JSON / table）？
4. 每個 schema 欄位有型別與 source 註記？
5. 有 anti-hallucination 規則（缺資料寫 TODO，不是「不要編造」單句）？
6. 有 out of scope 列表（至少 3 條）？
7. 有 decision log 或 trade-off 欄位？
8. 有 confidence calibration（H/M/L）？
9. 有 `## 思考步驟` 強制推理？
10. 有 `## 自審` 段？

不到 8 分 → 用 full 樣板重寫。8 分以上 → 進 quick 樣板壓縮。

---

## 6. 怎麼用本規範

> **v3 update（2026-05）：** 本規範描述 v1→v2（XML→markdown header prompt）的設計。v2→v3 已進一步把 prompt 改為**文件範本**（`template-light` / `template-full` + 薄 trigger）—— 範本本身就是 spec，prompt 退為一行 trigger。舊的 evolve / migrate dev 腳本已連同 v2 一併退役。

1. **新卡 rewrite**：手動參考 `content/deliverables/prd.md` 與 `jtbd.md` 兩張 reference 卡的 template-light + template-full 結構。
2. **fence 名稱**：用 ```` ```template-light ```` 與 ```` ```template-full ```` 包**文件範本**（不是 prompt 包裝器）。舊 `prompt-quick` / `prompt-full` 仍在 lib/content.ts 與 build-skills.mjs 保留為 legacy fallback。範本內含 mermaid / ts / bash 子 fence 時，外層用 4-tick `````` 包裹。
3. **一次性 migration**：v2→v3 已把 54 張卡從「YAML schema 輸出 prompt」全面轉成「markdown 文件範本 + 薄 trigger」。本規範第 5 章「prompt vs template」的概念劃分已被更新版本取代。

---

## 7. Migration notes（v1 → v2）

### 為什麼從 XML tags 改 markdown headers

| 維度 | v1 XML (`<role>...</role>`) | v2 markdown (`## 角色`) |
|---|---|---|
| LLM 端 robustness | 高 | 高（headers 是 LLM 強分段訊號） |
| 防 prompt-injection | 高 | 中-高（fence + header 雙重邊界仍能 isolate input） |
| 使用者第一眼可讀性 | 低（看起來像 code） | 高（中文 header 一眼看懂分段） |
| 「哪裡要我填」直覺度 | 低 | 高 |
| 維護成本 | 中（要記住 9 個 tag 名） | 低（用 markdown 標準語法） |
| Schema 機械可消費性 | 高（YAML inside `<output_schema>`） | 高（YAML inside `## 輸出格式（YAML）`） |

決策依據：**使用者實測場景是「複製貼到 Claude」**，這個場景下的人類友善度權重高於理論上的 XML robustness 微差。Schema 區塊保留 YAML，因為它是輸出契約、不是給使用者改的。

### Tag → Header 對照

| v1 XML | v2 Markdown header |
|---|---|
| `<role>` | `## 角色` |
| `<context>` | `## 情境脈絡` |
| `<task>` | `## 任務` |
| `<input>` | `## 輸入素材` |
| `<rules>` | `## 規則` |
| `<output_schema>` | `## 輸出格式（YAML）` |
| `<thinking>` | `## 思考步驟` |
| `<output>` | `## 輸出` |
| `<verify>` | `## 自審` |

### 仍允許 v1 寫法的場合

無。v3 後新卡或 rewrite 都應採文件範本（template-light / template-full）。Schema YAML body 內的型別佔位符（如 `<string>`、`<input ref>`、`<scenario>`）不受 v1/v2 規範影響——但 v3 範本不再使用 YAML schema，這些 angle bracket 佔位符也已退役。
