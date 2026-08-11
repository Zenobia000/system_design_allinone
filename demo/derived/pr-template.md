# PR Template · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/04-build/10-code-review-checklist` 推導，未經課堂實跑與人工審定。
> 與 `demo/04-build/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`code-review-checklist`、`coding-standard`　**下游**：日常 PR 流程、`ci-cd-pipeline`

---

## 本範例的用途

下面整段是**可直接放進 `.github/pull_request_template.md` 的內容**。設計原則只有一條：

> **每一欄都是因為某次出事才加的。沒有出事理由的欄位不留。**

兩人團隊的 PR 模板若超過一屏，作者會開始複製貼上前一個 PR。因此本模板刻意短，且**把最容易出事的三件事放在 checklist 最前面**（來源誠實、業務常數、降級路徑）。

---

## 1. Summary

```markdown
## Summary
<!-- 一句話：這個 PR 讓使用者/系統多了什麼、少了什麼。不要複製 commit message。 -->

```

## 2. Why

```markdown
## Why
<!-- 連回上游：卡片 slug、需求編號（P0-x）、事故編號或 KR。
     若沒有任何上游依據，說明為什麼現在做這件事。 -->
- 對應需求：
- 對應卡片／文件：
```

## 3. Changes

```markdown
## Changes
<!-- 依模組列，讓 reviewer 知道要用什麼眼光看哪一段。 -->
- `domain/…`：
- `adapters/…`：
- `components/…`：

<!-- 有 UI 變更請附前後截圖；有狀態變更請附各狀態截圖（含錯誤態與降級態）。 -->
```

## 5. Test Plan & Risk

```markdown
## Test Plan
<!-- reviewer 要能照著重現。「已測試」不算。 -->
- [ ] 單元測試：
- [ ] 手動驗證步驟：
- [ ] 邊界／錯誤態驗證：

## Risk
- 影響範圍：
- 回滾方式：<!-- feature flag 名稱 / revert / 需要資料處理？ -->
- 若出事最先看哪個儀表板或事件：
```

## 9. Reviewer Checklist

```markdown
## Reviewer Checklist
<!-- 前三項是 SmartTrip 特有的高風險項，任一不過就不 approve。 -->
- [ ] **來源誠實**：沒有把 cache/mock 當 live 回報；`FxResult.source` 原樣傳遞（coding-standard R8）
- [ ] **業務常數**：1.1 緩衝、燈號門檻、進位單位、TTL 沒有被硬編碼在使用處（R5）
- [ ] **降級路徑**：FX 不可用時建議換匯額仍照常顯示；燈號整塊移除不留空洞（frd BR-02）

- [ ] 分層：domain 沒有 import adapters／react；I/O 只在 adapters（R1、R2）
- [ ] 錯誤處理：adapter 不 throw；catch 沒有空實作（R6、R9）
- [ ] 金額：domain 內用 Money 而非裸 number（R4）
- [ ] 事件：新增/修改分析事件時，欄位符合白名單且不含個資（frd BR-05）
- [ ] 測試：新邏輯有測；錯誤／降級路徑有測，不只 happy path
- [ ] 文案：使用者可見文字集中在文案表；燈號相關文案標記需法務確認（R10）
```

## 12. Confidence & TODO

```markdown
## Confidence & TODO
<!-- 誠實欄位。寫「無」也可以，但不要留空。 -->
- 本 PR 我最沒把握的部分：
- 已知未解／後續要補：
```

---

## 設計說明（不進模板）

### 為什麼是這幾欄

| 欄位 | 出事理由 |
|---|---|
| **Why 要求連回上游** | 沒有依據的變更在 4 週驗證窗裡是純消耗（`okr` 週會禁止討論新功能的同一邏輯） |
| **Changes 依模組列** | reviewer 看 `domain` 與看 `components` 的眼光不同 |
| **狀態截圖含錯誤態** | `high-fidelity-mockup` D1：漏狀態比漏畫面更常炸 |
| **Risk 的回滾方式** | `rollback-plan` 要求每個變更有回滾路徑；PR 是最後能問這件事的地方 |
| **Checklist 前三項置頂** | 對應 `threat-model` T1／T2 與 `north-star` C3——這三項出事會摧毀唯一資產（信任） |
| **Confidence & TODO** | 與所有交付物卡一致的誠實欄位；讓 reviewer 知道往哪看 |

### 明確不放的欄位

| 不放 | 理由 |
|---|---|
| 「是否符合編碼規範」 | ESLint／Prettier 已在 CI 擋住（`coding-standard` 執行矩陣），問了是浪費 |
| 「是否更新文件」 | 兩人團隊，文件更新靠 review 對話而非勾選框 |
| 效能／安全的泛用勾選項 | 沒有具體判準的勾選框只會被無腦打勾 |
| Jira/工單編號 | 目前無工單系統（canon 未記載） |

---

## Decision Log

| # | 決策 | 理由 | 影響 |
|---|---|---|---|
| D1 | **模板控制在一屏內** | 過長會導致複製貼上 | 只保留有出事理由的欄位 |
| D2 | **高風險三項置頂並標為否決條件** | 來源誠實／業務常數／降級路徑對應最高優先威脅 | reviewer 不得跳過 |
| D3 | **不放編碼規範勾選項** | CI 已擋 | 避免重複勞動 |
| D4 | **保留 Confidence & TODO** | 與交付物卡的誠實欄位一致 | 讓不確定性浮出水面而非藏在心裡 |

---

## Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| 高風險三項的選擇 | `[M]` | 推導自 `threat-model` T1／T2 與 `north-star` C3 |
| 模板欄位結構 | `[H]` | 對應本卡範本章節 |
| 「一屏內」的可行性 | `[M]` | 未實際渲染測量 |

**TODO / 未解**

- [ ] **未與 `code-review-checklist` 合併**。該卡已有 8–12 條必查項，本模板的 Reviewer Checklist 有重疊。**兩份清單並存會導致兩邊都不維護**——需決定哪一份是唯一真相。
- [ ] **兩人團隊的 review 實務未定**：只有 2 位 FE，互審時誰擋得住誰？`threat-model` D2 要求 T2 必查，但同儕壓力下容易放行。
- [ ] **未定義 PR 大小上限**：`c4-diagram` 有「主責 PR 規模估算」，但沒有轉成規範。
- [ ] 模板未涵蓋 spike PR（`tech-spike` D3 要求標示為預期丟棄）。
