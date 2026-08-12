# 最小可行文件包(Minimal Viable Docs Kit)

這一包是《程式碼變便宜之後》與 `deep-research-report.md` 的落地版:
把企業級的 13 種角色、12 項交付物、11 個階段,壓縮成 AI 協作時代
**無法再省略的最小集合**。判準只有一條——凡是治「模型的病」
(失憶、漂移、幻覺介面、恆真測試、悄悄擴大範圍)的留下,
凡是只治「人多的病」的拿掉。

命名與結構完全沿用本專案的卡片標準
(`product_to_launch/content/deliverables/` 的 slug + `demo/` 的六階段編排),
所以這一包就是 58 張卡裡的**最小子集**,可直接被 `card-fill` skill 認得。

## 這包裡有什麼

```
minimal-docs-kit/
├── README.md                        ← 本檔:三頂帽子 + 使用方式
├── CLAUDE.md                        ← 四份文件的注入口(給 AI 的常駐 context)
├── 02-define/
│   ├── prd.md                       ← 文件 1:意圖(問題、範圍、成功標準)
│   └── acceptance-criteria.md       ← 文件 4:可執行驗收(exit criteria)
├── 03-design/
│   ├── adr.md                       ← 文件 2:決策日誌
│   ├── api-spec.yaml                ← 文件 3a:API 契約
│   └── data-model.md                ← 文件 3b:資料契約
└── 05-ship/
    └── go-no-go-checklist.md        ← 五節點檢核表(澄清→決策→凍結→驗證→退路)
```

## 卡片 ↔ 四份文件 ↔ 治什麼病

| 卡片 slug | 析論中的角色 | 治的病 |
|---|---|---|
| `prd` | 文件 1:意圖(持久化的 prompt) | AI 悄悄擴大範圍;每輪重新猜你要什麼 |
| `adr` | 文件 2:決策日誌 | AI 失憶與漂移;被否決的方案捲土重來 |
| `api-spec` | 文件 3a:介面契約 | 幻覺介面;多端 / 多 agent 並行漂移 |
| `data-model` | 文件 3b:資料契約 | migration 不可回滾;資料形狀漂移 |
| `acceptance-criteria` | 文件 4:可執行驗收 | 恆真測試;「看起來很完成」的氣氛決策 |
| `go-no-go-checklist` | 五節點的簽核紀錄 | 節點被跳過而沒人知道 |

階段 01-discovery、04-build、06-operate 在最小集合裡沒有必備卡——
不是不重要,是它們的產物(探索筆記、程式碼、維運紀錄)天然存在,
不需要模板強制。專案長大後,從 58 張卡裡按需加回。

## 三頂帽子(先戴好再開工)

文件有模板,帽子沒有——它們是責任,不是檔案。開工前指定人選,
solo 開發就是你自己全戴,但每頂都要「有意識地」戴上:

| 帽子 | 負責什麼 | 對應卡片 | 鐵律 |
|---|---|---|---|
| 意圖負責人 | 解什麼問題、**不解什麼** | `prd` | 範圍變更只能由此人裁決,AI 順手多做一律砍掉 |
| 決策負責人 | 技術方向、取捨、邊界 | `adr`、`api-spec`、`data-model` | 決策不寫下來 = 沒有決策,下次生成會被推翻 |
| 驗證負責人 | 判定「做完了沒有」 | `acceptance-criteria`、`go-no-go-checklist` | 寫的人(包括 AI)不能同時是驗收的人 |

## 使用方式(五個節點)

1. **澄清**——動手前先填 `02-define/prd.md`。十分鐘也好,省掉它的代價是 AI 用十小時去猜。
2. **決策**——大規模生成前,把方向寫進 `03-design/adr.md` 一則。
3. **凍結**——並行實作(多人或多 agent)前,把 `03-design/` 的兩份契約定稿。
4. **驗證**——宣稱完成前,對照 `02-define/acceptance-criteria.md` 拿證據。
5. **退路**——上線走一遍 `05-ship/go-no-go-checklist.md` 的節點五。

節點之間怎麼並行、怎麼探索、怎麼 vibe 都隨意;節點本身不容跳過。
文件輕重隨專案調,**有無不容商量**。

## 快速開始

```bash
cp -r minimal-docs-kit/ ../my-new-project/docs-kit/
# 1. 填 02-define/prd.md 的前三節
# 2. 把 CLAUDE.md 放到專案根目錄(或合併進既有的)
# 3. 開始 vibe——但每次重大決策回來補一行 adr.md
```
