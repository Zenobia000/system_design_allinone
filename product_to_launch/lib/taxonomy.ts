/**
 * Single source of truth for stages, roles, and deliverables enumeration.
 * Color mapping used across cards, tags, and section accents.
 */

export type StageSlug =
  | "discovery"
  | "define"
  | "design"
  | "build"
  | "ship"
  | "operate";

export type RoleSlug =
  | "pm"
  | "po"
  | "ba"
  | "ux"
  | "ui"
  | "sa"
  | "architect"
  | "dev"
  | "qa"
  | "devops";

export interface StageMeta {
  slug: StageSlug;
  num: string;
  title: string;
  titleEn: string;
  hook: string;
  hex: string;
}

export interface RoleMeta {
  slug: RoleSlug;
  num: string;
  title: string;
  titleEn: string;
  hook: string;
  primaryStages: StageSlug[];
  hex: string;
}

export const STAGES: StageMeta[] = [
  { slug: "discovery", num: "01", title: "探索", titleEn: "Discovery", hook: "驗證問題是否真的存在", hex: "#6dd5ed" },
  { slug: "define",    num: "02", title: "定義", titleEn: "Define",    hook: "把模糊需求變可執行規格", hex: "#ff6a1a" },
  { slug: "design",    num: "03", title: "設計", titleEn: "Design",    hook: "把規格變成可建造的藍圖", hex: "#d97757" },
  { slug: "build",     num: "04", title: "建造", titleEn: "Build",     hook: "把藍圖變成跑得起來的代碼", hex: "#8b6f47" },
  { slug: "ship",      num: "05", title: "上線", titleEn: "Ship",      hook: "讓代碼安全地走向使用者", hex: "#e54d4d" },
  { slug: "operate",   num: "06", title: "運維", titleEn: "Operate",   hook: "讓系統在凌晨三點還活著", hex: "#2e7d8c" },
];

export const ROLES: RoleMeta[] = [
  { slug: "pm",        num: "01", title: "產品經理",   titleEn: "Product Manager", hook: "決定要解決哪個問題、不解決哪個", primaryStages: ["discovery", "define"], hex: "#ff6a1a" },
  { slug: "po",        num: "02", title: "產品負責人", titleEn: "Product Owner",   hook: "在 Sprint 顆粒度上排優先級", primaryStages: ["define", "build"], hex: "#d97757" },
  { slug: "ba",        num: "03", title: "業務分析師", titleEn: "Business Analyst", hook: "把商業語言翻成系統語言", primaryStages: ["discovery", "define"], hex: "#8b6f47" },
  { slug: "ux",        num: "04", title: "UX 設計",   titleEn: "UX Designer",     hook: "確保使用者真的走得完這趟旅程", primaryStages: ["discovery", "design"], hex: "#2e7d8c" },
  { slug: "ui",        num: "05", title: "UI 設計",   titleEn: "UI Designer",     hook: "把功能變成看得懂、按得到的介面", primaryStages: ["design"], hex: "#6dd5ed" },
  { slug: "sa",        num: "06", title: "系統分析",   titleEn: "System Analyst",  hook: "在商業需求與技術可行性之間架橋", primaryStages: ["define", "design"], hex: "#e54d4d" },
  { slug: "architect", num: "07", title: "架構師",     titleEn: "Architect",       hook: "為十年後的負載做今天的取捨", primaryStages: ["design"], hex: "#ff6a1a" },
  { slug: "dev",       num: "08", title: "開發者",     titleEn: "Developer",       hook: "把藍圖變成 production code", primaryStages: ["build"], hex: "#d97757" },
  { slug: "qa",        num: "09", title: "品質工程",   titleEn: "QA Engineer",     hook: "在使用者之前找到所有 bug", primaryStages: ["build", "ship"], hex: "#8b6f47" },
  { slug: "devops",    num: "10", title: "DevOps/SRE", titleEn: "DevOps · SRE",    hook: "讓系統凌晨三點不會把人叫醒", primaryStages: ["ship", "operate"], hex: "#2e7d8c" },
];

export const STAGE_MAP: Record<StageSlug, StageMeta> = Object.fromEntries(
  STAGES.map((s) => [s.slug, s])
) as Record<StageSlug, StageMeta>;

export const ROLE_MAP: Record<RoleSlug, RoleMeta> = Object.fromEntries(
  ROLES.map((r) => [r.slug, r])
) as Record<RoleSlug, RoleMeta>;

/* ───────────────────────────────────────────────────────────────
 * Deliverable index — slug must match content/deliverables/<slug>.md
 * order 是站內顯示序號 (#01 ~ #5x)
 * ─────────────────────────────────────────────────────────────── */

export interface DeliverableIndex {
  slug: string;
  order: number;
  title: string;
  stage: StageSlug;
  roles: RoleSlug[];
}

export const DELIVERABLES: DeliverableIndex[] = [
  // — Discovery —
  { slug: "user-research",    order:  1, title: "使用者研究 · User Research", stage: "discovery", roles: ["ux", "pm"] },
  { slug: "jtbd",             order:  2, title: "JTBD · 任務驅動", stage: "discovery", roles: ["pm", "ux"] },
  { slug: "persona",          order:  3, title: "Persona · 使用者輪廓", stage: "discovery", roles: ["ux", "pm"] },
  { slug: "journey-map",      order:  4, title: "Journey Map · 旅程地圖", stage: "discovery", roles: ["ux"] },
  { slug: "competitive-scan", order:  5, title: "競品掃描 · Competitive Scan", stage: "discovery", roles: ["pm", "ba"] },
  { slug: "value-hypothesis", order:  6, title: "價值假設卡 · Value Hypothesis", stage: "discovery", roles: ["po", "pm"] },
  { slug: "north-star",       order:  7, title: "北極星指標 · North-Star Metric", stage: "discovery", roles: ["pm", "po"] },

  // — Define —
  { slug: "prd",              order:  8, title: "PRD · 產品需求文件", stage: "define", roles: ["pm"] },
  { slug: "okr",              order:  9, title: "OKR · 目標與關鍵結果", stage: "define", roles: ["pm", "po"] },
  { slug: "roadmap",          order: 10, title: "Roadmap · 產品路線圖", stage: "define", roles: ["pm"] },
  { slug: "user-story",       order: 11, title: "User Story · 使用者故事", stage: "define", roles: ["po", "ba"] },
  { slug: "acceptance-criteria", order: 12, title: "Acceptance Criteria · 驗收條件", stage: "define", roles: ["po", "qa"] },
  { slug: "srs",              order: 13, title: "SRS · 系統需求規格", stage: "define", roles: ["ba", "sa"] },
  { slug: "frd",              order: 14, title: "FRD · 功能需求文件", stage: "define", roles: ["ba", "pm"] },
  { slug: "stakeholder-map",  order: 15, title: "Stakeholder Map · 利害關係人地圖", stage: "define", roles: ["pm", "ba"] },
  { slug: "priority-matrix",  order: 16, title: "優先級矩陣 · Priority Matrix", stage: "define", roles: ["pm", "po"] },

  // — Design —
  { slug: "information-architecture", order: 17, title: "資訊架構 · IA", stage: "design", roles: ["ux", "sa"] },
  { slug: "wireframe",        order: 18, title: "Wireframe · 線框稿", stage: "design", roles: ["ux"] },
  { slug: "prototype",        order: 19, title: "Prototype · 互動原型", stage: "design", roles: ["ux", "ui"] },
  { slug: "design-system",    order: 20, title: "Design System · 設計系統", stage: "design", roles: ["ui"] },
  { slug: "high-fidelity-mockup", order: 21, title: "高保真稿 · Hi-Fi Mockup", stage: "design", roles: ["ui"] },
  { slug: "usability-test",   order: 22, title: "可用性測試 · Usability Test", stage: "design", roles: ["ux"] },
  { slug: "adr",              order: 23, title: "ADR · 架構決策紀錄", stage: "design", roles: ["architect"] },
  { slug: "c4-diagram",       order: 24, title: "C4 圖 · 四層架構視圖", stage: "design", roles: ["architect", "sa"] },
  { slug: "api-spec",         order: 25, title: "API Spec · OpenAPI 契約", stage: "design", roles: ["architect", "dev"] },
  { slug: "data-model",       order: 26, title: "Data Model · 資料模型", stage: "design", roles: ["architect", "dev"] },
  { slug: "sequence-diagram", order: 27, title: "Sequence Diagram · 時序圖", stage: "design", roles: ["sa", "architect"] },
  { slug: "tech-spike",       order: 28, title: "Tech Spike · 技術探索", stage: "design", roles: ["architect", "dev"] },
  { slug: "threat-model",     order: 29, title: "Threat Model · 威脅建模", stage: "design", roles: ["architect"] },
  { slug: "non-functional-reqs", order: 30, title: "非功能需求 · NFR / -ilities", stage: "design", roles: ["architect", "sa"] },

  // — Build —
  { slug: "coding-standard",  order: 31, title: "Coding Standard · 編碼規範", stage: "build", roles: ["dev"] },
  { slug: "pr-template",      order: 32, title: "PR Template · PR 模板", stage: "build", roles: ["dev"] },
  { slug: "code-review-checklist", order: 33, title: "Code Review Checklist", stage: "build", roles: ["dev"] },
  { slug: "unit-test",        order: 34, title: "Unit Test · 單元測試", stage: "build", roles: ["dev", "qa"] },
  { slug: "integration-test", order: 35, title: "Integration Test · 整合測試", stage: "build", roles: ["qa", "dev"] },
  { slug: "test-plan",        order: 36, title: "Test Plan · 測試計畫", stage: "build", roles: ["qa"] },
  { slug: "feature-flag",     order: 37, title: "Feature Flag · 功能旗標", stage: "build", roles: ["dev", "po"] },

  // — Ship —
  { slug: "ci-cd-pipeline",   order: 38, title: "CI/CD Pipeline · 持續交付管線", stage: "ship", roles: ["devops", "dev"] },
  { slug: "release-plan",     order: 39, title: "Release Plan · 上線計畫", stage: "ship", roles: ["po", "devops"] },
  { slug: "rollback-plan",    order: 40, title: "Rollback Plan · 回滾計畫", stage: "ship", roles: ["devops"] },
  { slug: "canary-strategy",  order: 41, title: "Canary Strategy · 灰度策略", stage: "ship", roles: ["devops"] },
  { slug: "uat",              order: 42, title: "UAT · 使用者驗收測試", stage: "ship", roles: ["qa", "po"] },
  { slug: "go-no-go-checklist", order: 43, title: "Go/No-Go Checklist · 上線檢查表", stage: "ship", roles: ["po", "devops"] },

  // — Operate —
  { slug: "slo",              order: 44, title: "SLO · 服務等級目標", stage: "operate", roles: ["devops"] },
  { slug: "error-budget",     order: 45, title: "Error Budget · 誤差預算", stage: "operate", roles: ["devops"] },
  { slug: "runbook",          order: 46, title: "Runbook · 維運手冊", stage: "operate", roles: ["devops"] },
  { slug: "incident-report",  order: 47, title: "Incident Report · 事故報告", stage: "operate", roles: ["devops"] },
  { slug: "postmortem",       order: 48, title: "Postmortem · 事後回顧", stage: "operate", roles: ["devops"] },
  { slug: "observability-spec", order: 49, title: "Observability Spec · 可觀測規格", stage: "operate", roles: ["devops", "architect"] },
  { slug: "on-call-rotation", order: 50, title: "On-Call Rotation · 值班輪值", stage: "operate", roles: ["devops"] },
  { slug: "capacity-planning", order: 51, title: "Capacity Planning · 容量規劃", stage: "operate", roles: ["devops", "architect"] },
  { slug: "cost-monitor",     order: 52, title: "Cost Monitor · 成本監控", stage: "operate", roles: ["devops"] },
  { slug: "deprecation-plan", order: 53, title: "Deprecation Plan · 廢棄計畫", stage: "operate", roles: ["architect", "po"] },
  { slug: "retro",            order: 54, title: "Retrospective · 回顧會議", stage: "operate", roles: ["pm", "po"] },
];

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function deliverablesByStage(stage: StageSlug): DeliverableIndex[] {
  return DELIVERABLES.filter((d) => d.stage === stage).sort((a, b) => a.order - b.order);
}

export function deliverablesByRole(role: RoleSlug): DeliverableIndex[] {
  return DELIVERABLES.filter((d) => d.roles.includes(role)).sort((a, b) => a.order - b.order);
}

export const SKILLS = [
  { slug: "claude-prompts", title: "Claude Prompt Pack", count: 12 },
  { slug: "templates",      title: "可帶走模板",          count: 18 },
  { slug: "decisions",      title: "Trade-off 決策樹",    count: 9 },
];
