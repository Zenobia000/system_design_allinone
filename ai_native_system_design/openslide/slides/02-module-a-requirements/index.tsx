import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/02_module_a_hero.png';
import img_7step from './assets/A_7step_process.png';
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
@keyframes osd-slide-in-right { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes osd-scale-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
.osd-anim-fade-up { animation: osd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-fade-in { animation: osd-fade-in 0.6s ease-out both; }
.osd-anim-slide-right { animation: osd-slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
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
    <div style={{ fontSize: 19, fontWeight: 700, color: accent }}>
      {name} <span style={{ fontSize: 13, color: muted, fontWeight: 500 }}>· {en}</span>
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.5, marginTop: 4 }}>{def}</div>
  </div>
);

// Pages
const P01: Page = () => <ChapterDivider eyebrow='MODULE · A' title='需求量化與架構決策' subtitle='把模糊的「希望好用」翻成可以給 AI 的指令' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>A · 你會帶走什麼</Kicker>
      <PageH1>讀完 Module A，你能：</PageH1>
      <ul className='osd-stagger' style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 28 }}>
        <li>把「快、穩、省」翻成可量測的 SLI / SLO</li>
        <li>30 分鐘填完一份 ADR（含被否決方案）</li>
        <li>7 步流程從問題 → 上線一頁不漏</li>
        <li>30 秒判斷一個應用屬於哪一類（CRUD / 即時 / AI / 批次）</li>
        <li>用 Claude Code 跑「需求訪談模擬器」</li>
        <li>一頁算出系統的容量上限（QPS / 儲存 / 頻寬）</li>
      </ul>
      <div className='osd-anim-fade-up' style={{ marginTop: 30, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
        <strong>金句</strong>：先設計 ADR，再讓 AI 寫 code。順序錯了就是返工。
      </div>
      <Footer source='_source/braindump.md · §需求量化的核心框架' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={1} total={17} />
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
      <PageH1 size={42}>不熟先看這頁，後面就順了</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='NFR' en='Non-Functional Requirements' def='非功能需求 — 「做得多好」的量化標準。' />
        <TermCard name='SLA' en='Service Level Agreement' def='對外承諾合約（違反要賠錢）。' />
        <TermCard name='SLO' en='Service Level Objective' def='對內目標（給工程團隊看）。' />
        <TermCard name='SLI' en='Service Level Indicator' def='實際量到的值（監控數字）。' />
        <TermCard name='ADR' en='Architecture Decision Record' def='把架構決策寫成文件存起來。' />
        <TermCard name='QPS' en='Queries Per Second' def='每秒幾個請求 — 容量規劃單位。' />
        <TermCard name='P99' en='99th Percentile Latency' def='把所有請求排序，最慢那 1% 的分界線。' />
        <TermCard name='Error Budget' en='錯誤預算' def='100% - SLO = 允許壞掉的時間。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表（1/3 需求與決策）</div>
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={2} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.1 NFR Translation
const P03: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.1 · FRAMEWORK · NFR 翻譯表</Kicker>
      <PageH1>從「希望好用」到「P99 &lt; 200ms」</PageH1>
      <Table cols='130px 1fr 1fr 1fr' head={['業務詞', '量化指標', '範例目標', '量測工具']} rows={[
        ['「快」', 'P50/P95/P99 latency', 'P99 < 200ms', 'OpenTelemetry'],
        ['「穩」', 'availability % / error rate', '99.95% / < 0.5%', 'uptime monitor + SLO'],
        ['「省」', 'unit cost / TCO', '< $0.001 per request', 'billing dashboard'],
        ['「彈性」', 'scale-out factor', '10x in 5min', 'load test'],
        ['「即時」', 'end-to-end lag', 'lag < 1s', 'Kafka lag metrics'],
        ['「同時很多人」', 'concurrent / QPS', '50K concurrent', 'load test'],
        ['「資料不能掉」', 'RPO / RTO', 'RPO=5min, RTO=15min', 'DR drill'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
        <strong>翻譯口訣</strong>：模糊詞 → 量化 → 量測 → 目標。四步缺一不可。
      </div>
      <Footer source='_source/braindump.md · §需求量化的核心框架' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={3} total={17} />
      <BrandBar />
    </div>
  </>
);

const P04: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>A.1 · AI 協作</Kicker>
      <PageH1>把模糊詞自動展開</PageH1>
      <PromptBlock>{`Prompt:
我有以下業務需求（模糊版）：
「使用者上傳影片後，要快速看到結果，且不能掉。」

請：
1. 列出至少 5 個「快速」可能的真實含義（含對應 SLI）
2. 列出「不能掉」對應的 RPO / RTO 範例
3. 給我 3 組可能的目標（保守 / 標準 / 激進），各自的工程代價估算
4. 列出我該回頭問 PM 的 5 個澄清問題`}</PromptBlock>
      <div className='osd-anim-fade-up' style={{ marginTop: 24, fontSize: 20, lineHeight: 1.6, animationDelay: '0.4s' }}>
        <strong>為何不直接給 AI 數字</strong>：你給「P99 &lt; 100ms」是承諾，你給「快速」會被解讀成不同數字 → 後面返工。
      </div>
      <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={4} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.2 - 7 Step Process
const P05: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_7step} alt='7-step architecture process' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>A.2 · 7 步流程</Kicker>
        <PageH1 size={38}>從問題到 ADR</PageH1>
        <div style={{ fontSize: 16, lineHeight: 1.65 }}>
          <strong>7 步順序</strong>：<br/>
          1. 問題理解 → 2. NFR 量化<br/>
          3. 約束盤點 → 4. 應用類型<br/>
          5. 方案發散 → 6. Trade-off<br/>
          7. ADR 落定
        </div>
        <div style={{ marginTop: 14 }}><Mantra>80% 的人從第 5 步開始想 → 100% 返工</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' section='A.2 · 7 步流程' />
      <PageNum n={5} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.3 ADR Template
const P06: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.3 · TEMPLATE · 直接複製用</Kicker>
      <PageH1>ADR 標準模板（一頁版）</PageH1>
      <PromptBlock>{`# ADR-NNN：[短標題]
Status: Proposed | Accepted | Deprecated | Superseded by ADR-XXX
Date: 2026-MM-DD
Deciders: [姓名]

## Context
- 業務問題 (1-2 行)
- NFR (3-5 條量化指標)
- 約束 (預算、團隊、既有架構)

## Decision
- 我們選擇 X，因為 Y。

## Considered Alternatives
| 方案 | 優 | 缺 | 為何不選 |

## Consequences
- 好：... | 壞：... | 中性：...
- 後續可逆嗎？逆轉成本？

## Open Questions
- 待驗證假設 / 待量測項`}</PromptBlock>
      <Footer source='software_architect/ppt/_source/03_Process_App_Types.md · §ADR' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={6} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.4 App Type Tree
const P07: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.4 · 30 秒判斷</Kicker>
      <PageH1>應用類型決策樹</PageH1>
      <Table cols='130px 1fr 1fr' head={['類型', '代表模式', '範例']} rows={[
        ['OLTP', 'RDBMS + cache + 讀寫分離', '訂單、帳號'],
        ['OLAP', '列存資料倉 + ETL', 'BI、報表'],
        ['Streaming', 'Kafka + Flink', '風控、IoT'],
        ['即時互動', 'WebSocket + pub/sub', '聊天、直播'],
        ['AI 應用', 'Vector DB + LLM + cache', 'RAG、推薦'],
      ]} fontSize={20} />
      <div className='osd-anim-fade-up' style={{ marginTop: 26, fontSize: 22, color: muted, animationDelay: '0.5s' }}>
        判斷流程：讀寫比 → 強/弱一致 → 事務需求 → AI/向量？
      </div>
      <Footer source='software_architect/ppt/_source/03_Process_App_Types.md · §App Types' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={7} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.5 SLA / SLO / SLI
const P08: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.5 · CONTRACT · 對外對內</Kicker>
      <PageH1>SLA / SLO / SLI 三層</PageH1>
      <Table cols='100px 1fr 1fr 1fr' head={['層級', '是什麼', '給誰看', '違反後果']} rows={[
        ['SLA', '對外承諾合約', '客戶', '賠錢 / 退費'],
        ['SLO', '對內目標', '工程團隊', '觸發改善'],
        ['SLI', '實際量測值', '監控系統', '自動告警'],
      ]} fontSize={20} />
      <div className='osd-anim-fade-up' style={{ marginTop: 28, padding: '18px 24px', background: '#2A2520', color: '#F5F1E8', borderRadius: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 19, lineHeight: 1.8, animationDelay: '0.5s' }}>
        SLA: 99.9%  ← 對外（用戶簽合約看的）<br/>
        SLO: 99.95% ← 對內（給自己留 buffer）<br/>
        SLI: 量到 99.97% ← 真實值
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 20, lineHeight: 1.6, animationDelay: '0.7s' }}>
        <strong>Error budget</strong>：100% - SLO = 允許「壞掉」的時間，是工程決策貨幣。
      </div>
      <Footer source='software_architect/ppt/_source/02_Requirements_SLA.md' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={8} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.6 Capacity
const P09: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.6 · BACK-OF-NAPKIN</Kicker>
      <PageH1>容量規劃一頁算式</PageH1>
      <PromptBlock>{`用戶 → QPS
  DAU × per-user-actions-per-day / 86400 = avg QPS
  peak QPS = avg × peak-ratio (常用 3-10×)

儲存
  DAU × records-per-day × bytes-per-record × retention-days
  × (1 + index-overhead 30%) × (1 + replication-factor)

頻寬
  QPS × avg-payload-bytes × 8 (bits) = bps
  + 30% TLS/overhead，+ peak-ratio`}</PromptBlock>
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 20, lineHeight: 1.6, animationDelay: '0.4s' }}>
        <strong>範例</strong>：10M DAU × 100 actions × 1KB = <strong>1 TB/day</strong>，平均 ~11 QPS write，peak ~50 QPS。
        若每 record 30 天保留 + 3x replication = ~120 TB warm storage。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md · §Capacity' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={9} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.7 Case
const P10: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.7 · CASE</Kicker>
      <PageH1>「做個直播間禮物特效」走 7 步</PageH1>
      <Table cols='30px 1fr' head={['步', '產出']} rows={[
        ['1', '問題：主播收禮時要有特效；觀眾 1-10K，禮物 0.1-1000 USD'],
        ['2', 'NFR：觸發延遲 < 500ms P99；可見性 ≥ 99% 觀眾在 1s 內看到'],
        ['3', '約束：已用 WebSocket，team 3 人，無 GPU 預算'],
        ['4', '類型：即時互動 + fanout-write，無強事務需求'],
        ['5', '方案：A. WebSocket 廣播 / B. Pub/Sub + edge / C. 客戶端本地特效'],
        ['6', 'Trade-off：A 簡單但 fanout 重；B 貴；C 信任問題'],
        ['7', 'ADR：選 A，10K 用戶內可撐；超過 1M 再換 B'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 21, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
        <strong>關鍵洞察</strong>：第 5 步本來想做 B（業界主流），第 6 步才發現團隊撐不起。
      </div>
      <Footer source='_source/braindump.md · §需求量化的核心框架' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={10} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.8 AI Interview Sim
const P11: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>A.8 · 反向練習</Kicker>
      <PageH1>讓 AI 扮 PM，你練拆需求</PageH1>
      <PromptBlock>{`Setup prompt:
你扮演一位有 5 年經驗的 PM。
我（架構師）即將跟你訪談一個新功能。
你的 brief 是：「我們要做一個 AI 客服系統，要能回 90% 的常見問題。」

你的行為：
- 模糊回答（像真實 PM）
- 我問才給細節，不主動全給
- 對於我的技術選型，反問商業價值
- 對於我給的成本，反問為何不能更便宜

我會練習 30 分鐘，最後請給我評語：
- 我哪些問題問得好
- 我漏問哪 5 個關鍵問題
- 我的 NFR 翻譯有哪些可被攻擊`}</PromptBlock>
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.5s' }}>
        <strong>為何有用</strong>：在 AI 時代，「會問」比「會答」更稀缺。
      </div>
      <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={11} total={17} />
      <BrandBar />
    </div>
  </>
);

// A.9-A.12 brief pages
const P12: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.9 · CHECKLIST · 容易跳的步</Kicker>
      <PageH1>約束盤點清單</PageH1>
      <Table cols='110px 1fr 1fr' head={['類別', '該問的問題', '例子']} rows={[
        ['預算', '月支出上限？是否含 SaaS？', '< $5K/月，含 Stripe'],
        ['團隊', '人數？專長？輪班嗎？', '3 人，會 Python 不會 Go'],
        ['時程', '上線死線？是否可分階段？', '90 天 MVP，180 天 V1'],
        ['既有', '必須相容什麼？', '既有 PostgreSQL，不可遷'],
        ['法規', 'GDPR / HIPAA / PCI？', 'GDPR 必過'],
        ['政治', '哪個 vendor 不能用？', '不能用 AWS'],
        ['時區', '是否 24/7 跨時區？', '只有亞洲團隊'],
      ]} fontSize={17} />
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>
        <strong>AI 弱區</strong>：AI 不知公司政治、vendor 禁令。你必須自己列。
      </div>
      <Footer source='_source/braindump.md · §AI 工作流的 7 個常見地雷' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={12} total={17} />
      <BrandBar />
    </div>
  </>
);

const P13: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.10 · FORMAT · 寫進每份 ADR</Kicker>
      <PageH1>Trade-off 矩陣標準格式</PageH1>
      <Table cols='200px 80px 100px 100px 100px' head={['維度', '權重', '方案 A', '方案 B', '方案 C']} rows={[
        ['開發成本（人月）', '30%', '3', '5', '8'],
        ['運行成本（$/月）', '20%', '$2K', '$1K', '$3K'],
        ['延遲 P99', '15%', '200ms', '80ms', '50ms'],
        ['可擴展性', '15%', '需重做', 'OK', 'OK'],
        ['團隊熟悉度', '10%', '高', '中', '低'],
        ['維運複雜度', '10%', '低', '中', '高'],
        ['加權總分', '100%', '7.2', '8.1', '6.8'],
      ]} fontSize={18} />
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>
        規則：權重先固定 · 維度量化 · 必要時人工 override 但要寫「為何不選最高分」。
      </div>
      <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={13} total={17} />
      <BrandBar />
    </div>
  </>
);

const P14: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
      <Kicker>A.11 · DEBATE</Kicker>
      <PageH1>讓 AI 當「反對者」</PageH1>
      <PromptBlock>{`Prompt:
我打算選方案 B（Kafka + 微服務）。
請你扮演「反對者」，攻擊這個方案。

要求：
1. 找出 5 個「3 年後我會後悔」的點
2. 找出 3 個「team 撐不起」的證據
3. 列出 2 個「更簡單但被我忽略」的替代方案
4. 提出 5 個「我沒回答」的問題
5. 引用業界 horror stories（X 公司、Y 專案）

不要客氣，攻擊到讓我心虛。`}</PromptBlock>
      <div className='osd-anim-fade-up' style={{ marginTop: 24, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.5s' }}>
        <strong>為何有用</strong>：架構決策最大的敵人是 confirmation bias—讓 AI 強制反對，補上你看不到的。
      </div>
      <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={14} total={17} />
      <BrandBar />
    </div>
  </>
);

const P15: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <Kicker>A.12 · REVIEW · 提案前自查</Kicker>
      <PageH1>ADR Review 12 點檢查</PageH1>
      <ul className='osd-stagger' style={{ fontSize: 20, lineHeight: 1.85, paddingLeft: 0, listStyle: 'none', columnCount: 2, columnGap: 40 }}>
        {['問題重述清楚（不是 spec）', 'NFR 都是可量測的，不是形容詞', '至少 3 個候選方案', '每個方案有「為何不選」的明確理由',
          'Trade-off 表是量化的（數字 / $）', '列出至少 5 個明確的 trade-off 維度', 'Consequences 含「3 年後反悔的逆轉成本」',
          '有 Open Questions（不是「全都想清楚了」）', '列出至少 3 個假設與待驗證', '有預估的 PoC 範圍',
          '列了哪個 stakeholder 簽核', '寫了「下一次 review 條件」'].map((t) => (
          <li key={t} style={{ marginBottom: 6 }}>☐ {t}</li>
        ))}
      </ul>
      <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
        12 項全勾才送 review。沒勾的 → 補完或標註「為何此 ADR 不需要」。
      </div>
      <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
    
      <Breadcrumb part='Part 1' chapter='Module A · 需求量化' />
      <PageNum n={15} total={17} />
      <BrandBar />
    </div>
  </>
);

const P16: Page = () => (
  <ThreeTakeaways chapter='Module A · 需求量化' lines={[
    '模糊詞 → 量化指標 → SLI → SLO',
    '跳 1-4 步直接畫架構 = 100% 返工',
    '沒有 trade-off 表的 ADR 是垃圾',
  ]} />
);

export const meta: SlideMeta = { title: 'Module A · 需求量化與架構決策' };
export default [P01, P02, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16] satisfies Page[];
