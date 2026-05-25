import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model from './assets/00_mental_model.png';
import img_01_cap_theorem_01_triangle from './assets/01_cap_theorem_01_triangle.png';
import img_01_cap_theorem_02_pacelc from './assets/01_cap_theorem_02_pacelc.png';
import img_01_cap_theorem_03_db_quadrant from './assets/01_cap_theorem_03_db_quadrant.png';
import img_01_cap_theorem_04_atm_split from './assets/01_cap_theorem_04_atm_split.png';
import img_02_indexing_01_btree_vs_lsm from './assets/02_indexing_01_btree_vs_lsm.png';
import img_02_indexing_02_decision from './assets/02_indexing_02_decision.png';
import img_03_transactions_01_acid_icons from './assets/03_transactions_01_acid_icons.png';
import img_03_transactions_02_isolation_matrix from './assets/03_transactions_02_isolation_matrix.png';
import img_03_transactions_03_saga from './assets/03_transactions_03_saga.png';
import img_04_numbers_01_latency_ladder from './assets/04_numbers_01_latency_ladder.png';
import img_04_numbers_02_capacity from './assets/04_numbers_02_capacity.png';
import img_99_recap_01_ecommerce_flow from './assets/99_recap_01_ecommerce_flow.png';
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
  <ChapterDivider eyebrow={'CHAPTER · 02'} title={'Data Fundamentals'} subtitle={'資料層的物理常數，與你逃不掉的取捨'} />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={2} total={54} />
      <BrandBar />
    </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>看完本章，你能回答：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① CAP 真的存在嗎？該怎麼讀？'} text={'P 永遠成立，挑 C 還是 A'} />
        <StackRow tone='#A1813F' label={'② Index 為何「快讀慢寫」？'} text={'B+Tree vs LSM 的根本差異'} />
        <StackRow tone='#5B7570' label={'③ Transaction 真的能 ACID 嗎？'} text={'隔離級別與異常現象'} />
        <StackRow tone='#5B9770' label={'④ 哪些數字必須背？'} text={'Latency Numbers Every Engineer Should Know'} />
      </div>
    </div>
    <Footer source={'基本觀念/03 + 07 + 08 + 12'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={3} total={54} />
      <BrandBar />
    </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 資料層的四個維度</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌──────────────────────────────────────────────────┐
│  CORRECTNESS    Transaction · Isolation · ACID   │  ← Ch.2.3
├──────────────────────────────────────────────────┤
│  PERFORMANCE    Index · Query plan · Hot path    │  ← Ch.2.2
├──────────────────────────────────────────────────┤
│  AVAILABILITY   CAP / PACELC · Replication mode  │  ← Ch.2.1
├──────────────────────────────────────────────────┤
│  PHYSICS        Latency numbers · Disk · Network │  ← Ch.2.4
└──────────────────────────────────────────────────┘
            選資料庫 = 在這四層之間排優先序`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這四層由下而上累加成本。違反 PHYSICS 的設計在任何資料庫上都跑不快。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_00_mental_model} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整理自 基本觀念/03 + 07 + 08 + 12'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={4} total={54} />
      <BrandBar />
    </div>
);


const P05: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 02 · TOPIC 01'} title={'CAP Theorem'} subtitle={'分區是現實，C 與 A 才是你能選的'} />
);


const P06: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_cap_theorem_01_triangle} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={6} total={54} />
      <BrandBar />
    </div>
);


const P07: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_cap_theorem_03_db_quadrant} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={7} total={54} />
      <BrandBar />
    </div>
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_cap_theorem_04_atm_split} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={8} total={54} />
      <BrandBar />
    </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何分散式系統必須選邊？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CAP · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>P（網路分區）不是選項，是現實。</strong>  
路由器壞、機房斷電、跨洲光纖被切——P 隨時在發生。  
你能選的只有：<strong>分區發生時，要保 C 還是保 A？</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>CP</strong>（保一致性）：分區時拒絕寫入，回傳 503</li>
          <li><strong>AP</strong>（保可用性）：分區時繼續寫，事後 reconcile</li>
          <li>「CA」<strong>根本不存在</strong>——只在從不分區的單機系統成立</li>
        </ul>
    </div>
    <Footer source={'基本觀念/03 CAP Theorem.pdf · §1-2'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={9} total={54} />
      <BrandBar />
    </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>同一個案例兩種選擇，結果完全不同</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CAP · 真實案例：ATM 提款機</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'選 CP（C+P · 放棄 A）'} items={['台北提款 1000 元 → 中央 DB 立即更新', '台中 ATM 也立刻看到餘額為 0', '<em>網路斷線時：台中 ATM 拒絕服務</em>', '結果：使用者體驗差，但帳目永遠正確']} />
        <TradeoffCol tone='#E8634F' title={'選 AP（A+P · 放棄 C）'} items={['網路斷線時，台中仍允許提款', '使用者體驗好（永遠能提款）', '<em>代價：兩邊各領 1000 → 超支</em>', '結果：銀行虧錢，帳目事後對不上']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>CAP 不是抽象理論</strong>——同一個 ATM 系統選 CP 還是 AP，業務後果天差地遠。</span></div>
    </div>
    <Footer source={'基本觀念/03 CAP Theorem.pdf · §ATM Real-World Example'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={10} total={54} />
      <BrandBar />
    </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PACELC：CAP 的真實補充</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CAP · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>條件</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>選擇</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>範例系統</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>P</strong>artition 發生</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>選 <strong>C</strong>onsistency</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>HBase · Spanner · etcd · ZooKeeper</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>P</strong>artition 發生</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>選 <strong>A</strong>vailability</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cassandra · DynamoDB · Riak</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>E</strong>lse（正常時）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>選 <strong>L</strong>atency</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DynamoDB · Cassandra</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>E</strong>lse（正常時）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>選 <strong>C</strong>onsistency</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Spanner · MongoDB（majority）</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>PACELC</strong> 比 CAP 多回答了「<strong>沒分區時你還在取捨什麼</strong>」——多數時間網路是好的，這時候你選了 latency 還是 consistency？</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_cap_theorem_02_pacelc} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/03 CAP Theorem.pdf · §3 PACELC'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={11} total={54} />
      <BrandBar />
    </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>知名分散式資料庫的 CAP 定位</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CAP · 具體系統參數</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Cassandra（AP/EL）</strong>
    quorum 可調 · 預設最終一致<br />
    寫入 latency 1-2ms · 多 DC 部署</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>DynamoDB（AP/EL）</strong>
    eventually consistent read 預設<br />
    可選 strongly consistent read（多 1 跳）</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Spanner（CP/EC）</strong>
    TrueTime · 全球強一致<br />
    寫入 latency 5-10ms（需 paxos quorum）</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>etcd / ZooKeeper（CP）</strong>
    Raft / ZAB 共識<br />
    分區時少數派直接拒絕請求</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>選型口訣</strong>：要全球低延遲讀寫選 AP；要強一致小規模 metadata 選 CP。</span></div>
    </div>
    <Footer source={'基本觀念/03 CAP Theorem.pdf · §4 + 公開技術文件'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={12} total={54} />
      <BrandBar />
    </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>CP vs AP 的選邊清單</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CAP · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'選 CP（一致性優先）'} items={['金流、訂單、庫存', '身分認證、權限', '分散式鎖、Leader 選舉', '有限資源預訂（機票、飯店）', '<em>容忍：分區時短暫不可用</em>']} />
        <TradeoffCol tone='#E8634F' title={'選 AP（可用性優先）'} items={['社群動態、按讚、留言', '瀏覽紀錄、推薦清單', 'IoT 感測器寫入', '頭像、個資快取', '<em>容忍：暫時讀到舊資料</em>']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：用 Cassandra（AP）存銀行帳戶餘額。最終一致 ≠ 永遠正確，雙花就是這樣發生的。</Callout>
    </div>
    <Footer source={'基本觀念/03 CAP Theorem.pdf · §4 Use Cases'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={13} total={54} />
      <BrandBar />
    </div>
);


const P14: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>系統設計面試的預設選擇</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CAP · 面試金句</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>面試預設選 A（Availability）</strong>——除非系統「無法容忍過期資料」。

只有以下三類強迫你選 C：
- <strong>庫存管理</strong>：超賣導致退款、客訴
- <strong>有限資源預訂</strong>：飯店房間、機票、活動門票
- <strong>金融帳戶</strong>：餘額必須精確，雙花 = 詐欺</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>關鍵特徵：<strong>任何不一致，即使是暫時的，都可能造成重大商業或技術問題</strong>。</span></div>
    </div>
    <Footer source={'基本觀念/03 CAP Theorem.pdf · §Interview Default'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={14} total={54} />
      <BrandBar />
    </div>
);


const P15: Page = () => (
  <SectionEnd title={'CAP 完'} subtitle={'分區永遠在，下一站看 Index 怎麼把查詢從 O(N) 拉回 O(log N)。'} />
);


const P16: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 02 · TOPIC 02'} title={'Database Indexing'} subtitle={'快讀慢寫的物理交易'} />
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何全表掃描不可行？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEXING · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>10⁹</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>10 億筆資料、單筆 100 bytes，全表掃過 = <strong>100 GB I/O</strong>。  
SSD 順序讀 ~ 3 GB/s，意即一次查詢 <strong>30+ 秒</strong>。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>O(N) 在資料量爆炸的時代等於不可行。</strong>  
Index 把查詢成本壓到 <strong>O(log N)</strong>——10 億資料只要 30 次磁碟跳。</Callout>
    </div>
    <Footer source={'基本觀念/07 Database Indexing.pdf · §1 Why Index'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={17} total={54} />
      <BrandBar />
    </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>B+Tree vs LSM-Tree</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEXING · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>B+Tree（讀友善）</strong>
    平衡樹 · 葉節點雙向連結<br />
    範圍查詢快 · 寫入需 in-place 更新</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>LSM-Tree（寫友善）</strong>
    Memtable + SSTable + Compaction<br />
    寫入順序 append · 讀需多層合併</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Hash Index</strong>
    O(1) 等值查詢 · 不支援範圍<br />
    記憶體型適用（Redis）</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Inverted Index</strong>
    Term → Doc 列表<br />
    全文搜尋（Elasticsearch、Lucene）</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>選擇法則</strong>：讀多寫少用 B+Tree（PostgreSQL、MySQL InnoDB）；寫多讀次之用 LSM（Cassandra、RocksDB、HBase）。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_02_indexing_01_btree_vs_lsm} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/07 Database Indexing.pdf · §2-3 Tree Structures'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={18} total={54} />
      <BrandBar />
    </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Index 真正能用的 4 種查詢</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEXING · 加速哪些操作？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① WHERE 條件查詢'} text={'<code>WHERE email = \'x@y.com\'</code> 從 O(N) → O(log N)'} />
        <StackRow tone='#A1813F' label={'② JOIN 操作'} text={'被 join 的欄位有 index，hash/merge join 才能跑得動'} />
        <StackRow tone='#5B7570' label={'③ ORDER BY 排序'} text={'B+Tree 葉節點本身有序，免 sort step'} />
        <StackRow tone='#5B9770' label={'④ Prefix 搜尋'} text={'<code>LIKE \'abc%\'</code> 能用 index；<code>LIKE \'%abc\'</code> 不行'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反例</strong>：&lt;code&gt;WHERE LOWER(email) = ...&lt;/code&gt; 會讓 index 失效——除非建函數索引。</span></div>
    </div>
    <Footer source={'基本觀念/07 Database Indexing.pdf · §Q3 自我測驗'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={19} total={54} />
      <BrandBar />
    </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Index 的隱性成本</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEXING · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Index 帶來'} items={['查詢從 O(N) 降到 O(log N)', '支援 ORDER BY 不用 sort', 'Unique constraint 自動執行']} />
        <TradeoffCol tone='#E8634F' title={'Index 的代價'} items={['每張 Index 多一份儲存（~ 表大小 30%）', '寫入要同步維護 N 份 Index', '過多 Index 讓 Query Planner 選錯']} />
      </div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Composite Index 順序很重要</strong>
&lt;code&gt;(user_id, created_at)&lt;/code&gt; 不等於 &lt;code&gt;(created_at, user_id)&lt;/code&gt;。<br />
<strong>最左前綴原則</strong>：where 條件能用上的是「從左數連續」的欄位。</Callout>
    </div>
    <Footer source={'基本觀念/07 Database Indexing.pdf · §4 Best Practices'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={20} total={54} />
      <BrandBar />
    </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把選擇度高的擺前面</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEXING · 複合索引欄位順序</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`-- 場景：查單一用戶最近的訂單
SELECT * FROM orders
WHERE user_id = 42 AND created_at > '2025-01-01'
ORDER BY created_at DESC;

-- ✓ 對：(user_id, created_at)
--   先用等值定位 user_id，再用範圍掃 created_at
-- ✗ 錯：(created_at, user_id)
--   範圍欄位放前面，後續欄位無法走 index`}</pre>
      <Callout tone='#D97757'><strong>口訣</strong>：<strong>等值在前、範圍在後、選擇度高在前。</strong>  
Composite 欄位數通常 ≤ 3，再多查詢規畫器選不出來。</Callout>
    </div>
    <Footer source={'基本觀念/07 Database Indexing.pdf · §4 Composite Index'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={21} total={54} />
      <BrandBar />
    </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>不回表，直接從索引返回結果</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEXING · Covering Index</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Covering Index</strong>
查詢需要的「所有欄位」都已包含在 index 裡，DB 不需要再回表（heap）讀資料。<br />
<strong>結果</strong>：少一次 I/O，效能提升 2-10×。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`-- 索引：(user_id, created_at) INCLUDE (status)
-- 查詢：SELECT status FROM orders WHERE user_id = 42 AND created_at > ...
-- → 完全用 index 回答，不碰 heap`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>PostgreSQL</strong> 用 &lt;code&gt;INCLUDE&lt;/code&gt;；<strong>MySQL InnoDB</strong> 主鍵自帶 covering（cluster index）；<strong>SQL Server</strong> 也有 INCLUDE 語法。</span></div>
    </div>
    <Footer source={'基本觀念/07 Database Indexing.pdf · §Best Practices'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={22} total={54} />
      <BrandBar />
    </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>何時建 Index？何時不建？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEXING · 速判決策</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`查詢頻繁 (>100 次/秒)？
├─ 是 → 評估欄位選擇度（distinct values / total）
│       ├─ 選擇度 > 5% → 建 B+Tree Index
│       ├─ 選擇度 < 1% → 不建（全表掃反而快）
│       └─ 範圍查詢多 → 考慮 Composite Index
└─ 否 → 不建（寫成本 > 讀收益）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣</strong>：<strong>選擇度低不建，寫多不建，FK 一定建。</strong></Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_02_indexing_02_decision} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/07 Database Indexing.pdf · §5 Decision Framework'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={23} total={54} />
      <BrandBar />
    </div>
);


const P24: Page = () => (
  <SectionEnd title={'Indexing 完'} subtitle={'查詢快了，下一站看 Transaction 怎麼保證寫入正確。'} />
);


const P25: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 02 · TOPIC 03'} title={'Database Transactions'} subtitle={'讓多步操作要嘛全做、要嘛全不做'} />
);


const P26: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_transactions_01_acid_icons} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={26} total={54} />
      <BrandBar />
    </div>
);


const P27: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_transactions_02_isolation_matrix} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={27} total={54} />
      <BrandBar />
    </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何沒有事務的世界會崩塌？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>例子</strong>：A 轉帳 100 元給 B</div>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`Step 1: A.balance -= 100   ← 系統在這裡崩潰會怎樣？
Step 2: B.balance += 100`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>沒有事務 = 100 元蒸發</strong>。Transaction 給你一個保證：  
<strong>「這幾步要嘛全做，要嘛全不做」</strong>——這就是 ACID 的 <strong>A（Atomicity）</strong>。</Callout>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §1 Why Tx'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={28} total={54} />
      <BrandBar />
    </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>ACID 四件事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'A · Atomicity'} text={'全做或全不做（崩潰 → rollback，靠 WAL）'} />
        <StackRow tone='#A1813F' label={'C · Consistency'} text={'業務不變式不破（餘額不為負，constraints 不違反）'} />
        <StackRow tone='#5B7570' label={'I · Isolation'} text={'並發事務看不到彼此中間狀態'} />
        <StackRow tone='#5B9770' label={'D · Durability'} text={'commit 後即使機器爆炸資料還在（WAL flush）'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>A、D 是底線</strong>，幾乎所有資料庫都做。<strong>I 才是真正分級的</strong>——這是 SQL 標準定義 4 種隔離級別的原因。</span></div>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §2 ACID'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={29} total={54} />
      <BrandBar />
    </div>
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個 C 是完全不同的概念</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · ACID-C ≠ CAP-C</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'ACID 的 C（Consistency）'} items={['資料的「業務邏輯正確性」', 'tx 前後 constraints 必須成立', '例：餘額不為負、外鍵存在', '<em>單機 DB 也談得到</em>']} />
        <TradeoffCol tone='#E8634F' title={'CAP 的 C（Consistency）'} items={['「所有節點同一時間看到相同資料」', '分散式副本之間的同步問題', '例：strong vs eventual consistency', '<em>只在多副本才有意義</em>']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試陷阱</strong>：把 ACID 的 C 和 CAP 的 C 講混的人，會被立刻打分。</span></div>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §Q6'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={30} total={54} />
      <BrandBar />
    </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 個隔離級別 vs 3 個異常現象</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · 隔離級別</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>隔離級別</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Dirty Read</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Non-Repeatable Read</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Phantom Read</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Read Uncommitted</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 可能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 可能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 可能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Read Committed</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 防</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 可能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 可能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Repeatable Read</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 防</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 防</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 可能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Serializable</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 防</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 防</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 防</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>MySQL InnoDB 預設</strong>：Repeatable Read（用 MVCC + Gap Lock 連 Phantom 也防）。  
<strong>PostgreSQL 預設</strong>：Read Committed（最常見、最快、最容易踩坑）。</Callout>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §3 Isolation Levels'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={31} total={54} />
      <BrandBar />
    </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何同一個 query 兩次跑出不同行數？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · Phantom Read 範例</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`T1: SELECT count(*) FROM accounts WHERE balance > 1000;
    → 5 筆

T2: INSERT INTO accounts (balance) VALUES (2000);
    → commit

T1: SELECT count(*) FROM accounts WHERE balance > 1000;
    → 6 筆 ← 多出一筆「幽靈資料」`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Phantom Read 與 Non-Repeatable Read 的差別</strong>
<strong>Non-Repeatable</strong>：同一筆 row 的值被改掉。<br />
<strong>Phantom</strong>：新增/刪除 row，使範圍查詢結果集改變。<br />
<strong>防法</strong>：MySQL Gap Lock、PostgreSQL Serializable Snapshot Isolation（SSI）。</Callout>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §三種並發異常'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={32} total={54} />
      <BrandBar />
    </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>現代資料庫如何不靠鎖實現隔離</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · MVCC</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>MVCC（Multi-Version Concurrency Control）</strong>
<strong>核心思想</strong>：對同一份資料保存多個版本。讀操作看「快照」，寫操作建立新版本，讀寫不互相阻塞。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`帳戶餘額歷史版本：
  version 1 : 1000 (T1 commit 時間點)
  version 2 :  500 (T2 commit 時間點)

T3 在 T2 commit 之前開始 → 看到 version 1 (1000)
T4 在 T2 commit 之後開始 → 看到 version 2 (500)`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>PostgreSQL、MySQL InnoDB</strong> 都用 MVCC。舊版本由 vacuum / purge 機制清理——這就是 PostgreSQL 為何要定期 VACUUM。</span></div>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §資料庫如何實現隔離'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={33} total={54} />
      <BrandBar />
    </div>
);


const P34: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>隔離級別 vs 並發效能</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'強隔離（Serializable）'} items={['完全沒有並發異常', '程式碼簡單，不用想 race', '<em>代價：吞吐量掉 5-10×</em>']} />
        <TradeoffCol tone='#E8634F' title={'弱隔離（Read Committed）'} items={['並發吞吐量高', '大多數查詢沒事', '<em>代價：寫不變式要自己處理</em>']} />
      </div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>SELECT FOR UPDATE</strong>
弱隔離下，要保護「讀後寫」邏輯（如扣庫存）必須顯式加鎖。<br />
<strong>典型場景</strong>：訂單、票券、優惠券——讀庫存後判斷再寫，中間必須 lock。</Callout>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §4 Concurrency'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={34} total={54} />
      <BrandBar />
    </div>
);


const P35: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個 tx 各扣 200、各扣 300，最後只扣了一個</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · Lost Update</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`帳戶餘額：1000
T1: 讀 1000，計算 1000 - 200 = 800
T2: 讀 1000，計算 1000 - 300 = 700
T1: 寫入 800，commit
T2: 寫入 700，commit  ← 覆蓋了 T1，T1 的扣款消失了
正確結果應為 500，實際卻是 700`}</pre>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'樂觀鎖（Optimistic）'} items={['<code>UPDATE ... WHERE version = N</code>', '版本不符就拒絕、由 app 重試', '<em>適合：衝突不常發生</em>']} />
        <TradeoffCol tone='#E8634F' title={'悲觀鎖（Pessimistic）'} items={['<code>SELECT ... FOR UPDATE</code>', '讀時就鎖住，其他 tx 等待', '<em>代價：可能 deadlock、並行性低</em>']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>最簡解</strong>：原子 UPDATE — &lt;code&gt;UPDATE SET qty = qty - 1 WHERE qty &gt; 0&lt;/code&gt;，一條 SQL 就搞定，不用提到 Serializable。</span></div>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §Lost Update'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={35} total={54} />
      <BrandBar />
    </div>
);


const P36: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個 tx 互鎖時資料庫會做什麼？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · Deadlock</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`T1: BEGIN; UPDATE account WHERE id=1;  -- 鎖住 1
T2: BEGIN; UPDATE account WHERE id=2;  -- 鎖住 2
T1: UPDATE account WHERE id=2;         -- 等 T2
T2: UPDATE account WHERE id=1;         -- 等 T1 → DEADLOCK`}</pre>
      <Callout tone='#E8634F'><strong>資料庫的 deadlock detection 會自動 rollback 其中一個 tx</strong>，回傳錯誤給 application。  
Application 必須處理重試邏輯——不要假設「commit 一定成功」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>預防</strong>：所有 tx 用一致的順序鎖定資源（例：永遠先鎖 &lt;code&gt;min(account_id)&lt;/code&gt;）。</span></div>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §悲觀鎖 + §主動說明死鎖風險'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={36} total={54} />
      <BrandBar />
    </div>
);


const P37: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>2PC vs Saga vs Outbox</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · 分散式延伸</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>2PC（Two-Phase Commit）</strong>
    Coordinator 統籌 prepare → commit<br />
    強一致 · 但 coordinator 壞 = 全卡</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Saga</strong>
    一連串本地 tx + 補償<br />
    最終一致 · 業務碼複雜</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Outbox Pattern</strong>
    本地 tx 寫主表 + outbox 表<br />
    背景搬運至 message queue</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>TCC（Try-Confirm-Cancel）</strong>
    類 2PC 但業務層實作<br />
    強一致 · 侵入性高</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>現代微服務首選 Saga + Outbox</strong>——避免分散式鎖、可獨立部署、失敗可重試。</span></div>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §5 Distributed Tx'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={37} total={54} />
      <BrandBar />
    </div>
);


const P38: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>失敗時逐步回滾 = 補償 (compensation)</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRANSACTIONS · Saga 補償交易細節</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`建立訂單流程（正向）：
  1. 訂單服務：建立訂單記錄（local commit）
  2. 庫存服務：扣減庫存（local commit）
  3. 付款服務：扣款（local commit）

如果步驟 3 失敗（付款失敗）：
  ← 補償步驟 2：把庫存加回去
  ← 補償步驟 1：把訂單標記為「已取消」`}</pre>
      <Callout tone='#D97757'><strong>關鍵</strong>：補償操作必須<strong>冪等</strong>（重試不出錯）、<strong>可逆</strong>（業務允許 rollback）。  
不可逆的操作（寄信、出貨）必須延後到 saga 終點才執行。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_03_transactions_03_saga} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/08 Database Transactions.pdf · §Saga Pattern'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={38} total={54} />
      <BrandBar />
    </div>
);


const P39: Page = () => (
  <SectionEnd title={'Transactions 完'} subtitle={'寫入有保證了，下一站看 Latency 數字怎麼推架構決策。'} />
);


const P40: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 02 · TOPIC 04'} title={'Numbers to Know'} subtitle={'工程師的物理常數表'} />
);


const P41: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_numbers_01_latency_ladder} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={41} total={54} />
      <BrandBar />
    </div>
);


const P42: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_numbers_02_capacity} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={42} total={54} />
      <BrandBar />
    </div>
);


const P43: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何要記這些數字？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>設計時你心裡在算什麼？</strong>  
「這個 RPC 需要多少時間？」「這個 join 跑得起嗎？」  
答案不來自直覺，來自<strong>數量級的本能</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>沒有這份直覺，你會把跨機房 RPC 當本地呼叫</li>
          <li>沒有這份直覺，你會在 hot path 加 100ms 還覺得「沒什麼」</li>
          <li>這 8 個數字 ≈ 工程師的「物理常數表」</li>
        </ul>
    </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · §1'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={43} total={54} />
      <BrandBar />
    </div>
);


const P44: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Latency Numbers Every Engineer Should Know</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · 必背 Latency Table</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>操作</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>時間</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>倍率</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>意義</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>L1 cache reference</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>0.5 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CPU 快取命中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Branch mispredict</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>5 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分支預測失敗</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>L2 cache reference</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>7 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>14×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一級錯一級</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Mutex lock/unlock</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>25 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>50×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>無爭用鎖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Main memory reference</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>200×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>RAM 讀取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1 KB compress（snappy）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>3 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>6,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用層壓縮</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Send 1 KB over 1 Gbps</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>20,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>區網傳送</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SSD random read</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>150 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>300,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>NVMe 隨機讀</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Read 1 MB sequentially from SSD</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>2M×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SSD 順序讀</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Round trip within same DC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>0.5 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1M×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>同機房 RTT</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Round trip CA → Netherlands</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>150 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>300M×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨洲 RTT</div>
        </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · Jeff Dean\'s table'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={44} total={54} />
      <BrandBar />
    </div>
);


const P45: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>補：磁碟與網路的數量級對比</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · SSD vs HDD vs Network</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>操作</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>時間</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>對比</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>RAM random read</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SSD (NVMe) random read</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>150 μs</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>1,500×</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>HDD random seek</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>10 ms</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>100,000×</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cross-AZ RTT (same region)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1-2 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Cross-region RTT (US-EU)</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>80-120 ms</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>800,000×</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cross-continent RTT (US-Asia)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>150-200 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1,500,000×</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣</strong>：<strong>HDD 比 SSD 慢 60×</strong>、<strong>跨 region 比跨 AZ 慢 50-100×</strong>、<strong>從不要在 hot path 上跨 region</strong>。</Callout>
    </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · §AWS / Google networking docs'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={45} total={54} />
      <BrandBar />
    </div>
);


const P46: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>別停留在 2010 年的數字</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · 現代資料庫實際容量</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>PostgreSQL / MySQL</strong>
    單機 64 TiB · Aurora 128 TiB<br />
    cached read 1-5ms · 寫入 10-20k TPS</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Redis</strong>
    單節點 1 TB RAM · &amp;lt;1ms read<br />
    100k+ ops/sec</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Kafka</strong>
    1 broker = 1M msgs/sec<br />
    50 TB 儲存 · 數週數月 retention</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>App Server</strong>
    100k+ concurrent · 25 Gbps<br />
    64-512 GB RAM（可至 2 TB）</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反直覺</strong>：很多人在 500GB-2TB 就急著談 sharding——一台調校良好的 PostgreSQL 撐到 50 TiB 才該考慮。</span></div>
    </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · §Databases / Caching / MQ'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={46} total={54} />
      <BrandBar />
    </div>
);


const P47: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三個常用換算</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · 速算技巧</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 1 ms 內 CPU 能做什麼？'} text={'約 200 萬次 L1 操作 / 1 萬次 RAM 讀'} />
        <StackRow tone='#A1813F' label={'② 跨機房 RPC = 多少本地操作？'} text={'0.5 ms = 跑 100 萬次 L1，這就是「微服務不要太細」的原因'} />
        <StackRow tone='#5B7570' label={'③ 100 GB 表能裝進記憶體嗎？'} text={'雲端 256 GB RAM 機器很常見，常常**直接 in-memory** 就贏'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣</strong>：<strong>RAM 比 SSD 快 1000 倍 · SSD 比網路 RTT 快 3 倍 · 跨洲 RTT 比本機 RAM 慢 100 萬倍</strong>。</Callout>
    </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · §2 Practical'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={47} total={54} />
      <BrandBar />
    </div>
);


const P48: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>用數字推架構決策</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · TRADE-OFF</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'常見錯估'} items={['「這 API 加個 cache 就快」<br>→ cache miss 時跨網路 1ms 起跳', '「Microservice 拆細沒事」<br>→ 每跳一次服務 +0.5ms RTT', '「序列化成本可忽略」<br>→ JSON 1MB ≈ 30ms 純 CPU']} />
        <TradeoffCol tone='#E8634F' title={'正確判斷'} items={['P99 100ms 預算<br>= 200 次本機 RAM = 100 次 SSD = 10 次 cross-AZ', 'Hot path 想加 RPC？<br>先計算現有預算花在哪', '記憶體 vs 磁碟 vs 網路<br>差 3 個數量級']} />
      </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · §3 Decision Making'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={48} total={54} />
      <BrandBar />
    </div>
);


const P49: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>面試官真正在意的事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · 避免過度設計</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>最常見的錯誤</strong>：只有幾 TB 資料、幾千 QPS 就急著說要 sharding、要微服務。  
<strong>面試官欣賞的是</strong>：能根據數據做出合理判斷，而不是盲目套用 fancy words。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>Sharding 之前的優化順序</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>慢查詢 → 加 index / 優化 SQL</li>
          <li>讀取瓶頸 → 加 cache / 加 read replica</li>
          <li>寫入瓶頸 → 調 DB 參數 / 升級硬體</li>
          <li><strong>以上都用盡</strong> → 才談 sharding</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>Sharding 解決的是<strong>寫入擴展</strong>問題（replica 幫不上）；但會大幅增加跨 shard 查詢、分散式交易、資料遷移的複雜度。</span></div>
    </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · §面試中如何使用這些數字'} />
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={49} total={54} />
      <BrandBar />
    </div>
);


const P50: Page = () => (
  <SectionEnd title={'Numbers 完'} subtitle={'物理常數記住了，回頭把整章串成一個電商案例。'} />
);


const P51: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 02 · RECAP'} title={'Ch.2 整合 & 收尾'} subtitle={'把資料層四件事串成一個電商下訂單'} />
);


const P52: Page = () => (
  <div style={{ ...fill, padding: '60px 80px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800, lineHeight: 1.15, margin: '8px 0 6px' }}>設計：電商「下訂單」交易流程</h1>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>CASE STUDY · 把資料層四件事串起來</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'CAP'} text={'訂單庫選 CP（PostgreSQL HA）· 推薦庫選 AP（Cassandra）'} />
        <StackRow tone='#A1813F' label={'Index'} text={'orders(user_id, created_at) Composite · 庫存 unique(sku)'} />
        <StackRow tone='#5B7570' label={'Tx'} text={'扣庫存 + 建訂單 = 本地 ACID Tx · 通知物流 = Saga + Outbox'} />
        <StackRow tone='#5B9770' label={'Numbers'} text={'P99 預算 200ms · 1 次 DB 寫 ~ 5ms · 預留 10 次跨服務呼叫額度'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>每個決策都對應 Ch.2 的一個面向。  
<strong>Ch.3 開始挖分散式資料層</strong>——當單機 PostgreSQL 撐不住時要怎麼水平切？</Callout>
    </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_99_recap_01_ecommerce_flow} alt='' style={{ width: '100%', maxHeight: 580, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'整合 Ch.2 全章 + Shopify Engineering Blog 公開資料'} />
    <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
    <PageNum n={52} total={55} />
    <BrandBar />
  </div>
);


const P53: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第二章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新的工具'} items={['CAP / PACELC 選邊清單', 'B+Tree vs LSM 決策樹', '4 個隔離級別 vs 3 個異常現象', 'MVCC + Lost Update 解法', 'Latency Numbers 11 行表', 'Saga / Outbox / 2PC 選型']} />
        <TradeoffCol tone='#E8634F' title={'還沒回答的問題'} items={['單機撐不住怎麼切？　→ Ch.3 Sharding', '讀寫分離怎麼做？　→ Ch.3 Replication', 'cache 該擺哪一層？　→ Ch.3 Caching', '請求怎麼路由到正確的 shard？　→ Ch.3 Consistent Hash']} />
      </div>
  
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' />
      <PageNum n={53} total={54} />
      <BrandBar />
    </div>
);


const P54: Page = () => (
  <SectionEnd title={'Ch.2 完'} subtitle={'資料層基礎打穩，下一站把資料切散到多台機器。'} next={'Ch.3 Data Distribution</span>'} />
);


export const meta: SlideMeta = { title: 'Ch.2 · Data Fundamentals' };

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 4, animationDelay: '0.05s' }}>本章新術語 · 8 個詞</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 800, margin: '8px 0 24px', animationDelay: '0.1s' }}>資料庫與一致性</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='ACID' en='Atomic/Consistent/Isolated/Durable' def='事務 4 大性質：原子/一致/隔離/永久。' />
        <TermCard name='CAP' en='一致性/可用性/分區' def='分散式三選二定理，網路會壞必須選一邊犧牲。' />
        <TermCard name='B-Tree / LSM' en='兩種主流索引結構' def='B-Tree 適讀多（PG）；LSM 適寫多（Cassandra/RocksDB）。' />
        <TermCard name='Isolation Level' en='隔離級別' def='Read Uncommitted → Serializable，從弱到強保證。' />
        <TermCard name='RTT' en='Round-Trip Time' def='一來一回的網路延遲。決定系統最低反應時間。' />
        <TermCard name='Throughput' en='吞吐量' def='QPS / TPS — 每秒幾個請求 / 交易。' />
        <TermCard name='Index' en='索引' def='資料表的目錄。查得快但寫入要多花力氣維護。' />
        <TermCard name='Transaction' en='事務 / 交易' def='一組操作要嘛全成功要嘛全失敗（轉帳一邊扣一邊加）。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix 詞彙速查表</div>
      <Breadcrumb part='Part 2' chapter='Ch.02 · 資料基礎' section='本章新術語' />
      <PageNum n={2} total={55} />
      <BrandBar />
    </div>
  </>
);

export default [P01, P02b, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36, P37, P38, P39, P40, P41, P42, P43, P44, P45, P46, P47, P48, P49, P50, P51, P52, P53, P54] satisfies Page[];
