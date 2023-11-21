import { BlogPost } from '@app/services/blog/postApi';
import NotFound from '@src/pages/404';
import BlogPostToc from '@pages/Blog/BlogComponents/BlogPostToc';
import { StyledBlogPost } from './BlogPostStyle';
import Image from 'next/image';
import MarkdownViewer from '@organisms/MarkdownViewer';
import BlogPostComments from '@pages/Blog/BlogComponents/BlogPostComments';
import BlogPostHeader from '@pages/Blog/BlogComponents/BlogPostHeader';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { _id, thumbnail, content, commentCount } = blogPost || {};

  if (!blogPost) return <NotFound />;
  return (
    <StyledBlogPost>
      <BlogPostToc />

      <BlogPostHeader blogPost={blogPost} />

      <article>
        {thumbnail && (
          <div className="blog-post-image-wrapper" id="post-thumbnail-wrapper">
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
        <div id="markdown-content">
          <MarkdownViewer content={content ?? ''} />
        </div>
      </article>

      <BlogPostComments postId={_id} commentCount={commentCount} />

      {/* 좋아요 with 폭죽 - velog, youtube */}
    </StyledBlogPost>
  );
};

export default BlogPostPresenter;
