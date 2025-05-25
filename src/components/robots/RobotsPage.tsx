"use client";

import React from "react";
import RobotCard from "@/components/robots/RobotCard";
import { motion } from "motion/react";
import { api } from "@/app/trpc/react";

export default function RobotsPage() {
  const robots = api.robot.list.useQuery();

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
    <motion.div
      className="min-h-screen bg-white px-4 py-16 text-black sm:px-6 sm:py-24 lg:px-8 dark:bg-zinc-900 dark:text-white"
      initial="hidden"
      animate="visible"
    >
      <motion.header className="mb-16 text-center" variants={headerVariants}>
        <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
          Our Robots
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-zinc-300">
          Explore the evolution of our robots over the years.
        </p>
      </motion.header>

      <main>
        {robots.data?.map((robot, index) => (
          <RobotCard key={robot.id} robot={robot} index={index} />
        ))}
      </main>
    </motion.div>
  );
}
