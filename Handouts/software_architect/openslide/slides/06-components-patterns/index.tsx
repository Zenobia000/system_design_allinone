import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_01_layered_01_three_tier_concept from './assets/01_layered_01_three_tier_concept.png';

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
  <ChapterDivider eyebrow='CHAPTER · 06 · OVERVIEW' title='Components & Patterns' subtitle='和 AI 溝通的高效語言' />
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
        <StackRow tone='#D97757' label='① 分層架構為何不過時？' text='UI / BL / DAL' />
        <StackRow tone='#A1813F' label='② SOLID + DI 怎麼落地？' text='' />
        <StackRow tone='#5B7570' label='③ GoF 模式選哪幾個必學？' text='' />
        <StackRow tone='#5B9770' label='④ 為何「模式」是 AI 時代的稀缺技能？' text='' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.6 · `SA簡報/S9, S10.pdf` + `Design+Patterns.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 模式 = 溝通協議</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   不會模式的工程師
   ────────────────
   「我們在 service 裡面寫一個 method
    從 DB 撈資料，做一些轉換，
    再呼叫 API 把結果送出去」

   會模式的工程師（架構師）
   ────────────────
   「Repository 撈 → 用 Strategy 轉 → Adapter 出」

   AI 對後者的 prompt 反應準確度高 10×`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：模式不是炫技，是讓<strong>未來的你和 AI</strong>讀得懂今天寫的代碼。</span></div>
    </div>
    <Footer source='`Design+Patterns.pdf` · §Why Patterns Matter' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先從分層開始。' next='6.1 Layered Architecture</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 06 · TOPIC 01' title='Layered Architecture' subtitle='最老的模式，最值錢的模式' />
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_layered_01_three_tier_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 50 年前的模式還在用？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>分層架構</strong>自 1970 年代誕生，至今 80% 企業應用仍在用。
不是因為新模式不夠好——是因為<strong>這套基本盤夠用、夠清楚、夠容易招人</strong>。

別瞧不起 boring tech。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>邊界清楚 → 新人 onboarding 快</li>
          <li>責任分離 → 改 UI 不動 DB</li>
          <li>廣為人知 → AI 也認得</li>
        </ul>
    </div>
    <Footer source='`S9_Slides.pdf` · §Why Layered' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三層架構標準圖</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ┌─────────────────────────────┐
   │  Presentation (UI)          │  React / Vue / Mobile UI
   │  - 渲染 + user input         │
   ├─────────────────────────────┤
   │  Business Logic (BL)        │  Service / Use Case
   │  - 商業規則 + 流程            │
   ├─────────────────────────────┤
   │  Data Access (DAL)          │  Repository / ORM
   │  - DB 操作 + 外部 API 調用    │
   └─────────────────────────────┘
       依賴方向：UI → BL → DAL
       上層不能跨層直接呼叫 DAL`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>鐵律</strong>：UI 永遠不該直接 import DAL。違反 = 維護災難開始。</span></div>
    </div>
    <Footer source='`S9_Slides.pdf` · §Three-Layer Standard' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 演進：四層 + 進階</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='+ API / Controller 層' text='介於 UI 與 BL · 處理 HTTP → DTO 轉換' />
        <StackRow tone='#A1813F' label='+ Domain Model 層' text='BL 內細分 · entity 跟 use case 分開' />
        <StackRow tone='#5B7570' label='+ Infrastructure 層' text='DAL + 第三方 SDK + 訊息發送' />
        <StackRow tone='#5B9770' label='+ Shared Kernel' text='跨模組共用的 utility / 型別' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>漸進演進</strong>：3 層 → 4 層 → DDD onion → Hexagonal。
<strong>不要直接跳到 Hexagonal</strong> —— 99% 系統不需要那麼多層。</Callout>
    </div>
    <Footer source='`S9_Slides.pdf` · §Layer Evolution' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · DDD 與分層的對應</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>經典分層</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>DDD Tactical Pattern</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Presentation</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Application Service</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Business Logic</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Domain Model + Domain Service</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Data Access</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Repository + Specification</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Infrastructure</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Adapter + Anti-Corruption Layer</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>理解順序</strong>：先學經典 3 層 → 用 1 年 → 看出痛點 → 才學 DDD。一上來就 DDD = 走火入魔。</span></div>
    </div>
    <Footer source='`S9_Slides.pdf` · §Layered vs DDD' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 嚴格分層 vs 實用主義</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='嚴格分層好處' items={['邊界清楚 · 新人快', '單元測試容易', '各層可獨立替換', '權責分明']} />
        <TradeoffCol tone='#E8634F' title='嚴格分層代價' items={['簡單 CRUD 也要寫 3 套類', '跨層 mapping 耗時', '效能略損（多層調用）', '對小專案是過度設計']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：小型內部工具 50 個 endpoint，每個都做完整 3 層 + DTO mapping。半年後沒人想維護。</Callout>
    </div>
    <Footer source='`S9_Slides.pdf` · §Strict vs Pragmatic' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='Layered Architecture 完' subtitle='骨架立了，下一站講原則。' next='6.2 SOLID + DI</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 06 · TOPIC 02' title='SOLID + DI' subtitle='鬆耦合的兩條腿' />
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 SOLID 是 OOP 命脈？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>不照 SOLID 寫的程式碼：
- 改 A 模組壞 B 模組
- 加新功能要動 10 個地方
- 沒法寫單元測試

<strong>SOLID 不是學院派——是工程師對「未來的自己」的承諾。</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>不必每條都 100% 遵循</li>
          <li>但每條被違反時必須<strong>有意識</strong></li>
          <li>自動化執行：用 linter / sonar 抓味道</li>
        </ul>
    </div>
    <Footer source='`S10_Slides.pdf` · §SOLID Why' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · SOLID 五原則速覽</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>原則</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>名稱</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>S</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Single Responsibility</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一個 class 只有一個改變的理由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>O</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Open/Closed</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對擴展開放，對修改關閉</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>L</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Liskov Substitution</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>子類能無痛替換父類</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>I</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Interface Segregation</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>多個小介面 &gt; 一個大介面</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>D</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Dependency Inversion</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>依賴抽象，不依賴具體</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：<strong>單 / 擴 / 替 / 隔 / 倒</strong>。記不住順序沒關係——記住每條解決什麼痛。</span></div>
    </div>
    <Footer source='`S10_Slides.pdf` · §SOLID Detail' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · DI 是 D 的落地</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   違反 D：
   class OrderService {
       constructor() {
           this.db = new PostgreSQL()  ← 內部 new ← 死耦合
       }
   }

   遵循 D：
   class OrderService {
       constructor(db: Database) {     ← 介面注入 ← 鬆耦合
           this.db = db
       }
   }

   測試時可注入 MockDatabase
   切換 DB 不必改 service`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>洞察</strong>：DI = SOLID 的 D 在語言層面的具體實踐。
DI 容器（Spring / NestJS）只是錦上添花，<strong>手動 DI 也是 DI</strong>。</Callout>
    </div>
    <Footer source='`S10_Slides.pdf` · §DI Implementation' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · SOLID 違反訊號（味道）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='S 違反' text='class 名稱有「and」(UserAndOrderService)' />
        <StackRow tone='#A1813F' label='O 違反' text='加新功能要 if/else 一堆型別檢查' />
        <StackRow tone='#5B7570' label='L 違反' text='子類 override 時拋 NotSupportedException' />
        <StackRow tone='#5B9770' label='I 違反' text='implement 一個介面但一半 method 拋 null' />
        <StackRow tone='#5B9770' label='D 違反' text='class 內部 new 出第三方 SDK 物件' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>看到這些訊號 → 停下來重構。不是潔癖，是預防未來 debug 災難。</strong></span></div>
    </div>
    <Footer source='`S10_Slides.pdf` · §Code Smells' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 全套 SOLID vs 實用主義</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該嚴格遵循' items={['公開 API 邊界', '核心業務邏輯', '需多種實作的介面', '長期維護的系統']} />
        <TradeoffCol tone='#E8634F' title='可以放寬' items={['內部 utility', 'POC 程式碼', '純資料容器 (DTO)', '50 行內的小腳本']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：每個 class 都包成 4 個介面 + 5 個 abstract——讀程式碼像穿迷宮。<strong>過度抽象 = 自虐。</strong></Callout>
    </div>
    <Footer source='`S10_Slides.pdf` · §SOLID Pragmatism' />
  </div>
);


const P21: Page = () => (
  <SectionEnd title='SOLID + DI 完' subtitle='鬆耦合到手，下一站看 GoF。' next='6.3 GoF Patterns</span>' />
);


const P22: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 06 · TOPIC 03' title='GoF Patterns' subtitle='23 個經典，先學會這 8 個' />
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 30 年前的模式仍然必修？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>GoF 23 個模式 = 一套<strong>通用詞彙</strong>。
你說「這裡用 Strategy」，全世界工程師（和 AI）秒懂。
你說「這裡寫一個 switch 把所有 case 列出來」——
要解釋 5 分鐘。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>模式 ≠ 死記硬背</li>
          <li>模式 = <strong>解決方案的命名</strong></li>
          <li>命名 = 溝通效率的指數加速</li>
        </ul>
    </div>
    <Footer source='`Design+Patterns.pdf` · §Why GoF' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 必學 8 個模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>模式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>類型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>解決什麼</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>範例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Factory</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Creational</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>解耦「建立」與「使用」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DB connection factory</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Singleton</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Creational</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全域唯一 instance</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Logger / Config</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Builder</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Creational</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>步驟建構複雜物件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SQL query builder</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Adapter</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Structural</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>接舊介面 / 第三方</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Stripe → Payment interface</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Repository</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Structural</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>包裝資料存取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>UserRepo · OrderRepo</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Strategy</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Behavioral</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>演算法可替換</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>折扣計算 / 排序</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Observer</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Behavioral</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>事件通知</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>UI 監聽 / pub-sub</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Command</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Behavioral</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>把操作物件化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Undo / Queue / Replay</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>先學會這 8 個</strong> → 涵蓋 80% 工作場景。剩下 15 個遇到再查。</span></div>
    </div>
    <Footer source='`Design+Patterns.pdf` · §Top 8 Patterns' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三大類別的精神</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='Creational（建立）' text='怎麼新建物件 · 隱藏 new 的細節' />
        <StackRow tone='#A1813F' label='Structural（結構）' text='怎麼組合物件 · 改變介面或互相關係' />
        <StackRow tone='#5B7570' label='Behavioral（行為）' text='怎麼讓物件互動 · 演算法與職責的分配' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>判斷模式類型</strong>：
- 解決「怎麼生」的問題 → Creational
- 解決「怎麼接」的問題 → Structural
- 解決「怎麼動」的問題 → Behavioral</Callout>
    </div>
    <Footer source='`Design+Patterns.pdf` · §Three Categories' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 對應 AI 溝通範例</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ❌ 沒模式詞彙
   ──────────
   "幫我寫一個函式，傳入訂單後，根據是否 VIP
    用不同方式計算折扣，未來可能會加新規則..."

   ✅ 用模式詞彙
   ──────────
   "用 Strategy pattern 實作 DiscountStrategy
    介面，提供 VIPStrategy 和 RegularStrategy
    兩個實作"

   結果：AI 第二種一次就對，第一種要疊代 3 次`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這就是「模式」對 AI 時代架構師的意義</strong>——把溝通成本降到最低。</span></div>
    </div>
    <Footer source='`Design+Patterns.pdf` · §AI Prompt Efficiency' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 模式狂熱 vs 模式盲目</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該用模式' items={['邏輯有 3+ 個變種', '需要可擴展性', '有跨團隊溝通', '未來會接更多場景']} />
        <TradeoffCol tone='#E8634F' title='不該硬套模式' items={['只有 1 種變種', '50 行能解決', '純資料轉換', 'POC 探索階段']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：簡單 if/else 硬包成 Strategy + Factory + Singleton。讀者 5 分鐘才看出來「原來只是 2 個 case」。<strong>過度模式化 = 過度複雜。</strong></Callout>
    </div>
    <Footer source='`Design+Patterns.pdf` · §Pattern Abuse' />
  </div>
);


const P28: Page = () => (
  <SectionEnd title='GoF Patterns 完' subtitle='模式詞彙到手，章末收斂。' next='Ch.6 Recap</span>' />
);


const P29: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 06 · RECAP' title='Components & Patterns 收斂' subtitle='把分層 + SOLID + 模式串成一個 service' />
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE · 拍賣 App 的 Order Service 設計</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   Presentation (Controller)
        ↓                                          ← REST API
   Application (UseCase)         "PlaceBid"        ← 業務流程
        ↓
   Domain (Aggregate)             Order, Bid       ← 商業規則
        ↓
   Infrastructure (Repository)    OrderRepo        ← 資料存取
        ↓
   External Adapter               PaymentAdapter   ← 第三方`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>層</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>套用的模式</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Application</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Command (PlaceBidCommand)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Domain</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Factory (Order.create) · Strategy (BidValidationStrategy)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Repository</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Repository · Specification</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Adapter</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Adapter (Stripe → Payment interface)</div>
        </div>
    </div>
    <Footer source='整合 Ch.6 三主題 + 拍賣業務典型架構' />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第六章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['3 + 4 層架構標準', 'SOLID 五原則 + DI', '8 個必學 GoF 模式', '味道偵測清單']} />
        <TradeoffCol tone='#E8634F' title='還沒回答的問題' items={['系統怎麼撐百萬用戶？　→ Ch.7', '分散式怎麼處理一致性？　→ Ch.7', '微服務何時值得？　→ Ch.8', '實戰演練？　→ Ch.9']} />
      </div>
  </div>
);


const P32: Page = () => (
  <SectionEnd title='Ch.6 完' subtitle='模式詞彙到手，下一站做架構。' next='Ch.7 System Architecture</span>' />
);


export const meta: SlideMeta = { title: 'Ch.6 · 元件與模式' };
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
] satisfies Page[];
