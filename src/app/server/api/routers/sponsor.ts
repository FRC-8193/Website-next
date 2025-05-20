import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const sponsorSchema = z.object({
  name: z.string(),
  image: z.string(),
  website: z.string().url().optional(),
});

export const sponsorRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const sponsorsDir = path.join(process.cwd(), "src/content/sponsors");
    try {
      const dirents = await fs.readdir(sponsorsDir, { withFileTypes: true });
      const sponsorPromises = dirents
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json"))
        .map(async (dirent) => {
          const filePath = path.join(sponsorsDir, dirent.name);
          const fileContent = await fs.readFile(filePath, "utf-8");

          return sponsorSchema.parse(JSON.parse(fileContent));
        });
      const sponsors = await Promise.all(sponsorPromises);
      return sponsors;
    } catch (error) {
      console.error("Failed to read or parse sponsor files:", error);
      return [];
    }
  }),
});
