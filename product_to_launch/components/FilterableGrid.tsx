"use client";

import { useMemo, useState } from "react";
import type { DeliverableIndex, RoleSlug, StageSlug } from "@/lib/taxonomy";
import { ROLES, STAGES } from "@/lib/taxonomy";
import DeliverableCard from "./DeliverableCard";

interface Props {
  items: Array<DeliverableIndex & { hook: string }>;
}

export default function FilterableGrid({ items }: Props) {
  const [stage, setStage] = useState<"all" | StageSlug>("all");
  const [role, setRole] = useState<"all" | RoleSlug>("all");

  const filtered = useMemo(() => {
    return items.filter(
      (d) =>
        (stage === "all" || d.stage === stage) &&
        (role === "all" || d.roles.includes(role))
    );
  }, [items, stage, role]);

  const stageCount = (s: StageSlug) => items.filter((d) => d.stage === s).length;
  const roleCount = (r: RoleSlug) => items.filter((d) => d.roles.includes(r)).length;

  return (
    <>
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-group-label">Stage</span>
          <button onClick={() => setStage("all")} className={stage === "all" ? "active" : ""}>
            All <span className="count">({items.length})</span>
          </button>
          {STAGES.map((s) => (
            <button
              key={s.slug}
              onClick={() => setStage(s.slug)}
              className={stage === s.slug ? "active" : ""}
            >
              {s.titleEn} <span className="count">({stageCount(s.slug)})</span>
            </button>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-group-label">Role</span>
          <button onClick={() => setRole("all")} className={role === "all" ? "active" : ""}>
            All
          </button>
          {ROLES.map((r) => (
            <button
              key={r.slug}
              onClick={() => setRole(r.slug)}
              className={role === r.slug ? "active" : ""}
            >
              {r.title} <span className="count">({roleCount(r.slug)})</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid">
        {filtered.map((d) => (
          <DeliverableCard key={d.slug} d={d} hook={d.hook} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="muted center" style={{ padding: "48px 0" }}>
          這個組合下沒有交付物 — 換組篩選試試。
        </p>
      )}
    </>
  );
}
