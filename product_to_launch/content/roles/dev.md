---
title: "開發者"
title_en: "Developer"
slug: "dev"
num: "08"
hook: "把藍圖變成跑得起來的代碼"
hires_for: "在 spec 與真實使用者之間做最後一次反饋"
fired_when: "把 'spec 沒寫' 當作不做的理由、不主動補洞"
ai_leverage: "Claude Code / Cursor 寫 boilerplate、補測試、refactor"
art: "/generated/role-hero-dev.webp"
source: "deep-research-report.md §FE/BE/Mobile"
---

## 這個角色做什麼

**Dev 是把藍圖變成跑得起來的代碼的人。** FE/BE/Mobile 都算，差別在實作層次。Spec 永遠不可能寫完，Dev 是最後一道「這真的能 work 嗎」的反饋層。

**好 Dev 跟普通 Dev 的差別**：不是寫得快，是知道哪個地方一定要問清楚才動手。

## 主要產出

- **Code** — 可合併、可測試、可部署
- **Tests** — unit / integration / E2E hooks
- **Migrations** — 跟 application code 一起 version control
- **Telemetry** — log、metric、trace 埋點

## 跟誰對接

- **上游接：** UI spec、API contract、system design、ADR
- **下游交：** PR 給 reviewer；release candidate 給 QA
- **常衝突：** 跟 PM（功能 vs 技術債）、跟 QA（「我 local 沒 bug」）

## AI 時代怎麼還能活著

**AI 寫 code 快，但驗證它寫的對不對、會不會在邊界情況崩、上線後有沒有 regression，還是要人。** 高槓桿的 Dev 是把 AI 當下屬、不是隊友。

加速範例：`基於這個 API spec 生 service 骨架、補 unit test、補 error handling`。

## 何時該招這個角色

**永遠都需要**，但 senior Dev 的價值在「知道什麼時候不該寫 code」：買現成、外包、或直接不做。
