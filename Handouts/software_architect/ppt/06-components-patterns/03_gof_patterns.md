---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · GoF Patterns'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · TOPIC 03</div>

# GoF Patterns
## *23 個經典，先學會這 8 個*


---


## WHY · 為何 30 年前的模式仍然必修？

<br>

<div class="highlight">

GoF 23 個模式 = 一套**通用詞彙**。
你說「這裡用 Strategy」，全世界工程師（和 AI）秒懂。
你說「這裡寫一個 switch 把所有 case 列出來」——
要解釋 5 分鐘。

</div>

<br>

- 模式 ≠ 死記硬背
- 模式 = **解決方案的命名**
- 命名 = 溝通效率的指數加速

> Source: `Design+Patterns.pdf` · §Why GoF


---


<!-- _class: compact -->

## HOW · 必學 8 個模式

| 模式 | 類型 | 解決什麼 | 範例 |
|------|------|---------|------|
| **Factory** | Creational | 解耦「建立」與「使用」 | DB connection factory |
| **Singleton** | Creational | 全域唯一 instance | Logger / Config |
| **Builder** | Creational | 步驟建構複雜物件 | SQL query builder |
| **Adapter** | Structural | 接舊介面 / 第三方 | Stripe → Payment interface |
| **Repository** | Structural | 包裝資料存取 | UserRepo · OrderRepo |
| **Strategy** | Behavioral | 演算法可替換 | 折扣計算 / 排序 |
| **Observer** | Behavioral | 事件通知 | UI 監聽 / pub-sub |
| **Command** | Behavioral | 把操作物件化 | Undo / Queue / Replay |

<br>

<span class="muted">**先學會這 8 個** → 涵蓋 80% 工作場景。剩下 15 個遇到再查。</span>

> Source: `Design+Patterns.pdf` · §Top 8 Patterns


---


## HOW · 三大類別的精神

<div class="stack">
  <div class="layer client"><strong>Creational（建立）</strong>　 怎麼新建物件 · 隱藏 new 的細節</div>
  <div class="layer app"><strong>Structural（結構）</strong>　 怎麼組合物件 · 改變介面或互相關係</div>
  <div class="layer data"><strong>Behavioral（行為）</strong>　 怎麼讓物件互動 · 演算法與職責的分配</div>
</div>

<br>

<div class="highlight">

**判斷模式類型**：
- 解決「怎麼生」的問題 → Creational
- 解決「怎麼接」的問題 → Structural
- 解決「怎麼動」的問題 → Behavioral

</div>

> Source: `Design+Patterns.pdf` · §Three Categories


---


## HOW · 對應 AI 溝通範例

```
   ❌ 沒模式詞彙
   ──────────
   "幫我寫一個函式，傳入訂單後，根據是否 VIP
    用不同方式計算折扣，未來可能會加新規則..."

   ✅ 用模式詞彙
   ──────────
   "用 Strategy pattern 實作 DiscountStrategy
    介面，提供 VIPStrategy 和 RegularStrategy
    兩個實作"

   結果：AI 第二種一次就對，第一種要疊代 3 次
```

<br>

<span class="muted">**這就是「模式」對 AI 時代架構師的意義**——把溝通成本降到最低。</span>

> Source: `Design+Patterns.pdf` · §AI Prompt Efficiency


---


## TRADE-OFF · 模式狂熱 vs 模式盲目

<div class="tradeoff">
  <div class="pro">
    <h3>該用模式</h3>
    <ul>
      <li>邏輯有 3+ 個變種</li>
      <li>需要可擴展性</li>
      <li>有跨團隊溝通</li>
      <li>未來會接更多場景</li>
    </ul>
  </div>
  <div class="con">
    <h3>不該硬套模式</h3>
    <ul>
      <li>只有 1 種變種</li>
      <li>50 行能解決</li>
      <li>純資料轉換</li>
      <li>POC 探索階段</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：簡單 if/else 硬包成 Strategy + Factory + Singleton。讀者 5 分鐘才看出來「原來只是 2 個 case」。**過度模式化 = 過度複雜。**

</div>

> Source: `Design+Patterns.pdf` · §Pattern Abuse


---


<!-- _class: end -->

# GoF Patterns 完
## *模式詞彙到手，章末收斂。*

<br>

<span class="lead">→ Ch.6 Recap</span>
