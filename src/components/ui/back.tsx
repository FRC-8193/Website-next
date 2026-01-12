"use client";

import { ChevronLeftIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function Back() {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="mb-3 w-fit"
    >
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="cursor-pointer"
      >
        <ChevronLeftIcon />
        Back
      </Button>
    </motion.div>
  );
}
