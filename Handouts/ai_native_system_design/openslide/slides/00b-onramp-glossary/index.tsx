import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
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

const muted = '#8B6F47', subtle = 'rgba(42, 37, 32, 0.55)', ok = '#5B9770', accent = '#D97757';

const animationCSS = `
@keyframes osd-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes osd-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes osd-scale-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
.osd-anim-fade-up { animation: osd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-fade-in { animation: osd-fade-in 0.6s ease-out both; }
.osd-anim-scale-in { animation: osd-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > * { animation: osd-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > *:nth-child(1) { animation-delay: 0.05s; } .osd-stagger > *:nth-child(2) { animation-delay: 0.10s; }
.osd-stagger > *:nth-child(3) { animation-delay: 0.15s; } .osd-stagger > *:nth-child(4) { animation-delay: 0.20s; }
.osd-stagger > *:nth-child(5) { animation-delay: 0.25s; } .osd-stagger > *:nth-child(6) { animation-delay: 0.30s; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;
const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const NoviceBadge = () => (
  <span style={{
    display: 'inline-block', padding: '5px 14px', borderRadius: 14,
    background: 'rgba(91, 151, 112, 0.15)', color: ok,
    fontSize: 16, fontWeight: 600,
  }}>🐤 新手友善 · 老手可跳 →</span>
);

const TermCard = ({ name, en, def }: { name: string; en: string; def: string }) => (
  <div style={{
    padding: '14px 18px', background: 'rgba(217, 119, 87, 0.08)',
    borderLeft: `4px solid ${accent}`, borderRadius: 6,
  }}>
    <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>
      {name} <span style={{ fontSize: 14, color: muted, fontWeight: 500 }}>· {en}</span>
    </div>
    <div style={{ fontSize: 18, lineHeight: 1.55, marginTop: 6 }}>{def}</div>
  </div>
);

const Footer = ({ source }: { source: string }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>
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

// P01 · Chapter divider
const P01: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 24 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, animationDelay: '0.1s' }}>PROLOGUE · 0.5 · ON-RAMP</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 110, fontWeight: 800, lineHeight: 1.1, margin: '24px 0 0', animationDelay: '0.2s' }}>先學這 15 個詞</h1>
      <h2 className='osd-anim-fade-up' style={{ fontSize: 38, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.35s' }}>後面就順了</h2>
      <div className='osd-anim-fade-up' style={{ marginTop: 50, fontSize: 22, lineHeight: 1.7, color: 'rgba(245,241,232,0.8)', animationDelay: '0.5s' }}>
        架構設計用很多英文簡稱（NFR、SLO、ADR…）。<br/>
        這章用白話把最常見的 15 個解釋一次，<br/>
        後面所有章節再遇到就不卡關。
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 30, fontSize: 18, color: 'rgba(245,241,232,0.5)', fontStyle: 'italic', animationDelay: '0.7s' }}>
        💡 老手可直接跳到 01 SDLC 全景 · 卡關時隨時翻 91 詞彙表
      </div>
    
      <Breadcrumb part='Prologue' chapter='0.5 上路詞彙' />
      <PageNum n={1} total={6} />
      <BrandBar />
    </div>
  </>
);

// P02 · 需求類 (4 詞)
const P02: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 1 · 需求與決策</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>你跟「業務 / PM」對話的 4 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <TermCard name='NFR' en='Non-Functional Requirements'
          def='非功能需求 — 不是「做什麼」，是「做得多好」的量化標準。例：回應時間 < 200ms。' />
        <TermCard name='SLO / SLI / SLA' en='Service Level Objective / Indicator / Agreement'
          def='你「答應」做到多好（SLA 對外、SLO 對內、SLI 是實際量到的數字）。' />
        <TermCard name='ADR' en='Architecture Decision Record'
          def='把「為何選 X」寫成一份檔案，未來別人（或自己）才知道當初怎麼想的。' />
        <TermCard name='QPS' en='Queries Per Second'
          def='系統每秒收幾個請求。算容量 / 估機器數的最常用單位。' />
      </div>
      <Footer source='完整定義在 91-glossary · 卡關隨時翻附錄' />
    
      <Breadcrumb part='Prologue' chapter='0.5 上路詞彙' />
      <PageNum n={2} total={6} />
      <BrandBar />
    </div>
  </>
);

// P03 · 效能類 (3 詞)
const P03: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 2 · 效能與速度</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>「快」這件事的 3 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
        <TermCard name='Latency' en='延遲'
          def='從「請求發出」到「收到回應」中間花的時間。單位通常是毫秒 (ms)。' />
        <TermCard name='P50 / P95 / P99' en='第 50 / 95 / 99 百分位數'
          def='把所有請求依速度排序，P99 是「最慢那 1% 的分界線」。看 P99 是因為平均值會被少數慢的拉差。' />
        <TermCard name='Cache' en='快取'
          def='把「常用、不太變的資料」事先放在離使用者近一點的地方（記憶體、邊緣節點），下次就不用重算 / 重查。' />
      </div>
      <Footer source='完整定義在 91-glossary · 卡關隨時翻附錄' />
    
      <Breadcrumb part='Prologue' chapter='0.5 上路詞彙' />
      <PageNum n={3} total={6} />
      <BrandBar />
    </div>
  </>
);

// P04 · 資料類 (4 詞)
const P04: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 3 · 資料與一致性</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>資料庫話題的 4 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <TermCard name='OLTP / OLAP' en='交易型 / 分析型'
          def='OLTP = 處理一筆筆訂單 / 帳號的資料庫；OLAP = 跑報表、做統計的資料庫。兩種設計目標完全不同。' />
        <TermCard name='CAP' en='Consistency / Availability / Partition'
          def='分散式系統三選二定理。網路會壞 (P 必選)，所以你只能選「強一致」或「永遠可用」其中一個。' />
        <TermCard name='Sharding' en='資料分片'
          def='資料太多單台 DB 撐不住時，把資料拆到多台（如「user_id 0-1M 放台 A，1M-2M 放台 B」）。' />
        <TermCard name='Replication' en='複製'
          def='把資料複製到多台「讀」，主庫只負責「寫」。讀放大 + 容錯。' />
      </div>
      <Footer source='完整定義在 91-glossary · 卡關隨時翻附錄' />
    
      <Breadcrumb part='Prologue' chapter='0.5 上路詞彙' />
      <PageNum n={4} total={6} />
      <BrandBar />
    </div>
  </>
);

// P05 · 可靠性類 (4 詞)
const P05: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 4 · 可靠性與架構</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>「不掛掉」這件事的 4 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <TermCard name='Idempotency' en='冪等性'
          def='同一個操作做 1 次和做 10 次結果一樣。網路會丟包要重試，沒做冪等就會重複扣款。' />
        <TermCard name='SPOF' en='Single Point of Failure'
          def='單點故障 — 系統裡「壞了就全死」的元件。架構審查時專找這種。' />
        <TermCard name='Microservices vs Monolith' en='微服務 vs 單體'
          def='Monolith = 全部 code 在一個服務裡；Microservices = 拆成多個獨立服務。各有適合的團隊規模。' />
        <TermCard name='Queue (Kafka, SQS)' en='訊息佇列'
          def='「先把要做的事寫在排隊清單裡，慢慢做」。用來削峰、解耦、確保不掉資料。' />
      </div>
      <Footer source='完整定義在 91-glossary · 卡關隨時翻附錄' />
    
      <Breadcrumb part='Prologue' chapter='0.5 上路詞彙' />
      <PageNum n={5} total={6} />
      <BrandBar />
    </div>
  </>
);

// P06 · 三句帶走
const P06: Page = () => (
  <ThreeTakeaways chapter='On-ramp 詞彙' lines={[
    '15 個詞學完，後面就順了',
    '每個 Module 開頭都有「本章新術語」',
    '卡關時翻附錄 90-glossary',
  ]} />
);

export const meta: SlideMeta = { title: 'On-ramp · 先學這 15 個詞' };
export default [P01, P02, P03, P04, P05, P06] satisfies Page[];
