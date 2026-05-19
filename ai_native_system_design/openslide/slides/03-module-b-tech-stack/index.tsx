import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/03_module_b_hero.png';
import img_cap from './assets/B_cap_triangle.png';
import img_dbtree from './assets/B_db_decision_tree.png';
import img_sharding from './assets/B_sharding_topology.png';
import logoDark from '../../assets/branding/logo-dark.png';
import logoLight from '../../assets/branding/logo-light.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F1E8', text: '#2A2520', accent: '#D97757' },
  fonts: { display: '"Noto Serif TC", Georgia, serif', body: '"Noto Sans TC", system-ui, sans-serif' },
  typeScale: { hero: 180, body: 38 },
  radius: 8,
};

const muted = '#8B6F47', subtle = 'rgba(42, 37, 32, 0.55)', ok = '#5B9770', warn = '#E8634F', accent = '#D97757';

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
.osd-stagger > *:nth-child(9) { animation-delay: 0.45s; } .osd-stagger > *:nth-child(10) { animation-delay: 0.50s; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;

const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-anim-fade-up' style={{ fontSize: 24, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>
);
const Footer = ({ source }: { source: string }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>
);
const PageH1 = ({ children, size = 50 }: { children: React.ReactNode; size?: number }) => (
  <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px', animationDelay: '0.1s' }}>{children}</h1>
);

const ChapterDivider = ({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) => (
  <><AnimStyle />
    <div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
      <div style={{ padding: '0 100px' }}>
        <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
        <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 120, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
        {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 38, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
      </div>
      {image ? <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 40, animationDelay: '0.2s' }}><img src={image} alt='' style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /></div> : null}
    <BrandBar light />
      </div>
  </>
);

const SectionEnd = ({ title, subtitle, next }: { title: string; subtitle?: string; next?: string }) => (
  <><AnimStyle />
    <div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 130, fontWeight: 800, margin: 0 }}>{title}</h1>
      {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 44, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245,241,232,0.85)', animationDelay: '0.15s' }}>{subtitle}</h2> : null}
      {next ? <p className='osd-anim-fade-up' style={{ fontSize: 28, marginTop: 56, color: '#F5F1E8', opacity: 0.9, animationDelay: '0.3s' }}>→ {next}</p> : null}
    <BrandBar light />
      </div>
  </>
);

const PromptBlock = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-anim-fade-up' style={{ background: '#2A2520', color: '#F5F1E8', padding: '16px 22px', borderRadius: 8, fontFamily: 'IBM Plex Mono, Menlo, monospace', fontSize: 16, lineHeight: 1.55, whiteSpace: 'pre-wrap', animationDelay: '0.2s' }}>{children}</div>
);

const Table = ({ cols, head, rows, fontSize = 17 }: { cols: string; head: string[]; rows: string[][]; fontSize?: number }) => (
  <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: cols, gap: 3, fontSize, lineHeight: 1.5 }}>
    {head.map((h, i) => <div key={`h-${i}`} style={{ fontWeight: 700, color: accent, padding: '9px 12px' }}>{h}</div>)}
    {rows.map((row, i) => row.map((cell, j) => (
      <div key={`r-${i}-${j}`} style={{ padding: '9px 12px', borderTop: '1px solid rgba(139,111,71,0.25)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</div>
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

const NoviceBadge = () => (
  <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 14, background: 'rgba(91, 151, 112, 0.15)', color: ok, fontSize: 15, fontWeight: 600 }}>🐤 新手友善 · 老手可跳 →</span>
);
const TermCard = ({ name, en, def }: { name: string; en: string; def: string }) => (
  <div style={{ padding: '12px 16px', background: 'rgba(217, 119, 87, 0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 6 }}>
    <div style={{ fontSize: 19, fontWeight: 700, color: accent }}>{name} <span style={{ fontSize: 13, color: muted, fontWeight: 500 }}>· {en}</span></div>
    <div style={{ fontSize: 15, lineHeight: 1.5, marginTop: 4 }}>{def}</div>
  </div>
);

const P01: Page = () => <ChapterDivider eyebrow='MODULE · B' title='技術選型與資料策略' subtitle='30 秒做出正確的資料層選型' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>B · 你會帶走什麼</Kicker>
      <PageH1>讀完 Module B，你能：</PageH1>
      <ul className='osd-stagger' style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 28 }}>
        <li>30 秒判斷 SQL vs NoSQL（不再 google）</li>
        <li>看一眼資料模式就知道該用哪類 DB</li>
        <li>算出 PostgreSQL 撐到幾 QPS 該分片</li>
        <li>用 CAP / PACELC 做出可解釋的取捨</li>
        <li>計算 TCO（不只 server，含人 + 移轉）</li>
        <li>用 Claude Code 跑「技術選型辯論」</li>
      </ul>
      <div className='osd-anim-fade-up' style={{ marginTop: 30, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
        <strong>金句</strong>：選型錯了，3 年內每天還債。選型對了，3 年內忘了它存在。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={1} total={16} />
      <BrandBar />
    </div>
  </>
);

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <Kicker>本章新術語 · 8 個詞</Kicker>
      <PageH1 size={42}>選資料層之前先認識這些</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='TCO' en='Total Cost of Ownership' def='3 年總成本：機器+人員+移轉+機會成本（不只看 server 帳單）。' />
        <TermCard name='CAP / PACELC' en='分散式定理' def='網路會壞，你必須在「一致性」和「可用性」二選一。' />
        <TermCard name='Consistency 光譜' en='強/弱一致性' def='從寫完馬上全網同步 → 最後才同步，共 6 個層級。' />
        <TermCard name='Sharding' en='資料分片' def='資料太大，拆到多台 DB（一旦做了難回頭）。' />
        <TermCard name='Replication' en='複製' def='主庫寫、副本讀，讀放大 + HA。' />
        <TermCard name='OLTP / OLAP' en='交易型 / 分析型' def='OLTP 處理單筆訂單；OLAP 跑報表統計。' />
        <TermCard name='Cache 三模式' en='cache-aside / write-through / write-behind' def='讀的時候 miss 才補 / 同步寫 / 非同步寫。' />
        <TermCard name='Vector DB' en='向量資料庫' def='存 embedding、按相似度查（pgvector / Pinecone）。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表（2/3 資料與一致性）</div>
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={2} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.1 TCO
const P03: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.1 · COST · 真實 TCO</Kicker>
      <PageH1>TCO 一頁模型</PageH1>
      <PromptBlock>{`TCO 3 年 = 機器成本
          + 人員成本（搭建 + 維運）
          + 移轉成本（學習曲線 / 遷舊資料）
          + 機會成本（沒做別的事）`}</PromptBlock>
      <div style={{ height: 18 }} />
      <Table cols='100px 1fr 1fr' head={['來源', '例：選 Kafka', '例：選 SQS']} rows={[
        ['機器', '$1,500/月 × 36 = $54K', '$300/月 × 36 = $11K'],
        ['人員', '0.5 FTE × 3yr = $180K', '0.1 FTE × 3yr = $36K'],
        ['移轉', '學習 3 月 + PoC ≈ $40K', '學習 0.5 月 ≈ $5K'],
        ['機會', '其他 feature 延 4 月', '幾乎無'],
        ['總計', '$274K', '$52K'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
        <strong>金句</strong>：90% 的「便宜方案」反而貴在人。算 TCO 把人算進去。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md · §TCO' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={3} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.2 SQL vs NoSQL
const P04: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.2 · DECISION · 30 秒判斷</Kicker>
      <PageH1>SQL vs NoSQL 決策矩陣</PageH1>
      <Table cols='130px 1fr 1fr' head={['維度', '偏 SQL', '偏 NoSQL']} rows={[
        ['資料關係', '多表 JOIN、外鍵約束', '文件型、嵌套深'],
        ['事務需求', '跨表 ACID、財務', 'eventual 可接受'],
        ['查詢模式', 'ad-hoc、複雜 query', '已知模式、單一 key'],
        ['規模', '< 10M rows/table', '> 100M、需分片'],
        ['資料形狀', '穩定 schema', 'schema 常變'],
        ['團隊', '熟 SQL', '願意學新'],
      ]} fontSize={19} />
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 21, lineHeight: 1.6, animationDelay: '0.6s' }}>
        <strong>預設值</strong>：80% 的應用 PostgreSQL 夠用。先 SQL，遇到瓶頸再換。<br/>
        <strong style={{ color: warn }}>反 pattern</strong>：「未來會很大所以先用 Mongo」—未來沒到，先嘗了 NoSQL 的痛。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={4} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.3 CAP / PACELC — Real PNG
const P05: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_cap} alt='CAP triangle' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>B.3 · CAP / PACELC</Kicker>
        <PageH1 size={38}>P 必選，C/A 二選一</PageH1>
        <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 15 }}>
          <div style={{ padding: '8px 12px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong>CP</strong> · Spanner / 銀行 / 票券</div>
          <div style={{ padding: '8px 12px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong>AP</strong> · Mongo / Cassandra / DynamoDB</div>
          <div style={{ padding: '8px 12px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong>CA</strong> · PostgreSQL 單 region only</div>
        </div>
        <div style={{ marginTop: 14 }}><Mantra>強一致是奢侈品，買得起再買</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' section='B.3 · CAP / PACELC' />
      <PageNum n={5} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.4 DB Decision Tree — Real PNG
const P06: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_dbtree} alt='DB decision tree' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>B.4 · 七大 DB 決策樹</Kicker>
        <PageH1 size={36}>各自殺手場景</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          · 關聯 → PostgreSQL<br/>
          · 文件 → Mongo<br/>
          · KV → Redis<br/>
          · 時序 → InfluxDB<br/>
          · 圖 → Neo4j<br/>
          · 列存 → ClickHouse<br/>
          · 向量 → pgvector
        </div>
        <div style={{ marginTop: 14 }}><Mantra>預設 PostgreSQL，瓶頸到了再針對性加</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' section='B.4 · 七大 DB' />
      <PageNum n={6} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.5 Consistency Spectrum
const P07: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.5 · SPECTRUM · 不是 binary</Kicker>
      <PageH1>一致性層級光譜（從 strict 到 eventual）</PageH1>
      <Table cols='180px 1fr 1fr 1fr' head={['層級', '保證', '範例', '業務範例']} rows={[
        ['Linearizable', '全局即時順序', 'Spanner', '銀行轉帳'],
        ['Sequential', '全局順序但非即時', '多 leader Postgres', '訂單流水'],
        ['Causal', '因果順序', '部分系統', '留言 + 回覆'],
        ['Read-your-writes', '自己看自己寫的', 'session-sticky', '個人發文'],
        ['Monotonic reads', '不會看到時光倒流', 'client cache', 'feed'],
        ['Eventual', '最終一致', 'DNS、CDN', '推薦結果'],
      ]} fontSize={17} />
      <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 21, fontStyle: 'italic', color: muted, animationDelay: '0.7s' }}>
        <strong>金句</strong>：強一致是奢侈品，買得起再買。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md · §Consistency' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={7} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.6 Sharding · Partitioning · Replication — Real PNG
const P08: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_sharding} alt='Sharding / Partitioning / Replication' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>B.6 · 三件套</Kicker>
        <PageH1 size={36}>各解一種痛</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          <strong>Replication</strong> · 讀放大 + HA<br/>
          <strong>Partitioning</strong> · 單表太大<br/>
          <strong>Sharding</strong> · 寫放大 + 總容量<br/><br/>
          <strong style={{ color: warn }}>反 pattern</strong>：<br/>
          第一天就 sharding
        </div>
        <div style={{ marginTop: 14 }}><Mantra>shard key 是「改一次回不去」的決策</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' section='B.6 · 三件套' />
      <PageNum n={8} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.7 PG vs DynamoDB
const P09: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.7 · REAL DECISION</Kicker>
      <PageH1>案例：PostgreSQL vs DynamoDB</PageH1>
      <Table cols='150px 1fr 1fr' head={['維度', 'PostgreSQL', 'DynamoDB']} rows={[
        ['規模上限', '單機 10M rows，後 sharding', '自動 scale，無上限'],
        ['查詢彈性', '任意 SQL、JOIN', '必須照 key/index'],
        ['一致性', '強', '預設 eventual'],
        ['成本（小）', '$200/月 RDS', '$50/月'],
        ['成本（大）', '$10K/月 + sharding 人力', '$5K/月'],
        ['學習曲線', '0（團隊熟）', '3 個月'],
        ['TCO 3 年', '$80K', '$250K'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
        <strong>結論</strong>：100K tenants 預期 → PostgreSQL + sharding by tenant_id 較划算。<strong>金句</strong>：選型沒有「正確答案」，只有「對你正確」。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={9} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.8 Cache
const P10: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.8 · CACHE · 三個維度</Kicker>
      <PageH1>Redis vs Memcached vs CDN</PageH1>
      <Table cols='150px 1fr 1fr 1fr' head={['工具', '結構', '持久化', '殺手場景']} rows={[
        ['Memcached', '純 KV', '無', '簡單 hot data cache'],
        ['Redis', 'KV + List + Set + Stream', '可 RDB/AOF', 'session, rate-limit'],
        ['CDN', 'HTTP 物件', '邊緣節點', '靜態 / 圖片 / 影片'],
        ['應用內 cache', '程序記憶體', '無', '高頻、單機可接受 stale'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 20, color: warn, animationDelay: '0.7s' }}>
        <strong>陷阱</strong>：第一天上 Redis cluster。多數 &lt; 1M QPS 系統，單節點 Redis 就夠。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md · §Cache' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={10} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.9 Messaging
const P11: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.9 · MESSAGING · 4 種主流</Kicker>
      <PageH1>訊息系統選型</PageH1>
      <Table cols='150px 1fr 1fr 1fr' head={['工具', '模型', '殺手場景', '反例']} rows={[
        ['Kafka', '持久化 log', 'event sourcing, 大 fanout', '簡單 task queue'],
        ['RabbitMQ', 'broker + queue', '任務分派, 路由複雜', '100K+ msg/s'],
        ['SQS', 'managed queue', 'AWS 內輕量', '順序保證 / 重放'],
        ['Redis Stream', 'log-like', '中等吞吐 + 已用 Redis', '永久保留'],
      ]} fontSize={17} />
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
        <strong>金句</strong>：每個訊息系統都有「不適合的工作」，沒有萬用解。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md · §Messaging' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={11} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.10 Search & Vector
const P12: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.10 · SEARCH · 兩種需求</Kicker>
      <PageH1>搜尋與向量 DB</PageH1>
      <Table cols='220px 1fr 1fr' head={['需求', '工具', '範例']} rows={[
        ['文字全文搜', 'Elasticsearch / OpenSearch / Meilisearch', '電商搜商品'],
        ['語義相似（向量）', 'pgvector / Pinecone / Qdrant', 'RAG, 推薦'],
        ['混合（lexical + vector）', 'OpenSearch / Vespa', '高品質 RAG'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 26, fontSize: 19, lineHeight: 1.7, animationDelay: '0.5s' }}>
        <strong>向量 DB 選型 5 點</strong>：<br/>
        1. 已用 PG → 先用 pgvector · 2. 規模 &lt; 10M → pgvector/Qdrant<br/>
        3. 規模 &gt; 100M → Pinecone managed · 4. hybrid → Weaviate · 5. 不想自管 → Pinecone
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
        <strong>RAG 真相</strong>：80% 的 RAG 系統 pgvector 夠用。Pinecone 是後期問題。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={12} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.11 AI Selection Workflow
const P13: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.11 · END-TO-END</Kicker>
      <PageH1>AI 輔助選型完整 workflow</PageH1>
      <PromptBlock>{`Step 1 · 餵約束:
我要選一個 [訊息系統]。
NFR：[QPS、延遲、保留、replay 需求]
約束：[AWS only, team 5 人不熟 Kafka, 預算 $500/月]
請列 4 個候選方案 + 一張比較表。

Step 2 · 強制 trade-off:
針對 Kafka vs SQS：給我 5 個「3 年後我會後悔選 Kafka」的點
                 + 5 個「3 年後我會後悔選 SQS」的點

Step 3 · 出 ADR:
基於以上，用 ADR 模板輸出。Open Questions ≥ 5 個。`}</PromptBlock>
      <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={13} total={16} />
      <BrandBar />
    </div>
  </>
);

// B.12 Data Modeling
const P14: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>B.12 · MODELING · 開 schema 前</Kicker>
      <PageH1>資料建模四問</PageH1>
      <ol className='osd-stagger' style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 28 }}>
        <li>這個實體的「生命週期」是什麼？（建 → 用 → 終止）</li>
        <li>它的 ownership 屬於誰？（user / tenant / global）</li>
        <li>它會怎麼被查詢？（by id, by user, by time, full text…）</li>
        <li>5 年後它會長到多大？（影響 partition / index）</li>
      </ol>
      <div className='osd-anim-fade-up' style={{ marginTop: 24, padding: '16px 22px', background: 'rgba(217,119,87,0.10)', borderLeft: `5px solid ${accent}`, borderRadius: 6, fontSize: 19, lineHeight: 1.6, animationDelay: '0.5s' }}>
        <strong>範例：訂單</strong> · 生命週期 created → paid → shipped → completed → archived ·
        Ownership user_id 主 owner · 查詢 by user_id+time desc 90% · 5 年規模 100M rows → partition by month
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
        <strong>金句</strong>：90% 的 schema 痛苦來自「沒問完這 4 題」就上線。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md · §Modeling' />
    
      <Breadcrumb part='Part 1' chapter='Module B · 技術選型' />
      <PageNum n={14} total={16} />
      <BrandBar />
    </div>
  </>
);

const P15: Page = () => (
  <ThreeTakeaways chapter='Module B · 技術選型' lines={[
    '預設 PostgreSQL，遇到瓶頸再針對性加',
    'TCO 一定要把人算進去',
    'shard key 是「改一次回不去」的決策',
  ]} />
);

export const meta: SlideMeta = { title: 'Module B · 技術選型與資料策略' };
export default [P01, P02, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15] satisfies Page[];
