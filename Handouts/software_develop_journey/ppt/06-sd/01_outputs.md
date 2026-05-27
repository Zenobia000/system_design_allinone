---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.6 · SD Outputs'
footer: '軟體開發旅程 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 06 · TOPIC 01</div>

# SD 經典產出
## *讓 Dev 看完不用問問題*


---


## OUTPUTS · 真產出 vs 假產出

<span class="kicker">SECTION 1 · INSIGHT</span>

# 文件是給 Dev 看的，不是給老闆

<br>

<div class="highlight">

很多 SD 寫的「設計文件」滿是業務術語、沒有 endpoint、沒有欄位、沒有錯誤碼。

**Dev 看完還是要問三遍。**

好的 SD 產出有一個**唯一指標**：
Dev 拿到文件，**從頭到尾不用再問你問題就能寫完**。

</div>

<br>

<span class="muted">**核心金句**：API 命名是 SD 的靈魂——一致、可預測、不會誤導。</span>

> Source: _source/braindump.md · §SD vs Architect


---


<!-- _class: compact -->

## OUTPUTS · 5 個經典產出

| 產出 | 一句話用途 | 看起來像什麼 |
|---|---|---|
| **Module Design** | 服務內模組怎麼切 | 模組圖 + 責任清單 |
| **API Spec** | 對外契約 | OpenAPI / Swagger YAML |
| **Sequence Diagram** | 一次互動的時間軸 | mermaid / PlantUML |
| **Component Design** | 元件責任與依賴 | 元件圖 + interface 表 |
| **Class Diagram** | 物件結構 | UML class diagram |

> Source: _source/braindump.md · §SD 經典產出


---


## OUTPUTS · OpenAPI 長什麼樣

```
POST /api/v1/auth/login
Request:
{
  "email": "user@example.com",
  "password": "********"
}
Response 200:
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600
}
Response 401: { "error": "INVALID_CREDENTIALS" }
Response 423: { "error": "ACCOUNT_LOCKED" }
```

<span class="muted">注意 SD 不只寫**成功路徑**，還要寫**錯誤碼與例外**——這是新手 SD 最容易漏的。</span>

> Source: _source/braindump.md · §SD 經典產出


---


<!-- _class: cover -->

<div style="text-align:center;">

![h:520](../assets/diagrams/06-sd/01_api_naming.png)

</div>


---


## OUTPUTS · 為何 AI 取代不了

<div class="highlight">

**AI 寫得出 OpenAPI YAML，但決定不了**：

- 這個 API 該叫 `/orders` 還是 `/order/create`？
- 下單失敗是 400 還是 422？要不要區分 sub-code？
- 三個月後要加退款，現在的 schema 撐得住嗎？

</div>

<br>

- **邊界設計**：哪些欄位該放、哪些該拆——錯一次就回不去
- **API 一致性**：整個 service 100 支 API 命名風格要一樣
- **未來擴充**：今天圖快加欄位，明天就是 breaking change
- **降低 Dev 認知負擔**：好的設計 Dev 看一眼就懂

<br>

<span class="muted">AI 幫你**填模板**，但不幫你**設計契約**。</span>

> Source: _source/braindump.md · §AI 時代的本質沒變


---


<!-- _class: end -->

# Outputs 完
## *產出講完，看 SD 跟誰打交道。*

<br>

<span class="lead">→ 6.2 SD 邊界</span>
