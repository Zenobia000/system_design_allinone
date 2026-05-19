---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.5 · SLA / SLO / SLI'
footer: 'AI 時代系統設計速成 '
---

## A.5 · SLA / SLO / SLI 三層

<span class="kicker">CONTRACT · 對外對內</span>

# 三個 S 的差別與正確用法

<!-- _class: compact -->

| 層級 | 是什麼 | 給誰看 | 違反後果 |
|---|---|---|---|
| **SLA** | 對外承諾合約 | 客戶 | 賠錢 / 退費 |
| **SLO** | 對內目標 | 工程團隊 | 觸發改善 |
| **SLI** | 實際量測值 | 監控系統 | 自動告警 |

<br>

**典型關係**（從外到內遞嚴）：

```
SLA: 99.9%  ← 對外（用戶簽合約看的）
SLO: 99.95% ← 對內（給自己留 buffer）
SLI: 量到 99.97% ← 真實值
```

<br>

**Error budget**：100% - SLO = 允許「壞掉」的時間，是工程決策貨幣。
用完 → 凍結新功能、修穩定性。沒用完 → 可以做激進變更。

> Source: software_architect/ppt/_source/02_Requirements_SLA.md
