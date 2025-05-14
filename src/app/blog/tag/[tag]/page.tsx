import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPosts from "@/components/blog/BlogPosts";
import { api } from "@/app/trpc/server";
import { Back } from "@/components/ui/back";
// Generate metadata for the tag page
export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  const postsForTag = await api.blog.getByTag({ tag: decodedTag });

  if (postsForTag.length === 0) {
    notFound();
  }

  return {
    title: `${decodedTag} | FRC Team 8193 Steel Stingers Blog`,
    description: `View all blog posts tagged with ${decodedTag}`,
  };
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await api.blog.getTags();

  return (
    tags?.map((tag: string | { name: string }) => ({
      tag: typeof tag === "string" ? tag : tag.name,
    })) || []
  );
}

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  const postsData = await api.blog.getByTag({ tag: decodedTag });

  if (postsData.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Back />

        <h1 className="text-4xl font-bold">
          Posts tagged with &quot;{decodedTag}&quot;
        </h1>
        <p className="mt-2 text-xl text-gray-600">
          Found {postsData.length} post{postsData.length !== 1 ? "s" : ""}
        </p>
      </div>

      {postsData.length > 0 && (
        <BlogPosts posts={postsData} highlightedTag={decodedTag} />
      )}
    </main>
  );
}
