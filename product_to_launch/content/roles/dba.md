---
title: "資料庫管理"
title_en: "Database Admin"
slug: "dba"
num: "09"
hook: "讓資料真出事還回得來"
uncertainty: "資料正確性、效能、可靠性"
hires_for: "把 Schema、Index、Transaction、Backup、Governance 五件事連在一起設計"
fired_when: "寫完 CREATE TABLE 就收工，沒人想過備份怎麼還原、index 怎麼長、退款怎麼不重複扣"
ai_leverage: "把 data model + 查詢樣式 → Claude 生 index 建議、Saga/Outbox 草稿、PITR 備份計畫"
ai_can: "index 建議、Saga / Outbox 草稿、PITR 備份計畫、EXPLAIN 解讀"
ai_cannot: "「真出事能不能救回來」的判斷"
human_decides: "RPO / RTO 要賠多少？哪些一致性不能讓步？分片鍵選錯，未來 5 年都在 reshard。"
art: "/generated/role-hero-dba.webp"
source: "deep-research-report.md §DBA"
---

## 這個角色做什麼

**DBA 是資料的生命線。** 不是寫 `CREATE TABLE` 完就結束，而是把 **Schema + Index + Transaction + Backup + Governance** 這五件事連在一起設計。系統真的出事時，「資料還回得來」才是 DBA 的命脈。

**DBA vs Architect 一句話**：Architect 決定資料歸屬哪個服務、跨服務一致性策略；DBA 決定那份資料**怎麼存、怎麼查得快、怎麼救得回**。Dev 越界決定 index 順序會踩到 DBA；DBA 越界決定「該不該拆服務」會踩到 Architect。

## 主要產出

- **ERD / Data Model** — 資料實體關聯、欄位、型別、約束
- **Schema + Index** — DDL、索引策略、partition
- **Transaction 策略** — Saga / Outbox / 鎖表規則，避免重複扣款與孤兒資料
- **Backup Plan** — RPO / RTO / PITR，真出事時的還原劇本
- **Data Governance** — retention、稽核、ACL、合規（GDPR）

## 跟誰對接

- **上游接：** Architect 的資料歸屬與一致性策略、SD 的資料存取樣式（讀寫比例、query plan 預估）
- **下游交：** Schema / index / transaction 規則給 Dev、QA、DevOps —— 所有要碰 DB 的人
- **常衝突：** 跟 Dev（憑直覺加 index vs 用數據說話）、跟 Architect（資料邊界）

## AI 時代怎麼還能活著

**AI 能讀 query 建議 index，補不齊「真出事能不能救回來」的判斷。** RPO/RTO 要賠多少、哪些資料一致性不能讓步、合規 retention 多久，這些是跟業務與法遵談出來的，不是模型算得出來的。

加速範例：`根據這份 data model 與這組查詢樣式，建議 index 策略、標出會 full table scan 的查詢、給一份 PITR 備份計畫草稿`。

## 何時該招這個角色

**資料量開始上千萬列、有金流 / 庫存等不可重複副作用、進入合規領域、或半夜一通「DB 撐不住」** 時，沒 DBA 會在第一次資料事故時發現「備份其實還原不了」。
