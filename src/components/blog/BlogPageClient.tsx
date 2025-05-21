"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BlogPosts from "@/components/blog/BlogPosts";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { BlogPost } from "@/lib/types";

interface BlogPageClientProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const pageRef = useRef(null);
  const isInView = useInView(pageRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.main
      ref={pageRef}
      className="container mx-auto px-4 py-12 dark:bg-zinc-900"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={itemVariants} className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
          Team Blog
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-700 dark:text-zinc-300">
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
                key={tag}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={`/blog/tag/${tag}`}>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    {tag}
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
