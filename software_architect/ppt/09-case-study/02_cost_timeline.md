---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.9 · Cost & Timeline'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 09 · TOPIC 02</div>

# Cost & Timeline
## *完美技術 vs 死線——架構師最常做的取捨*


---


## WHY · 為何不能追求「完美架構」？

<br>

<div class="highlight">

完美架構 = 6 個月設計 + 12 個月實作 + 半年穩定。
死線 = 9 個月後競爭對手會上市。

**慢 = 死**。
架構師的工作是**讓「不完美但能活」**的架構上線。

</div>

<br>

- 完美的死系統 ≠ 不完美的活系統
- 上線後再演進，永遠是對的
- 「先上線」是大多數新業務的鐵律

> Source: `S12_Slides.pdf` · §Time vs Quality


---


## HOW · 三軸取捨模型

```
              品質 (Quality)
                   ▲
                   │
                   │
            ───────●───────  ← 你能挑 2 個
              ╱         ╲
            ╱             ╲
         成本             速度
         (Cost)           (Speed)

   經典三角：三選二，第三必然犧牲
```

<br>

| 業務情境 | 選擇 |
|---------|------|
| MVP / 創業 | 速度 + 成本（犧牲品質） |
| 銀行 / 醫療 | 品質 + 成本（犧牲速度） |
| 緊急上線 | 速度 + 品質（犧牲成本） |

> Source: `S12_Slides.pdf` · §Triangle Trade-off


---


## HOW · MVP 取捨策略

<div class="stack">
  <div class="layer client"><strong>① 用 buy 不用 build</strong>　 Auth0 / Stripe / Sendgrid · 自建賠工時</div>
  <div class="layer app"><strong>② 用 boring tech</strong>　 PostgreSQL + Redis · 不上 K8s</div>
  <div class="layer data"><strong>③ Monolith 起手</strong>　 單體 + 模組化 · 拆分晚點</div>
  <div class="layer infra"><strong>④ 監控簡化</strong>　 CloudWatch + Sentry 起步 · 別上 ELK 全套</div>
  <div class="layer infra"><strong>⑤ 自動化從 0 起步</strong>　 一鍵部署一定要 · 其他人工為主</div>
</div>

<br>

<div class="highlight">

**經驗法則**：MVP 階段砍 50% 「將來會用到」的功能。
那些「將來」**通常永遠不會來**。

</div>

> Source: `S12_Slides.pdf` · §MVP Architecture


---


## HOW · 技術債的記帳

```
   接受技術債的時機：
   ─────────────────
   ✓ 上線壓力大       → 記下來，3 個月內還
   ✓ 業務尚未驗證     → 記下來，pivot 後再還
   ✓ 規模還沒到       → 記下來，scale 前還

   不能接受的技術債：
   ─────────────────
   ✗ 安全漏洞         → 立即修
   ✗ 資料完整性       → 立即修
   ✗ 沒有測試         → 加上測試再上線
```

<br>

<span class="muted">**鐵律**：所有技術債必須**寫進 issue tracker**——口頭承諾的債，全部會被遺忘。</span>

> Source: `S12_Slides.pdf` · §Tech Debt Ledger


---


## TRADE-OFF · 何時該堅持「不妥協」？

<div class="tradeoff">
  <div class="pro">
    <h3>可以妥協（先上線再說）</h3>
    <ul>
      <li>UI 美觀</li>
      <li>非核心功能</li>
      <li>性能不到瓶頸時</li>
      <li>auto-scaling 細節</li>
      <li>「未來會大」的設計</li>
    </ul>
  </div>
  <div class="con">
    <h3>不能妥協</h3>
    <ul>
      <li>資料模型（後改超痛）</li>
      <li>認證/權限基礎</li>
      <li>核心 API 契約</li>
      <li>日誌與監控基線</li>
      <li>備份與災難恢復</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：MVP 為求快，把 user_id 設成 INT autoincrement。後來合規要 UUID + 軟刪除——整套重寫。

</div>

> Source: `S12_Slides.pdf` · §Where Not to Compromise


---


<!-- _class: end -->

# Cost & Timeline 完
## *取捨懂了，下一站講團隊約束。*

<br>

<span class="lead">→ 9.3 Team Constraints</span>
