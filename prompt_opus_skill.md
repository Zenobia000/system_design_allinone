# 大模型分級挑選與協作 SOP（2026-05 版）

> 目的：把「該用哪個模型？怎麼一起用？」從直覺判斷轉為可重複的工作流。
> 對象：把 LLM 當生產工具的開發者 / PM / 研究者，而非單純對話使用者。

---

## 一、模型分級總覽（2026-05）

當前主流大模型可分為四個工程等級：Frontier、Pro、Fast、Open / Self-host。
差異不只在「聰明程度」，更在推理深度、工具使用、延遲、成本、部署治理與可驗證性。


| 等級                   | 定位                        | 2026-05 建議代表模型                                                                                                                                                            |
| -------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontier**         | 最深推理、長程 Agent、跨檔案工程、研究級任務 | OpenAI **GPT-5.5 / GPT-5.5 pro**、Anthropic **Claude Opus 4.7**、Google **Gemini 3.1 Pro**、xAI **Grok 4.3**                                                                 |
| **Pro**              | 主力日常模型，兼顧品質、成本與速度         | OpenAI **GPT-5.4 / GPT-5.4 pro / GPT-5**、Anthropic **Claude Sonnet 4.6**、Google **Gemini 2.5 Pro**、Alibaba **Qwen3-Max / Qwen3.6-Plus**、**DeepSeek V3.2 / V3.2-Speciale** |
| **Fast**             | 低延遲、低成本、高頻任務              | OpenAI **GPT-5.4 mini / nano、GPT-5 mini / nano**、Anthropic **Claude Haiku 4.5**、Google **Gemini 3 Flash / 2.5 Flash / 2.5 Flash-Lite**                                    |
| **Open / Self-host** | 可自託管、可微調，適合敏感資料與內網場景      | Meta **Llama 4 Maverick / Scout**、Alibaba **Qwen3 open 系列**、**DeepSeek V3.2 可用權重版本**、Mistral **Large 3 / Devstral 2 / Medium 3.5**、OpenAI **gpt-oss-120b / gpt-oss-20b**  |


> **命名與版本提醒**（依官方文件 2026-05 校對）：
>
> - OpenAI 已不是 GPT-5 / GPT-5 Pro 為主力，**Frontier 是 GPT-5.5 系列**；"o4" 並非當前可用的旗艦完整模型名，**o4-mini 已由 GPT-5 mini 接替**。
> - Google 應寫 **Gemini 3.1 Pro**（不是 Gemini 3 Pro）。
> - xAI 已推出 **Grok 4.3**，建議優先使用而非僅標 Grok 4。
> - DeepSeek **V3.1 已過期**，目前為 V3.2 / V3.2-Speciale；pricing 文件也出現 `deepseek-v4-pro`（部署前需實測與確認供應區域）。
> - Mistral **Large 2.1 已被 Large 3 取代**，主表不再放 2.1。
>
> **Benchmark 時效提醒**：以上排名以 2026-05 為基準，建議定期回查：
>
> - [LMArena](https://lmarena.ai/)（人類盲測 ELO）
> - [SWE-bench Verified](https://www.swebench.com/)（真實 GitHub issue 修復，500 任務子集，受 agent harness 影響）
> - [Aider Polyglot Leaderboard](https://aider.chat/docs/leaderboards/)（多語言編碼）
> - [Artificial Analysis](https://artificialanalysis.ai/)（綜合 + 價格 + 速度）
> - [ARC-AGI Leaderboard](https://arcprize.org/leaderboard)（抽象推理）
>
> **重要警告**：
>
> 1. 不要把某模型永久綁定某榜單第一名——榜單會換，且 agent harness 設計常常比模型本體影響更大。
> 2. 同一供應商「越強 ≠ 一切任務都更好」。例如 Opus 4.7 在字面遵循上更嚴格，反而不適合需要「腦補補完」的閒聊需求（見文末案例）。
> 3. Benchmark 高不代表你的特定 workload 更好——務必跑自家 eval。

---

## 二、選模型的五個決策軸

不要從「哪個模型最強」開始問，而是從任務性質倒推。

1. **任務深度**：單跳查詢 → Fast；3 步內推理 → Pro；多步驟 Agent / 跨檔案修改 → Frontier。
2. **指令明確度**：意圖模糊、需要對方猜 → 偏 Pro（容錯高）；規格完整、不容偏差 → Frontier（嚴格遵循）。
3. **輸出可驗證性**：可單元測試 / 可 lint → 放心用 Frontier 自動跑；難驗證（例如創意文案）→ 走多模型互審。
4. **延遲預算**：使用者等 < 2 秒 → Fast；批次背景 → Pro / Frontier。
5. **單次成本上限**：高頻 API（每天 >10k 次）→ Fast 為主、Pro 為備；低頻深度任務 → Frontier 全包。

---

## 三、任務 × 模型對照表（2026-05 修正版）

> 注意：benchmark 僅供參考方向，**不要把某模型永久綁定某榜單第一名**。SWE-bench Verified 只有 500 任務且受 agent harness 影響很大。


| 任務類型             | 首選                                                                               | 備援 / 互審                   | 參考 benchmark                         |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------- | ------------------------------------ |
| 跨檔案重構、Repo 級改動   | **Claude Opus 4.7** / **GPT-5.5 pro**                                            | Sonnet 4.6 預覽 diff        | SWE-bench Verified（模型 + harness 一起看） |
| 單檔修 bug、寫新功能     | **Sonnet 4.6** / **GPT-5.4**                                                     | Frontier 處理難題             | Aider Polyglot、LiveCodeBench         |
| 程式碼審查            | 與作者「不同家」的 Frontier（Claude 寫 → GPT-5.5 審；反之亦可）                                    | —                         | 跨家盲點互補，無單一 benchmark                 |
| 終端指令 / Shell 操作  | **GPT-5.4 / GPT-5.5** / **Gemini 3.1 Pro**                                       | Claude 補規劃                | Terminal-Bench、OSWorld               |
| 網頁搜尋 + 整合        | **Gemini 3.1 Pro**（原生 Search Grounding）/ **GPT-5.5** with web                    | Claude 整理                 | SimpleQA、BrowseComp                  |
| 結構化抽取 / JSON     | **Haiku 4.5** / **Gemini 2.5 Flash / Flash-Lite** / **GPT-5.4 mini**             | Pro 補錯                    | JSON-mode 準確率、IFEval                 |
| 分類 / 意圖路由        | **Haiku 4.5** / **GPT-5.4 nano / GPT-5 nano**                                    | —                         | 延遲 P50 < 500ms                       |
| 長文翻譯、潤稿          | **Sonnet 4.6**                                                                   | Opus 4.7 處理高難段落           | FLORES-200、人工盲測                      |
| 研究級長鏈推理          | **Opus 4.7** + Extended Thinking、**GPT-5.5 pro**、**Gemini 3.1 Pro Deep Think**   | 另一家 Frontier 互審           | GPQA Diamond、AIME 2025、HMMT          |
| 影像 / 圖表理解        | **Gemini 3.1 Pro** / **GPT-5.5**                                                 | Claude 補文字推論              | MMMU-Pro、ChartQA、MathVista           |
| 影片理解             | **Gemini 3.1 Pro / Gemini 3 Flash**（長上下文 + 原生影片）                                 | —                         | Video-MME、EgoSchema                  |
| Tool calling 主迴圈 | **Sonnet 4.6** / **GPT-5.4** / **Grok 4.3**                                      | Haiku 4.5 / Flash 處理子步驟   | BFCL v3、τ-bench                      |
| 抽象推理 / 規劃        | **Opus 4.7** / **GPT-5.5 pro**                                                   | —                         | ARC-AGI-2                            |
| 個資敏感 / 內網資料      | **Qwen3 open** / **Llama 4 Maverick** / **DeepSeek V3.2 權重版** / **gpt-oss-120b** | —                         | Open LLM Leaderboard v3              |
| 數學競賽級            | **GPT-5.5 pro** / **Gemini 3.1 Pro Deep Think** / **Opus 4.7**                   | DeepSeek V3.2-Speciale 互審 | AIME 2025、HMMT、Putnam                |
| 中國雲 / 中文任務       | **Qwen3-Max / Qwen3-Max-Thinking / Qwen3.6-Plus**                                | DeepSeek V3.2             | C-Eval、CMMLU                         |
| Coding Agent（開源） | **Devstral 2** / **Llama 4 Maverick**                                            | Qwen3-Max                 | SWE-bench Verified（開源組）              |


---

## 四、四種協作模式

### 模式 A：單模型獨跑

- 適用：低風險、可驗證、預算敏感。
- 風險：模型對自己的產出有盲點，幻覺難被發現。

### 模式 B：Producer–Reviewer（跨家互審）

- 主模型產出 → 另一家模型審 → 人類拍板。
- 關鍵：審核者要「不同家」，避免共享訓練盲點。
- 範例：Claude Opus 寫 patch → GPT-5 跑 review prompt → 人看 diff。

### 模式 C：Router（模型路由）

- 前置一個 Fast 模型判斷任務性質，分派到對應等級。
- 範例：所有請求先進 Haiku 分類 → 簡單問答留 Haiku、寫程式轉 Sonnet、跨檔案 Agent 轉 Opus。
- 收益：成本通常可砍 60–80%。

### 模式 D：Pipeline（流水線分工）

- 把單一複雜任務拆成階段，每階段配對應模型。
- 範例（RAG 問答）：Fast 改寫 query → Pro 檢索並整合 → Frontier 寫最終答案 → Fast 做事實檢查。

---

## 五、Prompt 策略隨等級調整


| 等級       | 寫 Prompt 的重點                               | 反模式                  |
| -------- | ------------------------------------------ | -------------------- |
| Frontier | 寫**意圖**：目的、受眾、成功標準、要避開的錯。指令越精確越好，因為它會字面執行。 | 把它當 4.6 那種「會自動腦補」的版本 |
| Pro      | 給足上下文 + 少量範例（few-shot）。可以稍微模糊。             | 過度結構化反而綁手綁腳          |
| Fast     | 一句話 + 明確輸出格式。不要長 system prompt。            | 給它做多步推理              |
| Open     | 通常需要更明確的格式範例、less zero-shot。               | 期待它有最新世界知識           |


**共通法則**：Prompt 不是越長越好，而是越「能讓對方判斷邊界」越好。包含：

- 任務目的（why）
- 成功標準（done 的定義）
- 應避開的常見錯誤
- 輸出格式 / 受眾

---

## 六、成本與 Token 的隱形成本

- **Tokenizer 升級**：新代際模型（如 Opus 4.7）同樣 Prompt 可能多耗 30–47% token。換模型時要重估 budget。
- **Adaptive / Extended Thinking**：旗艦模型常默默燒大量「思考 token」，計費上算 output。要監控 `thinking_tokens`。
- **Prompt Caching**：對固定 system prompt + 工具定義務必開快取，5 分鐘 TTL 內重複呼叫成本可降 90%。
- **批次 API（Batch）**：非即時任務走 batch 通常半價。
- **路由收益估算公式**：`節省 = (1 - Fast佔比×Fast單價/Frontier單價 - Pro佔比×Pro單價/Frontier單價) × 原總成本`。

---

## 七、可複製的三步 SOP

無論用什麼模型組合，建議固定走這個流程：

1. **主模型產出**：依任務分級挑首選模型，Prompt 寫清楚意圖與成功標準。
2. **跨家互審**：用另一家模型跑審核 prompt，輸出 issue list（不要讓它直接改）。
3. **人類最終確認**：人看 diff / 看 issue list 拍板，必要時回到第 1 步。

> 核心心法：把 AI 當「生產系統」設計，而不是「一句話拿結果」。模型會升級、會被取代，但 SOP 不會。

---

## 八、常見反模式

- ❌ **唯旗艦論**：所有任務都丟 Opus / GPT-5 Pro，成本爆炸且未必更準。
- ❌ **同家互審**：Claude 產出再叫另一個 Claude 審——共享盲點。
- ❌ **把模型當人**：期待它自己知道你沒說的偏好。
- ❌ **不測就 commit**：旗艦模型自評偏樂觀，沒測試守門遲早出事。
- ❌ **Prompt 越寫越長**：堆砌規則不等於講清楚意圖，反而稀釋重點。
- ❌ **跨模型直接交棒**：A 模型輸出的中間 reasoning 對 B 模型不一定可解析，要明確定義 handoff 格式（JSON / 結構化欄位）。

---

## 九、模型挑選決策樹（2026-05 快速版）

```
任務是什麼？
├─ 即時對話 / 分類 / 路由
│   └─ Haiku 4.5 / Gemini 2.5 Flash / Flash-Lite / GPT-5.4 nano / GPT-5 nano
├─ 日常編碼 / 文件 / 結構化抽取
│   ├─ 可驗證 → Sonnet 4.6 或 GPT-5.4 獨跑
│   └─ 難驗證 → Sonnet 4.6 產出 + GPT-5.4 / GPT-5.5 審（跨家）
├─ 跨檔案重構 / Repo 級 Agent
│   ├─ 有測試守門 → Opus 4.7 獨跑
│   └─ 無測試守門 → Opus 4.7 + GPT-5.5 pro 互審 + 人類確認
├─ 研究級推理 / 數學競賽 / 抽象推理
│   └─ GPT-5.5 pro / Opus 4.7 Extended Thinking / Gemini 3.1 Pro Deep Think
├─ 即時網頁搜尋整合
│   └─ Gemini 3.1 Pro（Search Grounding）或 GPT-5.5（web tool）→ Claude 整理
├─ 多模態（影像 / 影片 / 圖表）
│   └─ Gemini 3.1 Pro（長上下文 + 原生影片）/ GPT-5.5
├─ 中文 / 中國雲場景
│   └─ Qwen3-Max / Qwen3.6-Plus / DeepSeek V3.2
└─ 個資 / 敏感資料 / 內網
    └─ Self-host：Qwen3 open / Llama 4 Maverick / DeepSeek V3.2 權重版 / gpt-oss-120b
       （必要時微調）
```

---

## 附錄：Opus 4.7 案例研究（原始筆記）

來源：[Opus 4.7 不是更強的 4.6，是另一種模型](https://www.youtube.com/watch?v=WOMdoiy9Qas&t=547s)（Monica 整理）

1. **行為模式轉變**：Opus 4.7 並非變笨，而是更遵循字面指令，不再自動腦補。對專業開發者有利，但提高了日常使用門檻。
2. **效能數據提升**：多步驟任務 +14%、生產力任務 ×3 效率。
3. **寫作與編碼更乾澀**：不再自動添加轉場或清理無關代碼，使用者必須更精確描述意圖。
4. **成本顯著增加**：新 Tokenizer 同 Prompt 多耗 30–47% token，Adaptive Thinking 也燒更多 output。
5. **自我審查過於樂觀**：容易產生「做完了」假象，自評弱、會幻覺。
6. **優化 Prompt 的核心**：寫清楚「意圖」（目的、受眾、成功標準、應避開錯誤），而非寫長。
7. **跨模型互審**：Claude 產出 → GPT 審核，彌補單一模型盲點。
8. **模型分工**：深度編碼與知識整合給 4.7；網頁搜索、終端指令給 GPT / Gemini。
9. **流程化審查 SOP**：主模型產出 → 跨模型互審 → 人類最終確認。
10. **結論**：不要盲目追求單一最強模型，而應設計能隨模型升級調整的 Workflow，從「丟一句話拿結果」轉向「指引方向的工作夥伴」。

