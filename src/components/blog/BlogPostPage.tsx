import { api } from "@/app/trpc/server";
import BlogPageClient from "./BlogPageClient";

export default async function BlogPostPage() {
  const posts = await api.blog.getPosts();
  const tags = await api.blog.getTags();

  return <BlogPageClient posts={posts} tags={tags} />;
}
