---
marp: true
theme: anthropic
paginate: true
size: 16:9
header: 'C.12 · Security Basics'
footer: 'AI 時代系統設計速成 '
---

## C.12 · 安全 5 道防線

<span class="kicker">SECURITY · 不能事後補</span>

<!-- _class: compact -->

| 層 | 措施 | 工具 |
|---|---|---|
| 1 · 傳輸 | TLS 1.3 必開 | Let's Encrypt, ACM |
| 2 · 邊界 | WAF + Rate Limit | Cloudflare, AWS WAF |
| 3 · 認證 | OAuth 2.1 / OIDC | Auth0, Keycloak |
| 4 · 授權 | RBAC / ABAC, scope | OPA, Cedar |
| 5 · 資料 | at-rest 加密 + secrets manager | KMS, Vault |

<br>

**OWASP Top 10 速查（2026）**：
A01 Broken Access Control · A02 Crypto Failure · A03 Injection
A04 Insecure Design · A05 Misconfiguration · A06 Vulnerable Components
A07 Auth/Identification · A08 Software/Data Integrity · A09 Logging Failure
A10 SSRF

<br>

<span class="muted">**金句**：安全是預設值，不是 feature。寫進架構，不是事後 audit。</span>

> Source: software_architect/ppt/_source/05_ilities.md · §Security
