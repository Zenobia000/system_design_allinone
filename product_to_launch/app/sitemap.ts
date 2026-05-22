import type { MetadataRoute } from "next";
import { DELIVERABLES, ROLES, STAGES } from "@/lib/taxonomy";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

function url(path: string): string {
  return `${SITE_URL}${BASE}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"),               lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: url("/deliverables/"),  lastModified, changeFrequency: "weekly",  priority: 0.9 },
    { url: url("/roles/"),         lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/stages/"),        lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about/"),         lastModified, changeFrequency: "yearly",  priority: 0.5 },
  ];

  const deliverableRoutes: MetadataRoute.Sitemap = DELIVERABLES.map((d) => ({
    url: url(`/deliverables/${d.slug}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const roleRoutes: MetadataRoute.Sitemap = ROLES.map((r) => ({
    url: url(`/roles/${r.slug}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const stageRoutes: MetadataRoute.Sitemap = STAGES.map((s) => ({
    url: url(`/stages/${s.slug}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...stageRoutes, ...roleRoutes, ...deliverableRoutes];
}
