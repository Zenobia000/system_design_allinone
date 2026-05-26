import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import WorkshopPathway from "@/components/WorkshopPathway";

export const metadata: Metadata = {
  title: "我的工作坊路徑 · Workshop",
  description: "依據你的種子簡報生成的 15 卡個人化學習路徑。每張卡含模板輸入、完整工作範例對照與進度追蹤。",
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
              <h1>你的 15 卡學習路徑</h1>
              <p className="hook">
                這 15 張是「沒有它整個產品流程會斷掉」的最小必要集。
                跟著順序走，每張卡有自己的「模板輸入」（已套上你的 brief）與
                完整工作範例的「實際結果」可以對照。
                進度自動存在你瀏覽器，關掉再開還在。
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
                <li>從第 1 張開始，依順序走 — 每張卡都依賴前面的輸出</li>
                <li>點「前往卡片」→ 打開站上教學頁，於「文件範本」段選「<strong>輕量範本</strong>」或「<strong>完整範本</strong>」tab 並複製</li>
                <li>於「怎麼觸發」段複製薄 trigger，把貼位區換成你上方<strong>「我的種子簡報」</strong>＋上游卡產出，整段送 Claude</li>
                <li>送出後，點「看完整工作範例」對照你的產出</li>
                <li>勾起 checkbox 標完成，往下一張走</li>
              </ol>

              <h2>什麼時候該回來改 brief？</h2>
              <p>
                如果走到一半發現問卷答案根本不對（例如 Discovery 跑完才發現受眾錯了），
                點上方<strong>「重新填寫」</strong>清掉重來。
                這比硬撐到 PRD 才發現整個方向錯要省時間 — Linus 說的 &ldquo;Never break userspace&rdquo;
                只適用於上線系統，<em>學習階段就是要敢推翻自己</em>。
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
