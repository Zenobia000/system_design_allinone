---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.01 · AI Substitution Matrix'
footer: 'AI 時代系統設計速成 '
---

## WHAT · AI 可代勞 vs 不可代勞

<span class="kicker">CORE MATRIX</span>

# 9 角色 × AI 的真實分工

<!-- _class: compact -->

| 角色 | AI 可代勞（70%-90%） | AI 取代不了（10%-30%） |
|---|---|---|
| PM | 競品調研、文件、roadmap 草稿 | 商業假設、優先級、刪 feature |
| UX | 線稿、icon、A/B 文案 | 真實訪談、資訊架構決策 |
| SA | spec 草稿、流程圖、狀態圖 | 業務 edge case、規則衝突仲裁 |
| Architect | 架構圖、ADR 草稿、方案比較表 | 風險取捨、SLO 承諾、技術選型 |
| SD | API spec、模組骨架、序列圖 | 模組邊界、領域建模 |
| DBA | DDL、索引建議、查詢優化 | schema 設計、一致性策略 |
| Dev | 90% boilerplate、單元測試 | 演算法選擇、debug、技術債判斷 |
| QA | 測試案例展開、自動化腳本 | invariant 定義、風險優先級 |
| DevOps | IaC、CI/CD、監控設定 | SLO 數字、事故應對、成本決策 |

> Source: _source/braindump.md · §AI 取代不了的核心判斷


---


## WHAT · AI 強的反而是 boilerplate

<span class="kicker">INSIGHT</span>

# 越「重複」AI 越強；越「判斷」AI 越弱

<br>

<div class="tradeoff">
  <div class="pro">
    <h3>AI 強區（直接代勞）</h3>
    <ul>
      <li>套件 API、語法、樣板</li>
      <li>文檔翻譯、changelog</li>
      <li>測試案例展開</li>
      <li>監控設定生成</li>
      <li>PlantUML / Mermaid 轉換</li>
    </ul>
  </div>
  <div class="con">
    <h3>AI 弱區（你必須會）</h3>
    <ul>
      <li>定義「對」的標準</li>
      <li>跨團隊邊界劃分</li>
      <li>成本 vs 品質取捨</li>
      <li>「不做」的決策</li>
      <li>處理公司政治約束</li>
    </ul>
  </div>
</div>

<span class="muted">**速成策略**：學弱區的判斷力，把強區交給 AI，每次都驗證。</span>

> Source: _source/braindump.md · §AI 可以代勞的工作
