"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BlogPosts from "@/components/blog/BlogPosts";
import { motion } from "motion/react";
import type { Post, Tag } from "@/payload-types";

interface BlogPageClientProps {
  posts: Post[];
  tags: Tag[];
}

export default function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.main
      className="min-h-screen bg-white px-4 py-16 text-black sm:px-6 sm:py-24 lg:px-8 dark:bg-zinc-900 dark:text-white"
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={headerVariants} className="mb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
          Team Blog
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-zinc-300">
          Latest news, updates, and stories from FRC Team 8193 The Steel
          Stingers
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <BlogPosts posts={posts} />
      </motion.div>

      {tags.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="mt-12 border-t border-gray-200 pt-8 dark:border-zinc-700"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h3 className="mr-3 text-lg font-semibold text-gray-700 dark:text-zinc-300">
              Filter by tags:
            </h3>
            {tags.map((tag) => (
              <motion.div
                key={tag.id}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={`/blog/tag/${tag.name}`}>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    {tag.name}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}
