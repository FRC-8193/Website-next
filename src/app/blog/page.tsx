import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/app/server/blog";
import BlogPostCard from "@/components/blog/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest news, updates, and stories from FRC Team 8193 Steel Stingers.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Team Blog</h1>
        <p className="mx-auto max-w-2xl text-xl">
          Latest news, updates, and stories from FRC Team 8193 Steel Stingers
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <span className="mr-2 font-semibold">Filter by tags:</span>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="rounded-full bg-black px-3 py-1 text-white transition-colors hover:bg-gray-800"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
