---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'A.4 · Application Type Decision Tree'
footer: 'AI 時代系統設計速成 '
---

## A.4 · 應用類型決策樹

<span class="kicker">30 秒判斷</span>

# 你的系統屬於哪一類？對應不同模式包

<!-- _class: compact -->

```
                     讀寫比？
                  /        \
              >> 1         ~ 1:1
          (讀多寫少)      (對等)
            /    \           |
        強一致?  弱一致?      |
           |      |           |
        OLTP   CMS/      事務?
         |     新聞      /    \
        +cache       強事務  弱事務
                       |       \
                    OLTP     批次/分析
                              /     \
                           OLAP   訊息流
                                    \
                                    Streaming
```

| 類型 | 代表模式 | 範例 |
|---|---|---|
| OLTP | RDBMS + cache + 讀寫分離 | 訂單、帳號 |
| OLAP | 列存資料倉 + ETL | BI、報表 |
| Streaming | Kafka + Flink | 風控、IoT |
| 即時互動 | WebSocket + pub/sub | 聊天、直播 |
| AI 應用 | Vector DB + LLM + cache | RAG、推薦 |

> Source: software_architect/ppt/_source/03_Process_App_Types.md · §App Types
