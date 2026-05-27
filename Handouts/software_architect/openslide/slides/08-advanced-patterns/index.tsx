import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_01_microservices_01_split_concept from './assets/01_microservices_01_split_concept.png';
import img_02_es_01_crud_vs_es_concept from './assets/02_es_01_crud_vs_es_concept.png';

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
  <ChapterDivider eyebrow='CHAPTER · 08 · OVERVIEW' title='Advanced Patterns' subtitle='*Only use when relevant—* 三個高成本高回報的模式' />
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
        <StackRow tone='#D97757' label='① Microservices 何時值得？' text='何時是災難？' />
        <StackRow tone='#A1813F' label='② Event Sourcing 解什麼？' text='帶來什麼新麻煩？' />
        <StackRow tone='#5B7570' label='③ CQRS 何時開始發揮價值？' text='' />
        <StackRow tone='#5B9770' label='④ 三個模式可以混用嗎？' text='' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.8 · `MicroServicesReading.pdf` · `EventSourcingReading.pdf` · `CQRSReading.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 進階 ≠ 預設</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   80% 系統：           單體 + 經典 3 層
   ──────────────────────────────
   15% 系統：           單體模組化 + 部分事件驅動
   ──────────────────────────────
   5% 系統：            微服務 + Event Sourcing + CQRS
   ──────────────────────────────

   這 5% 是「面試會考、但你工作不一定遇到」的部分
   架構師的功課：知道什麼時候**不要**用它們`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：進階模式是「沒它就解不了的問題」的解法——沒問題就別主動引入。</span></div>
    </div>
    <Footer source='`MicroServicesReading.pdf` · §When Not to' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先談微服務。' next='8.1 Microservices</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 08 · TOPIC 01' title='Microservices' subtitle='貴族病——團隊夠大才該得' />
);


const P08: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_microservices_01_split_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何不是「拆得越細越好」？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>微服務解決的不是「技術問題」，是「<strong>團隊規模問題</strong>」。

50 人團隊都改同一份 codebase → merge 衝突地獄、release 互相卡。
拆成 10 個服務 × 5 人組 → 各自獨立 deploy。

<strong>少於 20 人團隊，微服務帶來的代價遠超回報。</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>微服務 = 用「<strong>運維複雜度</strong>」換「<strong>團隊自主性</strong>」</li>
          <li>沒到那規模，這筆交易划不來</li>
        </ul>
    </div>
    <Footer source='`MicroServicesReading.pdf` · §Why Microservices' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 微服務的 5 個前置條件</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 容器化 + K8s 熟練' text='沒有自動部署 → 不要拆' />
        <StackRow tone='#A1813F' label='② CI/CD 成熟' text='每個服務獨立 pipeline' />
        <StackRow tone='#5B7570' label='③ 觀測性完整' text='trace / log / metric 三件套' />
        <StackRow tone='#5B9770' label='④ 服務發現 + LB' text='service mesh / k8s ingress' />
        <StackRow tone='#5B9770' label='⑤ 跨服務事務工具' text='Saga / Outbox pattern' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>前置缺一即失敗</strong>。一年內看過 N 家公司拆完微服務後悔→花 2 年合回單體。</Callout>
    </div>
    <Footer source='`MicroServicesReading.pdf` · §Prerequisites' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 拆分原則</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>原則</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>內容</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>反模式</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>按業務邊界</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>用 DDD Bounded Context</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>按技術層拆（auth-controller / auth-db）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>資料獨立</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每服務有自己的 DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>多服務共用一個 DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>介面穩定</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>公開 API 版本控管</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>隨意改公開 schema</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>獨立部署</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一個服務改不影響其他</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一改要重新 deploy 整個 system</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>容錯設計</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>下游掛了我還能跑（降級）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一個服務掛 = 全系統掛</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Conway's Law</strong>：系統架構會反映團隊結構——拆服務前先拆團隊。</span></div>
    </div>
    <Footer source='`MicroServicesReading.pdf` · §Splitting Principles' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 通訊與一致性</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   同步通訊 (REST / gRPC)
   ──────────────────────
   ✓ 簡單直覺
   ✗ 鏈式依賴 · 雪崩風險
   ✗ SLA 相乘 (4 個 99.9% = 99.6%)

   異步通訊 (Kafka / RabbitMQ)
   ──────────────────────────
   ✓ 解耦 · 容錯
   ✓ 事件可 replay
   ✗ 一致性靠 Saga
   ✗ debug 更難

   原則：對外同步、對內異步`}</pre>
    <Footer source='`MicroServicesReading.pdf` · §Communication' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 拆 vs 不拆</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該拆的訊號' items={['團隊 > 30 人', '不同模組 release 頻率差 10×', '不同模組 scaling 需求差大', '不同模組需不同技術棧', '已有 K8s + observability 基礎']} />
        <TradeoffCol tone='#E8634F' title='不該拆的訊號' items={['團隊 < 15 人', '沒 K8s 經驗', '監控告警還沒到位', '「未來可能會大」（沒驗證）', '追潮流']} />
      </div>
      <Callout tone='#D97757'><strong>Modular Monolith</strong> 是中間路：邏輯模組清楚 + 統一部署。
<strong>90% 系統的最佳解</strong>，不是微服務。</Callout>
    </div>
    <Footer source='`MicroServicesReading.pdf` · §Modular Monolith' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='Microservices 完' subtitle='知道何時不該拆，下一站講 Event Sourcing。' next='8.2 Event Sourcing</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 08 · TOPIC 02' title='Event Sourcing' subtitle='存「發生了什麼」，不是「現在是什麼」' />
);


const P16: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_es_01_crud_vs_es_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何「儲存所有事件」？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>傳統 CRUD：DB 存「目前餘額 = 100」。
過去發生什麼？<strong>遺失了。</strong>

Event Sourcing：DB 存「+50, +30, -10, +30」每筆事件。
任何時刻的餘額 = 從頭播放事件。

<strong>對需要完整稽核軌跡的系統（金流 / 醫療）至關重要。</strong></Callout>
    </div>
    <Footer source='`EventSourcingReading.pdf` · §Why Event Sourcing' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 核心結構</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   傳統 CRUD                   Event Sourcing
   ─────────                  ──────────────
   Table: accounts            Table: events
   ┌────┬─────┐               ┌────┬──────────┬───────┐
   │ id │ bal │               │ id │ event    │ data  │
   ├────┼─────┤               ├────┼──────────┼───────┤
   │ 1  │ 100 │               │ 1  │ Deposit  │ +50   │
   └────┴─────┘               │ 2  │ Deposit  │ +30   │
                              │ 3  │ Withdraw │ -10   │
   問題：無歷史               │ 4  │ Deposit  │ +30   │
                              └────┴──────────┴───────┘
                              當前餘額 = sum() = 100
                              + snapshot 加速`}</pre>
    <Footer source='`EventSourcingReading.pdf` · §Core Structure' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 適用情境</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 金融帳戶' text='每筆交易必留軌跡 · 合規要求' />
        <StackRow tone='#A1813F' label='② 醫療紀錄' text='病歷不可篡改 · 時序重要' />
        <StackRow tone='#5B7570' label='② 訂單流程' text='status 變化路徑要可追溯' />
        <StackRow tone='#5B9770' label='④ IoT 設備' text='event stream 天然就是 events' />
        <StackRow tone='#5B9770' label='⑤ 撤銷功能' text='ctrl-Z 設計 / 編輯歷史' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>判斷準則</strong>：問「我能不能丟掉 history？」
能丟 → 別用 ES（過度設計）。
不能丟 → ES 是天然選擇。</Callout>
    </div>
    <Footer source='`EventSourcingReading.pdf` · §Use Cases' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三大難題</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>難題</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>解法</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>重播慢</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Snapshot 機制（每 N event 存 state）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Event schema 演進</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Event versioning · upcaster</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>查詢困難</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>配合 CQRS（projection 出讀模型）</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：用 ES 但沒做 snapshot——10 年後重建一個帳戶要 replay 1M 事件，請求 30 秒才回。</Callout>
    </div>
    <Footer source='`EventSourcingReading.pdf` · §Common Pitfalls' />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · ES 的真實成本</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='ES 紅利' items={['完整稽核軌跡', '時間旅行 debug', '支援多 projection', '事件可 replay 修 bug', '天然 event-driven']} />
        <TradeoffCol tone='#E8634F' title='ES 代價' items={['學習曲線陡', '查詢必須建 projection', 'Event schema 變更難', '儲存空間翻倍', '整套團隊培訓成本高']} />
      </div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：<strong>只在 audit log 是法律要求</strong>或業務本質就是事件流時，才完整上 ES。
其他情況「<strong>outbox table + 一般 CRUD</strong>」夠用。</Callout>
    </div>
    <Footer source='`EventSourcingReading.pdf` · §Cost-Benefit' />
  </div>
);


const P22: Page = () => (
  <SectionEnd title='Event Sourcing 完' subtitle='事件存好了，下一站講讀寫分離。' next='8.3 CQRS</span>' />
);


const P23: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 08 · TOPIC 03' title='CQRS' subtitle='讀寫分離——當讀寫比例失衡時' />
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何要把 Read 和 Write 分開？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>對絕大多數系統：
- <strong>寫</strong>：訂單成立 / 留言 / 編輯 （規模 1×）
- <strong>讀</strong>：商品列表 / 動態瀏覽 / 報表 （規模 100–1000×）

讀寫比例 1:100+ 的系統，用同一個 model 解決兩端
→ 寫端被讀端拖慢、讀端被寫端複雜度拖累。

<strong>CQRS = 為讀寫設計兩套 model。</strong></Callout>
    </div>
    <Footer source='`CQRSReading.pdf` · §Why CQRS' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 核心架構</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ┌──────────────────────────────┐
   │      Command (寫端)           │
   │   - 強 schema · 驗證 · 事務   │
   │   - 寫到 master DB / event   │
   └─────────────┬────────────────┘
                 │  事件 / replication
                 ▼
   ┌──────────────────────────────┐
   │      Query (讀端)             │
   │   - 多個 projection           │
   │   - 反正規化 · 預先 join      │
   │   - 各自最佳化（ES / Cache）  │
   └──────────────────────────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>洞察</strong>：寫端要正確、讀端要快。兩種優化方向完全不同 → 分開設計。</span></div>
    </div>
    <Footer source='`CQRSReading.pdf` · §Architecture' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 適合與不適合</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>情境</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適合 CQRS?</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀寫比 &lt; 10:1</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 不必</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀寫比 &gt; 100:1</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 強烈建議</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>報表 / dashboard 多</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 多 projection 有用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>簡單 CRUD</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 過度設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>配合 Event Sourcing</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 天作之合</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MVP / POC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✗ 不要</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>需要不同存儲（DB + Search）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>✓ 自然 fit</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>CQRS + Event Sourcing</strong>：黃金組合，但維運複雜度極高——只有 5% 系統值得。</Callout>
    </div>
    <Footer source='`CQRSReading.pdf` · §When to Use' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三層演進</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 同 DB · 分 Service' text='一個 Command service + 一個 Query service · 同 DB' />
        <StackRow tone='#A1813F' label='② 分 DB · 同 schema' text='主從複製 · 讀寫實體分庫' />
        <StackRow tone='#5B7570' label='③ 分 DB · 異 schema' text='寫 PostgreSQL · 讀 Elasticsearch · 透過事件同步' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：直接跳到第 ③ 層。要先驗證 ② 已不夠用，才有資格上 ③。</Callout>
    </div>
    <Footer source='`CQRSReading.pdf` · §Evolution' />
  </div>
);


const P28: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 三大坑</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='CQRS 紅利' items={['讀端可極致優化', '寫端邏輯純粹', '多種讀模型並存', '讀寫獨立 scale']} />
        <TradeoffCol tone='#E8634F' title='CQRS 代價' items={['最終一致性必然', '兩套 model 維護', '事件同步 = 新故障點', '新人 onboarding 慢', '「剛寫完看不到」UX 問題']} />
      </div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：先簡單做（單一 model + cache），讀寫比真的失衡再上 CQRS。
<strong>不是先 CQRS 後優化</strong>——是先優化失敗才 CQRS。</Callout>
    </div>
    <Footer source='`CQRSReading.pdf` · §Cost-Benefit' />
  </div>
);


const P29: Page = () => (
  <SectionEnd title='CQRS 完' subtitle='三個進階模式串好，章末收斂。' next='Ch.8 Recap</span>' />
);


const P30: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 08 · RECAP' title='Advanced Patterns 收斂' subtitle='什麼時候**不要**用這三個模式' />
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DECISION TREE · 進階模式判斷</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   你的系統有以下情況嗎？
   ─────────────────

   團隊 > 30 人 + K8s 成熟? ────→ Microservices 值得考慮
        └→ 否 → 留在 Modular Monolith

   業務本質是「事件流」+ 合規要求軌跡? ──→ Event Sourcing 值得考慮
        └→ 否 → Outbox table 就夠

   讀寫比 > 100:1 + 多種 projection 需求? ──→ CQRS 值得考慮
        └→ 否 → 讀寫合一 + cache

   三個都 yes? → 5% 系統的奢侈組合`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 風格</strong>：每個進階模式都是「<strong>沒它解不了</strong>」才該用。</span></div>
    </div>
    <Footer source='整合 Ch.8 三個進階模式' />
  </div>
);


const P32: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第八章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['微服務 5 個前置條件', 'Modular Monolith 中間路', 'Event Sourcing 適用清單', 'CQRS 三層演進', '進階模式決策樹']} />
        <TradeoffCol tone='#E8634F' title='還沒回答的問題' items={['真實案例怎麼設計？　→ Ch.9', '外部約束怎麼處理？　→ Ch.9', '沒實權怎麼推動？　→ Ch.10']} />
      </div>
  </div>
);


const P33: Page = () => (
  <SectionEnd title='Ch.8 完' subtitle='進階武器到手，下一站做實戰。' next='Ch.9 Case Study</span>' />
);


export const meta: SlideMeta = { title: 'Ch.8 · 進階模式' };
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
