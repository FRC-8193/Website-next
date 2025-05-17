import type { Metadata } from "next";
import BlogPostPage from "@/components/blog/BlogPostPage";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogRoutePage() {
  return <BlogPostPage />;
}
