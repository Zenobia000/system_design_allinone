import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model from './assets/00_mental_model.png';
import img_01_networking_01_stack from './assets/01_networking_01_stack.png';
import img_01_networking_02_rtt from './assets/01_networking_02_rtt.png';
import img_01_networking_03_tls from './assets/01_networking_03_tls.png';
import img_01_networking_04_cdn from './assets/01_networking_04_cdn.png';
import img_01_networking_05_circuit from './assets/01_networking_05_circuit.png';
import img_02_client_server_01_vs_p2p from './assets/02_client_server_01_vs_p2p.png';
import img_02_client_server_02_matrix from './assets/02_client_server_02_matrix.png';
import img_03_scalability_01_up_vs_out from './assets/03_scalability_01_up_vs_out.png';
import img_03_scalability_02_three_prereq from './assets/03_scalability_02_three_prereq.png';
import img_04_api_design_01_decision_tree from './assets/04_api_design_01_decision_tree.png';
import img_04_api_design_02_idempotency from './assets/04_api_design_02_idempotency.png';
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
  <ChapterDivider eyebrow={'CHAPTER · 01 · OVERVIEW'} title={'Foundation Layer'} subtitle={'四件事，所有系統的地基'} />
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
        <StackRow tone='#D97757' label={'① 為何網路是分散式系統的底線？'} text={'延遲與頻寬如何決定架構'} />
        <StackRow tone='#A1813F' label={'② Client-Server vs P2P，為何前者統治產業？'} text={''} />
        <StackRow tone='#5B7570' label={'③ 系統怎麼從 1 台撐到 1000 台？'} text={'Vertical / Horizontal / Hybrid'} />
        <StackRow tone='#5B9770' label={'④ API 設計有哪些隱性決策？'} text={'REST / RPC / GraphQL / gRPC'} />
      </div>
    </div>
    <Footer source={'基本觀念/01,02,04,05.pdf'} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · Foundation 的四層責任</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌──────────────────────────────────────────────────┐
│  CLIENT          手機 / 瀏覽器 / IoT             │  ← Ch.1.2
├──────────────────────────────────────────────────┤
│  NETWORK         TCP/IP · DNS · TLS · HTTP/3     │  ← Ch.1.1
├──────────────────────────────────────────────────┤
│  SERVER          API · 商業邏輯 · 認證           │  ← Ch.1.4
├──────────────────────────────────────────────────┤
│  STORAGE         (Ch.2 開始深談)                 │
└──────────────────────────────────────────────────┘
            scale-up vs scale-out · Ch.1.3`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這四層責任清楚分離，是「分散式系統可以演化」的前提。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_00_mental_model} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整理自 基本觀念/01 + 02'} />
  </div>
);


const P05: Page = () => (
  <SectionEnd title={'Overview 完'} subtitle={'先看物理底線——進入 Networking。'} next={'1.1 Networking</span>'} />
);


const P06: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 01 · TOPIC 01'} title={'Networking'} subtitle={'光速是天花板，物理問題不是工程問題。'} />
);


const P07: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_networking_02_rtt} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_networking_04_cdn} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · NETWORKING</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何網路是天花板？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NETWORKING · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>光速是 30 萬 km/s</strong>　·　台北 ↔ 紐約 一趟約 130 ms。
這不是工程問題，是<strong>物理問題</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>任何「跨地理位置即時同步」的需求，先回頭問物理可行性</li>
          <li>同一機房內 ~ 0.5 ms RTT；同國跨城市 ~ 10–30 ms；跨洲 ~ 100–200 ms</li>
          <li>光纖中的光速約為真空 2/3（~200,000 km/s）：<strong>紐約↔倫敦 5,600 km，理論最低 56 ms</strong></li>
          <li><strong>架構決策的第一個分水嶺</strong>：可不可以放在使用者附近？</li>
        </ul>
    </div>
    <Footer source={'基本觀念/01 Networking Essentials.pdf · §區域化和延遲'} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>協定棧速查</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NETWORKING · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>層級</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>協定</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>解決什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用層</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>HTTP/1.1 · HTTP/2 · HTTP/3 (QUIC) · gRPC · WebSocket</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訊息語意</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>傳輸層</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>TCP（可靠、有序）· UDP（快、可丟）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可靠性與順序</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>路由層</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>IP · BGP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨網段定址</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料連結</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Ethernet · WiFi · 5G</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>物理介質</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>補強</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>TLS · DNS · CDN</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>安全 / 命名 / 加速</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>HTTP/3 + QUIC</strong> 在弱網（行動）下顯著優於 HTTP/2，但伺服器支援度仍在追趕。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_networking_01_stack} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/01 Networking Essentials.pdf · §傳輸層 + 應用層'} />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>連線數 vs 延遲 vs 可靠性</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NETWORKING · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Keep-alive / Connection Pool'} items={['免去 TCP / TLS handshake 成本', '同一 client 重複請求快 5-10×', '降低伺服器負擔']} />
        <TradeoffCol tone='#E8634F' title={'長連線的代價'} items={['佔用伺服器 file descriptor', 'load balancer sticky session 副作用', '伺服器升級時需 graceful drain']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：行動 App 對每個 API 都新建 HTTPS 連線。TCP 三次握手 1 RTT + TLS 1-2 RTT，弱網下輕鬆吃掉 200 ms。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_networking_03_tls} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/01 Networking Essentials.pdf · §HTTP keep-alive'} />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>CDN：把資料推到使用者附近</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NETWORKING · 邊緣加速</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>CDN · Content Delivery Network</strong>
全球數百到數千個邊緣節點（edge location），快取靜態資源。<br />
使用者打到「最近的」邊緣，避開跨洲 100+ ms 的物理延遲。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>適用：圖片、影片、JS/CSS、API 回應（短 TTL）</li>
          <li><strong>區域分片</strong>（regional partitioning）是另一種解法：Uber 把資料按城市切，邁阿密用戶不會查詢紐約司機</li>
          <li>兩者本質都在解 <strong>資料局部性（data locality）</strong>：把資料放在計算需要它的地方</li>
        </ul>
      <Callout tone='#D97757'><strong>經驗法則</strong>：靜態用 CDN、動態用區域分片、跨區同步用 async replication。</Callout>
    </div>
    <Footer source={'基本觀念/01 Networking Essentials.pdf · §CDN + Regional Partitioning'} />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>網路不可靠，必須假設它會壞</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NETWORKING · 故障模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Timeout + Retry with Exponential Backoff'} text={'重試前等待，並加入 jitter 抖動避免 thundering herd'} />
        <StackRow tone='#A1813F' label={'Idempotency Key'} text={'重試不能重複扣款；寫操作必須冪等'} />
        <StackRow tone='#5B7570' label={'Circuit Breaker · 三狀態'} text={'Closed / Open / Half-Open，防止級聯故障'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>面試金句</strong>：「retry with exponential backoff and jitter」、「circuit breaker on downstream calls」——資深訊號。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_networking_05_circuit} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/01 Networking Essentials.pdf · §處理故障和失敗模式'} />
  </div>
);


const P14: Page = () => (
  <SectionEnd title={'Networking 完'} subtitle={'物理底線知道了——下一步看誰跟誰講話。'} next={'1.2 Client-Server</span>'} />
);


const P15: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 01 · TOPIC 02'} title={'Client-Server'} subtitle={'集中化付出代價，換來控制、可觀測、可演化。'} />
);


const P16: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_client_server_01_vs_p2p} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_client_server_02_matrix} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 2 · CLIENT-SERVER</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何不是 P2P 統治產業？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CLIENT-SERVER · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>集中化的代價是 server 成本，但換來的是：</strong>
<strong>控制（authn/authz）· 可觀測（logging）· 可演化（一鍵更新）</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>P2P 適合：BitTorrent、區塊鏈、特定協作（資料密集、無中心信任源）</li>
          <li>Client-Server 適合：99% 商業軟體（要管理使用者、要更新 schema、要審計）</li>
          <li><strong>混合</strong>：許多大型遊戲（DOTA、CSGO）採用 Server 撮合 + 對等連線</li>
          <li><strong>WebRTC</strong> 是 P2P 的常見出口：視訊/音訊通話需要點對點低延遲，但仍依賴 signaling server 撮合</li>
        </ul>
    </div>
    <Footer source={'基本觀念/02 Client-Server Architecture.pdf · §Client-Server vs P2P'} />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Thin / Thick · Stateful / Stateless</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CLIENT-SERVER · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Thin Client + Stateless Server</strong>
    Web 應用主流　·　易橫向擴展</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Thick Client + Stateless Server</strong>
    SPA / Mobile App　·　離線可用</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Thin Client + Stateful Server</strong>
    傳統 Session 架構　·　不易擴展</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Thick Client + Stateful Server</strong>
    遊戲 / 即時協作　·　最複雜</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Stateless Server</strong> 是橫向擴展的前提。狀態應放外部儲存（Redis / DB），不放伺服器記憶體。</span></div>
    </div>
    <Footer source={'基本觀念/02 Client-Server Architecture.pdf · §Thin vs Thick Client'} />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Stateful 的三大反模式</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CLIENT-SERVER · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>反模式 ①：Session 黏在伺服器記憶體</strong>
A 伺服器掛掉 → 使用者被迫重新登入。失去自由路由的彈性。</Callout>
      <Callout tone='#E8634F'><strong>反模式 ②：信任 request body 的 user_id</strong>
攻擊者改 body 中的 `user_id` 就能讀任何人資料。<strong>永遠從 token 解析使用者</strong>，不從 body。</Callout>
      <Callout tone='#E8634F'><strong>反模式 ③：用 sticky session 補狀態漏洞</strong>
LB 被迫綁定使用者到特定機器。擴容、graceful drain、故障切換全部變難。</Callout>
      <Callout tone='#D97757'><strong>修法統一</strong>：把狀態推到外部（Redis / DB / JWT），伺服器永遠 stateless。</Callout>
    </div>
    <Footer source={'基本觀念/02 Client-Server Architecture.pdf · §安全提醒 + Server 職責'} />
  </div>
);


const P21: Page = () => (
  <SectionEnd title={'Client-Server 完'} subtitle={'Stateless 是基本盤——下一步看怎麼擴規模。'} next={'1.3 Scalability</span>'} />
);


const P22: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 01 · TOPIC 03'} title={'Scalability'} subtitle={'單機撐不住，但別急著分散。'} />
);


const P23: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_scalability_01_up_vs_out} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 3 · SCALABILITY</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何單機撐不住？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALABILITY · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>100×</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>從 100 用戶到 10,000 用戶 ≠ 加 100 倍 CPU。
有些東西的成本<strong>指數成長</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>鎖競爭（Lock contention）：併發數 ↑，等待時間 ↑↑</li>
          <li>Context switch：執行緒數 ↑，CPU 浪費 ↑</li>
          <li>記憶體頻寬：單機 RAM 有實體上限</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>Vertical scaling</strong> 終究會撞牆。問題不是「會不會」，是「什麼時候」。</Callout>
    </div>
    <Footer source={'基本觀念/04 Scalability.pdf · §為什麼重要'} />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>橫向擴展的三個前提</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALABILITY · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Stateless'} text={'任一台機器都能處理任一請求'} />
        <StackRow tone='#A1813F' label={'② Shared Storage'} text={'狀態放外部（DB / Cache / Object Store）'} />
        <StackRow tone='#5B7570' label={'③ 可路由'} text={'Load Balancer 知道把流量導去哪'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`              ┌─── Server-A ───┐
  Client ─→ LB ── Server-B ───┼──→ Shared DB / Cache
              └─── Server-C ───┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>三個前提缺一不可。沒有 stateless 就沒有自由路由；沒有 shared storage 就沒有一致性。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_03_scalability_02_three_prereq} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/04 Scalability.pdf · §Horizontal Scaling'} />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Up vs Out vs Hybrid</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALABILITY · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Scale Up（垂直）'} items={['實作零成本（換更大機器）', '適合資料庫主節點', 'Latency 最低（無網路跳）']} />
        <TradeoffCol tone='#E8634F' title={'Scale Out（水平）'} items={['無上限（理論）', '但開發成本高（要 stateless）', 'Distributed system complexity']} />
      </div>
      <Callout tone='#D97757'><strong>典型策略</strong>：應用層 Scale Out · 資料層 Scale Up（直到撞牆，再 Shard）
<strong>現代硬體很強</strong>：先用 vertical scaling 解掉短期需求，別過早分散。</Callout>
    </div>
    <Footer source={'基本觀念/04 Scalability.pdf · §比較表 + 01 §負載平衡'} />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>大廠怎麼撐住流量？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SCALABILITY · 案例</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Netflix · 全球串流</strong>
應用層全 stateless，跑在 AWS 上彈性擴容；影片內容透過 Open Connect CDN 推到 ISP 機房，避免跨洲頻寬。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Uber · 區域分片</strong>
按城市切資料：邁阿密的乘客永遠不會匹配紐約的司機。每個區域有自己的 DB，<strong>讓「跨區查詢」變成不存在的問題</strong>。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Twitter · Timeline Fan-out</strong>
讀請求是寫的 100×，所以 fan-out on write（推送）而非 fan-out on read（拉取）。</Callout>
      <Callout tone='#E8634F'><strong>洞察</strong>：規模不是靠「更聰明的演算法」，是靠<strong>消除問題</strong>——分區後跨區互動變零。</Callout>
    </div>
    <Footer source={'整合 基本觀念/04 + 01 §Regional Partitioning'} />
  </div>
);


const P28: Page = () => (
  <SectionEnd title={'Scalability 完'} subtitle={'規模問題用「消除」解，不是「優化」解——下一步是 API。'} next={'1.4 API Design</span>'} />
);


const P29: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 01 · TOPIC 04'} title={'API Design'} subtitle={'對外 REST、對內 gRPC，剩下看清楚再選。'} />
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 4 · API DESIGN</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>REST · RPC · GraphQL · gRPC</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API DESIGN · 風格選型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>風格</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>優勢</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>痛點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>REST</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>公開 API · 簡單 CRUD</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>通用、可快取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>over/under-fetching</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>RPC</strong> (JSON-RPC, etc.)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內部服務</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>像呼叫函式</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>弱規範</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>GraphQL</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>多種 client、欄位變化大</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一次取齊、Schema 強型別</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>N+1 query、cache 難</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>gRPC</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內部高效能、跨語言</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>binary、streaming、契約清楚</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>瀏覽器支援差</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>經驗法則</strong>：對外 REST/GraphQL，對內 gRPC，金流 RPC + 強審計。<strong>gRPC vs JSON over HTTP 吞吐量可達 10×</strong>。</span></div>
    </div>
    <Footer source={'基本觀念/05 API Design.pdf + 01 Networking · §gRPC'} />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三個問題決定風格</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API DESIGN · 決策樹</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`        外部 client 還是內部？
              │
        ┌─────┴─────┐
       外部         內部
        │            │
   over/under       gRPC
   fetching 嚴重？   （binary、契約清楚）
        │
   ┌────┴────┐
  Yes       No
   │         │
 GraphQL    REST`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>面試裡 99% 用 REST 就對了。除非題目明確要靈活查詢（GraphQL）或內部高效能（gRPC），不要過早跳。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_04_api_design_01_decision_tree} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/05 API Design.pdf · §決策樹'} />
  </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>REST 三大反模式</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API DESIGN · 反模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>① Chatty API</strong>：列表頁要 1 個 GET /users + N 個 GET /users/&#123;id&#125;/posts → <strong>N+1 請求</strong>。
修：在資源裡 embed 必要欄位，或允許 `?include=posts`。</Callout>
      <Callout tone='#E8634F'><strong>② Operation 偽裝成 Resource</strong>：`POST /updateUser`、`POST /startGame` 不是 RESTful。
修：改用 `PUT /users/&#123;id&#125;`、`PATCH /games/&#123;id&#125; &#123;status:"started"&#125;`。</Callout>
      <Callout tone='#E8634F'><strong>② Over-fetching</strong>：行動端只要 5 個欄位，後端回 50 個。耗流量、耗電。
修：sparse fieldsets（`?fields=id,name`）或改用 GraphQL。</Callout>
    </div>
    <Footer source={'基本觀念/01 Networking · §REST + GraphQL 動機'} />
  </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>那些「不講就會錯」的細節</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>API DESIGN · 隱性決策</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Idempotency · 冪等性</strong>
GET / PUT / DELETE 天生冪等；<strong>POST 不是</strong>。寫操作必須帶 &lt;code&gt;Idempotency-Key&lt;/code&gt;，伺服器去重 24h。<br />
<strong>典型 key</strong>：用戶 ID + 業務天 + nonce（避免一天內重複扣款）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Versioning · 版本管理</strong>
URL 路徑（/v1/）· Header（Accept-Version）· Query。<br />
<strong>推薦</strong>：URL 路徑，最直觀，便於 routing 與廢棄。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Pagination · 分頁</strong>
Offset/Limit（簡單但深翻慢）vs Cursor（快、不可跳頁）。<br />
<strong>大量資料用 Cursor</strong>，避免 OFFSET 1000000 的全掃。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_04_api_design_02_idempotency} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'基本觀念/01 Networking · §冪等性 + REST §Methods'} />
  </div>
);


const P34: Page = () => (
  <SectionEnd title={'API Design 完'} subtitle={'四件事都串起來了——下一張，把它們組裝成一個系統。'} next={'1.5 Recap & Case Study</span>'} />
);


const P35: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 01 · RECAP'} title={'Foundation 收斂'} subtitle={'四件事，串成一個發推文的故事。'} />
);


const P36: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>設計：Twitter 「發推文」 API</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE STUDY · 把四件事串起來</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Network'} text={'全球 CDN 邊緣 + HTTP/3 QUIC（行動弱網）'} />
        <StackRow tone='#A1813F' label={'Client-Server'} text={'Stateless API server · Session 放 Redis'} />
        <StackRow tone='#5B7570' label={'Scale'} text={'應用層 K8s 自動擴容 · DB 主寫從讀（Ch.3 詳述）'} />
        <StackRow tone='#5B9770' label={'API'} text={'POST /v2/tweets · Idempotency-Key header · Cursor 分頁'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>每個決策都對應 Foundation 的一個面向。
<strong>Ch.2 開始挖資料層</strong> —— Twitter 的 timeline 資料怎麼存才能讓 100M 用戶讀得快？</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_99_recap_01_twitter} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整合 Ch.1 全章 + Twitter Engineering Blog 公開資料'} />
  </div>
);


const P37: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第一章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新的工具'} items={['4 層責任分離思考法', '橫向擴展三前提清單', 'API 風格選型矩陣', 'idempotency / versioning 設計檢核']} />
        <TradeoffCol tone='#E8634F' title={'還沒回答的問題'} items={['資料層的 trade-off？　→ Ch.2', '怎麼分散資料？　→ Ch.3', '選哪個資料庫？　→ Ch.4', '怎麼撐住流量？　→ Ch.5/6']} />
      </div>
  </div>
);


const P38: Page = () => (
  <SectionEnd title={'Ch.1 完'} subtitle={'Foundation 站穩，下一站挖資料層。'} next={'Ch.2 Data Fundamentals</span>'} />
);


export const meta: SlideMeta = { title: 'Ch.1 · Foundation Layer' };
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
] satisfies Page[];
