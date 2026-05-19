import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_02_cache_01_patterns_concept from './assets/02_cache_01_patterns_concept.png';
import img_03_logging_01_correlation_concept from './assets/03_logging_01_correlation_concept.png';

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
  <ChapterDivider eyebrow='CHAPTER · 07 · OVERVIEW' title='System Architecture' subtitle='從單體跨到分散式的三個關鍵決策' />
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
        <StackRow tone='#D97757' label='① 為何 Stateless 是分散式的入場券？' text='' />
        <StackRow tone='#A1813F' label='② Cache + Queue 怎麼擋住高並發？' text='' />
        <StackRow tone='#5B7570' label='③ 分散式 debug 的命脈：Correlation ID' text='' />
        <StackRow tone='#5B9770' label='④ 鬆耦合通訊：REST vs Queue 何時用哪個？' text='' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.7 · `SA簡報/S11.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 從單體到分散式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   單體 (Monolith)               分散式 (Distributed)
   ─────────────                ──────────────────
   一個 process                  N 個 process / region
   一份 memory                   多份 + 一致性問題
   call function                 call API / queue
   一份 log                      多份 + correlation ID
   一個事務                      分散事務 / Saga

   90% 系統不該主動拆 → 撐不住才拆`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：分散式系統是「<strong>萬不得已的解法</strong>」——能單體解決就單體。</span></div>
    </div>
    <Footer source='`S11_Slides.pdf` · §Monolith vs Distributed' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先學 Stateless。' next='7.1 Stateless</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 07 · TOPIC 01' title='Stateless' subtitle='分散式擴展的入場券' />
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 Stateless 是水平擴展前提？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Stateful Server</strong>：把使用者 session 存在 process memory。
加一台機器後使用者第二次請求被導到新機器 → session 沒了。

<strong>Stateless Server</strong>：state 全部外部化（DB / Redis）。
任何機器都能處理任何請求 → 想加幾台加幾台。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>Stateless = 機器間「等價」</li>
          <li>LB 隨便分配，使用者不感知</li>
          <li>機器掛掉？換一台就好（無狀態 = 無痛失效）</li>
        </ul>
    </div>
    <Footer source='`S11_Slides.pdf` · §Stateless Why' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 何謂「state」？必須外部化的清單</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① Session' text='登入狀態 · CSRF token → Redis' />
        <StackRow tone='#A1813F' label='② File upload state' text='大檔分片進度 → S3 multipart + DB' />
        <StackRow tone='#5B7570' label='③ WebSocket 連線' text='訂閱 channel 對應 → Redis pub/sub / external store' />
        <StackRow tone='#5B9770' label='④ Cache' text='process 內 cache 改為 distributed cache' />
        <StackRow tone='#5B9770' label='⑤ Rate limit counter' text='改 Redis sliding window' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：把 session 存在 application memory，然後上 LB——使用者每次登入失敗，但只有部分時候，超難 debug。</Callout>
    </div>
    <Footer source='`S11_Slides.pdf` · §State Externalization' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Stateless 設計檢核</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>檢核項</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>通過判準</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>砍掉一台機器，使用者體驗有差嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>沒差 ✓</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>加一台機器，需要部署特殊設定嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不需要 ✓</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>LB 用 round-robin 而非 sticky session？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可以 ✓</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>重啟一台機器，會丟失使用者資料嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>不會 ✓</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>兩台機器同時處理同一 user 請求 OK 嗎？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>OK ✓</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>5 條全 yes</strong> → 真 stateless。<strong>任何一條 no</strong> → 要修。</span></div>
    </div>
    <Footer source='`S11_Slides.pdf` · §Stateless Checklist' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · Stateless 的代價</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='Stateless 紅利' items={['水平擴展無痛', '機器故障無感', '滾動部署簡單', '多 AZ 容易']} />
        <TradeoffCol tone='#E8634F' title='Stateless 代價' items={['每個請求要外取 state（多 1 RTT）', 'Redis 變新 SPOF', '大檔上傳分片邏輯複雜', 'WebSocket 設計變難']} />
      </div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：Redis 撐起的 state 也要 HA（主從 + sentinel）。
別把 state 從 app 搬到 Redis 卻把 Redis 做成單點。</Callout>
    </div>
    <Footer source='`S11_Slides.pdf` · §Stateless Cost' />
  </div>
);


const P12: Page = () => (
  <SectionEnd title='Stateless 完' subtitle='入場券到手，下一站擋流量。' next='7.2 Cache + Queue</span>' />
);


const P13: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 07 · TOPIC 02' title='Cache + Queue' subtitle='擋住高並發的兩個王牌' />
);


const P14: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_cache_01_patterns_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何這兩件兵器必學？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Cache</strong> 擋掉 90% 讀請求 → 保護 DB。
<strong>Queue</strong> 把同步操作改異步 → 削峰 + 解耦。

99% 撐住高並發的系統，都靠這兩件武器組合拳。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>沒 cache 的系統：每個請求打 DB → 1000 QPS 就掛</li>
          <li>沒 queue 的系統：流量尖峰直接打爆下游</li>
          <li>兩者組合：撐起 10× 流量沒問題</li>
        </ul>
    </div>
    <Footer source='`S11_Slides.pdf` · §Cache + Queue Why' />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Cache 的四種模式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>模式</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>寫入時</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>讀取時</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Cache-aside</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用清 cache</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>先 cache miss → DB → 寫 cache</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>通用，最常見</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Read-through</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>應用清 cache</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>cache library 自己撈 DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀為主、cache 邏輯統一</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Write-through</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>同時寫 cache + DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>直接讀 cache</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一致性要求高</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Write-back</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫 cache → 異步寫 DB</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>直接讀 cache</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫密集、容忍丟失</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：用 Cassandra（AP）存帳戶餘額再放 Redis cache——兩層 eventually consistent 疊加，雙花災難。</Callout>
    </div>
    <Footer source='`S11_Slides.pdf` · §Cache Patterns' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Cache 三大災難 + 防禦</h2>
    <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ① Penetration（穿透）
      查詢不存在的 key → 每次都打 DB
      防：Bloom filter / 快取 null 值
   ─────────────────────────────────────
   ② Avalanche（雪崩）
      大量 key 同時過期 → 瞬間打爆 DB
      防：TTL 加 jitter / 多級 cache
   ─────────────────────────────────────
   ③ Stampede（熱點）
      單一熱點 key 過期 → 千個請求齊撲 DB
      防：single-flight / 永不過期 + 背景更新`}</pre>
    <Footer source='`S11_Slides.pdf` · §Cache Disasters' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Queue 的兩種角色</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 削峰（Buffer）' text='流量尖峰先進 queue · 後端按穩態消費' />
        <StackRow tone='#A1813F' label='② 解耦（Decouple）' text='服務 A 發訊息 · 服務 B 異步處理 · A 不等 B' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>訊息系統</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>強項</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>適用</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Kafka</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>高吞吐 · 可 replay · stream</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>事件流 · log pipeline</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>RabbitMQ</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>複雜路由 · ACK 控制</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>task queue · workflow</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SQS</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AWS 整合 · serverless</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>簡單異步 · 雲原生</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Redis Streams</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>低延遲 · 輕量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>即時通知 · 小規模</div>
        </div>
    </div>
    <Footer source='`S11_Slides.pdf` · §Queue Selection' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 同步 vs 異步何時切？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該用 Queue（異步）' items={['處理耗時 > 1 秒', '第三方 API 不穩定', '需要 retry / dedupe', '流量尖峰大', '不需即時回應']} />
        <TradeoffCol tone='#E8634F' title='該用 REST（同步）' items={['使用者等回應', '需要強一致', '簡單 CRUD', '規模還沒到', '需要立即錯誤回饋']} />
      </div>
      <Callout tone='#E8634F'><strong>反模式</strong>：MVP 階段就上 Kafka 處理 100 QPS 的訂單——維運成本 &gt; 系統價值。</Callout>
    </div>
    <Footer source='`S11_Slides.pdf` · §Sync vs Async' />
  </div>
);


const P20: Page = () => (
  <SectionEnd title='Cache + Queue 完' subtitle='兵器到手，下一站講可觀測性。' next='7.3 Logging & Monitoring</span>' />
);


const P21: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 07 · TOPIC 03' title='Logging & Monitoring' subtitle='分散式系統的 debug 救命線' />
);


const P22: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_logging_01_correlation_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何單體 print() 在分散式裡會死？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>單體：`print(error)` → 看終端 → 找到問題。
分散式：error 發生在 service C，但 user 是從 A → B → C 進來的。
<strong>沒有串聯，根本不知道 error 屬於哪個請求。</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>多 instance 的 log 是分散的</li>
          <li>沒 correlation ID = 無法追蹤</li>
          <li>沒 metric = 不知道系統健康</li>
          <li>沒 alert = 出事才知道</li>
        </ul>
    </div>
    <Footer source='`S11_Slides.pdf` · §Distributed Debug' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 觀測性三件套</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>內容</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>工具</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Logs</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>何時 / 誰 / 做了什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ELK · Loki · CloudWatch</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Metrics</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>數字趨勢 · QPS / latency / error rate</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Prometheus · Datadog</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Traces</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一個請求跨服務的時間線</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Jaeger · Tempo · X-Ray</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣</strong>：<strong>Log 告訴你發生什麼；Metric 告訴你健不健康；Trace 告訴你卡在哪</strong>。
三者缺一個就 debug 不全。</Callout>
    </div>
    <Footer source='`S11_Slides.pdf` · §Observability Triad' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · Correlation ID（救命的繩子）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   User 發請求 → API Gateway 生 correlation ID = abc123
                                       ↓
            ┌──────────┐    ┌──────────┐    ┌──────────┐
            │ Service A │ → │ Service B │ → │ Service C │
            └──────────┘    └──────────┘    └──────────┘
                 ↓               ↓               ↓
              log abc123      log abc123      log abc123

   出事時：grep abc123 → 一條 trace 完整顯示哪一步壞掉`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>鐵律</strong>：任何分散式系統的 log 第一個 column 必須是 correlation ID。</span></div>
    </div>
    <Footer source='`S11_Slides.pdf` · §Correlation ID' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 該追什麼 metric？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① Golden Signals' text='Latency · Traffic · Errors · Saturation' />
        <StackRow tone='#A1813F' label='② Per-endpoint' text='每個 API 的 P50/P99/error rate' />
        <StackRow tone='#5B7570' label='③ Per-dependency' text='DB / Redis / 外部 API 的健康狀態' />
        <StackRow tone='#5B9770' label='④ Business KPI' text='訂單成功率 / 結帳轉換 / 註冊轉換' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：監控 200 個 metric 但沒有 alert——出事仍然不知道。<strong>alert 才是真正的「監控」</strong>。</Callout>
    </div>
    <Footer source='`S11_Slides.pdf` · §What to Monitor' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 日誌完整 vs 成本</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該記' items={['所有 error + stacktrace', '關鍵業務事件（訂單成立 / 支付）', '外部 API 呼叫的 req/res', '權限敏感操作（登入 / 變更）']} />
        <TradeoffCol tone='#E8634F' title='不該記' items={['每個 200 OK 的 access log（用 metric）', '使用者密碼 / token', '個資（避免 GDPR 違規）', '大型 payload 全文']} />
      </div>
      <Callout tone='#D97757'><strong>洞察</strong>：日誌成本可能比運算還貴（每月 TB 級 ingestion）。
<strong>Sampling + 結構化日誌 + 分級保留</strong>是必修。</Callout>
    </div>
    <Footer source='`S11_Slides.pdf` · §Logging Cost' />
  </div>
);


const P28: Page = () => (
  <SectionEnd title='Logging & Monitoring 完' subtitle='三件套到手，章末收斂。' next='Ch.7 Recap</span>' />
);


const P29: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 07 · RECAP' title='System Architecture 收斂' subtitle='拍賣 App 的分散式設計藍圖' />
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE · 拍賣系統 100k DAU 架構</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ┌─────────┐   ┌─────────┐
   │ Mobile  │   │  Web    │
   └────┬────┘   └────┬────┘
        └────────┬────┘
                 ▼
         ┌─────────────┐         ┌────────┐
         │ API Gateway │ ───────│  CDN   │
         └──────┬──────┘         └────────┘
                ▼
    ┌────────── LB ──────────┐
    ▼          ▼          ▼
  [Bid svc] [Order svc] [User svc]    ← Stateless
    │          │          │
    └─────► Redis ◄───────┘            ← Session + Cache
                ▼
           PostgreSQL                  ← 主寫從讀
                ▲
          Kafka ─┘                     ← Bid 事件流`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>每個方塊都對應 Ch.7 的一個概念。<strong>架構 = 概念組裝。</strong></span></div>
    </div>
    <Footer source='整合 Ch.7 + 拍賣案例' />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第七章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['Stateless 設計檢核 5 條', 'Cache 四模式 + 三災難', 'Queue 同步異步取捨', '觀測性三件套', 'Correlation ID']} />
        <TradeoffCol tone='#E8634F' title='還沒回答的問題' items={['微服務何時值得？　→ Ch.8', 'Event Sourcing 何時用？　→ Ch.8', 'CQRS 解什麼問題？　→ Ch.8', '完整案例？　→ Ch.9']} />
      </div>
  </div>
);


const P32: Page = () => (
  <SectionEnd title='Ch.7 完' subtitle='分散式骨架完成，下一站講進階模式。' next='Ch.8 Advanced Patterns</span>' />
);


export const meta: SlideMeta = { title: 'Ch.7 · 系統架構' };
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
] satisfies Page[];
