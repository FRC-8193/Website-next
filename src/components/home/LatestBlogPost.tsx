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

const NoPostsState = () => (
  <motion.div
    className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-zinc-600 dark:bg-zinc-800"
    variants={itemVariants}
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-700">
      <svg
        className="h-8 w-8 text-gray-400 dark:text-zinc-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      No Blog Posts Yet
    </h3>
    <p className="mb-4 text-sm text-gray-600 dark:text-zinc-400">
      We&apos;re working on some exciting content. Check back soon for the
      latest updates from our team!
    </p>
    <Link
      href="/blog"
      className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
      tabIndex={0}
      aria-label="Visit blog page to see all posts"
    >
      Visit Blog Page
      <svg
        className="ml-2 h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </Link>
  </motion.div>
);

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
        {/* Left Column: Latest Blog Post or No Posts State */}
        {!post ? (
          <NoPostsState />
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
            {post ? "Latest Blog Post" : "Our Blog"}
          </motion.h2>
          <motion.p
            className="mb-6 text-[#333] sm:text-lg dark:text-zinc-300"
            variants={itemVariants}
          >
            {post
              ? "Discover the latest news, updates, and stories from our team. We share our journey, technical deep dives, and event highlights."
              : "Stay tuned for exciting content from FRC Team 8193 The Steel Stingers. We&apos;ll be sharing our robotics journey, technical insights, and competition updates."}
          </motion.p>
          <Link href="/blog" passHref>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-block cursor-pointer rounded-md bg-black px-8 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#333] focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none active:bg-gray-700 sm:text-lg dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
              tabIndex={0}
              aria-label="Explore all blog posts"
            >
              {post ? "Explore All Posts" : "Visit Our Blog"}
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
