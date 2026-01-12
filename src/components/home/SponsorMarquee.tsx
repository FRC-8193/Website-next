"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Media, Sponsor } from "@/payload-types";

export default function SponsorMarquee({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Marquee fade={true} direction="left" className="[--duration:30s]">
          {sponsors.map((sponsor) => {
            const sponsorContent = (
              <li className="mx-2 flex min-w-0 flex-[0_0_auto] items-center justify-center overflow-hidden p-1 sm:mx-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-10 w-16 sm:h-12 sm:w-20 md:h-16 md:w-24"
                >
                  {sponsor.image && (
                    <div className="block dark:hidden">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          ((sponsor.image as Media).url ?? "")
                        }
                        alt={sponsor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  )}
                  {sponsor.imageDark && (
                    <div className="hidden dark:block">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          ((sponsor.imageDark as Media).url ?? "")
                        }
                        alt={sponsor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  )}
                </motion.div>
              </li>
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
                    <div>{sponsorContent}</div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{sponsor.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </Marquee>
      </motion.div>
    </TooltipProvider>
  );
}
