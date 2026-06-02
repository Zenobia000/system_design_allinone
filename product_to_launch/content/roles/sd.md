---
title: "系統設計"
title_en: "System Designer"
slug: "sd"
num: "08"
hook: "把架構決策落地成 Dev 不用問就能寫的細部設計"
hires_for: "讓 Dev 拿到文件，從頭到尾不用再問問題就能寫完"
fired_when: "寫的「設計文件」滿是業務術語、沒 endpoint、沒欄位、沒錯誤碼，Dev 看完還是要問三遍"
ai_leverage: "把 C4 + ADR + use case → Claude 生模組切分、類別圖、錯誤碼目錄草稿"
art: "/generated/role-hero-sd.webp"
source: "deep-research-report.md §SD"
---

## 這個角色做什麼

**SD 是把架構翻成可開工藍圖的人。** Architect 定邊界（哪些服務、什麼 NFR），SD 定細部（服務內怎麼切模組、元件介面長怎樣、物件結構、錯誤怎麼處理）。SD 的產出有一個唯一指標：**Dev 看完不用再問問題**。

**SD vs Architect 一句話**：Architect 定*邊界*、不定*細節*；SD 把邊界內的細節補到 Dev 可以照著寫。Architect 越界寫 API endpoint → SD 沒空間；SD 越界決定「該不該拆服務」→ 踩到 Architect。

## 主要產出

- **Module Design** — 服務內模組怎麼切 + 責任清單 + 依賴方向
- **Component Design** — 元件介面契約、port/adapter、依賴方向
- **Class Diagram** — 物件結構、屬性、方法、關聯、繼承
- **Error Handling** — 錯誤碼目錄、4xx/5xx、重試 / 冪等策略

## 跟誰對接

- **上游接：** Architect 的系統邊界 + NFR + ADR、SA 的業務規則與 use case
- **下游交：** API Spec / Sequence Diagram / Module Design 給 Dev；資料存取樣式給 DBA；契約給 QA 寫整合測試
- **常衝突：** 跟 Architect（細節 vs 邊界）、跟 Dev（理想設計 vs 實作現實）

## AI 時代怎麼還能活著

**AI 能照 C4 生模組草稿，補不齊跨模組的責任歸屬與失敗語意。** 「這個錯誤該 retry 還是 fail fast」「這個職責放 A 模組還是 B 模組」這種牽涉可演進性與團隊分工的判斷，要人定。

加速範例：`基於這份 C4 component + API spec，幫我切出模組、列責任表、標出依賴方向並找出會成環的地方`。

## 何時該招這個角色

**單一服務內部開始 ≥ 5 個模組、多人並行開發、或 Dev 一直回頭問「這個 case 怎麼辦」** 時，沒 SD 會讓每個 Dev 各自發明結構，三個月後 codebase 長成義大利麵。
