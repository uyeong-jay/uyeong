export type BlogFrontMatter = {
  date: string;
  title: string;
  description: string;
  tags: string[];
};

export type BlogPostProps = {
  //posts
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];

  //post
  frontMatter: BlogFrontMatter;
  markdownBody: never;
};

export type BlogProps = {
  posts?: BlogPostProps[];
  title: string;
  description: string;
};
