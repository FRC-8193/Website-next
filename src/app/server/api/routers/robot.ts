import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const robotSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.string(),
  game: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  imageUrl: z.string(),
  imageAlt: z.string(),
});

export const robotRouter = createTRPCRouter({
  list: publicProcedure.output(z.array(robotSchema)).query(async () => {
    const contentDir = path.join(process.cwd(), "src/content/robots");
    try {
      const filenames = await fs.readdir(contentDir);
      const robotFiles = filenames.filter((filename) =>
        filename.endsWith(".json"),
      );

      const robotsData = await Promise.all(
        robotFiles.map(async (filename) => {
          const filePath = path.join(contentDir, filename);
          const fileContents = await fs.readFile(filePath, "utf8");
          const robot = robotSchema.parse(JSON.parse(fileContents));
          return robot;
        }),
      );
      // Sort robots by year, most recent first
      return robotsData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } catch (error) {
      console.error("Error reading robots data:", error);
      return [];
    }
  }),
});
