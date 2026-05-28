# LOGO_ASSETS — 實名技術與產品 Logo 規格

凡是投影片明確提到公司、雲端服務、框架、套件或開源產品，最終畫面應使用官方 logo asset 加強記憶點。

## 原則

- 不讓 GPT Image 2 臨場繪製或仿製 logo；logo 必須由本機核准素材疊上。
- 每個 logo asset 需記錄來源 URL、授權/商標注意事項、下載日期與檔案格式。
- Logo 僅作教學識別用途，不應暗示背書、合作或官方認證。
- Logo strip 不取代課程品牌；桑尼資料科學 logo 仍固定在右下角。
- 若沒有可授權使用的官方 logo，該頁改用**文字 pill**，並在 QA Checklist 標記需補素材。

> **重用提示**：本課程多數工具 logo 已存在 `../../system_design_101/assets/logos/`，可直接重用或建立軟連結。需要補抓的新工具清單見下方「本課程新增工具」。

## 建議存放結構

```text
assets/logos/
  databases/
    postgresql.svg
    timescaledb.svg
  api/
    fastapi.svg
  messaging/
    kafka.svg
  cache/
    redis.svg
  containers/
    docker.svg
    kubernetes.svg
  observability/
    grafana.svg
    prometheus.svg
    opentelemetry.svg
  cloud/
    aws-ec2.svg
    aws-s3.svg
    aws-sqs.svg
```

## 本課程工具清單

| 工具 | 類別 | Expected Asset Path | 可從 101 重用？ |
|------|------|---------------------|----------------|
| PostgreSQL | 資料庫 | `assets/logos/databases/postgresql.svg` | 是（`../../system_design_101/assets/logos/`） |
| TimescaleDB | 時序資料庫 | `assets/logos/databases/timescaledb.svg` | 否，需補抓 |
| FastAPI | API 框架 | `assets/logos/api/fastapi.svg` | 否，需補抓 |
| Apache Kafka | 訊息佇列 | `assets/logos/messaging/kafka.svg` | 是（101 已有 `kafka.svg`） |
| Redis | 快取 | `assets/logos/cache/redis.svg` | 是（101 已有） |
| Docker | 容器 | `assets/logos/containers/docker.svg` | 否，需補抓 |
| Kubernetes | 容器編排 | `assets/logos/containers/kubernetes.svg` | 否，需補抓 |
| Grafana | 可觀察性/視覺化 | `assets/logos/observability/grafana.svg` | 否，需補抓 |
| Prometheus | 指標採集 | `assets/logos/observability/prometheus.svg` | 否，需補抓 |
| OpenTelemetry | 追蹤/遙測 | `assets/logos/observability/opentelemetry.svg` | 否，需補抓 |
| AWS EC2 | 雲端運算 | `assets/logos/cloud/aws-ec2.svg` | 是（101 已有 AWS 系列） |
| AWS S3 | 物件儲存 | `assets/logos/cloud/aws-s3.svg` | 是（101 已有） |
| AWS SQS | 訊息佇列 | `assets/logos/cloud/aws-sqs.svg` | 是（101 已有） |

## 各頁 Logo 需求（待填）

| Slide | Logo |
|---|---|
| `00-接案世界觀/slide-XX.md` | （隨章節完成後填入） |
| `01-需求與約束/slide-XX.md` | （隨章節完成後填入） |
| `02-建模與選型/slide-XX.md` | PostgreSQL、TimescaleDB、FastAPI |
| `03-系統設計/slide-XX.md` | Apache Kafka、Redis、PostgreSQL |
| `04-風險與韌性/slide-XX.md` | Apache Kafka、Redis |
| `05-落地與演進/slide-XX.md` | Grafana、Prometheus、OpenTelemetry、Docker、Kubernetes |

## Logo Strip 規格

- 位置：主視覺或佐證區下方，不與課程 logo/footer 混用。
- 高度：單一 logo 建議 40–56 px，多 logo 並列時統一視覺高度。
- 間距：水平 24 px 以上。
- 背景：淺底頁用原色或深色版；深底頁優先用官方反白版，沒有反白版時置於 Warm White 小底板。
- 數量：每頁最多 4 個 logo，避免變成 logo 牆。

## Provenance 要求

補抓新 logo 前，確認：

1. 來源 URL（官方品牌資源或 SVG 素材庫，如 CNCF landscape、官方 press kit）
2. 授權條款（商標使用限制，通常為「可用於教學/識別，不可暗示背書」）
3. 下載日期
4. 檔案格式（SVG 優先，PNG @2x 備用）

未確認授權前**不可 commit** scraped logo 素材（沿用 101 規範）。
