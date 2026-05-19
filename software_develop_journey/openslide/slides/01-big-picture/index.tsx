import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_01_building_metaphor from './assets/01_building_metaphor.png';
import img_02_sdlc_map from './assets/02_sdlc_map.png';

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
  <ChapterDivider eyebrow='CHAPTER · 01 · OVERVIEW' title='Big Picture' subtitle='先看整張藍圖，再放大每個角色' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>看完本章，你能回答：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 為什麼軟體開發像蓋大樓？' text='一個貫穿全書的比喻' />
        <StackRow tone='#A1813F' label='② SDLC 完整流程長怎樣？' text='商業需求 → 維運的 10 個階段' />
        <StackRow tone='#5B7570' label='③ 為什麼需要這麼多角色？' text='不確定性階梯' />
        <StackRow tone='#5B9770' label='④ AI 來了，這套會變嗎？' text='變的是工具，不變的是判斷' />
      </div>
    </div>
    <Footer source='_source/braindump.md · §蓋大樓比喻全景' />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 一句話本質</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌─────────────────────────────────────────────────────┐
│  軟體工程的本質 = 管理複雜度                          │
├─────────────────────────────────────────────────────┤
│  每個角色 = 降低一種特定的不確定性                    │
├─────────────────────────────────────────────────────┤
│  協作 = 三層 flow 翻譯：                              │
│         User Flow → System Flow → Architecture Flow │
└─────────────────────────────────────────────────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>接下來三張頁</strong>：把這三句話展開成你能用的 mental model。</span></div>
    </div>
    <Footer source='_source/braindump.md · §結語' />
  </div>
);


const P05: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先看蓋大樓比喻，再看 SDLC 地圖。' next='1.1 蓋大樓比喻</span>' />
);


const P06: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 01 · TOPIC 01' title='蓋大樓比喻' subtitle='9 個角色一字排開' />
);


const P07: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHY</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為什麼要用「蓋大樓」當比喻？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>METAPHOR · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>因為蓋一棟商業大樓，跟做一個軟體系統，遇到的問題長一模一樣</strong>：

要有人定義「為何而蓋」、有人「畫圖」、有人「算結構」、
有人「畫管線」、有人「真的施工」、有人「驗收」、有人「日常維護」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>軟體開發不是「一個聰明工程師」的事</li>
          <li>它是<strong>多種專業協作</strong>的工程</li>
          <li>比喻讓你<strong>不用懂程式</strong>就能掌握角色分工</li>
        </ul>
    </div>
    <Footer source='_source/braindump.md · §一句話本質' />
  </div>
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>METAPHOR · 9 角色全景</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>軟體角色</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>蓋房子對應</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>PM</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>建案企劃 / 開發 PM</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>代理甲方·決定要蓋什麼樓、賣給誰</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>UX/UI</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>室內設計師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>設計動線、樣品屋、客戶體驗</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>建築師（平面圖）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跟甲方對齊機能、畫平面圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Architect</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>結構技師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>承重、耐震、防火、未來擴建</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>施工圖繪製師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>把建築圖拆成可施工的細部圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DBA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>地基 + 水塔 + 管線總圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料是建物命脈（不是倉管）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Dev</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>工班師傅</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>真的把樓蓋起來</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>QA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>驗收員</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>檢查門會不會打不開、結構合規</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DevOps / SRE</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>物業管理 + 24h 保全 + 消防</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上線後持續維運</div>
        </div>
    <Footer source='_source/braindump.md · §蓋大樓比喻全景' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_building_metaphor} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>蓋大樓 vs 蓋系統</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>METAPHOR · 流程像不像？</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`業務/客戶（甲方）──────────  「我要在這蓋一棟百貨公司」
   │
   ▼
建案企劃 (PM)    ──────────  「給誰、戶型、KPI、ROI」
   │
   ▼
室內設計 (UX/UI) ──────────  「客人怎麼逛才不迷路？」
   │
   ▼
建築師 (SA)      ──────────  「平面圖：幾層樓、每層做什麼」
   │
   ▼
結構技師 (Arch)  ──────────  「承重、耐震、未來能不能加蓋」
   │
   ▼
施工圖 (SD)      ──────────  「每根樑、每根柱、每條管線的細部」
   │
   ▼
地基 (DBA)       ──────────  「資料是樓的命脈，先打好」
   │
   ▼
工班 (Dev) → 驗收 (QA) → 物業 (DevOps)   完工 → 開幕 → 維運`}</pre>
    <Footer source='_source/braindump.md · §SDLC 全流程' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>METAPHOR · 三個常見誤解</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>誤解 1</strong>：DBA = 倉管 ❌
真相：DBA 是地基 + 水塔 + 管線總圖——資料是命脈，不是被動存放。</Callout>
      <Callout tone='#E8634F'><strong>誤解 2</strong>：Dev = 工人（有貶意）❌
真相：Dev 是專業工班師傅——蓋樓的技術門檻不比設計低。</Callout>
      <Callout tone='#E8634F'><strong>誤解 3</strong>：DevOps = 水電工 ❌
真相：DevOps 是物業管理 + 24h 保全 + 消防——是<strong>持續維運</strong>，不是一次性。</Callout>
    </div>
    <Footer source='_source/braindump.md · §蓋大樓比喻全景' />
  </div>
);


const P12: Page = () => (
  <SectionEnd title='蓋大樓比喻 完' subtitle='比喻定錨，看 SDLC 完整流程。' next='1.2 SDLC 地圖</span>' />
);


const P13: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 01 · TOPIC 02' title='SDLC 完整地圖' subtitle='Software Development Lifecycle' />
);


const P14: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHY</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為什麼要看「整張流程」？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SDLC · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>因為小白最容易犯的錯，就是只看到一個切片</strong>：
看到 PM 就以為是寫 Excel 的、看到工程師就以為都在寫 code、
看到 DevOps 就以為是 IT。

<strong>整張地圖看下來</strong>，你才知道每個角色卡在哪一段。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這張地圖是經典 Waterfall + Agile 混合視角——實務上不會這麼線性，但邏輯關係是真的。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SDLC 全流程' />
  </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SDLC · 完整流程</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   商業需求
      ↓
   需求分析（PM）              「為什麼要做」
      ↓
   體驗設計（UX / UI）         「使用者怎麼走」
      ↓
   系統分析（SA）              「系統怎麼判斷」
      ↓
   架構設計（Architect）       「系統怎麼活下去」
      ↓
   技術設計（SD）              「模組怎麼長」
      ↓
   資料庫設計（DBA）           「資料怎麼存」
      ↓
   前後端開發（Dev）           「真的把它做出來」
      ↓
   測試（QA）                  「確認沒壞」
      ↓
   部署（DevOps）              「上線」
      ↓
   維運（SRE）                 「活著」
      ↓
   迭代（回到 PM）             「持續演進」`}</pre>
    <Footer source='_source/braindump.md · §SDLC 全流程' />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_sdlc_map} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Waterfall vs Agile</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SDLC · 兩種開發節奏</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='Waterfall（瀑布）' items={['階段清楚、文件重', '大公司、政府專案愛用', '需求穩定時最有效', '適合 1 年以上專案', '反向找 bug 很貴']} />
        <TradeoffCol tone='#E8634F' title='Agile（敏捷）' items={['小步快跑、快速迭代', '新創、互聯網主流', '需求易變時有效', 'Sprint 2 週為單位', '文件少、要靠對話']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>兩者都需要 9 個角色——只是<strong>節奏與文件量不同</strong>。本教材以 Agile 為主，但概念兩邊都通用。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SDLC · 實務上不是線性</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>真實的開發節奏</strong>：箭頭會往回拉。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   PM 寫 PRD  ─────►  UX 拉 Wireframe  ─────►  SA 分析
                                                  │
   ◄────────────  「這個流程行不通」（往回打）  ─┘
                                                  │
   ◄────────────  「成本太高，PM 要重排優先級」 ─┘
                                                  │
   Architect 出架構  ◄──────  SA 對齊 ◄─────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>新手最大的誤解</strong>：以為流程是一條單線。真實是<strong>多向回饋的網狀</strong>。Ch.11 會講協作怎麼跑。</span></div>
    </div>
    <Footer source='_source/braindump.md · §三層 flow 翻譯' />
  </div>
);


const P19: Page = () => (
  <SectionEnd title='SDLC 地圖 完' subtitle='地圖看完，問為什麼要這麼多角色。' next='1.3 不確定性階梯</span>' />
);


const P20: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 01 · TOPIC 03' title='不確定性階梯' subtitle='每個角色降低一種風險' />
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHY</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為什麼角色「越多越好」是錯的？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LADDER · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>新手以為</strong>：每多一個人就多分擔工作。
<strong>真相</strong>：每多一個<strong>角色</strong>，是多消除一種<strong>特定的不確定性</strong>。

少一個角色，那種不確定性就<strong>沒人負責</strong>——就會在某天爆炸。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這個 mental model 就是整本教材的<strong>核心金句</strong>：「<strong>角色不是用職稱分，而是用負責消除哪種不確定性來分</strong>」。</span></div>
    </div>
    <Footer source='_source/braindump.md · §角色 = 消除不確定性' />
  </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LADDER · 9 種不確定性</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>角色</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>不確定性</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>沒這角色會發生什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>PM</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>商業價值</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>做出沒人要的東西</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>UX</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>使用者行為</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>沒人會用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>UI</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>視覺呈現</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>醜到丟臉</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>業務規則</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上線後一堆 edge case 沒人想到</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Architect</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統演進</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>流量大就掛、改一行炸全套</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>開發落地</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>工程師卡在「怎麼接」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DBA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料正確性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訂單對不上、查詢變超慢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Dev</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>實作正確性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫出 bug</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>QA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>結果正確性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>bug 流到正式環境</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DevOps</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上線運行</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上線當天炸、半夜叫起來</div>
        </div>
    <Footer source='_source/braindump.md · §角色 = 消除不確定性' />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>越上游越抽象，越下游越具體</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LADDER · 不確定性的「方向性」</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`PM        ◄──────  最抽象（商業價值）
 │
 ▼        翻譯
UX / SA   ◄──────  使用者 / 業務邏輯
 │
 ▼        翻譯
Architect / SD / DBA  ◄──  系統 / 模組 / 資料
 │
 ▼        翻譯
Dev / QA / DevOps  ◄──────  最具體（代碼 / 測試 / 機器）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>翻譯</strong>這個動作就是 SDLC 的本質。每翻一次就降低一層不確定性。</span></div>
    </div>
    <Footer source='_source/braindump.md · §三層 flow 翻譯' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LADDER · AI 改變了什麼</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>AI 改變了最下游兩層</strong>：

- <strong>Dev</strong>：AI 可以幫你寫 80% 的 code
- <strong>QA</strong>：AI 可以生成測試案例

但<strong>上面 7 層幾乎沒變</strong>——因為那些是「<strong>定義問題</strong>」「<strong>控制複雜度</strong>」的工作。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#5B7570'><strong>核心金句</strong>：AI 把實作能力變成 commodity，把<strong>判斷能力</strong>變得更稀缺。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>所以 PM / Architect / SA / DBA 這些「上游角色」在 AI 時代<strong>反而更值錢</strong>——他們是 AI 用得好不好的決定者。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P25: Page = () => (
  <SectionEnd title='不確定性階梯 完' subtitle='Big Picture 三件事講完。' next='1.99 Recap</span>' />
);


const P26: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 01 · RECAP' title='Big Picture · 回顧' subtitle='三句口訣 · 接下來去哪裡' />
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>MNEMONICS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 Ch.1 收成三句話</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 三句口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣 1</strong>：軟體工程的本質是<strong>管理複雜度</strong>。</Callout>
      <Callout tone='#D97757'><strong>口訣 2</strong>：角色不是用職稱分，而是用負責消除哪一種<strong>不確定性</strong>來分。</Callout>
      <Callout tone='#D97757'><strong>口訣 3</strong>：開發流程 = 三層翻譯——
<strong>User Flow → System Flow → Architecture Flow</strong>。</Callout>
    </div>
    <Footer source='_source/braindump.md · §三句口訣' />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三件事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 你現在應該能說出</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 軟體開發像蓋大樓' text='9 個角色一字排開，缺一不可' />
        <StackRow tone='#A1813F' label='② SDLC 是有方向的' text='商業 → 系統 → 模組 → 代碼，越往下越具體' />
        <StackRow tone='#5B7570' label='③ 角色 = 不確定性' text='少一個角色，就有一種風險沒人擋' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>自我測試</strong>：用一句話告訴小白「為什麼要這麼多角色」——說得出來就過關。</span></div>
    </div>
    <Footer source='_source/braindump.md · §結語' />
  </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Ch.2 開始，每個角色一張特寫</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 接下來怎麼讀</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#5B7570'>從 Ch.2 開始，會用<strong>同一個節奏</strong>介紹 9 個角色：
<strong>overview → outputs → boundary → recap</strong>

第二章看完你會建立節奏預期——後續章節讀起來像聽熟悉的副歌。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>第一站</strong>：PM——蓋大樓的建案企劃。為什麼客戶說的話<strong>不是真需求</strong>？</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 視角' />
  </div>
);


const P30: Page = () => (
  <SectionEnd title='Ch.1 完' subtitle='Big Picture 結束，9 角色特寫開始。' next='Ch.2 PM</span>' />
);


export const meta: SlideMeta = { title: 'Ch.1 · 全局視角' };
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
] satisfies Page[];
