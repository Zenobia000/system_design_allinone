import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/06_case_ecommerce_hero.png';
import img_stage1 from './assets/06_stage1_mvp.png';
import img_stage2 from './assets/06_stage2_10k.png';
import img_stage3 from './assets/06_stage3_seckill.png';
import img_funnel from './assets/case1_funnel.png';
import logoDark from '../../assets/branding/logo-dark.png';
import logoLight from '../../assets/branding/logo-light.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F1E8', text: '#2A2520', accent: '#D97757' },
  fonts: { display: '"Noto Serif TC", Georgia, serif', body: '"Noto Sans TC", system-ui, sans-serif' },
  typeScale: { hero: 180, body: 38 },
  radius: 8,
};

const muted = '#8B6F47', subtle = 'rgba(42, 37, 32, 0.55)', ok = '#5B9770', warn = '#E8634F', accent = '#D97757';
const tier1 = '#D97757', tier2 = '#A1813F', tier3 = '#5B9770', tier4 = '#5B7570';

const animationCSS = `
@keyframes osd-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes osd-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes osd-scale-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
@keyframes osd-arrow-flow { 0% { opacity: 0; transform: translateY(-8px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes osd-dash-flow { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
.osd-anim-fade-up { animation: osd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-fade-in { animation: osd-fade-in 0.6s ease-out both; }
.osd-anim-scale-in { animation: osd-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > * { animation: osd-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > *:nth-child(1) { animation-delay: 0.05s; } .osd-stagger > *:nth-child(2) { animation-delay: 0.10s; }
.osd-stagger > *:nth-child(3) { animation-delay: 0.15s; } .osd-stagger > *:nth-child(4) { animation-delay: 0.20s; }
.osd-stagger > *:nth-child(5) { animation-delay: 0.25s; } .osd-stagger > *:nth-child(6) { animation-delay: 0.30s; }
.osd-stagger > *:nth-child(7) { animation-delay: 0.35s; } .osd-stagger > *:nth-child(8) { animation-delay: 0.40s; }
.osd-arch-arrow { animation: osd-arrow-flow 0.4s ease-out both; }
.osd-arch-arrow line { stroke-dasharray: 6 4; animation: osd-dash-flow 1.2s linear infinite; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;
const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const Kicker = ({ children }: { children: React.ReactNode }) => <div className='osd-anim-fade-up' style={{ fontSize: 24, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>;
const Footer = ({ source }: { source: string }) => <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>;
const PageH1 = ({ children, size = 48 }: { children: React.ReactNode; size?: number }) => <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px', animationDelay: '0.1s' }}>{children}</h1>;

const ChapterDivider = ({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) => (
  <><AnimStyle /><div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
    <div style={{ padding: '0 100px' }}>
      <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 130, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
      {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 38, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
    </div>
    {image ? <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 40, animationDelay: '0.2s' }}><img src={image} alt='' style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /></div> : null}
  </div></>
);
const SectionEnd = ({ title, subtitle, next }: { title: string; subtitle?: string; next?: string }) => (
  <><AnimStyle /><div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
    <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 130, fontWeight: 800, margin: 0 }}>{title}</h1>
    {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 44, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245,241,232,0.85)', animationDelay: '0.15s' }}>{subtitle}</h2> : null}
    {next ? <p className='osd-anim-fade-up' style={{ fontSize: 28, marginTop: 56, color: '#F5F1E8', opacity: 0.9, animationDelay: '0.3s' }}>→ {next}</p> : null}
  </div></>
);

const PromptBlock = ({ children }: { children: React.ReactNode }) => <div className='osd-anim-fade-up' style={{ background: '#2A2520', color: '#F5F1E8', padding: '16px 22px', borderRadius: 8, fontFamily: 'IBM Plex Mono, Menlo, monospace', fontSize: 16, lineHeight: 1.55, whiteSpace: 'pre-wrap', animationDelay: '0.2s' }}>{children}</div>;

const Table = ({ cols, head, rows, fontSize = 17 }: { cols: string; head: string[]; rows: string[][]; fontSize?: number }) => (
  <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: cols, gap: 3, fontSize, lineHeight: 1.5 }}>
    {head.map((h, i) => <div key={`h-${i}`} style={{ fontWeight: 700, color: accent, padding: '9px 12px' }}>{h}</div>)}
    {rows.map((row, i) => row.map((cell, j) => <div key={`r-${i}-${j}`} style={{ padding: '9px 12px', borderTop: '1px solid rgba(139,111,71,0.25)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</div>))}
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
    <BrandBar light />
      <BrandBar light />
      </div>
  </>
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

// ===== FLOW DIAGRAM COMPONENTS =====
const ArchBox = ({ label, tone = tier1, width = 260, height = 64, sub }: { label: string; tone?: string; width?: number; height?: number; sub?: string }) => (
  <div style={{ width, minHeight: height, padding: '10px 18px', background: `${tone}15`, border: `2px solid ${tone}`, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 2px 6px rgba(42,37,32,0.08)' }}>
    <div style={{ fontSize: 17, fontWeight: 700, color: tone }}>{label}</div>
    {sub ? <div style={{ fontSize: 13, color: muted, marginTop: 2 }}>{sub}</div> : null}
  </div>
);
const ArrowDown = ({ label, tone = muted }: { label?: string; tone?: string }) => (
  <div className='osd-arch-arrow' style={{ height: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: tone, position: 'relative' }}>
    <svg width='22' height='28' viewBox='0 0 22 28' className='osd-arch-arrow'>
      <line x1='11' y1='2' x2='11' y2='22' stroke={tone} strokeWidth='2' />
      <polygon points='6,18 11,28 16,18' fill={tone} />
    </svg>
    {label ? <span style={{ position: 'absolute', left: 'calc(50% + 16px)', fontSize: 13, color: tone, fontStyle: 'italic', whiteSpace: 'nowrap' }}>{label}</span> : null}
  </div>
);
const ArrowRight = ({ tone = muted }: { tone?: string }) => (
  <div className='osd-arch-arrow' style={{ display: 'flex', alignItems: 'center', color: tone, padding: '0 8px' }}>
    <svg width='32' height='14' viewBox='0 0 32 14'>
      <line x1='2' y1='7' x2='24' y2='7' stroke={tone} strokeWidth='2' />
      <polygon points='22,2 32,7 22,12' fill={tone} />
    </svg>
  </div>
);
const ArchFlow = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>{children}</div>
);

// ===== PAGES =====
const P01: Page = () => <ChapterDivider eyebrow='CASE · 1' title='電商秒殺系統' subtitle='OLTP + 快取 + 削峰 · 強一致庫存' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>業務背景</Kicker>
    <PageH1>某品牌週年慶秒殺，1000 件 iPhone 半價</PageH1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 20, lineHeight: 1.6 }}>
      {[
        ['開賣前 1 小時', '50K 同時在線等候'],
        ['開賣瞬間', '100K req/s 衝擊 + 庫存扣減'],
        ['開賣後 10 秒', '庫存售完'],
        ['公平性', '先到先得，不能超賣'],
        ['體驗', '用戶能立刻知道結果，不能 spinner 10 秒'],
      ].map(([l, r]) => (
        <div key={l} style={{ padding: '14px 18px', background: 'rgba(217,119,87,0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 6 }}>
          <strong style={{ color: accent }}>{l}</strong> · {r}
        </div>
      ))}
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 19, color: muted, fontStyle: 'italic', animationDelay: '0.4s' }}>
      <strong>核心挑戰</strong>：強一致庫存 + 高並發削峰 + 公平排隊
    </div>
    <div style={{ marginTop: 14 }}><Mantra>秒殺架構的本質：把無效流量在最早層擋掉</Mantra></div>
    <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' section='業務背景' />
    <PageNum n={2} total={12} />
    <BrandBar />
  </div></>
);

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <Kicker>本章新術語 · 6 個詞</Kicker>
      <PageH1 size={42}>看秒殺案例前的詞彙</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='OLTP' en='交易型資料庫' def='處理一筆筆訂單 / 庫存扣減（要強事務）。' />
        <TermCard name='削峰漏斗' en='Funnel' def='把無效流量在最早層擋掉（CDN → WAF → Redis → DB）。' />
        <TermCard name='Lua atomic' en='Redis Lua 原子腳本' def='Redis 跑 Lua = 一次跑完中間不被插隊（適合扣庫存）。' />
        <TermCard name='Rate Limit' en='限流' def='每 IP / 每 user 每秒最多幾次請求（防 bot/黃牛）。' />
        <TermCard name='Read Replica' en='讀副本' def='從主庫複製出的「只能讀」副本，分擔讀流量。' />
        <TermCard name='Pre-scale' en='預先擴容' def='開賣前先把機器擴到 50 台（auto-scale 來不及）。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表</div>
    
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' />
      <PageNum n={2} total={14} />
      <BrandBar />
    </div>
  </>
);

const P03: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C1.1 · REQUIREMENTS</Kicker>
    <PageH1>需求量化（NFR）</PageH1>
    <Table cols='180px 1fr' head={['業務需求', 'NFR 量化']} rows={[
      ['「不超賣」', '庫存扣減 100% accurate (zero over-sell)'],
      ['「公平」', '先到先得，FIFO 排隊'],
      ['「快」', '下單 API P99 < 500ms'],
      ['「能撐住」', 'peak 100K req/s 持續 10 秒'],
      ['「不掛」', '秒殺期間 99.99% availability'],
      ['「能對帳」', '訂單與庫存最終一致，可審計'],
      ['「不能黃牛」', '同 user 一單，IP rate limit'],
    ]} fontSize={18} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, padding: '12px 18px', background: '#2A2520', color: '#F5F1E8', borderRadius: 6, fontSize: 17, lineHeight: 1.7, animationDelay: '0.7s' }}>
      容量：100K QPS peak（10s 共 1M 請求）· 成功 1K 訂單 · 99.9% 必須立刻 reject，不打 DB
    </div>
    <Footer source='software_architect/ppt/_source/02_Requirements_SLA.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' />
      <PageNum n={3} total={14} />
      <BrandBar />
    </div></>
);

const P04: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C1.2 · SELECTION</Kicker>
    <PageH1>技術選型決策矩陣</PageH1>
    <Table cols='130px 180px 1fr 1fr' head={['元件', '選', '不選', '理由']} rows={[
      ['主 DB', 'PostgreSQL', 'Mongo, DynamoDB', '需強事務扣庫存'],
      ['庫存熱層', 'Redis + Lua', '直接打 DB', '抗 100K QPS'],
      ['排隊削峰', 'Kafka', '直接同步', '100K → 平緩'],
      ['Cache', 'Redis + CDN', 'Memcached', '商品詳情頁'],
      ['API gateway', 'Cloudflare + RL', '自建', 'DDoS、IP 限流'],
      ['即時通知', 'WebSocket', 'polling', '排隊狀態推送'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
      <strong>核心決策</strong>：把「庫存扣減」搬到 Redis（原子），DB 只記訂單。
    </div>
    <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' />
      <PageNum n={4} total={14} />
      <BrandBar />
    </div></>
);

// Stage 1 — Real PNG diagram
const P05: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage1} alt='Stage 1 MVP architecture' style={{ maxWidth: '100%', maxHeight: '88%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C1.3 · STAGE 1 · MVP</Kicker>
        <PageH1 size={38}>還沒秒殺 · 1K QPS</PageH1>
        <div style={{ fontSize: 16, lineHeight: 1.7 }}>
          <strong>特點</strong>：<br/>
          · 2 App + 1 DB<br/>
          · Cache 命中率 ~80%<br/>
          · 下單 P99 &lt; 200ms<br/><br/>
          <strong style={{ color: warn }}>進化訊號</strong>：<br/>
          DB lock wait &gt; 50ms → 不夠了
        </div>
        <div style={{ marginTop: 16 }}><Mantra>平日量單機足夠，別過度設計</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' section='Stage 1 · MVP' />
      <PageNum n={5} total={12} />
      <BrandBar />
    </div>
  </>
);

// Stage 2 — Real PNG diagram
const P06: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage2} alt='Stage 2 10K QPS' style={{ maxWidth: '100%', maxHeight: '88%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C1.4 · STAGE 2 · 10K QPS</Kicker>
        <PageH1 size={38}>小型促銷 · 讀寫分離</PageH1>
        <div style={{ fontSize: 16, lineHeight: 1.7 }}>
          <strong>變化</strong>：<br/>
          · 加 Read Replica × 2<br/>
          · Redis 升 cluster<br/>
          · App 自動擴 4-12 台<br/>
          · 庫存搬到 Redis Lua 原子扣減
        </div>
        <div style={{ marginTop: 16 }}><Mantra>庫存決策層與持久化層分離</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' section='Stage 2 · 10K QPS' />
      <PageNum n={6} total={12} />
      <BrandBar />
    </div>
  </>
);

// Stage 3 — Real PNG diagram
const P07: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage3} alt='Stage 3 Seckill 100K QPS' style={{ maxWidth: '100%', maxHeight: '92%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C1.5 · STAGE 3 · 100K QPS</Kicker>
        <PageH1 size={36}>秒殺削峰漏斗</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          <strong>5 道削峰</strong>：<br/>
          1. CDN WAF · 擋 bot<br/>
          2. 預約頁 token · 過濾無效<br/>
          3. Redis Lua · 99% reject<br/>
          4. Kafka buffer · 平緩 DB<br/>
          5. 對帳 job · 最終一致
        </div>
        <div style={{ marginTop: 14 }}><Mantra>所有「優雅」都是用「對帳成本」買的</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' section='Stage 3 · 100K QPS 秒殺' />
      <PageNum n={7} total={12} />
      <BrandBar />
    </div>
  </>
);

const P08: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C1.6 · DECISION · 我們選擇與代價</Kicker>
    <PageH1>關鍵 Trade-off 表</PageH1>
    <Table cols='130px 180px 200px 1fr' head={['決策', '我們選', '放棄什麼', '為何']} rows={[
      ['庫存層', 'Redis + 對帳', '強一致即時', '100K QPS 必須'],
      ['排隊削峰', 'Kafka 異步', '用戶即時訂單號', '削峰 > 即時'],
      ['預約頁', '必過', '一段「卡頓」', '過濾無效流量'],
      ['Rate limit', 'per IP + user', '公司網路被誤殺', '防黃牛'],
      ['Auto-scale', 'pre-scale', '多燒 30 分鐘錢', '開賣不能等擴容'],
      ['對帳', '5min 一次', '5 分鐘內可能不一致', '對帳成本 < 一致即時'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
      <strong>金句</strong>：秒殺架構的所有「優雅」都是用「對帳成本」買的。
    </div>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' />
      <PageNum n={8} total={14} />
      <BrandBar />
    </div></>
);

const P09: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>C1.7 · AI Prompt Flow</Kicker>
    <PageH1>用 Claude Code 加速設計</PageH1>
    <PromptBlock>{`Step 1 · 拆需求:
我要設計秒殺系統，1000 件商品，預期峰值 100K req/s。
請列出 10 個我必須回答的設計問題，分 5 類：
庫存準確 / 公平排隊 / 削峰 / 體驗 / 對帳

Step 2 · 容量估算:
給定上述，請算各層 QPS 需求、機器數、月成本

Step 3 · 架構草稿:
用 PlantUML 畫 stage 3。標出：流量擋在哪、sync/async、SPOF。

Step 4 · 反方論證:
扮演對手公司架構師，攻擊這個方案 5 點。
特別針對：Redis SPOF、Kafka 故障、對帳延遲。`}</PromptBlock>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' />
      <PageNum n={9} total={14} />
      <BrandBar />
    </div></>
);

const P10: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C1.8 · PITFALLS</Kicker>
    <PageH1>8 大坑 + 紅線 + 降級</PageH1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 17, lineHeight: 1.5 }}>
      {[
        '1. Redis 沒 cluster → SPOF',
        '2. Lua 太長阻塞 Redis 主線程',
        '3. Kafka 沒 ack → 掉訊',
        '4. Auto-scale 慢，秒殺才擴',
        '5. 對帳邏輯沒寫 → 無法救',
        '6. Rate limit 過嚴擋正常人',
        '7. 沒降級 → DB 掛全炸',
        '8. WAF 沒擋住 bot → 黃牛全包',
      ].map((t) => <div key={t} style={{ padding: '10px 14px', background: 'rgba(232,99,79,0.08)', borderLeft: `3px solid ${warn}`, borderRadius: 4 }}>{t}</div>)}
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 18, lineHeight: 1.7, animationDelay: '0.7s' }}>
      <strong style={{ color: warn }}>核心 alert</strong>：Redis P99 &gt; 50ms · Kafka error &gt; 0.1% · DB lock wait &gt; 100ms · App CPU &gt; 80%<br/>
      <strong style={{ color: ok }}>降級</strong>：Redis 掛 → 自動切「先收入 Kafka 後扣庫存」（接受可能超賣，事後退款）
    </div>
    <Footer source='software_architect/ppt/_source/05_ilities.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' />
      <PageNum n={10} total={14} />
      <BrandBar />
    </div></>
);

const P11: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative', background: accent, color: '#F5F1E8' }}>
    <div className='osd-anim-fade-up' style={{ fontSize: 24, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(245,241,232,0.85)' }}>CASE 1 · 一頁速查</div>
    <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 800, margin: '14px 0 28px', animationDelay: '0.1s' }}>印出貼牆</h1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 18, lineHeight: 1.7 }}>
      <div style={{ padding: '20px 24px', background: 'rgba(245,241,232,0.12)', borderRadius: 8 }}>
        <strong>場景</strong>：秒殺 1000 件商品，100K req/s 峰值<br/><br/>
        <strong>核心 5 步</strong>：<br/>
        1. 預約頁過濾（CDN + WAF）<br/>
        2. Redis Lua 原子扣減<br/>
        3. Kafka 削峰<br/>
        4. App pre-scale<br/>
        5. 對帳 job 5min/次
      </div>
      <div style={{ padding: '20px 24px', background: 'rgba(245,241,232,0.12)', borderRadius: 8 }}>
        <strong>工具棧</strong>：<br/>
        Cloudflare + ALB + Go App + Redis Cluster + Kafka + PostgreSQL<br/><br/>
        <strong>紅線</strong>：<br/>
        · Redis P99 &gt; 50ms → 死<br/>
        · Kafka error &gt; 0.1% → 掉訂單<br/>
        · 沒對帳 → 不能上
      </div>
    </div>
  
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' />
      <PageNum n={11} total={14} />
      <BrandBar />
    </div></>
);

const P12: Page = () => (
  <ThreeTakeaways chapter='Case 1 · 電商秒殺' lines={[
    '秒殺架構的本質 = 把無效流量在最早層擋掉',
    '所有「優雅」都是用「對帳成本」買的',
    '涉及錢 → 強一致 + 對帳，不省',
  ]} />
);

export const meta: SlideMeta = { title: 'Case 1 · 電商秒殺系統' };
const P02c: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '40% 60%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_funnel} alt='Seckill traffic shedding funnel' style={{ maxWidth: '100%', maxHeight: '92%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>核心心智模型</Kicker>
        <PageH1 size={38}>削峰漏斗</PageH1>
        <div style={{ fontSize: 16, lineHeight: 1.65 }}>
          <strong>100K req/s → 1K orders</strong> 的 4 道過濾：<br/><br/>
          1. <strong>CDN + WAF</strong> · 擋 bot / DDoS<br/>
          2. <strong>預約頁 token</strong> · 過濾無效<br/>
          3. <strong>Redis 原子扣減</strong> · 售完即 reject<br/>
          4. <strong>Kafka buffer</strong> · 平緩 DB
        </div>
        <div style={{ marginTop: 14 }}><Mantra>越早層擋掉越便宜</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 1 · 電商秒殺' section='削峰漏斗心智模型' />
      <PageNum n={3} total={13} />
      <BrandBar />
    </div>
  </>
);

export default [P01, P02, P02c, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12] satisfies Page[];
