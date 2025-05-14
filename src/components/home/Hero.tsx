"use client";

import Image from "next/image";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full">
      <Image
        src="/images/team.png"
        alt="FRC Team 8193"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.h1
            className="font-montserrat mb-6 text-5xl font-black tracking-tight text-white italic sm:text-6xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              WebkitTextStroke: "3px black",
              paintOrder: "stroke fill",
            }}
          >
            New Lothrop Robotics
          </motion.h1>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-xl text-zinc-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            FRC Team 8193 - The Steel Stingers
          </motion.p>
        </div>
      </div>
    </div>
  );
}
