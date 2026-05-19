import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';


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
  <ChapterDivider eyebrow={'CAPSTONE · 90'} title={'Capstone Case Studies'} subtitle={'用 5 個經典案例把 Ch.1–7 全部串起來'} />
);


const P02: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>看完本章，你能：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 從 0 開始拆解 5 種經典系統'} text={'URL / Social / Geo / Chat / RAG'} />
        <StackRow tone='#A1813F' label={'② 在每個案例中辨認 Ch.1–7 的觀念'} text={'把概念落到具體決策'} />
        <StackRow tone='#5B7570' label={'③ 跑完 4 步驟設計流程'} text={'Requirement → Estimation → Sketch → Deep dive'} />
        <StackRow tone='#5B9770' label={'④ 學會說出 trade-off 而非「最佳實踐」'} text={'面試官真正在意的'} />
      </div>
    </div>
    <Footer source={'整合 Ch.1–7 + 業界公開系統架構（Twitter / Uber / Slack / Netflix）'} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>METHOD · 系統設計 4 步驟</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌──────────────────────────────────────────────────┐
│  ① REQUIREMENT     功能 / 非功能 / 規模假設      │
├──────────────────────────────────────────────────┤
│  ② ESTIMATION      QPS / Storage / Bandwidth     │
├──────────────────────────────────────────────────┤
│  ③ HIGH-LEVEL      畫 5-7 個方塊的 sketch        │
├──────────────────────────────────────────────────┤
│  ④ DEEP DIVE       對 1-2 個關鍵組件深挖         │
└──────────────────────────────────────────────────┘
            遵循順序，不要跳步驟`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試最常見的失敗</strong>：跳過 1、2 直接開始畫。沒搞清楚要做什麼之前，畫得再花俏都是錯的。</span></div>
    </div>
    <Footer source={'整合 Ch.1 + 03_mental_model'} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CASE STUDY · 1 (簡單)</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>bit.ly · 短網址系統</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 1 · URL Shortener</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>功能</strong>：長 URL → 短碼（7 位） · 點擊跳轉 · 統計</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>規模假設</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>寫：100 URL/s（每天 ~ 8.6M）</li>
          <li>讀：1000 click/s（讀:寫 = 10:1）</li>
          <li>5 年累積：~ 16B 條 URL</li>
        </ul>
    </div>
    <Footer source={'整合 Ch.1（Foundation）+ Ch.3（Cache）'} />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>算清楚規模</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 1 · Estimation</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'QPS'} text={'寫 100/s · 讀 1000/s · peak ×3 = 3000/s'} />
        <StackRow tone='#A1813F' label={'Storage'} text={'16B × 500 bytes = 8 TB · 不算多'} />
        <StackRow tone='#5B7570' label={'Bandwidth'} text={'1000 reads/s × 500 bytes = 500 KB/s · 微小'} />
        <StackRow tone='#5B9770' label={'Cache'} text={'80/20 → 熱資料 ~ 3.2B × 500 bytes ≈ 1.6 TB（過大）→ 取 top 1% = 16 GB'} />
      </div>
    <Footer source={'Ch.2 Numbers · Ch.3 Cache 容量規劃'} />
  </div>
);


const P06: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>系統 Sketch</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 1 · High-level</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`                                  ┌─→ Redis Cache（熱 URL）
                                  │
[Browser] → [CDN] → [API GW] → [App] → [Postgres / DynamoDB]
                                  │           ↑ shard by short_code
                                  └─→ Kafka → ClickHouse（統計）`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'讀路徑'} text={'CDN（304）→ Cache（hit 95%+）→ DB'} />
        <StackRow tone='#A1813F' label={'寫路徑'} text={'App 產生 short_code → DB unique constraint'} />
        <StackRow tone='#5B7570' label={'分析'} text={'click event → Kafka → 異步寫 ClickHouse'} />
      </div>
    </div>
    <Footer source={'Ch.4 GW · Ch.6 CDN · Ch.7 Pipeline'} />
  </div>
);


const P07: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Short Code 怎麼產？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 1 · Deep Dive</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'① Hash + 取前 7 位'} items={['MD5(url)[:7]', '同 url → 同 short', '容易碰撞，要重試']} />
        <TradeoffCol tone='#E8634F' title={'② Base62 編碼遞增 ID'} items={['分散式 ID 產生器（Snowflake）', '無碰撞、可排序', '會洩漏「總量」資訊']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>業界常用方案 ②</strong>：用 Snowflake 產生 64-bit ID，base62 後取 7 位 = 7^62 ≈ 3.5 兆組合。</span></div>
    </div>
    <Footer source={'Ch.3 Sharding（ID 設計）'} />
  </div>
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CASE STUDY · 2 (中等)</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Twitter / X · 動態時間軸</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 2 · Twitter Timeline</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>功能</strong>：發推 · 看自己 timeline（followee 的最新推）· 點讚轉推</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>規模假設</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>5 億 DAU · 每秒 5000 推 · 每秒 100k timeline view</li>
          <li>平均 follow 200 人 · KOL 可能 follow 1 億</li>
        </ul>
    </div>
    <Footer source={'整合 Ch.3（Fan-out）+ Ch.6（Read scaling）'} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Fan-out on Write vs on Read</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 2 · 核心難題</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Fan-out on Write（推）</strong>
    發推時，寫入每個 follower 的 timeline 表<br />
    讀超快 · 寫超貴（KOL 寫爆）</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Fan-out on Read（拉）</strong>
    看 timeline 時，現查 followees 最新推<br />
    寫便宜 · 讀慢（要 scatter-gather 200 人）</div>
      </div>
      <Callout tone='#D97757'><strong>Twitter 真實做法：Hybrid</strong>  
普通用戶用 <strong>Fan-out on Write</strong>（pre-compute timeline）  
KOL（千萬粉）用 <strong>Fan-out on Read</strong>（避免一次寫 1 億份）</Callout>
    </div>
    <Footer source={'Ch.6 Scaling Reads · Materialized View 模式'} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 2 · 系統 Sketch</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`  [Tweet 發布] → [API] → [Tweet DB（Sharded by user_id）]
                  │             │
                  │             └→ Kafka ──→ Fan-out worker
                  │                              │
                  │              ┌───────────────┘
                  │              ▼
                  │     [Timeline Cache（Redis）·  per user]
                  │              ▲
  [Read timeline] ─→ [Timeline API] ←── 普通用戶（pre-computed）
                              ↓
                     KOL 拉取 → Tweet DB 直查 → merge`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'寫'} text={'Tweet DB（user_id sharding）+ Kafka 觸發 fan-out'} />
        <StackRow tone='#A1813F' label={'Fan-out'} text={'Worker 把推塞到每個 follower 的 Redis ZSet'} />
        <StackRow tone='#5B7570' label={'讀'} text={'80% pre-computed timeline · 20% KOL 即時 merge'} />
      </div>
    </div>
    <Footer source={'Ch.3 Sharding · Ch.7 Queue'} />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CASE STUDY · 3 (高難度)</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>地理派單系統</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 3 · Uber Dispatch</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>功能</strong>：乘客叫車 · 媒合最近司機 · 即時追蹤位置</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>規模假設</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>1000 萬司機 · 每 4 秒上報 1 次 GPS</li>
          <li>5 萬同時叫車 · 媒合需 &lt; 2 秒</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>核心難題</strong>：地理空間檢索 + 即時推送 + 寫入吞吐量極高（2.5M GPS update/s）。</Callout>
    </div>
    <Footer source={'整合 Ch.3（Geo Sharding）+ Ch.7（Real-time + Stream）'} />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何不用 lat/lon 範圍查詢？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 3 · 地理索引</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'SQL 範圍查（差）'} items={['WHERE lat BETWEEN ... AND lon BETWEEN ...', '2D index 弱、結果是「方框」不是「圓」', '不適合高 QPS 寫入']} />
        <TradeoffCol tone='#E8634F' title={'Geohash / S2 / H3（好）'} items={['把 2D 座標編碼成 1D 字串', '同前綴 = 鄰近 → 用 prefix 查', 'Uber 用 H3（六邊形格子）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Geo Sharding by H3 cell</strong>：每個格子的司機資料聚在同 shard，查詢「我這格 + 鄰格」只走幾個 shard。</span></div>
    </div>
    <Footer source={'Ch.3 Consistent Hashing 進階變體'} />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 3 · 系統 Sketch</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[Driver App] ─GPS 4s─→ [Ingest GW] ─→ [Kafka]
                                          │
                            ┌─────────────┴─────────────┐
                            ▼                           ▼
                      [Flink Stream]              [Redis Geo Set]
                       Geo aggregation             real-time location
                            │                           ▲
                            ▼                           │
                      [Cassandra]                       │
                      historic trail                    │
                                                        │
[Rider App] ── request ──→ [Match Engine] ──H3 cell────┘
                                  │
                                  ▼
                         [Selected Driver] ──WebSocket──→ Driver`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Ingest'} text={'GPS 寫 Kafka（partition by driver_id）'} />
        <StackRow tone='#A1813F' label={'Match'} text={'用 H3 cell 查 Redis Geo Set · BFS 鄰居 cell 找 5 個候選'} />
        <StackRow tone='#5B7570' label={'Realtime'} text={'配對成功 → WebSocket 通知司機 · 客戶 SSE 看軌跡'} />
      </div>
    </div>
    <Footer source={'Ch.7 Stream Pipeline · Real-time'} />
  </div>
);


const P14: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CASE STUDY · 4 (高難度)</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>即時聊天系統</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 4 · Slack-like Chat</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>功能</strong>：1-on-1 / 群組 / channel · 訊息歷史 · 即時推送 · 搜尋</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>規模假設</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>1 億 DAU · 每秒 100k 訊息</li>
          <li>平均 user 在 50 個 channel · 每 channel 100-1000 人</li>
        </ul>
    </div>
    <Footer source={'整合 Ch.3（Sharding）+ Ch.5（Reliable Delivery）+ Ch.7（Real-time + Search）'} />
  </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Sharding 策略</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 4 · 訊息儲存</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'By user_id（差）'} items={['同訊息要寫多份（每個 recipient）', '儲存放大 N 倍', 'Group chat 是災難']} />
        <TradeoffCol tone='#E8634F' title={'By channel_id（好）'} items={['訊息寫一次（channel timeline）', '讀的時候每個 user 拉自己 channel 列表', 'Slack / Discord 都這樣做']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>底層儲存</strong>：Cassandra（高寫吞吐 + time-series 模型）；channel_id 作 partition key，message_ts 作 clustering key。</span></div>
    </div>
    <Footer source={'Ch.3 Sharding · Ch.4 NoSQL 選型'} />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 4 · 系統 Sketch</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[Web/Mobile] ←─WebSocket─→ [WS Gateway Cluster]
                                  │  ↑
                                  │  │
                                  ▼  │
                          [Redis Pub-Sub]
                                  │
                                  ▼
[Send API] → [Message Service] → [Kafka] → [Cassandra]（持久化）
                                     │
                                     └─→ [ES Indexer] → 全文搜尋`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'連線層'} text={'WebSocket Gateway 千台 · 各 Pod 透過 Redis Pub-Sub 廣播'} />
        <StackRow tone='#A1813F' label={'送出'} text={'寫 Cassandra 同步 · Kafka 異步觸發推送 + 索引'} />
        <StackRow tone='#5B7570' label={'離線推'} text={'user 不在線 → APNS / FCM push'} />
      </div>
    </div>
    <Footer source={'Ch.7 Real-time Scaling · Ch.5 Reliable Delivery'} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 4 · 訊息送達保證</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Exactly-once delivery（業務面）</strong>
client 帶 `client_msg_id`（UUID）· server 用此 dedupe table<br />
<strong>重發 N 次也不會 N 條訊息</strong>——At-least + 冪等 = 業務 exactly-once</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Read Receipt</strong>
單獨表記錄 `(user_id, channel_id, last_read_msg_id)`<br />
<strong>不要每讀一條更新</strong>——批次 flush 1s/次</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>離線推送</strong>
連線 disconnect ≥ 30s · 訊息走 push notification<br />
<strong>不丟訊息</strong>：所有 server-side push 都要寫 outbox + retry</Callout>
    </div>
    <Footer source={'Ch.5 Reliable Delivery 全套'} />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>CASE STUDY · 5 (前沿)</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>RAG-based AI 客服</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 5 · AI Customer Support</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>功能</strong>：客戶問問題 → AI 從公司 KB 找答案 → 串流回覆 + 引用來源 · 必要時轉人工</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>規模假設</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>100 萬條 KB 文件 · 1000 並發對話</li>
          <li>P99 first-token &lt; 1.5s · 完整答案 &lt; 6s</li>
        </ul>
    </div>
    <Footer source={'整合 Ch.6（Read scaling）+ Ch.7（RAG + Real-time + Long Running）'} />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 5 · 核心 Pipeline</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[User Q] → [API GW] → [Auth + Rate Limit]
              │
              ▼
        [Query Rewriter（small LLM）]
              │
       ┌──────┴──────┐
       ▼             ▼
  [Vector Search]  [BM25 Search]
   pgvector         Elasticsearch
       └──────┬──────┘
              ▼
        [Reranker（Cohere / cross-encoder）]
              │
              ▼  Top-5 chunks
        [LLM Generate]（Anthropic / OpenAI）
              │
              ▼  SSE streaming
          [User UI]`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Hybrid Search'} text={'Vector 抓語意 + BM25 抓關鍵字 · 取聯集 50 候選'} />
        <StackRow tone='#A1813F' label={'Rerank'} text={'cross-encoder 細排 · 取 top-5 進 prompt'} />
        <StackRow tone='#5B7570' label={'Streaming'} text={'SSE 串流 token · first-byte 短'} />
      </div>
    </div>
    <Footer source={'Ch.7 RAG 全套 + Ch.7 Real-time SSE'} />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 LLM 當服務跑會遇到的事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE 5 · 工程化議題</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Latency 預算</strong>
P99 6s = embedding(100ms) + retrieval(200ms) + rerank(300ms) + LLM(5s)<br />
<strong>LLM 是大頭</strong>——streaming first-token 為 UX 必須。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Hallucination 控制</strong>
prompt 強制：「<strong>只用 context 回答</strong> + 引用 chunk_id**」<br />
監控：若 LLM 引用不在 context 的 chunk_id → 標為 hallucination 案例</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>成本控制</strong>
熱問題 cache（query → answer 短 TTL）· 降階模型路由（簡單問題用 Haiku）<br />
<strong>典型省 60% token 成本</strong></Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Long Running 升級</strong>
複雜任務（退費）→ Temporal workflow · LLM 當 router 而非 executor</Callout>
    </div>
    <Footer source={'Ch.7 RAG · Ch.5 Reliability · Ch.7 Long Running'} />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>5 個面試官最在意的事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INTERVIEW NOTES · 面試常見陷阱</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 別跳過 Requirement'} text={'直接畫圖 = 不及格。先講「我假設 X、Y、Z」'} />
        <StackRow tone='#A1813F' label={'② 給數字'} text={'「QPS 大」沒用 · 「peak 5k QPS、storage 8TB」才有討論價值'} />
        <StackRow tone='#5B7570' label={'③ 講 Trade-off 而非 Best'} text={'沒有最佳解 · 只有「在 X 約束下我選 Y 因為...」'} />
        <StackRow tone='#5B9770' label={'④ 主動提失敗模式'} text={'「如果 cache 掛了會怎樣」「如果 leader 壞了多久才 failover」'} />
        <StackRow tone='#5B9770' label={'⑤ 知道何時該停'} text={'不要把 7 章全 dump · 留時間讓面試官問問題'} />
      </div>
    <Footer source={'整合 Ch.5 Reliability + 03_mental_model 決策原則'} />
  </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SUMMARY · 5 個案例的觀念對應表</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>案例</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>主要觀念</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>主要章節</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>URL Shortener</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cache + Sharding + ID 生成</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Ch.3, 6</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Twitter Timeline</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Fan-out + Hybrid + Materialized View</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Ch.3, 6</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Uber Dispatch</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Geo Index + Stream + Real-time</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Ch.3, 7</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Slack Chat</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>WebSocket scaling + Reliable Delivery</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Ch.5, 7</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AI Support</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>RAG + Streaming + LLM ops</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Ch.7</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這 5 個案例組合幾乎涵蓋面試與 senior 級別工作 80% 場景</strong>。其餘 20% 是它們的變形組合。</span></div>
    </div>
    <Footer source={'整合 Ch.1–7 全部'} />
  </div>
);


const P23: Page = () => (
  <SectionEnd title={'Capstone 完'} subtitle={'5 個案例打通了 Ch.1–7 的全部觀念。下一站速查表整理。'} next={'91 Review Cheatsheet</span>'} />
);


const P24: Page = () => (
  <ChapterDivider eyebrow={'REVIEW · 91'} title={'Review Cheatsheet'} subtitle={'面試 / 工作時，1 分鐘可以查到的決策表'} />
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INDEX · 速查表目錄</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 4 維決策框架'} text={'Consistency / Availability / Latency / Cost'} />
        <StackRow tone='#A1813F' label={'② Latency Numbers'} text={'11 行必背數字'} />
        <StackRow tone='#5B7570' label={'③ 選型決策樹'} text={'DB / Cache / Queue / 推送'} />
        <StackRow tone='#5B9770' label={'④ 常見模式對應'} text={'場景 → Pattern 對照表'} />
        <StackRow tone='#5B9770' label={'⑤ 反模式清單'} text={'「不要」做的事'} />
        <StackRow tone='#5B9770' label={'⑥ Capacity 速算'} text={'規模假設 → 容量估算公式'} />
      </div>
    <Footer source={'提煉自 Ch.1–7 全部章節'} />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>任何決策都回到 4 維評分</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>① 4 DIMENSIONS · 決策框架</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Consistency</strong>
    所有節點同時看到一致資料？<br />
    Strong / Eventual / Causal</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Availability</strong>
    任何時候都能讀寫？<br />
    99.9% / 99.99% / 99.999%</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Latency</strong>
    P50 / P99 / P999 預算？<br />
    50ms / 500ms / 1s</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Cost</strong>
    硬體 + 維運 + 工程時間？<br />
    Build vs Buy</div>
      </div>
      <Callout tone='#D97757'><strong>面試決勝句</strong>：「在 X 約束下我選 Y，犧牲了 Z」——這就是 senior 級別答案。</Callout>
    </div>
    <Footer source={'Ch.2 + 03_mental_model'} />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>② LATENCY NUMBERS · 必背 11 行</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>操作</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>時間</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>倍率</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>L1 cache reference</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>0.5 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Branch mispredict</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>5 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>L2 cache reference</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>7 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>14×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Mutex lock/unlock</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>25 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>50×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Main memory reference</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>200×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Compress 1 KB（snappy）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>3 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>6,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Send 1 KB over 1 Gbps</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>20,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SSD random read</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>150 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>300,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Round trip in same DC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>0.5 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1,000,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Read 1 MB sequentially from SSD</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>2,000,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Round trip CA → Netherlands</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>150 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>300,000,000×</div>
        </div>
    <Footer source={'Ch.2 / 基本觀念/12 Numbers to Know'} />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>② NUMBERS · 速算口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'RAM 比 SSD 快 1000 倍'} text={'100 ns vs 100 μs'} />
        <StackRow tone='#A1813F' label={'SSD 比 cross-DC 快 3 倍'} text={'100 μs vs 500 μs'} />
        <StackRow tone='#5B7570' label={'Same DC RTT ≈ 1ms'} text={'vs 跨洲 RTT ≈ 150ms（150 倍）'} />
        <StackRow tone='#5B9770' label={'P99 100ms 預算'} text={'= 200 次本機 RAM = 100 次 SSD = 10 次 cross-AZ'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>單行口訣</strong>：<strong>RAM ≪ SSD ≪ 同 DC ≪ 跨 DC ≪ 跨洲</strong>——每階差 1 個數量級以上。</Callout>
    </div>
    <Footer source={'Ch.2 §4'} />
  </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ DB SELECTION · 決策樹</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`需要 ACID 事務 / 複雜 join？
├─ 是 → PostgreSQL（先選）/ MySQL
└─ 否 → 看主要查詢模式
        │
        ├─ Primary Key 等值查詢 → KV (Redis / DynamoDB)
        ├─ 巢狀文件 + flexible schema → Document (MongoDB)
        ├─ 寫多 + 線性擴展需求 → Wide-column (Cassandra)
        ├─ 全文搜尋 → Search (Elasticsearch)
        ├─ 多跳關係 → Graph (Neo4j)
        ├─ 時序 metric → TimeSeries (InfluxDB)
        └─ 向量相似 → Vector (Pinecone / pgvector)`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：先 PostgreSQL · 撞牆再換 · 90% 系統永遠撞不到牆。</span></div>
    </div>
    <Footer source={'Ch.4 §1'} />
  </div>
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ CACHE PATTERN · 選型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>場景</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>推薦</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>理由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀多寫少 · 容忍 staleness</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Cache-aside</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最簡單 · 應用控管</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一致性重要 · 寫稍慢可接受</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Write-through</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>cache 與 DB 同步</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫密集 · 容忍丟失</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Write-back</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最快 · 風險可控</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cache library 自管</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Read-through</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用碼乾淨</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>災難</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>解法</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Penetration</strong>（查不存在的）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Bloom filter · 快取 null</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Avalanche</strong>（同時過期）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>TTL 加抖動 · 多級 cache</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Stampede</strong>（熱點過期）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>single-flight · 永不過期 + 背景更新</div>
        </div>
    </div>
    <Footer source={'Ch.3 §3'} />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ QUEUE · 選型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`事件流 / data pipeline / 重播 ── Kafka
     │
     ├─ 複雜路由 + 工作隊列 ── RabbitMQ
     │
     ├─ 簡單異步 + AWS 棧 ── SQS
     │
     ├─ Pub-Sub + 低延遲 ── NATS / Redis Streams
     │
     └─ 串流 SQL + Materialize ── Pulsar`}</pre>
      <Callout tone='#D97757'><strong>判斷重點</strong>：要不要 replay？要 → Kafka。  
要不要保證一次處理？要 → 用支援 dedupe 的（Kafka EOS / SQS FIFO）。</Callout>
    </div>
    <Footer source={'Ch.7 §1'} />
  </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ REAL-TIME · 推送選型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>需求</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>推薦</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>理由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>通知、股票、AI streaming</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SSE</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>HTTP 原生 · auto reconnect</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>聊天、遊戲、協同編輯</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>WebSocket</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>雙向 · binary 支援</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>IoT 大量設備</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>MQTT</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低頻寬 · QoS 分級</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>點對點視訊 / 音訊</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>WebRTC</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>P2P · 媒體優化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>防火牆受限環境</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Long Polling</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>萬能後備方案</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>經驗法則</strong>：能用 SSE 就不用 WebSocket（少 50% 維運麻煩）。</span></div>
    </div>
    <Footer source={'Ch.7 §3'} />
  </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>④ 場景 → 模式對照表</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>業務場景</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>推薦組合</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>URL shortener / 小型 OLTP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PostgreSQL + Redis cache + CDN</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>社群動態（Twitter-like）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Sharded DB + Hybrid Fan-out + Redis ZSet</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>即時聊天</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cassandra + WebSocket + Kafka + Redis Pub-Sub</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>影片串流</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>S3 + CDN + HLS + 預先轉碼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>地理派單</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>H3/Geohash + Redis Geo + Stream pipeline</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全文搜尋</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Elasticsearch + BM25 + index pipeline</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AI 客服</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>pgvector + Hybrid Search + LLM streaming</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高並發秒殺</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Redis 預扣 + 異步寫 DB + 限流 + 排隊</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>金流交易</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>RDBMS + Saga + Outbox + Event Sourcing</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>推薦系統</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Lambda 架構 / 即時 feature store + offline batch</div>
        </div>
    <Footer source={'Ch.6 + Ch.7 + Capstone'} />
  </div>
);


const P34: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>⑤ ANTI-PATTERNS · 反模式清單</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>這些做法經過驗證會失敗</strong></Callout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 用 LIKE \'%xxx%\' 做搜尋'} text={'→ 改用 Elasticsearch / 全文索引'} />
        <StackRow tone='#A1813F' label={'② 用時間當分片鍵'} text={'→ 今天的 shard 永遠熱 · 昨天的閒'} />
        <StackRow tone='#5B7570' label={'③ Cache 用 Cassandra（AP）存帳戶餘額'} text={'→ 雙花災難'} />
        <StackRow tone='#5B9770' label={'④ 3 人團隊上 K8s'} text={'→ 運維時間 > 業務時間'} />
        <StackRow tone='#5B9770' label={'⑤ Retry 固定間隔 3 次'} text={'→ 重試風暴打爆剛恢復的後端'} />
        <StackRow tone='#5B9770' label={'⑥ 用 Cassandra 當主存儲卻不冪等消費'} text={'→ 重複事件雙倍執行'} />
        <StackRow tone='#5B9770' label={'⑦ QPS 100 上 Kafka + ES'} text={'→ 過度工程，PostgreSQL 全包'} />
        <StackRow tone='#5B9770' label={'⑧ 把大檔放 BLOB 欄位'} text={'→ 備份爆炸 · vacuum 卡死'} />
      </div>
    </div>
    <Footer source={'整合 Ch.2–7 各章 alert / 反模式'} />
  </div>
);


const P35: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>從規模假設到容量估算</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>⑥ CAPACITY · 速算公式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>QPS 估算</strong>
<strong>DAU × 行為次數 / 86400 × peak 倍率（×3）</strong><br />
例：10M DAU × 平均 10 次/天 / 86400 × 3 ≈ 3500 QPS peak</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Storage 估算</strong>
<strong>單筆 size × 筆數 × 副本數 × overhead（×1.3）</strong><br />
例：1KB × 10B × 3 × 1.3 ≈ 39 TB</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Bandwidth 估算</strong>
<strong>QPS × payload size</strong><br />
例：100k QPS × 5KB = 500 MB/s = 4 Gbps</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Cache 容量</strong>
<strong>熱資料 size（前 20%）× 1.5（overhead）</strong><br />
例：熱 timeline 1B 條 × 200 bytes × 1.5 = 300 GB</Callout>
    </div>
    <Footer source={'Capstone 90 §Estimation'} />
  </div>
);


const P36: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>⑥ CAPACITY · 常見規模對照</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>系統等級</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>DAU</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>QPS（peak）</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>儲存</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>推薦架構</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內部工具</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>&lt; 1k</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>&lt; 100</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>&lt; 100 GB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>單台 PostgreSQL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>小型 SaaS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10k-100k</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>500-5k</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>&lt; 1 TB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PG + Redis + 1 LB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中型應用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1M-10M</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10k-100k</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10-100 TB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Sharded + Cache + CDN</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>大型應用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100M+</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1M+</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PB+</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全分散式 + 多 region</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>超大型（FAANG）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1B+</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10M+</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>數十 PB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自研基礎設施</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>自查心態</strong>：90% 工程師工作在前 3 個等級——別過度套用 FAANG 的解法。</span></div>
    </div>
    <Footer source={'Capstone 90 §Estimation'} />
  </div>
);


const P37: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INTERVIEW · 5 步驟 SOP</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`① REQUIREMENTS         3-5 min  · 功能 + 非功能 + 規模假設
② ESTIMATION           2-3 min  · QPS / storage / bandwidth
③ HIGH-LEVEL DESIGN    10-15 min · 5-7 個方塊 + 資料流
④ DEEP DIVE            15-20 min · 1-2 個 component 深挖
⑤ TRADE-OFFS / FAILURES 5-10 min · 哪邊壞了會怎樣`}</pre>
      <Callout tone='#D97757'><strong>只有第 3-4 步驟在畫圖</strong>。前 2 步驟是「設定情境」，第 5 步驟是「展現深度」。</Callout>
    </div>
    <Footer source={'90 Capstone §Method'} />
  </div>
);


const P38: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>INTERVIEW · 答題金句</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'不確定時'} text={'「我假設 X，如果 Y 我會改成 Z」'} />
        <StackRow tone='#A1813F' label={'講選型'} text={'「我選 A 因為 B，但 C 場景會選 D」'} />
        <StackRow tone='#5B7570' label={'主動提失敗'} text={'「如果 cache 掛了，這裡會怎樣...」'} />
        <StackRow tone='#5B9770' label={'承認局限'} text={'「這個方案在 X 情況下會失效，需要進一步...」'} />
        <StackRow tone='#5B9770' label={'引用真實系統'} text={'「Twitter 的做法是... 因為...」'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試官最怕</strong>：候選人講 best practice 但不能講 trade-off。<strong>講出 trade-off 就 senior 了</strong>。</span></div>
    </div>
    <Footer source={'整合 03_mental_model + 90 Capstone'} />
  </div>
);


const P39: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 一頁速查總覽</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Decision Tools'} items={['4 維框架（C/A/L/Cost）', '11 行 Latency Numbers', '4 個選型決策樹（DB/Cache/Queue/Real-time）', '10 個場景 → 模式對照']} />
        <TradeoffCol tone='#E8634F' title={'Avoid Lists'} items={['8 個反模式（時間分片、雙花、過度上 K8s ...）', 'Capacity 4 個速算公式', '面試 5 步驟 SOP', '5 句答題金句']} />
      </div>
  </div>
);


const P40: Page = () => (
  <SectionEnd title={'Cheatsheet 完'} subtitle={'該背的都在這。下一站結尾資源清單。'} next={'92 Resources & Next Steps</span>'} />
);


const P41: Page = () => (
  <ChapterDivider eyebrow={'RESOURCES · 92'} title={'Resources & Next Steps'} subtitle={'讀完本課後，下一站去哪'} />
);


const P42: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OVERVIEW · 後續學習路徑</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 經典書'} text={'5 本 · 系統地建構 mental model'} />
        <StackRow tone='#A1813F' label={'② 必讀論文'} text={'10 篇 · 業界源頭的原始想法'} />
        <StackRow tone='#5B7570' label={'③ Engineering Blog'} text={'8 個 · 實戰一手經驗'} />
        <StackRow tone='#5B9770' label={'④ 訂閱源'} text={'Newsletter / Podcast / YouTube'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>讀法</strong>：先選 1 本書 + 1 個 blog 訂起來。<strong>廣度後深度</strong>——別嘗試一次吃完。</span></div>
    </div>
    <Footer source={'業界公認進階學習資源'} />
  </div>
);


const P43: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>① BOOKS · 5 本經典</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>#</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>書名</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>作者</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>重點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Designing Data-Intensive Applications</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Martin Kleppmann</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分散式資料系統聖經 · 必讀</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>2</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>System Design Interview Vol 1 &amp; 2</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Alex Xu</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>面試導向 · 案例豐富</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>3</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Database Internals</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Alex Petrov</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料庫底層原理 · B+/LSM/Replication</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>4</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Site Reliability Engineering</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Google</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SRE 思維 · 免費線上版</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>5</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Building Microservices (2nd ed)</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Sam Newman</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>微服務拆分原則 · 反 hype</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>新手只選一本</strong>：<strong>DDIA</strong>（書 #1）。每章配本書 1 個章節讀，是最佳補充。</Callout>
    </div>
    <Footer source={'業界共識'} />
  </div>
);


const P44: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>① BOOKS · 進階書單</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'進入企業架構'} items={['<strong>Software Architecture: The Hard Parts</strong> - Ford', '<strong>Fundamentals of Software Architecture</strong> - Richards', '<strong>Domain-Driven Design</strong> - Eric Evans', '<strong>Implementing Domain-Driven Design</strong> - Vaughn Vernon']} />
        <TradeoffCol tone='#E8634F' title={'進入分散式深層'} items={['<strong>Distributed Systems</strong> - van Steen & Tanenbaum', '<strong>Database Reliability Engineering</strong> - Campbell', '<strong>Streaming Systems</strong> - Akidau', '<strong>Designing Distributed Systems</strong> - Brendan Burns']} />
      </div>
    <Footer source={'O\'Reilly · Manning · Addison-Wesley'} />
  </div>
);


const P45: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>② PAPERS · 10 篇必讀</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>主題</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>論文</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>影響</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分散式儲存</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>GFS</strong>（2003）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>HDFS 等的祖宗</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>平行運算</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>MapReduce</strong>（2004）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Hadoop / Spark 的前身</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>KV 商店</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Dynamo</strong>（2007）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cassandra / DynamoDB 起源</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>列式 DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Bigtable</strong>（2006）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>HBase / Cassandra 模型</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全球一致 DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Spanner</strong>（2012）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>TrueTime + 分散式 SQL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>共識</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Raft</strong>（2014）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>etcd / Consul / TiKV</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訊息流</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Kafka</strong>（2011）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>LinkedIn 工程文</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一致性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>CAP 12 Years Later</strong>（2012）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Brewer 親自重講</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可觀測性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Dapper</strong>（2010）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>OpenTelemetry / Jaeger 原型</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AI Retrieval</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>RAG</strong>（2020）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Lewis et al. · Meta</div>
        </div>
    <Footer source={'整合 ACM / Google / Meta / LinkedIn 公開論文'} />
  </div>
);


const P46: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>② PAPERS · 讀法建議</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 先讀 Abstract + Intro + Conclusion'} text={'90% 論文這 3 段就夠'} />
        <StackRow tone='#A1813F' label={'② 圖表優先'} text={'系統論文的精華在 Figure 1（架構圖）'} />
        <StackRow tone='#5B7570' label={'③ 配 blog 解讀'} text={'The Morning Paper · High Scalability 都有'} />
        <StackRow tone='#5B9770' label={'④ 找對應實作'} text={'Raft → etcd source · Dynamo → Cassandra design doc'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>論文不是教材是 reference</strong>——遇到問題回去查，比一次讀完有效 10 倍。</Callout>
    </div>
    <Footer source={'學術閱讀方法論'} />
  </div>
);


const P47: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ ENGINEERING BLOGS · 8 個必訂</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Blog</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>強項</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>頻率</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>High Scalability</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統架構案例彙整</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>週</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Netflix Tech Blog</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>串流 / Cache / 微服務</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>週</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Uber Engineering</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Geo / Real-time / Mobile</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>月</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Airbnb Engineering</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Search / ML / Data</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>月</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Stripe Engineering</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>金流 / API / Reliability</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>月</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Cloudflare Blog</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Edge / Network / Security</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>週</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Discord Engineering</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Real-time scaling</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>月</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Meta Engineering</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>大規模分散式</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>週</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>訂閱方式</strong>：用 RSS reader（Feedly）統一收。<strong>不要靠社群媒體</strong>——演算法會漏。</span></div>
    </div>
    <Footer source={'業界公開資源'} />
  </div>
);


const P48: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ BLOGS · 個人作者</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'架構導向'} items={['<strong>Martin Fowler</strong> - 模式 / 重構', '<strong>Marc Brooker（AWS）</strong> - 分散式系統實踐', '<strong>Adrian Colyer</strong> - The Morning Paper', '<strong>Henrik Kniberg</strong> - Spotify model 等']} />
        <TradeoffCol tone='#E8634F' title={'資料庫導向'} items={['<strong>Martin Kleppmann</strong> - DDIA 作者博客', '<strong>Daniel Abadi</strong> - 資料庫研究', '<strong>Brendan Gregg</strong> - 效能工程', '<strong>Aphyr</strong>（Kyle Kingsbury）- Jepsen 一致性測試']} />
      </div>
    <Footer source={'個人技術博客圈'} />
  </div>
);


const P49: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>③ BLOGS · System Design 教學</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>來源</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>形式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>ByteByteGo</strong>（Alex Xu）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>YouTube + Newsletter</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>視覺化、入門好</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>System Design Primer</strong>（GitHub）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>開源整合</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自學起點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>The Pragmatic Engineer</strong>（Gergely Orosz）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Newsletter（付費）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>大公司內幕</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Hello Interview</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>YouTube</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>面試實戰</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Tech Dummies / Gaurav Sen</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>YouTube</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>印度技術頻道 · 系統設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Awesome Distributed Systems</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>GitHub list</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>論文 + blog 彙整</div>
        </div>
    <Footer source={'教學資源圈'} />
  </div>
);


const P50: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>④ NEWSLETTERS · 訂閱</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'ByteByteGo'} text={'每週一個系統設計概念 · 大量視覺化'} />
        <StackRow tone='#A1813F' label={'The Pragmatic Engineer'} text={'大公司工程文化 + 內部 case study（付費）'} />
        <StackRow tone='#5B7570' label={'InfoQ Architecture & Design'} text={'業界趨勢 + 大會議題'} />
        <StackRow tone='#5B9770' label={'The New Stack'} text={'雲原生 / K8s / observability'} />
        <StackRow tone='#5B9770' label={'Quastor'} text={'Engineering blog 摘要重整'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>訂太多會讀不完</strong>。<strong>選 2 個就好</strong>——一個面寬、一個面深。</span></div>
    </div>
    <Footer source={'Substack / Medium 平台'} />
  </div>
);


const P51: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>④ PODCASTS · 通勤聽</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Podcast</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>主持</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>主題</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Software Engineering Daily</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Jeff Meyerson 等</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>各領域技術 daily</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>The InfoQ Podcast</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>InfoQ 編輯</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>大公司架構案例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Distributed Systems Podcast</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Allen Helton</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分散式深度討論</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Lex Fridman</strong>（部分集數）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Lex</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>巨頭工程師訪談</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>CoRecursive</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Adam Gordon Bell</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統設計故事</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>The Changelog</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Jerod Santo · Adam Stacoviak</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Open source 文化</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>通勤路上聽</strong>：1 集約 60 分 · 1 週聽 1-2 集就夠。</span></div>
    </div>
    <Footer source={'Apple Podcasts / Spotify'} />
  </div>
);


const P52: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>④ YOUTUBE · 視覺化資源</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'系統設計'} items={['ByteByteGo（最多訂閱）', 'Hello Interview（面試實戰）', 'Gaurav Sen / Tech Dummies', 'System Design Concepts by Mikhail']} />
        <TradeoffCol tone='#E8634F' title={'分散式系統'} items={['MIT 6.824 公開課（必看）', 'Stanford CS244B', 'Tim Berglund（Confluent 系列）', 'Jepsen analyses（一致性測試）']} />
      </div>
      <Callout tone='#D97757'><strong>MIT 6.824 是分散式系統的金標準</strong>——免費課程 + 完整 Lab（用 Go 實作 Raft / MapReduce）。</Callout>
    </div>
    <Footer source={'YouTube · MIT OpenCourseWare'} />
  </div>
);


const P53: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NEXT STEPS · 接下來怎麼做</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 寫一篇你自己的 Capstone'} text={'選一個你工作系統 · 用 4 步驟分析'} />
        <StackRow tone='#A1813F' label={'② 加入讀書會'} text={'找 3-5 人共讀 DDIA · 每週一章'} />
        <StackRow tone='#5B7570' label={'③ 寫 blog'} text={'把工作中的設計決策寫成短文 · 強迫自己思考 trade-off'} />
        <StackRow tone='#5B9770' label={'④ 實作一個 toy system'} text={'例如：用 Go 寫 mini Kafka / Raft'} />
        <StackRow tone='#5B9770' label={'⑤ 從面試題反向學'} text={'每週設計 1 個系統，無論工作有沒有需要'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>真正讓你進步的不是讀完這份簡報，而是用學到的 framework 去拆解新問題</strong>。</Callout>
    </div>
    <Footer source={'學習方法論共識'} />
  </div>
);


const P54: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CLOSING · 最後一張投影片</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br />
<br /></div>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>7 章 + 5 案例</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>涵蓋了系統設計面試與工作 <strong>80% 的場景</strong>。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>剩下的 20% 不靠讀，<strong>靠寫、靠錯、靠改</strong>。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Linus 的話</strong>：「<strong>Talk is cheap. Show me the code.</strong>」  
讀完這份不去寫，就只是談話。<strong>寫一個系統，再回來看這份</strong>——你會看到完全不同的東西。</Callout>
    </div>
    <Footer source={'課程設計者寄語'} />
  </div>
);


const P55: Page = () => (
  <SectionEnd title={'系統設計實戰 · 完'} subtitle={'Foundation 站穩 → 資料散開 → 設施撐住 → 故障存活 → 擴展爆裂 → 進階收尾'} />
);


export const meta: SlideMeta = { title: 'Appendix · Cheatsheet' };
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
  P41,
  P42,
  P43,
  P44,
  P45,
  P46,
  P47,
  P48,
  P49,
  P50,
  P51,
  P52,
  P53,
  P54,
  P55,
] satisfies Page[];
