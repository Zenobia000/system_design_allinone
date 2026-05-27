---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · AI Prompt Flow'
footer: 'AI 時代系統設計速成 '
---

## C2.7 · 用 Claude Code 加速設計

<div class="prompt">

**Step 1 · 連線層容量規劃**：

```
Go WebSocket gateway，預計每台撐 10K 連線。
單連線：心跳 100B/s，平均 10 msg/min。
請算：
- 每台 RAM、CPU、頻寬需求
- 10K → 100K 連線需多少台
- 連線重連時的 thundering herd 怎麼避免
```

**Step 2 · Fanout 模式比較**：

```
比較 3 種 fanout 策略：
A) 每個 gateway 訂閱所有 room（廣播）
B) Consistent hash by room（指定 gateway）
C) Pub/Sub 中心化（Kafka topic per room）
給：吞吐 / 延遲 / 故障 isolation / 實作複雜度 評分。
```

**Step 3 · Reconnection 設計**：

```
WebSocket 連線會斷。設計重連流程：
- 帶 last_msg_id 避免漏訊
- 漸進退避避免 thunder
- session token 不重新登入
- server 端 connection state recover
寫成可實作的 spec。
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
