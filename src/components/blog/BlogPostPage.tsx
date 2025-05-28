import BlogPageClient from "./BlogPageClient";
import { client } from "@/clients/payload";

export default async function BlogPostPage() {
  const posts = await client.find({
    collection: "post",
    where: {
      _status: {
        equals: "published",
      },
    },
  });
  const tags = await client.find({ collection: "tag" });

  return <BlogPageClient posts={posts.docs} tags={tags.docs} />;
}
