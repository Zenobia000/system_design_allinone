#!/usr/bin/env python3
"""`/card-fill hint <slug>` — show what this card needs and where to download it.

Coach-mode: this command does NOT compose a trigger or load upstream into
context. It only PRINTS information so the student can decide what to do
manually (download template, drag upstream files, write their own prompt).

Usage:
  hint.py <slug>
"""

from __future__ import annotations

import sys
from pathlib import Path

from _config import (
    load_config,
    seed_brief_path,
    template_path,
    workspace_dir,
)
from parse_frontmatter import get_upstream


COMMON_PITFALLS = {
    "jtbd": [
        "JTBD statement 要寫動機，不寫解法 — 出現「按鈕、頁面、API」就是錯",
        "三層 (functional / emotional / social) 至少要寫到 functional + emotional",
        "沒有訪談原句的欄位誠實標 [L]，不要美化成 [M]/[H]",
        "必寫 Mutually Exclusive Jobs 段，否則下游 PRD 會把所有 JTBD 當等價",
    ],
    "prd": [
        "PRD 不寫 how — 不寫 API 路徑、SQL、UI 元件名；寫 what & why",
        "P0 功能必須對應上游 value-hypothesis.riskiest_assumption",
        "Counter-metric 必填（防 goal-hacking）",
        "Non-Goals 段不要省略 — 寫明白「不做什麼」比「做什麼」重要",
    ],
    "adr": [
        "ADR 必寫 ≥ 2 個 rejected options + 各自 rejected reason",
        "Decision 段要寫得讓 6 個月後的工程師看懂選擇背景",
        "Consequences 段要誠實寫 negative consequences，不要只寫好處",
    ],
    "c4-diagram": [
        "C4 至少畫到 Container level；System Context 是給高層看的",
        "每個 box 旁要寫 1 句技術選型 rationale（連回 ADR）",
        "Mermaid 或 PlantUML 都行，但同份 C4 不要混用兩種語法",
    ],
    "api-spec": [
        "每個 endpoint 要寫 happy path + ≥ 1 個 error path",
        "Error code 要對應 error-taxonomy（如果沒有，先建一個小的）",
        "API spec 是少數可以、也必須寫 how 的卡片 — 路徑、payload schema 都要明確",
    ],
    "value-hypothesis": [
        "Riskiest assumption 必須是「如果錯了，整個產品該收掉」級別的假設",
        "每個 hypothesis 配一個 invalidation criterion（可量測門檻）",
        "教學情境通常無實驗結果，全部標 [L] 是正常的",
    ],
    "acceptance-criteria": [
        "用 Given / When / Then 語法，每條獨立可測",
        "Edge case 與 error path 至少各 1 條，不要只寫 happy path",
        "可追溯到 PRD 的 FR-N 編號",
    ],
}


def main():
    if len(sys.argv) < 2:
        print("usage: hint.py <slug>", file=sys.stderr)
        sys.exit(2)
    slug = sys.argv[1].strip().strip("/")
    cfg = load_config()
    tpl = template_path(cfg, slug)

    print(f"# Hint · `{slug}`\n")

    print(f"**模板來源**：{cfg['atlas_base_url']}/{slug}/")
    if tpl:
        print(f"**已下載到**：`{tpl.relative_to(cfg['_repo_root'])}` ✅")
    else:
        print(f"**尚未下載**：請到上方網址，於「文件範本」段點 light/full tab → 複製 → 存到 `templates/{slug}.md`")

    print("\n## 上游依賴\n")
    if tpl:
        try:
            up = get_upstream(tpl, cfg.get("variant", "template-light"))
            req = up["required"]
            opt = up["optional"]
            if req:
                print(f"- **required**: {', '.join(f'`{u}`' for u in req)}")
            if opt:
                print(f"- **optional**: {', '.join(f'`{u}`' for u in opt)}")
            if not req and not opt:
                print("- (本卡無宣告上游)")
            print("\n_學員自己判斷_：每個上游你打算用「實際填好的下游卡」、「種子簡報的對應段落（標 [L]）」、還是「外部研究素材（訪談 / 競品掃描 / 站外文件）」？把這個決定寫進你給 AI 的提示詞。")
        except Exception as e:
            print(f"_(無法解析模板 frontmatter: {e})_")
    else:
        print("_先下載模板才能看上游依賴。_")

    print("\n## 常見陷阱\n")
    pitfalls = COMMON_PITFALLS.get(slug)
    if pitfalls:
        for i, p in enumerate(pitfalls, 1):
            print(f"{i}. {p}")
    else:
        print(f"_(本 slug 沒有預先整理的陷阱清單。下載模板後讀範本內 `> [!IMPORTANT]` 與結尾 `> [!CAUTION]` 自檢清單。)_")

    print("\n## 你的下一步\n")
    print("1. 把模板貼進 Claude Code（或拖檔進來）")
    print("2. 把你決定的上游素材（已填卡 / brief / 外部研究）一併貼進來，每段標清楚 source")
    print("3. 寫你自己的提示詞，明確告訴 AI 哪些欄位用哪份上游、缺資料怎麼標")
    print("4. 跟 AI 來回修，直到符合範本契約（IMPORTANT / ai-rule / CAUTION）")
    print(f"5. 存到 `workspace/{slug}.md`（或你想要的任何路徑），跑：")
    print(f"   - `python3 .claude/skills/card-fill/lib/check.py workspace/{slug}.md`")
    print(f"   - `python3 .claude/skills/card-fill/lib/register.py {slug} workspace/{slug}.md`")


if __name__ == "__main__":
    main()
