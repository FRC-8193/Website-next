export interface Author {
  name: string;
  role?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: Date;
  author: Author;
  excerpt: string;
  content: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
}
