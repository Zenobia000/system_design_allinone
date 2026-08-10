"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DeliverableLearningContent } from "@/lib/deliverable-learning";

type ArtifactView = "template" | "full" | "example";
type PromptStep = "clarify" | "generate" | "review";
type PracticeField = "subject" | "context" | "sources" | "constraints" | "outcome";

interface Props {
  title: string;
  hook: string;
  content: DeliverableLearningContent;
  next: { slug: string; title: string } | null;
}

const PRACTICE_FIELDS: Array<{
  key: PracticeField;
  number: string;
  label: string;
  placeholder: string;
  wide?: boolean;
}> = [
  {
    key: "subject",
    number: "01",
    label: "這份文件要處理什麼",
    placeholder: "例：SmartTrip 的首次公開測試版本",
  },
  {
    key: "context",
    number: "02",
    label: "目前已知背景",
    placeholder: "用自己的話描述現在的情況、問題與已做決定",
  },
  {
    key: "sources",
    number: "03",
    label: "可以採信的上游素材",
    placeholder: "列出訪談、PRD、程式碼、數據或會議結論；沒有就寫沒有",
    wide: true,
  },
  {
    key: "constraints",
    number: "04",
    label: "限制與不能自行改的事",
    placeholder: "例：四週內、免登入、既有 API 不變；未知處不得自行決策",
  },
  {
    key: "outcome",
    number: "05",
    label: "這份文件要幫誰做決定",
    placeholder: "寫清楚下一位接手者要用它判斷或執行什麼",
  },
];

const EMPTY_PRACTICE: Record<PracticeField, string> = {
  subject: "",
  context: "",
  sources: "",
  constraints: "",
  outcome: "",
};

const REVIEW_ITEMS = [
  "輕量範本要求的章節都存在，沒有用漂亮摘要取代必要內容。",
  "每個重要結論都能回到使用者素材、上游文件或已確認回答。",
  "資訊不足的地方明確標成 TODO、未知或待決策，沒有讓 AI 自行補完。",
  "數字、角色、範圍與條件具體到能被下一位接手者判斷。",
  "已做決定與仍可調整的內容分開，限制之間沒有互相矛盾。",
  "你能用自己的話說明這份文件最重要的三個判斷與依據。",
];

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function DeliverableLearningDemo({ title, hook, content, next }: Props) {
  const [artifactView, setArtifactView] = useState<ArtifactView>("template");
  const [promptStep, setPromptStep] = useState<PromptStep>("clarify");
  const [practice, setPractice] = useState(EMPTY_PRACTICE);
  const [checked, setChecked] = useState<number[]>([]);
  const [copyState, setCopyState] = useState("");

  const outlineNames = content.outline.map((item) => item.title).join("、");
  const practiceMaterial = useMemo(() => {
    if (!Object.values(practice).some((value) => value.trim())) return "";
    return `# 我的練習素材

- 文件對象：${practice.subject || "尚未填寫"}
- 已知背景：${practice.context || "尚未填寫"}
- 可採信素材：${practice.sources || "尚未填寫"}
- 限制與不可自行更動事項：${practice.constraints || "尚未填寫"}
- 下游要完成的判斷：${practice.outcome || "尚未填寫"}`;
  }, [practice]);

  const prompts = useMemo(() => ({
    clarify: {
      number: "STEP 01",
      label: "先釐清",
      title: "只找阻擋文件成立的未知",
      goal: "先補會改變範圍、判斷或驗收結果的資訊，不急著寫文件。",
      text: `我要製作「${title}」。先不要產出文件。

請根據我的素材，找出會影響這份文件正確性或可執行性的未知事項，一次最多問 5 題。

每題請包含：
1. 問題
2. 為什麼現在必須知道
3. 它會影響哪個章節或決定

已經回答的事不要重問；可以延後的事標成「待決策」；不要替我猜答案。

本文件的核心章節：${outlineNames || "依附上的範本為準"}`,
    },
    generate: {
      number: "STEP 02",
      label: "產生文件",
      title: "依範本整理成可交付草稿",
      goal: "只整理已知資訊，讓缺口保持可見，也讓下一個角色能接手。",
      text: `根據我的原始素材與釐清回答，依附上的輕量範本產出「${title}」草稿。

規則：
1. 只使用我提供或確認過的資訊。
2. 缺少證據或答案時寫 TODO／待決策，不得自行補成事實。
3. 保留範本章節與必要欄位；不適用時說明原因。
4. 重要結論標示來源；推論標示信心程度。
5. 只輸出可直接保存的 Markdown 文件。`,
    },
    review: {
      number: "STEP 03",
      label: "審查結果",
      title: "找出會阻擋交棒的問題",
      goal: "先看文件能不能被使用，再決定要不要改寫。",
      text: `請審查我的「${title}」。不要直接重寫全文。

先依嚴重度列出問題。每項包含：
- 對應章節
- 為何會阻擋後續決策、實作或驗收
- 缺少的資訊
- 一個具體修改建議

無來源的數字、角色、需求或決策一律標成「未經確認」，不要替我合理化。`,
    },
  }), [outlineNames, title]);

  const selectedPrompt = prompts[promptStep];
  const artifactText = artifactView === "full"
    ? content.fullTemplate
    : artifactView === "example"
      ? content.example ?? ""
      : content.template;

  const flashCopied = (key: string, ok: boolean) => {
    setCopyState(ok ? key : "failed");
    window.setTimeout(() => setCopyState(""), 1800);
  };

  const copyArtifact = async () => {
    flashCopied(`artifact-${artifactView}`, await copyText(artifactText));
  };

  const copyPractice = async () => {
    if (!practiceMaterial) return;
    flashCopied("practice", await copyText(practiceMaterial));
  };

  const copyPrompt = async () => {
    const additions = [
      practiceMaterial
        ? `## 我的素材\n\n${practiceMaterial}`
        : "## 我的素材\n\n[在這裡貼上你的想法、上游文件或練習素材]",
      promptStep === "generate" ? `## 輕量範本\n\n${content.template}` : "",
      promptStep === "review"
        ? `## 驗收清單\n\n${REVIEW_ITEMS.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n## 待審查文件\n\n[在這裡貼上 AI 產出的文件]`
        : "",
    ].filter(Boolean);
    flashCopied(`prompt-${promptStep}`, await copyText(`${selectedPrompt.text}\n\n${additions.join("\n\n")}`));
  };

  const updatePractice = (field: PracticeField, value: string) => {
    setPractice((current) => ({ ...current, [field]: value }));
  };

  const toggleCheck = (index: number) => {
    setChecked((current) => current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index]);
  };

  return (
    <div className="learning-demo">
      <section className="lesson-intro" id="learn-why">
        <p className="lesson-kicker">SDLC 實作課 · 交付物練習</p>
        <h2>先理解這份文件替你消除什麼不確定</h2>
        <p className="lesson-lead">{hook}</p>
        {content.problem.length > 0 && (
          <div className="lesson-problem">
            {content.problem.map((line) => <p key={line}>{line}</p>)}
          </div>
        )}
        {(content.roles.length > 0 || content.timing.length > 0) && (
          <div className="lesson-context">
            <div>
              <span>OWNER & HANDOFF</span>
              <h3>誰負責、交給誰</h3>
              {content.roles.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div>
              <span>WHEN TO USE</span>
              <h3>何時值得做</h3>
              <div className="context-status-list">
                {content.timing.map((item) => (
                  <div className="context-status" key={`${item.label}-${item.text}`}>
                    <span className={`context-stamp context-stamp-${item.tone}`}>{item.label}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="lesson-contract" aria-label="本課學習目標">
          <div><span>看懂</span><strong>{content.outline.length} 段骨架</strong><small>知道每段要留下哪一種判斷</small></div>
          <div><span>看會</span><strong>{content.example ? "SmartTrip 案例" : "雙版本範本"}</strong><small>{content.example ? "對照真實素材如何形成結論" : "先用輕量版練習，再讀完整版"}</small></div>
          <div><span>做出</span><strong>自己的草稿</strong><small>手動貼到 Claude Code、Codex 或其他 Agent</small></div>
        </div>
        <ol className="lesson-flow" aria-label="學習流程">
          {[
            ["01", "讀大綱"],
            ["02", content.example ? "看案例" : "比範本"],
            ["03", "填素材"],
            ["04", "貼提示詞"],
            ["05", "對照驗收"],
          ].map(([number, label]) => (
            <li key={number}><span>{number}</span>{label}</li>
          ))}
        </ol>
      </section>

      <section id="learn-outline">
        <p className="lesson-kicker">Anatomy · 文件解剖</p>
        <h2>輕量版先回答 {content.outline.length} 個核心章節</h2>
        <p>章節名稱可以因團隊調整，但每一段要求的判斷不能被省略。先讀問題，再看格式。</p>
        <ol className="outline-list">
          {content.outline.map((item) => (
            <li key={`${item.id}-${item.title}`}>
              <span className="outline-id">{item.id}</span>
              <div className="outline-copy">
                <h3>{item.title}</h3>
                <p>範本必要章節</p>
              </div>
              <p className="outline-result">{item.guidance}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="learn-example">
        <p className="lesson-kicker">Study · 對照學習</p>
        <h2>同一份交付物，先練核心，再看完整深度</h2>
        <p>輕量範本適合第一次練習與 MVP；完整範本保留跨職能交棒需要的細節。兩者都要求未知事項保持可見。</p>
        {!content.example && (
          <div className="case-status" role="status">
            <strong>SmartTrip 實例待補</strong>
            <p>這張卡目前提供已審定的輕量與完整範本；不以 AI 臨時生成的內容冒充實際案例。</p>
          </div>
        )}
        <div className="artifact-workbench">
          <div className="artifact-toolbar">
            <div className="artifact-tabs" role="tablist" aria-label={`切換 ${title} 範本與案例`}>
              <button type="button" role="tab" aria-selected={artifactView === "template"} onClick={() => setArtifactView("template")}>輕量範本</button>
              <button type="button" role="tab" aria-selected={artifactView === "full"} onClick={() => setArtifactView("full")}>完整範本</button>
              <button
                type="button"
                role="tab"
                aria-selected={artifactView === "example"}
                disabled={!content.example}
                onClick={() => setArtifactView("example")}
              >
                {content.example ? "SmartTrip 案例" : "案例待補"}
              </button>
            </div>
            <button type="button" className="copy-command" onClick={copyArtifact}>
              {copyState === `artifact-${artifactView}` ? "已複製" : artifactView === "example" ? "複製案例" : "複製範本"}
            </button>
          </div>
          <div className="artifact-caption">
            <span>{artifactView === "template" ? "LIGHT TEMPLATE" : artifactView === "full" ? "FULL TEMPLATE" : "WORKED EXAMPLE"}</span>
            <p>{artifactView === "template" ? "30 分鐘內先完成核心章節。" : artifactView === "full" ? "需要正式交棒時，再擴充到完整深度。" : "這是工作坊實例；重點是判斷如何連回素材與限制。"}</p>
          </div>
          <pre className="learning-code"><code>{artifactText}</code></pre>
        </div>
      </section>

      <section id="learn-practice">
        <p className="lesson-kicker">Practice · 換你試做</p>
        <h2>先用自己的話交代素材，不需要先學會工程術語</h2>
        <p>確定的就寫，不確定的留白。下一步要做的是請 Agent 找缺口，不是讓它替你猜一套合理答案。</p>
        <div className="practice-sheet">
          {PRACTICE_FIELDS.map((field) => (
            <div className={`practice-field${field.wide ? " practice-wide" : ""}`} key={field.key}>
              <label htmlFor={`practice-${field.key}`}><span>{field.number}</span>{field.label}</label>
              <textarea
                id={`practice-${field.key}`}
                value={practice[field.key]}
                onChange={(event) => updatePractice(field.key, event.target.value)}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div className="practice-actions">
            <p>{practiceMaterial ? "這些內容會自動附在下一區複製的提示詞後面。" : "可以先留白；複製提示詞後再到 Coding Agent 裡補充。"}</p>
            <button type="button" onClick={copyPractice} disabled={!practiceMaterial}>
              {copyState === "practice" ? "已複製" : "複製我的練習素材"}
            </button>
          </div>
        </div>
      </section>

      <section id="learn-prompts">
        <p className="lesson-kicker">AI Practice · 手動三步</p>
        <h2>先問、再寫、最後審，不把整條流程鎖死</h2>
        <p>每一步都是獨立工作包。你可以停下補資料、修改限制或重做某一步，不需要服從固定的 Agent 接力流程。</p>
        <div className="prompt-workbench">
          <div className="prompt-step-list" role="tablist" aria-label={`${title} 提示詞步驟`}>
            {(Object.keys(prompts) as PromptStep[]).map((key) => {
              const step = prompts[key];
              return (
                <button type="button" role="tab" aria-selected={promptStep === key} key={key} onClick={() => setPromptStep(key)}>
                  <span>{step.number}</span>
                  <strong>{step.label}</strong>
                </button>
              );
            })}
          </div>
          <div className="prompt-stage">
            <div className="prompt-stage-head">
              <div>
                <span>{selectedPrompt.number}</span>
                <h3>{selectedPrompt.title}</h3>
                <p>{selectedPrompt.goal}</p>
              </div>
              <button type="button" className="copy-command" onClick={copyPrompt}>
                {copyState === `prompt-${promptStep}` ? "已複製" : promptStep === "generate" ? "複製提示詞 + 範本" : "複製提示詞"}
              </button>
            </div>
            <pre className="learning-code"><code>{selectedPrompt.text}</code></pre>
            <p className="prompt-note">
              {practiceMaterial ? "已附上你剛才填寫的練習素材。" : "複製後，請在標示位置貼上自己的素材。"}
              {promptStep === "review" ? " 驗收清單也會一起複製。" : ""}
            </p>
          </div>
        </div>
      </section>

      <section id="learn-check">
        <p className="lesson-kicker">Review · 自己驗收</p>
        <h2>文件存在，不代表下一個角色真的能使用</h2>
        <p>逐條檢查 Agent 的輸出。人類負責需求、限制與驗收，也必須能說明重要結論從哪裡來。</p>
        <div className="review-sheet">
          <div className="review-progress" aria-live="polite">
            <span>CHECKED</span>
            <strong>{checked.length} / {REVIEW_ITEMS.length}</strong>
          </div>
          <div className="review-items">
            {REVIEW_ITEMS.map((item, index) => (
              <label key={item}>
                <input type="checkbox" checked={checked.includes(index)} onChange={() => toggleCheck(index)} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="lesson-next">
          <div>
            <span>NEXT HANDOFF</span>
            <h3>{next ? `帶著這份文件，繼續到「${next.title}」` : "回到交付物地圖，選擇下一個缺口"}</h3>
            <p>{next ? "下一張卡會接住新的決策問題；不用一次把整條 SDLC 全做完。" : "依目前產品最大的未知，回到地圖挑選下一份真正需要的文件。"}</p>
          </div>
          <Link href={next ? `/deliverables/${next.slug}/` : "/deliverables/"}>
            {next ? "前往下一張卡" : "回到交付物總覽"} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {copyState === "failed" && <p className="copy-error" role="status">瀏覽器未允許複製，請直接選取文字。</p>}
    </div>
  );
}
