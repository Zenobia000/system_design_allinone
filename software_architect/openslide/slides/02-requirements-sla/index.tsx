import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_02_sla_math_01_nines_concept from './assets/02_sla_math_01_nines_concept.png';
import img_03_throughput_01_curves_concept from './assets/03_throughput_01_curves_concept.png';

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
  <ChapterDivider eyebrow='CHAPTER · 02 · OVERVIEW' title='Requirements & SLA' subtitle='把「很快」翻譯成「P99 < 100ms」' />
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
        <StackRow tone='#D97757' label='① 怎麼挖出客戶沒講的隱性需求？' text='' />
        <StackRow tone='#A1813F' label='② 99.99% 到底意味著什麼？' text='SLA 數學' />
        <StackRow tone='#5B7570' label='③ 吞吐量 vs 負載差在哪？' text='為黑五設計' />
        <StackRow tone='#5B9770' label='④ 哪些 NFR 必須在 Day 1 就量化？' text='' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.2 · `SA簡報/S3, S5.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 需求的兩層</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌─────────────────────────────────────────────┐
│  FUNCTIONAL      系統做什麼                 │  (顯性，PM 會講)
│                  user stories · features    │
├─────────────────────────────────────────────┤
│  NON-FUNCTIONAL  系統承受什麼               │  (隱性，要逼問)
│                  load · latency · uptime    │
│                  scale · cost · security    │
└─────────────────────────────────────────────┘
   架構失敗 90% 出在「下層沒挖清楚」`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：壞代碼是 bug，壞架構是「沒問 NFR 就先動工」。</span></div>
    </div>
    <Footer source='`S5_Slides.pdf` · §需求兩層模型' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先學怎麼挖出隱性需求。' next='2.1 Implicit Requirements</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 02 · TOPIC 01' title='Implicit Requirements' subtitle='挖出客戶沒講出口的需求' />
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何隱性需求最致命？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>功能需求</strong>寫在 PRD 裡。
<strong>非功能需求</strong>寫在「客訴信、半夜 PagerDuty、退費單」裡。

需求調研時不挖出來——上線後血流成河。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>客戶不會主動講「我需要 99.99% 可用性」</li>
          <li>客戶會講「系統有時候很慢」、「上次活動掛了」</li>
          <li><strong>架構師的職責</strong>：把模糊抱怨翻譯成可驗證數字</li>
        </ul>
    </div>
    <Footer source='`S3_Slides.pdf` · §需求調研常見坑' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 量化六問</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>模糊形容詞</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>逼問的問題</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>期望輸出</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「要很快」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>P50? P99? 同步還是異步？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>P99 &lt; 200ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「要穩定」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一年容忍幾分鐘停機？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.95% (260 min/year)</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「會有很多人用」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DAU? 尖峰 QPS? 成長率？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100k DAU · 5k QPS peak</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「資料很多」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>每日新增? 保留多久？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1GB/day · 5 年保留</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「要支援全球」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>哪些地區? 是否合規？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>NA/EU/APAC · GDPR</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「未來會擴展」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>6 個月後規模? 上限？</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10× 增長 · 1M DAU 上限</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：拒絕形容詞，要求數字 + 單位 + 時間範圍。</span></div>
    </div>
    <Footer source='`S5_Slides.pdf` · §NFR Quantification' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>給 Day 1 用的需求表</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · NFR 矩陣範本</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`| NFR 類別      | 量化指標           | 驗收方式             |
|--------------|-------------------|---------------------|
| Latency       | P99 < 200ms       | k6 load test        |
| Availability  | 99.95% / 月       | uptime monitor      |
| Throughput    | 5000 QPS peak     | stress test         |
| Data Scale    | 1B records · 3TB  | capacity planning   |
| Security      | OWASP top 10      | annual pen test     |
| Compliance    | GDPR · SOC2       | quarterly audit     |`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>把這張表貼進專案 README——<strong>架構決策的單一真實來源</strong>。</Callout>
    </div>
    <Footer source='`_source/02_Requirements_SLA.md` · §NFR Matrix' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 過度量化 vs 含糊不清</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='量化的好處' items={['選型有依據', '測試可驗證', 'SLA 可承諾', '成本可預估', '避免無止境優化']} />
        <TradeoffCol tone='#E8634F' title='過度量化的代價' items={['P99.9 / P99.99 砸錢沒人感謝', '過早決定 = 後期難改', 'MVP 階段不必精確', '數字錯比沒有更糟', '分析癱瘓延誤上線']} />
      </div>
      <Callout tone='#E8634F'><strong>經驗法則</strong>：MVP 階段量化「會殺死你」的 3 個指標（latency / availability / scale）就夠。其他留到 v1 之後。</Callout>
    </div>
    <Footer source='`S5_Slides.pdf` · §NFR 取捨' />
  </div>
);


const P12: Page = () => (
  <SectionEnd title='Implicit Requirements 完' subtitle='知道要問什麼了，下一站算數學。' next='2.2 SLA Math</span>' />
);


const P13: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 02 · TOPIC 02' title='SLA Math' subtitle='99.99% 不是行銷詞，是預算數字' />
);


const P14: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_sla_math_01_nines_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何 SLA 是數學問題？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>「我們承諾 99.99% 可用性」——
聽起來像 99.9% 多 0.1%，<strong>成本卻是 5-10 倍</strong>。

每多一個 9，預算指數成長。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>99% (兩個 9) → 一年容忍 87 小時停機</li>
          <li>99.99% (四個 9) → 一年容忍 52 分鐘</li>
          <li>跨過 3 個 9 → 必須上多 AZ + 自動 failover</li>
          <li>跨過 4 個 9 → 必須上多 region + 24/7 oncall</li>
        </ul>
    </div>
    <Footer source='`S5_Slides.pdf` · §SLA Cost Curve' />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 9 的對照表（必背）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Uptime</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一年停機</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一月停機</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一週停機</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>等級</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>90%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>36.5 天</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>73 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>16.8 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內部工具</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>3.65 天</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>7.3 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1.68 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>MVP / 小服務</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.9%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>8.76 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>43.8 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>10.1 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>標準 SaaS</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.95%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>4.38 hr</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>21.9 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>5.04 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>業界中段</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.99%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>52.6 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>4.38 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1.01 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>AWS / GCP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.999%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>5.26 min</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>26.3 s</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>6.05 s</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>電信 / 金融</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>面試金句</strong>：「99.9% 已能涵蓋 95% 系統」——上面那兩個 9 是真金白銀。</span></div>
    </div>
    <Footer source='`S5_Slides.pdf` · §Five Nines' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>鏈式系統的 availability 是相乘的</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 複合 SLA 計算</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ┌──── LB (99.99%) ──── API (99.95%) ──── DB (99.95%) ────┐
   │                                                          │
   └──────────────── Cache (99.9%) ──────────────────────────┘

   依賴鏈式：0.9999 × 0.9995 × 0.9995 = 0.9989  → 只有 99.89%
   並行容錯：1 - (1-A)(1-B) → 提升至 99.99%+`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>洞察</strong>：任一環節掛 → 整體掛。
要拉高 SLA，要嘛<strong>減少依賴鏈長度</strong>，要嘛<strong>加冗餘</strong>。</Callout>
    </div>
    <Footer source='`S5_Slides.pdf` · §Composite SLA' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 9 的成本</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`SLA 等級       架構需求                      相對成本
─────────────────────────────────────────────────
99%            單機 + 監控                   1×
99.9%          負載均衡 + 健康檢查           2×
99.95%         多 AZ + 自動 failover         5×
99.99%         多 region + 24/7 oncall      10×
99.999%        全冗餘 + chaos engineering   25×`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：對 stakeholder 承諾「five nines」前沒算過成本——預算炸鍋後產品就死了。</Callout>
    </div>
    <Footer source='`_source/02_Requirements_SLA.md` · §SLA Cost Analysis' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 該追哪個 9？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='追到 99.99%（金流 / 醫療 / 電信）' items={['單筆交易價值高', '監管要求', '1 分鐘停機 = 數萬美元損失', '客戶會走人']} />
        <TradeoffCol tone='#E8634F' title='停在 99.9%（SaaS / 內部工具）' items={['停機可接受', '客戶有重試機制', '夜間維護有窗口', '成本可控']} />
      </div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：先問 *Error Budget* —— 「如果這個月用完 8.76 小時 down time 還能再 down 嗎？」答案是「不能」才該往更高 9 推。</Callout>
    </div>
    <Footer source='`S5_Slides.pdf` · §Error Budget' />
  </div>
);


const P20: Page = () => (
  <SectionEnd title='SLA Math 完' subtitle='9 算清楚了，下一站處理極端流量。' next='2.3 Throughput vs Load</span>' />
);


const P21: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 02 · TOPIC 03' title='Throughput vs Load' subtitle='處理速度 vs 崩潰極限——為黑五設計' />
);


const P22: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_03_throughput_01_curves_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 兩個指標常被混為一談</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>Throughput</strong>（吞吐量）：穩態下每秒處理多少請求。
<strong>Load</strong>（負載）：系統開始降級之前能承受的上限。

吞吐 5k QPS ≠ 撐得住 5k QPS 持續一小時。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>廠商行銷數字通常是 <strong>burst throughput</strong>，不是 sustained</li>
          <li>真實上線：要看 <strong>P99 latency 不爆</strong> 的最大流量</li>
          <li>黑五 / 雙 11 = 平日 10–30 倍 → 必須<strong>事前壓測</strong></li>
        </ul>
    </div>
    <Footer source='`S5_Slides.pdf` · §Throughput vs Load' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三種流量曲線</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>曲線類型</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>特徵</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>設計重點</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>穩態</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>24 小時平均 ±20%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>容量規劃用 average + 50%</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>日週期</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>工作時間高、夜間低</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>LB + auto-scale，無需 over-provision</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>尖峰突發</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>黑五 / 廣告投放 / 病毒事件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>預先擴容 + 限流 + 降級</strong></div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：用過去 7 天平均 QPS 規劃容量——黑五當天 10× 流量打進來，系統雪崩。</Callout>
    </div>
    <Footer source='`_source/02_Requirements_SLA.md` · §Traffic Patterns' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 容量規劃公式</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   Peak QPS  =  DAU × 平均行為次數 / 86400  ×  Peak 倍率
   ─────────────────────────────────────────────────
   例：100k DAU × 30 次/天 / 86400 × 3 (peak)
       ≈ 100 QPS 平均 → 300 QPS peak

   容量目標 =  Peak × 2 (safety margin)
   ─────────────────────────────────────────────────
       300 QPS × 2 = 600 QPS 容量上限`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>面試金句</strong>：「我會規劃 2× peak 容量，超過用限流 + 排隊，極端情況降級非核心功能」。</Callout>
    </div>
    <Footer source='`S5_Slides.pdf` · §Capacity Planning' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 極端情況四個武器</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① Auto-Scaling' text='提前 10 分鐘擴容（不是即時）' />
        <StackRow tone='#A1813F' label='② Rate Limiting' text='token bucket · 防止單一 client 打爆' />
        <StackRow tone='#5B7570' label='③ Circuit Breaker' text='後端慢 → 快速失敗 · 避免級聯' />
        <StackRow tone='#5B9770' label='④ Graceful Degradation' text='流量爆 → 關推薦、關搜尋建議' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：不要假設流量會均勻——準備接受<strong>最壞情況</strong>的設計才能上線。</span></div>
    </div>
    <Footer source='`S5_Slides.pdf` · §Extreme Cases' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · Over-provisioning 該做多少？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='多備容量（safety margin 高）' items={['意外流量不雪崩', 'P99 穩定', '不必半夜起來擴容', '客戶體驗一致']} />
        <TradeoffCol tone='#E8634F' title='多備容量的代價' items={['常態 CPU 用量 < 20%', '雲端帳單翻倍', '資源閒置浪費', '需配合 auto-scale 降本']} />
      </div>
      <Callout tone='#D97757'><strong>業界做法</strong>：穩態 30–40% CPU 用量；peak 70–80%；超過 → auto-scale 介入。
這是「<strong>便宜又活得下來</strong>」的平衡點。</Callout>
    </div>
    <Footer source='`S5_Slides.pdf` · §Provisioning Best Practice' />
  </div>
);


const P28: Page = () => (
  <SectionEnd title='Throughput vs Load 完' subtitle='容量算清楚了，整章收斂。' next='Ch.2 Recap</span>' />
);


const P29: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 02 · RECAP' title='Requirements & SLA 收斂' subtitle='把 Ch.2 串成一張需求問卷' />
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>架構師的第一輪逼問</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CASE · 客戶說「我要做一個拍賣 App」</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 商業' text='怎麼賺錢？廣告？抽成？多少 GMV？' />
        <StackRow tone='#A1813F' label='② 規模' text='DAU? Peak 競標 QPS？單一物件競標人數上限？' />
        <StackRow tone='#5B7570' label='③ SLA' text='競標結束時間誤差容忍？stop bidding 必須準時？' />
        <StackRow tone='#5B9770' label='④ Extreme' text='熱門物件最後 10 秒流量會是平均 100×？' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>結論</strong>：拍賣系統 = high write contention + strict timing + spike tolerance。
這不是「再多寫一個 CRUD」——是個需要 Ch.5/Ch.7 的硬骨頭。</Callout>
    </div>
    <Footer source='整合 Ch.2 + 拍賣業務典型 NFR' />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第二章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['NFR 量化六問', '9 的對照表（必背）', '複合 SLA 計算法', '容量規劃公式', '極端情況四武器']} />
        <TradeoffCol tone='#E8634F' title='還沒回答的問題' items={['怎麼設計流程？　→ Ch.3', '選什麼技術？　→ Ch.4', '怎麼保證 scalability？　→ Ch.5', '實戰案例？　→ Ch.9']} />
      </div>
  </div>
);


const P32: Page = () => (
  <SectionEnd title='Ch.2 完' subtitle='量化能力到手，下一站學流程。' next='Ch.3 Process & App Types</span>' />
);


export const meta: SlideMeta = { title: 'Ch.2 · 需求與 SLA' };
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
