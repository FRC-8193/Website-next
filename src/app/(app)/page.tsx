import { client } from "@/clients/payload";

import Hero from "@/components/home/Hero";
import StartingCards from "@/components/home/StartingCards";
import CurrentRobotShowcase from "@/components/home/CurrentRobotShowcase";
import LatestBlogPost from "@/components/home/LatestBlogPost";
import SponsorMarquee from "@/components/home/SponsorMarquee";
import Sponsors from "@/components/home/Sponsors";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await client.find({
    collection: "post",
    sort: "-createdAt",
    where: {
      _status: {
        equals: "published",
      },
    },
    limit: 1,
  });

  console.log(posts.docs);

  const sponsors = await client.find({
    collection: "sponsor",
  });

  const robots = await client.find({
    collection: "robot",
  });

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <Hero />
      <div className="container mx-auto space-y-16 px-4 py-24 md:py-32">
        <StartingCards />

        <div className="scroll-mt-[20vh]">
          <SponsorMarquee sponsors={sponsors.docs} />
        </div>

        <CurrentRobotShowcase robots={robots.docs} />
        <hr className="border-2 border-gray-300 dark:border-zinc-700" />
        <LatestBlogPost post={posts.docs[0]} />
        <hr className="border-2 border-gray-300 dark:border-zinc-700" />
        <div id="sponsors">
          <Sponsors sponsors={sponsors.docs} />
        </div>
      </div>
    </div>
  );
}
