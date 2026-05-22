import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About · 關於落地圖鑑",
  description: "為什麼做這份地圖、引用了哪些來源、設計理念是什麼。",
};

export default function AboutPage() {
  return (
    <>
      <Rail active="about" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">About</span>
                <span className="tag">v1.0 · 2026</span>
              </div>
              <h1>為什麼做這份地圖。</h1>
              <p className="hook">
                市面上的 PM 框架知識庫已經很多了。但我們需要的不是「更多框架」，而是一條
                可走完的路 — 從一個商業假設，走到一個凌晨三點還活著的系統。
              </p>
            </div>
          </div>
        </section>

        <section className="detail-body">
          <div className="container">
            <article>
              <h2>設計理念</h2>
              <p>
                落地圖鑑（Launch Atlas）是從 <strong>pm.chiba.tw</strong> 的「精選框架知識庫」哲學
                出發，但我們不只列工具 — 而是把工具放回它「該被使用」的位置上。
              </p>
              <p>
                每張交付物卡都回答四個問題：<strong>解決什麼問題、誰負責、何時用、AI 怎麼加速</strong>。
                這樣你不只知道有哪些工具，還知道什麼時候該停下來，把工具收進口袋。
              </p>

              <h2>引用來源</h2>
              <p>本站內容由以下姊妹專案整合而成，每張卡片底部都有 <code>{`> Source: ...`}</code> 行：</p>
              <ul>
                <li><strong>軟體開發旅程</strong>（<code>software_develop_journey/</code>）— 14 章 384 頁，9 角色全景與 SDLC 地圖</li>
                <li><strong>架構師藍圖</strong>（<code>software_architect/</code>）— 10 章深度教材，Why/How/Trade-off 三段式</li>
                <li><strong>系統設計實戰</strong>（<code>system_design/</code>）— 7 章 48 主題，34 份 PDF 原始教材</li>
                <li><strong>AI 時代速成</strong>（<code>ai_native_system_design/</code>）— 11 章 200 頁，Claude Code 工作流</li>
                <li><strong>研究報告</strong>（<code>deep-research-report.md</code>）— 角色 RACI、交付物清單、三 Flow 並行</li>
                <li><strong>Process Map</strong>（<code>process_map/index.html</code>）— DAG 互動流程地圖</li>
              </ul>

              <h2>視覺系統</h2>
              <p>
                配色沿用既有 process_map 的 <strong>Architect's Blueprint</strong> 美學：深墨 <code>#0a0e14</code>、
                修正橙 <code>#ff6a1a</code>、blueprint cyan <code>#6dd5ed</code>、米白紙 <code>#f5f1e8</code>。
                深墨 hero 用於章節分隔，米白紙用於主要內容區。
              </p>
              <p>
                字體：<strong>Instrument Serif</strong>（標題襯線）、<strong>Geist</strong>（介面）、
                <strong>JetBrains Mono</strong>（資料與標籤）。
                所有 hero 圖片由 GPT-image-2 生成（high quality, 1536×1024）。
              </p>

              <h2>三個承諾</h2>
              <ol>
                <li><strong>不背名詞，學決策</strong> — 每張卡都回答「解決什麼、代價、不該用」</li>
                <li><strong>Why / How / Trade-off</strong> — 任何技術都能用這三段拆解</li>
                <li><strong>AI 加速三問</strong> — AI 能加速哪一步？哪一步必須留給人？人在這一步的判斷依據是什麼？</li>
              </ol>

              <h2>不做的事</h2>
              <ul>
                <li>不做評論、搜尋、CMS（v2 再加）</li>
                <li>不做 i18n 多語切換（中英混排，但路由僅一套）</li>
                <li>不教 Linus 沒實作的東西 — 凡事都要能跑得起來</li>
              </ul>

              <h2>授權</h2>
              <p>MIT License · © 2026 · Part of System Design All-in-One</p>

              <div className="source">deep-research-report.md, software_develop_journey/process_map/index.html, software_architect/, ai_native_system_design/</div>
            </article>
            <aside>
              <section>
                <h4>聯絡</h4>
                <p>本站是 System Design All-in-One 倉庫的一部分。Issue 與 PR 歡迎透過母倉庫提交。</p>
              </section>
              <section>
                <h4>版本</h4>
                <p className="mono">Launch Atlas v1.0 · 2026 · MIT</p>
              </section>
              <section>
                <h4>姊妹專案</h4>
                <ul>
                  <li><a href="../software_develop_journey/">軟體開發旅程</a></li>
                  <li><a href="../software_architect/">架構師藍圖</a></li>
                  <li><a href="../system_design/">系統設計實戰</a></li>
                  <li><a href="../ai_native_system_design/">AI 時代速成</a></li>
                </ul>
              </section>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
