---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.2 · Implicit Requirements'
footer: '架構師的藍圖 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 02 · TOPIC 01</div>

# Implicit Requirements
## *挖出客戶沒講出口的需求*


---


## WHY · 為何隱性需求最致命？

<br>

<div class="highlight">

**功能需求**寫在 PRD 裡。
**非功能需求**寫在「客訴信、半夜 PagerDuty、退費單」裡。

需求調研時不挖出來——上線後血流成河。

</div>

<br>

- 客戶不會主動講「我需要 99.99% 可用性」
- 客戶會講「系統有時候很慢」、「上次活動掛了」
- **架構師的職責**：把模糊抱怨翻譯成可驗證數字

> Source: `S3_Slides.pdf` · §需求調研常見坑


---


## HOW · 量化六問

| 模糊形容詞 | 逼問的問題 | 期望輸出 |
|-----------|-----------|---------|
| 「要很快」 | P50? P99? 同步還是異步？ | P99 < 200ms |
| 「要穩定」 | 一年容忍幾分鐘停機？ | 99.95% (260 min/year) |
| 「會有很多人用」 | DAU? 尖峰 QPS? 成長率？ | 100k DAU · 5k QPS peak |
| 「資料很多」 | 每日新增? 保留多久？ | 1GB/day · 5 年保留 |
| 「要支援全球」 | 哪些地區? 是否合規？ | NA/EU/APAC · GDPR |
| 「未來會擴展」 | 6 個月後規模? 上限？ | 10× 增長 · 1M DAU 上限 |

<span class="muted">**口訣**：拒絕形容詞，要求數字 + 單位 + 時間範圍。</span>

> Source: `S5_Slides.pdf` · §NFR Quantification


---


## HOW · NFR 矩陣範本

# 給 Day 1 用的需求表

```
| NFR 類別      | 量化指標           | 驗收方式             |
|--------------|-------------------|---------------------|
| Latency       | P99 < 200ms       | k6 load test        |
| Availability  | 99.95% / 月       | uptime monitor      |
| Throughput    | 5000 QPS peak     | stress test         |
| Data Scale    | 1B records · 3TB  | capacity planning   |
| Security      | OWASP top 10      | annual pen test     |
| Compliance    | GDPR · SOC2       | quarterly audit     |
```

<br>

<div class="highlight">

把這張表貼進專案 README——**架構決策的單一真實來源**。

</div>

> Source: `_source/02_Requirements_SLA.md` · §NFR Matrix


---


## TRADE-OFF · 過度量化 vs 含糊不清

<div class="tradeoff">
  <div class="pro">
    <h3>量化的好處</h3>
    <ul>
      <li>選型有依據</li>
      <li>測試可驗證</li>
      <li>SLA 可承諾</li>
      <li>成本可預估</li>
      <li>避免無止境優化</li>
    </ul>
  </div>
  <div class="con">
    <h3>過度量化的代價</h3>
    <ul>
      <li>P99.9 / P99.99 砸錢沒人感謝</li>
      <li>過早決定 = 後期難改</li>
      <li>MVP 階段不必精確</li>
      <li>數字錯比沒有更糟</li>
      <li>分析癱瘓延誤上線</li>
    </ul>
  </div>
</div>

<div class="alert">

**經驗法則**：MVP 階段量化「會殺死你」的 3 個指標（latency / availability / scale）就夠。其他留到 v1 之後。

</div>

> Source: `S5_Slides.pdf` · §NFR 取捨


---


<!-- _class: end -->

# Implicit Requirements 完
## *知道要問什麼了，下一站算數學。*

<br>

<span class="lead">→ 2.2 SLA Math</span>
