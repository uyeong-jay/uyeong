import MarkdownViewer from '@organisms/MarkdownViewer';
import { BlogPostByPostTitle } from '@app/services/blog/postApi';
import NotFound from '@src/pages/404';
import foramtDate from '@utils/formatDate';

interface Props {
  blogPost?: BlogPostByPostTitle;
}

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { title, category, createdAt, content } = blogPost || {};

  if (!blogPost) return <NotFound />;
  return (
    <div>
      <h3>{title}</h3>
      <p>{category}</p>
      <p>{foramtDate(createdAt as string)}</p>
      <article>
        <MarkdownViewer content={content as string} />
      </article>
      {/* <small>{date}</small> */}
    </div>
  );
};

export default BlogPostPresenter;
