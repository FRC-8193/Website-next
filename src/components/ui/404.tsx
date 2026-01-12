"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Page404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center text-black sm:px-6 lg:px-8 dark:bg-zinc-900 dark:text-white">
      <motion.div
        className="max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-6xl font-extrabold tracking-tight text-black sm:text-8xl md:text-9xl dark:text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.p
          className="mt-4 text-xl text-gray-700 sm:text-2xl dark:text-zinc-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Oops! It looks like this page took a wrong turn.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
          >
            Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
