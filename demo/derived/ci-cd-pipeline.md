# CI/CD Pipeline · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/05-ship/12-release-plan` 推導，未經課堂實跑與人工審定。
> 與 `demo/05-ship/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`coding-standard`、`test-plan`、`feature-flag`　**下游**：`canary-strategy`、`go-no-go-checklist`、`release-plan`

---

## 1. Executive Summary

一個 PWA、一個部署單位（`c4-diagram`：6 個邏輯 container 跑在 1 個 bundle）、兩個開發者。Pipeline 應該**短到沒人想繞過它**。

設計目標：

| 目標 | 數值 |
|---|---|
| PR gate 總時長 | **< 5 分鐘** |
| 主線合併 → 上 production | **< 15 分鐘**（含灰度第一階段） |
| 需要人工介入的環節 | **1 個**（灰度推進的 Go/No-Go） |

一句原則：**gate 只擋「會讓使用者拿到錯數字」的問題**。風格、覆蓋率百分比、文件更新這類事情不擋。

---

## 2. Stages

```
PR 開啟
  │
  ├─▶ [S1] 靜態檢查      prettier --check · tsc --noEmit · eslint · madge
  ├─▶ [S2] 單元測試      L1（frd BR-01/BR-02 分支 100%）
  ├─▶ [S3] 整合測試      L2（U1–U12 降級路徑）
  └─▶ [S4] 建置          next build → 產物大小檢查
                │
        合併到 main
                │
  ├─▶ [S5] 預覽部署      PR 專屬預覽環境（給 UAT / 探索式測試）
  ├─▶ [S6] Production 部署（flag 全關，新程式碼不生效）
  ├─▶ [S7] 部署後煙霧測試 L3 主線 6 步
  └─▶ [S8] 灰度推進      依 canary-strategy，人工 Go/No-Go
```

| Stage | 內容 | 時長目標 | 平行？ |
|---|---|---|---|
| **S1** | Prettier、TypeScript、ESLint、循環依賴 | 60s | ✔ 與 S2 平行 |
| **S2** | 單元測試 | 60s | ✔ |
| **S3** | 整合測試（含 12 條降級路徑） | 90s | 在 S1/S2 之後 |
| **S4** | `next build` + bundle 大小 | 90s | 與 S3 平行 |
| **S5** | 預覽部署 | 60s | 合併前 |
| **S6** | production 部署（**部署 ≠ 發布**） | 90s | |
| **S7** | 煙霧測試（真實環境） | 60s | |
| **S8** | 灰度推進 | 依 `canary-strategy` | 人工 |

> **S6 的「部署 ≠ 發布」是整條 pipeline 的核心**（`feature-flag` 類別 A）。程式碼上線但 flag 關著，發布是另一個獨立動作。這讓回滾不需要重新部署。

---

## 3. Gates per Stage

| Gate | 條件 | 阻擋合併？ | 誰能豁免 |
|---|---|---|---|
| **G1** 格式與型別 | `prettier --check`、`tsc --noEmit` 全過 | ✔ | 無人 |
| **G2** Lint | ESLint 對**變更檔案** 0 error | ✔ | 無人（`coding-standard` 分階段策略） |
| **G3** 循環依賴 | `madge --circular` 無輸出 | ✔ | 無人 |
| **G4** 單元測試 | 全綠；**BR-01／BR-02 分支覆蓋 100%** | ✔ | 無人 |
| **G5** 整合測試 | 全綠；**U2／U3／U5／U9 不得 skip** | ✔ | 無人 |
| **G6** 建置 | 成功；**bundle 增幅 < 10%** 否則需 PR 說明 | 增幅超標僅警告 | Dev 說明即可 |
| **G7** 煙霧測試 | L3 六步全過 | ✔ 阻擋灰度推進 | 無人 |
| **G8** 灰度推進 | `canary-strategy` 各階段成功條件 | ✔ | **PO** |

### 明確不設 gate 的項目

| 不擋 | 理由 |
|---|---|
| 整體測試覆蓋率百分比 | 虛榮指標（`test-plan` §3）；已用指定模組分支覆蓋取代 |
| 文件是否更新 | 兩人團隊靠 review 對話 |
| PR 大小 | 硬性上限會誘發拆得莫名其妙的 PR |
| 效能預算 | 靜態站，瓶頸在外部 FX，設了也擋不到真問題 |

> **G4 的「指定模組 100% 分支」是刻意的不對稱**：換匯算式與燈號判定要求全覆蓋，UI 元件完全不要求。這是 `test-plan` 不對稱策略在 CI 上的落地。

---

## 5. Secret Management

| Secret | 用途 | 存放 | 誰能讀 | 輪替 |
|---|---|---|---|---|
| FX API 金鑰（若採付費來源） | 取匯率 | **CI secret store**，**絕不進 client bundle** | CI + serverless proxy | 每季 |
| Feature flag SDK key（server side） | flag 讀取 | CI secret store | CI | 每季 |
| Feature flag client key | 前端讀 flag | 可公開（唯讀 client key） | 全部 | — |
| 分析服務 token | 送事件 | 視服務而定；優先選不需 token 的 beacon 端點 | — | — |
| 部署憑證 | 部署 | CI OIDC，**不用長期金鑰** | CI | 自動 |

### 規則

| # | 規則 | 依據 |
|---|---|---|
| **SM1** | **任何 secret 不得出現在前端 bundle** | `threat-model` T7 |
| **SM2** | CI 加入 secret 掃描（commit 與 build 產物） | 防止誤提交 |
| **SM3** | 部署憑證使用 OIDC 短期權杖，不放長期金鑰 | 減少外洩面 |
| **SM4** | flag 的 client key 與 server key 分離，client 端只給唯讀 | |

> **SM1 與架構有衝突**：`adr` ADR-001 決定「無後端」，但付費 FX 金鑰無法安全放在前端。
> 若 `tech-spike` 選出需金鑰的來源，就必須引入一個極薄的 serverless proxy——**那是對 ADR-001 的修改，需開 ADR-002**（`threat-model` T7 同一未解項）。

---

## 7. Redundancy to Remove

盤點目前流程中重複或無效的環節：

| # | 冗餘 | 為什麼是冗餘 | 處置 |
|---|---|---|---|
| **X1** | 同一降級行為在 L1 與 L2 都測 | 單元測 `judge()` 回 null，整合又測一次燈號消失 | **各留一層**：算式在 L1，端到端顯示在 L2（`integration-test` §12 同一 TODO） |
| **X2** | Lint 在本地 hook 與 CI 都跑完整全庫 | 本地跑全庫太慢，會被 `--no-verify` 繞過 | 本地只跑變更檔案；CI 跑完整 |
| **X3** | 預覽部署對每個 commit 都建 | 兩人團隊，多數 commit 無人看 | 只在 PR 開啟與標記 `needs-review` 時建 |
| **X4** | 煙霧測試與 UAT 重疊的步驟 | L3 六步與 `uat` 場景有交集 | L3 保留自動化最小集；UAT 專注在使用者語言的驗收 |
| **X5** | 覆蓋率報告產出但無人看 | 沒有門檻就沒有動作 | 停止產出整體覆蓋率，只留指定模組分支數字 |

---

## 10. Decision Log

| # | 決策 | 理由 | 影響 |
|---|---|---|---|
| D1 | **部署與發布分離** | 回滾不需重新部署（`feature-flag` A 類） | S6 部署時 flag 全關 |
| D2 | **PR gate 目標 < 5 分鐘** | 太慢就會被繞過 | S1/S2 平行、S3/S4 平行 |
| D3 | **不設整體覆蓋率門檻** | 虛榮指標 | 改為指定模組分支 100% |
| D4 | **ESLint 只對變更檔案 error** | 既有程式碼已上線，全開會卡死 CI | 需維護存量違規清單 |
| D5 | **只保留一個人工環節（G8）** | 人工環節越多越形式化 | 灰度推進由 PO 決策 |
| D6 | **G6 bundle 增幅只警告不擋** | PWA 首屏重要但非正確性問題 | 需 PR 說明 |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| 部署／發布分離 | `[H]` | `feature-flag` + `rollback-plan` 一致 |
| Stage 切分 | `[M]` | 推導；`release-plan` 未細到 CI stage |
| **各 stage 時長目標** | `[L]` | **全部為推估**，未量測 |
| Secret 清單 | `[M]` | 依 `threat-model` A5 推導；供應商未定 |

**TODO / 未解**

- [ ] **SM1 與 ADR-001 的衝突未解**（第三份文件記錄同一項）。`tech-spike` 結果出來後必須立刻開 ADR-002 決定要不要引入 serverless proxy。
- [ ] **CI 平台未確認**。canon 未記載，本文件的平行策略與 OIDC 假設可能不適用。
- [ ] **時長目標未量測**：整合測試 90 秒的估計，在 12 條降級路徑加上 jsdom 環境下可能嚴重低估。
- [ ] **無回滾的自動化**：S6–S8 描述了前進路徑，但自動回滾條件（例如煙霧測試失敗自動關 flag）未設計，目前全靠人工執行 `rollback-plan`。
