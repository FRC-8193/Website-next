"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import type { Media, Robot } from "@/payload-types";

// const formattedRobotName = robotName.toLowerCase().replace(/\s+/g, "-");

export default function CurrentRobotShowcase({ robots }: { robots: Robot[] }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.25, once: true });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const textChildVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.4 + i * 0.07, duration: 0.3 },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: (robots[0]?.features?.length ?? 0) * 0.07 + 0.1 + 0.4,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="bg-white text-black dark:bg-zinc-900 dark:text-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      aria-labelledby="current-robot-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left Column: Text Content */}
          <motion.div className="text-left" variants={textContainerVariants}>
            <motion.h2
              id="current-robot-heading"
              className="mb-2 text-3xl font-bold text-black sm:text-4xl lg:text-5xl dark:text-white"
              variants={textChildVariants}
            >
              {robots[0]?.name} - {robots[0]?.year}
            </motion.h2>
            <motion.p
              className="mb-4 text-sm font-medium text-[#333] sm:text-base dark:text-zinc-300"
              variants={textChildVariants}
            >
              {robots[0]?.game}
            </motion.p>
            <motion.p
              className="mb-6 text-base text-[#333] sm:text-lg dark:text-zinc-300"
              variants={textChildVariants}
            >
              {robots[0]?.description}
            </motion.p>

            <motion.h3
              className="mb-3 text-xl font-semibold text-black sm:text-2xl dark:text-white"
              variants={textChildVariants}
            >
              Key Features:
            </motion.h3>
            <motion.ul className="mb-8 list-inside list-disc space-y-2 text-[#333] dark:text-zinc-300">
              {robots[0]?.features.map((feature, index) => (
                <motion.li
                  key={feature.id}
                  custom={index}
                  variants={listItemVariants}
                  className="text-base sm:text-lg"
                >
                  {feature.feature}
                </motion.li>
              ))}
            </motion.ul>
            <Link href="/robots">
              <motion.div
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="inline-block rounded-md bg-black px-8 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#333] focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none active:bg-gray-700 sm:text-lg dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
              >
                Meet Our Robots
              </motion.div>
            </Link>
          </motion.div>

          {robots[0]?.image && (
            <motion.div
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl"
              variants={imageVariants}
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_BASE_URL! +
                  ((robots[0]?.image as Media).url ?? "")
                }
                alt={robots[0]?.imageAlt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transform object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                priority
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
