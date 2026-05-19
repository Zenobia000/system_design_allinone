---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.9 · Constraints Audit'
footer: 'AI 時代系統設計速成 '
---

## A.9 · 約束盤點清單（被忽視的第 3 步）

<span class="kicker">CHECKLIST · 容易跳的步</span>

# 不盤點約束 = 在沙上蓋樓

<!-- _class: compact -->

| 類別 | 該問的問題 | 例子 |
|---|---|---|
| **預算** | 月支出上限？是否含 SaaS？ | < $5K/月，含 Stripe |
| **團隊** | 人數？專長？輪班嗎？ | 3 人，會 Python 不會 Go |
| **時程** | 上線死線？是否可分階段？ | 90 天 MVP，180 天 V1 |
| **既有系統** | 必須相容什麼？API？資料？ | 既有 PostgreSQL，不可遷 |
| **法規** | GDPR / HIPAA / PCI？ | 跨歐盟，GDPR 必過 |
| **政治** | 哪個 vendor 不能用？ | 不能用 AWS（公司在用 GCP） |
| **語言** | code、文檔、UI？ | UI i18n 中英日 |
| **時區** | 維運是否 24/7 跨時區？ | 只有亞洲團隊，歐美夜班空窗 |

<br>

<span class="muted">**AI 弱區**：AI 不知道公司政治、不知道哪個 vendor 被禁。你必須自己列。</span>

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷
