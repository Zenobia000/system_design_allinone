import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/07_case_livestream_hero.png';
import img_stage1 from './assets/07_stage1_livestream.png';
import img_stage2 from './assets/07_stage2_100k_conn.png';
import img_stage3 from './assets/07_stage3_1m_global.png';
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
@keyframes osd-dash-flow { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
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
const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const Kicker = ({ children }: { children: React.ReactNode }) => <div className='osd-anim-fade-up' style={{ fontSize: 24, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>;
const Footer = ({ source }: { source: string }) => <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>;
const PageH1 = ({ children, size = 48 }: { children: React.ReactNode; size?: number }) => <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px', animationDelay: '0.1s' }}>{children}</h1>;

const ChapterDivider = ({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) => (
  <><AnimStyle /><div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
    <div style={{ padding: '0 100px' }}>
      <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 110, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
      {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 36, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
    </div>
    {image ? <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 40, animationDelay: '0.2s' }}><img src={image} alt='' style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /></div> : null}
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
      </div>
  </>
);

const ArchBox = ({ label, tone = tier1, width = 240, height = 60, sub }: { label: string; tone?: string; width?: number; height?: number; sub?: string }) => (
  <div style={{ width, minHeight: height, padding: '8px 16px', background: `${tone}15`, border: `2px solid ${tone}`, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 2px 6px rgba(42,37,32,0.08)' }}>
    <div style={{ fontSize: 16, fontWeight: 700, color: tone }}>{label}</div>
    {sub ? <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>{sub}</div> : null}
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
const ArrowDown = ({ tone = muted }: { tone?: string }) => (
  <svg width='22' height='26' viewBox='0 0 22 26' style={{ margin: '4px 0' }}>
    <line x1='11' y1='2' x2='11' y2='20' stroke={tone} strokeWidth='2' />
    <polygon points='6,16 11,26 16,16' fill={tone} />
  </svg>
);
const ArchFlow = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>{children}</div>
);

const P01: Page = () => <ChapterDivider eyebrow='CASE · 2' title='即時直播 / IM 推送' subtitle='WebSocket + 訊息佇列 + 高 fanout' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>業務背景</Kicker>
    <PageH1>直播平台，主播開播後即時推送聊天 + 禮物特效</PageH1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 19, lineHeight: 1.5 }}>
      {[
        ['主播數', '10K 同時開播'],
        ['觀眾數', '單熱門房 100K，平台 1M'],
        ['訊息量', '每秒 50K 訊息'],
        ['推送量', 'fanout 後 5M msg/s'],
        ['延遲', '訊息到觀眾 < 1s P99'],
        ['體驗', '禮物特效要與畫面同步'],
      ].map(([l, r]) => (
        <div key={l} style={{ padding: '12px 18px', background: 'rgba(217,119,87,0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 6 }}>
          <strong style={{ color: accent }}>{l}</strong> · {r}
        </div>
      ))}
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.5s' }}>
      <strong>核心挑戰</strong>：高 fanout + 低延遲推送 + WebSocket 連線管理
    </div>
    <Footer source='software_develop_journey/ppt/12-case-study/02_livestream.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={1} total={13} />
      <BrandBar />
    </div></>
);

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <Kicker>本章新術語 · 6 個詞</Kicker>
      <PageH1 size={42}>看直播 IM 案例前的詞彙</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='WebSocket' en='全雙工長連線' def='瀏覽器和 server 保持連線，雙向即時推訊息（vs HTTP 是一問一答）。' />
        <TermCard name='Fanout' en='扇出' def='一條訊息推給很多人（主播一句話 → 100K 觀眾都收到）。' />
        <TermCard name='Consistent Hash' en='一致性哈希' def='把資料 / 連線分配到多台，加減機器時搬動最少。' />
        <TermCard name='Pub/Sub' en='發布訂閱' def='發訊者只管「發」，所有訂閱者都會收到（Redis Stream / Kafka）。' />
        <TermCard name='Cassandra' en='寬列資料庫' def='高寫吞吐、按時間分區，適合存大量聊天訊息歷史。' />
        <TermCard name='Backpressure' en='反壓' def='下游慢時，上游主動放慢（避免 buffer 爆掉）。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表</div>
    
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={2} total={13} />
      <BrandBar />
    </div>
  </>
);

const P03: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C2.1 · REQUIREMENTS</Kicker>
    <PageH1>需求量化（NFR）</PageH1>
    <Table cols='180px 1fr' head={['業務需求', 'NFR 量化']} rows={[
      ['「即時推送」', 'E2E delay P99 < 1s, P50 < 200ms'],
      ['「不掉訊息」（聊天）', '99.99% delivered, at-least-once'],
      ['「禮物精準」', '100% delivered, idempotent'],
      ['「不卡頓」', 'WebSocket stable, 重連 < 3s'],
      ['「fanout 撐得住」', '單房 100K 連線, 推送 lag < 500ms'],
      ['「成本可控」', '每連線 < $0.001/天'],
      ['「審查」', '違規訊息 1s 內過濾'],
    ]} fontSize={18} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, padding: '12px 18px', background: '#2A2520', color: '#F5F1E8', borderRadius: 6, fontSize: 16, lineHeight: 1.7, animationDelay: '0.7s' }}>
      容量：1M concurrent WebSocket · 50K msg/s 產生 · 5M msg/s 推送 · 單連線 idle ~100 byte/s
    </div>
    <Footer source='software_architect/ppt/_source/02_Requirements_SLA.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={3} total={13} />
      <BrandBar />
    </div></>
);

const P04: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C2.2 · SELECTION</Kicker>
    <PageH1>技術選型決策矩陣</PageH1>
    <Table cols='150px 200px 1fr 1fr' head={['元件', '選', '不選', '理由']} rows={[
      ['推送協定', 'WebSocket', 'SSE, polling', '雙向、低 overhead'],
      ['Gateway', '自建 Go + WS', 'Pusher SaaS', '1M 連線成本'],
      ['Pub/Sub', 'Redis Stream + Kafka', 'RabbitMQ', 'Redis 即時 + Kafka 持久'],
      ['房間路由', 'Consistent Hash', 'DB lookup', '連線層快速 dispatch'],
      ['持久化', 'Cassandra', 'PostgreSQL', '高寫吞吐、時序'],
      ['CDN（影片）', 'Cloudflare Stream', 'self-host', '影片不是本案核心'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
      <strong>核心決策</strong>：把連線層與業務層分離—連線層只管推送。
    </div>
    <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={4} total={13} />
      <BrandBar />
    </div></>
);

const P05: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage1} alt='Stage 1 Livestream MVP' style={{ maxWidth: '100%', maxHeight: '88%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C2.3 · STAGE 1 · MVP</Kicker>
        <PageH1 size={38}>1 主播 / 1K 觀眾</PageH1>
        <div style={{ fontSize: 16, lineHeight: 1.7 }}>
          <strong>簡化</strong>：<br/>
          · 單機 Go + Redis Pub/Sub<br/>
          · 連線狀態存記憶體<br/>
          · 歷史寫 Postgres<br/><br/>
          <strong style={{ color: warn }}>進化訊號</strong>：<br/>
          連線 &gt; 50K → 分片
        </div>
        <div style={{ marginTop: 14 }}><Mantra>連線層與業務層分離</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 2 · 直播 IM' section='Stage 1 · MVP' />
      <PageNum n={5} total={12} />
      <BrandBar />
    </div>
  </>
);

const P06: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage2} alt='Stage 2 100K connections' style={{ maxWidth: '100%', maxHeight: '88%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C2.4 · STAGE 2 · 100K 連線</Kicker>
        <PageH1 size={38}>連線分片 + 持久化</PageH1>
        <div style={{ fontSize: 16, lineHeight: 1.65 }}>
          <strong>新增</strong>：<br/>
          · LB Consistent Hash by room<br/>
          · Redis Stream 分片<br/>
          · Kafka 持久化 → Cassandra<br/>
          · 10 個 Gateway × 10K conn
        </div>
        <div style={{ marginTop: 14 }}><Mantra>同房同 Gateway，本地處理 fanout</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 2 · 直播 IM' section='Stage 2 · 100K 連線' />
      <PageNum n={6} total={12} />
      <BrandBar />
    </div>
  </>
);

const P07: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage3} alt='Stage 3 Global 1M' style={{ maxWidth: '100%', maxHeight: '92%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C2.5 · STAGE 3 · 1M / 多 region</Kicker>
        <PageH1 size={36}>跨 region 全球佈署</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          <strong>關鍵</strong>：<br/>
          · 用戶就近連<br/>
          · Region 間 Kafka 同步<br/>
          · 100 gateway × 10K conn = 1M<br/><br/>
          <strong>禮物精準</strong>：<br/>
          原子扣餘額 + 對帳 job
        </div>
        <div style={{ marginTop: 14 }}><Mantra>涉及錢 → 強一致 + 對帳</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 2 · 直播 IM' section='Stage 3 · 1M 跨 region' />
      <PageNum n={7} total={12} />
      <BrandBar />
    </div>
  </>
);

const P08: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C2.6 · TRADE-OFFS</Kicker>
    <PageH1>關鍵 Trade-off 表</PageH1>
    <Table cols='160px 180px 200px 1fr' head={['決策', '我們選', '放棄什麼', '為何']} rows={[
      ['推送協定', 'WebSocket', 'HTTP polling 簡單', '1M 連線 polling 不可行'],
      ['訊息丟棄', '高峰隨機丟聊天', '100% 到達', '用戶感知差別 = 0'],
      ['連線分片', 'by room hash', '完全均衡', '同房需同機'],
      ['禮物推送', '強一致 + 對帳', '即時 fanout', '涉及錢'],
      ['跨 region 房間', '接受 200ms 延遲', '全球無感', '跨洋光速限制'],
      ['持久化', 'Cassandra', 'PostgreSQL', '寫吞吐 + 時序分區'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
      <strong>金句</strong>：即時系統的精髓 = 「哪些可丟、哪些絕不能丟」要先想清楚。
    </div>
    <Footer source='_source/braindump.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={8} total={13} />
      <BrandBar />
    </div></>
);

const P09: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>C2.7 · AI Prompt Flow</Kicker>
    <PageH1>用 Claude Code 加速設計</PageH1>
    <PromptBlock>{`Step 1 · 連線層容量規劃:
Go WebSocket gateway，預計每台 10K 連線。
單連線：心跳 100B/s，平均 10 msg/min。
請算每台 RAM、CPU、頻寬；10K → 100K 需多少台；
連線重連時的 thundering herd 怎麼避免

Step 2 · Fanout 模式比較:
比較 3 種 fanout：A) 廣播 B) Consistent hash C) Kafka topic per room
給：吞吐 / 延遲 / 故障 isolation / 實作複雜度 評分

Step 3 · Reconnection 設計:
帶 last_msg_id 避免漏訊 · 漸進退避避免 thunder
session token 不重新登入 · server 端 connection state recover`}</PromptBlock>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={9} total={13} />
      <BrandBar />
    </div></>
);

const P10: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C2.8 · PITFALLS</Kicker>
    <PageH1>8 大坑 + 監控 + 降級</PageH1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 17, lineHeight: 1.5 }}>
      {[
        '1. WebSocket 沒設 idle timeout → RAM 爆',
        '2. 重連風暴（同時斷同時連）',
        '3. 跨 region 訊息順序錯亂',
        '4. Redis Pub/Sub 訂閱者斷線掉訊',
        '5. fanout 沒 batch → syscall 噴爆 CPU',
        '6. 沒 backpressure → producer 灌死 consumer',
        '7. 連線狀態存單機 → gateway 重啟全斷',
        '8. 禮物推送沒 idempotency → 特效播兩次',
      ].map((t) => <div key={t} style={{ padding: '10px 14px', background: 'rgba(232,99,79,0.08)', borderLeft: `3px solid ${warn}`, borderRadius: 4 }}>{t}</div>)}
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 18, lineHeight: 1.7, animationDelay: '0.7s' }}>
      <strong style={{ color: warn }}>核心 alert</strong>：連線 / 機 &gt; 80% · Producer → Consumer lag &gt; 500ms · Gateway CPU &gt; 70%<br/>
      <strong style={{ color: ok }}>降級</strong>：高峰自動關「禮物特效推送」（保留聊天），減 80% fanout
    </div>
    <Footer source='software_architect/ppt/_source/05_ilities.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={10} total={13} />
      <BrandBar />
    </div></>
);

const P11: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative', background: accent, color: '#F5F1E8' }}>
    <div className='osd-anim-fade-up' style={{ fontSize: 24, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(245,241,232,0.85)' }}>CASE 2 · 一頁速查</div>
    <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 800, margin: '14px 0 28px', animationDelay: '0.1s' }}>印出貼牆</h1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 18, lineHeight: 1.7 }}>
      <div style={{ padding: '20px 24px', background: 'rgba(245,241,232,0.12)', borderRadius: 8 }}>
        <strong>場景</strong>：直播 IM，1M 連線、5M msg/s fanout<br/><br/>
        <strong>核心 5 步</strong>：<br/>
        1. 連線層分片（by room hash）<br/>
        2. Redis Stream 即時 fanout<br/>
        3. Kafka 持久化 + 跨 region 同步<br/>
        4. 禮物獨立服務（強一致 + 對帳）<br/>
        5. 高峰丟訊 + 特效降級
      </div>
      <div style={{ padding: '20px 24px', background: 'rgba(245,241,232,0.12)', borderRadius: 8 }}>
        <strong>工具棧</strong>：<br/>
        Cloudflare + Go WS Gateway + Redis Stream + Kafka + Cassandra<br/><br/>
        <strong>紅線</strong>：<br/>
        · 連線數 &gt; 80% capacity → 擴<br/>
        · Lag &gt; 500ms → 死<br/>
        · 禮物精準度 &lt; 100% → 永遠不能
      </div>
    </div>
  
      <Breadcrumb part='Part 2' chapter='Case 2 · 即時直播' />
      <PageNum n={11} total={13} />
      <BrandBar />
    </div></>
);

const P12: Page = () => (
  <ThreeTakeaways chapter='Case 2 · 即時直播 IM' lines={[
    'fanout 不是「全送」，是「夠快地送大多數」',
    '想清楚「哪些可丟、哪些絕不能丟」',
    '涉及錢 → 強一致 + 對帳',
  ]} />
);

export const meta: SlideMeta = { title: 'Case 2 · 即時直播 / IM' };
export default [P01, P02, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12] satisfies Page[];
