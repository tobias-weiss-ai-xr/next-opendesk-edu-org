import { getPostsBySection, getSectionBySlug } from "@/lib/content";
import { SITE_NAME } from "@/lib/config";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

interface SectionPageProps {
  section: string;
}

export async function generateMetadata({ section }: SectionPageProps): Promise<Metadata> {
  const sectionInfo = getSectionBySlug(section);
  if (!sectionInfo) {
    return { title: SITE_NAME };
  }
  return {
    title: `${sectionInfo.title} | ${SITE_NAME}`,
    description: sectionInfo.description,
  };
}

export default async function SectionPage({ section }: SectionPageProps) {
  const sectionInfo = getSectionBySlug(section);
  const posts = await getPostsBySection(section);

  if (!sectionInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground">Section not found</h1>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">{sectionInfo.title}</h1>
        {sectionInfo.description && (
          <p className="text-lg text-foreground-secondary max-w-2xl">
            {sectionInfo.description}
          </p>
        )}
      </div>
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-foreground-secondary">No posts yet.</p>
      )}
    </main>
  );
}
