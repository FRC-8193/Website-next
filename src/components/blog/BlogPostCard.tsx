import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { AuthorInfo } from "@/components/AuthorInfo";
import type { Media, Post, Tag, User } from "@/payload-types";

interface BlogPostCardProps {
  post: Post;
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
      className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg dark:border-zinc-700 dark:shadow-white/20"
      variants={variants}
    >
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        {post.coverImage && (
          <div className="relative aspect-video w-full">
            <Image
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                ((post.coverImage as Media).url ?? "")
              }
              fill
              alt={post.coverImageAlt ?? "Blog post image"}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex grow flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <time className="text-sm text-gray-500 dark:text-zinc-400">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.tags?.map((tag) => (
              <span
                key={tag.id}
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  tag === highlightedTag
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-300"
                }`}
              >
                {(tag.tag as Tag).name}
              </span>
            ))}
          </div>
          <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
            {post.title}
          </h2>
          <p className="mb-4 grow text-gray-700 dark:text-zinc-300">
            {post.subtitle}
          </p>
          <div className="mt-auto">
            <AuthorInfo author={post.author as User} size="sm" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogPostCard;
