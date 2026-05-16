---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Scalability'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 01</div>

# Scalability
## *Scale Out 直接決定業務上限*


---


## WHY · 為何 Scalability 是商業問題？

<br>

<div class="highlight">

**Scalability 不是技術指標，是商業天花板**。

系統撐不住 1M DAU → 公司就只能服務 100k 用戶。
不是技術問題，是「**今年營收上限被架構鎖死了**」。

</div>

<br>

- Scalability 問題在設計時就要解決
- 上線後才發現 → 推倒重建 6 個月起跳
- **架構師的核心 KPI**：讓業務 10× 成長時系統不崩

> Source: `S8_Slides.pdf` · §Scalability as Business Constraint


---


## HOW · Scale Up vs Scale Out

| 維度 | Scale Up（垂直） | Scale Out（水平） |
|------|----------------|------------------|
| 做法 | 換更強的機器 | 加更多機器 |
| 上限 | 硬體最高規 | 理論上無限 |
| 成本曲線 | 指數成長（頂規溢價高） | 線性 |
| 複雜度 | 低（無需改 code） | 高（需 stateless、分布式） |
| 適合 | DB 主節點、單機 GPU | 應用層、無狀態服務 |
| 風險 | 單點失效 | 一致性、分布式 bug |

<br>

<div class="highlight">

**現代雲架構**：應用層 Scale Out + 資料層**慎用 Scale Up**。
DB scale out（sharding）複雜度極高，盡量晚做。

</div>

> Source: `S8_Slides.pdf` · §Vertical vs Horizontal


---


## HOW · Scale Out 三前提

<div class="stack">
  <div class="layer client"><strong>① Stateless 應用層</strong>　 user state 放 Redis / DB · 不放 process memory</div>
  <div class="layer app"><strong>② 共享資料層</strong>　 多 instance 連同一 DB · 或 sticky session 配 LB</div>
  <div class="layer data"><strong>③ 自動化部署</strong>　 加 instance 是一鍵 (auto-scale + IaC)</div>
</div>

<br>

<div class="alert">

**反模式**：把 session 存在 process memory，然後加 LB——使用者每次請求被導到不同 instance，session 失效。

</div>

> Source: `S8_Slides.pdf` · §Scale-out Prerequisites


---


## HOW · 三層擴展策略

```
   Client Layer       CDN + 多 region 邊緣
        ↓
   App Layer          K8s + auto-scale + LB
        ↓
   Data Layer         主寫從讀 → 分片 → 分區
```

<br>

| 層次 | 推薦做法 | 複雜度 |
|------|---------|--------|
| Client | CDN + edge functions | 低 |
| App | Container orchestration | 中 |
| Data | Read replica → Sharding | 高 |

<span class="muted">**經驗法則**：擴展順序由上而下。**先 cache 再分片**——cache 能擋掉 90% 讀請求。</span>

> Source: `S8_Slides.pdf` · §Three-Layer Strategy


---


## TRADE-OFF · 過度設計 vs 設計不足

<div class="tradeoff">
  <div class="pro">
    <h3>提早規劃 scalability</h3>
    <ul>
      <li>避免 6 個月後推倒重建</li>
      <li>新團隊有方向</li>
      <li>架構文件可累積</li>
      <li>選型避開短期錯誤</li>
    </ul>
  </div>
  <div class="con">
    <h3>過早優化的代價</h3>
    <ul>
      <li>MVP 上線晚 3 個月</li>
      <li>程式碼複雜難改</li>
      <li>付雲端帳單卻沒用戶</li>
      <li>分散式 bug 多到改不完</li>
    </ul>
  </div>
</div>

<div class="highlight">

**Linus 風格做法**：**Day 0 設計成「能擴展但不擴展」**。
Stateless + 共享資料 = 隨時可加 instance，但**現在只跑 1 個**。

</div>

> Source: `S8_Slides.pdf` · §Premature Optimization


---


<!-- _class: end -->

# Scalability 完
## *撐住業務，下一站讓系統可測。*

<br>

<span class="lead">→ 5.2 Testability</span>
