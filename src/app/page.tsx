import Hero from "@/components/home/Hero";
import StartingCards from "@/components/home/StartingCards";
import CurrentRobotShowcase from "@/components/home/CurrentRobotShowcase";
import LatestBlogPost from "@/components/home/LatestBlogPost";
import SponsorMarquee from "@/components/home/SponsorMarquee";
import Sponsors from "@/components/home/Sponsors";
export default function HomePage() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <Hero />
      <div className="container mx-auto space-y-16 px-4 py-24 md:py-32">
        <StartingCards />

        <div className="scroll-mt-[20vh]">
          <SponsorMarquee />
        </div>

        <CurrentRobotShowcase />
        <hr className="border-2 border-gray-300 dark:border-zinc-700" />
        <LatestBlogPost />
        <hr className="border-2 border-gray-300 dark:border-zinc-700" />
        <div id="sponsors">
          <Sponsors />
        </div>
      </div>
    </div>
  );
}
