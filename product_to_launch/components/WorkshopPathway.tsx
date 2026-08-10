"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BRIEF_FILENAME,
  BRIEF_STORAGE_KEY,
  type BriefAnswers,
} from "@/lib/brief";
import { DELIVERABLES, STAGES, type StageSlug } from "@/lib/taxonomy";

const PROGRESS_STORAGE_KEY = "workshop:progress";
const DEMO_GITHUB_BASE =
  "https://github.com/Zenobia000/system_design_allinone/blob/main/demo";

interface StoredBrief {
  answers: BriefAnswers;
  markdown: string;
  createdAt: number;
}

interface EssentialCard {
  slug: string;
  order: number;
  title: string;
  stage: StageSlug;
  cardNum: string;
  demoFolder: string;
}

const ESSENTIAL_CARDS: EssentialCard[] = (() => {
  const stageOrder: StageSlug[] = [
    "discovery",
    "define",
    "design",
    "build",
    "ship",
    "operate",
  ];
  const stageNum: Record<StageSlug, string> = {
    discovery: "01",
    define: "02",
    design: "03",
    build: "04",
    ship: "05",
    operate: "06",
  };
  const filtered = DELIVERABLES.filter((d) => d.essential).sort((a, b) => {
    const sa = stageOrder.indexOf(a.stage);
    const sb = stageOrder.indexOf(b.stage);
    if (sa !== sb) return sa - sb;
    return a.order - b.order;
  });
  return filtered.map((d, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      slug: d.slug,
      order: d.order,
      title: d.title,
      stage: d.stage,
      cardNum: n,
      demoFolder: `${stageNum[d.stage]}-${d.stage}/${n}-${d.slug}`,
    };
  });
})();

export default function WorkshopPathway() {
  const [brief, setBrief] = useState<StoredBrief | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BRIEF_STORAGE_KEY);
      if (raw) setBrief(JSON.parse(raw) as StoredBrief);
      const rawProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (rawProgress) setProgress(JSON.parse(rawProgress) as Record<string, boolean>);
    } catch {
      // ignore corrupted state
    }
    setHydrated(true);
  }, []);

  const toggle = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = { ...prev, [slug]: !prev[slug] };
      try {
        window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    if (!window.confirm("確定要清除目前的簡報與進度？此動作無法復原。")) return;
    try {
      window.localStorage.removeItem(BRIEF_STORAGE_KEY);
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
    window.location.href = "/start/";
  }, []);

  const copyBrief = useCallback(async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // browsers without clipboard API
    }
  }, [brief]);

  const downloadBrief = useCallback(() => {
    if (!brief) return;
    const blob = new Blob([brief.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = BRIEF_FILENAME;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [brief]);

  const byStage = useMemo(() => {
    const grouped = new Map<StageSlug, EssentialCard[]>();
    for (const c of ESSENTIAL_CARDS) {
      const arr = grouped.get(c.stage) ?? [];
      arr.push(c);
      grouped.set(c.stage, arr);
    }
    return grouped;
  }, []);

  if (!hydrated) {
    return <p className="muted" style={{ padding: "32px 0" }}>讀取你的學習進度...</p>;
  }

  if (!brief) {
    return (
      <div className="workshop-empty">
        <p>還沒填過種子簡報。先去 <code>/start/</code> 花 5 分鐘填 5 題，才能解鎖個人化學習路徑。</p>
        <Link href="/start/" className="cta-primary">
          前往 /start/ →
        </Link>
      </div>
    );
  }

  const completedCount = Object.values(progress).filter(Boolean).length;
  const briefDate = new Date(brief.createdAt).toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <details className="workshop-brief" open>
        <summary>我的種子簡報 · 產出於 {briefDate}</summary>
        <pre>{brief.markdown}</pre>
        <div className="workshop-brief-actions">
          <button type="button" onClick={copyBrief}>
            {copied ? "已複製" : "複製到剪貼簿"}
          </button>
          <button type="button" onClick={downloadBrief}>下載 .md</button>
          <button type="button" onClick={reset}>重新填寫</button>
        </div>
      </details>

      <p className="muted" style={{ margin: "0 0 8px", fontSize: 14 }}>
        進度：<strong>{completedCount} / {ESSENTIAL_CARDS.length}</strong> 卡完成
      </p>

      {STAGES.map((s) => {
        const cards = byStage.get(s.slug);
        if (!cards || cards.length === 0) return null;
        return (
          <section key={s.slug} className="workshop-stage">
            <h3>{s.titleEn} · {s.title}（{cards.length} 卡）</h3>
            <p className="stage-hook">{s.hook}</p>
            <ul className="workshop-card-list">
              {cards.map((c) => {
                const done = !!progress[c.slug];
                const demoUrl = `${DEMO_GITHUB_BASE}/${encodeURI(c.demoFolder)}`;
                return (
                  <li key={c.slug} className="workshop-card">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(c.slug)}
                      aria-label={`${c.title} 完成`}
                    />
                    <div className="workshop-card-body">
                      <p className={`workshop-card-title ${done ? "done" : ""}`}>
                        <span className="workshop-card-meta">#{c.cardNum}</span>
                        {c.title}
                      </p>
                      <div className="workshop-card-links">
                        <Link href={`/deliverables/${c.slug}/`}>前往卡片 →</Link>
                        <a href={demoUrl} target="_blank" rel="noopener" className="secondary">
                          看完整工作範例
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
