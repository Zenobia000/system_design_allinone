import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import { ROLES, ROLE_MAP, STAGE_MAP, DELIVERABLES, deliverablesByRole } from "@/lib/taxonomy";
import type { RoleSlug } from "@/lib/taxonomy";
import { getRole, getAllDeliverables, renderMarkdown } from "@/lib/content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  jsonLdScript,
} from "@/lib/seo";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug as RoleSlug);
  if (!role) return {};
  const path = `/roles/${slug}/`;
  const ogImage = role.frontmatter.art ?? "/generated/og-card.webp";
  const title = `${role.frontmatter.title} · ${role.frontmatter.title_en}`;
  return {
    title,
    description: role.frontmatter.hook,
    alternates: {
      canonical: path,
      languages: { "zh-Hant": path, "x-default": path },
    },
    openGraph: {
      type: "profile",
      title,
      description: role.frontmatter.hook,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(ogImage), width: 1280, height: 853, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: role.frontmatter.hook,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = getRole(slug as RoleSlug);
  if (!role) notFound();

  const meta = ROLE_MAP[slug as RoleSlug];
  const rec = deliverablesByRole(slug as RoleSlug);
  const allDeliv = getAllDeliverables();
  const hookMap = new Map(allDeliv.map((d) => [d.frontmatter.slug, d.frontmatter.hook]));
  const html = renderMarkdown(role.body);

  const path = `/roles/${slug}/`;
  const title = `${role.frontmatter.title} · ${role.frontmatter.title_en}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Roles", path: "/roles/" },
    { name: role.frontmatter.title, path },
  ]);
  const collection = collectionPageJsonLd({
    title,
    description: role.frontmatter.hook,
    path,
    count: rec.length,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript([breadcrumb, collection]) }}
      />
      <Rail active="roles" />
      <main>
        <section className="detail-hero">
          <div className="container">
            <div>
              <div className="meta-row">
                <span className="tag accent">Role · {meta.num}</span>
                {meta.primaryStages.map((s) => (
                  <span key={s} className="tag" style={{ color: STAGE_MAP[s].hex, borderColor: STAGE_MAP[s].hex }}>
                    {STAGE_MAP[s].titleEn}
                  </span>
                ))}
              </div>
              <h1>{role.frontmatter.title}</h1>
              <p className="hook">{role.frontmatter.hook}</p>
              <p className="coord" style={{ marginTop: 28 }}>{role.frontmatter.title_en}</p>
            </div>
            {role.frontmatter.art && (
              <div className="art">
                <img
                  src={role.frontmatter.art}
                  alt={`${role.frontmatter.title} · 角色卡插圖`}
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
              {role.frontmatter.hires_for && (
                <section>
                  <h4>何時招這個角色</h4>
                  <p>{role.frontmatter.hires_for}</p>
                </section>
              )}
              {role.frontmatter.fired_when && (
                <section>
                  <h4>典型失職訊號</h4>
                  <p>{role.frontmatter.fired_when}</p>
                </section>
              )}
              {role.frontmatter.ai_leverage && (
                <section>
                  <h4>AI 加速一句話</h4>
                  <p>{role.frontmatter.ai_leverage}</p>
                </section>
              )}
              <section>
                <h4>推薦交付物 ({rec.length})</h4>
                <ul>
                  {rec.slice(0, 12).map((d) => (
                    <li key={d.slug}>
                      <Link href={`/deliverables/${d.slug}/`}>
                        {d.title}
                      </Link>
                      <br />
                      <span className="mono" style={{ color: "var(--accent)", fontSize: 10 }}>
                        {STAGE_MAP[d.stage].titleEn}
                      </span>
                      {" · "}
                      <span style={{ color: "var(--ink-mute)", fontSize: 12 }}>
                        {hookMap.get(d.slug) ?? ""}
                      </span>
                    </li>
                  ))}
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
