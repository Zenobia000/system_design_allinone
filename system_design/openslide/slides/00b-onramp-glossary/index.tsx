import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import logoDark from '../../assets/branding/logo-dark.png';
import logoLight from '../../assets/branding/logo-light.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F1E8', text: '#2A2520', accent: '#D97757' },
  fonts: {
    display: '"Noto Serif TC", Georgia, serif',
    body: '"Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 180, body: 38 },
  radius: 8,
};

const muted = '#8B6F47', subtle = 'rgba(42, 37, 32, 0.55)', ok = '#5B9770', accent = '#D97757';

const animationCSS = `
@keyframes osd-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes osd-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes osd-scale-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
.osd-anim-fade-up { animation: osd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-fade-in { animation: osd-fade-in 0.6s ease-out both; }
.osd-anim-scale-in { animation: osd-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > * { animation: osd-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > *:nth-child(1) { animation-delay: 0.05s; } .osd-stagger > *:nth-child(2) { animation-delay: 0.10s; }
.osd-stagger > *:nth-child(3) { animation-delay: 0.15s; } .osd-stagger > *:nth-child(4) { animation-delay: 0.20s; }
.osd-stagger > *:nth-child(5) { animation-delay: 0.25s; } .osd-stagger > *:nth-child(6) { animation-delay: 0.30s; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;
const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const NoviceBadge = () => (
  <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 14, background: 'rgba(91, 151, 112, 0.15)', color: ok, fontSize: 16, fontWeight: 600 }}>🐤 新手友善 · 老手可跳 →</span>
);
const TermCard = ({ name, en, def }: { name: string; en: string; def: string }) => (
  <div style={{ padding: '14px 18px', background: 'rgba(217, 119, 87, 0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 6 }}>
    <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>{name} <span style={{ fontSize: 14, color: muted, fontWeight: 500 }}>· {en}</span></div>
    <div style={{ fontSize: 18, lineHeight: 1.55, marginTop: 6 }}>{def}</div>
  </div>
);
const Footer = ({ source }: { source: string }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>
);
const BrandBar = ({ light = false }: { light?: boolean }) => {
  const fg = light ? 'rgba(245, 241, 232, 0.85)' : '#2A2520';
  const sub = light ? 'rgba(245, 241, 232, 0.5)' : muted;
  const logoSrc = light ? logoLight : logoDark;
  return (
    <div className='osd-anim-fade-in' style={{ position: 'absolute', bottom: 18, left: 80, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', animationDelay: '0.5s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={logoSrc} alt='' style={{ height: 24, opacity: 0.9 }} />
        <div style={{ fontSize: 12, lineHeight: 1.25 }}>
          <div style={{ fontWeight: 700, color: fg, letterSpacing: '0.02em' }}>桑尼資料科學</div>
          <div style={{ fontSize: 9, color: sub, letterSpacing: '0.20em' }}>SUNNY DATA SCIENCE</div>
        </div>
      </div>
      <div style={{ fontSize: 10, color: sub, letterSpacing: '0.08em' }}>© 2026 SunnyDS · 版權所有 翻譯必究 · CONFIDENTIAL</div>
    </div>
  );
};

const P01: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 24 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, animationDelay: '0.1s' }}>PROLOGUE · 0.5 · ON-RAMP</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 100, fontWeight: 800, lineHeight: 1.1, margin: '24px 0 0', animationDelay: '0.2s' }}>先學這 25 個詞</h1>
      <h2 className='osd-anim-fade-up' style={{ fontSize: 38, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.35s' }}>後面 480 頁就順了</h2>
      <div className='osd-anim-fade-up' style={{ marginTop: 50, fontSize: 22, lineHeight: 1.7, color: 'rgba(245,241,232,0.8)', animationDelay: '0.5s' }}>
        系統設計教材有大量英文簡稱（CAP、TLS、Sharding…）。<br/>
        這章用白話把最常見的 25 個解一次，<br/>
        後面 7 章再遇到就不卡關。
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 30, fontSize: 18, color: 'rgba(245,241,232,0.5)', fontStyle: 'italic', animationDelay: '0.7s' }}>
        💡 老手可直接跳到 Ch.01 Foundation · 卡關時隨時翻 90-appendix 詞彙表
      </div>
      <BrandBar light />
    </div>
  </>
);

const P02: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 1 · 網路與通訊</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>網路怎麼跑的 5 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <TermCard name='HTTP / HTTPS' en='超文字傳輸協定' def='瀏覽器 ↔ 伺服器溝通的格式。HTTPS = HTTP + 加密 (TLS)。' />
        <TermCard name='API' en='Application Programming Interface' def='程式之間溝通的介面。「給我這支 API」就是「告訴我怎麼跟你的程式說話」。' />
        <TermCard name='REST' en='Representational State Transfer' def='最常見的 API 風格。用 HTTP 動詞（GET/POST/PUT/DELETE）操作資源。' />
        <TermCard name='CDN' en='Content Delivery Network' def='內容分發網路 — 把靜態檔（圖、影片）放到全球邊緣節點，讓用戶就近抓。' />
        <TermCard name='Latency' en='延遲' def='從請求發出到收到回應的時間（毫秒）。低 latency = 快。' />
      </div>
      <Footer source='Group 1/5 · 卡關時翻 90-appendix' />
      <BrandBar />
    </div>
  </>
);

const P03: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 2 · 資料庫基礎</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>資料怎麼存的 6 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <TermCard name='SQL / NoSQL' en='關聯式 / 非關聯式資料庫' def='SQL = 像 Excel 有固定欄位（PostgreSQL）；NoSQL = 自由形態（MongoDB / Redis）。' />
        <TermCard name='ACID' en='Atomic, Consistent, Isolated, Durable' def='事務 4 性質：要嘛全做要嘛全不做 / 資料合法 / 互不干擾 / 寫入永久。' />
        <TermCard name='Index' en='索引' def='像書的目錄。查得快但寫入時要多花力氣維護。' />
        <TermCard name='Transaction' en='事務 / 交易' def='一組操作要嘛全部成功要嘛全部失敗（如：轉帳一邊扣一邊加）。' />
        <TermCard name='OLTP / OLAP' en='交易型 / 分析型' def='OLTP 處理一筆筆訂單；OLAP 跑統計報表。兩種設計完全不同。' />
        <TermCard name='Cache' en='快取' def='把常用資料放離使用者近的地方（記憶體、邊緣節點），下次不用重算。' />
      </div>
      <Footer source='Group 2/5 · 卡關時翻 90-appendix' />
      <BrandBar />
    </div>
  </>
);

const P04: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 3 · 分散式核心</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>多台機器一起跑的 5 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <TermCard name='CAP' en='Consistency / Availability / Partition' def='分散式三選二定理。網路會壞 (P 必選)，所以你只能選「強一致」或「永遠可用」。' />
        <TermCard name='Sharding' en='資料分片' def='資料太多單台撐不住，拆到多台 (如 user_id 0-1M 在 A、1M-2M 在 B)。' />
        <TermCard name='Replication' en='複製' def='把資料複製到多台「讀」，主庫只負責「寫」。讀放大 + 容錯。' />
        <TermCard name='Consistent Hash' en='一致性哈希' def='把資料平均分配到 N 台機器；加減機器時搬動最少資料。' />
        <TermCard name='Load Balancer' en='負載均衡器' def='把流量平均分到多個後端（Round-robin / Sticky / Hash 等策略）。' />
      </div>
      <Footer source='Group 3/5 · 卡關時翻 90-appendix' />
      <BrandBar />
    </div>
  </>
);

const P05: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 4 · 可靠性與維運</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>不掛、不爆 的 5 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <TermCard name='SLO / SLA' en='服務目標 / 合約' def='你「答應」系統做到多好 (如 99.9% 可用)。SLA 對外、SLO 對內。' />
        <TermCard name='Idempotency' en='冪等性' def='同操作做 1 次和 10 次結果一樣。網路會丟包要重試，沒做冪等就重複扣款。' />
        <TermCard name='Circuit Breaker' en='斷路器' def='下游死了不要繼續打它（避免雪崩）。錯誤率太高 → 暫停呼叫。' />
        <TermCard name='Rate Limit' en='限流' def='限制每秒最多 X 個請求進來（防爆量、防黃牛、防 DDoS）。' />
        <TermCard name='Observability' en='可觀測性' def='Metrics (數字) + Logs (細節) + Traces (跨服務追蹤)。出事能定位。' />
      </div>
      <Footer source='Group 4/5 · 卡關時翻 90-appendix' />
      <BrandBar />
    </div>
  </>
);

const P06: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 8 }}><NoviceBadge /></div>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8, animationDelay: '0.05s' }}>群組 5 · 模式與進階</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, margin: '10px 0 24px', animationDelay: '0.1s' }}>架構模式的 4 個詞</h1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <TermCard name='Queue' en='訊息佇列 (Kafka, SQS)' def='「先寫排隊清單，慢慢做」。用來削峰、解耦、確保不掉資料。' />
        <TermCard name='Pub/Sub' en='發布訂閱' def='發訊者只管「發」，所有訂閱者都會收到（Redis Pub/Sub / Kafka）。' />
        <TermCard name='WebSocket' en='全雙工長連線' def='瀏覽器和 server 保持連線雙向即時推訊息（vs HTTP 一問一答）。' />
        <TermCard name='RAG' en='Retrieval-Augmented Generation' def='問問題時先「查文件」再「給 LLM 寫答案」（避免 LLM 胡謅）。' />
      </div>
      <Footer source='Group 5/5 · 卡關時翻 90-appendix' />
      <BrandBar />
    </div>
  </>
);

const P07: Page = () => (
  <>
    <AnimStyle />
    <div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 110, fontWeight: 800, margin: 0 }}>25 詞學完</h1>
      <h2 className='osd-anim-fade-up' style={{ fontSize: 42, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245,241,232,0.85)', animationDelay: '0.15s' }}>後面 480 頁就順了</h2>
      <div className='osd-stagger' style={{ marginTop: 50, fontSize: 24, lineHeight: 1.85, color: 'rgba(245,241,232,0.9)' }}>
        <div>📖 卡關時翻 90-appendix（80 條完整詞彙）</div>
        <div>💡 每章開頭也會列出「本章新術語」</div>
        <div>🐤 老手讀到這就直接進 Ch.01 Foundation</div>
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 60, fontSize: 30, fontWeight: 700, animationDelay: '0.6s' }}>
        → Chapter 01 · 基礎觀念
      </div>
      <BrandBar light />
    </div>
  </>
);

export const meta: SlideMeta = { title: 'On-ramp · 先學這 25 個詞' };
export default [P01, P02, P03, P04, P05, P06, P07] satisfies Page[];
