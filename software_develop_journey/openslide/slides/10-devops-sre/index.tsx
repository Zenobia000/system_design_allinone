import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_00_hero from './assets/00_hero.png';
import img_01_property_management from './assets/01_property_management.png';

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
  <ChapterDivider eyebrow='CHAPTER · 10 · OVERVIEW' title='DevOps / SRE' subtitle='物業管理·不是水電工' />
);


const P02: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_00_hero} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P03: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>METAPHOR ANCHOR</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>DevOps / SRE = 物業 + 24h 保全 + 消防</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 蓋房子對應</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='' text='PM / UX / SA　 決定要蓋什麼、規則怎麼跑' />
        <StackRow tone='#A1813F' label='' text='Architect / SD / DBA　 結構、模組、資料' />
        <StackRow tone='#5B7570' label='' text='Dev / QA　 工班把樓蓋起來、驗收員把關' />
        <StackRow tone='#5B9770' label='DevOps / SRE ← 你在這' text='上線後讓系統持續活著' />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>一句話</strong>：上線後讓系統持續活著——CI/CD、監控、on-call、災難演練。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P04: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · DevOps vs SRE 一句話講完</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>最常見誤解</strong>：以為 DevOps 就是「裝完伺服器就走的水電工」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}>水電工：來通一次水管、接好電就結束。
<strong>DevOps 是物業管理</strong>——24h on-call、定期消防演練、突發停水搶修、跨樓層協調。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>DevOps</strong> = <strong>文化 + 工具鏈</strong>（Dev 與 Ops 不分家、自動化一切）</li>
          <li><strong>SRE</strong> = <strong>Google 命名的角色</strong>，強調用<strong>可靠性指標</strong>（SLO / Error Budget）管理運維</li>
          <li>實務上常合稱，大公司 SRE 偏資深、定 SLO；中小公司一個人扛全部</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心金句</strong>：DevOps 不是裝完就走的水電工，是<strong>24 小時待命的物業管理</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P05: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>真實 DevOps / SRE 一天大概在幹嘛</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>ROLE · 一天時間分配</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   CI/CD pipeline 維護        ███████       22%
   監控告警 / 看 dashboard    ██████        18%
   on-call / 處理 incident    ██████        18%
   Infra as Code 編寫         █████         15%
   容量規劃 / cost 優化       ████          12%
   跨團隊協調（Dev/QA/SA）    ███           10%
   災難演練 / runbook         █             5%`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>反差</strong>：平時看似閒，<strong>半夜 alert 響起時，整個公司的營收都壓在你身上</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P06: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>看完 Ch.10 你能回答</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OBJECTIVES · 學習目標</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StackRow tone='#D97757' label='① DevOps 跟 SRE 差在哪？' text='文化 vs 角色命名' />
        <StackRow tone='#A1813F' label='② 5 個經典產出？' text='CI/CD / IaC / Monitor / Runbook / Incident' />
        <StackRow tone='#5B7570' label='③ SLO / SLA / SLI 是什麼？' text='為什麼要 Error Budget' />
        <StackRow tone='#5B9770' label='④ 半夜 alert 響，誰先 on-call？' text='Dev 還是 DevOps' />
      </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P07: Page = () => (
  <SectionEnd title='Overview 完' subtitle='看完角色，看具體產出。' next='10.1 DevOps / SRE 經典產出</span>' />
);


const P08: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 10 · TOPIC 01' title='DevOps / SRE 經典產出' subtitle='把運維變成可重複的程式碼' />
);


const P09: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
    <img src={img_01_property_management} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
  </div>
);


const P10: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · ARTIFACTS</Kicker>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 5 個經典產出</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>產出</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話用途</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>看起來像什麼</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>CI/CD Pipeline</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>自動測試 + 部署</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>`.gitlab-ci.yml` / GitHub Actions</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Infra as Code</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>用程式定義基礎設施</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Terraform / Ansible / Helm</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Monitoring Dashboard</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>系統健康即時可見</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Grafana / Datadog / CloudWatch</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Runbook</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>出事時誰按哪個鈕</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Confluence SOP / on-call playbook</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Incident Report</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>事後檢討（Postmortem）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>RCA + 行動項 + 對誰責任</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心</strong>：產出不是「裝好機器」，是<strong>讓運維本身可被版本控制、可被重複</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P11: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>.github/workflows/deploy.yml</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · CI/CD Pipeline 長什麼樣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`
stages:
  - lint        # 程式風格檢查
  - test        # 跑 unit + integration（Dev/QA 產出）
  - build       # 打包 Docker image
  - scan        # SAST / 漏洞掃描
  - deploy_stg  # 部署到 staging（自動）
  - e2e         # 跑 QA 的 E2E suite
  - deploy_prod # 部署到 production（需手動 approve）
  - smoke       # 上線後 smoke test
  - notify      # 通知 Slack + 更新 release notes`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>重點</strong>：每次 commit 都跑這條 pipeline——<strong>從 code 到上線完全自動化、可追溯、可 rollback</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §開發流程（以前）' />
  </div>
);


const P12: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · SLO / SLA / SLI / Error Budget</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>名詞</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>一句話</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>範例</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SLI</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>量測指標</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「API 回應 &lt; 300ms 的比例」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SLO</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>內部目標</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「99.9% 的請求 &lt; 300ms」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>SLA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>對外承諾（賠錢條款）</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「99.5% 否則退錢 10%」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Error Budget</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>允許壞掉的額度</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>99.9% SLO → 每月可壞 43 分鐘</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Blue-Green</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>兩套環境切換部署</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>出錯秒切回舊版</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Canary</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>流量先放 1% 試水</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>安全才放大到 100%</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心</strong>：<strong>SLA &gt; SLO &gt; SLI</strong>——對外承諾最嚴格，內部目標留 buffer，指標是基礎量測。</span></div>
    </div>
    <Footer source='_source/braindump.md · §Availability' />
  </div>
);


const P13: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>OUTPUTS · 為何 AI 取代不了</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#D97757'><strong>AI 寫得出 Terraform，但寫不出</strong>：

- 半夜 3 點 alert，是 DB 慢、CDN 掛、還是被 DDoS？
- 黑五流量會是平日 5 倍還是 50 倍？容量要備多少？
- Dev 想推這個 hotfix、SRE 想 block——誰贏？</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li><strong>Incident 判斷</strong>：靠多年踩坑的直覺，AI 沒被 paged 過</li>
          <li><strong>容量規劃</strong>：商業節奏 + 成本 + 風險的三方權衡</li>
          <li><strong>跨團隊政治</strong>：說服 Dev 接受 release gate 需要信任</li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}>AI 是 DevOps 的助手——它幫你<strong>寫 YAML</strong>，不幫你決定<strong>該不該 deploy</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §AI 時代的本質沒變' />
  </div>
);


const P14: Page = () => (
  <SectionEnd title='Outputs 完' subtitle='產出講完，看 DevOps 跟誰打交道。' next='10.2 DevOps 邊界</span>' />
);


const P15: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 10 · TOPIC 02' title='DevOps / SRE 邊界' subtitle='跟誰共擔可靠性·誰先 on-call' />
);


const P16: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>SECTION 1 · WHO</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>DevOps / SRE 上下游關係</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 上下游</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <pre style={{ fontSize: 14, fontFamily: 'ui-monospace, monospace', background: '#2A2520', color: '#F5F1E8', padding: '16px 20px', borderRadius: 6, lineHeight: 1.5, overflow: 'hidden', margin: 0, whiteSpace: 'pre-wrap' }}>{`   Dev（產出 code）        QA（產出測試）
         │                       │
         └──────────┬────────────┘
                    ▼
              ┌──────────┐
              │ DevOps / │ ← 你在這
              │   SRE    │
              └──────────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
   生產環境      監控告警      使用者`}</pre>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>DevOps 上游</strong>：Dev + QA 的交付。<strong>下游</strong>：上線後活下來的系統——使用者直接感受到後果。</span></div>
    </div>
    <Footer source='_source/braindump.md · §責任鏈' />
  </div>
);


const P17: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · DevOps vs SRE 哲學差異</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='DevOps（文化）' items={['Dev 與 Ops 不分家', '自動化一切手動工', 'You build it, you run it', '偏 pipeline / tooling', '各公司定義不一']} />
        <TradeoffCol tone='#E8634F' title='SRE（Google 命名）' items={['用工程方法做運維', 'SLO / Error Budget 驅動', '50% 時間做 toil 自動化', '偏 reliability / metrics', '定義較嚴謹（Google 書）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>實務</strong>：大公司分開（SRE 定 SLO、DevOps 顧 pipeline），中小公司一個人扛全部，<strong>title 不重要、責任才重要</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P18: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 容易搞混的角色</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>角色</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>跟 DevOps / SRE 差在哪</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Sysadmin</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>偏單台主機管理，不寫 pipeline / IaC</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Infra Engineer</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>偏底層網路 / 機房，DevOps 偏應用層</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Platform Engineer</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>蓋內部開發平台給 Dev 用，是 DevOps 的進化</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>Dev</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>寫 code，DevOps 確保 code 上線後<strong>活著</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>DBA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>顧資料庫專屬層，DevOps 顧整個 infra</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>QA</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>確認上線前沒問題，DevOps 確認上線後沒問題</div>
        </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>核心</strong>：DevOps 跨越所有層——<strong>從 Dev 寫完 commit 那刻到 user 看到頁面那刻，全是責任區</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P19: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>決策樹</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 誰主導什麼</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <TradeoffCol tone='#5B9770' title='DevOps / SRE 主導' items={['deploy 策略（blue-green / canary）', '監控告警閾值', '容量規劃', 'disaster recovery 演練', 'release gate 標準']} />
        <TradeoffCol tone='#E8634F' title='DevOps 不主導（但要懂）' items={['業務功能（PM）', 'API 設計（Architect / SD）', 'DB schema（DBA）', '測試 case 內容（QA）', '產品優先級（PM）']} />
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>陷阱</strong>：DevOps 不該替 Dev 寫業務 code——<strong>界線是「程式怎麼跑」，不是「程式做什麼」</strong>。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P20: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>BOUNDARY · 實務場景</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#E8634F'><strong>場景</strong>：凌晨 3:17，PagerDuty 響——「API 5xx 錯誤率超過閾值」。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>誰先 on-call？</strong>：DevOps / SRE 一定先接——他們看得到全局指標。</div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><strong>處理流程</strong>：</div>
      <ul style={{ fontSize: 24, lineHeight: 1.6, paddingLeft: 28, margin: 0 }}>
          <li>看 dashboard：是 DB 慢、cache miss、還是某 service 掛？</li>
          <li>翻 <strong>runbook</strong>：這個 alert 對應哪個 SOP？</li>
          <li>5 分鐘內判斷：能 rollback 嗎？能擴容嗎？要不要拉 Dev？</li>
          <li>必要時叫醒 Dev：「上次的 deploy 有改 X，幫我 confirm」</li>
          <li>隔天寫 <strong>Postmortem</strong>：root cause + 補強行動，<strong>怪流程不怪人</strong></li>
        </ul>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>關鍵</strong>：on-call 不是「誰寫的誰修」，是<strong>先止血再究責</strong>——SRE 文化的核心。</span></div>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P21: Page = () => (
  <SectionEnd title='Boundary 完' subtitle='邊界講完，收成口訣。' next='10.99 Recap</span>' />
);


const P22: Page = () => (
  <ChapterDivider eyebrow='CHAPTER · 10 · RECAP' title='DevOps / SRE · 回顧' subtitle='三句口訣 · 下一站' />
);


const P23: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <Kicker>MNEMONICS</Kicker>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>把 Ch.10 收成三句話</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 三句口訣</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <Callout tone='#D97757'><strong>口訣 1</strong>：DevOps 不是裝完就走的<strong>水電工</strong>，是 24h 待命的<strong>物業管理</strong>。</Callout>
      <Callout tone='#D97757'><strong>口訣 2</strong>：監控不是<strong>事後補救</strong>，是<strong>事前約定 SLO</strong>——沒指標就沒可靠性。</Callout>
      <Callout tone='#D97757'><strong>口訣 3</strong>：災難演練不是<strong>有就好</strong>，是<strong>定期練才算</strong>——runbook 沒跑過就是廢紙。</Callout>
    </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P24: Page = () => (
  <div style={{ ...fill, padding: '60px 120px', position: 'relative', overflow: 'hidden' }}>
    <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · DevOps / SRE Cheatsheet 卡</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 8 }}>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>維度</div>
          <div style={{ fontWeight: 700, color: 'var(--osd-accent)', padding: '8px 12px', fontSize: 18 }}>內容</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>蓋房子對應</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>物業管理 + 24h 保全 + 消防</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>一句話定義</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上線後讓系統持續活著</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>降低的不確定性</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>上線運行不確定性</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>經典產出</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>CI/CD / IaC / Monitor / Runbook / Incident Report</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>主要工具</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>Jenkins / GitHub Actions / Terraform / Grafana / K8s</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>AI 取代不了的</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>incident 判斷 / 容量規劃 / 跨團隊政治</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>常見誤解</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>「DevOps = 水電工」「裝完就走」「title = SRE 才厲害」</div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}><strong>下一個碰到的角色</strong></div>
          <div style={{ padding: '8px 12px', fontSize: 17, borderTop: '1px solid rgba(139,111,71,0.25)' }}>全部 9 角色（Ch.11 看怎麼協作）</div>
        </div>
    <Footer source='_source/braindump.md · §DevOps / SRE 視角' />
  </div>
);


const P25: Page = () => (
  <div style={{ ...fill, padding: '80px 140px', position: 'relative', overflow: 'hidden' }}>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px' }}>Ch.11：協作與衝突</h1>
    <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.3, margin: '0 0 24px', color: muted }}>RECAP · 下一站</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout tone='#5B7570'>走完 9 個角色，現在問題變成：

- PM 跟 Architect 在會議室吵架，怎麼辦？
- SA 的規則跟 Dev 的實作對不上，誰讓步？
- DevOps 的 release gate 卡住 Dev 的 hotfix，誰贏？
- 9 種專業怎麼湊成一個團隊？

<strong>這些都是 Ch.11 協作篇的事</strong>。</Callout>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><br /></div>
      <div style={{ fontSize: 24, lineHeight: 1.6 }}><span style={{ color: muted, fontStyle: 'italic' }}><strong>承先啟後</strong>：認識完角色，下一步是<strong>看角色怎麼互相磨合</strong>——衝突案例與責任邊界。</span></div>
    </div>
    <Footer source='_source/braindump.md · §責任鏈' />
  </div>
);


const P26: Page = () => (
  <SectionEnd title='Ch.10 完' subtitle='DevOps 講完，看協作與衝突。' next='Ch.11 協作</span>' />
);


export const meta: SlideMeta = { title: 'Ch.10 · DevOps / SRE' };
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
