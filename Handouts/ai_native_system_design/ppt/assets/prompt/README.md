# Prompt 備份 · AI 時代系統設計速成

> 30 張技術圖的完整可重生 prompt，使用 **gpt-image-2** 生成。

## 目錄

- [`0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md) — 統一風格守則（色票 / 形狀 / 標籤）
- [`INDEX.md`](./INDEX.md) — 30 張圖總覽（含對應 slide 位置）
- `02-module-a.md` — Module A 圖 prompt（1 張）
- `03-module-b.md` — Module B 圖 prompt（3 張）
- `04-module-c.md` — Module C 圖 prompt（6 張 v2 + 5 張舊版）
- `05-module-d.md` — Module D 圖 prompt（4 張）
- `06-case-ecommerce.md` — Case 1 圖 prompt（4 張）
- `07-case-livestream.md` — Case 2 圖 prompt（3 張）
- `08-case-rag.md` — Case 3 圖 prompt（3 張）
- `09-ai-workflow.md` — Part 3 圖 prompt（3 張）
- `_legacy_hero.md` — 12 張 hero 圖 prompt（最早期，僅作存查）

---

## 重生流程

需要重生某張圖時：

```bash
# 1. 找到對應的章節 prompt 檔
cat 06-case-ecommerce.md  # 例如要重生秒殺架構

# 2. Copy 完整 prompt 區塊

# 3. 呼叫 draw skill
python3 ~/.claude/skills/draw/draw.py "<貼上 prompt>" \
  --size 1536x1024 \
  --quality medium \
  --name 06_stage3_seckill \
  --outdir /mnt/d/python_workspace/github/system_design_allinone/ai_native_system_design/openslide/slides/06-case-ecommerce/assets

# 4. 去 timestamp（gpt-image 會加時間戳）
cd <outdir> && for f in *_20*.png; do mv "$f" "$(echo "$f" | sed 's/_20[0-9]*_[0-9]*//')"; done
```

---

## 風格基準

統一遵循 [`0_STYLE_GUIDE.md`](./0_STYLE_GUIDE.md) — 「顧問報告 / 技術文件」風：
- 米底 `#F5F1E8` + 橘紅 `#D97757` + 灰箭頭 `#2A2520`
- **必有雙語標籤** (繁中 + English)
- 形狀分類：圓柱=DB / 圓角矩形=Service / 六角=Queue / 雲=External
- NO 3D, NO isometric, NO cartoon, NO Greek pillars

參考圖：`software_architect/ppt/assets/diagrams/09-case-study/01_iot_01_architecture_concept.png`

---

## 演進記錄

| 版本 | 日期 | 變動 |
|---|---|---|
| v1 | 2026-05-19 | 30 張顧問風格圖完成，全替換 ArchFlow |
| v0 | 2026-05-19 早期 | 12 張 hero + 6 張 Module C v1（無標籤、太卡通，已被 v2 取代）|

---

## 相關文件

- `../IMAGE_PLAN.md` — 早期規劃文件（已執行完畢）
- `../../../ai_native_system_design/openslide/slides/<deck>/assets/` — PNG 實際存放位置
- `../../../software_architect/ppt/assets/diagrams/0_STYLE_GUIDE.md` — 姊妹專案同調風格指南
