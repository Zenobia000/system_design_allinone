import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_02_app_type_01_tree_concept from './assets/02_app_type_01_tree_concept.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F1E8', text: '#2A2520', accent: '#D97757' },
  fonts: {
    display: '"Noto Serif TC", "Source Han Serif TC", Georgia, serif',
    body: '"Noto Sans TC", "Source Han Sans TC", -apple-system, system-ui, sans-serif',
  },
  typeScale: { hero: 180, body: 38 },
  radius: 8,
};

const muted = '#8B6F47';
const subtle = 'rgba(42, 37, 32, 0.55)';
const ok = '#5B9770';
const warn = '#E8634F';

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
} as const;

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 26, color: 'var(--osd-accent)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>
);

const Footer = ({ source }: { source: string }) => (
  <div style={{ position: 'absolute', left: 120, bottom: 56, fontSize: 18, color: subtle, fontStyle: 'italic' }}>{source}</div>
);

const ChapterDivider = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px' }}>
    <div style={{ fontSize: 28, color: 'var(--osd-accent)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 180, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0' }}>{title}</h1>
    {subtitle ? <h2 style={{ fontSize: 52, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245, 241, 232, 0.6)', margin: '24px 0 0' }}>{subtitle}</h2> : null}
  </div>
);

const SectionEnd = ({ title, subtitle, next }: { title: string; subtitle?: string; next?: string }) => (
  <div style={{ ...fill, background: 'var(--osd-accent)', color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 140, fontWeight: 800, margin: 0 }}>{title}</h1>
    {subtitle ? <h2 style={{ fontSize: 52, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245, 241, 232, 0.85)' }}>{subtitle}</h2> : null}
    {next ? <p style={{ fontSize: 36, marginTop: 64, color: '#F5F1E8', opacity: 0.9 }}>→ {next}</p> : null}
  </div>
);

const StackRow = ({ tone, label, text }: { tone: string; label: string; text: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, padding: '18px 30px', background: 'rgba(217, 119, 87, 0.06)', borderLeft: `8px solid ${tone}`, borderRadius: 6, fontSize: 26, lineHeight: 1.5 }}>
    {label ? <strong style={{ minWidth: 320, color: tone }}>{label}</strong> : null}
    <span style={{ flex: 1 }}>{text}</span>
  </div>
);

const TradeoffCol = ({ title, items, tone }: { title: string; items: string[]; tone: string }) => (
  <div style={{ flex: 1, background: 'rgba(217, 119, 87, 0.08)', borderTop: `4px solid ${tone}`, borderRadius: 8, padding: '24px 28px' }}>
    <h3 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 800, margin: '0 0 16px', color: tone }}>{title}</h3>
    <ul style={{ fontSize: 22, lineHeight: 1.6, paddingLeft: 24, margin: 0 }}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  </div>
);

const Callout = ({ tone, children }: { tone: string; children: React.ReactNode }) => (
  <div style={{ background: `${tone}15`, borderLeft: `6px solid ${tone}`, padding: '16px 24px', borderRadius: 6, fontSize: 24, lineHeight: 1.55 }}>
    {children}
  </div>
);

const P01: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 03 · OVERVIEW' title='Process & App Types' subtitle='架構設計有 SOP，不是靈感創作' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_mental_model_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>看完本章，你能回答：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 架構設計六步驟是什麼？' text='標準 SOP' />
        <StackRow tone='#A1813F' label='② Web vs Mobile vs Service 怎麼選？' text='' />
        <StackRow tone='#5B7570' label='③ 為何「文件即代碼」是必要紀律？' text='' />
        <StackRow tone='#5B9770' label='④ 怎麼用文件指揮 AI 寫程式？' text='' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.3 · `SA簡報/S4, S6.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 設計的兩個產出</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   設計過程              產出 1：架構文件           產出 2：團隊共識
   ─────────────         ──────────────             ──────────────
   ① 需求 →              PRD + NFR matrix          PM 與你對齊
   ② 概念 →              Domain model               業務專家認可
   ③ 選型 →              Tech stack + ADR          財務 / Ops 同意
   ④ 設計 →              C4 + API spec              Dev 能開工
   ⑤ 驗證 →              Risk + failure analysis    QA 知道測什麼
   ⑥ 落地 →              Guidelines + scaffold      新人上手快`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：文件是給未來的你看的——3 個月後你會感謝今天寫了 ADR。</span></div>
    </div>
    <Footer source='`S4_Slides.pdf` · §Design Process Overview' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先學六步驟 SOP。' next='3.1 Six-Step Process</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 03 · TOPIC 01' title='Six-Step Process' subtitle='架構師的標準作業流程' />
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何需要 SOP？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>沒有 SOP 的架構設計：
- 想到什麼畫什麼 → 漏需求
- 先選技術後找問題 → 過度工程
- 缺文件 → 半年後沒人記得為何這樣設計

<strong>SOP 不是限制創造力，是讓創造力放在對的層次。</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>每一步都有「驗收交付物」</li>
          <li>階段門檻清楚 → 可以暫停 / 回頭</li>
          <li>跨團隊複用 → 新人 onboarding 快</li>
        </ul>
    </div>
    <Footer source='`S4_Slides.pdf` · §Why a Process' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 六步驟全圖</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>步驟</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>名稱</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>核心任務</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>交付物</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>①</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>理解需求</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>挖功能 + NFR + 約束</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PRD · NFR Matrix</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>②</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>概念設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>領域建模 · Bounded Context</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Domain Model · ER 圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>③</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>技術選型</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>評估 stack · 寫 ADR</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Tech Stack · ADR-001</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>④</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>組件設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>拆模組 · 定接口</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>C4 圖 · API Spec</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>⑤</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>風險評估</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>攻擊架構 · failure mode</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Risk Report · FMA</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>⑥</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>實施指導</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>規範 + 鷹架 + observability</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Guidelines · Scaffold</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：<strong>理-念-選-設-險-導</strong>。每步沒交付物，不能進下一步。</span></div>
    </div>
    <Footer source='`S4_Slides.pdf` · §Six-Step Detail' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 對應「架構師武僧」七步</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>武僧七步</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>六步流程</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>對應 Agent</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需求分析</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>① 理解需求</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需求分析師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>領域建模</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>② 概念設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>領域建模師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>技術策略</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>③ 技術選型</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>技術策略師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>④ 組件設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統設計師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>風險評估</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>⑤ 風險評估</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>風險評估師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>技術主管</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>⑥ 實施指導</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>技術主管</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>演進守護</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>(post-launch)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>演進守護者</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>六步是「上線前」的設計流程；第七步「演進守護」是上線後的事——Ch.7 觀測性會講。</span></div>
    </div>
    <Footer source='`_source/_source/架構師.md` ※ 對應原《架構師武僧寶典》' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 何時可以跳步驟？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='可以簡化的情境' items={['內部小工具 (DAU<100)', 'POC / spike', '明確只活 3 個月', '沿用既有架構 + 小改', '單人專案']} />
        <TradeoffCol tone='#E8634F' title='絕不能跳的情境' items={['對外服務', '多團隊協作', '需要合規（GDPR/SOC2）', '金流 / 醫療 / 安全', '預計活 3 年以上']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：「敏捷」當作不寫文件的理由——半年後團隊集體失憶。</Callout>
    </div>
    <Footer source='`S4_Slides.pdf` · §When to Skip' />
  </div>
);


const P12: Page = () => (
  <SectionEnd title='Six-Step Process 完' subtitle='流程懂了，下一站看應用類型。' next='3.2 App Type Strategy</span>' />
);


const P13: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 03 · TOPIC 02' title='App Type Strategy' subtitle='Web / Mobile / Service / Console 各自的戰場' />
);


const P14: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_app_type_01_tree_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何應用類型決定一切？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>選錯應用類型 = 整個系統打掉重做。

Web App 撐不起即時通訊；
Mobile App 跑不了 batch ETL；
Console 不適合對外服務。

<strong>這是 Day 0 就要鎖定的決策。</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>應用類型 → 決定 deployment / scaling / 安全模型</li>
          <li>一個系統可以<strong>混合多種類型</strong>（Web 前端 + Service 後端 + Console 排程）</li>
          <li>重點：每個服務問「使用情境 = ?」</li>
        </ul>
    </div>
    <Footer source='`S6_Slides.pdf` · §App Type Selection' />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 五種應用類型對照</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>類型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用情境</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>部署模式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>限制</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Web App</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>廣泛存取 · 跨平台 · 內容為主</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>雲端 + CDN</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>弱離線、推播限制</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Mobile App</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高互動 · 定位 · 推播 · 相機</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>App Store / Play</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>審核週期、版本碎片</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Web API</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>服務化 · 前後端分離 · B2B</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>API Gateway</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需設計 versioning</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Service / Worker</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>背景處理 · ETL · 排程 · 訊息消費</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>容器 / Serverless</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不直接面對 user</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Console / CLI</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內部工具 · DevOps · 一次性腳本</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>本機 / SSH</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>沒 UI、權限分散</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>規則</strong>：使用者怎麼用，就選什麼類型。不是「我熟什麼選什麼」。</span></div>
    </div>
    <Footer source='`S6_Slides.pdf` · §App Type Matrix' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 決策樹</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   主要使用者是誰？
   ├─ 終端消費者
   │   ├─ 需要相機/定位/推播 → Mobile App
   │   ├─ 內容瀏覽為主       → Web App + PWA
   │   └─ 跨平台一致體驗     → Hybrid (React Native)
   │
   ├─ 其他系統 (B2B / 內部)
   │   ├─ 同步請求/回應      → Web API (REST / gRPC)
   │   └─ 異步事件處理       → Service / Worker
   │
   └─ 開發者 / 維運
       ├─ 互動式診斷         → Web Admin Console
       └─ 排程 / 一次性       → CLI / Cron Job`}</pre>
    <Footer source='`S6_Slides.pdf` · §Decision Tree' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 混合範例：電商系統</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='Web App' text='顧客端瀏覽 + 結帳（React + CDN）' />
        <StackRow tone='#A1813F' label='Mobile App' text='推播 + 訂單追蹤（iOS / Android）' />
        <StackRow tone='#5B7570' label='Web API' text='商品 / 訂單 / 金流（FastAPI / gRPC）' />
        <StackRow tone='#5B9770' label='Worker' text='寄信 / 報表 / 庫存同步（Celery）' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>洞察</strong>：一個業務通常需要 3–5 種應用類型協作。
架構師的工作是<strong>畫出邊界 + 定義接口</strong>。</Callout>
    </div>
    <Footer source='`_source/03_Process_App_Types.md` · §Hybrid Example' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 過早承諾 vs 過晚決策</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='Day 0 就鎖定的好處' items={['選型可以聚焦', '團隊技能可配置', '架構不會半路推倒', '成本可預估']} />
        <TradeoffCol tone='#E8634F' title='過早承諾的風險' items={['需求不清就選 Native iOS → 後悔做不到 Android', '需求變動時改不動', 'MVP 階段應留彈性', '市場驗證前不該砸 Native']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：早期就選 Native iOS + Android（兩個團隊）→ 後來發現 Web PWA 就夠。預算燒一半。</Callout>
    </div>
    <Footer source='`S6_Slides.pdf` · §When to Commit' />
  </div>
);


const P20: Page = () => (
  <SectionEnd title='App Type Strategy 完' subtitle='類型選好了，下一站講文件紀律。' next='3.3 Docs as Code</span>' />
);


const P21: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 03 · TOPIC 03' title='Docs as Code' subtitle='架構文件不是寫給自己看的，是團隊契約' />
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 Word / Confluence 是反模式？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>架構文件的命運</strong>：寫完就過時。
除非：跟代碼住在一起，被 review、被 CI 檢查、被版本控制。

「文件即代碼」不是工具選擇，是<strong>紀律</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Word 文件：寫完進雲端硬碟，3 個月後沒人找得到</li>
          <li>Confluence 頁面：更新失同步，code 改了文件不知道</li>
          <li>Markdown in Git：和代碼一起 PR，過時自然會被指出</li>
        </ul>
    </div>
    <Footer source='`S6_Slides.pdf` · §Docs as Code' />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 四種必備產出格式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>文件類型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>格式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>工具</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>用途</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>架構決策記錄</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Markdown</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ADR template</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>為什麼選 A 不選 B</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統視覺化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Mermaid</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內嵌 .md</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>C4 圖 · 流程圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>API 規格</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>OpenAPI YAML</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Swagger / Redoc</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>前後端契約</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>部署 / Runbook</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Markdown</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內部 wiki</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>oncall 救命手冊</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>鐵律</strong>：所有產出都必須能進 `git diff`。
不能 diff 的文件 = 失同步的開始。</Callout>
    </div>
    <Footer source='`_source/03_Process_App_Types.md` · §Doc Formats' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>ADR-001 · 選擇 PostgreSQL 為主資料庫</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · ADR 範本</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`

Status: Accepted · 2026-05-15

## Context
我們需要 OLTP 主資料庫，預期 5k QPS、需 ACID。

## Decision
選擇 PostgreSQL 15，棄 MongoDB / MySQL。

## Consequences
+ 強 ACID · 完整 SQL · pgvector 未來可用
+ 招募容易
− 寫入擴展不如 NoSQL · 需 read replica
- 跨區同步較複雜

## Alternatives Considered
- MySQL: replication 成熟，但 JSON 支援弱
- MongoDB: schema-free，但 transaction 限制多`}</pre>
    <Footer source='`_source/03_Process_App_Types.md` · §ADR Template' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · AI 時代的隱性優勢</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 文件即 prompt' text='把 ADR + C4 圖貼給 AI → 生成 boilerplate code' />
        <StackRow tone='#A1813F' label='② OpenAPI 自動生成 stub' text='前後端同時工作不衝突' />
        <StackRow tone='#5B7570' label='③ Mermaid 即圖即文' text='AI 能讀懂、能修改、能延伸' />
        <StackRow tone='#5B9770' label='④ Git diff 出問題' text='文件改了 code 沒改 → CI 報警' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>洞察</strong>：文件即代碼 = 給 AI 的高效溝通協定。
未來「會寫好 ADR 的架構師」比「會寫好 code 的工程師」值錢。</Callout>
    </div>
    <Footer source='`S6_Slides.pdf` · §AI-era Docs' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 寫多少文件才夠？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='必寫' items={['每個重大選型一份 ADR', 'C4 Level 1-2 (Context + Container)', 'API 規格（OpenAPI）', '核心業務資料流', 'oncall runbook']} />
        <TradeoffCol tone='#E8634F' title='可以省略' items={['C4 Level 4 (Code) · 看 code', '每個 function 的 javadoc', '純內部 utility 文件', '變動頻繁的 UI flow', '3 個月內會被改掉的部分']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：寫了 200 頁 Word，沒人看；沒寫 ADR，半年後吵架。<strong>質 &gt; 量。</strong></Callout>
    </div>
    <Footer source='`S6_Slides.pdf` · §Doc Right-sizing' />
  </div>
);


const P27: Page = () => (
  <SectionEnd title='Docs as Code 完' subtitle='流程 + 類型 + 文件三件套到手。' next='Ch.3 Recap</span>' />
);


const P28: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 03 · RECAP' title='Process & App Types 收斂' subtitle='把 SOP + 類型 + 文件，串成第一次 design review' />
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>30 分鐘把 Ch.1–3 用一遍</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE · 拍賣 App 的 Day 0 設計會議</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 角色' text='你是架構師 · 不寫 code · 主導決策' />
        <StackRow tone='#A1813F' label='② NFR' text='5k QPS peak · 99.95% · 競標 timing ±1s' />
        <StackRow tone='#5B7570' label='③ 流程' text='跑六步走到「組件設計」' />
        <StackRow tone='#5B9770' label='④ 類型' text='Mobile App + Web API + Worker（混合）' />
        <StackRow tone='#5B9770' label='⑤ 文件' text='PRD + NFR Matrix + ADR-001 (DB) + C4 Level 1' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Day 0 產出</strong>：5 份文件、1 張 C4 圖、1 份 ADR——準備進選型階段。</Callout>
    </div>
    <Footer source='整合 Ch.1–3 + 拍賣業務典型流程' />
  </div>
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第三章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['六步驟設計 SOP', '應用類型決策樹', '4 種必備文件格式', 'ADR 範本']} />
        <TradeoffCol tone='#E8634F' title='還沒回答的問題' items={['選哪個 DB？　→ Ch.4', '哪個語言/框架？　→ Ch.4', '架構品質怎麼量？　→ Ch.5', '怎麼拆模組？　→ Ch.6']} />
      </div>
  </div>
);


const P31: Page = () => (
  <SectionEnd title='Ch.3 完' subtitle='流程立了，下一站學選型。' next='Ch.4 Tech Stack & Data</span>' />
);


export const meta: SlideMeta = { title: 'Ch.3 · 流程與應用類型' };
export default [
  P01,
  P02,
  P03,
  P04,
  P05,
  P06,
  P07,
  P08,
  P09,
  P10,
  P11,
  P12,
  P13,
  P14,
  P15,
  P16,
  P17,
  P18,
  P19,
  P20,
  P21,
  P22,
  P23,
  P24,
  P25,
  P26,
  P27,
  P28,
  P29,
  P30,
  P31,
] satisfies Page[];
