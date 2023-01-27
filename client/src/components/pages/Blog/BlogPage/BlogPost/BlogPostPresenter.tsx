import { BlogPost } from '@app/services/blog/postApi';
import NotFound from '@src/pages/404';
import BlogPostToc from '@pages/Blog/BlogComponents/BlogPostToc';
import { StyledBlogPost } from './BlogPostStyle';
import Image from 'next/image';
import MarkdownViewer from '@organisms/MarkdownViewer';
import BlogPostComment from '@pages/Blog/BlogComponents/BlogPostComment';
import BlogPostHeader from '@pages/Blog/BlogComponents/BlogPostHeader';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { thumbnail, content } = blogPost || {};

  //blogPost가 없으면 없다고 표시하기
  if (!blogPost) return <NotFound />;
  return (
    <StyledBlogPost>
      <BlogPostToc />

      <BlogPostHeader blogPost={blogPost} />

      <article>
        {thumbnail && (
          <div className="blog-post-image-wrapper">
            <Image
              className="blog-post-image"
              src={thumbnail as string}
              alt="blog post image"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        )}
        <MarkdownViewer content={content ?? ''} />
      </article>

      <BlogPostComment />

      {/* 좋아요 with 폭죽 - velog, youtube */}
      {/* 링크복사,  - velog */}
      {/* 댓글 - ellismin */}
      {/* anchor top */}
    </StyledBlogPost>
  );
};

export default BlogPostPresenter;
