"use client";

import Image from "next/image";
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
import { motion } from "motion/react";

export default function HomePage() {
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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
              FRC Team 8193 from New Lothrop slogan slogan slogan
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl">
            Engineering the Future
          </h2>
          <p className="text-lg text-zinc-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={itemVariants}>
            <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <RocketIcon className="mb-2 h-6 w-6 text-black" />
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore
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
                <InfoIcon className="mb-2 h-6 w-6 text-black" />
                <CardTitle>About Us</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore
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
                <Book className="mb-2 h-6 w-6 text-black" />
                <CardTitle>Read Our Blog</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore
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
      </div>
    </div>
  );
}
