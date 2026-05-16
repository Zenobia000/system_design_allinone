---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Modularity'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 03</div>

# Modularity
## *換掉一塊樂高，整體不會倒*


---


## WHY · 為何 Modularity 是長期生存戰？

<br>

<div class="highlight">

5 年內，這些都會換：
- DB 從 PostgreSQL 換到別的
- 第三方服務（金流、推播）換廠商
- 部分功能拆出成獨立服務

**模組化決定「能不能換」**，不能換 → 整個系統老化死亡。

</div>

<br>

- Modularity ≠ 微服務（兩個層級）
- 單體應用也可以高度模組化
- 真正的判準：**換一塊不會牽動其他塊**

> Source: `S8_Slides.pdf` · §Modularity Strategic Value


---


## HOW · 三個衡量指標

| 指標 | 定義 | 量法 |
|------|------|------|
| **內聚 (Cohesion)** | 一個模組內的東西彼此相關度 | 高 = 改動只在模組內 |
| **耦合 (Coupling)** | 模組間相互依賴程度 | 低 = 改 A 不影響 B |
| **介面穩定** | 公開 API 變動頻率 | 越穩 = 越成熟 |

<br>

<div class="highlight">

**口訣**：**High Cohesion · Low Coupling**。
這 6 個字是過去 40 年軟工沒變過的核心。

</div>

> Source: `S8_Slides.pdf` · §Cohesion & Coupling


---


## HOW · 模組邊界三準則

<div class="stack">
  <div class="layer client"><strong>① 業務邊界優先</strong>　 不是技術分層 · 是「商業概念」（user, order, payment）</div>
  <div class="layer app"><strong>② 資料擁有權</strong>　 每個資料表只有一個模組可寫</div>
  <div class="layer data"><strong>③ 透過介面通訊</strong>　 模組間不直接 import 內部類別 · 只用 public API</div>
</div>

<br>

<div class="alert">

**反模式**：用「技術型」邊界拆模組（controllers / services / repos）。改一個業務 feature 要跨 3 個資料夾。

</div>

> Source: `S8_Slides.pdf` · §Module Boundaries


---


## HOW · DDD Bounded Context 對照

```
   業務概念 (Domain)         模組邊界
   ──────────────         ──────────
   ① User Identity        auth/
   ② Product Catalog      catalog/
   ③ Shopping Cart        cart/
   ④ Order Processing     orders/
   ⑤ Payment              payments/
   ⑥ Notification         notify/

   每個模組:
   - 自己的 schema / table
   - 自己的 service / repository
   - 對外只暴露 public interface
```

<span class="muted">**Linus 風格**：模組像國家——有國界、有外交（API）、不互相干涉內政。</span>

> Source: `S8_Slides.pdf` · §DDD Bounded Context


---


## TRADE-OFF · 多細的模組才合理？

<div class="tradeoff">
  <div class="pro">
    <h3>粒度細的好處</h3>
    <ul>
      <li>單一職責清楚</li>
      <li>單一團隊負責</li>
      <li>容易替換</li>
      <li>可獨立部署（未來）</li>
    </ul>
  </div>
  <div class="con">
    <h3>粒度過細的代價</h3>
    <ul>
      <li>跨模組呼叫多 → 效能差</li>
      <li>跨模組事務難處理</li>
      <li>每模組 boilerplate 多</li>
      <li>5 個模組 5 套 logger config</li>
    </ul>
  </div>
</div>

<div class="highlight">

**經驗值**：MVP 階段 5–8 個模組剛好。**過早拆 20 個 = 過早微服務 = 失敗**。

</div>

> Source: `S8_Slides.pdf` · §Module Granularity


---


<!-- _class: end -->

# Modularity 完
## *三件 -ility 串好，章末收斂。*

<br>

<span class="lead">→ Ch.5 Recap</span>
