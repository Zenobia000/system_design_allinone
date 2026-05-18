---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.5 · Architect Outputs'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 05 · TOPIC 01</div>

# Architect 經典產出
## *NFR 才是真正的產品*


---


## OUTPUTS · 真產出 vs 假產出

<span class="kicker">SECTION 1 · INSIGHT</span>

# 架構圖不是架構師的產品

<br>

<div class="highlight">

新手以為架構師的產出 = 一張漂亮的架構圖。

**錯。** 架構圖只是**溝通工具**。

架構師真正在交付的是「**NFR（非功能需求）**」——
系統能不能撐流量、會不會掛、好不好改、能不能 debug。

</div>

<br>

<span class="muted">**核心金句**：功能撐不住 = 全部歸零。NFR 才是架構師的命脈。</span>

> Source: _source/braindump.md · §架構師核心工作


---


<!-- _class: compact -->

## OUTPUTS · 5 個經典產出

| 產出 | 一句話用途 | 看起來像什麼 |
|---|---|---|
| **Architecture Diagram** | 系統結構全景 | C4 / 區塊圖 |
| **ADR** | 架構決策紀錄 | Markdown：脈絡 / 選項 / 決策 / 後果 |
| **NFR Spec** | 非功能需求規格 | 表格：SLA / RPS / Latency |
| **Service Boundary** | 服務邊界定義 | 領域圖 + 責任清單 |
| **Integration Pattern** | 串接模式選擇 | 同步 REST / 非同步 Event |

> Source: _source/braindump.md · §架構師核心工作


---


<!-- _class: compact -->

## OUTPUTS · NFR Spec 長什麼樣

| 非功能需求 | 意思 | 範例目標 |
|---|---|---|
| **Scalability** | 能不能撐大量流量 | 尖峰 10k RPS 不掉 |
| **Reliability** | 會不會掛 | MTBF > 30 天 |
| **Security** | 會不會被打 | OWASP Top 10 全過 |
| **Maintainability** | 好不好改 | 新人 2 週上手 |
| **Observability** | 能不能 debug | 全鏈路 trace ≤ 1min 定位 |
| **Availability** | SLA 達不達標 | 99.95% / 月 |

<span class="muted">**重點**：每一條都要寫**可衡量的數字**，不是「希望系統很快」。</span>

> Source: _source/braindump.md · §架構師核心工作


---


## OUTPUTS · 為何 AI 取代不了

<div class="highlight">

**AI 畫得出架構圖，但決定不了**：

- 這業務未來 3 年會長成什麼樣？
- Monolith 還是 Microservices？拆幾個服務？
- 同步 REST 還是非同步 Event？trade-off 哪邊重？

</div>

<br>

- **邊界判斷**：哪些該拆、哪些該留——這是經驗活
- **Trade-off**：每個決策都在賭未來，AI 不負責後果
- **業務翻譯**：把「客戶要即時」翻成 SLA 99.9% / latency p99 200ms
- **政治力**：說服老闆延期 PoC、說服 Dev 換技術棧

<br>

<span class="muted">AI 幫你**寫 ADR**，但不幫你**做決定**。</span>

> Source: _source/braindump.md · §AI 時代的本質沒變


---


<!-- _class: end -->

# Outputs 完
## *產出講完，看架構師跟誰打交道。*

<br>

<span class="lead">→ 5.2 Architect 邊界</span>
