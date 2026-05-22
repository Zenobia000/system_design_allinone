import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About · 關於落地圖鑑",
  description: "為什麼做這份地圖、設計理念是什麼、誰會用到。",
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

              <h2>內容怎麼來的</h2>
              <p>
                本站內容濃縮自一座完整的系統設計知識庫——四本互補的講義：
                <strong>軟體開發旅程</strong>（9 角色全景）、<strong>架構師藍圖</strong>（Why/How/Trade-off）、
                <strong>系統設計實戰</strong>（48 主題技術速查）、<strong>AI 時代速成</strong>（Claude Code 工作流）。
              </p>
              <p>
                每張交付物卡片背後都有對應的教材章節支撐，但你不需要先讀完那 1500 頁。
                這份地圖就是教材的<strong>口袋版</strong>——讓你能在會議當下、Slack 對話中、或寫
                ADR 的此刻，快速找到「下一步該做什麼、誰負責、AI 怎麼加速」。
              </p>

              <h2>視覺系統</h2>
              <p>
                採 <strong>Architect&apos;s Blueprint</strong> 美學：深墨 <code>#0a0e14</code>、
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
                <h4>延伸閱讀</h4>
                <ul>
                  <li>軟體開發旅程</li>
                  <li>架構師藍圖</li>
                  <li>系統設計實戰</li>
                  <li>AI 時代速成</li>
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
