"use client";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";
import Link from "next/link";
import { api } from "@/app/trpc/react";
import { Skeleton } from "../ui/skeleton";
import styles from "./SponsorMarquee.module.css";
import type { AppRouter } from "~/app/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;

function SponsorsList({
  sponsors,
  ariaHidden,
}: {
  sponsors: RouterOutput["sponsor"]["list"];
  ariaHidden: boolean;
}) {
  return (
    <ul
      className={`${styles.infiniteScroll} inline-flex justify-around`}
      aria-hidden={ariaHidden}
    >
      {sponsors.map((sponsor) => {
        const sponsorContent = (
          <li className="mx-4 flex min-w-0 flex-[0_0_auto] items-center justify-center overflow-hidden p-1">
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
                  className="embla__slide__link"
                >
                  {sponsorContent}
                </Link>
              ) : (
                <div className="embla__slide__link">{sponsorContent}</div>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{sponsor.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </ul>
  );
}

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
        {sponsors.data ? (
          <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex">
              <SponsorsList sponsors={sponsors.data} ariaHidden={false} />
              <SponsorsList sponsors={sponsors.data} ariaHidden={true} />
            </div>
          </div>
        ) : (
          <Skeleton className="h-16 w-full" />
        )}
      </motion.div>
    </TooltipProvider>
  );
}
