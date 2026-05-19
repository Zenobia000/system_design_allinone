import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model from './assets/00_mental_model.png';
import img_01_database_01_matrix from './assets/01_database_01_matrix.png';
import img_01_database_02_nosql_grid from './assets/01_database_02_nosql_grid.png';
import img_02_blob_01_three_storage from './assets/02_blob_01_three_storage.png';
import img_02_blob_02_multipart from './assets/02_blob_02_multipart.png';
import img_02_blob_03_tier_ladder from './assets/02_blob_03_tier_ladder.png';
import img_03_gw_01_responsibilities from './assets/03_gw_01_responsibilities.png';
import img_03_gw_02_bff from './assets/03_gw_02_bff.png';
import img_04_lb_01_l4_vs_l7 from './assets/04_lb_01_l4_vs_l7.png';
import img_04_lb_02_algo_tree from './assets/04_lb_02_algo_tree.png';
import img_04_lb_03_sticky from './assets/04_lb_03_sticky.png';
import img_05_container_01_vm_vs_container from './assets/05_container_01_vm_vs_container.png';
import img_05_container_02_k8s from './assets/05_container_02_k8s.png';
import img_05_container_03_probes from './assets/05_container_03_probes.png';
import img_06_serverless_01_cold_start from './assets/06_serverless_01_cold_start.png';
import img_06_serverless_02_faas_flow from './assets/06_serverless_02_faas_flow.png';
import img_99_recap_01_video_arch from './assets/99_recap_01_video_arch.png';

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
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 00'} title={'Infrastructure'} subtitle={'支撐分散式系統的六大物件 · 每個都決定一道架構分水嶺'} />
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
        <StackRow tone='#D97757' label={'① 6 種資料庫選型怎麼選？'} text={'RDBMS / NoSQL / NewSQL / Search / Graph / TimeSeries'} />
        <StackRow tone='#A1813F' label={'② Blob Storage 為何這麼便宜？'} text={'物件儲存的設計原理'} />
        <StackRow tone='#5B7570' label={'③ API Gateway 與 LB 差在哪？'} text={'L4 vs L7 / 內外職責'} />
        <StackRow tone='#5B9770' label={'④ Container vs Serverless 怎麼選？'} text={'啟動成本 vs 控制力'} />
      </div>
    </div>
    <Footer source={'常用技術/01 + 02 + 03 + 04 + 05 + 06'} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 基礎設施的 3 個維度</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌──────────────────────────────────────────────────┐
│  COMPUTE      Container · Serverless · VM        │  ← Ch.4.5/6
├──────────────────────────────────────────────────┤
│  TRAFFIC      Load Balancer · API Gateway        │  ← Ch.4.3/4
├──────────────────────────────────────────────────┤
│  STORAGE      Database · Blob Storage            │  ← Ch.4.1/2
└──────────────────────────────────────────────────┘
        每一層都有「self-host vs 雲服務」的取捨`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>選型不是「哪個最強」，而是「哪個跟你的限制最相容」</strong>——團隊規模、預算、SLA、合規。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_00_mental_model} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整理自 常用技術/01-06'} />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 三個共用的選型問題</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>每個基礎設施元件，問同樣 3 個問題就能 80% 收斂：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 工作負載長什麼樣？'} text={'流量穩定還是峰谷？讀多還是寫多？同步還是事件驅動？'} />
        <StackRow tone='#A1813F' label={'② 容忍什麼程度的延遲與不可用？'} text={'P99 &lt; 50ms vs &lt; 1s · 4 個 9 vs 3 個 9'} />
        <StackRow tone='#5B7570' label={'③ 團隊有沒有人能維運？'} text={'沒人會的東西，再強也是地雷——選託管服務'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Linus 式判斷</strong>：90% 的「該選哪個」，靠這 3 題就能判出來。剩下 10% 才需要 benchmark。</Callout>
    </div>
    <Footer source={'整理自 常用技術/01-06'} />
  </div>
);


const P06: Page = () => (
  <SectionEnd title={'Overview 完'} subtitle={'先看資料層——Database 的 6 種模型怎麼選。'} next={'Topic 01 Database</span>'} />
);


const P07: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 01'} title={'Database'} subtitle={'選錯資料庫的代價：migrate 一張 10 億筆的表 = 數週工程 + 不可逆風險'} />
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_database_02_nosql_grid} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · DATABASE</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何沒有「最好的」資料庫？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DATABASE · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>每種資料庫都在 4 個維度做了取捨</strong>：  
<strong>模型</strong>（Relational / KV / Document / Graph） ·  
<strong>一致性</strong>（Strong / Eventual） ·  
<strong>擴展性</strong>（Vertical / Horizontal） ·  
<strong>查詢能力</strong>（SQL / API / Index 種類）</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>選錯資料庫的代價：<strong>migrate 一張 10 億筆的表 = 數週工程 + 不可逆風險</strong>。</div>
    </div>
    <Footer source={'常用技術/01 Database.pdf · §1 為什麼選擇這麼複雜'} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個維度看清資料庫全景</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DATABASE · 兩個正交維度</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'維度 1 · 資料模型 (Data Model)'} items={['固定 schema 表格 → RDBMS', '巢狀 JSON 文件 → Document', '純 key 取值 → KV Store', '節點 + 邊 → Graph', '向量空間 → Vector DB']} />
        <TradeoffCol tone='#E8634F' title={'維度 2 · 工作負載 (Workload)'} items={['OLTP：高並發點查詢、小量寫入', 'OLAP：海量歷史資料聚合分析', '典型：業務先 OLTP，再 ETL 到 OLAP', 'HTAP：兩種兼顧（代價大）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>兩維度正交（互相獨立）</strong>——「PostgreSQL OLTP」「ClickHouse OLAP」「Cassandra OLTP NoSQL」都是兩維交叉的結果。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_database_01_matrix} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/01 Database.pdf · §兩個維度看清資料庫的全景'} />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>6 種資料庫一張表看懂</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DATABASE · 六大類型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>類型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>代表</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>強項</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>痛點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>RDBMS</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PostgreSQL · MySQL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ACID · 任意 join · 成熟</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>水平擴展難</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>KV Store</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Redis · DynamoDB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>極快 · 簡單</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不適合複雜查詢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Document</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MongoDB · Couchbase</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Schema-flexible · 巢狀</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>join 弱 · ACID 限本文檔</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Wide-column</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cassandra · HBase</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫吞吐極高 · 線性擴展</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不適合即興查詢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Search</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Elasticsearch · OpenSearch</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全文 · Aggregation</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>非主存儲 · 一致性弱</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Graph</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Neo4j · Neptune</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>多跳關係查詢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫慢 · 規模有限</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Vector</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Pinecone · pgvector</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>相似度搜尋 (ANN)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>精確查詢能力弱</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>多數系統會混用 2-3 種</strong>：主資料 RDBMS · 熱資料 Redis · 全文搜尋 Elasticsearch。</span></div>
    </div>
    <Footer source={'常用技術/01 Database.pdf · §NoSQL 資料庫 + Vector Database'} />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 種 NoSQL 對應的代表場景</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DATABASE · NoSQL 適用場景</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Key-Value · Redis / DynamoDB</strong>
    Session、計數器、排行榜、快取<br />
    微秒級延遲 · 高吞吐</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Document · MongoDB</strong>
    用戶設定檔、CMS、產品目錄<br />
    schema 多變、快速迭代</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Wide-column · Cassandra / HBase</strong>
    時序資料、IoT、寫入吞吐極高<br />
    write anywhere · 多地部署</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Graph · Neo4j</strong>
    社交網路、推薦、知識圖譜<br />
    多跳查詢比 SQL JOIN 快幾個數量級</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>NoSQL 共同取捨</strong>：BASE 模型（Basically Available, Soft state, Eventual consistency）—— 放棄強一致性換水平擴展。</span></div>
    </div>
    <Footer source={'常用技術/01 Database.pdf · §NoSQL 資料庫'} />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>RDBMS vs NoSQL 的選型決策</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DATABASE · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'選 RDBMS（PostgreSQL 為先）'} items={['需要 join、事務、複雜查詢', '未來 schema 不確定，先 RDBMS', '單表 < 100GB · QPS < 5000', '<em>可惜的是：90% 工程師選 MongoDB 卻只用到 RDBMS 子集</em>']} />
        <TradeoffCol tone='#E8634F' title={'選 NoSQL'} items={['只查 by primary key', '寫遠多於讀（Cassandra）', '巢狀 JSON 是天然模型（Document）', 'Time-series（IoT、metrics）']} />
      </div>
      <Callout tone='#D97757'><strong>Linus 哲學的選型口訣</strong>：<strong>先 PostgreSQL</strong>。撐到撞牆再換——通常永遠撞不到牆。</Callout>
    </div>
    <Footer source={'常用技術/01 Database.pdf · §在面試中如何選擇資料庫'} />
  </div>
);


const P14: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三步收斂選型 + 一句說理由</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DATABASE · 面試答題公式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Step 1 · 形狀</strong>
有固定結構、需 JOIN → RDBMS · KV 取值 → DynamoDB/Redis · 巢狀 → MongoDB · 關係多跳 → Neo4j · 相似度 → Vector DB</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Step 2 · OLTP 還是 OLAP</strong>
業務交易 + ACID → OLTP · 海量歷史聚合 → OLAP（BigQuery / ClickHouse / Redshift），考慮獨立資料倉儲</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Step 3 · 規模與一致性取捨</strong>
強一致 + 複雜查詢 → RDBMS · 輕鬆水平擴展、可接受最終一致 → NoSQL</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>最後一定要說選的「理由」</strong>——選 PostgreSQL 強調 ACID、選 Cassandra 強調寫吞吐 + 多地部署、選 BigQuery 強調 column-oriented 加速分析。</span></div>
    </div>
    <Footer source={'常用技術/01 Database.pdf · §不要一開始就比較 SQL vs NoSQL + §說出你的理由'} />
  </div>
);


const P15: Page = () => (
  <SectionEnd title={'Database 完'} subtitle={'結構化資料解決了——下一站處理大檔案。'} next={'Topic 02 Blob Storage</span>'} />
);


const P16: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 02'} title={'Blob Storage'} subtitle={'二進位資料不進資料庫——這是現代系統設計的鐵律之一'} />
);


const P17: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_blob_01_three_storage} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_blob_03_tier_ladder} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 2 · BLOB STORAGE</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何不把圖片影片放 DB？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BLOB STORAGE · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>100×</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>把 1GB 影片塞進 PostgreSQL：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>儲存成本</strong>：DB 儲存 ~ Blob 儲存的 <strong>10-100 倍</strong></li>
          <li><strong>備份成本</strong>：DB backup 要連影片一起備</li>
          <li><strong>查詢污染</strong>：vacuum / analyze 全被大檔案拖慢</li>
          <li><strong>CDN 整合</strong>：DB → CDN 中間隔了一層應用</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：用 BYTEA / BLOB 欄位存大檔。應該存 <strong>URL</strong> 指向 S3 / GCS。</Callout>
    </div>
    <Footer source={'常用技術/02 Blob Storage.pdf · §什麼是 Blob Storage'} />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>File / Block / Object 走的是不同路</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BLOB STORAGE · 三種儲存對比</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>類型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>資料模型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>修改方式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>代表產品</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>File Storage</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>樹狀目錄 + 檔案</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>就地修改檔案某幾行</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>NFS · SMB · EFS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Block Storage</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>固定大小區塊</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>OS 層次位址讀寫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>EBS · Persistent Disk</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Object Storage</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>扁平 key → value</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>不可變</strong> · 整體覆寫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>S3 · GCS · Azure Blob</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Object Storage 的取捨本質</strong>：你放棄了「就地修改」與「低延遲隨機存取」，<strong>換到</strong> 11 個 9 耐久性、近乎無限水平擴展、極低儲存成本。</Callout>
    </div>
    <Footer source={'常用技術/02 Blob Storage.pdf · §什麼是 Blob Storage'} />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Object Storage 為何便宜又好？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BLOB STORAGE · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 扁平命名空間'} text={'沒有目錄樹開銷 · 純 key → value（前綴只是顯示慣例）'} />
        <StackRow tone='#A1813F' label={'② 強耐久性'} text={'11 個 9（99.999999999%）· 跨 3 個 AZ 自動複製'} />
        <StackRow tone='#5B7570' label={'③ HTTP 原生'} text={'直接被 CDN 包覆 · 客戶端 presigned URL 上傳'} />
        <StackRow tone='#5B9770' label={'④ 分層存儲'} text={'Hot / Warm / Cold / Archive · 自動降冷'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>S3 收費分 3 部分</strong>：儲存（$/GB-month） + 請求次數（$/1000 ops） + 傳輸（$/GB out）。<strong>讀流量是大頭</strong>——所以才需要 CDN。</span></div>
    </div>
    <Footer source={'常用技術/02 Blob Storage.pdf · §核心概念 + §耐久性和可用性'} />
  </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>越冷越便宜，但取回越貴</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BLOB STORAGE · 5 個儲存等級</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>等級</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適合場景</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>取回延遲</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>儲存成本</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>取回費</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Standard</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>頻繁存取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>毫秒</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>無</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Infrequent Access</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每月幾次</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>毫秒</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>~ Std × 0.5</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>有</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Glacier Instant</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每季一次</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>毫秒</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>較高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Glacier Flexible</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>備份、幾小時內取回</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分鐘-小時</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>很低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>更高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Glacier Deep Archive</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>法規歸檔、極少取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最長 12 小時</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>~ Std × 0.1</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最高</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：把熱資料丟去 Glacier 省錢——一次大規模取回的費用可能遠超你省下的儲存成本。</Callout>
    </div>
    <Footer source={'常用技術/02 Blob Storage.pdf · §儲存分層'} />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>大檔案上傳的 3 個必學模式</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BLOB STORAGE · 模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Presigned URL Upload</strong>
Client 跟 Server 拿短時效 URL，<strong>直接上傳到 S3</strong>，不經過你的伺服器。<br />
<strong>好處</strong>：節省你 server 的頻寬與 RAM，避免 1GB 檔案塞爆 worker。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Multipart Upload</strong>
大檔切成 5MB 小塊並行上傳，<strong>單塊失敗只重傳該塊</strong>。<br />
<strong>門檻</strong>：&gt; 100 MB 都該用，&gt; 5 GB 必須用（S3 單次 PUT 上限）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Lifecycle Policy</strong>
<strong>冷資料自動降冷</strong>：30 天後降 Standard-IA · 90 天後降 Glacier · 7 年後刪除。<br />
<strong>典型場景</strong>：log、備份、用戶上傳的歷史檔案——存了 7 年沒人看。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_02_blob_02_multipart} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/02 Blob Storage.pdf · §生命週期策略'} />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 件不能漏的設計</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BLOB STORAGE · 安全與災備</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>私有 Bucket + Presigned URL</strong>
    預設封鎖所有公開存取<br />
    用簽名 URL 授予「個別物件 + 有效期」</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Bucket Policy vs IAM</strong>
    IAM = 身份視角的權限<br />
    Bucket Policy = 資源視角（可跨帳號）</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Versioning · 對抗誤刪</strong>
    啟用後刪除只是加標記<br />
    搭配 lifecycle 限制歷史版本數</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Cross-Region Replication</strong>
    災難恢復 + 讀延遲優化<br />
    非同步、秒-分鐘級</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>最常見資安事件</strong>：S3 Bucket 配置成公開——用 S3 Access Analyzer 持續掃描。</Callout>
    </div>
    <Footer source={'常用技術/02 Blob Storage.pdf · §存取控制 + §跨區域複製 + §怎麼防止 S3 Bucket 被公開曝露'} />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Blob Storage 不是萬能</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BLOB STORAGE · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'放 Blob Storage'} items={['大型二進位資料（圖片、影片、模型檔）', '只按 key 取整個物件', '需要極高耐久性 + 低成本', '一旦寫入很少修改']} />
        <TradeoffCol tone='#E8634F' title={'不要丟 Blob Storage'} items={['需要按內容查詢（搜尋）', '需要就地修改一小段', '需要低延遲隨機存取（&lt; ms）', '資料單元 &lt; 幾 KB（用 DB）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>典型分工</strong>：DB 存 metadata（key、大小、所有者、上傳時間） + Blob Storage 存實際 bytes。需要搜尋就把 metadata 索引到 Elasticsearch。</span></div>
    </div>
    <Footer source={'常用技術/02 Blob Storage.pdf · §怎麼決定用哪個'} />
  </div>
);


const P26: Page = () => (
  <SectionEnd title={'Blob Storage 完'} subtitle={'資料存好了——下一站處理進入系統的流量。'} next={'Topic 03 API Gateway</span>'} />
);


const P27: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 03'} title={'API Gateway'} subtitle={'微服務的前門——把橫切關注點集中，讓業務碼乾淨'} />
);


const P28: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_gw_01_responsibilities} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 3 · API GATEWAY</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何要在 LB 前面再放一層？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API GATEWAY · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Load Balancer = 流量分發</strong>（L4/L7）。  
<strong>API Gateway = 應用層的瑞士刀</strong>——認證、限流、路由、版本、熔斷、聚合。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>把這些「橫切關注點」從業務服務抽出，<strong>業務碼乾淨</strong></li>
          <li>對外提供一致 API，內部可自由演化（v1 → v2、Microservice 拆分）</li>
        </ul>
    </div>
    <Footer source={'常用技術/03 API Gateway.pdf · §什麼是 API Gateway'} />
  </div>
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Gateway 該扛的 7 件事</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API GATEWAY · HOW</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Authn / Authz</strong>
    JWT 驗證 · OAuth · API Key</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Rate Limiting</strong>
    Token bucket / Leaky bucket</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Routing</strong>
    路徑 / Header / Geo 路由</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Aggregation</strong>
    BFF · 1 個請求合併多後端</div>
      </div>
    <Footer source={'常用技術/03 API Gateway.pdf · §API Gateway 的核心職責'} />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Gateway 認證 vs 服務授權</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API GATEWAY · 認證職責切分</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`Client                  API Gateway              後端服務
  |--- GET /orders --->|                          |
  |    Bearer <JWT>    |--- 驗證 JWT 簽名          |
  |                    |--- 解析 user_id: 123     |
  |                    |--- GET /orders --------->|
  |                    |    X-User-Id: 123        |
  |                    |    X-User-Roles: admin   |
  |<-- 200 OK ---------|<-- 200 OK ---------------|`}</pre>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Gateway 做認證 (Authn)</strong>
驗 JWT 簽名與有效期——<strong>「這個 token 是真的、沒過期」</strong>。技術層驗證，業務無關。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>服務做授權 (Authz)</strong>
<strong>「這個用戶能不能看這筆訂單？」</strong>——細粒度授權需要資料庫查詢，留在服務裡。</Callout>
    </div>
    <Footer source={'常用技術/03 API Gateway.pdf · §怎麼做認證：在 Gateway 還是在服務裡'} />
  </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 個典型 Gateway 怎麼選</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API GATEWAY · 主流產品對比</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>產品</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>性質</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適合</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>痛點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AWS API Gateway</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全託管 Serverless</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Lambda 整合、不想管基礎設施</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>進階路由受限、高流量貴</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Kong</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>開源（基於 Nginx）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高度客製化、有 Nginx 經驗</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自己維運、plugin 生態學習曲線</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Envoy / Istio</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>服務網格核心</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>K8s 環境、東西向流量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>配置複雜、運維重</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Nginx / Traefik</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>輕量 reverse proxy</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>簡單路由 + SSL 終止</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>進階功能（限流、認證）需擴充</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>典型分工</strong>：外部入口用 Kong / AWS API GW；內部 service-to-service 用 Envoy + Service Mesh。兩者職責不同，常常並存。</span></div>
    </div>
    <Footer source={'常用技術/03 API Gateway.pdf · §常見的 API Gateway 實作'} />
  </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Gateway 不是免費</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API GATEWAY · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Gateway 帶來'} items={['橫切關注點集中管理', '後端可任意演化', '對外一致 API surface']} />
        <TradeoffCol tone='#E8634F' title={'Gateway 的代價'} items={['多一跳延遲（~ 1-5 ms）', '單點故障（必須多實例 + LB）', 'config 過度膨脹（YAML 地獄）', '業務邏輯誤滑入 Gateway 層']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：把太多業務邏輯塞進 Gateway，它變成「第二個 monolith」——難測試、難維護。Gateway 應該是<strong>薄薄的、可預期的轉發層</strong>。</Callout>
    </div>
    <Footer source={'常用技術/03 API Gateway.pdf · §總結 + §API Gateway 的效能怎麼保證'} />
  </div>
);


const P34: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>不同客戶端維護各自的 Gateway</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API GATEWAY · BFF 模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`Web Browser    → Web BFF       ──┐
iOS App        → Mobile BFF    ──┼──→ 後端微服務
Android App    → Mobile BFF    ──┤
Third-party    → Public API GW ──┘`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Web BFF'} text={'大量資料聚合、回傳豐富 JSON（頻寬充足）'} />
        <StackRow tone='#A1813F' label={'Mobile BFF'} text={'精簡欄位、減少流量（4G 環境）'} />
        <StackRow tone='#5B7570' label={'Public API GW'} text={'嚴格版本化（/v1/、/v2/）、向後兼容'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>代價</strong>：你現在有多個 Gateway 要維護。<strong>只有當客戶端差異夠大時 BFF 才划算</strong>——小團隊用一個統一 Gateway 就好。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_03_gw_02_bff} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/03 API Gateway.pdf · §BFF（Backend for Frontend）模式'} />
  </div>
);


const P35: Page = () => (
  <SectionEnd title={'API Gateway 完'} subtitle={'入口的職責清楚了——往下看流量怎麼分配到實例。'} next={'Topic 04 Load Balancer</span>'} />
);


const P36: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 04'} title={'Load Balancer'} subtitle={'流量分配的本質不是「平均」，而是「整體吞吐最大化、避免局部過載」'} />
);


const P37: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_lb_01_l4_vs_l7} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P38: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_lb_03_sticky} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P39: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 4 · LOAD BALANCER</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何水平擴展非要 LB 不可？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LOAD BALANCER · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>Ch.1.3 講過</strong>：水平擴展三前提之一是「可路由」。LB 就是那個路由器。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>LB 解 4 件事</strong>：  
① 流量分配 ② 健康檢查（壞節點剔除）  
③ TLS 終止（unburden 後端）④ Sticky session（必要時）</Callout>
    </div>
    <Footer source={'常用技術/04 Load Balancer.pdf · §基本概念 + §核心功能'} />
  </div>
);


const P40: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>L4 vs L7</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LOAD BALANCER · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>L4 LB（傳輸層）</strong>
    依 IP + Port 分發 · 不看 payload<br />
    超快（~10M conn/s）· 透明 TCP/UDP</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>L7 LB（應用層）</strong>
    依 HTTP path / header / cookie<br />
    慢一點 · 但能做 routing / rewrite</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>速答法則</strong>
<strong>WebSocket / 長連線</strong> → L4 LB（不會頻繁斷線重建）<br />
<strong>一般 HTTP/HTTPS</strong> → L7 LB（更靈活的內容路由）</Callout>
    </div>
    <Footer source={'常用技術/04 Load Balancer.pdf · §在系統設計面試中如何談 Load Balancer'} />
  </div>
);


const P41: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>5 種演算法的盲點</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LOAD BALANCER · 演算法</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>演算法</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>行為</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>盲點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Round Robin</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>輪流派發</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>後端規格一致、請求時長相近</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>請求時長差異大會積壓</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Least Connections</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>派給連線最少的</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>長連線（WebSocket）、API 處理時間差大</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>連線數 ≠ CPU 負載</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Weighted RR</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>依權重派發</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>後端規格不一（混合機型）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>靜態權重，無法即時反應壓力</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>IP Hash</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>同 IP 永遠同節點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Sticky session（不推薦）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>企業 NAT 出口會集中流量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Power of Two Choices</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>隨機 2 選最少</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>大規模、多 LB 不需共享狀態</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>實作不普及</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>現代雲端 LB 通常結合即時負載資訊（連線數、延遲、錯誤率）做動態調整</strong>——比靜態演算法聰明得多。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_04_lb_02_algo_tree} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/04 Load Balancer.pdf · §常見演算法'} />
  </div>
);


const P42: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>健康檢查的 3 個設計陷阱</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LOAD BALANCER · Health Check</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>頻率太低</strong>
故障切換慢——壞節點還在收流量幾十秒，用戶不停看到 5xx。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>頻率太高</strong>
給後端額外負擔——10ms 一次的 health check 等於每秒 100 次空打。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>邏輯過於簡單</strong>
誤判——只 check 「process 還活著嗎」，但服務的 DB 連線已掛、根本處理不了請求。應該檢查依賴（DB / Redis）的可達性。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：把 health check endpoint 做成「永遠回 200」——這等於沒做。要真的檢查關鍵依賴。</Callout>
    </div>
    <Footer source={'常用技術/04 Load Balancer.pdf · §健康檢查（Health Check）'} />
  </div>
);


const P43: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Sticky Session 的副作用</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LOAD BALANCER · Sticky Session</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'它解的問題'} items={['Session 存在應用本地記憶體', '同一用戶請求黏到同一節點', '避免跨節點同步成本', '實作快、改動小']} />
        <TradeoffCol tone='#E8634F' title={'它帶來的問題'} items={['流量分佈不均（熱節點）', '節點掛掉 → session 直接消失', '擴縮容時 hash 大幅變動', '違反「無狀態服務」設計原則']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>正解</strong>：把 session 外移到 Redis / 資料庫，讓應用層保持 stateless。Sticky Session 是過渡方案，不是長期最優架構。</span></div>
    </div>
    <Footer source={'常用技術/04 Load Balancer.pdf · §Session Persistence（Sticky Session）'} />
  </div>
);


const P44: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>下線節點的優雅關閉</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LOAD BALANCER · Connection Draining</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[正常運行]
  LB → Node-A (active)
  LB → Node-B (active)

[Node-A 要下線]
  ① LB 標記 Node-A 為 draining
  ② 不再派新連線給 Node-A
  ③ 等待現有連線完成（timeout：30s-5min）
  ④ 確認無連線後才停 process`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Connection Draining 解的核心問題</strong>：滾動更新、scale-in、節點維護時，<strong>正在處理的請求不會被硬切斷</strong>。和容器的 graceful shutdown 配合（SIGTERM 後先拒絕新請求、等舊的處理完）。</Callout>
    </div>
    <Footer source={'常用技術/04 Load Balancer.pdf · §健康檢查 + 對應雲端服務行為（ALB connection draining 預設 300s）'} />
  </div>
);


const P45: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Edge → Internal → Service Mesh</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LOAD BALANCER · 部署拓撲</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`Internet
   │
   ▼
[ Anycast / DNS LB ]   ← 1. Geo-LB（CloudFlare、Route53）
   │
   ▼
[ L4 LB · ELB-NLB ]    ← 2. Edge L4（TLS pass-through）
   │
   ▼
[ L7 LB · ALB / Nginx ] ← 3. App L7（HTTP routing）
   │
   ▼
[ Service Mesh · Envoy ] ← 4. Internal mesh（mTLS、retry）
   │
   ▼
[ Service Pod ]`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>現代雲端通常 4 層 LB 串聯</strong>——每層解決一個獨立問題。簡單系統可省略 1-2 層。</span></div>
    </div>
    <Footer source={'常用技術/04 Load Balancer.pdf · §多區域分流 + 整理自雲端典型架構'} />
  </div>
);


const P46: Page = () => (
  <SectionEnd title={'Load Balancer 完'} subtitle={'流量分到實例了——但「實例」本身怎麼跑？'} next={'Topic 05 Container</span>'} />
);


const P47: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 05'} title={'Container'} subtitle={'「應用 + 依賴」打成一個不可變的包，到處都跑得起來'} />
);


const P48: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_05_container_01_vm_vs_container} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P49: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 5 · CONTAINER</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何 Container 取代 VM？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTAINER · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>10×</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>VM</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Container</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>啟動時間</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>30s-3min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100ms-1s</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>記憶體開銷</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1-2 GB（含完整 OS）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10-50 MB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>密度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10/host</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100/host</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>隔離邊界</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>完整 kernel 隔離</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>行程層、共用 host kernel</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Container 革命的本質</strong>：把「應用 + 依賴」打成一個不可變的包，<strong>到處都跑得起來</strong>。底層機制是 Linux <strong>namespace</strong>（process / network / fs 隔離） + <strong>cgroups</strong>（CPU / memory 限制）。</Callout>
    </div>
    <Footer source={'常用技術/05 Container.pdf · §虛擬機器 vs. 容器'} />
  </div>
);


const P50: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Container vs VM 該選哪個？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTAINER · 隔離邊界</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'用 Container（90% 場景）'} items={['微服務、API、worker、排程', '啟動快、密度高、CI/CD 順暢', '同一 OS / kernel 的工作負載']} />
        <TradeoffCol tone='#E8634F' title={'用 VM'} items={['強安全隔離（多租戶 SaaS）', '跑不同 OS（Windows on Linux host）', 'Legacy 應用無法容器化', 'Lambda / Fargate 底層用 microVM']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Image 標準</strong>：OCI（Open Container Initiative）image spec 是業界標準——Docker、containerd、Podman 都遵循。換 runtime 不換 image。</span></div>
    </div>
    <Footer source={'常用技術/05 Container.pdf · §容器和 VM 在你的設計裡什麼時候各自適合'} />
  </div>
);


const P51: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>K8s 的核心概念對應</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTAINER · 編排層</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Pod'} text={'一組共享網路與儲存的 container · 排程的最小單元'} />
        <StackRow tone='#A1813F' label={'Deployment'} text={'宣告式管理 Pod 副本數與滾動更新'} />
        <StackRow tone='#5B7570' label={'Service'} text={'給 Pod 一個穩定的 DNS 與 cluster IP（內建 LB）'} />
        <StackRow tone='#5B9770' label={'Ingress'} text={'對外的 L7 入口（通常背後是 Nginx / Envoy）'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>K8s 解的核心問題</strong>：node 壞掉 / 流量變化 / 版本切換時，<strong>自動把目標狀態 reconcile 出來</strong>。HPA 根據 CPU / 記憶體 / 自訂指標自動擴縮 Pod 數量。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_05_container_02_k8s} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/05 Container.pdf · §Kubernetes 的核心概念'} />
  </div>
);


const P52: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩種探針的職責切分</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTAINER · Liveness vs Readiness</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Liveness Probe</strong>
<strong>「容器還活著嗎？」</strong>——失敗就 kill + restart。<br />
適合檢查：process 還在、deadlock 沒發生。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Readiness Probe</strong>
<strong>「容器準備好接流量了嗎？」</strong>——失敗就從 Service 後端移除（不重啟）。<br />
適合檢查：DB 連線、cache warm-up 完成。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：兩個 probe 都打同一個 endpoint。Liveness 該寬鬆（避免重啟風暴），Readiness 該嚴格（暖機中先別接流量）。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_05_container_03_probes} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/05 Container.pdf · §容器崩潰了怎麼辦'} />
  </div>
);


const P53: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Stateless 是容器化的前提</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTAINER · 無狀態設計</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`Session / 用戶狀態  →  Redis
持久化資料         →  PostgreSQL / MySQL
檔案、媒體         →  S3 / Object Storage
服務間設定         →  ConfigMap / Secrets / 環境變數`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>核心原則</strong>：容器本身是短暫的（ephemeral），任何需要跨請求保留的東西都必須<strong>外部化</strong>。  
有狀態 = 容器 A 重啟後存在它記憶體裡的 session 全部消失，用戶被登出。</Callout>
    </div>
    <Footer source={'常用技術/05 Container.pdf · §無狀態設計的重要性'} />
  </div>
);


const P54: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>該不該上 K8s？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CONTAINER · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'該上 K8s'} items={['10+ 個服務、跨 team', '需要滾動更新、藍綠部署', '有 SRE 團隊維運', '多環境（dev/staging/prod）一致性']} />
        <TradeoffCol tone='#E8634F' title={'不該上 K8s'} items={['< 5 個服務 → docker-compose 夠', '沒有專人懂網路 / RBAC / Helm', '業務未驗證 → ECS / Cloud Run 更省心', '單體應用 → VM 部署最省事']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：3 人團隊上 K8s。<strong>運維時間 &gt; 業務時間</strong>，從第一天起就在開倒車。</Callout>
    </div>
    <Footer source={'常用技術/05 Container.pdf · §什麼時候在面試裡用這些'} />
  </div>
);


const P55: Page = () => (
  <SectionEnd title={'Container 完'} subtitle={'容器有狀態包袱——下一站看完全無狀態的 FaaS。'} next={'Topic 06 Serverless</span>'} />
);


const P56: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 06'} title={'Serverless'} subtitle={'Serverless 不是「沒有伺服器」，是「你不需要管」'} />
);


const P57: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_06_serverless_01_cold_start} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P58: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 6 · SERVERLESS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何 FaaS 是某些場景的最優解？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SERVERLESS · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Serverless 的本質</strong>：你寫一個 function，雲端負責<strong>啟動 / 擴展 / 計費 / 修補</strong>。  
不用想機器、不用想 OS、按執行毫秒數收費。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>完美場景</strong>：流量極不規律（每天幾次） · 偶發異步任務 · 邊緣計算</li>
          <li><strong>不適合</strong>：穩定高負載（成本反而貴 5-10×）· 長時任務 · 需要 long-lived connection</li>
        </ul>
    </div>
    <Footer source={'常用技術/06 Serverless.pdf · §什麼是 Serverless'} />
  </div>
);


const P59: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Cold Start 的數字長什麼樣</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SERVERLESS · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`請求 → Lambda
        │
        ├─ Init container（首次：幾百 ms - 幾秒）
        ├─ Init runtime（語言相關：Node/Python ~ 100ms · Java/.NET 可達數秒）
        └─ Execute function（warm：< 50ms · 無額外延遲）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>語言</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Cold Start 典型範圍</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Python / Node.js</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100-500 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Go / Rust（編譯）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100-300 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Java / .NET（JVM/CLR）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1-5 秒</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Container Image Lambda</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>比 zip 慢，但能裝大依賴（ML model）</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Warm 期</strong>：函式執行完不會立刻銷毀，保溫 5-15 分鐘。下次請求進來直接 warm start，無額外延遲。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_06_serverless_02_faas_flow} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/06 Serverless.pdf · §Cold Start 與 Warm Start'} />
  </div>
);


const P60: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Cold Start 的緩解手段</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SERVERLESS · 三層降溫</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Provisioned Concurrency'} text={'預熱 N 個實例 · cold start 降到 0 · 但要付閒置費'} />
        <StackRow tone='#A1813F' label={'② Init 程式碼移出 handler'} text={'DB 連線、設定載入放在 handler 外面，warm 時不重執行'} />
        <StackRow tone='#5B7570' label={'③ SnapStart（AWS Java）'} text={'JVM 啟動快照 · 降 10× cold start'} />
        <StackRow tone='#5B9770' label={'④ Warm-up 排程'} text={'EventBridge 定期 ping 函式保熱（土法但有效）'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>重要區分</strong>：<strong>非同步場景</strong>（SQS 觸發、排程）—— Cold Start 多幾百毫秒<strong>完全無所謂</strong>。只有<strong>同步 API 請求</strong>（P99 SLA &lt; 100ms）才需要認真考慮。</Callout>
    </div>
    <Footer source={'常用技術/06 Serverless.pdf · §Cold Start 怎麼辦'} />
  </div>
);


const P61: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>場景判準</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SERVERLESS · 適合 / 不適合</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'選 Serverless'} items={['事件驅動（S3 上傳、SNS、API GW）', '流量峰谷明顯（白天百人晚上零）', '排程任務（cron / EventBridge）', '邊緣計算（Lambda@Edge、CF Workers）', '< 15 分鐘短任務']} />
        <TradeoffCol tone='#E8634F' title={'不要選 Serverless'} items={['持續高 QPS（容器成本 1/3-1/10）', '長任務（&gt; 15 分鐘 Lambda 上限）', 'P99 &lt; 100ms 嚴格 SLA', 'WebSocket / 長連線 / streaming', '需要本地快取 / 連線池']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Hybrid 是常態</strong>：核心服務跑 Container，事件處理跑 Lambda。一個系統不用 all-in 或 all-out。</span></div>
    </div>
    <Footer source={'常用技術/06 Serverless.pdf · §Serverless 適合什麼 + §Serverless 不適合什麼'} />
  </div>
);


const P62: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Lambda + RDS 的經典痛點</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SERVERLESS · 連線打爆陷阱</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`傳統服務：1 process → DB 連線池（50 條）→ DB
Lambda：1000 並發實例 → 各自開連線 → DB 直接被打掛`}</pre>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>RDS Proxy / PgBouncer</strong>
連線池代理 · Lambda 連到代理 · 代理用少量長連線餵 DB<br />
<strong>結構</strong>：Lambda × 1000 → RDS Proxy → RDS（50 連線）</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>DynamoDB</strong>
天然 Serverless 資料庫 · 沒有連線概念 · 按請求計費<br />
<strong>Lambda + DynamoDB</strong> 是最自然的全 Serverless 組合</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：把 PostgreSQL/MySQL 直接接 Lambda——並發一上來連線池立刻爆。<strong>必須</strong>配 RDS Proxy 或選 DynamoDB。</Callout>
    </div>
    <Footer source={'常用技術/06 Serverless.pdf · §處理資料庫連線'} />
  </div>
);


const P63: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>怎麼判斷 Serverless 划不划算</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SERVERLESS · 成本估算</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`範例：每天 100 萬請求 · 平均 200ms · 512MB 記憶體

每月請求費用：30 × 1M × $0.2/1M       = $6
每月執行費用：30 × 1M × 0.2s × 0.5GB
              × $0.000016/GB-s         = $48
合計：約 $54/月

對比 EC2 t3.small（2GB / 2 vCPU）：~$15/月（不限請求量）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>判斷口訣</strong>：流量穩定 + 請求量大 → 容器更便宜。  
流量峰谷大（一天閒置 12+ 小時）→ Serverless 實際費用可能是估算的一半甚至更少。</Callout>
    </div>
    <Footer source={'常用技術/06 Serverless.pdf · §Serverless 的成本怎麼估算'} />
  </div>
);


const P64: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Lambda vs Container 選型</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SERVERLESS · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'選 Lambda'} items={['事件驅動（S3 上傳、SNS、API GW）', '流量不規律（QPS 0-1000 跳動）', '< 15 分鐘短任務', '不想管 server / OS / scaling']} />
        <TradeoffCol tone='#E8634F' title={'選 Container（K8s / ECS）'} items={['穩定高 QPS（成本 1/3-1/10）', '長任務 / WebSocket / streaming', '需要本地檔案系統', '需要 deterministic 啟動']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Vendor lock-in 取捨</strong>：Lambda 用了 SQS / DynamoDB / EventBridge 後，搬遷成本高。面試時主動承認這個取捨——「換不需要管基礎設施」。</span></div>
    </div>
    <Footer source={'常用技術/06 Serverless.pdf · §Serverless 與其他部署方式的比較 + §Serverless 有 vendor lock-in 的問題嗎'} />
  </div>
);


const P65: Page = () => (
  <SectionEnd title={'Serverless 完'} subtitle={'6 個基礎設施都看過了——把它們串成一個真實系統。'} next={'Topic 99 CASE STUDY + RECAP</span>'} />
);


const P66: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 04 · TOPIC 99'} title={'Case Study & Recap'} subtitle={'把 6 個基礎設施串成一個真實系統'} />
);


const P67: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>設計：6 個基礎設施一次到位</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE STUDY · 影片上傳 + 轉碼 + 播放</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Storage'} text={'原始影片：S3（presigned upload + multipart）· metadata：PostgreSQL'} />
        <StackRow tone='#A1813F' label={'Compute'} text={'上傳完觸發 Lambda → 推 SQS → ECS 跑 ffmpeg 轉碼'} />
        <StackRow tone='#5B7570' label={'Traffic'} text={'API Gateway 認證 + 限流 → ALB L7 → ECS Service'} />
        <StackRow tone='#5B9770' label={'Delivery'} text={'轉碼完成寫回 S3 · CloudFront CDN 邊緣分發給觀眾'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>每個元件都對應 Ch.4 的一個 topic。<strong>選型理由說得出來，才算真的會設計</strong>。</Callout>
    </div>
    <Footer source={'整合 Ch.4 全章 + AWS Reference Architecture'} />
  </div>
);


const P68: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為什麼這樣搭</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE STUDY · 選型理由說明</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>元件</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>選擇</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>理由</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>原始影片</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>S3 + Multipart</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>大檔（GB 級）· 不可變 · 11 個 9 耐久</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Metadata</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PostgreSQL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>強一致 · 多欄位查詢（用戶、狀態、時間）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>上傳觸發</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>S3 Event → Lambda</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>事件驅動 · 沒有上傳就不花錢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>轉碼</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ECS（Container）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>長任務（&amp;gt; 15 min）· Lambda 上限不夠</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>入口</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>API Gateway</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>JWT 認證 + 限流 · 集中管理</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>流量分發</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ALB（L7）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>HTTP routing · TLS 終止</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>觀眾分發</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CloudFront CDN</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全球邊緣快取 · 降原站流量</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>為什麼上傳用 Lambda、轉碼用 Container</strong>？因為上傳是事件觸發 + 短任務，轉碼是長計算 + 穩定 batch——<strong>選最合適的工具，不要 all-in 一種</strong>。</span></div>
    </div>
    <Footer source={'整合 Ch.4 全章選型決策'} />
  </div>
);


const P69: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第四章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新的工具'} items={['6 種 DB 選型決策表（含 Vector DB）', 'Blob 三模式（Presigned / Multipart / Lifecycle）', 'API Gateway 7 件事清單 + BFF 模式', 'L4 / L7 LB + 部署拓撲 + Connection Draining', 'Container vs Serverless 選型 + Cold Start 數字']} />
        <TradeoffCol tone='#E8634F' title={'還沒回答的問題'} items={['節點掛了怎麼辦？　→ Ch.5 Reliability', '流量瞬間 10 倍怎麼擋？　→ Ch.5 Overload', '怎麼確保訊息不丟？　→ Ch.5 Reliable Delivery', '系統黑盒裡發生什麼？　→ Ch.5 Observability']} />
      </div>
  </div>
);


const P70: Page = () => (
  <SectionEnd title={'Ch.4 完'} subtitle={'基礎設施清楚了，下一站讓系統在故障中存活。'} next={'Ch.5 Reliability & Ops</span>'} />
);


export const meta: SlideMeta = { title: 'Ch.4 · Infrastructure' };
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
  P56,
  P57,
  P58,
  P59,
  P60,
  P61,
  P62,
  P63,
  P64,
  P65,
  P66,
  P67,
  P68,
  P69,
  P70,
] satisfies Page[];
