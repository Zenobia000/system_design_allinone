---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.01 · Dev'
footer: 'AI 時代系統設計速成 '
---

## ROLE 7 · Dev · Developer

<span class="kicker">工班師傅</span>

# 真的把樓蓋起來—在 AI 時代角色變最多

<br>

**經典產出**：可運行的 code、單元測試、PR、code review、bug fix。

**判斷力核心**：
- 這段 code 該重構還是接受技術債？
- bug 的「根因」vs「症狀」—修哪一層？
- AI 給的 code 我要全收還是只收 60%？

<br>

<span class="muted">📗 想看完整角色 → software_develop_journey/ppt/08-dev/</span>

> Source: _source/braindump.md · §AI 取代不了的核心判斷


---


## Dev · AI 協作模式（變化最大）

<div class="prompt">

**典型 workflow（不只是 prompt）**：

```
1. 用 ADR 開頭給 Claude Code（context）
2. 「先列 3 種實作方式 + trade-off」
3. 「選 X，理由 Y。實作」
4. 「補單元測試，至少 5 個 edge case」
5. 「重寫成最簡」
6. 人工 review：邊界、異常、日誌、SQL 注入
```

</div>

<br>

**AI 強**：90% boilerplate、單元測試、bug 重現 script、refactor。
**AI 弱**：演算法選擇、技術債判斷、跨檔案的隱性依賴。
**陷阱**：AI 寫的 code「會跑但難維護」—一定要 review 可讀性。

> Source: _source/braindump.md · §AI 工作流的五種高槓桿用法
