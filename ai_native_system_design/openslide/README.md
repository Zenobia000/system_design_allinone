# AI 時代系統設計速成 · openslide

React-based slides，與 Marp 來源同步。

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # → dist/
```

## 結構

```
openslide/
├── slides/
│   ├── 00-prologue/         全完整
│   ├── 01-sdlc-overview/    stub (僅 hero) — 待補
│   ├── 02-module-a-...      stub
│   ├── 03-module-b-...      stub
│   ├── 04-module-c-...      stub
│   ├── 05-module-d-...      stub
│   ├── 06-case-ecommerce/   stub
│   ├── 07-case-livestream/  stub
│   ├── 08-case-rag/         stub
│   ├── 09-ai-workflow/      全完整
│   └── 90-appendix/         stub
├── package.json
├── open-slide.config.ts
└── tsconfig.json
```

## 設計系統（同 software_develop_journey 同調）

```ts
palette: {
  bg: '#F5F1E8',       // 暖沙色背景
  text: '#2A2520',     // 深褐色文字
  accent: '#D97757',   // 橘色強調
}
fonts:
  display: 'Noto Serif TC, Georgia, serif'
  body: 'Noto Sans TC, system-ui, sans-serif'
typeScale: { hero: 180, body: 38 }
```

## 與 Marp 來源的對應

每個 `slides/<id>/` 對應 `../ppt/<id>/`。
2 個 reference deck（00-prologue + 09-ai-workflow）已完整實作。
其餘 9 章可循同樣範式擴張。
