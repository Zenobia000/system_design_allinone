"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import type { DeliverableRelationship, RelationshipNode } from "@/lib/deliverable-learning";

type ExperienceMode = "learn" | "project";
type PackageVariant = "quick" | "full";

interface Props {
  slug: string;
  title: string;
  relationship: DeliverableRelationship;
  children: ReactNode;
}

const RELATION_LABELS: Record<RelationshipNode["relation"], string> = {
  preferred: "PRIORITY SOURCE",
  optional: "OPTIONAL",
  discoverable: "AGENT SEARCH",
  downstream: "DOWNSTREAM",
};

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function RelationshipItem({ node }: { node: RelationshipNode }) {
  const content = (
    <>
      <span>{RELATION_LABELS[node.relation]}</span>
      <strong>{node.label}</strong>
      {!node.slug && <small>{node.id}</small>}
    </>
  );

  return node.slug ? (
    <Link className={`lineage-node lineage-node-${node.relation}`} href={`/deliverables/${node.slug}/`}>
      {content}
    </Link>
  ) : (
    <div className={`lineage-node lineage-node-${node.relation}`}>{content}</div>
  );
}

export default function DeliverableExperience({ slug, title, relationship, children }: Props) {
  const [mode, setMode] = useState<ExperienceMode>("learn");
  const [packageVariant, setPackageVariant] = useState<PackageVariant>("quick");
  const [copyState, setCopyState] = useState<"" | "copied" | "failed">("");
  const packageFilename = `${slug}-${packageVariant}.md`;

  useEffect(() => {
    const requestedMode = new URLSearchParams(window.location.search).get("mode");
    if (requestedMode === "project") setMode("project");
  }, []);

  const trigger = useMemo(() => `請先讀取我附上的 \`${packageFilename}\` 工作包，並用它處理目前專案。

若目前對話或專案中找不到這個檔案，先停止並告訴我，不要憑印象產出「${title}」。

先讀取 Repository、既有文件與相關設定，依工作包內的契約盤點上下文。產出文件前先回報：

- FOUND：已找到的資訊與檔案路徑
- MISSING：會阻擋正確產出的必要資訊
- CONFLICT：互相矛盾、需要人類決定的來源

只有 MISSING 或 CONFLICT 會改變需求、限制或驗收結果時才詢問我，每次最多 5 題。

上游名稱只是證據線索，不是必須依序建立的文件清單。資訊足夠後再產出文件；未知內容保留 TODO，不得自行補成決策。`, [packageFilename, title]);

  const copyTrigger = async () => {
    const ok = await copyText(trigger);
    setCopyState(ok ? "copied" : "failed");
    window.setTimeout(() => setCopyState(""), 1800);
  };

  const upstreamNodes = [...relationship.preferred, ...relationship.optional, ...relationship.discoverable];

  return (
    <div className="deliverable-experience">
      <section className="experience-switcher" id="experience-mode">
        <div className="experience-switcher-copy">
          <span>CHOOSE YOUR MODE</span>
          <h2>先決定你現在是要學，還是要在專案裡做</h2>
          <p>網站負責解釋與分發工作包；真正的 Repository 掃描、缺口判斷與文件產出交給 Coding Agent。</p>
        </div>
        <div className="experience-tabs" role="tablist" aria-label="選擇交付物使用模式">
          <button type="button" role="tab" aria-selected={mode === "learn"} onClick={() => setMode("learn")}>
            <span>LEARN</span>
            <strong>學習模式</strong>
            <small>大綱、範本、案例與手動練習</small>
          </button>
          <button type="button" role="tab" aria-selected={mode === "project"} onClick={() => setMode("project")}>
            <span>USE IN PROJECT</span>
            <strong>專案實戰</strong>
            <small>關聯圖、工作包與 Agent 啟動詞</small>
          </button>
        </div>
      </section>

      {mode === "learn" ? (
        <div role="tabpanel" className="experience-panel experience-panel-learn">
          {children}
        </div>
      ) : (
        <div role="tabpanel" className="experience-panel experience-panel-project">
          <section className="project-intro">
            <p className="project-kicker">PROJECT MODE · 在 Repository 裡執行</p>
            <h2>不要把文件血緣塞進提示詞</h2>
            <p className="project-lead">
              你只提供需求、限制與驗收標準。工作包保留穩定契約，Coding Agent 自行讀取專案上下文，缺少阻擋性資訊時才回來提問。
            </p>
            <div className="project-boundary" aria-label="網站、Coding Agent 與人類的責任邊界">
              <div><span>WEBSITE</span><strong>教學與分發</strong><small>解釋關聯、提供範本與工作包</small></div>
              <div><span>CODING AGENT</span><strong>搜尋與產出</strong><small>讀 Repository、盤點缺口、建立文件</small></div>
              <div><span>HUMAN</span><strong>需求與決策</strong><small>確認限制、解決衝突、執行驗收</small></div>
            </div>
          </section>

          <section id="project-lineage">
            <p className="project-kicker">LINEAGE · 局部文件關聯</p>
            <h2>目前文件只看前後一層，不展開全部 58 張卡</h2>
            <p>連線代表資訊可能從哪裡來，不代表你必須先完成每一份正式文件。相同資訊也可以由既有紀錄或你的確認回答補足。</p>
            <div className="lineage-graph" aria-label={`${title} 文件關聯圖`}>
              <div className="lineage-column lineage-inputs">
                <div className="lineage-column-head"><span>INPUT</span><strong>優先讀取</strong></div>
                <div className="lineage-node-list">
                  {upstreamNodes.length > 0
                    ? upstreamNodes.map((node) => <RelationshipItem node={node} key={`${node.relation}-${node.id}`} />)
                    : <div className="lineage-empty">從你的確認回答開始</div>}
                </div>
              </div>
              <div className="lineage-connector" aria-hidden="true"><span>提供資訊</span></div>
              <div className="lineage-current">
                <span>CURRENT OUTPUT</span>
                <strong>{relationship.current.title}</strong>
                <small>由 Coding Agent 在專案中產出</small>
              </div>
              <div className="lineage-connector" aria-hidden="true"><span>形成依據</span></div>
              <div className="lineage-column lineage-outputs">
                <div className="lineage-column-head"><span>OUTPUT</span><strong>可能接續</strong></div>
                <div className="lineage-node-list">
                  {relationship.downstream.length > 0
                    ? relationship.downstream.map((node) => <RelationshipItem node={node} key={node.id} />)
                    : <div className="lineage-empty">依下一個未知選擇文件</div>}
                </div>
              </div>
            </div>
            <div className="lineage-legend">
              <span><i className="legend-line legend-required" />優先來源</span>
              <span><i className="legend-line legend-discoverable" />Agent 可搜尋</span>
              <span><i className="legend-line legend-optional" />補強材料</span>
            </div>
          </section>

          <section className="project-gate">
            <p className="project-kicker">NECESSITY GATE · 先判斷要不要做</p>
            <h2>不是每個專案都需要這份文件</h2>
            <div className="project-gate-grid">
              <div>
                <span className="project-stamp project-stamp-use">USE WHEN</span>
                {relationship.activation.length > 0
                  ? relationship.activation.map((item) => <p key={item}>{item}</p>)
                  : <p>這份文件能消除目前最重要的不確定性時。</p>}
              </div>
              <div>
                <span className="project-stamp project-stamp-skip">SKIP WHEN</span>
                {relationship.skipWhen.length > 0
                  ? relationship.skipWhen.map((item) => <p key={item}>{item}</p>)
                  : <p>既有文件已回答相同問題，或不會影響後續決策時。</p>}
              </div>
            </div>
          </section>

          <section id="project-launch">
            <p className="project-kicker">LAUNCH · 帶進 Coding Agent</p>
            <h2>選一份工作包，再貼上短啟動詞</h2>
            <p>工作包保存範本與穩定規則；啟動詞只負責指定這次任務。新手先用輕量版，文件確定會跨職能交棒時再用完整版。</p>
            <ol className="package-steps" aria-label="把工作包交給 Coding Agent 的三個步驟">
              <li><span>01</span><p><strong>下載</strong> 選擇符合情境的工作包</p></li>
              <li><span>02</span><p><strong>附上</strong> 放進專案或加入 Agent 對話</p></li>
              <li><span>03</span><p><strong>啟動</strong> 複製下方文字並送出</p></li>
            </ol>
            <div className="package-list">
              <div className={`package-row${packageVariant === "quick" ? " is-selected" : ""}`}>
                <div><span>LIGHT WORK PACKAGE</span><strong>先完成核心章節</strong><small>{slug}-quick.md · 建議第一次使用</small></div>
                <a href={`/skills/${slug}-quick.md`} download onClick={() => setPackageVariant("quick")}>下載並選用</a>
              </div>
              <div className={`package-row${packageVariant === "full" ? " is-selected" : ""}`}>
                <div><span>FULL WORK PACKAGE</span><strong>正式跨職能交棒</strong><small>{slug}-full.md</small></div>
                <a href={`/skills/${slug}-full.md`} download onClick={() => setPackageVariant("full")}>下載並選用</a>
              </div>
            </div>
            <div className="project-trigger">
              <div className="project-trigger-head">
                <div><span>AGENT TRIGGER · {packageFilename}</span><strong>啟動上下文盤點</strong></div>
                <button type="button" onClick={copyTrigger}>{copyState === "copied" ? "已複製" : "複製啟動詞"}</button>
              </div>
              <pre><code>{trigger}</code></pre>
              <div className="context-check-preview" aria-label="Agent 應先回報的上下文狀態">
                <div><span>FOUND</span><p>找到的資訊與檔案路徑</p></div>
                <div><span>MISSING</span><p>真正阻擋產出的缺口</p></div>
                <div><span>CONFLICT</span><p>必須由人類決定的矛盾</p></div>
              </div>
            </div>
          </section>
          {copyState === "failed" && <p className="copy-error" role="status">瀏覽器未允許複製，請直接選取啟動詞。</p>}
        </div>
      )}
    </div>
  );
}
