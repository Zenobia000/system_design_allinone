# 第五章：系統品質屬性 (*-ilities)
## Chapter 5: Introduction to the *-ilities

基於 **S8_Slides.pdf** (Introduction to the *-ilities)

---

## 🎯 章節目標 (Chapter Objectives)
- 理解品質屬性（*-ilities）與非功能需求（NFR）的映射關係
- 掌握五大核心品質屬性的定義、問題情境與設計要點
- 理解品質屬性間的權衡關係，掌握場景化配置策略
- 建立從 NFR 到架構決策的系統化思考路徑

---

## 📊 投影片架構 (6張核心投影片)

### **Slide 1: 開場定位 - 什麼是 *-ilities？**
#### **What are the *-ilities?**

**麥肯錫風格設計要點：**
- **視覺主軸**：關係鏈流程圖（NFR → QA → Architecture）
- **色系**：深藍(#003A70) + 橙色(#FF6B35) 強調轉換關係
- **版面配置**：上方定義，中央關係圖，下方範例

**核心訊息（One Key Message）：**
> "*-ilities = Quality Attributes：用來滿足非功能需求的技術能力"

**核心定義：**

| **概念** | **英文** | **說明** |
|:---|:---|:---|
| **品質屬性** | Quality Attributes (*-ilities) | 用來滿足非功能需求的技術能力 |
| **非功能需求** | Non-Functional Requirements | 系統應該處理的品質面向（非功能面） |
| **架構** | Architecture | 實現品質屬性的系統設計 |

**關鍵關係鏈：**

```
┌─────────────────────────┐
│  Non-Functional         │
│  Requirement (NFR)      │  "系統應該處理什麼"
│  (What the system       │
│   should deal with)     │
└───────────┬─────────────┘
            │ Map to...
            ▼
┌─────────────────────────┐
│  Quality Attributes     │
│  (*-ilities)            │  "需要什麼技術能力"
└───────────┬─────────────┘
            │ Designed in the...
            ▼
┌─────────────────────────┐
│  Architecture           │  "如何在架構中實現"
└─────────────────────────┘
```

**轉換範例：**

| **NFR（非功能需求）** | **Quality Attribute（品質屬性）** |
|:---|:---|
| "系統必須在高負載下運作，但不應在閒置資源上浪費金錢" | **Scalability（可擴展性）** |
| "系統出問題時，運維團隊應能即時知道並處理" | **Manageability（可管理性）** |
| "更換外部系統時，不應影響整個系統" | **Modularity（模組化）** |
| "新增功能時，不應修改現有程式碼" | **Extensibility（可延展性）** |
| "系統應能輕鬆進行自動化測試" | **Testability（可測試性）** |

**本章涵蓋的五大品質屬性：**

| **品質屬性** | **英文** | **一句話定義** |
|:---|:---|:---|
| 可擴展性 | Scalability | 在不中斷服務的情況下增加計算資源 |
| 可管理性 | Manageability | 知道系統正在發生什麼，並據此採取行動 |
| 模組化 | Modularity | 系統由可獨立更換的積木組成 |
| 可延展性 | Extensibility | 不修改現有程式碼即可擴展功能 |
| 可測試性 | Testability | 系統容易被測試的程度 |

---

### **Slide 2: 可擴展性 - 從單機到叢集**
#### **Scalability: From Single Server to Cluster**

**麥肯錫風格設計要點：**
- **視覺主軸**：Scale Up vs Scale Out 對比圖
- **色系**：紅色框(#DC3545)標示限制，綠色框(#00B388)標示優勢
- **版面配置**：左右對比，中央箭頭展示演進

**核心訊息（One Key Message）：**
> "Adding computing resources without any interruption — 在不中斷服務的情況下增加計算資源"

**不可擴展 vs 可擴展系統對比：**

| **不可擴展系統 (Non-Scalable)** | **可擴展系統 (Scalable)** |
|:---|:---|
| 1. 尋找不可擴展的程式碼 | 1. 新增 VM |
| 2. 重寫不可擴展的程式碼 | 2. 通知 Load Balancer |
| 3. 強化 VM | **That's It!** |
| **Long, Cumbersome（冗長、繁瑣）** | **Quick & Simple（快速、簡單）** |

**擴展類型對比矩陣：**

| **特性** | **Scale Up（垂直擴展）** | **Scale Out（水平擴展）** |
|:---|:---|:---|
| **做法** | 強化單一機器（更多 CPU、記憶體） | 增加更多機器 |
| **限制** | 有硬體上限 | **No Limits（無限制）** |
| **冗餘** | 無（單點故障） | **Redundancy（有冗餘）** |
| **需求** | - | Load Balancer |
| **成本曲線** | 指數上升 | 線性增長 |

**架構示意圖：**

```
┌──────────────────┐         ┌──────────────────────────────┐
│                  │         │      Load Balancer           │
│     單一伺服器    │         │         ↓  ↓  ↓              │
│    (Scale Up)    │  ────►  │  ┌───┐ ┌───┐ ┌───┐          │
│                  │         │  │VM │ │VM │ │VM │          │
└──────────────────┘         │  └───┘ └───┘ └───┘          │
                             └──────────────────────────────┘
     垂直擴展                        水平擴展 (Scale Out)
   有上限、無冗餘                   無上限、有冗餘
```

**設計決策指南：**
```
可擴展性設計檢查清單：
✅ 優先設計為可水平擴展（Scale Out）
✅ 系統應能動態增減 VM 而不影響服務
✅ Load Balancer 是水平擴展的關鍵組件
✅ 避免有狀態設計（Stateful），優先無狀態（Stateless）
```

---

### **Slide 3: 可管理性 - 系統的自我意識**
#### **Manageability: System Self-Awareness**

**麥肯錫風格設計要點：**
- **視覺主軸**：監控儀表板風格，心電圖意象
- **色系**：綠色(#00B388)表示健康，紅色(#DC3545)表示警報
- **版面配置**：左側系統，中央監控代理，右側管理控制台

**核心訊息（One Key Message）：**
> "Know what's going on and take actions accordingly — 知道系統正在發生什麼，並據此採取行動"

**可管理系統的架構：**

```
┌─────────┐    Report     ┌────────────┐           ┌─────────────────┐
│         │    Status     │            │           │                 │
│  Server │ ───────────►  │ Monitoring │ ────────► │   Management    │
│         │               │   Agent    │           │    Console      │
└─────────┘               └────────────┘           └─────────────────┘
   系統                      監控代理                 管理控制台
```

**關鍵問題：誰來報告問題？**

| **方式** | **評價** | **結果** |
|:---|:---|:---|
| **用戶報告問題** | 被動、延遲、損害用戶體驗 | ❌ 錯誤 |
| **系統自動報告問題** | 主動、即時、專業 | ✅ 正確 |

**可管理性關鍵組件：**

| **組件** | **職責** | **實現方式** |
|:---|:---|:---|
| **Monitoring Agent** | 收集系統狀態資訊 | Prometheus、Datadog Agent |
| **Management Console** | 展示狀態、觸發行動 | Grafana、自建儀表板 |
| **Alerting System** | 異常時主動通知 | PagerDuty、Slack 整合 |

**設計決策指南：**
```
可管理性設計檢查清單：
✅ 系統必須具備自我監控能力
✅ 問題應由系統主動發現，而非等用戶反映
✅ 建立監控代理（Monitoring Agent）與管理控制台（Management Console）
✅ 設定合理的告警閾值，避免告警疲勞
```

---

### **Slide 4: 模組化與可延展性 - 積木式設計**
#### **Modularity & Extensibility: Building Block Design**

**麥肯錫風格設計要點：**
- **視覺主軸**：樂高積木組裝圖，強調可替換性
- **色系**：不同模組用不同顏色區分
- **版面配置**：上半部模組化，下半部可延展性，展示演進

**核心訊息（One Key Message）：**
> "Modularity: 可替換的積木；Extensibility: 不改舊碼即可擴展"

**模組化 (Modularity) 定義：**

> "A system that is built from building blocks, that can be changed or replaced without affecting the whole system."
>
> 系統由積木組成，可以在不影響整個系統的情況下更改或替換

**非模組化 vs 模組化對比：**

```
非模組化設計：外部系統改變 → 整個系統需要修改
┌──────────────┐        ┌──────────────────────┐
│ External     │        │    Our System        │
│ System       │◄───────│  - Get the data  ❌  │ ← 全部受影響
│ (形狀改變)   │  API   │  - Save the data ❌  │
└──────────────┘        └──────────────────────┘

模組化設計：外部系統改變 → 只需修改對應模組
┌──────────────┐        ┌──────────────────────┐
│ External     │        │ ┌──────────────────┐ │
│ System       │◄───────│ │  Get the data ❌ │ │ ← 只改這個
│ (形狀改變)   │  API   │ └──────────────────┘ │
└──────────────┘        │ ┌──────────────────┐ │
                        │ │  Save the data ✅│ │ ← 不受影響
                        │ └──────────────────┘ │
                        └──────────────────────┘
```

**可延展性 (Extensibility) 定義：**

> "A system that its functionality can be extended without modifying its existing code."
>
> 系統功能可以被擴展，而不需要修改現有程式碼

**不可延展 vs 可延展對比：**

| **情境** | **不可延展（需改程式碼）** | **可延展（不改程式碼）** |
|:---|:---|:---|
| 新增 CSV 格式支援 | 修改 switch 增加 case | 實作新的 IFormatter |
| 新增支付方式 | 修改支付核心邏輯 | 註冊新的 PaymentProvider |
| 新增報表類型 | 修改報表產生器 | 插入新的 ReportGenerator |

**程式碼對比：**

```javascript
// ❌ 不可延展：每次新增格式都要改這裡
switch (format) {
    case "xml":  return formatXml(data);
    case "json": return formatJson(data);
    case "csv":  return formatCsv(data);  // 新增要改原始碼
}

// ✅ 可延展：新增格式不需改這裡
String formatQuery(string format, string data) {
    IFormatter formatter = GetFormatter(format);
    return formatter.Format(data);
}
// 新增 CSV 只需：1. 實作 IFormatter  2. 註冊到 GetFormatter
```

**設計決策指南：**
```
模組化 & 可延展性設計檢查清單：
✅ 將系統拆分為獨立的功能模組
✅ 模組之間通過明確的介面通訊
✅ 遵循開閉原則（Open for Extension, Closed for Modification）
✅ 使用策略模式、插件架構、依賴注入實現可延展性
```

---

### **Slide 5: 可測試性 - 品質的守門員**
#### **Testability: The Quality Gatekeeper**

**麥肯錫風格設計要點：**
- **視覺主軸**：測試金字塔（Unit → Integration → E2E）
- **色系**：綠色(#00B388)通過，紅色(#DC3545)失敗
- **版面配置**：左側測試類型，右側程式碼範例

**核心訊息（One Key Message）：**
> "How easy it is to test the application? — 測試應用程式的容易程度"

**測試類型矩陣：**

| **類型** | **說明** | **測試對象** | **執行速度** | **維護成本** |
|:---|:---|:---|:---|:---|
| **Manual（手動）** | 人工執行測試案例 | 整體系統 | 最慢 | 最高 |
| **Unit Testing（單元）** | 測試單一函數/方法 | 獨立模組 | 最快 | 最低 |
| **Integration Testing（整合）** | 測試多個模組協作 | 模組間互動 | 中等 | 中等 |

**單元測試範例：**

```csharp
// 被測試的函數
int Add(int x, int y) {
    return x + y;
}

// 單元測試（AAA 模式）
[TestMethod]
public void Add_Positives() {
    // Arrange（準備）
    int num1 = 9, num2 = 5, expected = 14;
    var calc = new Calculator();

    // Act（執行）
    var result = calc.Add(num1, num2);

    // Assert（驗證）
    Assert.AreEqual(expected, result);
}

// 結果：expected == result → ✅ 通過
//       expected != result → ❌ 失敗
```

**整合測試架構：**

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────┐
│  Test    │───►│ Module   │───►│ Module   │───►│ Module   │───►│ DB │
│  Method  │    │   #1     │    │   #2     │    │   #3     │    │    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └────┘
```

**可測試性的關鍵特徵：**

| **特徵** | **說明** | **範例** |
|:---|:---|:---|
| **Independent modules** | 模組可被單獨測試 | 不依賴外部服務 |
| **Single Responsibility** | 每個函數只做一件事 | 驗證邏輯與計算邏輯分離 |

**單一職責範例：**

```csharp
// ❌ 不好：混合職責，難以測試
int Add(int x, int y) {
    if (x >= 0 && y >= 0) {  // 驗證 + 計算混在一起
        return x + y;
    }
}

// ✅ 好：職責分離，可獨立測試
int Add(int x, int y) {
    if (CheckForPositive(x, y)) {
        return x + y;
    }
}

bool CheckForPositive(int x, int y) {  // 可獨立測試
    return x >= 0 && y >= 0;
}
```

**設計決策指南：**
```
可測試性設計檢查清單：
✅ 函數應該職責單一，便於獨立測試
✅ 避免在一個函數中混合多種邏輯
✅ 設計時考慮如何撰寫測試案例
✅ 優先採用單元測試，輔以整合測試
```

---

### **Slide 6: 品質屬性的權衡與場景化配置**
#### **Quality Attributes Trade-offs & Scenario-based Configuration**

**麥肯錫風格設計要點：**
- **視覺主軸**：天平/雷達圖展示多維權衡
- **色系**：綠色(#00B388)協同、紅色(#DC3545)衝突、藍色(#003A70)中立
- **版面配置**：上方權衡矩陣，下方場景處方

**核心訊息（One Key Message）：**
> "沒有完美的架構，只有適合的權衡。不同系統需要不同的品質屬性配方。"

---

#### **6.1 品質屬性間的協同與衝突**

**協同關係（提升 A 有助於 B）：**

| **屬性 A** | **屬性 B** | **協同原因** |
|:---|:---|:---|
| Modularity | Testability | 模組化設計天然支持單元測試 |
| Modularity | Extensibility | 獨立模組容易擴展新功能 |
| Modularity | Manageability | 模組邊界清晰便於監控定位 |
| Extensibility | Testability | 介面導向設計便於 Mock 測試 |

**衝突關係（提升 A 可能損害 B）：**

| **屬性 A** | **屬性 B** | **衝突原因** | **權衡策略** |
|:---|:---|:---|:---|
| Scalability | Manageability | 分散式系統監控複雜度上升 | 投資分散式追蹤工具 |
| Scalability | Testability | 分散式系統整合測試困難 | 契約測試 + 服務虛擬化 |
| Extensibility | 簡單性 | 過度抽象增加理解成本 | YAGNI 原則：需要時再抽象 |
| Modularity | 效能 | 模組間通訊有額外開銷 | 關鍵路徑允許適度耦合 |

**權衡關係圖：**

```
              Scalability
                  ▲
                  │
                  │ 衝突
    ┌─────────────┼─────────────┐
    │             │             │
Testability ◄────┼────► Manageability
    │             │             │
    │    協同     │    協同     │
    │             │             │
    └──────► Modularity ◄──────┘
                  │
                  │ 協同
                  ▼
            Extensibility
```

---

#### **6.2 場景化品質屬性配置（系統健康處方）**

**不同系統類型的品質屬性優先級：**

| **系統類型** | **🥇 首要** | **🥈 次要** | **🥉 第三** | **可權衡** | **典型案例** |
|:---|:---|:---|:---|:---|:---|
| **高流量 Web** | Scalability | Manageability | Modularity | Testability | 電商、社交媒體 |
| **企業內部系統** | Manageability | Modularity | Testability | Scalability | ERP、CRM |
| **金融交易** | Manageability | Testability | Modularity | Scalability | 銀行核心、證券 |
| **SaaS 產品** | Extensibility | Scalability | Modularity | - | Salesforce、Slack |
| **新創 MVP** | Testability | Modularity | - | Scalability | 驗證階段產品 |
| **遺留系統改造** | Modularity | Testability | Manageability | Scalability | 單體拆分 |

---

#### **6.3 系統健康處方卡**

**處方 A：高流量消費者應用**
```
診斷：百萬級用戶、流量波動大、快速迭代
處方：
├── Scalability: ★★★★★ (最高優先)
│   └── 無狀態設計、水平擴展、CDN
├── Manageability: ★★★★☆
│   └── 全鏈路監控、自動告警、快速回滾
├── Modularity: ★★★☆☆
│   └── 核心服務拆分，避免過度微服務
├── Extensibility: ★★☆☆☆
│   └── 按需設計，避免過早抽象
└── Testability: ★★★☆☆
    └── 關鍵路徑覆蓋，契約測試
```

**處方 B：企業關鍵業務系統**
```
診斷：穩定性要求高、變更需審計、用戶量穩定
處方：
├── Manageability: ★★★★★ (最高優先)
│   └── 完整日誌、審計追蹤、告警分級
├── Testability: ★★★★☆
│   └── 高覆蓋率、回歸測試、UAT 流程
├── Modularity: ★★★★☆
│   └── 清晰邊界、版本管理、向後相容
├── Extensibility: ★★★☆☆
│   └── 配置化優先、插件機制
└── Scalability: ★★☆☆☆
    └── 垂直擴展足夠，預留水平能力
```

**處方 C：快速迭代新創產品**
```
診斷：需求不確定、快速驗證、資源有限
處方：
├── Testability: ★★★★★ (最高優先)
│   └── 快速驗證假設、自動化回歸
├── Modularity: ★★★★☆
│   └── 便於重構、降低變更成本
├── Manageability: ★★★☆☆
│   └── 基礎監控、錯誤追蹤
├── Extensibility: ★★☆☆☆
│   └── YAGNI：需要時再設計
└── Scalability: ★☆☆☆☆
    └── 先驗證再擴展，避免過早優化
```

---

#### **6.4 品質屬性決策框架**

**決策流程：**

```
Step 1: 識別業務關鍵需求
        │
        ▼
Step 2: 映射到品質屬性
        │
        ▼
Step 3: 排列優先級（最多 3 個首要）
        │
        ▼
Step 4: 識別衝突與權衡
        │
        ▼
Step 5: 制定架構決策
        │
        ▼
Step 6: 記錄 ADR（Architecture Decision Record）
```

**快速決策矩陣：**

| **如果你的系統...** | **優先考慮** | **可以權衡** |
|:---|:---|:---|
| 用戶量可能暴增 10 倍 | Scalability | Testability |
| 出問題會造成重大損失 | Manageability | Scalability |
| 需要頻繁新增功能 | Extensibility, Modularity | - |
| 需要快速驗證想法 | Testability, Modularity | Scalability |
| 需要整合多個外部系統 | Modularity | Extensibility |
| 是長期維護的核心系統 | Manageability, Modularity, Testability | - |

**設計決策指南：**
```
品質屬性權衡檢查清單：
✅ 明確識別 Top 3 品質屬性，不要試圖全部優化
✅ 記錄權衡決策的原因（ADR）
✅ 定期回顧：業務變化時重新評估優先級
✅ 衝突時選擇對業務影響最大的屬性
✅ 避免過早優化：YAGNI（You Aren't Gonna Need It）
```

---

## 🎨 麥肯錫簡報設計規範

### 色彩系統（Color System）
- **主色**：深藍 #003A70（專業、信任）
- **強調色**：橙色 #FF6B35（轉換、關係）
- **成功色**：綠色 #00B388（正確做法、通過）
- **警示色**：紅色 #DC3545（錯誤做法、失敗）

### 視覺元素（Visual Elements）
- **流程圖**：展示 NFR → QA → Architecture 關係鏈
- **對比圖**：左右對比展示好壞做法
- **架構圖**：ASCII 風格系統架構
- **程式碼區塊**：展示具體實作差異

### 數據展示（Data Visualization）
- **定義始終引用原文**：保留英文原始定義
- **對比始終具體**：用程式碼展示差異
- **架構始終視覺化**：用圖表而非純文字
- **檢查清單收尾**：每個主題提供設計指南

---

## 📝 演講備註（Speaker Notes）

### 開場勾子（Opening Hook）
> "功能決定系統『能做什麼』，品質屬性決定系統『能活多久』。今天我們學習如何讓系統長命百歲。"

### 故事案例（Story Examples）
1. **Twitter 的擴展性挑戰**：從 Ruby 單體到分散式架構的痛苦轉型，犧牲了部分可管理性
2. **Netflix 的可管理性典範**：Chaos Engineering 主動注入故障，但需要大量投資
3. **WhatsApp 的模組化設計**：50 位工程師服務 10 億用戶，選擇 Erlang 犧牲人才池
4. **Amazon 的權衡決策**：為了 Scalability 接受最終一致性，放棄強一致性

### 互動環節（Interaction Points）
- **自我診斷**："你的系統是誰在報告問題？用戶還是系統自己？"
- **程式碼審查**："如果要新增一種輸出格式，你需要改幾個地方？"
- **測試覆蓋**："你的函數是否都只做一件事？"
- **權衡遊戲**："只能選 3 個品質屬性優先，你選什麼？為什麼？"
- **場景模擬**："你是 CTO，這個系統應該開什麼處方？"

### 關鍵要點總結（Key Takeaways）
1. ***-ilities = Quality Attributes**：用來滿足 NFR 的技術能力
2. **NFR → QA → Architecture**：這是架構設計的核心轉換路徑
3. **五大品質屬性**：Scalability、Manageability、Modularity、Extensibility、Testability
4. **權衡是常態**：沒有完美架構，只有適合的權衡
5. **場景化配置**：不同系統類型需要不同的品質屬性處方

### 結尾金句（Closing Statement）
> "記住：品質屬性不是事後才考慮的，必須在架構設計階段就納入。沒有完美的架構，只有適合業務的權衡。選擇哪些品質屬性取決於你的業務需求，而非技術潮流。"

---

## 📚 延伸閱讀

完整的品質屬性列表：
https://en.wikipedia.org/wiki/List_of_system_quality_attributes
