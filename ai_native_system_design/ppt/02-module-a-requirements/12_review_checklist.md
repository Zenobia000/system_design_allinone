---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.12 · Review Checklist'
footer: 'AI 時代系統設計速成 '
---

## A.12 · ADR Review 檢查清單

<span class="kicker">REVIEW · 提案前自查</span>

# 把這 12 點過一次再送 review

<!-- _class: compact -->

- [ ] 問題重述清楚（不是 spec）
- [ ] NFR 都是可量測的，不是形容詞
- [ ] 至少 3 個候選方案
- [ ] 每個方案有「為何不選」的明確理由
- [ ] Trade-off 表是量化的（數字 / $）
- [ ] 列出至少 5 個明確的 trade-off 維度
- [ ] Consequences 含「3 年後反悔的逆轉成本」
- [ ] 有 Open Questions（不是「全都想清楚了」）
- [ ] 列出至少 3 個假設與待驗證
- [ ] 有預估的 PoC 範圍（不是「之後再做」）
- [ ] 列了哪個 stakeholder 簽核
- [ ] 寫了「下一次 review 條件」（什麼時候重新檢視）

<br>

<span class="muted">12 項全勾才送 review。沒勾的 → 補完或標註「為何此 ADR 不需要」。</span>

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
