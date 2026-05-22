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

## 3. Deploy on Google Firebase Hosting (recommended for GCP-first setups)

> Why Firebase among GCP options: 1-command deploy, free CDN, free Let's Encrypt
> SSL, atomic deploys with rollback, generous free tier (10GB storage + 360MB/day
> egress). Cloud Storage + Load Balancer is cheaper at scale but ~5× the setup
> work for a static site; Cloud Run is overkill without SSR; App Engine has no
> upside over Firebase for static.

### 3a. One-time setup (do these once per machine)

```bash
# 1. Install Firebase CLI (npx avoids global install)
#    Or globally:  npm install -g firebase-tools
npx firebase-tools --version

# 2. Login (opens browser)
npx firebase-tools login

# 3. Create a new project — project ID is globally unique, must be all lowercase,
#    6-30 chars. If sds-lab-prod is taken, try sds-lab-prod-2026 or similar.
#    --display-name is the human-readable label shown in console.
npx firebase-tools projects:create sds-lab-prod --display-name "SDS Lab"

# 4. Enable billing (Spark/free tier works for hosting, but Blaze is needed
#    for custom domain + production-grade quotas). Open in browser:
#    https://console.cloud.google.com/billing/linkedaccount?project=sds-lab-prod
#    Set a $5/month budget alert at 50/90/100% thresholds.

# 5. Set this repo to target the project
cd product_to_launch
npx firebase-tools use sds-lab-prod
```

### 3b. Deploy (do this every release)

```bash
cd product_to_launch
NEXT_PUBLIC_SITE_URL=https://atlas.sunnydatascience.com npm run build
npx firebase-tools deploy --only hosting
```

That's it. First deploy will print a temporary URL like
`https://sds-lab-prod.web.app` — verify the site loads there before
attaching the custom domain.

### 3c. Custom domain (atlas.sunnydatascience.com)

```bash
# Firebase console → Hosting → Add custom domain
# 1. Enter:  atlas.sunnydatascience.com
# 2. Firebase shows DNS records to add (typically two A records).
# 3. Add them at your DNS provider for sunnydatascience.com:
```

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `atlas` | (Firebase-provided IP #1, e.g. 199.36.158.100) | 3600 |
| `A` | `atlas` | (Firebase-provided IP #2, e.g. 199.36.158.101) | 3600 |
| `TXT` | `atlas` | (Firebase-provided verification string, only during initial verification) | 3600 |

Wait 5-30 min for DNS propagation. Firebase auto-provisions a Let's
Encrypt cert once DNS resolves. Status visible in Firebase console.

### 3d. Repo files

`firebase.json` + `.firebaserc` are committed in `product_to_launch/`:
- `firebase.json` — hosting config (public dir, cache headers, security
  headers). Cache headers: 1y for `_next/static/*` (content-hashed),
  7d for images, 10min for HTML, never cache `firebase.json` itself.
- `.firebaserc` — project alias. Default is `sds-lab-prod`; change here
  if you used a different project ID.

### 3e. Optional: GitHub Actions auto-deploy on push to main

```yaml
# .github/workflows/firebase-deploy.yml
name: Deploy to Firebase Hosting
on:
  push:
    branches: [main]
    paths: ['product_to_launch/**']
jobs:
  deploy:
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
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: sds-lab-prod
          channelId: live
```

To get `FIREBASE_SERVICE_ACCOUNT`:
```bash
npx firebase-tools init hosting:github
# Follow prompts — it creates the secret automatically.
```

---

## 4. Deploy on Cloudflare Pages

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

## 5. Deploy on Vercel

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

## 6. Deploy on GitHub Pages

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

## 7. After first deploy — verification checklist

- [ ] `https://atlas.sunnydatascience.com/sitemap.xml` returns 75 entries and matches the URL above
- [ ] `https://atlas.sunnydatascience.com/robots.txt` shows `Sitemap: https://atlas.sunnydatascience.com/sitemap.xml`
- [ ] View page source on `/deliverables/prd/`: `<link rel="canonical" href="https://atlas.sunnydatascience.com/...">` ← exact URL
- [ ] OG check via `https://www.opengraph.xyz/url/<encoded-url>` — image previews resolve and load
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools (powers DuckDuckGo + others)
- [ ] Test mobile via Lighthouse: target Performance ≥ 90, Accessibility ≥ 95

---

## 8. Gotchas

- **Pages 404**: ensure `trailingSlash: true` in `next.config.mjs` is honored by the host. Cloudflare and Vercel handle this transparently; raw S3/nginx needs rewrite rules.
- **OG image doesn't show in Slack/Discord/Twitter**: their cache. Force re-scrape via Facebook Debugger / Twitter Card Validator / Slack unfurl debugger.
- **Subdomain SSL takes 1-15 min** to propagate after DNS + CDN provisioning.
- **Old PNG URLs in shared links**: legacy `*.png` shares (from before WebP migration) will 404. Either keep one canonical `og-card.png` in `public/` as a permanent fallback, or accept the breakage (low-traffic pre-launch period is the cheapest time to break old links).
- **Re-encoding to AVIF**: `originals/generated/` still has source PNGs. To add AVIF output, edit `scripts/optimize-images.mjs` to also emit `.avif` per width, then have the `<img>` parent become a `<picture>` with `<source type="image/avif">`.
