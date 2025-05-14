import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AuthorInfo } from "@/components/AuthorInfo";
import { api } from "@/app/trpc/server";
import { Back } from "@/components/ui/back";
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

const renderMarkdown = async (content: string): Promise<string> => {
  try {
    let html = content;

    // Add Tailwind classes to HTML elements
    html = html
      // Headers
      .replace(
        /<h1>(.*?)<\/h1>/g,
        '<h1 class="text-4xl font-bold my-6">$1</h1>',
      )
      .replace(
        /<h2>(.*?)<\/h2>/g,
        '<h2 class="text-3xl font-bold my-5">$1</h2>',
      )
      .replace(
        /<h3>(.*?)<\/h3>/g,
        '<h3 class="text-2xl font-bold my-4">$1</h3>',
      )
      .replace(/<h4>(.*?)<\/h4>/g, '<h4 class="text-xl font-bold my-3">$1</h4>')
      .replace(/<h5>(.*?)<\/h5>/g, '<h5 class="text-lg font-bold my-2">$1</h5>')
      .replace(
        /<h6>(.*?)<\/h6>/g,
        '<h6 class="text-base font-bold my-2">$1</h6>',
      )

      // Paragraphs
      .replace(/<p>(.*?)<\/p>/g, '<p class="my-4 text-lg">$1</p>')

      // Lists
      .replace(/<ul>/g, '<ul class="my-4 list-disc ml-6">')
      .replace(/<ol>/g, '<ol class="my-4 list-decimal ml-6">')
      .replace(/<li>/g, '<li class="ml-6 mb-2">')

      // Links
      .replace(
        /<a href="(.*?)">(.*?)<\/a>/g,
        '<a href="$1" class="text-black font-medium underline hover:text-gray-700 transition-colors" target="_blank" rel="noopener noreferrer">$2</a>',
      )

      // Images
      .replace(
        /<img src="(.*?)" alt="(.*?)">/g,
        '<img src="$1" alt="$2" class="w-full rounded-lg my-6 shadow-lg">',
      )

      // Code blocks
      .replace(
        /<pre><code class="(.*?)">(.*?)<\/code><\/pre>/gs,
        (language, code) => {
          return `<pre class="rounded-md bg-gray-900 p-4 my-6 overflow-x-auto"><code class="language-${language} text-sm font-mono text-white">${code}</code></pre>`;
        },
      )

      // Inline code
      .replace(
        /<code>(.*?)<\/code>/g,
        '<code class="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">$1</code>',
      );

    return html;
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return content; // Return original content if rendering fails
  }
};

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await api.blog.getBySlug({ slug: params.slug });

  // Check if post.content exists before trying to render it
  let contentHtml = "";
  if (post.content) {
    contentHtml = await renderMarkdown(post.content);
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <Back />

        <div className="mb-8 flex items-start justify-between border-b border-gray-400 pb-8">
          <div>
            <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
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
                  <Badge variant="outline">{tag}</Badge>
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

        <article className="prose prose-lg mb-12 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        <div className="mt-8 border-t border-gray-400 pt-8">
          <AuthorInfo author={post.author} size="lg" />
        </div>
      </div>
    </main>
  );
}
