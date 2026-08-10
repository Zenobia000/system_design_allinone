import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import StartQuestionnaire from "@/components/StartQuestionnaire";

export const metadata: Metadata = {
  title: "工作坊起點 · 5 分鐘建立專案底稿",
  description:
    "用 5 題產出 project-brief.md，作為學習 SDLC 與啟動 Coding Agent 上下文盤點的共同起點。",
  alternates: {
    canonical: "/start/",
    languages: { "zh-Hant": "/start/", "x-default": "/start/" },
  },
};

export default function StartPage() {
  return (
    <>
      <Rail active="start" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">Workshop</span>
                <span className="tag">5 分鐘 · 5 題</span>
              </div>
              <h1>用 5 題建立專案底稿，
                <br />再讓 Agent 找出真正缺少的資訊。</h1>
              <p className="hook">
                你不需要懂程式。用日常語言描述你想做什麼，
                系統會把答案整理成一份 markdown 簡報，
                讓每張教學卡有共同起點。進入實際專案後，Coding Agent 會再讀取 Repository 與既有文件，
                只針對會阻擋需求、限制或驗收的缺口提問。
              </p>
            </div>
          </div>
        </section>

        <section className="detail-body">
          <div className="container">
            <article>
              <h2>怎麼用這份簡報</h2>
              <ol>
                <li>
                  <strong>填完下方 5 題</strong> → 按「產出我的種子簡報」
                </li>
                <li>
                  瀏覽器會自動下載 <code>project-brief.md</code>，
                  並跳到 <code>/workshop/</code> 建議學習路徑頁
                </li>
                <li>
                  初次學習可依 15 張核心卡理解完整流程；它是課程順序，不是實際專案必須完成的文件清單
                </li>
                <li>
                  需要在真實專案產出文件時，切到卡片的<strong>「專案實戰」</strong>，下載工作包並交給 Coding Agent 掃描上下文
                </li>
              </ol>

              <h2>不會被收集任何資料</h2>
              <p>
                這份問卷<strong>完全跑在瀏覽器</strong>。沒有後端、沒有帳號、沒有 telemetry。
                你的回答只會：(a) 下載成本機的 markdown 檔；(b) 寫到本機 localStorage 給後續頁面讀。
                關掉分頁就消失，或在 <code>/workshop/</code> 按「重新填寫」覆蓋。
              </p>

              <h2>開始填</h2>
              <StartQuestionnaire />

              <h2>沒靈感？</h2>
              <p>
                看 <a href="https://github.com/Zenobia000/system_design_allinone/blob/main/demo/%E7%A8%AE%E5%AD%90%E7%B0%A1%E5%A0%B1.md" target="_blank" rel="noopener">範例種子簡報</a>
                是怎麼寫的。同樣 5 段、同樣口語，你的 brief 也會長那樣。
              </p>
            </article>
            <aside>
              <section>
                <h4>這份簡報會被用到哪裡</h4>
                <ul>
                  <li><strong>JTBD</strong>：你的「目標受眾 + 痛點」→ Jobs to be Done statements</li>
                  <li><strong>PRD</strong>：你的「期望成果 + 約束」→ Goals + Non-Goals</li>
                  <li><strong>NFR</strong>：你的「主要約束」→ 非功能需求</li>
                  <li><strong>Value Hypothesis</strong>：你的「成功指標」→ 可驗證假設</li>
                </ul>
              </section>
              <section>
                <h4>填完之後</h4>
                <p>
                  <a href="/workshop/">前往 /workshop/</a>
                  <br />
                  <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>
                    沒填問卷直接訪問會看到「先填問卷」CTA。
                  </span>
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
