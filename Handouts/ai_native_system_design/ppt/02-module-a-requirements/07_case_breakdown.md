---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.7 · Case · 模糊需求拆解'
footer: 'AI 時代系統設計速成 '
---

## A.7 · 案例：「做個直播間禮物特效」

<span class="kicker">END-TO-END · 從模糊到 ADR</span>

# 走一遍 7 步流程

<!-- _class: compact -->

| 步 | 產出 |
|---|---|
| 1 · 問題 | 主播收禮時要有特效；觀眾 1-10K，禮物含金額 0.1-1000 USD |
| 2 · NFR | 觸發延遲 < 500ms P99；可見性 ≥ 99% 觀眾在 1s 內看到 |
| 3 · 約束 | 已用 WebSocket 推送，team 3 人，無 GPU 預算 |
| 4 · 類型 | 即時互動 + fanout-write，無強事務需求 |
| 5 · 方案 | A. WebSocket 廣播 / B. Pub/Sub + edge / C. 客戶端本地特效 |
| 6 · Trade-off | A 簡單但 fanout 重；B 貴；C 信任問題 |
| 7 · ADR | 選 A，10K 用戶內可撐；超過 1M 再換 B |

<br>

<span class="muted">**關鍵洞察**：第 5 步本來想直接做 B（業界主流），第 6 步才發現團隊撐不起。</span>

> Source: _source/braindump.md · §需求量化的核心框架
