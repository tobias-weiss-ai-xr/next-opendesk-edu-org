import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { SITE_URL } from "@/lib/config";
import { SECTION_INFO } from "@/lib/content";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      { url: `${SITE_URL}/${locale}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
      { url: `${SITE_URL}/${locale}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
      ...SECTION_INFO.map((s) => ({
        url: `${SITE_URL}/${locale}/${s.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      { url: `${SITE_URL}/${locale}/imprint`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
      { url: `${SITE_URL}/${locale}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }
    );

    const posts = await getAllPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/${post.section}/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}
