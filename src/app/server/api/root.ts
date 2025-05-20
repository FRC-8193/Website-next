import { blogRouter } from "./routers/blog";
import { sponsorRouter } from "./routers/sponsor";
import { createCallerFactory, createTRPCRouter } from "@/app/server/api/trpc";
import { robotRouter } from "./routers/robot";
import { emailRouter } from "./routers/email";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  blog: blogRouter,
  sponsor: sponsorRouter,
  robot: robotRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
