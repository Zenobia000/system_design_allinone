import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model from './assets/00_mental_model.png';
import img_01_consistent_hashing_01_ring from './assets/01_consistent_hashing_01_ring.png';
import img_01_consistent_hashing_02_neighbor from './assets/01_consistent_hashing_02_neighbor.png';
import img_01_consistent_hashing_03_vnode from './assets/01_consistent_hashing_03_vnode.png';
import img_02_sharding_01_strategies from './assets/02_sharding_01_strategies.png';
import img_02_sharding_02_hotshard from './assets/02_sharding_02_hotshard.png';
import img_02_sharding_03_shardkey from './assets/02_sharding_03_shardkey.png';
import img_03_replication_01_topologies from './assets/03_replication_01_topologies.png';
import img_03_replication_02_sync_async from './assets/03_replication_02_sync_async.png';
import img_03_replication_03_lag from './assets/03_replication_03_lag.png';
import img_04_caching_01_hierarchy from './assets/04_caching_01_hierarchy.png';
import img_04_caching_02_patterns from './assets/04_caching_02_patterns.png';
import img_04_caching_03_stampede from './assets/04_caching_03_stampede.png';
import img_04_caching_04_hotkey from './assets/04_caching_04_hotkey.png';
import img_99_recap_01_twitter from './assets/99_recap_01_twitter.png';

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
  <ChapterDivider eyebrow={'CHAPTER · 03 · TOPIC 00'} title={'Data Distribution'} subtitle={'當一台機器塞不下，資料就要散開來活'} />
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
        <StackRow tone='#D97757' label={'① Consistent Hashing 解什麼？'} text={'加減節點時資料怎麼搬'} />
        <StackRow tone='#A1813F' label={'② Sharding 怎麼選分片鍵？'} text={'hot shard 是怎麼煉成的'} />
        <StackRow tone='#5B7570' label={'③ Replication 三種模式怎麼選？'} text={'sync / async / semi-sync'} />
        <StackRow tone='#5B9770' label={'④ Cache 該擺哪一層？'} text={'client / CDN / app / DB cache'} />
      </div>
    </div>
    <Footer source={'基本觀念/06 + 09 + 10 + 11'} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 分散式資料層的 4 個動作</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌──────────────────────────────────────────────────┐
│  ROUTE        Consistent Hash · Locator service  │  ← Topic 01
├──────────────────────────────────────────────────┤
│  SHARD        Range · Hash · Directory · Geo     │  ← Topic 02
├──────────────────────────────────────────────────┤
│  REPLICATE    Leader-Follower · Multi-Leader     │  ← Topic 03
├──────────────────────────────────────────────────┤
│  CACHE        Read-aside · Write-through ...     │  ← Topic 04
└──────────────────────────────────────────────────┘
              「切」與「散」是兩件事`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Sharding 是切</strong>（資料分片）；<strong>Replication 是散</strong>（每片再複製多份）。兩者正交，可以組合使用。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_00_mental_model} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整理自 基本觀念/06 + 09 + 10 + 11'} />
  </div>
);


const P05: Page = () => (
  <SectionEnd title={'Overview 完'} subtitle={'先看路由——加減節點時，怎麼讓資料盡量別動。'} next={'Topic 01 Consistent Hashing</span>'} />
);


const P06: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 03 · TOPIC 01'} title={'Consistent Hashing'} subtitle={'讓「加減一台」不再等於「全部重洗」'} />
);


const P07: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_consistent_hashing_02_neighbor} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何 modulo N 不夠用？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONSISTENT HASHING · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>普通 hash sharding</strong>：`shard = hash(key) % N`</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>加減一台機器（N 改變） → <strong>幾乎所有 key 重新映射</strong> → 大規模搬資料 + cache 失效。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>具體有多痛</strong>：N=3 → N=4，9 個 key 中 <strong>7 個會被搬移</strong>（只有 2 個留在原位）。
10 台變 11 台時，<strong>90% 的資料要搬</strong>。這不只是寫資料慢，更是 cache 全部失效後 DB 被打爆。</Callout>
    </div>
    <Footer source={'基本觀念/06 Consistent Hashing.pdf · §1 Why'} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Hash Ring 的概念</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONSISTENT HASHING · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`                 ┌─────────────────────┐
                 │       0 / 2³²       │
              key1 ●──────┐  ● node A   │
                 │        ↓             │
            node D ●      → key1 → A   │
                 │                      │
                 │        ● key2        │
                 │        ↓             │
                 │      → key2 → B     │
            node C ●                    │
                 │       ● node B       │
                 └─────────────────────┘`}</pre>
      <Callout tone='#D97757'><strong>Hash Ring</strong>：把 key 與 node 都 hash 到同一環上，<strong>key 順時針找到的第一個 node 就是它的歸屬</strong>。
加減 node 時，<strong>只有相鄰 node 的資料受影響</strong>——平均搬動 1/N。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_consistent_hashing_01_ring} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/06 Consistent Hashing.pdf · §2 Algorithm'} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>只有「鄰居」會痛</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONSISTENT HASHING · 加減節點</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新節點 E 加入'} items={['E 落在 D 與 A 之間（位置 150）', '只有 0–150 區間的 key 從 A 搬到 E', '其他 key 完全不動', '<em>影響範圍：1/N</em>']} />
        <TradeoffCol tone='#E8634F' title={'節點 A 下線'} items={['原本屬於 A 的 key 順時針交給 B', '但 B 突然要扛兩倍負載', '沒有 vNode 時，分布越不均', '<em>這就是 vNode 解的下一個問題</em>']} />
      </div>
    <Footer source={'基本觀念/06 Consistent Hashing.pdf · §2 (b)(c) Add/Remove'} />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Virtual Nodes 解決分布不均</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONSISTENT HASHING · 虛擬節點</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'沒虛擬節點'} items={['3 個 node 在環上隨機落點', '分布可能 30% / 50% / 20%', '節點少 → hash 環位置容易集中']} />
        <TradeoffCol tone='#E8634F' title={'有虛擬節點'} items={['每個物理 node 對應 100-200 個虛擬點', '大數法則 → 分布趨於均勻', '<strong>Cassandra 預設 256 vnode</strong>']} />
      </div>
      <Callout tone='#D97757'><strong>虛擬節點還解第二件事</strong>：<strong>異質硬體分配</strong>——強的機器配 200 個 vNode，弱的機器配 50 個，自然按硬體能力分流量。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_consistent_hashing_03_vnode} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/06 Consistent Hashing.pdf · §3 Virtual Nodes'} />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>哪些系統在用？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONSISTENT HASHING · 應用</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>系統</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>用途</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Memcached client（Ketama）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>多台 cache server 路由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Cassandra</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料分片（Murmur3 hash + vnode）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DynamoDB</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Partition key 路由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>CDN（Akamai）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Edge node 選擇</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>API Gateway / Sticky Session</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>同 user 永遠路由到同一節點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Rate Limiting / Metrics</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>同維度 key 聚合到固定節點</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：「節點會變動 + 想要穩定歸屬 + 希望最少搬家」→ 用 consistent hashing。</span></div>
    </div>
    <Footer source={'基本觀念/06 Consistent Hashing.pdf · §4 Applications'} />
  </div>
);


const P13: Page = () => (
  <SectionEnd title={'Consistent Hashing 完'} subtitle={'路由解決了，下一步——資料怎麼切？'} next={'Topic 02 Sharding</span>'} />
);


const P14: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 03 · TOPIC 02'} title={'Sharding'} subtitle={'把一張大表切成 N 張小表，分散到 N 台機器'} />
);


const P15: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_sharding_01_strategies} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_sharding_02_hotshard} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_sharding_03_shardkey} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何單一資料庫撐不住？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SHARDING · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>垂直擴展撞牆的 3 個真實上限</strong>：
1. <strong>磁碟容量</strong>：單機 SSD ~ 30 TB；<strong>Amazon Aurora 也只有 ~ 256 TB 硬限</strong>
2. <strong>寫吞吐量</strong>：單 leader 寫入上限 ~ 10K-50K TPS
3. <strong>熱點集中</strong>：單表 hot row 鎖爭用會讓並發歸零</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Sharding = <strong>把一張大表切成 N 個小表</strong>，分散到 N 台機器</li>
          <li>每台機器只負責一部分資料，吞吐量 ~ 線性擴展</li>
        </ul>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Partitioning vs Sharding</strong>
<strong>Partitioning</strong> = 同一台 DB 內邏輯切分；<strong>Sharding</strong> = 跨機器切分。多數工程師混用，重點是說清楚「資料在一台還是多台」。</Callout>
    </div>
    <Footer source={'基本觀念/10 Sharding.pdf · §1 Why Shard'} />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三種分片策略</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SHARDING · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Hash Sharding</strong>
    shard = hash(key) % N<br />
    分布均勻 · 範圍查詢慢 · 預設首選</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Range Sharding</strong>
    A-F → s1, G-M → s2 ...<br />
    範圍查詢快 · 易產生 hot shard</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Directory Sharding</strong>
    查 lookup table 決定<br />
    最彈性 · 多 1 跳 · 有 SPOF</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Geo Sharding</strong>
    依使用者地區切<br />
    Compliance + 低延遲</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>選擇法則</strong>：以等值查詢為主用 Hash；範圍查詢多用 Range；資料分布不均才用 Directory（面試很少是正解）。</span></div>
    </div>
    <Footer source={'基本觀念/10 Sharding.pdf · §2 Strategies'} />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>選錯分片鍵的災難</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SHARDING · 分片鍵選擇</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'好的分片鍵（3 條件）'} items={['<strong>高基數</strong>（distinct values 多）', '<strong>均勻分佈</strong>（避免 hot shard）', '<strong>對齊查詢模式</strong>（避免 scatter-gather）', '<em>例：user_id, order_id</em>']} />
        <TradeoffCol tone='#E8634F' title={'糟糕的分片鍵'} items={['低基數（is_premium 布林值 → 只能 2 份）', '有熱點（celebrity_id 寫爆 1 個 shard）', '成長表用 created_at（新寫入打爆最新 shard）']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：以時間為分片鍵。今天的 shard 永遠是熱點，昨天的 shard 永遠閒著。</Callout>
    </div>
    <Footer source={'基本觀念/10 Sharding.pdf · §3 Shard Key'} />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Celebrity Problem · 名人效應</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SHARDING · Hot Shard</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`              Server
        ┌───────┴───────┐
        │       │       │
      1M qps  1k qps  1k qps
        ↓       ↓       ↓
     [Shard 1][Shard 2][Shard 3]
     (Taylor Swift)`}</pre>
      <Callout tone='#E8634F'>Taylor Swift 的 user_id 那個 shard，<strong>流量可能是普通 user 的 1000 倍</strong>。
hash 函數對所有 ID 一視同仁——但有些 key 本來就比其他 key 更活躍。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>三種應對方式</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>隔離熱 key 到專屬 shard</strong>：把 celebrity 帳號搬去專用 shard（Directory Sharding 派上用場）</li>
          <li><strong>複合 shard key</strong>：`hash(user_id + date)` 把單一用戶資料隨時間分散</li>
          <li><strong>動態 shard 拆分</strong>：MongoDB balancer / Vitess online resharding</li>
        </ul>
    </div>
    <Footer source={'基本觀念/10 Sharding.pdf · §4 Hot Spots'} />
  </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>JOIN 為何難？怎麼少做？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SHARDING · 跨 Shard 操作</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Scatter-Gather</strong>
查 64 個 shard 取 top 10 → <strong>64 倍網路呼叫 + 等最慢的回應</strong>。Top-N 查詢是典型受害者。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>減少跨 shard 查詢的三招</strong>
<strong>① 快取結果</strong>：top posts 快取 5 分鐘 · <strong>② 反正規化</strong>：把貼文資訊冗餘存到用戶 shard · <strong>③ 接受罕見查詢的代價</strong>：管理後台一天跑幾次的查詢慢一點沒關係</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>跨 Shard Transaction：避開 2PC</strong>
<strong>設計成單 shard transaction</strong>（最佳）→ <strong>Saga 模式</strong>（補償動作）→ <strong>接受最終一致性</strong>。教科書的 2PC 在生產系統幾乎沒人用。</Callout>
    </div>
    <Footer source={'基本觀念/10 Sharding.pdf · §5 Cross-Shard Ops'} />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Sharding 不是免費午餐</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SHARDING · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Sharding 帶來'} items={['讀寫吞吐量 ~ N 倍擴展', '單 shard 故障爆炸範圍縮小', '單表大小可控（每片獨立優化）']} />
        <TradeoffCol tone='#E8634F' title={'Sharding 的代價'} items={['跨 shard JOIN 不可行（要在應用層）', '跨 shard 事務需 Saga（避開 2PC）', 'Resharding 是地獄（時間以小時計）', '運維成本 ~ N 倍（備份、監控、升級）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：能不分就不分。垂直擴展 + 讀寫分離 + Cache 撐到 80%，再 Shard。<strong>面試建議從 64 shards 起步</strong>——留有成長空間又不過度設計。</span></div>
    </div>
    <Footer source={'基本觀念/10 Sharding.pdf · §6 Trade-offs + §7 Interview'} />
  </div>
);


const P24: Page = () => (
  <SectionEnd title={'Sharding 完'} subtitle={'資料切完了，每片要再複製幾份？'} next={'Topic 03 Replication</span>'} />
);


const P25: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 03 · TOPIC 03'} title={'Replication'} subtitle={'把同一份資料複製到多台機器，挑戰永遠在「資料會變」'} />
);


const P26: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_replication_03_lag} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何要複製多份？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REPLICATION · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>3</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>典型 3 副本架構</strong>解 3 件事：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>可用性</strong>：1 台壞，剩 2 台還能服務（99.9% → 99.99%）</li>
          <li><strong>讀效能</strong>：讀流量打到 follower，主節點專心寫</li>
          <li><strong>災備</strong>：跨 AZ / 跨 Region 部署，機房災難不丟資料</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>沒有 Replication = 單點故障</strong>。一台磁碟壞了 = 一批資料永遠失蹤。</Callout>
    </div>
    <Footer source={'基本觀念/11 Replication.pdf · §1 Why Replicate'} />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三種複製模式</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REPLICATION · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>模式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>主節點 commit 條件</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一致性</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>延遲</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>資料丟失風險</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Sync（同步）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>所有 follower 確認</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>強</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>0</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Async（非同步）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自己寫完即返回</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>弱</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主壞 → 丟最後幾秒</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Semi-sync（半同步）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>至少 1 個 follower 確認</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>極低</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>MySQL semi-sync</strong> 是金流系統的經典選擇：保證至少 1 份備援收到，又不被慢的 follower 拖死。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_03_replication_02_sync_async} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/11 Replication.pdf · §2 Sync vs Async'} />
  </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Leader-Follower / Multi-Leader / Leaderless</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REPLICATION · 拓撲</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Single Leader</strong>
    1 主寫 N 從讀<br />
    最簡單 · 90% 場景夠用</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Multi-Leader</strong>
    多主可寫 · 互相同步<br />
    跨 datacenter 寫入快 · 衝突難解</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Leaderless（Quorum）</strong>
    W + R &gt; N 保一致<br />
    Cassandra · DynamoDB</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Chain Replication</strong>
    寫頭、讀尾、鏈式同步<br />
    強一致 + 高吞吐</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>單 datacenter 用 multi-leader 不值得</strong>——複雜度遠超過好處。Multi-leader 是為跨 region 而生。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_03_replication_01_topologies} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/11 Replication.pdf · §3 Topologies'} />
  </div>
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 種日誌實作方式</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REPLICATION · Replication Log</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>方式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>原理</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>缺點</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>代表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Statement-based</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>把 SQL 語句傳給 follower 執行</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>NOW() / RAND() 不一致</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MySQL 5.1 前</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>WAL Shipping</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>把儲存引擎的 WAL 直送</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨版本升版需停機</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PostgreSQL · Oracle</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Logical Log（row-based）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>解析行層次變更</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>解析成本</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MySQL binlog · CDC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Trigger-based</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用層 trigger 抓變更</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>overhead 大</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨資料庫類型同步</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Logical log</strong> 是 <strong>Change Data Capture（CDC）</strong> 的基礎——把 DB 變更 stream 到 Kafka / 搜尋引擎 / 數據倉儲。</Callout>
    </div>
    <Footer source={'基本觀念/11 Replication.pdf · §4 Replication Log'} />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Replication Lag 引發的怪事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REPLICATION · 一致性陷阱</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Read-after-write inconsistency</strong>
使用者剛 update profile，刷新後看到舊資料——因為讀打到了還沒同步完的 follower。
<strong>3 種解法</strong>：① 自己的資料從 leader 讀 · ② 追蹤 client 的 LSN（log sequence number），跟不上的 follower 就改打 leader · ③ 寫入後 N 秒強制讀 leader</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Monotonic Read</strong>
同一使用者連續兩次讀，第二次看到比第一次還舊的資料。
<strong>解法</strong>：sticky session，同 user 永遠打同一個 follower。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Replication Lag 監控</strong>
<strong>Lag 超過 30 秒觸發告警</strong>——超過這個值通常代表 follower 跟不上、可能要切流量或重建。</Callout>
    </div>
    <Footer source={'基本觀念/11 Replication.pdf · §5 Lag Issues'} />
  </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Leader 掛了之後最容易出事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REPLICATION · Failover</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>Failover 三步驟</strong>：偵測 leader 失效（timeout 30s）→ 從 follower 選新 leader → 重新設定流量</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>Failover 三大地雷</strong>：
- <strong>Split Brain</strong>：兩個節點都以為自己是 leader，雙寫導致資料損毀
  → STONITH（Shoot The Other Node In The Head）+ <strong>fencing token</strong> 確保舊 leader 完全下線
- <strong>資料丟失</strong>：async 複製下，舊 leader 還沒傳的寫入直接被丟掉
- <strong>Timeout 拿捏</strong>：太長失效恢復慢；太短在尖峰時誤觸發</Callout>
      <Callout tone='#D97757'><strong>真正的強一致 Failover</strong> 需要 <strong>Raft / Paxos consensus 演算法</strong>——PostgreSQL 用 <strong>Patroni</strong>、k8s 用 <strong>etcd</strong> 實作這套機制，代價是延遲與複雜度上升。</Callout>
    </div>
    <Footer source={'基本觀念/11 Replication.pdf · §3 Handling Failures + §10 Deep Dive'} />
  </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>副本數量的甜蜜點</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REPLICATION · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'多副本好處'} items={['更高可用性（N+1 容錯）', '讀流量可線性擴展', '跨地理低延遲讀']} />
        <TradeoffCol tone='#E8634F' title={'多副本代價'} items={['儲存成本 ~ N 倍', '同步寫延遲 ~ 最慢副本', 'Quorum N 大時，W + R 也跟著大']} />
      </div>
      <Callout tone='#D97757'><strong>業界默契</strong>：<strong>3 副本是甜蜜點</strong>——可以容忍 1 副本掛掉而不影響可用性，成本三倍但 dollars 還能接受。
<strong>Quorum 預設 n=3, w=2, r=2</strong>（容忍 1 個失效）；高可靠用 n=5, w=3, r=3。</Callout>
    </div>
    <Footer source={'基本觀念/11 Replication.pdf · §6 Quorum + §11 Cost'} />
  </div>
);


const P34: Page = () => (
  <SectionEnd title={'Replication 完'} subtitle={'資料安全了，下一步——讀取怎麼變更快？'} next={'Topic 04 Caching</span>'} />
);


const P35: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 03 · TOPIC 04'} title={'Caching'} subtitle={'把貴的、慢的、共用的計算結果暫存——萬靈丹也是萬惡源'} />
);


const P36: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_caching_02_patterns} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P37: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_caching_03_stampede} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P38: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_caching_04_hotkey} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P39: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Cache 為何不可缺？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CACHING · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>50×</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>真實數字</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>從 Postgres 讀一筆 user profile ~ <strong>50 ms</strong></li>
          <li>從 Redis 讀同一筆 ~ <strong>1 ms</strong> → <strong>快了 50 倍</strong></li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Cache 的本質</strong>：把貴的、慢的、共用的結果存進記憶體，繞過磁碟。
<strong>Cache 的詛咒</strong>：「There are only two hard things in CS: cache invalidation and naming things.」 — Phil Karlton</Callout>
    </div>
    <Footer source={'基本觀念/09 Caching.pdf · §1 Why Cache'} />
  </div>
);


const P40: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Cache 該擺哪一層？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CACHING · 五層擺放</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌─────────────────────────────────────────────────────┐
│  ① Browser Cache       客戶端本地（Cache-Control）   │
├─────────────────────────────────────────────────────┤
│  ② CDN Edge Cache      地理就近（CloudFront、Akamai）│
├─────────────────────────────────────────────────────┤
│  ③ App-side Cache      Redis / Memcached（共享）     │
├─────────────────────────────────────────────────────┤
│  ④ Process-local Cache 進程內 LRU（無網路）          │
├─────────────────────────────────────────────────────┤
│  ⑤ DB Buffer Pool      InnoDB Buffer Pool（自動）    │
└─────────────────────────────────────────────────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>CDN 威力數字</strong>：跨洲（VA → 印度）原本 <strong>250-300 ms</strong>，CDN 邊緣快取 <strong>20-40 ms</strong>。延遲量級的差距。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_04_caching_01_hierarchy} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/09 Caching.pdf · §2 Layers'} />
  </div>
);


const P41: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Cache-aside vs Read-through vs Write-through vs Write-back</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CACHING · 模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Cache-aside（Lazy）</strong>
    讀 miss → 查 DB → 回填<br />
    最常見 · 面試預設答案</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Read-through</strong>
    Cache 自己負責回填<br />
    應用碼乾淨 · CDN 本質就是這個</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Write-through</strong>
    寫 cache + 同步寫 DB<br />
    一致性強 · 寫變慢 · 雙寫風險</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Write-back（Write-behind）</strong>
    寫 cache 即返回，背景刷 DB<br />
    最快 · 可能丟資料</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>90% 場景用 Cache-aside</strong>。寫密集且容忍丟資料用 Write-back（如 metrics pipeline）；金流類用 Write-through。</span></div>
    </div>
    <Footer source={'基本觀念/09 Caching.pdf · §3 Patterns'} />
  </div>
);


const P42: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>記憶體滿了，誰先走？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CACHING · Eviction 策略</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>策略</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>規則</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>代表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>LRU</strong>（最近最少使用）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>移除最久沒被存取的</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>預設首選 · 適合大多工作負載</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Redis · Memcached</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>LFU</strong>（最不常使用）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>移除存取次數最少的</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>長期持續熱門的 key</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>排行榜、熱門影片</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>FIFO</strong>（先進先出）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>按插入時間移除</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>生產環境少用</strong>（忽略使用模式）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>簡易快取層</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>TTL</strong>（存活時間）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不是淘汰策略，是過期時間</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>必須與 LRU/LFU 搭配</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>通用</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試標準答案</strong>：「我用 Redis，LRU eviction，個人資料 TTL 10 分鐘，更新時主動 invalidate。」</span></div>
    </div>
    <Footer source={'基本觀念/09 Caching.pdf · §4 Eviction Policy'} />
  </div>
);


const P43: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Penetration · Avalanche · Stampede</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CACHING · 三大反模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Cache Penetration · 穿透</strong>
查不存在的 key，每次都繞過 cache 打 DB。
<strong>解法</strong>：null 也快取（短 TTL）· Bloom filter 預判</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Cache Avalanche · 雪崩</strong>
大批 key 同時過期，瞬間打爆 DB。
<strong>解法</strong>：TTL 加隨機抖動（±10%）· 多級 cache · circuit breaker</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Cache Stampede / Thundering Herd · 擊穿</strong>
熱點 key 過期瞬間，並發請求都打到 DB（一個查詢瞬間變幾千個）。
<strong>最有效解法</strong>：<strong>Request Coalescing / Single-flight</strong>——只讓一個請求去重建，其他等待結果 · Cache warming（過期前主動刷新）</Callout>
    </div>
    <Footer source={'基本觀念/09 Caching.pdf · §5 Failure Modes'} />
  </div>
);


const P44: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>單一熱 key 也能打掛 Redis</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CACHING · Hot Key</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>情境</strong>：Twitter 上 Taylor Swift 的 `user:taylorswift` 這個 key，可能每秒收到幾百萬個請求。
就算其他都正常，<strong>這單一 key 就能把單台 Redis 節點打掛</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>三招應對</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>複製熱 key</strong>：同一個值存到多個 cache 節點，分散讀取負載（注意 TTL 不要完全相同，否則同時過期 → Stampede）</li>
          <li><strong>加行程內備援快取</strong>：極端熱門值存進 application 行程內，避免每次打 Redis</li>
          <li><strong>套用 Rate Limiting</strong>：對異常流量模式踩煞車</li>
        </ul>
    </div>
    <Footer source={'基本觀念/09 Caching.pdf · §5 Hot Keys'} />
  </div>
);


const P45: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Cache 的隱性成本</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CACHING · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Cache 帶來'} items={['讀延遲降到 ~ 1ms（純 RAM）', 'DB 壓力降 5-10 倍', '成本壓低（cache 比 DB 便宜）']} />
        <TradeoffCol tone='#E8634F' title={'Cache 的代價'} items={['多一層失敗點（Redis 掛了？）', '一致性窗口（DB 更新後 cache 還舊）', '記憶體成本 + eviction 策略要調', 'Debug 變難（cached vs fresh 永遠在猜）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>進入順序</strong>：先 measure 慢在哪，再加 cache。<strong>不要 premature caching</strong>。面試 5 步驟：確認瓶頸 → 決定快取什麼 → 選架構 → 設淘汰策略 → 說明缺點。</span></div>
    </div>
    <Footer source={'基本觀念/09 Caching.pdf · §6 Trade-offs + §7 Interview'} />
  </div>
);


const P46: Page = () => (
  <SectionEnd title={'Caching 完'} subtitle={'四個工具到齊——把它們組合起來看一個真實系統。'} next={'Recap & Case Study</span>'} />
);


const P47: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 03 · TOPIC 99'} title={'Case Study & Recap'} subtitle={'把分散式資料層的四個動作串起來看'} />
);


const P48: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>設計：Twitter Timeline 讀取</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE STUDY · 把分散式資料層串起來</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Sharding'} text={'user_id hash sharding · 100 shards · scatter-gather 取 followee tweets'} />
        <StackRow tone='#A1813F' label={'Replication'} text={'每 shard 3 副本（1 leader + 2 follower）· async replication'} />
        <StackRow tone='#5B7570' label={'Caching'} text={'熱用戶 timeline 預先 fan-out 寫 Redis · cache hit 95%+'} />
        <StackRow tone='#5B9770' label={'Routing'} text={'Twemproxy + consistent hashing 路由到對應 Redis 與 DB shard'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>每個決策都對應 Ch.3 的一個面向。
<strong>Ch.4 開始挖基礎設施層</strong>——這些 shard、cache、replica 跑在什麼之上？</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_99_recap_01_twitter} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整合 Ch.3 全章 + Twitter Engineering 公開資料'} />
  </div>
);


const P49: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第三章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新的工具'} items={['Consistent Hashing + Virtual Nodes', '3 種 Sharding 策略 + 分片鍵 3 條件', 'Sync / Async / Semi-sync 取捨', 'Single / Multi / Leaderless 三種拓撲', '5 層 Cache 擺放邏輯', 'Penetration / Avalanche / Stampede 三招']} />
        <TradeoffCol tone='#E8634F' title={'還沒回答的問題'} items={['用哪個資料庫產品？　→ Ch.4 DB', 'API Gateway 怎麼選？　→ Ch.4 GW', 'K8s 跟 Serverless 怎麼選？　→ Ch.4', '圖片影片怎麼存？　→ Ch.4 Blob']} />
      </div>
  </div>
);


const P50: Page = () => (
  <SectionEnd title={'Ch.3 完'} subtitle={'資料散開了，下一站看支撐這一切的基礎設施。'} next={'Ch.4 Infrastructure</span>'} />
);


export const meta: SlideMeta = { title: 'Ch.3 · Data Distribution' };
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
] satisfies Page[];
