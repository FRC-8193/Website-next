"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Back } from "@/components/ui/back";

export default function TagNotFound() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Back />
      </div>

      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-8 text-8xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            🏷️
          </motion.div>

          <motion.h1
            className="mb-4 text-4xl font-bold text-black dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tag Not Found
          </motion.h1>

          <motion.p
            className="mb-8 text-lg text-gray-600 dark:text-zinc-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Sorry, we couldn&apos;t find any posts with this tag. The tag might
            not exist or there are no published posts associated with it.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
              >
                Browse All Posts
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:focus:ring-white"
              >
                Go Home
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
