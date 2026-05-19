---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'D.7 · Service Split Timing'
footer: 'AI 時代系統設計速成 '
---

## D.7 · 服務拆分的時機判斷

<span class="kicker">CASE · 何時拆？</span>

# 拆服務的「真實成本」清單

<!-- _class: compact -->

拆一個服務你會多出來的工作：

- 1 條新 CI/CD pipeline
- 1 套部署配置（K8s yaml）
- 1 套監控 / alert
- 1 個 service mesh 配置（mTLS, routing）
- 1 套 secret 管理
- 1 條跨服務契約測試
- 1 份新的 runbook
- N 個 distributed tracing 配置

<br>

**範例：拆「通知服務」的成本**：
- 工程：~2-3 週初始 + 持續維運
- 維運：~$200/月 額外（pod, monitoring）
- 心智：每次跨服務 debug 多 30 分鐘
- 機會：團隊 2 週本可做新 feature

<br>

<span class="muted">**金句**：能用模組解的別用服務。拆完 6 個月會問「我為什麼要拆」。</span>

> Source: software_architect/ppt/_source/08_Advanced_Patterns.md · §Service Cost
