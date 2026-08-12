# CLAUDE.md — AI 常駐 context

> 這不是第五份文件,是四份文件的「注入口」。
> 放到專案根目錄(或把內容合併進既有的 CLAUDE.md / AGENTS.md)。
> 它的工作:讓每天早上「全新報到」的 AI,開工前先知道昨天發生過什麼。

## 開工前必讀

1. `docs-kit/02-define/prd.md` — 我們在解什麼問題;**Out of Scope 的東西不准做**
2. `docs-kit/03-design/adr.md` — 已定案的技術決策;不准推翻,想推翻先提案

## 行為規則

- 範圍:PRD 沒寫的功能不做。覺得「順手加了更好」→ 停下來,列進 prd.md 的 Open Questions 問人。
- 決策:遇到 adr.md 沒涵蓋的技術選擇,先問或先寫一則 D-x 草稿,不要直接選了就鋪開。
- 契約:`docs-kit/03-design/api-spec.yaml` 與 `data-model.md` 標記 Frozen 後,介面變更一律先改契約、再改程式;breaking change 要人簽核。
- 測試:驗收以 `docs-kit/02-define/acceptance-criteria.md` 為準。禁止寫「把實作抄一遍再 assert」的恆真測試;測行為,不測實作細節。
- 完成:不准自行宣稱「做完了」。做完 = acceptance 的 exit criteria 逐條有證據。

## 專案慣例(依專案自行補充)

- 技術棧:
- 目錄結構:
- 命名 / 風格:
- 不准碰的區域:
