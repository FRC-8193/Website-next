import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AuthorInfo } from "@/components/AuthorInfo";
import { client } from "@/clients/payload";
import type { Media, Tag, User } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Back } from "@/components/ui/back";
import { notFound } from "next/navigation";

// Generate metadata for the blog post
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  // Await the params.slug before using it
  const slugInPur = params.slug;
  const post = (
    await client.find({
      collection: "post",
      where: {
        slug: { equals: slugInPur },
        _status: {
          equals: "published",
        },
      },
    })
  ).docs[0];

  if (!post) return {};

  const openGraphImages = (post.coverImage as Media | undefined)?.url
    ? [
        {
          url: (post.coverImage as Media).url!,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt ?? "Blog post image",
        },
      ]
    : [];

  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title ?? undefined,
      description: post.subtitle ?? undefined,
      images: openGraphImages,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await client.find({
    collection: "post",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return posts.docs?.map((post) => ({
    slug: String(post.id),
  }));
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = (
    await client.find({
      collection: "post",
      where: {
        slug: { equals: params.slug },
        _status: {
          equals: "published",
        },
      },
    })
  ).docs[0];

  if (!post) notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <Back />

        <div className="mb-8 flex items-start justify-between border-b border-gray-400 pb-8">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-black dark:text-white">
              {post.title}
            </h1>
            <time className="mb-2 block text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Link key={tag.id} href={`/blog/tag/${(tag.tag as Tag).name}`}>
                  <Badge
                    variant="outline"
                    className="text-black dark:text-white"
                  >
                    {(tag.tag as Tag).name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <AuthorInfo author={post.author as User} size="lg" />
        </div>

        {post.coverImage && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
            <Image
              src={
                process.env.NEXT_PUBLIC_BASE_URL! +
                ((post.coverImage as Media).url ?? "")
              }
              alt={post.coverImageAlt ?? "Blog post image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <article className="prose prose-lg dark:prose-invert mb-12 max-w-none">
          <RichText data={post.content} />
        </article>

        <div className="mt-8 border-t border-gray-400 pt-8">
          <AuthorInfo author={post.author as User} size="lg" />
        </div>
      </div>
    </main>
  );
}
