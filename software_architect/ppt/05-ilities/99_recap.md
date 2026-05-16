---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Recap'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · RECAP</div>

# *-ilities 收斂
## *把 Ch.5 串成一份架構健檢表*


---


## CHECKLIST · 架構健檢 12 問

<!-- _class: compact -->

| # | 問題 | 通過判準 |
|---|------|---------|
| 1 | 業務 10× 時系統能擴展嗎？ | 應用層 stateless · DB 有 read replica 計畫 |
| 2 | 應用層加機器是一鍵嗎？ | auto-scale + IaC 自動化 |
| 3 | DB 是 SPOF 嗎？ | 主從 + 自動 failover |
| 4 | 80% 的單元測試覆蓋核心邏輯嗎？ | CI 強制 ≥ 70% |
| 5 | 整合測試打真 DB 嗎？ | 是 |
| 6 | 模組間靠 public API 通訊嗎？ | 是，沒有跨模組 import 內部類 |
| 7 | 每張 table 只有一個模組寫？ | 是 |
| 8 | 第三方依賴可替換嗎？ | 都有 adapter / interface 包裝 |
| 9 | 環境變數透過 config 物件存取？ | 是 |
| 10 | 時間依賴透過 clock 注入？ | 是 |
| 11 | 日誌 / 監控配置統一？ | 是，有 shared module |
| 12 | 部署是一鍵嗎？ | 是，無人工步驟 |

> Source: 整合 Ch.5 三大主題 + 業界 readiness checklist


---


## RECAP · 第五章帶走的東西

<div class="tradeoff">
  <div class="pro">
    <h3>新的工具</h3>
    <ul>
      <li>品質屬性優先級表</li>
      <li>Scale Out 三前提</li>
      <li>測試金字塔比例</li>
      <li>Testability 三件套</li>
      <li>模組邊界三準則</li>
    </ul>
  </div>
  <div class="con">
    <h3>還沒回答的問題</h3>
    <ul>
      <li>怎麼拆模組？　→ Ch.6</li>
      <li>分散式怎麼設計？　→ Ch.7</li>
      <li>進階模式何時用？　→ Ch.8</li>
      <li>實戰案例？　→ Ch.9</li>
    </ul>
  </div>
</div>


---


<!-- _class: end -->

# Ch.5 完
## *健檢標準有了，下一站學模式。*

<br>

<span class="lead">→ Ch.6 Components & Patterns</span>
