import type { Metadata } from "next";

export function pageMeta(opts: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.path,
      images: opts.image ? [{ url: opts.image }] : undefined,
      type: "article",
      locale: "zh_TW",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: opts.image ? [opts.image] : undefined,
    },
  };
}
