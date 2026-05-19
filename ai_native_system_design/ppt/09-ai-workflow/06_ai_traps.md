---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.6 · AI Traps & Review Checklist'
footer: 'AI 時代系統設計速成 '
---

## W.6 · AI 容易出錯的 7 種情境

<!-- _class: compact -->

| # | 情境 | 症狀 | 對策 |
|---|---|---|---|
| 1 | **編 API** | 「.find_by_xxx() 方法」實際不存在 | 跑一次再信 |
| 2 | **不知公司約束** | 推薦不能用的 vendor | context 寫明約束 |
| 3 | **縮小問題範圍** | 漏掉 edge case 才答 | 強制 「至少 10 case」 |
| 4 | **反向偏見** | 避免推薦最佳以免顯武斷 | 明說「給最佳，不要 hedge」 |
| 5 | **不敏感成本/延遲** | 推薦昂貴方案 | context 加 budget/latency |
| 6 | **不會處理政治** | 不知「老闆討厭 X」 | 自己擋掉 |
| 7 | **不主動問** | 沒澄清就答 | 設定「先問 3 題再答」 |

> Source: _source/braindump.md · §AI 工作流的 7 個常見地雷


---


## W.6 · 對應的人工 review checklist

<!-- _class: compact -->

收到 AI 產出，逐項過：

- [ ] API / function / 套件名稱真實存在？（跑一次）
- [ ] 推薦方案符合預算 / 團隊能力？
- [ ] Edge case 涵蓋夠？（至少邊界 / null / 並發）
- [ ] 安全：SQL injection / XSS / secret hardcode？
- [ ] 效能：迴圈 N+1 query？大 dataset OOM？
- [ ] 可維護：3 個月後別人看得懂？
- [ ] AI 是否避開了應推但「政治不正確」的方案？
- [ ] AI 是否列了 Trade-off（不只優點）？
- [ ] 文檔同步？test 補了？

<br>

<span class="muted">**金句**：AI 寫的 code 像實習生—收前要 review，發現問題要教它（更新 prompt / context）。</span>

> Source: _source/braindump.md
