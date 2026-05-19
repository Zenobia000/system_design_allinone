import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_01_data_lifeline from './assets/01_data_lifeline.png';

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
  <ChapterDivider eyebrow='CHAPTER · 07 · OVERVIEW' title='DBA' subtitle='資料生命線·不是倉管' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>METAPHOR ANCHOR</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>DBA = 地基 + 水塔 + 管線總圖</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 蓋房子對應</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='' text='PM / UX / SA　 決定要蓋什麼、規則怎麼跑' />
        <StackRow tone='#A1813F' label='' text='Architect / SD　 決定結構、模組、API' />
        <StackRow tone='#5B7570' label='DBA ← 你在這' text='守住地基、水塔、管線總圖' />
        <StackRow tone='#5B9770' label='' text='Dev / QA / DevOps　 工班 / 驗收 / 物業' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>一句話</strong>：守住資料正確性、效能、可靠性的最後一道防線。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DBA · 資料生命線' />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 為什麼 DBA 不是倉管</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>最常見誤解</strong>：以為 DBA 就是「幫你建表」「幫你跑備份」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>倉管：把貨放進去、有人來領、登記一下。
DBA：當訂單湧入、查詢變慢、磁碟掛掉、資料對不上時——<strong>整間公司營運就斷在這</strong>。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>資料一旦壞掉，下游全錯</strong>（金額、庫存、稽核）</li>
          <li><strong>效能一旦塌，產品直接死</strong>（query 一慢 → API timeout → 用戶流失）</li>
          <li><strong>備份一旦失效，公司可能直接倒</strong>（勒索病毒、誤刪、機房災難）</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：DBA 不是建表的人，是<strong>守住資料生命線</strong>的人。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DBA 守住的是資料生命線' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>真實 DBA 一天大概在幹嘛</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 一天時間分配</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   Schema / Index Review     ████████      25%
   慢查詢 / 效能 tuning      ███████       22%
   備份 / 還原演練           █████         15%
   On-call / 救火            █████         15%
   跟 Dev / Architect 對齊   ████          12%
   容量規劃 / 容災演練       ███           8%
   稽核 / 權限 / 合規        █             3%`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反差</strong>：寫的 SQL 量不一定比 Dev 多，但每一條 SQL 都可能讓整個系統卡住。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DBA 介入時機' />
  </div>
);


const P06: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>看完 Ch.7 你能回答</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 為什麼 DBA 不是倉管？' text='資料生命線是什麼意思' />
        <StackRow tone='#A1813F' label='② DBA 的 5 個經典產出？' text='ERD / Index / Tx / Backup / Governance' />
        <StackRow tone='#5B7570' label='③ DBA vs Architect vs Dev？' text='誰決定資料歸屬、誰決定怎麼存' />
        <StackRow tone='#5B9770' label='④ 查詢上線後變慢，誰救？' text='DBA 怎麼介入' />
      </div>
    <Footer source='_source/braindump.md · §DBA · 資料生命線' />
  </div>
);


const P07: Page = () => (
  <SectionEnd title='Overview 完' subtitle='看完角色，看具體產出。' next='7.1 DBA 經典產出</span>' />
);


const P08: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 07 · TOPIC 01' title='DBA 經典產出' subtitle='資料怎麼存·怎麼活·怎麼回得來' />
);


const P09: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_data_lifeline} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · DELIVERABLES</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>DBA 不是只交一張表</h1>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 5 個經典產出</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>產出</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話用途</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>看起來像什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>ERD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料實體關聯圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>dbdiagram.io / draw.io 圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Schema + Index</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>表結構 + 索引策略</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DDL 腳本 + 索引註解</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Transaction 策略</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>多步驟一致性方案</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Saga / Outbox / 鎖表規則</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Backup Plan</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>備份還原計劃</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>RPO / RTO / PITR 文件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Data Governance</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>保留 / 稽核 / 權限</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>retention policy + ACL</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心</strong>：DBA 不是寫 `CREATE TABLE` 完就結束，是把這 5 件事連在一起設計。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DBA 介入時機' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · ERD / Schema 長這樣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌─────────────┐         ┌──────────────┐
│   orders    │ 1     N │ order_items  │
├─────────────┤────────►├──────────────┤
│ order_no PK │         │ id PK        │
│ user_id FK  │         │ order_no FK  │
│ status      │         │ sku_id FK    │
│ created_at  │         │ qty / price  │
└─────────────┘         └──────────────┘
        │
        │ 1     N
        ▼
┌─────────────┐
│payment_recs │   index: (status, updated_at)
├─────────────┤   index: (user_id, created_at)
│ id PK       │   partition: by created_at (month)
│ order_no FK │
│ amount      │
└─────────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>重點不在畫得漂亮</strong>，而是：寫入瓶頸在哪？查詢熱點是什麼？要不要 partition？</span></div>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例（Ch.12 baseline）' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 複合索引與一致性</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>索引不是越多越好</strong>——每加一個索引，寫入就慢一點。
複合索引的<strong>欄位順序</strong>會決定它能不能被用上。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>例</strong>：`(status, updated_at)` vs `(updated_at, status)`
→ 查「待處理的最新訂單」用前者；查「最近一週的所有訂單」用後者。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>一致性</strong>：訂單付款扣庫存——同一個 transaction 還是分散在兩個服務？</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>單庫</strong>：用 DB transaction 鎖一鎖就好</li>
          <li><strong>跨服務</strong>：必須用 <strong>Saga / Outbox Pattern</strong> 補償，不能假裝 transaction 存在</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這就是 DBA 的判斷</strong>：哪裡能鎖、哪裡不能鎖、哪裡要補償。</span></div>
    </div>
    <Footer source='_source/braindump.md · §訂單系統實例（Ch.12 baseline）' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 為何 AI 取代不了</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>AI 寫得出 DDL，但寫不出</strong>：

- 這個欄位要不要建索引？建了寫入會慢多少？
- 這張表三年後會長到多大？要不要 partition？
- 這個 transaction 邊界畫在哪裡才不會死鎖？</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>業務 context</strong>：訂單跟金流不是技術問題，是業務一致性問題</li>
          <li><strong>效能經驗</strong>：慢查詢一看 execution plan 就知道哪錯</li>
          <li><strong>災難判斷</strong>：備份還原不是「有跑就好」，是「真出事還回得來」</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>AI 是 DBA 的助手——它幫你<strong>寫</strong>得快，不幫你<strong>判斷</strong>資料對不對得回來。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='Outputs 完' subtitle='產出講完，看 DBA 跟誰打交道。' next='7.2 DBA 邊界</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 07 · TOPIC 02' title='DBA 邊界' subtitle='資料歸屬 vs 資料怎麼存' />
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHO</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>DBA 上下游關係</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 上下游</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`       Architect（決定資料歸屬）
              │
              ▼
        ┌──────────┐
        │   DBA    │ ← 你在這
        └──────────┘
              │
        ┌─────┼─────┬──────┐
        ▼     ▼     ▼      ▼
       SD    Dev   QA    DevOps`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>DBA 上游</strong>：Architect 告訴 DBA「哪些服務該擁有哪些資料」。<strong>下游</strong>：所有要碰 DB 的人。</span></div>
    </div>
    <Footer source='_source/braindump.md · §責任鏈' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 容易搞混的角色</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>角色</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>跟 DBA 差在哪</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Architect</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>決定「資料歸屬哪個服務」、邊界在哪；DBA 不碰服務切分</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Data Engineer</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>偏 ETL / Pipeline / Data Warehouse；DBA 偏 OLTP 線上庫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Data Architect</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>偏資料模型策略、跨系統一致性；小公司常與 DBA 合併</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Dev</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Dev 寫 query、設計小表；DBA 確保 query 跑得動、表撐得住</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DevOps</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DevOps 管 DB 的 infra（VM / K8s / 備份排程）；DBA 管 DB 本身</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心</strong>：小公司一個 DBA 包山包海；大公司 OLTP DBA / Data Engineer / Data Architect 完全分開。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DBA · 資料生命線' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>決策樹</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 誰主導什麼</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='DBA 主導' items={['Schema / 欄位型別', 'Index 策略（哪些、順序）', 'Partition / Sharding', '備份 / 還原 / DR', '慢查詢調校']} />
        <TradeoffCol tone='#E8634F' title='DBA 不主導（但要參與）' items={['資料歸屬哪個服務（Architect）', 'API 設計（SD）', '業務規則細節（SA）', '應用層 cache（Dev / Architect）', 'DB 主機部署（DevOps）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>陷阱</strong>：DBA 越界決定「該不該拆服務」會踩到 Architect；Dev 越界決定 index 順序會踩到 DBA。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SA vs Architect' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 實務場景</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>場景</strong>：Dev 寫了個查詢上線後變慢，從 50ms 飆到 3 秒。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>新手作法</strong>：把 query 改一改、加個 index 就推上去。
→ 沒看 <strong>execution plan</strong>、沒測<strong>寫入影響</strong>、沒問<strong>這個 query 多常跑</strong>。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>成熟 DBA 作法</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>看 execution plan：是 table scan 還是用錯 index？</li>
          <li>看 query 頻率：一天跑 10 次還是 10 萬次？</li>
          <li>看現有 index：能不能加欄位變成<strong>覆蓋索引</strong>？</li>
          <li>看寫入成本：新增 index 會讓 INSERT 慢多少？</li>
          <li>給 Dev 兩個方案：「<strong>改 query 不動 schema</strong>」vs「<strong>加複合索引但寫入 -3%</strong>」</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這就是 DBA 的價值</strong>：不是改一改 SQL，是<strong>用數據說話</strong>做取捨。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DBA 介入時機' />
  </div>
);


const P20: Page = () => (
  <SectionEnd title='Boundary 完' subtitle='邊界講完，收成口訣。' next='7.99 Recap</span>' />
);


const P21: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 07 · RECAP' title='DBA · 回顧' subtitle='三句口訣 · 下一站' />
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>MNEMONICS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 Ch.7 收成三句話</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 三句口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣 1</strong>：DBA 不只是建表，是<strong>守住資料生命線</strong>。</Callout>
      <Callout tone='#D97757'><strong>口訣 2</strong>：Schema 不是技術問題，是<strong>業務問題</strong>——欄位怎麼切，影響的是金錢與稽核。</Callout>
      <Callout tone='#D97757'><strong>口訣 3</strong>：備份不是有就好，是<strong>還原得回來才算</strong>。</Callout>
    </div>
    <Footer source='_source/braindump.md · §三句口訣' />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · DBA Cheatsheet 卡</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>內容</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>蓋房子對應</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>地基 + 水塔 + 管線總圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>一句話定義</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>守住資料正確性、效能、可靠性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>降低的不確定性</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料正確性、效能、可靠性風險</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>經典產出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ERD / Schema+Index / Tx 策略 / Backup / Governance</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>主要工具</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>dbdiagram / pt-query-digest / pgBadger / Liquibase</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AI 取代不了的</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>業務 context / 效能直覺 / 災難判斷</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>常見誤解</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「DBA = 倉管」「DBA = 跑備份的」「DBA = CREATE TABLE 的人」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>下一個碰到的角色</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Dev（把 schema 變成可運行的 code）</div>
        </div>
    <Footer source='_source/braindump.md · §DBA · 資料生命線' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Ch.8：Dev · 工班師傅</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 下一站</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#5B7570'>DBA 給了 schema、index、transaction 策略，現在問題變成：

- 怎麼把 schema 翻成 ORM model？
- Service / Repository 怎麼切？
- 怎麼寫 unit test？
- query 怎麼放才能命中索引？

<strong>這些都是 Dev 的事</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>承先啟後</strong>：DBA 給的是資料的家，Dev 把所有業務邏輯真的長在這個家裡。</span></div>
    </div>
    <Footer source='_source/braindump.md · §Developer 視角' />
  </div>
);


const P25: Page = () => (
  <SectionEnd title='Ch.7 完' subtitle='DBA 講完，看 Dev。' next='Ch.8 Developer</span>' />
);


export const meta: SlideMeta = { title: 'Ch.7 · DBA / Data' };
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
] satisfies Page[];
