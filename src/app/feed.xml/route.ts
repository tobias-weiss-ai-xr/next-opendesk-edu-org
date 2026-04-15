import { getAllPosts } from "@/lib/content";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import { escapeXml } from "@/lib/xml";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts('en');
  const items = posts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${SITE_URL}/en/${post.section}/${post.slug}`)}</link>
      <guid>${escapeXml(`${SITE_URL}/en/${post.section}/${post.slug}`)}</guid>
      <description>${escapeXml(post.description ?? "")}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.categories?.map((c) => `<category>${escapeXml(c)}</category>`).join("\n      ") ?? ""}
      ${post.tags?.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ") ?? ""}
    </item>`).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
