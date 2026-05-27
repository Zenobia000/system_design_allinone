import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_cover from './assets/00_cover_hero.png';
import img_judgment from './assets/00_judgment_vs_commodity.png';
import logoDark from '../../assets/branding/logo-dark.png';
import logoLight from '../../assets/branding/logo-light.png';

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
.osd-stagger > *:nth-child(1) { animation-delay: 0.08s; }
.osd-stagger > *:nth-child(2) { animation-delay: 0.16s; }
.osd-stagger > *:nth-child(3) { animation-delay: 0.24s; }
.osd-stagger > *:nth-child(4) { animation-delay: 0.32s; }
.osd-stagger > *:nth-child(5) { animation-delay: 0.40s; }
.osd-stagger > *:nth-child(6) { animation-delay: 0.48s; }
.osd-stagger > *:nth-child(7) { animation-delay: 0.56s; }
.osd-stagger > *:nth-child(8) { animation-delay: 0.64s; }
.osd-stagger > *:nth-child(9) { animation-delay: 0.72s; }
.osd-stagger > *:nth-child(10) { animation-delay: 0.80s; }
`;

const AnimStyle = () => <style>{animationCSS}</style>;

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
} as const;

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>
);

const Footer = ({ source }: { source: string }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 120, bottom: 56, fontSize: 18, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>
);

const PageH1 = ({ children, size = 56 }: { children: React.ReactNode; size?: number }) => (
  <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 24px', animationDelay: '0.1s' }}>{children}</h1>
);

const ChapterDivider = ({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) => (
  <>
    <AnimStyle />
    <div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
      <div style={{ padding: '0 100px' }}>
        <div className='osd-anim-fade-up' style={{ fontSize: 28, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
        <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 150, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
        {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 48, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245, 241, 232, 0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
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
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 140, fontWeight: 800, margin: 0 }}>{title}</h1>
      {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 48, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245, 241, 232, 0.85)', animationDelay: '0.15s' }}>{subtitle}</h2> : null}
      {next ? <p className='osd-anim-fade-up' style={{ fontSize: 32, marginTop: 64, color: '#F5F1E8', opacity: 0.9, animationDelay: '0.3s' }}>→ {next}</p> : null}
      <BrandBar light />
    </div>
  </>
);

const StackRow = ({ tone, label, text }: { tone: string; label: string; text: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, padding: '18px 30px', background: 'rgba(217, 119, 87, 0.06)', borderLeft: `8px solid ${tone}`, borderRadius: 6, fontSize: 26, lineHeight: 1.5 }}>
    {label ? <strong style={{ minWidth: 280, color: tone }}>{label}</strong> : null}
    <span style={{ flex: 1 }}>{text}</span>
  </div>
);

const TradeoffCol = ({ title, items, tone }: { title: string; items: string[]; tone: string }) => (
  <div style={{ flex: 1, background: 'rgba(217, 119, 87, 0.08)', borderTop: `4px solid ${tone}`, borderRadius: 8, padding: '24px 28px' }}>
    <h3 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 800, margin: '0 0 16px', color: tone }}>{title}</h3>
    <ul style={{ fontSize: 22, lineHeight: 1.6, paddingLeft: 24, margin: 0 }}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  </div>
);

// ===== PAGE CHROME (Breadcrumb / PageNum / BrandBar / Mantra / ThreeTakeaways) =====
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
  <>
    <AnimStyle />
    <div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
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

const P01: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'center' }}>
      <div style={{ padding: '0 100px' }}>
        <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>A Crash Course</div>
        <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 800, lineHeight: 1.08, margin: '32px 0 16px', animationDelay: '0.15s' }}>AI 時代<br/>系統設計速成</h1>
        <h2 className='osd-anim-fade-up' style={{ fontSize: 36, fontWeight: 500, fontStyle: 'italic', color: muted, margin: '0 0 36px', animationDelay: '0.3s' }}>把判斷力交還給你</h2>
        <div className='osd-anim-fade-in' style={{ fontSize: 22, lineHeight: 1.6, color: subtle, animationDelay: '0.5s' }}>
          與 software_architect · software_develop_journey 同調<br/>
          open materials · anthropic style
        </div>
      </div>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, animationDelay: '0.2s' }}>
        <img src={img_cover} alt='' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <PageNum n={1} total={9} />
      <BrandBar />
    </div>
  </>
);

const P02: Page = () => <ChapterDivider eyebrow='PROLOGUE · 00.1' title='為什麼要這本' subtitle='當實作變便宜，判斷變稀缺' />;

const P03: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center' }}>
      <div style={{ padding: '60px 100px', position: 'relative' }}>
        <Kicker>CONTEXT</Kicker>
        <PageH1>不是要再讀一本「全」的</PageH1>
        <div className='osd-anim-fade-up' style={{ background: 'rgba(217, 119, 87, 0.10)', borderLeft: `6px solid ${accent}`, padding: '20px 28px', borderRadius: 6, marginBottom: 28, animationDelay: '0.2s' }}>
          <div style={{ fontSize: 22, lineHeight: 1.6 }}>姊妹講義已涵蓋：</div>
          <ul style={{ fontSize: 22, lineHeight: 1.7, margin: '8px 0 0', paddingLeft: 24 }}>
            <li><code>software_develop_journey/</code> — <strong>9 角色 SDLC 全景</strong></li>
            <li><code>software_architect/</code> — <strong>架構深度教材</strong></li>
          </ul>
          <div style={{ fontSize: 22, lineHeight: 1.6, marginTop: 12 }}>這本只保留你「會回頭翻」的部分。</div>
        </div>
        <div className='osd-anim-fade-up' style={{ fontSize: 22, lineHeight: 1.7, animationDelay: '0.35s' }}>
          選材原則：<br/>
          · 只留「AI 取代不了的判斷力」<br/>
          · 只留「可重複套用的決策框架」<br/>
          · 「會用 Google / AI 即時查到」的就拿掉
        </div>
        <Footer source='_source/braindump.md · §取捨原則' />
      </div>
      <div className='osd-anim-slide-right' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 30, animationDelay: '0.2s' }}>
        <img src={img_judgment} alt='' style={{ maxWidth: '100%', maxHeight: '70%', objectFit: 'contain' }} />
      </div>
      <Breadcrumb part='Prologue' chapter='00.1 為什麼要這本' section='速成 ≠ 速食' />
      <PageNum n={3} total={9} />
      <BrandBar />
    </div>
  </>
);

const P04: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>TIMING</Kicker>
      <PageH1 size={52}>AI 已經改變學習投資報酬率</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 20, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, color: accent, padding: '10px 14px' }}>三年前你學的</div>
        <div style={{ fontWeight: 700, color: accent, padding: '10px 14px' }}>今天 AI 幫你做</div>
        <div style={{ fontWeight: 700, color: accent, padding: '10px 14px' }}>你還該學的</div>
        {[
          ['怎麼寫 React 元件', 'Claude Code 5 秒生成', '什麼時候該拆元件'],
          ['怎麼寫 SQL JOIN', 'AI 補完 + EXPLAIN', 'schema 設計 + 索引取捨'],
          ['怎麼設 CI/CD', 'AI 生 GitHub Action', '流程定義 + 失敗策略'],
          ['怎麼用 Kafka', 'AI 給 boilerplate', '何時該引入訊息佇列'],
          ['寫單元測試', 'AI 生 test', 'invariant 怎麼定'],
        ].map((row) => (
          <React.Fragment key={row[0]}>
            <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(139,111,71,0.25)' }}>{row[0]}</div>
            <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(139,111,71,0.25)' }}>{row[1]}</div>
            <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(139,111,71,0.25)' }}>{row[2]}</div>
          </React.Fragment>
        ))}
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 24, animationDelay: '0.6s' }}>
        <Mantra>AI 把實作能力變成 commodity，把判斷能力變成稀缺</Mantra>
      </div>
      <Breadcrumb part='Prologue' chapter='00.1 為什麼要這本' section='為什麼是現在' />
      <PageNum n={4} total={9} />
      <BrandBar />
    </div>
  </>
);

const P05: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>DELIVERABLE</Kicker>
      <PageH1>讀完你能做這 3 件事</PageH1>
      <div className='osd-stagger' style={{ display: 'flex', gap: 24 }}>
        <TradeoffCol tone={ok} title='會判斷' items={['面對模糊需求，能問對 5 個問題', '面對選型，能畫出 trade-off 表', '面對流量增長，能預判瓶頸', '面對 AI 建議，能挑出不對的', '能寫一份說服老闆的 ADR']} />
        <TradeoffCol tone={warn} title='會指揮 AI' items={['給 Claude Code 結構化 context', '讓 AI 扮演對立面論證', '把 PoC 從 0 → 跑通縮到 1 小時', '把架構審查變成 AI 對話', '把文檔 / 圖 / 測試自動化']} />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 28, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.4s' }}>
        不會教：怎麼背套件 API、怎麼寫 boilerplate—那些 AI 比你快。
      </div>
      <Breadcrumb part='Prologue' chapter='00.1 為什麼要這本' section='你會帶走什麼' />
      <PageNum n={5} total={9} />
      <BrandBar />
    </div>
  </>
);

const P06: Page = () => <SectionEnd title='Why this 完' subtitle='下一站，看內容怎麼分配。' next='02 取捨地圖' />;

const P07: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>STRUCTURE · 1 + 4 + 3 + WORKFLOW</Kicker>
      <PageH1>篇幅比例 = 重要性比例</PageH1>
      <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='Part 0 · 導論 + SDLC' text='12% · 為何學 · 9 角色快照' />
        <StackRow tone='#A1813F' label='Part 1 · 四大方法論' text='55% · 判斷力主體 (A/B/C/D)' />
        <StackRow tone='#5B7570' label='Part 2 · 三大實戰案例' text='20% · 端到端示範' />
        <StackRow tone='#5B9770' label='Part 3 · AI 實戰工作流' text='11% · Claude Code 怎麼用' />
        <StackRow tone={muted} label='附錄' text='2% · 速查 + 提示詞庫' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 24, animationDelay: '0.6s' }}>
        <Mantra>保留可帶走的決策框架，捨棄可即時 google 的</Mantra>
      </div>
      <Breadcrumb part='Prologue' chapter='00.2 取捨地圖' />
      <PageNum n={7} total={9} />
      <BrandBar />
    </div>
  </>
);

const P08: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>CHOOSE YOUR PATH</Kicker>
      <PageH1>不必從第一頁讀到最後一頁</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 80px', gap: 4, fontSize: 20, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, color: accent, padding: '12px 14px' }}>路徑</div>
        <div style={{ fontWeight: 700, color: accent, padding: '12px 14px' }}>對象</div>
        <div style={{ fontWeight: 700, color: accent, padding: '12px 14px' }}>路線</div>
        <div style={{ fontWeight: 700, color: accent, padding: '12px 14px' }}>時間</div>
        {[
          ['A · 新手 on-ramp', '完全沒設計過系統', '0 → 1 → 2 → 3 → 附錄', '~80h'],
          ['B · 工程師升級', '1-3 年 dev，要升級判斷力', '1 → 2 → 3，回頭挑 0', '~40h'],
          ['C · 資深架構師', '已是架構師，要補 AI 工作流', '3 → 1 挑章 → 2 挑案例', '~15h'],
          ['D · 工作流速通', '想立刻把 AI 用得更深', '3 → 2 → 1 補基礎', '~3 天'],
        ].map((row) => (
          <React.Fragment key={row[0]}>
            <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(139,111,71,0.25)', fontWeight: 600 }}>{row[0]}</div>
            <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(139,111,71,0.25)' }}>{row[1]}</div>
            <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(139,111,71,0.25)' }}>{row[2]}</div>
            <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(139,111,71,0.25)' }}>{row[3]}</div>
          </React.Fragment>
        ))}
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 28, animationDelay: '0.6s' }}>
        <Mantra>先決定路徑，再開始讀</Mantra>
      </div>
      <Breadcrumb part='Prologue' chapter='00.3 學習路徑' />
      <PageNum n={8} total={9} />
      <BrandBar />
    </div>
  </>
);

const P09: Page = () => (
  <ThreeTakeaways chapter='Prologue' lines={[
    'AI 是 commodity，判斷力是稀缺',
    '篇幅比例 = 重要性比例（判斷力主體佔 55%）',
    '先決定路徑，再開始讀',
  ]} />
);

export const meta: SlideMeta = { title: 'Prologue · AI 時代系統設計速成' };
export default [P01, P02, P03, P04, P05, P06, P07, P08, P09] satisfies Page[];
