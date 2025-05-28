import React from "react";
import RobotsPage from "@/components/robots/RobotsPage";
import type { Metadata } from "next";
import { client } from "~/clients/payload";

export const metadata: Metadata = {
  title: "Robots",
};

export default async function Robots() {
  const robots = await client.find({
    collection: "robot",
    sort: "-createdAt",
  });

  return <RobotsPage robots={robots.docs} />;
}
