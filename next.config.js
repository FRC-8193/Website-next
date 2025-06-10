import { withPayload } from "@payloadcms/next/withPayload";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "nlrobotics.org",
      },
    ],
  },
  experimental: {
    isrFlushToDisk: false,
  },
};

export default withPayload(config);
