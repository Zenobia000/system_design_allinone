import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model from './assets/00_mental_model.png';
import img_01_queue_01_basic_flow from './assets/01_queue_01_basic_flow.png';
import img_01_queue_02_three_brokers from './assets/01_queue_02_three_brokers.png';
import img_01_queue_03_backpressure from './assets/01_queue_03_backpressure.png';
import img_02_longtasks_01_four_mechanisms from './assets/02_longtasks_01_four_mechanisms.png';
import img_02_longtasks_02_orchestrators from './assets/02_longtasks_02_orchestrators.png';
import img_03_blobs_01_presigned_url from './assets/03_blobs_01_presigned_url.png';
import img_03_blobs_02_multipart from './assets/03_blobs_02_multipart.png';
import img_04_realtime_01_four_protocols from './assets/04_realtime_01_four_protocols.png';
import img_04_realtime_02_two_hop_fanout from './assets/04_realtime_02_two_hop_fanout.png';
import img_05_search_01_inverted_index from './assets/05_search_01_inverted_index.png';
import img_05_search_02_cdc_alias from './assets/05_search_02_cdc_alias.png';
import img_06_pipeline_01_lambda_kappa from './assets/06_pipeline_01_lambda_kappa.png';
import img_06_pipeline_02_etl_windows from './assets/06_pipeline_02_etl_windows.png';
import img_07_rag_01_four_components from './assets/07_rag_01_four_components.png';
import img_07_rag_02_chunking from './assets/07_rag_02_chunking.png';
import img_99_recap_01_ai_assistant from './assets/99_recap_01_ai_assistant.png';
import img_99_recap_02_course_map from './assets/99_recap_02_course_map.png';

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
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 00'} title={'Advanced Patterns'} subtitle={'進階場景的專用模式 · 異步、即時、搜尋、管線、AI'} />
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
        <StackRow tone='#D97757' label={'① Queue 怎麼選？'} text={'Kafka vs RabbitMQ vs SQS · partition / DLQ / backpressure'} />
        <StackRow tone='#A1813F' label={'② 長任務怎麼設計？'} text={'切片、checkpointing、idempotency、saga'} />
        <StackRow tone='#5B7570' label={'③ 大檔案怎麼搬？'} text={'presigned URL · multipart · CDN · resume'} />
        <StackRow tone='#5B9770' label={'④ 即時推播怎麼做？'} text={'WebSocket / SSE / Long Polling · 1M connection scale'} />
        <StackRow tone='#5B9770' label={'⑤ 全文搜尋為何需要專用引擎？'} text={'倒排索引 · BM25 · vector'} />
        <StackRow tone='#5B9770' label={'⑥ Lambda / Kappa 架構差在哪？'} text={'batch + stream · ETL vs ELT'} />
        <StackRow tone='#5B9770' label={'⑦ RAG 系統怎麼搭？'} text={'chunk · retrieve · rerank · hallucination 對策'} />
      </div>
    </div>
    <Footer source={'常用技術/07 + 設計模式/03 + 04 + 05 + 06 + 07 + 08'} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 進階模式 7 個方向</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌──────────────────────────────────────────────────┐
│  ⑦ AI       RAG · Vector DB · LLM orchestration  │  ← 07
├──────────────────────────────────────────────────┤
│  ⑥ ANALYTIC Data Pipeline · Lambda / Kappa       │  ← 06
├──────────────────────────────────────────────────┤
│  ⑤ SEARCH   Inverted Index · Relevance · Index   │  ← 05
├──────────────────────────────────────────────────┤
│  ④ REALTIME WebSocket · SSE · Long Polling       │  ← 04
├──────────────────────────────────────────────────┤
│  ③ BLOB     Presigned URL · Multipart · CDN      │  ← 03
├──────────────────────────────────────────────────┤
│  ② LONG     Saga · Step Function · Checkpoint    │  ← 02
├──────────────────────────────────────────────────┤
│  ① QUEUE    Kafka · Rabbit · SQS · NATS          │  ← 01
└──────────────────────────────────────────────────┘
        每個都有「什麼時候用、什麼時候別用」`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這章的 pattern 大多是「不需要時就別用」</strong>——加一個 Kafka 進來，整個系統複雜度跳一階。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_00_mental_model} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整理自 常用技術/07 + 設計模式/03/04/05/06/07/08'} />
  </div>
);


const P05: Page = () => (
  <SectionEnd title={'Overview 完'} subtitle={'先講 Queue——進階模式的共同基石。'} next={'01 Queue</span>'} />
);


const P06: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 01'} title={'Queue'} subtitle={'系統的緩衝、解耦、削峰、重試 — 但不是萬靈丹'} />
);


const P07: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_queue_02_three_brokers} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何要在系統中間加 Queue？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>QUEUE · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Queue 解 4 件事</strong>：  
<strong>① 解耦</strong>（生產 / 消費獨立部署） · <strong>② 削峰</strong>（流量高峰緩衝）  
<strong>③ 容錯</strong>（消費端壞了訊息留著） · <strong>④ 重試</strong>（自動退避 / DLQ）</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>場景：訂單事件 → 物流 / 通知 / 數據分析 多個下游</li>
          <li>沒 Queue 的世界：上游同步呼叫 N 個下游 → 任一個壞 = 整鏈失敗</li>
        </ul>
      <Callout tone='#E8634F'><strong>警告</strong>：在同步工作負載中引入 queue 要特別小心。如果你有 &lt; 500ms 延遲要求，<strong>加上 queue 幾乎一定會破壞它</strong>。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_queue_01_basic_flow} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/07 Queue.pdf · §基本概念'} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Kafka vs RabbitMQ vs SQS</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>QUEUE · 三大選型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Kafka</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>RabbitMQ</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>SQS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>模型</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Pub-Sub log</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Broker（Exchange + Queue）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Managed queue</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>吞吐量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100k+ msg/s/partition</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10–30k msg/s</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>3k msg/s（per queue）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>訊息保留</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>days/weeks（log）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>consume 即刪</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>14 天 max</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>順序</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>partition 內保序</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>單 queue 保序</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>FIFO queue 保序</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>重播</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓（rewind offset）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>運維</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>重（自管 ZK / KRaft）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>0（AWS 託管）</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>選擇法則</strong>：事件流 / 數據管線用 Kafka；複雜路由 / 工作隊列用 RabbitMQ；簡單異步任務用 SQS（已在 AWS）。Redis Stream 是輕量替代。</span></div>
    </div>
    <Footer source={'常用技術/07 Queue.pdf · §常見產品與服務'} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>面試會問的 5 個關鍵字</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>QUEUE · 核心機制</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Partition Key</strong>
Queue 透過分區擴展。指定 partition key（例如 user_id）確保<strong>相關訊息存放在同一個分區</strong>——保序的最小單位是 partition，不是整條 queue。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Consumer Group</strong>
多個 consumer 組成 group 並行消費；同一條訊息<strong>只會被 group 中一個 consumer 處理</strong>。新增 consumer = 拉高吞吐。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>DLQ（Dead Letter Queue）</strong>
失敗達 3-5 次後丟到 DLQ，<strong>避免 poison message 卡死整個 worker pool</strong>。SQS 用 redrive policy；RabbitMQ 用 dead letter exchange。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Visibility Timeout / Heartbeat</strong>
SQS 的訊息被 pull 後隱藏 N 秒；worker 沒回 ack 就會被別人重試。<strong>10–30s 是合理起點</strong>。</Callout>
    </div>
    <Footer source={'常用技術/07 Queue.pdf · §面試重點 + 設計模式/03 §處理故障'} />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>反壓 — Queue 最常被忽略的問題</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>QUEUE · Backpressure</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>反模式</strong>：以為 queue 可以無限緩衝。  
每秒處理 200 但收到 300 = <strong>永遠處理不完</strong>，queue 只是把問題藏起來。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Backpressure 三招</strong>：  
① <strong>設 queue 深度上限</strong>——滿了就拒絕新訊息回 503  
② <strong>基於 queue depth 自動擴 worker</strong>（不是 CPU usage——等到 CPU 高時 queue 早就堆積了）  
③ <strong>Fast / Slow Queue 分離</strong>——避免長 job 卡住短 job 的 head-of-line blocking</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_01_queue_03_backpressure} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'常用技術/07 Queue.pdf · §反壓 + 設計模式/03 §管理 Backpressure'} />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Queue 帶來的隱性成本</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>QUEUE · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Queue 紅利'} items={['上下游解耦 · 獨立 scale', '流量平滑（吸收 burst）', '異步重試降低錯誤率']} />
        <TradeoffCol tone='#E8634F' title={'Queue 代價'} items={['多一個故障源（broker 壞）', 'End-to-end latency 增加', '消費端必須冪等（at-least-once）', '排序、去重變複雜', '運維 + 監控成本']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：QPS 100 加 Kafka。<strong>Kafka 的運維成本 &gt; 你業務本身</strong>，這時 Postgres + LISTEN/NOTIFY 就夠。</Callout>
    </div>
    <Footer source={'常用技術/07 Queue.pdf · §適用場景'} />
  </div>
);


const P13: Page = () => (
  <SectionEnd title={'Queue 完'} subtitle={'Queue 是緩衝，不是垃圾桶——下一站講長任務怎麼用 queue 做切片。'} next={'02 Long Running Tasks</span>'} />
);


const P14: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 02'} title={'Long Running Tasks'} subtitle={'把「接受請求」和「處理請求」徹底分開'} />
);


const P15: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_longtasks_02_orchestrators} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何長任務需要特殊設計？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LONG TASKS · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 22, lineHeight: 1.6 }}>15min</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>HTTP request timeout 通常 30s · Lambda 上限 15 分鐘</strong>。  
但業務常需更長：報表、ETL、影片轉碼、AI 訓練、資料遷移。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：同步處理長任務。  
<strong>結果</strong>：使用者超時看到 504 · server worker 卡死 · retry 重複執行。</Callout>
    </div>
    <Footer source={'設計模式/03 Manage Long Running Tasks.pdf · §問題在哪裡'} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>4 個必備機制</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LONG TASKS · HOW</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 異步觸發'} text={'API 立即回 task_id · 實際工作丟 queue 背景處理'} />
        <StackRow tone='#A1813F' label={'② Checkpointing'} text={'每 N 步存進度 · 失敗從最近 checkpoint 重啟'} />
        <StackRow tone='#5B7570' label={'③ 進度查詢'} text={'client 用 task_id 輪詢 / WebSocket 接 push'} />
        <StackRow tone='#5B9770' label={'④ 補償機制'} text={'失敗時 rollback 已完成的 step（Saga）'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[Client] ─POST→ [API] ─enqueue→ [Queue] ─pop→ [Worker]
   │                                              │
   └──── poll task_id ─→ [State Store] ←─update───┘`}</pre>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_02_longtasks_01_four_mechanisms} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/03 Manage Long Running Tasks.pdf · §解法的架構'} />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Idempotency &amp; Heartbeat &amp; Poison Message</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LONG TASKS · 關鍵設計</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Idempotency Key</strong>
用戶手抖點三次「產生報告」？用 &lt;code&gt;user_id + action + timestamp&lt;/code&gt; 當 key，<strong>入 queue 前先查資料庫有沒有這個 key 的 job</strong>——有就回現有 job_id，不重複建。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Heartbeat（10–30s）</strong>
Worker 定期向 queue 回報「我還活著」。沒心跳 → queue 假設它掛了 → 重新指派 job。<strong>間隔太短浪費頻寬；太長則崩潰偵測慢</strong>。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Poison Message</strong>
某個 job 永遠失敗，會把整個 worker pool 拖垮（每個 worker 試處理它都死）。<strong>失敗 3–5 次後丟 DLQ</strong>——隔離出來，健康的工作繼續。</Callout>
    </div>
    <Footer source={'設計模式/03 Manage Long Running Tasks.pdf · §防止重複工作 + §處理反覆失敗'} />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Step Function · Temporal · Airflow 對比</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LONG TASKS · 編排引擎</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>引擎</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>模型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>DSL</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>強項</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>弱項</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AWS Step Functions</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>State machine</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>JSON</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AWS 託管 · 視覺化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>鎖死 AWS · DSL 不直觀</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Temporal</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Workflow as code</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Go/Java/Python SDK</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>自動 retry / replay</strong>·程式語意</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需自部署 · 學習曲線</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Airflow</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DAG schedule</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Python</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>社群最大 · 偏批次 ETL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>scheduler 是瓶頸 · 重啟慢</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Argo Workflows</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DAG (K8s 原生)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>YAML</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>K8s native · 容器化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需 K8s 環境</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Temporal 是現代 long-running 工作流的最強解</strong>——把工作流當程式碼寫，failure / retry / state 全部自動化。<strong>面試答 Step Functions 或 Temporal 都安全</strong>。</Callout>
    </div>
    <Footer source={'設計模式/03 Manage Long Running Tasks.pdf · §協調有依賴關係的 Job'} />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>短任務 vs 長任務分流</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LONG TASKS · 混合工作負載</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>Head-of-line blocking</strong>：5 秒的 PDF 報告卡在 5 小時的年底報告後面 → 用戶體驗崩潰。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`queues:
  fast:                     # 快速 queue
    max_duration: 60s
    worker_count: 50
    instance_type: t3.medium

  slow:                     # 慢速 queue
    max_duration: 6h
    worker_count: 10
    instance_type: c5.xlarge`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>策略</strong>：依預期執行時間路由；無法預測就先丟 fast，超時自動移 slow。<strong>autoscale metric 用 queue depth 而不是 CPU</strong>——CPU 飆高時 queue 已經堆積很久了。</span></div>
    </div>
    <Footer source={'設計模式/03 Manage Long Running Tasks.pdf · §處理混合工作負載'} />
  </div>
);


const P21: Page = () => (
  <SectionEnd title={'Long Tasks 完'} subtitle={'接受 fast，處理 slow——下一站講大檔案怎麼直傳，bytes 別走自己 server。'} next={'03 Large Blobs</span>'} />
);


const P22: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 03'} title={'Handling Large Blobs'} subtitle={'讓 bytes 繞過你的伺服器 — 你只當售票員'} />
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何不能讓檔案流過你的 server？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LARGE BLOBS · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>反模式</strong>：2GB 影片走 client → API → S3。  
你的 application server 變成毫無價值的管道，<strong>只增加延遲、頻寬成本和瓶頸</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>雲廠商本就有全球基礎設施、斷點續傳能力、巨大的頻寬</li>
          <li><strong>解法</strong>：從「透過伺服器上傳」切換到「<strong>客戶端直傳 Blob Storage</strong>」</li>
          <li>你的 server 角色從「資料傳輸者」變成「<strong>存取控制者</strong>」——驗證、簽證、退場</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>判斷門檻</strong>：&gt; 10MB 就應該想到這個模式；&lt; 10MB 走一般 API 就好。</span></div>
    </div>
    <Footer source={'設計模式/04 Handling Large Blobs.pdf · §問題在哪裡'} />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>簡單直傳（&lt; 100MB）</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LARGE BLOBS · Presigned URL</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Presigned URL</strong>
你的 server 用雲端憑證<strong>本地簽一個帶時限的 URL</strong>（通常 15 分鐘到 1 小時），客戶端拿著它直接 PUT 檔案到 S3。<strong>不需要呼叫 storage 的 API</strong>，純本地簽名計算。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`?X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Expires=900            ← 15 min
&X-Amz-SignedHeaders=host
&X-Amz-Signature=...`}</pre>
      <Callout tone='#E8634F'><strong>永遠加上限制條件</strong>：  
`content-length-range`（防止 5MB 端點被傳 500MB） · `content-type`（限定圖片）</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_03_blobs_01_presigned_url} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/04 Handling Large Blobs.pdf · §簡單直傳上傳'} />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>大檔案分塊（&gt; 100MB）</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LARGE BLOBS · Multipart Upload</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[Client]                          [Storage]
    │ initiate multipart ──────────→│  ← upload_id
    │ PUT chunk 1 (5MB) ───────────→│  ← etag_1
    │ PUT chunk 2 (5MB) ───────────→│  ← etag_2
    │      ...（並行 / 斷線可重傳單塊）
    │ PUT chunk N ─────────────────→│  ← etag_N
    │ complete (etag list) ────────→│  ← 組裝成單一物件`}</pre>
      <Callout tone='#D97757'><strong>S3 Multipart</strong>：分塊 ≥ 5MB · 每塊有獨立 presigned URL · 5GB / 塊上限  
<strong>斷點續傳</strong>：失敗時 client 查 ListParts → 從失敗那塊繼續，不從頭來</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>注意</strong>：未完成的 multipart 是要錢的。<strong>設 lifecycle rule 24-48h 自動清理</strong>。</span></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_03_blobs_02_multipart} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/04 Handling Large Blobs.pdf · §斷點續傳'} />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>AWS / GCP / Azure 術語</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LARGE BLOBS · 雲廠商對照</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>功能</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>AWS</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>GCP</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Azure</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>臨時上傳 URL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Presigned URL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Signed URL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SAS Token</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>分塊上傳</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Multipart（5MB-5GB）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Resumable Upload（彈性）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Block Blob（4MB-100MB）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>事件通知</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>S3 Event → SNS/SQS/Lambda</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cloud Storage Pub/Sub</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Event Grid</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CDN 簽名</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CloudFront signed URL/cookie</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cloud CDN signed URL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Azure CDN SAS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>清理政策</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Lifecycle Rules</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Lifecycle Management</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Lifecycle Policies</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試重點</strong>：知道有對應就行，<strong>不需背 SDK 函數名</strong>。</span></div>
    </div>
    <Footer source={'設計模式/04 Handling Large Blobs.pdf · §各雲端供應商的術語對照'} />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>直傳的隱性陷阱：metadata 不一致</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LARGE BLOBS · 狀態同步</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>信任客戶端的問題</strong>：上傳完客戶端說「OK」你才更新 DB？  
→ Race condition · 孤兒檔案 · 惡意客戶端謊報 · 通知丟失</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>正解 = Storage Event + Reconciliation</strong>：  
① S3 上傳完成自動發 event（SNS/SQS/Lambda）→ 你用 storage_key 找對應 DB row 更新  
② 加一個 <strong>reconciliation worker</strong>——定期掃 status='pending' 的記錄跟 storage 比對</Callout>
    </div>
    <Footer source={'設計模式/04 Handling Large Blobs.pdf · §狀態同步的挑戰'} />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Quarantine Bucket + Range Request</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LARGE BLOBS · 防濫用 &amp; 下載</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Quarantine Bucket（隔離區）</strong>
上傳先進隔離 bucket → 病毒掃描、內容驗證、檔案類型檢查 → 通過才搬到正式 bucket 並更新 DB status='available'。<strong>比即時偵測穩固得多</strong>。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>CDN + Range Request</strong>
下載大檔案用 CDN signed URL（CloudFront）+ HTTP &lt;code&gt;Range: bytes=0-10485759&lt;/code&gt;——<strong>支援斷點續傳 + 自適應位元率串流</strong>（影片）。CDN 把 200ms 變 5ms。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>CDN 簽名 vs Storage 簽名</strong>
<strong>Blob Storage 簽名</strong>由 storage 驗證 · <strong>CDN 簽名</strong>由 CDN edge node 公私鑰驗證——CDN 不需回 origin，全球延遲更穩。</Callout>
    </div>
    <Footer source={'設計模式/04 Handling Large Blobs.pdf · §怎麼防止濫用 + §怎麼確保下載夠快'} />
  </div>
);


const P29: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>LARGE BLOBS · 什麼時候不適用</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'適合直傳'} items={['檔案 > 10MB（影片、相片、文件）', 'YouTube · Instagram · Dropbox · Messenger 媒體', '用戶自由離開、稍後回來']} />
        <TradeoffCol tone='#E8634F' title={'不該直傳'} items={['< 10MB 小檔（額外 round-trip 不值得）', '需要同步驗證內容（CSV 匯入）', '合規要求逐行審查（HIPAA / 信用卡）', '需要即時回饋（人臉辨識、文件預覽）']} />
      </div>
    <Footer source={'設計模式/04 Handling Large Blobs.pdf · §什麼時候不適合用'} />
  </div>
);


const P30: Page = () => (
  <SectionEnd title={'Large Blobs 完'} subtitle={'bytes 走捷徑 · 你只發票——下一站講即時通訊。'} next={'04 Real-time Updates</span>'} />
);


const P31: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 04'} title={'Real-time Updates'} subtitle={'Push 不是 Pull — 但 stateful 連線會帶走你一半的擴展性'} />
);


const P32: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_04_realtime_01_four_protocols} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P33: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何輪詢不是答案？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>輪詢的問題</strong>：每秒 1 次 polling × 100k 用戶 = <strong>100k QPS</strong> 的純 wasted 流量。  
<strong>90% 的 polling 都是「沒事」</strong>——拿到「沒新訊息」就回去。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Real-time 需求：聊天、通知、即時報價、協同編輯、遊戲、IoT、AI streaming</li>
          <li>解法層級：Long Polling → SSE → WebSocket → 專用協定（MQTT / WebRTC）</li>
        </ul>
    </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §問題在哪裡'} />
  </div>
);


const P34: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>即時系統的雙重問題</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · 兩個 HOP</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Hop 1'} text={'更新如何從伺服器送達客戶端？　 <em>(client-server protocol)</em>'} />
        <StackRow tone='#A1813F' label={'Hop 2'} text={'更新如何從事件來源傳到「拿著客戶端連線的那台伺服器」？　 <em>(server-side propagation)</em>'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[Client] ←─── Hop 1 ───→ [Server holding conn] ←─── Hop 2 ───→ [Event Source]
              協定選擇                                Pub/Sub or Consistent Hash`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試常見錯誤</strong>：只想 Hop 1（WebSocket）忘記 Hop 2（怎麼從產生 event 的服務找到「持有那條連線的 server」）。</span></div>
    </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §解法的架構'} />
  </div>
);


const P35: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · HOP 1 · 4 種推送技術</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>技術</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>方向</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>連線數</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Long Polling</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>client 等回應</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1 連線 / req</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>後備方案 · 通用 · 付款狀態</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SSE（Server-Sent Events）</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>server → client 單向</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1 long-lived TCP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>通知 · 股票 · <strong>AI streaming token</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>WebSocket</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>雙向全雙工</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1 long-lived TCP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>聊天 · 協同 · 遊戲</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>WebRTC</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>P2P（NAT/STUN/TURN）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>點對點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>視訊通話 · 螢幕分享 · Canva 游標</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>選擇法則</strong>：<strong>單向推就用 SSE</strong>（HTTP 原生 + 自動重連 + last-event-id）；雙向用 WebSocket；P2P 視訊用 WebRTC。</Callout>
    </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §第一個 Hop'} />
  </div>
);


const P36: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>WebSocket 的隱性成本：負載平衡器</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · L4 vs L7 LB</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Layer 4 LB</strong>
TCP/IP 層做路由 · 不檢查封包內容 · <strong>天然適合 WebSocket</strong>（同一條 TCP 連線一直在）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Layer 7 LB</strong>
HTTP 層 · 終止連線後對 backend 開新連線 · <strong>每個 HTTP request 重新路由</strong>——和 WebSocket 的長存連線本質衝突。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試常考</strong>：「WebSocket 用什麼 LB？」答 <strong>L4</strong>——L7 對 long polling 這類 HTTP 方案更好用。</span></div>
    </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §負載平衡器'} />
  </div>
);


const P37: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩種觸發機制</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · HOP 2 · 100 萬連線</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Consistent Hashing'} items={['用 ZooKeeper/etcd 記錄 user → server', '更新服務 hash(user_id) 找到 server 後直接送', '適合**連線需要維護大量狀態**（Google Docs）', '擴容時 hash ring 上連線遷移最小化']} />
        <TradeoffCol tone='#E8634F' title={'Pub/Sub（Redis / Kafka）'} items={['用戶連到任意端點伺服器 · 訂閱 topic', '更新發布到 topic · Pub/Sub 廣播給所有訂閱端點', '**端點無狀態 · 用 least-connection LB 即可**', '適合**訊息小、不需太多關聯狀態**']} />
      </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §第二個 Hop'} />
  </div>
);


const P38: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>抽出專屬 WebSocket 服務</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · 1M 連線架構</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[User] ←→ [L4 LB] ←→ [WebSocket Service Pool] ←→ [Pub/Sub] ←→ [App Service]
                          (sticky · stateful)        (Redis/Kafka)   (stateless)`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Stateful 隔離'} text={'WebSocket 服務獨立部署 · 重啟頻率低 · 把 stateful 鎖在最小範圍'} />
        <StackRow tone='#A1813F' label={'② Heartbeat'} text={'偵測「殭屍連線」(client 以為連著但 server 早關了) · 通常 30s ping'} />
        <StackRow tone='#5B7570' label={'③ Graceful Drain'} text={'部署時逐步通知 client 重連 · 不能一次切光（驚群效應）'} />
        <StackRow tone='#5B9770' label={'④ 重連 + Last Event ID'} text={'SSE 標準支援；WebSocket 要自己實作補發'} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_04_realtime_02_two_hop_fanout} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §連線失敗和重新連線'} />
  </div>
);


const P39: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>WebSocket vs SSE 終極選擇</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · TRADE-OFF</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'選 WebSocket'} items={['需要雙向通訊（聊天、遊戲）', '需要 binary frame', '低延遲交互（< 100ms RTT）']} />
        <TradeoffCol tone='#E8634F' title={'選 SSE'} items={['只需 server → client 推送', '原生支援 reconnect + last-event-id', 'HTTP/2 multiplexing 友好', '防火牆 / proxy 通透性高', '<strong>AI chat token streaming 預設</strong>']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>業界趨勢</strong>：通知、股票、AI streaming 大多用 SSE；聊天、遊戲、協同用 WebSocket。<strong>過度採用 WebSocket 是常見錯誤</strong>。</span></div>
    </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §選擇指南'} />
  </div>
);


const P40: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>名人 Fan-out &amp; 協作編輯</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REAL-TIME · 進階問題</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Celebrity Fan-out</strong>
Taylor Swift 發文 → 幾千萬粉絲要立刻收到。<strong>不寫進每個粉絲的 feed</strong>（IO 爆炸）→ 只快取一次 → 讓各區端點 server 拉取後推給本地 client。<strong>階層式聚合</strong>避免單點崩潰。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>CRDT vs Operational Transform</strong>
Google Docs 字元級協作的兩種衝突解決方法：<strong>OT</strong> 透過 transform 函數調整操作順序；<strong>CRDT</strong> 用無衝突資料結構。Figma / Notion 多走 CRDT。</Callout>
    </div>
    <Footer source={'設計模式/05 Real-time Updates.pdf · §常見的 Deep Dive 問題'} />
  </div>
);


const P41: Page = () => (
  <SectionEnd title={'Real-time 完'} subtitle={'push 容易 · scale 才難——下一站講搜尋怎麼別走 LIKE。'} next={'05 Search System</span>'} />
);


const P42: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 05'} title={'Search System'} subtitle={'搜尋是相關性排序 · 不是精確比對 · 不該住在主資料庫'} />
);


const P43: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何 LIKE '%xxx%' 不夠？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>SQL LIKE</strong> 不能用 index（前綴萬用字）→ 必須<strong>全表掃</strong>。  
<strong>SQL LIKE</strong> 不會做斷詞、同義詞、相關性、拼字糾正、boost 排序。  
<strong>Search 引擎</strong>做的事是：<strong>理解使用者真正想找什麼</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>資料庫做<strong>精確比對</strong>（user_id=123）；搜尋做<strong>相關性排序</strong>（所有「跑步鞋」相關商品按關聯度排）。完全不同的資料結構和查詢引擎。</span></div>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §為什麼搜尋是一個獨立的設計問題'} />
  </div>
);


const P44: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Inverted Index：搜尋引擎的核心</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · 倒排索引</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`原始文件：
  P1: "Nike Running Shoes"
  P3: "Nike Casual Shoes"
  P5: "Adidas Running Shoes"

倒排索引（term → posting list）：
  run    → [P1, P5]
  shoe   → [P1, P3, P5]
  nike   → [P1, P3]
  adidas → [P5]

查詢「nike running」→ [P1, P5] ∩ [P1, P3] = [P1]`}</pre>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Text Analysis Pipeline</strong>
Tokenize → Lowercase → Stop word removal → Stemming（running/runs/ran → run）。<strong>index 和 query 必須走同一條 pipeline</strong>才能匹配。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_05_search_01_inverted_index} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §倒排索引'} />
  </div>
);


const P45: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>CDC 是預設答案，不是 Dual Write</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · Indexing Pipeline</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>反模式 — Dual Write</strong>：app 同時寫 PostgreSQL 和 ES。  
<strong>問題</strong>：兩個寫入不是原子的——ES 失敗就資料不一致。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`PostgreSQL ──WAL──→ Debezium ──events──→ Kafka ──→ Indexer ──→ Elasticsearch
   (source)         (CDC)                (buffer)   (transform)   (search idx)`}</pre>
      <Callout tone='#D97757'><strong>CDC 優點</strong>：應用只寫主庫 · 搜尋同步完全解耦 · ES 暫時掛了 Kafka 緩衝不丟資料 · 索引時可做轉換（合併多表、計算欄位）  
<strong>代價</strong>：幾秒到幾十秒延遲（大多數搜尋場景可接受）</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_05_search_02_cdc_alias} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §Indexing Pipeline'} />
  </div>
);


const P46: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>BM25 + Boosting + 業務指標</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · 相關性排序</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>BM25（Lucene/ES 預設）</strong>
TF-IDF 改良版 · 加入文件長度標準化 · TF 飽和函數。<strong>「Gore-Tex」IDF 高（罕見有辨別力）</strong>，「鞋」IDF 低（每個商品都有）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Field Boosting</strong>
&lt;code&gt;"fields": ["name^3", "category^2", "description^1"]&lt;/code&gt;——名稱權重是描述的 3 倍。同樣的關鍵字出現位置不同，相關性不同。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>業務邏輯混入排序</strong>
最終分數 = 相關性 × 0.6 + 銷量 × 0.2 + 評分 × 0.1 + 新品加成 × 0.1。<strong>純文字相關性不夠</strong>，真實搜尋總是業務指標的線性組合。</Callout>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §相關性排序'} />
  </div>
);


const P47: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>從 BM25 到語義搜尋</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · 進階：Vector / Hybrid</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Vector / Semantic Search</strong>
query 與文件都轉成向量找最相近——<strong>不依賴關鍵字命中</strong>。「我的車怪聲音」可匹配「引擎異音」。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Hybrid Search</strong>
<strong>BM25（lexical / sparse）</strong> + <strong>vector（semantic / dense）</strong> → 取聯集 → cross-encoder rerank。  
適合 query 帶縮寫、產品名、團隊名（lexical 強），又要處理同義詞（semantic 強）。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Autocomplete = Edge N-gram</strong>
indexing 時把 "running" 拆成 r/ru/run/runn/runni/runnin/running，<strong>每個前綴都建索引</strong>——查詢直接用前綴精確匹配，<strong>100ms 內回應</strong>。</Callout>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §Autocomplete + RAG context'} />
  </div>
);


const P48: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Sharding · Replica · Cold/Warm/Hot</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · Elasticsearch 部署</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Coordinator + Data Node'} text={'query 進 coordinator → 並行查所有 shard → 合併結果'} />
        <StackRow tone='#A1813F' label={'② Sharding'} text={'每 shard 控制 <strong>10–50GB</strong>；索引建立時固定，事後只能 reindex 改'} />
        <StackRow tone='#5B7570' label={'③ Replica'} text={'1 primary + 1–2 replica，提供讀吞吐和容錯'} />
        <StackRow tone='#5B9770' label={'④ Hot/Warm/Cold Tier'} text={'熱資料用 SSD · 冷 log 移到 cheap S3-backed nodes'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Shard 估算</strong>：預估一年資料量 ÷ 25GB = primary shard 數。<strong>寧可多設一點</strong>——數量固定後只能 reindex。</Callout>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §搜尋系統的擴展'} />
  </div>
);


const P49: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>零停機索引切換</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · Reindex with Alias</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`1. Create products_v2  (新 mapping)
2. Reindex products_v1 → products_v2  (背景複製)
3. Atomic alias swap: "products" → v2  ← 一行命令切換
4. Delete products_v1`}</pre>
      <Callout tone='#E8634F'><strong>反模式</strong>：直接刪除舊索引重建——搜尋會在重建期間失效。  
<strong>正解</strong>：用 alias 做零停機切換，這是 Elasticsearch 的<strong>標準做法</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>ES 不該做主存儲</strong>——它是 secondary index，主資料還在 PostgreSQL/MySQL。掛了重建即可。</span></div>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §重建索引'} />
  </div>
);


const P50: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SEARCH · 分頁陷阱</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>方式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>注意</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>From/Size</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>有頁碼的搜尋（電商）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>限制最大 offset 10,000</strong>——深分頁效能崩潰</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Search After</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>無限下拉 feed（手機 App）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>效能穩 · 但<strong>不能跳頁</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>PIT Cursor</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>翻頁過程要一致快照</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>成本最高 · 適合報表匯出</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>面試標準答案</strong>：「搜尋功能我會用 Elasticsearch 建獨立索引，資料透過 CDC + Kafka 從主資料庫非同步同步。」<strong>主動說「不會用 LIKE」就拿一半分</strong>。</Callout>
    </div>
    <Footer source={'設計模式/06 Search System.pdf · §分頁'} />
  </div>
);


const P51: Page = () => (
  <SectionEnd title={'Search 完'} subtitle={'倒排索引 + 相關性排序 + 業務指標——下一站講分析資料怎麼搬。'} next={'06 Data Pipeline</span>'} />
);


const P52: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 06'} title={'Data Pipeline'} subtitle={'把原始事件搬到能被分析的地方 — 別在 OLTP 上跑 OLAP'} />
);


const P53: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_06_pipeline_01_lambda_kappa} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P54: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>為何 OLTP 跟 OLAP 要分開？</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>OLTP（線上交易）</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>OLAP（離線分析）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫頻率</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高（每筆即時）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>批次（每日 / 每小時）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>查詢模式</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>by primary key</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>aggregation / join 巨表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>延遲要求</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>&lt;100ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>秒-分鐘可接受</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>資料量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>TB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PB+</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>引擎</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PostgreSQL · MySQL</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>BigQuery · Snowflake · Redshift</div>
        </div>
      <Callout tone='#D97757'><strong>在 OLTP 上跑 OLAP 查詢</strong> = 把報表跑死交易庫。  
<strong>Data Pipeline 的職責</strong>：把資料從 OLTP <strong>複製 / 轉換</strong>到 OLAP。</Callout>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §什麼是 Data Pipeline'} />
  </div>
);


const P55: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>批次還是串流？延遲決定一切</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · Batch vs Stream</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'Batch（Spark）'} items={['處理「靜止的資料」 · 每小時 / 每天跑', '吞吐高 · 成本低 · 邏輯簡單', '延遲：<strong>≥ 10 分鐘</strong>（Spark job 啟動約 5–8 分鐘）', '用途：報表、ML 訓練、帳單計算']} />
        <TradeoffCol tone='#E8634F' title={'Stream（Flink / Kafka Streams）'} items={['處理「移動中的資料」 · 來一筆處理一筆', '低延遲（秒/亞秒）· 複雜度高', '用途：詐欺偵測、即時儀表板、推薦', '必須處理：重試、亂序、不重複計算']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>第一個問題永遠是</strong>：「這個資料需要多快被看到？」</span></div>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §批次還是串流'} />
  </div>
);


const P56: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Tumbling · Sliding · Session</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · Stream 視窗</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Tumbling Window（滾動）</strong>
固定大小 · 不重疊。「過去 5 分鐘的訂單數」——每筆事件只屬於一個視窗。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Sliding Window（滑動）</strong>
固定大小 · 重疊。「最近 5 分鐘的訂單數，每 1 分鐘更新」——同一筆事件可能屬於多個視窗。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Session Window（會話）</strong>
按用戶活動分組 · 閒置超過 N 分鐘算 session 結束。<strong>大小可變</strong>——適合分析用戶行為流。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_06_pipeline_02_etl_windows} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/07 Data Pipeline Design.pdf · §Apache Flink'} />
  </div>
);


const P57: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>串流處理最微妙的問題</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · Event Time &amp; Watermark</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>問題</strong>：手機離線時產生的事件，網路恢復才送到 server。  
用「處理時間」分視窗會把它分到錯誤的視窗。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Event Time</strong>：用事件本身記錄的真實發生時間  
<strong>Watermark</strong>：處理器對「這個時間點之前的所有事件都已到達」的聲明——<strong>watermark 推進 → 視窗關閉並輸出</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>取捨</strong>：watermark 延遲設長（10s）→ 結果準確但輸出慢；設短 → 快但可能漏遲到事件。</span></div>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §Event Time vs Processing Time'} />
  </div>
);


const P58: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · Lambda vs Kappa</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Lambda 架構</strong>
    Batch layer（Spark · 完整正確）<br />
    + Speed layer（Flink · 低延遲近似）<br />
    + Serving layer 合併</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Kappa 架構</strong>
    只有一條 stream pipeline（Kafka + Flink）<br />
    重新計算 = replay log<br />
    Kafka 保留期設足夠長（例如 90 天）</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Lambda 痛點</strong>
    兩套 codebase（batch / stream）<br />
    相同邏輯改兩遍 · 結果合併複雜</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Kappa 痛點</strong>
    重算大量歷史時 stream 比 Spark 慢<br />
    Kafka 長期保留儲存成本高</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>現代趨勢</strong>：<strong>Kappa 為主</strong>——維護成本低。除非題目強調「TB 級歷史分析」才需 Lambda。</span></div>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §兩種架構哲學'} />
  </div>
);


const P59: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · ETL vs ELT</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'ETL（傳統）'} items={['Extract → <strong>Transform</strong> → Load', '清洗在中間層（Spark / Airflow）', 'Warehouse 只進入乾淨資料', '<em>痛點：transform schema 寫死，新需求要回源頭重抽</em>']} />
        <TradeoffCol tone='#E8634F' title={'ELT（現代）'} items={['Extract → Load → <strong>Transform</strong>（在 Warehouse 內）', '原始資料先進 Snowflake/BigQuery', '用 SQL（dbt）做 transform layer', '新需求改 SQL 即可，不重 ingest']} />
      </div>
      <Callout tone='#D97757'><strong>ELT + dbt + Snowflake/BigQuery</strong> 是 2020s 的事實標準——把昂貴的 transform 工作交給雲端 data warehouse 的 MPP 引擎。</Callout>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §ETL 與 ELT'} />
  </div>
);


const P60: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Warehouse · Lake · Lakehouse</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · 資料去哪？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Data Warehouse</strong>
<strong>結構化、已清洗</strong> · schema-on-write · 適合 BI 報表。BigQuery · Snowflake · Redshift。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Data Lake</strong>
<strong>原始、未處理</strong> · schema-on-read · 儲存便宜彈性高 · 適合 ML 訓練。S3 + Parquet · HDFS · Azure Data Lake。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Data Lakehouse（湖倉一體）</strong>
S3 上加格式層（<strong>Apache Iceberg / Delta Lake</strong>）→ 支援 ACID 事務、Schema 演化、time travel、高效分析查詢。<strong>Databricks / Snowflake 都在走這條路</strong>。</Callout>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §資料去哪裡'} />
  </div>
);


const P61: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>三種語意保證 · Exactly-Once 是怎麼做到的</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · 容錯機制</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>At-most-once</strong>
最多一次 · 可能遺失。實作最簡單，<strong>金融/健康場景無法接受</strong>。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>At-least-once</strong>
至少一次 · 可能重複。<strong>大多數系統的預設</strong>——遇到失敗就重試。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>Exactly-once</strong>
精確一次。代價最高。<strong>實務做法</strong>：pipeline 保證 at-least-once + <strong>下游寫入做冪等</strong>（upsert / ON CONFLICT DO NOTHING）→ 等同 exactly-once 效果。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Checkpoint</strong> = 串流處理器把當前 offset + 中間聚合 state 寫到 S3。崩潰後從 checkpoint 恢復，不從頭重算。</span></div>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §容錯機制'} />
  </div>
);


const P62: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>兩個常見的管線模式</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PIPELINE · CDC + Fan-out</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[CDC]  PostgreSQL ──WAL──→ Debezium ──→ Kafka ──→ {BigQuery · ES · Redis}

[Fan-out]  App Server ──event──→ Kafka Topic ──┬──→ Feed Service
                                              ├──→ Search Indexer
                                              ├──→ Recommendation
                                              └──→ Analytics`}</pre>
      <Callout tone='#D97757'><strong>面試標準答案</strong>：「不影響線上 DB 效能下同步資料到另一個系統，<strong>CDC + Kafka 是預設方案</strong>。」</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Data Enrichment</strong>：高吞吐 stream 中，每筆事件都查 DB 找 user profile 會死。把 user profile 快取在 Redis / 本地記憶體並定期刷。</span></div>
    </div>
    <Footer source={'設計模式/07 Data Pipeline.pdf · §三個常見的管線模式'} />
  </div>
);


const P63: Page = () => (
  <SectionEnd title={'Data Pipeline 完'} subtitle={'Kafka 是骨幹 · Flink 是引擎——下一站講 RAG 怎麼幫 LLM 接上你的私有資料。'} next={'07 RAG</span>'} />
);


const P64: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 07'} title={'RAG (Retrieval-Augmented Generation)'} subtitle={'把外部知識喂給 LLM — 把幻覺換成引用'} />
);


const P65: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_07_rag_02_chunking} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P66: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Foundation Model 的 4 個根本限制</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RAG · WHY</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>① Knowledge Cutoff</strong>　 訓練資料凍結在某天，<strong>不知道近期事件</strong>  
<strong>② 缺乏特定領域深度</strong>　 醫療罕見病、最新療法等高度專業化資料不在訓練集  
<strong>③ 不知道私有資料</strong>　 公司內部流程、人事、商業機密  
<strong>④ Probabilistic 輸出 → Hallucination</strong>　 模型分配機率包括錯的後續，有 temperature/top-k 隨機性，<strong>模型無法區分「我知道」和「我不知道」</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>RAG = Retrieval-Augmented Generation</strong>：把外部知識<strong>先檢索</strong>，再把命中片段塞進 LLM prompt——<strong>用引用取代幻覺</strong>。</div>
    </div>
    <Footer source={'設計模式/08 RAG.pdf · §Foundation Model 的限制'} />
  </div>
);


const P67: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RAG · HOW · 4 個元件</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[Documents] ─chunk→ [Embedding Model] ─vec→ [Vector DB]
                                                 │ similarity search
                                                 ▼
[User Query] ─embed→ [Vector DB] ──→ Top-K chunks
                                          │
                                          ▼
                              [LLM Prompt: Q + Context]
                                          │
                                          ▼
                                      [Answer + Citations]`}</pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Ingestion'} text={'chunk → embed → 載入 Vector DB（offline）'} />
        <StackRow tone='#A1813F' label={'② Retrieval'} text={'query embed → similarity search → top-K candidates'} />
        <StackRow tone='#5B7570' label={'③ Augmentation'} text={'把 retrieved context 包成 prompt 給 LLM'} />
        <StackRow tone='#5B9770' label={'④ Generation'} text={'LLM 基於 context 生成答案 + 引用'} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_07_rag_01_four_components} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'設計模式/08 RAG.pdf · §RAG 是怎麼運作的'} />
  </div>
);


const P68: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>切分策略決定一切</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RAG · Chunking</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>Chunking 沒做好 = 整個 RAG 廢掉</strong>——chunk 太大塞不進 prompt；太小失去語意脈絡。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>固定大小切分</strong>
200–500 token / chunk · 相鄰 chunk overlap 10–20%（防止關鍵句剛好被切斷）。最常用。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>語意切分</strong>
按段落、句號、標題切——<strong>保留語意邊界</strong>，避免半句話被分開。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>遞迴切分</strong>
先按章節切大塊 → 大塊太大再按段落切 → 段落太大按句切。LangChain `RecursiveCharacterTextSplitter` 是預設。</Callout>
    </div>
    <Footer source={'設計模式/08 RAG.pdf · §第一步：Ingestion'} />
  </div>
);


const P69: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>提升 RAG 品質的 5 個招式</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RAG · Hybrid Search &amp; Rerank</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>① Hybrid Search</strong>
<strong>dense vector</strong>（semantic）+ <strong>sparse vector / BM25</strong>（lexical）取聯集 → rerank。處理「縮寫、產品名、團隊名」等 lexical 強場景。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>② Query Rewriting / HyDE</strong>
LLM 先把 query 改寫成多個變體 → 並行檢索 → 結果合併。HyDE = LLM 先生成「假想答案」再用它做 vector search。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>③ Re-ranking</strong>
召回 50 個 → cross-encoder model rerank → 取 top 5 進 prompt。<strong>Cohere Rerank / BGE Reranker</strong> 是常見選擇。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>④ Citation Enforcement</strong>
Prompt 強制「<strong>只用 context 內容回答 + 引用來源 ID</strong>」。沒命中就回「I don't know」。</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>⑤ Evaluation Loop</strong>
<strong>Ground Truth Eval Set</strong>：一組 query + 預期答案。用 RAGAS / LLM-as-judge 衡量 retrieval（recall / precision）和 generation（faithfulness / answer relevance）。</Callout>
    </div>
    <Footer source={'設計模式/08 RAG.pdf · §RAG 怎麼運作 + §什麼是 RAG'} />
  </div>
);


const P70: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RAG · Hallucination 對策</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'降低幻覺 ✓'} items={['Prompt 強制「只用 context 回答」', '沒命中時回「I don\'t know」', '每個答案附 source citation（人工可審）', 'Temperature 設低（0.0–0.3）', 'Eval set 持續監控 faithfulness 分數']} />
        <TradeoffCol tone='#E8634F' title={'常見錯誤 ✗'} items={['Top-K 設太大塞爆 context window', 'Chunk 邊界切壞（半句話）', '沒做 reranking 直接餵 vector top-K', '沒監控 retrieval recall', 'Embedding model 跟內容語言不匹配']} />
      </div>
    <Footer source={'設計模式/08 RAG.pdf · §失去用戶信任 + §RAG 帶來的好處'} />
  </div>
);


const P71: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RAG · Vector DB 選型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'專用 Vector DB（Pinecone / Weaviate / Qdrant）'} items={['查詢延遲穩定（< 50ms p99）', 'HNSW / IVF index 內建', '10M+ 向量也順', '多租戶隔離']} />
        <TradeoffCol tone='#E8634F' title={'傳統 DB 加掛（pgvector / Redis）'} items={['沿用現有 Postgres', '事務 + 關聯查詢一站搞定', '< 100k 向量足夠快', '運維簡單']} />
      </div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：原型 + 中小規模用 <strong>pgvector</strong>；千萬向量以上 + 多租戶用 <strong>Pinecone / Qdrant</strong>。</Callout>
    </div>
    <Footer source={'設計模式/08 RAG.pdf · §第二步：Retrieval'} />
  </div>
);


const P72: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>從靜態 retrieve 到 agent orchestration</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RAG · Agentic RAG</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`[User Query]
    │
    ▼
[Agent (LLM)] ──┬──→ [Vector DB · Pinecone]
    │           ├──→ [User Config API]
    │           ├──→ [Usage History API]
    │           ├──→ [Slack / SMS]
    │           └──→ ...更多工具
    ▼
[Reasoning · Validate · Aggregate] → [Output]`}</pre>
      <Callout tone='#D97757'><strong>Agentic RAG</strong>：LLM 自己決定<strong>該問什麼問題、用哪些工具、何時用、如何聚合結果</strong>——RAG 不再只是「一次 vector lookup + prompt」，而是<strong>動態 orchestration</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>問題已經不是「要不要實作 RAG」，而是「<strong>如何針對你的 use case 設計它的架構</strong>」。</span></div>
    </div>
    <Footer source={'設計模式/08 RAG.pdf · §RAG 在 Agentic Workflow 中的角色'} />
  </div>
);


const P73: Page = () => (
  <SectionEnd title={'RAG 完'} subtitle={'Retrieve → Augment → Generate · Eval · Iterate——下一站把 7 個 pattern 串成一個案例。'} next={'99 Recap</span>'} />
);


const P74: Page = () => (
  <ChapterDivider eyebrow={'CHAPTER · 07 · TOPIC 99'} title={'Recap & Graduation'} subtitle={'把 7 個進階模式串起來 · 整門課的終點'} />
);


const P75: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_99_recap_02_course_map} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P76: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>設計：客服 AI 助理</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE STUDY · 把進階模式串起來</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'Real-time'} text={'前端 SSE 串流 LLM token 給用戶（聊天用 WebSocket）'} />
        <StackRow tone='#A1813F' label={'RAG'} text={'客戶問題 embed → pgvector → Top-K chunks → rerank → LLM prompt'} />
        <StackRow tone='#5B7570' label={'Search'} text={'Elasticsearch BM25 keyword 檢索 · 跟 vector 結果 hybrid'} />
        <StackRow tone='#5B9770' label={'Long Tasks'} text={'複雜任務（退費、查訂單）走 Temporal workflow + saga'} />
        <StackRow tone='#5B9770' label={'Large Blobs'} text={'用戶上傳問題截圖走 presigned URL 直傳 S3'} />
        <StackRow tone='#5B9770' label={'Queue'} text={'對話 log 進 Kafka topic（fan-out 到下游 4 個服務）'} />
        <StackRow tone='#5B9770' label={'Pipeline'} text={'Kafka → Snowflake · 每日 dbt transform 出分析報表'} />
      </div>
      <Callout tone='#D97757'><strong>每個元件都是 Ch.7 的一個 pattern</strong>——進階模式組合就是現代 AI 應用的縮影。</Callout>
      <div style={{ display: 'flex', justifyContent: 'center' }}><img src={img_99_recap_01_ai_assistant} alt='' style={{ maxHeight: 420, maxWidth: '100%', objectFit: 'contain' }} /></div>
    </div>
    <Footer source={'整合 Ch.7 全章 + Anthropic / OpenAI 公開 best practice'} />
  </div>
);


const P77: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第七章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'新的工具'} items={['Kafka / RabbitMQ / SQS · partition · DLQ · backpressure', '長任務 4 機制 · idempotency · heartbeat · poison message', '大檔案 presigned URL · multipart · CDN · range request', 'Real-time 4 種推送 · 兩個 hop · Pub/Sub · CRDT', 'Search 倒排索引 · BM25 · CDC · alias reindex · hybrid', 'Lambda vs Kappa · ETL vs ELT · Lakehouse · watermark', 'RAG 4 元件 · chunking · rerank · agentic']} />
        <TradeoffCol tone='#E8634F' title={'核心心法'} items={['進階 pattern 不是越多越好', '每個都有「不該用」的情境', '複雜度跟著規模才有意義', '面試時主動指出 trade-off 拿分']} />
      </div>
  </div>
);


const P78: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>整套課程 · 7 章地圖</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`Ch.1 Foundation       基本元件 · client/server/db/cache/cdn/dns
Ch.2 Data Fundamentals SQL/NoSQL · ACID · CAP · 索引
Ch.3 Data Distribution Sharding · Replication · Consistency
Ch.4 Infrastructure   API Gateway · LB · Container · Serverless
Ch.5 Reliability Ops  Monitoring · 限流 · Circuit Breaker · IaC
Ch.6 Scaling Patterns Read · Write · Cache · Microservices
Ch.7 Advanced         Queue · Long · Blob · RT · Search · Pipe · RAG`}</pre>
      <Callout tone='#D97757'><strong>從基本元件到分散式 · 從擴展到 AI——你走完了。</strong>  
面試 / 工作時的「locker room」就是這 7 章。</Callout>
    </div>
  </div>
);


const P79: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>畢業 · 下一步學什麼</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 實作練習'} text={'自己跑一遍 Capstone（90 章）· 實作小型 RAG · scale 到 1k QPS'} />
        <StackRow tone='#A1813F' label={'② 系統設計面試'} text={'ByteByteGo · Designing Data-Intensive Applications · Hello Interview · Grokking'} />
        <StackRow tone='#5B7570' label={'③ 深度延伸'} text={'DDIA（資料密集應用設計） · SRE Book · The DDD Reference'} />
        <StackRow tone='#5B9770' label={'④ 真實案例'} text={'High Scalability blog · 各大公司 engineering blog（Uber/Netflix/Stripe/Discord）'} />
        <StackRow tone='#5B9770' label={'⑤ 動手做'} text={'自架 Kafka cluster · 寫個 RAG demo · 跑 K8s 部署 · 實際用 Temporal'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>最重要的事</strong>：不要只看理論——<strong>自己挖一個系統的 bug、自己 scale 一次 production</strong>，比讀十本書都有用。</span></div>
    </div>
  </div>
);


const P80: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>給未來面試 / 工作的你</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>面試時的 5 句通關咒</strong>：

1. 「先問清需求和規模，<strong>不要一聽題就畫架構</strong>」
2. 「<strong>主動指出 trade-off</strong>——每個方案的代價是什麼」
3. 「<strong>這個量級不需要 X</strong>——展示你知道什麼時候不該用」
4. 「<strong>從簡單開始</strong>，按需求逐步升級」
5. 「<strong>會不會破壞現有系統？</strong>——backward compatibility 是鐵律」</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>技術會過時，<strong>判斷力不會</strong>。Linus 說的：「Theory and practice sometimes clash. Theory loses. Every single time.」</span></div>
    </div>
  </div>
);


const P81: Page = () => (
  <SectionEnd title={'Ch.7 · 整門課完'} subtitle={'7 章 · 50+ pattern · 100+ trade-off · 你準備好了。'} />
);


export const meta: SlideMeta = { title: 'Ch.7 · Advanced Patterns' };
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
  P71,
  P72,
  P73,
  P74,
  P75,
  P76,
  P77,
  P78,
  P79,
  P80,
  P81,
] satisfies Page[];
