import * as React from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import img_hero from './assets/09_ai_workflow_hero.png';
import img_director from './assets/09_director_mindset.png';
import img_5uses from './assets/W_5_uses.png';
import img_context from './assets/W_context_5parts.png';
import img_poc from './assets/W_poc_loop.png';
import logoDark from '../../assets/branding/logo-dark.png';
import logoLight from '../../assets/branding/logo-light.png';

export const design: DesignSystem = {
  palette: { bg: '#F5F1E8', text: '#2A2520', accent: '#D97757' },
  fonts: { display: '"Noto Serif TC", Georgia, serif', body: '"Noto Sans TC", system-ui, sans-serif' },
  typeScale: { hero: 180, body: 38 },
  radius: 8,
};

const muted = '#8B6F47', subtle = 'rgba(42, 37, 32, 0.55)', accent = '#D97757', ok = '#5B9770';

const animationCSS = `
@keyframes osd-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes osd-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes osd-slide-in-right { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes osd-scale-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
.osd-anim-fade-up { animation: osd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-fade-in { animation: osd-fade-in 0.6s ease-out both; }
.osd-anim-slide-right { animation: osd-slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-anim-scale-in { animation: osd-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > * { animation: osd-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.osd-stagger > *:nth-child(1) { animation-delay: 0.05s; } .osd-stagger > *:nth-child(2) { animation-delay: 0.10s; }
.osd-stagger > *:nth-child(3) { animation-delay: 0.15s; } .osd-stagger > *:nth-child(4) { animation-delay: 0.20s; }
.osd-stagger > *:nth-child(5) { animation-delay: 0.25s; } .osd-stagger > *:nth-child(6) { animation-delay: 0.30s; }
.osd-stagger > *:nth-child(7) { animation-delay: 0.35s; } .osd-stagger > *:nth-child(8) { animation-delay: 0.40s; }
`;
const AnimStyle = () => <style>{animationCSS}</style>;
const fill = { width: '100%', height: '100%', fontFamily: 'var(--osd-font-body)', background: 'var(--osd-bg)', color: 'var(--osd-text)' } as const;

const Kicker = ({ children }: { children: React.ReactNode }) => <div className='osd-anim-fade-up' style={{ fontSize: 24, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{children}</div>;
const Footer = ({ source }: { source: string }) => <div className='osd-anim-fade-in' style={{ position: 'absolute', left: 100, bottom: 50, fontSize: 16, color: subtle, fontStyle: 'italic', animationDelay: '0.5s' }}>{source}</div>;
const PageH1 = ({ children, size = 50 }: { children: React.ReactNode; size?: number }) => <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: size, fontWeight: 800, lineHeight: 1.15, margin: '12px 0 20px', animationDelay: '0.1s' }}>{children}</h1>;

const ChapterDivider = ({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) => (
  <><AnimStyle /><div style={{ ...fill, background: '#2A2520', color: '#F5F1E8', display: 'grid', gridTemplateColumns: image ? '60% 40%' : '1fr', alignItems: 'center', position: 'relative' }}>
    <div style={{ padding: '0 100px' }}>
      <div className='osd-anim-fade-up' style={{ fontSize: 26, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>{eyebrow}</div>
      <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 130, fontWeight: 800, lineHeight: 1.05, margin: '36px 0 0', animationDelay: '0.15s' }}>{title}</h1>
      {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 42, fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,241,232,0.6)', margin: '24px 0 0', animationDelay: '0.3s' }}>{subtitle}</h2> : null}
    </div>
    {image ? <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 40, animationDelay: '0.2s' }}><img src={image} alt='' style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /></div> : null}
  </div></>
);
const SectionEnd = ({ title, subtitle, next }: { title: string; subtitle?: string; next?: string }) => (
  <><AnimStyle /><div style={{ ...fill, background: accent, color: '#F5F1E8', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 200px', position: 'relative' }}>
    <h1 className='osd-anim-fade-up' style={{ fontFamily: 'var(--osd-font-display)', fontSize: 130, fontWeight: 800, margin: 0 }}>{title}</h1>
    {subtitle ? <h2 className='osd-anim-fade-up' style={{ fontSize: 44, fontStyle: 'italic', fontWeight: 400, margin: '24px 0 0', color: 'rgba(245,241,232,0.85)', animationDelay: '0.15s' }}>{subtitle}</h2> : null}
    {next ? <p className='osd-anim-fade-up' style={{ fontSize: 28, marginTop: 56, color: '#F5F1E8', opacity: 0.9, animationDelay: '0.3s' }}>→ {next}</p> : null}
  </div></>
);
const PromptBlock = ({ children }: { children: React.ReactNode }) => <div className='osd-anim-fade-up' style={{ background: '#2A2520', color: '#F5F1E8', padding: '18px 24px', borderRadius: 8, fontFamily: 'IBM Plex Mono, Menlo, monospace', fontSize: 17, lineHeight: 1.55, whiteSpace: 'pre-wrap', animationDelay: '0.2s' }}>{children}</div>;
const Table = ({ cols, head, rows, fontSize = 17 }: { cols: string; head: string[]; rows: string[][]; fontSize?: number }) => (
  <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: cols, gap: 3, fontSize, lineHeight: 1.5 }}>
    {head.map((h, i) => <div key={`h-${i}`} style={{ fontWeight: 700, color: accent, padding: '9px 12px' }}>{h}</div>)}
    {rows.map((row, i) => row.map((cell, j) => <div key={`r-${i}-${j}`} style={{ padding: '9px 12px', borderTop: '1px solid rgba(139,111,71,0.25)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</div>))}
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
    <BrandBar light />
      <BrandBar light />
      </div>
  </>
);

const NoviceBadge = () => (
  <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 14, background: 'rgba(91, 151, 112, 0.15)', color: ok, fontSize: 15, fontWeight: 600 }}>🐤 新手友善 · 老手可跳 →</span>
);
const TermCard = ({ name, en, def }: { name: string; en: string; def: string }) => (
  <div style={{ padding: '12px 16px', background: 'rgba(217, 119, 87, 0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 6 }}>
    <div style={{ fontSize: 19, fontWeight: 700, color: accent }}>{name} <span style={{ fontSize: 13, color: muted, fontWeight: 500 }}>· {en}</span></div>
    <div style={{ fontSize: 15, lineHeight: 1.5, marginTop: 4 }}>{def}</div>
  </div>
);

const P01: Page = () => <ChapterDivider eyebrow='PART · 3' title='AI 實戰工作流' subtitle='把 Claude Code 變成你的架構助理' image={img_hero} />;

const P02: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>OVERVIEW · YOU WILL TAKE AWAY</Kicker>
    <PageH1>讀完 Part 3，你能：</PageH1>
    <ul className='osd-stagger' style={{ fontSize: 24, lineHeight: 1.85, paddingLeft: 28 }}>
      <li>列出 Claude Code 在系統設計的 5 種高槓桿用法</li>
      <li>給 AI 結構化 context（不再「請幫我寫個 X」）</li>
      <li>用 ADR 對話模板生成可簽核的決策文件</li>
      <li>跑 PoC → 驗證 → 迭代的完整閉環</li>
      <li>識別 AI 容易出錯的 7 種情境</li>
      <li>把 code review 變成 AI 對話</li>
      <li>組裝個人「AI 架構師工作台」</li>
    </ul>
    <div className='osd-anim-fade-up' style={{ marginTop: 32, fontSize: 22, fontStyle: 'italic', color: muted, animationDelay: '0.6s' }}>
      <strong>金句</strong>：不要問 AI 能不能做，要問你能不能把 context 餵清楚。
    </div>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={1} total={13} />
      <BrandBar />
    </div></>
);

// P02b · 本章新術語
const P02b: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, padding: '40px 70px', position: 'relative' }}>
      <div className='osd-anim-fade-up' style={{ marginBottom: 10 }}><NoviceBadge /></div>
      <Kicker>本章新術語 · 6 個詞</Kicker>
      <PageH1 size={42}>學 AI 工作流前的詞彙</PageH1>
      <div className='osd-stagger' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <TermCard name='Context' en='上下文' def='你給 AI 的所有資訊（背景 + 約束 + NFR + 期望）。給法決定 AI 答得好不好。' />
        <TermCard name='Prompt' en='提示詞' def='你給 AI 的指令文字。好的 prompt 是「結構」不是「魔法詞」。' />
        <TermCard name='PoC' en='Proof of Concept' def='概念驗證 — 寫個最小範例證明「這個方案行得通」。' />
        <TermCard name='MCP' en='Model Context Protocol' def='AI 連接外部資料 / 工具的標準介面（讓 Claude 能讀你的 GitHub、DB 等）。' />
        <TermCard name='Subagent' en='子代理' def='讓 AI 「召喚另一個專長 AI」幫忙（code-reviewer、security-auditor）。' />
        <TermCard name='Eval set' en='評估集' def='一組標準測試題，用來驗證 AI 答對的比例。換模型時必跑。' />
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 16, color: muted, fontStyle: 'italic', animationDelay: '0.6s' }}>📖 完整定義在 90-appendix · A.4 詞彙速查表</div>
    
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={2} total={13} />
      <BrandBar />
    </div>
  </>
);

const P03: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_5uses} alt='Claude Code 5 high-leverage uses' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>W.1 · HIGH LEVERAGE</Kicker>
        <PageH1 size={36}>5 種高槓桿用法</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          1. <strong>ADR 生成</strong> · 10×<br/>
          2. <strong>架構審查</strong> · 5×<br/>
          3. <strong>PoC 加速</strong> · 20× ⭐<br/>
          4. <strong>文檔同步</strong> · 8×<br/>
          5. <strong>選型辯論</strong> · 4×
        </div>
        <div style={{ marginTop: 14 }}><Mantra>最高槓桿：PoC 加速。最危險：ADR 偏執</Mantra></div>
      </div>
      <Breadcrumb part='Part 3' chapter='AI 工作流' section='W.1 · 5 種用法' />
      <PageNum n={3} total={12} />
      <BrandBar />
    </div>
  </>
);

const P04: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_context} alt='Context 5 parts structure' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>W.2 · Context 結構</Kicker>
        <PageH1 size={36}>5 段堆疊成 prompt</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.65 }}>
          <strong>1. Goal</strong> · 業務目標<br/>
          <strong>2. Constraints</strong> · 預算 / 團隊<br/>
          <strong>3. NFR</strong> · 量化指標<br/>
          <strong>4. Existing</strong> · 現有限制<br/>
          <strong>5. Asks</strong> · 期望輸出
        </div>
        <div style={{ marginTop: 14 }}><Mantra>好的 prompt 結構 &gt; 好的 prompt 詞</Mantra></div>
      </div>
      <Breadcrumb part='Part 3' chapter='AI 工作流' section='W.2 · Context 5 段' />
      <PageNum n={4} total={12} />
      <BrandBar />
    </div>
  </>
);

const P05: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>W.3 · ADR DIALOGUE · 三輪法</Kicker>
    <PageH1>ADR 對話模板</PageH1>
    <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PromptBlock><strong style={{ color: accent }}>Round 1 · 發散</strong>{'\n'}基於 [W.2 五段 context]，列出 4 個候選方案。{'\n'}每個給：核心思路 / 主要優點 / 主要缺點 / 適用條件。</PromptBlock>
      <PromptBlock><strong style={{ color: accent }}>Round 2 · 收斂</strong>{'\n'}針對 [方案 A vs B]，做量化 trade-off 表。{'\n'}加權打分 + 推薦 + 為何不選最高分（如有 override）。</PromptBlock>
      <PromptBlock><strong style={{ color: accent }}>Round 3 · 落定</strong>{'\n'}基於 Round 2，輸出完整 ADR + Open Questions ≥ 5 個 + stakeholders。</PromptBlock>
    </div>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={5} total={13} />
      <BrandBar />
    </div></>
);

const P06: Page = () => (
  <><AnimStyle />
    <div style={{ ...fill, display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', padding: '40px 50px 80px', position: 'relative' }}>
      <div className='osd-anim-scale-in' style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <img src={img_poc} alt='PoC iteration loop' style={{ maxWidth: '100%', maxHeight: '90%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingLeft: 24 }}>
        <Kicker>W.4 · PoC 閉環</Kicker>
        <PageH1 size={36}>7 步迭代驗證</PageH1>
        <div style={{ fontSize: 15, lineHeight: 1.6 }}>
          1. 寫 ADR (你)<br/>
          2. AI 生 PoC<br/>
          3. 跑通 happy path<br/>
          4. AI 補 edge case<br/>
          5. 壓測驗 NFR<br/>
          6. 假設破滅<br/>
          7. 改 ADR 回 step 2
        </div>
        <div style={{ marginTop: 14 }}><Mantra>PoC 的價值是驗證假設，不是拿到 code</Mantra></div>
      </div>
      <Breadcrumb part='Part 3' chapter='AI 工作流' section='W.4 · PoC 閉環' />
      <PageNum n={6} total={12} />
      <BrandBar />
    </div>
  </>
);

const P07: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>W.5 · WORKFLOW · 別讓 doc 過時</Kicker>
    <PageH1>文檔 / 圖 / 測試的 AI 生成流程</PageH1>
    <Table cols='160px 1fr' head={['場景', 'Prompt']} rows={[
      ['API doc', '根據 @api.go 生成 OpenAPI 3.1 spec + curl 範例'],
      ['架構圖', '根據 @services/ 結構生成 PlantUML 元件圖'],
      ['序列圖', '根據 @handler.go 的 createOrder() 生成序列圖'],
      ['ER 圖', '根據 @migrations/ 生成 PlantUML ER 圖'],
      ['單元測試', '根據 @service.go 補 5 個 edge case 測試'],
      ['changelog', '根據 git log 過去 7 天生成 changelog'],
      ['runbook', '根據 @alert.yaml 寫對應 runbook'],
      ['README', '根據專案結構生成 quickstart + 架構說明'],
    ]} fontSize={17} />
    <div className='osd-anim-fade-up' style={{ marginTop: 16, fontSize: 21, fontStyle: 'italic', color: muted, animationDelay: '0.8s' }}>
      <strong>金句</strong>：好的文檔不是「寫」出來的，是「同步」出來的。
    </div>
    <Footer source='_source/braindump.md · §AI 可以代勞的工作' />
  
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={7} total={13} />
      <BrandBar />
    </div></>
);

const P08: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>W.6 · 7 種 AI 失敗模式</Kicker>
    <PageH1>AI 容易出錯的 7 種情境</PageH1>
    <Table cols='40px 1fr 1fr 1fr' head={['#', '情境', '症狀', '對策']} rows={[
      ['1', '編 API', '.find_by_xxx() 方法不存在', '跑一次再信'],
      ['2', '不知公司約束', '推薦不能用的 vendor', 'context 寫明約束'],
      ['3', '縮小問題範圍', '漏掉 edge case 才答', '強制至少 10 case'],
      ['4', '反向偏見', '避免推薦最佳以免顯武斷', '明說「給最佳」'],
      ['5', '不敏感成本/延遲', '推薦昂貴方案', 'context 加 budget/latency'],
      ['6', '不會處理政治', '不知「老闆討厭 X」', '自己擋掉'],
      ['7', '不主動問', '沒澄清就答', '設定「先問 3 題再答」'],
    ]} fontSize={17} />
    <Footer source='_source/braindump.md · §AI 工作流的 7 個常見地雷' />
  
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={8} total={13} />
      <BrandBar />
    </div></>
);

const P09: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '60px 100px', position: 'relative' }}>
    <Kicker>W.7 · CODE REVIEW WITH AI</Kicker>
    <PageH1>把 diff 變成架構審查對話</PageH1>
    <PromptBlock>{`Prompt（review 自己的 PR 前）:
請審查這個 PR：@diff（貼 git diff）

從這 5 個角度評：
1. 架構：違反分層 / 越界依賴 / 引入新模式但沒寫 ADR？
2. 資料：N+1 query / 缺索引 / schema 改動向後不相容？
3. 可靠性：缺 timeout / retry / idempotency / 錯誤處理？
4. 可觀測：缺 metric / log / trace / alert？
5. 安全：SQL injection / secret / IDOR / 缺 ACL？

每個發現給：嚴重度（P0/P1/P2/P3）+ 證據（檔案:行）+ 修法建議`}</PromptBlock>
    <Footer source='_source/braindump.md · §AI 工作流的五種高槓桿用法' />
  
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={9} total={13} />
      <BrandBar />
    </div></>
);

const P10: Page = () => (
  <><AnimStyle /><div style={{ ...fill, padding: '50px 80px', position: 'relative' }}>
    <Kicker>W.8 · TOOLING · 你的 stack</Kicker>
    <PageH1>個人「AI 架構師工作台」</PageH1>
    <Table cols='160px 1fr 1fr' head={['層', '工具建議', '用途']} rows={[
      ['CLI / IDE', 'Claude Code, Cursor, Continue', '主要對話介面'],
      ['MCP servers', 'github, filesystem, postgres, slack', '讓 AI 讀真實系統狀態'],
      ['Subagents', 'code-reviewer, security-auditor', '專業領域助理'],
      ['Prompt 庫', 'git repo of .md templates', '標準化常用對話'],
      ['ADR 倉', '/docs/adr/*.md', '決策歷史，可餵 AI'],
      ['CLAUDE.md', '專案的 AI 工作合約', '約束 AI 行為'],
      ['Eval set', '30 道測試題 / repo', '換 model / prompt 時驗證'],
    ]} fontSize={18} />
    <div className='osd-anim-fade-up' style={{ marginTop: 18, fontSize: 21, fontStyle: 'italic', color: muted, animationDelay: '0.8s' }}>
      <strong>ROI</strong>：頭 2 週投入 10 hour 建好，往後每週省 5+ hour。
    </div>
    <Footer source='_source/braindump.md' />
  
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={10} total={13} />
      <BrandBar />
    </div></>
);

const P11: Page = () => (
  <><AnimStyle /><div style={{ ...fill, display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'center', position: 'relative' }}>
    <div style={{ padding: '0 80px' }}>
      <Kicker>W.9 · MINDSET · 心態轉變</Kicker>
      <PageH1 size={50}>從「會用 AI」到「會指揮 AI」</PageH1>
      <div className='osd-stagger' style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 19, lineHeight: 1.55 }}>
        {[
          ['L1 · 試用', 'AI 是工具'],
          ['L2 · 加速', 'AI 是助理'],
          ['L3 · 流程化', 'AI 是同事'],
          ['L4 · 指揮', 'AI 是「實習生團隊」'],
          ['L5 · 共生', 'AI 是「執行單位」，你是「決策者」'],
        ].map(([level, role]) => (
          <div key={level} style={{ display: 'flex', gap: 16, padding: '10px 16px', background: 'rgba(217, 119, 87, 0.08)', borderLeft: `4px solid ${accent}`, borderRadius: 4 }}>
            <strong style={{ minWidth: 130, color: accent }}>{level}</strong>
            <span>{role}</span>
          </div>
        ))}
      </div>
      <div className='osd-anim-fade-up' style={{ marginTop: 20, fontSize: 20, fontStyle: 'italic', color: muted, animationDelay: '0.8s' }}>
        <strong>金句</strong>：資深 = 把問題拆得 AI 做得了。
      </div>
    </div>
    <div className='osd-anim-slide-right' style={{ height: '100%', display: 'flex', alignItems: 'center', padding: 40, animationDelay: '0.2s' }}>
      <img src={img_director} alt='' style={{ maxWidth: '100%', maxHeight: '80%', objectFit: 'contain' }} />
    </div>
    <Footer source='_source/braindump.md · §核心金句' />
  
      <Breadcrumb part='Part 3' chapter='AI 實戰工作流' />
      <PageNum n={11} total={13} />
      <BrandBar />
    </div></>
);

const P12: Page = () => (
  <ThreeTakeaways chapter='Part 3 · AI 工作流' lines={[
    'Context 給法 > prompt 詞',
    'PoC 的價值是驗證假設，不是拿到 code',
    '資深 = 把問題拆得 AI 做得了',
  ]} />
);

export const meta: SlideMeta = { title: 'Part 3 · AI 實戰工作流' };
export default [P01, P02, P02b, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12] satisfies Page[];
