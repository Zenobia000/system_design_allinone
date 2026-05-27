import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/08_case_rag_hero.png';
import img_stage1 from './assets/08_stage1_rag_mvp.png';
import img_stage2 from './assets/08_stage2_rag_5k.png';
import img_stage3 from './assets/08_stage3_rag_100k.png';
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
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 120, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
      {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 38, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
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
const ArrowRight = ({ tone = muted }: { tone?: string }) => (
  <svg width='30' height='14' viewBox='0 0 30 14' style={{ margin: '0 6px' }}>
    <line x1='2' y1='7' x2='22' y2='7' stroke={tone} strokeWidth='2' />
    <polygon points='20,2 30,7 20,12' fill={tone} />
  </svg>
);
const ArchFlow = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>{children}</div>
);

const P01: Page = () => <ChapterDivider eyebrow='CASE · 3' title='RAG / AI 應用平台' subtitle='向量檢索 + LLM 整合 + 成本控管' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>業務背景</Kicker>
    <PageH1>企業內部知識庫問答系統</PageH1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 19, lineHeight: 1.5 }}>
      {[
        ['文件量', '50K 文件 / 500K chunks'],
        ['使用者', '100K 員工，併發 5K'],
        ['查詢量', '50K queries/day, peak 200 QPS'],
        ['延遲', 'first token < 1s、完整 < 5s'],
        ['準確度', '> 85% 員工滿意'],
        ['成本', '每查詢 < $0.01'],
        ['安全', '文件權限要 respect'],
      ].map(([l, r]) => (
        <div key={l} style={{ padding: '12px 18px', background: 'rgba(217,119,87,0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 6 }}>
          <strong style={{ color: accent }}>{l}</strong> · {r}
        </div>
      ))}
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.5s' }}>
      <strong>核心挑戰</strong>：低延遲檢索 + 成本控管 + 權限隔離 + 答案品質
    </div>
    <Footer source='software_develop_journey/ppt/12-case-study/03_ai_video.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
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
      <PageH1 size={42}>看 RAG 案例前的詞彙</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='RAG' en='Retrieval-Augmented Generation' def='問問題時先「查文件」再「給 LLM 寫答案」（避免胡謅）。' />
        <TermCard name='Embedding' en='向量化' def='把文字變成一串數字（向量），AI 才能算「誰跟誰相似」。' />
        <TermCard name='Chunk' en='文件切塊' def='把長文件切小段才能 embed（太長 LLM 吃不下）。' />
        <TermCard name='Vector DB' en='向量資料庫' def='存 embedding 並按「相似度」查（pgvector / Pinecone）。' />
        <TermCard name='Hybrid Search' en='混合搜尋' def='同時用「關鍵字」+「向量」（提升找對的機率）。' />
        <TermCard name='ACL Filter' en='權限過濾' def='查資料時 SQL 直接 JOIN 權限表（事後 filter 是 bug 來源）。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表（2/3 資料與一致性）</div>
    
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
      <PageNum n={2} total={13} />
      <BrandBar />
    </div>
  </>
);

const P03: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C3.1 · REQUIREMENTS</Kicker>
    <PageH1>需求量化（NFR）</PageH1>
    <Table cols='180px 1fr' head={['業務需求', 'NFR 量化']} rows={[
      ['「快速回答」', 'First token P95 < 1s, full < 5s'],
      ['「答對」', 'Retrieval recall@10 > 90%, thumbs-up > 85%'],
      ['「沒看到的別講」', 'Hallucination < 5%（grounded in source）'],
      ['「不能洩密」', '權限過濾 100% accurate, audit log 完整'],
      ['「成本可控」', 'Cost/query < $0.01, 月預算 $15K'],
      ['「新文件即時可查」', 'Index lag < 5min'],
      ['「能溯源」', '每答案附引用，可點開原文'],
    ]} fontSize={18} />
    <div className='osd-anim-fade-up' style={{ marginTop: 14, padding: '12px 18px', background: '#2A2520', color: '#F5F1E8', borderRadius: 6, fontSize: 16, lineHeight: 1.7, animationDelay: '0.7s' }}>
      容量：500K × 1536 dim × 4B = 3GB vector · 50K/day LLM call · cache 30% hit → 月 $5.2K
    </div>
    <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md · §AI' />
  
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
      <PageNum n={3} total={13} />
      <BrandBar />
    </div></>
);

const P04: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C3.2 · SELECTION</Kicker>
    <PageH1>技術選型決策矩陣</PageH1>
    <Table cols='160px 200px 1fr 1fr' head={['元件', '選', '不選', '理由']} rows={[
      ['Vector DB', 'pgvector', 'Pinecone, Qdrant', '已用 PG，500K vector 內夠'],
      ['LLM', 'Claude Sonnet 4.6', '自架 LLaMA', '成本/品質平衡'],
      ['Embedding', 'OpenAI text-emb-3-small', 'self-host', '便宜、穩定'],
      ['Cache (answer)', 'Redis (semantic)', '不 cache', '重複問題省 80%'],
      ['Hybrid search', 'pgvector + tsvector', '純 vector', '提升 recall'],
      ['Streaming', 'SSE', 'WebSocket', '單向夠用'],
      ['監控', 'Langfuse + Prometheus', '自建', 'LLM 觀測專業工具'],
    ]} fontSize={16} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
      <strong>核心決策</strong>：能用既有 PG 就不引入新 vector DB。500K vector pgvector 沒問題。
    </div>
    <Footer source='software_architect/ppt/_source/04_Tech_Stack_Data.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
      <PageNum n={4} total={13} />
      <BrandBar />
    </div></>
);

const P05: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage1} alt='RAG Stage 1 MVP' style={{ maxWidth: '100%', maxHeight: '88%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C3.3 · STAGE 1 · MVP</Kicker>
        <PageH1 size={38}>RAG 最小架構</PageH1>
        <div style={{ fontSize: 16, lineHeight: 1.65 }}>
          <strong>單機可跑</strong>：<br/>
          · 1 台 EC2 + RDS pgvector<br/>
          · OpenAI Embedding + Claude<br/>
          · 月成本 ~$200<br/><br/>
          <strong style={{ color: warn }}>反 pattern</strong>：<br/>
          MVP 就上 Pinecone + LangGraph
        </div>
        <div style={{ marginTop: 14 }}><Mantra>RAG MVP &lt; 50 行 code 可跑通</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' section='Stage 1 · MVP' />
      <PageNum n={5} total={12} />
      <BrandBar />
    </div>
  </>
);

const P06: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage2} alt='RAG Stage 2 5K' style={{ maxWidth: '100%', maxHeight: '88%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C3.4 · STAGE 2 · 5K Users</Kicker>
        <PageH1 size={38}>內測 · 加 cache 加權限</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.6 }}>
          <strong>新增</strong>：<br/>
          · Answer cache (semantic)<br/>
          · Re-rank：top 20 → top 5<br/>
          · ACL SQL JOIN filter<br/>
          · LLM Pool fallback<br/><br/>
          <strong style={{ color: ok }}>成本省 30%</strong> (cache hit)
        </div>
        <div style={{ marginTop: 14 }}><Mantra>權限在 retrieval 層 JOIN，不事後 filter</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' section='Stage 2 · 5K Users' />
      <PageNum n={6} total={12} />
      <BrandBar />
    </div>
  </>
);

const P07: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_stage3} alt='RAG Stage 3 100K Enterprise' style={{ maxWidth: '100%', maxHeight: '92%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>C3.5 · STAGE 3 · 100K 企業</Kicker>
        <PageH1 size={36}>3-tier + Router + Audit</PageH1>
        <div style={{ fontSize: 14, lineHeight: 1.55 }}>
          <strong>新增</strong>：3-tier cache · pgvector sharded · LLM Router<br/><br/>
          <strong>5 道答案品質防線</strong>：<br/>
          retrieval threshold · citation · self-check · feedback · eval pipeline<br/><br/>
          <strong style={{ color: ok }}>成本 $0.005 / query</strong>
        </div>
        <div style={{ marginTop: 12 }}><Mantra>90% 工程力花在「不讓 LLM 瞎掰」</Mantra></div>
      </div>
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' section='Stage 3 · 100K Enterprise' />
      <PageNum n={7} total={12} />
      <BrandBar />
    </div>
  </>
);

const P08: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C3.6 · TRADE-OFFS</Kicker>
    <PageH1>關鍵 Trade-off 表</PageH1>
    <Table cols='150px 200px 200px 1fr' head={['決策', '我們選', '放棄什麼', '為何']} rows={[
      ['Vector DB', 'pgvector', 'Pinecone 自管 ANN', '500K vector 內，省 vendor'],
      ['LLM', 'Claude + 多備援', '自架最便宜', '品質 + 維運成本'],
      ['Cache', 'semantic + 3-tier', '全跑 LLM', '60% 命中 = 省 60%'],
      ['Re-ranker', 'cross-encoder CPU', 'GPU', '慢一點但便宜'],
      ['Permission', 'SQL JOIN filter', 'app 層 filter', '100% 正確、簡單'],
      ['LLM Router', '分層', '全 Claude', '簡單問題用便宜 LLM'],
      ['評估', '自建 eval + thumb', 'LLM-as-judge', '對自家文件更準'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
      <strong>金句</strong>：AI 系統的成本曲線陡—早期省力的選擇，後期全部還回來。
    </div>
    <Footer source='_source/braindump.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
      <PageNum n={8} total={13} />
      <BrandBar />
    </div></>
);

const P09: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>C3.7 · AI Prompt Flow</Kicker>
    <PageH1>用 Claude Code 加速設計</PageH1>
    <PromptBlock>{`Step 1 · Chunking 策略:
我有 50K 文件，含 PDF、Word、Confluence。平均 5000 字。
請：1. 比較 fixed-size / semantic / hierarchical 3 種策略
    2. recall / precision trade-off
    3. 哪個對「規章查詢」最好？「How-to 文件」最好？
    4. 給 Python code (langchain TextSplitter)

Step 2 · Eval framework:
請給 30 道測試題：10 精確 / 10 multi-hop / 5 negative / 5 adversarial
標出「成功標準」+「自動評分方法」

Step 3 · 成本優化:
當前 $0.02/query, 月 100K → $2000。列 7 個降本方法按 ROI 排序：
semantic cache / batch embed / Llama 路由 / context 縮短 / ...
給：預估降幅 + 實作成本 + 風險`}</PromptBlock>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
      <PageNum n={9} total={13} />
      <BrandBar />
    </div></>
);

const P10: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>C3.8 · PITFALLS</Kicker>
    <PageH1>8 大 RAG 坑 + 監控 + 降級</PageH1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 17, lineHeight: 1.5 }}>
      {[
        '1. Chunk 切太碎 → 失上下文',
        '2. 沒 re-rank → top-k 中很多 noise',
        '3. 沒 hybrid search → 關鍵字題目掛',
        '4. 權限事後 filter → 可能 0 結果',
        '5. 沒 hallucination guardrail → LLM 瞎掰',
        '6. cache 沒 invalidation → 文件更新仍回舊',
        '7. 沒 cost alert → 月底發現燒爆',
        '8. 沒 audit log → 無法追「為何給這答案」',
      ].map((t) => <div key={t} style={{ padding: '10px 14px', background: 'rgba(232,99,79,0.08)', borderLeft: `3px solid ${warn}`, borderRadius: 4 }}>{t}</div>)}
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 18, lineHeight: 1.7, animationDelay: '0.7s' }}>
      <strong style={{ color: warn }}>核心 alert</strong>：LLM cost rate &gt; 預算 1.5× · API error &gt; 1% · Retrieval recall 下降 &gt; 5% · p95 &gt; 5s<br/>
      <strong style={{ color: ok }}>降級</strong>：LLM 全掛 → 退化「純檢索」（顯示 top 5 chunks，不生成）
    </div>
    <Footer source='software_architect/ppt/_source/05_ilities.md' />
  
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
      <PageNum n={10} total={13} />
      <BrandBar />
    </div></>
);

const P11: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative', background: accent, color: '#F5F1E8' }}>
    <div className='osd-anim-fade-up' style={{ fontSize: 24, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(245,241,232,0.85)' }}>CASE 3 · 一頁速查</div>
    <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 800, margin: '14px 0 28px', animationDelay: '0.1s' }}>印出貼牆</h1>
    <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 18, lineHeight: 1.7 }}>
      <div style={{ padding: '20px 24px', background: 'rgba(245,241,232,0.12)', borderRadius: 8 }}>
        <strong>場景</strong>：企業 RAG，100K 員工 / 50K 文件<br/><br/>
        <strong>核心 5 步</strong>：<br/>
        1. Chunk + Embed → pgvector<br/>
        2. SQL JOIN ACL（權限在 retrieval 層）<br/>
        3. Hybrid search（vector + BM25）<br/>
        4. Re-rank → top 5<br/>
        5. LLM stream + citation 強制
      </div>
      <div style={{ padding: '20px 24px', background: 'rgba(245,241,232,0.12)', borderRadius: 8 }}>
        <strong>品質 5 道防線</strong>：<br/>
        retrieval threshold / citation / self-check / feedback / eval<br/><br/>
        <strong>紅線</strong>：<br/>
        · Hallucination &gt; 5% → 沒人用<br/>
        · Cost/query &gt; $0.01 → 經濟學死<br/>
        · 權限漏洞 → 公司死
      </div>
    </div>
  
      <Breadcrumb part='Part 2' chapter='Case 3 · RAG' />
      <PageNum n={11} total={13} />
      <BrandBar />
    </div></>
);

const P12: Page = () => (
  <ThreeTakeaways chapter='Case 3 · RAG / AI 平台' lines={[
    'pgvector 500K 內就夠，先別跳到 Pinecone',
    '90% 工程力花在「不讓 LLM 瞎掰」',
    'AI 系統的成本曲線陡，早期省力 = 後期還回來',
  ]} />
);

export const meta: SlideMeta = { title: 'Case 3 · RAG / AI 應用平台' };
export default [P01, P02, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12] satisfies Page[];
