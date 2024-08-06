import { BlogPost } from '@app/services/blog/postApi';
import Head from 'next/head';
import NotFound from '@src/pages/404';
import BlogPostToc from '@pages/Blog/BlogComponents/BlogPostToc';
import { SECTION } from './BlogPostStyle';
import Image from 'next/image';
import BlogPostFooter from '@pages/Blog/BlogComponents/BlogPostFooter';
import BlogPostHeader from '@pages/Blog/BlogComponents/BlogPostHeader';
import MarkdownViewer from '@organisms/MarkdownViewer';

interface Props {
  blogPost?: BlogPost;
}

const BlogPostPresenter = ({ blogPost }: Props) => {
  const { _id, title, thumbnail, content } = blogPost || {};

  if (!_id) return <NotFound />;
  return (
    <>
      <Head>
        <title>Blog | {title ? (title.length > 25 ? title.slice(0, 25) + '...' : title) : '...'} - UYeong</title>
      </Head>
      <SECTION.Frame>
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
      </SECTION.Frame>
    </>
  );
};

export default BlogPostPresenter;
