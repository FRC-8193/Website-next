"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { api } from "@/app/trpc/react";
import { Skeleton } from "../ui/skeleton";

export default function Sponsors() {
  const sponsors = api.sponsor.list.useQuery();

  if (!sponsors.data || sponsors.data.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-foreground mb-8 text-center text-3xl font-bold">
        Our Sponsors
      </h2>
      {sponsors.data ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-7xl px-4"
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {sponsors.data.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group hover:bg-muted/50 flex flex-col items-center justify-center gap-3 rounded-lg p-4 transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-24 w-36"
                >
                  {sponsor.website ? (
                    <Link
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        className="object-contain transition-opacity group-hover:opacity-90"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      className="object-contain transition-opacity group-hover:opacity-90"
                    />
                  )}
                </motion.div>
                <p className="text-muted-foreground group-hover:text-foreground text-center text-sm font-medium transition-colors">
                  {sponsor.name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-lg p-4"
              >
                <Skeleton className="h-24 w-36" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
