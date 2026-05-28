# Logo Assets

Place approved official logo files here before final rendering.

## Reuse from system_design_101

Most logos needed for this course already exist in `../../system_design_101/assets/logos/`. You may reuse those files directly or create symlinks rather than duplicating assets. Confirmed reusable logos include:

- Apache Kafka (`kafka.svg`)
- Redis (`redis.svg`)
- AWS S3 (`aws-s3.svg`)
- AWS SQS (`aws-sqs.svg`)
- AWS EC2 (`aws-ec2.svg`)
- PostgreSQL (`postgresql.svg`)

## New logos to source

The following tools are new to this course and need to be sourced separately:

| Tool | Expected filename | Official source |
|------|------------------|----------------|
| TimescaleDB | `databases/timescaledb.svg` | https://www.timescale.com/press |
| FastAPI | `api/fastapi.svg` | https://fastapi.tiangolo.com (Tiangolo brand kit) |
| Docker | `containers/docker.svg` | https://www.docker.com/company/newsroom/media-resources |
| Kubernetes | `containers/kubernetes.svg` | https://github.com/kubernetes/kubernetes/tree/master/logo |
| Grafana | `observability/grafana.svg` | https://grafana.com/docs/grafana/latest/developers/logos |
| Prometheus | `observability/prometheus.svg` | https://prometheus.io/docs/introduction/media |
| OpenTelemetry | `observability/opentelemetry.svg` | https://opentelemetry.io/docs/contributing/style-guide |

## Usage rules

Do not commit scraped or unofficial logo files without checking usage rights. The slide specs refer to expected filenames, but final assets must be sourced from official brand resources or an approved internal asset library.

Before adding any logo file, record in a comment or separate provenance note:

1. Source URL
2. License or trademark usage terms
3. Download date
4. File format

Logo files are used for teaching identification only and must not imply endorsement, partnership, or official certification.

If no authorized logo is available for a given tool, replace it with a **text pill** in the slide layout and mark the QA Checklist item as blocked.
