"use client";

import Hero from "@/components/home/Hero";
import StartingCards from "@/components/home/StartingCards";
import CurrentRobotShowcase from "@/components/home/CurrentRobotShowcase";
// import LastBlogPost from "@/components/home/LastBlogPost";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-24">
        <StartingCards />
        <CurrentRobotShowcase />
        {/* <LastBlogPost /> */}
      </div>
    </div>
  );
}
