import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About · 關於落地圖鑑",
  description: "落地圖鑑是桑尼資料科學 Lab 的免費實驗品 — 把 1500 頁系統設計教材濃縮成可帶走的口袋地圖。",
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
                <span className="tag accent">About · Lab Product</span>
                <span className="tag">v1.0 · 2026</span>
              </div>
              <h1>落地圖鑑是 SDS Lab 的免費實驗品。</h1>
              <p className="hook">
                把桑尼資料科學的教材濃縮成可帶走的口袋地圖 — 從一個假設，走到一座可運維的系統。
                這份地圖免費、開源、可離線開。
              </p>
            </div>
          </div>
        </section>

        <section className="detail-body">
          <div className="container">
            <article>
              <h2>為什麼做這個</h2>
              <p>
                市面上的 PM 框架知識庫已經很多了。但我們需要的不是「更多框架」，而是一條
                <strong>可走完的路</strong> — 從一個商業假設，走到一個凌晨三點還活著的系統。
              </p>
              <p>
                落地圖鑑（Launch Atlas）從 <strong>pm.chiba.tw</strong> 的精選框架知識庫
                哲學出發，但我們不只列工具 — 而是把工具放回它「該被使用」的位置上。每張交付物卡
                都回答四個問題：<strong>解決什麼問題、誰負責、何時用、AI 怎麼加速</strong>。

              </p>

              <h2>內容怎麼來的</h2>
              <p>
                本站內容濃縮自一座完整的系統設計知識庫 — 四本互補的講義：
                <strong>軟體開發旅程</strong>（9 角色全景）、<strong>架構師藍圖</strong>（Why/How/Trade-off）、
                <strong>系統設計實戰</strong>（48 主題技術速查）、<strong>AI 時代速成</strong>（Claude Code 工作流）。
              </p>
              <p>
                每張交付物卡片背後都有對應的教材章節支撐，但你不需要先讀完那 1500 頁。
                這份地圖就是教材的<strong>口袋版</strong> — 讓你能在會議當下、Slack 對話中、
                或寫 ADR 的此刻，快速找到「下一步該做什麼、誰負責、AI 怎麼加速」。
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

              <h2>關於桑尼資料科學 Lab</h2>
              <p>
                <strong>桑尼資料科學（Sunny DataScience）</strong>是一個專注於 AI 第二專長的線上學習平台 —
                從入門到進階的實戰課程，500+ 學員、15+ 門課，覆蓋 Prompt Engineering、Claude Code、AI 工作流、
                自動化 PoC 等主題。
              </p>
              <p>
                <strong>SDS Lab</strong> 是平台底下的研發與實驗單位，定期把教材內容拆解成開源免費的內容產品 —
                <strong>落地圖鑑</strong> 是 Lab 首個對外釋出的長期內容站，把講義裡的角色全景、決策框架、AI prompt
                例子整合成一張可走完的地圖。
              </p>
              <p>
                如果這份地圖對你有用，主站還有更深入的：完整 SDLC 工作流、Claude Code 進階心法、
                每月直播 office hours、實戰案例 deep-dive。
              </p>

              <div className="cta-strip">
                <div>
                  <strong>想學完整 AI 工作流？</strong>
                  <p>主站有 15+ 門課、500+ 學員、98% 滿意度。免費試讀部分章節。</p>
                </div>
                <a
                  href="https://sunnydatascience.com/"
                  target="_blank"
                  rel="noopener"
                  className="cta-primary"
                >
                  探索桑尼資料科學 <span className="arrow">↗</span>
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

              <h2>授權</h2>
              <p>MIT License · © 2026 · 桑尼資料科學 Lab 出品</p>
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
                    sunnydatascience.com ↗
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
