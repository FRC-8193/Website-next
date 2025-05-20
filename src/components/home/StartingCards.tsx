"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RocketIcon, InfoIcon, Book } from "lucide-react";
import Link from "next/link";
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
        <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <RocketIcon className="mb-2 h-6 w-6 text-black dark:text-white" />
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="mt-4">
              Read More
            </Button>
          </CardFooter>
        </Card>
      </motion.li>

      <motion.li variants={itemVariants}>
        <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <InfoIcon className="mb-2 h-6 w-6 text-black dark:text-white" />
            <CardTitle>About Us</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="mt-4">
              Team Members
            </Button>
          </CardFooter>
        </Card>
      </motion.li>

      <motion.li variants={itemVariants}>
        <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <Book className="mb-2 h-6 w-6 text-black dark:text-white" />
            <CardTitle>Read Our Blog</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/blog">
              <Button
                variant="outline"
                size="sm"
                className="mt-4 cursor-pointer"
              >
                Go to the Blog Page
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.li>
    </motion.ul>
  );
}
