---
title: "業務分析師"
title_en: "Business Analyst"
slug: "ba"
num: "03"
hook: "搞清楚現況流程、stakeholder、規則"
hires_for: "把不同部門互相矛盾的口頭規則變成有 ID 的規則表"
fired_when: "只記錄 happy path、忽略例外與責任歸屬"
ai_leverage: "把訪談逐字稿 → Claude 提取 business rules、標出衝突"
art: "/generated/role-hero-ba.png"
source: "deep-research-report.md §BA"
---

## 這個角色做什麼

**BA 是流程考古學家。** 在動工前，把現有 SOP、stakeholder 訴求、業務規則、法規限制全部挖出來，整理成可追溯的文件。

**核心問題**：誰擁有這條規則？例外情況下誰能拍板？這條規則跟那條規則矛盾時聽誰的？沒 BA，這些問題會在 release 前夜爆炸。

## 主要產出

- **Stakeholder Map** — 誰有 interest、誰有 influence、誰能拍板
- **Business Rules Catalog** — 每條規則有 ID、來源、owner、例外
- **Process Map** — 現況流程 vs 未來流程
- **Use Cases** — actor、event、precondition、postcondition

## 跟誰對接

- **上游接：** Stakeholder 訪談、現行 SOP、法規條文
- **下游交：** Rule catalog 給 SA；stakeholder map 給 PM
- **常衝突：** 跟業務部門（他們覺得「大家都知道」就不用寫）

## AI 時代怎麼還能活著

**規則之間的矛盾要由人去談。** AI 能整理逐字稿，但「客服說的」跟「法遵說的」打架時，得找對的人坐下來。

加速範例：`從這份 30 頁的 SOP 萃取出所有規則、標出每條的條件與例外`。

## 何時該招這個角色

**遇到跨部門系統、合規系統、ERP 整合** 時，沒 BA 會被需求改 10 次還對不齊。

---

> Source: deep-research-report.md §BA
