---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · DBA Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 02</div>

# DBA 邊界
## *資料歸屬 vs 資料怎麼存*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# DBA 上下游關係

```
       Architect（決定資料歸屬）
              │
              ▼
        ┌──────────┐
        │   DBA    │ ← 你在這
        └──────────┘
              │
        ┌─────┼─────┬──────┐
        ▼     ▼     ▼      ▼
       SD    Dev   QA    DevOps
```

<span class="muted">**DBA 上游**：Architect 告訴 DBA「哪些服務該擁有哪些資料」。**下游**：所有要碰 DB 的人。</span>

> Source: _source/braindump.md · §責任鏈


---


<!-- _class: compact -->

## BOUNDARY · 容易搞混的角色

| 角色 | 跟 DBA 差在哪 |
|---|---|
| **Architect** | 決定「資料歸屬哪個服務」、邊界在哪；DBA 不碰服務切分 |
| **Data Engineer** | 偏 ETL / Pipeline / Data Warehouse；DBA 偏 OLTP 線上庫 |
| **Data Architect** | 偏資料模型策略、跨系統一致性；小公司常與 DBA 合併 |
| **Dev** | Dev 寫 query、設計小表；DBA 確保 query 跑得動、表撐得住 |
| **DevOps** | DevOps 管 DB 的 infra（VM / K8s / 備份排程）；DBA 管 DB 本身 |

<br>

<span class="muted">**核心**：小公司一個 DBA 包山包海；大公司 OLTP DBA / Data Engineer / Data Architect 完全分開。</span>

> Source: _source/braindump.md · §DBA · 資料生命線


---


## BOUNDARY · 誰主導什麼

# 決策樹

<div class="tradeoff">
  <div class="pro">
    <h3>DBA 主導</h3>
    <ul>
      <li>Schema / 欄位型別</li>
      <li>Index 策略（哪些、順序）</li>
      <li>Partition / Sharding</li>
      <li>備份 / 還原 / DR</li>
      <li>慢查詢調校</li>
    </ul>
  </div>
  <div class="con">
    <h3>DBA 不主導（但要參與）</h3>
    <ul>
      <li>資料歸屬哪個服務（Architect）</li>
      <li>API 設計（SD）</li>
      <li>業務規則細節（SA）</li>
      <li>應用層 cache（Dev / Architect）</li>
      <li>DB 主機部署（DevOps）</li>
    </ul>
  </div>
</div>

<span class="muted">**陷阱**：DBA 越界決定「該不該拆服務」會踩到 Architect；Dev 越界決定 index 順序會踩到 DBA。</span>

> Source: _source/braindump.md · §SA vs Architect


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：Dev 寫了個查詢上線後變慢，從 50ms 飆到 3 秒。

</div>

**新手作法**：把 query 改一改、加個 index 就推上去。
→ 沒看 **execution plan**、沒測**寫入影響**、沒問**這個 query 多常跑**。

**成熟 DBA 作法**：
- 看 execution plan：是 table scan 還是用錯 index？
- 看 query 頻率：一天跑 10 次還是 10 萬次？
- 看現有 index：能不能加欄位變成**覆蓋索引**？
- 看寫入成本：新增 index 會讓 INSERT 慢多少？
- 給 Dev 兩個方案：「**改 query 不動 schema**」vs「**加複合索引但寫入 -3%**」

<br>

<span class="muted">**這就是 DBA 的價值**：不是改一改 SQL，是**用數據說話**做取捨。</span>

> Source: _source/braindump.md · §DBA 介入時機


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 7.99 Recap</span>
