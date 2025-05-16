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
import { api } from "@/app/trpc/react";
import { Skeleton } from "../ui/skeleton";

export default function SponsorMarquee() {
  const sponsors = api.sponsor.list.useQuery();

  if (!sponsors || sponsors.data?.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
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
                Join Them
                <ArrowRight />
              </Button>
            </Link>
          </motion.div>
        </div>
        {sponsors.data ? (
          <Marquee
            pauseOnHover={true}
            gradient={true}
            autoFill={true}
            speed={75}
          >
            {sponsors.data?.map((sponsor) => {
              const sponsorContent = (
                <div className="mx-4 flex items-center justify-center overflow-hidden p-1">
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
              );

              return (
                <Tooltip key={sponsor.name} delayDuration={100}>
                  <TooltipTrigger asChild>
                    {sponsor.website ? (
                      <Link
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sponsorContent}
                      </Link>
                    ) : (
                      sponsorContent
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sponsor.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </Marquee>
        ) : (
          <Skeleton className="h-16 w-full" />
        )}
      </motion.div>
    </TooltipProvider>
  );
}
