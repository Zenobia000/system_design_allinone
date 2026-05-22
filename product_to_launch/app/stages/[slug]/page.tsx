import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import DeliverableCard from "@/components/DeliverableCard";
import { STAGES, STAGE_MAP, deliverablesByStage } from "@/lib/taxonomy";
import type { StageSlug } from "@/lib/taxonomy";
import { getStage, getAllDeliverables, renderMarkdown } from "@/lib/content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return STAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stage = getStage(slug as StageSlug);
  if (!stage) return {};
  const path = `/stages/${slug}/`;
  const ogImage = stage.frontmatter.art ?? "/generated/og-card.webp";
  const title = `${stage.frontmatter.title} · ${stage.frontmatter.title_en}`;
  return {
    title,
    description: stage.frontmatter.hook,
    alternates: {
      canonical: path,
      languages: { "zh-Hant": path, "x-default": path },
    },
    openGraph: {
      type: "article",
      title,
      description: stage.frontmatter.hook,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(ogImage), width: 1280, height: 853, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: stage.frontmatter.hook,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function StagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stage = getStage(slug as StageSlug);
  if (!stage) notFound();

  const meta = STAGE_MAP[slug as StageSlug];
  const dlist = deliverablesByStage(slug as StageSlug);
  const allDeliv = getAllDeliverables();
  const hookMap = new Map(allDeliv.map((d) => [d.frontmatter.slug, d.frontmatter.hook]));
  const html = renderMarkdown(stage.body);

  const path = `/stages/${slug}/`;
  const title = `${stage.frontmatter.title} · ${stage.frontmatter.title_en}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Stages", path: "/stages/" },
    { name: stage.frontmatter.title, path },
  ]);
  const collection = collectionPageJsonLd({
    title,
    description: stage.frontmatter.hook,
    path,
    count: dlist.length,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript([breadcrumb, collection]) }}
      />
      <Rail active="stages" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">Stage · {meta.num}</span>
                <span className="tag" style={{ color: meta.hex, borderColor: meta.hex }}>
                  {meta.titleEn}
                </span>
                <span className="tag">{dlist.length} 個交付物</span>
              </div>
              <h1>{stage.frontmatter.title}</h1>
              <p className="hook">{stage.frontmatter.hook}</p>
              <p className="coord" style={{ marginTop: 28 }}>{stage.frontmatter.title_en}</p>
            </div>
            {stage.frontmatter.art && (
              <div className="art">
                <img
                  src={stage.frontmatter.art}
                  srcSet={`${stage.frontmatter.art.replace(/\.webp$/, "-640w.webp")} 640w, ${stage.frontmatter.art} 1280w`}
                  sizes="(max-width: 880px) 92vw, 42vw"
                  alt={`${stage.frontmatter.title} · 階段插圖`}
                  width="1280"
                  height="853"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            )}
          </div>
        </section>

        <section className="detail-body">
          <div className="container">
            <article dangerouslySetInnerHTML={{ __html: html }} />
            <aside>
              {stage.frontmatter.exit_criteria && (
                <section>
                  <h4>Exit Criteria · 出口條件</h4>
                  <p>{stage.frontmatter.exit_criteria}</p>
                </section>
              )}
              {stage.frontmatter.typical_stuck && (
                <section>
                  <h4>典型卡關</h4>
                  <p>{stage.frontmatter.typical_stuck}</p>
                </section>
              )}
              <section>
                <h4>本階段順序</h4>
                <ul>
                  {STAGES.map((s) => (
                    <li key={s.slug} style={{ opacity: s.slug === slug ? 1 : 0.6 }}>
                      {s.slug === slug ? "→ " : "   "}
                      <Link href={`/stages/${s.slug}/`}>{s.title} · {s.titleEn}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </section>

        <section className="section" style={{ background: "var(--cream-2)" }}>
          <div className="section-head">
            <span className="label" style={{ color: meta.hex }}>+ {meta.titleEn} · 階段內交付物</span>
            <h2>本階段要產出 {dlist.length} 個交付物。</h2>
          </div>
          <div className="grid">
            {dlist.map((d) => (
              <DeliverableCard key={d.slug} d={d} hook={hookMap.get(d.slug) ?? "—"} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
