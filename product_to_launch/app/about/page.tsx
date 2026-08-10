import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About · 關於落地圖鑑",
  description: "讓初學者理解 SDLC，並把正確文件工作包帶進 Coding Agent。收錄十二個角色、六個階段與五十八項交付物。",
  alternates: {
    canonical: "/about/",
    languages: { "zh-Hant": "/about/", "x-default": "/about/" },
  },
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
              <h1>看懂 SDLC，再把工作交給 Agent。</h1>
              <p className="hook">
                由桑尼資料科學 Lab 整理發行。十二個角色、六個 SDLC 階段、五十八項交付物。
                每張卡都有學習模式與專案實戰，網站負責教學，Coding Agent 負責讀取專案並產出文件。
              </p>
            </div>
          </div>
        </section>

        <section className="detail-body">
          <div className="container">
            <article>
              <h2>為什麼做這個</h2>
              <p>
                市面上的產品框架知識庫已經很多了。但工程團隊真正需要的，從來不是「更多框架」，
                而是一條<strong>可走完的路</strong>。從一個商業假設，走到一個凌晨三點還活著的系統。
              </p>
              <p>
                落地圖鑑把工具放回它該被使用的位置，不依附特定方法論、不堆砌名詞。
                學習模式解釋用途、責任、大綱與案例；專案實戰則把文件關聯和工作包交給 Coding Agent。
              </p>

              <h2>給誰用的</h2>
              <ul>
                <li><strong>產品經理 / Product Owner</strong> — 想知道下一步該交什麼給工程、怎麼開規格才能跑得動</li>
                <li><strong>新晉架構師 / Tech Lead</strong> — 需要一份可反覆核對的決策清單，避免漏交付物</li>
                <li><strong>想往架構走的工程師</strong> — 想看 PM / Architect / SRE 各自負責什麼、邊界在哪</li>
                <li><strong>正在寫 ADR / Runbook / SLO 的人</strong> — 直接抓對應卡片，看四個問題的標準答案結構</li>
              </ul>
              <p>
                如果你正在會議當下找「該怎麼開口」、Slack 對話裡找「該交什麼」、
                或寫文件時找「這份應該長什麼樣」——這份地圖就是為你寫的。
              </p>

              <h2>怎麼確保品質</h2>
              <p>
                每張卡片的決策框架、責任邊界、AI 加速範例，皆由具備產品、架構、SRE 實戰經驗的編輯團隊整理，
                並對齊業界公開實踐。<strong>內容不寫教科書定義、不堆名詞</strong>，只給你能在當下拿來執行的東西。
              </p>

              <h2>關於桑尼資料科學 Lab</h2>
              <p>
                <strong>桑尼資料科學（Sunny DataScience）</strong>是專注於 AI 第二專長的線上學習平台，
                提供從入門到進階的實戰課程，主題涵蓋 Prompt Engineering、AI 工作流、自動化 PoC、
                以及主流 AI 助理（如 Claude Code、Cursor）在工程任務上的深度應用。
              </p>
              <p>
                <strong>SDS Lab</strong> 是平台底下的研發單位，把教材內容重整為對外公開的長期內容站。
                <strong>落地圖鑑</strong>是 Lab 發行的首個內容站——將角色全景、決策框架、AI 加速範例
                整合成一份可走完的工程地圖。
              </p>

              <div className="cta-strip">
                <div>
                  <strong>想看完整的 AI 工作流課程？</strong>
                  <p>主站提供結構化的學習路徑與實戰案例，部分章節開放免費試讀。</p>
                </div>
                <a
                  href="https://sunnydatascience.com/"
                  target="_blank"
                  rel="noopener"
                  className="cta-primary"
                >
                  前往桑尼資料科學
                </a>
              </div>

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

              <h2>授權與引用</h2>
              <p>MIT License · © 2026 · 桑尼資料科學 Lab 出品</p>
              <p style={{ fontSize: 13, color: "var(--ink-mute)" }}>
                文字、圖片與排版為原創內容。內文中提及之第三方產品、標準與公司名稱
                （如 AI 助理、SLO 框架、編程工具等）均屬其各自所有者，僅作描述性引用，
                與本站不存在贊助、合作或背書關係。
              </p>
            </article>
            <aside>
              <section>
                <h4>聯絡</h4>
                <p>本站是桑尼資料科學 Lab 對外開源的內容產品。Issue 與 PR 歡迎透過 GitHub 提交。</p>
              </section>
              <section>
                <h4>版本</h4>
                <p className="mono">Launch Atlas v1.0 · 2026 · MIT</p>
              </section>
              <section>
                <h4>主站</h4>
                <p>
                  <a href="https://sunnydatascience.com/" target="_blank" rel="noopener">
                    sunnydatascience.com
                  </a>
                  <br />
                  <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>AI 第二專長課程平台</span>
                </p>
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
