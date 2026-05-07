---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'Ch.7 · Large Blobs'
footer: '系統設計實戰 · v1.0'
---

<!-- _class: chapter -->

<div class="ch-no">CHAPTER · 07 · TOPIC 03</div>

# Handling Large Blobs
## *讓 bytes 繞過你的伺服器 — 你只當售票員*

---

## LARGE BLOBS · WHY

# 為何不能讓檔案流過你的 server？

<br>

<div class="highlight">

**反模式**：2GB 影片走 client → API → S3。  
你的 application server 變成毫無價值的管道，**只增加延遲、頻寬成本和瓶頸**。

</div>

<br>

- 雲廠商本就有全球基礎設施、斷點續傳能力、巨大的頻寬
- **解法**：從「透過伺服器上傳」切換到「**客戶端直傳 Blob Storage**」
- 你的 server 角色從「資料傳輸者」變成「**存取控制者**」——驗證、簽證、退場

<span class="muted">**判斷門檻**：> 10MB 就應該想到這個模式；< 10MB 走一般 API 就好。</span>

> Source: 設計模式/04 Handling Large Blobs.pdf · §問題在哪裡

---

## LARGE BLOBS · Presigned URL

# 簡單直傳（< 100MB）

<div class="def">
<span class="term">Presigned URL</span>
你的 server 用雲端憑證**本地簽一個帶時限的 URL**（通常 15 分鐘到 1 小時），客戶端拿著它直接 PUT 檔案到 S3。**不需要呼叫 storage 的 API**，純本地簽名計算。
</div>

```
?X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Expires=900            ← 15 min
&X-Amz-SignedHeaders=host
&X-Amz-Signature=...
```

<div class="alert">

**永遠加上限制條件**：  
`content-length-range`（防止 5MB 端點被傳 500MB） · `content-type`（限定圖片）

</div>

> Source: 設計模式/04 Handling Large Blobs.pdf · §簡單直傳上傳

---

## LARGE BLOBS · Multipart Upload

# 大檔案分塊（> 100MB）

```
[Client]                          [Storage]
    │ initiate multipart ──────────→│  ← upload_id
    │ PUT chunk 1 (5MB) ───────────→│  ← etag_1
    │ PUT chunk 2 (5MB) ───────────→│  ← etag_2
    │      ...（並行 / 斷線可重傳單塊）
    │ PUT chunk N ─────────────────→│  ← etag_N
    │ complete (etag list) ────────→│  ← 組裝成單一物件
```

<div class="highlight">

**S3 Multipart**：分塊 ≥ 5MB · 每塊有獨立 presigned URL · 5GB / 塊上限  
**斷點續傳**：失敗時 client 查 ListParts → 從失敗那塊繼續，不從頭來

</div>

<span class="muted">**注意**：未完成的 multipart 是要錢的。**設 lifecycle rule 24-48h 自動清理**。</span>

> Source: 設計模式/04 Handling Large Blobs.pdf · §斷點續傳

---

## LARGE BLOBS · 雲廠商對照

# AWS / GCP / Azure 術語

| 功能 | AWS | GCP | Azure |
|------|-----|-----|-------|
| 臨時上傳 URL | Presigned URL | Signed URL | SAS Token |
| 分塊上傳 | Multipart（5MB-5GB） | Resumable Upload（彈性） | Block Blob（4MB-100MB） |
| 事件通知 | S3 Event → SNS/SQS/Lambda | Cloud Storage Pub/Sub | Event Grid |
| CDN 簽名 | CloudFront signed URL/cookie | Cloud CDN signed URL | Azure CDN SAS |
| 清理政策 | Lifecycle Rules | Lifecycle Management | Lifecycle Policies |

<br>

<span class="muted">**面試重點**：知道有對應就行，**不需背 SDK 函數名**。</span>

> Source: 設計模式/04 Handling Large Blobs.pdf · §各雲端供應商的術語對照

---

## LARGE BLOBS · 狀態同步

# 直傳的隱性陷阱：metadata 不一致

<div class="alert">

**信任客戶端的問題**：上傳完客戶端說「OK」你才更新 DB？  
→ Race condition · 孤兒檔案 · 惡意客戶端謊報 · 通知丟失

</div>

<br>

<div class="highlight">

**正解 = Storage Event + Reconciliation**：  
① S3 上傳完成自動發 event（SNS/SQS/Lambda）→ 你用 storage_key 找對應 DB row 更新  
② 加一個 **reconciliation worker**——定期掃 status='pending' 的記錄跟 storage 比對

</div>

> Source: 設計模式/04 Handling Large Blobs.pdf · §狀態同步的挑戰

---

## LARGE BLOBS · 防濫用 & 下載

# Quarantine Bucket + Range Request

<div class="def">
<span class="term">Quarantine Bucket（隔離區）</span>
上傳先進隔離 bucket → 病毒掃描、內容驗證、檔案類型檢查 → 通過才搬到正式 bucket 並更新 DB status='available'。**比即時偵測穩固得多**。
</div>

<div class="def">
<span class="term">CDN + Range Request</span>
下載大檔案用 CDN signed URL（CloudFront）+ HTTP <code>Range: bytes=0-10485759</code>——**支援斷點續傳 + 自適應位元率串流**（影片）。CDN 把 200ms 變 5ms。
</div>

<div class="def">
<span class="term">CDN 簽名 vs Storage 簽名</span>
**Blob Storage 簽名**由 storage 驗證 · **CDN 簽名**由 CDN edge node 公私鑰驗證——CDN 不需回 origin，全球延遲更穩。
</div>

> Source: 設計模式/04 Handling Large Blobs.pdf · §怎麼防止濫用 + §怎麼確保下載夠快

---

## LARGE BLOBS · 什麼時候不適用

<div class="tradeoff">
  <div class="pro">
    <h3>適合直傳</h3>
    <ul>
      <li>檔案 > 10MB（影片、相片、文件）</li>
      <li>YouTube · Instagram · Dropbox · Messenger 媒體</li>
      <li>用戶自由離開、稍後回來</li>
    </ul>
  </div>
  <div class="con">
    <h3>不該直傳</h3>
    <ul>
      <li>< 10MB 小檔（額外 round-trip 不值得）</li>
      <li>需要同步驗證內容（CSV 匯入）</li>
      <li>合規要求逐行審查（HIPAA / 信用卡）</li>
      <li>需要即時回饋（人臉辨識、文件預覽）</li>
    </ul>
  </div>
</div>

> Source: 設計模式/04 Handling Large Blobs.pdf · §什麼時候不適合用

---

<!-- _class: end -->

# Large Blobs 完
## *bytes 走捷徑 · 你只發票——下一站講即時通訊。*

<br>

<span class="lead">→ 04 Real-time Updates</span>
