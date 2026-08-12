# Data Model — 資料契約

> 卡片:`data-model` · 文件 3b/4:資料的形狀。integration test 前 Freeze;
> Freeze 不是不再改,是「所有變更都走 migration,且 migration 可回滾」。
> 填寫人:決策負責人(或兼任 DBA 帽子的人)。

## 實體與關聯(ERD 摘要)

<!-- 小專案用文字就夠;需要圖再補 -->

```
<entity_a> 1 ─── * <entity_b>
```

## 資料表

### <table_name>

| 欄位 | 型別 | 約束 | 說明 | PII? |
|---|---|---|---|---|
| id | uuid | PK | | |
| name | varchar(100) | NOT NULL | | |
| created_at | timestamptz | NOT NULL, default now() | | |

## Migration 規則

- 所有 schema 變更寫成 migration 檔,和程式碼一起進版控。
- 每個 migration 要能回答:怎麼上(up)、怎麼退(down)、既有資料怎麼辦(backfill)。
- AI 產生的 migration 一律人工看過再跑——它會很有信心地刪錯欄位。

## 資料生命週期

- 保留期限(retention):
- 敏感欄位(PII)與遮罩策略:
- 備份 / 還原驗證方式:

---
狀態:Draft | **Frozen(<日期>)**
變更規則:Frozen 後改 schema,需附 migration + 回滾演練紀錄。
