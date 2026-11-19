import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { GUIDES } from "@/content/guides";
import { NEIGHBORHOODS } from "@/content/neighborhoods";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, priority: 1 },
    { url: `${SITE.url}/order`, lastModified: now, priority: 0.9 },
    { url: `${SITE.url}/guides`, lastModified: now, priority: 0.8 },
    { url: `${SITE.url}/faq`, lastModified: now, priority: 0.6 },
    { url: `${SITE.url}/about`, lastModified: now, priority: 0.5 },
    { url: `${SITE.url}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${SITE.url}/skill.md`, lastModified: now, priority: 0.5 },
    { url: `${SITE.url}/delivery`, lastModified: now, priority: 0.7 },
    { url: `${SITE.url}/llms.txt`, lastModified: now, priority: 0.6 },
    { url: `${SITE.url}/llms-full.txt`, lastModified: now, priority: 0.5 },
    ...NEIGHBORHOODS.map((n) => ({ url: `${SITE.url}/delivery/${n.slug}`, lastModified: now, priority: 0.6 })),
    ...GUIDES.map((g) => ({ url: `${SITE.url}/guides/${g.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
