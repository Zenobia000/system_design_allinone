---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.9 · Team Constraints'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 09 · TOPIC 03</div>

# Team Constraints
## *選 Java 不是因為 Java 好，是因為團隊熟*


---


## WHY · 為何「最佳技術」常是錯答案？

<br>

<div class="highlight">

技術 benchmark 顯示 Rust 比 Python 快 30 倍。
但團隊 10 個人，1 個會 Rust，9 個會 Python。

**選 Rust** → 9 人邊學邊做 → 半年完成 + 一堆 bug
**選 Python** → 10 人熟練 → 3 個月完成 + 穩

「最佳技術」常常輸給「**團隊能駕馭的技術**」。

</div>

> Source: `S12_Slides.pdf` · §Team-driven Selection


---


## HOW · 團隊技能盤點

<div class="stack">
  <div class="layer client"><strong>① 主力語言調查</strong>　 每人列 3 個熟練語言 · 1 個學習中</div>
  <div class="layer app"><strong>② DB / Infra 經驗</strong>　 K8s / Docker / CI/CD 各幾人？</div>
  <div class="layer data"><strong>③ 架構模式熟悉度</strong>　 微服務 / DDD / event-driven 經驗</div>
  <div class="layer infra"><strong>④ 招募市場</strong>　 半年內能招到幾個合格人選？</div>
</div>

<br>

<div class="highlight">

**架構師 Day 0 必做**：和 HR / 招募主管聊一次。
不知道招得到誰，選的技術會變成空談。

</div>

> Source: `S12_Slides.pdf` · §Team Skill Audit


---


## HOW · 五個團隊規模對應的策略

| 團隊大小 | 推薦架構 | 不推薦 |
|---------|---------|--------|
| 1–3 人 | Modular monolith · 雲端 PaaS | 微服務 · K8s 自管 |
| 4–10 人 | Monolith 拆 BFF · containerize | Event Sourcing 全套 |
| 11–20 人 | Modular monolith · 部分服務化 | 完整微服務 |
| 21–50 人 | 微服務 + 平台組 | 不專業化 |
| 50+ 人 | 微服務 · platform engineering | Modular monolith |

<br>

<span class="muted">**Conway's Law 再次出現**：架構複雜度上限 ≈ 團隊規模。</span>

> Source: `S12_Slides.pdf` · §Team Size Strategy


---


## HOW · 政治約束（無形但致命）

| 政治約束 | 案例 | 解法 |
|---------|------|------|
| CTO 偏好 | 「我們是 AWS shop」 | 在 AWS 內找最佳解 |
| 既有合約 | 已買 Oracle license | 用到合約結束 |
| 合規限制 | 醫療需 HIPAA | 選 compliant SaaS |
| 部門政治 | 安全組要 review 一切 | 提早 loop in |
| 上市承諾 | 已對客戶承諾上線日 | 砍 scope · 不延期 |

<br>

<div class="alert">

**架構師失敗最常見原因**：忽略政治約束，做了「技術正確」但「**組織通不過**」的設計。

</div>

> Source: `S12_Slides.pdf` · §Political Constraints


---


## TRADE-OFF · 該為團隊「拉高」還是「就低」？

<div class="tradeoff">
  <div class="pro">
    <h3>拉高（引入新技術 / 培訓）</h3>
    <ul>
      <li>長期業務有持續成長</li>
      <li>核心競爭力需要新技術</li>
      <li>團隊有學習意願 + 時間</li>
      <li>有 1 個 senior 可帶</li>
    </ul>
  </div>
  <div class="con">
    <h3>就低（用團隊熟的）</h3>
    <ul>
      <li>業務不確定性高</li>
      <li>時間壓力大</li>
      <li>沒人能 mentor</li>
      <li>規模不需要新技術紅利</li>
    </ul>
  </div>
</div>

<div class="highlight">

**經驗法則**：每年只能引入 1–2 個新技術——就算客觀上 ROI 很高，更多會壓垮團隊。

</div>

> Source: `S12_Slides.pdf` · §Team Upskilling


---


<!-- _class: end -->

# Team Constraints 完
## *外部約束處理完，章末收斂。*

<br>

<span class="lead">→ Ch.9 Recap</span>
