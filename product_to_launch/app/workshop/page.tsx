import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import WorkshopPathway from "@/components/WorkshopPathway";

export const metadata: Metadata = {
  title: "15 卡核心學習路徑 · Workshop",
  description: "以專案底稿為共同起點，依 15 張核心卡理解 SDLC；實際專案則依不確定性選擇需要的文件。",
  alternates: {
    canonical: "/workshop/",
    languages: { "zh-Hant": "/workshop/", "x-default": "/workshop/" },
  },
};

export default function WorkshopPage() {
  return (
    <>
      <Rail active="workshop" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">Workshop</span>
                <span className="tag">15 cards · 6 stages</span>
              </div>
              <h1>15 卡核心學習路徑</h1>
              <p className="hook">
                這條路徑是用來理解完整 SDLC 的課程順序，不是實際專案必須逐張完成的文件流水線。
                學習時依序建立全貌；進入專案時，再依目前最大的未知選擇文件並交給 Coding Agent。
              </p>
            </div>
          </div>
        </section>

        <section className="detail-body">
          <div className="container">
            <article>
              <WorkshopPathway />

              <h2 style={{ marginTop: 48 }}>怎麼跟這份路徑學</h2>
              <ol>
                <li>第一次學習可從第 1 張開始，依序建立角色、階段與文件關聯的全貌</li>
                <li>點「前往卡片」，使用<strong>學習模式</strong>閱讀大綱、範本與 SmartTrip 案例</li>
                <li>真的要在專案產出時，切到<strong>專案實戰</strong>查看局部文件關聯與必要資訊來源</li>
                <li>下載工作包並把短啟動詞交給 Coding Agent；讓它先掃描 Repository，再詢問阻擋性缺口</li>
                <li>勾起 checkbox 標完成，往下一張走</li>
              </ol>

              <h2>什麼時候該回來改 brief？</h2>
              <p>
                如果走到一半發現問卷答案根本不對（例如 Discovery 跑完才發現受眾錯了），
                點上方<strong>「重新填寫」</strong>清掉重來。
                專案底稿是目前理解的基準，不是不能更動的合約。新的證據足以改變方向時，就應更新底稿並保留變更原因。
              </p>
            </article>
            <aside>
              <section>
                <h4>15 卡分布</h4>
                <ul style={{ fontSize: 13, lineHeight: 1.7 }}>
                  <li>Discovery · 探索 — 2 卡</li>
                  <li>Define · 定義 — 2 卡</li>
                  <li>Design · 設計 — 5 卡</li>
                  <li>Build · 建造 — 2 卡</li>
                  <li>Ship · 上線 — 2 卡</li>
                  <li>Operate · 運維 — 2 卡</li>
                </ul>
              </section>
              <section>
                <h4>遇到問題？</h4>
                <p>
                  每張卡的「實際結果.md」底部有「學生常見錯誤」表。
                  90% 的疑問可以從那裡找到答案。
                </p>
              </section>
              <section>
                <h4>不會被收集</h4>
                <p>
                  簡報與進度只存在你的瀏覽器 localStorage，
                  沒有後端、沒有 telemetry、沒有帳號。
                </p>
              </section>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
