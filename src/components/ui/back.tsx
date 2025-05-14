"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function Back() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="mb-5 cursor-pointer"
      variant="outline"
    >
      <ChevronLeftIcon />
      Back
    </Button>
  );
}
