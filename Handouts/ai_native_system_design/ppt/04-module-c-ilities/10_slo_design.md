---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.10 · SLO Design'
footer: 'AI 時代系統設計速成 '
---

## C.10 · SLO 設計流程

<span class="kicker">SLO · 三步走</span>

# 怎麼定 SLO 數字而不是亂拍腦袋

<!-- _class: compact -->

**Step 1 · 找 User Journey**
- 列出最關鍵 5 個 user journey（如「下單」「登入」「載入首頁」）
- 每個 journey 都對應 1-2 個 SLO

**Step 2 · 設 SLI**
- 每個 SLO 對應可量測的 SLI
- 範例：「下單」SLO → SLI = P99 server-side latency
- 不要選用戶端 latency 當 SLI（你管不了網路）

**Step 3 · 算 Error Budget**
```
SLO = 99.9% availability
Error budget = 0.1% × 30 days × 86400s = 2592s/month
            ≈ 43 分鐘/月
```
用 budget 來決定：能否冒險 deploy / 開新 region / 加 feature。

<br>

<span class="muted">**金句**：SLO 不是越高越好—越高成本越貴，且工程團隊壓力越大。</span>

> Source: software_architect/ppt/_source/02_Requirements_SLA.md · §SLO
