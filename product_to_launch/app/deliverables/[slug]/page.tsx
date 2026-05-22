import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import { DELIVERABLES, STAGE_MAP, ROLE_MAP, pad } from "@/lib/taxonomy";
import { getDeliverable, renderMarkdown } from "@/lib/content";

export function generateStaticParams() {
  return DELIVERABLES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDeliverable(slug);
  if (!d) return {};
  return {
    title: d.frontmatter.title,
    description: d.frontmatter.hook,
    openGraph: { images: [d.frontmatter.art ?? "/generated/og-card.png"] },
  };
}

export default async function DeliverablePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDeliverable(slug);
  if (!d) notFound();

  const fm = d.frontmatter;
  const stage = STAGE_MAP[fm.stage];
  const html = renderMarkdown(d.body);
  const idx = DELIVERABLES.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? DELIVERABLES[idx - 1] : null;
  const next = idx < DELIVERABLES.length - 1 ? DELIVERABLES[idx + 1] : null;

  return (
    <>
      <Rail active="deliverables" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">{`#${pad(fm.order)}`}</span>
                <span className="tag" style={{ color: stage.hex, borderColor: stage.hex }}>
                  {stage.titleEn}
                </span>
                {fm.roles.map((r) => (
                  <span className="tag" key={r}>{ROLE_MAP[r].title}</span>
                ))}
              </div>
              <h1>{fm.title}</h1>
              <p className="hook">{fm.hook}</p>
            </div>
            {fm.art && (
              <div className="art">
                <img src={fm.art} alt="" />
              </div>
            )}
          </div>
        </section>

        <section className="detail-body">
          <div className="container">
            <article dangerouslySetInnerHTML={{ __html: html }} />
            <aside>
              {fm.when_to_use && (
                <section>
                  <h4>何時用</h4>
                  <p>{fm.when_to_use}</p>
                </section>
              )}
              {fm.ai_leverage && (
                <section>
                  <h4>AI 加速</h4>
                  <p>{fm.ai_leverage}</p>
                </section>
              )}
              <section>
                <h4>本卡位置</h4>
                <ul>
                  <li>
                    Stage:{" "}
                    <Link href={`/stages/${stage.slug}/`} style={{ color: stage.hex }}>
                      {stage.title} · {stage.titleEn}
                    </Link>
                  </li>
                  {fm.roles.map((r) => (
                    <li key={r}>
                      Role:{" "}
                      <Link href={`/roles/${r}/`}>{ROLE_MAP[r].title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h4>前後序</h4>
                <ul>
                  {prev && (
                    <li>
                      ← <Link href={`/deliverables/${prev.slug}/`}>{prev.title}</Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link href={`/deliverables/${next.slug}/`}>{next.title}</Link> →
                    </li>
                  )}
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
