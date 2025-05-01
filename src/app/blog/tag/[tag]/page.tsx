import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import BlogPostCard from "@/components/blog/BlogPostCard";

// Generate metadata for the tag page
export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return {
    title: `${decodedTag} | FRC Team 8193 Steel Stingers Blog`,
    description: `View all blog posts tagged with ${decodedTag}`,
  };
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Link
          href="/blog"
          className="mb-4 inline-flex items-center gap-2 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to all posts
        </Link>

        <h1 className="text-4xl font-bold">Posts tagged with "{decodedTag}"</h1>
        <p className="mt-2 text-xl text-gray-600">
          Found {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            post={post}
            highlightedTag={decodedTag}
          />
        ))}
      </div>
    </main>
  );
}
