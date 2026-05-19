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
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
    <Kicker>A Course for Architects · 七章 × 三十四主題</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 100, fontWeight: 800, lineHeight: 1.08, margin: '32px 0 16px' }}>系統設計實戰</h1>
    <h2 style={{ fontSize: 48, fontWeight: 500, fontStyle: 'italic', color: muted, margin: '0 0 36px' }}>從基礎到架構，把每個 trade-off 看清楚</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ fontSize: 30, fontWeight: 500 }}>給寫過幾年 code、想往架構師走的工程師。</span>
<span style={{ fontSize: 30, fontWeight: 500 }}>不背名詞，學決策。</span></div>
      <div style={{ fontSize: 18, color: subtle, fontStyle: 'italic', marginTop: 8 }}>7 chapters · 130+ slides · open materials</div>
    </div>
  </div>
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
    <Kicker>Why this course</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 100, fontWeight: 800, lineHeight: 1.08, margin: '32px 0 16px' }}>系統設計不是名詞背誦</h1>
    <h2 style={{ fontSize: 48, fontWeight: 500, fontStyle: 'italic', color: muted, margin: '0 0 36px' }}>是在約束下做選擇</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>每一張 slide 的真正主題只有一句：

<strong>這個技術解決什麼問題？代價是什麼？什麼時候不該用？</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ fontSize: 30, fontWeight: 500 }}>如果你能回答這三個問題，你就是架構師。</span></div>
    </div>
    <Footer source={'課程設計理念 · 整理自 34 份系統設計實戰教材'} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
    <Kicker>How to read this deck</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 100, fontWeight: 800, lineHeight: 1.08, margin: '32px 0 16px' }}>三個閱讀路徑</h1>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'路徑 A · 線性'} text={'Ch.1 → Ch.7　完整三十四主題　約 8 小時自學'} />
        <StackRow tone='#A1813F' label={'路徑 B · 主題'} text={'直接挑章節　搭配 PDF 教材深讀'} />
        <StackRow tone='#5B7570' label={'路徑 C · 面試'} text={'只看附錄速查表 + 三個 capstone case'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>下一頁：完整七章地圖 →</span></div>
    </div>
  </div>
);


const P04: Page = () => (
  <ChapterDivider eyebrow={'PROLOGUE · 00'} title={'學習地圖'} subtitle={'Seven chapters, one staircase.'} />
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROADMAP · 七章一張圖</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`┌────────────────────────────────────────────────────────────┐
│  Ch.1  Foundation Layer        · Net / C-S / Scale / API    │
│        ↓                                                    │
│  Ch.2  Data Fundamentals       · CAP / Index / Tx / Numbers │
│        ↓                                                    │
│  Ch.3  Data Distribution       · Shard / Replicate / Cache  │
│        ↓                                                    │
│  Ch.4  Infrastructure          · DB / Blob / GW / LB / K8s  │
│        ↓                                                    │
│  Ch.5  Reliability & Ops       · Lock / Limit / Retry / O11y│
│        ↓                                                    │
│  Ch.6  Scaling Patterns        · Reads / Writes / Cache/CDN │
│        ↓                                                    │
│  Ch.7  Advanced Patterns       · Queue / Stream / Search /  │
│                                  Pipeline / RAG             │
└────────────────────────────────────────────────────────────┘`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>每章只依賴前章。可單跳，也可一路往下。</span></div>
    </div>
    <Footer source={'重組自 系統設計實戰/{基本觀念,常用技術,維運與可靠性,設計模式}'} />
  </div>
);


const P06: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DEPENDENCY · 為何是這個順序</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'由內而外'} items={['先理解 <strong>物理常數</strong>（網路、磁碟、CPU）', '再學 <strong>資料機制</strong>（CAP / Index）', '最後談 <strong>大規模工程</strong>（Scale / Pattern）']} />
        <TradeoffCol tone='#E8634F' title={'避開常見錯誤'} items={['不從 K8s 開始（會錯過 stateless 設計動機）', '不從 Microservice 開始（會錯過 CAP 約束）', '不從 RAG 開始（會錯過 retrieval 系統的本質）']} />
      </div>
    <Footer source={'課程設計原則 · 「把約束搞清楚再選工具」'} />
  </div>
);


const P07: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CAPABILITY LADDER · 能力分級</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Level</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>描述</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>對應章節</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>典型場景</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>L1</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>看得懂技術名詞</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Ch.1 + Ch.2</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>讀懂團隊架構文件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>L2</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>能畫出基本架構圖</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>+ Ch.3 + Ch.4</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>通過初級面試</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>L3</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>能落地實作中型系統</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>+ Ch.5</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>帶領 3-5 人小組</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>L4</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>能 review 別人的設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>+ Ch.6</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨團隊 architect 角色</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>L5</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>能設計新 pattern</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>+ Ch.7 + Capstone</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Staff / Principal Engineer</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>這份課程目標：把你從 L1 帶到 L4 的入口。</span></div>
    </div>
  </div>
);


const P08: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>AUDIENCE · 適用 / 不適用</h2>
    <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'適合'} items={['寫過 2 年以上後端的工程師', '準備系統設計面試的 mid-level', '想從 senior 走向 staff 的人', '想看 trade-off 而非教條的人']} />
        <TradeoffCol tone='#E8634F' title={'不適合'} items={['完全沒寫過後端的新手', '只想要「最佳實踐」的人', '找特定 framework 教學的人', '找 cloud provider 認證的人']} />
      </div>
  </div>
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>PACE · 學習節奏建議</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'密集模式'} text={'1 週 / 章　每天晚上 1 小時　共 7 週'} />
        <StackRow tone='#A1813F' label={'週末模式'} text={'2 週 / 章　每週六上午 2 小時　共 14 週'} />
        <StackRow tone='#5B7570' label={'面試衝刺'} text={'3 天　 Ch.1 + Ch.2 + 附錄速查表 + capstone'} />
        <StackRow tone='#5B9770' label={'團隊讀書會'} text={'1 章 / 場　 90 分鐘 +討論　共 7 場'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>每章看完別急著下一章。<strong>先把該章的決策樹畫一次</strong>——能在白紙上重畫，才算學會。</Callout>
    </div>
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>下一份檔案</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>02 · 如何使用這份簡報</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NEXT · 接下來</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>## *3 種閱讀方式 + 術語表 + 圖示說明*</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ fontSize: 30, fontWeight: 500 }}>讀完接著進 03 心智模型，再正式進入 Ch.1。</span></div>
    </div>
  </div>
);


const P11: Page = () => (
  <ChapterDivider eyebrow={'PROLOGUE · 02'} title={'如何使用這份簡報'} subtitle={'Symbols, sources, and reading rhythm.'} />
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SYMBOLS · 視覺符號約定</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'綠框'} items={[]} />
        <TradeoffCol tone='#E8634F' title={'紅框'} items={[]} />
      </div>
      <Callout tone='#D97757'><strong>橙底框</strong>　·　核心觀念 / 關鍵決策</Callout>
      <Callout tone='#E8634F'>警告框　·　常見的錯誤假設或反模式</Callout>
      <Callout tone='#8B6F47'><strong style={{ color: 'var(--osd-accent)', display: 'block', marginBottom: 6 }}>定義框</strong>
專有名詞首次出現時用此格式說明，附中英對照</Callout>
    </div>
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CITATION · 來源引用</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>每張 slide 底部都會標註 PDF 來源：</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>為何要標</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>想深挖某主題時可直接回查原始 PDF</li>
          <li>課程未來更新教材時可追溯依賴</li>
          <li>學員自學時知道完整版去哪找</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>所有 PDF 都在 `/系統設計實戰/` 資料夾，34 份共 4 大類。</span></div>
    </div>
    <Footer source={'基本觀念/10 Sharding.pdf · §3'} />
  </div>
);


const P14: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>SLIDE STRUCTURE · 每張 slide 的節奏</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>每個主題（如 Sharding、Replication）通常用 <strong>3 張 slide</strong> 講完：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① Why'} text={'為何需要這個技術 / 解決什麼具體問題'} />
        <StackRow tone='#A1813F' label={'② How'} text={'核心機制 / 實作要點 / 一張示意圖'} />
        <StackRow tone='#5B7570' label={'③ Trade-off'} text={'得到什麼 vs 失去什麼 / 何時不該用'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>讀法建議</strong>：先看 Why 與 Trade-off，最後才看 How。  
這樣能先建立「這東西在哪」的座標感，再學機制細節。</Callout>
    </div>
  </div>
);


const P15: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>TERMS · 常見術語雙語表</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>中文</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>English</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>縮寫</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一致性 / 可用性 / 分區容忍</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Consistency / Availability / Partition Tolerance</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CAP</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>線性一致性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Linearizability</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>—</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>最終一致性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Eventual Consistency</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>EC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>服務層級目標 / 指標 / 協議</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Service Level Objective / Indicator / Agreement</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SLO/SLI/SLA</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫入放大</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Write Amplification</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>WA</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>變更資料擷取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Change Data Capture</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CDC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內容傳遞網路</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Content Delivery Network</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CDN</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>檢索增強生成</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Retrieval-Augmented Generation</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>RAG</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>完整術語表見 90-appendix/01_review_cheatsheet.md。</span></div>
    </div>
  </div>
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>下一份檔案</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>03 · 心智模型</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NEXT · 接下來</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>## *系統設計只有 4 個維度：C / A / L / Cost*</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ fontSize: 30, fontWeight: 500 }}>這 4 個維度貫穿全書。Ch.1 開始後，每個技術選型都會回到它們。</span></div>
    </div>
  </div>
);


const P17: Page = () => (
  <ChapterDivider eyebrow={'PROLOGUE · 03'} title={'系統設計的心智模型'} subtitle={'Four dimensions you can never escape.'} />
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>THE FOUR · 四個你逃不掉的維度</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Consistency</strong>
    所有節點同時看到一致的資料？</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Availability</strong>
    任何時候都能讀寫？</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Latency</strong>
    回應時間夠短？</div>
        <div style={{ padding: '20px 24px', background: 'rgba(217,119,87,0.08)', borderRadius: 8, fontSize: 22, lineHeight: 1.5 }}><strong>Cost</strong>
    硬體 / 維運 / 開發成本？</div>
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>沒有「全選」</strong>　·　每個系統設計決策都在這 4 個維度上做取捨。</Callout>
    </div>
    <Footer source={'CAP 經典 + PACELC 補強 · 整理自 基本觀念/03 CAP Theorem.pdf'} />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>EXAMPLE · 同一需求，三種選擇</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>需求</strong>：使用者按讚一篇文章，全球可見</div>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title={'方案 A · 強一致'} items={['全球單一資料庫（Spanner）', 'C ✓ A ✓ L ✗ Cost ✗✗', '<em>適合：金流</em>']} />
        <TradeoffCol tone='#E8634F' title={'方案 C · 最終一致'} items={['多區域複製（Cassandra）', 'C ✗ A ✓ L ✓ Cost ✓', '<em>適合：社群按讚</em>']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>同一個「按讚」功能，給 Stripe 用和給 Twitter 用，<strong>架構應該不一樣</strong>。</span></div>
    </div>
    <Footer source={'整理自 基本觀念/03 + 11 Replication.pdf'} />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>DECISION · 三個必問的問題</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label={'① 業務能容忍多久的不一致？'} text={'5ms / 5s / 5min？'} />
        <StackRow tone='#A1813F' label={'② 寫入失敗時要回 503 還是先暫存？'} text={'銀行 vs 留言板'} />
        <StackRow tone='#5B7570' label={'③ 99% 的請求要在多少 ms 內完成？'} text={'P99 / P999'} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>回答這三題之後，技術選型就剩下 <strong>2-3 個合理選項</strong>。  
剩下的就是團隊熟悉度與成本。</Callout>
    </div>
    <Footer source={'整理自 維運與可靠性/04 Observability.pdf · SLO 章節'} />
  </div>
);


const P21: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>NUMBERS · 一些你該記住的數字</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>操作</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>大致時間</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>比例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>L1 cache 讀取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>0.5 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Main memory 讀取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100 ns</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>200×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SSD 隨機讀取</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>100 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>200,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>同 datacenter 來回</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>500 μs</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>1,000,000×</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跨美洲網路來回</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>150 ms</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>300,000,000×</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>記住數量級就好。<strong>「跨網路慢」比「跨網路慢 N 倍」更重要</strong>。</span></div>
    </div>
    <Footer source={'基本觀念/12 Numbers to Know.pdf · 完整版見 Ch.2'} />
  </div>
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 心智模型總結</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>&lt;span class="big-number"&gt;4&lt;/span&gt;</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>Consistency · Availability · Latency · Cost</strong></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>接下來七章每個技術選型，都會回到這四個維度。  
你看到 trade-off 表時，問自己：<strong>「這選項在 C/A/L/Cost 上各打幾分？」</strong></Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ fontSize: 30, fontWeight: 500 }}>準備好了 → 進入 Ch.1 Foundation Layer。</span></div>
    </div>
  </div>
);


export const meta: SlideMeta = { title: 'Prologue · 系統設計實戰' };
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
] satisfies Page[];
