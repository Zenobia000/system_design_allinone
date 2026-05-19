import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_01_iot_01_architecture_concept from './assets/01_iot_01_architecture_concept.png';
import img_02_cost_01_triangle_concept from './assets/02_cost_01_triangle_concept.png';

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
  <ChapterDivider eyebrow='CHAPTER · 09 · OVERVIEW' title='Case Study & Constraints' subtitle='把 Ch.1–8 用到真實案例上' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_mental_model_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>看完本章，你能回答：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① IoT 監控系統怎麼從零設計？' text='全流程演練' />
        <StackRow tone='#A1813F' label='② 成本 / 期限 / 完美技術衝突時怎麼取捨？' text='' />
        <StackRow tone='#5B7570' label='③ 為何「團隊技能」常勝過「先進技術」？' text='' />
        <StackRow tone='#5B9770' label='④ 真實架構師的決策手稿長什麼樣？' text='' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.9 · `SA簡報/S12, S14.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 真實案例的三層約束</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   理論最佳 (Ch.1-8 學的東西)
            ↓
   ─────── 撞上 ───────
            ↓
   ┌──────────────────────────────┐
   │ 時間 · Deadline 6 個月        │
   │ 預算 · $50k cloud + 5 工程師  │
   │ 技能 · 團隊熟 Python，沒人懂 Rust │
   │ 政治 · CTO 要求用 AWS         │
   │ 合規 · GDPR + ISO27001        │
   └──────────────────────────────┘
            ↓
   實際可行的架構（妥協後的版本）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：架構師最重要的能力，是知道「<strong>理想</strong>」和「<strong>可行</strong>」的差距。</span></div>
    </div>
    <Footer source='`S12_Slides.pdf` · §Reality Constraints' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='用 IoT 案例練全流程。' next='9.1 IoT Case</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 09 · TOPIC 01' title='IoT Monitoring System' subtitle='從零設計：10 萬個感測器即時監控' />
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_iot_01_architecture_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>REQUIREMENTS · 客戶說</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>&gt; 我們在全台工廠部署 10 萬個感測器（溫度 / 振動 / 電流）。
&gt; 需要即時監控、異常告警、3 年歷史查詢、月報表。
&gt; 預算有限，6 個月內上線。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>架構師第一步</strong>：把這段話翻譯成數字。</div>
    </div>
    <Footer source='`S14_Slides.pdf` · §IoT Scenario' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ESTIMATION · 規模計算</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   感測器數          100,000
   每秒回報          1 reading / 10 sec
   ─────────────────────────────────
   寫入 QPS          10,000 QPS（穩態）
   單筆 payload      ~100 bytes
   ─────────────────────────────────
   每日資料量        100k × 8640 × 100 bytes ≈ 86 GB/day
   3 年保留          ~95 TB
   ─────────────────────────────────
   讀取                 即時告警 < 1s
                       歷史查詢 5s 可接受
                       月報表 30s OK`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>寫多讀少 · 時序資料 · 大量但每筆小</strong>——典型時序資料庫場景。</span></div>
    </div>
    <Footer source='`S14_Slides.pdf` · §Estimation' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DECISION · 技術選型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>元件</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>選擇</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>為什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>設備接入</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MQTT (Mosquitto)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低頻寬 · QoS · IoT 標準</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主存儲</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>TimescaleDB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>時序優化 · SQL · 團隊熟 PG</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>即時告警</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Kafka + Flink</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>規則引擎 · stream 處理</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Cache</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Redis</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最新讀數 · 排行榜</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>報表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Grafana</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內建 TimescaleDB driver</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>前端</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Next.js</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>既有技能</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>部署</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AWS ECS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>已有合約 · 不上 K8s</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>沒用 InfluxDB / Cassandra</strong>：團隊熟 PG，TimescaleDB 是 PG extension——比學新 DB 快 3 個月。</span></div>
    </div>
    <Footer source='`S14_Slides.pdf` · §Tech Stack Decision' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ARCHITECTURE · 整體圖</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   100k Sensors ──MQTT──→ [Mosquitto Broker]
                                  ↓
                          [Ingest Service]
                                  ↓
                ┌─────────────────┴─────────────────┐
                ▼                                    ▼
           [Kafka topic]                      [TimescaleDB]
                ↓                                    ↑
           [Flink Rule Engine]                       │
                ↓                                    │
           告警 → SMS / Email                  [Grafana]
                                                     │
                                              使用者 / API`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>設計哲學</strong>：寫端與分析端<strong>走兩條路</strong>——TimescaleDB 存歷史、Kafka 走即時。</span></div>
    </div>
    <Footer source='`_source/09_Case_Study_Constraints.md` · §Architecture' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RISK · 風險評估</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>Risk 1</strong>：MQTT broker 單點 → mosquitto cluster + DNS failover</Callout>
      <Callout tone='#E8634F'><strong>Risk 2</strong>：TimescaleDB 寫入瓶頸（10k QPS）→ 分時段批次 + hypertable 分區</Callout>
      <Callout tone='#E8634F'><strong>Risk 3</strong>：Kafka topic 累積過快 → retention 7 天 · 重要事件持久化到 DB</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>沒有零風險的架構</strong>——架構師的責任是把風險<strong>識別出來、文件化、有 mitigation</strong>。</span></div>
    </div>
    <Footer source='`S14_Slides.pdf` · §Risk Mitigation' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='IoT Case 完' subtitle='案例懂了，下一站講取捨。' next='9.2 Cost & Timeline</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 09 · TOPIC 02' title='Cost & Timeline' subtitle='完美技術 vs 死線——架構師最常做的取捨' />
);


const P16: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_cost_01_triangle_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何不能追求「完美架構」？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>完美架構 = 6 個月設計 + 12 個月實作 + 半年穩定。
死線 = 9 個月後競爭對手會上市。

<strong>慢 = 死</strong>。
架構師的工作是<strong>讓「不完美但能活」</strong>的架構上線。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>完美的死系統 ≠ 不完美的活系統</li>
          <li>上線後再演進，永遠是對的</li>
          <li>「先上線」是大多數新業務的鐵律</li>
        </ul>
    </div>
    <Footer source='`S12_Slides.pdf` · §Time vs Quality' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三軸取捨模型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`              品質 (Quality)
                   ▲
                   │
                   │
            ───────●───────  ← 你能挑 2 個
              ╱         ╲
            ╱             ╲
         成本             速度
         (Cost)           (Speed)

   經典三角：三選二，第三必然犧牲`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>業務情境</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>選擇</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MVP / 創業</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>速度 + 成本（犧牲品質）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>銀行 / 醫療</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>品質 + 成本（犧牲速度）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>緊急上線</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>速度 + 品質（犧牲成本）</div>
        </div>
    </div>
    <Footer source='`S12_Slides.pdf` · §Triangle Trade-off' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · MVP 取捨策略</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 用 buy 不用 build' text='Auth0 / Stripe / Sendgrid · 自建賠工時' />
        <StackRow tone='#A1813F' label='② 用 boring tech' text='PostgreSQL + Redis · 不上 K8s' />
        <StackRow tone='#5B7570' label='③ Monolith 起手' text='單體 + 模組化 · 拆分晚點' />
        <StackRow tone='#5B9770' label='④ 監控簡化' text='CloudWatch + Sentry 起步 · 別上 ELK 全套' />
        <StackRow tone='#5B9770' label='⑤ 自動化從 0 起步' text='一鍵部署一定要 · 其他人工為主' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：MVP 階段砍 50% 「將來會用到」的功能。
那些「將來」<strong>通常永遠不會來</strong>。</Callout>
    </div>
    <Footer source='`S12_Slides.pdf` · §MVP Architecture' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 技術債的記帳</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   接受技術債的時機：
   ─────────────────
   ✓ 上線壓力大       → 記下來，3 個月內還
   ✓ 業務尚未驗證     → 記下來，pivot 後再還
   ✓ 規模還沒到       → 記下來，scale 前還

   不能接受的技術債：
   ─────────────────
   ✗ 安全漏洞         → 立即修
   ✗ 資料完整性       → 立即修
   ✗ 沒有測試         → 加上測試再上線`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>鐵律</strong>：所有技術債必須<strong>寫進 issue tracker</strong>——口頭承諾的債，全部會被遺忘。</span></div>
    </div>
    <Footer source='`S12_Slides.pdf` · §Tech Debt Ledger' />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 何時該堅持「不妥協」？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='可以妥協（先上線再說）' items={['UI 美觀', '非核心功能', '性能不到瓶頸時', 'auto-scaling 細節', '「未來會大」的設計']} />
        <TradeoffCol tone='#E8634F' title='不能妥協' items={['資料模型（後改超痛）', '認證/權限基礎', '核心 API 契約', '日誌與監控基線', '備份與災難恢復']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：MVP 為求快，把 user_id 設成 INT autoincrement。後來合規要 UUID + 軟刪除——整套重寫。</Callout>
    </div>
    <Footer source='`S12_Slides.pdf` · §Where Not to Compromise' />
  </div>
);


const P22: Page = () => (
  <SectionEnd title='Cost & Timeline 完' subtitle='取捨懂了，下一站講團隊約束。' next='9.3 Team Constraints</span>' />
);


const P23: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 09 · TOPIC 03' title='Team Constraints' subtitle='選 Java 不是因為 Java 好，是因為團隊熟' />
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何「最佳技術」常是錯答案？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>技術 benchmark 顯示 Rust 比 Python 快 30 倍。
但團隊 10 個人，1 個會 Rust，9 個會 Python。

<strong>選 Rust</strong> → 9 人邊學邊做 → 半年完成 + 一堆 bug
<strong>選 Python</strong> → 10 人熟練 → 3 個月完成 + 穩

「最佳技術」常常輸給「<strong>團隊能駕馭的技術</strong>」。</Callout>
    </div>
    <Footer source='`S12_Slides.pdf` · §Team-driven Selection' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 團隊技能盤點</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 主力語言調查' text='每人列 3 個熟練語言 · 1 個學習中' />
        <StackRow tone='#A1813F' label='② DB / Infra 經驗' text='K8s / Docker / CI/CD 各幾人？' />
        <StackRow tone='#5B7570' label='③ 架構模式熟悉度' text='微服務 / DDD / event-driven 經驗' />
        <StackRow tone='#5B9770' label='④ 招募市場' text='半年內能招到幾個合格人選？' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>架構師 Day 0 必做</strong>：和 HR / 招募主管聊一次。
不知道招得到誰，選的技術會變成空談。</Callout>
    </div>
    <Footer source='`S12_Slides.pdf` · §Team Skill Audit' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 五個團隊規模對應的策略</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>團隊大小</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>推薦架構</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>不推薦</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1–3 人</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Modular monolith · 雲端 PaaS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>微服務 · K8s 自管</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>4–10 人</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Monolith 拆 BFF · containerize</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Event Sourcing 全套</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>11–20 人</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Modular monolith · 部分服務化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>完整微服務</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>21–50 人</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>微服務 + 平台組</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不專業化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>50+ 人</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>微服務 · platform engineering</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Modular monolith</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Conway's Law 再次出現</strong>：架構複雜度上限 ≈ 團隊規模。</span></div>
    </div>
    <Footer source='`S12_Slides.pdf` · §Team Size Strategy' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 政治約束（無形但致命）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>政治約束</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>案例</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>解法</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CTO 偏好</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「我們是 AWS shop」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>在 AWS 內找最佳解</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>既有合約</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>已買 Oracle license</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>用到合約結束</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>合規限制</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>醫療需 HIPAA</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>選 compliant SaaS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>部門政治</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>安全組要 review 一切</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>提早 loop in</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上市承諾</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>已對客戶承諾上線日</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>砍 scope · 不延期</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>架構師失敗最常見原因</strong>：忽略政治約束，做了「技術正確」但「<strong>組織通不過</strong>」的設計。</Callout>
    </div>
    <Footer source='`S12_Slides.pdf` · §Political Constraints' />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 該為團隊「拉高」還是「就低」？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='拉高（引入新技術 / 培訓）' items={['長期業務有持續成長', '核心競爭力需要新技術', '團隊有學習意願 + 時間', '有 1 個 senior 可帶']} />
        <TradeoffCol tone='#E8634F' title='就低（用團隊熟的）' items={['業務不確定性高', '時間壓力大', '沒人能 mentor', '規模不需要新技術紅利']} />
      </div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：每年只能引入 1–2 個新技術——就算客觀上 ROI 很高，更多會壓垮團隊。</Callout>
    </div>
    <Footer source='`S12_Slides.pdf` · §Team Upskilling' />
  </div>
);


const P29: Page = () => (
  <SectionEnd title='Team Constraints 完' subtitle='外部約束處理完，章末收斂。' next='Ch.9 Recap</span>' />
);


const P30: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 09 · RECAP' title='Case Study 收斂' subtitle='把整本書串成一份架構文件' />
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TEMPLATE · 完整架構文件目錄</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   /architecture-doc/
   ├── 01_requirements/
   │   ├── PRD.md
   │   ├── NFR_Matrix.csv
   │   └── Constraints.json
   ├── 02_design/
   │   ├── DomainModel.mermaid
   │   ├── C4_Container.mermaid
   │   ├── DataFlow.mermaid
   │   └── API_OpenAPI.yaml
   ├── 03_decisions/
   │   ├── ADR-001-DB-Selection.md
   │   ├── ADR-002-Auth-Strategy.md
   │   └── ADR-003-Deployment.md
   ├── 04_risks/
   │   ├── RiskAssessment.md
   │   └── FailureModeAnalysis.md
   └── 05_runbook/
       ├── Deployment.md
       └── OncallPlaybook.md`}</pre>
    <Footer source='整合 Ch.1–9 全部產出' />
  </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第九章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['IoT 案例全流程演練', '三軸取捨模型', 'MVP 取捨策略 5 條', '團隊規模策略表', '架構文件目錄範本']} />
        <TradeoffCol tone='#E8634F' title='還沒回答的問題' items={['怎麼說服別人？　→ Ch.10', '跨角色怎麼溝通？　→ Ch.10', '怎麼持續成長？　→ Ch.10']} />
      </div>
  </div>
);


const P33: Page = () => (
  <SectionEnd title='Ch.9 完' subtitle='技術功夫到位，下一站練軟實力。' next='Ch.10 Soft Skills</span>' />
);


export const meta: SlideMeta = { title: 'Ch.9 · 案例研究' };
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
] satisfies Page[];
