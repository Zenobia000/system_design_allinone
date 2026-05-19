import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_01_state_machine from './assets/01_state_machine.png';

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
  <ChapterDivider eyebrow='CHAPTER · 04 · OVERVIEW' title='SA' subtitle='建築師·把需求翻成系統規格' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>METAPHOR ANCHOR</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>SA = 建築師（平面圖）</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 蓋房子對應</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='' text='PM　 建案企劃——決定要蓋什麼' />
        <StackRow tone='#A1813F' label='' text='UX / UI　 室內設計師——動線與樣品屋' />
        <StackRow tone='#5B7570' label='SA ← 你在這' text='建築師——跟業務 / PM 對齊機能、畫平面圖' />
        <StackRow tone='#5B9770' label='' text='Architect / SD / Dev / QA / DevOps　 結構技師 / 施工圖 / 工班' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>一句話</strong>：把業務需求翻譯成系統規格——補規則、補例外、補狀態。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SA · System Analyst' />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>真實 SA 一天大概在幹嘛</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 一天時間分配</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   寫規格 / 畫流程        ████████████   35%
   跟 PM / 業務確認需求    ███████        20%
   跟 Architect / Dev 對齊  ██████         18%
   研究現況系統 / 資料      █████          15%
   畫狀態圖 / 權限矩陣      ████           10%
   補例外情境              ██              5%`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反差</strong>：SA 不寫 code，但寫的規格決定 Dev 要寫的每一個 if/else。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SA 經典產出' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>看完 Ch.4 你能回答</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① SA 到底做什麼？' text='為什麼「補規則的縫隙」是核心' />
        <StackRow tone='#A1813F' label='② 經典產出有哪些？' text='Use Case / State / Rule / Exception' />
        <StackRow tone='#5B7570' label='③ SA vs Architect 差在哪？' text='規則 vs 結構，功能 vs 撐住' />
        <StackRow tone='#5B9770' label='④ SA vs PM 差在哪？' text='What 跟 How system behaves' />
      </div>
    <Footer source='_source/braindump.md · §SA vs Architect' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='看完角色，看具體產出。' next='4.1 SA 經典產出</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 04 · TOPIC 01' title='SA 經典產出' subtitle='補規則的縫隙·六個經典產出' />
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · INSIGHT</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>SA 在補「規則的縫隙」</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 核心心法</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>PM 說：「做一個訂單系統。」
UX 畫了結帳流程。

<strong>但沒人說</strong>：30 分鐘不付款怎辦？付完才發現庫存不夠怎辦？
退款超過 7 天還能退嗎？

<strong>這些縫隙 SA 必須補完，Dev 才寫得下去。</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：SA = <strong>補規則的縫隙</strong>——把模糊的需求變成不會卡住的系統。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SA · System Analyst' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 6 個經典產出</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>產出</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話用途</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>看起來像什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Use Case</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>使用案例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>UML use case 圖 + 描述表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>State Diagram</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>狀態轉換</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>圓圈 + 箭頭（pending→paid）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Business Rule</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>商業規則</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>條列式規則清單</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Data Dictionary</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料字典</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>欄位 + 型別 + 約束表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Permission Matrix</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>權限矩陣</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>角色 × 操作的核取表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Exception Flow</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>例外流程</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>失敗 / 邊界情境流程圖</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Use Case 是 SA 的靈魂</strong>——其他五個都是把 Use Case 拆細的副產物。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SA 經典產出' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 訂單狀態實例</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`pending_payment → paid → preparing → shipped → completed`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>SA 補的規則</strong>（這才是 SA 的價值）：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>若 <strong>30 分鐘內未付款</strong> → 自動取消訂單</li>
          <li>若 <strong>付款成功但庫存不足</strong> → 進入人工處理</li>
          <li>若 <strong>使用者取消但商品已出貨</strong> → 不允許取消</li>
          <li>若 <strong>退款申請超過 7 天</strong> → 不允許退款</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'>PM 給的只是箭頭，<strong>SA 給的是箭頭旁邊的條件</strong>——這是新手最容易漏掉的層次。</Callout>
    </div>
    <Footer source='_source/braindump.md · §SA 補規則的範例' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_state_machine} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 為何 AI 取代不了</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>AI 寫得出 Use Case，但寫不出</strong>：

- 這家公司「退款 7 天」是業界慣例還是公司政策？
- 超商取貨逾期沒拿，要不要罰錢？罰多少？
- 海外訂單跟國內訂單規則一樣嗎？</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>領域知識</strong>：電商 / 金融 / 醫療每行規則不同</li>
          <li><strong>邊界情境</strong>：靠經驗想到「萬一 A 又 B 又 C 怎辦」</li>
          <li><strong>跨部門協調</strong>：跟客服 / 法務 / 財務確認規則</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>AI 幫你<strong>整理</strong>已知規則很快，但<strong>挖出未知規則</strong>還是要靠人問、靠人想。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P13: Page = () => (
  <SectionEnd title='Outputs 完' subtitle='產出講完，看 SA 跟誰打交道。' next='4.2 SA 邊界</span>' />
);


const P14: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 04 · TOPIC 02' title='SA 邊界' subtitle='跟哪些人打交道·誰主導什麼' />
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHO</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>SA 上下游關係</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 上下游</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`        PM（What / Why）
              │
              ▼
        ┌──────────┐
        │    SA    │ ← 你在這
        └──────────┘
              │
       ┌──────┼──────┐
       ▼      ▼      ▼
   Architect  SD    Dev
   (撐住)  (拆模組) (實作)`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>SA 上游</strong>：PM 的 What。<strong>下游</strong>：Architect / SD / Dev 的 How。SA 是<strong>業務語言到技術語言的翻譯層</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §責任鏈' />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · SA vs Architect</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>面向</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>SA</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Architect</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>核心任務</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分析需求、定義系統規格</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>設計架構、控制複雜度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>主要關心</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>功能 / 流程 / 規則 / 資料</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>邊界 / 擴充 / 維運</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>輸入</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PM 需求 / 業務流程</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SA 規格 / NFR / 現況</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>輸出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>功能規格 / 流程圖 / 資料字典</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>架構圖 / 服務邊界 / 技術決策</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>問題語言</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>這流程<strong>怎麼跑</strong>？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>這系統<strong>怎麼撐</strong>？</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心</strong>：SA 管「系統應該<strong>做什麼</strong>」；Architect 管「系統應該<strong>怎麼活下去</strong>」。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SA vs Architect' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>決策樹</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 誰主導什麼</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='SA 主導' items={['Use Case 與業務規則', '狀態轉換與例外流程', '資料欄位與權限矩陣', '跨系統介接需求', '規則的邊界情境']} />
        <TradeoffCol tone='#E8634F' title='SA 不主導（但要懂）' items={['技術選型（Architect）', '模組拆分（SD）', 'UI 細節（UX/UI）', '商業 KPI（PM）', 'DB schema 細節（DBA）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>陷阱</strong>：SA 寫「用 Redis cache」就越界了——SA 該寫的是「這查詢必須 &lt; 1 秒」，怎麼做是 Architect 決定。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SA vs Architect' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 實務場景</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>場景</strong>：客服工單系統，PM 說「逾期未處理要警示」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>新手 SA 會這樣寫</strong>：「逾期就跳警告」。
→ 沒問<strong>逾期多久</strong>、<strong>警示給誰</strong>、<strong>多久檢查一次</strong>。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>成熟 SA 會這樣補</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>逾期 24h</strong> → SLA warning → 通知工單主管</li>
          <li><strong>逾期 48h</strong> → SLA breach → 通知部門經理 + 紀錄 KPI</li>
          <li><strong>客戶主動催</strong> → 升級為 priority high</li>
          <li><strong>狀態 = closed 但客戶回信</strong> → 自動 reopen</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這就是 SA 的價值</strong>：把「警示」這個模糊規則拆成可實作的時間軸與條件。</span></div>
    </div>
    <Footer source='_source/braindump.md · §客服工單系統實例' />
  </div>
);


const P19: Page = () => (
  <SectionEnd title='Boundary 完' subtitle='邊界講完，收成口訣。' next='4.99 Recap</span>' />
);


const P20: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 04 · RECAP' title='SA · 回顧' subtitle='三句口訣 · 下一站' />
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>MNEMONICS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 Ch.4 收成三句話</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 三句口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣 1</strong>：<strong>SA 在補規則的縫隙</strong>——PM 給箭頭，SA 給箭頭旁邊的條件。</Callout>
      <Callout tone='#D97757'><strong>口訣 2</strong>：<strong>SA 管系統怎麼跑、Architect 管系統怎麼活</strong>——功能 vs 撐住。</Callout>
      <Callout tone='#D97757'><strong>口訣 3</strong>：<strong>Use Case 是 SA 的靈魂</strong>——其他產出都是把它拆細的副產物。</Callout>
    </div>
    <Footer source='_source/braindump.md · §SA vs Architect' />
  </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · SA Cheatsheet 卡</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>內容</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>蓋房子對應</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>建築師（平面圖）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>一句話定義</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>把業務需求翻譯成系統規格</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>降低的不確定性</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>業務規則不確定性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>經典產出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Use Case / State / Rule / Data Dict / Permission / Exception</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>主要工具</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Confluence / Visio / draw.io / PlantUML / Mermaid</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AI 取代不了的</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>領域知識 / 邊界情境 / 跨部門協調</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>常見誤解</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「SA = 寫文件的」「SA 跟 PM 一樣」「SA = Architect」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>下一個碰到的角色</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Architect（決定系統怎麼撐住）</div>
        </div>
    <Footer source='_source/braindump.md · §角色 = 消除不確定性（核心思想）' />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Ch.5：Architect · 結構技師</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 下一站</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#5B7570'>SA 寫完「30 分鐘未付款自動取消」規則，現在問題變成：

- 訂單量百萬級時，這 30 分鐘掃描怎麼做才不會卡死？
- 服務要拆嗎？訂單跟付款分開好還是合一好？
- 高峰一秒一千單，系統撐得住嗎？
- 萬一付款服務掛了，訂單還能進嗎？

<strong>這些都是 Architect 的事</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>承先啟後</strong>：SA 給「系統應該做什麼」，Architect 給「系統應該怎麼活下去」。</span></div>
    </div>
    <Footer source='_source/braindump.md · §架構師視角' />
  </div>
);


const P24: Page = () => (
  <SectionEnd title='Ch.4 完' subtitle='SA 講完，看 Architect。' next='Ch.5 Architect</span>' />
);


export const meta: SlideMeta = { title: 'Ch.4 · SA' };
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
] satisfies Page[];
