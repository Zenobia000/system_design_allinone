---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 2 · Pitfalls & Monitoring'
footer: 'AI 時代系統設計速成 '
---

## C2.8 · 常見坑 + 監控指標 + 降級

<!-- _class: compact -->

**8 大坑**：
1. WebSocket 沒設 idle timeout，閒置連線爆 RAM
2. 重連風暴（同時斷線同時連回）→ thundering herd
3. 跨 region 訊息順序錯亂
4. Redis Pub/Sub 在訂閱者斷線時掉訊息
5. fanout 沒 batch，syscall 噴爆 CPU
6. 沒 backpressure，producer 把 consumer 灌死
7. 連線狀態存單機 → gateway 重啟全斷
8. 禮物推送沒 idempotency → 特效播兩次

<br>

**核心 alert**：
- WebSocket 連線數 / 機器 > 80% capacity
- Producer → Consumer lag > 500ms
- Gateway CPU > 70% 持續
- Reconnect rate spike（一般 < 1%）

**降級**：高峰時自動關「禮物特效推送」（保留聊天），減 80% fanout。

> Source: software_architect/ppt/_source/05_ilities.md
