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
import { RocketIcon, InfoIcon, ExternalLinkIcon } from "lucide-react";
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
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
            <motion.h1
              className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Steel Stingers
            </motion.h1>
            <motion.p
              className="mx-auto mb-8 max-w-2xl text-xl text-zinc-200"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              FRC Team 8193 from New Lothrop building robots and engineering the
              future.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200"
              >
                Learn More
              </Button>
            </motion.div>
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
            Our team is dedicated to building innovative robots and developing
            the next generation of engineers and technology leaders.
          </p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={itemVariants}>
            <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <RocketIcon className="mb-2 h-6 w-6 text-black" />
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Building the next generation of engineers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">
                  Our team focuses on innovation, teamwork, and technical
                  excellence in the FIRST Robotics Competition.
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
            <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <InfoIcon className="mb-2 h-6 w-6 text-black" />
                <CardTitle>About Us</CardTitle>
                <CardDescription>
                  Meet the team behind the robots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">
                  We are a diverse group of students and mentors passionate
                  about science, technology, and engineering.
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
            <Card className="h-full border-zinc-200 transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <ExternalLinkIcon className="mb-2 h-6 w-6 text-black" />
                <CardTitle>Get Involved</CardTitle>
                <CardDescription>Join us in our journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">
                  Whether you&apos;re a student, mentor, or sponsor, there are
                  many ways to be part of our robotics family.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="mt-4">
                  Contact Us
                </Button>
              </CardFooter>
            </Card>
          </motion.li>
        </motion.ul>
      </div>
    </div>
  );
}
