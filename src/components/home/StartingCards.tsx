"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RocketIcon, InfoIcon, Book } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function StartingCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const listRef = useRef(null);
  const isInView = useInView(listRef, { amount: 0.25, once: true });

  return (
    <motion.ul
      ref={listRef}
      className="grid grid-cols-1 gap-8 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.li variants={itemVariants}>
        <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-xl dark:shadow-white/20">
          <CardHeader>
            <RocketIcon className="mb-2 h-6 w-6 text-black dark:text-white" />
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              Our goal as a team is to learn and work together, and to improve
              year after year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-300">
              We hope to inspire and teach the younger generations, and to help
              improve the world with whatever we plan to do after high school.
            </p>
          </CardContent>
        </Card>
      </motion.li>

      <motion.li variants={itemVariants}>
        <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-xl dark:shadow-white/20">
          <CardHeader>
            <InfoIcon className="mb-2 h-6 w-6 text-black dark:text-white" />
            <CardTitle>About Us</CardTitle>
            <CardDescription>
              We are the New Lothrop FIRST Organization - Determined, inventive,
              and hardworking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-300">
              Our team is composed of members between the seventh and twelfth
              grade. We were established in 2020, and have been growing since
              our rookie year.
            </p>
          </CardContent>
        </Card>
      </motion.li>

      <motion.li variants={itemVariants}>
        <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-xl dark:shadow-white/20">
          <CardHeader>
            <Book className="mb-2 h-6 w-6 text-black dark:text-white" />
            <CardTitle>Read Our Blog</CardTitle>
            <CardDescription>
              Our blog is where we post updates and information about our team,
              or FIRST in general.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-300">
              If you are ever interested in reading about build season,
              competition season, or off season, this is where you wll find it!
            </p>
          </CardContent>
        </Card>
      </motion.li>
    </motion.ul>
  );
}
