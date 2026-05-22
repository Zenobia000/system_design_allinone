---
title: "競品掃描"
slug: "competitive-scan"
stage: "discovery"
roles: ["pm", "ba"]
order: 5
hook: "找出對手做了什麼、沒做什麼、為什麼"
when_to_use: "進入新市場、評估差異化定位、stakeholder 質疑「為何要做」時"
ai_leverage: "用 Claude 同時分析多家對手 landing page + pricing + review"
art: "/generated/stage-discovery.webp"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

不看對手，容易做出「對手早做過、且已驗證失敗」的功能；或反過來，盲抄對手 feature list 而忽略自家定位。
競品掃描的價值不是抄，而是**找定位空隙與技術可行邊界**。

## 誰負責、和誰對接

- **主責：** PM（最終決策定位）
- **協作：** BA（補 stakeholder 與法遵限制）、行銷（補 GTM 訊息）
- **下游收件：** PM 寫 PRD positioning、Architect 評估技術可行性

## 何時用、何時不用

- ✅ **必要時機：** 進新市場、做差異化定位、向 stakeholder 解釋「為何不抄某對手」
- ❌ **不需要時：** 內部工具、合規限期任務、純技術升級
- ⚠️ **常見誤用：** 只比 feature checkmark，不看 pricing、定位、客群、tech debt；feature 多 ≠ 贏

## AI 怎麼加速

把對手官網、定價頁、評論餵給 AI 做結構化整理，人工驗差異化空隙是否真存在。

```prompt-quick
你是有 5+ 年 SaaS B2B 經驗的資深 PM（熟悉 OKR / JTBD / PRD / positioning theory / Porter five forces）。任務：把對手官網 + 定價 + review 轉成 競品掃描（YAML 格式）。

<input>
[對手 5 家：官網 / landing page / pricing 頁]
[第三方 review（G2 / Capterra / app store）]
[我方定位假設與 GTM 訊息]
</input>

輸出 schema：competitor_set / positioning_axes / feature_matrix / pricing_comparison / weakness_opportunities / defensive_moats / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造 feature 或 pricing。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 SaaS B2B 經驗的資深 PM，熟悉 OKR、JTBD、PRD、ADR、positioning theory（April Dunford）、Porter five forces、SWOT、blue ocean。
你的輸出會交給 PM（寫 PRD positioning）、Architect（評估技術可行性）、行銷（做 GTM 訊息），他們會用來決定差異化定位與要不要進這個市場。
所以競品掃描必須找定位空隙與技術可行邊界，不是 feature checkmark 比賽。
</role>

<context>
進入新市場、評估差異化定位、stakeholder 質疑「為何要做」時用本 deliverable。
本卡核心問題：找出對手做了什麼、沒做什麼、為什麼，避免做出對手早做過且驗證失敗的功能。
</context>

<task>
根據以下 input 產出「競品掃描」draft，覆蓋 5 家對手。
</task>

<input>
[對手 5 家資料：官網 / landing page / pricing 頁 / changelog]
[第三方 review（G2 / Capterra / app store / Reddit）]
[我方定位假設與 GTM 訊息]
</input>

<rules>
1. 每個結論註明 source：[input 第 X 段 + 連結 / quote]；無法歸因者標 [來源未明示，需確認] 並降 confidence。
2. Trade-off 必須列負面後果（選定位空隙 A，則放棄空隙 B 的 N 個潛在市場）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造 feature、pricing、客數；列「需要什麼補上」。
4. 合規 / 地域涵蓋：必須註明對手是否服務管制市場（GDPR / HIPAA / SOC 2）；自家若進入該市場須評估合規成本。
5. Out of scope：明列 3 條本文件不處理（例如：對手財報深度分析、技術棧逆向工程、收購評估）。
6. 每個結論（優勢 / 弱點 / 空隙）標 confidence: [H/M/L]，L 必須附說明為何不確定（資料二手 / 樣本少）。
7. 不只列 feature；必須涵蓋 pricing、定位、客群、tech debt、review sentiment 至少 5 個維度。
</rules>

<output_schema>
competitor_set:
  required: true
  type: list[{name: string, url: string, scope_rationale: string}]
  min_count: 3

positioning_axes:
  type: list[{axis: string, range: [low, high]}]
  example:
    - axis: "解決問題深度（單點工具 ↔ end-to-end 平台）"
    - axis: "目標客群（SMB ↔ Enterprise）"
  source: <input ref>

feature_matrix:
  - feature: <name>
    us: bool | TODO
    competitor_A: bool
    competitor_B: bool
    source: <input ref>
    note: <例如：A 的實作有限制>

pricing_comparison:
  - competitor: A
    model: enum[per_seat, usage_based, flat, freemium, tiered]
    entry_price: <number + currency>
    enterprise_price: <number or "contact sales">
    free_tier: bool
    source: <input ref>
    confidence: H | M | L

weakness_opportunities:
  - competitor: A
    weakness: <string>
    review_evidence: <quote + 評分 + 來源>
    exploitability: enum[high, mid, low]
    source: <input ref>
    confidence: H | M | L

positioning_gaps:
  required: true
  type: list[{gap: string, rationale: string, our_fit: enum[strong, partial, weak], confidence: H/M/L}]
  min_count: 3

defensive_moats:
  - moat: <e.g., data network effect>
    sustainability: <years estimate>
    risk_of_erosion: <what could break it>

compliance_coverage:
  - competitor: A
    certifications: [SOC2, GDPR, HIPAA]
    geo_restrictions: [<region>]
    source: <input ref>

decision_log:
  - decision: <選哪個定位空隙作為主攻>
    options_considered: [gap_1, gap_2, gap_3]
    chosen: gap_1
    rejected_reason:
      gap_2: <為何不選>
      gap_3: <為何不選>
    confidence: H | M | L

out_of_scope:
  - 不做對手財報深度分析（屬 corp dev / IR）
  - 不做技術棧逆向工程（屬 security research）
  - 不評估收購可能（屬 M&A）
</output_schema>

<thinking>
產出前先 step-by-step：
1. 從 input 抓 5-8 個 positioning 軸與每家對手的位置，標 H/M/L
2. 列至少 2 條定位空隙候選與各自負面後果（市場小但獨占 vs 市場大但紅海）
3. 列你做了但 input 沒明說的假設（市場規模 / 客戶 willingness to pay）
4. 確認合規 / 地域涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個 positioning_gap 的 confidence < H？需要什麼補資料（更多 review / sales call 紀錄 / 用戶訪談）？
2. 哪些結論來自我對對手的腦補而非 input？標出來。
3. 如果只能再追加一份 input（流失客戶訪談 / sales call 錄音 / 對手 changelog 一年份），哪一份對輸出品質提升最大？
</verify>
```

回審重點：是否真有差異化空間、是否高估自家能力、weakness 是否有 review evidence 而非主觀判斷。
