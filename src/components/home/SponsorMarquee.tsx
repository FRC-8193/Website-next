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
import styles from "./SponsorMarquee.module.css";
import type { Sponsor, Media } from "@/payload-types";

function SponsorsList({
  sponsors,
  ariaHidden,
}: {
  sponsors: Sponsor[];
  ariaHidden: boolean;
}) {
  return (
    <ul
      className={`${styles.infiniteScroll} inline-flex justify-around`}
      aria-hidden={ariaHidden}
    >
      {sponsors.map((sponsor) => {
        const sponsorContent = (
          <li className="mx-2 flex min-w-0 flex-[0_0_auto] items-center justify-center overflow-hidden p-1 sm:mx-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative h-10 w-16 sm:h-12 sm:w-20 md:h-16 md:w-24"
            >
              <div className="block dark:hidden">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL! +
                    ((sponsor.image as Media).url ?? "")
                  }
                  alt={sponsor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
              <div className="hidden dark:block">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL! +
                    ((sponsor.imageDark as Media).url ?? "")
                  }
                  alt={sponsor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </div>
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
        <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex">
            <SponsorsList sponsors={sponsors} ariaHidden={false} />
            <SponsorsList sponsors={sponsors} ariaHidden={true} />
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
