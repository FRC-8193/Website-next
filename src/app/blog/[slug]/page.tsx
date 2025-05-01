import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return {
    title: `${post.title} | FRC Team 8193 Steel Stingers Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image.src,
          width: 1200,
          height: 630,
          alt: post.image.alt,
        },
      ],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Process markdown content with remark and rehype
const renderMarkdown = async (content: string): Promise<string> => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  let html = String(result);

  // Add Tailwind classes to HTML elements
  html = html
    // Headers
    .replace(/<h1>(.*?)<\/h1>/g, '<h1 class="text-4xl font-bold my-6">$1</h1>')
    .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-3xl font-bold my-5">$1</h2>')
    .replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-2xl font-bold my-4">$1</h3>')
    .replace(/<h4>(.*?)<\/h4>/g, '<h4 class="text-xl font-bold my-3">$1</h4>')
    .replace(/<h5>(.*?)<\/h5>/g, '<h5 class="text-lg font-bold my-2">$1</h5>')
    .replace(/<h6>(.*?)<\/h6>/g, '<h6 class="text-base font-bold my-2">$1</h6>')

    // Paragraphs
    .replace(/<p>(.*?)<\/p>/g, '<p class="my-4 text-lg">$1</p>')

    // Lists
    .replace(/<ul>/g, '<ul class="my-4">')
    .replace(/<ol>/g, '<ol class="my-4">')
    .replace(/<li>/g, '<li class="ml-6 list-disc">')
    .replace(/<li class="ml-6 list-disc">/g, (match, index) => {
      // Check if this is inside an ordered list by looking backwards
      const prevOl = html.lastIndexOf('<ol class="my-4">', index);
      const prevUl = html.lastIndexOf('<ul class="my-4">', index);

      // If the nearest list opening tag is an ol, use decimal list style
      if (prevOl > prevUl && prevOl !== -1) {
        return '<li class="ml-6 list-decimal">';
      }

      return match;
    })

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
      (match, language, code) => {
        return `<pre class="rounded-md bg-gray-900 p-4 my-6 overflow-x-auto"><code class="language-${language} text-sm font-mono text-white">${code}</code></pre>`;
      },
    )

    // Inline code
    .replace(
      /<code>(.*?)<\/code>/g,
      '<code class="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">$1</code>',
    );

  return html;
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  const contentHtml = await renderMarkdown(post.content);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to all posts
        </Link>

        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                {post.author.role && (
                  <div className="text-sm text-gray-500">
                    {post.author.role}
                  </div>
                )}
              </div>
            </div>
            <time className="text-gray-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="rounded-full bg-black px-3 py-1 text-sm text-white transition-colors hover:bg-gray-800"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <article className="prose prose-lg mb-12 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-2xl font-bold">About the Author</h2>
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{post.author.name}</h3>
              {post.author.role && (
                <div className="mb-2 text-gray-600">{post.author.role}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
