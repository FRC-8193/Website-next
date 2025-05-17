import Hero from "@/components/home/Hero";
import StartingCards from "@/components/home/StartingCards";
import CurrentRobotShowcase from "@/components/home/CurrentRobotShowcase";
import LatestBlogPost from "@/components/home/LatestBlogPost";
import SponsorMarquee from "@/components/home/SponsorMarquee";
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto space-y-16 px-4 py-24 md:py-32">
        <StartingCards />
        <div id="sponsors" className="scroll-mt-[20vh]">
          <SponsorMarquee />
        </div>
        <CurrentRobotShowcase />
        <LatestBlogPost />
      </div>
    </div>
  );
}
