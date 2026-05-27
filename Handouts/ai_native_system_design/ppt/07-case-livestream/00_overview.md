---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · Live Stream / IM'
footer: 'AI 時代系統設計速成 '
---

<!-- _class: chapter -->

![bg right:38% w:90%](../assets/07_case_livestream_hero.png)

<div class="ch-no">CASE · 2</div>

# 即時直播 / IM 推送

## *WebSocket + 訊息佇列 + 高 fanout*

<br>

<span class="muted">從 1 主播 1K 觀眾到 10K 主播 1M 觀眾</span>


---


## Case 2 · 業務背景

<br>

**情境**：直播平台，主播開播後，聊天室訊息與禮物特效即時推給所有觀眾。

**真實壓力**：
- 主播數：10K 同時開播（多房間）
- 觀眾數：單熱門房 100K，平台總 1M
- 訊息量：每秒 50K 訊息（聊天 + 禮物）
- 推送量：fanout 後總計 5M msg/s（向所有觀眾推）
- 延遲要求：訊息發送到觀眾看到 < 1s P99
- 體驗：禮物特效要與主播畫面同步

<br>

<span class="muted">**核心挑戰**：高 fanout + 低延遲推送 + WebSocket 連線管理</span>

> Source: software_develop_journey/ppt/12-case-study/02_livestream.md
