"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ArtifactView = "template" | "example";
type PromptStep = "clarify" | "generate" | "review";
type PracticeField = "idea" | "user" | "problem" | "constraints" | "done";

const OUTLINE = [
  {
    id: "01",
    title: "問題",
    question: "誰在什麼情況下，遇到什麼麻煩？",
    result: "團隊知道為什麼值得做，而不是先討論功能。",
  },
  {
    id: "02",
    title: "目標",
    question: "做完後，使用者或產品要改善什麼？",
    result: "留下可觀察的成功標準，避免只寫『體驗更好』。",
  },
  {
    id: "03",
    title: "使用者與情境",
    question: "這次優先服務誰？他什麼時候會使用？",
    result: "AI 不需要猜測所有人都可能想要什麼。",
  },
  {
    id: "04",
    title: "範圍與非目標",
    question: "這一版做什麼，又明確不做什麼？",
    result: "控制 MVP 邊界，讓新需求有地方安放。",
  },
  {
    id: "05",
    title: "需求",
    question: "產品必須提供哪些使用者可感受到的行為？",
    result: "將想法拆成可排序、可追蹤的需求。",
  },
  {
    id: "06",
    title: "驗收提示",
    question: "看到什麼結果，才知道這條需求完成？",
    result: "提供 QA 與下一份 Acceptance Criteria 的入口。",
  },
  {
    id: "07",
    title: "尚未確認",
    question: "哪些資訊仍不足，現在不能假裝已經決定？",
    result: "讓未知保持可見，不讓 AI 用合理文字偷偷補完。",
  },
];

const BLANK_TEMPLATE = `# Product Requirements: <產品名稱>

**狀態：** Draft · **負責人：** <姓名> · **更新日期：** YYYY-MM-DD

## 1. 問題

<誰，在什麼情況下，遇到什麼具體問題？>

## 2. 目標

- G1：<希望改善的結果>；以 <量測方式與門檻> 判定。

## 3. 使用者與情境

- 主要使用者：<這一版優先服務誰>
- 使用情境：<何時、為什麼會使用>

## 4. 範圍

### 這一版要做

- <MVP 必須包含的能力>

### 這一版不做

- <明確排除的能力>：<原因>

## 5. 需求

### REQ-001：<需求名稱>

- 使用者行為：<使用者要完成什麼>
- 預期結果：<產品要呈現什麼結果>
- 來源：<痛點、訪談或已確認決策>

## 6. 驗收提示

- REQ-001 完成時，可以觀察到：<可驗證結果>

## 7. 尚未確認

- OPEN-001：<仍缺什麼資訊>；需要 <誰或哪份證據> 回答。`;

const SMARTTRIP_EXAMPLE = `# Product Requirements: SmartTrip FX

**狀態：** Draft · **負責人：** PM · **更新日期：** 2026-05-29

## 1. 問題

台灣自由行旅客不知道該換多少現金、哪些店只收現金，也無法判斷現在是否適合換匯。現有行程工具多半只排行程，沒有處理旅途中真正的用錢決策。

## 2. 目標

- G1：讓旅客在 3 分鐘內取得建議換匯額。
- G2：有記錄開支的行程中，實際現金花費與建議值誤差小於 15% 的比例達 60%。

## 3. 使用者與情境

- 主要使用者：一年出國 1 至 4 次、預算敏感的自由行旅客。
- 使用情境：出發前規劃預算與換匯，旅途中記錄現金開支。

## 4. 範圍

### 這一版要做

- 依目的地、天數與預算產生三種行程方案。
- 顯示建議換匯現金額與每個活動的付款方式。
- 儲存行程並記錄實際開支。

### 這一版不做

- 帳號與雲端同步：先維持免登入、即開即用。
- 多人分帳：本次只驗證單人換匯與開支問題。

## 5. 需求

### REQ-001：顯示建議換匯額

- 使用者行為：輸入目的地、日期與預算後產生方案。
- 預期結果：看到建議攜帶的外幣現金與台幣約當值。
- 來源：旅客訪談中反覆出現「不知道該換多少」的痛點。

## 6. 驗收提示

- 必填資料完整時，3 分鐘內可取得三種方案與建議換匯額。
- 匯率來源失敗時，畫面必須明確標示資料不可用，不得假裝是真實匯率。

## 7. 尚未確認

- OPEN-001：即時匯率資料源的額度與費用；需要技術研究回答。
- OPEN-002：匿名分析是否需要額外同意；需要 PM 與法務確認。`;

const PROMPTS: Record<PromptStep, { number: string; label: string; title: string; goal: string; text: string }> = {
  clarify: {
    number: "STEP 01",
    label: "先釐清",
    title: "先問，不要急著代寫",
    goal: "把會改變產品範圍、使用行為或驗收方式的未知找出來。",
    text: `我正在練習把產品想法整理成 PRD。以下是我的產品素材。

先不要產出 PRD，也不要討論技術架構。

請先找出會影響「服務誰、解決什麼、這一版做什麼、怎樣算完成」的未知事項。一次只問最多 5 題，並簡短說明每題會影響哪個決策。

已經有明確答案的事情不要重問；可以延後決定的技術細節先放入「尚未確認」。`,
  },
  generate: {
    number: "STEP 02",
    label: "產生文件",
    title: "依同一份大綱寫出草稿",
    goal: "讓自己的文件與案例使用相同骨架，方便逐段比較。",
    text: `根據我的原始產品素材、我對釐清問題的回答，以及下方 PRD 範本，產出一份繁體中文 PRD 草稿。

規則：
1. 只能使用我已提供或確認的資訊。
2. 沒有答案的事項放入「尚未確認」，不得自行補成決策。
3. 需求描述使用者可感受到的行為，不指定框架、資料庫或程式寫法。
4. 每條需求都要有來源與可觀察的驗收提示。
5. 保留範本的七段結構。`,
  },
  review: {
    number: "STEP 03",
    label: "審查結果",
    title: "先指出問題，再決定怎麼改",
    goal: "學會判斷文件是否真的能交給下一個角色使用。",
    text: `請依下方檢查標準審查我的 PRD。

不要直接重寫全文。先依嚴重度列出問題，每項包含：對應段落、為何會阻擋後續設計或驗收、需要補充的資訊，以及一個具體修改建議。

若文件中的數字、人物、需求或決策沒有可追溯來源，請明確標示為「未經確認」，不要替我合理化。`,
  },
};

const RUBRIC = [
  "問題段明確寫出使用者、情境與痛點，不是功能清單。",
  "每個目標都有可觀察的結果或量測方式。",
  "這一版要做與不做的邊界沒有互相矛盾。",
  "每條需求都能回到一個已知痛點或確認過的決策。",
  "驗收提示描述可看到的結果，沒有使用『順暢、合理、好用』等主觀字眼。",
  "資訊不足的地方留在尚未確認，沒有被 AI 寫成既定事實。",
];

const EMPTY_PRACTICE: Record<PracticeField, string> = {
  idea: "",
  user: "",
  problem: "",
  constraints: "",
  done: "",
};

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function PrdLearningDemo() {
  const [artifactView, setArtifactView] = useState<ArtifactView>("template");
  const [promptStep, setPromptStep] = useState<PromptStep>("clarify");
  const [practice, setPractice] = useState(EMPTY_PRACTICE);
  const [checked, setChecked] = useState<number[]>([]);
  const [copyState, setCopyState] = useState<string>("");

  const practiceMaterial = useMemo(() => {
    const values = Object.values(practice).some((value) => value.trim());
    if (!values) return "";
    return `# 我的產品練習素材

- 一句話想法：${practice.idea || "尚未填寫"}
- 優先使用者：${practice.user || "尚未填寫"}
- 想解決的問題：${practice.problem || "尚未填寫"}
- 已知限制：${practice.constraints || "尚未填寫"}
- 我認為完成的樣子：${practice.done || "尚未填寫"}`;
  }, [practice]);

  const flashCopied = (key: string, ok: boolean) => {
    setCopyState(ok ? key : "failed");
    window.setTimeout(() => setCopyState(""), 1800);
  };

  const copyArtifact = async () => {
    const key = artifactView === "template" ? "template" : "example";
    flashCopied(key, await copyText(artifactView === "template" ? BLANK_TEMPLATE : SMARTTRIP_EXAMPLE));
  };

  const copyPrompt = async () => {
    const selected = PROMPTS[promptStep];
    const additions = [
      practiceMaterial ? `## 我的產品素材\n\n${practiceMaterial}` : "## 我的產品素材\n\n[請在這裡貼上你的產品想法或練習素材]",
      promptStep === "generate" ? `## PRD 範本\n\n${BLANK_TEMPLATE}` : "",
      promptStep === "review" ? `## 檢查標準\n\n${RUBRIC.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n## 待審查 PRD\n\n[請貼上 AI 產出的 PRD]` : "",
    ].filter(Boolean);
    const value = `${selected.text}\n\n${additions.join("\n\n")}`;
    flashCopied(`prompt-${promptStep}`, await copyText(value));
  };

  const copyPractice = async () => {
    if (!practiceMaterial) return;
    flashCopied("practice", await copyText(practiceMaterial));
  };

  const updatePractice = (field: PracticeField, value: string) => {
    setPractice((current) => ({ ...current, [field]: value }));
  };

  const toggleCheck = (index: number) => {
    setChecked((current) => current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index]);
  };

  const selectedPrompt = PROMPTS[promptStep];
  const artifactText = artifactView === "template" ? BLANK_TEMPLATE : SMARTTRIP_EXAMPLE;

  return (
    <div className="learning-demo">
      <section className="lesson-intro" id="learn-why">
        <p className="lesson-kicker">PRD 實作課 · Demo</p>
        <h2>先別急著叫 AI 寫文件</h2>
        <p className="lesson-lead">
          PRD 不是功能願望清單。它先把「為什麼做、替誰做、這次做到哪裡」講清楚，讓設計、工程與 QA 不必各自猜一次。
        </p>
        <div className="lesson-contract" aria-label="本課學習目標">
          <div><span>看懂</span><strong>七段大綱</strong><small>知道每段在消除哪種不確定</small></div>
          <div><span>看會</span><strong>一份案例</strong><small>用 SmartTrip 對照空白範本</small></div>
          <div><span>做出</span><strong>自己的草稿</strong><small>手動貼到 Coding Agent 練習</small></div>
        </div>
        <ol className="lesson-flow" aria-label="學習流程">
          {[
            ["01", "讀大綱"],
            ["02", "看案例"],
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
        <h2>一份 PRD，先回答七個問題</h2>
        <p>先看每段要留下什麼決策，再看格式。格式可以調整，這七類問題不能被漂亮文字掩蓋。</p>
        <ol className="outline-list">
          {OUTLINE.map((item) => (
            <li key={item.id}>
              <span className="outline-id">{item.id}</span>
              <div className="outline-copy">
                <h3>{item.title}</h3>
                <p>{item.question}</p>
              </div>
              <p className="outline-result">{item.result}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="learn-example">
        <p className="lesson-kicker">Study · 對照學習</p>
        <h2>同一份骨架：先看挖空，再看成品</h2>
        <p>範本與案例維持相同七段結構。先讀 SmartTrip 為什麼這樣填，再把同一個問題換成自己的答案。</p>
        <div className="artifact-workbench">
          <div className="artifact-toolbar">
            <div className="artifact-tabs" role="tablist" aria-label="切換 PRD 範本與案例">
              <button
                type="button"
                role="tab"
                aria-selected={artifactView === "template"}
                onClick={() => setArtifactView("template")}
              >
                空白範本
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={artifactView === "example"}
                onClick={() => setArtifactView("example")}
              >
                SmartTrip 案例
              </button>
            </div>
            <button type="button" className="copy-command" onClick={copyArtifact}>
              {copyState === (artifactView === "template" ? "template" : "example") ? "已複製" : artifactView === "template" ? "複製範本" : "複製案例"}
            </button>
          </div>
          <div className="artifact-caption">
            <span>{artifactView === "template" ? "PRACTICE TEMPLATE" : "WORKED EXAMPLE"}</span>
            <p>{artifactView === "template" ? "保留問題，換成你自己的答案。" : "案例不是標準答案；注意每個結論如何連回問題與限制。"}</p>
          </div>
          <pre className="learning-code"><code>{artifactText}</code></pre>
        </div>
      </section>

      <section id="learn-practice">
        <p className="lesson-kicker">Practice · 換你試做</p>
        <h2>先用人話寫素材，不用先學工程術語</h2>
        <p>這不是 PRD 本身，只是你要交給 Coding Agent 的原始材料。能確定的就寫，不確定的留白，讓下一步的提問把它找出來。</p>
        <div className="practice-sheet">
          <div className="practice-field">
            <label htmlFor="practice-idea"><span>01</span>一句話想法</label>
            <textarea id="practice-idea" value={practice.idea} onChange={(event) => updatePractice("idea", event.target.value)} placeholder="例：幫自由行旅客算出該帶多少現金的工具" />
          </div>
          <div className="practice-field">
            <label htmlFor="practice-user"><span>02</span>最優先服務的人</label>
            <textarea id="practice-user" value={practice.user} onChange={(event) => updatePractice("user", event.target.value)} placeholder="不要寫所有人；描述一種具體使用者" />
          </div>
          <div className="practice-field practice-wide">
            <label htmlFor="practice-problem"><span>03</span>他現在遇到的問題</label>
            <textarea id="practice-problem" value={practice.problem} onChange={(event) => updatePractice("problem", event.target.value)} placeholder="描述他做了什麼、卡在哪裡，以及造成什麼後果" />
          </div>
          <div className="practice-field">
            <label htmlFor="practice-constraints"><span>04</span>已知限制</label>
            <textarea id="practice-constraints" value={practice.constraints} onChange={(event) => updatePractice("constraints", event.target.value)} placeholder="例：四週內、免登入、不處理付款" />
          </div>
          <div className="practice-field">
            <label htmlFor="practice-done"><span>05</span>完成時看得到什麼</label>
            <textarea id="practice-done" value={practice.done} onChange={(event) => updatePractice("done", event.target.value)} placeholder="寫可以觀察或測試的結果" />
          </div>
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
        <h2>不要一次叫 AI 包辦：先問、再寫、最後審</h2>
        <p>三段提示詞刻意分開。每一步都把結果留在 Claude Code、Codex 或你使用的 Coding Agent 裡，再由你決定是否進到下一步。</p>
        <div className="prompt-workbench">
          <div className="prompt-step-list" role="tablist" aria-label="PRD 提示詞步驟">
            {(Object.keys(PROMPTS) as PromptStep[]).map((key) => {
              const step = PROMPTS[key];
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={promptStep === key}
                  key={key}
                  onClick={() => setPromptStep(key)}
                >
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
              {practiceMaterial ? "已附上你剛才填寫的練習素材。" : "複製後，請在標示位置貼上自己的產品素材。"}
              {promptStep === "review" ? " 審查用檢查標準也會一起複製。" : ""}
            </p>
          </div>
        </div>
      </section>

      <section id="learn-check">
        <p className="lesson-kicker">Review · 自己驗收</p>
        <h2>文件寫完，不代表問題已經說清楚</h2>
        <p>逐條檢查 AI 產出的 PRD。你必須能指出每個答案從哪裡來，也必須看得出還有哪些事情沒有答案。</p>
        <div className="review-sheet">
          <div className="review-progress" aria-live="polite">
            <span>CHECKED</span>
            <strong>{checked.length} / {RUBRIC.length}</strong>
          </div>
          <div className="review-items">
            {RUBRIC.map((item, index) => (
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
            <h3>把「怎樣算完成」寫得可測試</h3>
            <p>PRD 留下高層次驗收提示；下一張卡再把它拆成 Given / When / Then。</p>
          </div>
          <Link href="/deliverables/acceptance-criteria/">前往 Acceptance Criteria <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {copyState === "failed" && <p className="copy-error" role="status">瀏覽器未允許複製，請直接選取文字。</p>}
    </div>
  );
}
