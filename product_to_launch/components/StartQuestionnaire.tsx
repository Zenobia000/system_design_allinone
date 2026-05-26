"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BRIEF_FILENAME,
  BRIEF_QUESTIONS,
  BRIEF_STORAGE_KEY,
  emptyAnswers,
  formatBriefMarkdown,
  isComplete,
  type BriefAnswers,
} from "@/lib/brief";

export default function StartQuestionnaire() {
  const router = useRouter();
  const [answers, setAnswers] = useState<BriefAnswers>(emptyAnswers);
  const [submitting, setSubmitting] = useState(false);

  const update = useCallback((key: keyof BriefAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isComplete(answers) || submitting) return;
      setSubmitting(true);

      const markdown = formatBriefMarkdown(answers);

      try {
        window.localStorage.setItem(
          BRIEF_STORAGE_KEY,
          JSON.stringify({ answers, markdown, createdAt: Date.now() })
        );
      } catch {
        // localStorage may be unavailable (private mode, quota); the file
        // download still works as a fallback.
      }

      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = BRIEF_FILENAME;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);

      router.push("/workshop/");
    },
    [answers, router, submitting]
  );

  const complete = isComplete(answers);

  return (
    <form className="start-form" onSubmit={onSubmit}>
      {BRIEF_QUESTIONS.map((q, i) => (
        <fieldset key={q.key} className="start-field">
          <label htmlFor={`q-${q.key}`}>
            <span className="start-num">Q{i + 1}</span>
            <span className="start-label">{q.label}</span>
          </label>
          <p className="start-helper">{q.helper}</p>
          <textarea
            id={`q-${q.key}`}
            name={q.key}
            value={answers[q.key]}
            onChange={(e) => update(q.key, e.target.value)}
            placeholder={q.placeholder}
            rows={3}
            required
            spellCheck={false}
          />
        </fieldset>
      ))}

      <div className="start-actions">
        <button type="submit" className="cta-primary" disabled={!complete || submitting}>
          {submitting ? "產出中..." : "產出我的種子簡報 →"}
        </button>
        <p className="start-hint">
          {complete
            ? "按下後會自動下載 project-brief.md 並跳到你的學習路徑頁。"
            : "5 題都填了才會啟用按鈕。每題寫一句話就好，不用長篇大論。"}
        </p>
      </div>
    </form>
  );
}
