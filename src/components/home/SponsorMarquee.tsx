"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SponsorMarquee() {
  interface Sponsor {
    name: string;
    image: string;
  }

  const sponsors: Sponsor[] = [
    { name: "Sponsor 1", image: "/images/team.png" },
    { name: "Sponsor 2", image: "/images/team.png" },
    { name: "Sponsor 3", image: "/images/team.png" },
  ];

  return (
    <TooltipProvider>
      <div style={{ overflow: "hidden" }}>
        <div className="mb-12 flex flex-row items-center justify-center gap-4 py-2">
          <h1 className="text-center text-2xl font-bold lg:text-4xl">
            Our Sponsors
          </h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/contact">
              <Button variant="outline" className="cursor-pointer">
                Become One
                <ArrowRight />
              </Button>
            </Link>
          </motion.div>
        </div>
        <Marquee pauseOnHover={true} gradient={true} autoFill={true} speed={75}>
          {sponsors.map((sponsor) => (
            <Tooltip key={sponsor.name} delayDuration={100}>
              <TooltipTrigger asChild>
                <div className="mx-4 flex cursor-default items-center justify-center overflow-hidden p-1">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative h-16 w-24"
                  >
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </motion.div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{sponsor.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </Marquee>
      </div>
    </TooltipProvider>
  );
}
