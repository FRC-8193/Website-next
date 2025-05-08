import BlogPosts from "@/components/blog/BlogPosts";
// import { getAllPosts } from "@/app/server/blog";

export default async function LastBlogPost() {
  //   const posts = await getAllPosts();
  return <BlogPosts maxPosts={1} posts={[]} pagination={false} />;
}
