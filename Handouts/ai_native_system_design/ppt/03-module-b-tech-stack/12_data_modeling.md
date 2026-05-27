---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'B.12 · Data Modeling'
footer: 'AI 時代系統設計速成 '
---

## B.12 · 資料建模四問

<span class="kicker">MODELING · 開 schema 前</span>

# 動 schema 前先答這 4 題

<!-- _class: compact -->

1. **這個實體的「生命週期」是什麼？**（建 → 用 → 終止）
2. **它的 ownership 屬於誰？**（user / tenant / global）
3. **它會怎麼被查詢？**（by id, by user, by time, full text…）
4. **5 年後它會長到多大？**（影響 partition / index）

<br>

**範例：訂單**

| 問題 | 答 |
|---|---|
| 生命週期 | created → paid → shipped → completed → archived（5 階段） |
| Ownership | user_id 主 owner，tenant_id 二級 |
| 查詢 | by id, by user_id+time desc（90%）, by status |
| 5 年規模 | 100M rows → 需 partition by month |

<br>

<span class="muted">**金句**：90% 的 schema 痛苦來自「沒問完這 4 題」就上線。</span>

> Source: software_architect/ppt/_source/04_Tech_Stack_Data.md · §Modeling
