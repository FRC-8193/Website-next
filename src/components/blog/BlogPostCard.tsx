import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";
import { AuthorInfo } from "@/components/AuthorInfo";
import { motion, type Variants } from "motion/react";

interface BlogPostCardProps {
  post: BlogPost;
  highlightedTag?: string;
  variants?: Variants;
}

const BlogPostCard = ({
  post,
  highlightedTag,
  variants,
}: BlogPostCardProps) => {
  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg"
      variants={variants}
    >
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        {post.image && (
          <div className="relative aspect-video w-full">
            <Image
              src={post.image}
              alt={post.imageAlt ?? "Blog post image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-grow flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <time className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  tag === highlightedTag
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="mb-2 text-2xl font-bold text-black">{post.title}</h2>
          <p className="mb-4 flex-grow text-gray-700">{post.excerpt}</p>
          <div className="mt-auto">
            <AuthorInfo author={post.author} size="sm" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogPostCard;
