export type Blog = {
  id: string;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  created_at: string;
  created_by: string;
  cover_link: string;
};

export type BlogResponse = {
  data: Blog[];
};

export type CreateBlogData = {
  title: string;
  slug: string;
  author: string;
  cover_link: string;
  tags: string[];
  content: string;
};
