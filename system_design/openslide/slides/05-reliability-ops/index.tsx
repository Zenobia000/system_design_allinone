import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model from './assets/00_mental_model.png';
import img_01_distributed_lock_01_scenarios from './assets/01_distributed_lock_01_scenarios.png';
import img_01_distributed_lock_02_tradeoff from './assets/01_distributed_lock_02_tradeoff.png';
import img_01_distributed_lock_03_fencing from './assets/01_distributed_lock_03_fencing.png';
import img_02_contention_01_pessimistic_vs_occ from './assets/02_contention_01_pessimistic_vs_occ.png';
import img_02_contention_02_5_layers from './assets/02_contention_02_5_layers.png';
import img_02_contention_03_isolation_matrix from './assets/02_contention_03_isolation_matrix.png';
import img_03_overload_01_6_layers from './assets/03_overload_01_6_layers.png';
import img_03_overload_02_token_vs_leaky from './assets/03_overload_02_token_vs_leaky.png';
import img_04_delivery_01_6_lines from './assets/04_delivery_01_6_lines.png';
import img_04_delivery_02_circuit_breaker from './assets/04_delivery_02_circuit_breaker.png';
import img_04_delivery_03_outbox from './assets/04_delivery_03_outbox.png';
import img_05_observability_01_three_pillars from './assets/05_observability_01_three_pillars.png';
import img_05_observability_02_four_signals_slo from './assets/05_observability_02_four_signals_slo.png';
import img_99_recap_01_incident_timeline from './assets/99_recap_01_incident_timeline.png';
import * as React from 'react';
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
    <BrandBar light />
  </div>
);

const SectionEnd = ({ title, subtitle, next }: { title: string; subtitle?: string; next?: string }) => (
  <div style={{ ...fill, background: 'var(--osd-accent)', color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 140, fontWeight: 800, margin: 0 }}>{title}</h1>
    {subtitle ? <h2 style={{ fontSize: 52, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245, 241, 232, 0.85)' }}>{subtitle}</h2> : null}
    {next ? <p style={{ fontSize: 36, marginTop: 64, color: '#F5F1E8', opacity: 0.9 }}>→ {next}</p> : null}
    <BrandBar light />
  </div>
);


// ===== PAGE CHROME =====
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
.osd-stagger > *:nth-child(7) { animation-delay: 0.35s; } .osd-stagger > *:nth-child(8) { animation-delay: 0.40s; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;

const accent = '#D97757';
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
const NoviceBadge = () => (
  <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 14, background: 'rgba(91, 151, 112, 0.15)', color: ok, fontSize: 15, fontWeight: 600 }}>🐤 新手友善 · 老手可跳 →</span>
);
const TermCard = ({ name, en, def }: { name: string; en: string; def: string }) => (
  <div style={{ padding: '12px 16px', background: 'rgba(217, 119, 87, 0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 6 }}>
    <div style={{ fontSize: 19, fontWeight: 700, color: accent }}>{name} <span style={{ fontSize: 13, color: muted, fontWeight: 500 }}>· {en}</span></div>
    <div style={{ fontSize: 15, lineHeight: 1.5, marginTop: 4 }}>{def}</div>
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
  <ChapterDivider eyebrow={'CHAPTER · 05'} title={'Reliability & Ops'} subtitle={'系統故障是常態，怎麼讓使用者感覺不到'} />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={2} total={74} />
      <BrandBar />
    </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>看完本章，你能回答：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 分散式鎖怎麼安全實作？'} text={'fencing token · Redlock 為何爭議'} />
        <StackRow tone='#A1813F' label={'② 爭用如何拖垮系統？'} text={'Pessimistic vs Optimistic vs SERIALIZABLE vs 2PC vs Saga'} />
        <StackRow tone='#5B7570' label={'③ 流量爆炸怎麼擋？'} text={'6 層防線：Rate / Concurrency / Queue / Auto-scale / Shed / Backpressure'} />
        <StackRow tone='#5B9770' label={'④ 訊息要怎麼「絕對」送到？'} text={'Timeout · Retry · Idempotency · Backoff · Failover · Fallback'} />
        <StackRow tone='#5B9770' label={'⑤ 黑盒怎麼變透明？'} text={'三支柱 + 四金信號 + SLO/Error Budget'} />
      </div>
    </div>
    <Footer source={'常用技術/09 + 維運與可靠性/01 + 02 + 03 + 04'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={3} total={74} />
      <BrandBar />
    </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 可靠性的 5 個層次</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌──────────────────────────────────────────────────┐
│  ⑤ OBSERVE     Logs · Metrics · Traces           │  ← Ch.5.5
├──────────────────────────────────────────────────┤
│  ④ DELIVER     Retry · Idempotency · DLQ         │  ← Ch.5.4
├──────────────────────────────────────────────────┤
│  ③ PROTECT     Rate limit · Circuit breaker · LB │  ← Ch.5.3
├──────────────────────────────────────────────────┤
│  ② COORDINATE  Lock · Lease · Quorum             │  ← Ch.5.1
├──────────────────────────────────────────────────┤
│  ① CONTAIN     Bulkhead · Timeout · Backpressure │  ← Ch.5.2
└──────────────────────────────────────────────────┘
       由內向外，從爭用控制到全局可觀測`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Reliability 不是單點優化</strong>，而是 5 層交織。任何一層缺失都會讓系統在壓力下崩潰。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_00_mental_model} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整理自 常用技術/09 + 維運與可靠性/01-04'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={4} total={74} />
      <BrandBar />
    </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 故障是常態，不是例外</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>伺服器會崩潰、網路會丟包、資料庫會變慢、第三方服務會抖動。</strong>
把每個依賴的故障概率乘起來，加上每天幾百萬個請求 → <strong>故障在統計上就是必然發生的事</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>真正的問題</strong>
不是「如何防止故障」，而是「故障發生時，你的系統如何優雅應對」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>本章 5 個主題不是孤立的工具箱，而是<strong>互相依存的防線</strong>：每一個都建立在前一個的基礎上。</span></div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §1 開篇'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={5} total={74} />
      <BrandBar />
    </div>
);


const P06: Page = () => (
  <SectionEnd title={'Overview 完'} subtitle={'先進入第一道防線：分散式鎖。'} next={'5.1 Distributed Lock</span>'} />
);


const P07: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 05 · TOPIC 01'} title={'Distributed Lock'} subtitle={'在同一時間，只允許一個實體對某資源進行操作'} />
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_distributed_lock_01_scenarios} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={8} total={74} />
      <BrandBar />
    </div>
);


const P09: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_distributed_lock_02_tradeoff} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={9} total={74} />
      <BrandBar />
    </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何分散式鎖比想像中難？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DISTRIBUTED LOCK · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>單機 mutex</strong> 簡單：靠 OS kernel 的原子操作。
<strong>分散式鎖</strong> 難：客戶端、網路、鎖服務 <strong>任何一邊壞掉</strong>都可能讓兩個 client 同時拿到鎖。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>場景：扣庫存、Leader 選舉、避免重複任務、票券暫存</li>
          <li>風險：<strong>雙重執行 = 雙倍扣款 / 雙倍 email / 帳本不平</strong></li>
        </ul>
    </div>
    <Footer source={'常用技術/09 Distributed Lock.pdf · §1 為什麼需要'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={10} total={74} />
      <BrandBar />
    </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PDF 點名的 4 個必用場景</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DISTRIBUTED LOCK · 4 個經典場景</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① E-Commerce Checkout'} text={'結帳期間（10 分鐘）保留限量商品，避免被同時購買'} />
        <StackRow tone='#A1813F' label={'② Ride-Sharing Matchmaking'} text={'鎖定司機直到確認/拒絕，避免被多個乘客同時配對'} />
        <StackRow tone='#5B7570' label={'③ Distributed Cron Jobs'} text={'多台 server 排程任務，確保同一任務只跑一次'} />
        <StackRow tone='#5B9770' label={'④ Online Auction Bidding'} text={'最後幾秒鎖商品處理新出價，避免同時最高價衝突'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>共同特徵</strong>：多 writer 同時想改同一筆資料 / 同一資源 / 同一槽位 → 沒有協調就會出現 double-charge、double-booking。</span></div>
    </div>
    <Footer source={'常用技術/09 Distributed Lock.pdf · §1 使用場景'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={11} total={74} />
      <BrandBar />
    </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 種實作方案對比</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DISTRIBUTED LOCK · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>方案</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一致性</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>速度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>運維成本</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適合場景</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Redis SET NX EX</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>弱（split-brain 風險）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>極快</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>已有 Redis · 幂等去重</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>ZooKeeper / etcd</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>強（Raft / ZAB 共識）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>金流 · Leader 選舉</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DB Row / Advisory Lock</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>強（單 DB 內 ACID）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>慢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>零（沿用 DB）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>單區域 · 低頻控制</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>K8s `replicas: 1`</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>N/A（根本沒並發）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>—</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不追求高可用 · 簡單任務</div>
        </div>
      <Callout tone='#D97757'><strong>選型公式</strong>：先問<strong>你需要分散式鎖嗎</strong>？K8s 單副本和應用層幂等可以避掉很多場景，<strong>鎖是最後手段</strong>。</Callout>
    </div>
    <Footer source={'常用技術/09 Distributed Lock.pdf · §2 實作工具與策略'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={12} total={74} />
      <BrandBar />
    </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '60px 100px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: '8px 0 8px' }}>Lock 出問題的三個經典場景</h1>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>DISTRIBUTED LOCK · 三大陷阱</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>① 客戶端 GC 暫停</strong>
Java client 拿到鎖後 GC 30 秒，鎖過期被別人搶到，醒來繼續寫。<br />
<strong>解法</strong>：fencing token（鎖帶遞增 ID，server 拒絕舊 token 寫入）</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>② 鎖過期前未完成</strong>
業務跑超過 TTL，鎖自動釋放，下一個 client 進來雙重執行。<br />
<strong>解法</strong>：watchdog 線程自動續期（Redisson 的做法）</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>③ 鎖伺服器 failover</strong>
Master 拿到鎖後同步給 replica 之前掛掉，新 master 不知道這個鎖。<br />
<strong>解法</strong>：Redlock 多數決，或用強一致的 etcd / ZooKeeper</Callout>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_01_distributed_lock_03_fencing} alt='' style={{ width: '100%', maxHeight: 560, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'常用技術/09 Distributed Lock.pdf · §3 常見陷阱'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={13} total={74} />
      <BrandBar />
    </div>
);


const P14: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個被忽略的危險</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DISTRIBUTED LOCK · Deadlock 與時鐘偏差</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>死鎖（Deadlock）</strong>：A 拿了鎖 1 想拿鎖 2，B 拿了鎖 2 想拿鎖 1 → 永久互等。
<strong>解法</strong>：全系統統一<strong>鎖獲取順序</strong>（永遠按 user_id 升序鎖）+ 設計合理的 transaction 邊界。</Callout>
      <Callout tone='#E8634F'><strong>時鐘偏差（Clock Skew）+ 網路分區</strong>：Redlock 等基於 wall-clock 的演算法，在節點時鐘不同步、或極端網路分區下，<strong>仍可能違反互斥性</strong>（CAP 定理的代價）。
<strong>解法</strong>：強一致場景用 etcd / ZooKeeper（基於 logical time 的共識）。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這也是 <strong>Martin Kleppmann vs antirez 論戰</strong>的核心：Kleppmann 認為 Redlock 不該用於 correctness-critical 場景，只能用於 efficiency 場景（避免重複工作而非保證資料正確）。</span></div>
    </div>
    <Footer source={'常用技術/09 Distributed Lock.pdf · §3 + §5 時鐘偏差'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={14} total={74} />
      <BrandBar />
    </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>能不用鎖就不用鎖</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DISTRIBUTED LOCK · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'替代方案優先'} items={['<strong>樂觀鎖</strong>：version 比對 + 重試', '<strong>幂等性</strong>：操作多次結果相同 → 不需鎖', '<strong>單分區處理</strong>：同 key 永遠路由同 worker', '<strong>原子操作</strong>：DB 的 UPDATE WHERE 條件', '<strong>K8s replicas:1</strong>：根本沒並發']} />
        <TradeoffCol tone='#E8634F' title={'必須用鎖的場景'} items={['多步驟操作須整體互斥', '跨資源（DB + 外部 API）一致', 'Leader 選舉 / Singleton 任務', '面向用戶的「預留」流程（票券）']} />
      </div>
      <Callout tone='#E8634F'><strong>Linus 哲學</strong>：鎖是設計失敗的證據。<strong>先想能不能改資料結構消除鎖</strong>，再考慮鎖。</Callout>
    </div>
    <Footer source={'常用技術/09 Distributed Lock.pdf · §4 + §6 最後思考'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={15} total={74} />
      <BrandBar />
    </div>
);


const P16: Page = () => (
  <SectionEnd title={'Distributed Lock 完'} subtitle={'鎖是粗粒度協調，下一站看更細的爭用控制。'} next={'5.2 Contention</span>'} />
);


const P17: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 05 · TOPIC 02'} title={'Contention'} subtitle={'讀寫不是原子的，那個微小的窗口足以讓你超賣'} />
);


const P18: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_contention_02_5_layers} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={18} total={74} />
      <BrandBar />
    </div>
);


const P19: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_contention_03_isolation_matrix} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={19} total={74} />
      <BrandBar />
    </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>演唱會搶票的經典 race condition</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>The Weeknd 演唱會剩 1 個座位，Terry 與 Bohr 同時點「立即購買」</strong>：</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>1. Terry 讀取「剩 1 個座位」
2. Bohr 也讀到「剩 1 個座位」（兩個讀取都在任一寫入發生前完成）
3. 兩人都判斷 1 ≥ 1 → 進入付款
4. Terry 扣 $500，座位數 → 0
5. Bohr 扣 $500，座位數 → <strong>-1</strong>
6. 兩個人到場館，都認為 Row 5 Seat 12 是自己的</div>
      <Callout tone='#E8634F'><strong>root cause</strong>：讀取和寫入<strong>不是原子的</strong>。在「讀取狀態」和「根據狀態做更新」之間有時間差，記憶體裡微秒、網路上毫秒——一切都可能改變。</Callout>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §1 問題'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={20} total={74} />
      <BrandBar />
    </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>從 atomicity 到分散式協調</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · 五層解法的複雜度遞進</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Atomicity / Transaction'} text={'BEGIN ... COMMIT，全部成功或全部失敗'} />
        <StackRow tone='#A1813F' label={'② Pessimistic Locking'} text={'SELECT ... FOR UPDATE 先鎖再改'} />
        <StackRow tone='#5B7570' label={'③ Optimistic Concurrency (OCC)'} text={'version 比對，衝突再重試'} />
        <StackRow tone='#5B9770' label={'④ SERIALIZABLE Isolation'} text={'DB 自動偵測衝突並 abort 其中一個'} />
        <StackRow tone='#5B9770' label={'⑤ 分散式：2PC / Saga / Distributed Lock'} text={'跨 DB 才用'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：能在單 DB 解決就不要跨 DB；能用 OCC 就不要用 pessimistic；能用 atomicity 就不要用 lock。</span></div>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §2 解法架構'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={21} total={74} />
      <BrandBar />
    </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩種典型的併發控制</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · Pessimistic vs Optimistic</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Pessimistic Locking'} items={['<code>SELECT ... FOR UPDATE</code> 先取排他鎖', '假設衝突一定會發生，先預防', '**適合高 contention**、嚴格一致性', '代價：lock overhead、可能死鎖']} />
        <TradeoffCol tone='#E8634F' title={'Optimistic (OCC)'} items={['<code>UPDATE WHERE version = X</code>', '假設衝突很少，衝突再重試', '**適合低 contention**、讀多寫少', '代價：高衝突時不斷重試、ABA 問題']} />
      </div>
      <Callout tone='#E8634F'><strong>ABA 問題</strong>：thread A 讀到 A，B 改成 B 再改回 A，A 做 compare-and-swap 以為沒變。OCC 用簡單版本號或記憶體重複使用時可能踩到。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_02_contention_01_pessimistic_vs_occ} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §2 + ABA 警告'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={22} total={74} />
      <BrandBar />
    </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 個標準 isolation level（不是進階程度）</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · Isolation Level</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Level</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>看得到</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>場景</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>READ UNCOMMITTED</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>其他 tx 尚未 commit 的變更</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>極少使用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>READ COMMITTED</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>只能看到已 commit 的變更</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PostgreSQL 預設</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>REPEATABLE READ</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>tx 內多次讀取結果一致</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MySQL 預設</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SERIALIZABLE</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>tx 看起來像逐個執行</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需要強保證</div>
        </div>
      <Callout tone='#D97757'><strong>搶票的 race condition</strong>：READ COMMITTED / REPEATABLE READ <strong>都防不住</strong>——Terry 和 Bohr 都讀到「剩 1」再各自更新。<strong>SERIALIZABLE</strong> 透過自動 abort 衝突 tx 來解決，但代價是<strong>衝突偵測 overhead 和 abort 後的重做</strong>。</Callout>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §2 Isolation Level'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={23} total={74} />
      <BrandBar />
    </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>跨 DB：2PC vs Saga</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · 多節點解法</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Two-Phase Commit (2PC)'} items={['Coordinator 統一管 prepare → commit', '強一致：要嘛全成功要嘛全 rollback', '**昂貴脆弱**：coordinator 在 prepare 後崩潰 → tx 卡死', '跨網路持有開啟中 tx 鎖住 row']} />
        <TradeoffCol tone='#E8634F' title={'Saga Pattern'} items={['拆成獨立步驟，每步獨立 commit', '失敗用**補償操作**（compensate）撤銷', '韌性好：每步是完整 tx，沒人卡死', '代價：**過程中暫時不一致**（最終一致）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>選擇</strong>：強一致用 2PC（罕用，不到不得已不上）；追求韌性用 Saga（電商、訂單常見）。<strong>先問：能不能把資料放同一 DB？</strong> 十次有九次可以，那就免了分散式協調。</span></div>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §3 多節點'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={24} total={74} />
      <BrandBar />
    </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>該選哪個？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · 5 種方案速判表</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>方案</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適合</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>不適合</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>延遲</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>複雜度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Pessimistic Locking</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高 contention · 嚴格一致 · 單 DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低 contention · 高吞吐</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SERIALIZABLE Isolation</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自動衝突偵測 · 不確定鎖哪些</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>效能關鍵 · 高 contention</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Optimistic Concurrency</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低 contention · 讀多寫少</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高 contention · 不接受重試</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Distributed Transaction</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨系統強原子</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高可用 · 效能關鍵</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>非常高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Distributed Lock</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>面向用戶預留 · 比 2PC 簡單</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>純技術協調</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>決策樹</strong>：資料能放單 DB？高 contention 用 pessimistic lock，低 contention 用 OCC。資料必須跨 DB？能容忍最終一致用 Saga，必須強一致才用 2PC。</span></div>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §4 選擇正確的做法'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={25} total={74} />
      <BrandBar />
    </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Ticketmaster 的「pending」狀態</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · 應用層預留模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>問題</strong>：用戶選座位後填付款資訊要 5 分鐘——這 5 分鐘裡座位算誰的？
<strong>糟糕做法</strong>：等付款完成才扣減 → 用戶填完才發現「座位被搶走」。
<strong>正確做法</strong>：選座當下立即進入「<strong>pending（已預留）</strong>」狀態，<strong>TTL 10 分鐘</strong>，給時間完成付款。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Contention 窗口從<strong>整個流程（5 分鐘）縮小到只有「預留」那毫秒</strong></li>
          <li>Uber 同款：司機狀態設為 `pending_request` 防止多乘客同時配對</li>
          <li>電商「暫時 hold」進購物車也是同樣模式</li>
        </ul>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §3 + §5 面試情境'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={26} total={74} />
      <BrandBar />
    </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>不要過度設計</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTENTION · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'降低同時搶同一個東西的人數'} items={['Sharding 鎖：1 個全局鎖切 100 個子鎖', 'Bulkhead：不同業務不同 connection pool', 'Backpressure：上游主動降速', 'Async / Batch：把同步呼叫改成 queue']} />
        <TradeoffCol tone='#E8634F' title={'常見的過度設計'} items={['單 DB transaction 加 row lock 就夠 → 硬上 Redis distributed lock', '低 contention 場景 → 用 SERIALIZABLE', '沒跨 DB 需求 → 上 2PC']} />
      </div>
      <Callout tone='#E8634F'><strong>面試紅線</strong>：被問「contention 怎麼處理」時，<strong>主動從單 DB 開始說起</strong>，不要直接跳到 distributed lock 或 2PC。加新的元件就是加新的故障點。</Callout>
    </div>
    <Footer source={'維運與可靠性/01 Dealing with Contention.pdf · §5 不要過度設計'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={27} total={74} />
      <BrandBar />
    </div>
);


const P28: Page = () => (
  <SectionEnd title={'Contention 完'} subtitle={'單筆資料的爭用解了，再看整個系統的流量爭用。'} next={'5.3 Overload Protection</span>'} />
);


const P29: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 05 · TOPIC 03'} title={'Overload Protection'} subtitle={'讓系統在壓力下優雅降級，而不是全面崩潰'} />
);


const P30: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_overload_01_6_layers} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={30} total={74} />
      <BrandBar />
    </div>
);


const P31: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_overload_02_token_vs_leaky} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={31} total={74} />
      <BrandBar />
    </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何流量一爆系統就連環炸？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>沒有保護的系統面對 10× 流量</strong>：
1. CPU 撐不住，response time 飆
2. Client 重試，流量再 ×3
3. Connection pool 滿，timeout 連環
4. 上游服務也跟著崩 → <strong>全棧連鎖故障（雪崩）</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>核心思想</strong>：在 10 倍流量下，<strong>應該服務其中的 30%，而不是讓 100% 都失敗</strong>。
保護不是 nice-to-have，是上線清單必備。</Callout>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §1 核心問題'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={32} total={74} />
      <BrandBar />
    </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>6 層防線（不是選一個，是疊起來）</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`外部流量進來
       ↓
① Rate Limiting          擋惡意請求和超量單一客戶
       ↓
② Concurrency Limiting   保護後端資源不被耗盡
       ↓
③ Queue-based Leveling   吸收突發，平滑流量
       ↓                  ← Auto-scaling 持續擴容
④ Bulkhead              隔離不同依賴，防局部過載蔓延
       ↓
⑤ Load Shedding         最後防線：選擇性丟棄低優先級
       ↑
⑥ Backpressure          整條鏈路協同減速訊號`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>每一層都有它能擋的，也有它擋不住的。<strong>面試重點不是背 6 個名詞，而是說清為什麼需要多層保護</strong>。</span></div>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §1 + §10 工具組合'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={33} total={74} />
      <BrandBar />
    </div>
);


const P34: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 種限流演算法的數學差異</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · Rate Limit 演算法</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Token Bucket（業界默認）'} items={['系統以固定速率往桶放令牌（如每秒 10 個）', '桶有上限（如 100 個）', '**允許短暫突發**（桶裡積令牌）', 'Redis + Lua 容易做分散式']} />
        <TradeoffCol tone='#E8634F' title={'Leaky Bucket'} items={['請求任意速率進入，**固定速率流出**', '強制輸出速率平滑，**不允許突發**', '適合嚴格控制處理速率（外部 API 調用）', '對下游嚴格保護']} />
      </div>
      <Callout tone='#E8634F'><strong>Fixed Window 反模式</strong>：第 59 秒發 100 個 + 第 61 秒再發 100 個 → 視窗邊界 2 秒內<strong>實際通過 200 個</strong>。Sliding Window 解決邊界突發但占記憶體。</Callout>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §2 演算法'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={34} total={74} />
      <BrandBar />
    </div>
);


const P35: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>多伺服器各自計數沒意義</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · 分散式 Rate Limiting</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>問題</strong>：客戶端把請求分散打到不同 server，每台自己計數 → 輕鬆繞過限制。
<strong>解法</strong>：用<strong>集中式計數器</strong>（通常是 Redis），原子操作（INCR + EXPIRE 或 Lua script）保證計數無 race。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>正確的回應 header</strong>（被限的請求應回 `429 Too Many Requests`）：</div>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`HTTP/1.1 429 Too Many Requests
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1700000060`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>延遲代價</strong>：每請求多 1 次 Redis 查詢（&lt; 1ms 可接受）。極低延遲場景用本地計數器 + 定期同步。</span></div>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §2 分散式 + 回應'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={35} total={74} />
      <BrandBar />
    </div>
);


const P36: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Rate Limit 不夠：同時處理數才是後端真實壓力</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · Concurrency Limit</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Rate Limit vs Concurrency Limit</strong>
Rate Limit 限「<strong>每秒幾個請求</strong>」；Concurrency Limit 限「<strong>同時處理中幾個請求</strong>」。<br />
若每請求要花 1 秒，限 200 RPS = 同時 200 個在跑，遠超執行緒池容量。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Adaptive Concurrency Limiting</strong>
Netflix 開源：根據延遲動態調整並發上限。延遲升高 → 自動降並發數；延遲下降 → 逐步放寬。<strong>比靜態值更貼近真實狀況</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>搭配關係</strong>：Rate limit 擋突發流量（公平性），concurrency limit 保護內部資源（容量）——兩者通常一起用。</span></div>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §3 Concurrency'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={36} total={74} />
      <BrandBar />
    </div>
);


const P37: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>過載時策略性丟棄，不是隨機丟棄</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · Load Shedding 與優先級</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>優先級</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>請求類型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>理由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>最高</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>付費用戶的核心操作</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>直接影響收入和 SLA</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>高</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一般用戶的核心操作</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>業務關鍵功能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>中</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>非核心功能（推薦、搜尋）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可降級或跳過</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>低</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>後台任務、分析請求</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可延遲處理</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>最低</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>監控、日誌上報</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不影響用戶</div>
        </div>
      <Callout tone='#D97757'><strong>Linus 哲學</strong>：處理 30% 的請求 + 其他 70% 快速失敗（明確錯誤），<strong>遠比讓所有請求一起慢死要好</strong>。
<strong>重試請求優先丟棄</strong>：帶 `X-Retry-Count: 2` 的請求，這次過載可能就是它造成的，先丟它保第一次嘗試的新請求。</Callout>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §6 + §7 Request Prioritization'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={37} total={74} />
      <BrandBar />
    </div>
);


const P38: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>艙壁隔離：一艙進水不沉船</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · Bulkhead</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'執行緒池隔離'} text={'不同下游依賴用獨立執行緒池（DB / 支付 / 通知）'} />
        <StackRow tone='#A1813F' label={'租戶隔離'} text={'大客戶獨立服務實例 / 資料庫分片；小客戶共用但有 concurrency limit'} />
        <StackRow tone='#5B7570' label={'連線池隔離'} text={'Read pool 走 replica · Write pool 走 primary'} />
        <StackRow tone='#5B9770' label={'故障域隔離'} text={'不同 AZ / region · 一個 AZ 掛不影響另一個'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>粒度怎麼決定？</strong>
<strong>根據故障影響的相關性劃分</strong>：把那些「如果它掛掉，你希望不影響哪些功能」隔離成獨立 bulkhead。從 3 到 5 個 bulkhead 開始，根據實際故障模式再調。</Callout>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §8 + §11 deep dive'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={38} total={74} />
      <BrandBar />
    </div>
);


const P39: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>讓壓力訊號往上游傳播</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · Backpressure</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>TCP 層</strong>
接收方緩衝區滿 → 通知發送方縮小傳送視窗（receive window） → 自動放慢</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>gRPC（HTTP/2 flow control）</strong>
每個 stream 和 connection 都有流量控制視窗，接收方暫停接收讓發送方等待</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>應用層</strong>
回 &lt;code&gt;429 + Retry-After: 5&lt;/code&gt;，讓 client 主動退避而不是盲目重試</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Backpressure vs Load Shedding</strong>：load shedding 是<strong>丟棄請求</strong>；backpressure 是<strong>讓上游放慢，不丟任何東西</strong>。Backpressure 更溫和，但需上游配合。</span></div>
    </div>
    <Footer source={'維運與可靠性/02 Overload Protection.pdf · §9 Backpressure'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={39} total={74} />
      <BrandBar />
    </div>
);


const P40: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Retry 的正確姿勢</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERLOAD PROTECTION · 退避加抖動</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Exponential Backoff</strong>
重試間隔：1s → 2s → 4s → 8s · <strong>避免立即重試的雪崩</strong></Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Full Jitter（AWS 推薦）</strong>
&lt;code&gt;delay = random(0, base × 2^attempt)&lt;/code&gt; · <strong>避免重試風暴</strong>（thundering herd）</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Retry Budget</strong>
全局限制：重試流量不超過正常流量的 <strong>10%</strong> · <strong>避免重試本身放大故障</strong></Callout>
      <Callout tone='#E8634F'><strong>反模式</strong>：所有客戶端<strong>指數退避曲線相同</strong> → 第 2、4、8 秒同步重試，仍形成脈衝。<strong>抖動是必須的</strong>。</Callout>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §退避加抖動'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={40} total={74} />
      <BrandBar />
    </div>
);


const P41: Page = () => (
  <SectionEnd title={'Overload Protection 完'} subtitle={'系統不被擊倒了，下一步看訊息怎麼可靠送達。'} next={'5.4 Reliable Delivery</span>'} />
);


const P42: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 05 · TOPIC 04'} title={'Reliable Delivery'} subtitle={'故障不是例外而是常態，6 道防線讓系統優雅應對'} />
);


const P43: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何訊息送達這麼難？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>生產者 / Broker / 消費者</strong> 任意一邊都可能壞。
<strong>「絕對送到一次」</strong> 在分散式系統裡是 <strong>不可能</strong>——只能在語意上模擬。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>語意</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>保證</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>風險</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>範例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>At-most-once</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最多送一次</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可能丟失</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>點擊統計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>At-least-once</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>至少送一次</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可能重複</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訂單確認 email</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Exactly-once</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>邏輯上恰好一次</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需要冪等性配合</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>金流交易</div>
        </div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §1'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={43} total={74} />
      <BrandBar />
    </div>
);


const P44: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>不是孤立的工具，是一套相依的系統</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · 六大防線</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`請求發出
   ↓
① Timeout（讓故障快速失敗）
   ↓
② Retry（對暫時故障再給機會）
   ↓
③ Backoff with Jitter（防驚群效應）
   ↓
④ Idempotency（讓重試安全）
   ↓
⑤ Circuit Breaker（失敗率太高就熔斷）
   ↓
⑥ Failover / Fallback（找替代或降級）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>理解它們的關係，比記每個定義更重要</strong>。每一個防線建立在前一個的基礎上。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_04_delivery_01_6_lines} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §概念串接'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={44} total={74} />
      <BrandBar />
    </div>
);


const P45: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>最基本也最常被遺忘的防線</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · Timeout</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>4 種 timeout</strong>
<strong>Connection Timeout</strong>（建立連線的最長等待，幾百 ms 到幾秒）<br />
<strong>Read Timeout</strong>（連線後等回應的最長時間，依下游 P99 設定）<br />
<strong>Write Timeout</strong>（送出資料的最長時間）<br />
<strong>Overall Request Timeout</strong>（端到端預算，含所有重試）</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>怎麼設值</strong>
<strong>下游 P99 的 2-3 倍</strong>。如下游 P99 = 150ms → timeout 設 400ms。<br />
太短引入太多誤殺，太長失去意義。</Callout>
      <Callout tone='#E8634F'><strong>沒設 timeout 的後果</strong>：依賴卡住 → 連線池塞滿 → 你的服務也停止回應 → <strong>級聯故障（cascading failure）</strong>。</Callout>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §超時'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={45} total={74} />
      <BrandBar />
    </div>
);


const P46: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>不是所有錯誤都該重試</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · Retry 該不該重試？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'應該重試'} items={['網路暫時錯誤（連線/讀取超時、ECONNRESET）', '5xx 伺服器錯誤（503、502，通常是暫時過載）', '資料庫連線池暫時耗盡']} />
        <TradeoffCol tone='#E8634F' title={'不應該重試'} items={['4xx 客戶端錯誤（400、401、403、404）', '業務邏輯錯誤（庫存不足、餘額不夠）', '非冪等操作（在做完冪等之前）']} />
      </div>
      <Callout tone='#D97757'><strong>最大重試次數</strong>：通常 <strong>3 到 5 次</strong>。超過就讓請求失敗，由上層降級邏輯接管。<strong>無限重試 + 所有 client 都重試 = 把已過載的系統推向更深淵</strong>。</Callout>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §重試'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={46} total={74} />
      <BrandBar />
    </div>
);


const P47: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>讓重試變得安全</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · Idempotency</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>天然冪等的操作</strong>
<strong>GET</strong>（不改變狀態）· <strong>PUT</strong>（完整替換，多次 PUT 結果相同）· <strong>DELETE</strong>（刪除已不存在的資源結果相同）</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>不冪等的操作（要特別處理）</strong>
<strong>POST</strong>（建立新資源）：建立兩次訂單就有兩筆訂單</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Idempotency Key 模式（Stripe 的做法）</strong>
Client 第一次送請求時附 UUID，重試帶相同 ID。<br />
Server 先查去重表：有就直接回前次結果，沒有才執行並存結果（TTL 24h）。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>訊息佇列必備</strong>：at-least-once delivery 是 Kafka/SQS 常見保證，consumer 必須冪等才能安全處理重複訊息。用 `message_id` 做唯一鍵。</span></div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §冪等性 + Stripe API'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={47} total={74} />
      <BrandBar />
    </div>
);


const P48: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>同步重試的驚群效應</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · Backoff + Jitter</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>反模式</strong>：100 個 client 在同一毫秒失敗 → 全部 1 秒後重試 → 100 個請求又同時擊中已奄奄一息的服務 → <strong>驚群效應（thundering herd）</strong>。指數退避<strong>也只是把脈衝延後</strong>，不分散。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`# AWS 官方推薦：Full Jitter
def retry_with_jitter(fn, max_retries=5, base_delay=1.0, max_delay=30.0):
    for attempt in range(max_retries):
        try:
            return fn()
        except RetryableError:
            cap = min(base_delay * (2 ** attempt), max_delay)
            delay = random.uniform(0, cap)   # ← 在 [0, cap] 隨機選
            time.sleep(delay)`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Decorrelated Jitter</strong> 變體：每次等待時間基於上次等待時間，隨機性更強，效果通常更好但實作稍複雜。</span></div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §退避加抖動 (AWS)'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={48} total={74} />
      <BrandBar />
    </div>
);


const P49: Page = () => (
  <div style={{ ...fill, padding: '60px 100px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: '8px 0 8px' }}>失敗率超閾值就熔斷，三狀態圖</h1>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>RELIABLE DELIVERY · Circuit Breaker</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`Closed（正常） → 失敗率超過閾值 → Open（熔斷）
                                    ↓ 等待一段時間（如 30s）
                                Half-Open（半開）
                                  ↙        ↘
                          測試請求成功    測試請求失敗
                            → Closed       → Open`}</pre>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Closed（正常）</strong> 監控失敗率，正常轉發</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Open（熔斷）</strong> 直接走降級，下游服務得到喘息</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Half-Open（半開）</strong> 放一個探針請求進來測試是否恢復</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Half-Open 的關鍵</strong>：恢復後<strong>不要立刻全流量放開</strong>，要 traffic ramp-up 逐步放量，否則突然全流量再次擊垮剛恢復的服務。</span></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_04_delivery_02_circuit_breaker} alt='' style={{ width: '100%', maxHeight: 560, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §熔斷器三狀態'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={49} total={74} />
      <BrandBar />
    </div>
);


const P50: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個都是「服務替代」，方向不同</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · Failover vs Fallback</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Failover（故障切換）'} items={['找一個**健康的同類**來替代', 'LB health check 把不健康節點移出', 'DB Primary 掛 → 提升 Replica（同步：無丟失但慢；非同步：快但可能失資料）', 'RDS Multi-AZ 自動切換 ~60 秒']} />
        <TradeoffCol tone='#E8634F' title={'Fallback（降級回應）'} items={['用一個**較簡陋但能用**的替代撐過去', 'DB 掛 → 回快取裡的舊資料（serve stale）', '推薦系統掛 → 回「熱門商品」靜態列表', '評分服務超時 → 顯示「暫時不可用」而不是整頁崩潰']} />
      </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §故障切換 + 降級回應'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={50} total={74} />
      <BrandBar />
    </div>
);


const P51: Page = () => (
  <div style={{ ...fill, padding: '60px 100px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: '8px 0 8px' }}>事務性 Outbox + 毒訊息隔離</h1>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>RELIABLE DELIVERY · Outbox / DLQ</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Transactional Outbox</strong>
寫業務 + 寫 outbox 表在<strong>同一個 DB transaction</strong>裡完成。<br />
背景進程從 outbox 撈訊息送到 broker（搭配 CDC 如 Debezium 直接讀 WAL）。<br />
<strong>徹底解決</strong>「DB 寫成功但訊息發送失敗」的不一致。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Dead Letter Queue（DLQ）</strong>
重試 3-5 次仍失敗的訊息送 DLQ，主流程不被毒訊息堵塞。<br />
<strong>監控指標</strong>：DLQ 訊息數應為 0；&gt; 0 工程師介入。</Callout>
      <Callout tone='#E8634F'><strong>沒 DLQ 的災難</strong>：毒訊息卡住 partition → 整批訊息堵在後面 → 系統看起來活著但沒在動。</Callout>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_04_delivery_03_outbox} alt='' style={{ width: '100%', maxHeight: 560, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §3 + 整合 Outbox 慣例'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={51} total={74} />
      <BrandBar />
    </div>
);


const P52: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>面試金句模板</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RELIABLE DELIVERY · 一段話講完</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'>「這地方我們調用了<strong>支付 API</strong>。我會設定 <strong>3 秒讀取超時</strong>，對 <strong>5xx 錯誤做指數退避重試</strong>（最多 3 次，加上 jitter 防驚群效應）。每個支付請求<strong>帶上冪等鍵</strong>，確保重試不會導致重複扣款。如果失敗率在 30 秒內超過 50%，<strong>熔斷器打開</strong>，直接回傳『支付服務暫時不可用』的錯誤，而不是讓用戶等到超時。」</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這一段話就涵蓋了 <strong>Timeout、Retry、Backoff with Jitter、冪等性、Circuit Breaker</strong>，完整而自然。<strong>比逐個列定義更有說服力</strong>。</span></div>
    </div>
    <Footer source={'維運與可靠性/03 Reliable Delivery.pdf · §面試裡的說法'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={52} total={74} />
      <BrandBar />
    </div>
);


const P53: Page = () => (
  <SectionEnd title={'Reliable Delivery 完'} subtitle={'系統能優雅應對故障，最後讓它變透明可觀測。'} next={'5.5 Observability</span>'} />
);


const P54: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 05 · TOPIC 05'} title={'Observability'} subtitle={'你不能修復你看不見的東西'} />
);


const P55: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_05_observability_01_three_pillars} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={55} total={74} />
      <BrandBar />
    </div>
);


const P56: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_05_observability_02_four_signals_slo} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={56} total={74} />
      <BrandBar />
    </div>
);


const P57: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何「能登入」不等於「能用」？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Monitoring 告訴你「壞了沒」</strong>（已知問題的告警）。
<strong>Observability 告訴你「為什麼壞」</strong>（任意問題都能 debug）。
<strong>沒有 Observability，分散式系統就是黑盒</strong>——你不知道請求死在哪。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>PDF 開場：週五晚某個服務 response time 從 200ms 跳到 8 秒。是 DB 慢？下游 API 掛？新部署的 bug？流量爆增？<strong>你不知道，你像在黑暗中摸索</strong>。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §1 開場'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={57} total={74} />
      <BrandBar />
    </div>
);


const P58: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Logs · Metrics · Traces</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · 三支柱</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Metrics（時序聚合）</strong>
    系統<strong>狀態如何</strong>？趨勢是什麼？<br />
    QPS · latency · error rate · Prometheus</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Logs（離散事件）</strong>
    這個事件<strong>發生了什麼</strong>？<br />
    結構化 JSON · 帶 trace_id · ELK / Loki</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Traces（請求鏈路）</strong>
    請求<strong>走了哪裡 · 哪段慢</strong>？<br />
    一個請求穿過 N 個服務 · OpenTelemetry</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Profiles（CPU 火焰圖）</strong>
    第四支柱（新興）<br />
    Continuous profiling</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>三支柱要互相串聯</strong>：log 帶 trace_id、metric 標 service name、trace 採異常請求 → 點 trace_id 跳到對應 logs。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §2 三支柱'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={58} total={74} />
      <BrandBar />
    </div>
);


const P59: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Counter · Gauge · Histogram</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · Metric 三型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Counter（計數器）</strong>
<strong>只會單調遞增</strong>：HTTP 請求總數、錯誤總數。看的不是值本身，是<strong>增長速率</strong>（每秒新增多少）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Gauge（儀表）</strong>
<strong>可上下浮動</strong>：當前記憶體使用、連線池使用數、佇列深度。代表某個時間點的即時狀態。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Histogram（直方圖）</strong>
<strong>值分桶統計分佈</strong>：用來計算延遲百分位數。<br />
"P99 延遲 = 450ms" 就是從 Histogram 算出，把所有延遲放桶裡，排第 99 百分位的那個值。</Callout>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §2 Metrics 類型'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={59} total={74} />
      <BrandBar />
    </div>
);


const P60: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Google SRE 的監控基本盤</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · 四金信號</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Latency（延遲）'} text={'要區分**成功**請求和**失敗**請求的延遲（快速失敗 vs 緩慢成功意義完全不同）'} />
        <StackRow tone='#A1813F' label={'② Traffic（流量）'} text={'每秒多少請求，衡量系統負載的基準'} />
        <StackRow tone='#5B7570' label={'③ Errors（錯誤率）'} text={'區分**顯性錯誤**（HTTP 500）和**隱性錯誤**（回 200 但內容是錯的）'} />
        <StackRow tone='#5B9770' label={'④ Saturation（飽和度）'} text={'系統還有多少餘裕？CPU / 記憶體 / 磁碟，越接近上限越脆弱'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試一句話</strong>：「我會暴露 Prometheus metrics，監控四個黃金信號：延遲（P99）、流量（RPS）、錯誤率（5xx 比例）、飽和度（CPU / 記憶體使用率）。」</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §四個黃金信號'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={60} total={74} />
      <BrandBar />
    </div>
);


const P61: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>對症狀警告，不對原因警告</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · 警告反模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>反模式 · 對原因警告</strong>：CPU 超 80% 警告、記憶體超 70% 警告。
<strong>結果</strong>：警告太多，但不一定代表用戶有感受到問題 → <strong>alert fatigue（警告疲勞）</strong> → 工程師開始忽略警告。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`# 不好：對原因警告
- alert: HighCPU
  expr: cpu_usage > 0.8
  # CPU 高不一定代表用戶有問題

# 好：對症狀警告
- alert: HighErrorRate
  expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.01
  annotations:
    summary: "錯誤率超過 1%，用戶正在受到影響"`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>判斷標準</strong>：用戶有沒有感受到問題？沒有就不該叫醒工程師。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §對症狀警告'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={61} total={74} />
      <BrandBar />
    </div>
);


const P62: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Metrics → Traces → Logs</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · 排查順序</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`1. Metrics 警告觸發
   "P99 延遲從 200ms 升到 2 秒"
        ↓
2. 查 Traces 找到慢的請求
   "這些慢請求都卡在 Order Service 的 DB Query"
        ↓
3. 查 Logs 找到具體原因
   "Order Service 在這段時間有大量 'slow query: 1.8s' 的 warning log"
        ↓
結論：Order Service 有個 SQL 查詢沒用到索引`}</pre>
      <Callout tone='#D97757'><strong>三者搭配才是完整排查流程</strong>：Metrics 是觀察儀表板（先發現），Traces 縮範圍（哪個服務 / 操作），Logs 給細節（具體錯誤）。</Callout>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §三者如何互補'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={62} total={74} />
      <BrandBar />
    </div>
);


const P63: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>標籤爆炸殺死 Prometheus</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · Cardinality 反模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>反模式</strong>：metric 加 `user_id` 當 label → 1000 萬用戶 → <strong>1000 萬條時序</strong>，記憶體爆炸、查詢龜速。
Prometheus、Datadog 等都對 cardinality 有上限，超過就拒絕寫入或破產。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適合做 metric label</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適合放 log / trace</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>`service`, `endpoint`, `method`, `status_code`</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 數量有限</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>—</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>`region`, `tenant_id`（少量大客戶）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>—</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>`user_id`, `request_id`, `trace_id`, `email`</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 高 cardinality</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 放 log / trace</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>規則</strong>：label 的 unique 值估計超過幾千個就要警惕；超過幾萬個必爆。需要 per-user 分析？放 log 用 ES / Loki 查。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §Metrics 設計（補強重點）'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={63} total={74} />
      <BrandBar />
    </div>
);


const P64: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>全採樣太貴 · Head-based 採樣會漏 bug</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · Tail-Based Sampling</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Head-based Sampling'} items={['請求一進來就決定採不採（隨機 1%）', '實作簡單、開銷低', '**問題**：隨機 1% 大概率採不到那個慢請求']} />
        <TradeoffCol tone='#E8634F' title={'Tail-based Sampling（業界做法）'} items={['所有 trace 收集到記憶體 buffer', '只保留**錯誤的、慢的、重要的**', '正常請求按 1% 採', '比 head-based 聰明 10 倍']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Log 取樣策略</strong>：對 INFO level 取樣 10-20%，<strong>ERROR / WARN 永遠 100% 保留</strong>；設 TTL（30-90 天）；只對關鍵欄位（service、user_id、trace_id、level）建索引，不全文索引（Loki 模式）。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §採樣 + Log 量太大'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={64} total={74} />
      <BrandBar />
    </div>
);


const P65: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三個被混淆的概念</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · SLI / SLO / SLA</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>SLI · Service Level Indicator</strong>
你用來衡量服務品質的具體<strong>指標</strong>。例：「成功請求的比例」、「P99 延遲」。SLI 就是一個 metric。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>SLO · Service Level Objective</strong>
你對 SLI 設定的<strong>目標值</strong>（內部承諾）。例：「成功率 ≥ 99.9%」、「P99 ≤ 500ms」。決定是否觸發警告、是否要放慢發布。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>SLA · Service Level Agreement</strong>
你對<strong>外部客戶承諾的合約</strong>，通常比內部 SLO 寬鬆。內部 SLO 99.9%，對外 SLA 可能 99.5% 留緩衝。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>目前狀態：SLI &gt; SLO &gt; SLA</strong>，一切正常。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §SLI SLO SLA'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={65} total={74} />
      <BrandBar />
    </div>
);


const P66: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把可靠性變成可以討論的數字</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · Error Budget</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>43 min</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>SLO 99.9% → 每月允許停機 0.1% × 30 天 × 24h × 60min = 約 43 分鐘</strong></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'錯誤預算還充足'} items={['可以繼續快速發布新功能', '承擔風險的空間還在']} />
        <TradeoffCol tone='#E8634F' title={'錯誤預算快耗盡'} items={['放慢發布節奏', '優先修復可靠性問題']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反模式</strong>：SLO 設 100%。意味永遠不能做任何可能影響穩定性的改動，包括發新功能。<strong>通常從 99.9% 開始</strong>，根據業務敏感度調整。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §Error Budget'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={66} total={74} />
      <BrandBar />
    </div>
);


const P67: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個常用的指標方法論</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBSERVABILITY · USE / RED Method</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'USE Method（資源視角）'} items={['<strong>U</strong>tilization：使用率（CPU / 記憶體 / 磁碟）', '<strong>S</strong>aturation：飽和度（隊列深度 / 等待時間）', '<strong>E</strong>rrors：錯誤計數', '適合監控**基礎設施**（Brendan Gregg 提出）']} />
        <TradeoffCol tone='#E8634F' title={'RED Method（請求視角）'} items={['<strong>R</strong>ate：請求速率（RPS）', '<strong>E</strong>rrors：錯誤率', '<strong>D</strong>uration：延遲分佈', '適合監控**服務 / API**（Tom Wilkie 提出）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>搭配</strong>：四金信號 ≈ RED + Saturation。對 service 用 RED，對 host / pod 用 USE，組合起來覆蓋全棧。</span></div>
    </div>
    <Footer source={'維運與可靠性/04 Observability.pdf · §補充（業界共識）'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={67} total={74} />
      <BrandBar />
    </div>
);


const P68: Page = () => (
  <SectionEnd title={'Observability 完'} subtitle={'五道防線都有了，看一個 incident 怎麼把它們串起來。'} next={'5.6 Recap & Case Study</span>'} />
);


const P69: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 05 · RECAP'} title={'Recap & Case Study'} subtitle={'一個 incident，把 5 層可靠性串起來'} />
);


const P70: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>設計：把 5 層配齊</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE STUDY · 訂單系統的可靠性堆疊</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Contain'} text={'資料層連線池隔離（read pool / write pool）· timeout 1s · bulkhead 隔離支付/通知/DB'} />
        <StackRow tone='#A1813F' label={'② Coordinate'} text={'庫存扣減用 etcd 分散式鎖 · idempotency_key 防重複下單 · OCC 樂觀鎖更新庫存'} />
        <StackRow tone='#5B7570' label={'③ Protect'} text={'API GW token bucket 限流（用戶 10 RPS）· concurrency limit 50 · 下游 circuit breaker 50% error 觸發 · 過載丟棄 retry 請求'} />
        <StackRow tone='#5B9770' label={'④ Deliver'} text={'訂單事件用 transactional outbox + Kafka · consumer 用 message_id 去重 · 失敗 5 次入 DLQ + 告警'} />
        <StackRow tone='#5B9770' label={'⑤ Observe'} text={'SLO P99 < 800ms · 四金信號全收 · trace 全採異常 + 1% 正常 · 錯誤率 0.1% PagerDuty'} />
      </div>
    <Footer source={'整合 Ch.5 全章 + Stripe / Shopify Engineering Blog'} />
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={70} total={74} />
      <BrandBar />
    </div>
);


const P71: Page = () => (
  <div style={{ ...fill, padding: '60px 80px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: '8px 0 6px' }}>黑色星期五，10× 流量打進來</h1>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>CASE STUDY · Incident 演練</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'00:00'} text={'流量爆 → API GW token bucket 擋掉 30% 超量請求，回 <code>429</code> + Retry-After'} />
        <StackRow tone='#A1813F' label={'00:01'} text={'訂單服務 concurrency limit 觸發，多餘請求快速失敗（503）保住已進來的'} />
        <StackRow tone='#5B7570' label={'00:02'} text={'支付 API P99 飆到 5s → 熔斷器 Open，30 秒內走 fallback「稍後重試」'} />
        <StackRow tone='#5B9770' label={'00:03'} text={'Auto-scaling 跟上，Kafka outbox 累積但不丟訊息，consumer 慢慢消化'} />
        <StackRow tone='#5B9770' label={'00:05'} text={'Metrics 警告觸發 → trace 定位到支付 API → log 確認對方在 throttle 我們'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>5 層全配齊</strong>才能在 10× 流量、雲服務部分故障、惡意攻擊下守住 SLA。沒有 observability，這 5 分鐘你會像盲人摸象。</Callout>
    </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_99_recap_01_incident_timeline} alt='' style={{ width: '100%', maxHeight: 580, objectFit: 'contain' }} />
      </div>
    </div>
    <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
    <PageNum n={71} total={75} />
    <BrandBar />
  </div>
);


const P72: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第五章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新的工具'} items={['4 種分散式鎖 + fencing token + 三大陷阱', '5 種 contention 解法（Pessimistic / OCC / SERIALIZABLE / 2PC / Saga）', '6 層過載防護 + Token vs Leaky bucket', 'Reliable Delivery 6 防線 + Circuit Breaker 三狀態', '三支柱 + 四金信號 + USE / RED + Error Budget']} />
        <TradeoffCol tone='#E8634F' title={'還沒回答的問題'} items={['讀多怎麼撐？　→ Ch.6 Scaling Reads', '寫多怎麼撐？　→ Ch.6 Scaling Writes', '大檔案怎麼分發？　→ Ch.6 CDN / Large Blob']} />
      </div>
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={72} total={74} />
      <BrandBar />
    </div>
);


const P73: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 一句話總結每個主題</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Distributed Lock</strong> 鎖是設計失敗的證據。先想能不能改資料結構消除鎖，再考慮鎖。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Contention</strong> 能在單 DB 解決就不要跨 DB；能用 OCC 就不要用 pessimistic lock。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Overload Protection</strong> 6 層疊加的防線，每層擋一種失敗。處理 30% 比所有人一起死要好。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Reliable Delivery</strong> Timeout → Retry → Backoff+Jitter → Idempotency → Circuit Breaker → Fallback，互相依存。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Observability</strong> Metrics 是儀表板，Traces 縮範圍，Logs 給細節。對症狀警告，不對原因警告。</Callout>
    </div>
  
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' />
      <PageNum n={73} total={74} />
      <BrandBar />
    </div>
);


const P74: Page = () => (
  <SectionEnd title={'Ch.5 完'} subtitle={'系統能在故障中存活，下一站把流量擴展到極致。'} next={'Ch.6 Scaling Patterns</span>'} />
);


export const meta: SlideMeta = { title: 'Ch.5 · Reliability & Ops' };

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 4, animationDelay: '0.05s' }}>本章新術語 · 8 個詞</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 800, margin: '8px 0 24px', animationDelay: '0.1s' }}>不掛、不爆的保命招</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='Lock' en='分散式鎖' def='多個服務搶同一資源，誰拿到鎖誰先做。' />
        <TermCard name='Rate Limit' en='限流' def='每秒最多 X 個請求進來（Token Bucket / Leaky Bucket）。' />
        <TermCard name='Circuit Breaker' en='斷路器' def='下游死了不要繼續打它，避免雪崩。' />
        <TermCard name='Retry + Jitter' en='重試 + 隨機抖動' def='失敗自動重試，但加 jitter 避免風暴。' />
        <TermCard name='Idempotency' en='冪等性' def='同操作做 1 次和 10 次結果一樣（重試安全）。' />
        <TermCard name='Backpressure' en='反壓' def='下游慢時，上游主動放慢，避免 buffer 爆。' />
        <TermCard name='SLO / SLA / SLI' en='服務目標/合約/指標' def='對外承諾 / 對內目標 / 實際量值，三層。' />
        <TermCard name='MLT' en='Metrics + Logs + Traces' def='可觀測性三本柱，看現況/查細節/跨服務追。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix 詞彙速查表</div>
      <Breadcrumb part='Part 5' chapter='Ch.05 · 可靠性維運' section='本章新術語' />
      <PageNum n={2} total={75} />
      <BrandBar />
    </div>
  </>
);

export default [P01, P02b, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36, P37, P38, P39, P40, P41, P42, P43, P44, P45, P46, P47, P48, P49, P50, P51, P52, P53, P54, P55, P56, P57, P58, P59, P60, P61, P62, P63, P64, P65, P66, P67, P68, P69, P70, P71, P72, P73, P74] satisfies Page[];
