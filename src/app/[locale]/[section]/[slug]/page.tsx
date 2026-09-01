import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import RelatedPosts from "@/components/RelatedPosts";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import {
  getPostBySlug,
  getSectionBySlug,
  getStaticPathsForSection,
  isValidSection,
  SECTION_INFO,
} from "@/lib/content";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string; section: string; slug: string }>;
}

export async function generateStaticParams() {
  const paths: { locale: string; section: string; slug: string }[] = [];
  for (const section of SECTION_INFO) {
    const slugs = await getStaticPathsForSection(section.slug);
    for (const slug of slugs) {
      for (const locale of routing.locales) {
        paths.push({ locale, section: section.slug, slug });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, section, slug } = await params;
  const sectionInfo = getSectionBySlug(section);
  if (!sectionInfo) return { title: SITE_NAME };

  const post = await getPostBySlug(section, slug, locale);
  if (!post) return { title: SITE_NAME };

  return {
    title: `${post.title} | ${sectionInfo.title} | ${SITE_NAME}`,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/${locale}/${section}/${slug}`,
      images: post.image
        ? [{ url: `${SITE_URL}${post.image}`, width: 1200, height: 630 }]
        : undefined,
      publishedTime: post.date,
      authors: [SITE_NAME],
      section: sectionInfo?.title,
      tags: post.tags ?? [],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/${section}/${slug}`,
    },
  };
}

export default async function ArticleSlugPage({ params }: PageProps) {
  const { locale, section, slug } = await params;

  if (!isValidSection(section)) {
    notFound();
  }

  const post = await getPostBySlug(section, slug, locale);
  if (!post) {
    notFound();
  }

  const sectionInfo = getSectionBySlug(section);
  const backLabel = sectionInfo?.title ?? section;

  return (
    <>
      <ArticlePage post={post} backHref={`/${section}`} backLabel={backLabel} locale={locale} />
      <RelatedPosts currentPost={post} locale={locale} />
    </>
  );
}
