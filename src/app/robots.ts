import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://nlrobotics.org";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/server/", "/trpc/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
