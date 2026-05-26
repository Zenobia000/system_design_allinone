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

> 本檔是後續 15 張卡的「上游輸入」。
> 當任何 prompt 要求 \`[使用者訪談紀錄]\`、\`[業務脈絡]\`、\`[JTBD 卡]\` 時，把整份本文件貼上去。

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

產出時間：${timestamp}
對應教學範例：SmartTrip FX（見 \`demo/種子簡報.md\`）
產出工具：Launch Atlas · /start/
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
