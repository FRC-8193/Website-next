import { notFound } from "next/navigation";
import type { BlogPost } from "./types";

// Mock data for development - will be replaced with CMS integration
const BLOG_POSTS: BlogPost[] = [
  {
    title: "Steel Stingers Win Regional Competition",
    slug: "steel-stingers-win-regional",
    date: "2023-04-15",
    author: {
      name: "Coach Thompson",
      avatar: "/images/authors/coach-thompson.png",
      role: "Head Coach",
    },
    excerpt:
      "Team 8193 Steel Stingers secured first place at the regional competition with their innovative robot design.",
    content: `
# Steel Stingers Win Regional Competition

Team 8193 Steel Stingers secured first place at the regional competition with their innovative robot design.

## The Competition

The competition was fierce, with over 30 teams participating from across the state. Our team's robot, "Stinger Bot 5000," performed exceptionally well in all challenges.

## Key Features of Our Robot

- Autonomous navigation system
- Precision grabber mechanism
- High-efficiency drive train
- Custom vision processing system

## Team Effort

This victory was the result of months of hard work and dedication from our team members, mentors, and sponsors.

## Next Steps

We're now preparing for the state championship next month. Stay tuned for updates!
    `,
    image: {
      src: "/images/team.png",
      alt: "Steel Stingers team celebrating their regional win",
    },
    tags: ["competition", "victory", "robotics"],
  },
  {
    title: "Introducing Our New Robotics Lab",
    slug: "new-robotics-lab",
    date: "2023-03-10",
    author: {
      name: "Sarah Chen",
      avatar: "/images/authors/sarah-chen.png",
      role: "Team Captain",
    },
    excerpt:
      "Thanks to our sponsors, we now have a state-of-the-art robotics lab to develop and test our robots.",
    content: `
# Introducing Our New Robotics Lab

Thanks to our sponsors, we now have a state-of-the-art robotics lab to develop and test our robots.

## Lab Features

- 3D printers for rapid prototyping
- CNC machines for precision parts
- Testing arena mimicking competition fields
- Collaborative workstations for team projects

## How This Helps Us

The new lab will significantly improve our ability to design, build, and test robots more efficiently.

## Thank You to Our Sponsors

We want to extend our deepest gratitude to all our sponsors who made this possible.
    `,
    image: {
      src: "/images/team.png",
      alt: "Steel Stingers new robotics laboratory",
    },
    tags: ["facilities", "sponsors", "development"],
  },
];

/**
 * Fetch all blog posts
 * @returns Array of blog posts
 */
export const getAllPosts = async (): Promise<BlogPost[]> => {
  // In production, this would fetch from CMS
  // For now, return mock data
  return BLOG_POSTS;
};

/**
 * Fetch a single blog post by slug
 * @param slug The blog post slug
 * @returns The blog post or notFound
 */
export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  // In production, this would fetch from CMS
  // For now, search mock data
  const post = BLOG_POSTS.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return post;
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
