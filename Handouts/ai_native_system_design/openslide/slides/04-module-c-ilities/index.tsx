import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/04_module_c_hero.png';
import img_ilities from './assets/C_ilities_radial_v2.png';
import img_pillars from './assets/C_five_pillars_v2.png';
import img_qps from './assets/C_qps_evolution_v2.png';
import img_cache from './assets/C_cache_patterns_v2.png';
import img_reliability from './assets/C_reliability_chain_v2.png';
import img_mlt from './assets/C_observability_mlt_v2.png';
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

const Kicker = ({ children }: { children: React.ReactNode }) => <div className='osd-anim-fade-up' style={{ fontSize: 24, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>;
const Footer = ({ source }: { source: string }) => <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>;
const PageH1 = ({ children, size = 50 }: { children: React.ReactNode; size?: number }) => <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px', animationDelay: '0.1s' }}>{children}</h1>;

const ChapterDivider = ({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) => (
  <><AnimStyle />
    <div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
      <div style={{ padding: '0 100px' }}>
        <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
        <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 110, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
        {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 36, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
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

const P01: Page = () => <ChapterDivider eyebrow='MODULE · C' title='品質屬性 與 分散式五支柱' subtitle='為何擴不動、為何掛了、為何救不回' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>C · 你會帶走什麼</Kicker>
      <PageH1>讀完 Module C，你能：</PageH1>
      <ul className='osd-stagger' style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 28 }}>
        <li>列出 10 大 *-ilities 並指出兩兩衝突</li>
        <li>解釋分散式 5 支柱（鬆耦合 / 無狀態 / cache / 通訊 / 監控）</li>
        <li>設計斷路器、重試、超時、隔離艙</li>
        <li>設定 SLO 並算出 error budget</li>
        <li>規劃 metrics / logs / traces 三本柱</li>
        <li>從 1K 演進到 100K QPS 不返工</li>
      </ul>
      <div className='osd-anim-fade-up' style={{ marginTop: 30, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
        <strong>金句</strong>：複雜性是萬惡之源—引入任何一個模式前，問「我為什麼需要它」。
      </div>
      <Footer source='software_architect/ppt/_source/05_ilities.md' />
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
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
      <PageH1 size={42}>系統不掛 / 不爆 的話術</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='*-ilities' en='品質屬性' def='以 -ility 結尾的非功能特性：Scalability, Reliability, Security…' />
        <TermCard name='SPOF' en='Single Point of Failure' def='單點故障 — 系統裡「壞了就全死」的元件。' />
        <TermCard name='Circuit Breaker' en='斷路器' def='下游死了不要繼續打它（避免雪崩）。' />
        <TermCard name='Bulkhead' en='隔離艙' def='把資源（thread pool）分隔，一個壞不拖死全部。' />
        <TermCard name='Idempotency' en='冪等性' def='同操作做 1 次和 10 次結果一樣（重試安全）。' />
        <TermCard name='Observability (MLT)' en='可觀測性' def='Metrics 看現況、Logs 看細節、Traces 看跨服務耗時。' />
        <TermCard name='Error Budget' en='錯誤預算' def='100% - SLO，用完就凍結新功能修穩定性。' />
        <TermCard name='OWASP Top 10' en='安全清單' def='業界公認最常見的 10 種安全漏洞。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表（3/3 可靠性與模式）</div>
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
      <PageNum n={2} total={16} />
      <BrandBar />
    </div>
  </>
);

// C.1 *-ilities — 圖左文右 + Mantra
const P03: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '48% 52%', alignItems: 'center', position: 'relative', padding: '40px 60px 80px' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <img src={img_ilities} alt='' style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 30 }}>
        <Kicker>C.1 · QUALITY</Kicker>
        <PageH1>10 大 *-ilities 全景</PageH1>
        <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 17, marginTop: 18 }}>
          {[['Scalability', '能擴'], ['Availability', '不掛'], ['Reliability', '壞少'], ['Performance', '夠快'],
            ['Security', '不破'], ['Maintainability', '好改'], ['Observability', '看得見'], ['Portability', '可搬'],
            ['Testability', '可測'], ['Cost-efficiency', '夠便宜']].map(([en, zh]) => (
            <div key={en} style={{ padding: '8px 12px', background: 'rgba(217,119,87,0.06)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}>
              <strong style={{ color: accent }}>{en}</strong> · <span style={{ color: muted }}>{zh}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22 }}><Mantra>選 2-3 個最重要的，其他犧牲。全要 = 全失</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' section='C.1 *-ilities' />
      <PageNum n={3} total={17} />
      <BrandBar />
    </div>
  </>
);

// C.2 Five pillars — 全頁海報 + 圖 + 五字口訣
const P04: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, position: 'relative', padding: '40px 60px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Kicker>C.2 · FOUNDATION · 五支柱</Kicker>
      <div className='osd-anim-scale-in' style={{ width: '78%', maxHeight: '52%', marginTop: 8, display: 'flex', justifyContent: 'center' }}>
        <img src={img_pillars} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 800, color: accent, letterSpacing: '0.12em', margin: '18px 0 12px', animationDelay: '0.2s' }}>
        鬆 · 無 · 快 · 非 · 觀
      </h1>
      <div className='osd-stagger' style={{ display: 'flex', gap: 18, fontSize: 15, color: muted }}>
        <span><strong>鬆</strong>耦合</span>
        <span><strong>無</strong>狀態</span>
        <span><strong>快</strong>取</span>
        <span><strong>非</strong>同步</span>
        <span><strong>觀</strong>測</span>
      </div>
      <div style={{ marginTop: 18 }}><Mantra>分散式系統不是「把單機放網路上」—是另一套設計哲學</Mantra></div>
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' section='C.2 五支柱' />
      <PageNum n={4} total={17} />
      <BrandBar />
    </div>
  </>
);

// C.3 Scalability — 上圖下文 + 演進心法
const P05: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 60px 80px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Kicker>C.3 · SCALE · 演進有順序</Kicker>
      <PageH1 size={42}>1K → 100K QPS 三階段</PageH1>
      <div className='osd-anim-scale-in' style={{ width: '100%', maxHeight: '52%', marginTop: 4, display: 'flex', justifyContent: 'center' }}>
        <img src={img_qps} alt='' style={{ maxWidth: '95%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 14, padding: '12px 18px', background: '#2A2520', color: '#F5F1E8', borderRadius: 6, fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, animationDelay: '0.5s' }}>
        演進順序：垂直 → 加 replica → 加 cache → 加 CDN → 表分區 → 分片 → 微服務
      </div>
      <div style={{ marginTop: 12 }}><Mantra>跳過順序 = 用炸彈炸蚊子，垂直擴展能擋多久就多久</Mantra></div>
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' section='C.3 擴展模式' />
      <PageNum n={5} total={17} />
      <BrandBar />
    </div>
  </>
);

// C.4 Cache topology — 圖右文左
const P06: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '45% 55%', alignItems: 'center', position: 'relative', padding: '40px 60px 80px' }}>
      <div style={{ paddingRight: 24 }}>
        <Kicker>C.4 · CACHE PATTERNS</Kicker>
        <PageH1 size={42}>4 種快取模式</PageH1>
        <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 17 }}>
          <div style={{ padding: '10px 14px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong>Cache-aside</strong> · miss 才補 · 預設選擇</div>
          <div style={{ padding: '10px 14px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong>Read-through</strong> · cache 自動 load · 簡化讀</div>
          <div style={{ padding: '10px 14px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong>Write-through</strong> · 同步寫雙邊 · 強一致</div>
          <div style={{ padding: '10px 14px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong>Write-behind</strong> · 非同步寫 DB · 高吞吐</div>
        </div>
        <div style={{ marginTop: 18 }}><Mantra>「雪崩 / 穿透 / 擊穿」三兄弟，設計時要明確處理哪個</Mantra></div>
      </div>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <img src={img_cache} alt='' style={{ maxWidth: '100%', maxHeight: '88%', objectFit: 'contain' }} />
      </div>
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' section='C.4 Cache 拓樸' />
      <PageNum n={6} total={17} />
      <BrandBar />
    </div>
  </>
);

// C.5 Reliability — 上圖下表
const P07: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 60px 80px', position: 'relative' }}>
      <Kicker>C.5 · RESILIENCE · 防雪崩鏈</Kicker>
      <PageH1 size={42}>可靠性模式 5 件套</PageH1>
      <div className='osd-anim-scale-in' style={{ width: '100%', maxHeight: '45%', display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <img src={img_reliability} alt='' style={{ maxWidth: '92%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, fontSize: 14, marginTop: 14 }}>
        <div style={{ padding: '10px 12px', background: 'rgba(217,119,87,0.08)', borderTop: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Timeout</strong><br/>3s / 500ms</div>
        <div style={{ padding: '10px 12px', background: 'rgba(217,119,87,0.08)', borderTop: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Retry</strong><br/>3 次 + jitter</div>
        <div style={{ padding: '10px 12px', background: 'rgba(217,119,87,0.08)', borderTop: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Circuit Breaker</strong><br/>50% err → open</div>
        <div style={{ padding: '10px 12px', background: 'rgba(217,119,87,0.08)', borderTop: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Bulkhead</strong><br/>thread pool 分隔</div>
        <div style={{ padding: '10px 12px', background: 'rgba(217,119,87,0.08)', borderTop: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Rate Limit</strong><br/>token bucket</div>
      </div>
      <div style={{ marginTop: 14 }}><Mantra>可靠性不是「不會壞」，是「壞了不雪崩」</Mantra></div>
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' section='C.5 可靠性 5 件套' />
      <PageNum n={7} total={17} />
      <BrandBar />
    </div>
  </>
);

// C.6 Observability MLT — 圖左文右
const P08: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '52% 48%', alignItems: 'center', position: 'relative', padding: '40px 60px 80px' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <img src={img_mlt} alt='' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C.6 · OBSERVABILITY · MLT</Kicker>
        <PageH1 size={42}>可觀測性三本柱</PageH1>
        <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16, marginTop: 12 }}>
          <div style={{ padding: '10px 14px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Metrics</strong> · 聚合即時 · Prometheus</div>
          <div style={{ padding: '10px 14px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Logs</strong> · 明細追溯 · Loki / ELK</div>
          <div style={{ padding: '10px 14px', background: 'rgba(217,119,87,0.08)', borderLeft: `3px solid ${accent}`, borderRadius: 4 }}><strong style={{ color: accent }}>Traces</strong> · 跨服務瀑布 · Jaeger</div>
        </div>
        <div className='osd-anim-fade-up' style={{ marginTop: 16, padding: '12px 16px', background: '#2A2520', color: '#F5F1E8', borderRadius: 6, fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, lineHeight: 1.6, animationDelay: '0.5s' }}>
          SLO → SLI → Alert<br/>
          P99 200ms → 5min 量測 → page
        </div>
        <div style={{ marginTop: 14 }}><Mantra>你不能改善看不見的東西—觀測是設計的一部分</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' section='C.6 可觀測性' />
      <PageNum n={8} total={17} />
      <BrandBar />
    </div>
  </>
);

// C.7 Evolution case
const P09: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>C.7 · CASE · 不要一次到位</Kicker>
      <PageH1>1K → 100K QPS 演進三階段</PageH1>
      <Table cols='200px 1fr' head={['Stage', '架構變化']} rows={[
        ['Stage 1 · 1K QPS (MVP)', 'Client → ALB → 2× App → PG (single) + Redis cache'],
        ['Stage 2 · 10K QPS', '+ Read Replica × 2 + Redis Cluster + Cloud CDN + 6 App'],
        ['Stage 3 · 100K QPS', '+ PG 分片 (4 shards) + Kafka 削峰 + 20-50 App + 多 region'],
      ]} fontSize={19} />
      <div style={{ height: 18 }} />
      <Table cols='200px 1fr 1fr' head={['訊號', '該升的階段', '不該升的反例']} rows={[
        ['DB CPU > 70% 持續', '1 → 2 (加 replica)', '還沒 cache 就分片'],
        ['Read replica 撐不住', '2 → 2.5 (cache layer)', '上來就 Cassandra'],
        ['單表 > 100M rows', '2 → 3 (分區/分片)', '還沒到就提前分片'],
        ['寫 QPS > 10K 持續', '2 → 3 (Kafka 削峰)', '為了「未來」先上 Kafka'],
      ]} fontSize={16} />
      <Footer source='software_architect/ppt/_source/07_System_Architecture.md' />
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
      <PageNum n={9} total={16} />
      <BrandBar />
    </div>
  </>
);

// C.8 AI architecture review
const P10: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>C.8 · REVIEW · 把圖丟給 AI</Kicker>
      <PageH1>用 AI 做架構審查</PageH1>
      <PromptBlock>{`Prompt:
以下是我的架構圖：[貼圖或描述]
目標 NFR：100K QPS, P99 < 200ms, 99.95% SLA, 3 region active

請審查並回報：
1. SPOF（單點故障）有哪些？
2. 容量瓶頸最先在哪？對應 QPS 估算？
3. 監控覆蓋哪些缺口？（缺 metric / 缺 trace / 缺 alert）
4. 安全攻擊面（OWASP top 10 對照）
5. 成本浪費點（如：cache 命中低、replica 過多）
6. 演進到 1M QPS 需要先改什麼？
7. 我沒在圖上但應該補的元件`}</PromptBlock>
      <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
      <PageNum n={10} total={16} />
      <BrandBar />
    </div>
  </>
);

// C.9 *-ilities conflicts
const P11: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>C.9 · TRADEOFF · 沒有萬能解</Kicker>
      <PageH1>*-ilities 兩兩衝突表</PageH1>
      <Table cols='240px 1fr 1fr' head={['衝突', '範例', '怎麼平衡']} rows={[
        ['Performance ↔ Consistency', '強一致變慢', 'Read-your-writes 中間值'],
        ['Availability ↔ Consistency', 'CAP', '看業務性質選'],
        ['Scalability ↔ Simplicity', '分散式變複雜', '量到了再做'],
        ['Security ↔ Usability', 'MFA 用戶煩', '高風險動作才 MFA'],
        ['Observability ↔ Cost', '全 trace 貴', '取樣 + 高 P99 強制保留'],
        ['Velocity ↔ Reliability', '快速發版漏 bug', 'feature flag + canary'],
        ['Portability ↔ Performance', '抽象掉雲端就慢', '80/20 法則'],
      ]} fontSize={17} />
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
        <strong>金句</strong>：架構就是「明知有 trade-off，還是選了一邊」的紀錄。
      </div>
      <Footer source='software_architect/ppt/_source/05_ilities.md' />
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
      <PageNum n={11} total={16} />
      <BrandBar />
    </div>
  </>
);

// C.10 SLO Design
const P12: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>C.10 · SLO · 三步走</Kicker>
      <PageH1>怎麼定 SLO 數字而不是亂拍腦袋</PageH1>
      <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 19 }}>
        <div style={{ padding: '16px 22px', background: 'rgba(217,119,87,0.10)', borderLeft: `5px solid ${accent}`, borderRadius: 6 }}>
          <strong style={{ color: accent }}>Step 1 · 找 User Journey</strong> · 列最關鍵 5 個（如「下單」「登入」「載入首頁」）每個對應 1-2 個 SLO
        </div>
        <div style={{ padding: '16px 22px', background: 'rgba(217,119,87,0.10)', borderLeft: `5px solid ${accent}`, borderRadius: 6 }}>
          <strong style={{ color: accent }}>Step 2 · 設 SLI</strong> · 每個 SLO 對應可量測 SLI · 不要選用戶端 latency（你管不了網路）
        </div>
        <div style={{ padding: '16px 22px', background: 'rgba(217,119,87,0.10)', borderLeft: `5px solid ${accent}`, borderRadius: 6 }}>
          <strong style={{ color: accent }}>Step 3 · 算 Error Budget</strong> · SLO 99.9% → budget = 43 分鐘/月 → 決定能否冒險 deploy
        </div>
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>
        <strong>金句</strong>：SLO 不是越高越好—越高成本越貴，工程團隊壓力越大。
      </div>
      <Footer source='software_architect/ppt/_source/02_Requirements_SLA.md · §SLO' />
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
      <PageNum n={12} total={16} />
      <BrandBar />
    </div>
  </>
);

// C.11 Distributed traps
const P13: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>C.11 · FALLACIES · 都別假設</Kicker>
      <PageH1>分散式 8 大謬誤</PageH1>
      <Table cols='30px 1fr 1fr' head={['#', '謬誤', '真相']} rows={[
        ['1', '網路可靠', '會丟、會 partition'],
        ['2', '延遲為零', '跨 region > 100ms'],
        ['3', '頻寬無限', '影片串流會打死'],
        ['4', '網路安全', '必須 zero-trust'],
        ['5', '拓樸不變', 'LB 重啟、scale 隨時'],
        ['6', '一個管理員', '跨團隊 / 跨公司'],
        ['7', '傳輸成本零', '跨 region 流量很貴'],
        ['8', '網路均質', '不同 region 性能差很多'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
        <strong>金句</strong>：分散式系統 90% 的 bug 是「以為網路會跟單機一樣可靠」。
      </div>
      <Footer source='software_architect/ppt/_source/07_System_Architecture.md · §Fallacies' />
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
      <PageNum n={13} total={16} />
      <BrandBar />
    </div>
  </>
);

// C.12 Security
const P14: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>C.12 · SECURITY · 不能事後補</Kicker>
      <PageH1>安全 5 道防線</PageH1>
      <Table cols='110px 1fr 1fr' head={['層', '措施', '工具']} rows={[
        ['1 · 傳輸', 'TLS 1.3 必開', "Let's Encrypt, ACM"],
        ['2 · 邊界', 'WAF + Rate Limit', 'Cloudflare, AWS WAF'],
        ['3 · 認證', 'OAuth 2.1 / OIDC', 'Auth0, Keycloak'],
        ['4 · 授權', 'RBAC / ABAC, scope', 'OPA, Cedar'],
        ['5 · 資料', 'at-rest 加密 + secrets', 'KMS, Vault'],
      ]} fontSize={19} />
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 18, color: muted, lineHeight: 1.7, animationDelay: '0.6s' }}>
        <strong>OWASP Top 10 (2026)</strong>：A01 Broken Access Control · A02 Crypto Failure · A03 Injection · A04 Insecure Design · A05 Misconfiguration · A06 Vulnerable Components · A07 Auth · A08 Software Integrity · A09 Logging · A10 SSRF
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 14, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
        <strong>金句</strong>：安全是預設值，不是 feature。
      </div>
      <Footer source='software_architect/ppt/_source/05_ilities.md · §Security' />
    
      <Breadcrumb part='Part 1' chapter='Module C · 品質屬性' />
      <PageNum n={14} total={16} />
      <BrandBar />
    </div>
  </>
);

const P15: Page = () => (
  <ThreeTakeaways chapter='Module C · 品質屬性' lines={[
    '鬆 · 無 · 快 · 非 · 觀（五支柱）',
    '可靠性 = 壞了不雪崩，不是不壞',
    '架構是被流量逼出來的，不是先設計的',
  ]} />
);

export const meta: SlideMeta = { title: 'Module C · 品質屬性與分散式五支柱' };
export default [P01, P02, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15] satisfies Page[];
