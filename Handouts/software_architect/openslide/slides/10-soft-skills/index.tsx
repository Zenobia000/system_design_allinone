import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_00_mental_model_concept from './assets/00_mental_model_concept.png';
import img_02_audience_01_matrix_concept from './assets/02_audience_01_matrix_concept.png';

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
  <ChapterDivider eyebrow='CHAPTER · 10 · OVERVIEW' title='Soft Skills' subtitle='沒實權的職位，要靠專業說服' />
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
        <StackRow tone='#D97757' label='① 沒有下屬，怎麼推動決策？' text='' />
        <StackRow tone='#A1813F' label='② 對 CEO 講什麼、對工程師講什麼？' text='' />
        <StackRow tone='#5B7570' label='③ 公眾演講與技術評審怎麼準備？' text='' />
        <StackRow tone='#5B9770' label='④ 怎麼保持「不被淘汰」？' text='' />
      </div>
    </div>
    <Footer source='`_source/sa_ppt.md` Ch.10 · `SA簡報/S16, S3.pdf`' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>MENTAL MODEL · 架構師的權力模型</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   傳統 manager                架構師
   ────────────                ──────
   權力來源：職位               權力來源：專業 + 信任
   工具：命令                   工具：說服 + 範例
   失敗：員工離職               失敗：建議被無視

   架構師的「軟」實力 = 真正的硬功夫
   不練 → 技術再強都推不動`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：強的不是寫得多酷的代碼，是讓<strong>正確的代碼被寫出來</strong>。</span></div>
    </div>
    <Footer source='`S16_Slides.pdf` · §Influence Without Authority' />
  </div>
);


const P06: Page = () => (
  <SectionEnd title='Overview 完' subtitle='先學影響力。' next='10.1 Influence</span>' />
);


const P07: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 10 · TOPIC 01' title='Influence Without Authority' subtitle='沒實權也能讓事情發生' />
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何「靠命令」會失敗？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>架構師對開發者沒有人事權。
你說「用 Strategy pattern」——對方說「我覺得 if/else 簡單」。

<strong>強推</strong>：對方表面同意，回去寫他想寫的。
<strong>說服</strong>：對方理解 *why* 後自願選擇。

只有第二種能持續。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>命令是一次性的，說服是永久性的</li>
          <li>說服一次，建立信任——下次他主動來問你</li>
        </ul>
    </div>
    <Footer source='`S16_Slides.pdf` · §Authority vs Influence' />
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 五個影響力工具</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 數據' text='「上次類似決策後，error rate 升 30%」' />
        <StackRow tone='#A1813F' label='② 案例' text='「Netflix 當年也是這樣做，結果...」' />
        <StackRow tone='#5B7570' label='③ 同儕背書' text='「Senior X 也認同這個方向」' />
        <StackRow tone='#5B9770' label='④ 視覺化' text='一張圖勝過 10 頁文件' />
        <StackRow tone='#5B9770' label='⑤ 試點' text='「我們先在小範圍試 2 週」' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>經驗值</strong>：5 個工具同時用——一場架構評審成功率 80%。
單靠任一個——50%。</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §Influence Tools' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 反對意見處理流程</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   對方說：「我不同意」
   ──────────────────

   ① 先聽完，不打斷
   ② 重述對方論點（讓他知道你懂）
   ③ 找共識（我們都同意 X）
   ④ 指出差異（我們在 Y 上不同）
   ⑤ 數據 / 案例支持你的立場
   ⑥ 願意妥協（接受次優解總比僵持好）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：直接「你錯了」開頭——對方關起耳朵，後面說什麼都沒用。</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §Disagreement Handling' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 建立長期信任的三件事</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>行為</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>效果</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>承認自己不會 / 錯了</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>信任 +1（誰都會錯，承認的人少）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>推薦其他人的方案</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>信任 +2（你不是只賣自己的）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跟進承諾</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>信任 +3（說了就做）</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>架構師的信任資產</strong>是 1–3 年累積的。
一次失信 → 砍掉 6 個月。</span></div>
    </div>
    <Footer source='`S16_Slides.pdf` · §Trust Building' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 該堅持還是讓步？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該堅持' items={['資料模型決策', '安全與合規', '核心 API 契約', '會造成資料遺失的決策', '不可逆的決策']} />
        <TradeoffCol tone='#E8634F' title='該讓步' items={['命名風格', '內部實作細節', '非關鍵性能優化', '程式碼風格小爭議', '對方更熟的領域']} />
      </div>
      <Callout tone='#D97757'><strong>Linus 風格</strong>：每場戰爭都打，會被討厭。
<strong>選 20% 真正重要的戰場去贏</strong>——剩下 80% 讓對方贏。</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §Choose Your Battles' />
  </div>
);


const P13: Page = () => (
  <SectionEnd title='Influence 完' subtitle='說服力到手，下一站講受眾。' next='10.2 Audience-Tuned Communication</span>' />
);


const P14: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 10 · TOPIC 02' title='Audience-Tuned Communication' subtitle='對 CEO 講 ROI，對工程師講 trade-off' />
);


const P15: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_02_audience_01_matrix_concept} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何同一份技術決策，要講三種版本？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>CEO 不在乎 PostgreSQL 是 ACID 還是 BASE。
工程師不在乎 ROI 12% 還是 25%。
PM 在乎使用者體驗變好還是變差。

<strong>用對方的語言講對方關心的事</strong>——是架構師的基本功。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>一份決策 → 三種「翻譯」</li>
          <li>沒翻譯 → 對方聽不懂 → 通不過</li>
        </ul>
    </div>
    <Footer source='`S16_Slides.pdf` · §Multi-audience' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 四種角色的關注點</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>對象</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>關心</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>你該講</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>例子</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>CEO / CTO</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ROI · 風險 · TTM</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>商業案例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「降低成本 30%、上市快 2 個月」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>PM / 產品</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>使用者體驗 · 交付節奏</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>feature 影響</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「加 cache 後頁面快 3×，轉換率提升」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Dev</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>模式 · trade-off · 工作量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>技術細節</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「Strategy + DI，減少 50% if/else」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Ops / QA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>部署 · 監控 · SLA</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>維運衝擊</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「新增 Redis HA，需 SOP 更新」</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>同一張投影片給四種人看 = 失敗 = 90% 機率</strong>。準備 3 版略不同的講解。</span></div>
    </div>
    <Footer source='`S16_Slides.pdf` · §Audience Matrix' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 三層金字塔結構</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   ┌─────────────────────────────┐
   │  TOP: 結論一句話              │  ← CEO 只看這層
   │  「上 PostgreSQL，6 個月內」  │
   ├─────────────────────────────┤
   │  MID: 3 個支撐論點            │  ← PM 看到這層
   │  ① 招人易 ② 成本可控 ③ 風險低 │
   ├─────────────────────────────┤
   │  BOTTOM: 資料 / 細節          │  ← 工程師看完整
   │  ADR + benchmark + 對比     │
   └─────────────────────────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>McKinsey 金字塔原則</strong>——結論在上，細節在下。閱讀者可在任一層停下。</span></div>
    </div>
    <Footer source='`S16_Slides.pdf` · §Pyramid Principle' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 技術評審 SOP</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 文件先發' text='評審前 2 天寄出 · 讓參與者有時間讀' />
        <StackRow tone='#A1813F' label='② 30 分鐘原則' text='簡報 < 15 min · 留 15 min 討論' />
        <StackRow tone='#5B7570' label='③ 預設反對方' text='想 3 個最常被質疑的問題 · 準備答案' />
        <StackRow tone='#5B9770' label='④ 結尾要有 next step' text='不是「通過」就是「下一輪」 · 不留空白' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：1 小時簡報 + 5 分鐘 Q&amp;A。對方根本沒時間反饋——評審變成獨白。</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §Review SOP' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 簡化 vs 失真</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該簡化' items={['對 CEO 講細節', '對非技術人解釋架構', '第一次溝通的範圍', '趕時間的決策']} />
        <TradeoffCol tone='#E8634F' title='不該簡化' items={['對 Dev 講實作', '關鍵 trade-off', '有合規 / 安全衝擊', '長期影響的決策']} />
      </div>
      <Callout tone='#D97757'><strong>Albert Einstein</strong>: 「Make things as simple as possible, but no simpler.」
<strong>過度簡化</strong> → 失真 → 後來被罵「你說的不是這樣！」</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §Simplify Right' />
  </div>
);


const P21: Page = () => (
  <SectionEnd title='Audience-Tuned 完' subtitle='溝通框架到手，下一站講持續成長。' next='10.3 Continuous Learning</span>' />
);


const P22: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 10 · TOPIC 03' title='Continuous Learning' subtitle='Keep Calm and Adapt or Die' />
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>WHY · 為何架構師最怕「停下來」？</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>5 年前主流：Monolith + jQuery
3 年前主流：Microservices + React
今天主流：Modular monolith + Edge + AI

<strong>技術換得快，「對的判斷」變得更難</strong>——
5 年前對的，今天可能是反模式。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>不持續學 → 用昨天的劍打今天的戰</li>
          <li>AI 工具更新極快 → 不跟上會被取代</li>
          <li>但<strong>不能追每個新東西</strong>——要會「篩選」</li>
        </ul>
    </div>
    <Footer source='`S16_Slides.pdf` · §Adapt or Die' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 學習資源金字塔</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`              ┌─────────────────┐
              │ 動手做 (10%)    │  POC · side project
              ├─────────────────┤
              │ 教別人 (15%)    │  conf talk · blog · mentor
              ├─────────────────┤
              │ 跟人聊 (25%)    │  社群 · 內部 chat
              ├─────────────────┤
              │ 讀深度文 (50%)  │  paper · engineering blog · book
              └─────────────────┘

   反金字塔：90% 看影片刷推 = 學了個寂寞`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>Linus 哲學</strong>：跟著 Linux kernel mailing list 看了 5 年——勝過 5 年看抖音科技 KOL。</span></div>
    </div>
    <Footer source='`S16_Slides.pdf` · §Learning Pyramid' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · 篩選框架（不追每個新技術）</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① 它解決真痛點嗎？' text='還是包裝舊問題' />
        <StackRow tone='#A1813F' label='② 是 Linus / Andy Hertzfeld 級別的人推嗎？' text='信號 vs 噪音' />
        <StackRow tone='#5B7570' label='③ 大廠 production 用了嗎？' text='還是只有 demo' />
        <StackRow tone='#5B9770' label='④ 3 年前的同類產品還活著嗎？' text='' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>經驗法則</strong>：4 個 yes → 值得學。
3 個 yes → 觀察 6 個月。
&lt; 3 → 忽略。</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §Tech Filter' />
  </div>
);


const P26: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>HOW · AI 時代的個人優化</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>工具</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>怎麼用</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>收益</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Claude / GPT</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫 ADR / 評估方案</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>設計疊代 3-5× 快</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Copilot</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>boilerplate code</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫測試 / DTO 快 5×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>LangGraph / Agents</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自動 RFC / risk audit</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自動化技術評審初稿</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Notebook LM</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>啃 paper / RFC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀文獻 2× 快</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>反模式</strong>：把 AI 當「答案機」——它說什麼就信。
<strong>對的用法</strong>：當 brainstorm 夥伴，你做最終判斷。</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §AI as Co-Pilot' />
  </div>
);


const P27: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TRADE-OFF · 深度 vs 廣度</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='該深度' items={['1-2 個核心領域（DB / 分散式 / AI）', '讀 paper、看 source code', '每年寫一篇深度技術文章', '能在 conf 上講 advanced 主題']} />
        <TradeoffCol tone='#E8634F' title='該廣度' items={['所有主流技術概念認得', '能判斷新技術值不值得花時間', '跨領域對話流暢', '看得懂團隊其他人在做什麼']} />
      </div>
      <Callout tone='#D97757'><strong>π 型人才</strong>：兩個深度 + 一個寬廣面。
<strong>架構師都是 π 型</strong>——只有 T 型，會被淘汰。</Callout>
    </div>
    <Footer source='`S16_Slides.pdf` · §π-shaped' />
  </div>
);


const P28: Page = () => (
  <SectionEnd title='Continuous Learning 完' subtitle='軟實力三件套到手，全書收斂。' next='Ch.10 Recap</span>' />
);


const P29: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 10 · RECAP' title='Soft Skills 收斂' subtitle='把 10 章串成一個架構師的職涯路徑' />
);


const P30: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROADMAP · 從新手到資深架構師</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>級別</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>0-2 年</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>2-5 年</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>5-10 年</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>10+ 年</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>技術</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>學會 Ch.1-7 基礎</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>熟練 Ch.8 進階</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨多種架構風格</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>引領技術方向</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>溝通</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對工程師講清楚</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對 PM 講商業</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對 CEO 講 ROI</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對外講思想</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>影響力</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>個人 PR review</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一個 team</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨 team / 部門</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨公司 / 業界</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>產出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>code + doc</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>ADR + RFC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>技術戰略</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>標準 + paper</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>學習</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>主修 1 個棧</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>副修 2 個棧</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨領域整合</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>帶下一代</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>路徑沒有捷徑</strong>——每個級別約 3–5 年。技術可以快，<strong>判斷力</strong>急不來。</span></div>
    </div>
    <Footer source='整合 Ch.10 + 業界資深架構師生涯模型' />
  </div>
);


const P31: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 第十章帶走的東西</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='新的工具' items={['5 個影響力工具', '4 角色溝通對照表', '金字塔結構', '學習資源金字塔', '新技術篩選框架']} />
        <TradeoffCol tone='#E8634F' title='進階方向' items={['看更多大型架構案例', '實作完整 design doc', '參加架構社群 / conf', '培養 mentee', '寫公開技術文']} />
      </div>
  </div>
);


const P32: Page = () => (
  <SectionEnd title='Ch.10 完' subtitle='全書收斂，下一站附錄。' next='90 Appendix</span>' />
);


export const meta: SlideMeta = { title: 'Ch.10 · 軟技能' };
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
