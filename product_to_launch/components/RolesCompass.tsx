import Link from "next/link";
import { ROLES, STAGE_MAP } from "@/lib/taxonomy";

export default function RolesCompass() {
  return (
    <section className="section" style={{ background: "var(--cream-2)" }}>
      <div className="section-head">
        <span className="label">+ Roles · 10 角色羅盤</span>
        <h2>誰在這條路上同行。</h2>
        <p className="sub">
          從 PM 到 SRE，每個角色都解決一種特定的不確定性。
          點進任何一張卡，看這個角色「為什麼存在」、「AI 取代不了的部分是什麼」。
        </p>
      </div>
      <div className="compass">
        {ROLES.map((r) => (
          <Link href={`/roles/${r.slug}/`} key={r.slug}>
            <span className="num">Role · {r.num}</span>
            <h3>{r.title}</h3>
            <p className="role-hook">{r.hook}</p>
            <div className="role-tags">
              {r.primaryStages.map((s) => (
                <span className="tag" key={s} style={{ color: STAGE_MAP[s].hex, borderColor: STAGE_MAP[s].hex }}>
                  {STAGE_MAP[s].titleEn}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
