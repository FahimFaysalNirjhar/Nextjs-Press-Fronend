export type IPost = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  tags: string[];
  views: number;
  createdAt: Date | string;
  isPermium: boolean; // spelled as in the schema
  author?: { name?: string | null } | null;
  _count?: { comments: number };
  readingTime?: number | null;
};
