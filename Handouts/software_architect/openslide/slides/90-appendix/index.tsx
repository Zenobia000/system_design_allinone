import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_capstone_01_architecture_concept from './assets/00_capstone_01_architecture_concept.png';
import img_00_capstone_hero from './assets/00_capstone_hero.png';
import img_01_cheatsheet_hero from './assets/01_cheatsheet_hero.png';

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
  <ChapterDivider eyebrow='APPENDIX · 00 · CAPSTONE' title='Capstone Case Study' subtitle='把整本書用在一個系統設計面試題' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_capstone_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_capstone_01_architecture_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PROBLEM · 題目</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>面試官</strong>：
&gt; 請設計一個全球版的 Uber Eats 競品。
&gt; 預計 1000 萬 DAU、覆蓋 5 大洲、即時派單、訂單金流、商家入駐。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>45 分鐘</strong> · 白板畫圖 + 講解 trade-off</div>
    </div>
    <Footer source='整合 Ch.1-10 + 業界面試題庫' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STEP 1 · REQUIREMENTS（5 分鐘）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   功能 (Functional)
   ── 顧客下單 → 派單 → 配送追蹤 → 評價
   ── 商家接單 → 製餐 → 出餐
   ── 外送員領單 → 取餐 → 送達
   ── 即時定位、推播、金流

   非功能 (NFR)
   ── 1000 萬 DAU · peak 5000 訂單/秒
   ── P99 訂單建立 < 500ms
   ── 99.95% availability
   ── 即時定位更新 < 5s
   ── 多區、合規 (GDPR / PCI)`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Ch.2 的功夫</strong>——把模糊問題拆成可量化指標。</span></div>
    </div>
    <Footer source='Ch.2 + 系統設計面試框架' />
  </div>
);


const P06: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STEP 2 · ESTIMATION（3 分鐘）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   寫入 QPS
   ── 訂單寫入: 5000 / sec
   ── 位置更新: 100k 外送員 × 1/5s = 20k / sec
   ── 總: ~25k QPS peak

   儲存
   ── 訂單: 5000 × 86400 × 1KB ≈ 432 GB/day
   ── 5 年保留: ~800 TB
   ── 位置軌跡: 短保留 (30 天) ~ 5 TB

   頻寬
   ── 推播 + 即時定位: ~5 Gbps peak`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Ch.2 §3 的速算</strong>——架構師面試必背的公式。</span></div>
    </div>
    <Footer source='Ch.2 §Throughput' />
  </div>
);


const P07: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STEP 3 · HIGH-LEVEL（15 分鐘）</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   [Mobile/Web Clients]
           │
      [CDN + Edge]                  ← Ch.4 靜態 + 邊緣
           │
      [API Gateway]                 ← Ch.7 LB + auth
           │
   ┌───────┴───────┐
   ▼               ▼
 [Order Svc]    [Driver Svc]        ← Ch.6 Modular Monolith
   │               │
   ▼               ▼
 [PostgreSQL] [Redis Geo]           ← Ch.4 Polyglot
   │
   ▼
 [Kafka] ──→ [Match Svc]            ← Ch.7 異步派單
              [Notify Svc]
              [Analytics]`}</pre>
    <Footer source='Ch.6 + Ch.7 組合' />
  </div>
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>即時派單演算法</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STEP 4 · DEEP DIVE（15 分鐘）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 地理索引' text='H3 / Geohash · Redis GEORADIUS' />
        <StackRow tone='#A1813F' label='② 候選人篩選' text='5km 內活躍司機 · 評分排序' />
        <StackRow tone='#5B7570' label='② 派發策略' text='連續通知 3 人 · 5 秒 timeout · 下一輪' />
        <StackRow tone='#5B9770' label='④ 鎖機制' text='Redis SETNX 防止重複派單' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>關鍵</strong>：分散式鎖 + 即時定位 + retry——三件 Ch.7 學的功夫合用。</Callout>
    </div>
    <Footer source='Ch.7 §Cache + Ch.6 §Strategy Pattern' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>STEP 5 · TRADE-OFFS（7 分鐘）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='本架構強項' items={['Stateless · 水平擴展容易', 'Polyglot 存儲適配多場景', '異步派單耐流量尖峰', '多區域 + CDN 加速']} />
        <TradeoffCol tone='#E8634F' title='本架構弱點' items={['Kafka SPOF 風險（需 3-broker）', '跨區域一致性弱（接受最終一致）', '派單演算法需迭代優化', '金流需獨立服務（Ch.8 拆）']} />
      </div>
      <Callout tone='#E8634F'><strong>面試金句</strong>：「在 X 約束下我選 Y，犧牲 Z。如果規模到 100M DAU，會考慮把金流拆成獨立服務 + Saga」</Callout>
    </div>
    <Footer source='整合 Ch.1-10' />
  </div>
);


const P10: Page = () => (
  <SectionEnd title='Capstone 完' subtitle='45 分鐘走完，下一站速查表。' next='91 Cheatsheet</span>' />
);


const P11: Page = () => (
  <ChapterDivider eyebrow='APPENDIX · 01 · CHEATSHEET' title='Architect Cheatsheet' subtitle='面試 / 工作時，1 分鐘可以查到的決策表' />
);


const P12: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_cheatsheet_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEX · 速查表目錄</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① NFR 量化六問' text='把形容詞變數字' />
        <StackRow tone='#A1813F' label='② SLA 9 對照表' text='必背' />
        <StackRow tone='#5B7570' label='③ DB 選型決策樹' text='' />
        <StackRow tone='#5B9770' label='④ 進階模式判斷表' text='' />
        <StackRow tone='#5B9770' label='⑤ ADR 範本' text='' />
        <StackRow tone='#5B9770' label='⑥ 面試 5 步驟 SOP' text='' />
      </div>
    <Footer source='提煉自 Ch.1-10 全部章節' />
  </div>
);


const P14: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>① NFR 量化六問</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>模糊形容詞</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>逼問的問題</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>期望輸出</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「要很快」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>P50? P99? 同步異步？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>P99 &lt; 200ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「要穩定」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>容忍幾分鐘停機？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.95%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「人會很多」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DAU? Peak QPS？成長？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100k DAU · 5k QPS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「資料很多」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每日新增? 保留多久？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1GB/day · 5 年</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「全球用」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>哪些地區? 合規？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>NA/EU/APAC · GDPR</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「會擴展」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>6 個月? 上限？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10× · 1M 上限</div>
        </div>
    <Footer source='Ch.2 §1' />
  </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>② SLA 9 對照表</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Uptime</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一年</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一月</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>等級</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>87.6 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>7.3 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MVP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.9%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>8.76 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>43.8 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>標準 SaaS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.95%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>4.38 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>21.9 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>業界中段</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.99%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>52.6 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>4.38 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AWS / GCP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.999%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>5.26 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>26.3 s</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>電信 / 金融</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣</strong>：每多 1 個 9，<strong>成本 × 2-5 倍</strong>。99.9% 已涵蓋 95% 系統。</Callout>
    </div>
    <Footer source='Ch.2 §2' />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ DB 選型決策樹</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   需要 ACID 事務 / 複雜 join？
   ├─ 是 → PostgreSQL（先選）/ MySQL
   │
   └─ 否 → 看主要查詢模式
           │
           ├─ KV 等值查詢 → Redis / DynamoDB
           ├─ 巢狀文件 → MongoDB
           ├─ 寫多 + 線性擴展 → Cassandra
           ├─ 全文搜尋 → Elasticsearch
           ├─ 多跳關係 → Neo4j
           ├─ 時序 metric → TimescaleDB / InfluxDB
           └─ 向量相似 → pgvector / Pinecone`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：先 PG · 撞牆再換 · 90% 永遠撞不到。</span></div>
    </div>
    <Footer source='Ch.4 §2' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>④ 進階模式判斷表</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>模式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>該用的訊號</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>不該用的訊號</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Microservices</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>團隊 &gt; 30 · K8s 熟</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>&lt; 15 人 · 沒 observability</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Event Sourcing</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>合規需軌跡 · 業務本質事件流</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一般 CRUD · 查詢複雜</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>CQRS</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀寫比 &gt; 100:1 · 多 projection</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>&lt; 10:1 · 簡單 CRUD</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Saga</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨服務事務</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>單服務內 transaction</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Modular Monolith</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>大多數情況</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>真正需要獨立部署時</div>
        </div>
    <Footer source='Ch.8 全章' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>ADR-N · 標題</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>⑤ ADR 範本</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`

Status: Accepted | Superseded | Deprecated
Date:   2026-MM-DD
Decider: @architect-name

## Context
為什麼有這個決策需求？

## Decision
我們決定...

## Consequences
+ 好處 1
+ 好處 2
− 壞處 1
− 壞處 2

## Alternatives Considered
- 方案 B：...為何拒絕
- 方案 C：...為何拒絕`}</pre>
    <Footer source='Ch.3 §3' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>⑥ 面試 5 步驟 SOP</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ① REQUIREMENTS    3-5 min  · 功能 + NFR + 規模假設
   ② ESTIMATION      2-3 min  · QPS / storage / bandwidth
   ③ HIGH-LEVEL      10-15 min · 5-7 個方塊 + 資料流
   ④ DEEP DIVE       15-20 min · 1-2 個 component 深挖
   ⑤ TRADE-OFFS      5-10 min · 哪邊壞了會怎樣`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>第 3-4 步驟在畫圖</strong>。前 2 步驟「設定情境」，第 5 步驟「展現深度」。</Callout>
    </div>
    <Footer source='Capstone §Method' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INTERVIEW · 答題金句</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='不確定時' text='「我假設 X，如果 Y 我會改成 Z」' />
        <StackRow tone='#A1813F' label='講選型' text='「我選 A 因為 B，但 C 場景會選 D」' />
        <StackRow tone='#5B7570' label='主動提失敗' text='「如果 cache 掛了，這裡會...」' />
        <StackRow tone='#5B9770' label='承認局限' text='「這個方案在 X 情況下會失效」' />
        <StackRow tone='#5B9770' label='引用真實系統' text='「Uber 的做法是... 因為...」' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試官最怕</strong>：講 best practice 但講不出 trade-off。<strong>講出 trade-off 就 senior 了。</strong></span></div>
    </div>
    <Footer source='整合 Ch.1-10' />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ANTI-PATTERNS · 反模式清單</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>這些做法經驗證會失敗</strong></Callout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 3 人團隊上微服務' text='維運時間 > 業務時間' />
        <StackRow tone='#A1813F' label='② MVP 直接 Event Sourcing' text='過度設計、學習曲線炸鍋' />
        <StackRow tone='#5B7570' label='③ Cassandra 存帳戶餘額' text='雙花災難' />
        <StackRow tone='#5B9770' label='④ 用 Word 寫架構決策' text='一個月後就失同步' />
        <StackRow tone='#5B9770' label='⑤ 「未來會大」過早優化' text='上線晚 6 個月、用戶流失' />
        <StackRow tone='#5B9770' label='⑥ 選技術只看「酷不酷」' text='招不到人 + vendor lock-in' />
      </div>
    </div>
    <Footer source='整合 Ch.1-10 反模式區' />
  </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 一頁速查總覽</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='Decision Tools' items={['NFR 量化六問', '9 對照表', 'DB 選型決策樹', '進階模式判斷表', 'ADR 範本']} />
        <TradeoffCol tone='#E8634F' title='Communication Tools' items={['5 個影響力工具', '4 角色溝通對照', '金字塔結構', '面試 5 步驟 SOP', '5 句答題金句']} />
      </div>
  </div>
);


const P23: Page = () => (
  <SectionEnd title='Cheatsheet 完' subtitle='該記的都在這了。' />
);


export const meta: SlideMeta = { title: 'Appendix · 速查表' };
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
] satisfies Page[];
