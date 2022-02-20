export type BlogFrontMatter = {
  date: string;
  title: string;
  description: string;
  tags: string[];
};

export type BlogPostProps = {
  frontMatter: BlogFrontMatter;
  markdownBody: never;
};

export type BlogPostsProps = {
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
};

export type BlogProps = {
  posts?: BlogPostsProps[];
  title: string;
  description: string;
};

export type Params = {
  params: {
    slug: string;
  };
};
