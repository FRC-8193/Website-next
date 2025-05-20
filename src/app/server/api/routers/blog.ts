import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";

const AuthorSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
});

const BlogPostSchema = z.object({
  slug: z.string(),
  content: z.string(),
  title: z.string(),
  date: z.date(),
  author: AuthorSchema,
  excerpt: z.string(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  tags: z.array(z.string()),
});

interface AuthorJsonData {
  username?: string;
  displayName: string;
  role?: string;
}

const blogDir = path.join(process.cwd(), "src/content/posts");
const authorsDir = path.join(process.cwd(), "src/content/authors");

/**
 * Load authors from individual JSON files
 */
const loadAuthors = (): Record<string, z.infer<typeof AuthorSchema>> => {
  try {
    const authors: Record<string, z.infer<typeof AuthorSchema>> = {};
    if (!fs.existsSync(authorsDir)) {
      console.warn("Authors directory not found:", authorsDir);
      return {};
    }
    const fileNames = fs.readdirSync(authorsDir);
    fileNames.forEach((fileName) => {
      if (fileName.endsWith(".json")) {
        const authorId = fileName.replace(/\.json$/, "");
        const fullPath = path.join(authorsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        try {
          const authorData = JSON.parse(fileContents) as AuthorJsonData;
          if (authorData && typeof authorData.displayName === "string") {
            authors[authorId] = {
              name: authorData.displayName,
              role: authorData.role,
            };
          } else {
            console.warn(
              `Invalid author data structure in ${fileName}: displayName is missing or not a string.`,
            );
            authors[authorId] = { name: authorId, role: undefined };
          }
        } catch (e) {
          console.error(`Error parsing JSON from ${fileName}:`, e);
          authors[authorId] = { name: authorId, role: undefined };
        }
      }
    });
    return authors;
  } catch (error) {
    console.error("Error reading authors:", error);
    return {};
  }
};

const loadedAuthors = loadAuthors();

/**
 * Parse markdown content to HTML
 */
const markdownToHtml = async (markdown: string): Promise<string> => {
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrism, { ignoreMissing: true })
      .use(rehypeStringify)
      .process(markdown);
    return result.toString();
  } catch (error) {
    console.error("Error parsing markdown:", error);
    // In a tRPC context, you might want to throw an error or handle it differently
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to parse markdown",
      cause: error,
    });
  }
};

/**
 * Get all blog post slugs
 */
const getAllPostSlugs = (): string[] => {
  try {
    if (!fs.existsSync(blogDir)) {
      console.warn("Blog directory not found:", blogDir);
      return [];
    }
    const fileNames = fs.readdirSync(blogDir);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return []; // Or throw a TRPCError
  }
};

/**
 * Read blog post data from markdown file
 */
const getPostData = async (
  slug: string,
): Promise<z.infer<typeof BlogPostSchema>> => {
  const fullPath = path.join(blogDir, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const title = typeof data.title === "string" ? data.title : "Untitled Post";

    const date = data.date instanceof Date ? data.date : new Date();
    const excerpt = typeof data.excerpt === "string" ? data.excerpt : "";
    const tags = Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [];

    const frontmatterAuthorData: unknown = data.author;
    const frontmatterImageData: unknown = data.image;
    const frontmatterImageAltData =
      typeof data.imageAlt === "string" ? data.imageAlt : undefined;

    const htmlContent = await markdownToHtml(content);

    let authorInfo: z.infer<typeof AuthorSchema> = { name: "Unknown" };
    if (typeof frontmatterAuthorData === "string") {
      authorInfo = loadedAuthors[frontmatterAuthorData] ?? {
        name: frontmatterAuthorData,
      };
    } else if (
      typeof frontmatterAuthorData === "object" &&
      frontmatterAuthorData !== null
    ) {
      const authorObj = frontmatterAuthorData as {
        name?: string;
        role?: string;
      };
      authorInfo = {
        name: authorObj.name ?? "Unknown",
        role: authorObj.role,
      };
    }

    let imagePath: string | undefined;
    let imageAltText: string | undefined = frontmatterImageAltData;

    if (typeof frontmatterImageData === "string") {
      imagePath = frontmatterImageData;
    } else if (
      typeof frontmatterImageData === "object" &&
      frontmatterImageData !== null
    ) {
      const imageObj = frontmatterImageData as { src?: string; alt?: string };
      if (typeof imageObj.src === "string") {
        imagePath = imageObj.src;
      }
      if (imageAltText === undefined && typeof imageObj.alt === "string") {
        imageAltText = imageObj.alt;
      }
    }

    return {
      slug,
      content: htmlContent,
      title,
      date,
      author: authorInfo,
      excerpt,
      image: imagePath,
      imageAlt: imageAltText,
      tags,
    };
  } catch (error) {
    // Explicitly type the error object
    const e = error as { code?: string; message?: string };
    if (e.code === "ENOENT") {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Post with slug "${slug}" not found.`,
        cause: error,
      });
    }
    console.error(`Error reading file ${fullPath}:`, error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Error reading post with slug "${slug}".`,
      cause: error,
    });
  }
};

export const blogRouter = createTRPCRouter({
  getPosts: publicProcedure.output(z.array(BlogPostSchema)).query(async () => {
    const slugs = getAllPostSlugs();
    if (slugs.length === 0) {
      console.warn("No blog posts found in directory:", blogDir);
      return [];
    }
    const postsPromises = slugs.map((slug) => getPostData(slug));
    const posts = await Promise.all(postsPromises);
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .output(BlogPostSchema)
    .query(async ({ input }) => {
      try {
        return await getPostData(input.slug);
      } catch (error) {
        if (error instanceof TRPCError && error.code === "NOT_FOUND") {
          throw error;
        }
        console.error(`Error fetching post with slug ${input.slug}:`, error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `An unexpected error occurred while fetching post "${input.slug}".`,
        });
      }
    }),

  getTags: publicProcedure.output(z.array(z.string())).query(async () => {
    const slugs = getAllPostSlugs();
    const postsPromises = slugs.map((slug) => getPostData(slug));
    const posts = await Promise.all(postsPromises);
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }),

  getByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .output(z.array(BlogPostSchema))
    .query(async ({ input }) => {
      const slugs = getAllPostSlugs();
      const postsPromises = slugs.map((slug) => getPostData(slug));
      const posts = await Promise.all(postsPromises);
      const filteredPosts = posts.filter((post) =>
        post.tags.includes(input.tag),
      );
      return filteredPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }),
});
