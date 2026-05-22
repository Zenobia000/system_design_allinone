/**
 * Shared SEO utilities: canonical URLs, absolute asset URLs, JSON-LD builders.
 * Single source of truth for site identity used by every page's metadata.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://launch-atlas.example";

export const SITE_NAME = "落地圖鑑 · Launch Atlas";
export const SITE_TAGLINE = "從一個假設，到一座可運維的系統";
export const SITE_LOCALE = "zh_TW";
export const SITE_LANG = "zh-Hant";
export const PUBLISHER_NAME = "桑尼資料科學 Lab";
export const PUBLISHER_URL = "https://sunnydatascience.com/";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function absoluteUrl(pathOrAbs: string): string {
  if (/^https?:\/\//.test(pathOrAbs)) return pathOrAbs;
  const withBase = pathOrAbs.startsWith(BASE_PATH)
    ? pathOrAbs
    : BASE_PATH + pathOrAbs;
  return SITE_URL + (withBase.startsWith("/") ? withBase : "/" + withBase);
}

export function canonicalFor(path: string): string {
  return absoluteUrl(path);
}

type JsonLd = Record<string, unknown>;

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Launch Atlas",
    url: SITE_URL + "/",
    inLanguage: SITE_LANG,
    description: SITE_TAGLINE,
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: PUBLISHER_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/deliverables/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: PUBLISHER_NAME,
    url: PUBLISHER_URL,
    logo: absoluteUrl("/logo/logo-main.png"),
    sameAs: [PUBLISHER_URL],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  section?: string;
  keywords?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: SITE_LANG,
    image: opts.image ? [absoluteUrl(opts.image)] : undefined,
    articleSection: opts.section,
    keywords: opts.keywords?.join(", "),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL + "/" },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: PUBLISHER_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo/logo-main.png") },
    },
  };
}

export function collectionPageJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  count?: number;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: SITE_LANG,
    numberOfItems: opts.count,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL + "/" },
  };
}

export function jsonLdScript(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data);
}
