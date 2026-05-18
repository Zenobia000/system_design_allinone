---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.11 · Conflict Cases'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 11 · TOPIC 04</div>

# 三場真實衝突
## *打架不是壞事·誰打贏才重要*


---


## CONFLICT · WHY

<span class="kicker">SECTION 1 · WHY</span>

# 為什麼角色會打架？

<br>

<div class="highlight">

**因為每個角色降低不同的不確定性**——他們的優先級**本來就會衝突**。

- PM 想要快 vs Architect 想要穩
- Dev 想要彈性 vs QA 想要可預測
- DBA 想要正確 vs Dev 想要快速

**這是健康的衝突**——不衝突反而代表有人沒做好自己的事。

</div>

<span class="muted">小白以為「打架 = 團隊不和」。其實**打架 = 各角色守住各自的責任**。</span>

> Source: _source/braindump.md · §角色 = 消除不確定性


---


## CONFLICT 1 · PM vs Architect

# 場景：「下週上線新 feature」

<div class="tradeoff">
  <div class="pro">
    <h3>PM 立場</h3>
    <ul>
      <li>業務承諾客戶下週</li>
      <li>KPI 季度結算要看</li>
      <li>「先上再說，後面再優化」</li>
      <li>「為什麼不能快一點？」</li>
    </ul>
  </div>
  <div class="con">
    <h3>Architect 立場</h3>
    <ul>
      <li>沒做容量規劃</li>
      <li>跟既有服務耦合太深</li>
      <li>「上線會炸」</li>
      <li>「下週可以，但要砍 30% 功能」</li>
    </ul>
  </div>
</div>

<br>

<span class="muted">**怎麼解**：Architect 不是說 NO，是說「Y 但要砍 X」——把選擇權還給 PM。</span>

> Source: _source/braindump.md · §架構師視角


---


## CONFLICT 2 · Dev vs QA

# 場景：「這不是 bug，是 feature」

<div class="alert">

Dev 說：「使用者輸入空字串時系統 crash？這不算 bug，誰會輸入空字串？」

</div>

<div class="alert">

QA 說：「我輸入空字串你就 crash 啊？這是 P1 bug。」

</div>

<br>

**問題本質**：bug 嚴重度的定義不一致。

**怎麼解**：
1. 寫 **Definition of Done**（DoD）——上線前對齊「什麼算 bug」
2. **找 PM 拍板**——bug 嚴重度本質是商業判斷
3. 寫 **Test Plan**——把預期行為先寫在前面，QA 才能驗

<br>

<span class="muted">**核心**：bug 嚴重度不是技術問題，是**期望管理**問題。</span>

> Source: _source/braindump.md · §QA 視角


---


## CONFLICT 3 · DBA vs Dev

# 場景：「我要加個欄位上線」

<div class="alert">

Dev 說：「table 加個 `last_login_at` 欄位，上線一下就好」

</div>

<div class="alert">

DBA 說：「這個 table 1 億筆，加欄位 + 預設值 = 鎖表 30 分鐘」

</div>

<br>

**問題本質**：Dev 不知道 schema 變更的成本。

**怎麼解**：
1. **Migration Review**：所有 schema 變更走 review
2. **線上 schema 變更工具**：pt-online-schema-change / gh-ost（不鎖表）
3. **分階段上線**：先 nullable → 後 backfill → 後 NOT NULL

<br>

<span class="muted">**核心**：DBA 不是擋路的，是讓 Dev 的好意不會變災難的人。</span>

> Source: _source/braindump.md · §DBA · 資料生命線


---


<!-- _class: end -->

# Conflict Cases 完
## *打架解完，收成口訣。*

<br>

<span class="lead">→ 11.99 Recap</span>
