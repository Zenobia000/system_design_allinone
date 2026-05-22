"use client";

import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import PromptActions from "./PromptActions";
import PromptTabs from "./PromptTabs";

interface Props {
  slug: string;
}

interface Block {
  pre: HTMLPreElement;
  kind: "quick" | "full" | "default";
  text: string;
}

export default function PromptActionsMounter({ slug }: Props) {
  useEffect(() => {
    const pres = document.querySelectorAll<HTMLPreElement>(
      ".detail-body article [data-prompt-block]"
    );
    const blocks: Block[] = Array.from(pres)
      .map((pre) => {
        const code = pre.querySelector("code");
        const text = (code?.textContent ?? "").trim();
        const kind = (pre.dataset.promptKind ?? "default") as Block["kind"];
        return { pre, kind, text };
      })
      .filter((b) => b.text);

    const quick = blocks.find((b) => b.kind === "quick");
    const full = blocks.find((b) => b.kind === "full");

    const roots: Root[] = [];
    const containers: HTMLElement[] = [];
    const hidden: HTMLPreElement[] = [];

    if (quick && full) {
      // Upgraded card: hide both raw blocks, mount tabbed UI at the first position.
      const anchor = quick.pre.compareDocumentPosition(full.pre) & Node.DOCUMENT_POSITION_FOLLOWING
        ? quick.pre
        : full.pre;
      quick.pre.style.display = "none";
      full.pre.style.display = "none";
      hidden.push(quick.pre, full.pre);

      const container = document.createElement("div");
      container.className = "prompt-tabs-mount";
      anchor.parentNode?.insertBefore(container, anchor);
      const root = createRoot(container);
      root.render(<PromptTabs slug={slug} quick={quick.text} full={full.text} />);
      roots.push(root);
      containers.push(container);
    } else {
      // Backward-compat: simple action bar below each prompt block.
      for (const b of blocks) {
        const container = document.createElement("div");
        container.className = "prompt-actions-mount";
        b.pre.parentNode?.insertBefore(container, b.pre.nextSibling);
        const root = createRoot(container);
        const skillFilename = b.kind === "default" ? undefined : `${slug}-${b.kind}.md`;
        root.render(
          <PromptActions prompt={b.text} slug={slug} skillFilename={skillFilename} />
        );
        roots.push(root);
        containers.push(container);
      }
    }

    return () => {
      roots.forEach((r) => r.unmount());
      containers.forEach((c) => c.remove());
      hidden.forEach((p) => { p.style.display = ""; });
    };
  }, [slug]);

  return null;
}
