import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPosts from "@/components/blog/BlogPosts";
import { client } from "@/clients/payload";
import { Back } from "@/components/ui/back";
// Generate metadata for the tag page
export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  const postsForTag = await client.find({
    collection: "post",
    where: {
      "tags.tag.name": { in: decodedTag },
      _status: {
        equals: "published",
      },
    },
  });

  if (postsForTag.docs.length === 0) {
    notFound();
  }

  return {
    title: decodedTag,
  };
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await client.find({
    collection: "tag",
  });

  return (
    tags.docs?.map((tag) => ({
      tag: tag.name,
    })) || []
  );
}

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  const postsForTag = (
    await client.find({
      collection: "post",
      where: {
        "tags.tag.name": { equals: decodedTag },
        _status: {
          equals: "published",
        },
      },
    })
  ).docs;

  if (postsForTag.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <Back />

        <h1 className="text-4xl font-bold dark:text-white">
          Posts tagged with &quot;{decodedTag}&quot;
        </h1>
        <p className="mt-2 text-xl text-gray-600 dark:text-zinc-400">
          Found {postsForTag.length} post{postsForTag.length !== 1 ? "s" : ""}
        </p>
      </div>

      {postsForTag.length > 0 && (
        <BlogPosts posts={postsForTag} highlightedTag={decodedTag} />
      )}
    </main>
  );
}
