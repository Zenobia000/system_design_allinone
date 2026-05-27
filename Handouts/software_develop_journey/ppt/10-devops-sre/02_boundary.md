---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.10 · DevOps Boundary'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 10 · TOPIC 02</div>

# DevOps / SRE 邊界
## *跟誰共擔可靠性·誰先 on-call*


---


## BOUNDARY · 上下游

<span class="kicker">SECTION 1 · WHO</span>

# DevOps / SRE 上下游關係

```
   Dev（產出 code）        QA（產出測試）
         │                       │
         └──────────┬────────────┘
                    ▼
              ┌──────────┐
              │ DevOps / │ ← 你在這
              │   SRE    │
              └──────────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   生產環境      監控告警      使用者
```

<span class="muted">**DevOps 上游**：Dev + QA 的交付。**下游**：上線後活下來的系統——使用者直接感受到後果。</span>

> Source: _source/braindump.md · §責任鏈


---


## BOUNDARY · DevOps vs SRE 哲學差異

<div class="tradeoff">
  <div class="pro">
    <h3>DevOps（文化）</h3>
    <ul>
      <li>Dev 與 Ops 不分家</li>
      <li>自動化一切手動工</li>
      <li>You build it, you run it</li>
      <li>偏 pipeline / tooling</li>
      <li>各公司定義不一</li>
    </ul>
  </div>
  <div class="con">
    <h3>SRE（Google 命名）</h3>
    <ul>
      <li>用工程方法做運維</li>
      <li>SLO / Error Budget 驅動</li>
      <li>50% 時間做 toil 自動化</li>
      <li>偏 reliability / metrics</li>
      <li>定義較嚴謹（Google 書）</li>
    </ul>
  </div>
</div>

<span class="muted">**實務**：大公司分開（SRE 定 SLO、DevOps 顧 pipeline），中小公司一個人扛全部，**title 不重要、責任才重要**。</span>

> Source: _source/braindump.md · §DevOps / SRE 視角


---


<!-- _class: compact -->

## BOUNDARY · 容易搞混的角色

| 角色 | 跟 DevOps / SRE 差在哪 |
|---|---|
| **Sysadmin** | 偏單台主機管理，不寫 pipeline / IaC |
| **Infra Engineer** | 偏底層網路 / 機房，DevOps 偏應用層 |
| **Platform Engineer** | 蓋內部開發平台給 Dev 用，是 DevOps 的進化 |
| **Dev** | 寫 code，DevOps 確保 code 上線後**活著** |
| **DBA** | 顧資料庫專屬層，DevOps 顧整個 infra |
| **QA** | 確認上線前沒問題，DevOps 確認上線後沒問題 |

<br>

<span class="muted">**核心**：DevOps 跨越所有層——**從 Dev 寫完 commit 那刻到 user 看到頁面那刻，全是責任區**。</span>

> Source: _source/braindump.md · §DevOps / SRE 視角


---


## BOUNDARY · 誰主導什麼

# 決策樹

<div class="tradeoff">
  <div class="pro">
    <h3>DevOps / SRE 主導</h3>
    <ul>
      <li>deploy 策略（blue-green / canary）</li>
      <li>監控告警閾值</li>
      <li>容量規劃</li>
      <li>disaster recovery 演練</li>
      <li>release gate 標準</li>
    </ul>
  </div>
  <div class="con">
    <h3>DevOps 不主導（但要懂）</h3>
    <ul>
      <li>業務功能（PM）</li>
      <li>API 設計（Architect / SD）</li>
      <li>DB schema（DBA）</li>
      <li>測試 case 內容（QA）</li>
      <li>產品優先級（PM）</li>
    </ul>
  </div>
</div>

<span class="muted">**陷阱**：DevOps 不該替 Dev 寫業務 code——**界線是「程式怎麼跑」，不是「程式做什麼」**。</span>

> Source: _source/braindump.md · §DevOps / SRE 視角


---


## BOUNDARY · 實務場景

<div class="alert">

**場景**：凌晨 3:17，PagerDuty 響——「API 5xx 錯誤率超過閾值」。

</div>

**誰先 on-call？**：DevOps / SRE 一定先接——他們看得到全局指標。

**處理流程**：
- 看 dashboard：是 DB 慢、cache miss、還是某 service 掛？
- 翻 **runbook**：這個 alert 對應哪個 SOP？
- 5 分鐘內判斷：能 rollback 嗎？能擴容嗎？要不要拉 Dev？
- 必要時叫醒 Dev：「上次的 deploy 有改 X，幫我 confirm」
- 隔天寫 **Postmortem**：root cause + 補強行動，**怪流程不怪人**

<br>

<span class="muted">**關鍵**：on-call 不是「誰寫的誰修」，是**先止血再究責**——SRE 文化的核心。</span>

> Source: _source/braindump.md · §DevOps / SRE 視角


---


<!-- _class: end -->

# Boundary 完
## *邊界講完，收成口訣。*

<br>

<span class="lead">→ 10.99 Recap</span>
