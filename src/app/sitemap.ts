import type { MetadataRoute } from "next";
import { client } from "~/clients/payload";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nlrobotics.org";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/robots`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  try {
    // Dynamic routes from Payload CMS
    const [posts, tags] = await Promise.all([
      client.find({
        collection: "post",
        sort: "-createdAt",
        limit: 1000,
      }),
      client.find({
        collection: "tag",
        sort: "name",
        limit: 1000,
      }),
    ]);

    // Blog post routes
    const postRoutes: MetadataRoute.Sitemap = posts.docs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const tagRoutes: MetadataRoute.Sitemap = tags.docs.map((tag) => ({
      url: `${baseUrl}/blog/tag/${encodeURIComponent(tag.name.toLowerCase().replace(/\s+/g, "-"))}`,
      lastModified: new Date(tag.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

    return [...staticRoutes, ...postRoutes, ...tagRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static routes only if there's an error with dynamic content
    return staticRoutes;
  }
}
