---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · SOLID + DI'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · TOPIC 02</div>

# SOLID + DI
## *鬆耦合的兩條腿*


---


## WHY · 為何 SOLID 是 OOP 命脈？

<br>

<div class="highlight">

不照 SOLID 寫的程式碼：
- 改 A 模組壞 B 模組
- 加新功能要動 10 個地方
- 沒法寫單元測試

**SOLID 不是學院派——是工程師對「未來的自己」的承諾。**

</div>

<br>

- 不必每條都 100% 遵循
- 但每條被違反時必須**有意識**
- 自動化執行：用 linter / sonar 抓味道

> Source: `S10_Slides.pdf` · §SOLID Why


---


<!-- _class: compact -->

## HOW · SOLID 五原則速覽

| 原則 | 名稱 | 一句話 |
|------|------|--------|
| **S** | Single Responsibility | 一個 class 只有一個改變的理由 |
| **O** | Open/Closed | 對擴展開放，對修改關閉 |
| **L** | Liskov Substitution | 子類能無痛替換父類 |
| **I** | Interface Segregation | 多個小介面 > 一個大介面 |
| **D** | Dependency Inversion | 依賴抽象，不依賴具體 |

<br>

<span class="muted">**口訣**：**單 / 擴 / 替 / 隔 / 倒**。記不住順序沒關係——記住每條解決什麼痛。</span>

> Source: `S10_Slides.pdf` · §SOLID Detail


---


## HOW · DI 是 D 的落地

```
   違反 D：
   class OrderService {
       constructor() {
           this.db = new PostgreSQL()  ← 內部 new ← 死耦合
       }
   }

   遵循 D：
   class OrderService {
       constructor(db: Database) {     ← 介面注入 ← 鬆耦合
           this.db = db
       }
   }

   測試時可注入 MockDatabase
   切換 DB 不必改 service
```

<br>

<div class="highlight">

**洞察**：DI = SOLID 的 D 在語言層面的具體實踐。
DI 容器（Spring / NestJS）只是錦上添花，**手動 DI 也是 DI**。

</div>

> Source: `S10_Slides.pdf` · §DI Implementation


---


## HOW · SOLID 違反訊號（味道）

<div class="stack">
  <div class="layer client"><strong>S 違反</strong>　 class 名稱有「and」(UserAndOrderService)</div>
  <div class="layer app"><strong>O 違反</strong>　 加新功能要 if/else 一堆型別檢查</div>
  <div class="layer data"><strong>L 違反</strong>　 子類 override 時拋 NotSupportedException</div>
  <div class="layer infra"><strong>I 違反</strong>　 implement 一個介面但一半 method 拋 null</div>
  <div class="layer infra"><strong>D 違反</strong>　 class 內部 new 出第三方 SDK 物件</div>
</div>

<br>

<span class="muted">**看到這些訊號 → 停下來重構。不是潔癖，是預防未來 debug 災難。**</span>

> Source: `S10_Slides.pdf` · §Code Smells


---


## TRADE-OFF · 全套 SOLID vs 實用主義

<div class="tradeoff">
  <div class="pro">
    <h3>該嚴格遵循</h3>
    <ul>
      <li>公開 API 邊界</li>
      <li>核心業務邏輯</li>
      <li>需多種實作的介面</li>
      <li>長期維護的系統</li>
    </ul>
  </div>
  <div class="con">
    <h3>可以放寬</h3>
    <ul>
      <li>內部 utility</li>
      <li>POC 程式碼</li>
      <li>純資料容器 (DTO)</li>
      <li>50 行內的小腳本</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：每個 class 都包成 4 個介面 + 5 個 abstract——讀程式碼像穿迷宮。**過度抽象 = 自虐。**

</div>

> Source: `S10_Slides.pdf` · §SOLID Pragmatism


---


<!-- _class: end -->

# SOLID + DI 完
## *鬆耦合到手，下一站看 GoF。*

<br>

<span class="lead">→ 6.3 GoF Patterns</span>
