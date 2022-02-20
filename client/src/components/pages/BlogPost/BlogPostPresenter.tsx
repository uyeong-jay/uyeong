import { BlogPostProps } from '@_types/types-blog';
import MarkdownViewer from '@organisms/MarkdownViewer';

const BlogPostPresenter = ({ frontMatter, markdownBody }: BlogPostProps) => {
  const { date, title, description /* tags */ } = frontMatter;

  if (!frontMatter) return <></>;
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <article>
        <MarkdownViewer content={markdownBody} />
      </article>
      <small>{date}</small>
    </div>
  );
};

export default BlogPostPresenter;
