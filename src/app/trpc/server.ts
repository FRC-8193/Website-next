import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { headers as getNextHeaders } from "next/headers";
import { cache } from "react";

import { type AppRouter, createCaller } from "@/app/server/api/root";
import { createTRPCContext } from "@/app/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component or during build time.
 */
const createContext = cache(async () => {
  let requestHeaders: Headers | undefined;

  // Only attempt to get headers if not in the production build phase
  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    try {
      // Attempt to get headers
      requestHeaders = new Headers(await getNextHeaders());
      requestHeaders.set("x-trpc-source", "rsc");
    } catch (error) {
      // This catch block is now for unexpected errors when getNextHeaders() is called outside the build phase.
      // Such errors are not typically expected during normal RSC or API route execution in dev/prod server.
      console.warn(
        "tRPC context: Unexpected error while trying to get headers outside of Next.js build phase:",
        error instanceof Error ? error.message : String(error),
      );
      // requestHeaders will remain undefined if an error occurs
    }
  }
  // If in build phase (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD),
  // requestHeaders remains undefined by default, and getNextHeaders() is not called, avoiding the warning.

  // Call createTRPCContext. If requestHeaders is undefined (either due to build phase or an error in other phases),
  // the createTRPCContext function (from src/app/server/api/trpc.ts) handles it by setting ctx.headers to undefined.
  return createTRPCContext(
    requestHeaders ? { headers: requestHeaders } : undefined,
  );
});

const getQueryClient = cache(createQueryClient);
// createCaller expects a function that returns the context promise.
// Our `createContext` is already an async function (due to cache wrapping an async fn) that returns the context promise.
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
