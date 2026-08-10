import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import DeliverableExperience from "@/components/DeliverableExperience";
import DeliverableLearningDemo from "@/components/DeliverableLearningDemo";
import PrdLearningDemo from "@/components/PrdLearningDemo";
import { DELIVERABLES, STAGE_MAP, ROLE_MAP, pad } from "@/lib/taxonomy";
import { getAllDeliverables, getDeliverable } from "@/lib/content";
import { buildDeliverableLearningContent, buildDeliverableRelationship } from "@/lib/deliverable-learning";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return DELIVERABLES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDeliverable(slug);
  if (!d) return {};
  const path = `/deliverables/${slug}/`;
  const ogImage = d.frontmatter.art ?? "/generated/og-card.webp";
  const stage = STAGE_MAP[d.frontmatter.stage];
  return {
    title: d.frontmatter.title,
    description: d.frontmatter.hook,
    keywords: [
      d.frontmatter.title,
      stage?.titleEn,
      ...(d.frontmatter.roles ?? []).map((r) => ROLE_MAP[r]?.title).filter(Boolean),
      "落地圖鑑",
      "Launch Atlas",
    ].filter(Boolean) as string[],
    alternates: {
      canonical: path,
      languages: { "zh-Hant": path, "x-default": path },
    },
    openGraph: {
      type: "article",
      title: d.frontmatter.title,
      description: d.frontmatter.hook,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(ogImage), width: 1280, height: 853, alt: d.frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.frontmatter.title,
      description: d.frontmatter.hook,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function DeliverablePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDeliverable(slug);
  if (!d) notFound();

  const fm = d.frontmatter;
  const isPrdDemo = slug === "prd";
  const stage = STAGE_MAP[fm.stage];
  const learningContent = buildDeliverableLearningContent(d.body, slug);
  const relationship = buildDeliverableRelationship(d, getAllDeliverables());
  const idx = DELIVERABLES.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? DELIVERABLES[idx - 1] : null;
  const next = idx < DELIVERABLES.length - 1 ? DELIVERABLES[idx + 1] : null;

  const path = `/deliverables/${slug}/`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Deliverables", path: "/deliverables/" },
    { name: fm.title, path },
  ]);
  const article = articleJsonLd({
    title: fm.title,
    description: fm.hook,
    path,
    image: fm.art ?? "/generated/og-card.webp",
    section: stage.titleEn,
    keywords: [stage.titleEn, ...fm.roles.map((r) => ROLE_MAP[r]?.title).filter(Boolean) as string[]],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript([breadcrumb, article]) }}
      />
      <Rail active="deliverables" />
      <main>
        <section className={`detail-hero${isPrdDemo ? " detail-hero-learning" : ""}`}>
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
              <h1>
                {isPrdDemo ? (
                  <>
                    <span className="learning-title-prefix">PRD · </span>
                    <span>產品需求文件</span>
                  </>
                ) : fm.title}
              </h1>
              <p className="hook">{fm.hook}</p>
            </div>
            {fm.art && (
              <div className="art">
                <img
                  src={fm.art}
                  srcSet={`${fm.art.replace(/\.webp$/, "-640w.webp")} 640w, ${fm.art} 1280w`}
                  sizes="(max-width: 880px) 92vw, 42vw"
                  alt={`${fm.title} · 卡片插圖`}
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
            <article className="learning-demo-article">
              <DeliverableExperience slug={slug} title={fm.title} relationship={relationship}>
                {isPrdDemo ? (
                  <PrdLearningDemo />
                ) : (
                  <DeliverableLearningDemo
                    title={fm.title}
                    hook={fm.hook}
                    content={learningContent}
                    next={next ? { slug: next.slug, title: next.title } : null}
                  />
                )}
              </DeliverableExperience>
            </article>
            <aside>
              <section>
                <h4>兩種使用方式</h4>
                <p><strong>學習模式</strong><br />理解大綱、範本、案例與驗收方式。</p>
                <p style={{ marginTop: 10 }}><strong>專案實戰</strong><br />查看文件關聯，下載工作包後交給 Coding Agent。</p>
              </section>
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
