---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Case 1 · Pitfalls & Monitoring'
footer: 'AI 時代系統設計速成 '
---

## C1.8 · 常見坑 + 監控指標 + 降級

<!-- _class: compact -->

**8 大坑**：
1. Redis 沒 cluster，single point of failure
2. Lua 腳本太長，阻塞 Redis 主執行緒
3. Kafka producer 沒 ack，掉訊息
4. Auto-scale 慢，秒殺開始才開始擴
5. 對帳邏輯沒寫，事後發現不一致沒法救
6. Rate limit 過嚴，正常用戶被擋
7. 沒有降級策略，DB 掛了整個炸
8. WAF 沒擋住 bot，黃牛全包

<br>

**核心 alert**：
- Redis P99 > 50ms（庫存層慢 = 完蛋）
- Kafka producer error rate > 0.1%
- DB lock wait > 100ms 持續
- App CPU > 80% 持續（auto-scale 沒跟上）

**降級**：庫存層 Redis 掛 → 自動切「先收 req 入 Kafka，後扣庫存」（接受可能超賣，事後退款）

> Source: software_architect/ppt/_source/05_ilities.md
