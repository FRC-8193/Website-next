export interface Author {
  name: string;
  role?: string;
}

export interface BlogPost {
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

export interface BlogPostFrontmatter {
  title?: string;
  date?: string;
  author?:
    | string
    | {
        name?: string;
        avatar?: string;
        role?: string;
      };
  excerpt?: string;
  image?: {
    src?: string;
    alt?: string;
  };
  tags?: string[];
}

export interface BlogPostCardProps {
  post: BlogPost;
  highlightedTag?: string;
}
