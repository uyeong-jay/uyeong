import { BlogPostProps } from '@_types/types-blog';

const BlogPostPresenter = ({ frontMatter, markdownBody }: BlogPostProps) => {
  const { date, title, description /* tags */ } = frontMatter;

  if (!frontMatter) return <></>;
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <article>{markdownBody}</article>
      <small>{date}</small>
    </div>
  );
};

export default BlogPostPresenter;
