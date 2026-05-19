---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.7 · Code Review with AI'
footer: 'AI 時代系統設計速成 '
---

## W.7 · 把 diff 變成架構審查對話

<div class="prompt">

**Prompt（review 自己的 PR 前）**：

```
請審查這個 PR：
@diff（貼 git diff）

從這 5 個角度評：
1. **架構**：違反分層 / 越界依賴 / 引入新模式但沒寫 ADR？
2. **資料**：N+1 query / 缺索引 / schema 改動向後不相容？
3. **可靠性**：缺 timeout / retry / idempotency / 錯誤處理？
4. **可觀測**：缺 metric / log / trace / alert？
5. **安全**：SQL injection / secret / IDOR / 缺 ACL？

每個發現給：
- 嚴重度（P0/P1/P2/P3）
- 證據（檔案:行）
- 修法建議
```

</div>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法


---


## W.7 · AI review 的 4 個失敗模式

<!-- _class: compact -->

| 失敗 | 怎麼避免 |
|---|---|
| **過度建議** | 限定「只挑 P0/P1，最多 5 個」 |
| **同義反覆** | 強制給 file:line 證據 |
| **不懂專案 convention** | 餵 STYLE_GUIDE.md / CLAUDE.md |
| **錯過跨檔影響** | 給 AI 訪問完整 codebase |

<br>

**進階用法**：把 AI review 變成 GitHub Action，但**不阻擋 merge**—當作「附加意見」，人類仍要看。

<br>

<span class="muted">**金句**：AI review 補你疏忽的，不取代你的判斷。</span>

> Source: _source/braindump.md
