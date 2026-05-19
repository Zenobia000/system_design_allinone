import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_building from './assets/01_building_metaphor.png';
import logoDark from '../../assets/branding/logo-dark.png';
import logoLight from '../../assets/branding/logo-light.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F1E8', text: '#2A2520', accent: '#D97757' },
  fonts: {
    display: '"Noto Serif TC", Georgia, serif',
    body: '"Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 180, body: 38 },
  radius: 8,
};

const muted = '#8B6F47';
const subtle = 'rgba(42, 37, 32, 0.55)';
const ok = '#5B9770';
const warn = '#E8634F';
const accent = '#D97757';

const animationCSS = `
@keyframes osd-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes osd-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes osd-slide-in-right { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes osd-scale-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
.osd-anim-fade-up { animation: osd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-fade-in { animation: osd-fade-in 0.6s ease-out both; }
.osd-anim-slide-right { animation: osd-slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-scale-in { animation: osd-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > * { animation: osd-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > *:nth-child(1) { animation-delay: 0.05s; }
.osd-stagger > *:nth-child(2) { animation-delay: 0.10s; }
.osd-stagger > *:nth-child(3) { animation-delay: 0.15s; }
.osd-stagger > *:nth-child(4) { animation-delay: 0.20s; }
.osd-stagger > *:nth-child(5) { animation-delay: 0.25s; }
.osd-stagger > *:nth-child(6) { animation-delay: 0.30s; }
.osd-stagger > *:nth-child(7) { animation-delay: 0.35s; }
.osd-stagger > *:nth-child(8) { animation-delay: 0.40s; }
.osd-stagger > *:nth-child(9) { animation-delay: 0.45s; }
.osd-stagger > *:nth-child(10) { animation-delay: 0.50s; }
.osd-stagger > *:nth-child(11) { animation-delay: 0.55s; }
.osd-stagger > *:nth-child(12) { animation-delay: 0.60s; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;

const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-anim-fade-up' style={{ fontSize: 24, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>
);
const Footer = ({ source }: { source: string }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 120, bottom: 56, fontSize: 17, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>
);
const PageH1 = ({ children, size = 52 }: { children: React.ReactNode; size?: number }) => (
  <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px', animationDelay: '0.1s' }}>{children}</h1>
);

const ChapterDivider = ({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) => (
  <>
    <AnimStyle />
    <div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
      <div style={{ padding: '0 100px' }}>
        <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
        <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 130, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
        {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 42, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245, 241, 232, 0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
      </div>
      {image ? <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 40, animationDelay: '0.2s' }}><img src={image} alt='' style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /></div> : null}
    <BrandBar light />
      </div>
  </>
);

const SectionEnd = ({ title, subtitle, next }: { title: string; subtitle?: string; next?: string }) => (
  <>
    <AnimStyle />
    <div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 130, fontWeight: 800, margin: 0 }}>{title}</h1>
      {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 44, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245, 241, 232, 0.85)', animationDelay: '0.15s' }}>{subtitle}</h2> : null}
      {next ? <p className='osd-anim-fade-up' style={{ fontSize: 30, marginTop: 56, color: '#F5F1E8', opacity: 0.9, animationDelay: '0.3s' }}>→ {next}</p> : null}
    <BrandBar light />
      </div>
  </>
);

const PromptBlock = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-anim-fade-up' style={{ background: '#2A2520', color: '#F5F1E8', padding: '18px 24px', borderRadius: 8, fontFamily: 'IBM Plex Mono, Menlo, monospace', fontSize: 17, lineHeight: 1.55, whiteSpace: 'pre-wrap', animationDelay: '0.2s' }}>{children}</div>
);

const Table = ({ cols, head, rows }: { cols: string; head: string[]; rows: string[][] }) => (
  <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: cols, gap: 3, fontSize: 18, lineHeight: 1.5 }}>
    {head.map((h, i) => <div key={`h-${i}`} style={{ fontWeight: 700, color: accent, padding: '10px 14px' }}>{h}</div>)}
    {rows.map((row, i) => row.map((cell, j) => (
      <div key={`r-${i}-${j}`} style={{ padding: '10px 14px', borderTop: '1px solid rgba(139,111,71,0.25)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</div>
    )))}
  </div>
);


// ===== PAGE CHROME =====
const Breadcrumb = ({ part, chapter, section }: { part: string; chapter: string; section?: string }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', top: 24, left: 80, fontSize: 13, color: muted, letterSpacing: '0.08em' }}>
    {part} <span style={{ opacity: 0.4, margin: '0 8px' }}>›</span> {chapter}{section ? <> <span style={{ opacity: 0.4, margin: '0 8px' }}>›</span> {section}</> : null}
  </div>
);
const PageNum = ({ n, total }: { n: number; total: number }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', top: 24, right: 80, fontSize: 13, color: muted, fontVariantNumeric: 'tabular-nums' }}>
    {String(n).padStart(2, '0')} <span style={{ opacity: 0.4 }}>/</span> {String(total).padStart(2, '0')}
  </div>
);
const BrandBar = ({ light = false }: { light?: boolean }) => {
  const fg = light ? 'rgba(245, 241, 232, 0.85)' : '#2A2520';
  const sub = light ? 'rgba(245, 241, 232, 0.5)' : muted;
  const logoSrc = light ? logoLight : logoDark;
  return (
    <div className='osd-anim-fade-in' style={{ position: 'absolute', bottom: 18, left: 80, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', animationDelay: '0.5s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={logoSrc} alt='' style={{ height: 24, opacity: 0.9 }} />
        <div style={{ fontSize: 12, lineHeight: 1.25 }}>
          <div style={{ fontWeight: 700, color: fg, letterSpacing: '0.02em' }}>桑尼資料科學</div>
          <div style={{ fontSize: 9, color: sub, letterSpacing: '0.20em' }}>SUNNY DATA SCIENCE</div>
        </div>
      </div>
      <div style={{ fontSize: 10, color: sub, letterSpacing: '0.08em' }}>© 2026 SunnyDS · 版權所有 翻譯必究 · CONFIDENTIAL</div>
    </div>
  );
};
const Mantra = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-anim-fade-up' style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 18px', background: 'rgba(217, 119, 87, 0.10)', borderLeft: `4px solid ${accent}`, borderRadius: 6, fontSize: 17, color: accent, fontWeight: 600, animationDelay: '0.4s' }}>
    <span style={{ fontSize: 15, opacity: 0.85 }}>💡 心法</span>
    <span style={{ color: '#2A2520' }}>{children}</span>
  </div>
);
const ThreeTakeaways = ({ chapter, lines }: { chapter: string; lines: string[] }) => (
  <><AnimStyle />
    <div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, opacity: 0.75, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{chapter} · 三句帶走</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 800, margin: '28px 0 56px', animationDelay: '0.1s' }}>記住這三句</h1>
      <div className='osd-stagger'>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.4, marginBottom: 16, display: 'flex', alignItems: 'baseline' }}>
            <span style={{ opacity: 0.5, marginRight: 24, fontSize: 32 }}>0{i + 1}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <BrandBar light />
    </div>
  </>
);

// === Role profile component (used for 9 role pages) ===
const RoleProfile = ({ role, num, metaphor, oneliner, outputs, judgments, deeper }: {
  role: string; num: number; metaphor: string; oneliner: string;
  outputs: string; judgments: string[]; deeper: string;
}) => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px 90px', position: 'relative' }}>
      <Kicker>ROLE {num} · {metaphor}</Kicker>
      <PageH1 size={56}>{role}</PageH1>
      <div className='osd-anim-fade-up' style={{ fontSize: 28, fontStyle: 'italic', color: muted, marginBottom: 28, animationDelay: '0.15s' }}>{oneliner}</div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, lineHeight: 1.7, marginBottom: 22, animationDelay: '0.2s' }}>
        <strong style={{ color: accent }}>經典產出</strong>：{outputs}
      </div>
      <div className='osd-anim-fade-up' style={{ animationDelay: '0.3s' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: accent, marginBottom: 8 }}>判斷力核心</div>
        <ul style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24, margin: 0 }}>
          {judgments.map((j) => <li key={j}>{j}</li>)}
        </ul>
      </div>
      <div className='osd-anim-fade-in' style={{ position: 'absolute', bottom: 70, left: 100, right: 100, fontSize: 15, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>{deeper}</div>
      <Breadcrumb part='Part 0' chapter='Ch.01 SDLC 全景' section={`Role ${num} · ${role.split(' ')[0]}`} />
      <PageNum n={5 + num} total={17} />
      <BrandBar />
    </div>
  </>
);

const RoleAICollab = ({ promptTitle, promptBody, strong, weak, trap }: {
  promptTitle: string; promptBody: string; strong: string; weak: string; trap: string;
}) => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>AI 協作模式</Kicker>
      <PageH1 size={42}>{promptTitle}</PageH1>
      <div style={{ marginBottom: 24 }}>
        <PromptBlock>{promptBody}</PromptBlock>
      </div>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, fontSize: 18, lineHeight: 1.55 }}>
        <div style={{ background: 'rgba(91, 151, 112, 0.10)', borderLeft: `4px solid ${ok}`, padding: '14px 18px', borderRadius: 6 }}>
          <strong style={{ color: ok }}>AI 強</strong><br/>{strong}
        </div>
        <div style={{ background: 'rgba(232, 99, 79, 0.10)', borderLeft: `4px solid ${warn}`, padding: '14px 18px', borderRadius: 6 }}>
          <strong style={{ color: warn }}>AI 弱</strong><br/>{weak}
        </div>
        <div style={{ background: 'rgba(217, 119, 87, 0.10)', borderLeft: `4px solid ${accent}`, padding: '14px 18px', borderRadius: 6 }}>
          <strong style={{ color: accent }}>陷阱</strong><br/>{trap}
        </div>
      </div>
      <Footer source='_source/braindump.md · §AI 取代不了的核心判斷' />
    </div>
  </>
);

// === P01 Chapter divider ===
const P01: Page = () => <ChapterDivider eyebrow='CHAPTER · 01' title='SDLC 全景速覽' subtitle='9 角色 × AI 可代勞矩陣' image={img_building} />;

// === P02 Building metaphor ===
const P02: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'center', position: 'relative' }}>
      <div style={{ padding: '60px 80px' }}>
        <Kicker>METAPHOR · 蓋大樓</Kicker>
        <PageH1>軟體開發 = 蓋一棟大樓</PageH1>
        <Table cols='40px 130px 200px 1fr' head={['#', '角色', '蓋樓對應', '一句話']} rows={[
          ['1', 'PM', '建案企劃', '決定蓋什麼、賣給誰'],
          ['2', 'UX/UI', '室內設計', '設計動線、樣品屋'],
          ['3', 'SA', '建築師', '對齊機能、畫平面圖'],
          ['4', 'Architect', '結構技師', '承重、耐震、未來擴建'],
          ['5', 'SD', '施工圖繪製', '拆成可施工的細部圖'],
          ['6', 'DBA', '地基+水塔+管線', '資料是建物命脈'],
          ['7', 'Dev', '工班師傅', '真的把樓蓋起來'],
          ['8', 'QA', '驗收員', '門開不開、結構合規'],
          ['9', 'DevOps', '物業+保全+消防', '上線後 24h 維運'],
        ]} />
      </div>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 30, animationDelay: '0.2s' }}>
        <img src={img_building} alt='' style={{ maxWidth: '100%', maxHeight: '80%', objectFit: 'contain' }} />
      </div>
      <Footer source='software_develop_journey/ppt/01-big-picture/01_building_metaphor.md' />
    
      <Breadcrumb part='Part 0' chapter='Ch.01 SDLC 全景' />
      <PageNum n={1} total={17} />
      <BrandBar />
    </div>
  </>
);

// === P03 Uncertainty ladder ===
const P03: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>FRAMEWORK · 不確定性階梯</Kicker>
      <PageH1>每個角色降低一種不確定性</PageH1>
      <Table cols='180px 1fr 1fr' head={['角色', '消除的不確定性', '失敗時的代價']} rows={[
        ['PM', '商業價值', '做出沒人要的東西'],
        ['UX', '使用者行為', '介面難用、留存差'],
        ['SA', '業務規則', 'edge case 出 bug'],
        ['Architect', '非功能風險', '擴不動、掛了救不回'],
        ['SD', '開發落地', '模組糾纏、加 feature 慢'],
        ['DBA', '資料正確/效能', '資料壞/慢/掉'],
        ['Dev', '實作正確', '功能 bug'],
        ['QA', '結果正確', '上線後使用者發現'],
        ['DevOps', '上線運行', '半夜 on-call、burnout'],
      ]} />
      <div className='osd-anim-fade-up' style={{ marginTop: 24, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
        <strong>判斷力金句</strong>：角色不是用職稱分，是用「負責消除哪種不確定性」來分。
      </div>
      <Footer source='software_develop_journey/ppt/01-big-picture/03_uncertainty_ladder.md' />
    
      <Breadcrumb part='Part 0' chapter='Ch.01 SDLC 全景' />
      <PageNum n={2} total={17} />
      <BrandBar />
    </div>
  </>
);

// === P04 AI Matrix - core ===
const P04: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>CORE MATRIX</Kicker>
      <PageH1>9 角色 × AI 的真實分工</PageH1>
      <Table cols='130px 1fr 1fr' head={['角色', 'AI 可代勞 (70-90%)', 'AI 取代不了 (10-30%)']} rows={[
        ['PM', '競品調研、文件、roadmap', '商業假設、優先級、刪 feature'],
        ['UX', '線稿、icon、A/B 文案', '真實訪談、IA 決策'],
        ['SA', 'spec 草稿、流程圖、狀態圖', '業務 edge case、規則仲裁'],
        ['Architect', '架構圖、ADR 草稿、選型表', '風險取捨、SLO、技術選型'],
        ['SD', 'API spec、模組骨架、序列圖', '模組邊界、領域建模'],
        ['DBA', 'DDL、索引、查詢優化', 'schema、一致性策略'],
        ['Dev', '90% boilerplate、單元測試', '演算法、debug、技術債'],
        ['QA', '測試案例、自動化腳本', 'invariant、風險優先級'],
        ['DevOps', 'IaC、CI/CD、監控設定', 'SLO、事故應對、成本'],
      ]} />
      <Footer source='_source/braindump.md · §AI 取代不了的核心判斷' />
    
      <Breadcrumb part='Part 0' chapter='Ch.01 SDLC 全景' />
      <PageNum n={3} total={17} />
      <BrandBar />
    </div>
  </>
);

// === P05 AI matrix insight ===
const P05: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>INSIGHT</Kicker>
      <PageH1>越「重複」AI 越強；越「判斷」AI 越弱</PageH1>
      <div className='osd-stagger' style={{ display: 'flex', gap: 24, marginTop: 20 }}>
        <div style={{ flex: 1, background: 'rgba(91, 151, 112, 0.10)', borderTop: `4px solid ${ok}`, borderRadius: 8, padding: '24px 28px' }}>
          <h3 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 800, margin: '0 0 14px', color: ok }}>AI 強區（直接代勞）</h3>
          <ul style={{ fontSize: 22, lineHeight: 1.7, paddingLeft: 24, margin: 0 }}>
            <li>套件 API、語法、樣板</li>
            <li>文檔翻譯、changelog</li>
            <li>測試案例展開</li>
            <li>監控設定生成</li>
            <li>PlantUML / Mermaid 轉換</li>
          </ul>
        </div>
        <div style={{ flex: 1, background: 'rgba(232, 99, 79, 0.10)', borderTop: `4px solid ${warn}`, borderRadius: 8, padding: '24px 28px' }}>
          <h3 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 800, margin: '0 0 14px', color: warn }}>AI 弱區（你必須會）</h3>
          <ul style={{ fontSize: 22, lineHeight: 1.7, paddingLeft: 24, margin: 0 }}>
            <li>定義「對」的標準</li>
            <li>跨團隊邊界劃分</li>
            <li>成本 vs 品質取捨</li>
            <li>「不做」的決策</li>
            <li>處理公司政治約束</li>
          </ul>
        </div>
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 24, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.5s' }}>
        <strong>速成策略</strong>：學弱區的判斷力，把強區交給 AI，每次都驗證。
      </div>
      <Footer source='_source/braindump.md · §AI 可以代勞的工作' />
    
      <Breadcrumb part='Part 0' chapter='Ch.01 SDLC 全景' />
      <PageNum n={4} total={17} />
      <BrandBar />
    </div>
  </>
);

// === 9 role pages (P06-P14) - each role gets 1 page (role profile, AI collab folded in) ===
const P06: Page = () => (
  <RoleProfile role='PM · Product Manager' num={1} metaphor='建案企劃 · 代理甲方' oneliner='決定要做什麼、為誰做、什麼時候不做'
    outputs='PRD、Roadmap、優先級矩陣、Kill 決策、商業假設清單'
    judgments={['哪個需求 ROI 最高？', '哪個需求其實是「nice to have」？', '什麼時候該砍掉一個 90% 完成的 feature？']}
    deeper='📗 想看完整角色 → software_develop_journey/ppt/02-pm/' />
);
const P07: Page = () => (
  <RoleProfile role='UX/UI · 使用者體驗 / 介面' num={2} metaphor='室內設計師' oneliner='設計動線、樣品屋、把流程變得「順」'
    outputs='wireframe、prototype、design system、A/B 測試假設'
    judgments={['使用者「真的痛」在哪？vs PM 以為的痛', '資訊架構：什麼放第一層、什麼藏第二層', '何時用模態框 vs 全頁跳轉']}
    deeper='📗 想看完整角色 → software_develop_journey/ppt/03-ux-ui/' />
);
const P08: Page = () => (
  <RoleProfile role='SA · System Analyst' num={3} metaphor='建築師（平面圖）' oneliner='把「業務語言」翻成「系統語言」'
    outputs='spec、業務流程圖、狀態機、edge case 清單、資料字典'
    judgments={['客戶說「自動」是哪種自動？', '退款流程的 11 種 edge case 怎麼分類？', '哪些規則是「鐵律」，哪些是「常見但有例外」？']}
    deeper='📗 想看完整角色 → software_develop_journey/ppt/04-sa/' />
);
const P09: Page = () => (
  <RoleProfile role='Architect · 系統架構師' num={4} metaphor='結構技師' oneliner='承重、耐震、未來擴建—讓系統活下去'
    outputs='架構圖、ADR、NFR 清單、技術選型矩陣、風險評估'
    judgments={['哪個 NFR 是 must（不滿足就死）vs nice？', '微服務 vs 模組化單體—我的團隊撐得起哪個？', '引入 Kafka 換來的吞吐，值得多 1 個維運人嗎？']}
    deeper='📘 想深入 → software_architect/ppt/05-ilities/ + 07-system-architecture/' />
);
const P10: Page = () => (
  <RoleProfile role='SD · System Design' num={5} metaphor='施工圖繪製師' oneliner='把架構圖拆成 dev 看得懂的細部圖'
    outputs='模組邊界圖、API spec、序列圖、領域模型（DDD）、ER 圖'
    judgments={['這個功能該開新 service 還是擴既有 module？', 'API 設成 REST、gRPC 還是 GraphQL？', '同步呼叫還是發 event？']}
    deeper='📘 想深入 → software_architect/ppt/06-components-patterns/' />
);
const P11: Page = () => (
  <RoleProfile role='DBA · 資料工程 / DBA' num={6} metaphor='地基 + 水塔 + 管線' oneliner='資料是命脈—錯一個 schema 全公司返工'
    outputs='schema、索引、分片策略、備份方案、查詢優化'
    judgments={['SQL vs NoSQL vs Vector—哪個對應業務？', '哪些欄位該 index？哪些不該（寫入成本）？', '分片鍵選錯，未來 5 年都在 reshard。']}
    deeper='📘 想深入 → software_architect/ppt/04-tech-stack-data/' />
);
const P12: Page = () => (
  <RoleProfile role='Dev · Developer' num={7} metaphor='工班師傅' oneliner='真的把樓蓋起來—在 AI 時代角色變最多'
    outputs='可運行的 code、單元測試、PR、code review、bug fix'
    judgments={['這段 code 該重構還是接受技術債？', 'bug 的「根因」vs「症狀」—修哪一層？', 'AI 給的 code 我要全收還是只收 60%？']}
    deeper='📗 想看完整角色 → software_develop_journey/ppt/08-dev/' />
);
const P13: Page = () => (
  <RoleProfile role='QA · Quality Assurance' num={8} metaphor='驗收員' oneliner='定義「對」—AI 時代尤其難'
    outputs='測試計畫、test case、自動化 script、bug report、回歸驗收'
    judgments={['AI 系統的「對」要怎麼定（沒有 ground truth）？', '哪些 case 是 must test、哪些是 nice？', '上線後監控誰能取代手動測試？']}
    deeper='📗 想看完整角色 → software_develop_journey/ppt/09-qa/' />
);
const P14: Page = () => (
  <RoleProfile role='DevOps / SRE' num={9} metaphor='物業 + 24h 保全 + 消防' oneliner='上線後活下去—把「半夜被叫起來」變罕見'
    outputs='IaC、CI/CD、監控、告警、runbook、SLO 文件、事故報告'
    judgments={['SLO 設多少（99.9% vs 99.99% 成本差 10 倍）？', '該不該為這個 alert 半夜叫人？', 'incident 後改流程 vs 改架構？']}
    deeper='📗 想看完整角色 → software_develop_journey/ppt/10-devops-sre/' />
);

// === P15 Handoff chain (with visual arrows) ===
const P15: Page = () => {
  const roles = ['PM', 'UX', 'SA', 'Architect', 'SD', 'DBA', 'Dev', 'QA', 'DevOps'];
  const tones = ['#D97757', '#E89858', '#B8754F', '#A1813F', '#7A8542', '#5B9770', '#5B7570', '#48788B', '#3A6090'];
  return (
    <>
      <AnimStyle />
      <div style={{ ...fill, padding: '60px 80px', position: 'relative' }}>
        <Kicker>COLLABORATION · 交棒鏈</Kicker>
        <PageH1>上下游接力—AI 並沒減少角色，只讓每人能扛更多</PageH1>
        <div className='osd-stagger' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '60px 0', gap: 4 }}>
          {roles.map((r, i) => (
            <React.Fragment key={r}>
              <div style={{ background: tones[i], color: '#F5F1E8', borderRadius: '50%', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, textAlign: 'center', boxShadow: '0 4px 14px rgba(42,37,32,0.15)' }}>{r}</div>
              {i < roles.length - 1 ? <div style={{ flex: 0, color: muted, fontSize: 22, fontWeight: 700 }}>→</div> : null}
            </React.Fragment>
          ))}
        </div>
        <div className='osd-anim-fade-up' style={{ marginTop: 30, padding: '20px 28px', background: 'rgba(217, 119, 87, 0.10)', borderLeft: `6px solid ${accent}`, borderRadius: 6, fontSize: 22, lineHeight: 1.6, animationDelay: '0.7s' }}>
          <strong>金句</strong>：AI 時代不是「不需要這些角色」，是「一個人能同時兼三個角色」。
        </div>
        <Footer source='software_develop_journey/ppt/11-collaboration/01_handoff_chain.md' />
      </div>
    </>
  );
};

// === P16 Conflict cases ===
const P16: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>CONFLICTS</Kicker>
      <PageH1>常見衝突場景速覽</PageH1>
      <Table cols='200px 1fr 1fr' head={['衝突', '表面爭吵', '真正的根因']} rows={[
        ['PM ↔ Architect', '「你怎麼要 6 個月？」', 'NFR 沒談清就承諾日期'],
        ['SA ↔ Dev', '「spec 寫的不可能！」', 'spec 沒寫 edge case'],
        ['Architect ↔ DBA', '「為什麼選 Mongo？」', 'schema 與一致性策略沒共識'],
        ['Dev ↔ QA', '「這不是 bug」', '「對」的定義沒寫進 spec'],
        ['Dev ↔ DevOps', '「我的 code 在本地能跑」', '環境一致性沒做'],
      ]} />
      <div className='osd-anim-fade-up' style={{ marginTop: 30, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.5s' }}>
        <strong>速成口訣</strong>：衝突 90% 是「上游沒講清」，不是「下游不配合」。
      </div>
      <Footer source='software_develop_journey/ppt/11-collaboration/04_conflict_cases.md' />
    
      <Breadcrumb part='Part 0' chapter='Ch.01 SDLC 全景' />
      <PageNum n={5} total={17} />
      <BrandBar />
    </div>
  </>
);

const P17: Page = () => (
  <ThreeTakeaways chapter='Ch.01 · SDLC' lines={[
    '角色 = 消除一種不確定性，不是職稱',
    'AI 強 = 重複的；AI 弱 = 判斷的',
    '衝突 90% 是上游沒講清，不是下游不配合',
  ]} />
);

export const meta: SlideMeta = { title: 'Ch.01 · SDLC 全景速覽' };
export default [P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17] satisfies Page[];
