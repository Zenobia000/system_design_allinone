import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_01_scalability_01_up_vs_out_concept from './assets/01_scalability_01_up_vs_out_concept.png';
import img_02_testability_01_pyramid_concept from './assets/02_testability_01_pyramid_concept.png';

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
  </div>
);

const SectionEnd = ({ title, subtitle, next }: { title: string; subtitle?: string; next?: string }) => (
  <div style={{ ...fill, background: 'var(--osd-accent)', color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 140, fontWeight: 800, margin: 0 }}>{title}</h1>
    {subtitle ? <h2 style={{ fontSize: 52, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245, 241, 232, 0.85)' }}>{subtitle}</h2> : null}
    {next ? <p style={{ fontSize: 36, marginTop: 64, color: '#F5F1E8', opacity: 0.9 }}>→ {next}</p> : null}
  </div>
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
  <ChapterDivider eyebrow='CHAPTER · 05 · OVERVIEW' title='*-ilities' subtitle='系統的健康檢查表' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_mental_model_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>看完本章，你能回答：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① Scalability 怎麼設計？' text='Out 不是 Up' />
        <StackRow tone='#A1813F' label='② Testability 怎麼量？' text='SRP + DI' />
        <StackRow tone='#5B7570' label='③ Modularity 的判準？' text='換掉一塊不會炸' />
        <StackRow tone='#5B9770' label='④ 其他 -ilities 速覽' text='Maintain / Manage / Observe' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.5 · `SA簡報/S8.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 品質屬性的優先級</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ── 業務生死 ──
   Scalability      不能擴展 = 業務上限
   Reliability      不可用 = 信任崩盤
   Security         被駭 = 公司結束

   ── 工程效率 ──
   Testability      不能測 = 不敢動
   Maintainability  維護貴 = 工程師流失
   Modularity       不能換 = 技術債滾大

   ── 上線生存 ──
   Observability    看不到 = 修不好
   Manageability    部署難 = 不敢發版`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：好架構不是所有 -ility 都頂——是知道哪兩個是這個業務的命門，把它頂滿。</span></div>
    </div>
    <Footer source='`S8_Slides.pdf` · §Quality Attribute Stack' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先學 Scalability。' next='5.1 Scalability</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 05 · TOPIC 01' title='Scalability' subtitle='Scale Out 直接決定業務上限' />
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_scalability_01_up_vs_out_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 Scalability 是商業問題？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Scalability 不是技術指標，是商業天花板</strong>。

系統撐不住 1M DAU → 公司就只能服務 100k 用戶。
不是技術問題，是「<strong>今年營收上限被架構鎖死了</strong>」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Scalability 問題在設計時就要解決</li>
          <li>上線後才發現 → 推倒重建 6 個月起跳</li>
          <li><strong>架構師的核心 KPI</strong>：讓業務 10× 成長時系統不崩</li>
        </ul>
    </div>
    <Footer source='`S8_Slides.pdf` · §Scalability as Business Constraint' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Scale Up vs Scale Out</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Scale Up（垂直）</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Scale Out（水平）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>做法</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>換更強的機器</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>加更多機器</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上限</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>硬體最高規</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>理論上無限</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>成本曲線</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>指數成長（頂規溢價高）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>線性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>複雜度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低（無需改 code）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高（需 stateless、分布式）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>適合</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DB 主節點、單機 GPU</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用層、無狀態服務</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>風險</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>單點失效</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一致性、分布式 bug</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>現代雲架構</strong>：應用層 Scale Out + 資料層<strong>慎用 Scale Up</strong>。
DB scale out（sharding）複雜度極高，盡量晚做。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Vertical vs Horizontal' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Scale Out 三前提</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① Stateless 應用層' text='user state 放 Redis / DB · 不放 process memory' />
        <StackRow tone='#A1813F' label='② 共享資料層' text='多 instance 連同一 DB · 或 sticky session 配 LB' />
        <StackRow tone='#5B7570' label='③ 自動化部署' text='加 instance 是一鍵 (auto-scale + IaC)' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：把 session 存在 process memory，然後加 LB——使用者每次請求被導到不同 instance，session 失效。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Scale-out Prerequisites' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三層擴展策略</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   Client Layer       CDN + 多 region 邊緣
        ↓
   App Layer          K8s + auto-scale + LB
        ↓
   Data Layer         主寫從讀 → 分片 → 分區`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>層次</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>推薦做法</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>複雜度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Client</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CDN + edge functions</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>App</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Container orchestration</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Data</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Read replica → Sharding</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>經驗法則</strong>：擴展順序由上而下。<strong>先 cache 再分片</strong>——cache 能擋掉 90% 讀請求。</span></div>
    </div>
    <Footer source='`S8_Slides.pdf` · §Three-Layer Strategy' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 過度設計 vs 設計不足</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='提早規劃 scalability' items={['避免 6 個月後推倒重建', '新團隊有方向', '架構文件可累積', '選型避開短期錯誤']} />
        <TradeoffCol tone='#E8634F' title='過早優化的代價' items={['MVP 上線晚 3 個月', '程式碼複雜難改', '付雲端帳單卻沒用戶', '分散式 bug 多到改不完']} />
      </div>
      <Callout tone='#D97757'><strong>Linus 風格做法</strong>：<strong>Day 0 設計成「能擴展但不擴展」</strong>。
Stateless + 共享資料 = 隨時可加 instance，但<strong>現在只跑 1 個</strong>。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Premature Optimization' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='Scalability 完' subtitle='撐住業務，下一站讓系統可測。' next='5.2 Testability</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 05 · TOPIC 02' title='Testability' subtitle='不能測 = 不敢改 = 技術債滾大' />
);


const P16: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_testability_01_pyramid_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 Testability 是架構決策？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>「沒時間寫測試」是表面原因。
真正的原因是<strong>架構讓寫測試很痛</strong>——
- 一個 class 要 mock 20 個依賴
- 一個 function 要起整個 server 才能測
- DB 邏輯跟 UI 黏一起

<strong>Testability 在架構層決定，不是在 sprint 末尾補救。</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Testable 架構 = 模組邊界清楚 + 依賴可替換</li>
          <li>AI 寫代碼時代 → testability 反而更重要（AI 寫太快，沒測會出包）</li>
        </ul>
    </div>
    <Footer source='`S8_Slides.pdf` · §Testability as Architecture' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三層測試金字塔</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`              ┌─────────────┐
              │   E2E (5%)  │       Cypress · Playwright
              ├─────────────┤
              │ Integration │       測 component 間互動
              │   (15%)     │
              ├─────────────┤
              │             │
              │ Unit (80%)  │       測單一邏輯 · 無外部依賴
              │             │
              └─────────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>比例倒過來會死</strong>：80% E2E → 跑一次半小時 → 沒人敢改 code。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Test Pyramid' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Testability 三件套</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 單一職責原則 (SRP)' text='一個 class 只做一件事 · 才容易 mock' />
        <StackRow tone='#A1813F' label='② 依賴注入 (DI)' text='外部依賴從參數傳入 · 不在內部 new' />
        <StackRow tone='#5B7570' label='③ Pure Function 優先' text='同樣輸入同樣輸出 · 無副作用' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>三件套效果</strong>
SRP 讓你<strong>知道在測什麼</strong>；DI 讓你<strong>能替換依賴</strong>；Pure Function 讓你<strong>斷言結果</strong>。
缺一即「能跑但不能測」。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Testability Principles' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 反模式速覽</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>反模式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>為何不可測</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>解法</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>`new Database()` 在 class 內</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>mock 不掉</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>constructor 注入</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>直接讀 `process.env`</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>環境變數綁死</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>包成 config 物件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>直接呼叫 `Date.now()`</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>時間相關測試 flaky</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>注入 clock 物件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>直接 HTTP fetch</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>網路測試慢 / 不穩</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>包 HTTP client 介面</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Singleton + 全域狀態</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>測試間互相污染</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>改成 instance + DI</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>Linus 鐵律</strong>：能 mock 不代表該 mock 太多。Mock 整個世界 = 測了個寂寞。整合測試該打真 DB。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Test Anti-Patterns' />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 100% Coverage？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='追求高覆蓋率' items={['對核心商業邏輯 ≥ 90%', '對金流 / 安全 = 100%', '對 public API 簽名 100%', '覆蓋率作為 PR gate']} />
        <TradeoffCol tone='#E8634F' title='不必追求的部分' items={['UI 細節（讓 E2E / 視覺迴歸測）', '第三方 library 包裝層', '實驗性 spike 程式碼', '純 config 檔']} />
      </div>
      <Callout tone='#D97757'><strong>經驗值</strong>：核心邏輯 80%、整體 60% 即可。<strong>沒測過的關鍵路徑</strong> &gt; <strong>覆蓋率 90% 但都是 getter 測試</strong>。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Coverage Reality' />
  </div>
);


const P22: Page = () => (
  <SectionEnd title='Testability 完' subtitle='能測了，下一站學能換。' next='5.3 Modularity</span>' />
);


const P23: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 05 · TOPIC 03' title='Modularity' subtitle='換掉一塊樂高，整體不會倒' />
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 Modularity 是長期生存戰？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>5 年內，這些都會換：
- DB 從 PostgreSQL 換到別的
- 第三方服務（金流、推播）換廠商
- 部分功能拆出成獨立服務

<strong>模組化決定「能不能換」</strong>，不能換 → 整個系統老化死亡。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Modularity ≠ 微服務（兩個層級）</li>
          <li>單體應用也可以高度模組化</li>
          <li>真正的判準：<strong>換一塊不會牽動其他塊</strong></li>
        </ul>
    </div>
    <Footer source='`S8_Slides.pdf` · §Modularity Strategic Value' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三個衡量指標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>指標</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>定義</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>量法</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>內聚 (Cohesion)</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一個模組內的東西彼此相關度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高 = 改動只在模組內</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>耦合 (Coupling)</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>模組間相互依賴程度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低 = 改 A 不影響 B</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>介面穩定</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>公開 API 變動頻率</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>越穩 = 越成熟</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣</strong>：<strong>High Cohesion · Low Coupling</strong>。
這 6 個字是過去 40 年軟工沒變過的核心。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Cohesion & Coupling' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 模組邊界三準則</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 業務邊界優先' text='不是技術分層 · 是「商業概念」（user, order, payment）' />
        <StackRow tone='#A1813F' label='② 資料擁有權' text='每個資料表只有一個模組可寫' />
        <StackRow tone='#5B7570' label='③ 透過介面通訊' text='模組間不直接 import 內部類別 · 只用 public API' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：用「技術型」邊界拆模組（controllers / services / repos）。改一個業務 feature 要跨 3 個資料夾。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Module Boundaries' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · DDD Bounded Context 對照</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   業務概念 (Domain)         模組邊界
   ──────────────         ──────────
   ① User Identity        auth/
   ② Product Catalog      catalog/
   ③ Shopping Cart        cart/
   ④ Order Processing     orders/
   ⑤ Payment              payments/
   ⑥ Notification         notify/

   每個模組:
   - 自己的 schema / table
   - 自己的 service / repository
   - 對外只暴露 public interface`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 風格</strong>：模組像國家——有國界、有外交（API）、不互相干涉內政。</span></div>
    </div>
    <Footer source='`S8_Slides.pdf` · §DDD Bounded Context' />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 多細的模組才合理？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='粒度細的好處' items={['單一職責清楚', '單一團隊負責', '容易替換', '可獨立部署（未來）']} />
        <TradeoffCol tone='#E8634F' title='粒度過細的代價' items={['跨模組呼叫多 → 效能差', '跨模組事務難處理', '每模組 boilerplate 多', '5 個模組 5 套 logger config']} />
      </div>
      <Callout tone='#D97757'><strong>經驗值</strong>：MVP 階段 5–8 個模組剛好。<strong>過早拆 20 個 = 過早微服務 = 失敗</strong>。</Callout>
    </div>
    <Footer source='`S8_Slides.pdf` · §Module Granularity' />
  </div>
);


const P29: Page = () => (
  <SectionEnd title='Modularity 完' subtitle='三件 -ility 串好，章末收斂。' next='Ch.5 Recap</span>' />
);


const P30: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 05 · RECAP' title='*-ilities 收斂' subtitle='把 Ch.5 串成一份架構健檢表' />
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CHECKLIST · 架構健檢 12 問</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>#</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>問題</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>通過判準</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>業務 10× 時系統能擴展嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用層 stateless · DB 有 read replica 計畫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>2</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用層加機器是一鍵嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>auto-scale + IaC 自動化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>3</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DB 是 SPOF 嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主從 + 自動 failover</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>4</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>80% 的單元測試覆蓋核心邏輯嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CI 強制 ≥ 70%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>5</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>整合測試打真 DB 嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>是</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>6</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>模組間靠 public API 通訊嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>是，沒有跨模組 import 內部類</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>7</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每張 table 只有一個模組寫？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>是</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>8</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>第三方依賴可替換嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>都有 adapter / interface 包裝</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>9</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>環境變數透過 config 物件存取？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>是</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>時間依賴透過 clock 注入？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>是</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>11</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>日誌 / 監控配置統一？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>是，有 shared module</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>12</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>部署是一鍵嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>是，無人工步驟</div>
        </div>
    <Footer source='整合 Ch.5 三大主題 + 業界 readiness checklist' />
  </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第五章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['品質屬性優先級表', 'Scale Out 三前提', '測試金字塔比例', 'Testability 三件套', '模組邊界三準則']} />
        <TradeoffCol tone='#E8634F' title='還沒回答的問題' items={['怎麼拆模組？　→ Ch.6', '分散式怎麼設計？　→ Ch.7', '進階模式何時用？　→ Ch.8', '實戰案例？　→ Ch.9']} />
      </div>
  </div>
);


const P33: Page = () => (
  <SectionEnd title='Ch.5 完' subtitle='健檢標準有了，下一站學模式。' next='Ch.6 Components & Patterns</span>' />
);


export const meta: SlideMeta = { title: 'Ch.5 · 各種 -ilities' };
export default [
  P01,
  P02,
  P03,
  P04,
  P05,
  P06,
  P07,
  P08,
  P09,
  P10,
  P11,
  P12,
  P13,
  P14,
  P15,
  P16,
  P17,
  P18,
  P19,
  P20,
  P21,
  P22,
  P23,
  P24,
  P25,
  P26,
  P27,
  P28,
  P29,
  P30,
  P31,
  P32,
  P33,
] satisfies Page[];
