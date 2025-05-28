"use client";

import BlogPosts from "@/components/blog/BlogPosts";
import { motion } from "motion/react";

import Link from "next/link";
import type { Post } from "@/payload-types";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function LatestBlogPost({ post }: { post?: Post }) {
  return (
    <motion.section
      className="text-black dark:text-white"
      variants={sectionVariants}
      initial="hidden"
      // animate={isInView ? "visible" : "hidden"} TODO: fix in view animation
      animate="visible"
    >
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
        {/* Left Column: Latest Blog Post */}
        {!post ? (
          <h1 className="text-center text-lg dark:text-white">
            No posts available.
          </h1>
        ) : (
          <motion.div variants={itemVariants}>
            <BlogPosts posts={[post]} pagination={false} maxPosts={1} />
          </motion.div>
        )}

        {/* Right Column: Text Content */}
        <motion.div
          className="flex flex-col justify-end text-right"
          variants={itemVariants}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold text-black sm:text-4xl lg:text-5xl dark:text-white"
            variants={itemVariants}
          >
            Latest Blog Post
          </motion.h2>
          <motion.p
            className="mb-6 text-[#333] sm:text-lg dark:text-zinc-300"
            variants={itemVariants}
          >
            Discover the latest news, updates, and stories from our team. We
            share our journey, technical deep dives, and event highlights.
          </motion.p>
          <Link href="/blog" passHref>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-block cursor-pointer rounded-md bg-black px-8 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#333] focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none active:bg-gray-700 sm:text-lg dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
            >
              Explore All Posts
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
