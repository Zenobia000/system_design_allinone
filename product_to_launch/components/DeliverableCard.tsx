import Link from "next/link";
import type { DeliverableIndex } from "@/lib/taxonomy";
import { STAGE_MAP, ROLE_MAP, pad } from "@/lib/taxonomy";

interface Props {
  d: DeliverableIndex;
  hook: string;
}

export default function DeliverableCard({ d, hook }: Props) {
  const stage = STAGE_MAP[d.stage];
  const cls = `card${d.essential ? " is-essential" : ""}`;
  return (
    <Link
      href={`/deliverables/${d.slug}/`}
      className={cls}
      aria-label={d.essential ? `${d.title}（最小必要集）` : undefined}
    >
      <span className="num">{`#${pad(d.order)} · ${stage.titleEn.toUpperCase()}`}</span>
      <h3>{d.title}</h3>
      <p className="hook">{hook}</p>
      <div className="tags">
        <span className="tag" style={{ color: stage.hex, borderColor: stage.hex }}>{stage.title}</span>
        {d.roles.map((r) => (
          <span className="tag" key={r}>{ROLE_MAP[r].title}</span>
        ))}
      </div>
      <span className="arrow">→</span>
    </Link>
  );
}
