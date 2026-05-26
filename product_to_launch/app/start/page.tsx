import type { Metadata } from "next";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import StartQuestionnaire from "@/components/StartQuestionnaire";

export const metadata: Metadata = {
  title: "工作坊起點 · 5 分鐘問卷生成你的學習路徑",
  description:
    "5 題極簡問卷產出專案種子簡報（project-brief.md），自動串接 15 張必要卡片的學習路徑。降低 SDLC 框架的入門門檻。",
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
              <h1>用 5 題搭一份種子簡報，
                <br />然後跟著 15 張卡走完整個產品流程。</h1>
              <p className="hook">
                你不需要懂程式。用日常語言描述你想做什麼，
                系統會把答案整理成一份 markdown 簡報，
                成為後續每張 AI prompt 的「上游輸入」。
                附完整工作範例可對照，全程口語、無術語。
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
                  並跳到 <code>/workshop/</code> 你的個人化學習路徑頁
                </li>
                <li>
                  跟著 15 張卡走 — 每張卡有<strong>「模板輸入」</strong>（已套上你的 brief 的 prompt）
                  與<strong>「實際結果」</strong>（完整工作範例的 AI 輸出 + 教學要點）
                </li>
                <li>
                  把每張卡的「模板輸入」整段貼到 Claude 或 ChatGPT，
                  AI 會依照同樣的 schema 產出你的版本
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
                是怎麼寫的 — 同樣 5 段、同樣口語，你的 brief 也會長那樣。
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
                  <a href="/workshop/">前往 /workshop/ ↗</a>
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
