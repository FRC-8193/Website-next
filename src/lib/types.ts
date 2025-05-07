export interface Author {
  name: string;
  role?: string;
  bio?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: Author;
  excerpt: string;
  content: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
}

export interface BlogPostCardProps {
  post: BlogPost;
  highlightedTag?: string;
}
