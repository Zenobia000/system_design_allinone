---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'W.5 · Doc / Diagram / Test Sync'
footer: 'AI 時代系統設計速成 '
---

## W.5 · 文檔 / 圖 / 測試的 AI 生成流程

<span class="kicker">WORKFLOW · 別讓 doc 過時</span>

<!-- _class: compact -->

| 場景 | Prompt |
|---|---|
| **API doc** | `根據 @api.go 生成 OpenAPI 3.1 spec + curl 範例` |
| **架構圖** | `根據 @services/ 結構生成 PlantUML 元件圖` |
| **序列圖** | `根據 @handler.go 的 createOrder() 生成序列圖` |
| **ER 圖** | `根據 @migrations/ 生成 PlantUML ER 圖` |
| **單元測試** | `根據 @service.go 補 5 個 edge case 測試` |
| **changelog** | `根據 git log 過去 7 天生成 changelog` |
| **runbook** | `根據 @alert.yaml 寫對應 runbook` |
| **README** | `根據專案結構生成 quickstart + 架構說明` |

<br>

**核心 workflow**：每次 PR 加一個 「文件自動同步」step（CI 跑 AI 更新）。

<br>

<span class="muted">**金句**：好的文檔不是「寫」出來的，是「同步」出來的。</span>

> Source: _source/braindump.md · §AI 可以代勞的工作


---


## W.5 · CI 中的 AI 同步 workflow

```yaml
# .github/workflows/doc-sync.yml
on: pull_request
jobs:
  ai-doc-sync:
    steps:
      - uses: actions/checkout@v4
      - name: Generate updated docs
        run: |
          # 把 diff 餵給 Claude，更新 OpenAPI / README
          claude-code "根據以下 diff，更新 @docs/api.md：" \
            --files docs/api.md \
            --diff $(git diff origin/main..HEAD)
      - name: Commit changes
        run: |
          git add docs/
          git commit -m "docs: AI sync" || true
          git push
```

<br>

**注意**：AI 同步的文件人類仍要 review—不能 blind merge。

<br>

<span class="muted">**反 pattern**：CI 自動 merge AI 生成的 doc → 變成 noise，沒人看。</span>

> Source: _source/braindump.md
