"use client";

import Image from "next/image";
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
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import AutoPlay from "embla-carousel-autoplay";
export default function SponsorMarquee() {
  const sponsors = api.sponsor.list.useQuery();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: 2,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
    AutoPlay({
      playOnInit: true,
    }),
  ]);

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
          <h1 className="text-center text-2xl font-bold sm:text-3xl lg:text-4xl">
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
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {sponsors.data?.map((sponsor) => {
                const sponsorContent = (
                  <div className="embla__slide mx-4 flex min-w-0 flex-[0_0_auto] items-center justify-center overflow-hidden p-1">
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
                          className="embla__slide__link"
                        >
                          {sponsorContent}
                        </Link>
                      ) : (
                        <div className="embla__slide__link">
                          {sponsorContent}
                        </div>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{sponsor.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ) : (
          <Skeleton className="h-16 w-full" />
        )}
      </motion.div>
    </TooltipProvider>
  );
}
