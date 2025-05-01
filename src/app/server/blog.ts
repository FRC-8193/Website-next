import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";
import yaml from "js-yaml";
import type { BlogPost, BlogPostFrontmatter, Author } from "@/lib/types";

const blogDir = path.join(process.cwd(), "src/content/blog");
const authorsFile = path.join(process.cwd(), "src/content/authors.yaml");

/**
 * Load authors from YAML file
 * @returns Object with authors indexed by username
 */
const loadAuthors = (): Record<string, Author> => {
  try {
    const fileContents = fs.readFileSync(authorsFile, "utf8");
    return yaml.load(fileContents) as Record<string, Author>;
  } catch (error) {
    console.error("Error reading authors file:", error);
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
    const { data, content } = matter(fileContents);

    const frontmatter = data as BlogPostFrontmatter;

    // Convert markdown to HTML
    const htmlContent = await markdownToHtml(content);

    let authorInfo: Author = { name: "Unknown" };
    if (typeof frontmatter.author === "string") {
      authorInfo = authors[frontmatter.author] ?? { name: frontmatter.author };
    }

    return {
      slug,
      content: htmlContent ?? "", // Provide default value
      title: frontmatter.title ?? "",
      date: frontmatter.date ?? new Date().toISOString(),
      author: authorInfo,
      excerpt: frontmatter.excerpt ?? "",
      image: {
        src: frontmatter.image?.src ?? "/images/default.png",
        alt: frontmatter.image?.alt ?? "Blog post image",
      },
      tags: frontmatter.tags ?? [],
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
