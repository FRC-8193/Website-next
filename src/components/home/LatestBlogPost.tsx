"use client";

import BlogPosts from "@/components/blog/BlogPosts";
import { api } from "@/app/trpc/react";
import { motion } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import LoadingSpinner from "../ui/loading";

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

export default function LatestBlogPost() {
  const posts = api.blog.getPosts.useQuery();

  const sectionRef = useRef(null);
  // const isInView = useInView(sectionRef, { amount: 0.25, once: true });

  if (posts.isLoading) {
    return (
      <section>
        <div className="flex items-center justify-center gap-4">
          <LoadingSpinner />
          Loading latest post...
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      className="text-black"
      variants={sectionVariants}
      initial="hidden"
      // animate={isInView ? "visible" : "hidden"} TODO: fix in view animation
      animate="visible"
    >
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
        {/* Left Column: Latest Blog Post */}
        {posts.error ? (
          <h1 className="text-center text-lg text-red-600">
            An error occurred while loading posts.
          </h1>
        ) : posts.data?.length === 0 ? (
          <h1 className="text-center text-lg">No posts available.</h1>
        ) : (
          <motion.div variants={itemVariants}>
            <BlogPosts
              maxPosts={1}
              posts={posts.data as BlogPost[]}
              pagination={false}
            />
          </motion.div>
        )}

        {/* Right Column: Text Content */}
        <motion.div className="text-right" variants={itemVariants}>
          <motion.h2
            className="mb-4 text-3xl font-bold text-black sm:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            Latest Blog Post
          </motion.h2>
          <motion.p
            className="mb-6 text-base text-[#333] sm:text-lg"
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
              className="inline-block cursor-pointer rounded-md bg-black px-8 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#333] focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none active:bg-gray-700 sm:text-lg"
            >
              Explore All Posts
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
