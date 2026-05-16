---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.3 · Six-Step Process'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 03 · TOPIC 01</div>

# Six-Step Process
## *架構師的標準作業流程*


---


## WHY · 為何需要 SOP？

<br>

<div class="highlight">

沒有 SOP 的架構設計：
- 想到什麼畫什麼 → 漏需求
- 先選技術後找問題 → 過度工程
- 缺文件 → 半年後沒人記得為何這樣設計

**SOP 不是限制創造力，是讓創造力放在對的層次。**

</div>

<br>

- 每一步都有「驗收交付物」
- 階段門檻清楚 → 可以暫停 / 回頭
- 跨團隊複用 → 新人 onboarding 快

> Source: `S4_Slides.pdf` · §Why a Process


---


<!-- _class: compact -->

## HOW · 六步驟全圖

| 步驟 | 名稱 | 核心任務 | 交付物 |
|------|------|---------|--------|
| **①** | 理解需求 | 挖功能 + NFR + 約束 | PRD · NFR Matrix |
| **②** | 概念設計 | 領域建模 · Bounded Context | Domain Model · ER 圖 |
| **③** | 技術選型 | 評估 stack · 寫 ADR | Tech Stack · ADR-001 |
| **④** | 組件設計 | 拆模組 · 定接口 | C4 圖 · API Spec |
| **⑤** | 風險評估 | 攻擊架構 · failure mode | Risk Report · FMA |
| **⑥** | 實施指導 | 規範 + 鷹架 + observability | Guidelines · Scaffold |

<br>

<span class="muted">**口訣**：**理-念-選-設-險-導**。每步沒交付物，不能進下一步。</span>

> Source: `S4_Slides.pdf` · §Six-Step Detail


---


## HOW · 對應「架構師武僧」七步

| 武僧七步 | 六步流程 | 對應 Agent |
|---------|---------|-----------|
| 需求分析 | ① 理解需求 | 需求分析師 |
| 領域建模 | ② 概念設計 | 領域建模師 |
| 技術策略 | ③ 技術選型 | 技術策略師 |
| 系統設計 | ④ 組件設計 | 系統設計師 |
| 風險評估 | ⑤ 風險評估 | 風險評估師 |
| 技術主管 | ⑥ 實施指導 | 技術主管 |
| 演進守護 | (post-launch) | 演進守護者 |

<br>

<span class="muted">六步是「上線前」的設計流程；第七步「演進守護」是上線後的事——Ch.7 觀測性會講。</span>

> Source: `_source/_source/架構師.md` ※ 對應原《架構師武僧寶典》


---


## TRADE-OFF · 何時可以跳步驟？

<div class="tradeoff">
  <div class="pro">
    <h3>可以簡化的情境</h3>
    <ul>
      <li>內部小工具 (DAU<100)</li>
      <li>POC / spike</li>
      <li>明確只活 3 個月</li>
      <li>沿用既有架構 + 小改</li>
      <li>單人專案</li>
    </ul>
  </div>
  <div class="con">
    <h3>絕不能跳的情境</h3>
    <ul>
      <li>對外服務</li>
      <li>多團隊協作</li>
      <li>需要合規（GDPR/SOC2）</li>
      <li>金流 / 醫療 / 安全</li>
      <li>預計活 3 年以上</li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：「敏捷」當作不寫文件的理由——半年後團隊集體失憶。

</div>

> Source: `S4_Slides.pdf` · §When to Skip


---


<!-- _class: end -->

# Six-Step Process 完
## *流程懂了，下一站看應用類型。*

<br>

<span class="lead">→ 3.2 App Type Strategy</span>
