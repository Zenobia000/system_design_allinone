import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_01_api_naming from './assets/01_api_naming.png';

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
  <ChapterDivider eyebrow='CHAPTER · 06 · OVERVIEW' title='SD' subtitle='施工圖繪製師·把藍圖翻成可開發模組' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>METAPHOR ANCHOR</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>SD = 施工圖繪製師</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 蓋房子對應</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='' text='PM / UX / SA　 企劃、設計、規則' />
        <StackRow tone='#A1813F' label='' text='Architect　 結構技師、城市規劃' />
        <StackRow tone='#5B7570' label='SD ← 你在這' text='把建築圖拆成可施工的細部圖' />
        <StackRow tone='#5B9770' label='' text='DBA / Dev / QA / DevOps　 地基 / 工班 / 驗收 / 物業' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>一句話</strong>：把架構藍圖翻成可開發的模組與 API，讓工程師拿著就能開工。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD · System Design' />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>真實 SD 一天大概在幹嘛</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 一天時間分配</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   寫 Design Doc          ████████████  40%
   畫 Sequence / Class    ███████       22%
   API Spec / OpenAPI     ██████        18%
   跟 Dev / Architect 對齊 ████          12%
   Review 既有設計        ███           8%`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反差</strong>：SD 寫的文件不是給管理層看，是給<strong>Dev 看完不用再問問題</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD 經典產出' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>沒有 SD 會發生什麼</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 為什麼需要這個角色</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'>Architect 說：「Order Service 獨立、跟 Payment 走 event。」

Dev 拿到這句話<strong>根本沒辦法開工</strong>——
endpoint 叫什麼？欄位有哪些？失敗怎麼處理？三個 Dev 寫出三套不一樣的 API。

<strong>SD 就是補上這層細節</strong>，讓系統可以「同步開工不撞車」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：SD 是<strong>架構與代碼的橋</strong>，沒有它就是各寫各的。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD vs Architect' />
  </div>
);


const P06: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>看完 Ch.6 你能回答</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① SD 到底做什麼？' text='跟架構師、Dev 差在哪' />
        <StackRow tone='#A1813F' label='② OpenAPI / Sequence 為何重要？' text='多人協作的契約' />
        <StackRow tone='#5B7570' label='③ SD vs Architect vs Dev 邊界？' text='誰主導命名 / sequence / class' />
        <StackRow tone='#5B9770' label='④ 一個服務怎麼從藍圖拆到 API？' text='Order Service 實例' />
      </div>
    <Footer source='_source/braindump.md · §SD 經典產出' />
  </div>
);


const P07: Page = () => (
  <SectionEnd title='Overview 完' subtitle='看完角色，看具體產出。' next='6.1 SD 經典產出</span>' />
);


const P08: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 06 · TOPIC 01' title='SD 經典產出' subtitle='讓 Dev 看完不用問問題' />
);


const P09: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · INSIGHT</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>文件是給 Dev 看的，不是給老闆</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 真產出 vs 假產出</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'>很多 SD 寫的「設計文件」滿是業務術語、沒有 endpoint、沒有欄位、沒有錯誤碼。

<strong>Dev 看完還是要問三遍。</strong>

好的 SD 產出有一個<strong>唯一指標</strong>：
Dev 拿到文件，<strong>從頭到尾不用再問你問題就能寫完</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：API 命名是 SD 的靈魂——一致、可預測、不會誤導。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD vs Architect' />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 5 個經典產出</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>產出</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話用途</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>看起來像什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Module Design</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>服務內模組怎麼切</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>模組圖 + 責任清單</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>API Spec</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對外契約</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>OpenAPI / Swagger YAML</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Sequence Diagram</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>一次互動的時間軸</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>mermaid / PlantUML</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Component Design</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>元件責任與依賴</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>元件圖 + interface 表</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Class Diagram</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>物件結構</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>UML class diagram</div>
        </div>
    <Footer source='_source/braindump.md · §SD 經典產出' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · OpenAPI 長什麼樣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`POST /api/v1/auth/login
Request:
{
  "email": "user@example.com",
  "password": "********"
}
Response 200:
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600
}
Response 401: { "error": "INVALID_CREDENTIALS" }
Response 423: { "error": "ACCOUNT_LOCKED" }`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>注意 SD 不只寫<strong>成功路徑</strong>，還要寫<strong>錯誤碼與例外</strong>——這是新手 SD 最容易漏的。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD 經典產出' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_api_naming} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 為何 AI 取代不了</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>AI 寫得出 OpenAPI YAML，但決定不了</strong>：

- 這個 API 該叫 `/orders` 還是 `/order/create`？
- 下單失敗是 400 還是 422？要不要區分 sub-code？
- 三個月後要加退款，現在的 schema 撐得住嗎？</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>邊界設計</strong>：哪些欄位該放、哪些該拆——錯一次就回不去</li>
          <li><strong>API 一致性</strong>：整個 service 100 支 API 命名風格要一樣</li>
          <li><strong>未來擴充</strong>：今天圖快加欄位，明天就是 breaking change</li>
          <li><strong>降低 Dev 認知負擔</strong>：好的設計 Dev 看一眼就懂</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>AI 幫你<strong>填模板</strong>，但不幫你<strong>設計契約</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='Outputs 完' subtitle='產出講完，看 SD 跟誰打交道。' next='6.2 SD 邊界</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 06 · TOPIC 02' title='SD 邊界' subtitle='跟哪些人打交道·誰主導什麼' />
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHO</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>SD 上下游關係</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 上下游</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`       Architect（系統邊界 + NFR）
              │
              ▼
        ┌──────────┐
        │    SD    │ ← 你在這
        └──────────┘
              │
        ┌─────┼─────┬──────┐
        ▼     ▼     ▼      ▼
       Dev   DBA   QA    DevOps`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>上游</strong>：架構決策。<strong>下游</strong>：所有要 implement 的角色。SD 是<strong>設計與實作的橋</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §責任鏈' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · SD vs Architect</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='Architect = 城市規劃師' items={['系統級、跨服務級', '長期演進、NFR', '「拆幾個 service」', '「同步還是非同步」', '不寫 endpoint 細節']} />
        <TradeoffCol tone='#E8634F' title='SD = 建築設計師' items={['模組級、API 級', '開發落地', '「endpoint 怎麼命名」', '「sequence 怎麼跑」', '不決定服務拆不拆']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>口訣</strong>：Architect 定<strong>邊界</strong>、SD 定<strong>細部設計</strong>。SD 在架構師畫的框內把細節補滿。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD vs Architect' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · SD vs Dev</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>面向</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>SD</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>Dev</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>動作</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫文件</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>看文件 implement</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>關心</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>模組怎麼切、契約一致</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>邏輯正確、效能、unit test</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>產出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Design Doc / OpenAPI</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>可執行的 code</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>時機</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Coding 之前</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Coding 之中</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>判斷標準</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Dev 看完不用問問題</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>跑得起來、過測試</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>陷阱</strong>：小團隊 SD 跟 Dev 同一人 → 容易跳過設計直接 coding → 後面修不動。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD · System Design' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 誰主導什麼</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>決策</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>主導角色</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>旁邊配合</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>服務拆幾個</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Architect</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SD 落地細部</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>API endpoint 命名</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Architect 看一致性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Module 切分</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Architect review</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Sequence Diagram</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SA 提供業務流程</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Class 結構</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Dev 微調實作細節</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>錯誤碼設計</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SD</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>QA / Dev 補例外</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DB schema 細節</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DBA</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SD 提供需求</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>演算法實作</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Dev</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>SD 不碰</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>陷阱</strong>：SD 越界寫實作邏輯 → Dev 沒空間；SD 不寫 sequence → Dev 各寫各的。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD 經典產出' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 實務場景</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>場景</strong>：Architect 說「Order Service 獨立」，SD 怎麼接？</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>新手 SD 會這樣回</strong>：「OK，我畫個 module 圖。」
→ 一張圖、沒 endpoint、沒 sequence、Dev 看完還要問三天。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>成熟 SD 會這樣拆</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>拆 API</strong>：`POST /orders`（建單）/ `POST /orders/&#123;id&#125;/cancel`（取消）/ `POST /orders/&#123;id&#125;/refund`（退款）</li>
          <li><strong>畫 sequence</strong>：建單 → 鎖庫存 → 發 OrderCreated event → Payment 訂閱</li>
          <li><strong>定錯誤碼</strong>：`OUT_OF_STOCK` / `PAYMENT_PENDING` / `ALREADY_CANCELLED`</li>
          <li><strong>寫 module</strong>：`order-api` / `order-domain` / `order-event-publisher`</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>這就是 SD 的價值</strong>：把一句話的架構決策，拆成 Dev 拿著就能開工的細部圖。</span></div>
    </div>
    <Footer source='_source/braindump.md · §SD vs Architect' />
  </div>
);


const P21: Page = () => (
  <SectionEnd title='Boundary 完' subtitle='邊界講完，收成口訣。' next='6.99 Recap</span>' />
);


const P22: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 06 · RECAP' title='SD · 回顧' subtitle='三句口訣 · 下一站' />
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>MNEMONICS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 Ch.6 收成三句話</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 三句口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣 1</strong>：SD 是<strong>架構與代碼的橋</strong>——沒有它就是各寫各的。</Callout>
      <Callout tone='#D97757'><strong>口訣 2</strong>：<strong>API 命名是 SD 的靈魂</strong>——一致、可預測、不會誤導。</Callout>
      <Callout tone='#D97757'><strong>口訣 3</strong>：好的 SD 讓 <strong>Dev 不用問問題</strong>——文件就是契約。</Callout>
    </div>
    <Footer source='_source/braindump.md · §三句口訣' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · SD Cheatsheet 卡</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>內容</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>蓋房子對應</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>施工圖繪製師</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>一句話定義</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>把架構藍圖翻成可開發的模組與 API</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>降低的不確定性</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>開發落地不確定性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>經典產出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Module Design / API Spec / Sequence / Component / Class Diagram</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>主要工具</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>OpenAPI / Swagger / PlantUML / Mermaid / Notion</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AI 取代不了的</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>邊界設計 / API 一致性 / 未來擴充考量</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>常見誤解</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「SD = 寫 UML 的人」「SD = 資深 Dev」「SD = Architect 的助理」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>下一個碰到的角色</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>DBA（守住資料生命線）</div>
        </div>
    <Footer source='_source/braindump.md · §角色 = 消除不確定性（核心思想）' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Ch.7：DBA · 資料生命線</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 下一站</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#5B7570'>SD 寫了 `POST /orders` 的契約跟 sequence，現在問題變成：

- 訂單表 schema 長怎樣？index 怎麼設？
- 庫存扣款怎麼避免 race condition？
- 歷史訂單要不要分表？
- 一年後 1 億筆查得動嗎？

<strong>這些都是 DBA 的事</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>承先啟後</strong>：SD 給的是 API 契約，DBA 確保<strong>資料找得到、算得準、不會丟</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DBA · 資料生命線' />
  </div>
);


const P26: Page = () => (
  <SectionEnd title='Ch.6 完' subtitle='SD 講完，看 DBA。' next='Ch.7 DBA</span>' />
);


export const meta: SlideMeta = { title: 'Ch.6 · SD' };
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
] satisfies Page[];
