"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Sponsor, Media } from "@/payload-types";

export default function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <section className="py-12">
      <h2 className="text-foreground mb-8 text-center text-3xl font-bold">
        Our Sponsors
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-7xl px-4"
      >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sponsors.map((sponsor) => (
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
                    {sponsor.image && (
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
                    )}
                    {sponsor.imageDark && (
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
                    )}
                  </Link>
                ) : (
                  <>
                    {sponsor.image && (
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
                    )}
                    {sponsor.imageDark && (
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
                    )}
                  </>
                )}
              </motion.div>
              <p className="text-muted-foreground group-hover:text-foreground text-center text-sm font-medium transition-colors">
                {sponsor.name}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
