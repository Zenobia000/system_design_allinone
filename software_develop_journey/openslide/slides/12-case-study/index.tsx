import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_01_ecommerce_gantt from './assets/01_ecommerce_gantt.png';
import img_02_latency_contract from './assets/02_latency_contract.png';
import img_02_livestream_gantt from './assets/02_livestream_gantt.png';
import img_03_ai_video_gantt from './assets/03_ai_video_gantt.png';
import img_03_defining_good from './assets/03_defining_good.png';

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
  <ChapterDivider eyebrow='CHAPTER · 12 · OVERVIEW' title='Case Study' subtitle='同一套角色·三種人生' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHY THESE THREE</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三個系統 = 三種典型挑戰</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為什麼挑這三個</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 電商訂單' text='OLTP 經典——交易、狀態、一致性' />
        <StackRow tone='#A1813F' label='② 直播串流' text='即時系統——低延遲、CDN、突發流量' />
        <StackRow tone='#5B7570' label='③ AI 影視生成' text='非同步系統——長任務、GPU 排程、成本' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這三個<strong>幾乎沒有共同點</strong>——但同樣需要 9 個角色，只是<strong>每個角色的重量會漂移</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例' />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>本章的視覺骨架</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TEMPLATE · 九角色甘特帶</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`角色          投入度
──────────────────────────────────
PM            ████████████████
UX            ████████████████
UI            ████████████████
SA            ████████████████
Architect     ████████████████
SD            ████████████████
DBA           ████████████████
Dev           ████████████████
QA            ████████████████
DevOps        ████████████████
──────────────────────────────────`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這是<strong>空白模板</strong>——下面三個系統會分別填上「不同的粗細」，一眼看出重心。</span></div>
    </div>
    <Footer source='_source/braindump.md · §角色全景' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PREVIEW · 三系統一覽</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='電商 · Baseline' items={['9 角色平均出力', '核心：狀態一致性', '關鍵 hook：訂單完成 ≠ 付款成功', '適合先讀完整跑']} />
        <TradeoffCol tone='#E8634F' title='直播 / AI · 差異化' items={['同一套角色，不同重點', '直播：延遲是跨角色合約', 'AI 影視：PM 寫不出驗收', '讀完看出「漂移」']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>讀法建議</strong>：先看完 12.1 電商當 baseline，再讀 12.2 / 12.3 才有對照感。</span></div>
    </div>
    <Footer source='_source/braindump.md · §直播串流系統挑戰' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='從電商開始跑一遍。' next='12.1 電商訂單系統</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 12 · TOPIC 01' title='電商訂單系統' subtitle='Baseline · 心臟在 SA · DBA · QA' />
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>投入度：SDLC 標準練習題</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ECOMM · 甘特帶</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`角色          投入度 (0–10)
──────────────────────────────────
PM            ████████████        6
UX            ██████████████      7
UI            ██████████          5
SA            ████████████████   ★ 8
Architect     ██████████████      7
SD            ████████████        6
DBA           ████████████████   ★ 8
Dev           ████████████        6
QA            ████████████████   ★ 8
DevOps        ██████████████      7
──────────────────────────────────
心臟：狀態機（SA）· 對帳（DBA）· 邊界驗證（QA）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>為什麼這三個是心臟</strong>：訂單 7 狀態的轉換規則由 SA 補完、跨服務一致性靠 DBA 守、邊界 case 由 QA 找漏；少一個就上線翻車。</span></div>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_ecommerce_gantt} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CORE INSIGHT</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>訂單完成 ≠ 付款成功</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ECOMM · KEY HOOK</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>新手以為</strong>：訂單完成 = 用戶按了「付款」按鈕。
<strong>真相</strong>：訂單有 <strong>7 個狀態</strong>，每個狀態轉換都是一個<strong>事務邊界</strong>。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   pending_payment ──► paid ──► preparing ──► shipped
                                                 │
                                                 ▼
                                            delivered ──► completed
                                                 │
                                                 ▼
                                            returned ──► refunded`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這個狀態機就是電商的業務</strong>——所有角色都圍繞它展開。</span></div>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PM · UX · SA 怎麼出力</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ECOMM · Discovery Swim-Lane</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='PM' text='定義 7 個狀態的商業意義 · 退款政策 · KPI（訂單完成率）' />
        <StackRow tone='#A1813F' label='UX' text='商品 → 購物車 → 結帳 → 付款 → 訂單頁的動線 · 失敗時的引導' />
        <StackRow tone='#5B7570' label='SA' text='狀態轉換規則 · 30 分鐘未付款自動取消 · 出貨後不能取消 · 7 天內可退款' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>最容易漏的</strong>：例外情境——付款成功但庫存不足、退款超過 7 天、商品已出貨但要取消。SA 把這些「縫隙」補滿。</Callout>
    </div>
    <Footer source='_source/braindump.md · §SA 補規則的範例' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Architect · SD · DBA 怎麼出力</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ECOMM · Design Swim-Lane</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='Architect' text='切服務（Order / Payment / Inventory / Notification）· 同步 vs 非同步' />
        <StackRow tone='#A1813F' label='SD' text='CreateOrder / CancelOrder / RefundOrder API · idempotency key · sequence diagram' />
        <StackRow tone='#5B7570' label='DBA' text='orders / order_items / payment_records 表 · partition by created_at · index 策略' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#5B7570'><strong>Architect 最重要的決策</strong>：付款 + 庫存 + 訂單<strong>跨服務一致性</strong>——選 Saga / Outbox / Eventual Consistency。</Callout>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Dev · QA · DevOps 怎麼出力</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ECOMM · Build &amp; Run Swim-Lane</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='Dev' text='實作 7 狀態機 · idempotent payment callback · 前端訂單追蹤頁' />
        <StackRow tone='#A1813F' label='QA' text='邊界測試（庫存不足、付款超時、退款逾期、雙重點擊）· 對帳測試' />
        <StackRow tone='#5B7570' label='DevOps' text='每日對帳 job · 付款失敗告警 · 訂單異常 SLA · 退款延遲告警' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>電商最痛的上線後問題</strong>：對帳——金流商說付了、訂單顯示未付、客戶投訴。<strong>沒有對帳 job = 信用炸光</strong>。</Callout>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='電商 完' subtitle='Baseline 跑完，看直播差在哪。' next='12.2 直播串流</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 12 · TOPIC 02' title='直播串流平台' subtitle='Differential · 延遲是跨角色合約' />
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>投入度：SA / Architect / DevOps 特粗</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STREAM · 甘特帶</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`角色          投入度 (0–10)
──────────────────────────────────
PM            ██████████          5
UX            ██████████          5
UI            ██████████          5
SA            ████████████        6
Architect     ████████████████████ ★★★ 10
SD            ██████████████      7
DBA           ██████              3
Dev           ████████████        6
QA            ██████████████      7
DevOps        ████████████████████ ★★★ 10
──────────────────────────────────
心臟：延遲合約（Architect）· 24/7 容量（DevOps）· DBA 反而輕`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>為什麼漂移</strong>：直播的命脈是「延遲」「突發流量」「邊緣節點」——Architect / DevOps 暴增到 10，DBA 因為走 cache + queue 反而降到 3。</span></div>
    </div>
    <Footer source='_source/braindump.md · §直播串流系統挑戰' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_livestream_gantt} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>哪些一樣，哪些變了</h1>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STREAM · vs 電商</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>面向</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>電商</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>直播</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一致性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>強一致（金流）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最終一致（觀看人數可以差幾秒）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫入模式</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訂單事件批次寫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>心跳 / 進房 / 彈幕高頻寫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀取模式</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訂單頁查詢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>影音 stream + 聊天即時</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主要挑戰</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對帳 / 退款</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>卡頓 / 突發流量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DBA 角色</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主角（資料正確）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>配角（快取 + queue 為主）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Architect 角色</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中等（切服務）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主角（CDN + 邊緣 + 容量）</div>
        </div>
    <Footer source='_source/braindump.md · §直播串流系統挑戰' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CORE INSIGHT</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>延遲是跨角色合約</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STREAM · KEY HOOK</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>新手以為</strong>：「卡頓」是 Architect 一個人的責任。
<strong>真相</strong>：延遲是<strong>五人合約</strong>——任何一個人沒守住，使用者就會抱怨「卡」。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   PM        產品定義「< 3s 才算可用」
    +
   UX        loading 動畫掩飾首段 1 秒
    +
   Architect CDN 邊緣節點 / HLS chunk 策略
    +
   SD        chunk size 多大、buffer 多少
    +
   DevOps    容量預測 / autoscale / 邊緣節點規劃`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：NFR 不是 Architect 的專利，是<strong>跨角色契約</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §直播串流系統挑戰' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_latency_contract} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>千人變十萬人，誰負責</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STREAM · 突發流量怎麼擋</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>情境</strong>：某網紅突然開播，觀看人數 1 分鐘內 1 千人 → 10 萬人</Callout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='PM' text='定義 SLO：99% 觀眾 buffering &lt; 2s' />
        <StackRow tone='#A1813F' label='Architect' text='邊緣節點預配 + CDN 接管 + 主源 fallback' />
        <StackRow tone='#5B7570' label='DevOps' text='即時 autoscale + 預警閾值 + on-call 鏈' />
        <StackRow tone='#5B9770' label='SRE' text='容量演練 + chaos engineering + 災難切換' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>直播跟電商最大的差別</strong>：電商是「對得起每一筆訂單」，直播是「不卡每一個觀眾」——前者是正確性，後者是體驗。</span></div>
    </div>
    <Footer source='_source/braindump.md · §直播串流系統挑戰' />
  </div>
);


const P22: Page = () => (
  <SectionEnd title='直播 完' subtitle='延遲合約講完，看 AI 影視最難的地方。' next='12.3 AI 影視</span>' />
);


const P23: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 12 · TOPIC 03' title='AI 影視生成' subtitle='Differential · QA 從驗證已知變成定義未知' />
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>投入度：PM / DBA / DevOps 特粗</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>AIVID · 甘特帶</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`角色          投入度 (0–10)
──────────────────────────────────
PM            ████████████████████ ★★★ 10
UX            ██████████          5
UI            ████████████        6
SA            ████████████        6
Architect     ████████████████    8
SD            ████████████        6
DBA           ██████████████████ ★★  9
Dev           ████████████        6
QA            ██████████████████ ★  9（角色變了）
DevOps        ████████████████████ ★★★ 10
──────────────────────────────────
心臟：定義「好」（PM）· 模型 / 成本 / 用量（DBA + DevOps）· QA 變定義者`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>為什麼漂移</strong>：AI 影視最反直覺——PM 寫不出「好」的驗收條件，所以 QA 從「驗證已知」變成「定義未知」（設計人評流程 + metric）。DBA 守模型版本與 GPU 成本，DevOps 養 GPU 池。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 影視生成挑戰' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_ai_video_gantt} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>哪些一樣，哪些變了</h1>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>AIVID · vs 電商</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>面向</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>電商</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>AI 影視</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>任務時間</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>毫秒級</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分鐘到小時級（非同步）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>驗收條件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「訂單成立」可寫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「生得好」寫不出來</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>成本模型</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每筆訂單成本固定</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每次生成 GPU 成本浮動</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主要挑戰</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對帳 / 退款</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>成本失控 / 模型品質</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>QA 工作</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>驗證已知行為</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>定義未知標準</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DBA 工作</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訂單表 / 索引</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>模型版本 / 生成記錄 / GPU 用量</div>
        </div>
    <Footer source='_source/braindump.md · §AI 影視生成挑戰' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CORE INSIGHT</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PM 寫不出驗收條件</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>AIVID · KEY HOOK</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>電商</strong>：「按下付款 → 收到 email」——可驗收。
<strong>AI 影視</strong>：「生得好」——怎麼驗？

「好」的定義要靠：

- <strong>QA 設計人類評分流程</strong>（盲測 / 評分卡 / 多人共識）
- <strong>Data Scientist 設計 metric</strong>（FID / CLIP score / 人臉一致性）
- <strong>每次模型更新就要重做</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：在 AI 系統裡，<strong>QA 從「驗證已知」變成「定義未知」</strong>——這是角色職責<strong>隨領域漂移</strong>最強的例子。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 影視生成挑戰' />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_defining_good} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>一次生成 $0.5，1 萬用戶誰擋</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>AIVID · 成本失控怎麼擋</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>情境</strong>：模型每次推論 GPU 成本 $0.5，免費試用一天被刷 1 萬次 → $5,000 / 天</Callout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='PM' text='定價策略：每月配額 / 訂閱 vs 按次計費 / 試用上限' />
        <StackRow tone='#A1813F' label='Architect' text='排隊系統 + 優先級分流（免費 vs 付費）' />
        <StackRow tone='#5B7570' label='DBA' text='GPU 用量記錄 / 模型版本 / 用戶配額追蹤' />
        <StackRow tone='#5B9770' label='DevOps' text='GPU 池 autoscale + 用量告警 + 成本 daily report' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>最反直覺</strong>：在 AI 系統裡，<strong>成本控制不是 DevOps 一個人的事</strong>——PM 要先定義「值不值得」，否則 DevOps 怎麼擋都擋不住。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 影視生成挑戰' />
  </div>
);


const P30: Page = () => (
  <SectionEnd title='AI 影視 完' subtitle='三系統都看過，收成 3×3 對照。' next='12.4 比較矩陣</span>' />
);


const P31: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 12 · TOPIC 04' title='三系統比較' subtitle='同一招的三種長相' />
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>SDLC 三階段 × 三系統</h1>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>COMPARE · 3 × 3 矩陣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>階段</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>電商</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>直播</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>AI 影視</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Discovery</strong>（PM/UX/SA）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>狀態一致性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>延遲合約</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>定義「好」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Design</strong>（Arch/SD/DBA）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>事務 + 冪等</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CDN + 邊緣</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>非同步 + GPU 池</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Build &amp; Run</strong>（Dev/QA/DevOps）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>退款對帳</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>突發流量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>成本失控</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>讀法</strong>：9 個 cell 各對應一個核心挑戰——同一套角色，三種完全不同的「最痛點」。</span></div>
    </div>
    <Footer source='_source/braindump.md · §三系統 3×3 比較矩陣' />
  </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>「冪等」（Idempotency）在三系統</h1>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>COMPARE · 同一招的三種長相</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>系統</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>冪等出現在哪</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>為什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>電商</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Payment Callback API</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>金流商可能重送 callback，不能重複扣款</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>直播</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>進房 / 心跳 API</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>網路不穩會重試，不能重複計人數</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AI 影視</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>生成任務 submit API</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>用戶可能 double-click，不能重複收費</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#5B7570'><strong>同一個技術概念</strong>（冪等），<strong>三個截然不同的業務動機</strong>——但都是「網路重試造成重複動作」這個問題的不同臉孔。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>架構師的價值</strong>：能把同一招套到不同領域——這就是<strong>模式語言</strong>的力量。</span></div>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例' />
  </div>
);


const P34: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>COMPARE · 三大發現</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>發現 1</strong>：<strong>角色不變、權重會變</strong>——9 個角色一個都不能少，但每個系統的「重心」不同。</Callout>
      <Callout tone='#D97757'><strong>發現 2</strong>：<strong>NFR 是跨角色合約</strong>——延遲、成本、可靠性不是 Architect 一人的事。</Callout>
      <Callout tone='#D97757'><strong>發現 3</strong>：<strong>領域變化會讓角色職責漂移</strong>——AI 影視裡 QA 從驗證變成「定義」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這就是本教材想證明的事</strong>：軟體工程的角色框架是<strong>通用</strong>的，但<strong>應用是領域特化</strong>的。</span></div>
    </div>
    <Footer source='_source/braindump.md · §結語' />
  </div>
);


const P35: Page = () => (
  <SectionEnd title='Comparison 完' subtitle='三系統看完，最後收成口訣。' next='12.99 Recap</span>' />
);


const P36: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 12 · RECAP' title='Case Study · 回顧' subtitle='三句口訣·全書尾聲' />
);


const P37: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>MNEMONICS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 Ch.12 收成三句話</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 三句口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣 1</strong>：<strong>角色不變、權重會變</strong>——9 個角色一個都不能少。</Callout>
      <Callout tone='#D97757'><strong>口訣 2</strong>：<strong>NFR 是跨角色合約</strong>——延遲、成本、可靠性不是 Architect 一人的事。</Callout>
      <Callout tone='#D97757'><strong>口訣 3</strong>：<strong>未知領域裡，QA 從「驗證已知」變成「定義未知」</strong>——這是角色漂移最強的例子。</Callout>
    </div>
    <Footer source='_source/braindump.md · §AI 影視生成挑戰' />
  </div>
);


const P38: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>你看完這 12 章 = 你會了什麼</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 全書收尾</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 地圖感' text='9 個角色 + 蓋大樓比喻 + SDLC 完整流程' />
        <StackRow tone='#A1813F' label='② 邊界感' text='SA vs PM、SD vs Architect、DBA 不是倉管' />
        <StackRow tone='#5B7570' label='③ 協作感' text='三層 Flow 翻譯、Overlap matrix、三場衝突戲' />
        <StackRow tone='#5B9770' label='④ 實戰感' text='同一套角色，三系統證明通用' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>自我測試</strong>：對著小白用一句話講「軟體工程的本質」——說得出<strong>管理複雜度</strong> + <strong>降低不確定性</strong>就過關。</span></div>
    </div>
    <Footer source='_source/braindump.md · §結語' />
  </div>
);


const P39: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>下一步建議</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 接下來去哪裡</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#5B7570'><strong>想搞懂架構設計細節</strong>？
→ 跳到姊妹專案 `software_architect/ppt/`（10 章深度教材）</Callout>
      <Callout tone='#5B7570'><strong>想深挖某角色</strong>？
→ 看該角色的官方資源：PM (Marty Cagan)、Architect (Mark Richards)、SRE (Google SRE Book)</Callout>
      <Callout tone='#5B7570'><strong>想實際練手</strong>？
→ 找一個小專案，從 PM 視角寫 PRD → 自己當 SA / Architect / Dev 一路跑完。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>最後一句</strong>：軟體開發不會因為 AI 變簡單，<strong>只會把判斷力變得更稀缺</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P40: Page = () => (
  <SectionEnd title='Ch.12 完 · 本書結束' subtitle='附錄收尾。' next='90 Appendix</span>' />
);


export const meta: SlideMeta = { title: 'Ch.12 · 案例研究' };
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
  P34,
  P35,
  P36,
  P37,
  P38,
  P39,
  P40,
] satisfies Page[];
