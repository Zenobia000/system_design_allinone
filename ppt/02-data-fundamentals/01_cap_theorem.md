---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · CAP'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 01</div>

# CAP Theorem
## *分區是現實，C 與 A 才是你能選的*

---

## CAP · WHY

# 為何分散式系統必須選邊？

<br>

<div class="highlight">

**P（網路分區）不是選項，是現實。**  
路由器壞、機房斷電、跨洲光纖被切——P 隨時在發生。  
你能選的只有：**分區發生時，要保 C 還是保 A？**

</div>

<br>

- **CP**（保一致性）：分區時拒絕寫入，回傳 503
- **AP**（保可用性）：分區時繼續寫，事後 reconcile
- 「CA」**根本不存在**——只在從不分區的單機系統成立

> Source: 基本觀念/03 CAP Theorem.pdf · §1-2

---

## CAP · 真實案例：ATM 提款機

# 同一個案例兩種選擇，結果完全不同

<div class="tradeoff">
  <div class="pro">
    <h3>選 CP（C+P · 放棄 A）</h3>
    <ul>
      <li>台北提款 1000 元 → 中央 DB 立即更新</li>
      <li>台中 ATM 也立刻看到餘額為 0</li>
      <li><em>網路斷線時：台中 ATM 拒絕服務</em></li>
      <li>結果：使用者體驗差，但帳目永遠正確</li>
    </ul>
  </div>
  <div class="con">
    <h3>選 AP（A+P · 放棄 C）</h3>
    <ul>
      <li>網路斷線時，台中仍允許提款</li>
      <li>使用者體驗好（永遠能提款）</li>
      <li><em>代價：兩邊各領 1000 → 超支</em></li>
      <li>結果：銀行虧錢，帳目事後對不上</li>
    </ul>
  </div>
</div>

<span class="muted">**CAP 不是抽象理論**——同一個 ATM 系統選 CP 還是 AP，業務後果天差地遠。</span>

> Source: 基本觀念/03 CAP Theorem.pdf · §ATM Real-World Example

---

## CAP · HOW

# PACELC：CAP 的真實補充

| 條件 | 選擇 | 範例系統 |
|------|------|---------|
| **P**artition 發生 | 選 **C**onsistency | HBase · Spanner · etcd · ZooKeeper |
| **P**artition 發生 | 選 **A**vailability | Cassandra · DynamoDB · Riak |
| **E**lse（正常時） | 選 **L**atency | DynamoDB · Cassandra |
| **E**lse（正常時） | 選 **C**onsistency | Spanner · MongoDB（majority） |

<br>

<div class="highlight">

**PACELC** 比 CAP 多回答了「**沒分區時你還在取捨什麼**」——多數時間網路是好的，這時候你選了 latency 還是 consistency？

</div>

> Source: 基本觀念/03 CAP Theorem.pdf · §3 PACELC

---

## CAP · 具體系統參數

# 知名分散式資料庫的 CAP 定位

<div class="matrix-2x2">
  <div class="featured">
    <strong>Cassandra（AP/EL）</strong>
    quorum 可調 · 預設最終一致<br>
    寫入 latency 1-2ms · 多 DC 部署
  </div>
  <div>
    <strong>DynamoDB（AP/EL）</strong>
    eventually consistent read 預設<br>
    可選 strongly consistent read（多 1 跳）
  </div>
  <div>
    <strong>Spanner（CP/EC）</strong>
    TrueTime · 全球強一致<br>
    寫入 latency 5-10ms（需 paxos quorum）
  </div>
  <div>
    <strong>etcd / ZooKeeper（CP）</strong>
    Raft / ZAB 共識<br>
    分區時少數派直接拒絕請求
  </div>
</div>

<span class="muted">**選型口訣**：要全球低延遲讀寫選 AP；要強一致小規模 metadata 選 CP。</span>

> Source: 基本觀念/03 CAP Theorem.pdf · §4 + 公開技術文件

---

## CAP · TRADE-OFF

# CP vs AP 的選邊清單

<div class="tradeoff">
  <div class="pro">
    <h3>選 CP（一致性優先）</h3>
    <ul>
      <li>金流、訂單、庫存</li>
      <li>身分認證、權限</li>
      <li>分散式鎖、Leader 選舉</li>
      <li>有限資源預訂（機票、飯店）</li>
      <li><em>容忍：分區時短暫不可用</em></li>
    </ul>
  </div>
  <div class="con">
    <h3>選 AP（可用性優先）</h3>
    <ul>
      <li>社群動態、按讚、留言</li>
      <li>瀏覽紀錄、推薦清單</li>
      <li>IoT 感測器寫入</li>
      <li>頭像、個資快取</li>
      <li><em>容忍：暫時讀到舊資料</em></li>
    </ul>
  </div>
</div>

<div class="alert">

**反模式**：用 Cassandra（AP）存銀行帳戶餘額。最終一致 ≠ 永遠正確，雙花就是這樣發生的。

</div>

> Source: 基本觀念/03 CAP Theorem.pdf · §4 Use Cases

---

## CAP · 面試金句

# 系統設計面試的預設選擇

<div class="highlight">

**面試預設選 A（Availability）**——除非系統「無法容忍過期資料」。

只有以下三類強迫你選 C：
- **庫存管理**：超賣導致退款、客訴
- **有限資源預訂**：飯店房間、機票、活動門票
- **金融帳戶**：餘額必須精確，雙花 = 詐欺

</div>

<br>

<span class="muted">關鍵特徵：**任何不一致，即使是暫時的，都可能造成重大商業或技術問題**。</span>

> Source: 基本觀念/03 CAP Theorem.pdf · §Interview Default

---

<!-- _class: end -->

# CAP 完
## *分區永遠在，下一站看 Index 怎麼把查詢從 O(N) 拉回 O(log N)。*
