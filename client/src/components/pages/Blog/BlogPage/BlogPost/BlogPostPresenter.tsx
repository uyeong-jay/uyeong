import MarkdownViewer from '@organisms/MarkdownViewer';
import { BlogPost } from '@app/services/blog/postApi';
import NotFound from '@src/pages/404';
import formatDate from '@utils/formatDate';
import BlogPostToc from '@pages/Blog/BlogComponents/BlogPostToc';
import { StyledBlogPost } from './BlogPostStyle';
import Image from 'next/image';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { title, thumbnail, category, createdAt, tags, content } = blogPost || {};

  console.log(blogPost);

  if (!blogPost) return <NotFound />;
  return (
    <StyledBlogPost>
      <nav>
        <BlogPostToc />
      </nav>
      {/* 제목 글씨체 바꾸기 */}
      <div className="blog-post-header">
        <h1>{title}</h1>
        <div className="blog-post-header-middle">
          {/* 양쪽으로 */}
          {/* 글씨만 */}
          {category && <p>{category}</p>}
          <p>{formatDate(createdAt as string)}</p>
        </div>
        <div className="blog-post-header-bottom">
          {/* 둥글게 */}
          {tags?.map((tag, index) => (
            //tag 이모티콘 씌우기
            <div className="blog-post-tag" key={index}>
              {tag}
            </div>
          ))}
        </div>
      </div>
      {thumbnail && (
        <div className="blog-post-image-wrapper">
          <Image
            className="blog-post-image"
            src={thumbnail as string}
            alt="blog post image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <article>
        <MarkdownViewer content={content ?? ''} />
      </article>
      {/* 좋아요 with 폭죽 - velog, youtube */}
      {/* 링크복사,  - velog */}
      {/* 댓글 - ellismin */}
      {/* anchor top */}
    </StyledBlogPost>
  );
};

export default BlogPostPresenter;
