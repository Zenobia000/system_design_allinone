---
title: "UI 設計"
title_en: "UI Designer"
slug: "ui"
num: "05"
hook: "把流程變成可交付的視覺規格"
hires_for: "讓 FE/Mobile 不用猜 spacing、token、state"
fired_when: "只交圖檔、不交 design token 與 state spec"
ai_leverage: "用 Claude/Cursor 把 Figma component 同步成 code"
art: "/generated/role-hero-ui.png"
source: "deep-research-report.md §UI"
---

## 這個角色做什麼

**UI 把已確認的 flow/wireframe 變成可開發的視覺規格。** Token、spacing、component state、responsive、a11y 註記，全部要齊。

**重點不是好看**：是讓 FE/Mobile 拿到圖就能寫，不用回頭問「這個 hover 顏色是什麼」「empty state 要顯示什麼」。

## 主要產出

- **Hi-fi Mockup** — 像素級對齊的視覺稿
- **Component Spec** — view、state、token、responsive
- **Design System** — 跨頁面一致的元件庫
- **A11y 註記** — 對比、focus order、aria

## 跟誰對接

- **上游接：** UX 的 wireframe、design system、平台規範（HIG、Material）
- **下游交：** Component spec 給 FE/Mobile
- **常衝突：** 跟 FE（pixel perfect vs 實作成本）、跟 UX（視覺優雅 vs 流程優先）

## AI 時代怎麼還能活著

**AI 生稿子很快，但決定品牌語彙、決定哪一版才是「對」的，要人。** 加上 design system 治理、跨平台一致性，這幾件事還很難自動化。

加速範例：`基於這個 design token，產出 button 的 8 種 state、附 a11y 標註`。

## 何時該招這個角色

**有自家 design system、或多平台（web/iOS/Android）** 時，沒專職 UI 會出現每個頁面風格都不一樣。
