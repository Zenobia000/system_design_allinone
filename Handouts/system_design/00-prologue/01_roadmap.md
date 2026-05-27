---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Course Roadmap · 學習地圖'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">PROLOGUE · 00</div>

# 學習地圖
## *Seven chapters, one staircase.*

---

## ROADMAP · 七章一張圖

```
┌────────────────────────────────────────────────────────────┐
│  Ch.1  Foundation Layer        · Net / C-S / Scale / API    │
│        ↓                                                    │
│  Ch.2  Data Fundamentals       · CAP / Index / Tx / Numbers │
│        ↓                                                    │
│  Ch.3  Data Distribution       · Shard / Replicate / Cache  │
│        ↓                                                    │
│  Ch.4  Infrastructure          · DB / Blob / GW / LB / K8s  │
│        ↓                                                    │
│  Ch.5  Reliability & Ops       · Lock / Limit / Retry / O11y│
│        ↓                                                    │
│  Ch.6  Scaling Patterns        · Reads / Writes / Cache/CDN │
│        ↓                                                    │
│  Ch.7  Advanced Patterns       · Queue / Stream / Search /  │
│                                  Pipeline / RAG             │
└────────────────────────────────────────────────────────────┘
```

<span class="muted">每章只依賴前章。可單跳，也可一路往下。</span>

> Source: 重組自 系統設計實戰/{基本觀念,常用技術,維運與可靠性,設計模式}

---

## DEPENDENCY · 為何是這個順序

<div class="tradeoff">
  <div class="pro">
    <h3>由內而外</h3>
    <ul>
      <li>先理解 <strong>物理常數</strong>（網路、磁碟、CPU）</li>
      <li>再學 <strong>資料機制</strong>（CAP / Index）</li>
      <li>最後談 <strong>大規模工程</strong>（Scale / Pattern）</li>
    </ul>
  </div>
  <div class="con">
    <h3>避開常見錯誤</h3>
    <ul>
      <li>不從 K8s 開始（會錯過 stateless 設計動機）</li>
      <li>不從 Microservice 開始（會錯過 CAP 約束）</li>
      <li>不從 RAG 開始（會錯過 retrieval 系統的本質）</li>
    </ul>
  </div>
</div>

> Source: 課程設計原則 · 「把約束搞清楚再選工具」

---

## CAPABILITY LADDER · 能力分級

| Level | 描述 | 對應章節 | 典型場景 |
|------|------|--------|---------|
| **L1** | 看得懂技術名詞 | Ch.1 + Ch.2 | 讀懂團隊架構文件 |
| **L2** | 能畫出基本架構圖 | + Ch.3 + Ch.4 | 通過初級面試 |
| **L3** | 能落地實作中型系統 | + Ch.5 | 帶領 3-5 人小組 |
| **L4** | 能 review 別人的設計 | + Ch.6 | 跨團隊 architect 角色 |
| **L5** | 能設計新 pattern | + Ch.7 + Capstone | Staff / Principal Engineer |

<span class="muted">這份課程目標：把你從 L1 帶到 L4 的入口。</span>

---

## AUDIENCE · 適用 / 不適用

<div class="tradeoff">
  <div class="pro">
    <h3>適合</h3>
    <ul>
      <li>寫過 2 年以上後端的工程師</li>
      <li>準備系統設計面試的 mid-level</li>
      <li>想從 senior 走向 staff 的人</li>
      <li>想看 trade-off 而非教條的人</li>
    </ul>
  </div>
  <div class="con">
    <h3>不適合</h3>
    <ul>
      <li>完全沒寫過後端的新手</li>
      <li>只想要「最佳實踐」的人</li>
      <li>找特定 framework 教學的人</li>
      <li>找 cloud provider 認證的人</li>
    </ul>
  </div>
</div>

---

## PACE · 學習節奏建議

<div class="stack">
  <div class="layer client"><strong>密集模式</strong>　 1 週 / 章　每天晚上 1 小時　共 7 週</div>
  <div class="layer app"><strong>週末模式</strong>　 2 週 / 章　每週六上午 2 小時　共 14 週</div>
  <div class="layer data"><strong>面試衝刺</strong>　 3 天　 Ch.1 + Ch.2 + 附錄速查表 + capstone</div>
  <div class="layer infra"><strong>團隊讀書會</strong>　 1 章 / 場　 90 分鐘 +討論　共 7 場</div>
</div>

<br>

<div class="highlight">

每章看完別急著下一章。**先把該章的決策樹畫一次**——能在白紙上重畫，才算學會。

</div>

---

## NEXT · 接下來

<span class="kicker">下一份檔案</span>

# 02 · 如何使用這份簡報
## *3 種閱讀方式 + 術語表 + 圖示說明*

<br>

<span class="lead">讀完接著進 03 心智模型，再正式進入 Ch.1。</span>
