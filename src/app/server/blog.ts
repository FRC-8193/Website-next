import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";
import type { BlogPost, Author } from "@/lib/types";

const blogDir = path.join(process.cwd(), "src/content/posts");
const authorsDir = path.join(process.cwd(), "src/content/authors");

/**
 * Load authors from individual markdown files
 * @returns Object with authors indexed by username (filename without extension)
 */
const loadAuthors = (): Record<string, Author> => {
  try {
    const authors: Record<string, Author> = {};

    // Check if authors directory exists
    if (!fs.existsSync(authorsDir)) {
      console.warn("Authors directory not found:", authorsDir);
      return {};
    }

    const fileNames = fs.readdirSync(authorsDir);

    fileNames.forEach((fileName) => {
      if (fileName.endsWith(".md")) {
        const authorId = fileName.replace(/\.md$/, "");
        const fullPath = path.join(authorsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        authors[authorId] = {
          name: (data.name as string) ?? "Unknown",
          role: data.role as string | undefined,
        };
      }
    });

    return authors;
  } catch (error) {
    console.error("Error reading authors:", error);
    return {};
  }
};

// Load authors data
const authors = loadAuthors();

/**
 * Parse markdown content to HTML
 * @param markdown The markdown content to parse
 * @returns HTML string
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
    return markdown; // Return original content if parsing fails
  }
};

/**
 * Get all blog post slugs
 * @returns Array of blog post slugs
 */
const getAllPostSlugs = (): string[] => {
  try {
    const fileNames = fs.readdirSync(blogDir);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
};

/**
 * Read blog post data from markdown file
 * @param slug The blog post slug
 * @returns The blog post data
 */
const getPostData = async (slug: string): Promise<BlogPost> => {
  const fullPath = path.join(blogDir, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents); // data from gray-matter can have flexible structure

    // Safely access and type-check frontmatter properties
    const title = typeof data.title === "string" ? data.title : "";
    const date =
      typeof data.date === "string" ? data.date : new Date().toISOString();
    const excerpt = typeof data.excerpt === "string" ? data.excerpt : "";
    const tags = Array.isArray(data.tags)
      ? data.tags.filter((tag) => typeof tag === "string")
      : [];

    const frontmatterAuthorData: unknown = data.author;
    const frontmatterImageData: unknown = data.image;
    const frontmatterImageAltData =
      typeof data.imageAlt === "string" ? data.imageAlt : undefined;

    const htmlContent = await markdownToHtml(content);

    let authorInfo: Author = { name: "Unknown" };
    if (typeof frontmatterAuthorData === "string") {
      authorInfo = authors[frontmatterAuthorData] ?? {
        name: frontmatterAuthorData,
      };
    } else if (
      typeof frontmatterAuthorData === "object" &&
      frontmatterAuthorData !== null
    ) {
      const authorObj = frontmatterAuthorData as {
        name?: string;
        role?: string;
        avatar?: string;
      };
      authorInfo = {
        name: authorObj.name ?? "Unknown",
        role: authorObj.role,
      };
    }

    let imagePath: string | undefined;
    let imageAltText: string | undefined = frontmatterImageAltData; // Prioritize dedicated imageAlt

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
      content: htmlContent ?? "",
      title,
      date,
      author: authorInfo,
      excerpt,
      image: imagePath, // Now consistently a string or undefined
      imageAlt: imageAltText, // Alt text is consolidated
      tags,
    };
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    notFound();
  }
};

/**
 * Fetch all blog posts
 * @returns Array of blog posts
 */
export const getAllPosts = async (): Promise<BlogPost[]> => {
  const slugs = getAllPostSlugs();

  if (slugs.length === 0) {
    console.warn("No blog posts found in directory:", blogDir);
  }

  const postsPromises = slugs.map((slug) => getPostData(slug));
  const posts = await Promise.all(postsPromises);

  // Sort posts by date in descending order
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

/**
 * Fetch a single blog post by slug
 * @param slug The blog post slug
 * @returns The blog post or notFound
 */
export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  try {
    return await getPostData(slug);
  } catch (error) {
    console.error(`Error getting post with slug ${slug}:`, error);
    notFound();
  }
};

/**
 * Get all unique tags from blog posts
 * @returns Array of unique tags
 */
export const getAllTags = async (): Promise<string[]> => {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags);
};

/**
 * Get posts by tag
 * @param tag The tag to filter by
 * @returns Array of posts with the specified tag
 */
export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
};
