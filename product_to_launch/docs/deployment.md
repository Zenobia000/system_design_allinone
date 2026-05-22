# Deployment Guide · Launch Atlas

> Static export (`output: 'export'`). Any CDN / object-storage / Pages host works.
> Build emits to `out/`. Total payload ~8-9MB.

---

## 1. Environment variables

| Var | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **yes** | `https://launch-atlas.example` | Canonical URL. Drives `metadataBase`, sitemap, robots, canonical, OG image absolute URLs |
| `NEXT_PUBLIC_BASE_PATH` | no | `` | Sub-path prefix when deploying under non-root URL (e.g. `/launch-atlas` for GitHub Pages) |

The `NEXT_PUBLIC_` prefix is **required** — Next.js only exposes these to client/browser at build time. Without the prefix the variable is server-only and won't be inlined into the static HTML.

**Static export caveat**: these are baked at `npm run build`. Changing the env var requires a fresh build. Local `.env.local` does NOT propagate to deploy platforms — you must set them on the platform too.

---

## 2. Recommended setup: subdomain on sunnydatascience.com

```
                ┌──────────────────────────┐
sunnydatascience.com ──► main site (unchanged)
                │
                ├── atlas.sunnydatascience.com ──► this Launch Atlas site
                │      (CNAME → Pages host)
                │
                └── other.sunnydatascience.com ──► future SDS Lab sites
```

**Why subdomain over subpath**:
- Zero collision with main site routing / SSL / CDN rules
- Google treats sibling subdomains as related-but-independent entities → main site and Atlas accumulate ranking weight separately, don't drag each other down
- No `basePath` needed → all internal `<Link>` and asset paths work as-is
- DNS-only change (no reverse-proxy gymnastics)

### DNS setup (Cloudflare-style; adapt as needed)

| Type | Name | Target | TTL | Proxy |
|---|---|---|---|---|
| `CNAME` | `atlas` | `<your-pages-host>` (see platform below) | Auto | On (orange cloud) |

---

## 3. Deploy on Cloudflare Pages

```bash
# In Cloudflare Pages dashboard:
# 1. Connect to your GitHub repo
# 2. Build configuration:
Build command:      npm run build
Build output dir:   out
Root directory:     product_to_launch        # if this is a sub-folder repo
Node version:       20  (set via NODE_VERSION env or .nvmrc)

# 3. Environment variables (Production):
NEXT_PUBLIC_SITE_URL=https://atlas.sunnydatascience.com
NEXT_PUBLIC_BASE_PATH=

# 4. Custom domain:
# Pages → Custom domains → add atlas.sunnydatascience.com
# CF automatically issues SSL via DCV.
```

CNAME target: `<project-name>.pages.dev`.

---

## 4. Deploy on Vercel

```bash
# vercel.json (optional — Vercel auto-detects Next.js)
{
  "buildCommand": "npm run build",
  "outputDirectory": "out"
}

# Project Settings → Environment Variables (Production scope):
NEXT_PUBLIC_SITE_URL=https://atlas.sunnydatascience.com
NEXT_PUBLIC_BASE_PATH=

# Project Settings → Domains:
# add atlas.sunnydatascience.com
```

CNAME target: `cname.vercel-dns.com`.

---

## 5. Deploy on GitHub Pages

Requires sub-path (`/<repo>/`) unless using a custom domain. With a custom subdomain (`atlas.sunnydatascience.com`) you can deploy at root.

```yaml
# .github/workflows/pages.yml
name: Deploy to Pages
on:
  push:
    branches: [main]
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }

jobs:
  build:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: product_to_launch } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm, cache-dependency-path: product_to_launch/package-lock.json }
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://atlas.sunnydatascience.com
          NEXT_PUBLIC_BASE_PATH: ''
      - uses: actions/upload-pages-artifact@v3
        with: { path: product_to_launch/out }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Add a `product_to_launch/public/CNAME` file containing the literal line `atlas.sunnydatascience.com` so GH Pages serves on the custom domain.

DNS: CNAME `atlas` → `<github-user>.github.io`.

---

## 6. After first deploy — verification checklist

- [ ] `https://atlas.sunnydatascience.com/sitemap.xml` returns 75 entries and matches the URL above
- [ ] `https://atlas.sunnydatascience.com/robots.txt` shows `Sitemap: https://atlas.sunnydatascience.com/sitemap.xml`
- [ ] View page source on `/deliverables/prd/`: `<link rel="canonical" href="https://atlas.sunnydatascience.com/...">` ← exact URL
- [ ] OG check via `https://www.opengraph.xyz/url/<encoded-url>` — image previews resolve and load
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools (powers DuckDuckGo + others)
- [ ] Test mobile via Lighthouse: target Performance ≥ 90, Accessibility ≥ 95

---

## 7. Gotchas

- **Pages 404**: ensure `trailingSlash: true` in `next.config.mjs` is honored by the host. Cloudflare and Vercel handle this transparently; raw S3/nginx needs rewrite rules.
- **OG image doesn't show in Slack/Discord/Twitter**: their cache. Force re-scrape via Facebook Debugger / Twitter Card Validator / Slack unfurl debugger.
- **Subdomain SSL takes 1-15 min** to propagate after DNS + CDN provisioning.
- **Old PNG URLs in shared links**: legacy `*.png` shares (from before WebP migration) will 404. Either keep one canonical `og-card.png` in `public/` as a permanent fallback, or accept the breakage (low-traffic pre-launch period is the cheapest time to break old links).
- **Re-encoding to AVIF**: `originals/generated/` still has source PNGs. To add AVIF output, edit `scripts/optimize-images.mjs` to also emit `.avif` per width, then have the `<img>` parent become a `<picture>` with `<source type="image/avif">`.
