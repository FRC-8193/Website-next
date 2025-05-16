import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";
import { AuthorInfo } from "@/components/AuthorInfo";

interface BlogPostCardProps {
  post: BlogPost;
  highlightedTag?: string;
}

const BlogPostCard = ({ post, highlightedTag }: BlogPostCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        {post.image && (
          <div className="relative aspect-video">
            <Image
              src={post.image}
              alt={post.imageAlt ?? "Blog post image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <time className="text-sm text-gray-500">
              {post.date.toLocaleDateString("en-US")}
            </time>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2 py-1 text-xs ${
                  tag === highlightedTag ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
          <p className="mb-4 text-gray-600">{post.excerpt}</p>
          <AuthorInfo author={post.author} size="sm" />
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
