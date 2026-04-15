import {Link} from '@/i18n/navigation';
import { getAllPosts, SECTION_INFO } from "@/lib/content";
import PostCard from "@/components/PostCard";

interface PageProps {
  params: Promise<{locale: string}>;
}

export default async function NotFound({params}: PageProps) {
  const {locale} = await params;
  const allPosts = await getAllPosts(locale);
  const latestPosts = allPosts.slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
      <p className="text-6xl font-bold text-accent mb-4">404</p>
      <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
      <p className="text-foreground-secondary mb-8 max-w-lg mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link
          href="/"
          className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-button transition-colors"
        >
          Homepage
        </Link>
        {SECTION_INFO.map((section) => (
          <Link
            key={section.slug}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={`/${section.slug}` as any}
            className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground hover:bg-background-secondary transition-colors"
          >
            {section.name}
          </Link>
        ))}
      </div>

      {latestPosts.length > 0 && (
        <div className="text-left">
          <h2 className="text-2xl font-bold text-foreground mb-6">Latest Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {latestPosts.map((post) => (
              <PostCard key={`${post.section}/${post.slug}`} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
