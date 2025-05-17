"use client";

import React from "react";
import RobotCard from "@/components/robots/RobotCard";
import { motion } from "motion/react";
import { api } from "../trpc/react";

export default function RobotsPage() {
  const robots = api.robot.list.useQuery();

  return (
    <div className="bg-white py-12 md:py-20">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="container mx-auto mb-12 px-4 text-center md:mb-20"
      >
        <h1 className="text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
          Our Robots
        </h1>
        <p className="mt-4 text-lg text-[#333] sm:text-xl">
          Explore the evolution of our robots over the years.
        </p>
      </motion.header>

      <main>
        {robots.data?.map((robot, index) => (
          <RobotCard key={robot.id} robot={robot} index={index} />
        ))}
      </main>
    </div>
  );
}
