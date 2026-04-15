import {Link} from '@/i18n/navigation';
import { formatDate } from "@/lib/format";
import { Tag, CategoryBadge } from "@/components/Badges";
import type { Post } from "@/lib/content";

type LinkProps = React.ComponentProps<typeof Link>;
type Href = LinkProps['href'];

interface PostCardProps {
  post: Post;
  locale?: string;
}

export default function PostCard({ post, locale = 'en' }: PostCardProps) {
  return (
    <article className="rounded-lg border border-border bg-background p-6 hover:shadow-lg transition-shadow">
      <Link href={`/${post.section}/${post.slug}` as Href} className="block">
        <h3 className="text-lg font-semibold text-foreground hover:text-accent transition-colors mb-2">
          {post.title}
        </h3>
      </Link>
      <time dateTime={post.date} className="text-sm text-foreground-secondary block mb-3">
        {formatDate(post.date, locale)}
      </time>
      {post.description && (
        <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">
          {post.description}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {post.categories?.map((category) => (
          <CategoryBadge key={category}>{category}</CategoryBadge>
        ))}
        {post.tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  );
}
