import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/app/trpc/server";
import { Badge } from "@/components/ui/badge";
import BlogPosts from "@/components/blog/BlogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest news, updates, and stories from FRC Team 8193 Steel Stingers.",
};

export default async function BlogPage() {
  const posts = await api.blog.getPosts();
  const tags = await api.blog.getTags();

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
            <Link key={tag} href={`/blog/tag/${tag}`}>
              <Badge variant="outline">{tag}</Badge>
            </Link>
          ))}
        </div>
      </div>

      <BlogPosts posts={posts} />
    </main>
  );
}
