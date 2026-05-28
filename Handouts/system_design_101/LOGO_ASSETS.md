# LOGO_ASSETS — 實名技術與產品 Logo 規格

凡是投影片明確提到公司、雲端服務、框架、套件或開源產品，最終畫面應使用官方 logo asset 加強記憶點。

## 原則

- 不讓 GPT Image 2 臨場繪製或仿製 logo；logo 必須由本機核准素材疊上。
- 每個 logo asset 需記錄來源 URL、授權/商標注意事項、下載日期與檔案格式。
- Logo 僅作教學識別用途，不應暗示背書、合作或官方認證。
- Logo strip 不取代課程品牌；桑尼資料科學 logo 仍固定在右下角。
- 若沒有可授權使用的官方 logo，該頁改用文字 pill，並在 QA Checklist 標記需補素材。

## 建議存放結構

```text
assets/logos/
  companies/
    stripe.svg
    youtube.svg
    netflix.svg
    uber-eats.svg
    foodpanda.svg
    shopee.svg
    momo.svg
  cloud/
    aws-s3.svg
    google-cloud-storage.svg
    cloudflare.svg
    aws-cloudfront.svg
    aws-elb.svg
    aws-sqs.svg
  infra/
    elasticsearch.svg
    redis.svg
    nginx.svg
    haproxy.svg
    nginx.svg
    haproxy.svg
    redis.svg
    memcached.svg
    kafka.svg
    rabbitmq.svg
    elasticsearch.svg
    opensearch.svg
```

## Logo Strip 規格

- 位置：主視覺或佐證區下方，不與課程 logo/footer 混用。
- 高度：單一 logo 建議 40-56 px，多 logo 並列時統一視覺高度。
- 間距：水平 24 px 以上。
- 背景：淺底頁用原色或深色版；深底頁優先用官方反白版，沒有反白版時置於 Warm White 小底板。
- 數量：每頁最多 4 個 logo，避免變成 logo 牆。

## 目前需要的 Logo

| Slide | Logo |
|---|---|
| `01-人變多/slide-04.md` | NGINX, HAProxy, AWS Elastic Load Balancing |
| `02-狂看菜單/slide-04.md` | Redis, Memcached |
| `06-即時與等待/slide-04.md` | Apache Kafka, RabbitMQ, AWS SQS |
| `07-找東西/slide-03.md` | Elasticsearch, OpenSearch |
| `01-人變多/slide-07.md` | Uber, Shopee |
| `04-東西會壞/slide-07.md` | Stripe |
| `05-照片與影片/slide-04.md` | AWS S3, Google Cloud Storage |
| `05-照片與影片/slide-05.md` | Cloudflare, AWS CloudFront |
| `05-照片與影片/slide-07.md` | YouTube, Netflix |
| `06-即時與等待/slide-07.md` | Uber Eats, Foodpanda |
| `07-找東西/slide-05.md` | Shopee, Momo, Elasticsearch |
