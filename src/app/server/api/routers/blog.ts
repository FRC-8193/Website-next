import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { z } from "zod";

export const blogRouter = createTRPCRouter({
  list: publicProcedure
    .output(
      z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          content: z.string(),
        }),
      ),
    )
    .query(async () => {
      return [
        {
          id: 1,
          title: "Blog Post 1",
          content: "This is the content of blog post 1",
        },
      ];
    }),
});
