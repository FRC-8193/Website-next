import Link from "next/link";
import Image from "next/image";

interface Author {
  name: string;
  avatar: string;
  role?: string;
}

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: Author;
  excerpt: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  tags: string[];
}

interface BlogPostCardProps {
  post: BlogPost;
  highlightedTag?: string;
}

const BlogPostCard = ({ post, highlightedTag }: BlogPostCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <time className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2 py-1 text-xs ${
                  tag === highlightedTag ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
          <p className="mb-4 text-gray-600">{post.excerpt}</p>
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <span className="font-medium">{post.author.name}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard;
