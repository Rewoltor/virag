import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { GUIDES } from "@/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, priority: 1 },
    { url: `${SITE.url}/order`, lastModified: now, priority: 0.9 },
    { url: `${SITE.url}/guides`, lastModified: now, priority: 0.8 },
    { url: `${SITE.url}/faq`, lastModified: now, priority: 0.6 },
    { url: `${SITE.url}/llms.txt`, lastModified: now, priority: 0.6 },
    ...GUIDES.map((g) => ({ url: `${SITE.url}/guides/${g.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
