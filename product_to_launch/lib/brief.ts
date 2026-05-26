export interface BriefAnswers {
  audience: string;
  painPoint: string;
  expectedOutcome: string;
  constraints: string;
  successMetric: string;
}

export const BRIEF_QUESTIONS: ReadonlyArray<{
  key: keyof BriefAnswers;
  label: string;
  helper: string;
  placeholder: string;
}> = [
  {
    key: "audience",
    label: "你想幫助的人是誰？",
    helper: "用一句話。寫得越具體越好（職業、年齡、處境）。",
    placeholder: "例：需要跨國出差但常算錯費用的 25-40 歲上班族",
  },
  {
    key: "painPoint",
    label: "他們現在卡在什麼地方？",
    helper: "說一個你親眼見過的場景，不是抽象的問題。",
    placeholder: "例：Excel 算到一半幣別搞混，回報常被退；換太多回國虧匯差",
  },
  {
    key: "expectedOutcome",
    label: "問題解決後，他們的生活/工作有什麼具體改變？",
    helper: "用「能夠 ... 而不再 ...」的句型最清楚。",
    placeholder: "例：3 分鐘內算完一週外幣總和，零錯誤回報；不再焦慮帶多少錢",
  },
  {
    key: "constraints",
    label: "最大的一個限制是什麼？",
    helper: "時間、預算、技術、法規 任選一兩個。誠實寫，不要包裝。",
    placeholder: "例：我只有 4 週開發時間，且不能儲存信用卡號（法規）",
  },
  {
    key: "successMetric",
    label: "怎麼算成功？給一個數字。",
    helper: "「使用者覺得好用」不算。一定要可量化、可量測。",
    placeholder: "例：100 位試用者裡 70 位每週用 ≥ 1 次",
  },
] as const;

export const BRIEF_STORAGE_KEY = "workshop:brief";
export const BRIEF_FILENAME = "project-brief.md";

export function formatBriefMarkdown(answers: BriefAnswers, now: Date = new Date()): string {
  const timestamp = now.toISOString().slice(0, 16).replace("T", " ");
  return `# 專案種子簡報（v1）

> **這是什麼**：5 題問卷產出的專案 baseline，承載「目標受眾 / 痛點 / 期望成果 / 約束 / 指標」5 段。
>
> **怎麼用**：後續 15 張卡的 trigger「上游文件」貼位區，若該卡的上游 deliverable 還沒做（例如還沒寫 JTBD 就要做 PRD），可從本檔對應段落取用代替，**但必須在 AI 自檢時誠實標 \`[L]\` confidence + \`（依據：brief §段名）\` + 列為 highest-value next input**。
>
> **不能做的事**：brief **不能取代**訪談逐字稿、JTBD 文件、PRD 等更具體的下游產出。當對應上游卡完成後，下游卡的 trigger 上游貼位應改用該卡的真實 markdown 輸出，而非繼續用 brief。

## 目標受眾

${answers.audience.trim() || "（未填）"}

## 待解痛點

${answers.painPoint.trim() || "（未填）"}

## 期望成果

${answers.expectedOutcome.trim() || "（未填）"}

## 主要約束

${answers.constraints.trim() || "（未填）"}

## 成功指標

${answers.successMetric.trim() || "（未填）"}

---

產出時間：${timestamp} · Launch Atlas · /start/
`;
}

export function emptyAnswers(): BriefAnswers {
  return {
    audience: "",
    painPoint: "",
    expectedOutcome: "",
    constraints: "",
    successMetric: "",
  };
}

export function isComplete(answers: BriefAnswers): boolean {
  return (Object.keys(answers) as Array<keyof BriefAnswers>).every(
    (k) => answers[k].trim().length > 0
  );
}
