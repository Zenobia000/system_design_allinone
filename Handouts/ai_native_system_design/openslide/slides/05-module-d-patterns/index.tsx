import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/05_module_d_hero.png';
import img_patterns_map from './assets/D_patterns_map.png';
import img_event_trio from './assets/D_event_trio.png';
import img_api_quadrant from './assets/D_api_quadrant.png';
import img_split_cost from './assets/D_service_split_cost.png';
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
  <><AnimStyle /><div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
    <div style={{ padding: '0 100px' }}>
      <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 120, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
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

const P01: Page = () => <ChapterDivider eyebrow='MODULE · D' title='設計模式與進階架構' subtitle='知道何時引入複雜度，何時拒絕引入' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>D · 你會帶走什麼</Kicker>
    <PageH1>讀完 Module D，你能：</PageH1>
    <ul className='osd-stagger' style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 28 }}>
      <li>SOLID 5 原則 + 分層架構</li>
      <li>20 個高頻設計模式速查</li>
      <li>判斷「該不該拆微服務」的 5 個訊號</li>
      <li>區分 Saga / Event Sourcing / CQRS（不再混）</li>
      <li>同步 vs 非同步通訊的取捨</li>
      <li>API 設四選一：REST / gRPC / GraphQL / WebSocket</li>
    </ul>
    <div className='osd-anim-fade-up' style={{ marginTop: 30, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
      <strong>金句</strong>：複雜度是借的，總要還—只在真正需要時才借。
    </div>
    <Footer source='software_architect/ppt/_source/06_Components_Patterns.md' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={1} total={17} />
      <BrandBar />
    </div></>
);

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <Kicker>本章新術語 · 8 個詞</Kicker>
      <PageH1 size={42}>聊架構模式前的詞彙準備</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='SOLID' en='物件導向 5 原則' def='S 單一職責 / O 開閉 / L 里氏 / I 介面隔離 / D 依賴反轉。' />
        <TermCard name='Monolith vs Microservices' en='單體 vs 微服務' def='Monolith 全部 code 一起 / Microservices 拆獨立服務。' />
        <TermCard name='Saga' en='補償事務' def='跨服務的長事務 — 失敗時觸發補償（回退操作）。' />
        <TermCard name='Event Sourcing (ES)' en='事件溯源' def='不存「目前狀態」存「所有變更事件」（可重放）。' />
        <TermCard name='CQRS' en='命令查詢分離' def='讀模型和寫模型分開（讀大寫小時用）。' />
        <TermCard name='Outbox' en='訊息可靠投遞模式' def='寫 DB 同時寫 outbox 表，再由 worker 投遞。' />
        <TermCard name='REST / gRPC / GraphQL / WebSocket' en='4 種 API 風格' def='REST 公開 CRUD / gRPC 內部高效 / GraphQL 前端聚合 / WS 雙向即時。' />
        <TermCard name='Idempotency' en='冪等性' def='同操作重複做結果一樣（網路會丟包必須做）。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表（3/3 可靠性與模式）</div>
    
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={2} total={17} />
      <BrandBar />
    </div>
  </>
);

// D.1 SOLID
const P03: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.1 · FUNDAMENTALS</Kicker>
    <PageH1>SOLID 5 原則 + 分層架構</PageH1>
    <Table cols='100px 1fr 1fr' head={['原則', '一句話', '違反訊號']} rows={[
      ['S RP', '一個類只該為一個 actor 改變', '一個檔 1000 行'],
      ['O CP', '對擴展開放，對修改封閉', '加 feature 都改舊 code'],
      ['L SP', '子類可以替換父類', '繼承後 if 判斷型別'],
      ['I SP', '別逼 client 依賴用不到的方法', '一個 interface 30 個方法'],
      ['D IP', '依賴抽象，不依賴具體', '直接 new Database()'],
    ]} fontSize={18} />
    <div className='osd-anim-fade-up' style={{ marginTop: 18, padding: '14px 20px', background: '#2A2520', color: '#F5F1E8', borderRadius: 6, fontFamily: 'IBM Plex Mono, monospace', fontSize: 17, animationDelay: '0.6s' }}>
      分層架構：Presentation → Application → Domain → Infrastructure　（依賴只能向內）
    </div>
    <Footer source='software_architect/ppt/_source/06_Components_Patterns.md' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={3} total={17} />
      <BrandBar />
    </div></>
);

// D.2 Patterns Map — Real PNG
const P04: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_patterns_map} alt='20 design patterns map' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>D.2 · 20 設計模式</Kicker>
        <PageH1 size={36}>5 大分類星座</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          · <strong>創建型</strong>：Factory · Builder · Singleton<br/>
          · <strong>結構型</strong>：Adapter · Decorator · Facade · Proxy<br/>
          · <strong>行為型</strong>：Strategy · Observer · State · Command<br/>
          · <strong>領域</strong>：Repository · Specification<br/>
          · <strong>分散式</strong>：Saga · ES · CQRS · Outbox
        </div>
        <div style={{ marginTop: 14 }}><Mantra>模式是工具，不是目的</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' section='D.2 · 20 模式' />
      <PageNum n={4} total={17} />
      <BrandBar />
    </div>
  </>
);

// D.2 Patterns Card 2
const P05: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.2 · CARD · 行為 + 分散式</Kicker>
    <PageH1>20 個高頻模式 · 2/2</PageH1>
    <Table cols='180px 1fr 1fr' head={['模式', '解什麼問題', '一句話']} rows={[
      ['Strategy', '演算法可替換', '注入不同策略'],
      ['Observer', '訂閱通知', 'pub/sub 本地版'],
      ['State', '物件行為依狀態變', '狀態機'],
      ['Command', '動作物件化', '可 undo / queue'],
      ['Template Method', '流程固定步驟可變', '抽象方法'],
      ['Chain of Responsibility', '多個 handler 串接', 'middleware'],
      ['Saga', '跨服務事務', '補償交易'],
      ['Event Sourcing', '不存狀態存事件', '完整 audit, 可重放'],
      ['CQRS', '讀寫分離模型', '讀用 view, 寫用 command'],
      ['Outbox', '訊息可靠投遞', 'DB + outbox table'],
    ]} fontSize={17} />
    <Footer source='software_architect/ppt/_source/08_Advanced_Patterns.md' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={5} total={17} />
      <BrandBar />
    </div></>
);

// D.3 Monolith vs Microservices
const P06: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.3 · DECISION · 何時切？</Kicker>
    <PageH1>微服務 vs 模組化單體</PageH1>
    <Table cols='180px 1fr 1fr' head={['維度', '模組化單體', '微服務']} rows={[
      ['適合團隊', '< 20 人', '> 50 人'],
      ['部署複雜度', '1 個', 'N 個'],
      ['跨團隊獨立發版', '否', '是'],
      ['跨模組 refactor', '容易', '痛苦'],
      ['維運成本', '低', '高（K8s, mesh）'],
      ['故障定位', '集中 log', '需 distributed tracing'],
      ['一致性', 'DB 事務', 'Saga / 補償'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 19, lineHeight: 1.6, animationDelay: '0.7s' }}>
      <strong>5 個「該切」訊號</strong>：團隊 &gt; 30 互相阻擋 deploy · 某模組規模需求遠大 · 不同 stack · 不同 SLO · 法規隔離
    </div>
    <Footer source='software_architect/ppt/_source/08_Advanced_Patterns.md · §Microservices' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={6} total={17} />
      <BrandBar />
    </div></>
);

// D.4 Event-Driven Trio — Real PNG
const P07: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '65% 35%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_event_trio} alt='Saga / ES / CQRS' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>D.4 · 別混為一談</Kicker>
        <PageH1 size={36}>Saga · ES · CQRS</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          <strong>Saga</strong> · 跨服務事務 + 補償<br/>
          <strong>Event Sourcing</strong> · 存事件不存狀態<br/>
          <strong>CQRS</strong> · 讀寫模型分開<br/><br/>
          ✅ Saga 單獨用最常見<br/>
          ✅ ES + CQRS 自然搭<br/>
          ❌ 別為「將來可能」就上
        </div>
        <div style={{ marginTop: 14 }}><Mantra>這三個都是重武器，痛真到了才用</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' section='D.4 · 事件驅動三件套' />
      <PageNum n={7} total={17} />
      <BrandBar />
    </div>
  </>
);

// D.5 Sync vs Async
const P08: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.5 · COMMUNICATION · 兩種模式</Kicker>
    <PageH1>同步 vs 非同步通訊</PageH1>
    <Table cols='130px 1fr 1fr' head={['維度', '同步（REST/gRPC）', '非同步（Pub/Sub/Stream）']} rows={[
      ['回應時效', '即時', '延遲毫秒-秒'],
      ['耦合', '緊（caller 等 callee）', '鬆'],
      ['失敗影響', '上游也死', '訊息暫存'],
      ['複雜度', '低', '中-高'],
      ['適合', 'CRUD、查詢、用戶等待', '通知、ETL、削峰'],
    ]} fontSize={18} />
    <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 19, lineHeight: 1.7, animationDelay: '0.5s' }}>
      <strong>決策口訣</strong>：用戶等的 → 同步 · 後台處理 → 非同步 · 跨多下游 → 非同步 · 需 replay → Kafka
    </div>
    <Footer source='software_architect/ppt/_source/07_System_Architecture.md · §Async' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={8} total={17} />
      <BrandBar />
    </div></>
);

// D.6 API Style — Real PNG quadrant
const P09: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_api_quadrant} alt='API quadrant' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>D.6 · API 四選一</Kicker>
        <PageH1 size={36}>同步↔非同步 / 單↔雙向</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          <strong>REST</strong> · 公開 CRUD<br/>
          <strong>gRPC</strong> · 內部高效<br/>
          <strong>GraphQL</strong> · 前端聚合<br/>
          <strong>WebSocket</strong> · 雙向即時
        </div>
        <div style={{ marginTop: 14 }}><Mantra>API 風格是組合，大專案常 3 種都用</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' section='D.6 · API 風格' />
      <PageNum n={9} total={17} />
      <BrandBar />
    </div>
  </>
);

// D.7 Service Split — Real PNG cost curve
const P10: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_split_cost} alt='Monolith vs Microservices cost' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>D.7 · 拆服務時機</Kicker>
        <PageH1 size={36}>看團隊規模，不跟風</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          <strong>拆 1 個服務多花</strong>：<br/>
          · CI/CD + K8s 配置<br/>
          · Service Mesh + Tracing<br/>
          · 監控 + runbook<br/>
          · 跨服務契約測試<br/><br/>
          <strong>範例</strong>：拆通知服務 ~2-3 週
        </div>
        <div style={{ marginTop: 14 }}><Mantra>能用模組解的別用服務</Mantra></div>
      </div>
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' section='D.7 · 拆服務時機' />
      <PageNum n={10} total={17} />
      <BrandBar />
    </div>
  </>
);

// D.8 AI Pattern Help
const P11: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>D.8 · AI 協助選模式</Kicker>
    <PageH1>給 Claude Code 的選模式 prompt</PageH1>
    <PromptBlock>{`Prompt:
領域：訂單 + 庫存 + 付款 + 出貨
現況：單體 PostgreSQL，10K 訂單/日
痛點：付款失敗時，庫存沒釋放（補償邏輯散落各處）
NFR：仍要強一致；未來 3 年 100K 訂單/日

請：
1. 列 3 個適用模式（含 Saga、Outbox、Event Sourcing）
2. 每個模式給：適配度評分、引入成本、3 年後的代價
3. 推薦一個 + ADR 草稿
4. 列出推薦方案的「實作分階段」（PoC → MVP → 完整）`}</PromptBlock>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={11} total={17} />
      <BrandBar />
    </div></>
);

// D.9 Idempotency
const P12: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.9 · IDEMPOTENCY · 必修</Kicker>
    <PageH1>在「網路會丟包」的世界，冪等是底線</PageH1>
    <Table cols='160px 1fr 1fr' head={['方法', '怎麼做', '適用']} rows={[
      ['Idempotency-Key', 'client 帶唯一 key，server 去重', '寫操作 (POST)'],
      ['Natural Idempotency', '操作本身即冪等（PUT, DELETE）', 'RESTful 更新'],
      ['Versioning', '帶 version, 不匹配拒絕', '樂觀鎖'],
    ]} fontSize={19} />
    <div className='osd-anim-fade-up' style={{ marginTop: 22, padding: '14px 20px', background: '#2A2520', color: '#F5F1E8', borderRadius: 6, fontFamily: 'IBM Plex Mono, monospace', fontSize: 17, lineHeight: 1.7, animationDelay: '0.6s' }}>
      POST /payments<br/>
      Headers: Idempotency-Key: &lt;uuid&gt;<br/>
      → 同 key 5 分鐘內回 same response，不重複扣款
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 14, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
      <strong>金句</strong>：所有「寫」API 都該冪等。沒做 = 等著上線後出意外。
    </div>
    <Footer source='software_architect/ppt/_source/06_Components_Patterns.md · §Idempotency' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={12} total={17} />
      <BrandBar />
    </div></>
);

// D.10 Backpressure
const P13: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.10 · FLOW CONTROL</Kicker>
    <PageH1>反壓（Back-pressure）4 招</PageH1>
    <Table cols='140px 1fr 1fr' head={['招式', '用法', '範例']} rows={[
      ['拒絕 (reject)', '429 Too Many', 'rate limiter'],
      ['丟棄 (drop)', '丟舊保新 / 丟新保舊', 'log 系統'],
      ['緩衝 (buffer)', '暫存有上限', 'Kafka 有 retention'],
      ['減速 (throttle)', '上游放慢', 'consumer credit'],
    ]} fontSize={19} />
    <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 19, lineHeight: 1.7, animationDelay: '0.5s' }}>
      <strong>判斷</strong>：用戶可重試的 → reject · 用戶看不到的內部 → buffer + alert
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 14, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.7s' }}>
      <strong>金句</strong>：「沒反壓」=「下游沒事的時候系統好棒，下游一慢全部炸」。
    </div>
    <Footer source='software_architect/ppt/_source/07_System_Architecture.md · §Back-pressure' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={13} total={17} />
      <BrandBar />
    </div></>
);

// D.11 Anti-Patterns
const P14: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.11 · ANTI-PATTERNS · 別踩</Kicker>
    <PageH1>7 大反 pattern</PageH1>
    <Table cols='200px 1fr 1fr' head={['反 pattern', '為何坑', '替代方案']} rows={[
      ['Distributed Monolith', '拆服務但共用 DB / 必須一起 deploy', '真正解耦 or 合回單體'],
      ['God Service', '一個服務做所有事', '按子域拆'],
      ['Chatty Microservices', '一 request 跨 10 個服務', '合服務 / BFF / GraphQL'],
      ['Shared Database', '多服務寫同 DB', '各自 DB + event'],
      ['Synchronous Chain', 'A→B→C→D 全同步', '引入 event/queue'],
      ['Premature Sharding', '100k rows 就分片', '先 vertical scale'],
      ['Over-engineering', '為「未來」加複雜度', 'YAGNI'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 21, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
      <strong>金句</strong>：架構優雅 ≠ 工程價值。多數系統需要的是「無聊但可運維」。
    </div>
    <Footer source='software_architect/ppt/_source/08_Advanced_Patterns.md · §Anti-Patterns' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={14} total={17} />
      <BrandBar />
    </div></>
);

// D.12 AI Code Gen
const P15: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>D.12 · CODE GENERATION · 工作流</Kicker>
    <PageH1>用 AI 生 code 的 4 個 pattern</PageH1>
    <Table cols='160px 1fr 1fr' head={['Pattern', '流程', '適用']} rows={[
      ['Spec-First', 'ADR → API spec → AI 生 code', '新功能'],
      ['Test-First', '寫測試 → AI 生實作 → 跑測試', '重構、TDD'],
      ['Skeleton-Fill', '人寫框架 → AI 填細節', '樣板程式碼'],
      ['Pair-Refactor', '人指出問題 → AI 提方案 → 人選', '重構、優化'],
    ]} fontSize={19} />
    <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 19, lineHeight: 1.7, color: warn, animationDelay: '0.6s' }}>
      <strong>反 pattern</strong>：「幫我寫一個 X」without spec · 全收 AI 的 code 不 review · 沒測試就改
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 14, fontSize: 20, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
      <strong>金句</strong>：AI 生 code 像實習生交件—收下前要 review，發現問題要教它。
    </div>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 1' chapter='Module D · 設計模式' />
      <PageNum n={15} total={17} />
      <BrandBar />
    </div></>
);

const P16: Page = () => (
  <ThreeTakeaways chapter='Module D · 設計模式' lines={[
    '複雜度是借的，總要還',
    '先模組化，規模到了再切服務',
    '所有寫 API 都該冪等',
  ]} />
);

export const meta: SlideMeta = { title: 'Module D · 設計模式與進階架構' };
export default [P01, P02, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16] satisfies Page[];
