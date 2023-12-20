import { BlogPost } from '@app/services/blog/postApi';
import NotFound from '@src/pages/404';
import BlogPostToc from '@pages/Blog/BlogComponents/BlogPostToc';
import { StyledBlogPost } from './BlogPostStyle';
import Image from 'next/image';
import MarkdownViewer from '@organisms/MarkdownViewer';
import BlogPostFooter from '@pages/Blog/BlogComponents/BlogPostFooter';
import BlogPostHeader from '@pages/Blog/BlogComponents/BlogPostHeader';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { _id, thumbnail, content } = blogPost || {};

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
      <BlogPostFooter postId={_id} />
    </StyledBlogPost>
  );
};

export default BlogPostPresenter;
