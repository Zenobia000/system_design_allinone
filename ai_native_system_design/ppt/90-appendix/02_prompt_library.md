---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Appendix · Prompt Library'
footer: 'AI 時代系統設計速成 '
---

## A.3 · 30 個經過驗證的架構 prompts (1/2)

<!-- _class: compact -->

```
### 需求類
1. 「把需求 X 翻成 5 個量化 NFR + 對應 SLI」
2. 「列出我該問 PM 的 5 個澄清問題」
3. 「扮 PM 模擬訪談，給我反問」

### 選型類
4. 「對比 [A] vs [B]，6 維度量化打分」
5. 「列 3 方案 + ADR 模板輸出」
6. 「扮演反方，攻擊我選的方案 5 點」
7. 「3 年後反悔的逆轉成本估算」

### 容量類
8. 「依 DAU/動作數，給 QPS / 儲存 / 頻寬 napkin」
9. 「在 [budget] 下能撐多少 user？」
10. 「峰值流量曲線估算 + auto-scale 參數」

### 架構類
11. 「審查我的架構圖，找 SPOF / 瓶頸 / 缺口」
12. 「畫 PlantUML 元件圖 + 序列圖」
13. 「列出每元件的故障場景 + 降級策略」
14. 「跨 region 部署的 4 個 trade-off」
15. 「從 1K QPS 到 100K QPS 演進三階段」
```

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## A.3 · 30 個 prompts (2/2)

<!-- _class: compact -->

```
### 資料類
16. 「從業務描述生成 ER 圖 + DDL + 索引建議」
17. 「Schema 演進策略：加欄位、改欄位、棄欄位」
18. 「Sharding key 選擇分析 + 反例」

### 程式類
19. 「根據 ADR 生成 PoC 骨架 + 5 edge case」
20. 「TDD: 先給測試，再給實作」
21. 「重構：找 code smell + 改寫示例」

### 維運類
22. 「依架構生成 Prometheus alert rules + runbook」
23. 「Incident post-mortem 模板 + 5 個 why 分析」
24. 「降級策略：每個外部依賴的 fail-safe」

### 文檔類
25. 「根據 diff 更新 OpenAPI / README / changelog」
26. 「把 ADR 翻成給 PM 的非技術摘要」

### 審查類
27. 「Review 此 PR 的 5 個維度（架構/資料/可靠/觀測/安全）」
28. 「OWASP top 10 對照此 endpoint 是否安全」

### 學習類
29. 「對比這個系統設計與業界 X 公司的做法」
30. 「我看不懂這個概念，用 [其他角色比喻] 解釋」
```

> Source: _source/braindump.md
