"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import PromptActions from "./PromptActions";

interface Props {
  slug: string;
  quick: string;
  full: string;
}

type Kind = "quick" | "full";

interface ChipSpec {
  slug: string;
  label: string;
  test: (text: string) => boolean;
}

// Feature detectors. Order matters — chips render in this order after the
// always-on line-count chip.
const CHIP_SPECS: ChipSpec[] = [
  {
    slug: "role",
    label: "role",
    test: (t) => /<role>/i.test(t),
  },
  {
    slug: "input",
    label: "XML 邊界",
    test: (t) => /<input>/i.test(t),
  },
  {
    slug: "schema",
    label: "schema",
    test: (t) => /output_schema|輸出\s*schema/im.test(t),
  },
  {
    slug: "anti-hallu",
    label: "anti-hallu",
    test: (t) => /不要編造|缺資料.*TODO|hallucinat/im.test(t),
  },
  {
    slug: "hml",
    label: "H/M/L",
    test: (t) => /confidence:\s*\[?H/i.test(t) || /H\/M\/L/.test(t),
  },
  {
    slug: "thinking",
    label: "thinking",
    test: (t) => /<thinking>/i.test(t),
  },
  {
    slug: "self-verify",
    label: "self-verify",
    test: (t) => /<verify>/i.test(t),
  },
  {
    slug: "decision-log",
    label: "decision log",
    test: (t) => /decision_log/i.test(t),
  },
  {
    slug: "out-of-scope",
    label: "out-of-scope",
    test: (t) => /out_of_scope|out of scope/i.test(t),
  },
];

interface Chip {
  slug: string;
  label: string;
  meta?: boolean;
}

function detectChips(text: string, lineCount: number): Chip[] {
  const chips: Chip[] = [
    { slug: "lines", label: `${lineCount} 行`, meta: true },
  ];
  for (const spec of CHIP_SPECS) {
    if (spec.test(text)) {
      chips.push({ slug: spec.slug, label: spec.label });
    }
  }
  return chips;
}

const TABS: { kind: Kind; label: string; sub: string }[] = [
  { kind: "quick", label: "Quick", sub: "12 行 · 快速試用" },
  { kind: "full", label: "Full", sub: "~50 行 · 正式產出" },
];

export default function PromptTabs({ slug, quick, full }: Props) {
  const [active, setActive] = useState<Kind>("quick");
  const tabRefs = useRef<Record<Kind, HTMLButtonElement | null>>({
    quick: null,
    full: null,
  });

  const prompt = active === "quick" ? quick : full;
  const skillFilename = `${slug}-${active}.md`;

  const quickLines = useMemo(() => quick.split("\n").length, [quick]);
  const fullLines = useMemo(() => full.split("\n").length, [full]);

  const chips = useMemo(
    () => detectChips(prompt, active === "quick" ? quickLines : fullLines),
    [prompt, active, quickLines, fullLines],
  );

  const activeIndex = active === "quick" ? 0 : 1;

  const activateAndFocus = useCallback((kind: Kind) => {
    setActive(kind);
    // Move focus to the newly active tab (roving tabindex).
    requestAnimationFrame(() => {
      tabRefs.current[kind]?.focus();
    });
  }, []);

  const onTablistKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const key = e.key;
      const order: Kind[] = ["quick", "full"];
      const idx = order.indexOf(active);
      if (key === "ArrowRight" || key === "ArrowDown") {
        e.preventDefault();
        activateAndFocus(order[(idx + 1) % order.length]);
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        e.preventDefault();
        activateAndFocus(order[(idx - 1 + order.length) % order.length]);
      } else if (key === "Home") {
        e.preventDefault();
        activateAndFocus(order[0]);
      } else if (key === "End") {
        e.preventDefault();
        activateAndFocus(order[order.length - 1]);
      }
    },
    [active, activateAndFocus],
  );

  const panelId = `ptc-panel-${slug}`;
  const tabId = (kind: Kind) => `ptc-tab-${kind}-${slug}`;

  return (
    <div
      className="ptc"
      data-active={active}
      style={{ ["--ptc-seg-pos" as string]: activeIndex } as CSSProperties}
    >
      <header className="ptc__head">
        <div
          className="ptc__seg"
          role="tablist"
          aria-label="Prompt 版本切換"
          onKeyDown={onTablistKeyDown}
        >
          {TABS.map((tab) => {
            const selected = active === tab.kind;
            const meta =
              tab.kind === "quick"
                ? `${quickLines} 行 · 快速試用`
                : `${fullLines} 行 · 正式產出`;
            return (
              <button
                key={tab.kind}
                ref={(el) => {
                  tabRefs.current[tab.kind] = el;
                }}
                type="button"
                role="tab"
                id={tabId(tab.kind)}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                data-kind={tab.kind}
                className="ptc__seg-btn"
                onClick={() => setActive(tab.kind)}
              >
                <span className="ptc__seg-label">{tab.label}</span>
                <span className="ptc__seg-sub">{meta}</span>
              </button>
            );
          })}
          <span
            className="ptc__seg-indicator"
            aria-hidden="true"
            data-pos={activeIndex}
          />
        </div>

        <div className="ptc__chips" aria-live="polite">
          {chips.map((chip) => (
            <span
              key={chip.slug}
              className={`ptc__chip${chip.meta ? " ptc__chip--meta" : ""}`}
              data-chip={chip.slug}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </header>

      <div
        className="ptc__body"
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
      >
        <pre
          key={active}
          className="ptc__pre"
          data-prompt-block
          data-prompt-kind={active}
        >
          <code>{prompt}</code>
        </pre>
      </div>

      <footer className="ptc__foot">
        <PromptActions
          key={active}
          prompt={prompt}
          slug={slug}
          skillFilename={skillFilename}
          variant="ptc"
        />
      </footer>
    </div>
  );
}
