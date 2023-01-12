import MarkdownViewer from '@organisms/MarkdownViewer';
import { BlogPostByPostTitle } from '@app/services/blog/postApi';
import NotFound from '@src/pages/404';
import foramtDate from '@utils/formatDate';
import BlogPostToc from '@pages/Blog/BlogComponents/BlogPostToc';
import { StyledBlogPost } from './BlogPostStyle';

interface Props {
  blogPost?: BlogPostByPostTitle;
}

//tags 가져오기

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { title, category, createdAt, content } = blogPost || {};

  if (!blogPost) return <NotFound />;
  return (
    <StyledBlogPost>
      <h1>{title}</h1>
      <p>{category}</p>
      <p>{foramtDate(createdAt as string)}</p>
      <article>
        <MarkdownViewer content={content as string} />
      </article>
      <BlogPostToc />
      {/* 좋아요 with 폭죽 - velog, youtube */}
      {/* 링크복사,  - velog */}
      {/* 댓글 - ellismin */}
      {/* anchor top */}
    </StyledBlogPost>
  );
};

export default BlogPostPresenter;
