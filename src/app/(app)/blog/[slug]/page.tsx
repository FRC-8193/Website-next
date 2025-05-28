import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AuthorInfo } from "@/components/AuthorInfo";
import { api } from "@/app/trpc/server";
import { Back } from "@/components/ui/back";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Generate metadata for the blog post
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  // Await the params.slug before using it
  const slug = params.slug;
  const post = await api.blog.getBySlug({ slug });

  const openGraphImages = post.image
    ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt ?? "Blog post image",
        },
      ]
    : [];

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: openGraphImages,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await api.blog.getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await api.blog.getBySlug({ slug: params.slug });

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
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag}`}>
                  <Badge
                    variant="outline"
                    className="text-black dark:text-white"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <AuthorInfo author={post.author} size="lg" />
        </div>

        {post.image && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.imageAlt ?? "Blog post image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <article className="prose prose-lg dark:prose-invert mb-12 max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </article>

        <div className="mt-8 border-t border-gray-400 pt-8">
          <AuthorInfo author={post.author} size="lg" />
        </div>
      </div>
    </main>
  );
}
