import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_01_requirement_funnel from './assets/01_requirement_funnel.png';

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
  <ChapterDivider eyebrow='CHAPTER · 02 · OVERVIEW' title='PM' subtitle='建案企劃·決定要蓋什麼樓、賣給誰' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>METAPHOR ANCHOR</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PM = 建案企劃 / 開發 PM</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 蓋房子對應</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='PM ← 你在這' text='建案企劃——代理甲方做產品決策' />
        <StackRow tone='#A1813F' label='' text='UX/UI　 室內設計師——客人怎麼逛才不迷路' />
        <StackRow tone='#5B7570' label='' text='SA / Architect / SD　 建築師 / 結構技師 / 施工圖' />
        <StackRow tone='#5B9770' label='' text='Dev / QA / DevOps　 工班 / 驗收 / 物業' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>一句話</strong>：把商業問題翻譯成工程團隊能執行的需求。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 視角' />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>COMMON MISCONCEPTION</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PM 不是甲方·是甲方的代理人</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>CLARIFY · PM ≠ 甲方</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#E8634F'><strong>新手最常搞混</strong>：以為 PM = 客戶 / 業務 / 老闆。
<strong>真相</strong>：那些是<strong>真正的甲方</strong>——在團隊外面。
PM 是<strong>團隊內的建案企劃</strong>，代理甲方做產品決策。</Callout>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   業務 / 客戶 / 老闆（真甲方）── 「我想賺錢 / 解決 X 問題」
              │
              ▼
   PM（建案企劃 · 你）─── 「給誰、做什麼、KPI、優先級」
              │
              ▼
   UX / SA / Architect ...（執行團隊）`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>對應建築業</strong>：甲方說「我要在這蓋一棟賺錢的樓」，建案企劃決定「蓋給年輕家庭的 30 坪三房」。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 為何不只是「開會的人」' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>真實 PM 一天大概在幹嘛</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 一天時間分配</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   開會 / 同步           ████████████  40%
   寫 PRD / 規格         ██████        20%
   訪談用戶 / 看數據     █████         15%
   優先級排序            ████          12%
   跟業務 / 老闆談       ███           8%
   思考 / 競品研究       ██            5%`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反差</strong>：完全不寫 code，但寫的文件 / 開的會直接決定整個團隊往哪走。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 工作流程' />
  </div>
);


const P06: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>看完 Ch.2 你能回答</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① PM 到底做什麼？' text='真的是「需求壓縮器」嗎？' />
        <StackRow tone='#A1813F' label='② 客戶說的為什麼不是真需求？' text='「我要做 AI」背後是什麼' />
        <StackRow tone='#5B7570' label='③ PM 的經典產出有哪些？' text='PRD / User Flow / Backlog' />
        <StackRow tone='#5B9770' label='④ PM vs BA / PO / 老闆 怎麼分？' text='邊界在哪' />
      </div>
    <Footer source='_source/braindump.md · §PM 最重要的能力' />
  </div>
);


const P07: Page = () => (
  <SectionEnd title='Overview 完' subtitle='看完角色，看具體產出。' next='2.1 PM 經典產出</span>' />
);


const P08: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 02 · TOPIC 01' title='PM 經典產出' subtitle='壓縮真實需求·寫進文件' />
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · INSIGHT</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>客戶說的永遠不是需求</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 真需求 vs 假需求</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>客戶說：「我想做 AI」「我要像 Uber」「我想做會員系統」
<strong>——這都不是需求。</strong>

PM 的工作是<strong>壓縮</strong>：把客戶的話往下挖，
直到找到「<strong>降低客服成本</strong>」「<strong>提升轉單率</strong>」「<strong>提升留存率</strong>」這種真的可衡量的目標。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：PM 是「需求壓縮器」，不是「客戶傳聲筒」。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 為何不只是「開會的人」' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_requirement_funnel} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 5 個經典產出</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>產出</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話用途</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>看起來像什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>PRD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>產品需求文件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Confluence / Notion 幾十頁</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>User Flow</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>使用者操作路徑</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>流程圖（含主流程 / 子流程 / 例外）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Backlog</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>待辦事項池</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Jira: Epic → Story → Task</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Persona</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>目標用戶輪廓</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一張 1 頁人物卡</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Roadmap</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>時程與優先級</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>甘特圖 / 季度路線圖</div>
        </div>
    <Footer source='_source/braindump.md · §PM 工作流程' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PRD: 會員忘記密碼功能</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · PRD 長什麼樣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`

## 目標
- 降低客服「忘記密碼」工單量 40%
- KPI: 每月人工重設次數 < 100

## User Story
身為已註冊用戶, 我想透過 email 重設密碼,
這樣就不用打給客服。

## 需求
- 輸入 email → 寄送重設連結（10 分鐘有效）
- 連結點開 → 設定新密碼（至少 8 字元）
- 重設後 → 自動登入

## 例外
- email 不存在: 仍顯示「已寄出」（防探測）
- 連結過期: 顯示重新申請按鈕`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>注意 PRD 不只寫<strong>正常路徑</strong>，還要寫<strong>例外</strong>——這是新手 PM 最容易漏的。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 工作流程' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 為何 AI 取代不了</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>AI 寫得出 PRD，但寫不出</strong>：

- 哪個 feature 真的解客戶痛點？
- 三個 feature 只能挑一個，挑哪個？
- 老闆說做 A、用戶說要 B、技術說做 C，怎辦？</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>判斷力</strong>：選擇的代價是另一個選擇</li>
          <li><strong>政治力</strong>：說服老闆、業務、工程協同</li>
          <li><strong>同理心</strong>：看穿用戶嘴上 vs 心裡的差距</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>AI 是 PM 的助手，不是替代——它幫你<strong>寫</strong>得快，不幫你<strong>決定</strong>該寫什麼。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='Outputs 完' subtitle='產出講完，看 PM 跟誰打交道。' next='2.2 PM 邊界</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 02 · TOPIC 02' title='PM 邊界' subtitle='跟哪些人打交道·誰主導什麼' />
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHO</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>PM 上下游關係</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 上下游</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`       老闆 / 業務 / 客戶
              │
              ▼
        ┌──────────┐
        │    PM    │ ← 你在這
        └──────────┘
              │
        ┌─────┼─────┬─────┐
        ▼     ▼     ▼     ▼
       UX    SA    Dev   QA`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>PM 上游</strong>：商業需求源頭。<strong>下游</strong>：所有交付角色。PM 是<strong>整個團隊的翻譯中樞</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §責任鏈' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 容易搞混的角色</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>角色</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>跟 PM 差在哪</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>BA</strong>（Business Analyst）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>偏需求分析，PM 偏產品策略；中小公司常合併</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>PO</strong>（Product Owner, Scrum）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>偏 Backlog 排序，PM 偏整體產品；大公司分開</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Project Manager</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>偏專案管理（時程預算），PM 偏產品（價值方向）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>老闆 / 業務</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>提需求源頭，PM 把它翻譯成可執行的東西</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統規則細節，PM 不碰；PM 提需求給 SA</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心</strong>：PM = 產品經理（<strong>Product</strong> Manager），不是 <strong>Project</strong> Manager。中文常翻成「產品經理」反而比英文清楚。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 視角' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>決策樹</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 誰主導什麼</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='PM 主導' items={['做不做某 feature', '優先級排序', 'MVP 範圍', '商業 KPI 定義', '跟業務 / 老闆對齊']} />
        <TradeoffCol tone='#E8634F' title='PM 不主導（但要懂）' items={['技術選型（Architect）', 'UI 細節（UX/UI）', '業務規則邊界（SA）', '資料庫 schema（DBA）', '部署策略（DevOps）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>陷阱</strong>：PM 不該指定「用 React」「用 PostgreSQL」——那是 Architect 的事，PM 越界會弄壞團隊信任。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 最重要的能力' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 實務場景</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>場景</strong>：業務說「客戶想要即時通知」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>新手 PM 會這樣回</strong>：「好，下個月做。」
→ 沒問<strong>為什麼即時</strong>、<strong>多即時才算即時</strong>、<strong>ROI 多少</strong>。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>成熟 PM 會這樣回</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>為什麼即時？→ 業務說：客戶抱怨晚了 5 分鐘</li>
          <li>那 1 分鐘可以嗎？→ 業務查了：可以</li>
          <li>即時推播 vs 1 分鐘 polling 成本差 10 倍 → 跟 Architect 確認</li>
          <li>折衷方案：「<strong>1 分鐘 polling，第二期再上 push</strong>」</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這就是 PM 的價值</strong>：把「即時」這個模糊需求壓縮成可執行的數字 + 階段。</span></div>
    </div>
    <Footer source='_source/braindump.md · §PM 為何不只是「開會的人」' />
  </div>
);


const P20: Page = () => (
  <SectionEnd title='Boundary 完' subtitle='邊界講完，收成口訣。' next='2.99 Recap</span>' />
);


const P21: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 02 · RECAP' title='PM · 回顧' subtitle='三句口訣 · 下一站' />
);


const P22: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>MNEMONICS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 Ch.2 收成三句話</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 三句口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣 1</strong>：PM 是<strong>需求壓縮器</strong>，不是客戶傳聲筒。</Callout>
      <Callout tone='#D97757'><strong>口訣 2</strong>：客戶說的永遠<strong>不是真需求</strong>——挖到「可衡量的目標」才停。</Callout>
      <Callout tone='#D97757'><strong>口訣 3</strong>：PM 主導<strong>做什麼</strong>，不主導<strong>怎麼做</strong>——越界會弄壞團隊信任。</Callout>
    </div>
    <Footer source='_source/braindump.md · §PM 最重要的能力' />
  </div>
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · PM Cheatsheet 卡</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>內容</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>蓋房子對應</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>建案企劃 / 開發 PM（代理甲方）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>一句話定義</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>把商業問題翻成可執行的需求</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>降低的不確定性</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>商業價值不確定性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>經典產出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>PRD / User Flow / Backlog / Persona / Roadmap</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>主要工具</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Notion / Confluence / Jira / Linear / Figma</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AI 取代不了的</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>判斷力 / 政治力 / 同理心</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>常見誤解</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「PM = 開會的人」「PM = 老闆傳聲筒」「PM = 寫 Excel 的」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>下一個碰到的角色</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>UX / UI（把 User Flow 變樣品屋）</div>
        </div>
    <Footer source='_source/braindump.md · §PM 視角' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Ch.3：UX / UI · 室內設計師</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 下一站</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#5B7570'>PM 寫了 PRD「會員忘記密碼」，現在問題變成：

- 流程要分幾頁？
- 點哪個按鈕？
- 失敗訊息怎麼寫？
- 在手機上長什麼樣？

<strong>這些都是 UX / UI 的事</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>承先啟後</strong>：PM 給的是 What，UX/UI 把它變成 How（使用者體驗的 how）。</span></div>
    </div>
    <Footer source='_source/braindump.md · §UX vs UI' />
  </div>
);


const P25: Page = () => (
  <SectionEnd title='Ch.2 完' subtitle='PM 講完，看 UX / UI。' next='Ch.3 UX / UI</span>' />
);


export const meta: SlideMeta = { title: 'Ch.2 · PM' };
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
] satisfies Page[];
