import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model from './assets/00_mental_model.png';
import img_01_scaling_reads_01_ladder from './assets/01_scaling_reads_01_ladder.png';
import img_01_scaling_reads_02_cqrs from './assets/01_scaling_reads_02_cqrs.png';
import img_01_scaling_reads_03_lag from './assets/01_scaling_reads_03_lag.png';
import img_01_scaling_reads_04_antipatterns from './assets/01_scaling_reads_04_antipatterns.png';
import img_02_scaling_writes_01_strategies from './assets/02_scaling_writes_01_strategies.png';
import img_02_scaling_writes_02_sharding_keys from './assets/02_scaling_writes_02_sharding_keys.png';
import img_02_scaling_writes_03_hotkey_split from './assets/02_scaling_writes_03_hotkey_split.png';
import img_02_scaling_writes_04_write_behind from './assets/02_scaling_writes_04_write_behind.png';
import img_03_distributed_cache_01_topology from './assets/03_distributed_cache_01_topology.png';
import img_03_distributed_cache_02_consistent_hash from './assets/03_distributed_cache_02_consistent_hash.png';
import img_04_cdn_01_global_edge from './assets/04_cdn_01_global_edge.png';
import img_04_cdn_02_push_vs_pull from './assets/04_cdn_02_push_vs_pull.png';
import img_04_cdn_03_edge_compute from './assets/04_cdn_03_edge_compute.png';
import img_99_recap_01_news_site from './assets/99_recap_01_news_site.png';
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
  <ChapterDivider eyebrow={'CHAPTER · 06 · TOPIC 00'} title={'Scaling Patterns'} subtitle={'把系統擴展到 10×、100×、1000× 的具體模式'} />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={2} total={35} />
      <BrandBar />
    </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '60px 80px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>OBJECTIVES · MENTAL MODEL · NUMBERS</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① READ PATH'} text={'Replica · Cache · Materialized View → Ch.6.1'} />
        <StackRow tone='#A1813F' label={'② WRITE PATH'} text={'Shard · Batch · Queue · Aggregate → Ch.6.2'} />
        <StackRow tone='#5B7570' label={'③ CACHE'} text={'Distributed cache · 一致性 · HA → Ch.6.3'} />
        <StackRow tone='#5B9770' label={'④ EDGE'} text={'CDN · Edge compute · 全球分發 → Ch.6.4'} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>元件</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>單機上限</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>撞牆訊號</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>關聯式 DB（B-tree）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>~1K wps</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CPU/IO wait</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cassandra（append-only）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>~10K wps</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>compaction 排隊</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Redis 單機</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>~100K ops/s</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>network bw 滿</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Read replica（有 index）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>50K–100K rps</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>replication lag</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>讀寫不對稱</strong>：90% 系統讀:寫 = 100:1。先優化讀，撞牆再優化寫。</span></div>
    </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_00_mental_model} alt='' style={{ width: '100%', maxHeight: 580, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'常用技術/08 + 10 · 設計模式/01 §2 · 02 §1'} />
    <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
    <PageNum n={3} total={36} />
    <BrandBar />
  </div>
);


const P04: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 06 · TOPIC 01'} title={'Scaling Reads'} subtitle={'讀流量的 4 層階梯，撐起 90% 系統'} />
);


const P05: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_scaling_reads_02_cqrs} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={5} total={35} />
      <BrandBar />
    </div>
);


const P06: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_scaling_reads_03_lag} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={6} total={35} />
      <BrandBar />
    </div>
);


const P07: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_scaling_reads_04_antipatterns} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={7} total={35} />
      <BrandBar />
    </div>
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '60px 80px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>SCALE READS · WHY + HOW（4 層命中階梯）</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>100:1</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>Web 常態</strong>：每 1 寫背後 100 讀（Twitter timeline / E-commerce / News）。讀路徑撐住，整體系統就活著。</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'L1 · Browser / App'} text={'Cache-Control + ETag · 0 RTT'} />
        <StackRow tone='#A1813F' label={'L2 · CDN Edge'} text={'靜態資源就近 · 命中率 >90%'} />
        <StackRow tone='#5B7570' label={'L3 · Distributed Cache'} text={'Redis · 1ms · 命中率 >80%'} />
        <StackRow tone='#5B9770' label={'L4 · DB Read Replicas'} text={'主寫從讀'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>4 層命中率複合</strong>：99.9% 請求都打到 L3 以前。<strong>這就是 Twitter 撐 100K QPS 的原理</strong>。</span></div>
    </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_01_scaling_reads_01_ladder} alt='' style={{ width: '100%', maxHeight: 580, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'設計模式/01 Scaling Reads.pdf · §1 + §3 Layers'} />
    <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
    <PageNum n={8} total={36} />
    <BrandBar />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Materialized View · CQRS Read · Edge Compute</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALE READS · 三個進階模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>① Materialized View</strong>
把昂貴 join / aggregation <strong>預先算好存表</strong>。<br />
<strong>例</strong>：商品平均評分用 &lt;code&gt;CREATE MATERIALIZED VIEW product_ratings&lt;/code&gt;，背景定期 refresh，比每次頁面載入都跑 GROUP BY 快 100×。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>② CQRS Read Model</strong>
讀寫用不同資料模型——<strong>讀模型可以是反正規化的</strong>，為查詢優化。<br />
<strong>例</strong>：訂單的「總覽列表」用 Elasticsearch · 「詳情」用 PostgreSQL。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>③ Edge Compute</strong>
把計算搬到 CDN edge（CloudFlare Workers · Lambda@Edge）。<br />
<strong>例</strong>：A/B 測試、個人化推薦、Auth 驗證 都在邊緣節點完成。</Callout>
    </div>
    <Footer source={'設計模式/01 Scaling Reads.pdf · §5 Advanced'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={9} total={35} />
      <BrandBar />
    </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALE READS · Cache 三大反模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>① Cache Stampede</strong>
TTL 到期那一秒 100K 請求同時 miss、同時打 DB = 自我 DDoS。<br />
<strong>解</strong>：TTL + jitter（基礎）· probabilistic early refresh（熱門 entry）· 背景主動刷新（最熱）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>② Invalidation Race（Cache Versioning 解）</strong>
寫入後刪 cache 有 race。<strong>改成 cache key 帶版本號</strong> &lt;code&gt;event:123:v43&lt;/code&gt;——不刪 cache 而是繞過它。CDN / browser 也自動轉新 URL。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>③ Hot Key（爆紅推文）</strong>
傳統 cache 假設 key 分散，<strong>爆紅打破這假設</strong>。<br />
<strong>解</strong>：request coalescing（並發只發 1 個回源）+ key fanout（&lt;code&gt;feed:taylor:1/2/...&lt;/code&gt; 隨機讀）。</Callout>
    </div>
    <Footer source={'設計模式/01 Scaling Reads.pdf · §6-7 Deep Dive'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={10} total={35} />
      <BrandBar />
    </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>讀擴展的成本</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALE READS · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'讀擴展紅利'} items={['讀 QPS 隨 cache + replica 線性擴展', '單一 DB 主節點壓力降到 1/100', 'P99 latency 大幅下降']} />
        <TradeoffCol tone='#E8634F' title={'讀擴展代價'} items={['多層 cache 增加 staleness window', 'cache invalidation 複雜度上升', 'Replication lag 帶來 read-your-own-write 問題', 'Materialized view refresh 排程要顧']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：讀路徑越多層越快，<strong>但 cache 越多層 debug 越難</strong>——層數要與 SRE 能力匹配。</span></div>
    </div>
    <Footer source={'設計模式/01 Scaling Reads.pdf · §8'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={11} total={35} />
      <BrandBar />
    </div>
);


const P12: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 06 · TOPIC 02'} title={'Scaling Writes'} subtitle={'Sharding、批量、佇列、階層聚合——讓每個元件只扛得住的負載'} />
);


const P13: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_scaling_writes_02_sharding_keys} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={13} total={35} />
      <BrandBar />
    </div>
);


const P14: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_scaling_writes_03_hotkey_split} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={14} total={35} />
      <BrandBar />
    </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALE WRITES · WHY + 4 個策略</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>寫無法靠 cache 解決</strong>（cache 給讀），<strong>也無法靠 replica 解決</strong>（replica 是讀副本，寫還是得回 leader）。</Callout>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Sharding</strong>
    水平切分 · QPS 線性擴展</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Queue + Load Shedding</strong>
    爆發吸收 · 不重要的寫直接丟</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Batching</strong>
    應用 / 中介 / DB 三層合批</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Hierarchical Aggregation</strong>
    fan-in 降量 + fan-out 廣播</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>選擇順序</strong>：Vertical 壓榨 → Sharding → Batch / Queue → Hierarchical（極端）。<strong>核心</strong>：降低每個元件的吞吐壓力。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_02_scaling_writes_01_strategies} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/02 Scaling Writes.pdf · §1-2'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={15} total={35} />
      <BrandBar />
    </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALE WRITES · Sharding · Hot Key · Vertical Partition</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Sharding key 選擇</strong>
<strong>Hash(userId)</strong> 通常均勻 ✓ ／ <strong>國家</strong> 中國過載紐西蘭閒置 ✗ ／ <strong>時間戳</strong> 永遠寫最新 shard（hot shard）✗。<br />
<strong>Resharding 8→16</strong>：用 dual-write + gradual migration，<strong>不要停機 rehash</strong>。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Hot Key Split</strong>
爆紅推文 100K 按讚 = 單 shard 扛不住。&lt;code&gt;Post1Likes&lt;/code&gt; → 固定拆 &lt;code&gt;Post1Likes-0/1/2...k-1&lt;/code&gt;，讀者讀 k 份加總（<strong>讀放大 k 倍是代價</strong>）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Vertical Partitioning（按欄位拆表）</strong>
&lt;code&gt;posts&lt;/code&gt; 大表 → &lt;code&gt;post_content&lt;/code&gt;（B-tree）+ &lt;code&gt;post_metrics&lt;/code&gt;（in-memory counter）+ &lt;code&gt;post_analytics&lt;/code&gt;（append-only time-series）。每張表針對自己 workload 優化。</Callout>
    </div>
    <Footer source={'設計模式/02 Scaling Writes.pdf · §2 Sharding & Vertical · §6 Hot Key'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={16} total={35} />
      <BrandBar />
    </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '60px 100px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>SCALE WRITES · Queue · Load Shedding · Batching</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Write Queue（短暫爆發）</strong>
Kafka / SQS 緩衝峰值，DB 穩定消費。<strong>反模式</strong>：用 queue 蓋一個長期扛不住的 DB → queue 無限長。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Load Shedding（不是所有寫都該活）</strong>
Strava / Robotaxi 位置：丟一筆沒差，幾秒後就有新的。Analytics 先保 click 丟 impression。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Batching 三層</strong>
<strong>應用層</strong>（從 Kafka 讀一批寫一批，崩潰可重讀）／<strong>中介層</strong>（Like Batcher 60s 聚合 100 讚 = 1 寫）／<strong>DB 層 write-behind</strong>（Redis 100ms flush，<strong>金融絕對不能用</strong>——崩潰丟資料）。</Callout>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_02_scaling_writes_04_write_behind} alt='' style={{ width: '100%', maxHeight: 560, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'設計模式/02 Scaling Writes.pdf · §3 Queue · §4 Batching'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={17} total={35} />
      <BrandBar />
    </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALE WRITES · Hierarchical Aggregation + TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   N 觀眾 ─→ Write Proc（fan-in 聚合 N 條→1 條）─→ Root
                                              ↓
                  Broadcast Node（fan-out hash 分配觀眾）─→ N 觀眾`}</pre>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'紅利'} items={['寫 QPS 上 100K+', '百萬 N×N fan-out 變可行（直播留言）', '事件 log 給 audit / replay']} />
        <TradeoffCol tone='#E8634F' title={'代價'} items={['每階聚合 1-2s 延遲（金融行情不行）', 'Eventual consistency 滲透到 UI', '跨 shard 事務難（Saga 配套）· 運維翻倍']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：QPS 1K 就上 Kafka + CQRS = 寫複雜度 &gt; 業務複雜度 = 過度工程。</Callout>
    </div>
    <Footer source={'設計模式/02 Scaling Writes.pdf · §5 + §7'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={18} total={35} />
      <BrandBar />
    </div>
);


const P19: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 06 · TOPIC 03'} title={'Distributed Cache'} subtitle={'當 cache 自己也變成需要被設計的分散式系統'} />
);


const P20: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_distributed_cache_02_consistent_hash} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={20} total={35} />
      <BrandBar />
    </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '60px 100px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>DISTRIBUTED CACHE · WHY + Cluster 架構</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Callout tone='#D97757'><strong>Local cache</strong>：100 台 server = 100 份冗餘 / <strong>Distributed</strong>：共享一份，省記憶體 + 一致性。<strong>心智轉變</strong>：問題從「eviction / stampede」變「節點分配 / rebalancing / partial failure」——cache 自己成了分散式系統。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Sharding 必用 Consistent Hashing</strong>
反模式 &lt;code&gt;hash(key) % N&lt;/code&gt;：5→6 台 → <strong>幾乎所有 key 重新映射</strong> = 瞬間 cold start。Consistent hashing 只解決平均，<strong>不解決偏斜</strong>。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Cluster vs Sentinel</strong>
<strong>Cluster</strong>：16384 hash slot + master 配 replica + Gossip → TB 級必選。<br />
<strong>Sentinel</strong>：單 master + HA failover，沒分片，運維簡單但寫入受限。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Hot Key 防禦</strong>
直播間/明星占 20%+ 流量 = bottleneck。<strong>解</strong>：Key 多副本 · App-level local cache · Key fanout。</Callout>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_03_distributed_cache_01_topology} alt='' style={{ width: '100%', maxHeight: 560, objectFit: 'contain' }} />
      </div>
    </div>
    <Footer source={'常用技術/08 Distributed Cache.pdf · §1-3'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={21} total={35} />
      <BrandBar />
    </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DISTRIBUTED CACHE · Failure Modes</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>真實事故</strong>：訂票系統 50K QPS（45K cache 命中、5K 打 DB）。某天 cache cluster 配置錯誤全部重啟 → DB 瞬間承受 10× 流量 → <strong>整個訂票系統掛掉</strong>。Cache 不只是加速層，<strong>它是 DB 的保護層</strong>——必須有 replication。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>① Cache Stampede</strong>
大量 key 同時過期 → 同時 miss → 同時打 DB。<strong>解</strong>：TTL + jitter · single-flight。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>② Cold Start</strong>
新節點加入 / cluster 重啟 → cache 全空。<strong>解</strong>：預熱 · 流量逐步切換。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>③ Partial Node Failure（最隱晦）</strong>
節點變慢但<strong>沒 crash</strong> → client timeout retry → 連鎖。<strong>解</strong>：timeout + circuit breaker。</Callout>
    </div>
    <Footer source={'常用技術/08 Distributed Cache.pdf · §3 Replication · §4 Failure Modes'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={22} total={35} />
      <BrandBar />
    </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DISTRIBUTED CACHE · TRADE-OFF + 容量</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'紅利'} items={['共享記憶體 · 容量可擴 TB 級', '多 client 一致 · HA via replication', '**容量算式**：熱資料 × 1.5 = 集群 RAM', '**Eviction**：LFU 適熱點明顯場景']} />
        <TradeoffCol tone='#E8634F' title={'代價'} items={['Network RTT（μs → ms）', 'Cluster 故障影響全部 client', 'Rebalancing 期間流量峰值', '**Multi-region 不跨區複製**——cache 可重建，全球一致留給 DB']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試完整答</strong>：sharded + consistent hashing + replica + TTL jitter + single-flight + hot key fallback + cluster failure 降級模式。</span></div>
    </div>
    <Footer source={'常用技術/08 Distributed Cache.pdf · §6-8'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={23} total={35} />
      <BrandBar />
    </div>
);


const P24: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 06 · TOPIC 04'} title={'CDN'} subtitle={'把內容推到離使用者 < 50ms 的邊緣'} />
);


const P25: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_cdn_01_global_edge} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={25} total={35} />
      <BrandBar />
    </div>
);


const P26: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_cdn_02_push_vs_pull} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={26} total={35} />
      <BrandBar />
    </div>
);


const P27: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_cdn_03_edge_compute} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={27} total={35} />
      <BrandBar />
    </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CDN · WHY + 4 個層級</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>沒 CDN</strong>：台灣 → 紐約 RTT 150ms × 數十次 = 數秒延遲。
<strong>有 CDN</strong>：&lt; 50ms 邊緣命中。圖片/影片/CSS/JS/字型 100% 該走，HTML 看靜態程度。</Callout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Edge POP'} text={'全球 200+ 點 · 第一層命中（>85%）'} />
        <StackRow tone='#A1813F' label={'② Mid Tier'} text={'區域聚合 · 過濾 origin 流量'} />
        <StackRow tone='#5B7570' label={'③ Origin Shield'} text={'統一回源點 · 避免 thundering herd'} />
        <StackRow tone='#5B9770' label={'④ Origin'} text={'你的 server / S3'} />
      </div>
    </div>
    <Footer source={'常用技術/10 CDN.pdf · §1-2'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={28} total={35} />
      <BrandBar />
    </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CDN · 快取規則 + Invalidation</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'強快取 + Hash Busting（推薦）'} items={['<code>max-age=31536000, immutable</code>', '檔名 hash <code>main.a3f.css</code> = 改內容 = 換 URL，**永遠不用 invalidate**', 'JS / CSS / 字型 / 圖片']} />
        <TradeoffCol tone='#E8634F' title={'短 TTL + 主動 Purge'} items={['<code>no-cache, must-revalidate</code> + ETag → 304', '**Purge API 30 秒到幾分鐘 propagation**（全球 edge 不會瞬間生效）', 'HTML / index 頁']} />
      </div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Push vs Pull · Stale-While-Revalidate</strong>
<strong>99% 用 Pull</strong>；Push 僅用於可預測爆紅（影片首播）。<br />
<strong>Stale-while-revalidate</strong>：過期 cache 先回，背景去 origin 拉新——origin 不被打爆。</Callout>
    </div>
    <Footer source={'常用技術/10 CDN.pdf · §3-5 Cache & Invalidation'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={29} total={35} />
      <BrandBar />
    </div>
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CDN · Edge Compute（CDN 不只是 cache）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'>CloudFlare Workers / Lambda@Edge / Akamai EdgeWorkers——<strong>在邊緣跑你的程式</strong>。</Callout>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>用途</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>典型範例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Auth / JWT 驗證</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>無效請求不打 origin</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>A/B 測試分流</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>邊緣決定 variant</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>個人化 / Geo 路由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>依使用者地區改 response</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Bot 防護 / Rate limit</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>邊緣擋惡意流量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Image transform</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>動態 resize / WebP</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Smart routing</strong>：CDN 自己判斷哪條路徑最快——不只地理近，還看實時網路狀況。</span></div>
    </div>
    <Footer source={'常用技術/10 CDN.pdf · §6 Edge Compute'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={30} total={35} />
      <BrandBar />
    </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>CDN 不是萬靈丹</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CDN · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'CDN 紅利'} items={['使用者延遲降到 <50ms', 'Origin 頻寬與計算成本降 90%', 'DDoS 防護 + WAF（SQL injection / XSS 邊緣擋）', '動態 API 加速（TCP/HTTP3 優化降 30–50% 延遲）']} />
        <TradeoffCol tone='#E8634F' title={'CDN 代價'} items={['動態內容沒 CDN 加速效益', 'Purge propagation 要 30 秒到幾分', '跨 CDN 切換成本高（邊緣規則 vendor lock-in）', '除錯困難（要看 origin / mid / edge 三層）']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：個人化資料（私訊、帳號、推薦）丟 CDN——hit rate 為 0，純浪費。<br /><strong>CDN 只對「多用戶共享同份資料」有意義。</strong></Callout>
    </div>
    <Footer source={'常用技術/10 CDN.pdf · §8'} />
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={31} total={35} />
      <BrandBar />
    </div>
);


const P32: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 06 · RECAP'} title={'Ch.6 Recap'} subtitle={'把 4 個擴展模式串成真實系統'} />
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '60px 80px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px', color: muted }}>CASE STUDY · 新聞網站（極致讀擴展）</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'L1 · Browser'} text={'圖文 max-age=1 年（hash 檔名）· HTML stale-while-revalidate'} />
        <StackRow tone='#A1813F' label={'L2 · CDN'} text={'文章正文 + 圖片 + JS/CSS edge cache · purge by tag 上稿即刷'} />
        <StackRow tone='#5B7570' label={'L3 · Redis Cluster'} text={'熱門文章 + session · LFU eviction · key fanout 防爆紅'} />
        <StackRow tone='#5B9770' label={'L4 · DB Read Replicas'} text={'一寫多讀 · 編輯後台才打 leader'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>99% 讀請求在 L2 命中</strong>——讀流量看似 1M QPS，DB 實際只承受 1k QPS。</span></div>
    </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={img_99_recap_01_news_site} alt='' style={{ width: '100%', maxHeight: 580, objectFit: 'contain' }} />
      </div>
    </div>
    <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
    <PageNum n={33} total={36} />
    <BrandBar />
  </div>
);


const P34: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第六章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新的工具'} items={['讀擴展 4 層階梯 + cache versioning + stampede 防禦', '寫擴展 4 模式（Shard/Batch/Queue/Aggregate）+ hot key split', 'Distributed cache：consistent hashing · replication · failure modes', 'CDN 4 層 + invalidation 三招 + edge compute']} />
        <TradeoffCol tone='#E8634F' title={'還沒回答的問題'} items={['異步任務怎麼設計？　→ Ch.7 Queue / Long Running', '即時推播怎麼做？　→ Ch.7 Real-time', '大檔案怎麼處理？　→ Ch.7 Large Blobs', '怎麼做全文搜尋？　→ Ch.7 Search', 'RAG 系統長怎樣？　→ Ch.7 RAG']} />
      </div>
  
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' />
      <PageNum n={34} total={35} />
      <BrandBar />
    </div>
);


const P35: Page = () => (
  <SectionEnd title={'Ch.6 完'} subtitle={'擴展模式都備齊了，下一站進階：異步、即時、搜尋、AI。'} next={'Ch.7 Advanced Patterns</span>'} />
);


export const meta: SlideMeta = { title: 'Ch.6 · Scaling Patterns' };

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 4, animationDelay: '0.05s' }}>本章新術語 · 6 個詞</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 800, margin: '8px 0 24px', animationDelay: '0.1s' }}>擴流量的招式</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='Read Replica' en='讀副本' def='主庫寫、多個副本讀（讀寫比高的場景）。' />
        <TermCard name='Cache-aside' en='旁路快取' def='miss 時才查 DB → 寫回 cache（預設模式）。' />
        <TermCard name='Write-through / behind' en='寫穿 / 寫後' def='同步雙寫 cache+DB / 先寫 cache 後寫 DB。' />
        <TermCard name='CDN Pull / Push' en='CDN 拉/推' def='邊緣節點需要時才拉 / 主動推到邊緣。' />
        <TermCard name='CQRS' en='命令查詢分離' def='讀模型跟寫模型分開，各自優化。' />
        <TermCard name='Distributed Cache' en='分散式快取' def='多台 Redis 組成 cluster，跨機共享熱資料。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix 詞彙速查表</div>
      <Breadcrumb part='Part 6' chapter='Ch.06 · 擴展模式' section='本章新術語' />
      <PageNum n={2} total={36} />
      <BrandBar />
    </div>
  </>
);

export default [P01, P02b, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35] satisfies Page[];
