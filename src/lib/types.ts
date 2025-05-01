export interface Author {
  name: string;
  avatar: string;
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
