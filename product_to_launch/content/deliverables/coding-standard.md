---
title: "Coding Standard · 編碼規範"
slug: "coding-standard"
stage: "build"
roles: ["dev"]
order: 31
hook: "把 review 時的口水戰提前壓縮成 linter 設定"
when_to_use: "團隊 ≥ 3 人或新語言/新框架導入時"
ai_leverage: "用 Claude 對範例 PR 抽出實際違規模式，補進規範"
art: "/generated/stage-build.webp"
source: "software_architect/ppt/05-ilities §Maintainability"
---

## 解決什麼問題

人類記不住 50 條規則。Coding Standard 的價值在於決定「哪些靠工具自動擋、哪些靠 review、哪些只是建議」，不是一份漂亮 PDF。

## 誰負責、和誰對接

- **主責：** Dev Lead 或 staff engineer
- **協作：** 全體 Dev 投票、Architect 確認可演進
- **下游收件：** CI lint job、PR Template、Code Review Checklist

## 何時用、何時不用

- ✅ **必要時機：** 新專案、新語言、團隊擴編、跨服務統一基線
- ❌ **不需要時：** 個人專案、一次性 PoC
- ⚠️ **常見誤用：** 200 條規則無工具支撐；只規定縮排卻不規定錯誤處理

## AI 怎麼加速

讓 Claude 從近 50 個 PR review 評論抽 pattern，再對應到 lint rule 或 review checklist。

```prompt-quick
你是有 7+ 年生產系統經驗的資深 staff engineer（熟悉效能調校、observability、breaking change policy）。任務：把 PR comment 樣本 + 既有 lint 設定 + 語言/框架基線轉成 Coding Standard（YAML 格式）。

## 輸入素材

[PR comment 樣本 ≥ 30 條]
[現有 linter / formatter 設定]
[語言版本 + 主要框架]

輸出 schema：language_scope / rules[] (rule/rationale/example_good/example_bad/severity) / linter_config_ref / exceptions_policy / enforcement (CI/pre-commit/review) / versioning

每欄附 source: [input 第 X 段] 與 confidence: [H/M/L]；缺資料寫 TODO(缺什麼)，不編造。
結尾以 `## 自審` 段：列 confidence 最低的欄位與所需補充資料。
```

```prompt-full
## 角色

你是有 7+ 年生產系統經驗的資深 staff engineer，熟悉效能調校、observability、breaking change policy、ESLint/Ruff/golangci-lint/Checkstyle 等 linter 生態。
你的輸出會交給 Dev Lead（落地 CI lint job）、reviewer（決定 must-block vs nit）、新人（onboarding 必讀）。
他們需要每條規則都能被工具自動擋或在 review 一眼看出來，所以你的 standard 必須機械可消費、嚴重度分級清楚。

## 情境脈絡

團隊 ≥ 3 人或新語言/新框架導入時用本 Coding Standard。
本卡核心問題：哪些靠工具自動擋、哪些靠 review、哪些只是建議 — 把 review 時的口水戰提前壓縮成 linter 設定。

## 輸入素材

[PR comment 樣本 ≥ 30 條（含被指出問題與作者修正）]
[現有 linter / formatter 設定（.eslintrc / pyproject.toml / .golangci.yml 等）]
[語言版本 + 主要框架 + 既有風格指南（如 Google Style Guide）]

## 規則

1. 每條規則註明 source：[input 第 X 段 PR comment] 或 [來源未明示，需確認]。
2. Trade-off 必須列負面後果（例如：嚴格禁用 any 型別會增加新人 ramp-up 時間 X%）。
3. 缺資料的欄位標 TODO(缺什麼)，不要編造；列「需要什麼補上」。
4. 每條規則必須涵蓋 maintainability / security / observability 三象限至少一個，並標 enforcement 層級（lint / pre-commit / review / 文件建議）。
5. Out of scope 至少 3 條，明寫不處理什麼（例如：不處理跨語言通則、不處理 IDE 設定、不處理 git workflow）。
6. 每個關鍵宣稱標 confidence: [H/M/L]，L 必須附說明為何不確定。
7. 不超過 30 條規則 — 超過代表沒有取捨；無法被 linter 偵測且嚴重度 < high 的不入規範。

## 輸出格式（YAML）

language_scope:
  language: <string>
  version: <string>
  frameworks: [<framework>]
  source: <input ref>
  confidence: H | M | L

rules:
  - id: CS-001
    rule: <一句話描述>
    rationale: <為何重要 + 從哪個 PR comment 歸納>
    example_good: |
      <code>
    example_bad: |
      <code>
    severity: error | warning | info
    enforcement: lint | pre-commit | review | doc-only
    linter_rule_id: <e.g. @typescript-eslint/no-explicit-any 或 TODO(找對應規則)>
    source: <input ref>
    confidence: H | M | L

linter_config_ref:
  file: <.eslintrc.json / pyproject.toml / ...>
  ci_job: <CI 名稱>
  fail_on: error
  source: <input ref>

exceptions_policy:
  how_to_request: <e.g. inline disable + PR comment + Dev Lead approve>
  expiry: <例：每季 review 一次>
  audit_log: <where>

enforcement:
  ci: <job 名稱 + fail policy>
  pre_commit: <hook 列表>
  review: <checklist 連結>

versioning:
  current_version: <semver>
  change_policy: <如何提案修改 / 投票機制>
  deprecation_window: <例：兩個 sprint>

decision_log:
  - decision: <如：選 Prettier 而非 dprint>
    options_considered: [Prettier, dprint, Biome]
    chosen: Prettier
    rejected_reason:
      dprint: <why not>
      Biome: <why not>
    confidence: H | M | L

out_of_scope:
  - 跨語言通則（每語言獨立 standard）
  - IDE / editor 個人設定
  - Git commit message 規範（屬另一份文件）

## 思考步驟

產出前先：
1. 從 PR comment 抓 5 個高頻 pattern（次數 + 嚴重度），分別標 H/M/L confidence
2. 列至少 2 條 viable 嚴格度路徑（strict 全擋 vs progressive 漸進啟用），各自負面後果
3. 列你做了但 input 沒明說的假設（例如假設團隊已用某 linter）
4. 確認每條規則都有 enforcement 落點，不是純文件建議

## 輸出

（依 output_schema YAML 填寫）

## 自審

1. 哪條規則 confidence < H？需要再蒐集哪類 PR comment？
2. 哪些規則來自我的常識而非 input 樣本？標出來。
3. 如果只能再追加一份 input，是 production incident postmortem 還是更多 PR comment？為什麼？
```

回審重點：human 判斷 trade-off、嚴重度閾值、enforcement 落點、是否真的能被 linter 自動擋。
