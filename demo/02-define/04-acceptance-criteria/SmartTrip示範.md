# 04 Acceptance Criteria · SmartTrip FX 示範

> 用 SmartTrip FX 種子簡報 + 上游 03-PRD（`demo/02-define/03-prd/SmartTrip示範.md`）
> + 完整 PRD（`PRD.md`），把「關鍵提問.md」的 6 題實際答一遍。
> 上游 03-PRD 已產出 P0-1 ～ P0-9 + US-1 ～ US-6 + acceptance hint 表。

## 上游素材速查（來自 03-PRD SmartTrip示範.md）

**P0 + User Story 對應**：

| P0 # | User Story | Acceptance Hint |
|---|---|---|
| P0-1 | US-1：選心情 + 預算範圍生出三方案 | 必填欄位齊全 → 按生成 → 回傳三級距結果；缺項顯示錯誤 |
| P0-2 | US-1 | Low/Mid/High 三方案，總額遞增，各 ≤ 對應級距預算 |
| P0-3 | US-3：每個行程標註現金/刷卡 | 行程卡片含時間、活動名、現金/刷卡標籤、金額 |
| P0-4 | US-2：一眼看到「建議換匯現金 ¥XXX,XXX」 | 顯示金額 + 台幣約當 + 緩衝說明（10%） |
| P0-5 | US-4：現在換匯划不划算的燈號 | 三檔燈號 + 今日匯率 + MA30 + 偏離 % + 免責 |
| P0-6 | US-5：把方案存起來 | 存檔成功 → 我的行程可見 → 重整不消失 |
| P0-7 | US-6：隨手記開支 + 計畫 vs 實際 | 新增/刪除開支即時更新總額、超支/結餘 |
| P0-8 | （工具性 - 支援 P0-5） | 真實匯率時無模擬標籤；失敗時顯示「⚠️ 模擬資料」 |
| P0-9 | （工具性 - 支援全部假設驗證） | 6 個事件可在分析後台看到 |

本場示範**完整寫出 US-2（P0-4 建議換匯額）與 US-4（P0-5 FX 燈號）的 AC**，
其餘 US 列「待補」並標明後續排程。

---

## Q1 示範：「邊界值清單」

**US-1 / P0-1 規劃輸入欄位邊界表**：

| 欄位 | 邊界值 | 系統反應 |
|---|---|---|
| 目的地 | 空 | 拒絕，紅字「請選擇目的地」 |
| 目的地 | 非清單值（自行輸入「火星」） | 拒絕，下拉選單不接受非清單輸入 |
| 日期（出發 / 回程） | 出發 > 回程 | 拒絕，「回程不可早於出發」 |
| 日期 | 出發 = 今天 | 接受 |
| 日期 | 出發 = 過去 | 拒絕，「請選擇未來日期」 |
| 日期 | 出發 - 回程 > 30 天 | 接受但提示「超過 30 天可能影響建議準確度」 |
| 預算範圍 | 空 | 拒絕 |
| 預算範圍 | 0 / 負數 | 拒絕，「至少 NT$1,000」 |
| 預算範圍 | NT$999 | 拒絕（同上） |
| 預算範圍 | NT$10,000,000+ | 拒絕，「請輸入合理金額」 |
| 預算範圍 | 含千分位逗號「40,000」 | 接受並解析 |
| 預算範圍 | 含全形數字「４００００」 | 接受並轉半形 |
| 預算範圍 | 含 emoji「40000」 | 拒絕 |
| 心情 / 主題 | 空 | 拒絕 |
| 同行人數 | 0 / 負數 | 拒絕，「至少 1 人」 |
| 同行人數 | > 20 | 拒絕，「請聯絡團體旅遊服務」 |
| 幣別 | 非主要 5 幣別（JPY/KRW/THB/USD/EUR） | MVP 拒絕，「目前支援 5 種幣別」（30+ 幣別屬 P1） |

**US-6 / P0-7 開支金額邊界**：

| 邊界值 | 系統反應 |
|---|---|
| 0 | 拒絕，「請輸入金額」 |
| 負數 | 拒絕（**Open Q：退款的負值要不要支援？→ 延 V1**） |
| > 預算 10 倍 | 接受但提示「超過預算 10 倍，請確認金額」 |
| 含 emoji 在備註欄 | 接受（備註欄允許 emoji） |
| 備註欄 1000+ 字 | 拒絕，限制 200 字 |

---

## Q2 示範：「空狀態處理」

| 場景 | 空狀態設計 |
|---|---|
| P0-1 第一次進站 | 顯示 onboarding：「3 分鐘規劃一趟說走就走的旅行」+ 「開始規劃」CTA |
| P0-6 「我的行程」沒任何儲存 | 插圖 + 文案「還沒儲存任何行程，去規劃一趟吧！」+ CTA 回 P0-1 |
| P0-6 「我的行程」全部刪光 | 同上（共用空狀態） |
| P0-6 localStorage 被清（隱私模式 / 使用者清快取） | 同上（共用空狀態，**不顯示警告**，因為使用者主動清的） |
| P0-7 開支紀錄空 | 顯示「還沒記錄任何開支」+ CTA「新增第一筆」 |
| P0-7 該日無開支但其他日有 | 顯示「今天還沒花錢～」（輕鬆語氣，符合衝動型 persona） |
| P0-5 燈號區塊資料還沒載入 | Skeleton loader（不顯示「載入中」文字，避免閃爍焦慮） |
| P0-5 燈號資料載入完成但 fallback 到模擬 | 顯示「⚠️ 模擬資料」標籤（**不是**空狀態，是降級狀態，見 Q3） |

---

## Q3 示範：「網路斷 / 5xx / timeout 反應」（**重點：P0-5 + P0-8 完整降級鏈**）

| 場景 | 系統反應 |
|---|---|
| P0-8 即時匯率 API timeout（10 秒） | 1. 立刻 fallback 用 MA30 模擬值 2. P0-5 燈號顯示「⚠️ 模擬資料」標籤（橘色 badge）3. 背景靜默重試 3 次（指數退避 1s/3s/9s）4. 連 5 分鐘失敗 → 整個燈號區塊改顯示「匯率暫時不可用，請稍後重試」 |
| P0-8 API 回 5xx | 同上 timeout 處理 |
| P0-8 API 回 200 但 payload schema 錯誤（缺欄位） | 同上 timeout 處理 + 上報 Sentry（**Open Q：MVP 要不要接 Sentry？** → 延 V1，先用 console.error） |
| P0-1 按生成時網路斷 | 按鈕 enabled 但顯示 toast「網路連線異常，請重試」；不送出請求（client-side 已生成，理論上不依賴後端） |
| P0-6 儲存到 localStorage 失敗（quota exceeded） | 顯示「儲存空間已滿，請先刪除舊行程」+ 引導到「我的行程」管理頁 |
| P0-7 新增開支時頁面崩潰（JS error） | 已輸入的金額保留在 form state（不可丟失），重新渲染後顯示「剛才操作中斷，請重試」 |
| P0-9 分析事件送出失敗 | **靜默失敗**（fire-and-forget），絕不影響使用者體驗、絕不顯示錯誤訊息 |

---

## Q4 示範：「併發場景」

| 場景 | 系統反應 |
|---|---|
| P0-1 連續按兩次「生成」按鈕 | 第一次按下後按鈕 disabled + 顯示 spinner；client-side 生成完成或 1 秒後恢復 |
| P0-1 同時開兩個分頁規劃 | 互相獨立、各自運算；兩邊都按儲存 → 各自存到 localStorage，用 `tripId = uuid()` 區分（不互相覆蓋） |
| P0-6 同時開兩個分頁，A 分頁刪行程、B 分頁編輯同一行程 | B 分頁儲存時偵測 localStorage 該 ID 不存在 → 提示「此行程已被刪除，是否另存新行程？」 |
| P0-7 同時開兩個分頁記開支到同一行程 | 寫入時讀取 → 合併 → 寫回。**MVP 限制**：不做 conflict resolution，後寫覆蓋先寫（**won't fix，理由：單機單人使用，併發機率極低**） |
| P0-6 儲存到一半關掉瀏覽器 | localStorage 是同步寫入，**部分寫入不可能發生**；下次進站可見最後一次完整儲存的狀態 |
| P0-8 同時打 5 個匯率 API 請求（race condition） | 用 AbortController 取消舊請求；只接受最後一個 response（避免畫面跳動） |
| P0-1 按生成 → 立刻改輸入 → 再按生成 | 第二次生成的結果完全覆蓋第一次（不保留歷史，未存檔的就丟失）；**won't fix「自動保留歷史」，理由：違反「3 分鐘決定」mindset，會讓使用者陷入比較癱瘓** |

---

## Q5 示範：「資料汙染 / 髒資料」

| 場景 | 系統反應 |
|---|---|
| P0-6 載入儲存的行程，JSON.parse 失敗 | try/catch；該筆視為損毀；顯示「此行程資料異常，已自動跳過」（不阻擋其他行程載入）；提供「下載原始資料」按鈕讓進階使用者除錯 |
| P0-6 載入時欄位缺少（舊版本資料） | 用 default 值補上；未知欄位保留不刪；migration 紀錄寫進 console（**MVP 不做 UI 提示**，避免每次升級都嚇使用者） |
| P0-6 載入時 version 不相容（V1 資料、V2 App） | 顯示「請升級至最新版」+ 保留原始 JSON 供使用者匯出（**MVP won't fix：因為現在只有 V0.1，沒有舊版本問題；V1 上線時必開**） |
| P0-7 開支金額欄位是字串「abc」（手動改 localStorage） | 該筆 expense 視為無效；顯示「此筆開支資料異常」；總額計算自動跳過 |
| P0-8 即時匯率 API 回傳負數 / 0 / NaN | 視為無效 payload；走 fallback（同 Q3 timeout 處理） |
| P0-5 MA30 計算時資料點 < 30（新幣別剛加） | fallback 用實際可得的 N 天平均；顯示「資料點 N/30」 |
| P0-1 URL query string 被竄改（例如 `?destination=<script>...`） | input sanitization；拒絕非清單值；XSS 防護由 framework 處理（**Dev sign-off**） |

---

## Q6 示範：完整 G/W/T 範例（**US-2 與 US-4，含 happy path + sad path + 邊界 + 失敗降級**）

### US-2 / P0-4：建議換匯現金額

**Happy Path AC-1**：

```gherkin
Given 使用者完成 P0-1 規劃輸入（目的地=東京、5 天、預算 NT$40,000、心情=美食）
  And 系統已生成 Mid 級距方案
  And Mid 級距方案的 cash_only 項目總和 = ¥45,000
When 使用者查看 Mid 級距方案的「建議換匯現金額」區塊
Then 顯示「建議換匯現金 ¥49,500」（= 45000 × 1.1，依 JPY 進位到 100）
  And 顯示「約 NT$10,890」（用當下匯率 0.22 換算）
  And 顯示「含 10% 緩衝，避免現場現金不足」
  And 不顯示任何錯誤訊息
```

**Sad Path AC-2（破壞性：cash_only 為 0）**：

```gherkin
Given 使用者完成規劃輸入
  And 生成的方案內所有項目都是 card_only（無現金項目）
When 使用者查看「建議換匯現金額」區塊
Then 顯示「建議換匯現金 ¥0」
  And 顯示「此行程預估全程刷卡，可不換現金」
  And 顯示提示「建議仍備少量現金應急」
  And 不顯示緩衝計算
```

**Sad Path AC-3（破壞性：cash_only 極大值）**：

```gherkin
Given 規劃結果中 cash_only 總和 = ¥1,000,000（極端值）
When 使用者查看「建議換匯現金額」區塊
Then 顯示「建議換匯現金 ¥1,100,000」
  And 顯示警示「金額較大，建議分次換匯」
  And 顯示「約 NT$242,000」（一般使用者罕見）
  And 在 console 上報 P0-9 事件 `large_amount_recommendation` 供 PM 觀察
```

**Sad Path AC-4（破壞性：幣別匯率資料失敗）**：

```gherkin
Given 系統生成 Mid 級距方案、cash_only = ¥45,000
  And 即時匯率 API（P0-8）失敗
When 使用者查看「建議換匯現金額」區塊
Then 顯示「建議換匯現金 ¥49,500」（公式不變）
  And 台幣約當改顯示「約 NT$10,890（基於 30 天平均匯率）」
  And **不**因匯率失敗而隱藏整個建議區塊（降級不是隱藏）
```

**Definition of Done**：
- ✅ 5 組已知輸入（cash=0 / cash=10000 / cash=45000 / cash=1000000 / 不同幣別）算出的金額與公式 `ceil(sum × 1.1, currency_unit)` 完全一致
- ✅ QA 用 5 組輸入跑回歸；PO sign-off
- ✅ 11-unit-test 卡新增 5 個 test case，命名 `P0-4_AC1_happy` ～ `P0-4_AC4_fx_fallback`

---

### US-4 / P0-5：FX 換匯燈號

**Happy Path AC-1**：

```gherkin
Given 即時匯率 API（P0-8）回傳今日 JPY 匯率 = 0.225
  And MA30（30 日移動平均）= 0.230
  And 偏離 % = (0.225 - 0.230) / 0.230 = -2.17%
When 使用者查看 FX 燈號區塊
Then 顯示綠色燈號「STRONG_BUY」
  And 顯示文字建議「目前匯率優於 30 日平均 2.17%，建議現在換匯」
  And 顯示「今日匯率：0.225 ／ MA30：0.230 ／ 偏離：-2.17%」
  And 底部顯示免責「※ 本資訊僅供參考，非投資/理財建議」
```

**燈號分檔規則（從 PRD §6 P0-5 + 法務免責）**：

| 偏離 % | 燈號 | 建議文字 |
|---|---|---|
| 偏離 < -2% | STRONG_BUY | 強烈建議現在換 |
| -2% ≤ 偏離 < 0% | BUY | 建議現在換 |
| 偏離 ≥ 0% | HOLD | 可再觀望 |

**Sad Path AC-2（破壞性：API timeout）**：

```gherkin
Given 即時匯率 API 請求 10 秒未回應
When 系統執行 fallback
Then 燈號用 MA30 模擬值顯示
  And 顯示橘色 badge「⚠️ 模擬資料（即時匯率取得失敗）」
  And 背景靜默重試 3 次（指數退避 1s/3s/9s）
  And 連 5 分鐘失敗後，整個燈號區塊改顯示「匯率暫時不可用，請稍後重試」
  And 不影響其他區塊（P0-1 ～ P0-7）正常使用
```

**Sad Path AC-3（破壞性：API 回傳髒資料）**：

```gherkin
Given 即時匯率 API 回 200 但 payload 是 {"rate": -1} 或 {"rate": "NaN"} 或 {}
When 系統解析 payload
Then 視為無效資料、走 AC-2 fallback 流程
  And 在 console 記錄 `invalid_fx_payload` 事件
  And 不在使用者介面顯示技術錯誤
```

**Sad Path AC-4（破壞性：MA30 資料不足）**：

```gherkin
Given 某幣別（例：THB）剛加入支援，歷史資料只有 10 天
When 系統計算 MA30
Then fallback 用實際可得的 10 天平均
  And 燈號區塊額外顯示「資料點 10/30，準確度可能較低」
  And 不阻擋燈號顯示
```

**Definition of Done**：
- ✅ 三檔燈號邏輯與表格規則完全一致（unit test 覆蓋三個分檔邊界 -2% / 0%）
- ✅ Fallback 在斷網模擬下能正確降級（QA 用 Chrome DevTools「Offline」測試）
- ✅ 免責文字經法務 sign-off（從 03-PRD Open Q「FX 燈號免責強化」延續）
- ✅ 11-unit-test 卡新增 7 個 test case：3 個分檔 happy + 3 個 sad + 1 個邊界 MA30

---

### 其餘 P0 的 AC（待後續工作坊補完）

- **US-1 / P0-1 + P0-2**：規劃輸入 + 三方案生成（邊界值表已寫在 Q1，G/W/T 留下次補）
- **US-3 / P0-3**：行程時間軸現金/刷卡標籤
- **US-5 / P0-6**：儲存行程到 localStorage
- **US-6 / P0-7**：開支紀錄 + 計畫 vs 實際

> **規則**：本場 60 分鐘不可能寫完 9 條 P0 的完整 AC。先寫風險最高的兩條（P0-4 涉及核心公式、P0-5 涉及外部 API）。剩餘 AC 排在下次 60 分鐘工作坊；**不准併到 06-spec 場次補**。

---

## 共通破壞性場景（適用所有 P0）

| 場景 | 通用反應 |
|---|---|
| 任何 input field 含 XSS payload（`<script>...`） | framework 自動 escape；輸出時 sanitize |
| 任何 click 事件在 disabled 狀態被觸發 | no-op，不報錯 |
| 任何 API 請求逾時 | 顯示 toast「網路較慢，請稍候」；不卡住使用者 |
| 任何 form submit 在 loading 狀態被重複觸發 | disable submit button 直到結束 |
| 任何 localStorage 操作在 quota exceeded | 提示「儲存空間已滿」+ 引導清理 |
| 使用者重整頁面 | 所有已儲存的行程保留；未儲存的編輯丟失（**won't fix「自動草稿」，理由：localStorage 寫太頻繁影響效能**） |

---

## Won't Fix 清單（明示不處理 + 理由）

| 場景 | 理由 | 後續 |
|---|---|---|
| 雲端同步 | 種子簡報 §主要約束「不做雲端同步」；違反原則需先改 brief | V1 才考慮 |
| 多人協作編輯行程 | 非核心假設驗證需求 | V2+ |
| 自動草稿（編輯到一半自動存） | localStorage 寫太頻繁影響效能；衝動型 persona 不需要 | won't fix |
| 開支退款（負值金額） | MVP 不支援；單機單人記帳不需嚴格會計 | 延 V1 |
| 同時開多分頁編輯同行程的 conflict resolution | 單機單人併發機率極低；後寫覆蓋先寫 | won't fix |
| 自動保留多次生成歷史 | 違反「3 分鐘決定」mindset，會讓使用者陷入比較癱瘓 | won't fix |
| V0.1 → V1 資料遷移 | 目前只有 V0.1，沒有舊版本問題 | V1 上線前必補 |
| Sentry / 完整錯誤上報 | MVP 用 console.error 即可 | 延 V1 |

---

## Open Questions

| Open Q | 阻擋 P0？ | Owner | 截止日 |
|---|---|---|---|
| 開支退款（負值金額）的 UX 設計 | 不阻擋（已 won't fix） | PM | V1 規劃 |
| localStorage quota exceeded 時的清理引導畫面 | 阻擋 P0-6 sad path | UX | 4/29 |
| FX 燈號免責文案最終版本 | 阻擋 P0-5 happy path | 法務 | 4/22 |
| MA30 資料不足時的「資料點 N/30」UI 顯示樣式 | 不阻擋（已定行為，待 06-spec 設計樣式） | UX | spec 階段 |
| 大額警示閾值（目前訂 ¥1,000,000，是否合理） | 不阻擋 | PM | 4 週驗證窗結束後校準 |

---

## 現場對話（10 輪攻防示範）

> 場景：60 分鐘會議第 25 分鐘，QA 已寫完 US-2 / P0-4 的 happy path，開始拷打 sad path。

**QA**：「P0-4 happy path 寫完。現在我想三種搞壞它的方法——第一個：如果 cash_only 全部都是 0 呢？」

**Dev**：「公式 `0 × 1.1 = 0`，顯示『建議換匯現金 ¥0』。」

**QA**：「然後使用者看到『¥0』心想『這 App 壞了吧』，跳離。**降級訊息**呢？」

**PO**：「⋯⋯加一個提示『此行程預估全程刷卡，可不換現金』？」

**QA**：「對，但還要加『建議仍備少量現金應急』——日本還是有店只收現金。寫進 AC-2。第二個破壞性場景：cash_only 是 ¥1,000,000，極端值。」

**Dev**：「公式照算，¥1,100,000。」

**PO**：「不行，使用者看到要換 100 萬日圓會嚇死。」

**QA**：「不是嚇死的問題，是這金額一定要警示。寫『金額較大，建議分次換匯』。閾值 ¥1,000,000 合理嗎？」

**PO**：「⋯⋯ Open Q，4 週驗證窗看實際資料校準。先訂 ¥1,000,000。」

**QA**：「好，標 OQ。第三個——P0-8 即時匯率失敗的時候，P0-4 的台幣約當值怎麼算？」

**Dev**：「⋯⋯沒處理欸。」

**QA**：「**這就是 AC 場次的價值**。P0-8 失敗 → 沒有今日匯率 → 台幣約當顯示什麼？NaN？空白？還是 fallback 用 MA30？」

**Dev**：「fallback 用 MA30 比較合理，因為 MA30 一定算得出來。」

**QA**：「對，寫進 AC-4：『台幣約當改顯示「約 NT$X,XXX（基於 30 天平均匯率）」』。注意——**降級不是隱藏**，整個建議區塊不准因為 P0-8 失敗就消失。Dev sign-off？」

**Dev**：「sign-off。但這代表 P0-4 跟 P0-8 有耦合，我要在 05-ADR 寫『匯率服務必須提供 MA30 fallback method』。」

**QA**：「好，這條送進 05-ADR Open Q。PO 還有沒有想補的？」

**PO**：「⋯⋯我想到一個：使用者看『建議換匯 ¥49,500』，去銀行換的時候銀行只能換 ¥1000 倍數。我們有幫他進位嗎？」

**QA**：「✋ 等等。這是 P0-4 公式的『依幣別進位』部分——JPY 進位到 100 還是 1000？PRD §6 寫『依幣別進位』但沒講粒度。」

**Dev**：「JPY 我目前寫的是 ceil 到 100。」

**PO**：「銀行通常 1000 起跳⋯⋯但機場可以 100。我覺得 100 OK，反正使用者自己會湊。」

**QA**：「成交，AC-1 寫『進位到 100』。但這要寫進 Definition of Done 的『5 組已知輸入回歸測試』，命名 `P0-4_AC1_jpy_ceil_100`。Dev 寫測試的時候別漏。」

**Dev**：「OK，11-unit-test 卡接到後我會優先寫這條。」

**QA**：「最後 5 分鐘——我們今天只寫完 P0-4 + P0-5。其他 7 條怎麼辦？」

**PO**：「下次再開一場 60 分鐘？」

**QA**：「對。**不准併到 06-spec 補**——AC 是 QA 主導，spec 是 PM/UX 主導，搞混了 AC 會被吃掉。我這週發排程。」

---

## 下游影響：本場 AC 如何流向後續卡

| 下游卡 | 引用本場的哪個欄位 | 怎麼用 |
|---|---|---|
| **05-ADR** | 「P0-5 燈號需要 fallback 鏈 + P0-4 台幣約當依賴 MA30」 | ADR 寫「為什麼匯率服務必須提供 MA30 fallback method」、為什麼選擇 localStorage 不選 IndexedDB |
| **06-spec** | Q2 空狀態清單 + Q3 降級畫面文案 + Open Q「localStorage quota exceeded 引導畫面」 | spec 階段補 UI 細節，**不准擴大 scope** |
| **07-API-Spec** | P0-8 即時匯率 API 的 timeout（10s）、retry policy（指數退避 3 次）、失敗 fallback schema | API spec 直接引用本場數字，不准改 |
| **10-code-review-checklist** | 每條 AC（特別是 Definition of Done 那行） | PR review 必檢「該 PR 對應的 P0 是否所有 AC（happy + sad）都實作？」 |
| **11-unit-test** | 每條 G/W/T 對應的 test case 命名（已標示如 `P0-4_AC1_happy`） | 每條 AC 至少 1 個 test case，命名直接抄本場 |
| **13-user-acceptance-test** | Happy path G/W/T | UAT 腳本直接抄；sad path 由 QA 操作 |
| **15-postmortem** | Won't Fix 清單 + Open Q 清單 | 出事時追溯「這場景當時是 won't fix 還是漏寫？」 |

**特別注意——具體欄位流向**：

- 本場 **P0-4 Definition of Done**「5 組已知輸入跑回歸 + 公式 `ceil(sum × 1.1, currency_unit)`」
  → 直接餵 **11-unit-test 的 `P0-4_AC1_happy` ～ `P0-4_AC4_fx_fallback` 5 個 test case**
- 本場 **P0-5 三檔燈號規則表**（偏離 < -2% / -2% ≤ x < 0% / ≥ 0%）
  → 直接餵 **11-unit-test 的 3 個分檔邊界 test**
- 本場 **「⚠️ 模擬資料」橘色 badge**
  → 直接餵 **06-spec 的 UI component spec**
- 本場 **P0-8 fallback 鏈（timeout 10s → fallback MA30 → 重試 3 次 → 5 分鐘後 unavailable）**
  → 直接餵 **07-API-Spec 的 retry policy section + 05-ADR 的「為什麼不用第三方 HTTP client 而自寫 fallback」**

**鐵律**：下游卡若改動本場的數字（10s timeout、3 次重試、±2% 燈號分檔、10% buffer、進位粒度），
**自動觸發回頭重開 04-AC 場次**——這條 SOP 寫進 decision log。

---

## 附錄：本場會議產出如何被 AI 轉成 markdown

學員**不需動手**——把本場會議的原始 bullet 筆記（6 題的答案 + PRD acceptance hint 表 + Won't Fix 清單）
丟給 `card-fill` skill：

```
/card-fill register 04-acceptance-criteria <你的會議筆記路徑>
/card-fill check <輸出路徑>
```

skill 會依 `product_to_launch/content/deliverables/acceptance-criteria.md` 的結構，產出符合契約的 AC markdown。

**本場會議的學習目標到 Q6 答完就結束**——AI 產文是課後 demo，不是課堂活動。
你在教室裡的工作是「**逼出破壞性場景的決策**」，不是「**寫對 G/W/T markdown**」。
