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

export type ActiveStatus = "ACTIVE" | "BLOCKED";

export type UserRole = "USER" | "ADMIN" | "AUTHOR";

export type IUser = {
  id: string;
  name: string;
  email: string;
  activeStatus: ActiveStatus;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    profilePhoto: string | null;
    bio: string | null;
    userId: string;
  };
};

export type NavbarProps = {
  user: IUser | null;
};
