---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.12 · Case Study'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 12 · OVERVIEW</div>

# Case Study
## *同一套角色·三種人生*


---


## WHY · 為什麼挑這三個

<span class="kicker">SECTION 1 · WHY THESE THREE</span>

# 三個系統 = 三種典型挑戰

<div class="stack">
  <div class="layer client"><strong>① 電商訂單</strong>　 OLTP 經典——交易、狀態、一致性</div>
  <div class="layer app"><strong>② 直播串流</strong>　 即時系統——低延遲、CDN、突發流量</div>
  <div class="layer data"><strong>③ AI 影視生成</strong>　 非同步系統——長任務、GPU 排程、成本</div>
</div>

<br>

<span class="muted">這三個**幾乎沒有共同點**——但同樣需要 9 個角色，只是**每個角色的重量會漂移**。</span>

> Source: _source/braindump.md · §訂單系統實例


---


## TEMPLATE · 九角色甘特帶

# 本章的視覺骨架

```
角色          投入度
──────────────────────────────────
PM            ████████████████
UX            ████████████████
UI            ████████████████
SA            ████████████████
Architect     ████████████████
SD            ████████████████
DBA           ████████████████
Dev           ████████████████
QA            ████████████████
DevOps        ████████████████
──────────────────────────────────
```

<span class="muted">這是**空白模板**——下面三個系統會分別填上「不同的粗細」，一眼看出重心。</span>

> Source: _source/braindump.md · §角色全景


---


## PREVIEW · 三系統一覽

<div class="tradeoff">
  <div class="pro">
    <h3>電商 · Baseline</h3>
    <ul>
      <li>9 角色平均出力</li>
      <li>核心：狀態一致性</li>
      <li>關鍵 hook：訂單完成 ≠ 付款成功</li>
      <li>適合先讀完整跑</li>
    </ul>
  </div>
  <div class="con">
    <h3>直播 / AI · 差異化</h3>
    <ul>
      <li>同一套角色，不同重點</li>
      <li>直播：延遲是跨角色合約</li>
      <li>AI 影視：PM 寫不出驗收</li>
      <li>讀完看出「漂移」</li>
    </ul>
  </div>
</div>

<span class="muted">**讀法建議**：先看完 12.1 電商當 baseline，再讀 12.2 / 12.3 才有對照感。</span>

> Source: _source/braindump.md · §直播串流系統挑戰


---


<!-- _class: end -->

# Overview 完
## *從電商開始跑一遍。*

<br>

<span class="lead">→ 12.1 電商訂單系統</span>
