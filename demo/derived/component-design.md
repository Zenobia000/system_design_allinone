# Component Design · 元件設計 · SmartTrip FX 示範

> **AI 推導 · 待審定**｜依 `demo/種子簡報.md` + `PRD.md` v0.1 + `demo/03-design/06-c4-diagram` 推導，未經課堂實跑與人工審定。
> 與 `demo/03-design/` 等 15 份手刻示範地位不同：**結構可照抄，數字與細節請自行查核**。
>
> **上游**：`module-design`、`c4-diagram` Layer 3、`api-spec`　**下游**：`class-diagram`、`unit-test`、`integration-test`

---

## 1. Executive Summary

拆 **FX Adapter（M5）** 的內部元件與介面契約。選它的理由與 C4 一致：最複雜、最容易出事、且 **P0-8 是 MVP 最後一塊**。

本文件的核心是一句話：

> **上游只認識 `FxPort` 這個介面，永遠不知道下面有幾個供應商、有沒有快取、斷路器開了沒。**

這條契約直接決定三件事：`unit-test` 不需要網路、`runbook` 01 的 provider 切換不需要發版、V1 換供應商不影響任何 domain 程式碼。

---

## 2. Component Diagram

```
        domain / shell（只認識 FxPort）
                     │
                     ▼
        ┌────────────────────────┐
        │       FxFacade         │  implements FxPort
        │  fetchRate / fetchMA30 │
        │  getCachedRate         │
        └───┬────────────────┬───┘
            │ hit            │ miss
            ▼                ▼
     ┌─────────────┐   ┌──────────────────┐
     │  FxCache    │   │  ProviderRouter  │
     │ TTL 24h     │   │  依序 fallback    │
     │ hit/miss 統計│   └────────┬─────────┘
     └─────────────┘            │ 每個 provider 前先問
                                ▼
                       ┌──────────────────┐
                       │ CircuitBreaker   │
                       │ 連續 3 次失敗開路 │
                       │ 30s 後半開探測    │
                       └────────┬─────────┘
                                ▼
        ┌──────────────┬──────────────┬──────────────┐
        │ WiseProvider │TaibankProvid.│FrankfurterPr.│  implements RateProvider
        └──────┬───────┴──────┬───────┴──────┬───────┘
               ▼              ▼              ▼
           Wise API       台銀公開 API   Frankfurter API
```

| 元件 | 職責（單一） | 有狀態？ |
|---|---|---|
| **FxFacade** | 對外唯一入口，編排 cache → router | 否 |
| **FxCache** | in-memory Map + 24h TTL + hit/miss 統計 | **是** |
| **ProviderRouter** | 依設定順序嘗試供應商，順序來自 feature flag | 否（順序由外部注入） |
| **CircuitBreaker** | 連續失敗計數、開路、半開探測 | **是** |
| **RateProvider ×3** | 各家 HTTPS 實作 + 回應轉譯成統一 `FxRate` | 否 |

---

## 3. Interface Contracts

### Port（domain 定義，adapter 實作）

```ts
// shared/ports/fx.ts —— domain 只認識這個
export interface FxPort {
  /** 取今日匯率。永不 throw；失敗回傳 null 並附狀態。*/
  fetchRate(pair: CurrencyPair): Promise<FxResult>;
  /** 取 30 個交易日序列，供 MA30。不足 30 筆回傳 insufficient。*/
  fetchMA30(pair: CurrencyPair): Promise<Ma30Result>;
  /** 僅讀快取，不觸發網路。降級路徑用。*/
  getCachedRate(pair: CurrencyPair): FxResult | null;
}

export type FxSource = "live" | "cache" | "mock" | "unavailable";

export interface FxRate {
  pair: CurrencyPair;
  /** 一律正規化為「1 外幣 = N 台幣」（frd BR-02 單位一致性）*/
  rate: number;
  asOf: string;        // ISO 8601
  provider: string;
}

export interface FxResult {
  rate: FxRate | null;
  source: FxSource;    // UI 的 SourceBadge 直接吃這個欄位
  ageMinutes: number | null;
}

export interface Ma30Result {
  ma30: number | null;
  tradingDays: number;               // 實際筆數
  status: "ok" | "insufficient" | "unavailable";
}
```

### 契約條款

| # | 條款 | 為什麼 |
|---|---|---|
| **C1** | **`FxPort` 的任何方法都不得 throw**。失敗以 `source: "unavailable"` 表達 | 匯率失效是預期狀態不是例外（`srs` UC-06） |
| **C2** | **`source` 必須誠實**。取自快取就是 `cache`，不得回報 `live` | `north-star` C3 反指標的資料來源；靜默 fallback 直接摧毀 G4 |
| **C3** | **`rate` 一律正規化為 1 外幣 = N 台幣** | `runbook` 04 的 per-1 vs per-100 陷阱 |
| **C4** | **`fetchMA30` 不足 30 筆回 `insufficient`，不得補值** | `frd` BR-02 D1；補值會產生假燈號 |
| **C5** | **供應商順序由外部注入**，不寫死在 Router | `runbook` 01 Mitigation A 要求 30 秒內切換且不發版 |
| **C6** | **快取 TTL 可由外部覆寫** | `runbook` 05 Mitigation A 要調 TTL 緩解延遲 |

### 依賴注入

```ts
// 組裝發生在 shell 邊界，domain 不參與
const fx: FxPort = createFxFacade({
  providers: [wise, taibank, frankfurter],   // 順序來自 flag `fx_provider_order`
  cache: new FxCache({ ttlMs: flags.fxCacheTtlMs ?? 86_400_000 }),
  breaker: new CircuitBreaker({ threshold: 3, resetMs: 30_000 }),
  clock,                                     // 注入時鐘，讓 TTL 可測
});
```

| 注入項 | 為什麼要注入 | 測試時替換成 |
|---|---|---|
| `providers` | flag 控制順序（C5） | 兩個假 provider，一個必失敗 |
| `cache` | TTL 可調（C6） | TTL = 0 的快取 |
| `breaker` | 門檻可調 | threshold = 1，快速觸發 |
| `clock` | TTL 與 age 計算依賴時間 | 固定時鐘，不用等 |

> **注入 `clock` 是最容易被省略、也最該做的一項**。沒有它，快取過期的測試只能靠 `sleep`。

---

## 9. Risks

| # | 風險 | 影響 | 緩解 |
|---|---|---|---|
| **R1** | **`source` 被實作者忽略**，全部回 `live` | C3 反指標失效，且使用者被誤導 | `unit-test` 必須有「快取命中時 source = cache」的案例；`integration-test` 驗證 UI 標籤 |
| **R2** | **CircuitBreaker 開路時使用者無感**，以為系統正常 | 燈號長時間不更新卻無標示 | 開路期間 `getCachedRate` 回 `source: "cache"` 並帶 `ageMinutes` |
| **R3** | **三家供應商回應格式差異大**，轉譯層出錯 | `runbook` 04 燈號誤判（SEV-1） | 每個 Provider 各自有轉譯測試 + 固定樣本回應（fixture） |
| **R4** | **in-memory 快取隨頁面重整消失** | 每次進站都打外部 API，額度可能爆 | MVP 接受；若額度吃緊改用 service worker cache（需 `adr`） |
| **R5** | **flag 服務不可用時順序未定義** | 事故中無法切換 | 內建預設順序，flag 只覆寫（`srs` EI-5） |

---

## 12. Confidence & Sources & TODO

| 主張 | Confidence | 依據 |
|---|---|---|
| 元件切分與職責 | `[H]` | `c4-diagram` Layer 3 明列 |
| `FxPort` 介面形狀 | `[M]` | 推導；C4 只列 3 個 method 名稱，型別為本文件新增 |
| 契約條款 C1–C6 | `[M]` | 推導自 `runbook` 01/04/05 與 `frd` BR-02 |
| TTL 24h、breaker 3 次／30s | `[H]` | `c4-diagram` Layer 3 明列 |

**TODO / 未解**

- [ ] **供應商尚未選定**（PRD §9 阻擋項）。C4 已寫 Wise／台銀／Frankfurter，但**是否都提供 30 個交易日歷史未查證**——若無，C4 的 `fetchMA30` 無法實作（`srs` 同一 TODO）。
- [ ] **R4 的額度風險未量化**：每次進站打一次外部 API，在無快取持久化的情況下，1,200 次／週是否超出免費額度未確認。
- [ ] **`mock` 這個 source 值的生命週期未定**：P0-8 上線後模擬資料應完全移除，但介面仍保留該值。需決定是保留給開發環境，還是連同移除。
- [ ] **未定義 `CurrencyPair` 的多幣別行程用法**：一趟行程多個幣別時，呼叫端要打幾次、如何批次，本契約未涵蓋。
