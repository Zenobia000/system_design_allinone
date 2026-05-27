import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import logoDark from '../../assets/branding/logo-dark.png';
import logoLight from '../../assets/branding/logo-light.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F1E8', text: '#2A2520', accent: '#D97757' },
  fonts: { display: '"Noto Serif TC", Georgia, serif', body: '"Noto Sans TC", system-ui, sans-serif' },
  typeScale: { hero: 180, body: 38 },
  radius: 8,
};

const muted = '#8B6F47', subtle = 'rgba(42, 37, 32, 0.55)', accent = '#D97757';

const animationCSS = `
@keyframes osd-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes osd-fade-in { from { opacity: 0; } to { opacity: 1; } }
.osd-anim-fade-up { animation: osd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-fade-in { animation: osd-fade-in 0.6s ease-out both; }
.osd-stagger > * { animation: osd-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > *:nth-child(1) { animation-delay: 0.05s; } .osd-stagger > *:nth-child(2) { animation-delay: 0.10s; }
.osd-stagger > *:nth-child(3) { animation-delay: 0.15s; } .osd-stagger > *:nth-child(4) { animation-delay: 0.20s; }
.osd-stagger > *:nth-child(5) { animation-delay: 0.25s; } .osd-stagger > *:nth-child(6) { animation-delay: 0.30s; }
.osd-stagger > *:nth-child(7) { animation-delay: 0.35s; } .osd-stagger > *:nth-child(8) { animation-delay: 0.40s; }
.osd-stagger > *:nth-child(9) { animation-delay: 0.45s; } .osd-stagger > *:nth-child(10) { animation-delay: 0.50s; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;
const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const Kicker = ({ children }: { children: React.ReactNode }) => <div className='osd-anim-fade-up' style={{ fontSize: 24, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>;
const Footer = ({ source }: { source: string }) => <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>;
const PageH1 = ({ children, size = 48 }: { children: React.ReactNode; size?: number }) => <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px', animationDelay: '0.1s' }}>{children}</h1>;
const Table = ({ cols, head, rows, fontSize = 16 }: { cols: string; head: string[]; rows: string[][]; fontSize?: number }) => (
  <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: cols, gap: 3, fontSize, lineHeight: 1.5 }}>
    {head.map((h, i) => <div key={`h-${i}`} style={{ fontWeight: 700, color: accent, padding: '8px 12px' }}>{h}</div>)}
    {rows.map((row, i) => row.map((cell, j) => <div key={`r-${i}-${j}`} style={{ padding: '8px 12px', borderTop: '1px solid rgba(139,111,71,0.25)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</div>))}
  </div>
);


// ===== PAGE CHROME =====
const Breadcrumb = ({ part, chapter, section }: { part: string; chapter: string; section?: string }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', top: 24, left: 80, fontSize: 13, color: muted, letterSpacing: '0.08em' }}>
    {part} <span style={{ opacity: 0.4, margin: '0 8px' }}>›</span> {chapter}{section ? <> <span style={{ opacity: 0.4, margin: '0 8px' }}>›</span> {section}</> : null}
  </div>
);
const PageNum = ({ n, total }: { n: number; total: number }) => (
  <div className='osd-anim-fade-in' style={{ position: 'absolute', top: 24, right: 80, fontSize: 13, color: muted, fontVariantNumeric: 'tabular-nums' }}>
    {String(n).padStart(2, '0')} <span style={{ opacity: 0.4 }}>/</span> {String(total).padStart(2, '0')}
  </div>
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
const Mantra = ({ children }: { children: React.ReactNode }) => (
  <div className='osd-anim-fade-up' style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 18px', background: 'rgba(217, 119, 87, 0.10)', borderLeft: `4px solid ${accent}`, borderRadius: 6, fontSize: 17, color: accent, fontWeight: 600, animationDelay: '0.4s' }}>
    <span style={{ fontSize: 15, opacity: 0.85 }}>💡 心法</span>
    <span style={{ color: '#2A2520' }}>{children}</span>
  </div>
);
const ThreeTakeaways = ({ chapter, lines }: { chapter: string; lines: string[] }) => (
  <><AnimStyle />
    <div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ fontSize: 22, opacity: 0.75, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{chapter} · 三句帶走</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 88, fontWeight: 800, margin: '28px 0 56px', animationDelay: '0.1s' }}>記住這三句</h1>
      <div className='osd-stagger'>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.4, marginBottom: 16, display: 'flex', alignItems: 'baseline' }}>
            <span style={{ opacity: 0.5, marginRight: 24, fontSize: 32 }}>0{i + 1}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <BrandBar light />
    </div>
  </>
);

const P01: Page = () => (
  <><AnimStyle /><div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
    <div className='osd-anim-fade-up' style={{ fontSize: 28, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>APPENDIX · 90</div>
    <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 140, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>速查 + 提示詞庫</h1>
    <h2 className='osd-anim-fade-up' style={{ fontSize: 44, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>9 角色卡 · 30 個 prompts · 詞彙 · 對照</h2>
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={1} total={10} />
      <BrandBar />
    </div></>
);

const P02: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 70px', position: 'relative' }}>
    <Kicker>A.1 · 9 角色一頁速查卡</Kicker>
    <PageH1 size={42}>對照表</PageH1>
    <Table cols='100px 90px 1fr 1fr 1fr' head={['角色', '蓋樓', '一句話', 'AI 可代勞', 'AI 不可']} rows={[
      ['PM', '企劃', '決定做什麼', '競調、文案', '商業假設、優先級'],
      ['UX', '室內設計', '設計動線', '線稿、icon', '真實訪談'],
      ['SA', '建築師', '翻業務→系統', 'edge case 展開', '規則仲裁'],
      ['Architect', '結構技師', '系統活下去', '方案表、ADR 草稿', '風險取捨'],
      ['SD', '施工圖', '模組拆分', 'OpenAPI、proto', '領域邊界'],
      ['DBA', '地基管線', '資料命脈', 'DDL、EXPLAIN', '一致性策略'],
      ['Dev', '工班', '蓋起來', '90% boilerplate', '演算法、技術債'],
      ['QA', '驗收員', '定義「對」', 'case 展開', 'invariant 定義'],
      ['DevOps', '物業', '上線維運', 'Terraform、yaml', 'SLO、incident'],
    ]} fontSize={15} />
    <Footer source='software_develop_journey/ppt/90-appendix/00_role_cheatsheet.md' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={2} total={10} />
      <BrandBar />
    </div></>
);

const P03: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>A.2 · 20 個設計模式索引</Kicker>
    <PageH1>三大分組</PageH1>
    <Table cols='60px 1fr 80px' head={['#', '模式', '在本書']} rows={[
      ['1-3', 'Factory · Builder · Singleton（物件創建）', 'D.2'],
      ['4-7', 'Adapter · Decorator · Facade · Proxy（結構包裝）', 'D.2'],
      ['8', 'Composite（樹狀結構）', 'D.2'],
      ['9-10', 'Repository · Specification（資料存取）', 'D.2'],
      ['11-14', 'Strategy · Observer · State · Command（行為）', 'D.2'],
      ['15-16', 'Template Method · Chain of Responsibility（流程）', 'D.2'],
      ['17-20', 'Saga · ES · CQRS · Outbox（分散式）', 'D.4'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 22, fontSize: 18, color: muted, lineHeight: 1.7, animationDelay: '0.7s' }}>
      <strong>進階閱讀</strong>：<br/>
      · <code>software_architect/ppt/06-components-patterns/</code> 每個模式有完整 1 頁<br/>
      · <code>software_architect/ppt/08-advanced-patterns/</code> Saga / ES / CQRS 深度
    </div>
    <Footer source='software_architect/ppt/06-components-patterns/' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={3} total={10} />
      <BrandBar />
    </div></>
);

const P04: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
    <Kicker>A.3 · 30 個經過驗證的架構 prompts (1/2)</Kicker>
    <PageH1 size={36}>需求 · 選型 · 容量 · 架構 · 資料</PageH1>
    <div className='osd-anim-fade-up' style={{ background: '#2A2520', color: '#F5F1E8', padding: '18px 24px', borderRadius: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, lineHeight: 1.7, animationDelay: '0.2s' }}>
      <strong style={{ color: accent }}>### 需求類</strong><br/>
      1. 「把需求 X 翻成 5 個量化 NFR + 對應 SLI」<br/>
      2. 「列出我該問 PM 的 5 個澄清問題」<br/>
      3. 「扮 PM 模擬訪談，給我反問」<br/><br/>
      <strong style={{ color: accent }}>### 選型類</strong><br/>
      4-7. 「對比 [A] vs [B]，6 維度量化打分」/ 「列 3 方案 + ADR 輸出」/ 「扮反方攻擊 5 點」/ 「3 年後反悔的逆轉成本估算」<br/><br/>
      <strong style={{ color: accent }}>### 容量類</strong><br/>
      8-10. 「依 DAU/動作數，給 QPS / 儲存 / 頻寬 napkin」/ 「在 [budget] 下能撐多少 user？」/ 「峰值流量曲線 + auto-scale 參數」<br/><br/>
      <strong style={{ color: accent }}>### 架構類</strong><br/>
      11-15. 「審查我的架構圖，找 SPOF / 瓶頸 / 缺口」/ 「畫 PlantUML 元件圖 + 序列圖」/ 「每元件故障場景 + 降級」/ 「跨 region 部署 4 個 trade-off」/ 「1K → 100K QPS 演進三階段」<br/><br/>
      <strong style={{ color: accent }}>### 資料類</strong><br/>
      16-18. 「從業務生 ER 圖 + DDL + 索引建議」/ 「Schema 演進策略：加/改/棄欄位」/ 「Sharding key 選擇 + 反例」
    </div>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={4} total={10} />
      <BrandBar />
    </div></>
);

const P05: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
    <Kicker>A.3 · 30 個架構 prompts (2/2)</Kicker>
    <PageH1 size={36}>程式 · 維運 · 文檔 · 審查 · 學習</PageH1>
    <div className='osd-anim-fade-up' style={{ background: '#2A2520', color: '#F5F1E8', padding: '18px 24px', borderRadius: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, lineHeight: 1.7, animationDelay: '0.2s' }}>
      <strong style={{ color: accent }}>### 程式類</strong><br/>
      19-21. 「根據 ADR 生 PoC 骨架 + 5 edge case」/ 「TDD: 先給測試，再給實作」/ 「重構：找 code smell + 改寫」<br/><br/>
      <strong style={{ color: accent }}>### 維運類</strong><br/>
      22-24. 「依架構生 Prometheus alert rules + runbook」/ 「Incident post-mortem 模板 + 5 個 why」/ 「降級策略：每個外部依賴 fail-safe」<br/><br/>
      <strong style={{ color: accent }}>### 文檔類</strong><br/>
      25-26. 「根據 diff 更新 OpenAPI / README / changelog」/ 「把 ADR 翻成給 PM 的非技術摘要」<br/><br/>
      <strong style={{ color: accent }}>### 審查類</strong><br/>
      27-28. 「Review 此 PR 的 5 維度（架構/資料/可靠/觀測/安全）」/ 「OWASP top 10 對照此 endpoint」<br/><br/>
      <strong style={{ color: accent }}>### 學習類</strong><br/>
      29-30. 「對比這個系統與業界 X 公司」/ 「我看不懂這個概念，用 [其他角色比喻] 解釋」
    </div>
    <Footer source='_source/braindump.md' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={5} total={10} />
      <BrandBar />
    </div></>
);

// 詞彙表共用樣式（4 欄：英文 / 中文 / 白話 / 在哪章）
const GlossaryTable = ({ rows }: { rows: string[][] }) => (
  <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '140px 1fr 2fr 80px', gap: 2, fontSize: 14, lineHeight: 1.45 }}>
    {['英文簡稱', '中文', '一句白話', '在哪章'].map((h, i) => (
      <div key={`h-${i}`} style={{ fontWeight: 700, color: accent, padding: '8px 10px' }}>{h}</div>
    ))}
    {rows.map((row, i) => row.map((cell, j) => (
      <div key={`r-${i}-${j}`} style={{ padding: '7px 10px', borderTop: '1px solid rgba(139,111,71,0.22)', fontWeight: j === 0 ? 700 : 400, color: j === 0 ? accent : 'inherit' }}>{cell}</div>
    )))}
  </div>
);

// P06a · 需求與決策 (17 詞)
const P06a: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '40px 60px', position: 'relative' }}>
    <Kicker>A.4 · 詞彙速查表（1/3）</Kicker>
    <PageH1 size={36}>需求與決策</PageH1>
    <GlossaryTable rows={[
      ['NFR', '非功能需求', '「做得多好」的量化標準（vs 功能需求是「做什麼」）', 'A.1'],
      ['SLA', '服務等級合約', '對外承諾（違反要賠錢）', 'A.5'],
      ['SLO', '服務等級目標', '對內目標（觸發改善）', 'A.5'],
      ['SLI', '服務等級指標', '實際量到的值', 'A.5'],
      ['ADR', '架構決策紀錄', '把「為何選 X」寫成文件存起來', 'A.3'],
      ['QPS', '每秒請求數', '系統流量單位（Queries Per Second）', 'A.6'],
      ['Latency', '延遲', '請求發出到收到回應的時間（毫秒）', 'A.1'],
      ['Throughput', '吞吐量', '系統單位時間能處理多少請求', 'A.6'],
      ['P50/P95/P99', '百分位數延遲', '排序後第 50/95/99% 名的延遲（看 P99 才能抓到慢請求）', 'A.1'],
      ['Error budget', '錯誤預算', '100% - SLO = 允許壞掉的時間（決策貨幣）', 'A.5'],
      ['RPO', '恢復點目標', '災難時最多容忍掉幾分鐘的資料', 'A.1'],
      ['RTO', '恢復時間目標', '災難後多久內必須恢復', 'A.1'],
      ['TCO', '總擁有成本', '機器 + 人員 + 移轉 + 機會成本（不只看 server 帳單）', 'B.1'],
      ['DAU', '日活躍用戶數', '每日多少使用者有來用過（容量估算的基數）', 'A.6'],
      ['Capacity Planning', '容量規劃', '估算系統撐多大流量、需多少資源', 'A.6'],
      ['Constraints', '約束', '預算/團隊/時程/法規/政治等不能違反的條件', 'A.9'],
      ['Trade-off', '取捨', '兩個好東西不能兼得，必須選一個犧牲另一個', 'A.10'],
    ]} />
    <Footer source='_source/braindump.md · 整本書術語匯整' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={6} total={10} />
      <BrandBar />
    </div></>
);

// P06b · 資料與一致性 (17 詞)
const P06b: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '40px 60px', position: 'relative' }}>
    <Kicker>A.4 · 詞彙速查表（2/3）</Kicker>
    <PageH1 size={36}>資料與一致性</PageH1>
    <GlossaryTable rows={[
      ['CAP', '一致性/可用性/分區', '分散式三選二定理（網路會壞，P 必選 → 在 C 和 A 之間取捨）', 'B.3'],
      ['PACELC', 'CAP 的延伸', '分區沒發生時，要在延遲 (L) 和一致性 (C) 取捨', 'B.3'],
      ['OLTP', '交易型資料庫', '處理一筆筆訂單/帳號（強一致、低延遲）', 'A.4'],
      ['OLAP', '分析型資料庫', '跑報表、做統計（高吞吐掃描、不需即時）', 'A.4'],
      ['Consistency', '一致性', '從寫入到讀到「全網看到一樣」的等級', 'B.5'],
      ['Strong / Eventual', '強/最終一致', '強 = 寫完馬上全網一致；Eventual = 最後會一致但中間可能不同步', 'B.5'],
      ['Sharding', '資料分片', '資料太大，拆到多台 DB（如 user_id 0-1M 在 A、1M-2M 在 B）', 'B.6'],
      ['Partitioning', '分區', '單表太大，切成多個小區塊（仍在同台 DB）', 'B.6'],
      ['Replication', '複製', '把資料複製到多台讀（讀放大 + HA）', 'B.6'],
      ['Cache-aside', '旁路快取', '讀的時候 cache miss 才去 DB 拿（最常見模式）', 'C.4'],
      ['Write-through', '寫穿快取', '寫的時候同時寫 cache 和 DB（強一致）', 'C.4'],
      ['Write-behind', '寫後快取', '先寫 cache，非同步寫 DB（高吞吐但容掉）', 'C.4'],
      ['Cache stampede', '快取雪崩', '熱 key 同時過期，瞬間打爆 DB', 'C.4'],
      ['Embedding', '向量化', '把文字 / 圖片變成數字向量（給 AI 算相似度）', 'Case 3'],
      ['Vector DB', '向量資料庫', '專存 embedding、按相似度查（pgvector/Pinecone）', 'B.10'],
      ['Chunk', '文件切塊', '把長文件切成小段才能 embed（RAG 必做）', 'Case 3'],
      ['Hybrid Search', '混合搜尋', '同時用關鍵字 + 向量（提升 RAG 召回率）', 'B.10'],
    ]} />
    <Footer source='_source/braindump.md · 整本書術語匯整' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={7} total={10} />
      <BrandBar />
    </div></>
);

// P06c · 可靠性與架構模式 (16 詞)
const P06c: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '40px 60px', position: 'relative' }}>
    <Kicker>A.4 · 詞彙速查表（3/3）</Kicker>
    <PageH1 size={36}>可靠性與架構模式</PageH1>
    <GlossaryTable rows={[
      ['SPOF', '單點故障', '系統裡「壞了就全死」的元件（架構審查專找這個）', 'C.8'],
      ['MTBF/MTTR', '平均故障間隔/修復時間', '系統可靠性指標', 'C.1'],
      ['Circuit Breaker', '斷路器', '下游死了不要繼續打它（避免雪崩）', 'C.5'],
      ['Bulkhead', '隔離艙', '把資源（如 thread pool）分隔，一個壞不影響全部', 'C.5'],
      ['Rate Limit', '限流', '限制每秒多少請求進來（防爆量）', 'C.5'],
      ['Retry', '重試', '失敗自動再試（要加 jitter 避免風暴）', 'C.5'],
      ['Timeout', '超時', '呼叫超過 X 秒就放棄（防慢呼叫拖死自己）', 'C.5'],
      ['Backpressure', '反壓', '下游慢時，上游主動放慢（避免 buffer 爆）', 'D.10'],
      ['Idempotency', '冪等性', '同操作做 1 次和 10 次結果一樣（重試安全）', 'D.9'],
      ['Saga', '補償事務', '跨服務的長事務模式（失敗時觸發補償）', 'D.4'],
      ['Event Sourcing (ES)', '事件溯源', '不存「目前狀態」存「所有變更事件」', 'D.4'],
      ['CQRS', '命令查詢分離', '讀模型和寫模型分開（讀大寫小時用）', 'D.4'],
      ['Outbox', '訊息可靠投遞', '寫 DB 同時寫 outbox 表，避免訊息掉', 'D.2'],
      ['RAG', '檢索增強生成', '把文件變成 AI 可查的東西（先 retrieve 再 generate）', 'Case 3'],
      ['MCP', 'Model Context Protocol', 'AI 連接外部資料/工具的標準介面', 'W.8'],
      ['BFF / WAF', '前端聚合層 / 防火牆', 'BFF 給前端用；WAF 擋攻擊', 'D.6/C.12'],
    ]} />
    <Footer source='_source/braindump.md · 整本書術語匯整' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={8} total={10} />
      <BrandBar />
    </div></>
);

const P07: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 70px', position: 'relative' }}>
    <Kicker>A.5 · 舊→新章節對照地圖</Kicker>
    <PageH1 size={42}>想深入時翻舊書</PageH1>
    <Table cols='1fr 1fr' head={['想深入的主題', '翻舊書哪本']} rows={[
      ['9 角色職涯地圖', 'software_develop_journey/ppt/02-pm ~ 10-devops-sre/'],
      ['協作衝突全 5 場景', 'software_develop_journey/ppt/11-collaboration/04_conflict_cases.md'],
      ['需求 & SLA 深挖', 'software_architect/ppt/02-requirements-sla/'],
      ['7 步流程細節', 'software_architect/ppt/03-process-app-types/'],
      ['完整技術棧矩陣', 'software_architect/ppt/04-tech-stack-data/'],
      ['*-ilities 12 個', 'software_architect/ppt/05-ilities/'],
      ['30 個設計模式全', 'software_architect/ppt/06-components-patterns/'],
      ['分散式 5 支柱完整', 'software_architect/ppt/07-system-architecture/'],
      ['微服務 / ES / CQRS 深度', 'software_architect/ppt/08-advanced-patterns/'],
    ]} fontSize={15} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 19, color: muted, fontStyle: 'italic', animationDelay: '0.8s' }}>
      <strong>新書的角色</strong>：速成工作手冊。<strong>舊書的角色</strong>：深度參考。
    </div>
    <Footer source='整體規劃' />
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={9} total={10} />
      <BrandBar />
    </div></>
);

const P08: Page = () => (
  <><AnimStyle /><div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
    <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 160, fontWeight: 800, margin: 0 }}>完</h1>
    <h2 className='osd-anim-fade-up' style={{ fontSize: 50, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245,241,232,0.85)', animationDelay: '0.15s' }}>讀完了</h2>
    <div className='osd-stagger' style={{ marginTop: 56, fontSize: 28, lineHeight: 1.7, color: '#F5F1E8' }}>
      <div style={{ marginBottom: 6 }}>帶走這四句：</div>
      <div><strong>AI 是 commodity，判斷是稀缺</strong></div>
      <div><strong>先 ADR，再 code</strong></div>
      <div><strong>Context 給法 &gt; prompt 詞</strong></div>
      <div><strong>資深 = 把問題拆得 AI 做得了</strong></div>
    </div>
    <div className='osd-anim-fade-up' style={{ marginTop: 48, fontSize: 22, color: 'rgba(245,241,232,0.7)', animationDelay: '0.8s' }}>
      下一步：去找一個真實系統，從 W.2 的 5 段 context 開始練。
    </div>
  
      <Breadcrumb part='附錄' chapter='速查 + 提示詞庫' />
      <PageNum n={10} total={10} />
      <BrandBar />
    </div></>
);

export const meta: SlideMeta = { title: '附錄 · 速查 + 提示詞庫' };
export default [P01, P02, P03, P04, P05, P06a, P06b, P06c, P07, P08] satisfies Page[];
