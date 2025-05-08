import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
// import { z } from "zod";

export const blogRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return true;
  }),
});
