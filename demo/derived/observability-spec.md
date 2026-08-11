# Observability Spec · 可觀測規格 · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/06-operate/14-runbook` 推導，未經課堂實跑與人工審定。
> 與 `demo/06-operate/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`runbook`（診斷步驟需要什麼）、`slo`、`error-handling`　**下游**：告警設定、`incident-report`、`cost-monitor`

---

## 1. Executive Summary

規格的驗收標準只有一條：

> **`runbook` 每一條 Diagnosis 步驟提到的儀表板與欄位，這裡都要有對應的訊號。**

目前 runbook 引用了 `fx-overview`、`sw-cache`、`fx-signal-audit`、`generate-pipeline` 等儀表板與多條告警規則——**它們在 canon 中被當成既存事實引用，但從未被定義過**。本文件補上這一層。

一個結構性限制先講清楚：**SmartTrip 沒有伺服器**（`adr` ADR-001）。所有訊號都來自客戶端上報，這帶來三個後果：

1. **崩潰的使用者不會上報**（`slo` 已標註的樂觀偏差）。
2. **訊號量與使用者量成正比**，而使用者量很小 → 統計雜訊大。
3. **上報本身受隱私承諾約束**（免登入、重隱私），欄位必須白名單。

---

## 2. Signals Required

### Metric（聚合數字）

| # | Metric | 標籤 | 用途 | 來源 |
|---|---|---|---|---|
| M1 | `generate_total` | `result`(ok/fail)、`fx_source`(live/cache/mock/unavailable)、`dest_country` | SLI-1、SLI-3、KR1 | `generate` 事件 |
| M2 | `generate_duration_ms` | `step`(plan/fx/render) | SLI-2、`runbook` 05 的 step breakdown | `generate` 事件 |
| M3 | `fx_provider_result` | `provider`、`result`(ok/timeout/5xx/parse_error) | `runbook` 01 診斷 | FX Adapter |
| M4 | `fx_cache_hit_rate` | — | `runbook` 05 Mitigation A | FxCache |
| M5 | `fx_signal_shown` | `level`、`shown`(true/false) | 燈號隱藏的影響面 | Shell |
| M6 | `storage_write_result` | `result`(ok/quota/unavailable) | `runbook` 02 | Storage Adapter |
| M7 | `tier_select_total` / `save_trip_total` | `tier` | KR2、`north-star` L2 | 事件 |
| M8 | `error_total` | `code`(ST-*)、`severity` | `error-handling` 錯誤碼表 | 全域 |
| M9 | `flag_snapshot` | 關鍵 flag 的值 | `feature-flag` 遙測要求 | 隨 `generate` 夾帶 |

### Log（可讀事件）

| # | Log | 何時 | 內容 | 保留 |
|---|---|---|---|---|
| L1 | `error` 級錯誤 | ST-FX-005、ST-STO-003、ST-SYS-001 | 錯誤碼、provider、pair、schema 欄位名、堆疊 | 30 天 |
| L2 | 降級發生 | 切換 provider、走 cache、隱藏燈號 | 前後狀態、觸發原因 | 30 天 |
| L3 | flag 變更稽核 | 任何 prod flag 變更 | who／when／old→new | **90 天**（事故回溯需要） |

### Trace（跨元件因果）

| 現實 | 處置 |
|---|---|
| 單一 PWA bundle、無跨服務呼叫 | **不導入分散式 tracing**。投資報酬極低 |
| 但需要知道 generate 內部哪一段慢 | 用 M2 的 `step` 標籤做**單機分段計時**，取代 trace |

> **明確不做 tracing 是本規格的重要決定**。一個沒有跨服務呼叫的前端應用導入 trace，只會增加成本與 cardinality，換不到 runbook 用得上的資訊。

---

## 3. Cardinality Budget & Retention

| Metric | 標籤組合上限 | 風險 | 控制 |
|---|---|---|---|
| M1 | `result`(2) × `fx_source`(4) × `dest_country`(~30) = **240** | 目的地國別可能膨脹（PRD P1 支援 30+ 幣別） | **國別取 top 10 + `other`** → 上限 88 |
| M2 | `step`(3) | 低 | — |
| M3 | `provider`(3) × `result`(4) = 12 | 低 | — |
| M8 | `code`(~12) × `severity`(3) = 36 | 錯誤碼若無限擴張會膨脹 | 錯誤碼須集中定義（`error-handling`），禁止動態產生 |
| M9 | flag 值組合 | **高風險**：9 個 flag 的組合爆炸 | **只夾帶 3 個關鍵 flag**：`p0_8_live_rate`、`fx_signal_show`、`analytics_enabled` |

| 資料 | 保留 | 理由 |
|---|---|---|
| Metric（聚合） | 90 天 | 涵蓋 4 週驗證窗 + 事後分析 |
| Log（error／降級） | 30 天 | 事故回溯多在兩週內 |
| Flag 稽核 | 90 天 | 事故時需對上 flag 變更 |
| 原始事件 | **不長期保留** | 隱私定位；聚合後即可丟 |

---

## 5. Alert Rules

只有五條。**每一條都必須對應一個 runbook 段落，否則不建。**

| # | 告警 | 條件 | 嚴重度 | 對應 runbook | 為什麼是這個閾值 |
|---|---|---|---|---|---|
| **A1** | `fx_signal_deviation` | 燈號為 STRONG_BUY／BUY 但今日匯率高於 MA30 > 1%，持續 1 小時 | **SEV-1** | Runbook 04 | 直接違反 G4；`runbook` 自承這是最難偵測的一項 |
| **A2** | `fx_all_providers_down` | M3 全部 provider `result != ok`，持續 3 分鐘 | SEV-2 | Runbook 01 | 三家全掛才值得 page |
| **A3** | `generate_p95_high` | M2 p95 > 180s，持續 5 分鐘 | SEV-2 | Runbook 05 | 沿用 runbook 既有閾值 |
| **A4** | `mock_exposure_high` | M1 `fx_source != live` 比例 > 5%，持續 30 分鐘 | SEV-2 | Runbook 01 B | `north-star` C3 反指標 |
| **A5** | `error_budget_fast_burn` | 1 小時消耗 > 28 天預算 2% | SEV-2 | `error-budget` §6 | 餘裕視角，與 A2／A3 互補 |

### 明確不設的告警

| 不設 | 理由 |
|---|---|
| 單一 provider 失敗 | 這是**設計中的正常路徑**（有 fallback）。告警會製造疲勞 |
| localStorage quota（SEV-3） | `runbook` 02 已定義為 30 分鐘 SLA，進儀表板即可，不 page |
| 流量下降 | 量體太小，正常波動就會誤觸發 |
| 站台可用性 | 靜態託管，無從處置（`slo` D1） |

> **告警數量控制在 5 條是刻意的**。DevOps 只有 0.5 人力（`stakeholder-map`），告警疲勞會讓 A1（真正的 SEV-1）被忽略。

---

## 6. Sampling & PII Redaction

| # | 規則 | 內容 |
|---|---|---|
| **P1** | **欄位白名單** | 只送 `frd` BR-05 列出的欄位；新增欄位需 PR 明確 review |
| **P2** | **禁止送出的內容** | 行程自由文字、日期精確值（只送天數）、任何識別碼、IP 相關 |
| **P3** | 目的地 | 只送**國別**，不送城市或景點 |
| **P4** | 錯誤 log | 堆疊可送；**訊息中不得含使用者輸入** |
| **P5** | 取樣 | **不取樣**——量體太小，取樣會讓資料無法使用 |
| **P6** | 同意 | 依 `srs` UC-07 的同意流程；未同意則完全不送（`analytics_enabled` 亦可全關） |
| **P7** | 無跨站識別碼 | 不使用可跨站追蹤的 id；session 內識別碼不持久化 |

> **P5 不取樣與 P7 無持久識別碼會互相衝突於一件事**：無持久 id 就無法算「不重複使用者」，因此 KR1 的分母（進站者）與 KR2（30 天回訪）**在技術上如何量測仍未解**（見 §12）。

---

## 9. Decision Log

| # | 決策 | 理由 | 影響 |
|---|---|---|---|
| D1 | **不導入分散式 tracing** | 無跨服務呼叫，投報極低 | 用 M2 的 step 分段計時取代 |
| D2 | **告警上限 5 條** | 0.5 DevOps 人力，疲勞會淹沒 SEV-1 | 拒絕加入無 runbook 對應的告警 |
| D3 | **每條告警必須對應 runbook 段落** | 沒有處置方式的告警是噪音 | 新增告警需同時更新 runbook |
| D4 | **國別標籤取 top 10 + other** | 控制 cardinality | 長尾國別無法個別分析，可接受 |
| D5 | **只夾帶 3 個關鍵 flag** | 避免組合爆炸 | 其餘 flag 靠 L3 稽核紀錄對照 |
| D6 | **不取樣** | 量體太小 | 若流量成長需重審 |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| 訊號清單覆蓋 runbook 診斷需求 | `[M]` | 逐條對照 `runbook` 01/02/04/05 的 Diagnosis |
| A1–A5 閾值 | `[M]` | A1／A3 取自 runbook；A4 取自 `north-star`；A5 為推估 |
| Cardinality 估算 | `[L]` | **推估**，未實測 |
| 保留期 | `[L]` | 推估，未評估成本 |

**TODO / 未解**

- [ ] **P7 與 KR1／KR2 的衝突未解**：無持久識別碼 → 無法計算不重複進站者與 30 天回訪。**`okr` 的兩個核心 KR 目前沒有可行的量測方案**。這是整份 canon 中最嚴重的未解項之一（`okr` §12 已從另一個角度記錄）。
- [ ] **runbook 引用的儀表板 URL 是虛構的**（`grafana.smarttrip.io/...`）。實際使用什麼工具未定，本規格的訊號需對應到真實工具的資料模型。
- [ ] **A1 的實作方式未解**：`runbook` 04 自承燈號異常「最難自動偵測」，本規格照抄了它的條件，但**沒有解決它為什麼難**——需要一個獨立於顯示邏輯的匯率真值來源。
- [ ] **監控成本未估**（`cost-monitor` 需納入）。90 天保留 × 多個 metric，在小專案的 $5／月預算下可能超支。
