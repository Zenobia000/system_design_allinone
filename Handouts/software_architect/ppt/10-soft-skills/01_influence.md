---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.10 · Influence'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 10 · TOPIC 01</div>

# Influence Without Authority
## *沒實權也能讓事情發生*


---


## WHY · 為何「靠命令」會失敗？

<br>

<div class="highlight">

架構師對開發者沒有人事權。
你說「用 Strategy pattern」——對方說「我覺得 if/else 簡單」。

**強推**：對方表面同意，回去寫他想寫的。
**說服**：對方理解 *why* 後自願選擇。

只有第二種能持續。

</div>

<br>

- 命令是一次性的，說服是永久性的
- 說服一次，建立信任——下次他主動來問你

> Source: `S16_Slides.pdf` · §Authority vs Influence


---


## HOW · 五個影響力工具

<div class="stack">
  <div class="layer client"><strong>① 數據</strong>　 「上次類似決策後，error rate 升 30%」</div>
  <div class="layer app"><strong>② 案例</strong>　 「Netflix 當年也是這樣做，結果...」</div>
  <div class="layer data"><strong>③ 同儕背書</strong>　 「Senior X 也認同這個方向」</div>
  <div class="layer infra"><strong>④ 視覺化</strong>　 一張圖勝過 10 頁文件</div>
  <div class="layer infra"><strong>⑤ 試點</strong>　 「我們先在小範圍試 2 週」</div>
</div>

<br>

<div class="highlight">

**經驗值**：5 個工具同時用——一場架構評審成功率 80%。
單靠任一個——50%。

</div>

> Source: `S16_Slides.pdf` · §Influence Tools


---


## HOW · 反對意見處理流程

```
   對方說：「我不同意」
   ──────────────────

   ① 先聽完，不打斷
   ② 重述對方論點（讓他知道你懂）
   ③ 找共識（我們都同意 X）
   ④ 指出差異（我們在 Y 上不同）
   ⑤ 數據 / 案例支持你的立場
   ⑥ 願意妥協（接受次優解總比僵持好）
```

<br>

<div class="alert">

**反模式**：直接「你錯了」開頭——對方關起耳朵，後面說什麼都沒用。

</div>

> Source: `S16_Slides.pdf` · §Disagreement Handling


---


## HOW · 建立長期信任的三件事

| 行為 | 效果 |
|------|------|
| 承認自己不會 / 錯了 | 信任 +1（誰都會錯，承認的人少） |
| 推薦其他人的方案 | 信任 +2（你不是只賣自己的） |
| 跟進承諾 | 信任 +3（說了就做） |

<br>

<span class="muted">**架構師的信任資產**是 1–3 年累積的。
一次失信 → 砍掉 6 個月。</span>

> Source: `S16_Slides.pdf` · §Trust Building


---


## TRADE-OFF · 該堅持還是讓步？

<div class="tradeoff">
  <div class="pro">
    <h3>該堅持</h3>
    <ul>
      <li>資料模型決策</li>
      <li>安全與合規</li>
      <li>核心 API 契約</li>
      <li>會造成資料遺失的決策</li>
      <li>不可逆的決策</li>
    </ul>
  </div>
  <div class="con">
    <h3>該讓步</h3>
    <ul>
      <li>命名風格</li>
      <li>內部實作細節</li>
      <li>非關鍵性能優化</li>
      <li>程式碼風格小爭議</li>
      <li>對方更熟的領域</li>
    </ul>
  </div>
</div>

<div class="highlight">

**Linus 風格**：每場戰爭都打，會被討厭。
**選 20% 真正重要的戰場去贏**——剩下 80% 讓對方贏。

</div>

> Source: `S16_Slides.pdf` · §Choose Your Battles


---


<!-- _class: end -->

# Influence 完
## *說服力到手，下一站講受眾。*

<br>

<span class="lead">→ 10.2 Audience-Tuned Communication</span>
