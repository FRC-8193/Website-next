// Common types used across the application

// Navigation
export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

// Theme
export type Theme = "dark" | "light";

// Blog post
export interface Author {
  name: string;
  avatar: string;
  role?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: Author;
  excerpt: string;
  content: string;
  featured: boolean;
  image: {
    src: string;
    alt: string;
  };
  tags: string[];
}

// Timeline event
export interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  category: string;
  link?: {
    url: string;
    label: string;
  };
}
