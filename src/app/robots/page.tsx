import React from "react";
import RobotsPage from "@/components/robots/RobotsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots",
};

export default async function Robots() {
  return <RobotsPage />;
}
