import Image from "next/image";
import Link from "next/link";
import EmailLink from "@/components/EmailLink";
import { getAllPosts } from "@/lib/content";
import { SECTION_INFO } from "@/lib/content";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="mb-6 flex justify-center">
          <Image
            src="/static/brand/icon.svg"
            alt={`${SITE_NAME} logo`}
            width={120}
            height={120}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">{SITE_NAME}</h1>
        <h2 className="text-lg text-foreground-secondary mb-4">
          {SECTION_INFO.map((s) => s.name).join(" / ")}
        </h2>
        <p className="text-foreground-secondary mb-8 max-w-2xl mx-auto">
          {SITE_DESCRIPTION}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {SECTION_INFO.map((section) => (
            <Link
              key={section.slug}
              href={`/${section.slug}`}
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-button transition-colors"
            >
              {section.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Latest Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={`${post.section}/${post.slug}`} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-accent hover:text-accent-button transition-colors font-semibold"
            >
              View all articles &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
        <p className="text-foreground-secondary mb-4">
          Questions, feedback, or want to contribute?
        </p>
        <EmailLink className="text-accent hover:text-accent-button transition-colors font-semibold">
          info@opendesk-edu.org
        </EmailLink>
      </section>
    </div>
  );
}
