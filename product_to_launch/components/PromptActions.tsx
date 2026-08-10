"use client";

import { useState } from "react";

interface Props {
  prompt: string;
  slug: string;
  /** Override the default `<slug>.md` work-package filename (e.g. `<slug>-quick.md`). */
  skillFilename?: string;
  /**
   * Visual variant. When "ptc", adds the `ptc__actions` class hook so the
   * segmented prompt card CSS can scope footer-specific tweaks.
   */
  variant?: "default" | "ptc";
}

const CHATBOTS = [
  { name: "ChatGPT", url: (q: string) => `https://chatgpt.com/?q=${q}` },
  { name: "Claude", url: (q: string) => `https://claude.ai/new?q=${q}` },
  { name: "Perplexity", url: (q: string) => `https://www.perplexity.ai/?q=${q}` },
] as const;

const GEMINI_URL = "https://gemini.google.com/app";

const URL_LIMIT = 1800;

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function PromptActions({ prompt, slug, skillFilename, variant }: Props) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const skillHref = `/skills/${skillFilename ?? `${slug}.md`}`;
  const rootClass = `prompt-actions${variant === "ptc" ? " ptc__actions" : ""}`;

  const encoded = encodeURIComponent(prompt);
  const overLimit = encoded.length > URL_LIMIT;

  const onCopy = async () => {
    const ok = await writeClipboard(prompt);
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2000);
  };

  const onChatbot = async (url: string) => {
    await writeClipboard(prompt);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={rootClass} role="group" aria-label="使用此 prompt">
      <button
        type="button"
        className={`pa-btn pa-primary${copyState === "copied" ? " is-copied" : ""}`}
        onClick={onCopy}
        aria-live="polite"
      >
        {copyState === "copied" ? "已複製" : copyState === "failed" ? "複製失敗" : "複製 prompt"}
      </button>

      <div className="pa-chatbots">
        <span className="pa-label">直送 →</span>
        {CHATBOTS.map((bot) => (
          <button
            type="button"
            key={bot.name}
            className="pa-btn pa-secondary"
            onClick={() => onChatbot(overLimit ? bot.url("") : bot.url(encoded))}
            title={overLimit ? "prompt 過長，已複製到剪貼簿，請貼上" : `在 ${bot.name} 開啟此 prompt`}
          >
            {bot.name}
          </button>
        ))}
        <button
          type="button"
          className="pa-btn pa-secondary"
          onClick={() => onChatbot(GEMINI_URL)}
          title="Gemini 不支援帶入 query，將複製到剪貼簿後請於頁面貼上"
        >
          Gemini
        </button>
      </div>

      <a className="pa-skill-link" href={skillHref} download>
        下載 Coding Agent 工作包
      </a>
    </div>
  );
}
