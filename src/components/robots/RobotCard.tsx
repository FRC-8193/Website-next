"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface Robot {
  id: string;
  name: string;
  year: string;
  game: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
}

interface RobotCardProps {
  robot: Robot;
  index: number;
}

export default function RobotCard({ robot, index }: RobotCardProps) {
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.2 },
    },
  };

  const textContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const textChildVariants = {
    hidden: { opacity: 0, x: isEven ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: isEven ? 30 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.1 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.07, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      className="mb-16 md:mb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      aria-labelledby={`robot-name-${robot.id}`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
            isEven ? "md:grid-flow-row" : "md:grid-flow-row-dense"
          }`}
        >
          {/* Image Column */}
          <motion.div
            className={`group relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl ${
              isEven ? "md:col-start-2" : "md:col-start-1"
            }`}
            variants={imageVariants}
          >
            <Image
              src={robot.imageUrl}
              alt={robot.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="transform object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              priority={index < 2}
            />
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            className={`text-left ${isEven ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"}`}
            variants={textContainerVariants}
          >
            <motion.h2
              className="mb-2 text-3xl font-bold text-black sm:text-4xl dark:text-white"
              variants={textChildVariants}
            >
              {robot.name} - {robot.year}
            </motion.h2>
            <motion.p
              className="mb-4 text-sm font-medium text-[#333] sm:text-base dark:text-zinc-300"
              variants={textChildVariants}
            >
              {robot.game}
            </motion.p>
            <motion.p
              className="mb-6 text-base text-[#333] sm:text-lg dark:text-zinc-300"
              variants={textChildVariants}
            >
              {robot.description}
            </motion.p>

            <motion.h3
              className="mb-3 text-xl font-semibold text-black sm:text-2xl dark:text-white"
              variants={textChildVariants}
            >
              Key Features:
            </motion.h3>
            <motion.ul className="mb-8 list-inside list-disc space-y-2 text-[#333] dark:text-zinc-300">
              {robot.features.map((feature, featureIndex) => (
                <motion.li
                  key={`${robot.id}-feature-${featureIndex}`}
                  custom={featureIndex}
                  variants={listItemVariants}
                  className="text-base sm:text-lg"
                >
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
