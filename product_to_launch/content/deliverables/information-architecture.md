---
title: "資訊架構 IA"
slug: "information-architecture"
stage: "design"
roles: ["ux", "sa"]
order: 17
hook: "讓使用者找得到、看得懂、不迷路"
when_to_use: "新產品建構、改版重組、內容/功能 ≥ 30 項時"
ai_leverage: "用 Claude 把功能清單 → 候選 IA 分類 + card sorting 提案"
art: "/generated/stage-design.png"
source: "deep-research-report.md §產品與需求相關角色"
---

## 解決什麼問題

功能堆到一定數量後，導航變成迷宮：每個 PM 把自己的功能塞最上層、每個使用者問「OO 在哪？」沒有 IA，UI 美也救不回。
IA 在畫 wireframe 之前先決定**「資訊怎麼分類、命名、層級、跨層關聯」**，是後續所有設計的骨架。
沒做 IA，wireframe 重畫三輪都不會收斂。

## 誰負責、和誰對接

- **主責：** UX
- **協作：** SA（系統能力與資料邊界）、PM（商業優先序）、內容團隊（命名一致性）
- **下游收件：** UX 畫 wireframe、UI 做導航元件、SEO 規劃 URL 結構

## 何時用、何時不用

- ✅ **必要時機：** 新產品建構、改版、功能/內容 ≥ 30 項、跨平台一致性
- ❌ **不需要時：** 單一 flow 工具、小 widget 改版
- ⚠️ **常見誤用：** 把 IA 寫成「sitemap」就算了；IA 應包含**分類邏輯（why）+ 命名規則 + 跨層關聯**，並用 card sorting 驗證

## AI 怎麼加速

把功能清單 + 使用者語彙丟給 AI 產候選分類與 card sorting 提案，人工只審心智模型對齊。

```prompt-quick
你是有 5+ 年 product design 經驗的資深 UX designer（熟悉 IA、card sorting、tree testing、WCAG 2.2 navigation pattern）。任務：把功能清單 + 使用者語彙轉成 資訊架構 IA（YAML 格式）。

<input>
[功能清單（≥ 30 項，含名稱與一句描述）]
[訪談使用者語彙（高頻關鍵字 / mental model quote）]
[SA 提供的系統能力與資料邊界]
</input>

輸出 schema：top_level_categories / hierarchy_tree / navigation_pattern / taxonomy_rules / search_strategy / card_sorting_basis / content_inventory_ref / decision_log / out_of_scope（3 條）

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾 <verify>：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
<role>
你是有 5+ 年 product design 經驗的資深 UX designer / IA 顧問，熟悉 card sorting（open/closed）、tree testing、taxonomy design、findability heuristics、mental model mapping、WCAG 2.2 navigation patterns（landmark roles, skip links）。
你的輸出會交給 UX（畫 wireframe）、UI（做導航元件）、SEO（規劃 URL 結構）、PM（驗證商業優先序）、內容團隊（命名一致性）。
他們會用來「讓使用者找得到、看得懂、不迷路」，所以 IA 必須反映使用者心智模型而非內部組織架構，且命名歧義度要低。
</role>

<context>
新產品建構、改版重組、內容/功能 ≥ 30 項時用本卡。
本卡核心問題：資訊怎麼分類、命名、層級、跨層關聯——這是 wireframe 之前的骨架，沒做好 wireframe 重畫三輪都不會收斂。
</context>

<input>
[功能清單（≥ 30 項，含名稱、一句描述、使用頻次估計）]
[訪談使用者語彙（高頻關鍵字、mental model quote、誤命名）]
[SA 提供的系統能力與資料邊界（哪些是同一物件、哪些是跨物件）]
[商業優先序（PM 提供：哪些功能要曝光在頂層）]
</input>

<rules>
1. 每個分類決策註明 source：[功能清單第 X 項 / 訪談 P3 / SA spec §Y]；無法歸因者標 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例：task-based 分類符合 JTBD 但跨產品線難擴充；audience-based 直覺但同一使用者多角色會分裂）。
3. 缺資料的欄位標 TODO(缺什麼)，不編造命名或層級；列「需要什麼補上」（例：需 30 人 card sorting 驗證）。
4. a11y（WCAG 2.2）：導航必須支援 landmark roles、skip-to-content、keyboard tab order、合邏輯的 heading hierarchy（h1→h2→h3）——任一未達需說明為何不適用。
5. Out of scope 至少 3 條，明寫不做什麼（例：不做 wireframe、不做 URL routing 實作、不做 SEO 關鍵字研究）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明（例：未經 card sorting 驗證者必為 M 或 L）。
7. 層級 ≤ 3 層深；超過 3 層必須說明為何此複雜度必要。
</rules>

<output_schema>
top_level_categories:
  - name: <一級分類名稱>
    rationale: <為何此分類，引用使用者語彙>
    items_under: <底下大約多少項>
    source: <input ref>
    confidence: H | M | L

hierarchy_tree:
  - L1: <名稱>
    L2:
      - name: <名稱>
        L3: [<item>, <item>]
    source: <input ref>

navigation_pattern:
  primary: enum[top_nav, side_nav, tab_bar, hub_spoke]
  secondary: <breadcrumb / sub-nav>
  rationale: <為何此 pattern>
  a11y: <landmark roles + skip link + keyboard support>

taxonomy_rules:
  naming_style: enum[noun_first, verb_first, hybrid]
  label_max_chars: <如 18>
  ambiguity_check: <每個 label 評歧義度 H/M/L>
  source: <input ref>

search_strategy:
  scope: <全站 / 分類內>
  synonyms_required: <使用者語彙 vs 內部術語對應>
  filters: [<facet 1>, <facet 2>]

card_sorting_basis:
  method: enum[open, closed, hybrid]
  participants_target: <如 30 人 / segment>
  questions: [<關鍵題目 1>, <關鍵題目 2>]
  expected_disagreement: <可預期的爭議分類>

content_inventory_ref:
  total_items: <number>
  source_doc: <連結或 TODO(需內容團隊提供)>

decision_log:
  - decision: <例：分類用 task-based 還是 audience-based>
    options_considered: [task_based, audience_based, topic_based]
    chosen: task_based
    rejected_reason:
      audience_based: <為何不>
      topic_based: <為何不>
    confidence: H | M | L

out_of_scope:
  - <例：不做 wireframe / 視覺呈現>
  - <例：不做 URL routing 實作細節>
  - <例：不做 SEO 關鍵字研究>
</output_schema>

<thinking>
產出前先：
1. 從 input 抓 3-5 個關鍵 signal（高頻使用者語彙 / SA 強約束的資料邊界 / PM 商業優先序）
2. 列至少 2 條 viable 分類路徑（task-based vs audience-based）與各自負面後果
3. 列你做了但 input 沒明說的假設（例：假設新使用者佔比 > 老使用者）
4. 確認 a11y 4 項（landmark / skip link / tab order / heading hierarchy）涵蓋
</thinking>

<output>
（依 output_schema YAML 填寫）
</output>

<verify>
1. 哪個欄位 confidence < H？哪些 label 還沒經 card sorting 驗證？
2. 哪些假設來自我而非 input？標出來（特別是反映「內部組織」而非「使用者心智」的部分）。
3. 如果只能再追加一份 input，是哪一份（例：30 人 card sorting vs 競品 IA 對標）？為什麼？
</verify>
```

回審重點：human 判斷分類是否反映使用者心智模型（非內部組織架構）、命名是否一致、是否需 card sorting 驗證再凍結。
